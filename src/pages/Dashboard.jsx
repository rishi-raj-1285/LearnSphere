import React, { useState } from 'react';

export default function Dashboard({
  studentProfile,
  documents,
  conversations,
  onNavigateTab,
  onOpenDocumentStudy,
  onOpenStudySession,
  onTriggerUpload
}) {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Revise AVL Tree Left-Right (LR) Rotations", subject: "Data Structures", completed: true, time: "20 min" },
    { id: 2, text: "Follow Milestone 1 of PDF AI Study Plan", subject: "Data Structures", completed: false, time: "30 min" },
    { id: 3, text: "Practice SQL joins and query optimization", subject: "SQL", completed: false, time: "25 min" },
    { id: 4, text: "Review Computer Networks routing concepts", subject: "Computer Networks", completed: false, time: "15 min" }
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const primaryDoc = documents[0];

  return (
    <div className="dashboard-page">
      {/* Prototype Notice */}
      <div className="prototype-notice-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="tag">Prototype</span>
          <span><strong>LearnSphere Student Portal</strong>: Connected to your active course materials and simulated AI learning assistant.</span>
        </div>
        <button
          className="btn btn-sm btn-outline"
          onClick={() => onNavigateTab('profile')}
        >
          Customize Goals
        </button>
      </div>

      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0284C7 0%, #075985 100%)',
        color: 'white',
        borderRadius: 'var(--radius-lg)',
        padding: '28px',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.9, fontWeight: '700' }}>
            Welcome back, {studentProfile?.name || 'Student'} 👋
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '6px', letterSpacing: '-0.02em' }}>
            Ready to master {studentProfile?.subjects?.[0] || 'Data Structures'} today?
          </h2>
          <p style={{ opacity: 0.9, fontSize: '0.95rem', marginTop: '6px', maxWidth: '650px' }}>
            Target: <strong>{studentProfile?.learningGoals || 'Semester 4 Exam Preparation'}</strong>. Your next revision checkpoint is scheduled for this evening.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn"
            style={{ backgroundColor: 'white', color: 'var(--color-dark-blue)', fontWeight: '700' }}
            onClick={onOpenStudySession}
          >
            ⏱ Start 25m Sprint
          </button>
          <button
            className="btn"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.4)' }}
            onClick={() => onNavigateTab('workspace')}
          >
            🤖 Chat with Vidya
          </button>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="card" style={{ marginBottom: '24px', padding: '16px 20px' }}>
        <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginBottom: '12px' }}>
          Quick Learning Actions
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          <button
            className="btn btn-secondary"
            onClick={onTriggerUpload}
            style={{ padding: '12px', justifyContent: 'flex-start' }}
          >
            <span style={{ fontSize: '1.2rem' }}>📤</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: '700', fontSize: '0.88rem' }}>Upload Notes</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>PDF, PPTX, or Image</div>
            </div>
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => onNavigateTab('workspace')}
            style={{ padding: '12px', justifyContent: 'flex-start' }}
          >
            <span style={{ fontSize: '1.2rem' }}>🤖</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: '700', fontSize: '0.88rem' }}>Chat with Vidya</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>AI Study Chatbot</div>
            </div>
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => {
              if (primaryDoc) onOpenDocumentStudy(primaryDoc);
            }}
            style={{ padding: '12px', justifyContent: 'flex-start' }}
          >
            <span style={{ fontSize: '1.2rem' }}>📑</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: '700', fontSize: '0.88rem' }}>Document Study</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>Detailed Chapter Summary</div>
            </div>
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => onNavigateTab('ai-plan')}
            style={{ padding: '12px', justifyContent: 'flex-start' }}
          >
            <span style={{ fontSize: '1.2rem' }}>📋</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: '700', fontSize: '0.88rem' }}>AI Plan & Mentors</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>PDF & Exam Blueprints</div>
            </div>
          </button>
        </div>
      </div>

      {/* Progress Cards Row */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--color-surface-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: 'var(--color-strong-blue)' }}>
            ⏳
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-dark-blue)' }}>14.5 hrs</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Study Time this week</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: '#059669' }}>
            🎯
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-dark-blue)' }}>24 Topics</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Covered & Retained</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: '#D97706' }}>
            🔥
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-dark-blue)' }}>5 Days</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Daily Study Streak</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }} onClick={() => onNavigateTab('ai-plan')}>
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: '#7C3AED' }}>
            📋
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-dark-blue)' }}>AI Plan</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>PDF & Mentor Roadmaps →</div>
          </div>
        </div>
      </div>

      {/* Main Content 2-Column Grid */}
      <div className="grid-2" style={{ marginBottom: '24px' }}>
        {/* Left Column: Continue Learning & Today's Study Plan */}
        <div>
          {/* Continue Learning */}
          {primaryDoc && (
            <div className="card" style={{ marginBottom: '20px' }}>
              <div className="card-header">
                <div>
                  <h3 className="card-title">📖 Continue Learning</h3>
                  <div className="card-subtitle">Jump back into your last opened document</div>
                </div>
                <span className="badge badge-blue">{primaryDoc.subject}</span>
              </div>

              <div style={{
                padding: '16px',
                background: 'var(--color-surface-light)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '14px'
              }}>
                <div style={{ fontWeight: '700', fontSize: '0.98rem', color: 'var(--color-dark-blue)' }}>
                  {primaryDoc.title}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                  Currently studying: <strong>Chapter 2: Self-Balancing Trees (AVL)</strong>
                </div>

                <div style={{ marginTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                    <span>Study Progress</span>
                    <strong>{primaryDoc.readProgress}% Completed</strong>
                  </div>
                  <div style={{ height: '8px', background: '#DBEAFE', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${primaryDoc.readProgress}%`, background: 'var(--color-strong-blue)', borderRadius: '4px' }}></div>
                  </div>
                </div>
              </div>

              <button
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => onOpenDocumentStudy(primaryDoc)}
              >
                Open Study Interface →
              </button>
            </div>
          )}

          {/* Today's Study Plan */}
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">📅 Today's Study Plan</h3>
                <div className="card-subtitle">Based on your {studentProfile?.dailyStudyTime || '2.5 hours'} daily target</div>
              </div>
              <span className="badge badge-green">
                {tasks.filter(t => t.completed).length} / {tasks.length} Done
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: task.completed ? '#F8FAFC' : 'white',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {}}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--color-strong-blue)', cursor: 'pointer' }}
                    />
                    <div>
                      <div style={{
                        fontSize: '0.88rem',
                        fontWeight: '600',
                        color: task.completed ? 'var(--color-text-muted)' : 'var(--color-text-main)',
                        textDecoration: task.completed ? 'line-through' : 'none'
                      }}>
                        {task.text}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)' }}>
                        {task.subject}
                      </div>
                    </div>
                  </div>
                  <span className="badge badge-blue">{task.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Topic Progress & Spaced Repetition */}
        <div>
          {/* Topic-Wise Progress */}
          <div className="card" style={{ marginBottom: '20px' }}>
            <div className="card-header">
              <div>
                <h3 className="card-title">📊 Subject Mastery Overview</h3>
                <div className="card-subtitle">Estimated proficiency based on notes and quizzes</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600', color: 'var(--color-dark-blue)' }}>Data Structures and Algorithms</span>
                  <span style={{ fontWeight: '700', color: 'var(--color-strong-blue)' }}>78%</span>
                </div>
                <div style={{ height: '7px', background: 'var(--color-surface-light)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '78%', background: 'var(--color-strong-blue)' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600', color: 'var(--color-dark-blue)' }}>Operating Systems</span>
                  <span style={{ fontWeight: '700', color: 'var(--color-strong-blue)' }}>85%</span>
                </div>
                <div style={{ height: '7px', background: 'var(--color-surface-light)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '85%', background: '#10B981' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600', color: 'var(--color-dark-blue)' }}>Computer Networks</span>
                  <span style={{ fontWeight: '700', color: 'var(--color-strong-blue)' }}>60%</span>
                </div>
                <div style={{ height: '7px', background: 'var(--color-surface-light)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '60%', background: '#F59E0B' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600', color: 'var(--color-dark-blue)' }}>SQL</span>
                  <span style={{ fontWeight: '700', color: 'var(--color-strong-blue)' }}>72%</span>
                </div>
                <div style={{ height: '7px', background: 'var(--color-surface-light)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '72%', background: '#8B5CF6' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Spaced Revision Tasks */}
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">🔁 Spaced Revision Schedule</h3>
                <div className="card-subtitle">AI-timed reviews to maximize long-term retention</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--color-surface-light)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--color-dark-blue)' }}>
                    AVL Rotations & Proofs
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)' }}>
                    Last reviewed 3 days ago
                  </div>
                </div>
                <span className="badge badge-amber">Due in 2 days</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--color-surface-light)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--color-dark-blue)' }}>
                    Dijkstra's Min-Heap Proof
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)' }}>
                    Last reviewed 1 day ago
                  </div>
                </div>
                <span className="badge badge-blue">Due in 4 days</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--color-surface-light)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--color-dark-blue)' }}>
                    Rank-Nullity Theorem & Basis
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)' }}>
                    Last reviewed 5 days ago
                  </div>
                </div>
                <span className="badge badge-green">Due next week</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Documents & Conversations */}
      <div className="grid-2">
        {/* Recent Documents */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">📁 Recent Study Documents</h3>
              <div className="card-subtitle">{documents.length} materials in library</div>
            </div>
            <button className="btn btn-sm btn-outline" onClick={() => onNavigateTab('documents')}>
              View All
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {documents.slice(0, 3).map((doc) => (
              <div
                key={doc.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'white'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  <span style={{ fontSize: '1.2rem' }}>
                    {doc.fileType === 'PPTX' ? '📊' : '📄'}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: '700', fontSize: '0.86rem', color: 'var(--color-dark-blue)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {doc.title}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)' }}>
                      {doc.pages} pages • {doc.subject}
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => onOpenDocumentStudy(doc)}
                >
                  Study Mode
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Conversations */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">💬 Recent Study Chats</h3>
              <div className="card-subtitle">Continue previous AI inquiry threads</div>
            </div>
            <button className="btn btn-sm btn-outline" onClick={() => onNavigateTab('conversations')}>
              Browse All
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {conversations.slice(0, 3).map((conv) => (
              <div
                key={conv.id}
                onClick={() => onNavigateTab('workspace', conv.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.86rem', color: 'var(--color-dark-blue)' }}>
                    {conv.title}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)' }}>
                    {conv.subject} • {conv.language}
                  </div>
                </div>
                <span className="btn btn-sm btn-outline">
                  Open →
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
