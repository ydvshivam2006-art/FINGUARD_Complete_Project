# FinGuard — Financial Fraud & UPI Anomaly Defense System

FinGuard is a full-stack financial safety application engineered to detect zero-amount UPI reverse charges (`am=0`), lexical phishing triggers, and abnormal transaction velocities with automated 1930 Cyber Cell complaint generation and 3NF relational MySQL ledgers.

---

## ⚡ Super Fast 1-Click Launch (Windows / Mac)

### For Windows:
Simply double-click **`RUN_IN_VSCODE.bat`** in the project folder!
It automatically installs dependencies, starts the Vite server, and opens your browser at `http://localhost:3000`.

### For Mac / Linux:
Open Terminal in the project folder and run:
```bash
chmod +x run_in_vscode.sh
./run_in_vscode.sh
```

---

## 🚀 How to Run in VS Code (Terminal Steps)

> ⚠️ **IMPORTANT NOTE**: 
> **DO NOT** right-click `index.html` and select *"Open with Live Server"*, and **DO NOT** double-click `index.html` in file explorer!
> Because this is a modern React + TypeScript + Tailwind project, raw `.tsx` files must be compiled by the Vite dev server (`npm run dev`). Opening `index.html` directly in a browser will show a blank white page!

### Follow these 3 easy steps:

1. **Open the Project in VS Code**:
   In VS Code, click **File** -> **Open Folder...** -> select this project folder.

2. **Open the Terminal**:
   Press **`Ctrl + ~`** (or **`Cmd + ~`** on Mac) or go to menu: `Terminal` -> `New Terminal`.

3. **Run these two commands**:
   ```bash
   npm install
   npm run dev
   ```

4. **Open in your browser**:
   Click the local link in the terminal or open:
   👉 **`http://localhost:3000`** (or `http://localhost:5173`)

---

## 🛠️ Troubleshooting Common VS Code Errors

### Issue 1: "vite is not recognized as an internal or external command"
* **Reason:** You haven't run `npm install` yet.
* **Fix:** In your terminal, run:
  ```bash
  npm install
  npm run dev
  ```

### Issue 2: Blank white screen or `Cannot use import statement outside a module`
* **Reason:** You opened `index.html` with VS Code Live Server or double clicked it.
* **Fix:** Stop Live Server. Run `npm run dev` in the terminal and open `http://localhost:3000`.

### Issue 3: "Port 3000 is already in use"
* **Fix:** Either close the other app running on port 3000, or run:
  ```bash
  npx vite --port 5173
  ```
  Then open `http://localhost:5173`.

### Issue 4: Node.js is not installed
* **Fix:** Download the LTS version of Node.js from [https://nodejs.org](https://nodejs.org), install it, restart VS Code, and run `npm install`.

---

## 🔑 Demo Account Credentials
* **Email:** `student@test.com`
* **Password:** `password123`
*(Or click the **"⚡ Quick 1-Tap Demo Login (Student)"** button on the sign-in modal for instant login without typing!)*

---

## 📁 Repository Structure
```text
FINGUARD/
├── RUN_IN_VSCODE.bat          # 1-Click launcher for Windows
├── run_in_vscode.sh           # 1-Click launcher for Mac/Linux
├── package.json               # Root dependencies (React 19, Vite, Tailwind CSS, Lucide)
├── vite.config.ts             # Vite dev server configuration
├── tsconfig.json              # TypeScript compiler configuration
├── index.html                 # Single Page Application entry point
├── README.md                  # This setup & troubleshooting guide
│
├── src/                       # Complete React Source Code
│   ├── main.tsx               # Root DOM mounting
│   ├── App.tsx                # Master state router & navigation manager
│   ├── index.css              # Cyber-dark Tailwind styles
│   ├── types/                 # TypeScript data contracts & schemas
│   ├── data/                  # Initial transactions, mock data & code files
│   └── components/            # High-fidelity React Views
│       ├── Navbar.tsx         # Responsive header, auth status & SOC telemetry
│       ├── LandingPageView.tsx# Overview & sandbox scanner
│       ├── DashboardView.tsx  # Financial metrics & CAV gauge
│       ├── ThreatLabView.tsx  # UPI inspection & scam simulation
│       ├── DigitalArrestShieldView.tsx # AI Deepfake & Digital Arrest Interceptor
│       ├── RiskCheckView.tsx  # Homoglyphs & domain verification
│       ├── ScamAnalyzerView.tsx # Heuristic message scanner
│       ├── TransactionsView.tsx # Ledger & account balances
│       ├── BudgetView.tsx     # Smart category budgets
│       ├── AnalyticsView.tsx  # Visual expenditure graphs
│       ├── SecurityAlertsView.tsx # I4C 1930 incident logs
│       ├── SchemaAnalyzerView.tsx # ER diagram & 3NF schemas
│       ├── ProfileView.tsx    # User settings
│       ├── SignInPromptModal.tsx # 10-second guest sign-in modal
│       ├── AuthModal.tsx      # Login, registration & password reset
│       └── CodeStationModal.tsx # Full code viewer & ZIP export
│
└── backend/                   # Optional Node.js + MySQL REST API
    ├── server.js              # Express REST API Server
    ├── database.sql           # 3NF MySQL Schema with sample records
    ├── package.json           # Backend package configuration
    └── .env.example           # Environment template
```
