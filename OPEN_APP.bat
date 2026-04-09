    @echo off
echo ========================================
echo   OPENING CAREER PREDICTION SYSTEM
echo ========================================
echo.
echo Make sure the backend is running!
echo If not, run START_BACKEND.bat first
echo.
echo Opening application in browser...
echo.

cd /d "%~dp0\web_app"
start index.html

echo.
echo ========================================
echo Application opened in your browser
echo ========================================
echo.
pause
