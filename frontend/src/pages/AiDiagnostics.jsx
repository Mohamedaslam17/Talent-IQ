import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Lightbulb, 
  Cpu, 
  RefreshCw, 
  Zap, 
  Database,
  AlertCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';

export const AiDiagnostics = () => {
  const [mode, setMode] = useState('static'); // 'ai' or 'static'
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responseMeta, setResponseMeta] = useState({
    success: true,
    mode: 'static',
    model: 'Cached Static Mode',
    timestamp: '',
    error: null
  });

  const fetchDiagnostics = (targetMode) => {
    setLoading(true);
    api.getAiDiagnostics(targetMode).then(res => {
      if (res) {
        setData(res.data);
        setResponseMeta({
          success: res.success !== false && res.mode !== 'error',
          mode: res.mode || targetMode,
          model: res.model || (targetMode === 'ai' ? 'Google Gemini 1.5 Flash' : 'Cached Static Mode'),
          timestamp: res.timestamp || new Date().toLocaleTimeString(),
          error: res.error || null
        });
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchDiagnostics(mode);
  }, [mode]);

  const handleToggle = (newMode) => {
    setMode(newMode);
  };

  const diag = data || {
    cohort_name: "GenAI & Cloud Architecture 2026",
    overall_readiness_score: 88.5,
    readiness_status: "High Readiness",
    total_trainees: 24,
    project_ready_count: 19,
    at_risk_count: 2,
    top_skill: "Azure OpenAI & Cloud Architecture",
    primary_gap: "Python Async Error Handling in Microservices",
    executive_summary: "The GenAI & Cloud Architecture class is performing very well with an average score of 88.5%. 79% of students are already fully ready for project placement.",
    recommended_interventions: [
      { title: "Targeted Coding Practice Lab", description: "Schedule a 4-hour hands-on lab on Python Error Handling for students needing extra help.", priority: "High" },
      { title: "Peer Study Pairing", description: "Pair Ethan Wright with Aarav Sharma on Project Sprint 2 for peer learning.", priority: "Medium" }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with AI Mode Toggle */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-cyan-950/20 to-slate-900 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" /> GOOGLE GEMINI AI INTEGRATION
              </span>
              <span className="text-xs text-slate-400">• Intelligent Analytics</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              AI Team Performance Insights
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Automated performance overview summarizing class progress, predicting project readiness, and recommending targeted learning support actions.
            </p>
          </div>

          {/* AI / Static Mode Toggle Switch */}
          <div className="flex items-center bg-slate-950 border border-slate-800 p-1.5 rounded-2xl shrink-0 self-start md:self-auto shadow-inner">
            <button
              onClick={() => handleToggle('static')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                mode === 'static' 
                  ? 'bg-slate-800 text-cyan-400 shadow-md border border-slate-700' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Static Mode (Save Tokens)</span>
            </button>

            <button
              onClick={() => handleToggle('ai')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                mode === 'ai' 
                  ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-white shadow-lg shadow-cyan-500/20 border border-cyan-400/30' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>With Gemini AI</span>
            </button>
          </div>
        </div>

        {/* Status Indicator Banner */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-slate-400">Response Mode:</span>
            <span className={`font-bold px-2.5 py-0.5 rounded text-[10px] border flex items-center gap-1.5 ${
              responseMeta.mode === 'ai' 
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' 
                : responseMeta.mode === 'error'
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}>
              {responseMeta.mode === 'ai' ? (
                <>
                  <Zap className="w-3 h-3 text-amber-400 animate-pulse" />
                  <span>⚡ LIVE GEMINI AI RESPONSE ({responseMeta.model})</span>
                </>
              ) : responseMeta.mode === 'error' ? (
                <>
                  <AlertCircle className="w-3 h-3 text-rose-400" />
                  <span>⚠️ AI GENERATION FAILED (Fallback Data)</span>
                </>
              ) : (
                <>
                  <Database className="w-3 h-3 text-slate-400" />
                  <span>📁 STATIC MODE RESPONSE (0 Tokens Used)</span>
                </>
              )}
            </span>

            {responseMeta.timestamp && (
              <span className="text-[10px] text-slate-500 flex items-center gap-1 whitespace-nowrap">
                <Clock className="w-3 h-3 text-slate-600" /> Generated at {responseMeta.timestamp}
              </span>
            )}
          </div>

          <button 
            onClick={() => fetchDiagnostics(mode)}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition shrink-0 whitespace-nowrap self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Analysis</span>
          </button>
        </div>
      </div>

      {/* Error Alert Banner if AI Call Failed */}
      {!responseMeta.success && responseMeta.error && (
        <div className="bg-rose-950/40 border border-rose-500/40 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-rose-300">Gemini AI Request Notice</h4>
              <p className="text-xs text-rose-200/80 mt-0.5">{responseMeta.error}</p>
              <p className="text-[10px] text-slate-400 mt-1">Displaying static benchmark response as fallback.</p>
            </div>
          </div>
          <button 
            onClick={() => fetchDiagnostics('ai')}
            className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-bold text-xs shrink-0 whitespace-nowrap self-start sm:self-auto"
          >
            Retry AI Analysis
          </button>
        </div>
      )}

      {/* Main Content with Eye-Catching Loading State */}
      {loading ? (
        <div className="glass-panel p-12 rounded-2xl text-center space-y-4 border border-cyan-500/30">
          <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-2xl bg-cyan-500/20 animate-ping" />
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-sky-600 text-white flex items-center justify-center font-black text-xl shadow-lg relative z-10">
              <Sparkles className="w-7 h-7 text-amber-300 animate-pulse" />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-white">
              {mode === 'ai' ? '⚡ Google Gemini 1.5 Flash is Analyzing Class Performance...' : 'Loading Performance Insights...'}
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Evaluating student test scores, capstone evaluations, and attendance metrics to construct personalized AI learning recommendations.
            </p>
          </div>

          {/* Glowing Animated Loading Bar */}
          <div className="w-48 h-1.5 bg-slate-900 rounded-full mx-auto overflow-hidden border border-slate-800">
            <div className="h-full bg-gradient-to-r from-cyan-500 via-amber-400 to-sky-500 animate-pulse w-full" />
          </div>
        </div>
      ) : (
        <>
          {/* Performance Summary Card */}
          <div className={`glass-panel p-6 rounded-2xl space-y-4 transition ${
            responseMeta.mode === 'ai' ? 'border-2 border-cyan-500/40 shadow-lg shadow-cyan-500/10' : ''
          }`}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Class Performance Summary</h3>
                {responseMeta.mode === 'ai' && (
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[9px] font-extrabold tracking-wider uppercase">
                    ⚡ LIVE GEMINI AI GENERATED
                  </span>
                )}
              </div>
              <StatusBadge status={diag.readiness_status} />
            </div>

            <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              "{diag.executive_summary}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Top Skilled Area</span>
                  <span className="text-xs font-bold text-emerald-400 mt-0.5 block">{diag.top_skill}</span>
                </div>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Primary Improvement Area</span>
                  <span className="text-xs font-bold text-rose-400 mt-0.5 block">{diag.primary_gap}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Actions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Recommended Learning Support Actions</span>
              </h3>
              {responseMeta.mode === 'ai' && (
                <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  AI Customized Actions
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(diag.recommended_interventions || []).map((item, idx) => (
                <div key={idx} className={`glass-card p-5 rounded-2xl space-y-2 relative flex flex-col justify-between ${
                  responseMeta.mode === 'ai' ? 'border border-cyan-500/30' : ''
                }`}>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase">Action #{idx + 1}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.priority === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {item.priority} Priority
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white">{item.title}</h4>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
