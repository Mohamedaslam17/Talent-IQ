// Seed Dataset for TalentIQ - Systech Enterprise Talent Readiness Platform

const roles = [
  { role_id: 1, role_name: "Admin", description: "Full system administration and data governance" },
  { role_id: 2, role_name: "Trainer", description: "Evaluates grades, attendance, assignment feedback, and simulation projects" },
  { role_id: 3, role_name: "HR / L&D", description: "Manages bootcamps, cohort allocation, overall analytics, and exports" },
  { role_id: 4, role_name: "Department Head", description: "Executive overview, high-level readiness KPIs, and resource deployment planning" }
];

const users = [
  { id: 1, name: "Systech Admin", email: "admin@talentiq.com", role_id: 1, role_name: "Admin", title: "Lead Systems Administrator" },
  { id: 2, name: "Marcus Vance", email: "trainer@talentiq.com", role_id: 2, role_name: "Trainer", title: "Principal Technical Trainer" },
  { id: 3, name: "Elena Rostova", email: "hr@talentiq.com", role_id: 3, role_name: "HR / L&D", title: "L&D Program Director" },
  { id: 4, name: "David Sterling", email: "depthead@talentiq.com", role_id: 4, role_name: "Department Head", title: "VP of Enterprise Solutions" },
  
  // Trainee user accounts
  { id: 5, name: "Aarav Sharma", email: "aarav.sharma@systech.com", role_id: 2, role_name: "Trainee", title: "Associate Software Engineer" },
  { id: 6, name: "Sophia Chen", email: "sophia.chen@systech.com", role_id: 2, role_name: "Trainee", title: "Cloud Trainee" },
  { id: 7, name: "Liam Patel", email: "liam.patel@systech.com", role_id: 2, role_name: "Trainee", title: "Data Engineering Associate" },
  { id: 8, name: "Maya Lin", email: "maya.lin@systech.com", role_id: 2, role_name: "Trainee", title: "Full Stack Trainee" },
  { id: 9, name: "Ethan Wright", email: "ethan.wright@systech.com", role_id: 2, role_name: "Trainee", title: "AI/ML Trainee" },
  { id: 10, name: "Zara Hassan", email: "zara.hassan@systech.com", role_id: 2, role_name: "Trainee", title: "DevOps Trainee" },
  { id: 11, name: "Noah Garcia", email: "noah.garcia@systech.com", role_id: 2, role_name: "Trainee", title: "Systems Engineer Trainee" },
  { id: 12, name: "Olivia Kim", email: "olivia.kim@systech.com", role_id: 2, role_name: "Trainee", title: "Cloud Developer Trainee" }
];

const bootcamps = [
  {
    bootcamp_id: 1,
    name: "GenAI & Cloud Architecture 2026",
    code: "BC-GENAI-2026",
    start_date: "2026-01-15",
    end_date: "2026-04-30",
    status: "Active",
    trainees_count: 24,
    lead_trainer: "Marcus Vance",
    description: "Specialized enterprise track on Azure OpenAI, Vector DBs, LangChain, RAG architecture, and Microservices deployment."
  },
  {
    bootcamp_id: 2,
    name: "Data Engineering & Analytics 2026",
    code: "BC-DE-2026",
    start_date: "2026-02-01",
    end_date: "2026-05-15",
    status: "Active",
    trainees_count: 18,
    lead_trainer: "Dr. Rachel Croft",
    description: "Deep dive into PySpark, Snowflake, dbt, Airflow, and Cloud Data Warehousing pipelines."
  },
  {
    bootcamp_id: 3,
    name: "Full Stack Cloud Native 2026",
    code: "BC-FS-2026",
    start_date: "2026-03-01",
    end_date: "2026-06-30",
    status: "Active",
    trainees_count: 30,
    lead_trainer: "Kenneth Miller",
    description: "Modern web architecture with React, Express, PostgreSQL, Docker, and Kubernetes deployment."
  },
  {
    bootcamp_id: 4,
    name: "DevOps & SRE Masterclass 2025-Q4",
    code: "BC-DEVOPS-2025",
    start_date: "2025-10-01",
    end_date: "2026-01-15",
    status: "Completed",
    trainees_count: 20,
    lead_trainer: "Marcus Vance",
    description: "Infrastructure as Code (Terraform), CI/CD GitHub Actions, Prometheus/Grafana, and incident management."
  }
];

