# Installation Guide

Follow these steps to set up and run the TalentIQ platform locally on your machine.

---

## Prerequisites

1. **Python 3.10+** installed on your system.
2. **Azure CLI** installed and configured (required if verifying live Active Directory OpenAI connections).
3. A web browser (Microsoft Edge, Google Chrome, or Mozilla Firefox).

---

## 🔧 Step-by-Step Setup

### 1. Repository Setup & Virtual Environment
From your terminal, navigate to the project directory:
```powershell
# Create Python virtual environment
python -m venv .venv

# Activate the virtual environment
.venv\Scripts\activate

# Install system dependencies
pip install -r requirements.txt
```

### 2. Configure Azure Active Directory (For Live OpenAI Integration)
TalentIQ uses enterprise passwordless Active Directory credentials to call the Azure OpenAI endpoint. If you have been granted access, run:
```powershell
az login
```
This authorizes `DefaultAzureCredential()` to fetch access tokens from your local developer workspace context.

### 3. Run the Backend API Service
From the root directory:
```powershell
cd backend
# Starts FastAPI server on port 8001
..\.venv\Scripts\python -m uvicorn main:app --host 127.0.0.1 --port 8001 --reload
```
Upon the first initialization, the platform will automatically generate and seed the SQLite database file (`talentiq.db`) with representative data.

### 4. Run the Static Web Server
Open a separate terminal window and launch the frontend web host:
```powershell
cd frontend
# Starts HTTP server on port 8081
python -m http.server 8081
```

---

## 🌐 Verification

* **Frontend Web Dashboard**: Open [http://localhost:8081](http://localhost:8081)
* **Backend API Documentation (OpenAPI)**: Open [http://127.0.0.1:8001/docs](http://127.0.0.1:8001/docs)
