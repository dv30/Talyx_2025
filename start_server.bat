@echo off
echo ========================================
echo TALYX Local Development Server
echo ========================================
echo.
echo Starting HTTP server on port 8000...
echo.
cd /d "%~dp0"
python -m http.server 8000
pause
