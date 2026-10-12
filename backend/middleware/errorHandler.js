const ApiError = require('../utils/apiError');

function notFoundHandler(req, res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const isProd = process.env.NODE_ENV === 'production';

  const payload = {
    success: false,
    message: err.message || 'Internal server error'
  };

  if (err.details) {
    payload.details = err.details;
  }

  if (statusCode === 500 && isProd) {
    payload.message = 'Internal server error';
  }

  res.status(statusCode).json(payload);
}

module.exports = { notFoundHandler, errorHandler };
