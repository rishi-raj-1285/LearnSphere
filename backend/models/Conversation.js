const mongoose = require('mongoose');

const MAX_MESSAGES = 500;
const MAX_MESSAGE_LENGTH = 12000;

const sourceRefSchema = new mongoose.Schema(
  {
    document: { type: String, trim: true },
    page: { type: Number, min: 1 },
    excerpt: { type: String, trim: true, maxlength: 2000 }
  },
  { _id: false }
);

const messageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ['user', 'assistant'], required: true },
    text: { type: String, required: true, maxlength: MAX_MESSAGE_LENGTH },
    timestamp: { type: Date, default: Date.now },
    sourceReferences: { type: [sourceRefSchema], default: [] },
    bookmarked: { type: Boolean, default: false },
    clientMessageId: { type: String, trim: true }
  },
  { _id: true }
);

const conversationSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    subject: { type: String, default: 'General', trim: true },
    linkedDocument: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', default: null },
    language: { type: String, default: 'English', trim: true },
    messages: {
      type: [messageSchema],
      default: [],
      validate: {
        validator: (arr) => arr.length <= MAX_MESSAGES,
        message: `Conversation cannot exceed ${MAX_MESSAGES} messages`
      }
    }
  },
  { timestamps: true }
);

conversationSchema.index({ owner: 1, updatedAt: -1 });

module.exports = mongoose.model('Conversation', conversationSchema);
module.exports.MAX_MESSAGES = MAX_MESSAGES;
module.exports.MAX_MESSAGE_LENGTH = MAX_MESSAGE_LENGTH;