const modules = [
  { module_id: 1, bootcamp_id: 1, module_name: "Python & Data Structures", duration: "2 Weeks", trainer_name: "Marcus Vance", status: "Completed", sequence_order: 1 },
  { module_id: 2, bootcamp_id: 1, module_name: "Azure Cloud Fundamentals", duration: "2 Weeks", trainer_name: "Marcus Vance", status: "Completed", sequence_order: 2 },
  { module_id: 3, bootcamp_id: 1, module_name: "GenAI, LLMs & Vector DBs", duration: "3 Weeks", trainer_name: "Marcus Vance", status: "In Progress", sequence_order: 3 },
  { module_id: 4, bootcamp_id: 1, module_name: "RAG & Microservices Integration", duration: "3 Weeks", trainer_name: "Marcus Vance", status: "Upcoming", sequence_order: 4 },
  
  { module_id: 5, bootcamp_id: 2, module_name: "SQL & Relational Modeling", duration: "2 Weeks", trainer_name: "Dr. Rachel Croft", status: "Completed", sequence_order: 1 },
  { module_id: 6, bootcamp_id: 2, module_name: "PySpark & Big Data Processing", duration: "3 Weeks", trainer_name: "Dr. Rachel Croft", status: "In Progress", sequence_order: 2 },
  
  { module_id: 7, bootcamp_id: 3, module_name: "Modern React & TypeScript", duration: "3 Weeks", trainer_name: "Kenneth Miller", status: "In Progress", sequence_order: 1 },
  { module_id: 8, bootcamp_id: 3, module_name: "Node.js REST API & Databases", duration: "3 Weeks", trainer_name: "Kenneth Miller", status: "Upcoming", sequence_order: 2 }
];

