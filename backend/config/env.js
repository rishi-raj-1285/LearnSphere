require('dotenv').config();

const REQUIRED = ['MONGODB_URI', 'JWT_SECRET'];

function loadEnv() {
  const missing = REQUIRED.filter((key) => !process.env[key] || String(process.env[key]).trim() === '');

  if (missing.length > 0) {
    const message = `Missing required environment variables: ${missing.join(', ')}. Copy backend/.env.example to backend/.env and set values.`;
    const err = new Error(message);
    err.statusCode = 500;
    throw err;
  }

  const port = Number(process.env.PORT) || 5000;
  const maxFileSizeMb = Number(process.env.MAX_FILE_SIZE_MB) || 10;

  return {
    port,
    mongodbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
    maxFileSizeMb,
    maxFileSizeBytes: maxFileSizeMb * 1024 * 1024,
    nodeEnv: process.env.NODE_ENV || 'development'
  };
}

module.exports = { loadEnv };
