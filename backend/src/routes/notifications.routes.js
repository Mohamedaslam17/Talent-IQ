const express = require('express');
const router = express.Router();
const dbEngine = require('../data/dbEngine');

// GET /api/notifications
router.get('/', (req, res) => {
  res.json({ success: true, data: dbEngine.getNotifications() });
});

// PUT /api/notifications/:id/read
router.put('/:id/read', (req, res) => {
  const updated = dbEngine.markNotificationAsRead(req.params.id);
  res.json({ success: true, data: updated });
});

module.exports = router;
