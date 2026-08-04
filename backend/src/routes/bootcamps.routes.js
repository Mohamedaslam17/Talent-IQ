const express = require('express');
const router = express.Router();
const dbEngine = require('../data/dbEngine');

// GET /api/bootcamps
router.get('/', (req, res) => {
  res.json({ success: true, data: dbEngine.getBootcamps() });
});

// POST /api/bootcamps (HR bootcamp creation)
router.post('/', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ success: false, message: 'Bootcamp name is required' });
  }
  const result = dbEngine.addBootcamp(req.body);
  res.status(201).json({ success: true, data: result });
});

// GET /api/bootcamps/:id
router.get('/:id', (req, res) => {
  const bootcamp = dbEngine.getBootcampById(req.params.id);
  if (!bootcamp) return res.status(404).json({ success: false, message: 'Bootcamp not found' });
  const modules = dbEngine.getModules(bootcamp.bootcamp_id);
  res.json({ success: true, data: { ...bootcamp, modules } });
});

module.exports = router;
