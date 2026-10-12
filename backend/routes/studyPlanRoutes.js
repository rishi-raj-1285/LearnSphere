const express = require('express');
const { protect } = require('../middleware/auth');
const {
  listStudyPlans,
  createStudyPlan,
  getStudyPlan,
  patchStudyPlan,
  deleteStudyPlan,
  patchTask
} = require('../controllers/studyPlanController');

const router = express.Router();

router.use(protect);

router.get('/', listStudyPlans);
router.post('/', createStudyPlan);
router.get('/:id', getStudyPlan);
router.patch('/:id', patchStudyPlan);
router.delete('/:id', deleteStudyPlan);
router.patch('/:id/tasks/:taskId', patchTask);

module.exports = router;
