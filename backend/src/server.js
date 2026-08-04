const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const traineesRoutes = require('./routes/trainees.routes');
const bootcampsRoutes = require('./routes/bootcamps.routes');
const modulesRoutes = require('./routes/modules.routes');
const assessmentsRoutes = require('./routes/assessments.routes');
const projectsRoutes = require('./routes/projects.routes');
const reportsRoutes = require('./routes/reports.routes');
const notificationsRoutes = require('./routes/notifications.routes');
const diagnosticsRoutes = require('./routes/diagnostics.routes');

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'TalentIQ Backend API',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/trainees', traineesRoutes);
app.use('/api/bootcamps', bootcampsRoutes);
app.use('/api/modules', modulesRoutes);
app.use('/api/assessments', assessmentsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/diagnostics', diagnosticsRoutes);

// Fallback error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message
  });
});

// Start server if not running serverless on Vercel
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 TalentIQ Express Backend API running on port ${PORT}`);
  });
}

module.exports = app;