const trainees = [
  {
    trainee_id: 101,
    user_id: 5,
    employee_id: "SYS-2026-001",
    name: "Aarav Sharma",
    email: "aarav.sharma@systech.com",
    bootcamp_id: 1,
    bootcamp_name: "GenAI & Cloud Architecture 2026",
    college: "Indian Institute of Technology (IIT)",
    degree: "B.Tech Computer Science",
    joining_date: "2026-01-05",
    status: "Active",
    score: 94.5,
    attendance_rate: 98.2,
    is_certified: 1,
    is_project_ready: 1,
    needs_mentoring: 0,
    risk_level: "Low Risk",
    phone: "+1 (555) 234-8901",
    skills: ["Python", "Azure OpenAI", "LangChain", "FastAPI", "React"],
    avatar_color: "emerald"
  },
  {
    trainee_id: 102,
    user_id: 6,
    employee_id: "SYS-2026-002",
    name: "Sophia Chen",
    email: "sophia.chen@systech.com",
    bootcamp_id: 1,
    bootcamp_name: "GenAI & Cloud Architecture 2026",
    college: "University of California, Berkeley",
    degree: "M.S. Data Science",
    joining_date: "2026-01-05",
    status: "Active",
    score: 91.8,
    attendance_rate: 96.0,
    is_certified: 1,
    is_project_ready: 1,
    needs_mentoring: 0,
    risk_level: "Low Risk",
    phone: "+1 (555) 345-9012",
    skills: ["Python", "PyTorch", "Pinecone", "Azure AI", "TypeScript"],
    avatar_color: "indigo"
  },
  {
    trainee_id: 103,
    user_id: 7,
    employee_id: "SYS-2026-003",
    name: "Liam Patel",
    email: "liam.patel@systech.com",
    bootcamp_id: 2,
    bootcamp_name: "Data Engineering & Analytics 2026",
    college: "Georgia Institute of Technology",
    degree: "B.S. Information Technology",
    joining_date: "2026-01-12",
    status: "Active",
    score: 87.2,
    attendance_rate: 94.5,
    is_certified: 1,
    is_project_ready: 1,
    needs_mentoring: 0,
    risk_level: "Low Risk",
    phone: "+1 (555) 456-0123",
    skills: ["SQL", "PySpark", "Snowflake", "dbt", "Airflow"],
    avatar_color: "blue"
  },
  {
    trainee_id: 104,
    user_id: 8,
    employee_id: "SYS-2026-004",
    name: "Maya Lin",
    email: "maya.lin@systech.com",
    bootcamp_id: 3,
    bootcamp_name: "Full Stack Cloud Native 2026",
    college: "University of Washington",
    degree: "B.S. Computer Engineering",
    joining_date: "2026-01-20",
    status: "Active",
    score: 79.4,
    attendance_rate: 90.0,
    is_certified: 0,
    is_project_ready: 0,
    needs_mentoring: 1,
    risk_level: "Moderate Risk",
    phone: "+1 (555) 567-1234",
    skills: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    avatar_color: "amber"
  },
  {
    trainee_id: 105,
    user_id: 9,
    employee_id: "SYS-2026-005",
    name: "Ethan Wright",
    email: "ethan.wright@systech.com",
    bootcamp_id: 1,
    bootcamp_name: "GenAI & Cloud Architecture 2026",
    college: "UT Austin",
    degree: "B.S. Computer Science",
    joining_date: "2026-01-05",
    status: "Active",
    score: 64.0,
    attendance_rate: 81.5,
    is_certified: 0,
    is_project_ready: 0,
    needs_mentoring: 1,
    risk_level: "High Risk",
    phone: "+1 (555) 678-2345",
    skills: ["Python", "FastAPI", "Basic SQL"],
    avatar_color: "rose"
  },
  {
    trainee_id: 106,
    user_id: 10,
    employee_id: "SYS-2026-006",
    name: "Zara Hassan",
    email: "zara.hassan@systech.com",
    bootcamp_id: 3,
    bootcamp_name: "Full Stack Cloud Native 2026",
    college: "Purdue University",
    degree: "M.S. Software Engineering",
    joining_date: "2026-01-20",
    status: "Active",
    score: 88.5,
    attendance_rate: 95.0,
    is_certified: 1,
    is_project_ready: 1,
    needs_mentoring: 0,
    risk_level: "Low Risk",
    phone: "+1 (555) 789-3456",
    skills: ["Docker", "Kubernetes", "React", "Node.js", "PostgreSQL"],
    avatar_color: "purple"
  },
  {
    trainee_id: 107,
    user_id: 11,
    employee_id: "SYS-2026-007",
    name: "Noah Garcia",
    email: "noah.garcia@systech.com",
    bootcamp_id: 2,
    bootcamp_name: "Data Engineering & Analytics 2026",
    college: "Texas A&M University",
    degree: "B.S. Information Systems",
    joining_date: "2026-01-12",
    status: "Active",
    score: 72.5,
    attendance_rate: 85.0,
    is_certified: 0,
    is_project_ready: 0,
    needs_mentoring: 1,
    risk_level: "Moderate Risk",
    phone: "+1 (555) 890-4567",
    skills: ["SQL", "Python", "PowerBI"],
    avatar_color: "sky"
  },
  {
    trainee_id: 108,
    user_id: 12,
    employee_id: "SYS-2026-008",
    name: "Olivia Kim",
    email: "olivia.kim@systech.com",
    bootcamp_id: 1,
    bootcamp_name: "GenAI & Cloud Architecture 2026",
    college: "Stanford University",
    degree: "B.S. Symbolic Systems",
    joining_date: "2026-01-05",
    status: "Active",
    score: 96.0,
    attendance_rate: 100.0,
    is_certified: 1,
    is_project_ready: 1,
    needs_mentoring: 0,
    risk_level: "Low Risk",
    phone: "+1 (555) 901-5678",
    skills: ["Python", "Azure OpenAI", "LlamaIndex", "Docker", "GraphQL"],
    avatar_color: "emerald"
  }
];

const assessments = [
  { id: 1, trainee_id: 101, trainee_name: "Aarav Sharma", module_name: "Python & Data Structures", test_name: "Weekly Test 1 - Core OOP & Algorithms", max_marks: 100, obtained_marks: 96, status: "Graded", date: "2026-01-22" },
  { id: 2, trainee_id: 101, trainee_name: "Aarav Sharma", module_name: "Azure Cloud Fundamentals", test_name: "Weekly Test 2 - Azure Identity & Entra ID", max_marks: 100, obtained_marks: 93, status: "Graded", date: "2026-02-05" },
  { id: 3, trainee_id: 102, trainee_name: "Sophia Chen", module_name: "Python & Data Structures", test_name: "Weekly Test 1 - Core OOP & Algorithms", max_marks: 100, obtained_marks: 94, status: "Graded", date: "2026-01-22" },
  { id: 4, trainee_id: 104, trainee_name: "Maya Lin", module_name: "Modern React & TypeScript", test_name: "Weekly Test 1 - React Components & Hooks", max_marks: 100, obtained_marks: 78, status: "Graded", date: "2026-03-08" },
  { id: 5, trainee_id: 105, trainee_name: "Ethan Wright", module_name: "Python & Data Structures", test_name: "Weekly Test 1 - Core OOP & Algorithms", max_marks: 100, obtained_marks: 62, status: "Graded", date: "2026-01-22" },
  { id: 6, trainee_id: 108, trainee_name: "Olivia Kim", module_name: "GenAI, LLMs & Vector DBs", test_name: "Assignment 1 - RAG Pipeline with ChromaDB", max_marks: 100, obtained_marks: 98, status: "Graded", date: "2026-03-15" }
];

