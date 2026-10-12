function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function extensionToFileType(ext) {
  const map = {
    pdf: 'PDF',
    pptx: 'PPTX',
    txt: 'TXT',
    png: 'IMAGE',
    jpg: 'IMAGE',
    jpeg: 'IMAGE'
  };
  return map[ext] || ext.toUpperCase();
}

function documentToFrontend(doc) {
  const meta = doc.clientMetadata || {};
  const ext = doc.fileExtension;

  return {
    id: doc._id.toString(),
    backendId: doc._id.toString(),
    isUserUpload: true,
    title: doc.title || doc.originalFilename,
    subject: doc.subject,
    fileType: extensionToFileType(ext),
    uploadDate: doc.createdAt ? doc.createdAt.toISOString().split('T')[0] : '',
    size: formatFileSize(doc.fileSize),
    pages: doc.extractedPageCount || meta.pages || null,
    status: doc.processingStatus === 'not_implemented' ? 'Uploaded (processing not implemented)' : doc.processingStatus,
    readProgress: doc.readProgress || 0,
    processingNote: 'Document content extraction and AI indexing are not implemented yet.',
    ...meta
  };
}

module.exports = { documentToFrontend, formatFileSize, extensionToFileType };
