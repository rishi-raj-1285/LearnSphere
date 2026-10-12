import React, { useState } from 'react';

export default function AiPlan({
  documents,
  onOpenDocumentStudy,
  onAddToast,
  studentProfile,
  setStudentProfile
}) {
  const [activeOption, setActiveOption] = useState('pdfPlan'); // 'pdfPlan' or 'mentorPlan'

  // Option 1: PDF Plan State
  const [selectedDocId, setSelectedDocId] = useState(documents[0]?.id || '');
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [pdfPlanResult, setPdfPlanResult] = useState({
    docTitle: documents[0]?.title || "Data Structures & Algorithms - Trees & Graphs.pdf",
    subject: documents[0]?.subject || "Data Structures & Algorithms",
    estimatedHours: "18 Hours total (6 Days @ 3 hrs/day)",
    weeks: [
      {
        phase: "Day 1 - Day 2: Foundations & Core Invariants",
        goals: "Read Chapter 1 & 2 (BST Invariant and Balance Factor formulas)",
        tasks: [
          "Study node insertion & inorder sorted traversal proof",
          "Practice AVL balance factor checks (BF = Height(L) - Height(R))",
          "Solve 5 practice problems on single LL and RR rotations"
        ]
      },
      {
        phase: "Day 3 - Day 4: Complex Traversals & Edge Cases",
        goals: "Master Chapter 3 & 4 (Graph representations, BFS queue, DFS stack)",
        tasks: [
          "Compare Adjacency List O(V+E) vs Adjacency Matrix O(V²)",
          "Dry-run Dijkstra's min-heap algorithm on non-negative weighted graphs",
          "Note down exam traps regarding negative weight edges"
        ]
      },
      {
        phase: "Day 5 - Day 6: Rapid Revision & Final Testing",
        goals: "Complete full chapter self-test and exam cram review",
        tasks: [
          "Review all 4 core formulas and definitions in document library",
          "Summarize time & space complexity bounds table",
          "Timed 45-minute revision sprint"
        ]
      }
    ]
  });

  const selectedDoc = documents.find(d => d.id === selectedDocId) || documents[0];

  const handleGeneratePdfPlan = () => {
    setIsGeneratingPlan(true);
    setTimeout(() => {
      setPdfPlanResult({
        docTitle: selectedDoc?.title || "Uploaded Document",
        subject: selectedDoc?.subject || "Core Curriculum",
        estimatedHours: `${Math.max(12, (selectedDoc?.pages || 20) * 0.4).toFixed(0)} Hours (${Math.max(4, Math.floor((selectedDoc?.pages || 20) / 10))} Days)`,
        weeks: [
          {
            phase: `Days 1–2: High-Yield Topic Exploration (${selectedDoc?.topics?.[0] || 'Core Theory'})`,
            goals: `Deconstruct chapters 1 and 2 from ${selectedDoc?.title}`,
            tasks: [
              `Review introductory concepts and primary definitions`,
              `Understand fundamental invariants and terminology`,
              `Self-check initial understanding with Vidya AI chatbot`
            ]
          },
          {
            phase: `Days 3–4: Advanced Problem Solving & Methods`,
            goals: `Deep dive into formulas and practical applications`,
            tasks: [
              `Derive key analytical formulas and boundary conditions`,
              `Examine step-by-step worked examples`,
              `Analyze syllabus coverage and address missing gaps`
            ]
          },
          {
            phase: `Final Days: Comprehensive Synthesis`,
            goals: `Consolidate takeaways and finalize study notes`,
            tasks: [
              `Review detailed chapter summaries`,
              `Conduct rapid 25-minute study sprint on weak areas`
            ]
          }
        ]
      });
      setIsGeneratingPlan(false);
      if (onAddToast) onAddToast(`Generated AI Study Plan for ${selectedDoc?.title}!`);
    }, 600);
  };

  // Option 2: Study Mentor Plan State
  const mentors = [
    {
      id: "gate",
      exam: "GATE (CS / IT / Engg)",
      mentorName: "Dr. Radhika Iyer",
      credentials: "GATE AIR 14 • PhD IIT Bombay • Ex-IISc Researcher",
      avatarBg: "#0284C7",
      tagline: "Focus heavily on Discrete Math, Data Structures, and Operating Systems before full-length mocks.",
      plan: {
        title: "GATE High-Yield 12-Week Sprint Blueprint",
        phases: [
          {
            name: "Phase 1 (Weeks 1–4): Core Mathematical Foundations",
            details: "Cover Linear Algebra, Discrete Mathematics, and C/Data Structures. Focus on algorithmic proofs and complexity invariants."
          },
          {
            name: "Phase 2 (Weeks 5–8): System Design & Core Engineering",
            details: "Computer Networks, Database Management (Normalization & Transactions), and Operating Systems memory management."
          },
          {
            name: "Phase 3 (Weeks 9–12): Previous Years' Papers (PYQs) & Mocks",
            details: "Solve 15 years of GATE PYQs under strict 3-hour exam conditions. Analyze negative marking errors daily."
          }
        ],
        dailyRoutine: "Morning 2h Theory -> Afternoon 2h Problem Practice -> Evening 1h Rapid Formula Revision",
        goldenRule: "Never skip PYQs. Over 65% of GATE questions are direct conceptual variants of past 10 years' questions."
      }
    },
    {
      id: "cat_iim",
      exam: "CAT / IIM MBA",
      mentorName: "Prof. Amit Verma",
      credentials: "IIM Ahmedabad Alum • 99.85%ile CAT • 8+ Years Mentorship",
      avatarBg: "#7C3AED",
      tagline: "Speed without accuracy is fatal in CAT. Prioritize question selection over attempting 100%.",
      plan: {
        title: "CAT 99+ Percentile Strategic Preparation Plan",
        phases: [
          {
            name: "Phase 1 (Weeks 1–3): Quantitative Arithmetic & Algebra Basics",
            details: "Master Percentages, Profit-Loss, Time-Speed-Distance, and Quadratic Equations. Build mental calculation speed."
          },
          {
            name: "Phase 2 (Weeks 4–7): DILR Sets & Reading Comprehension (VARC)",
            details: "Solve 4 diverse DILR sets daily (Arrangements, Games, Matrix). Read 3 editorial articles daily for comprehension speed."
          },
          {
            name: "Phase 3 (Weeks 8–10): Sectional Strategy & Mock Mocks",
            details: "Take 2 full proctored mocks weekly. Maintain an error journal categorizing mistakes by Conceptual vs Calculation."
          }
        ],
        dailyRoutine: "1h Reading & Vocab -> 2h Quant Sectional Drill -> 1.5h DILR Puzzle Sets",
        goldenRule: "In DILR, spending 4 minutes to choose the right 2 sets will guarantee an 98+ percentile."
      }
    },
    {
      id: "cet",
      exam: "CET / State Entrance",
      mentorName: "Er. Sneha Patil",
      credentials: "State CET Rank 28 • Lead Architect • 5x Mentorship Awardee",
      avatarBg: "#059669",
      tagline: "CET is a test of rapid pace. You need high speed and zero hesitation on formula recall.",
      plan: {
        title: "State CET Top-Rank Speed & Accuracy Plan",
        phases: [
          {
            name: "Phase 1: Syllabus Mastery & Formula Sheets",
            details: "Memorize all direct formulas and shortcuts. Ensure no negative marking traps caught you off guard."
          },
          {
            name: "Phase 2: Timed Topic Drills (60 seconds per question)",
            details: "Train to solve 150 questions in 150 minutes. Eliminate non-essential calculation steps."
          },
          {
            name: "Phase 3: Full Syllabus Mock Tests & Rapid Cramming",
            details: "Daily full-length mock tests with immediate score review."
          }
        ],
        dailyRoutine: "2.5h Speed Practice -> 1h Formula Sheet Recitation -> 1h Mock Analysis",
        goldenRule: "If a question takes more than 75 seconds, skip and flag it. Never let one problem hijack your test flow."
      }
    },
    {
      id: "semester",
      exam: "University Semester Exams",
      mentorName: "Dr. Arvind Joshi",
      credentials: "Senior Dean of Engineering • 18 Years Academic Board Member",
      avatarBg: "#D97706",
      tagline: "University papers award marks for structured steps, clear diagrams, and standard terminology.",
      plan: {
        title: "Semester Exam 9+ CGPA Scoring Blueprint",
        phases: [
          {
            name: "Phase 1: High-Weightage Unit Identification",
            details: "Analyze past 5 semester papers. Identify the 4 units that guarantee 80% of total test marks."
          },
          {
            name: "Phase 2: Step-by-Step Answer Structuring",
            details: "Practice writing full 10-mark answers with introductory definitions, labeled diagrams, and step-by-step proofs."
          },
          {
            name: "Phase 3: 48-Hour Exam Eve Revision",
            details: "Review quick revision summaries and key theorem statements."
          }
        ],
        dailyRoutine: "1.5h Textbook Notes -> 1.5h Writing Model Answers by hand",
        goldenRule: "Underline technical keywords and boxed final answers. Clear handwriting and neat margins maximize examiner scores."
      }
    }
  ];

  const [selectedMentorId, setSelectedMentorId] = useState('gate');
  const activeMentor = mentors.find(m => m.id === selectedMentorId) || mentors[0];

  const handleAdoptPlan = (planTitle) => {
    if (studentProfile && setStudentProfile) {
      setStudentProfile({
        ...studentProfile,
        learningGoals: `Adopted Plan: ${planTitle}`
      });
    }
    if (onAddToast) onAddToast(`Adopted "${planTitle}" as your active study plan!`);
  };

  return (
    <div className="ai-plan-page">
      {/* Prototype Banner */}
      <div className="prototype-notice-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="tag">AI Plan</span>
          <span><strong>AI Study Planning Hub</strong>: Choose between generating a custom plan from your notes or adopting an expert mentor blueprint.</span>
        </div>
      </div>

      {/* Main Two-Option Toggle Header */}
      <div className="card" style={{ marginBottom: '24px', padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`btn ${activeOption === 'pdfPlan' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveOption('pdfPlan')}
            style={{ flex: 1, padding: '14px', fontSize: '1rem', fontWeight: '700' }}
          >
            📄 Option 1: Upload PDF ➔ AI Study Plan
          </button>
          <button
            type="button"
            className={`btn ${activeOption === 'mentorPlan' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveOption('mentorPlan')}
            style={{ flex: 1, padding: '14px', fontSize: '1rem', fontWeight: '700' }}
          >
            🎓 Option 2: Study Mentor Exam Plan (GATE / CAT / CET / Semester)
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* OPTION 1: UPLOAD PDF BASED AI PLAN */}
      {/* ============================================================== */}
      {activeOption === 'pdfPlan' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">📄 PDF-Grounded AI Study Plan</h3>
              <div className="card-subtitle">Select or upload study notes to generate a day-by-day learning roadmap</div>
            </div>
            <span className="badge badge-blue">Document-Based</span>
          </div>

          {/* Select or View PDF */}
          <div style={{
            background: 'var(--color-surface-light)',
            padding: '18px 20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px'
          }}>
            <div style={{ flex: 1, minWidth: '260px' }}>
              <label className="form-label" style={{ fontWeight: '700', marginBottom: '6px' }}>
                Select Study Document:
              </label>
              <select
                className="form-select"
                value={selectedDocId}
                onChange={(e) => setSelectedDocId(e.target.value)}
              >
                {documents.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.title} ({d.pages} pages • {d.subject})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-end' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleGeneratePdfPlan}
                disabled={isGeneratingPlan}
              >
                {isGeneratingPlan ? "Synthesizing Plan..." : "⚡ Generate AI Plan from PDF"}
              </button>
              {selectedDoc && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => onOpenDocumentStudy(selectedDoc)}
                >
                  Open PDF Study Mode
                </button>
              )}
            </div>
          </div>

          {/* Rendered PDF-Based AI Plan */}
          {pdfPlanResult && (
            <div style={{
              background: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '14px', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span className="badge badge-green">Target Syllabus Roadmap</span>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-dark-blue)', marginTop: '4px' }}>
                    {pdfPlanResult.docTitle}
                  </h4>
                  <div style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                    Subject: <strong>{pdfPlanResult.subject}</strong> • Pace: <strong>{pdfPlanResult.estimatedHours}</strong>
                  </div>
                </div>

                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleAdoptPlan(`PDF Plan: ${pdfPlanResult.docTitle}`)}
                >
                  ✓ Set as Active Dashboard Plan
                </button>
              </div>

              {/* Day-by-day Phases */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {pdfPlanResult.weeks.map((week, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '16px 20px',
                      background: '#F8FAFC',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <strong style={{ fontSize: '0.98rem', color: 'var(--color-dark-blue)' }}>
                        {week.phase}
                      </strong>
                      <span className="badge badge-blue">Milestone {idx + 1}</span>
                    </div>

                    <div style={{ fontSize: '0.86rem', color: 'var(--color-strong-blue)', fontWeight: '600', marginBottom: '10px' }}>
                      Objective: {week.goals}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {week.tasks.map((task, tIdx) => (
                        <div key={tIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--color-text-main)' }}>
                          <span style={{ color: 'var(--color-strong-blue)', fontWeight: '700' }}>•</span>
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* OPTION 2: STUDY MENTOR PLAN */}
      {/* ============================================================== */}
      {activeOption === 'mentorPlan' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">🎓 Study Mentor Blueprint</h3>
              <div className="card-subtitle">Step 1: Choose your exam preparation ➔ Step 2: Receive the mentor's curated study strategy</div>
            </div>
            <span className="badge badge-purple">Expert Exam Mentors</span>
          </div>

          {/* Step 1: Select Mentor Grid */}
          <div style={{ marginBottom: '24px' }}>
            <label className="form-label" style={{ fontWeight: '700', marginBottom: '10px' }}>
              Step 1: Select Target Exam & Assigned Mentor
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
              {mentors.map((m) => {
                const isSelected = selectedMentorId === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMentorId(m.id)}
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected ? '2px solid var(--color-strong-blue)' : '1px solid var(--color-border)',
                      backgroundColor: isSelected ? 'var(--color-surface-light)' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? 'var(--shadow-sm)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        backgroundColor: m.avatarBg,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        fontSize: '0.95rem'
                      }}>
                        {m.mentorName.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: '800', fontSize: '0.92rem', color: 'var(--color-dark-blue)' }}>
                          {m.exam}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                          {m.mentorName}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
                      {m.credentials}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Mentor's Curated Study Plan Display */}
          {activeMentor && (
            <div style={{
              background: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              {/* Mentor Header Profile */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--color-border)',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    backgroundColor: activeMentor.avatarBg,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '1.3rem'
                  }}>
                    {activeMentor.mentorName.charAt(0)}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-dark-blue)' }}>
                      {activeMentor.plan.title}
                    </h4>
                    <div style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                      Curated by <strong>{activeMentor.mentorName}</strong> ({activeMentor.credentials})
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={() => handleAdoptPlan(activeMentor.plan.title)}
                >
                  ✓ Adopt Mentor Plan
                </button>
              </div>

              {/* Mentor Advice Box */}
              <div className="explanation-callout" style={{ marginBottom: '20px' }}>
                <strong style={{ color: 'var(--color-dark-blue)' }}>💡 Mentor's Core Strategy: </strong>
                <span>"{activeMentor.tagline}"</span>
              </div>

              {/* 3-Phase Plan Breakdown */}
              <h5 style={{ fontSize: '0.98rem', fontWeight: '700', color: 'var(--color-dark-blue)', marginBottom: '12px' }}>
                Strategic Phases Recommended by Mentor:
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                {activeMentor.plan.phases.map((phase, pIdx) => (
                  <div
                    key={pIdx}
                    style={{
                      padding: '14px 18px',
                      background: '#F8FAFC',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    <strong style={{ fontSize: '0.92rem', color: 'var(--color-dark-blue)' }}>
                      {phase.name}
                    </strong>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', marginTop: '4px', lineHeight: '1.5' }}>
                      {phase.details}
                    </p>
                  </div>
                ))}
              </div>

              {/* Daily Schedule & Golden Rule */}
              <div className="grid-2">
                <div style={{ padding: '14px', background: 'var(--color-surface-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <strong style={{ fontSize: '0.86rem', color: 'var(--color-dark-blue)' }}>⏰ Suggested Daily Rhythm:</strong>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-main)', marginTop: '4px' }}>
                    {activeMentor.plan.dailyRoutine}
                  </div>
                </div>

                <div style={{ padding: '14px', background: '#FFFBEB', borderRadius: 'var(--radius-md)', border: '1px solid #FDE68A' }}>
                  <strong style={{ fontSize: '0.86rem', color: '#92400E' }}>⚡ Golden Rule for {activeMentor.exam}:</strong>
                  <div style={{ fontSize: '0.82rem', color: '#92400E', marginTop: '4px' }}>
                    {activeMentor.plan.goldenRule}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
