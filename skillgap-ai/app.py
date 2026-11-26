import os
import json
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
from typing import List, Optional, Any

import models
from services.nlp_resume_parser import extract_text_from_pdf, parse_resume_content
from services.ml_similarity import calculate_skill_gap, recommend_careers, load_careers_data
from services.ai_chatbot import get_chatbot_response

# Initialize SQLite database
models.init_db()

app = FastAPI(
    title="AI-Powered Skill Gap Analysis and Career Guidance System",
    description="Full-stack AI/ML platform for skill benchmarking, career pathing, and personalized roadmaps",
    version="1.0.0"
)

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static directory setup
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, 'static')
DATA_DIR = os.path.join(BASE_DIR, 'data')

# Pydantic Request Schemas
class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    degree: Optional[str] = "B.Tech"
    branch: Optional[str] = "Computer Science"
    target_role: Optional[str] = "data-analyst"

class ProfileUpdateRequest(BaseModel):
    name: Optional[str] = None
    degree: Optional[str] = None
    branch: Optional[str] = None
    target_role: Optional[str] = None
    career_goals: Optional[str] = None
    skills: Optional[List[Any]] = None
    technical_skills: Optional[List[str]] = None
    certifications: Optional[List[str]] = None
    projects: Optional[List[str]] = None
    interests: Optional[List[str]] = None

class AssessmentSubmission(BaseModel):
    answers: dict  # {question_id: selected_index}

class ProgressToggleRequest(BaseModel):
    type: str  # 'skill' | 'course' | 'step'
    item_id: str

class ChatMessageRequest(BaseModel):
    message: str

# Helper to retrieve active user_id from Authorization Bearer token or fallback
def get_request_user_id(request: Request) -> str:
    auth = request.headers.get("authorization", "")
    if auth.startswith("Bearer "):
        token = auth[7:].strip()
        if token:
            return token
    x_user = request.headers.get("x-user-id")
    if x_user:
        return x_user
    return "demo-ananya"

# ----------------- AUTH & PROFILE ENDPOINTS -----------------

@app.get("/api/auth/me")
async def get_current_user(request: Request):
    user_id = get_request_user_id(request)
    profile = models.get_user_profile(user_id)
    if not profile:
        profile = models.get_user_profile('demo-ananya')
    if not profile:
        raise HTTPException(status_code=404, detail="User not found")
    return profile

@app.post("/api/auth/login")
async def login(req: LoginRequest):
    profile = models.authenticate_user(req.email, req.password)
    if not profile:
        raise HTTPException(status_code=401, detail="Invalid email or password.")
    return {
        "success": True,
        "token": profile["id"],
        "user": profile
    }

@app.post("/api/auth/register")
async def register(req: RegisterRequest):
    if not req.name.strip() or not req.email.strip() or not req.password.strip():
        raise HTTPException(status_code=400, detail="Name, email, and password are required.")
    
    profile, err = models.create_user(
        name=req.name.strip(),
        email=req.email.strip(),
        password=req.password.strip(),
        degree=req.degree or "B.Tech",
        branch=req.branch or "Computer Science",
        target_role=req.target_role or "data-analyst"
    )
    if err:
        raise HTTPException(status_code=400, detail=err)
        
    return {
        "success": True,
        "token": profile["id"],
        "user": profile
    }

@app.get("/api/profile")
async def get_profile(request: Request):
    user_id = get_request_user_id(request)
    profile = models.get_user_profile(user_id)
    if not profile:
        profile = models.get_user_profile('demo-ananya')
    return profile

@app.put("/api/profile")
async def update_profile(req: ProfileUpdateRequest, request: Request):
    user_id = get_request_user_id(request)
    update_data = req.dict(exclude_none=True)
    models.update_user_profile(user_id, update_data)
    return {
        "success": True,
        "message": "Profile updated successfully",
        "profile": models.get_user_profile(user_id)
    }

# ----------------- RESUME NLP ENDPOINT -----------------

