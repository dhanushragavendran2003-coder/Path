@echo off
echo ========================================
echo   CAREER PREDICTION SYSTEM - PURE ML
echo ========================================
echo.
echo Starting ML Backend (RandomForestClassifier)...
echo.

cd /d "%~dp0"

echo Backend will start on: http://127.0.0.1:5000
echo.
echo Press Ctrl+C to stop the backend
echo.
echo ========================================
echo.

py backend/api.py

pause
