import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Zap, Shield, User, Lock, ArrowRight } from 'lucide-react';

export const Login = () => {
  const { loginAs } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@talentiq.com');

  const presetRoles = [
    { role: 'Admin', email: 'admin@talentiq.com', color: 'cyan', desc: 'Full System Admin' },
    { role: 'Trainer', email: 'trainer@talentiq.com', color: 'emerald', desc: 'Grades & Feedback' },
    { role: 'HR / L&D', email: 'hr@talentiq.com', color: 'indigo', desc: 'Analytics & Exports' },
    { role: 'Department Head', email: 'depthead@talentiq.com', color: 'purple', desc: 'Executive Read-Only' }
  ];

  const handleLogin = (selectedEmail, selectedRole) => {
    loginAs(selectedEmail, selectedRole);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md glass-panel p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-wide">TalentIQ Portal</h1>
          <p className="text-xs text-slate-400">Systech Enterprise Talent Readiness Platform</p>
        </div>

        {/* Quick Role Selection */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Select Test Persona Login
          </label>
          <div className="grid grid-cols-2 gap-2">
            {presetRoles.map(r => (
              <button
                key={r.role}
                onClick={() => handleLogin(r.email, r.role)}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-left transition flex flex-col justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-cyan-400 transition">{r.role}</div>
                  <div className="text-[10px] text-slate-400">{r.desc}</div>
                </div>
                <div className="text-[9px] font-mono text-cyan-400 mt-2 truncate">{r.email}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800" /></div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-500">
            <span className="bg-slate-900 px-2 rounded">Or Manual Login</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(email, 'Admin'); }} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-medium">Email Address</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="password"
                defaultValue="password123"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
