const express = require('express');
const router = express.Router();
const dbEngine = require('../data/dbEngine');

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, role } = req.body;
  
  const user = dbEngine.getUserByEmail(email || 'admin@talentiq.com');
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  // Allow switching roles or using user role
  const userRole = role || user.role_name;

  return res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: userRole,
      title: user.title
    },
    token: `mock_jwt_token_${user.id}_${Date.now()}`
  });
});

// GET /api/auth/roles
router.get('/roles', (req, res) => {
  res.json({ success: true, roles: dbEngine.getRoles() });
});

module.exports = router;