@app.post("/api/resume/upload")
async def upload_resume(file: UploadFile = File(...)):
    try:
        content = await file.read()
        extracted_text = extract_text_from_pdf(content)
        if not extracted_text.strip():
            # In case of empty PDF or text parse issue, provide fallback demo text
            extracted_text = "Ananya Sharma. B.Tech Computer Science. Skills: Python, SQL, Excel, Statistics, Git, Machine Learning. Certified in Coursera Data Analysis."
        
        parsed_data = parse_resume_content(extracted_text)
        return {
            "success": True,
            "filename": file.filename,
            "parsed": parsed_data,
            "raw_text_preview": extracted_text[:400] + "..." if len(extracted_text) > 400 else extracted_text
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process resume: {str(e)}")

# ----------------- SKILL GAP & CAREER ENDPOINTS -----------------

@app.get("/api/analysis")
async def get_analysis(request: Request, role: Optional[str] = None):
    user_id = get_request_user_id(request)
    profile = models.get_user_profile(user_id) or models.get_user_profile('demo-ananya')
    target_role = role or profile.get('target_role', 'data-analyst')
    analysis = calculate_skill_gap(profile, target_role)
    return analysis

@app.get("/api/careers")
async def get_careers(request: Request):
    user_id = get_request_user_id(request)
    profile = models.get_user_profile(user_id) or models.get_user_profile('demo-ananya')
    recommendations = recommend_careers(profile)
    return recommendations

# ----------------- ASSESSMENT ENDPOINTS -----------------

@app.get("/api/assessment/questions")
async def get_assessment_questions():
    quiz_path = os.path.join(DATA_DIR, 'quiz_questions.json')
    if os.path.exists(quiz_path):
        with open(quiz_path, 'r', encoding='utf-8') as f:
            questions = json.load(f)
            clean_questions = [
                {
                    "id": q["id"],
                    "category": q["category"],
                    "skill": q["skill"],
                    "question": q["question"],
                    "options": q["options"]
                }
                for q in questions
            ]
            return clean_questions
    return []

@app.post("/api/assessment/submit")
async def submit_assessment(sub: AssessmentSubmission, request: Request):
    user_id = get_request_user_id(request)
    quiz_path = os.path.join(DATA_DIR, 'quiz_questions.json')
    with open(quiz_path, 'r', encoding='utf-8') as f:
        questions = json.load(f)
        
    tech_correct, tech_total = 0, 0
    apt_correct, apt_total = 0, 0
    soft_correct, soft_total = 0, 0
    detailed_scores = {}

    for q in questions:
        qid = q["id"]
        cat = q["category"]
        skill = q["skill"]
        ans = sub.answers.get(qid)
        is_correct = (ans is not None and int(ans) == q["correct_index"])

        if cat == "Technical":
            tech_total += 1
            if is_correct: tech_correct += 1
        elif cat == "Aptitude":
            apt_total += 1
            if is_correct: apt_correct += 1
        else:
            soft_total += 1
            if is_correct: soft_correct += 1

        score_for_skill = 100 if is_correct else 35
        detailed_scores[skill] = score_for_skill

    tech_pct = round((tech_correct / max(tech_total, 1)) * 100, 1)
    apt_pct = round((apt_correct / max(apt_total, 1)) * 100, 1)
    soft_pct = round((soft_correct / max(soft_total, 1)) * 100, 1)

    overall = models.save_assessment_result(user_id, tech_pct, apt_pct, soft_pct, detailed_scores)
    return {
        "success": True,
        "overall_score": overall,
        "technical_score": tech_pct,
        "aptitude_score": apt_pct,
        "soft_score": soft_pct,
        "detailed_scores": detailed_scores
    }

@app.get("/api/assessment/result")
async def get_assessment_result(request: Request):
    user_id = get_request_user_id(request)
    res = models.get_assessment_result(user_id)
    if not res:
        return {
            "technical_score": 75.0,
            "aptitude_score": 80.0,
            "soft_score": 90.0,
            "overall_score": 81.5,
            "details": {
                "Python": 75,
                "SQL": 80,
                "Data Analysis": 70,
                "Logical Reasoning": 80,
                "Communication": 90
            }
        }
    return res

# ----------------- ROADMAP, COURSES & PROJECTS -----------------

@app.get("/api/roadmap")
async def get_roadmap(request: Request, role: Optional[str] = None):
    user_id = get_request_user_id(request)
    profile = models.get_user_profile(user_id) or models.get_user_profile('demo-ananya')
    target_role = role or profile.get('target_role', 'data-analyst')
    analysis = calculate_skill_gap(profile, target_role)
    roadmap = analysis.get('roadmap', [])
    progress = models.get_user_progress(user_id)
    
    # Enrich roadmap steps with completed state
    for step in roadmap:
        step['completed'] = step.get('step') in progress.get('completed_roadmap_steps', [])
    return roadmap

@app.get("/api/courses")
async def get_courses(request: Request):
    user_id = get_request_user_id(request)
    courses_path = os.path.join(DATA_DIR, 'courses_data.json')
    if os.path.exists(courses_path):
        with open(courses_path, 'r', encoding='utf-8') as f:
            courses = json.load(f)
            progress = models.get_user_progress(user_id)
            for c in courses:
                c['completed'] = c['id'] in progress.get('completed_courses', [])
            return courses
    return []

@app.get("/api/projects")
async def get_projects():
    projects_path = os.path.join(DATA_DIR, 'projects_data.json')
    if os.path.exists(projects_path):
        with open(projects_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

# ----------------- PROGRESS TRACKING ENDPOINTS -----------------

@app.get("/api/progress")
async def get_progress(request: Request):
    user_id = get_request_user_id(request)
    profile = models.get_user_profile(user_id) or models.get_user_profile('demo-ananya')
    progress = models.get_user_progress(user_id)
    analysis = calculate_skill_gap(profile, profile.get('target_role', 'data-analyst'))
    
    return {
        "progress": progress,
        "overall_skill_score": analysis.get('overall_match_percentage', 40),
        "target_role": analysis.get('target_role_title', 'Data Analyst'),
        "completed_skills_count": len(progress.get('completed_skills', [])),
        "completed_courses_count": len(progress.get('completed_courses', [])),
        "completed_steps_count": len(progress.get('completed_roadmap_steps', []))
    }

@app.post("/api/progress/toggle")
async def toggle_progress(req: ProgressToggleRequest, request: Request):
    user_id = get_request_user_id(request)
    progress = models.get_user_progress(user_id)
    
    if req.type == 'skill':
        lst = progress.get('completed_skills', [])
        if req.item_id in lst:
            lst.remove(req.item_id)
        else:
            lst.append(req.item_id)
        progress['completed_skills'] = lst

    elif req.type == 'course':
        lst = progress.get('completed_courses', [])
        if req.item_id in lst:
            lst.remove(req.item_id)
        else:
            lst.append(req.item_id)
        progress['completed_courses'] = lst

    elif req.type == 'step':
        lst = progress.get('completed_roadmap_steps', [])
        step_num = int(req.item_id)
        if step_num in lst:
            lst.remove(step_num)
        else:
            lst.append(step_num)
        progress['completed_roadmap_steps'] = lst

    models.update_user_progress(user_id, progress)
    return {"success": True, "progress": progress}

# ----------------- AI CAREER CHATBOT -----------------

@app.post("/api/chat")
async def chat_with_mentor(req: ChatMessageRequest, request: Request):
    user_id = get_request_user_id(request)
    profile = models.get_user_profile(user_id) or models.get_user_profile('demo-ananya')
    gap_data = calculate_skill_gap(profile, profile.get('target_role', 'data-analyst'))
    response = get_chatbot_response(req.message, profile, gap_data)
    return response

# ----------------- STATIC FRONTEND SERVING -----------------

if os.path.exists(STATIC_DIR):
    app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    # API calls not caught by routers
    if full_path.startswith("api/"):
        raise HTTPException(status_code=404, detail="API route not found")
    
    index_file = os.path.join(STATIC_DIR, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return JSONResponse({"message": "SkillGap Backend running. Static frontend not yet compiled."})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)

