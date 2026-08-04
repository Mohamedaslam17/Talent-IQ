import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { Modal } from '../components/common/Modal';
import { ClipboardCheck, BookOpen, Star, Plus, CheckCircle2, User } from 'lucide-react';

export const Assessments = () => {
  const { user } = useAuth();
  const [data, setData] = useState({ assessments: [], feedback: [] });
  const [trainees, setTrainees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  // Form states
  const [gradeForm, setGradeForm] = useState({
    trainee_id: 105,
    test_name: 'Weekly Test 3 - Microservices & Docker',
    module_name: 'GenAI & Cloud Architecture',
    obtained_marks: 85,
    max_marks: 100
  });

  const [feedbackForm, setFeedbackForm] = useState({
    trainee_id: 105,
    tech_knowledge: 4,
    strengths: 'Good understanding of FastAPI structure.',
    improvement_areas: 'Async error handling and unit tests.',
    overall_comments: 'Showing steady progress after lab intervention.'
  });

  const fetchData = () => {
    setLoading(true);
    api.getAssessments().then(res => {
      setData(res || { assessments: [], feedback: [] });
      setLoading(false);
    });
    api.getTrainees().then(res => setTrainees(res || []));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGradeSubmit = (e) => {
    e.preventDefault();
    api.addAssessmentScore(gradeForm).then(() => {
      setIsGradeModalOpen(false);
      fetchData();
    });
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    api.addTrainerFeedback(feedbackForm).then(() => {
      setIsFeedbackModalOpen(false);
      fetchData();
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2.5">
            <ClipboardCheck className="w-5 h-5 text-cyan-400" />
            <span>Modules & Assessment Gradebook</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Weekly test records, assignment gradebooks, and qualitative instructor feedback logs.
          </p>
        </div>

        {/* Trainer Action Buttons */}
        {(user?.role === 'Trainer' || user?.role === 'Admin') && (
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsGradeModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition"
            >
              <Plus className="w-4 h-4" />
              <span>Grade Test Score</span>
            </button>
            <button 
              onClick={() => setIsFeedbackModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition"
            >
              <Star className="w-4 h-4" />
              <span>Submit Feedback</span>
            </button>
          </div>
        )}
      </div>

      {/* Assessment Table */}
      <div className="glass-panel p-5 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>Weekly Test Records</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-900/60 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-semibold">Trainee</th>
                <th className="py-3 px-4 font-semibold">Test Name</th>
                <th className="py-3 px-4 font-semibold">Module</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Score</th>
                <th className="py-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {data.assessments.map(a => (
                <tr key={a.id} className="hover:bg-slate-900/60 transition">
                  <td className="py-3 px-4 font-semibold text-white">{a.trainee_name}</td>
                  <td className="py-3 px-4 text-cyan-400 font-medium">{a.test_name}</td>
                  <td className="py-3 px-4 text-slate-400">{a.module_name}</td>
                  <td className="py-3 px-4 text-slate-400">{a.date}</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">{a.obtained_marks} / {a.max_marks}</td>
                  <td className="py-3 px-4"><StatusBadge status={a.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trainer Feedback Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-400" />
          <span>Qualitative Trainer Feedback Stream</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.feedback.map(f => (
            <div key={f.feedback_id} className="glass-card p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
                <div className="font-bold text-white flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{f.trainee_name}</span>
                </div>
                <span className="text-slate-400 text-[10px]">Evaluator: {f.trainer_name}</span>
              </div>
              <div className="text-xs space-y-1.5 text-slate-300">
                <p><span className="font-semibold text-emerald-400">Strengths:</span> {f.strengths}</p>
                <p><span className="font-semibold text-amber-400">Areas for Improvement:</span> {f.improvement_areas}</p>
                <p><span className="font-semibold text-cyan-400">Comments:</span> {f.overall_comments}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grade Test Modal */}
      <Modal isOpen={isGradeModalOpen} onClose={() => setIsGradeModalOpen(false)} title="Grade Weekly Test Score">
        <form onSubmit={handleGradeSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Select Trainee</label>
            <select 
              value={gradeForm.trainee_id} 
              onChange={(e) => setGradeForm({ ...gradeForm, trainee_id: parseInt(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
            >
              {trainees.map(t => (
                <option key={t.trainee_id} value={t.trainee_id}>{t.name} ({t.employee_id}) - Score: {t.score}%</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Test Title</label>
            <input 
              type="text" 
              required 
              value={gradeForm.test_name} 
              onChange={(e) => setGradeForm({ ...gradeForm, test_name: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Obtained Marks</label>
              <input 
                type="number" 
                required 
                value={gradeForm.obtained_marks} 
                onChange={(e) => setGradeForm({ ...gradeForm, obtained_marks: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Max Marks</label>
              <input 
                type="number" 
                required 
                value={gradeForm.max_marks} 
                onChange={(e) => setGradeForm({ ...gradeForm, max_marks: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>
          <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
            <button type="button" onClick={() => setIsGradeModalOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-cyan-500 text-slate-950 rounded-xl font-bold">Submit Grade & Recalculate</button>
          </div>
        </form>
      </Modal>

      {/* Submit Feedback Modal */}
      <Modal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} title="Submit Qualitative Instructor Feedback">
        <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Select Trainee</label>
            <select 
              value={feedbackForm.trainee_id} 
              onChange={(e) => setFeedbackForm({ ...feedbackForm, trainee_id: parseInt(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
            >
              {trainees.map(t => (
                <option key={t.trainee_id} value={t.trainee_id}>{t.name} ({t.employee_id})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Technical Knowledge Rating (1 to 5)</label>
            <input 
              type="number" 
              min="1" 
              max="5" 
              value={feedbackForm.tech_knowledge} 
              onChange={(e) => setFeedbackForm({ ...feedbackForm, tech_knowledge: parseInt(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Key Strengths</label>
            <input 
              type="text" 
              value={feedbackForm.strengths} 
              onChange={(e) => setFeedbackForm({ ...feedbackForm, strengths: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Areas for Improvement</label>
            <input 
              type="text" 
              value={feedbackForm.improvement_areas} 
              onChange={(e) => setFeedbackForm({ ...feedbackForm, improvement_areas: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Overall Instructor Comments</label>
            <textarea 
              rows="3" 
              value={feedbackForm.overall_comments} 
              onChange={(e) => setFeedbackForm({ ...feedbackForm, overall_comments: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
            />
          </div>
          <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
            <button type="button" onClick={() => setIsFeedbackModalOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold">Publish Instructor Feedback</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
