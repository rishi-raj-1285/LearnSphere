const mongoose = require('mongoose');

const studyProgressSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    subject: { type: String, required: true, trim: true },
    topic: { type: String, required: true, trim: true, maxlength: 300 },
    completionOrMastery: { type: Number, default: 0, min: 0, max: 100 },
    studyTimeMinutes: { type: Number, default: 0, min: 0 },
    topicsCovered: { type: [String], default: [] },
    revisionDueDate: { type: Date, default: null }
  },
  { timestamps: true }
);

studyProgressSchema.index({ owner: 1, subject: 1, topic: 1 }, { unique: true });
studyProgressSchema.index({ owner: 1, revisionDueDate: 1 });

module.exports = mongoose.model('StudyProgress', studyProgressSchema);
