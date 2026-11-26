import json
import os
import sqlite3
import hashlib
import uuid

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'skillgap.db')

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE,
        password_hash TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Profiles table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS profiles (
        user_id TEXT PRIMARY KEY,
        degree TEXT,
        branch TEXT,
        technical_skills TEXT,
        programming_languages TEXT,
        soft_skills TEXT,
        certifications TEXT,
        projects TEXT,
        interests TEXT,
        career_goals TEXT,
        target_role TEXT,
        skills_json TEXT
    )
    ''')

    # Assessment table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS assessments (
        user_id TEXT PRIMARY KEY,
        technical_score REAL,
        aptitude_score REAL,
        soft_score REAL,
        overall_score REAL,
        details_json TEXT,
        taken_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    # Progress tracking table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS progress (
        user_id TEXT PRIMARY KEY,
        completed_skills TEXT,
        completed_courses TEXT,
        completed_roadmap_steps TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Seed default demo user 'Ananya Sharma' if not present
    cursor.execute("SELECT id FROM users WHERE id = 'demo-ananya'")
    if not cursor.fetchone():
        cursor.execute('''
        INSERT INTO users (id, name, email, password_hash)
        VALUES ('demo-ananya', 'Ananya Sharma', 'ananya@example.com', 'demo_hash')
        ''')
        
        default_skills = [
            {"name": "Python", "level": "Intermediate"},
            {"name": "SQL", "level": "Intermediate"},
            {"name": "Excel", "level": "Beginner"},
            {"name": "Power BI", "level": "No Knowledge"},
            {"name": "Statistics", "level": "Basic"},
            {"name": "Git", "level": "Beginner"},
            {"name": "Communication", "level": "Advanced"},
            {"name": "Problem Solving", "level": "Advanced"}
        ]
        
        cursor.execute('''
        INSERT INTO profiles (
            user_id, degree, branch, technical_skills, programming_languages,
            soft_skills, certifications, projects, interests, career_goals,
            target_role, skills_json
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            'demo-ananya',
            'B.Tech',
            'Computer Science & Engineering',
            json.dumps(['Python', 'SQL', 'Excel', 'Power BI', 'Statistics']),
            json.dumps(['Python', 'SQL']),
            json.dumps(['Communication', 'Problem Solving', 'Critical Thinking']),
            json.dumps(['Coursera Data Analysis with Python', 'HackerRank SQL Basic']),
            json.dumps(['E-Commerce Sales Analysis in Excel', 'Student Performance Classifier']),
            json.dumps(['Data Analytics', 'Business Intelligence', 'Machine Learning']),
            'Secure a high-impact Data Analyst or Business Intelligence role.',
            'data-analyst',
            json.dumps(default_skills)
        ))
        
        # Default assessment
        cursor.execute('''
        INSERT INTO assessments (user_id, technical_score, aptitude_score, soft_score, overall_score, details_json)
        VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            'demo-ananya',
            75.0,
            80.0,
            90.0,
            81.5,
            json.dumps({
                'Python': 75,
                'SQL': 80,
                'Data Analysis': 70,
                'Aptitude': 80,
                'Communication': 90
            })
        ))

        # Default progress
        cursor.execute('''
        INSERT INTO progress (user_id, completed_skills, completed_courses, completed_roadmap_steps)
        VALUES (?, ?, ?, ?)
        ''', (
            'demo-ananya',
            json.dumps(['SQL', 'Communication']),
            json.dumps(['c-1']),
            json.dumps([1])
        ))

    conn.commit()
    conn.close()

def get_user_profile(user_id='demo-ananya'):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    u_row = cursor.fetchone()
    
    cursor.execute("SELECT * FROM profiles WHERE user_id = ?", (user_id,))
    p_row = cursor.fetchone()
    
    conn.close()
    
    if not u_row:
        return None
        
    profile_data = {
        'id': u_row['id'],
        'name': u_row['name'],
        'email': u_row['email'],
        'degree': p_row['degree'] if p_row else 'B.Tech',
        'branch': p_row['branch'] if p_row else 'Computer Science',
        'target_role': p_row['target_role'] if p_row else 'data-analyst',
        'career_goals': p_row['career_goals'] if p_row else '',
        'skills': json.loads(p_row['skills_json']) if (p_row and p_row['skills_json']) else [],
        'technical_skills': json.loads(p_row['technical_skills']) if (p_row and p_row['technical_skills']) else [],
        'programming_languages': json.loads(p_row['programming_languages']) if (p_row and p_row['programming_languages']) else [],
        'soft_skills': json.loads(p_row['soft_skills']) if (p_row and p_row['soft_skills']) else [],
        'certifications': json.loads(p_row['certifications']) if (p_row and p_row['certifications']) else [],
        'projects': json.loads(p_row['projects']) if (p_row and p_row['projects']) else [],
        'interests': json.loads(p_row['interests']) if (p_row and p_row['interests']) else []
    }
    return profile_data

def update_user_profile(user_id, data):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    if 'name' in data:
        cursor.execute("UPDATE users SET name = ? WHERE id = ?", (data['name'], user_id))
        
    cursor.execute('''
    UPDATE profiles SET
        degree = COALESCE(?, degree),
        branch = COALESCE(?, branch),
        target_role = COALESCE(?, target_role),
        career_goals = COALESCE(?, career_goals),
        skills_json = COALESCE(?, skills_json),
        technical_skills = COALESCE(?, technical_skills),
        certifications = COALESCE(?, certifications),
        projects = COALESCE(?, projects),
        interests = COALESCE(?, interests)
    WHERE user_id = ?
    ''', (
        data.get('degree'),
        data.get('branch'),
        data.get('target_role'),
        data.get('career_goals'),
        json.dumps(data.get('skills')) if 'skills' in data else None,
        json.dumps(data.get('technical_skills')) if 'technical_skills' in data else None,
        json.dumps(data.get('certifications')) if 'certifications' in data else None,
        json.dumps(data.get('projects')) if 'projects' in data else None,
        json.dumps(data.get('interests')) if 'interests' in data else None,
        user_id
    ))
    conn.commit()
    conn.close()

def get_user_progress(user_id='demo-ananya'):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM progress WHERE user_id = ?", (user_id,))
    row = cursor.fetchone()
    conn.close()
    
    if row:
        return {
            'completed_skills': json.loads(row['completed_skills'] or '[]'),
            'completed_courses': json.loads(row['completed_courses'] or '[]'),
            'completed_roadmap_steps': json.loads(row['completed_roadmap_steps'] or '[]')
        }
    return {'completed_skills': [], 'completed_courses': [], 'completed_roadmap_steps': []}

def update_user_progress(user_id, progress_data):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
    INSERT INTO progress (user_id, completed_skills, completed_courses, completed_roadmap_steps)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET
        completed_skills = excluded.completed_skills,
        completed_courses = excluded.completed_courses,
        completed_roadmap_steps = excluded.completed_roadmap_steps,
        updated_at = CURRENT_TIMESTAMP
    ''', (
        user_id,
        json.dumps(progress_data.get('completed_skills', [])),
        json.dumps(progress_data.get('completed_courses', [])),
        json.dumps(progress_data.get('completed_roadmap_steps', []))
    ))
    conn.commit()
    conn.close()

