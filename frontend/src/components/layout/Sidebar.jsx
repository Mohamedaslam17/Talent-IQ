import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Users, 
  ClipboardCheck, 
  Award, 
  FileSpreadsheet, 
  Sparkles,
  Zap,
  ShieldAlert,
  UserCheck,
  Building2,
  X
} from 'lucide-react';

export const Sidebar = ({ isMobileOpen, onClose }) => {
  const { user } = useAuth();
  const role = user?.role || 'Admin';

  const getNavItems = () => {
    switch (role) {
      case 'Trainer':
        return [
          { path: '/', label: 'Overview', icon: LayoutDashboard },
          { path: '/assessments', label: 'Grades & Test Evaluator', icon: ClipboardCheck, badge: 'Trainer' },
          { path: '/projects', label: 'Project Grading', icon: Award },
          { path: '/trainees', label: 'Student Directory', icon: Users },
          { path: '/diagnostics', label: 'AI Performance Insights', icon: Sparkles }
        ];

      case 'HR / L&D':
        return [
          { path: '/', label: 'Overview', icon: LayoutDashboard },
          { path: '/bootcamps', label: 'Training Programs', icon: GraduationCap, badge: 'HR' },
          { path: '/remediation', label: 'Student Mentorship', icon: UserCheck, badge: 'Action' },
          { path: '/trainees', label: 'Student Directory', icon: Users },
          { path: '/reports', label: 'Reports & Exports', icon: FileSpreadsheet },
          { path: '/diagnostics', label: 'AI Performance Insights', icon: Sparkles }
        ];

      case 'Department Head':
        return [
          { path: '/', label: 'Overview Dashboard', icon: LayoutDashboard },
          { path: '/pipeline', label: 'Project Placement', icon: Building2, badge: 'Executive' },
          { path: '/reports', label: 'Executive Reports', icon: FileSpreadsheet },
          { path: '/diagnostics', label: 'AI Performance Insights', icon: Sparkles }
        ];

      case 'Admin':
      default:
        return [
          { path: '/', label: 'Overview Dashboard', icon: LayoutDashboard },
          { path: '/bootcamps', label: 'Training Programs', icon: GraduationCap },
          { path: '/trainees', label: 'Student Directory', icon: Users },
          { path: '/assessments', label: 'Grades & Tests', icon: ClipboardCheck },
          { path: '/projects', label: 'Projects & Certifications', icon: Award },
          { path: '/audit', label: 'System Activity Logs', icon: ShieldAlert, badge: 'Admin' },
          { path: '/reports', label: 'Reports & Exports', icon: FileSpreadsheet },
          { path: '/diagnostics', label: 'AI Performance Insights', icon: Sparkles }
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          {/* Top Branding */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base font-extrabold text-white tracking-wide">TalentIQ</h1>
                <p className="text-[10px] font-semibold text-cyan-400 uppercase tracking-widest">Systech Platform</p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button 
              onClick={onClose}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-140px)]">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Main Menu</span>
              <span className="text-[9px] text-cyan-400 font-mono">{role}</span>
            </div>
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                      isActive 
                        ? 'bg-gradient-to-r from-cyan-500/20 to-sky-500/10 text-cyan-400 border border-cyan-500/30 shadow-md shadow-cyan-500/5' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Target Goal Indicator */}
        <div className="p-4 border-t border-slate-800/80">
          <div className="glass-card p-3 rounded-xl">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300 mb-1">
              <span>Target Goal</span>
              <span className="text-emerald-400">88.5% Pass</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 w-[88.5%]" />
            </div>
            <div className="mt-2 text-[10px] text-slate-400 flex justify-between">
              <span>24 Students</span>
              <span>Target: 85%</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
