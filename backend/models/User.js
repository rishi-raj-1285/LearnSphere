const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    proficiency: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate'
    }
  },
  { _id: false }
);

const accessibilitySchema = new mongoose.Schema(
  {
    fontSize: {
      type: String,
      enum: ['Standard', 'Medium', 'Large'],
      default: 'Standard'
    },
    highContrast: { type: Boolean, default: false },
    simplifiedLayout: { type: Boolean, default: false },
    voiceSpeed: { type: String, default: '1.0x' }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254
    },
    passwordHash: { type: String, required: true, select: false },
    academicLevel: { type: String, default: '', trim: true },
    institution: { type: String, default: '', trim: true },
    degreeOrCourse: { type: String, default: '', trim: true },
    subjects: { type: [subjectSchema], default: [] },
    primaryLanguage: { type: String, default: 'English', trim: true },
    secondaryLanguage: { type: String, default: '', trim: true },
    preferredLearningFormats: { type: [String], default: [] },
    learningGoal: { type: String, default: '', trim: true },
    goalType: { type: String, default: '', trim: true },
    dailyStudyTarget: { type: String, default: '', trim: true },
    weeklyStudyTime: { type: String, default: '', trim: true },
    preferredStudyPeriods: { type: [String], default: [] },
    targetExamDate: { type: Date, default: null },
    accessibilityPreferences: {
      type: accessibilitySchema,
      default: () => ({})
    },
    diagnosticAssessmentResults: { type: mongoose.Schema.Types.Mixed, default: null },
    identifiedStrengths: { type: [String], default: [] },
    growthAreas: { type: [String], default: [] },
    onboardingCompleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function comparePassword(plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

userSchema.statics.hashPassword = async function hashPassword(plain) {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(plain, salt);
};

module.exports = mongoose.model('User', userSchema);
