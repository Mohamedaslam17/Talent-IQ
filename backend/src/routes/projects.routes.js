const express = require('express');
const router = express.Router();
const dbEngine = require('../data/dbEngine');

// GET /api/projects
router.get('/', (req, res) => {
  res.json({
    success: true,
    projects: dbEngine.getSimulationProjects(),
    certifications: dbEngine.getCertifications()
  });
});

// PUT /api/projects/:traineeId/evaluate (Trainer Capstone evaluation)
router.put('/:traineeId/evaluate', (req, res) => {
  const result = dbEngine.evaluateProject(req.params.traineeId, req.body);
  res.json({ success: true, data: result });
});

module.exports = router;
