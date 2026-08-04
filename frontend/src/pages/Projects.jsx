import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { Modal } from '../components/common/Modal';
import { Award, FileCode2, CheckCircle2, Star, ShieldCheck, Edit3 } from 'lucide-react';

export const Projects = () => {
  const { user } = useAuth();
  const [data, setData] = useState({ projects: [], certifications: [] });
  const [trainees, setTrainees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    trainee_id: 105,
    presentation_score: 90,
    obtained_marks: 88,
    technical_evaluation: 'Solid FastAPI microservices implementation with Docker integration.',
    trainer_remarks: 'Approved for Client Deployment.'
  });

  const fetchData = () => {
    setLoading(true);
    api.getProjects().then(res => {
      setData(res || { projects: [], certifications: [] });
      setLoading(false);
    });
    api.getTrainees().then(res => setTrainees(res || []));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.evaluateProject(form.trainee_id, form).then(() => {
      setIsModalOpen(false);
      fetchData();
    });
  };

  if (loading) {
    return <div className="py-12 text-center text-slate-400">Loading Capstones & Certifications...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2.5">
            <Award className="w-5 h-5 text-cyan-400" />
            <span>Capstone Projects & External Certifications</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Production simulation capstone project scores, architectural evaluations, and verified cloud certifications.
          </p>
        </div>

        {(user?.role === 'Trainer' || user?.role === 'Admin') && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition self-start md:self-auto"
          >
            <Edit3 className="w-4 h-4" />
            <span>Evaluate Capstone Project</span>
          </button>
        )}
      </div>

      {/* Capstone Projects Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <FileCode2 className="w-4 h-4 text-cyan-400" />
          <span>Capstone Projects Evaluation Stream</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.projects.map(p => (
            <div key={p.id} className="glass-card p-5 rounded-2xl space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-semibold text-slate-400">Trainee: {p.trainee_name}</span>
                  <h4 className="text-sm font-extrabold text-white mt-0.5">{p.project_title}</h4>
                </div>
                <StatusBadge status={p.status} />
              </div>

              <p className="text-xs text-slate-300">{p.project_description}</p>

              <div className="grid grid-cols-3 gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Presentation</span>
                  <span className="font-bold text-white">{p.presentation_score}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Technical Score</span>
                  <span className="font-bold text-white">{p.obtained_marks}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Overall Score</span>
                  <span className="font-extrabold text-emerald-400">{p.overall_score}%</span>
                </div>
              </div>

              {p.technical_evaluation && (
                <div className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg">
                  <span className="font-semibold text-cyan-400">Tech Eval:</span> {p.technical_evaluation}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Industry Certifications Table */}
      <div className="glass-panel p-5 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Verified Cloud & Data Certifications</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-900/60 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-semibold">Trainee</th>
                <th className="py-3 px-4 font-semibold">Certification Name</th>
                <th className="py-3 px-4 font-semibold">Score</th>
                <th className="py-3 px-4 font-semibold">Result</th>
                <th className="py-3 px-4 font-semibold">Date Completed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {data.certifications.map(c => (
                <tr key={c.certification_id} className="hover:bg-slate-900/60 transition">
                  <td className="py-3 px-4 font-semibold text-white">{c.trainee_name}</td>
                  <td className="py-3 px-4 text-cyan-400 font-semibold">{c.certification_name}</td>
                  <td className="py-3 px-4 font-bold text-slate-200">{c.score}</td>
                  <td className="py-3 px-4"><StatusBadge status={c.result} /></td>
                  <td className="py-3 px-4 text-slate-400">{c.completed_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Evaluate Project Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Evaluate Capstone Simulation Project">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Select Trainee</label>
            <select 
              value={form.trainee_id} 
              onChange={(e) => setForm({ ...form, trainee_id: parseInt(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
            >
              {trainees.map(t => (
                <option key={t.trainee_id} value={t.trainee_id}>{t.name} ({t.employee_id})</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Presentation Score (%)</label>
              <input 
                type="number" 
                required 
                value={form.presentation_score} 
                onChange={(e) => setForm({ ...form, presentation_score: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Technical Execution Score (%)</label>
              <input 
                type="number" 
                required 
                value={form.obtained_marks} 
                onChange={(e) => setForm({ ...form, obtained_marks: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Technical Evaluation Notes</label>
            <textarea 
              rows="2" 
              value={form.technical_evaluation} 
              onChange={(e) => setForm({ ...form, technical_evaluation: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Instructor Remarks</label>
            <input 
              type="text" 
              value={form.trainer_remarks} 
              onChange={(e) => setForm({ ...form, trainer_remarks: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
            />
          </div>
          <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-cyan-500 text-slate-950 rounded-xl font-bold">Publish Capstone Evaluation</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
