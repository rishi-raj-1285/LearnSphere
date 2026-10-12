function formatTime(date) {
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function conversationToFrontend(conv, documentTitleMap = {}) {
  const docId = conv.linkedDocument ? conv.linkedDocument.toString() : null;
  const docTitle = docId && documentTitleMap[docId] ? documentTitleMap[docId] : '';

  return {
    id: conv._id.toString(),
    title: conv.title,
    subject: conv.subject,
    documentId: docId,
    documentTitle: docTitle,
    lastActivity: conv.updatedAt ? conv.updatedAt.toISOString() : new Date().toISOString(),
    language: conv.language || 'English',
    messageCount: conv.messages?.length || 0,
    messages: (conv.messages || []).map((m) => ({
      id: m._id.toString(),
      sender: m.role === 'assistant' ? 'assistant' : 'user',
      text: m.text,
      timestamp: formatTime(m.timestamp),
      bookmarked: Boolean(m.bookmarked),
      sourceRef: m.sourceReferences?.[0]
        ? {
            document: m.sourceReferences[0].document,
            page: m.sourceReferences[0].page,
            excerpt: m.sourceReferences[0].excerpt
          }
        : undefined
    }))
  };
}

module.exports = { conversationToFrontend };
