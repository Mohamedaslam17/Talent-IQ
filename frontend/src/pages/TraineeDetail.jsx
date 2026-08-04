import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Modal } from '../components/common/Modal';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  GraduationCap, 
  Building2, 
  Mail, 
  Phone, 
  FileText
} from 'lucide-react';

export const TraineeDetail = ({ traineeId, onClose }) => {
  const [trainee, setTrainee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (traineeId) {
      api.getTraineeById(traineeId).then(data => {
        setTrainee(data);
        setLoading(false);
      });
    }
  }, [traineeId]);

  if (!traineeId) return null;

  return (
    <Modal 
      isOpen={!!traineeId} 
      onClose={onClose} 
      title={trainee ? `Trainee Profile: ${trainee.name}` : 'Loading Trainee Details...'}
    >
      {loading || !trainee ? (
        <div className="py-12 text-center text-slate-500 font-medium">Loading Trainee Metrics...</div>
      ) : (
        <div className="space-y-6 text-xs text-slate-200">
          {/* Top Header Card */}
          <div className="glass-card p-4 sm:p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center font-black text-lg sm:text-xl text-white shadow-lg shrink-0">
                {trainee.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base font-extrabold text-white">{trainee.name}</h2>
                  <span className="font-mono text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 whitespace-nowrap">
                    {trainee.employee_id}
                  </span>
                </div>
                <div className="text-slate-400 mt-1 flex flex-wrap items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5 shrink-0 text-cyan-400" /> {trainee.bootcamp_name}</span>
                  <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5 shrink-0" /> {trainee.college}</span>
                </div>
                <div className="text-slate-400 mt-1 flex flex-wrap items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 shrink-0" /> {trainee.email}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 shrink-0" /> {trainee.phone}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-4 self-stretch justify-between md:justify-end shrink-0">
              <div className="text-left md:text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block whitespace-nowrap">Readiness Score</span>
                <span className="text-2xl font-black text-emerald-400">{trainee.score}%</span>
              </div>
              <StatusBadge status={trainee.risk_level} />
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] text-slate-400 block whitespace-nowrap">Attendance Rate</span>
              <span className="text-base font-bold text-white mt-1 block">{trainee.attendance_rate}%</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] text-slate-400 block whitespace-nowrap">Project Readiness</span>
              <span className={`text-base font-bold mt-1 block ${trainee.is_project_ready ? 'text-emerald-400' : 'text-amber-400'}`}>
                {trainee.is_project_ready ? 'Ready' : 'Pending'}
              </span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] text-slate-400 block whitespace-nowrap">Certification</span>
              <span className={`text-base font-bold mt-1 block ${trainee.is_certified ? 'text-indigo-400' : 'text-slate-400'}`}>
                {trainee.is_certified ? 'Certified' : 'Not Certified'}
              </span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] text-slate-400 block whitespace-nowrap">Mentoring Status</span>
              <span className={`text-base font-bold mt-1 block ${trainee.needs_mentoring ? 'text-rose-400' : 'text-slate-400'}`}>
                {trainee.needs_mentoring ? 'Mentoring' : 'On Track'}
              </span>
            </div>
          </div>

          {/* Skills Matrix */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Technical Skill Matrix</h3>
            <div className="flex flex-wrap gap-1.5">
              {(trainee.skills || []).map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-lg text-xs font-semibold whitespace-nowrap">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Simulation Project Section */}
          {trainee.simulation_project && (
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Capstone Simulation Project</span>
                </h3>
                <StatusBadge status={trainee.simulation_project.status} />
              </div>
              <div>
                <h4 className="font-bold text-cyan-400 text-sm">{trainee.simulation_project.project_title}</h4>
                <p className="text-slate-300 mt-1 text-xs leading-relaxed">{trainee.simulation_project.project_description}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800 text-[11px]">
                <div>
                  <span className="text-slate-400 block">Technical Marks</span>
                  <span className="font-semibold text-white">{trainee.simulation_project.obtained_marks} / 100</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Presentation</span>
                  <span className="font-semibold text-white">{trainee.simulation_project.presentation_score}%</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Communication</span>
                  <span className="font-semibold text-white">{trainee.simulation_project.communication_score}%</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Overall Score</span>
                  <span className="font-bold text-emerald-400">{trainee.simulation_project.overall_score}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Assessment History Table */}
          {trainee.assessments && trainee.assessments.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Assessment History</h3>
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead>
                      <tr className="bg-slate-950/60 text-slate-400 border-b border-slate-800 text-[10px]">
                        <th className="py-2.5 px-3">Test Name</th>
                        <th className="py-2.5 px-3">Module</th>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3 text-right">Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {trainee.assessments.map((a) => (
                        <tr key={a.id}>
                          <td className="py-2.5 px-3 font-semibold text-white">{a.test_name}</td>
                          <td className="py-2.5 px-3 text-slate-400">{a.module_name}</td>
                          <td className="py-2.5 px-3 text-slate-400">{a.date}</td>
                          <td className="py-2.5 px-3 text-right font-bold text-emerald-400">{a.obtained_marks}/{a.max_marks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};
