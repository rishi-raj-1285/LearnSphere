import React, { useState } from 'react';
import { ACTIVE_SUBJECTS } from '../data/initialData';

export default function ProfileSettings({
  activeView = 'profile', // 'profile' or 'settings'
  studentProfile,
  setStudentProfile,
  accessibility,
  updateAccessibility,
  onResetOnboarding,
  onAddToast
}) {
  const [profileForm, setProfileForm] = useState({ ...studentProfile });
  const [activeSubTab, setActiveSubTab] = useState(activeView === 'settings' ? 'accessibility' : 'academic');

  const availableSubjects = ACTIVE_SUBJECTS;

  const formatOptions = [
    'Bilingual Explanations',
    'Step-by-step Examples',
    'Diagrams & Visuals',
    'Text Summaries',
    'Flashcards & Audio'
  ];

  const handleSubjectToggle = (sub) => {
    let subs = [...profileForm.subjects];
    let profs = { ...profileForm.proficiencies };
    if (subs.includes(sub)) {
      if (subs.length > 1) {
        subs = subs.filter(s => s !== sub);
        delete profs[sub];
      }
    } else {
      subs.push(sub);
      profs[sub] = 'Intermediate';
    }
    setProfileForm({ ...profileForm, subjects: subs, proficiencies: profs });
  };

  const handleProficiencyChange = (sub, lvl) => {
    setProfileForm({
      ...profileForm,
      proficiencies: {
        ...profileForm.proficiencies,
        [sub]: lvl
      }
    });
  };

  const handleFormatToggle = (fmt) => {
    let fmts = [...profileForm.preferredFormats];
    if (fmts.includes(fmt)) {
      fmts = fmts.filter(f => f !== fmt);
    } else {
      fmts.push(fmt);
    }
    setProfileForm({ ...profileForm, preferredFormats: fmts });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setStudentProfile(profileForm);
    if (onAddToast) onAddToast("Learning profile and preferences saved!");
  };

  return (
    <div className="profile-settings-page">
      {/* Prototype Notice */}
      <div className="prototype-notice-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="tag">Preferences</span>
          <span><strong>Student Learning Profile & Settings</strong>: All changes are saved locally and immediately calibrate assistant responses.</span>
        </div>
        <button
          className="btn btn-sm btn-outline"
          onClick={onResetOnboarding}
          title="Restart the onboarding wizard"
        >
          🔄 Re-run Onboarding
        </button>
      </div>

      {/* Profile Header Card */}
      <div className="card" style={{ marginBottom: '24px', padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-strong-blue)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              fontWeight: '800'
            }}>
              {profileForm.name ? profileForm.name.charAt(0).toUpperCase() : 'S'}
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--color-dark-blue)' }}>
                {profileForm.name || 'Student'}
              </h2>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                {profileForm.academicLevel} • {profileForm.institution}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-strong-blue)', marginTop: '2px' }}>
                Course: {profileForm.course}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {activeView !== 'settings' && (
              <button
                className={`btn btn-sm ${activeSubTab === 'academic' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setActiveSubTab('academic')}
              >
                🎓 Academic & Subjects
              </button>
            )}
            {activeView !== 'settings' && (
              <button
                className={`btn btn-sm ${activeSubTab === 'languages' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setActiveSubTab('languages')}
              >
                🌐 Languages & Goals
              </button>
            )}
            {activeView === 'settings' && (
              <button
                className={`btn btn-sm ${activeSubTab === 'accessibility' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setActiveSubTab('accessibility')}
              >
                ♿ Accessibility & System
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: Academic & Subjects */}
      {activeSubTab === 'academic' && (
        <form onSubmit={handleSaveProfile} className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">🎓 Academic Information & Subjects</h3>
              <div className="card-subtitle">Keep your curriculum and proficiencies up to date</div>
            </div>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Academic Level</label>
              <select
                className="form-select"
                value={profileForm.academicLevel}
                onChange={(e) => setProfileForm({ ...profileForm, academicLevel: e.target.value })}
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
              <label className="form-label">Institution / College</label>
              <input
                type="text"
                className="form-input"
                value={profileForm.institution}
                onChange={(e) => setProfileForm({ ...profileForm, institution: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Degree & Department</label>
              <input
                type="text"
                className="form-input"
                value={profileForm.course}
                onChange={(e) => setProfileForm({ ...profileForm, course: e.target.value })}
              />
            </div>
          </div>

          {/* Subjects of Interest */}
          <div style={{ marginTop: '20px' }}>
            <label className="form-label" style={{ fontWeight: '700' }}>Active Subjects</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
              {availableSubjects.map(sub => {
                const isSelected = profileForm.subjects.includes(sub);
                return (
                  <button
                    key={sub}
                    type="button"
                    className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => handleSubjectToggle(sub)}
                  >
                    {isSelected ? '✓ ' : '+ '} {sub}
                  </button>
                );
              })}
            </div>

            {/* Proficiency Levels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {profileForm.subjects.map(sub => (
                <div key={sub} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', background: 'var(--color-surface-light)', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontWeight: '600', fontSize: '0.88rem' }}>{sub}</span>
                  <select
                    className="form-select"
                    style={{ width: '150px', padding: '4px 8px', fontSize: '0.82rem' }}
                    value={profileForm.proficiencies?.[sub] || 'Intermediate'}
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
        </form>
      )}

      {/* SUB-TAB 2: Languages & Goals */}
      {activeSubTab === 'languages' && (
        <form onSubmit={handleSaveProfile} className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">🌐 Languages & Learning Goals</h3>
              <div className="card-subtitle">Set your bilingual preferences and study schedule targets</div>
            </div>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Primary Learning Language</label>
              <select
                className="form-select"
                value={profileForm.primaryLanguage}
                onChange={(e) => setProfileForm({ ...profileForm, primaryLanguage: e.target.value })}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi (हिन्दी)</option>
                <option value="Tamil">Tamil (தமிழ்)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Secondary Language for Bilingual Reinforcement</label>
              <select
                className="form-select"
                value={profileForm.secondaryLanguage}
                onChange={(e) => setProfileForm({ ...profileForm, secondaryLanguage: e.target.value })}
              >
                <option value="Hindi">Hindi (हिन्दी)</option>
                <option value="Tamil">Tamil (தமிழ்)</option>
                <option value="English">English</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Learning Goal Overview</label>
            <textarea
              className="form-textarea"
              rows="2"
              value={profileForm.learningGoals}
              onChange={(e) => setProfileForm({ ...profileForm, learningGoals: e.target.value })}
            />
          </div>

          <div className="grid-3" style={{ marginTop: '16px' }}>
            <div className="form-group">
              <label className="form-label">Daily Study Target</label>
              <select
                className="form-select"
                value={profileForm.dailyStudyTime}
                onChange={(e) => setProfileForm({ ...profileForm, dailyStudyTime: e.target.value })}
              >
                <option value="1 hour">1 hour / day</option>
                <option value="2 hours">2 hours / day</option>
                <option value="2.5 hours">2.5 hours / day</option>
                <option value="4+ hours">4+ hours / day</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Study Periods</label>
              <select
                className="form-select"
                value={profileForm.preferredStudyPeriods}
                onChange={(e) => setProfileForm({ ...profileForm, preferredStudyPeriods: e.target.value })}
              >
                <option value="Morning (6 AM - 10 AM)">Morning (6 AM - 10 AM)</option>
                <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                <option value="Evening (6 PM - 9 PM)">Evening (6 PM - 9 PM)</option>
                <option value="Late Night (10 PM - 1 AM)">Late Night (10 PM - 1 AM)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Target Examination Date</label>
              <input
                type="date"
                className="form-input"
                value={profileForm.targetExamDate}
                onChange={(e) => setProfileForm({ ...profileForm, targetExamDate: e.target.value })}
              />
            </div>
          </div>

          {/* Formats Checkbox */}
          <div style={{ marginTop: '16px' }}>
            <label className="form-label" style={{ fontWeight: '700' }}>Preferred Presentation Formats</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {formatOptions.map(fmt => {
                const checked = profileForm.preferredFormats.includes(fmt);
                return (
                  <div
                    key={fmt}
                    onClick={() => handleFormatToggle(fmt)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      background: checked ? 'var(--color-surface-light)' : 'white',
                      border: checked ? '2px solid var(--color-strong-blue)' : '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {}}
                      style={{ accentColor: 'var(--color-strong-blue)' }}
                    />
                    <span style={{ fontSize: '0.84rem', fontWeight: '600' }}>{fmt}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      )}

      {/* SUB-TAB 4: Accessibility & System */}
      {activeSubTab === 'accessibility' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">♿ Accessibility & Visual Settings</h3>
              <div className="card-subtitle">Instant visual adjustments and local state management</div>
            </div>
            <span className="badge badge-green">WCAG Compliant</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* High Contrast */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              background: 'var(--color-surface-light)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)'
            }}>
              <div>
                <strong style={{ color: 'var(--color-dark-blue)' }}>High Contrast Visual Mode</strong>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                  Increases border weight, maximizes foreground-background contrast, and disables soft gradients.
                </div>
              </div>
              <input
                type="checkbox"
                checked={accessibility.highContrast}
                onChange={(e) => updateAccessibility({ ...accessibility, highContrast: e.target.checked })}
                style={{ width: '22px', height: '22px', accentColor: 'var(--color-strong-blue)', cursor: 'pointer' }}
              />
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
