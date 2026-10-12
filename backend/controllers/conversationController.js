const Conversation = require('../models/Conversation');
const Document = require('../models/Document');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');
const { conversationToFrontend } = require('../services/conversationMapper');
const { MAX_MESSAGE_LENGTH } = require('../models/Conversation');

async function buildDocTitleMap(ownerId, conversations) {
  const ids = [
    ...new Set(
      conversations
        .map((c) => (c.linkedDocument ? c.linkedDocument.toString() : null))
        .filter(Boolean)
    )
  ];
  if (ids.length === 0) return {};
  const docs = await Document.find({ _id: { $in: ids }, owner: ownerId }).select('title originalFilename');
  const map = {};
  docs.forEach((d) => {
    map[d._id.toString()] = d.title || d.originalFilename;
  });
  return map;
}

async function assertLinkedDocument(ownerId, documentId) {
  if (!documentId) return null;
  const doc = await Document.findOne({ _id: documentId, owner: ownerId });
  if (!doc) throw new ApiError(400, 'Linked document not found or not owned by you');
  return doc._id;
}

const listConversations = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 20));
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Conversation.find({ owner: req.user._id }).sort({ updatedAt: -1 }).skip(skip).limit(limit),
    Conversation.countDocuments({ owner: req.user._id })
  ]);

  const titleMap = await buildDocTitleMap(req.user._id, items);

  res.json({
    success: true,
    data: items.map((c) => conversationToFrontend(c, titleMap)),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) }
  });
});

const createConversation = asyncHandler(async (req, res) => {
  const { title, subject, documentId, language } = req.body;
  if (!title || !String(title).trim()) {
    throw new ApiError(400, 'Title is required');
  }

  const linkedDocument = await assertLinkedDocument(req.user._id, documentId);

  const conv = await Conversation.create({
    owner: req.user._id,
    title: String(title).trim(),
    subject: subject ? String(subject).trim() : 'General',
    linkedDocument,
    language: language || 'English',
    messages: []
  });

  const titleMap = linkedDocument
    ? { [linkedDocument.toString()]: (await Document.findById(linkedDocument))?.title }
    : {};

  res.status(201).json({
    success: true,
    data: conversationToFrontend(conv, titleMap)
  });
});

const getConversation = asyncHandler(async (req, res) => {
  const conv = await Conversation.findOne({ _id: req.params.id, owner: req.user._id });
  if (!conv) throw new ApiError(404, 'Conversation not found');

  const titleMap = await buildDocTitleMap(req.user._id, [conv]);
  res.json({ success: true, data: conversationToFrontend(conv, titleMap) });
});

const patchConversation = asyncHandler(async (req, res) => {
  const conv = await Conversation.findOne({ _id: req.params.id, owner: req.user._id });
  if (!conv) throw new ApiError(404, 'Conversation not found');

  if (req.body.title !== undefined) conv.title = String(req.body.title).trim();
  if (req.body.subject !== undefined) conv.subject = String(req.body.subject).trim();
  if (req.body.language !== undefined) conv.language = String(req.body.language).trim();
  if (req.body.documentId !== undefined) {
    conv.linkedDocument = await assertLinkedDocument(req.user._id, req.body.documentId);
  }

  await conv.save();
  const titleMap = await buildDocTitleMap(req.user._id, [conv]);
  res.json({ success: true, data: conversationToFrontend(conv, titleMap) });
});

const addMessage = asyncHandler(async (req, res) => {
  const conv = await Conversation.findOne({ _id: req.params.id, owner: req.user._id });
  if (!conv) throw new ApiError(404, 'Conversation not found');

  const { role, text, sender, sourceRef, bookmarked } = req.body;
  const messageRole = role || (sender === 'assistant' ? 'assistant' : sender === 'user' ? 'user' : null);

  if (!messageRole || !['user', 'assistant'].includes(messageRole)) {
    throw new ApiError(400, 'Message role must be user or assistant');
  }

  if (!text || !String(text).trim()) {
    throw new ApiError(400, 'Message text is required');
  }

  const messageText = String(text).trim();
  if (messageText.length > MAX_MESSAGE_LENGTH) {
    throw new ApiError(400, `Message exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters`);
  }

  const sourceReferences = [];
  if (sourceRef && typeof sourceRef === 'object') {
    sourceReferences.push({
      document: sourceRef.document,
      page: sourceRef.page,
      excerpt: sourceRef.excerpt
    });
  }

  conv.messages.push({
    role: messageRole,
    text: messageText,
    timestamp: new Date(),
    sourceReferences,
    bookmarked: Boolean(bookmarked),
    clientMessageId: req.body.clientMessageId
  });

  await conv.save();
  const titleMap = await buildDocTitleMap(req.user._id, [conv]);
  res.status(201).json({ success: true, data: conversationToFrontend(conv, titleMap) });
});

const deleteConversation = asyncHandler(async (req, res) => {
  const conv = await Conversation.findOne({ _id: req.params.id, owner: req.user._id });
  if (!conv) throw new ApiError(404, 'Conversation not found');
  await conv.deleteOne();
  res.json({ success: true, message: 'Conversation deleted' });
});

module.exports = {
  listConversations,
  createConversation,
  getConversation,
  patchConversation,
  addMessage,
  deleteConversation
};
