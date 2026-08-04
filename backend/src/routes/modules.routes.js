const express = require('express');
const router = express.Router();
const dbEngine = require('../data/dbEngine');

// GET /api/modules
router.get('/', (req, res) => {
  const { bootcamp_id } = req.query;
  res.json({ success: true, data: dbEngine.getModules(bootcamp_id) });
});

module.exports = router;
