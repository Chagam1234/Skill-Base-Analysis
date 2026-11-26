import os
import json

def get_chatbot_response(user_message: str, user_profile: dict, skill_gap_data: dict) -> dict:
    """
    Intelligent Career Guidance Assistant.
    Provides personalized advice referencing user skills, target role, and gaps.
    """
    msg = user_message.lower().strip()
    name = user_profile.get('name', 'Learner').split()[0]
    target_role = skill_gap_data.get('target_role_title', user_profile.get('target_role', 'Data Analyst'))
    match_pct = skill_gap_data.get('overall_match_percentage', 40)
    
    missing_skills = [
        item['skill'] for item in skill_gap_data.get('details', [])
        if item.get('gap') == 'High'
    ]
    partial_skills = [
        item['skill'] for item in skill_gap_data.get('details', [])
        if item.get('gap') == 'Medium'
    ]
    matched_skills = [
        item['skill'] for item in skill_gap_data.get('details', [])
        if item.get('gap') == 'No Gap'
    ]

    # Pre-canned / intent matching with personalized dynamic contextual response
    if "which career is best for me" in msg or "best career" in msg or "recommend career" in msg:
        skills_str = ", ".join(matched_skills[:3]) if matched_skills else "Python and SQL"
        reply = (
            f"Hello {name}! Based on your current profile and competencies in **{skills_str}**, your highest matching career path is **{target_role}** with a **{match_pct}% match rate**.\n\n"
            f"Here is how your strengths align:\n"
            f"• **Top Strengths**: You already have solid fundamentals in {skills_str}.\n"
            f"• **Close Alternatives**: Python Developer (82% match) and Data Scientist (68% match).\n\n"
            f"👉 **Action Plan**: Focus on closing your high-priority gaps in **{', '.join(missing_skills[:2]) if missing_skills else 'Advanced Tools'}** to boost your match past 80%!"
        )
        suggestions = ["What skills should I learn for Data Science?", "What project should I build?", "Show my learning roadmap"]

    elif "data science" in msg or "data scientist" in msg:
        reply = (
            f"For transitioning into **Data Science**, {name}, here is what you need to focus on:\n\n"
            f"1. **Core Mathematics & Statistics**: Deepen your hypothesis testing, A/B testing, and Bayesian probability.\n"
            f"2. **Machine Learning Algorithms**: Master regression, tree ensembles (Random Forest, XGBoost), and clustering using `scikit-learn`.\n"
            f"3. **Data Wrangling**: Go beyond basics with `Pandas` and `NumPy` for feature engineering.\n"
            f"4. **Deep Learning Frameworks**: Familiarize yourself with `PyTorch` or `TensorFlow` for neural network modeling.\n\n"
            f"💡 *Pro-tip*: You already have a strong start with **Python**; pair it with our recommended *Statistics for Data Science* course to quickly bridge this gap!"
        )
        suggestions = ["How can I improve my Python skills?", "What project should I build?", "Which career is best for me?"]

    elif "improve" in msg and "python" in msg:
        reply = (
            f"Great question! Your current Python level is **Intermediate**. To elevate it to **Advanced** for {target_role} roles:\n\n"
            f"1. **Master Idiomatic Python**: Practice decorators, generators, context managers (`with` statements), and `asyncio`.\n"
            f"2. **Object-Oriented Design & Clean Code**: Implement design patterns (Factory, Strategy) and strict type hints (`typing` module).\n"
            f"3. **Testing & Tooling**: Write unit tests using `pytest`, use `ruff` or `flake8` for linting, and profile code memory/speed.\n"
            f"4. **Build Real Systems**: Write asynchronous REST APIs with FastAPI or build end-to-end data processing pipelines with Pandas.\n\n"
            f"Check out the **Data Analysis with Python** course in your dashboard for guided labs!"
        )
        suggestions = ["What project should I build?", "Am I ready for a software developer job?", "Show courses for Python"]

    elif "project" in msg or "build" in msg:
        reply = (
            f"To maximize your resume impact for **{target_role}**, build these high-impact projects:\n\n"
            f"1. **Executive E-Commerce Sales & Profit Dashboard** *(Beginner-Friendly)*:\n"
            f"   • *Tech Stack*: Excel, Power BI, DAX, Power Query\n"
            f"   • *Resume Bullet*: Built interactive multi-page BI dashboards analyzing 500k+ sales transactions with YoY margin KPIs.\n\n"
            f"2. **Customer Churn Prediction & Retention Engine** *(Intermediate)*:\n"
            f"   • *Tech Stack*: Python, Pandas, Scikit-Learn, SHAP\n"
            f"   • *Resume Bullet*: Engineered predictive ML model achieving 0.88 ROC-AUC to prevent customer attrition.\n\n"
            f"You can view the full implementation guides in the **Project Recommendations** tab!"
        )
        suggestions = ["Am I ready for a software developer job?", "How can I improve my Python skills?", "Which career is best for me?"]

    elif "ready" in msg or "job" in msg or "ready for a software developer" in msg:
        ready_status = "almost ready" if match_pct >= 70 else "in the building phase"
        reply = (
            f"{name}, you are currently **{ready_status}** with an overall match score of **{match_pct}%** for your target role.\n\n"
            f"• **What is working well**: You have satisfied key requirements in **{', '.join(matched_skills[:2]) if matched_skills else 'core fundamentals'}**.\n"
            f"• **What recruiters will test**: You still have critical gaps in **{', '.join(missing_skills[:3]) if missing_skills else 'advanced tooling'}**.\n"
            f"• **Timeline Estimate**: With 10–12 focused hours per week following your 4-step roadmap, you can be interview-ready within **6 to 8 weeks**!\n\n"
            f"Would you like advice on technical mock interview prep or resume optimization?"
        )
        suggestions = ["What project should I build?", "Which career is best for me?", "What skills should I learn for Data Science?"]

    else:
        # General career advice synthesized with user context
        reply = (
            f"Thank you for asking, {name}! As your AI Career Guidance Mentor, I'm analyzing your profile for **{target_role}**.\n\n"
            f"Your current skill match is **{match_pct}%**. To accelerate your trajectory, I recommend targeting your high-gap skills: "
            f"**{', '.join(missing_skills[:3]) if missing_skills else 'tools like Power BI and advanced Statistics'}**.\n\n"
            f"You can ask me anything about interview prep, project ideas, specific technologies, or how to break into the tech industry!"
        )
        suggestions = [
            "Which career is best for me?",
            "What skills should I learn for Data Science?",
            "What project should I build?"
        ]

    return {
        "reply": reply,
        "suggestions": suggestions,
        "context": {
            "target_role": target_role,
            "match_pct": match_pct,
            "missing_skills_count": len(missing_skills)
        }
    }
