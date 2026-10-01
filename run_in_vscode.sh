#!/bin/bash
echo "========================================================"
echo "  FinGuard Cyber Shield - 1-Click VS Code Launcher"
echo "========================================================"
echo ""

if ! command -v node &> /dev/null
then
    echo "[ERROR] Node.js is not installed on this system!"
    echo "Please install Node.js (v18 or v20+) from: https://nodejs.org"
    exit 1
fi

echo "[Step 1/3] Node.js version: $(node -v)"
echo ""

if [ ! -d "node_modules" ]; then
    echo "[Step 2/3] Installing dependencies..."
    npm install
else
    echo "[Step 2/3] Dependencies already present!"
fi

echo ""
echo "[Step 3/3] Starting FinGuard on http://localhost:3000..."
echo "Opening browser..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    open "http://localhost:3000" &
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open "http://localhost:3000" &> /dev/null &
fi

npm run dev
