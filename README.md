# DevHireAI — AI-Powered Developer Hiring & Career Platform

[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)](https://github.com/arvi8080/DevHireAIs)
[![Framework](https://img.shields.io/badge/.NET-9.0-purple.svg)](https://dotnet.microsoft.com/)
[![Frontend](https://img.shields.io/badge/React-19.0-blue.svg)](https://react.dev/)
[![Styling](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**DevHireAI** is a state-of-the-art **AI-powered Developer Hiring, Resume Optimization, and Technical Interview Preparation Platform**.

It bridges the gap between **software engineers & job seekers** seeking to pass automated ATS screening filters and ace technical interviews, and **hiring managers & recruiters** evaluating candidate technical alignment in seconds instead of days.

---

## 🌟 Key Features

### 👤 For Developers & Job Seekers
* **🛡️ ATS Resume Optimizer & Match Score (0–100%)**: Analyzes your resume against job postings, identifies critical missing keywords, and checks keyword alignment against ATS filters.
* **✍️ Optimized Resume Bullet Generator**: Produces achievement-driven, metric-focused resume bullets customized for specific job requirements.
* **✉️ Recruiter LinkedIn Cold Outreach Generator**: Creates personalized cold outreach messages to send directly to hiring managers on LinkedIn.
* **📖 "Interview Tomorrow?" Prep Copilot**: Generates a 1-page last-minute study cheat sheet featuring:
  * 5 Core Technical Concepts to review tonight based on company & tech stack.
  * Likely System Design Scenarios (Rate Limiters, Caching, DB Sharding).
  * STAR Behavioral Questions with structured, high-impact answers.
* **📝 AI Technical Assessment Quizzes**: Interactive 4-question screening quizzes tailored to target roles with instant automated AI grading and feedback.

### 💼 For Recruiters & Hiring Managers
* **🏆 Batch Candidate Match Leaderboard**: Uploads and ranks multiple candidate PDF resumes simultaneously against a target job posting.
* **🏷️ Automatic Seniority Profiling**: Classifies candidate tiers (*Junior, Mid, Senior, Staff / Architect*).
* **🎯 Technical Question Copilot**: Generates tailored probing questions to ask each candidate during technical interviews.
* **📊 Candidate Analytics**: Instant breakdown of matched vs missing tech stack skills.

---

## 🏗️ Architecture & Project Structure

The project follows **Clean Architecture (Onion Architecture)** principles on the backend and a **Feature-Based (Domain-Driven) Modular Architecture** on the frontend.

```
DevHireAI/
├── DevHireAI.API/                # ASP.NET Core REST API Endpoints & Controllers
│   ├── Controllers/             # AIController, AuthController, JobController, etc.
│   ├── Middleware/              # Global Exception Middleware
│   └── wwwroot/                 # Built Static Assets & UI Dashboard
│
├── DevHireAI.Application/        # Use Cases, DTOs, & Business Interfaces
│   ├── DTOs/                    # AI, Auth, Job, Resume DTOs
│   ├── Interfaces/              # IAIService, IAuthService, IJobService
│   └── Validators/              # FluentValidation Request Rules
│
├── DevHireAI.Domain/             # Core Domain Models & Enums
│   ├── Entities/                # User, Company, Job, Resume, RefreshToken
│   └── Enums/                   # UserRole (Candidate, Recruiter)
│
├── DevHireAI.Infrastructure/     # Data & Infrastructure Implementations
│   ├── Data/                    # AppDbContext & EF Core Configurations
│   ├── Migrations/              # SQL Server Database Migrations
│   └── Services/                # AIService (Gemini LLM), PdfParserService
│
├── DevHireAI.Shared/             # Common Shared Utilities & Constants
│
├── DevHireAI.Web/                # React 19 + TypeScript + Tailwind CSS Frontend
│   ├── src/
│   │   ├── api/                # REST API Client & Endpoint Constants
│   │   ├── components/         # Landing Page Components (Navbar, Hero, Features, etc.)
│   │   └── features/           # Modular Domain Features (ats-optimizer, interview-prep, etc.)
│   └── vite.config.ts          # Vite Configuration with Tailwind v4
│
├── docker-compose.yml            # Docker Orchestration for API & SQL Server 2022
└── DevHireAI.slnx                # .NET Solution File
```

---

## 🛠️ Tech Stack

* **Backend**: .NET 9.0, ASP.NET Core Web API, Entity Framework Core 9, SQL Server 2022, Serilog, FluentValidation, UglyToad.PdfPig (PDF Extraction).
* **AI Provider**: Google Gemini 1.5 Flash API + Smart Local Parsing Engine.
* **Frontend**: React 19, TypeScript 5, Vite 6, Tailwind CSS v4, Lucide React Icons.
* **Authentication**: JWT Bearer Tokens + Refresh Token Rotation & Role-Based Access Control (`Candidate`, `Recruiter`).

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:
* [.NET 9.0 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
* [Node.js v18+](https://nodejs.org/) & NPM
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Optional, for SQL Server container)

---

### 1. Backend Setup (.NET API)

1. Clone the repository:
   ```bash
   git clone https://github.com/arvi8080/DevHireAIs.git
   cd DevHireAIs
   ```

2. (Optional) Set your Google Gemini API Key in `DevHireAI.API/appsettings.json`:
   ```json
   "Gemini": {
     "ApiKey": "YOUR_GEMINI_API_KEY"
   }
   ```
   *(Note: If no API key is provided, the platform runs on its built-in smart offline parsing engine.)*

3. Restore and build the solution:
   ```bash
   dotnet build DevHireAI.slnx
   ```

4. Run the ASP.NET Core API server:
   ```bash
   dotnet run --project DevHireAI.API/DevHireAI.API.csproj --launch-profile http
   ```
   The backend API will start at **`http://localhost:5131`** (Swagger UI at `http://localhost:5131/swagger`).

---

### 2. Frontend Setup (React + Vite)

1. Navigate to the frontend directory:
   ```bash
   cd DevHireAI.Web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The React web application will open at **`http://localhost:5173`**.

---

### 3. Docker Compose Setup (Optional)

To spin up the Microsoft SQL Server and API together via Docker:

```bash
docker-compose up --build
```

---

## 🔗 Key API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/ai/optimize-ats` | `POST` | Calculates ATS match score, missing keywords & resume bullets |
| `/api/ai/interview-cheatsheet` | `POST` | Generates 1-page company study sheet & STAR behavioral answers |
| `/api/ai/rank-candidates` | `POST` | Ranks a batch of candidate resumes into a match leaderboard |
| `/api/ai/upload-and-analyze` | `POST` | Uploads PDF resume and parses candidate skills |
| `/api/ai/screening-quiz` | `POST` | Generates tailored 4-question technical screening quiz |
| `/api/ai/grade-quiz` | `POST` | Evaluates & grades candidate quiz submissions |
| `/api/auth/register` | `POST` | Registers new candidate or recruiter account |
| `/api/auth/login` | `POST` | Authenticates user & issues JWT token |

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/arvi8080/DevHireAIs/issues).
