const express = require('express');
const router = express.Router();
const dbEngine = require('../data/dbEngine');

// GET /api/dashboard/stats
router.get('/stats', (req, res) => {
  const stats = dbEngine.getDashboardStats();
  res.json({ success: true, data: stats });
});

module.exports = router;
