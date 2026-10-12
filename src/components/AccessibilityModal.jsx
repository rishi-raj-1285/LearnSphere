import React from 'react';

export default function AccessibilityModal({ isOpen, onClose, accessibility, updateAccessibility }) {
  if (!isOpen) return null;

  const handleTextSizeChange = (size) => {
    updateAccessibility({ ...accessibility, textSize: size });
  };

  const handleContrastToggle = (e) => {
    updateAccessibility({ ...accessibility, highContrast: e.target.checked });
  };

  const handleSimplifiedToggle = (e) => {
    updateAccessibility({ ...accessibility, simplifiedLayout: e.target.checked });
  };

  const handleVoiceSpeedChange = (e) => {
    updateAccessibility({ ...accessibility, voiceSpeed: e.target.value });
  };

  const resetDefaults = () => {
    updateAccessibility({
      textSize: 'normal',
      highContrast: false,
      simplifiedLayout: false,
      voiceSpeed: '1.0x'
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-acc-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 id="modal-acc-title" className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
              <path d="M6 10h12"></path>
              <path d="m9 14 3 6 3-6"></path>
            </svg>
            Accessibility Settings
          </h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {/* Text Size */}
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label" style={{ fontWeight: '700' }}>Reading Text Size</label>
            <p className="form-help" style={{ marginBottom: '10px' }}>Adjust interface and reading font size across all modules.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <button
                type="button"
                className={`btn ${accessibility.textSize === 'normal' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => handleTextSizeChange('normal')}
              >
                Standard (15px)
              </button>
              <button
                type="button"
                className={`btn ${accessibility.textSize === 'medium' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => handleTextSizeChange('medium')}
              >
                Medium (17px)
              </button>
              <button
                type="button"
                className={`btn ${accessibility.textSize === 'large' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => handleTextSizeChange('large')}
              >
                Large (19px)
              </button>
            </div>
          </div>

          {/* High Contrast */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px',
            background: 'var(--color-surface-light)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '16px',
            border: '1px solid var(--color-border)'
          }}>
            <div>
              <div style={{ fontWeight: '700', color: 'var(--color-dark-blue)' }}>High Contrast Mode</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                Enhances text contrast and replaces subtle gradients with strong borders.
              </div>
            </div>
            <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={accessibility.highContrast}
                onChange={handleContrastToggle}
                style={{ width: '20px', height: '20px', accentColor: 'var(--color-strong-blue)', cursor: 'pointer' }}
              />
            </label>
          </div>

          {/* Simplified Layout */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px',
            background: 'var(--color-surface-light)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '16px',
            border: '1px solid var(--color-border)'
          }}>
            <div>
              <div style={{ fontWeight: '700', color: 'var(--color-dark-blue)' }}>Simplified Layout Mode</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                Reduces visual clutter, hides decorative banners, and enlarges focus targets.
              </div>
            </div>
            <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={accessibility.simplifiedLayout}
                onChange={handleSimplifiedToggle}
                style={{ width: '20px', height: '20px', accentColor: 'var(--color-strong-blue)', cursor: 'pointer' }}
              />
            </label>
          </div>

          {/* Voice / Read-Aloud Speed */}
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: '700' }}>Voice & Read-Aloud Speed</label>
            <p className="form-help" style={{ marginBottom: '8px' }}>Pacing for synthesized reading of notes and definitions.</p>
            <select
              className="form-select"
              value={accessibility.voiceSpeed}
              onChange={handleVoiceSpeedChange}
            >
              <option value="0.8x">0.8x — Slow & Clear</option>
              <option value="1.0x">1.0x — Normal Academic Speed</option>
              <option value="1.2x">1.2x — Brisk Revision</option>
              <option value="1.5x">1.5x — Fast Review</option>
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-outline" onClick={resetDefaults}>
            Reset to Defaults
          </button>
          <button type="button" className="btn btn-primary" onClick={onClose}>
            Done & Apply
          </button>
        </div>
      </div>
    </div>
  );
}
