const StudyPlan = require('../models/StudyPlan');
const Document = require('../models/Document');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');

async function assertLinkedDocument(ownerId, documentId) {
  if (!documentId) return null;
  const doc = await Document.findOne({ _id: documentId, owner: ownerId });
  if (!doc) throw new ApiError(400, 'Linked document not found');
  return doc._id;
}

function planToResponse(plan) {
  return {
    id: plan._id.toString(),
    title: plan.title,
    planType: plan.planType,
    subject: plan.subject,
    linkedDocument: plan.linkedDocument ? plan.linkedDocument.toString() : null,
    targetExam: plan.targetExam,
    mentorMetadata: plan.mentorMetadata,
    estimatedStudyHours: plan.estimatedStudyHours,
    duration: plan.duration,
    milestones: plan.milestones,
    tasks: plan.tasks,
    isActive: plan.isActive,
    createdAt: plan.createdAt,
    updatedAt: plan.updatedAt
  };
}

const listStudyPlans = asyncHandler(async (req, res) => {
  const plans = await StudyPlan.find({ owner: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, data: plans.map(planToResponse) });
});

const createStudyPlan = asyncHandler(async (req, res) => {
  if (!req.body.title) throw new ApiError(400, 'Title is required');

  const linkedDocument = await assertLinkedDocument(req.user._id, req.body.linkedDocument || req.body.documentId);

  if (req.body.isActive === true) {
    await StudyPlan.updateMany({ owner: req.user._id, isActive: true }, { isActive: false });
  }

  const plan = await StudyPlan.create({
    owner: req.user._id,
    title: String(req.body.title).trim(),
    planType: req.body.planType || 'custom',
    subject: req.body.subject || 'General',
    linkedDocument,
    targetExam: req.body.targetExam || '',
    mentorMetadata: req.body.mentorMetadata || null,
    estimatedStudyHours: req.body.estimatedStudyHours || '',
    duration: req.body.duration || '',
    milestones: req.body.milestones || [],
    tasks: req.body.tasks || [],
    isActive: Boolean(req.body.isActive)
  });

  res.status(201).json({ success: true, data: planToResponse(plan) });
});

const getStudyPlan = asyncHandler(async (req, res) => {
  const plan = await StudyPlan.findOne({ _id: req.params.id, owner: req.user._id });
  if (!plan) throw new ApiError(404, 'Study plan not found');
  res.json({ success: true, data: planToResponse(plan) });
});

const patchStudyPlan = asyncHandler(async (req, res) => {
  const plan = await StudyPlan.findOne({ _id: req.params.id, owner: req.user._id });
  if (!plan) throw new ApiError(404, 'Study plan not found');

  if (req.body.title !== undefined) plan.title = String(req.body.title).trim();
  if (req.body.subject !== undefined) plan.subject = req.body.subject;
  if (req.body.planType !== undefined) plan.planType = req.body.planType;
  if (req.body.estimatedStudyHours !== undefined) plan.estimatedStudyHours = req.body.estimatedStudyHours;
  if (req.body.duration !== undefined) plan.duration = req.body.duration;
  if (req.body.milestones !== undefined) plan.milestones = req.body.milestones;
  if (req.body.tasks !== undefined) plan.tasks = req.body.tasks;
  if (req.body.targetExam !== undefined) plan.targetExam = req.body.targetExam;
  if (req.body.mentorMetadata !== undefined) plan.mentorMetadata = req.body.mentorMetadata;
  if (req.body.linkedDocument !== undefined || req.body.documentId !== undefined) {
    plan.linkedDocument = await assertLinkedDocument(
      req.user._id,
      req.body.linkedDocument || req.body.documentId
    );
  }

  if (req.body.isActive === true) {
    await StudyPlan.updateMany(
      { owner: req.user._id, isActive: true, _id: { $ne: plan._id } },
      { isActive: false }
    );
    plan.isActive = true;
  } else if (req.body.isActive === false) {
    plan.isActive = false;
  }

  await plan.save();
  res.json({ success: true, data: planToResponse(plan) });
});

const deleteStudyPlan = asyncHandler(async (req, res) => {
  const plan = await StudyPlan.findOne({ _id: req.params.id, owner: req.user._id });
  if (!plan) throw new ApiError(404, 'Study plan not found');
  await plan.deleteOne();
  res.json({ success: true, message: 'Study plan deleted' });
});

const patchTask = asyncHandler(async (req, res) => {
  const plan = await StudyPlan.findOne({ _id: req.params.id, owner: req.user._id });
  if (!plan) throw new ApiError(404, 'Study plan not found');

  const taskId = req.params.taskId;
  const task = plan.tasks.find((t) => t.taskId === taskId);
  if (!task) throw new ApiError(404, 'Task not found in this plan');

  if (req.body.completed !== undefined) {
    task.completed = Boolean(req.body.completed);
    task.completedAt = task.completed ? new Date() : null;
  }
  if (req.body.title !== undefined) task.title = req.body.title;
  if (req.body.description !== undefined) task.description = req.body.description;

  await plan.save();
  res.json({ success: true, data: planToResponse(plan) });
});

module.exports = {
  listStudyPlans,
  createStudyPlan,
  getStudyPlan,
  patchStudyPlan,
  deleteStudyPlan,
  patchTask
};
