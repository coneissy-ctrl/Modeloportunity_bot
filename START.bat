@echo off
REM Modeloportunity Bot - Windows Startup Script

echo.
echo ========================================
echo   Modeloportunity Bot - Startup Script
echo ========================================
echo.

docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not installed!
    echo Please install Docker from: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo [OK] Docker is installed

docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker Compose is not installed!
    pause
    exit /b 1
)

echo [OK] Docker Compose is installed

if not exist "backend\.env" (
    echo WARNING: backend\.env not found
    copy "backend\.env.example" "backend\.env"
    echo.
    echo IMPORTANT: Edit backend\.env and add your OpenAI API key!
    echo Get it from: https://platform.openai.com/api/keys
    pause
    exit /b 1
)

findstr /M "sk-proj-test-key-placeholder" "backend\.env" >nul
if %errorlevel% equ 0 (
    echo.
    echo ERROR: OpenAI API key not configured!
    echo Please edit backend\.env and add your real API key
    echo.
    pause
    exit /b 1
)

echo [OK] Configuration looks good
echo.
echo ========================================
echo   Starting services...
echo ========================================
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo API Docs: http://localhost:8000/docs
echo.
echo Press Ctrl+C to stop
echo.

docker-compose up