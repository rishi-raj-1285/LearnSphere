const express = require('express');
const { protect } = require('../middleware/auth');
const { listProgress, createProgress, patchProgress } = require('../controllers/progressController');

const router = express.Router();

router.use(protect);

router.get('/', listProgress);
router.post('/', createProgress);
router.patch('/:id', patchProgress);

module.exports = router;
