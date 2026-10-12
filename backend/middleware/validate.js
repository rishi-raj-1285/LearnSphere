const ApiError = require('../utils/apiError');

function requireFields(body, fields) {
  const missing = fields.filter(
    (f) => body[f] === undefined || body[f] === null || String(body[f]).trim() === ''
  );
  if (missing.length > 0) {
    throw new ApiError(400, `Missing required fields: ${missing.join(', ')}`);
  }
}

function validatePassword(password) {
  if (!password || String(password).length < 8) {
    throw new ApiError(400, 'Password must be at least 8 characters long');
  }
  if (String(password).length > 128) {
    throw new ApiError(400, 'Password is too long');
  }
}

function normalizeEmail(email) {
  return String(email).trim().toLowerCase();
}

module.exports = { requireFields, validatePassword, normalizeEmail };
