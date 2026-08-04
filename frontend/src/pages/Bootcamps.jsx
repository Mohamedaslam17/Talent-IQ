import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { Modal } from '../components/common/Modal';
import { GraduationCap, Calendar, Users, UserCheck, Plus, ChevronRight } from 'lucide-react';

export const Bootcamps = () => {
  const { user } = useAuth();
  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: 'Cloud Native Microservices 2026',
    code: 'BC-CLOUD-2026',
    lead_trainer: 'Marcus Vance',
    start_date: '2026-04-01',
    end_date: '2026-07-31',
    description: 'Enterprise track covering React, Node.js, Express, Docker, and Kubernetes deployment.'
  });

  const fetchBootcamps = () => {
    setLoading(true);
    api.getBootcamps().then(data => {
      setBootcamps(data || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchBootcamps();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.addBootcamp(form).then(() => {
      setIsModalOpen(false);
      fetchBootcamps();
    });
  };

  if (loading) {
    return <div className="py-12 text-center text-slate-400">Loading Bootcamps...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 text-cyan-400" />
            <span>Bootcamps & Cohort Architecture</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Active Systech technical training programs, module progression, and lead instructor assignments.
          </p>
        </div>

        {(user?.role === 'HR / L&D' || user?.role === 'Admin') && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Launch New Bootcamp Track</span>
          </button>
        )}
      </div>

      {/* Bootcamps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bootcamps.map(b => (
          <div key={b.bootcamp_id} className="glass-card p-6 rounded-2xl space-y-4 relative flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[10px] text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    {b.code}
                  </span>
                  <h3 className="text-base font-extrabold text-white mt-1.5">{b.name}</h3>
                </div>
                <StatusBadge status={b.status} />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{b.description}</p>

              <div className="grid grid-cols-2 gap-3 py-2 border-y border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-cyan-400" />
                  <div>
                    <span className="block text-[10px] text-slate-500">Lead Trainer</span>
                    <span className="font-semibold text-slate-200">{b.lead_trainer}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="block text-[10px] text-slate-500">Enrolled Cohort</span>
                    <span className="font-semibold text-slate-200">{b.trainees_count} Trainees</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>{b.start_date} to {b.end_date}</span>
              </div>
              <button className="text-cyan-400 font-semibold flex items-center gap-1 hover:text-cyan-300">
                Modules Hub <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal to Launch New Bootcamp */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Launch New Technical Bootcamp Track">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Bootcamp Title</label>
            <input 
              type="text" 
              required 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Track Code</label>
              <input 
                type="text" 
                required 
                value={form.code} 
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Lead Instructor</label>
              <input 
                type="text" 
                required 
                value={form.lead_trainer} 
                onChange={(e) => setForm({ ...form, lead_trainer: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Description</label>
            <textarea 
              rows="3" 
              value={form.description} 
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
            />
          </div>
          <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-cyan-500 text-slate-950 rounded-xl font-bold">Launch Bootcamp</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
