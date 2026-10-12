const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    taskId: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true, maxlength: 300 },
    description: { type: String, default: '', trim: true, maxlength: 2000 },
    scheduledDate: { type: Date, default: null },
    dayNumber: { type: Number, min: 1, default: null },
    estimatedDurationMinutes: { type: Number, min: 0, default: null },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date, default: null }
  },
  { _id: false }
);

const studyPlanSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    planType: {
      type: String,
      enum: ['pdf', 'mentor', 'custom'],
      default: 'custom'
    },
    subject: { type: String, default: 'General', trim: true },
    linkedDocument: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', default: null },
    targetExam: { type: String, default: '', trim: true },
    mentorMetadata: { type: mongoose.Schema.Types.Mixed, default: null },
    estimatedStudyHours: { type: String, default: '', trim: true },
    duration: { type: String, default: '', trim: true },
    milestones: { type: [mongoose.Schema.Types.Mixed], default: [] },
    tasks: { type: [taskSchema], default: [] },
    isActive: { type: Boolean, default: false }
  },
  { timestamps: true }
);

studyPlanSchema.index({ owner: 1, isActive: 1 });
studyPlanSchema.index({ owner: 1, createdAt: -1 });

module.exports = mongoose.model('StudyPlan', studyPlanSchema);
