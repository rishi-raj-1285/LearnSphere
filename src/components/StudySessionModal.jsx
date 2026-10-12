import React, { useState, useEffect } from 'react';

export default function StudySessionModal({ isOpen, onClose, studentProfile, onAddToast }) {
  if (!isOpen) return null;

  const [sessionDuration, setSessionDuration] = useState(25); // minutes
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(studentProfile?.subjects?.[0] || 'Data Structures & Algorithms');
  const [sessionNotes, setSessionNotes] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && secondsLeft === 0) {
      setIsRunning(false);
      setIsCompleted(true);
      if (onAddToast) onAddToast("🎉 Study session completed! Great focus!");
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, onAddToast]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(sessionDuration * 60);
    setIsCompleted(false);
  };

  const handleDurationChange = (mins) => {
    setSessionDuration(mins);
    setIsRunning(false);
    setSecondsLeft(mins * 60);
    setIsCompleted(false);
  };

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px' }}>
        <div className="modal-header">
          <h2 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Focus Study Session
          </h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {/* Subject & Preset */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Subject for this Session</label>
              <select
                className="form-select"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                disabled={isRunning}
              >
                {studentProfile?.subjects?.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Duration Preset</label>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[10, 25, 45].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    className={`btn btn-sm ${sessionDuration === mins ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => handleDurationChange(mins)}
                    disabled={isRunning}
                    style={{ flex: 1 }}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Big Timer Display */}
          <div style={{
            background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
            border: '2px solid var(--color-border-strong)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <div style={{
              fontSize: '3.5rem',
              fontWeight: '800',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-dark-blue)',
              letterSpacing: '2px'
            }}>
              {formatTime(secondsLeft)}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              {isCompleted ? '🎊 Time is up! Session logged.' : isRunning ? '⚡ Focus active — no distractions!' : 'Ready to begin your study sprint'}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
              <button
                type="button"
                className={`btn btn-lg ${isRunning ? 'btn-secondary' : 'btn-primary'}`}
                onClick={handleStartPause}
              >
                {isRunning ? '⏸ Pause Timer' : '▶ Start Focus Session'}
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleReset}
              >
                ↺ Reset
              </button>
            </div>
          </div>

          {/* Session Scratchpad Notes */}
          <div className="form-group">
            <label className="form-label">Session Scratchpad & Key Insights</label>
            <textarea
              className="form-textarea"
              rows="3"
              placeholder="Jot down quick questions, breakthroughs, or formulas to remember..."
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (onAddToast) onAddToast(`Study notes saved for ${selectedSubject}!`);
              onClose();
            }}
          >
            Save Session & Close
          </button>
        </div>
      </div>
    </div>
  );
}
