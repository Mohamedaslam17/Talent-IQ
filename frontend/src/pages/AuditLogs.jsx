import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ShieldAlert, Activity, Clock, ShieldCheck } from 'lucide-react';

export const AuditLogs = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDashboardStats().then(data => {
      setActivities(data?.recent_activities || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel p-6 rounded-2xl flex items-center justify-between border border-rose-500/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-rose-400" /> ADMIN GOVERNANCE ONLY
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <span>System Governance & Security Audit Logs</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete real-time audit log tracking data mutations, score recalculations, role switches, and system events.
          </p>
        </div>
        <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
          Admin Audit Stream
        </span>
      </div>

      {/* Log Feed */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>System Audit Activity Trail</span>
        </h3>

        {loading ? (
          <div className="py-8 text-center text-slate-500">Loading audit trail...</div>
        ) : (
          <div className="space-y-3">
            {activities.map((act, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition">
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center font-bold text-xs border border-slate-700 shrink-0">
                  #{i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{act.user || 'System Admin'}</span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" /> {act.created_at}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{act.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
