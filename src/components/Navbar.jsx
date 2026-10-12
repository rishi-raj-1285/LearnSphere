import React from 'react';

export default function Navbar({
  pageTitle,
  searchTerm,
  setSearchTerm,
  currentLanguage,
  onLanguageChange,
  onOpenStudySession,
  onToggleSidebar,
  studentProfile,
  onNavigateProfile
}) {
  return (
    <header className="top-navbar" role="banner">
      <div className="top-navbar-left">
        <button
          className="menu-toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation drawer"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <h1 className="navbar-page-title">{pageTitle}</h1>
      </div>

      <div className="top-navbar-search">
        <div className="search-input-wrapper">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-strong-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="search"
            placeholder="Search notes, topics, formulas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search content across platform"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{ padding: '2px', color: 'var(--color-text-muted)' }}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="top-navbar-right">
        {/* Language Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <select
            className="lang-selector-select"
            value={currentLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            title="Select platform interface language"
            aria-label="Platform Language"
          >
            <option value="English">🇬🇧 English</option>
            <option value="Hindi">🇮🇳 Hindi (हिन्दी)</option>
            <option value="Tamil">🇮🇳 Tamil (தமிழ்)</option>
          </select>
        </div>

        {/* Start Study Session CTA */}
        <button
          className="start-session-btn"
          onClick={onOpenStudySession}
          aria-label="Start Study Session"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span>Start Study Session</span>
        </button>

        {/* Student Profile Pill */}
        <button
          className="student-profile-pill"
          onClick={onNavigateProfile}
          title="Open student profile and learning preferences"
          aria-label="Student Profile"
        >
          <div className="student-avatar">
            {studentProfile?.name ? studentProfile.name.charAt(0).toUpperCase() : 'S'}
          </div>
          <span className="student-name-short">{studentProfile?.name || 'Student'}</span>
        </button>
      </div>
    </header>
  );
}
