const path = require('path');
const fs = require('fs');
const Document = require('../models/Document');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');
const { documentToFrontend } = require('../services/documentMapper');
const { deleteStoredFile, resolveUserFilePath } = require('../services/storageService');

const MIME_MAP = {
  pdf: ['application/pdf'],
  pptx: ['application/vnd.openxmlformats-officedocument.presentationml.presentation'],
  txt: ['text/plain'],
  png: ['image/png'],
  jpg: ['image/jpeg'],
  jpeg: ['image/jpeg']
};

function validateMime(ext, mime) {
  const allowed = MIME_MAP[ext];
  if (!allowed) return false;
  if (!mime) return true;
  return allowed.includes(mime);
}

const listDocuments = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 20));
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Document.find({ owner: req.user._id }).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Document.countDocuments({ owner: req.user._id })
  ]);

  res.json({
    success: true,
    data: items.map(documentToFrontend),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) }
  });
});

const getDocument = asyncHandler(async (req, res) => {
  const doc = await Document.findOne({ _id: req.params.id, owner: req.user._id });
  if (!doc) throw new ApiError(404, 'Document not found');
  res.json({ success: true, data: documentToFrontend(doc) });
});

const uploadDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'No file uploaded. Use field name "file".');
  }

  const ext = path.extname(req.file.originalname).toLowerCase().replace(/^\./, '');
  if (!validateMime(ext, req.file.mimetype)) {
    await deleteStoredFile(req.user._id, req.file.filename);
    throw new ApiError(400, 'File MIME type does not match extension');
  }

  const subject = req.body.subject ? String(req.body.subject).trim() : 'General';
  const title = req.body.title ? String(req.body.title).trim() : req.file.originalname;

  const document = await Document.create({
    owner: req.user._id,
    originalFilename: req.file.originalname,
    storedFilename: req.file.filename,
    mimeType: req.file.mimetype,
    fileExtension: ext,
    fileSize: req.file.size,
    storagePath: req.file.path,
    title,
    subject,
    uploadStatus: 'uploaded',
    processingStatus: 'not_implemented',
    clientMetadata: {
      chapters: [],
      topics: [],
      definitions: [],
      formulas: [],
      summaries: {},
      diagrams: [],
      syllabusMatch: null
    }
  });

  res.status(201).json({
    success: true,
    data: documentToFrontend(document),
    message: 'File uploaded. AI document processing is not implemented yet.'
  });
});

const deleteDocument = asyncHandler(async (req, res) => {
  const doc = await Document.findOne({ _id: req.params.id, owner: req.user._id });
  if (!doc) throw new ApiError(404, 'Document not found');

  await deleteStoredFile(req.user._id, doc.storedFilename);
  await doc.deleteOne();

  res.json({ success: true, message: 'Document deleted' });
});

const downloadDocumentFile = asyncHandler(async (req, res) => {
  const doc = await Document.findOne({ _id: req.params.id, owner: req.user._id });
  if (!doc) throw new ApiError(404, 'Document not found');

  let filePath;
  try {
    filePath = resolveUserFilePath(req.user._id, doc.storedFilename);
  } catch {
    throw new ApiError(400, 'Invalid file reference');
  }

  if (!fs.existsSync(filePath)) {
    throw new ApiError(404, 'File not found on server');
  }

  res.setHeader('Content-Type', doc.mimeType);
  res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(doc.originalFilename)}"`);
  fs.createReadStream(filePath).pipe(res);
});

module.exports = {
  listDocuments,
  getDocument,
  uploadDocument,
  deleteDocument,
  downloadDocumentFile,
  validateMime
};
