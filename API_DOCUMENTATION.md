# API Documentation - TalentIQ Backend Gateway

The TalentIQ backend is powered by FastAPI and communicates via RESTful JSON endpoints.

---

## 🔐 Authentication Headers
All endpoints (except `/api/login`) require a Bearer token authorization header:
```text
Authorization: Bearer <jwt_access_token>
```

---

## 📁 Auth Controllers

### POST `/api/login`
Authenticates corporate credentials and issues a JWT token.
* **Request Body**:
  ```json
  {
    "email": "admin@talentiq.com",
    "password": "password123"
  }
  ```
* **Response**:
  ```json
  {
    "access_token": "eyJhbG...",
    "token_type": "bearer",
    "user_name": "Admin User",
    "role": "Admin"
  }
  ```

---

## 📊 Dashboard Controllers

### GET `/api/dashboard`
Fetches overall bootcamp statistics and recent activities logs.
* **Response**:
  ```json
  {
    "kpis": {
      "total_trainees": 30,
      "total_trainers": 5,
      "avg_attendance": "98.8%",
      "bootcamp_progress": "85.0%",
      "avg_weekly_score": "84.2%",
      "avg_module_score": "82.5%",
      "avg_assignment_score": "86.7%",
      "avg_sim_score": "88.0%",
      "cert_pass_rate": "86.7%"
    },
    "recent_activities": [
      { "id": 1, "description": "Weekly Quiz Week 6 Graded", "timestamp": "10 minutes ago" }
    ]
  }
  ```

---

## 👥 Trainee Directory

### GET `/api/trainees`
Lists all trainees. Supports text matching search query parameter.
* **Query Parameters**:
  * `search` (Optional): String
* **Response**:
  ```json
  {
    "trainees": [
      { "trainee_id": 1, "employee_id": "EMP-001", "name": "Alice Cooper", "status": "Active" }
    ]
  }
  ```

### GET `/api/trainees/{id}`
Returns full detailed card evaluations, timeline logs, weekly quizzes, and AI reports for a single trainee.
* **Response**:
  ```json
  {
    "trainee_id": 1,
    "name": "Alice Cooper",
    "email": "alice@talentiq.com",
    "employee_id": "EMP-001",
    "score": 86,
    "is_project_ready": 1,
    "needs_mentoring": 0,
    "weekly_tests": [],
    "assignments": [],
    "module_tests": [],
    "timeline": [],
    "simulation_project": {},
    "trainer_feedback": [],
    "attendance_summary": { "percentage": "98.8%" },
    "ai_report": null
  }
  ```

---

## 🧠 AI Intelligence Services

### GET `/api/ai/trainee/{id}`
Generates a structured Azure OpenAI L&D readiness report for a specific trainee.
* **Response**:
  ```json
  {
    "report": {
      "executive_summary": "Trainee Alice Cooper demonstrates high proficiency...",
      "strengths": ["ETL workflows", "SQL queries"],
      "weaknesses": ["Data architecture schemas"],
      "learning_trend": "Consistently upward",
      "readiness_score": 86,
      "career_recommendation": "Junior Data Engineer",
      "competency_matrix": { "sql": 90, "python": 85 }
    },
    "mocked": false,
    "mode": "developer"
  }
  ```

### GET `/api/ai/bootcamp`
Generates a cohort-wide executive summary and role recommendation matrices.
* **Response**:
  ```json
  {
    "report": {
      "executive_summary": "The cohort has successfully traversed the DE bootcamp roadmap...",
      "bootcamp_health": "Healthy",
      "strongest_module": "SQL",
      "weakest_module": "Power BI",
      "attendance_summary": "High engagement, 98.8% average rate.",
      "overall_risk": "Low",
      "recommendations_trainers": [],
      "recommendations_hr": [],
      "recommendations_department_heads": []
    },
    "mocked": false,
    "mode": "developer"
  }
  ```
