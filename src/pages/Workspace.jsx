import React, { useState } from 'react';
import { generateSimulatedStudyAssistantResponse } from '../data/mockAiResponses';

export default function Workspace({
  conversations,
  setConversations,
  activeConversationId,
  setActiveConversationId,
  documents,
  onOpenDocumentStudy,
  onAddToast,
  currentLanguage,
  onLanguageChange
}) {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState(documents[0]?.id || '');
  const [copiedMsgId, setCopiedMsgId] = useState(null);

  // Active conversation or fallback
  const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];

  const suggestedPrompts = [
    "Why does Dijkstra's algorithm fail on negative edge weights?",
    "Explain AVL Tree Left-Right (LR) double rotations simply.",
    "Give me 3 practice quiz questions on Binary Search Trees.",
    "Summarize the key definitions and formulas in this unit.",
    "Explain the role of DNA Ligase on Okazaki fragments."
  ];

  const handleSelectConv = (convId) => {
    setActiveConversationId(convId);
  };

  const handleCreateNewConversation = () => {
    const newId = `conv-${Date.now()}`;
    const newConv = {
      id: newId,
      title: "New Study Discussion",
      subject: documents.find(d => d.id === selectedDocId)?.subject || "General Study",
      documentId: selectedDocId || documents[0]?.id,
      documentTitle: documents.find(d => d.id === selectedDocId)?.title || "General Notes",
      lastActivity: new Date().toISOString(),
      language: currentLanguage,
      messageCount: 1,
      messages: [
        {
          id: `m-${Date.now()}`,
          sender: "assistant",
          text: `👋 Hello! I am **Vidya**, your AI Study Chatbot.

Ask me any concept, request bilingual explanations in **${currentLanguage}**, or ask for step-by-step problem breakdowns grounded in your study notes.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          bookmarked: false
        }
      ]
    };

    setConversations([newConv, ...conversations]);
    setActiveConversationId(newId);
    if (onAddToast) onAddToast("Created new study conversation thread");
  };

  const handleSendMessage = (textToSend = null) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg = {
      id: `m-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const targetDoc = documents.find(d => d.id === selectedDocId);

    // Update conversation with user message immediately
    const updatedMessages = [...(activeConv?.messages || []), userMsg];

    setConversations(conversations.map(c => {
      if (c.id === activeConv?.id) {
        return {
          ...c,
          messages: updatedMessages,
          lastActivity: new Date().toISOString(),
          title: c.title === "New Study Discussion" ? query.slice(0, 35) + "..." : c.title
        };
      }
      return c;
    }));

    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const simulated = generateSimulatedStudyAssistantResponse(query, targetDoc?.title, currentLanguage);

      const aiMsg = {
        id: `m-${Date.now() + 1}`,
        sender: "assistant",
        text: simulated.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceRef: simulated.sourceRef,
        bookmarked: false
      };

      setConversations(prev => prev.map(c => {
        if (c.id === activeConv?.id) {
          return {
            ...c,
            messages: [...c.messages, aiMsg],
            messageCount: c.messages.length + 1
          };
        }
        return c;
      }));
      setIsTyping(false);
    }, 600);
  };

  const toggleBookmark = (msgId) => {
    setConversations(conversations.map(c => {
      if (c.id === activeConv?.id) {
        const updatedMsgs = c.messages.map(m => {
          if (m.id === msgId) {
            const nextState = !m.bookmarked;
            if (onAddToast) onAddToast(nextState ? "Explanation saved to bookmarks!" : "Bookmark removed");
            return { ...m, bookmarked: nextState };
          }
          return m;
        });
        return { ...c, messages: updatedMsgs };
      }
      return c;
    }));
  };

  const copyToClipboard = (text, msgId) => {
    navigator.clipboard?.writeText(text);
    setCopiedMsgId(msgId);
    if (onAddToast) onAddToast("Copied explanation to clipboard!");
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  return (
    <div className="workspace-page">
      {/* Prototype Notice */}
      <div className="prototype-notice-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="tag">Chatbot</span>
          <span><strong>Vidya AI Chatbot</strong>: Your personal educational study chatbot. Ask questions, clarify concepts, or request bilingual explanations.</span>
        </div>
        <span className="badge badge-blue">Language: {currentLanguage}</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '20px',
        minHeight: '750px',
        alignItems: 'stretch'
      }}>
        {/* Left Side: Conversation Threads List */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-dark-blue)' }}>
              Study Threads
            </h3>
            <button
              className="btn btn-sm btn-primary"
              onClick={handleCreateNewConversation}
              title="Start a new study conversation"
            >
              + New Chat
            </button>
          </div>

          {/* Document Context Selector */}
          <div className="form-group" style={{ marginBottom: '14px' }}>
            <label className="form-label" style={{ fontSize: '0.78rem' }}>Grounded Document Context</label>
            <select
              className="form-select"
              style={{ fontSize: '0.8rem', padding: '6px 8px' }}
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(e.target.value)}
            >
              <option value="">All Document Notes</option>
              {documents.map(d => (
                <option key={d.id} value={d.id}>{d.title}</option>
              ))}
            </select>
          </div>

          {/* Conversation List */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {conversations.map(conv => {
              const isSelected = conv.id === activeConv?.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => handleSelectConv(conv.id)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '2px solid var(--color-strong-blue)' : '1px solid var(--color-border)',
                    backgroundColor: isSelected ? 'var(--color-surface-light)' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{
                    fontWeight: isSelected ? '700' : '600',
                    fontSize: '0.85rem',
                    color: 'var(--color-dark-blue)',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap'
                  }}>
                    {conv.title}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>
                    <span>{conv.subject}</span>
                    <span>{conv.messages?.length || 0} msgs</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Central Conversation Area */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
          {/* Header of Active Conversation */}
          <div style={{
            padding: '14px 20px',
            borderBottom: '1px solid var(--color-border)',
            backgroundColor: '#F8FAFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-dark-blue)' }}>
                {activeConv?.title}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                <span>Subject: <strong>{activeConv?.subject}</strong></span>
                <span>•</span>
                <span>Context: <strong>{activeConv?.documentTitle}</strong></span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <select
                className="lang-selector-select"
                value={currentLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi (Bilingual)</option>
                <option value="Tamil">Tamil (Bilingual)</option>
              </select>

              {activeConv?.documentId && (
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => {
                    const doc = documents.find(d => d.id === activeConv.documentId);
                    if (doc) onOpenDocumentStudy(doc);
                  }}
                  title="Open source document in study interface"
                >
                  📖 Open Doc Study
                </button>
              )}
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            backgroundColor: '#FAFCFE'
          }}>
            {activeConv?.messages?.map((msg) => {
              const isAssistant = msg.sender === 'assistant';
              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isAssistant ? 'flex-start' : 'flex-end'
                  }}
                >
                  <div style={{
                    maxWidth: isAssistant ? '90%' : '75%',
                    backgroundColor: isAssistant ? '#FFFFFF' : 'var(--color-strong-blue)',
                    color: isAssistant ? 'var(--color-text-main)' : '#FFFFFF',
                    border: isAssistant ? '1px solid var(--color-border)' : 'none',
                    borderRadius: 'var(--radius-lg)',
                    padding: '16px 20px',
                    boxShadow: isAssistant ? 'var(--shadow-sm)' : 'none'
                  }}>
                    {/* Header line for Assistant */}
                    {isAssistant && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid var(--color-border)',
                        paddingBottom: '8px',
                        marginBottom: '12px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '1rem' }}>🤖</span>
                          <span style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--color-dark-blue)' }}>Vidya (AI Chatbot)</span>
                          <span className="badge badge-blue" style={{ fontSize: '0.68rem' }}>Simulated AI</span>
                        </div>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button
                            className="btn btn-sm btn-outline"
                            style={{ padding: '2px 8px', fontSize: '0.72rem' }}
                            onClick={() => copyToClipboard(msg.text, msg.id)}
                            title="Copy explanation"
                          >
                            {copiedMsgId === msg.id ? '✓ Copied' : '📋 Copy'}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Educational Content Area */}
                    <div style={{
                      fontSize: '0.92rem',
                      lineHeight: '1.65',
                      whiteSpace: 'pre-line'
                    }}>
                      {msg.text}
                    </div>

                    {/* Grounded Source Citation Card */}
                    {msg.sourceRef && (
                      <div style={{
                        marginTop: '14px',
                        padding: '10px 14px',
                        background: 'var(--color-surface-light)',
                        border: '1px solid #BFDBFE',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.8rem',
                        color: 'var(--color-dark-blue)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '8px'
                      }}>
                        <div>
                          <strong>📚 Grounded Source Reference (Simulated Citation):</strong>
                          <div style={{ color: 'var(--color-text-secondary)', marginTop: '2px', fontStyle: 'italic' }}>
                            "{msg.sourceRef.excerpt}"
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--color-strong-blue)', marginTop: '2px' }}>
                            {msg.sourceRef.document} — Page {msg.sourceRef.page}
                          </div>
                        </div>

                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => {
                            const foundDoc = documents.find(d => d.title === msg.sourceRef.document);
                            if (foundDoc) onOpenDocumentStudy(foundDoc);
                          }}
                        >
                          Jump to Page {msg.sourceRef.page} →
                        </button>
                      </div>
                    )}

                    <div style={{
                      marginTop: '6px',
                      fontSize: '0.7rem',
                      opacity: 0.7,
                      textAlign: isAssistant ? 'left' : 'right'
                    }}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                <span className="badge badge-blue">Thinking & synthesizing from notes...</span>
              </div>
            )}
          </div>

          {/* Suggested Prompts Pill Tray */}
          <div style={{
            padding: '8px 16px',
            borderTop: '1px solid var(--color-border)',
            backgroundColor: '#F8FAFC',
            overflowX: 'auto',
            display: 'flex',
            gap: '8px'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap', alignSelf: 'center' }}>
              Suggested:
            </span>
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                className="btn btn-sm btn-outline"
                style={{ fontSize: '0.75rem', whiteSpace: 'nowrap', borderRadius: 'var(--radius-full)' }}
                onClick={() => handleSendMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Bottom Chat Input Form */}
          <div style={{
            padding: '16px 20px',
            borderTop: '1px solid var(--color-border)',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}>
            <input
              type="text"
              className="form-input"
              placeholder={`Ask Vidya anything about ${activeConv?.subject || 'your study notes'}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              style={{ flex: 1, padding: '12px 16px' }}
            />
            <button
              className="btn btn-primary"
              style={{ padding: '12px 20px' }}
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
            >
              <span>Send</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
