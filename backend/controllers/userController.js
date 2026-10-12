const User = require('../models/User');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');
const { applyStudentProfilePatch, userToStudentProfile, proficienciesToSubjects } = require('../utils/profileMapper');

const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, profile: userToStudentProfile(req.user) });
});

const patchMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, 'User not found');

  applyStudentProfilePatch(user, req.body);
  await user.save();

  res.json({ success: true, profile: userToStudentProfile(user) });
});

const patchPreferences = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, 'User not found');

  if (req.body.primaryLanguage !== undefined) user.primaryLanguage = req.body.primaryLanguage;
  if (req.body.secondaryLanguage !== undefined) user.secondaryLanguage = req.body.secondaryLanguage;
  if (req.body.preferredFormats !== undefined) {
    user.preferredLearningFormats = req.body.preferredFormats;
  }
  if (req.body.preferredLearningFormats !== undefined) {
    user.preferredLearningFormats = req.body.preferredLearningFormats;
  }
  if (req.body.accessibility !== undefined) {
    applyStudentProfilePatch(user, { accessibility: req.body.accessibility });
  }
  if (req.body.learningGoals !== undefined) user.learningGoal = req.body.learningGoals;
  if (req.body.goalType !== undefined) user.goalType = req.body.goalType;
  if (req.body.dailyStudyTime !== undefined) user.dailyStudyTarget = req.body.dailyStudyTime;
  if (req.body.preferredStudyPeriods !== undefined) {
    applyStudentProfilePatch(user, { preferredStudyPeriods: req.body.preferredStudyPeriods });
  }
  if (req.body.targetExamDate !== undefined) {
    applyStudentProfilePatch(user, { targetExamDate: req.body.targetExamDate });
  }

  await user.save();
  res.json({ success: true, profile: userToStudentProfile(user) });
});

const patchSubjects = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, 'User not found');

  if (req.body.subjects && req.body.proficiencies) {
    user.subjects = proficienciesToSubjects(req.body.subjects, req.body.proficiencies);
  } else if (Array.isArray(req.body.subjects)) {
    user.subjects = req.body.subjects.map((s) => {
      if (typeof s === 'string') {
        return { name: s, proficiency: 'Intermediate' };
      }
      return {
        name: s.name,
        proficiency: s.proficiency || 'Intermediate'
      };
    });
  } else {
    throw new ApiError(400, 'Provide subjects and proficiencies');
  }

  await user.save();
  res.json({ success: true, profile: userToStudentProfile(user) });
});

module.exports = { getMe, patchMe, patchPreferences, patchSubjects };
