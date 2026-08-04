const express = require('express');
const router = express.Router();
const dbEngine = require('../data/dbEngine');

// GET /api/trainees
router.get('/', (req, res) => {
  const { search, bootcamp_id, risk_level, status } = req.query;
  const trainees = dbEngine.getTrainees({ search, bootcamp_id, risk_level, status });
  res.json({ success: true, count: trainees.length, data: trainees });
});

// GET /api/trainees/:id
router.get('/:id', (req, res) => {
  const trainee = dbEngine.getTraineeById(req.params.id);
  if (!trainee) {
    return res.status(404).json({ success: false, message: 'Trainee not found' });
  }
  res.json({ success: true, data: trainee });
});

// POST /api/trainees
router.post('/', (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }
  const newTrainee = dbEngine.addTrainee(req.body);
  res.status(201).json({ success: true, data: newTrainee });
});

// PUT /api/trainees/:id
router.put('/:id', (req, res) => {
  const updated = dbEngine.updateTrainee(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Trainee not found' });
  }
  res.json({ success: true, data: updated });
});

// PUT /api/trainees/:id/assign-mentor (HR Mentor Assignment)
router.put('/:id/assign-mentor', (req, res) => {
  const updated = dbEngine.assignMentor(req.params.id, req.body.mentor_name || "Aarav Sharma");
  res.json({ success: true, data: updated });
});

// DELETE /api/trainees/:id (Admin delete)
router.delete('/:id', (req, res) => {
  const success = dbEngine.deleteTrainee(req.params.id);
  if (!success) {
    return res.status(404).json({ success: false, message: 'Trainee not found' });
  }
  res.json({ success: true, message: 'Trainee deleted successfully' });
});

module.exports = router;
