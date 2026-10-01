@echo off
echo ========================================================
echo   FinGuard Cyber Shield - 1-Click VS Code Launcher
echo ========================================================
echo.

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not detected on your computer!
    echo Please download and install Node.js (v18 or v20+) from:
    echo   https://nodejs.org
    echo After installing, restart VS Code and run this script again.
    echo.
    pause
    exit /b 1
)

echo [Step 1/3] Checking Node.js version...
node -v
echo.

if not exist node_modules (
    echo [Step 2/3] Installing project dependencies (one-time setup)...
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] Failed to run npm install.
        echo Try running: npm install --legacy-peer-deps
        pause
        exit /b 1
    )
) else (
    echo [Step 2/3] Project dependencies already installed!
)

echo.
echo [Step 3/3] Starting FinGuard Dev Server...
echo Portal URL: http://localhost:3000
echo.
timeout /t 2 >nul
start http://localhost:3000
call npm run dev
pause
