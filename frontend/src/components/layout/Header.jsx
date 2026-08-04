import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, Search, Shield, ChevronDown, UserCheck, Eye, Edit3, Lock, Menu } from 'lucide-react';
import { NotificationDrawer } from '../common/NotificationDrawer';

export const Header = ({ onToggleMobileMenu }) => {
  const { user, switchRole } = useAuth();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const roles = [
    { name: "Admin", desc: "Full System Access", icon: Shield, badge: "Admin" },
    { name: "Trainer", desc: "Grade Tests & Give Feedback", icon: Edit3, badge: "Trainer" },
    { name: "HR / L&D", desc: "Manage Courses & Mentors", icon: UserCheck, badge: "HR" },
    { name: "Department Head", desc: "View Overview Reports", icon: Eye, badge: "Executive" }
  ];

  const getRoleBadgeStyle = (r) => {
    switch(r) {
      case 'Admin': return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'Trainer': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'HR / L&D': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Department Head': return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default: return 'bg-slate-800 text-slate-300';
    }
  };

  return (
    <>
      <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between gap-2">
        {/* Left Section: Mobile Menu Trigger & Search */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative w-full max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search students, courses..."
              className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none"
            />
          </div>

          <span className={`hidden md:inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold border ${getRoleBadgeStyle(user?.role)}`}>
            {user?.role === 'Department Head' && <Lock className="w-3 h-3 mr-1" />}
            {user?.role} View
          </span>
        </div>

        {/* Right Section: Role Switcher, Notifications, User Badge */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Role Switcher */}
          <div className="relative">
            <button 
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-200 transition"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="font-semibold text-cyan-400 text-xs">{user?.role}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {isRoleMenuOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-40">
                <div className="px-3.5 py-1.5 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  Switch Account View
                </div>
                {roles.map(r => (
                  <button
                    key={r.name}
                    onClick={() => {
                      switchRole(r.name);
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-800 transition ${
                      user?.role === r.name ? 'text-cyan-400 font-semibold bg-slate-800/60' : 'text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold flex items-center gap-1.5">
                        <span>{r.name}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {r.badge}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-normal mt-0.5">{r.desc}</div>
                    </div>
                    {user?.role === r.name && <UserCheck className="w-4 h-4 text-cyan-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Trigger */}
          <button 
            onClick={() => setIsNotificationOpen(true)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 relative transition"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400" />
          </button>

          {/* User Info */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow-md shrink-0">
              {user?.name ? user.name.charAt(0) : 'S'}
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-white leading-tight">{user?.name}</div>
              <div className="text-[10px] text-cyan-400 font-medium leading-tight">{user?.role}</div>
            </div>
          </div>
        </div>
      </header>

      <NotificationDrawer 
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </>
  );
};
