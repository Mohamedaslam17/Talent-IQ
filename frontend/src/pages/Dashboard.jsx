import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { KpiCard } from '../components/common/KpiCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  Clock, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.getDashboardStats().then(data => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  const moduleScoresData = [
    { name: 'Python OOP', avg: 92.4, target: 85 },
    { name: 'Azure Cloud', avg: 89.1, target: 85 },
    { name: 'GenAI & LLMs', avg: 86.8, target: 80 },
    { name: 'RAG & DBs', avg: 84.5, target: 80 },
    { name: 'Microservices', avg: 82.0, target: 80 }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400 font-medium">
        Loading Overview Dashboard...
      </div>
    );
  }

  const kpis = stats?.kpis || {
    total_trainees: 24,
    project_ready: 19,
    readiness_percentage: 79,
    at_risk_count: 2,
    certified_count: 14,
    avg_score: 87.8,
    avg_attendance: 95.4
  };

  const riskData = [
    { name: 'On Track', count: 18, color: '#10b981' },
    { name: 'Needs Attention', count: 4, color: '#f59e0b' },
    { name: 'Needs Support', count: 2, color: '#ef4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 whitespace-nowrap">
                OVERVIEW
              </span>
              <span className="text-xs text-slate-400 whitespace-nowrap">• Active Training Programs</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Student Performance & Readiness Overview
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Real-time performance dashboard tracking student progress, test scores, certifications, and support needs.
            </p>
          </div>
          <button 
            onClick={() => navigate('/diagnostics')}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition shrink-0 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>AI Insights</span>
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Students"
          value={kpis.total_trainees}
          subtext="3 active programs"
          icon={Users}
          color="cyan"
        />
        <KpiCard
          title="Ready for Projects"
          value={`${kpis.readiness_percentage}%`}
          unit={`(${kpis.project_ready}/${kpis.total_trainees})`}
          subtext="Passed final tests"
          icon={CheckCircle2}
          color="emerald"
          trend="up"
          trendValue="+4.2%"
        />
        <KpiCard
          title="Needs Support"
          value={kpis.at_risk_count}
          subtext="Score below 70%"
          icon={AlertTriangle}
          color="rose"
          trend="down"
          trendValue="-1"
        />
        <KpiCard
          title="Certifications"
          value={kpis.certified_count}
          subtext="Completed certs"
          icon={Award}
          color="indigo"
          trend="up"
          trendValue="+3"
        />
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module Performance Bar Chart */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-white">Course Performance Breakdown</h3>
              <p className="text-xs text-slate-400">Class average score vs target baseline (80%)</p>
            </div>
            <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20 w-fit shrink-0 whitespace-nowrap">
              Average: {kpis.avg_score}%
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moduleScoresData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="avg" fill="#0284c7" radius={[6, 6, 0, 0]} name="Average Score" />
                <Bar dataKey="target" fill="#1e293b" radius={[6, 6, 0, 0]} name="Target Baseline" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Breakdown Pie Chart */}
        <div className="glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Student Progress Distribution</h3>
            <span className="text-xs text-slate-400">3 Groups</span>
          </div>

          <div className="h-48 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-black text-white">{kpis.total_trainees}</span>
              <span className="text-[10px] text-slate-400">Students</span>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            {riskData.map((r, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                  <span className="text-slate-300 whitespace-nowrap">{r.name}</span>
                </div>
                <span className="font-bold text-white">{r.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard & Activity Log Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Leaderboard */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Top Performing Students</h3>
              <p className="text-xs text-slate-400">Ranked by overall test scores and project performance</p>
            </div>
            <button 
              onClick={() => navigate('/trainees')}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 shrink-0 whitespace-nowrap"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead>
                <tr className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4 font-semibold">Student Name</th>
                  <th className="py-3 px-4 font-semibold">Training Program</th>
                  <th className="py-3 px-4 font-semibold">Score</th>
                  <th className="py-3 px-4 font-semibold">Attendance</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {(stats?.top_performers || []).map((t, idx) => (
                  <tr key={t.trainee_id} className="hover:bg-slate-900/50 transition">
                    <td className="py-3 px-4 font-semibold flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-bold text-cyan-400 flex items-center justify-center shrink-0">
                        #{idx + 1}
                      </span>
                      <span>{t.name}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 max-w-[200px] truncate">{t.bootcamp_name}</td>
                    <td className="py-3 px-4 font-bold text-emerald-400">{t.score}%</td>
                    <td className="py-3 px-4 text-slate-300">{t.attendance_rate}%</td>
                    <td className="py-3 px-4"><StatusBadge status={t.risk_level} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Recent Activity</h3>
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
          </div>

          <div className="space-y-3.5">
            {(stats?.recent_activities || []).map((act, i) => (
              <div key={i} className="flex items-start gap-3 text-xs border-b border-slate-800/50 pb-3 last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 leading-snug">{act.description}</p>
                  <span className="text-[10px] text-slate-500 mt-0.5 block whitespace-nowrap">{act.created_at}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
