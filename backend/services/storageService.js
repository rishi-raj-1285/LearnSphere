const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const UPLOAD_ROOT = path.join(__dirname, '..', 'uploads');

async function ensureUploadDir(userId) {
  const dir = path.join(UPLOAD_ROOT, String(userId));
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

function buildSafeStoredFilename(originalName) {
  const ext = path.extname(originalName).toLowerCase().replace(/^\./, '');
  const safeExt = ext.replace(/[^a-z0-9]/gi, '').slice(0, 10);
  const id = crypto.randomBytes(16).toString('hex');
  return `${id}${safeExt ? `.${safeExt}` : ''}`;
}

function resolveUserFilePath(userId, storedFilename) {
  const base = path.join(UPLOAD_ROOT, String(userId));
  const resolved = path.resolve(base, storedFilename);
  if (!resolved.startsWith(path.resolve(base) + path.sep) && resolved !== path.resolve(base)) {
    throw new Error('Invalid file path');
  }
  return resolved;
}

async function deleteStoredFile(userId, storedFilename) {
  try {
    const filePath = resolveUserFilePath(userId, storedFilename);
    await fs.unlink(filePath);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }
}

module.exports = {
  UPLOAD_ROOT,
  ensureUploadDir,
  buildSafeStoredFilename,
  resolveUserFilePath,
  deleteStoredFile
};
