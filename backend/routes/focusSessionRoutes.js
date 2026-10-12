const express = require('express');
const { protect } = require('../middleware/auth');
const {
  listFocusSessions,
  createFocusSession,
  patchFocusSession
} = require('../controllers/focusSessionController');

const router = express.Router();

router.use(protect);

router.get('/', listFocusSessions);
router.post('/', createFocusSession);
router.patch('/:id', patchFocusSession);

module.exports = router;
