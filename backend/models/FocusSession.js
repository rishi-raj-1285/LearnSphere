const mongoose = require('mongoose');

const focusSessionSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    subject: { type: String, required: true, trim: true },
    plannedDurationMinutes: { type: Number, required: true, min: 1, max: 480 },
    actualDurationMinutes: { type: Number, default: null, min: 0, max: 480 },
    startedAt: { type: Date, required: true },
    endedAt: { type: Date, default: null },
    completionStatus: {
      type: String,
      enum: ['in_progress', 'completed', 'cancelled'],
      default: 'in_progress'
    },
    scratchpadNotes: { type: String, default: '', maxlength: 5000 }
  },
  { timestamps: true }
);

focusSessionSchema.index({ owner: 1, startedAt: -1 });

module.exports = mongoose.model('FocusSession', focusSessionSchema);