const simulationProjects = [
  {
    id: 1,
    trainee_id: 101,
    trainee_name: "Aarav Sharma",
    project_title: "Enterprise Knowledge Graph RAG Search Portal",
    project_description: "Multi-tenant Azure OpenAI RAG portal with role-based access to PDF internal contracts.",
    max_marks: 100,
    obtained_marks: 95,
    status: "Completed",
    presentation_score: 96,
    technical_evaluation: "Outstanding execution of LangChain chains, Pinecone indexing, and FastAPI backend.",
    communication_score: 95,
    documentation_score: 94,
    innovation_score: 96,
    overall_score: 95.2,
    trainer_remarks: "Ready for immediate deployment to Tier-1 Client Project."
  },
  {
    id: 2,
    trainee_id: 102,
    trainee_name: "Sophia Chen",
    project_title: "Autonomous Customer Support Agent with Azure Functions",
    project_description: "Event-driven AI customer service agent routing complex technical support tickets.",
    max_marks: 100,
    obtained_marks: 92,
    status: "Completed",
    presentation_score: 90,
    technical_evaluation: "Solid architectural pattern using Azure Event Grid and GPT-4o function calling.",
    communication_score: 94,
    documentation_score: 92,
    innovation_score: 93,
    overall_score: 92.2,
    trainer_remarks: "High technical rigor and clear presentation structure."
  },
  {
    id: 3,
    trainee_id: 105,
    trainee_name: "Ethan Wright",
    project_title: "Document Summarization API",
    project_description: "Basic document parsing and text summarization using OpenAI REST endpoints.",
    max_marks: 100,
    obtained_marks: 65,
    status: "Under Review",
    presentation_score: 60,
    technical_evaluation: "Lacks error handling and vector search implementation. Code formatting needs cleanup.",
    communication_score: 68,
    documentation_score: 62,
    innovation_score: 65,
    overall_score: 64.0,
    trainer_remarks: "Needs 1-on-1 mentorship session on backend error handling and Azure AD integration."
  }
];

const trainerFeedback = [
  {
    feedback_id: 1,
    trainee_id: 101,
    trainee_name: "Aarav Sharma",
    trainer_name: "Marcus Vance",
    tech_knowledge: 5,
    problem_solving: 5,
    communication: 5,
    presentation: 5,
    documentation: 4,
    teamwork: 5,
    attitude: 5,
    strengths: "Exceptional grasping of GenAI vector search concepts and clean modular backend structure.",
    improvement_areas: "Can further explore Docker container size optimizations.",
    overall_comments: "Top tier performer in cohort. Recommended for Tech Lead fast-track.",
    created_at: "2026-03-20"
  },
  {
    feedback_id: 2,
    trainee_id: 105,
    trainee_name: "Ethan Wright",
    trainer_name: "Marcus Vance",
    tech_knowledge: 2,
    problem_solving: 3,
    communication: 3,
    presentation: 2,
    documentation: 3,
    teamwork: 4,
    attitude: 4,
    strengths: "Punctual, receptive to trainer feedback, and works well in peer groups.",
    improvement_areas: "Asynchronous Python programming, exception handling, SQL join queries.",
    overall_comments: "Requires 2 weeks focused remedial lab practice on Python & API integration.",
    created_at: "2026-03-22"
  }
];

const certifications = [
  { certification_id: 1, trainee_id: 101, trainee_name: "Aarav Sharma", certification_name: "Azure AI Engineer Associate (AI-102)", score: 920, result: "Passed", completed_date: "2026-02-18", attempt_number: 1 },
  { certification_id: 2, trainee_id: 102, trainee_name: "Sophia Chen", certification_name: "Azure Solutions Architect Expert (AZ-305)", score: 885, result: "Passed", completed_date: "2026-02-25", attempt_number: 1 },
  { certification_id: 3, trainee_id: 103, trainee_name: "Liam Patel", certification_name: "Snowflake SnowPro Core Certification", score: 890, result: "Passed", completed_date: "2026-03-01", attempt_number: 1 },
  { certification_id: 4, trainee_id: 105, trainee_name: "Ethan Wright", certification_name: "Azure AI Engineer Associate (AI-102)", score: 610, result: "Failed", completed_date: "2026-03-10", attempt_number: 1 },
  { certification_id: 5, trainee_id: 108, trainee_name: "Olivia Kim", certification_name: "AWS Certified Machine Learning Specialty", score: 940, result: "Passed", completed_date: "2026-02-14", attempt_number: 1 }
];

