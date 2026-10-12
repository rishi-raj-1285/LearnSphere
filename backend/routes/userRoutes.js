const express = require('express');
const { protect } = require('../middleware/auth');
const { getMe, patchMe, patchPreferences, patchSubjects } = require('../controllers/userController');

const router = express.Router();

router.use(protect);

router.get('/me', getMe);
router.patch('/me', patchMe);
router.patch('/me/preferences', patchPreferences);
router.patch('/me/subjects', patchSubjects);

module.exports = router;