def save_assessment_result(user_id, tech, apt, soft, details):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    overall = round((tech * 0.4) + (apt * 0.3) + (soft * 0.3), 1)
    cursor.execute('''
    INSERT INTO assessments (user_id, technical_score, aptitude_score, soft_score, overall_score, details_json)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET
        technical_score = excluded.technical_score,
        aptitude_score = excluded.aptitude_score,
        soft_score = excluded.soft_score,
        overall_score = excluded.overall_score,
        details_json = excluded.details_json,
        taken_at = CURRENT_TIMESTAMP
    ''', (user_id, tech, apt, soft, overall, json.dumps(details)))
    conn.commit()
    conn.close()
    return overall

def get_assessment_result(user_id='demo-ananya'):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM assessments WHERE user_id = ?", (user_id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return {
            'technical_score': row['technical_score'],
            'aptitude_score': row['aptitude_score'],
            'soft_score': row['soft_score'],
            'overall_score': row['overall_score'],
            'details': json.loads(row['details_json'] or '{}'),
            'taken_at': row['taken_at']
        }
    return None

def hash_password(password: str) -> str:
    salt = "skillgap_salt_2025"
    return hashlib.sha256(f"{salt}{password}".encode('utf-8')).hexdigest()

def create_user(name: str, email: str, password: str, degree: str = "B.Tech", branch: str = "Computer Science", target_role: str = "data-analyst"):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Check if email exists
    cursor.execute("SELECT id FROM users WHERE lower(email) = lower(?)", (email,))
    if cursor.fetchone():
        conn.close()
        return None, "An account with this email already exists."
    
    user_id = f"user_{uuid.uuid4().hex[:8]}"
    pwd_hash = hash_password(password)
    
    cursor.execute(
        "INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)",
        (user_id, name, email, pwd_hash)
    )
    
    # Seed starter skills based on target role
    starter_skills = [
        {"name": "Communication", "level": "Intermediate"},
        {"name": "Problem Solving", "level": "Intermediate"}
    ]
    if target_role == "data-analyst":
        starter_skills.extend([
            {"name": "Python", "level": "Beginner"},
            {"name": "SQL", "level": "Beginner"},
            {"name": "Excel", "level": "Intermediate"}
        ])
    elif target_role == "software-engineer":
        starter_skills.extend([
            {"name": "Python", "level": "Intermediate"},
            {"name": "Data Structures", "level": "Beginner"},
            {"name": "Git", "level": "Beginner"}
        ])
    elif target_role == "data-scientist":
        starter_skills.extend([
            {"name": "Python", "level": "Intermediate"},
            {"name": "Statistics", "level": "Beginner"},
            {"name": "Machine Learning", "level": "Beginner"}
        ])
    else:
        starter_skills.extend([
            {"name": "Python", "level": "Beginner"},
            {"name": "Git", "level": "Beginner"}
        ])
        
    tech_skills = [s["name"] for s in starter_skills if s["name"] not in ["Communication", "Problem Solving"]]
    soft_skills = ["Communication", "Problem Solving"]
    
    cursor.execute('''
    INSERT INTO profiles (
        user_id, degree, branch, technical_skills, programming_languages,
        soft_skills, certifications, projects, interests, career_goals,
        target_role, skills_json
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        user_id,
        degree,
        branch,
        json.dumps(tech_skills),
        json.dumps([s for s in tech_skills if s in ["Python", "Java", "C++", "JavaScript", "SQL"]]),
        json.dumps(soft_skills),
        json.dumps([]),
        json.dumps([]),
        json.dumps([target_role.replace('-', ' ').title()]),
        f"Aspiring {target_role.replace('-', ' ').title()} looking to bridge skill gaps.",
        target_role,
        json.dumps(starter_skills)
    ))
    
    # Initial empty progress
    cursor.execute('''
    INSERT INTO progress (user_id, completed_skills, completed_courses, completed_roadmap_steps)
    VALUES (?, ?, ?, ?)
    ''', (user_id, json.dumps([]), json.dumps([]), json.dumps([])))
    
    conn.commit()
    conn.close()
    
    return get_user_profile(user_id), None

def authenticate_user(email: str, password: str):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # Check demo shortcut
    if (email.lower() == 'ananya@example.com' or email.lower() == 'demo') and (password in ['demo', 'demo_hash', 'password123', 'ananya', '']):
        conn.close()
        return get_user_profile('demo-ananya')
        
    cursor.execute("SELECT id, password_hash FROM users WHERE lower(email) = lower(?)", (email,))
    row = cursor.fetchone()
    conn.close()
    
    if not row:
        return None
        
    pwd_hash = hash_password(password)
    if row['password_hash'] == pwd_hash or row['password_hash'] == 'demo_hash':
        return get_user_profile(row['id'])
        
    return None