const notifications = [
  { notification_id: 1, user_id: 1, title: "Cohort Readiness Forecast Updated", message: "GenAI & Cloud Architecture 2026 reached 88.5% average deployment readiness.", status: "Unread", created_at: "10 minutes ago", category: "analytics" },
  { notification_id: 2, user_id: 1, title: "Trainee Remediation Alert", message: "Ethan Wright requires instructor intervention for Module 3 (Score: 64.0%).", status: "Unread", created_at: "1 hour ago", category: "risk" },
  { notification_id: 3, user_id: 1, title: "New Certification Verified", message: "Sophia Chen successfully passed Azure Solutions Architect (AZ-305).", status: "Read", created_at: "1 day ago", category: "certification" },
  { notification_id: 4, user_id: 1, title: "Weekly Test Graded", message: "Marcus Vance submitted grades for GenAI Weekly Test 2.", status: "Read", created_at: "2 days ago", category: "grades" }
];

const recentActivities = [
  { activity_id: 1, description: "Elena Rostova generated Executive Cohort Readiness PDF Report", created_at: "20 minutes ago", icon: "FileText", user: "Elena Rostova" },
  { activity_id: 2, description: "Marcus Vance published 6 simulation project evaluations for GenAI Bootcamp", created_at: "2 hours ago", icon: "CheckCircle", user: "Marcus Vance" },
  { activity_id: 3, description: "Aarav Sharma completed Certification: Azure AI Engineer (Score: 920)", created_at: "5 hours ago", icon: "Award", user: "Aarav Sharma" },
  { activity_id: 4, description: "Systech Admin assigned 3 trainees to Enterprise Banking Simulation Project", created_at: "1 day ago", icon: "UserPlus", user: "Systech Admin" },
  { activity_id: 5, description: "David Sterling reviewed Departmental Talent Deployment Pipeline", created_at: "2 days ago", icon: "TrendingUp", user: "David Sterling" }
];

const staticAiDiagnostic = {
  cohort_name: "GenAI & Cloud Architecture 2026",
  overall_readiness_score: 88.5,
  readiness_status: "High Readiness",
  total_trainees: 24,
  project_ready_count: 19,
  at_risk_count: 2,
  top_skill: "Azure OpenAI & RAG Architecture",
  primary_gap: "Asynchronous Python Exception Handling in Microservices",
  executive_summary: "The GenAI & Cloud Architecture cohort is performing at an exceptional baseline with an average score of 88.5%. 79% of trainees are already fully client-project ready. Immediate focus is recommended for 2 trainees identified in the high-risk bracket.",
  recommended_interventions: [
    { title: "Targeted Remedial Lab", description: "Schedule a 4-hour hands-on lab on Python Asyncio & Error Resilience for low-scoring trainees.", priority: "High" },
    { title: "Pair Programming", description: "Pair Ethan Wright with Aarav Sharma on Capstone Sprint 2 for peer knowledge transfer.", priority: "Medium" },
    { title: "Early Project Allocation", description: "Fast-track Top 5 trainees (Aarav, Olivia, Sophia, Zara, Liam) for enterprise client onboarding.", priority: "High" }
  ],
  module_scores_breakdown: [
    { module: "Python OOP", average: 92.4, target: 85.0 },
    { module: "Azure Cloud", average: 89.1, target: 85.0 },
    { module: "GenAI & LLMs", average: 86.8, target: 80.0 },
    { module: "RAG & DBs", average: 84.5, target: 80.0 },
    { module: "Microservices", average: 82.0, target: 80.0 }
  ],
  risk_distribution: [
    { name: "Low Risk (85-100%)", count: 18, color: "#10b981" },
    { name: "Moderate Risk (70-84%)", count: 4, color: "#f59e0b" },
    { name: "High Risk (<70%)", count: 2, color: "#ef4444" }
  ]
};

module.exports = {
  roles,
  users,
  bootcamps,
  modules,
  trainees,
  assessments,
  simulationProjects,
  trainerFeedback,
  certifications,
  notifications,
  recentActivities,
  staticAiDiagnostic
};
