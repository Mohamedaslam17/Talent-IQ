import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { Modal } from '../components/common/Modal';
import { TraineeDetail } from './TraineeDetail';
import { 
  Users, 
  Search, 
  UserPlus, 
  LayoutGrid, 
  List, 
  GraduationCap, 
  Building2, 
  ChevronRight,
  Trash2
} from 'lucide-react';

export const TraineeDirectory = () => {
  const { user } = useAuth();
  const [trainees, setTrainees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [bootcampFilter, setBootcampFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // table or grid

  const [selectedTraineeId, setSelectedTraineeId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Add Trainee Form state
  const [newTrainee, setNewTrainee] = useState({
    name: '',
    email: '',
    employee_id: '',
    bootcamp_id: 1,
    college: '',
    degree: '',
    score: 80,
    skills: 'Python, SQL, Azure'
  });

  const fetchTrainees = () => {
    setLoading(true);
    api.getTrainees({
      search,
      bootcamp_id: bootcampFilter,
      risk_level: riskFilter
    }).then(data => {
      setTrainees(data || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchTrainees();
  }, [search, bootcampFilter, riskFilter]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    api.addTrainee(newTrainee).then(res => {
      setIsAddModalOpen(false);
      fetchTrainees();
      setNewTrainee({
        name: '',
        email: '',
        employee_id: '',
        bootcamp_id: 1,
        college: '',
        degree: '',
        score: 80,
        skills: 'Python, SQL, Azure'
      });
    });
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this trainee record?')) {
      api.deleteTrainee(id).then(() => fetchTrainees());
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-5 sm:p-6 rounded-2xl">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2.5">
            <Users className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>Trainee Readiness Directory</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Manage trainee records, assessment metrics, skill profiles, and individual readiness scores.
          </p>
        </div>

        {(user?.role === 'Admin' || user?.role === 'HR / L&D') && (
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition shrink-0 whitespace-nowrap"
          >
            <UserPlus className="w-4 h-4 shrink-0" />
            <span>Add New Trainee</span>
          </button>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row flex-1 items-stretch sm:items-center gap-2.5 sm:gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, ID, college..."
              className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 outline-none"
            />
          </div>

          {/* Bootcamp Filter */}
          <select 
            value={bootcampFilter}
            onChange={(e) => setBootcampFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-cyan-500 shrink-0"
          >
            <option value="all">All Bootcamps</option>
            <option value="1">GenAI & Cloud Architecture</option>
            <option value="2">Data Engineering & Analytics</option>
            <option value="3">Full Stack Cloud Native</option>
          </select>

          {/* Risk Level Filter */}
          <select 
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-cyan-500 shrink-0"
          >
            <option value="all">All Risk Levels</option>
            <option value="Low Risk">Low Risk (85-100%)</option>
            <option value="Moderate Risk">Moderate Risk (70-84%)</option>
            <option value="High Risk">High Risk (&lt;70%)</option>
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-end gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl shrink-0">
          <button 
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-lg text-xs transition ${viewMode === 'table' ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <List className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg text-xs transition ${viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Trainees Content */}
      {loading ? (
        <div className="text-center py-12 text-slate-500 font-medium">Loading Trainees...</div>
      ) : trainees.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl text-center text-slate-400">
          No trainees found matching your criteria.
        </div>
      ) : viewMode === 'table' ? (
        /* Table View with whitespace-nowrap */
        <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead>
                <tr className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4 font-semibold">Trainee Name</th>
                  <th className="py-3.5 px-4 font-semibold">Employee ID</th>
                  <th className="py-3.5 px-4 font-semibold">Bootcamp Track</th>
                  <th className="py-3.5 px-4 font-semibold">Score</th>
                  <th className="py-3.5 px-4 font-semibold">Attendance</th>
                  <th className="py-3.5 px-4 font-semibold">Risk Benchmark</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {trainees.map((t) => (
                  <tr 
                    key={t.trainee_id} 
                    onClick={() => setSelectedTraineeId(t.trainee_id)}
                    className="hover:bg-slate-900/80 cursor-pointer transition"
                  >
                    <td className="py-3.5 px-4 font-semibold flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center font-bold text-xs border border-slate-700 shrink-0">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-bold">{t.name}</div>
                        <div className="text-[10px] text-slate-400">{t.college}</div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300">{t.employee_id}</td>
                    <td className="py-3.5 px-4 text-slate-300 max-w-[200px] truncate">{t.bootcamp_name}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-400">{t.score}%</td>
                    <td className="py-3.5 px-4 text-slate-300">{t.attendance_rate}%</td>
                    <td className="py-3.5 px-4"><StatusBadge status={t.risk_level} /></td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="inline-flex items-center text-cyan-400 font-semibold text-xs hover:text-cyan-300">
                          View <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                        </span>
                        {user?.role === 'Admin' && (
                          <button 
                            onClick={(e) => handleDelete(e, t.trainee_id)} 
                            className="p-1 text-slate-500 hover:text-rose-400 rounded transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trainees.map((t) => (
            <div 
              key={t.trainee_id}
              onClick={() => setSelectedTraineeId(t.trainee_id)}
              className="glass-card p-4 sm:p-5 rounded-2xl cursor-pointer flex flex-col justify-between space-y-4 hover:border-cyan-500/40"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-md shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-white truncate">{t.name}</h3>
                      <span className="text-[10px] font-mono text-cyan-400 block">{t.employee_id}</span>
                    </div>
                  </div>
                  <StatusBadge status={t.risk_level} />
                </div>

                <div className="mt-4 space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{t.bootcamp_name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                    <Building2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{t.college}</span>
                  </div>
                </div>
              </div>

              {/* Skill Badges */}
              <div className="flex flex-wrap gap-1">
                {(t.skills || []).slice(0, 3).map((s, idx) => (
                  <span key={idx} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700 whitespace-nowrap">
                    {s}
                  </span>
                ))}
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 text-[10px]">Readiness Score: </span>
                  <span className="font-bold text-emerald-400">{t.score}%</span>
                </div>
                <div className="text-cyan-400 font-semibold text-xs flex items-center gap-0.5">
                  Details <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Trainee Detail Modal */}
      {selectedTraineeId && (
        <TraineeDetail 
          traineeId={selectedTraineeId} 
          onClose={() => setSelectedTraineeId(null)} 
        />
      )}

      {/* Add Trainee Modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="Register New Trainee"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Full Name</label>
              <input 
                type="text"
                required
                value={newTrainee.name}
                onChange={(e) => setNewTrainee({ ...newTrainee, name: e.target.value })}
                placeholder="e.g. Maya Lin"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Corporate Email</label>
              <input 
                type="email"
                required
                value={newTrainee.email}
                onChange={(e) => setNewTrainee({ ...newTrainee, email: e.target.value })}
                placeholder="maya.lin@systech.com"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Employee ID</label>
              <input 
                type="text"
                value={newTrainee.employee_id}
                onChange={(e) => setNewTrainee({ ...newTrainee, employee_id: e.target.value })}
                placeholder="SYS-2026-009"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Assigned Bootcamp</label>
              <select 
                value={newTrainee.bootcamp_id}
                onChange={(e) => setNewTrainee({ ...newTrainee, bootcamp_id: parseInt(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-3 py-2 outline-none focus:border-cyan-500"
              >
                <option value={1}>GenAI & Cloud Architecture 2026</option>
                <option value={2}>Data Engineering & Analytics 2026</option>
                <option value={3}>Full Stack Cloud Native 2026</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">University / College</label>
              <input 
                type="text"
                value={newTrainee.college}
                onChange={(e) => setNewTrainee({ ...newTrainee, college: e.target.value })}
                placeholder="University of Washington"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Degree</label>
              <input 
                type="text"
                value={newTrainee.degree}
                onChange={(e) => setNewTrainee({ ...newTrainee, degree: e.target.value })}
                placeholder="B.S. Computer Science"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Technical Skills (Comma separated)</label>
            <input 
              type="text"
              value={newTrainee.skills}
              onChange={(e) => setNewTrainee({ ...newTrainee, skills: e.target.value })}
              placeholder="Python, Azure OpenAI, FastAPI, Docker"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
            <button 
              type="button" 
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold"
            >
              Register Trainee
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
