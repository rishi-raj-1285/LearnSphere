import React, { useState } from 'react';
import { DIAGNOSTIC_QUIZ_QUESTIONS } from '../data/initialData';

export default function Onboarding({ initialProfile, onCompleteOnboarding }) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    name: initialProfile?.name || '',
    academicLevel: initialProfile?.academicLevel || 'Undergraduate (Year 2)',
    institution: initialProfile?.institution || 'National Institute of Technology',
    course: initialProfile?.course || 'Computer Science & Engineering',
    subjects: initialProfile?.subjects || ['Data Structures & Algorithms', 'Database Management'],
    proficiencies: initialProfile?.proficiencies || {
      'Data Structures & Algorithms': 'Intermediate',
      'Database Management': 'Intermediate'
    },
    primaryLanguage: initialProfile?.primaryLanguage || 'English',
    secondaryLanguage: initialProfile?.secondaryLanguage || 'Hindi',
    preferredFormats: initialProfile?.preferredFormats || ['Bilingual Explanations', 'Step-by-step Examples', 'Diagrams & Visuals'],
    accessibility: initialProfile?.accessibility || {
      textSize: 'normal',
      highContrast: false,
      simplifiedLayout: false,
      voiceSpeed: '1.0x'
    },
    learningGoals: initialProfile?.learningGoals || 'Master core data structures and prepare for semester examinations.',
    goalType: initialProfile?.goalType || 'Prepare for Semester Exams',
    dailyStudyTime: initialProfile?.dailyStudyTime || '2 hours',
    weeklyStudyTime: initialProfile?.weeklyStudyTime || '14 hours',
    preferredStudyPeriods: initialProfile?.preferredStudyPeriods || 'Evening (6 PM - 9 PM)',
    targetExamDate: initialProfile?.targetExamDate || '2026-11-20',
    diagnosticResults: initialProfile?.diagnosticResults || null
  });

  // Diagnostic Quiz State
  const [takingQuiz, setTakingQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const availableSubjects = [
    'Data Structures & Algorithms',
    'Database Management',
    'Computer Networks',
    'Linear Algebra',
    'Biology & Genetics',
    'Economics & Finance',
    'Operating Systems',
    'Discrete Mathematics'
  ];

  const formatOptions = [
    'Bilingual Explanations',
    'Step-by-step Examples',
    'Diagrams & Visuals',
    'Text Summaries',
    'Flashcards & Audio'
  ];

  const handleSubjectToggle = (subject) => {
    let updatedSubjects = [...formData.subjects];
    let updatedProficiencies = { ...formData.proficiencies };

    if (updatedSubjects.includes(subject)) {
      if (updatedSubjects.length > 1) {
        updatedSubjects = updatedSubjects.filter(s => s !== subject);
        delete updatedProficiencies[subject];
      }
    } else {
      updatedSubjects.push(subject);
      updatedProficiencies[subject] = 'Intermediate';
    }

    setFormData({ ...formData, subjects: updatedSubjects, proficiencies: updatedProficiencies });
  };

  const handleProficiencyChange = (subject, level) => {
    setFormData({
      ...formData,
      proficiencies: {
        ...formData.proficiencies,
        [subject]: level
      }
    });
  };

  const handleFormatToggle = (format) => {
    let updated = [...formData.preferredFormats];
    if (updated.includes(format)) {
      updated = updated.filter(f => f !== format);
    } else {
      updated.push(format);
    }
    setFormData({ ...formData, preferredFormats: updated });
  };

  const handleQuizAnswer = (qId, optionIndex) => {
    setQuizAnswers({ ...quizAnswers, [qId]: optionIndex });
  };

  const finishQuiz = () => {
    let correctCount = 0;
    DIAGNOSTIC_QUIZ_QUESTIONS.forEach(q => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const percentage = Math.round((correctCount / DIAGNOSTIC_QUIZ_QUESTIONS.length) * 100);

    const simulatedResults = {
      overallScore: `${percentage}%`,
      estimatedLevel: percentage >= 75 ? 'Proficient' : percentage >= 50 ? 'Intermediate' : 'Foundational',
      note: "Diagnostic Estimate (Adaptive prototype estimate — not a permanent label)",
      "Data Structures & Algorithms": {
        score: `${percentage}%`,
        level: percentage >= 50 ? 'Intermediate' : 'Foundational',
        strengths: ['BST Definitions', 'Graph Traversals'],
        growthAreas: ['Rotation Proofs', 'Time Complexity Invariants']
      }
    };

    setFormData(prev => ({
      ...prev,
      diagnosticResults: simulatedResults
    }));
    setQuizCompleted(true);
  };

  const handleFinish = () => {
    const finalizedProfile = {
      ...formData,
      onboardingCompleted: true
    };
    onCompleteOnboarding(finalizedProfile);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg-main)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px'
    }}>
      <div style={{
        maxWidth: '740px',
        width: '100%',
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden'
      }}>
        {/* Top Progress Banner */}
        <div style={{
          backgroundColor: 'var(--color-surface-light)',
          padding: '20px 28px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                background: 'var(--color-strong-blue)',
                color: 'white',
                fontWeight: '700',
                fontSize: '0.75rem',
                padding: '2px 8px',
                borderRadius: 'var(--radius-sm)'
              }}>
                Step {step} of {totalSteps}
              </span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-dark-blue)' }}>
                {step === 1 && "Academic Information"}
                {step === 2 && "Subjects & Proficiency"}
                {step === 3 && "Languages & Learning Formats"}
                {step === 4 && "Goals & Study Schedule"}
                {step === 5 && "Accessibility & Diagnostic Assessment"}
              </h2>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              Personalize LearnSphere for your coursework and preferred study style.
            </p>
          </div>

          <div style={{
            fontSize: '1.1rem',
            fontWeight: '800',
            color: 'var(--color-strong-blue)',
            fontFamily: 'var(--font-mono)'
          }}>
            {Math.round((step / totalSteps) * 100)}%
          </div>
        </div>

        {/* Step Body */}
        <div style={{ padding: '28px' }}>
          {/* STEP 1: Academic Info */}
          {step === 1 && (
            <div>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Aarav Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Academic Level</label>
                  <select
                    className="form-select"
                    value={formData.academicLevel}
                    onChange={(e) => setFormData({ ...formData, academicLevel: e.target.value })}
                  >
                    <option value="High School (Grade 11-12)">High School (Grade 11-12)</option>
                    <option value="Undergraduate (Year 1)">Undergraduate (Year 1)</option>
                    <option value="Undergraduate (Year 2)">Undergraduate (Year 2)</option>
                    <option value="Undergraduate (Year 3-4)">Undergraduate (Year 3-4)</option>
                    <option value="Postgraduate / Masters">Postgraduate / Masters</option>
                    <option value="Competitive Exam Aspirant">Competitive Exam Aspirant</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Institution / University</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. National Institute of Technology"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Current Degree / Course of Study</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. B.Tech Computer Science & Data Engineering"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* STEP 2: Subjects & Proficiency */}
          {step === 2 && (
            <div>
              <div style={{ marginBottom: '16px' }}>
                <label className="form-label" style={{ fontWeight: '700' }}>Select Your Key Subjects</label>
                <p className="form-help" style={{ marginBottom: '12px' }}>Choose the subjects you will study with LearnSphere.</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {availableSubjects.map((sub) => {
                    const isSelected = formData.subjects.includes(sub);
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => handleSubjectToggle(sub)}
                        className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-outline'}`}
                      >
                        {isSelected ? '✓ ' : '+ '} {sub}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <label className="form-label" style={{ fontWeight: '700' }}>Current Proficiency Level per Subject</label>
                <p className="form-help" style={{ marginBottom: '10px' }}>Helps AI calibrate foundational vs advanced explanations.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {formData.subjects.map((sub) => (
                    <div
                      key={sub}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        background: 'var(--color-surface-light)',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--color-dark-blue)' }}>{sub}</span>
                      <select
                        className="form-select"
                        style={{ width: '160px', padding: '4px 8px', fontSize: '0.85rem' }}
                        value={formData.proficiencies[sub] || 'Intermediate'}
                        onChange={(e) => handleProficiencyChange(sub, e.target.value)}
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Languages & Formats */}
          {step === 3 && (
            <div>
              <div className="grid-2" style={{ marginBottom: '20px' }}>
                <div className="form-group">
                  <label className="form-label">Primary Learning Language</label>
                  <select
                    className="form-select"
                    value={formData.primaryLanguage}
                    onChange={(e) => setFormData({ ...formData, primaryLanguage: e.target.value })}
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi (हिन्दी)</option>
                    <option value="Tamil">Tamil (தமிழ்)</option>
                  </select>
                  <p className="form-help">Main language for summaries, quizzes, and UI.</p>
                </div>

                <div className="form-group">
                  <label className="form-label">Secondary Language (Bilingual Mode)</label>
                  <select
                    className="form-select"
                    value={formData.secondaryLanguage}
                    onChange={(e) => setFormData({ ...formData, secondaryLanguage: e.target.value })}
                  >
                    <option value="Hindi">Hindi (हिन्दी)</option>
                    <option value="Tamil">Tamil (தமிழ்)</option>
                    <option value="English">English</option>
                  </select>
                  <p className="form-help">Used for side-by-side bilingual conceptual reinforcement.</p>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: '700' }}>Preferred Learning Formats</label>
                <p className="form-help" style={{ marginBottom: '10px' }}>Select all presentation modes that help you grasp difficult concepts:</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {formatOptions.map((fmt) => {
                    const checked = formData.preferredFormats.includes(fmt);
                    return (
                      <div
                        key={fmt}
                        onClick={() => handleFormatToggle(fmt)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 14px',
                          border: checked ? '2px solid var(--color-strong-blue)' : '1px solid var(--color-border)',
                          backgroundColor: checked ? 'var(--color-surface-light)' : 'white',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {}} // handled by parent div
                          style={{ accentColor: 'var(--color-strong-blue)' }}
                        />
                        <span style={{ fontWeight: '600', fontSize: '0.88rem' }}>{fmt}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Goals & Schedule */}
          {step === 4 && (
            <div>
              <div className="form-group">
                <label className="form-label">Primary Learning Goal</label>
                <select
                  className="form-select"
                  value={formData.goalType}
                  onChange={(e) => setFormData({ ...formData, goalType: e.target.value })}
                >
                  <option value="Master an Uploaded PDF / Textbook">Master an Uploaded PDF / Textbook</option>
                  <option value="Prepare for Semester Exams">Prepare for Semester Exams</option>
                  <option value="Learn a Subject from Scratch">Learn a Subject from Scratch</option>
                  <option value="Prepare for a Competitive Examination">Prepare for a Competitive Examination</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Specific Goal Details / Milestones</label>
                <textarea
                  className="form-textarea"
                  rows="2"
                  value={formData.learningGoals}
                  onChange={(e) => setFormData({ ...formData, learningGoals: e.target.value })}
                  placeholder="e.g. Master Tree and Graph algorithms before mid-terms and practice 20 questions."
                />
              </div>

              <div className="grid-3" style={{ marginTop: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Daily Study Target</label>
                  <select
                    className="form-select"
                    value={formData.dailyStudyTime}
                    onChange={(e) => setFormData({ ...formData, dailyStudyTime: e.target.value })}
                  >
                    <option value="1 hour">1 hour / day</option>
                    <option value="2 hours">2 hours / day</option>
                    <option value="2.5 hours">2.5 hours / day</option>
                    <option value="4+ hours">4+ hours / day</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Study Time</label>
                  <select
                    className="form-select"
                    value={formData.preferredStudyPeriods}
                    onChange={(e) => setFormData({ ...formData, preferredStudyPeriods: e.target.value })}
                  >
                    <option value="Morning (6 AM - 10 AM)">Morning (6 AM - 10 AM)</option>
                    <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                    <option value="Evening (6 PM - 9 PM)">Evening (6 PM - 9 PM)</option>
                    <option value="Late Night (10 PM - 1 AM)">Late Night (10 PM - 1 AM)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Target Exam Date (Optional)</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.targetExamDate}
                    onChange={(e) => setFormData({ ...formData, targetExamDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Accessibility & Diagnostic Quiz */}
          {step === 5 && (
            <div>
              {/* Accessibility Settings Preview */}
              <div style={{
                backgroundColor: 'var(--color-surface-light)',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                marginBottom: '24px'
              }}>
                <h4 style={{ fontWeight: '700', color: 'var(--color-dark-blue)', marginBottom: '8px' }}>
                  Accessibility Configuration
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '600' }}>Text Size</label>
                    <select
                      className="form-select"
                      style={{ marginTop: '4px' }}
                      value={formData.accessibility.textSize}
                      onChange={(e) => setFormData({
                        ...formData,
                        accessibility: { ...formData.accessibility, textSize: e.target.value }
                      })}
                    >
                      <option value="normal">Standard (15px)</option>
                      <option value="medium">Medium (17px)</option>
                      <option value="large">Large (19px)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '600' }}>High Contrast</label>
                    <select
                      className="form-select"
                      style={{ marginTop: '4px' }}
                      value={formData.accessibility.highContrast ? 'yes' : 'no'}
                      onChange={(e) => setFormData({
                        ...formData,
                        accessibility: { ...formData.accessibility, highContrast: e.target.value === 'yes' }
                      })}
                    >
                      <option value="no">Standard Contrast</option>
                      <option value="yes">High Contrast Mode</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '600' }}>Voice Speed</label>
                    <select
                      className="form-select"
                      style={{ marginTop: '4px' }}
                      value={formData.accessibility.voiceSpeed}
                      onChange={(e) => setFormData({
                        ...formData,
                        accessibility: { ...formData.accessibility, voiceSpeed: e.target.value }
                      })}
                    >
                      <option value="0.8x">0.8x Pacing</option>
                      <option value="1.0x">1.0x Normal</option>
                      <option value="1.2x">1.2x Brisk</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Optional Diagnostic Quiz */}
              <div className="card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-dark-blue)' }}>
                      Optional Diagnostic Knowledge Assessment
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                      Take a 4-question sample quiz to benchmark your starting concepts.
                    </p>
                  </div>
                  <span className="badge badge-blue">Optional</span>
                </div>

                {!takingQuiz && !quizCompleted && (
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#F8FAFC',
                    borderRadius: 'var(--radius-md)',
                    border: '1px dashed var(--color-border)',
                    textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '0.88rem', color: 'var(--color-text-main)', marginBottom: '12px' }}>
                      Results are estimates used solely to personalize study suggestions. They are not permanent labels of your ability!
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setTakingQuiz(true)}
                      >
                        Start 4-Question Diagnostic
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={handleFinish}
                      >
                        Skip Diagnostic & Finish
                      </button>
                    </div>
                  </div>
                )}

                {takingQuiz && !quizCompleted && (
                  <div style={{ marginTop: '14px' }}>
                    {DIAGNOSTIC_QUIZ_QUESTIONS.map((q, idx) => (
                      <div key={q.id} style={{ marginBottom: '16px', paddingBottom: '14px', borderBottom: '1px solid var(--color-border)' }}>
                        <div style={{ fontWeight: '600', fontSize: '0.88rem', color: 'var(--color-dark-blue)', marginBottom: '8px' }}>
                          Q{idx + 1}. ({q.subject}) {q.question}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                          {q.options.map((opt, optIdx) => (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => handleQuizAnswer(q.id, optIdx)}
                              className={`btn btn-sm ${quizAnswers[q.id] === optIdx ? 'btn-primary' : 'btn-outline'}`}
                              style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                            >
                              {String.fromCharCode(65 + optIdx)}. {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => setTakingQuiz(false)}
                      >
                        Cancel Quiz
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={finishQuiz}
                      >
                        Submit Diagnostic
                      </button>
                    </div>
                  </div>
                )}

                {quizCompleted && formData.diagnosticResults && (
                  <div style={{
                    padding: '16px',
                    background: 'var(--color-success-bg)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #A7F3D0',
                    marginTop: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '1.2rem' }}>🎯</span>
                      <strong style={{ color: '#065F46' }}>Diagnostic Score: {formData.diagnosticResults.overallScore}</strong>
                      <span className="badge badge-green">{formData.diagnosticResults.estimatedLevel}</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#047857' }}>
                      {formData.diagnosticResults.note}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div style={{
          padding: '16px 28px',
          backgroundColor: '#F8FAFC',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {step > 1 ? (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setStep(step - 1)}
            >
              ← Back
            </button>
          ) : (
            <div></div>
          )}

          {step < totalSteps ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setStep(step + 1)}
            >
              Continue to Step {step + 1} →
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleFinish}
              style={{ backgroundColor: 'var(--color-dark-blue)' }}
            >
              Complete Setup & Open Dashboard 🎉
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
