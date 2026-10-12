const path = require('path');
const multer = require('multer');
const ApiError = require('../utils/apiError');
const { ensureUploadDir, buildSafeStoredFilename } = require('../services/storageService');
const DocumentModel = require('../models/Document');

function createUploadMiddleware(maxFileSizeBytes) {
  const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      try {
        if (!req.user) {
          return cb(new ApiError(401, 'Authentication required'));
        }
        const dir = await ensureUploadDir(req.user._id);
        cb(null, dir);
      } catch (err) {
        cb(err);
      }
    },
    filename: (req, file, cb) => {
      cb(null, buildSafeStoredFilename(file.originalname));
    }
  });

  function fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase().replace(/^\./, '');
    if (!DocumentModel.ALLOWED_EXTENSIONS.includes(ext)) {
      return cb(new ApiError(400, `Unsupported file type: .${ext}`));
    }
    cb(null, true);
  }

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: maxFileSizeBytes, files: 1 }
  });
}

function handleMulterError(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return next(new ApiError(400, 'File exceeds maximum allowed size'));
    }
    return next(new ApiError(400, err.message));
  }
  return next(err);
}

module.exports = { createUploadMiddleware, handleMulterError };
