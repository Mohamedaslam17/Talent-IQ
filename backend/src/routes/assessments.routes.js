const express = require('express');
const router = express.Router();
const dbEngine = require('../data/dbEngine');

// GET /api/assessments
router.get('/', (req, res) => {
  res.json({ 
    success: true, 
    assessments: dbEngine.getAssessments(),
    feedback: dbEngine.getTrainerFeedback()
  });
});

// POST /api/assessments (Grade test submission by Trainer)
router.post('/', (req, res) => {
  if (!req.body.trainee_id) {
    return res.status(400).json({ success: false, message: 'Trainee ID is required' });
  }
  const result = dbEngine.addAssessmentScore(req.body);
  res.status(201).json({ success: true, data: result });
});

// POST /api/assessments/feedback (Trainer feedback submission)
router.post('/feedback', (req, res) => {
  if (!req.body.trainee_id) {
    return res.status(400).json({ success: false, message: 'Trainee ID is required' });
  }
  const result = dbEngine.addTrainerFeedback(req.body);
  res.status(201).json({ success: true, data: result });
});

module.exports = router;
