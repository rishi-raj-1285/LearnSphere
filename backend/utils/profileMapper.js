/**
 * Maps between MongoDB User documents and the frontend student profile shape.
 */

function mapTextSizeToFrontend(dbSize) {
  const map = { Standard: 'normal', Medium: 'medium', Large: 'large' };
  return map[dbSize] || 'normal';
}

function mapTextSizeToDb(frontendSize) {
  const map = { normal: 'Standard', medium: 'Medium', large: 'Large' };
  return map[frontendSize] || 'Standard';
}

function subjectsArrayToProficiencies(subjects) {
  const proficiencies = {};
  (subjects || []).forEach((s) => {
    proficiencies[s.name] = s.proficiency;
  });
  return proficiencies;
}

function proficienciesToSubjects(subjectsList, proficiencies) {
  return (subjectsList || []).map((name) => ({
    name,
    proficiency: (proficiencies && proficiencies[name]) || 'Intermediate'
  }));
}

function userToStudentProfile(user) {
  if (!user) return null;

  const proficiencies = subjectsArrayToProficiencies(user.subjects);

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    academicLevel: user.academicLevel || '',
    institution: user.institution || '',
    course: user.degreeOrCourse || '',
    subjects: (user.subjects || []).map((s) => s.name),
    proficiencies,
    primaryLanguage: user.primaryLanguage || 'English',
    secondaryLanguage: user.secondaryLanguage || '',
    preferredFormats: user.preferredLearningFormats || [],
    accessibility: {
      textSize: mapTextSizeToFrontend(user.accessibilityPreferences?.fontSize),
      highContrast: Boolean(user.accessibilityPreferences?.highContrast),
      simplifiedLayout: Boolean(user.accessibilityPreferences?.simplifiedLayout),
      voiceSpeed: user.accessibilityPreferences?.voiceSpeed || '1.0x'
    },
    learningGoals: user.learningGoal || '',
    goalType: user.goalType || '',
    dailyStudyTime: user.dailyStudyTarget || '',
    weeklyStudyTime: user.weeklyStudyTime || '',
    preferredStudyPeriods: (user.preferredStudyPeriods || []).join(', ') || '',
    targetExamDate: user.targetExamDate
      ? new Date(user.targetExamDate).toISOString().split('T')[0]
      : '',
    diagnosticResults: user.diagnosticAssessmentResults || null,
    identifiedStrengths: user.identifiedStrengths || [],
    growthAreas: user.growthAreas || [],
    onboardingCompleted: Boolean(user.onboardingCompleted),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

function applyStudentProfilePatch(user, body) {
  if (body.name !== undefined) user.name = String(body.name).trim();
  if (body.email !== undefined) user.email = String(body.email).trim().toLowerCase();
  if (body.academicLevel !== undefined) user.academicLevel = body.academicLevel;
  if (body.institution !== undefined) user.institution = body.institution;
  if (body.course !== undefined) user.degreeOrCourse = body.course;
  if (body.degreeOrCourse !== undefined) user.degreeOrCourse = body.degreeOrCourse;
  if (body.primaryLanguage !== undefined) user.primaryLanguage = body.primaryLanguage;
  if (body.secondaryLanguage !== undefined) user.secondaryLanguage = body.secondaryLanguage;
  if (body.preferredFormats !== undefined) {
    user.preferredLearningFormats = body.preferredFormats;
  }
  if (body.learningGoals !== undefined) user.learningGoal = body.learningGoals;
  if (body.learningGoal !== undefined) user.learningGoal = body.learningGoal;
  if (body.goalType !== undefined) user.goalType = body.goalType;
  if (body.dailyStudyTime !== undefined) user.dailyStudyTarget = body.dailyStudyTime;
  if (body.dailyStudyTarget !== undefined) user.dailyStudyTarget = body.dailyStudyTarget;
  if (body.weeklyStudyTime !== undefined) user.weeklyStudyTime = body.weeklyStudyTime;
  if (body.preferredStudyPeriods !== undefined) {
    user.preferredStudyPeriods = Array.isArray(body.preferredStudyPeriods)
      ? body.preferredStudyPeriods
      : String(body.preferredStudyPeriods)
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
  }
  if (body.targetExamDate !== undefined) {
    user.targetExamDate = body.targetExamDate ? new Date(body.targetExamDate) : null;
  }
  if (body.diagnosticResults !== undefined) {
    user.diagnosticAssessmentResults = body.diagnosticResults;
  }
  if (body.onboardingCompleted !== undefined) {
    user.onboardingCompleted = Boolean(body.onboardingCompleted);
  }
  if (body.identifiedStrengths !== undefined) user.identifiedStrengths = body.identifiedStrengths;
  if (body.growthAreas !== undefined) user.growthAreas = body.growthAreas;

  if (body.subjects !== undefined && body.proficiencies !== undefined) {
    user.subjects = proficienciesToSubjects(body.subjects, body.proficiencies);
  } else if (body.subjects !== undefined) {
    const existing = subjectsArrayToProficiencies(user.subjects);
    user.subjects = proficienciesToSubjects(body.subjects, existing);
  }

  if (body.accessibility !== undefined) {
    user.accessibilityPreferences = user.accessibilityPreferences || {};
    if (body.accessibility.textSize !== undefined) {
      user.accessibilityPreferences.fontSize = mapTextSizeToDb(body.accessibility.textSize);
    }
    if (body.accessibility.highContrast !== undefined) {
      user.accessibilityPreferences.highContrast = Boolean(body.accessibility.highContrast);
    }
    if (body.accessibility.simplifiedLayout !== undefined) {
      user.accessibilityPreferences.simplifiedLayout = Boolean(body.accessibility.simplifiedLayout);
    }
    if (body.accessibility.voiceSpeed !== undefined) {
      user.accessibilityPreferences.voiceSpeed = body.accessibility.voiceSpeed;
    }
  }
}

module.exports = {
  userToStudentProfile,
  applyStudentProfilePatch,
  mapTextSizeToDb,
  proficienciesToSubjects
};
