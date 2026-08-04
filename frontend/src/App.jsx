import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/layout/Layout';

import { Dashboard } from './pages/Dashboard';
import { Bootcamps } from './pages/Bootcamps';
import { TraineeDirectory } from './pages/TraineeDirectory';
import { Assessments } from './pages/Assessments';
import { Projects } from './pages/Projects';
import { Reports } from './pages/Reports';
import { AiDiagnostics } from './pages/AiDiagnostics';
import { AuditLogs } from './pages/AuditLogs';
import { RemediationHub } from './pages/RemediationHub';
import { DeptHeadPipeline } from './pages/DeptHeadPipeline';
import { Login } from './pages/Login';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Layout>{children}</Layout>;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/bootcamps" element={
            <ProtectedRoute>
              <Bootcamps />
            </ProtectedRoute>
          } />

          <Route path="/trainees" element={
            <ProtectedRoute>
              <TraineeDirectory />
            </ProtectedRoute>
          } />

          <Route path="/assessments" element={
            <ProtectedRoute>
              <Assessments />
            </ProtectedRoute>
          } />

          <Route path="/projects" element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          } />

          <Route path="/reports" element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          } />

          <Route path="/diagnostics" element={
            <ProtectedRoute>
              <AiDiagnostics />
            </ProtectedRoute>
          } />

          <Route path="/audit" element={
            <ProtectedRoute>
              <AuditLogs />
            </ProtectedRoute>
          } />

          <Route path="/remediation" element={
            <ProtectedRoute>
              <RemediationHub />
            </ProtectedRoute>
          } />

          <Route path="/pipeline" element={
            <ProtectedRoute>
              <DeptHeadPipeline />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
