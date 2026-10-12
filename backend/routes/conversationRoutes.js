const express = require('express');
const { protect } = require('../middleware/auth');
const {
  listConversations,
  createConversation,
  getConversation,
  patchConversation,
  addMessage,
  deleteConversation
} = require('../controllers/conversationController');

const router = express.Router();

router.use(protect);

router.get('/', listConversations);
router.post('/', createConversation);
router.get('/:id', getConversation);
router.patch('/:id', patchConversation);
router.post('/:id/messages', addMessage);
router.delete('/:id', deleteConversation);

module.exports = router;
