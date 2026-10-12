const StudyProgress = require('../models/StudyProgress');
const FocusSessionModel = require('../models/FocusSession');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');

function progressToResponse(p) {
  return {
    id: p._id.toString(),
    subject: p.subject,
    topic: p.topic,
    completionOrMastery: p.completionOrMastery,
    studyTimeMinutes: p.studyTimeMinutes,
    topicsCovered: p.topicsCovered,
    revisionDueDate: p.revisionDueDate,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt
  };
}

const listProgress = asyncHandler(async (req, res) => {
  const records = await StudyProgress.find({ owner: req.user._id }).sort({ updatedAt: -1 });

  const sessionAgg = await FocusSessionModel.aggregate([
    { $match: { owner: req.user._id, completionStatus: 'completed' } },
    {
      $group: {
        _id: '$subject',
        totalMinutes: { $sum: { $ifNull: ['$actualDurationMinutes', '$plannedDurationMinutes'] } },
        sessionCount: { $sum: 1 }
      }
    }
  ]);

  const revisionDue = records.filter(
    (r) => r.revisionDueDate && new Date(r.revisionDueDate) <= new Date(Date.now() + 7 * 86400000)
  );

  res.json({
    success: true,
    data: records.map(progressToResponse),
    statistics: {
      totalTopics: records.length,
      averageMastery:
        records.length > 0
          ? Math.round(records.reduce((sum, r) => sum + r.completionOrMastery, 0) / records.length)
          : 0,
      focusBySubject: sessionAgg,
      revisionDueSoon: revisionDue.map(progressToResponse)
    }
  });
});

const createProgress = asyncHandler(async (req, res) => {
  const { subject, topic, completionOrMastery, studyTimeMinutes, topicsCovered, revisionDueDate } =
    req.body;

  if (!subject || !topic) throw new ApiError(400, 'Subject and topic are required');

  const mastery = completionOrMastery !== undefined ? Number(completionOrMastery) : 0;
  if (mastery < 0 || mastery > 100) throw new ApiError(400, 'completionOrMastery must be 0-100');

  let record = await StudyProgress.findOne({
    owner: req.user._id,
    subject: String(subject).trim(),
    topic: String(topic).trim()
  });

  if (record) {
    record.completionOrMastery = mastery;
    if (studyTimeMinutes !== undefined) record.studyTimeMinutes = Number(studyTimeMinutes);
    if (topicsCovered !== undefined) record.topicsCovered = topicsCovered;
    if (revisionDueDate !== undefined) {
      record.revisionDueDate = revisionDueDate ? new Date(revisionDueDate) : null;
    }
    await record.save();
  } else {
    record = await StudyProgress.create({
      owner: req.user._id,
      subject: String(subject).trim(),
      topic: String(topic).trim(),
      completionOrMastery: mastery,
      studyTimeMinutes: studyTimeMinutes ? Number(studyTimeMinutes) : 0,
      topicsCovered: topicsCovered || [],
      revisionDueDate: revisionDueDate ? new Date(revisionDueDate) : null
    });
  }

  res.status(201).json({ success: true, data: progressToResponse(record) });
});

const patchProgress = asyncHandler(async (req, res) => {
  const record = await StudyProgress.findOne({ _id: req.params.id, owner: req.user._id });
  if (!record) throw new ApiError(404, 'Progress record not found');

  if (req.body.completionOrMastery !== undefined) {
    const mastery = Number(req.body.completionOrMastery);
    if (mastery < 0 || mastery > 100) throw new ApiError(400, 'completionOrMastery must be 0-100');
    record.completionOrMastery = mastery;
  }
  if (req.body.studyTimeMinutes !== undefined) {
    record.studyTimeMinutes = Math.max(0, Number(req.body.studyTimeMinutes));
  }
  if (req.body.topicsCovered !== undefined) record.topicsCovered = req.body.topicsCovered;
  if (req.body.revisionDueDate !== undefined) {
    record.revisionDueDate = req.body.revisionDueDate ? new Date(req.body.revisionDueDate) : null;
  }
  if (req.body.subject !== undefined) record.subject = req.body.subject;
  if (req.body.topic !== undefined) record.topic = req.body.topic;

  await record.save();
  res.json({ success: true, data: progressToResponse(record) });
});

module.exports = { listProgress, createProgress, patchProgress };
