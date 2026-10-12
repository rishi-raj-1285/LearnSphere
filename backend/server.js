const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');

const { loadEnv } = require('./config/env');
const { connectDB, isMongoConnected } = require('./config/db');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const buildDocumentRoutes = require('./routes/documentRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const studyPlanRoutes = require('./routes/studyPlanRoutes');
const focusSessionRoutes = require('./routes/focusSessionRoutes');
const progressRoutes = require('./routes/progressRoutes');
const { UPLOAD_ROOT } = require('./services/storageService');

let config;

try {
  config = loadEnv();
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

const app = express();

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      // Browsers omit Origin for same-origin tools such as direct health checks.
      if (!origin) return callback(null, true);

      const configured = new URL(config.clientUrl);
      const allowed = new Set([config.clientUrl]);
      if (configured.hostname === 'localhost') {
        allowed.add(`${configured.protocol}//127.0.0.1${configured.port ? `:${configured.port}` : ''}`);
      } else if (configured.hostname === '127.0.0.1') {
        allowed.add(`${configured.protocol}//localhost${configured.port ? `:${configured.port}` : ''}`);
      }

      if (allowed.has(origin)) return callback(null, true);
      return callback(new Error('Origin not allowed by CORS'));
    },
    credentials: true
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

if (!fs.existsSync(UPLOAD_ROOT)) {
  fs.mkdirSync(UPLOAD_ROOT, { recursive: true });
}

app.get('/api/health', (req, res) => {
  const mongoConnected = isMongoConnected();
  res.status(200).json({
    success: true,
    api: 'running',
    mongodb: mongoConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/documents', buildDocumentRoutes(config.maxFileSizeBytes));
app.use('/api/conversations', conversationRoutes);
app.use('/api/study-plans', studyPlanRoutes);
app.use('/api/focus-sessions', focusSessionRoutes);
app.use('/api/progress', progressRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

async function start() {
  try {
    await connectDB(config.mongodbUri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    console.error('Server will start but database-dependent routes may fail until MongoDB is available.');
  }

  app.listen(config.port, () => {
    console.log(`LearnSphere API listening on port ${config.port}`);
    console.log(`CORS origin: ${config.clientUrl}`);
  });
}

start();

module.exports = app;
