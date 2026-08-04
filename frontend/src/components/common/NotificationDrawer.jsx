import React, { useState, useEffect } from 'react';
import { X, Bell, CheckCircle2, AlertTriangle, Award, BookOpen } from 'lucide-react';
import { api } from '../../services/api';

export const NotificationDrawer = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (isOpen) {
      api.getNotifications().then(data => setNotifications(data || []));
    }
  }, [isOpen]);

  const markAsRead = (id) => {
    api.markNotificationAsRead(id).then(() => {
      setNotifications(prev => prev.map(n => n.notification_id === id ? { ...n, status: 'Read' } : n));
    });
  };

  if (!isOpen) return null;

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'risk': return <AlertTriangle className="w-5 h-5 text-rose-400" />;
      case 'certification': return <Award className="w-5 h-5 text-emerald-400" />;
      case 'grades': return <BookOpen className="w-5 h-5 text-sky-400" />;
      default: return <Bell className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white">Alerts & Notifications</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-10 text-slate-500">No new notifications</div>
            ) : (
              notifications.map((item) => (
                <div 
                  key={item.notification_id}
                  className={`p-4 rounded-xl border transition ${
                    item.status === 'Unread' 
                      ? 'bg-slate-800/80 border-cyan-500/30' 
                      : 'bg-slate-900/50 border-slate-800 opacity-75'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{getCategoryIcon(item.category)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-white truncate">{item.title}</h4>
                        <span className="text-[10px] text-slate-400">{item.created_at}</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">{item.message}</p>
                      {item.status === 'Unread' && (
                        <button
                          onClick={() => markAsRead(item.notification_id)}
                          className="mt-2.5 text-[11px] font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
