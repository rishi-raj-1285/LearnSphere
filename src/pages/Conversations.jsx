import React, { useState } from 'react';

export default function Conversations({
  conversations,
  setConversations,
  onOpenConversationInWorkspace,
  onAddToast
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [editingConv, setEditingConv] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const subjects = ['All', ...new Set(conversations.map(c => c.subject))];

  const filteredConversations = conversations.filter(c => {
    const matchesSubject = selectedSubject === 'All' || c.subject === selectedSubject;
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.documentTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const handleStartRename = (conv) => {
    setEditingConv(conv);
    setNewTitle(conv.title);
  };

  const handleSaveRename = () => {
    if (!newTitle.trim()) return;
    setConversations(conversations.map(c => {
      if (c.id === editingConv.id) {
        return { ...c, title: newTitle.trim() };
      }
      return c;
    }));
    setEditingConv(null);
    if (onAddToast) onAddToast("Conversation renamed successfully!");
  };

  const handleDelete = (id) => {
    setConversations(conversations.filter(c => c.id !== id));
    setDeletingId(null);
    if (onAddToast) onAddToast("Study conversation deleted");
  };

  const formatDate = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return "Recent";
    }
  };

  return (
    <div className="conversations-page">
      {/* Prototype Notice */}
      <div className="prototype-notice-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="tag">History</span>
          <span><strong>Study Conversations Archive</strong>: Reopen prior learning dialogues, rename threads, or filter by topic.</span>
        </div>
        <span className="badge badge-blue">{conversations.length} Saved Sessions</span>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ marginBottom: '20px', padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '240px' }}>
            <div className="search-input-wrapper" style={{ width: '100%', maxWidth: '340px' }}>
              <input
                type="text"
                placeholder="Search conversations by title or topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-dark-blue)' }}>Subject:</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {subjects.map(sub => (
                <button
                  key={sub}
                  type="button"
                  className={`btn btn-sm ${selectedSubject === sub ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setSelectedSubject(sub)}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredConversations.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-secondary)' }}>
            No conversations found matching your search.
          </div>
        ) : (
          filteredConversations.map((conv) => (
            <div key={conv.id} className="card" style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-dark-blue)' }}>
                      {conv.title}
                    </h3>
                    <button
                      className="icon-btn"
                      style={{ padding: '2px 6px', fontSize: '0.75rem' }}
                      onClick={() => handleStartRename(conv)}
                      title="Rename conversation"
                    >
                      ✏️ Rename
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '4px', flexWrap: 'wrap' }}>
                    <span className="badge badge-blue">{conv.subject}</span>
                    <span>•</span>
                    <span>Doc: <strong>{conv.documentTitle}</strong></span>
                    <span>•</span>
                    <span>Lang: <strong>{conv.language}</strong></span>
                    <span>•</span>
                    <span>{conv.messages?.length || 0} messages</span>
                    <span>•</span>
                    <span>Last active: {formatDate(conv.lastActivity)}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onOpenConversationInWorkspace(conv.id)}
                  >
                    Reopen in Workspace →
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => setDeletingId(conv.id)}
                    title="Delete conversation"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Rename Modal */}
      {editingConv && (
        <div className="modal-backdrop" onClick={() => setEditingConv(null)} role="dialog">
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '450px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Rename Study Conversation</h3>
              <button className="icon-btn" onClick={() => setEditingConv(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">New Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setEditingConv(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSaveRename}>Save Name</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="modal-backdrop" onClick={() => setDeletingId(null)} role="dialog">
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Delete Study Thread?</h3>
              <button className="icon-btn" onClick={() => setDeletingId(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                Are you sure you want to delete this study session? This action will remove the conversation history from your browser.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setDeletingId(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deletingId)}>Delete Thread</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
