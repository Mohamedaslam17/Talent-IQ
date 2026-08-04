# TalentIQ - Systech Enterprise Talent Readiness Platform

TalentIQ is a modern enterprise workforce intelligence and technical talent readiness platform built for **Systech Solutions Inc**. It enables Learning & Development (L&D) specialists, technical trainers, HR managers, and department heads to monitor, evaluate, and forecast talent deployment readiness.

Built with **React 18**, **Tailwind CSS**, and **Node.js/Express**, TalentIQ provides deep performance diagnostics, persona-based access control, interactive charts, and export centers.

---

## 🚀 Key Features

* **Executive Analytics Overview**: High-resolution KPI cards, module score benchmarks, attendance trend charts, and risk distribution analysis powered by `Recharts`.
* **Trainee Readiness Directory**: Full search, filter, and detail modal inspection of trainee grades, capstone projects, skills, and trainer evaluations.
* **Role-Based Access Control (RBAC)**: Interactive role switcher for Admin, Trainer, HR / L&D, and Department Head personas.
* **Bootcamp & Assessment Hub**: Track weekly test records, assignment gradebooks, and qualitative instructor feedback.
* **Capstone & Certification Tracker**: Detailed scoring for capstones, presentation evaluations, and verified cloud certifications.
* **Enterprise Export Center**: Download trainee metrics in CSV or structured JSON format, or print high-res PDF summary reports.
* **AI Diagnostics View (Static)**: Performance summary, readiness forecast, and targeted interventions (ready for LLM integration).

---

## 📁 Repository Structure

```text
TalentIQ/
├── package.json               # Root monorepo workspace configuration
├── vercel.json                # Vercel deployment configuration
├── render.yaml                # Render backend deployment definition
├── backend/                   # Node.js + Express REST API Server
│   ├── package.json
│   └── src/
│       ├── server.js          # Express app entrypoint
│       ├── data/
│       │   ├── seedData.js    # Systech enterprise seed dataset
│       │   └── dbEngine.js    # Database engine & state store
│       └── routes/            # REST API endpoints (auth, dashboard, trainees, bootcamps, modules, reports, etc.)
└── frontend/                  # React + Vite + Tailwind CSS SPA
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── index.html
    └── src/
        ├── App.jsx            # Router & protected layout setup
        ├── main.jsx           # React DOM entrypoint
        ├── index.css          # Tailwind CSS directives & glassmorphism theme
        ├── components/        # Layout (Header, Sidebar) & Common (KpiCard, StatusBadge, Modal, NotificationDrawer)
        ├── context/           # AuthContext & Role Switcher
        ├── pages/             # Dashboard, TraineeDirectory, TraineeDetail, Bootcamps, Assessments, Projects, Reports, AiDiagnostics, Login
         shadow/
        └── services/          # Frontend API service layer
```

---

## ⚡ Quick Start

### 1. Install Dependencies
Run from workspace root:
```bash
npm run postinstall
```
*(Or install inside `backend` and `frontend` directories via `npm install`)*

### 2. Run in Development Mode
To launch both Node backend (port `8001`) and React frontend (port `3000`):
```bash
npm run dev
```

Visit **`http://localhost:3000`** in your browser.

---

## 🌐 Production Deployment

### Host on Vercel
1. Connect your repository to Vercel.
2. Root directory: `./`
3. Vercel automatically detects `vercel.json` and builds both frontend SPA and Node serverless functions.

### Host Backend on Render
1. Create a new Web Service on Render pointing to `./backend`.
2. Build command: `npm install`
3. Start command: `npm start`
