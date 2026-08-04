import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('talentiq_user');
    return saved ? JSON.parse(saved) : {
      id: 1,
      name: "Systech Admin",
      email: "admin@talentiq.com",
      role: "Admin",
      title: "Lead Systems Administrator"
    };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('talentiq_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('talentiq_user');
    }
  }, [user]);

  const switchRole = (newRole) => {
    const roleEmails = {
      "Admin": "admin@talentiq.com",
      "Trainer": "trainer@talentiq.com",
      "HR / L&D": "hr@talentiq.com",
      "Department Head": "depthead@talentiq.com"
    };

    const email = roleEmails[newRole] || "admin@talentiq.com";
    
    api.login(email, newRole).then(res => {
      if (res && res.user) {
        setUser({ ...res.user, role: newRole });
      }
    });
  };

  const logout = () => {
    setUser(null);
  };

  const loginAs = (email, role) => {
    api.login(email, role).then(res => {
      if (res && res.user) {
        setUser(res.user);
      }
    });
  };

  return (
    <AuthContext.Provider value={{ user, switchRole, logout, loginAs }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
