import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { StatusBadge } from '../components/common/StatusBadge';
import { Building2, Lock, CheckCircle2, AlertCircle, Layers } from 'lucide-react';

export const DeptHeadPipeline = () => {
  const [trainees, setTrainees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTrainees().then(data => {
      setTrainees(data || []);
      setLoading(false);
    });
  }, []);

  const readyTrainees = trainees.filter(t => t.is_project_ready === 1);
  const inTraining = trainees.filter(t => t.is_project_ready === 0 && t.risk_level !== 'High Risk');
  const atRisk = trainees.filter(t => t.risk_level === 'High Risk');

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-purple-500/30 bg-gradient-to-r from-slate-900 via-purple-950/20 to-slate-900">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
              <Lock className="w-3 h-3 text-purple-400" /> EXECUTIVE VIEW
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-purple-400" />
            <span>Student Project Placement Pipeline</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            High-level overview showing student readiness for upcoming company project assignments.
          </p>
        </div>
        <button 
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition shrink-0 whitespace-nowrap self-start sm:self-auto"
        >
          Export Summary Report
        </button>
      </div>

      {/* 3 Pipeline Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tier 1: Client Ready */}
        <div className="glass-panel p-5 rounded-2xl space-y-4 border-t-4 border-t-emerald-500">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Ready for Projects ({readyTrainees.length})</span>
            </h3>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
              Ready Now
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Passed all tests, certifications, and final projects (score &gt; 80%).</p>

          <div className="space-y-3 pt-2">
            {readyTrainees.map(t => (
              <div key={t.trainee_id} className="glass-card p-3.5 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{t.name}</span>
                  <span className="font-bold text-emerald-400 text-xs">{t.score}%</span>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>{t.employee_id}</span>
                  <span className="text-cyan-400 font-semibold">{t.bootcamp_name}</span>
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {(t.skills || []).slice(0, 3).map((s, i) => (
                    <span key={i} className="text-[9px] bg-slate-900 text-slate-300 px-1.5 py-0.5 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 2: In Training */}
        <div className="glass-panel p-5 rounded-2xl space-y-4 border-t-4 border-t-sky-500">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-sky-400 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>Currently Learning ({inTraining.length})</span>
            </h3>
            <span className="text-[10px] bg-sky-500/10 text-sky-300 px-2 py-0.5 rounded border border-sky-500/20 font-bold">
              In Progress
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Currently taking course modules and working on practice projects.</p>

          <div className="space-y-3 pt-2">
            {inTraining.map(t => (
              <div key={t.trainee_id} className="glass-card p-3.5 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{t.name}</span>
                  <span className="font-bold text-sky-400 text-xs">{t.score}%</span>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>{t.employee_id}</span>
                  <span className="text-slate-300">{t.bootcamp_name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 3: Remediation / At Risk */}
        <div className="glass-panel p-5 rounded-2xl space-y-4 border-t-4 border-t-rose-500">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-rose-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>Needs Support ({atRisk.length})</span>
            </h3>
            <span className="text-[10px] bg-rose-500/10 text-rose-300 px-2 py-0.5 rounded border border-rose-500/20 font-bold">
              Extra Help Needed
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Receiving 1-on-1 instructor tutoring & peer mentor support.</p>

          <div className="space-y-3 pt-2">
            {atRisk.map(t => (
              <div key={t.trainee_id} className="glass-card p-3.5 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{t.name}</span>
                  <span className="font-bold text-rose-400 text-xs">{t.score}%</span>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Mentor: {t.assigned_mentor || 'Assigned'}</span>
                  <StatusBadge status={t.risk_level} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
