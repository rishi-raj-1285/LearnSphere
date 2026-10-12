const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new ApiError(500, 'Server authentication is not configured');
  }
  return secret;
}

const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    throw new ApiError(401, 'Authentication required');
  }

  const token = header.slice(7).trim();
  if (!token) {
    throw new ApiError(401, 'Authentication required');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, getJwtSecret());
  } catch {
    throw new ApiError(401, 'Invalid or expired token');
  }

  const user = await User.findById(decoded.sub);
  if (!user) {
    throw new ApiError(401, 'Invalid or expired token');
  }

  req.user = user;
  next();
});

function signToken(userId, expiresIn) {
  return jwt.sign({ sub: userId.toString() }, getJwtSecret(), { expiresIn });
}

module.exports = { protect, signToken };
