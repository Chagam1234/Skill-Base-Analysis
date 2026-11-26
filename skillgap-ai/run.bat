@echo off
title AI-Powered Skill Gap Analysis and Career Guidance System
echo =====================================================================
echo Starting SkillGap Analysis System...
echo =====================================================================
echo.
echo URL: http://127.0.0.1:8000
echo Open this URL in your web browser!
echo.
python -m uvicorn app:app --host 127.0.0.1 --port 8000 --reload
pause
