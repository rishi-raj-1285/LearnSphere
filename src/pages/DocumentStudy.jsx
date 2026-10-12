import React, { useState } from 'react';
import { generateConceptExplanation, sampleTranslations } from '../data/mockAiResponses';

export default function DocumentStudy({
  document,
  onBack,
  onNavigateTab,
  onAddToast,
  currentLanguage
}) {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary', 'topics', 'explainer', 'translation', 'formulas', 'syllabus'

  // Topic Extraction Accordion State
  const [expandedSections, setExpandedSections] = useState({
    chapters: true,
    concepts: true,
    definitions: true,
    formulas: true
  });

  // Explain a Concept State
  const [selectedExplainerTopic, setSelectedExplainerTopic] = useState(document?.topics?.[0] || 'Core Concepts');
  const [explainerMode, setExplainerMode] = useState('simple');
  const [explainerLanguage, setExplainerLanguage] = useState(currentLanguage || 'English');
  const [explanationResult, setExplanationResult] = useState(() => {
    return generateConceptExplanation(document?.topics?.[0] || 'Core Concepts', 'simple', currentLanguage || 'English');
  });

  // Translation Station State
  const [transLang, setTransLang] = useState('Hindi');

  // Syllabus Coverage Checker State
  const [selectedSyllabus, setSelectedSyllabus] = useState(document?.syllabusMatch?.syllabusName || 'Standard University Syllabus');

  // Citation Modal
  const [activeCitation, setActiveCitation] = useState(null);

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  const handleGenerateExplanation = () => {
    const res = generateConceptExplanation(selectedExplainerTopic, explainerMode, explainerLanguage);
    setExplanationResult(res);
    if (onAddToast) onAddToast(`Generated ${res.mode}!`);
  };

  return (
    <div className="document-study-page">
      {/* Top Bar with Back CTA and Meta */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        padding: '16px 24px',
        marginBottom: '20px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              className="btn btn-sm btn-outline"
              onClick={onBack}
              title="Return to documents library"
            >
              ← Back to Documents
            </button>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-dark-blue)' }}>
                {document.title}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '2px', flexWrap: 'wrap' }}>
                <span className="badge badge-blue">{document.subject}</span>
                <span>•</span>
                <span>{document.pages} Pages</span>
                <span>•</span>
                <span className="badge badge-green">Verified</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onNavigateTab('ai-plan')}
            >
              📋 View AI Plan
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => onNavigateTab('workspace')}
            >
              💬 Ask Vidya
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="tabs-nav" role="tablist">
        <button
          className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('summary')}
          role="tab"
        >
          📖 Detailed Chapter Summary
        </button>
        <button
          className={`tab-btn ${activeTab === 'topics' ? 'active' : ''}`}
          onClick={() => setActiveTab('topics')}
          role="tab"
        >
          🔍 Topic Extraction
        </button>
        <button
          className={`tab-btn ${activeTab === 'explainer' ? 'active' : ''}`}
          onClick={() => setActiveTab('explainer')}
          role="tab"
        >
          💡 Explain a Concept
        </button>
        <button
          className={`tab-btn ${activeTab === 'translation' ? 'active' : ''}`}
          onClick={() => setActiveTab('translation')}
          role="tab"
        >
          🌐 Multilingual Translation
        </button>
        <button
          className={`tab-btn ${activeTab === 'formulas' ? 'active' : ''}`}
          onClick={() => setActiveTab('formulas')}
          role="tab"
        >
          📐 Formulas & Definitions
        </button>
        <button
          className={`tab-btn ${activeTab === 'syllabus' ? 'active' : ''}`}
          onClick={() => setActiveTab('syllabus')}
          role="tab"
        >
          🎯 Syllabus Coverage
        </button>
      </div>

      {/* TAB 1: DETAILED CHAPTER SUMMARY */}
      {activeTab === 'summary' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">📖 Detailed Chapter Summary</h3>
              <div className="card-subtitle">In-depth chapter breakdown grounded in {document.title}</div>
            </div>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => {
                navigator.clipboard?.writeText(document.summaries?.detailedChapter || "");
                if (onAddToast) onAddToast("Summary copied to clipboard!");
              }}
            >
              📋 Copy Summary
            </button>
          </div>

          <div style={{
            padding: '24px',
            backgroundColor: '#F8FAFC',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            lineHeight: '1.75',
            fontSize: '0.94rem',
            whiteSpace: 'pre-line'
          }}>
            {document.summaries?.detailedChapter || "Detailed chapter summary is available for this document."}
          </div>

          <div style={{
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: 'var(--color-text-secondary)'
          }}>
            <span>Source: <strong>{document.title}</strong> (Pages 1–{document.pages})</span>
            <span
              className="citation-pill"
              onClick={() => setActiveCitation({ doc: document.title, page: 1, text: "Comprehensive chapter synthesis verified from original notes." })}
            >
              View Grounded Citation [P. 1]
            </span>
          </div>
        </div>
      )}

      {/* TAB 2: TOPIC EXTRACTION */}
      {activeTab === 'topics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Chapters Accordion */}
          <div className="card">
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
              onClick={() => toggleSection('chapters')}
            >
              <h3 className="card-title">📚 Chapters & Units ({document.chapters?.length || 0})</h3>
              <span>{expandedSections.chapters ? '▲' : '▼'}</span>
            </div>
            {expandedSections.chapters && (
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {document.chapters?.map(ch => (
                  <div key={ch.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--color-surface-light)', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ fontWeight: '600', color: 'var(--color-dark-blue)' }}>{ch.title}</span>
                    <span className="badge badge-blue">Pages {ch.pages}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Subtopics & Key Concepts */}
          <div className="card">
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
              onClick={() => toggleSection('concepts')}
            >
              <h3 className="card-title">🔑 Key Concepts & Extracted Topics ({document.topics?.length || 0})</h3>
              <span>{expandedSections.concepts ? '▲' : '▼'}</span>
            </div>
            {expandedSections.concepts && (
              <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {document.topics?.map((topic, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '8px 14px',
                      background: '#FFFFFF',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span style={{ fontWeight: '600', fontSize: '0.88rem', color: 'var(--color-dark-blue)' }}>{topic}</span>
                    <button
                      className="btn btn-sm btn-secondary"
                      style={{ padding: '2px 8px', fontSize: '0.72rem' }}
                      onClick={() => {
                        setSelectedExplainerTopic(topic);
                        setActiveTab('explainer');
                        const res = generateConceptExplanation(topic, explainerMode, explainerLanguage);
                        setExplanationResult(res);
                      }}
                    >
                      Explain →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: EXPLAIN A CONCEPT */}
      {activeTab === 'explainer' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">💡 Interactive Concept Explainer</h3>
              <div className="card-subtitle">Choose a topic and an explanation format</div>
            </div>
            <span className="badge badge-purple">Adaptive Explainer</span>
          </div>

          <div className="grid-3" style={{ marginBottom: '20px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Select Topic</label>
              <select
                className="form-select"
                value={selectedExplainerTopic}
                onChange={(e) => setSelectedExplainerTopic(e.target.value)}
              >
                {document.topics?.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Format Style</label>
              <select
                className="form-select"
                value={explainerMode}
                onChange={(e) => setExplainerMode(e.target.value)}
              >
                <option value="simple">Simple Explanation (Beginner)</option>
                <option value="stepByStep">Step-by-Step Breakdown</option>
                <option value="examples">With Real-World Examples</option>
                <option value="advanced">Advanced Technical Breakdown</option>
                <option value="bilingual">Bilingual (English + Regional)</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Language</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <select
                  className="form-select"
                  value={explainerLanguage}
                  onChange={(e) => setExplainerLanguage(e.target.value)}
                  style={{ flex: 1 }}
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (Bilingual)</option>
                  <option value="Tamil">Tamil (Bilingual)</option>
                </select>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleGenerateExplanation}
                >
                  Explain
                </button>
              </div>
            </div>
          </div>

          {explanationResult && (
            <div style={{
              background: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px', marginBottom: '16px' }}>
                <div>
                  <span className="badge badge-blue">{explanationResult.mode}</span>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-dark-blue)', marginTop: '4px' }}>
                    {selectedExplainerTopic}
                  </h4>
                  <div style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                    {explanationResult.summary}
                  </div>
                </div>

                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => {
                    navigator.clipboard?.writeText(explanationResult.content);
                    if (onAddToast) onAddToast("Explanation copied!");
                  }}
                >
                  📋 Copy
                </button>
              </div>

              <div style={{ fontSize: '0.94rem', lineHeight: '1.7', whiteSpace: 'pre-line', color: 'var(--color-text-main)' }}>
                {explanationResult.content}
              </div>

              {explanationResult.takeaway && (
                <div className="explanation-callout" style={{ marginTop: '20px' }}>
                  <strong style={{ color: 'var(--color-dark-blue)' }}>💡 Takeaway: </strong>
                  <span>{explanationResult.takeaway}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: MULTILINGUAL TRANSLATION */}
      {activeTab === 'translation' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">🌐 Multilingual Terminology Station</h3>
              <div className="card-subtitle">Technical terminology distinguished in English, Tamil, and Hindi</div>
            </div>
            <span className="badge badge-green">Regional AI</span>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            {['English', 'Hindi', 'Tamil'].map(l => (
              <button
                key={l}
                type="button"
                className={`btn btn-sm ${transLang === l ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setTransLang(l)}
              >
                {l === 'English' ? '🇬🇧 English' : l === 'Hindi' ? '🇮🇳 Hindi (हिन्दी)' : '🇮🇳 Tamil (தமிழ்)'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {Object.entries(sampleTranslations[transLang] || {}).map(([key, value], idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px 20px',
                  background: 'var(--color-surface-light)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <strong style={{ color: 'var(--color-dark-blue)', fontSize: '0.98rem' }}>{key}</strong>
                  <span className="badge badge-blue">Language: {transLang}</span>
                </div>
                <div style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', lineHeight: '1.6' }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: FORMULAS & DEFINITIONS */}
      {activeTab === 'formulas' && (
        <div className="grid-2">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">📐 Key Formulas & Invariants</h3>
              <span className="badge badge-blue">{document.formulas?.length || 0} Entries</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {document.formulas?.map((f, idx) => (
                <div key={idx} style={{ padding: '14px', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'var(--color-dark-blue)', fontSize: '0.9rem' }}>{f.name}</strong>
                    <span className="badge badge-blue">Page {f.page}</span>
                  </div>
                  <div className="formula-block">{f.formula}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                    {f.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">📖 Extracted Definitions</h3>
              <span className="badge badge-purple">{document.definitions?.length || 0} Entries</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {document.definitions?.map((d, idx) => (
                <div key={idx} style={{ padding: '14px', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <strong style={{ color: 'var(--color-dark-blue)', fontSize: '0.9rem' }}>{d.term}</strong>
                    <span className="badge badge-blue">Page {d.page}</span>
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--color-text-main)', lineHeight: '1.5' }}>
                    {d.definition}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: SYLLABUS COVERAGE CHECKER */}
      {activeTab === 'syllabus' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">🎯 Syllabus Coverage & Gap Analyzer</h3>
              <div className="card-subtitle">Compare topics in your notes against official course curriculum</div>
            </div>
            <span className="badge badge-blue">Curriculum Alignment</span>
          </div>

          <div className="form-group" style={{ maxWidth: '450px', marginBottom: '20px' }}>
            <label className="form-label">Active University / Board Syllabus</label>
            <select
              className="form-select"
              value={selectedSyllabus}
              onChange={(e) => setSelectedSyllabus(e.target.value)}
            >
              <option value="University CS201 - Data Structures & Algorithms">University CS201 - Data Structures & Algorithms</option>
              <option value="High School & Pre-Med Molecular Biology Core">High School & Pre-Med Molecular Biology Core</option>
              <option value="Introductory Macroeconomics 101">Introductory Macroeconomics 101</option>
              <option value="Engineering Mathematics II - Linear Algebra">Engineering Mathematics II - Linear Algebra</option>
            </select>
          </div>

          <div className="grid-3" style={{ marginBottom: '24px' }}>
            <div style={{ background: 'var(--color-success-bg)', border: '1px solid #A7F3D0', borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#065F46' }}>
                {document.syllabusMatch?.covered?.length || 0} Topics
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#047857', marginTop: '2px' }}>
                ✓ Fully Covered in Notes
              </div>
            </div>

            <div style={{ background: 'var(--color-warning-bg)', border: '1px solid #FDE68A', borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#92400E' }}>
                {document.syllabusMatch?.partial?.length || 0} Topics
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#B45309', marginTop: '2px' }}>
                ⚡ Partially Covered
              </div>
            </div>

            <div style={{ background: 'var(--color-danger-bg)', border: '1px solid #FECACA', borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#991B1B' }}>
                {document.syllabusMatch?.missing?.length || 0} Topics
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#B91C1C', marginTop: '2px' }}>
                ⚠️ Missing Gaps
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Citation Modal */}
      {activeCitation && (
        <div className="modal-backdrop" onClick={() => setActiveCitation(null)} role="dialog">
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Verified Source Reference</h3>
              <button className="icon-btn" onClick={() => setActiveCitation(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                Document: <strong>{activeCitation.doc}</strong> • Page <strong>{activeCitation.page}</strong>
              </div>
              <div style={{
                padding: '16px',
                background: 'var(--color-surface-light)',
                borderLeft: '4px solid var(--color-strong-blue)',
                fontStyle: 'italic',
                fontSize: '0.92rem',
                lineHeight: '1.6'
              }}>
                "{activeCitation.text}"
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setActiveCitation(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
