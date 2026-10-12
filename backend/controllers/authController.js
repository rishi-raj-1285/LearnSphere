const User = require('../models/User');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');
const { requireFields, validatePassword, normalizeEmail } = require('../middleware/validate');
const { signToken } = require('../middleware/auth');
const { userToStudentProfile } = require('../utils/profileMapper');

const register = asyncHandler(async (req, res) => {
  requireFields(req.body, ['name', 'email', 'password']);
  validatePassword(req.body.password);

  const email = normalizeEmail(req.body.email);
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(409, 'An account with this email already exists');
  }

  const passwordHash = await User.hashPassword(req.body.password);
  const user = await User.create({
    name: String(req.body.name).trim(),
    email,
    passwordHash,
    onboardingCompleted: false
  });

  const token = signToken(user._id, process.env.JWT_EXPIRES_IN || '1d');

  res.status(201).json({
    success: true,
    token,
    user: userToStudentProfile(user)
  });
});

const login = asyncHandler(async (req, res) => {
  requireFields(req.body, ['email', 'password']);

  const email = normalizeEmail(req.body.email);
  const user = await User.findOne({ email }).select('+passwordHash');
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const match = await user.comparePassword(req.body.password);
  if (!match) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = signToken(user._id, process.env.JWT_EXPIRES_IN || '1d');

  res.json({
    success: true,
    token,
    user: userToStudentProfile(user)
  });
});

const me = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    user: userToStudentProfile(req.user)
  });
});

module.exports = { register, login, me };
