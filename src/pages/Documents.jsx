import React, { useState } from 'react';

export default function Documents({
  documents,
  setDocuments,
  onOpenDocumentStudy,
  onNavigateTab,
  onAddToast,
  onUploadDocument,
  isUploadModalOpen,
  setIsUploadModalOpen
}) {
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('All');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All');
  const [dragOver, setDragOver] = useState(false);

  // Upload State
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadSubject, setUploadSubject] = useState('Data Structures and Algorithms');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Filter documents
  const filteredDocs = documents.filter(doc => {
    const matchSubject = selectedSubjectFilter === 'All' || doc.subject === selectedSubjectFilter;
    const matchType = selectedTypeFilter === 'All' || doc.fileType === selectedTypeFilter;
    return matchSubject && matchType;
  });

  const subjectsList = ['All', ...new Set(documents.map(d => d.subject))];
  const typesList = ['All', 'PDF', 'PPTX', 'TXT', 'IMAGE'];

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileBrowse = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = (file) => {
    setUploadError('');
    const validExtensions = ['pdf', 'ppt', 'pptx', 'txt', 'jpg', 'jpeg', 'png'];
    const ext = file.name.split('.').pop().toLowerCase();

    if (!validExtensions.includes(ext)) {
      setUploadError(`Unsupported file format (.${ext}). Please select PDF, PPTX, TXT, or Image.`);
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setUploadError("File exceeds the 25MB demo upload limit.");
      return;
    }

    setUploadFile(file);
  };

  const startSimulatedUpload = () => {
    if (!uploadFile) return;

    setIsUploading(true);
    setUploadProgress(15);
    setUploadStage('Uploading document to student workspace...');

    setTimeout(() => {
      setUploadProgress(45);
      setUploadStage('Analyzing document structure & indexing pages...');
    }, 600);

    setTimeout(() => {
      setUploadProgress(75);
      setUploadStage('Synthesizing key topics, formulas & definitions (Simulated prototype)...');
    }, 1200);

    setTimeout(() => {
      setUploadProgress(100);
      setUploadStage('Ready! Added to your library.');

      const ext = uploadFile.name.split('.').pop().toUpperCase();
      const newDoc = {
        id: `doc-${Date.now()}`,
        title: uploadFile.name,
        subject: uploadSubject,
        fileType: ext.includes('PPT') ? 'PPTX' : ext.includes('PNG') || ext.includes('JPG') ? 'IMAGE' : ext,
        uploadDate: new Date().toISOString().split('T')[0],
        size: `${(uploadFile.size / (1024 * 1024)).toFixed(1)} MB`,
        pages: Math.max(8, Math.floor(uploadFile.size / 70000)),
        status: "Processed",
        readProgress: 0,
        chapters: [
          { id: "ch-1", title: `Chapter 1: Foundational Principles of ${uploadSubject}`, pages: "1-12" },
          { id: "ch-2", title: `Chapter 2: Structural Breakdown & Methods`, pages: "13-25" }
        ],
        topics: [
          "Core Definitions and Invariants",
          "Methodological Framework",
          "Analytical Complexities",
          "Practical Exam Applications"
        ],
        definitions: [
          {
            term: "Key Concept in " + uploadFile.name.replace(/\.[^/.]+$/, ""),
            definition: "Simulated prototype extraction definition based on selected document.",
            page: 4
          }
        ],
        formulas: [
          {
            name: "Primary Analytical Invariant",
            formula: "f(x) \\le O(g(x))",
            description: "Sample mathematical model extracted for prototype testing.",
            page: 9
          }
        ],
        summaries: {
          onePage: `This newly uploaded document (${uploadFile.name}) has been indexed in your personal study space. In this prototype, our simulated extractor has tagged the main subject as ${uploadSubject}. Real document parsing will automatically extract full text and vector embeddings in production.`,
          detailedChapter: `### Chapter 1: Introduction\nFundamental axioms and terminology.\n\n### Chapter 2: Analysis\nDetailed breakdown of practical applications.`,
          bulletPoints: `• Document uploaded: ${uploadFile.name}\n• Subject: ${uploadSubject}\n• Ready for flashcard and practice question generation.`,
          quickRevision: `⚡ **Quick Overview**:\n1. Uploaded successfully.\n2. Indexed for prototype AI study assistance.\n3. Ready for study sessions.`,
          lastMinuteNotes: `🚨 **Note**: Simulated prototype extraction.`
        },
        diagrams: [],
        syllabusMatch: {
          syllabusName: `${uploadSubject} Standard Core`,
          totalTopics: 6,
          covered: ["Core Definitions", "Methodological Framework"],
          partial: ["Analytical Complexities"],
          missing: ["Advanced Electives"]
        }
      };

      setDocuments([newDoc, ...documents]);
      setIsUploading(false);
      setUploadFile(null);
      setUploadProgress(0);
      setIsUploadModalOpen(false);
      if (onAddToast) onAddToast(`Added "${uploadFile.name}" to library!`);
    }, 1800);
  };

  const cancelUpload = () => {
    setIsUploading(false);
    setUploadFile(null);
    setUploadProgress(0);
    setUploadError('');
  };

  return (
    <div className="documents-page">
      {/* Prototype Notice */}
      <div className="prototype-notice-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="tag">Library</span>
          <span><strong>My Documents</strong>: Frontend file upload with simulated concept indexing. All sample documents pre-loaded for full demonstration.</span>
        </div>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => setIsUploadModalOpen(true)}
        >
          + Upload Notes
        </button>
      </div>

      {/* Upload Trigger Card */}
      <div
        className="card"
        style={{
          border: '2px dashed var(--color-strong-blue)',
          backgroundColor: dragOver ? 'var(--color-surface-hover)' : 'var(--color-surface-light)',
          textAlign: 'center',
          padding: '28px',
          marginBottom: '24px',
          cursor: 'pointer'
        }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleFileDrop}
        onClick={() => setIsUploadModalOpen(true)}
      >
        <div style={{ fontSize: '2.4rem', marginBottom: '8px' }}>📄</div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-dark-blue)' }}>
          Drag & Drop your Study Notes or Click to Upload
        </h3>
        <p style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
          Supports PDFs, PowerPoint slides (.pptx), plain text notes (.txt), and textbook page images (.png, .jpg)
        </p>
        <div style={{ marginTop: '14px' }}>
          <span className="btn btn-primary">Browse Files on Computer</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ marginBottom: '20px', padding: '14px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-dark-blue)' }}>Filter by Subject:</span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {subjectsList.map(sub => (
                <button
                  key={sub}
                  type="button"
                  className={`btn btn-sm ${selectedSubjectFilter === sub ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setSelectedSubjectFilter(sub)}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-secondary)' }}>Format:</span>
            <select
              className="form-select"
              style={{ width: '110px', padding: '4px 8px', fontSize: '0.85rem' }}
              value={selectedTypeFilter}
              onChange={(e) => setSelectedTypeFilter(e.target.value)}
            >
              {typesList.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Documents Grid / Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredDocs.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-secondary)' }}>
            No documents matching the selected filters.
          </div>
        ) : (
          filteredDocs.map((doc) => (
            <div key={doc.id} className="card" style={{ padding: '18px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
                {/* Left Document Meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '280px' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-md)',
                    background: doc.fileType === 'PDF' ? '#EFF6FF' : doc.fileType === 'PPTX' ? '#FFFBEB' : '#ECFDF5',
                    color: doc.fileType === 'PDF' ? '#0284C7' : doc.fileType === 'PPTX' ? '#D97706' : '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    fontWeight: '800'
                  }}>
                    {doc.fileType === 'PPTX' ? '📊' : doc.fileType === 'IMAGE' ? '🖼️' : '📄'}
                  </div>

                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-dark-blue)' }}>
                      {doc.title}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.78rem', color: 'var(--color-text-secondary)', marginTop: '4px', flexWrap: 'wrap' }}>
                      <span className="badge badge-blue">{doc.subject}</span>
                      <span>•</span>
                      <span>{doc.pages} Pages</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>Uploaded {doc.uploadDate}</span>
                      <span>•</span>
                      <span className="badge badge-green">Status: {doc.status}</span>
                    </div>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => onOpenDocumentStudy(doc)}
                    title="Open full interactive study interface"
                  >
                    📖 Open Study Interface
                  </button>

                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      onOpenDocumentStudy(doc);
                    }}
                    title="Generate fast summary"
                  >
                    📑 Summarize
                  </button>

                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      onNavigateTab('workspace');
                    }}
                    title="Ask AI questions about this document"
                  >
                    💬 Ask Question
                  </button>

                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      onNavigateTab('ai-plan');
                    }}
                    title="Generate PDF-based AI study plan"
                  >
                    📋 AI Study Plan
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="modal-backdrop" onClick={() => !isUploading && setIsUploadModalOpen(false)} role="dialog">
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px' }}>
            <div className="modal-header">
              <h2 className="modal-title">Upload Study Document</h2>
              {!isUploading && (
                <button className="icon-btn" onClick={() => setIsUploadModalOpen(false)}>✕</button>
              )}
            </div>

            <div className="modal-body">
              {!isUploading ? (
                <>
                  <div
                    style={{
                      border: '2px dashed var(--color-strong-blue)',
                      backgroundColor: 'var(--color-surface-light)',
                      borderRadius: 'var(--radius-md)',
                      padding: '24px',
                      textAlign: 'center',
                      marginBottom: '16px'
                    }}
                  >
                    <input
                      type="file"
                      id="file-upload-input"
                      style={{ display: 'none' }}
                      accept=".pdf,.pptx,.ppt,.txt,.jpg,.jpeg,.png"
                      onChange={handleFileBrowse}
                    />
                    <label htmlFor="file-upload-input" style={{ cursor: 'pointer' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📂</div>
                      <div style={{ fontWeight: '700', color: 'var(--color-dark-blue)' }}>
                        {uploadFile ? uploadFile.name : "Select or Drop a Document"}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                        {uploadFile ? `${(uploadFile.size / (1024 * 1024)).toFixed(2)} MB ready for indexing` : "PDF, PPTX, TXT, or Textbook Photos up to 25MB"}
                      </div>
                      <span className="btn btn-primary" style={{ display: 'inline-flex', marginTop: '12px' }}>
                        Choose file
                      </span>
                    </label>
                  </div>

                  {uploadError && (
                    <div style={{ color: 'var(--color-danger)', fontSize: '0.85rem', marginBottom: '14px' }}>
                      ⚠️ {uploadError}
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">Subject Category</label>
                    <select
                      className="form-select"
                      value={uploadSubject}
                      onChange={(e) => setUploadSubject(e.target.value)}
                    >
                      <option value="Data Structures and Algorithms">Data Structures and Algorithms</option>
                      <option value="Computer Networks">Computer Networks</option>
                      <option value="Operating Systems">Operating Systems</option>
                      <option value="SQL">SQL</option>
                      <option value="Aptitude">Aptitude</option>
                    </select>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', background: '#F8FAFC', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                    ℹ️ <em>Prototype Note:</em> LearnSphere indexes this document into your local browser session and simulates concept extraction without sending private files to external servers.
                  </div>
                </>
              ) : (
                /* Uploading / Processing Progress */
                <div style={{ padding: '20px 0', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-dark-blue)', marginBottom: '12px' }}>
                    {uploadStage}
                  </div>

                  <div style={{ height: '12px', background: 'var(--color-surface-light)', borderRadius: '6px', overflow: 'hidden', margin: '0 auto 16px', maxWidth: '400px' }}>
                    <div style={{
                      height: '100%',
                      width: `${uploadProgress}%`,
                      background: 'linear-gradient(90deg, var(--color-primary), var(--color-strong-blue))',
                      transition: 'width 0.4s ease'
                    }}></div>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
                    {uploadProgress}% Completed
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              {!isUploading ? (
                <>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      cancelUpload();
                      setIsUploadModalOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={!uploadFile}
                    onClick={startSimulatedUpload}
                  >
                    Upload & Index Notes
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={cancelUpload}
                >
                  Cancel Processing
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
