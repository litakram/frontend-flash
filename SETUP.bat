@echo off
REM Flash AI Maturity Audit - Complete Setup Script (Windows)

echo.
echo 🚀 Flash AI Maturity Audit - Setup Helper
echo ==========================================
echo.

REM Check Node.js
echo Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Node.js is not installed. Please install Node.js 16+
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js %NODE_VERSION% found
echo.

REM Frontend Setup
echo Setting up Frontend...
if not exist ".env" (
    copy .env.example .env >nul
    echo ✓ Created .env file
    echo   Please edit .env and set VITE_API_URL if needed
) else (
    echo ✓ .env file already exists
)

echo Installing frontend dependencies...
call npm install
echo ✓ Frontend dependencies installed
echo.

REM Backend Setup
echo Setting up Backend...
if not exist "server" (
    echo ⚠️  server\ directory not found
    exit /b 1
)

cd server

if not exist ".env" (
    copy .env.example .env >nul
    echo ✓ Created server\.env file
    echo ⚠️  IMPORTANT: Add your GEMINI_API_KEY to server\.env
) else (
    echo ✓ server\.env file already exists
)

echo Installing backend dependencies...
call npm install
echo ✓ Backend dependencies installed
echo.

cd ..

REM Summary
echo ✅ Setup Complete!
echo.
echo Next Steps:
echo 1. Get Gemini API Key:
echo    Visit: https://aistudio.google.com/app/apikey
echo    Copy your API key
echo.
echo 2. Configure Backend:
echo    Edit: server\.env
echo    Add: GEMINI_API_KEY=your_key_here
echo.
echo 3. Start the Backend (in one terminal):
echo    cd server
echo    npm run dev
echo.
echo 4. Start the Frontend (in another terminal):
echo    npm run dev
echo.
echo 5. Open in Browser:
echo    http://localhost:5173
echo.
echo For detailed setup instructions, see README.md and server\README.md
echo.
pause
