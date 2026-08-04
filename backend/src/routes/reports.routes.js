const express = require('express');
const router = express.Router();
const dbEngine = require('../data/dbEngine');

// GET /api/reports/summary
router.get('/summary', (req, res) => {
  const stats = dbEngine.getDashboardStats();
  const trainees = dbEngine.getTrainees();
  const bootcamps = dbEngine.getBootcamps();

  res.json({
    success: true,
    report_title: "Systech Enterprise Talent Readiness Summary",
    generated_at: new Date().toISOString(),
    stats: stats.kpis,
    cohorts: bootcamps,
    at_risk_trainees: trainees.filter(t => t.risk_level === 'High Risk'),
    top_performers: stats.top_performers
  });
});

module.exports = router;
