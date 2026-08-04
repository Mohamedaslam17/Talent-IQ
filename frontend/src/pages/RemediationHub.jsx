import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { StatusBadge } from '../components/common/StatusBadge';
import { UserCheck, AlertTriangle, GraduationCap } from 'lucide-react';

export const RemediationHub = () => {
  const [trainees, setTrainees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const [mentorName, setMentorName] = useState('Aarav Sharma');

  const fetchRiskTrainees = () => {
    setLoading(true);
    api.getTrainees().then(data => {
      const riskList = (data || []).filter(t => t.needs_mentoring === 1 || t.risk_level === 'High Risk' || t.risk_level === 'Moderate Risk');
      setTrainees(riskList);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchRiskTrainees();
  }, []);

  const handleAssignMentor = (traineeId) => {
    api.assignMentor(traineeId, mentorName).then(() => {
      setSelectedTrainee(null);
      fetchRiskTrainees();
    });
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel p-6 rounded-2xl flex items-center justify-between border border-emerald-500/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-emerald-400" /> HR & MANAGEMENT VIEW
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>Student Mentorship & Support Hub</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Dedicated support portal to assign peer mentors and help students succeed in their training courses.
          </p>
        </div>
        <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 font-bold">
          {trainees.length} Students Needing Support
        </span>
      </div>

      {/* Trainees Grid */}
      {loading ? (
        <div className="py-12 text-center text-slate-500">Loading student support queue...</div>
      ) : trainees.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl text-center text-emerald-400 font-semibold">
          🎉 Excellent! No students currently require extra mentorship support.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trainees.map(t => (
            <div key={t.trainee_id} className="glass-card p-5 rounded-2xl space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-rose-600 text-white flex items-center justify-center font-extrabold text-sm shadow-md">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{t.name}</h3>
                      <span className="text-[10px] font-mono text-cyan-400">{t.employee_id}</span>
                    </div>
                  </div>
                  <StatusBadge status={t.risk_level} />
                </div>

                <div className="mt-4 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Current Score:</span>
                    <span className="font-extrabold text-rose-400">{t.score}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Course Program:</span>
                    <span className="truncate max-w-[200px] text-slate-200">{t.bootcamp_name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Assigned Mentor:</span>
                    <span className="font-semibold text-emerald-400">{t.assigned_mentor || 'None Assigned'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">Needs Extra Practice</span>
                <button
                  onClick={() => setSelectedTrainee(t)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition"
                >
                  Assign Mentor
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mentor Assignment Modal */}
      {selectedTrainee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Assign Mentor to {selectedTrainee.name}</h3>
            <p className="text-xs text-slate-300">
              Select a top-performing student to mentor {selectedTrainee.name} on practice projects.
            </p>

            <div className="space-y-2 text-xs">
              <label className="text-slate-400 block font-semibold">Select Peer Mentor</label>
              <select 
                value={mentorName}
                onChange={(e) => setMentorName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 outline-none focus:border-cyan-500"
              >
                <option value="Aarav Sharma">Aarav Sharma (Score: 94.5% - Top Graduate)</option>
                <option value="Olivia Kim">Olivia Kim (Score: 96.0% - Top Student)</option>
                <option value="Sophia Chen">Sophia Chen (Score: 91.8% - High Scorer)</option>
                <option value="Zara Hassan">Zara Hassan (Score: 88.5% - High Scorer)</option>
              </select>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button 
                onClick={() => setSelectedTrainee(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold text-xs"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleAssignMentor(selectedTrainee.trainee_id)}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
              >
                Confirm Mentor Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
