import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Code2, 
  AlertTriangle, 
  User as UserIcon, 
  LogOut, 
  Home, 
  KeyRound, 
  Terminal, 
  Radio, 
  ChevronDown, 
  ChevronUp, 
  X, 
  Zap,
  Activity
} from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  user: User | null;
  onOpenCodeStation: () => void;
  onOpenAuth: (mode?: 'signin' | 'signup' | 'forgot') => void;
  onLogout: () => void;
  activeAlertsCount: number;
}

const CYBER_BULLETINS = [
  "● LIVE SOC RADAR: NPCI Switch Latency 14ms · Zero-Trust UPI 2.0 Ingress Active",
  "● CERT-In Alert 2026-Q3: Deepfake Video Call & WhatsApp Narcotics Extortion Scheme Intercepted",
  "● CFCFRMS Electronic Lien: Automated Sec 91 CrPC Hold Active across 34 Public Sector Banks",
  "● Acoustic Sniffer: 18.45 kHz Sub-Audible Watermark Hardware Verification Operational",
  "● Shannon Character Entropy Engine: Random Mule Handles with Dispersion > 3.82 Quarantined"
];

const SIMULATED_PACKET_LOGS = [
  { time: '00:04.12', type: 'INSPECT', node: 'NPCI_SWITCH_04', msg: 'POST /v2/upi/auth_mandate · am=0.00 · Flagged: ZERO_AMT_TRAP' },
  { time: '00:03.88', type: 'LIEN_HOLD', node: 'SBI_NODAL_DESK', msg: 'Sec 91 CrPC Electronic Lien placed on A/C **4921 (Nuh, Mewat)' },
  { time: '00:02.45', type: 'DEEPFAKE', node: 'SENTINEL_AI_V2', msg: 'GAN Facial Boundary Discrepancy: 92.4% · Voice Jitter: Flat Harmonic' },
  { time: '00:01.10', type: 'ENTROPY', node: 'MULE_RADAR', msg: 'VPA "zx7q9k2m@paytm" Character Dispersion H(X) = 3.91 -> BLOCKED' },
  { time: '00:00.02', type: 'TELEMETRY', node: 'I4C_CFCFRMS', msg: 'Continuous packet ingest heartbeat ACK · Latency 12.8ms · 0 Drop' }
];

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  user,
  onOpenCodeStation,
  onOpenAuth,
  onLogout,
  activeAlertsCount
}) => {
  const [bulletinIndex, setBulletinIndex] = useState<number>(0);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setBulletinIndex(prev => (prev + 1) % CYBER_BULLETINS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);
  const navLinks = [
    { id: 'landing', label: 'Overview', icon: <Home className="w-3.5 h-3.5 inline mr-1" /> },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'defense-lab', label: 'Defense & UPI Lab' },
    { id: 'digital-arrest', label: 'AI Deepfake & Digital Arrest' },
    { id: 'risk-check', label: 'Risk Check' },
    { id: 'scam-analyzer', label: 'Scam Analyzer' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'budget', label: 'Smart Budget' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'security-alerts', label: 'Security Alerts', badge: activeAlertsCount > 0 ? activeAlertsCount : undefined },
    { id: 'schema', label: 'ER Schema & DFD' },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentTab('landing')}
            className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                FinGuard
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setCurrentTab(link.id)}
                className={`relative px-2.5 py-1.5 rounded-md transition-all text-xs xl:text-sm whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-cyan-400 font-semibold bg-cyan-950/40 border border-cyan-800/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
                {link.badge !== undefined && (
                  <span className="ml-1.5 px-1.5 py-0.2 text-[10px] font-mono rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenCodeStation}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-all font-sans cursor-pointer whitespace-nowrap"
            title="View, copy full code, or download all project files as ZIP"
          >
            <Code2 className="w-4 h-4" />
            <span className="hidden sm:inline">Project Code & ZIP</span>
            <span className="sm:hidden">Code</span>
          </button>

          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <button
                onClick={() => setCurrentTab('profile')}
                className="hidden md:flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-900 border border-slate-800 cursor-pointer"
                title="Edit profile & security"
              >
                <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span className="truncate max-w-[100px]">{user.name.split(' ')[0]}</span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-1 p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-900 transition-colors text-xs cursor-pointer"
                title="Log Out of FinGuard"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline text-xs">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenAuth('signin')}
                className="text-xs sm:text-sm font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="hidden sm:inline-flex text-xs sm:text-sm font-bold text-slate-950 bg-cyan-500 hover:bg-cyan-400 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile nav bar row for smaller screens */}
      <div className="lg:hidden border-t border-slate-800/80 px-4 py-2 overflow-x-auto flex items-center gap-1.5 no-scrollbar bg-slate-950">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => setCurrentTab(link.id)}
            className={`px-2.5 py-1 text-xs whitespace-nowrap rounded shrink-0 transition-colors ${
              currentTab === link.id
                ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {link.label}
            {link.badge !== undefined && ` (${link.badge})`}
          </button>
        ))}
      </div>

      {/* Cyber SOC Telemetry Ticker Strip */}
      <div className="border-t border-slate-900 bg-slate-950/95 px-4 sm:px-6 py-1.5 flex items-center justify-between text-[11px] font-mono select-none">
        <div className="flex items-center gap-2 overflow-hidden mr-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
          <span className="text-cyan-400 font-bold hidden sm:inline shrink-0">[SOC SENTINEL]</span>
          <span className="text-slate-300 truncate transition-opacity duration-300">
            {CYBER_BULLETINS[bulletinIndex]}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-slate-500 hidden md:inline">LATENCY: <strong className="text-emerald-400">12ms</strong></span>
          <span className="text-slate-500 hidden lg:inline">CIPHER: <strong className="text-cyan-400">SHA3/HMAC</strong></span>

          <button
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 hover:border-cyan-500/40 text-[10px] cursor-pointer"
            title="Toggle Live Security Telemetry Terminal"
          >
            <Terminal className="w-3 h-3 text-cyan-400" />
            <span className="hidden sm:inline">Telemetry Logs</span>
            {isTerminalOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Slide-Down SOC Telemetry Terminal Drawer */}
      {isTerminalOpen && (
        <div className="border-t border-cyan-500/30 bg-slate-950/98 p-4 font-mono text-xs text-slate-300 space-y-2 shadow-2xl backdrop-blur animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Terminal className="w-4 h-4" />
              <span>FinGuard Cyber Shield Core Ingress Stream (Live Telemetry)</span>
            </div>
            <button
              onClick={() => setIsTerminalOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-900 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {SIMULATED_PACKET_LOGS.map((log, i) => (
              <div key={i} className="flex items-start gap-2.5 text-[11px] leading-relaxed">
                <span className="text-slate-500 shrink-0">[{log.time}]</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] shrink-0 font-bold ${
                  log.type === 'DEEPFAKE' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                  log.type === 'LIEN_HOLD' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  log.type === 'ENTROPY' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                  'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                }`}>
                  {log.type}
                </span>
                <span className="text-slate-400 shrink-0">{log.node} :</span>
                <span className="text-slate-200">{log.msg}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500">
            <span>Filtered through NPCI / I4C National Cyber Crime Reporting Matrix</span>
            <span className="text-cyan-400">Zero-Trust Node Connected</span>
          </div>
        </div>
      )}
    </header>
  );
};
