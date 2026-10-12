const mongoose = require('mongoose');

const ALLOWED_EXTENSIONS = ['pdf', 'pptx', 'txt', 'png', 'jpg', 'jpeg'];

const documentSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    originalFilename: { type: String, required: true, trim: true },
    storedFilename: { type: String, required: true, trim: true },
    mimeType: { type: String, required: true, trim: true },
    fileExtension: {
      type: String,
      required: true,
      enum: ALLOWED_EXTENSIONS
    },
    fileSize: { type: Number, required: true, min: 1 },
    storagePath: { type: String, required: true },
    title: { type: String, trim: true },
    subject: { type: String, default: 'General', trim: true },
    uploadStatus: {
      type: String,
      enum: ['uploaded', 'failed'],
      default: 'uploaded'
    },
    processingStatus: {
      type: String,
      enum: ['pending', 'not_implemented', 'complete'],
      default: 'not_implemented'
    },
    extractedPageCount: { type: Number, default: null },
    readProgress: { type: Number, default: 0, min: 0, max: 100 },
    clientMetadata: { type: mongoose.Schema.Types.Mixed, default: null }
  },
  { timestamps: true }
);

documentSchema.index({ owner: 1, createdAt: -1 });

module.exports = mongoose.model('Document', documentSchema);
module.exports.ALLOWED_EXTENSIONS = ALLOWED_EXTENSIONS;
