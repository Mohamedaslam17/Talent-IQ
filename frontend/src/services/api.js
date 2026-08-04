// Frontend API Service with Node Express backend connection & fallback support

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const api = {
  // Auth
  async login(email, role) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API fallback for login:', e);
    }
    return {
      success: true,
      user: {
        id: 1,
        name: email.includes('admin') ? 'Systech Admin' : email.includes('trainer') ? 'Marcus Vance' : email.includes('hr') ? 'Elena Rostova' : 'David Sterling',
        email: email,
        role: role || (email.includes('admin') ? 'Admin' : email.includes('trainer') ? 'Trainer' : email.includes('hr') ? 'HR / L&D' : 'Department Head'),
        title: 'Systech Specialist'
      }
    };
  },

  // Dashboard stats
  async getDashboardStats() {
    try {
      const res = await fetch(`${API_BASE_URL}/dashboard/stats`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {
      console.warn('Backend API fallback for stats:', e);
    }
    return null;
  },

  // Trainees
  async getTrainees(filters = {}) {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`${API_BASE_URL}/trainees?${query}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {
      console.warn('Backend API fallback for trainees:', e);
    }
    return [];
  },

  async getTraineeById(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/trainees/${id}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {
      console.warn('Backend API fallback for trainee details:', e);
    }
    return null;
  },

  async addTrainee(data) {
    try {
      const res = await fetch(`${API_BASE_URL}/trainees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API fallback for add trainee:', e);
    }
    return { success: false };
  },

  async deleteTrainee(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/trainees/${id}`, { method: 'DELETE' });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API fallback for delete trainee:', e);
    }
    return { success: false };
  },

  async assignMentor(id, mentorName) {
    try {
      const res = await fetch(`${API_BASE_URL}/trainees/${id}/assign-mentor`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mentor_name: mentorName })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API fallback for assign mentor:', e);
    }
    return { success: false };
  },

  // Bootcamps
  async getBootcamps() {
    try {
      const res = await fetch(`${API_BASE_URL}/bootcamps`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {
      console.warn('Backend API fallback for bootcamps:', e);
    }
    return [];
  },

  async addBootcamp(data) {
    try {
      const res = await fetch(`${API_BASE_URL}/bootcamps`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API fallback for add bootcamp:', e);
    }
    return { success: false };
  },

  // Assessments & Grading
  async getAssessments() {
    try {
      const res = await fetch(`${API_BASE_URL}/assessments`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Backend API fallback for assessments:', e);
    }
    return { assessments: [], feedback: [] };
  },

  async addAssessmentScore(data) {
    try {
      const res = await fetch(`${API_BASE_URL}/assessments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API fallback for grade test:', e);
    }
    return { success: false };
  },

  async addTrainerFeedback(data) {
    try {
      const res = await fetch(`${API_BASE_URL}/assessments/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API fallback for trainer feedback:', e);
    }
    return { success: false };
  },

  // Projects & Capstones
  async getProjects() {
    try {
      const res = await fetch(`${API_BASE_URL}/projects`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Backend API fallback for projects:', e);
    }
    return { projects: [], certifications: [] };
  },

  async evaluateProject(traineeId, data) {
    try {
      const res = await fetch(`${API_BASE_URL}/projects/${traineeId}/evaluate`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API fallback for project evaluation:', e);
    }
    return { success: false };
  },

  // Notifications
  async getNotifications() {
    try {
      const res = await fetch(`${API_BASE_URL}/notifications`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {
      console.warn('Backend API fallback for notifications:', e);
    }
    return [];
  },

  // AI Diagnostics (Supports 'ai' vs 'static' mode)
  async getAiDiagnostics(mode = 'static') {
    try {
      const res = await fetch(`${API_BASE_URL}/diagnostics?mode=${mode}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Backend API fallback for diagnostics:', e);
    }
    return { success: true, mode: 'static', data: null };
  }
};
