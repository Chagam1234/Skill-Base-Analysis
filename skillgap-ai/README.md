# AI-Powered Skill Gap Analysis and Career Guidance System

A complete, modern, responsive full-stack platform designed to help students and job seekers benchmark their skills, analyze gaps against target industry roles, follow personalized learning roadmaps, and receive contextual AI career guidance.

---

## Project Location
All code, datasets, services, and frontend assets are saved in:
`C:\Users\Chagam Vamsi Reddy\.gemini\antigravity\scratch\skillgap-ai\`

---

## Quick Start (How to Run)

### Method 1: Double Click
Double click the `run.bat` file inside `skillgap-ai`.

### Method 2: From Terminal
Open a terminal in the project directory and run:
```bash
python -m uvicorn app:app --host 127.0.0.1 --port 8000 --reload
```
Then open your web browser to:
👉 **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

## Directory Structure & File Map

```
skillgap-ai/
├── app.py                     # FastAPI REST API & static file web server
├── models.py                  # SQLite database models & persistence
├── skillgap.db                # SQLite database storing profiles, quiz scores, progress
├── run.bat                    # 1-Click launcher script
├── README.md                  # Project documentation & setup guide
│
├── data/                      # Knowledge Base & Datasets
│   ├── careers_data.json      # Comprehensive tech roles, required skills & roadmaps
│   ├── courses_data.json      # Curated courses (Coursera, Udemy, edX)
│   ├── projects_data.json     # Portfolio projects with resume bullet points
│   └── quiz_questions.json    # Technical, Aptitude, & Soft-Skill quiz questions
│
├── services/                  # AI/ML & NLP Intelligence Layer
│   ├── ml_similarity.py       # TF-IDF & Cosine Similarity skill gap calculation
│   ├── nlp_resume_parser.py   # PDF text extraction & NLP entity recognition
│   └── ai_chatbot.py          # Profile-aware Career Guidance Chatbot
│
└── static/                    # Responsive Modern Web Application
    ├── index.html             # Application entrypoint with Tailwind CSS
    ├── app.jsx                # React 18 Root component, Sidebar & Top Navigation
    └── components/            # Modular React UI Views
        ├── DashboardView.jsx        # 1:1 match with uploaded UI screenshot
        ├── ProfileView.jsx          # Student profile management form
        ├── ResumeAnalysisView.jsx   # PDF resume dropzone & NLP extractor
        ├── SkillAssessmentView.jsx  # Interactive quiz & scoring
        ├── SkillGapView.jsx         # Detailed skill gap breakdown
        ├── CareerView.jsx           # Ranked career recommendations
        ├── RoadmapView.jsx          # 3-tier milestone learning roadmap
        ├── CoursesView.jsx          # Course catalog & direct enrollment
        ├── ProjectsView.jsx         # Portfolio project blueprints
        ├── ChatbotView.jsx          # Conversational AI career mentor
        └── ProgressView.jsx         # Real-time competency progress tracking
```
