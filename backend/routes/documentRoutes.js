const express = require('express');
const { protect } = require('../middleware/auth');
const {
  listDocuments,
  uploadDocument,
  getDocument,
  deleteDocument,
  downloadDocumentFile
} = require('../controllers/documentController');
const { createUploadMiddleware, handleMulterError } = require('../middleware/upload');

function buildDocumentRoutes(maxFileSizeBytes) {
  const router = express.Router();
  const upload = createUploadMiddleware(maxFileSizeBytes);

  router.use(protect);

  router.get('/', listDocuments);
  router.post('/upload', upload.single('file'), handleMulterError, uploadDocument);
  router.get('/:id', getDocument);
  router.delete('/:id', deleteDocument);
  router.get('/:id/file', downloadDocumentFile);

  return router;
}

module.exports = buildDocumentRoutes;
