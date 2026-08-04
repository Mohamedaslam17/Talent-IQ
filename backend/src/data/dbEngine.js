// TalentIQ Data Engine & State Store

const seedData = require('./seedData');

// Clone seed data into operational state memory
let rolesStore = [...seedData.roles];
let usersStore = [...seedData.users];
let bootcampsStore = [...seedData.bootcamps];
let modulesStore = [...seedData.modules];
let traineesStore = [...seedData.trainees];
let assessmentsStore = [...seedData.assessments];
let simulationProjectsStore = [...seedData.simulationProjects];
let trainerFeedbackStore = [...seedData.trainerFeedback];
let certificationsStore = [...seedData.certifications];
let notificationsStore = [...seedData.notifications];
let recentActivitiesStore = [...seedData.recentActivities];

const dbEngine = {
  // Roles & Users
  getRoles: () => rolesStore,
  getUsers: () => usersStore,
  getUserByEmail: (email) => usersStore.find(u => u.email.toLowerCase() === email.toLowerCase()),

  // Helper to recalculate trainee score and risk level
  recalculateTraineeScore: (traineeId) => {
    const traineeIndex = traineesStore.findIndex(t => t.trainee_id === traineeId);
    if (traineeIndex === -1) return;

    const traineeTests = assessmentsStore.filter(a => a.trainee_id === traineeId);
    const traineeProject = simulationProjectsStore.find(p => p.trainee_id === traineeId);

    let totalPoints = 0;
    let maxPoints = 0;

    traineeTests.forEach(test => {
      if (test.obtained_marks !== null && test.obtained_marks !== undefined) {
        totalPoints += parseFloat(test.obtained_marks);
        maxPoints += parseFloat(test.max_marks || 100);
      }
    });

    if (traineeProject && traineeProject.overall_score) {
      totalPoints += parseFloat(traineeProject.overall_score);
      maxPoints += 100;
    }

    let calculatedScore = traineesStore[traineeIndex].score;
    if (maxPoints > 0) {
      calculatedScore = parseFloat(((totalPoints / maxPoints) * 100).toFixed(1));
    }

    const risk_level = calculatedScore >= 85.0 ? "Low Risk" : calculatedScore >= 70.0 ? "Moderate Risk" : "High Risk";
    const is_project_ready = calculatedScore >= 80.0 ? 1 : 0;
    const needs_mentoring = calculatedScore < 75.0 ? 1 : 0;

    traineesStore[traineeIndex] = {
      ...traineesStore[traineeIndex],
      score: calculatedScore,
      risk_level,
      is_project_ready,
      needs_mentoring
    };

    return traineesStore[traineeIndex];
  },
  
  // Dashboard & Statistics
  getDashboardStats: () => {
    const totalTrainees = traineesStore.length;
    const projectReady = traineesStore.filter(t => t.is_project_ready === 1).length;
    const atRisk = traineesStore.filter(t => t.risk_level === 'High Risk').length;
    const certified = traineesStore.filter(t => t.is_certified === 1).length;
    const avgScore = totalTrainees > 0 
      ? (traineesStore.reduce((acc, t) => acc + t.score, 0) / totalTrainees).toFixed(1) 
      : 0;
    const avgAttendance = totalTrainees > 0 
      ? (traineesStore.reduce((acc, t) => acc + t.attendance_rate, 0) / totalTrainees).toFixed(1) 
      : 0;

    const riskDistribution = [
      { name: "Low Risk", count: traineesStore.filter(t => t.risk_level === 'Low Risk').length, color: "#10b981" },
      { name: "Moderate Risk", count: traineesStore.filter(t => t.risk_level === 'Moderate Risk').length, color: "#f59e0b" },
      { name: "High Risk", count: traineesStore.filter(t => t.risk_level === 'High Risk').length, color: "#ef4444" }
    ];

    const topPerformers = [...traineesStore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    return {
      kpis: {
        total_trainees: totalTrainees,
        project_ready: projectReady,
        readiness_percentage: totalTrainees > 0 ? Math.round((projectReady / totalTrainees) * 100) : 0,
        at_risk_count: atRisk,
        certified_count: certified,
        avg_score: parseFloat(avgScore),
        avg_attendance: parseFloat(avgAttendance)
      },
      risk_distribution: riskDistribution,
      top_performers: topPerformers,
      recent_activities: recentActivitiesStore.slice(0, 8)
    };
  },

  // Bootcamps
  getBootcamps: () => bootcampsStore,
  getBootcampById: (id) => bootcampsStore.find(b => b.bootcamp_id === parseInt(id)),
  addBootcamp: (data) => {
    const newId = bootcampsStore.length > 0 ? Math.max(...bootcampsStore.map(b => b.bootcamp_id)) + 1 : 1;
    const newBootcamp = {
      bootcamp_id: newId,
      name: data.name,
      code: data.code || `BC-${data.name.substring(0, 4).toUpperCase()}-2026`,
      start_date: data.start_date || new Date().toISOString().split('T')[0],
      end_date: data.end_date || "2026-06-30",
      status: "Active",
      trainees_count: 0,
      lead_trainer: data.lead_trainer || "Marcus Vance",
      description: data.description || "Enterprise training track."
    };
    bootcampsStore.unshift(newBootcamp);

    recentActivitiesStore.unshift({
      activity_id: recentActivitiesStore.length + 1,
      description: `Launched new Bootcamp track: ${newBootcamp.name}`,
      created_at: "Just now",
      icon: "GraduationCap",
      user: "Elena Rostova (HR)"
    });

    return newBootcamp;
  },

  // Trainees
  getTrainees: (filters = {}) => {
    let result = [...traineesStore];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.employee_id.toLowerCase().includes(q) || 
        t.email.toLowerCase().includes(q) ||
        t.college.toLowerCase().includes(q)
      );
    }
    if (filters.bootcamp_id && filters.bootcamp_id !== 'all') {
      result = result.filter(t => t.bootcamp_id === parseInt(filters.bootcamp_id));
    }
    if (filters.risk_level && filters.risk_level !== 'all') {
      result = result.filter(t => t.risk_level === filters.risk_level);
    }
    if (filters.status && filters.status !== 'all') {
      result = result.filter(t => t.status === filters.status);
    }
    return result;
  },

  getTraineeById: (id) => {
    const traineeId = parseInt(id);
    const trainee = traineesStore.find(t => t.trainee_id === traineeId);
    if (!trainee) return null;

    const traineeAssessments = assessmentsStore.filter(a => a.trainee_id === traineeId);
    const traineeProject = simulationProjectsStore.find(p => p.trainee_id === traineeId);
    const traineeFeedbackList = trainerFeedbackStore.filter(f => f.trainee_id === traineeId);
    const traineeCerts = certificationsStore.filter(c => c.trainee_id === traineeId);

    return {
      ...trainee,
      assessments: traineeAssessments,
      simulation_project: traineeProject || null,
      trainer_feedback: traineeFeedbackList,
      certifications: traineeCerts
    };
  },

  addTrainee: (data) => {
    const newId = traineesStore.length > 0 ? Math.max(...traineesStore.map(t => t.trainee_id)) + 1 : 101;
    const bootcamp = bootcampsStore.find(b => b.bootcamp_id === parseInt(data.bootcamp_id)) || bootcampsStore[0];
    const newTrainee = {
      trainee_id: newId,
      user_id: newId + 50,
      employee_id: data.employee_id || `SYS-2026-${String(newId).padStart(3, '0')}`,
      name: data.name,
      email: data.email,
      bootcamp_id: bootcamp.bootcamp_id,
      bootcamp_name: bootcamp.name,
      college: data.college || "Systech Academy",
      degree: data.degree || "B.S. Software Engineering",
      joining_date: data.joining_date || new Date().toISOString().split('T')[0],
      status: "Active",
      score: parseFloat(data.score) || 75.0,
      attendance_rate: parseFloat(data.attendance_rate) || 92.0,
      is_certified: data.is_certified ? 1 : 0,
      is_project_ready: data.is_project_ready ? 1 : 0,
      needs_mentoring: data.needs_mentoring ? 1 : 0,
      risk_level: data.score < 70 ? "High Risk" : data.score < 85 ? "Moderate Risk" : "Low Risk",
      phone: data.phone || "+1 (555) 000-0000",
      skills: data.skills ? (Array.isArray(data.skills) ? data.skills : data.skills.split(',').map(s => s.trim())) : ["Python", "SQL"],
      avatar_color: "indigo"
    };

    traineesStore.unshift(newTrainee);
    
    // Update bootcamp trainees count
    bootcamp.trainees_count += 1;

    recentActivitiesStore.unshift({
      activity_id: recentActivitiesStore.length + 1,
      description: `Registered new trainee: ${newTrainee.name} (${newTrainee.employee_id})`,
      created_at: "Just now",
      icon: "UserPlus",
      user: "Systech Admin"
    });

    return newTrainee;
  },

  deleteTrainee: (id) => {
    const traineeId = parseInt(id);
    const index = traineesStore.findIndex(t => t.trainee_id === traineeId);
    if (index !== -1) {
      const deleted = traineesStore.splice(index, 1)[0];
      recentActivitiesStore.unshift({
        activity_id: recentActivitiesStore.length + 1,
        description: `Removed trainee record: ${deleted.name}`,
        created_at: "Just now",
        icon: "Trash2",
        user: "Systech Admin"
      });
      return true;
    }
    return false;
  },

  updateTrainee: (id, updates) => {
    const traineeId = parseInt(id);
    const index = traineesStore.findIndex(t => t.trainee_id === traineeId);
    if (index === -1) return null;

    if (updates.score !== undefined) {
      updates.score = parseFloat(updates.score);
      updates.risk_level = updates.score < 70 ? "High Risk" : updates.score < 85 ? "Moderate Risk" : "Low Risk";
    }

    traineesStore[index] = { ...traineesStore[index], ...updates };
    return traineesStore[index];
  },

  assignMentor: (traineeId, mentorName) => {
    const t = traineesStore.find(item => item.trainee_id === parseInt(traineeId));
    if (t) {
      t.assigned_mentor = mentorName;
      t.needs_mentoring = 0; // Remediation underway
      recentActivitiesStore.unshift({
        activity_id: recentActivitiesStore.length + 1,
        description: `Assigned peer mentor (${mentorName}) to ${t.name}`,
        created_at: "Just now",
        icon: "UserCheck",
        user: "Elena Rostova (HR)"
      });
    }
    return t;
  },

  // Assessments & Grading (Trainer Workflow)
  getAssessments: () => assessmentsStore,
  
  addAssessmentScore: (data) => {
    const trainee = traineesStore.find(t => t.trainee_id === parseInt(data.trainee_id));
    if (!trainee) return null;

    const newId = assessmentsStore.length > 0 ? Math.max(...assessmentsStore.map(a => a.id)) + 1 : 1;
    const newAssessment = {
      id: newId,
      trainee_id: trainee.trainee_id,
      trainee_name: trainee.name,
      module_name: data.module_name || "Azure Cloud Fundamentals",
      test_name: data.test_name || "Weekly Test - Practical Skills",
      max_marks: parseFloat(data.max_marks || 100),
      obtained_marks: parseFloat(data.obtained_marks || 85),
      status: "Graded",
      date: new Date().toISOString().split('T')[0]
    };

    assessmentsStore.unshift(newAssessment);

    // Recalculate trainee overall score in real time!
    dbEngine.recalculateTraineeScore(trainee.trainee_id);

    recentActivitiesStore.unshift({
      activity_id: recentActivitiesStore.length + 1,
      description: `Evaluated grade for ${trainee.name} on ${newAssessment.test_name}: ${newAssessment.obtained_marks}/${newAssessment.max_marks}`,
      created_at: "Just now",
      icon: "CheckCircle",
      user: "Marcus Vance (Trainer)"
    });

    return newAssessment;
  },

  addTrainerFeedback: (data) => {
    const trainee = traineesStore.find(t => t.trainee_id === parseInt(data.trainee_id));
    if (!trainee) return null;

    const newFeedback = {
      feedback_id: trainerFeedbackStore.length + 1,
      trainee_id: trainee.trainee_id,
      trainee_name: trainee.name,
      trainer_name: data.trainer_name || "Marcus Vance",
      tech_knowledge: parseInt(data.tech_knowledge || 4),
      problem_solving: parseInt(data.problem_solving || 4),
      communication: parseInt(data.communication || 4),
      presentation: parseInt(data.presentation || 4),
      documentation: parseInt(data.documentation || 4),
      teamwork: parseInt(data.teamwork || 5),
      attitude: parseInt(data.attitude || 5),
      strengths: data.strengths || "Strong analytical thinking.",
      improvement_areas: data.improvement_areas || "Further lab practice.",
      overall_comments: data.overall_comments || "Consistent performer.",
      created_at: new Date().toISOString().split('T')[0]
    };

    trainerFeedbackStore.unshift(newFeedback);

    recentActivitiesStore.unshift({
      activity_id: recentActivitiesStore.length + 1,
      description: `Submitted instructor qualitative feedback for ${trainee.name}`,
      created_at: "Just now",
      icon: "Star",
      user: "Marcus Vance (Trainer)"
    });

    return newFeedback;
  },

  // Capstone Project Evaluation (Trainer Workflow)
  evaluateProject: (traineeId, data) => {
    const id = parseInt(traineeId);
    let project = simulationProjectsStore.find(p => p.trainee_id === id);
    const trainee = traineesStore.find(t => t.trainee_id === id);

    const presentation = parseFloat(data.presentation_score || 85);
    const obtained = parseFloat(data.obtained_marks || 88);
    const overall = parseFloat(((presentation + obtained) / 2).toFixed(1));

    if (project) {
      project.presentation_score = presentation;
      project.obtained_marks = obtained;
      project.overall_score = overall;
      project.technical_evaluation = data.technical_evaluation || project.technical_evaluation;
      project.trainer_remarks = data.trainer_remarks || project.trainer_remarks;
      project.status = "Completed";
    } else if (trainee) {
      project = {
        id: simulationProjectsStore.length + 1,
        trainee_id: id,
        trainee_name: trainee.name,
        project_title: data.project_title || "Enterprise Microservices Capstone",
        project_description: data.project_description || "Cloud native microservices implementation.",
        max_marks: 100,
        obtained_marks: obtained,
        presentation_score: presentation,
        communication_score: 90,
        documentation_score: 88,
        overall_score: overall,
        status: "Completed",
        technical_evaluation: data.technical_evaluation || "Solid architectural design.",
        trainer_remarks: data.trainer_remarks || "Ready for client project deployment."
      };
      simulationProjectsStore.unshift(project);
    }

    if (trainee) {
      dbEngine.recalculateTraineeScore(id);
      recentActivitiesStore.unshift({
        activity_id: recentActivitiesStore.length + 1,
        description: `Evaluated capstone simulation project for ${trainee.name} (Score: ${overall}%)`,
        created_at: "Just now",
        icon: "Award",
        user: "Marcus Vance (Trainer)"
      });
    }

    return project;
  },

  getModules: (bootcampId) => {
    if (bootcampId && bootcampId !== 'all') {
      return modulesStore.filter(m => m.bootcamp_id === parseInt(bootcampId));
    }
    return modulesStore;
  },

  getSimulationProjects: () => simulationProjectsStore,
  getTrainerFeedback: () => trainerFeedbackStore,
  getCertifications: () => certificationsStore,

  // Notifications & Audit Logs
  getNotifications: () => notificationsStore,
  markNotificationAsRead: (id) => {
    const n = notificationsStore.find(item => item.notification_id === parseInt(id));
    if (n) n.status = "Read";
    return n;
  },
  getAuditLogs: () => recentActivitiesStore,

  // Static AI Diagnostic
  getAiDiagnostic: () => seedData.staticAiDiagnostic
};

module.exports = dbEngine;
