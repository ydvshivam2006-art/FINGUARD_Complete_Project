import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Video, 
  Mic, 
  PhoneOff, 
  AlertTriangle, 
  CheckCircle2, 
  Radio, 
  Zap, 
  Lock, 
  FileText, 
  Activity, 
  Copy, 
  Check, 
  Share2, 
  Eye, 
  Volume2, 
  UserCheck, 
  Flame, 
  ShieldCheck, 
  Compass, 
  CornerDownRight, 
  RefreshCw,
  Search,
  Fingerprint,
  Clock
} from 'lucide-react';

interface SimulatedThreatScenario {
  id: string;
  title: string;
  caller: string;
  agency: string;
  avatar: string;
  threatType: 'DIGITAL_ARREST' | 'DEEPFAKE_VOICE' | 'FAKE_SOUNDBOX';
  videoArtifactScore: number; // 0-100%
  voiceCloneEntropy: number; // 0-100%
  coercionRating: number; // 0-100%
  dialogueSnippet: string;
  redFlags: string[];
  muleAccount: {
    holder: string;
    vpa: string;
    bank: string;
    ifsc: string;
    requestedAmount: number;
    layerHops: number;
  };
}

const THREAT_SCENARIOS: SimulatedThreatScenario[] = [
  {
    id: 'cbi_digital_arrest',
    title: 'CBI Narcotics Courier Digital Arrest Scheme',
    caller: 'Insp. R.K. Singhania (Fake Identity)',
    agency: 'Central Bureau of Investigation (CBI Mumbai)',
    avatar: '👮‍♂️',
    threatType: 'DIGITAL_ARREST',
    videoArtifactScore: 92, // High synthetic artifact probability
    voiceCloneEntropy: 88,
    coercionRating: 98,
    dialogueSnippet: '"A FedEx parcel containing 16 passports and synthetic narcotics was seized at Mumbai Customs in your name. An arrest warrant under PMLA Section 3 has been issued. You are placed under Digital Arrest. Do not cut this video call and transfer verification deposit to RBI Verification Escrow immediately."',
    redFlags: [
      'Demand for money into "RBI Verification Escrow" (RBI never maintains escrow for individuals)',
      'Digital Arrest has ZERO legal existence in Indian Law (CrPC/BNSS)',
      'Police or CBI never conduct interrogations or issue bails via WhatsApp or Skype video calls',
      'Artificial boundary warping detected around caller collar & badge insignia'
    ],
    muleAccount: {
      holder: 'M/S SURESH OVERSEAS TRADERS (Mule Shell)',
      vpa: 'rbi.verification.nodal9@okhdfcbank',
      bank: 'HDFC Bank - Nuh Branch',
      ifsc: 'HDFC0004921',
      requestedAmount: 185000,
      layerHops: 4
    }
  },
  {
    id: 'fedex_customs_clone',
    title: 'Customs Officer AI Deepfake Voice Cloning',
    caller: 'Officer Mehta (AI Cloned Voice)',
    agency: 'Indira Gandhi International Airport Customs',
    avatar: '🛃',
    threatType: 'DEEPFAKE_VOICE',
    videoArtifactScore: 84,
    voiceCloneEntropy: 95,
    coercionRating: 90,
    dialogueSnippet: '"Your Aadhaar is linked to money laundering syndicate bank accounts in Taiwan. The magistrate is on standby. Transfer 80% of your liquid funds for clearance certification. If you disconnect, local SWAT team will raid your residence in 15 minutes."',
    redFlags: [
      'Robotic vocal frequency stability without physiological breath pauses',
      'Unreasonable time ultimatum ("15 minutes") to induce panic',
      'Aadhaar card misuse fear tactics with fabricated court seal overlays',
      'Zero background ambient room acoustic resonance'
    ],
    muleAccount: {
      holder: 'KAVITA ENTERPRISES (Mule Current A/C)',
      vpa: 'customs.clearance.gov@axisbank',
      bank: 'Axis Bank - Jamtara Sector 4',
      ifsc: 'UTIB0001844',
      requestedAmount: 92000,
      layerHops: 3
    }
  },
  {
    id: 'fake_soundbox_apk',
    title: 'Fake Soundbox Audio Waveform Spoofing (Merchant Trap)',
    caller: 'Spoofed Android APK Sound Generator',
    agency: 'Simulated Merchant Soundbox (Paytm / PhonePe Fake APK)',
    avatar: '🔊',
    threatType: 'FAKE_SOUNDBOX',
    videoArtifactScore: 12,
    voiceCloneEntropy: 79,
    coercionRating: 45,
    dialogueSnippet: '"Paytm par do hazaar rupaye prapt hue! (₹2,000 received on Paytm - Audio spoofed via merchant screen APK without inter-bank settlement notification)."',
    redFlags: [
      'Missing ultrasonic acoustic cryptographic watermark embedded in genuine soundbox hardware',
      'No corresponding NPCI UTR settlement entry in merchant UPI ledger',
      'High spectral distortion in speaker output indicative of smartphone loudspeaker reproduction',
      'Zero byte handshake received over MQTT payment telemetry server'
    ],
    muleAccount: {
      holder: 'Rogue Soundbox APK Session ID #9182',
      vpa: 'counterfeit.broadcast@mockup',
      bank: 'Simulated Device Loopback',
      ifsc: 'FAKE0000000',
      requestedAmount: 2000,
      layerHops: 1
    }
  }
];

export const DigitalArrestShieldView: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<SimulatedThreatScenario>(THREAT_SCENARIOS[0]);
  const [isLiveScanning, setIsLiveScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(100);
  const [copiedNotice, setCopiedNotice] = useState<boolean>(false);
  const [isLienFreezeTriggered, setIsLienFreezeTriggered] = useState<boolean>(false);
  const [salvagedAmount, setSalvagedAmount] = useState<number>(0);

  // Soundbox waveform simulation
  const [audioFrequencyHz, setAudioFrequencyHz] = useState<number>(18450);
  const [hasCryptographicSignature, setHasCryptographicSignature] = useState<boolean>(false);

  // Advanced Visual HUD Toggles
  const [showBiometricMesh, setShowBiometricMesh] = useState<boolean>(true);
  const [showHeatmapOverlay, setShowHeatmapOverlay] = useState<boolean>(false);
  const [goldenHourSeconds, setGoldenHourSeconds] = useState<number>(412); // ~6m 52s

  // Golden hour countdown timer simulation
  useEffect(() => {
    if (isLienFreezeTriggered) return;
    const interval = setInterval(() => {
      setGoldenHourSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isLienFreezeTriggered]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Trigger automated scan animation
  const handleRunDeepfakeAnalysis = () => {
    setIsLiveScanning(true);
    setScanProgress(0);
    setIsLienFreezeTriggered(false);
    setSalvagedAmount(0);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLiveScanning(false);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  // Section 91 CrPC Automated Multi-Hop Lien Freezing Simulator
  const handleExecuteMultiHopLien = () => {
    setIsLienFreezeTriggered(true);
    const amount = selectedScenario.muleAccount.requestedAmount;
    // Calculate 85% recovered before ATM cashout
    setSalvagedAmount(Math.round(amount * 0.88));
  };

  const legalNoticeText = `[STATUTORY CYBER NOTICE UNDER SEC 41A CrPC / SEC 35 BNSS & IT ACT 66D]
To: ${selectedScenario.caller} (${selectedScenario.agency})
Notice: You are hereby notified that under guidelines issued by the Ministry of Home Affairs (MHA) and Indian Law (IT Act 2000, CrPC & Bharatiya Nagarik Suraksha Sanhita):
1. There is NO legal provision for "Digital Arrest" under the Constitution or penal code of India.
2. Law enforcement agencies (CBI, ED, State Police, Customs) NEVER conduct investigations, hearings, or demand escrow bond transfers over WhatsApp, Skype, or video calls.
3. This session stream has been cryptographically fingerprinted with Composite Anomaly Score ${selectedScenario.videoArtifactScore}% and dispatched to the National Cyber Crime Reporting Portal (1930 / I4C CFCFRMS) for immediate inter-bank nodal lien hold.
4. Continuing this transmission constitutes offences under Section 66D IT Act (cheating by personation), Section 419/420 IPC, and Section 318 BNS.`;

  const handleCopyLegalNotice = () => {
    navigator.clipboard.writeText(legalNoticeText);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner: World-First Innovation Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-cyan-500/30 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold tracking-wide uppercase">
              <ShieldAlert className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              World-First Defense Module · AI Deepfake & Digital Arrest Shield
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Anti-Digital Arrest & Voice Deepfake Interceptor
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              India&apos;s first proactive defense station built to dismantle extortion syndicates posing as CBI, Customs, and Police on video calls. Real-time GAN artifact inspection, acoustic vocal jitter analysis, and instant multi-hop mule lien freezing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
            <button
              onClick={handleRunDeepfakeAnalysis}
              disabled={isLiveScanning}
              className="py-3 px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLiveScanning ? 'animate-spin' : ''}`} />
              <span>{isLiveScanning ? 'Scanning Stream...' : 'Run Real-Time Forensic Deep Scan'}</span>
            </button>

            <button
              onClick={handleCopyLegalNotice}
              className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {copiedNotice ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
              <span>{copiedNotice ? 'Notice Copied to Clipboard!' : 'Copy Section 41A Legal Deterrent'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="flex flex-wrap gap-2.5 p-2 rounded-xl bg-slate-900/80 border border-slate-800">
        {THREAT_SCENARIOS.map((scen) => (
          <button
            key={scen.id}
            onClick={() => {
              setSelectedScenario(scen);
              setIsLienFreezeTriggered(false);
              setSalvagedAmount(0);
            }}
            className={`flex-1 min-w-[240px] p-3 rounded-lg text-left transition-all cursor-pointer flex items-center gap-3 ${
              selectedScenario.id === scen.id
                ? 'bg-cyan-950/70 border border-cyan-500/50 text-white shadow-md'
                : 'bg-slate-950/40 hover:bg-slate-950/80 border border-slate-800/80 text-slate-400'
            }`}
          >
            <span className="text-2xl p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
              {scen.avatar}
            </span>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{scen.title}</div>
              <div className="text-[10px] text-cyan-400 font-mono truncate">{scen.agency}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Main Grid: Live Simulated Stream & Deep Forensic Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Simulated Deepfake Call Monitor (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
          
          {/* Virtual Call HUD Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xl">
                  {selectedScenario.avatar}
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-rose-500 border-2 border-slate-900 animate-ping" />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-rose-500 border-2 border-slate-900" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{selectedScenario.caller}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    SUSPECTED THREAT
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {selectedScenario.agency} · Live Audio/Video Ingress
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-mono text-rose-400 flex items-center justify-end gap-1.5 font-bold">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                REC [EVIDENCE LOGGED]
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                SHA-256 Frame Verified
              </div>
            </div>
          </div>

          {/* Interactive Simulated Video Stream & Biometric Wireframe HUD */}
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
            {/* Viewport Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800/80 text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="text-white font-bold">CAM_FEED_01: INCOMING ENCRYPTED STREAM</span>
                <span className="hidden sm:inline text-slate-500">|</span>
                <span className="hidden sm:inline text-cyan-400">1080p · 30 FPS</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-amber-400 font-bold">AI INFERENCE: ACTIVE</span>
                <span className="text-slate-500 font-mono">18ms</span>
              </div>
            </div>

            {/* Video Canvas Stage */}
            <div className="relative h-64 sm:h-72 w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center overflow-hidden">
              {/* Scanlines effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40 z-20" />
              
              {/* Coordinate Grid Background */}
              <div className="absolute inset-0 bg-[radial-gradient(#0891b2_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

              {/* Central Target Face & Wireframe */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                {/* Caller Avatar Representation */}
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-slate-900 border-2 border-slate-700/80 flex items-center justify-center text-6xl shadow-2xl overflow-hidden">
                  <span>{selectedScenario.avatar}</span>

                  {/* Thermal / Inversion Heatmap Overlay */}
                  {showHeatmapOverlay && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/40 via-amber-500/30 to-blue-500/40 mix-blend-color-dodge pointer-events-none animate-pulse" />
                  )}

                  {/* 68-Point Biometric Facial Landmark Mesh (SVG) */}
                  {showBiometricMesh && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 100">
                      {/* Facial contour wireframe lines */}
                      <polygon points="25,40 50,20 75,40 70,75 50,90 30,75" fill="none" stroke="#22d3ee" strokeWidth="0.8" strokeDasharray="2,2" opacity="0.8" />
                      {/* Eye lines & gaze markers */}
                      <circle cx="38" cy="42" r="3" fill="none" stroke="#f43f5e" strokeWidth="1.2" />
                      <circle cx="62" cy="42" r="3" fill="none" stroke="#f43f5e" strokeWidth="1.2" />
                      <line x1="38" y1="42" x2="62" y2="42" stroke="#22d3ee" strokeWidth="0.6" />
                      {/* Nose & Mouth wireframe */}
                      <polyline points="50,42 46,55 54,55 50,42" fill="none" stroke="#22d3ee" strokeWidth="0.8" />
                      <ellipse cx="50" cy="70" rx="10" ry="4" fill="none" stroke="#fbbf24" strokeWidth="1" strokeDasharray="1,1" />
                      {/* Landmark tracking dots */}
                      <circle cx="25" cy="40" r="1.5" fill="#22d3ee" />
                      <circle cx="50" cy="20" r="1.5" fill="#22d3ee" />
                      <circle cx="75" cy="40" r="1.5" fill="#22d3ee" />
                      <circle cx="50" cy="90" r="1.5" fill="#22d3ee" />
                    </svg>
                  )}
                </div>

                {/* Target Bounding Box Corners */}
                <div className="absolute -inset-4 border border-cyan-500/40 rounded-xl pointer-events-none">
                  <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
                  <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
                </div>
              </div>

              {/* Floating Detection Tags on Viewport */}
              <div className="absolute top-3 left-3 bg-slate-900/80 border border-slate-800 backdrop-blur px-2.5 py-1 rounded text-[10px] font-mono text-cyan-300 space-y-0.5">
                <div>COORD: X: 142.9 | Y: 84.1</div>
                <div>LIP-SYNC DELAY: +118ms (DESYNC)</div>
              </div>

              <div className="absolute top-3 right-3 bg-rose-950/80 border border-rose-800/80 backdrop-blur px-2.5 py-1 rounded text-[10px] font-mono text-rose-300 space-y-0.5 text-right">
                <div className="font-bold">SYNTHESIS ANOMALY: {selectedScenario.videoArtifactScore}%</div>
                <div className="text-amber-400">BLINK RATE: 3/MIN (ABNORMAL)</div>
              </div>

              {/* Bottom Real-Time Audio FFT Spectrum Waveform */}
              <div className="absolute bottom-2 left-4 right-4 z-20 flex items-end justify-between gap-1 h-8 px-2 bg-slate-950/60 backdrop-blur rounded-lg border border-slate-800/60">
                <span className="text-[9px] font-mono text-slate-500 absolute top-1 left-2">FFT SPECTRAL FREQUENCY (20Hz - 20kHz)</span>
                {[45, 80, 65, 30, 95, 75, 50, 40, 85, 90, 60, 35, 70, 85, 45, 90, 75, 40, 65, 80, 55, 35, 70, 90].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${isLiveScanning ? (h + (i % 5) * 4) % 100 : (h * 0.7)}%` }}
                    className="flex-1 bg-gradient-to-t from-cyan-500 to-amber-400 rounded-t transition-all duration-150"
                  />
                ))}
              </div>
            </div>

            {/* Viewport Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowBiometricMesh(!showBiometricMesh)}
                  className={`px-2.5 py-1 rounded font-mono text-[11px] border transition-colors cursor-pointer ${
                    showBiometricMesh
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-700'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  68-Point Mesh: {showBiometricMesh ? 'ON' : 'OFF'}
                </button>

                <button
                  onClick={() => setShowHeatmapOverlay(!showHeatmapOverlay)}
                  className={`px-2.5 py-1 rounded font-mono text-[11px] border transition-colors cursor-pointer ${
                    showHeatmapOverlay
                      ? 'bg-rose-950 text-rose-300 border-rose-700'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  Thermal Inversion: {showHeatmapOverlay ? 'ON' : 'OFF'}
                </button>
              </div>

              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Zero-Trust Biometric Gate</span>
              </div>
            </div>
          </div>

          {/* Intercepted Audio/Video Transcript with Red Flag Overlay */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Real-Time Acoustic & Speech Transcript Interception</span>
            </div>
            
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 relative font-mono text-xs leading-relaxed text-slate-200">
              <p>{selectedScenario.dialogueSnippet}</p>
              
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-rose-400">
                <span className="flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  NLP Coercion Rating: {selectedScenario.coercionRating}% (High Psychological Extortion)
                </span>
                <span className="text-slate-500">MHA Nodal Hash: #7829-1930</span>
              </div>
            </div>
          </div>

          {/* Forensic Detection Scores */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>GAN Boundary Artifact</span>
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-xl font-bold font-mono text-rose-400">
                {selectedScenario.videoArtifactScore}%
              </div>
              <div className="text-[10px] text-slate-500">Synthetic collar & gaze warping</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Voice Clone Jitter</span>
                <Mic className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-xl font-bold font-mono text-amber-400">
                {selectedScenario.voiceCloneEntropy}%
              </div>
              <div className="text-[10px] text-slate-500">Zero natural breath pause</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Extortion Vector</span>
                <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
              </div>
              <div className="text-xl font-bold font-mono text-rose-500">
                {selectedScenario.coercionRating}%
              </div>
              <div className="text-[10px] text-slate-500">PMLA arrest fabrication</div>
            </div>
          </div>

          {/* Legal Defense Truth Box */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2">
            <h4 className="text-xs font-bold text-rose-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Statutory Legal Reality Check (MHA & Indian Judiciary)</span>
            </h4>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              {selectedScenario.redFlags.map((flag, idx) => (
                <li key={idx} className="leading-relaxed">{flag}</li>
              ))}
            </ul>
          </div>

          {/* Instant Disconnect & 1930 Broadcast Button */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => alert('🚨 EMERGENCY PROTOCOL TRIGGERED: Video session severed. Cryptographic audit dump transmitted to 1930 Cyber Cell & your emergency contact guardian list.')}
              className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-rose-600/30"
            >
              <PhoneOff className="w-4 h-4" />
              <span>Sever Call & Broadcast 1930 SOS</span>
            </button>

            <button
              onClick={handleCopyLegalNotice}
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              <span>Send Legal Warning to Caller</span>
            </button>
          </div>

        </div>

        {/* Right Column: 7-Minute Golden Hour Multi-Hop Mule Forensic Graph (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6 flex flex-col justify-between">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Fingerprint className="w-4 h-4 text-cyan-400" />
                  <span>7-Minute Golden Hour Mule Flow</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Tracing stolen fund hops across nodal clearing accounts
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono border ${
                  isLienFreezeTriggered
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                    : 'bg-amber-950/70 text-amber-300 border-amber-700 animate-pulse'
                }`}>
                  <Clock className="w-3 h-3" />
                  <span>{isLienFreezeTriggered ? 'LIEN LOCKED' : `DRAIN: ${formatTimer(goldenHourSeconds)}`}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800 hidden sm:inline">
                  I4C CFCFRMS
                </span>
              </div>
            </div>

            {/* Targeted Mule Profile */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                Destination Mule Account Demanded:
              </div>
              <div className="text-cyan-300 font-bold text-sm">
                {selectedScenario.muleAccount.holder}
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                <div>VPA: <span className="text-white">{selectedScenario.muleAccount.vpa}</span></div>
                <div>Bank: <span className="text-white">{selectedScenario.muleAccount.bank}</span></div>
                <div>IFSC: <span className="text-white">{selectedScenario.muleAccount.ifsc}</span></div>
                <div>Demanded: <span className="text-rose-400 font-bold">₹{selectedScenario.muleAccount.requestedAmount.toLocaleString('en-IN')}</span></div>
              </div>
            </div>

            {/* Multi-Hop Visual Flow Chart */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Multi-Hop Flow Traversal (Layer 0 to Layer 3)
              </div>

              <div className="space-y-2 text-xs">
                {/* Layer 0: Victim */}
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    <span className="font-bold text-white">L0: Target Victim (You)</span>
                  </div>
                  <span className="font-mono text-cyan-400 font-bold">₹{selectedScenario.muleAccount.requestedAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-center text-slate-600">
                  <CornerDownRight className="w-4 h-4" />
                </div>

                {/* Layer 1: Primary Mule */}
                <div className={`p-2.5 rounded-lg border flex items-center justify-between transition-all ${
                  isLienFreezeTriggered 
                    ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300' 
                    : 'bg-slate-950 border-amber-500/40 text-amber-300'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isLienFreezeTriggered ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`}></span>
                    <span className="font-bold">L1: Primary Mule ({selectedScenario.muleAccount.bank})</span>
                  </div>
                  <span className="font-mono font-bold">
                    {isLienFreezeTriggered ? '🔒 FROZEN (Lien Applied)' : 'HOLDING'}
                  </span>
                </div>

                <div className="flex justify-center text-slate-600">
                  <CornerDownRight className="w-4 h-4" />
                </div>

                {/* Layer 2: Split Mules */}
                <div className={`p-2.5 rounded-lg border flex items-center justify-between transition-all ${
                  isLienFreezeTriggered 
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400' 
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                    <span>L2: 3 Sub-Accounts (PNB/Canara/SBI)</span>
                  </div>
                  <span className="font-mono">
                    {isLienFreezeTriggered ? '🛑 BLOCKED' : 'Splits in 4 mins'}
                  </span>
                </div>

                <div className="flex justify-center text-slate-600">
                  <CornerDownRight className="w-4 h-4" />
                </div>

                {/* Layer 3: Cashout / ATM */}
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span>L3: Crypto P2P / Nuh ATM Liquidation</span>
                  </div>
                  <span className="font-mono text-rose-400">
                    {isLienFreezeTriggered ? '🛡️ PREVENTED' : 'Threat Level High'}
                  </span>
                </div>
              </div>
            </div>

            {/* Lien Freeze Result Feedback */}
            {isLienFreezeTriggered && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs space-y-1 animate-in zoom-in-95">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>CFCFRMS Electronic Lien Successfully Broadcast!</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Section 91 CrPC freeze order delivered to nodal compliance desks. 
                  <strong className="text-emerald-400 font-mono"> ₹{salvagedAmount.toLocaleString('en-IN')} (88%) </strong> 
                  salvaged before off-ramp liquidation.
                </p>
              </div>
            )}
          </div>

          {/* Action to Execute Section 91 Lien Freezing */}
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={handleExecuteMultiHopLien}
              className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              <Lock className="w-4 h-4" />
              <span>Simulate Instant Section 91 Inter-Bank Lien Freeze</span>
            </button>
            <p className="text-[10px] text-center text-slate-500 mt-2 font-mono">
              Integrates with 1930 CFCFRMS Electronic Freeze Protocol
            </p>
          </div>

        </div>

      </div>

      {/* Feature 2: Ultrasonic Soundbox Audio Cryptographic Signature Validator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Sub-Audible Soundbox Audio Cryptographic Signature Sniffer
              </h3>
              <p className="text-xs text-slate-400">
                Detects counterfeit merchant soundbox APKs that play fake payment audio confirmation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
              18.45 kHz Sub-Audible Ultrasonic Band
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-slate-400 block font-bold uppercase text-[10px]">Acoustic Frequency Detector</span>
            <div className="text-lg font-mono font-bold text-cyan-400">
              {audioFrequencyHz} Hz
            </div>
            <p className="text-slate-400 text-[11px]">
              Genuine soundboxes emit high-frequency acoustic handshakes beyond 18 kHz unrenderable by smartphone loudspeakers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-slate-400 block font-bold uppercase text-[10px]">Cryptographic Sound Watermark</span>
            <div className={`text-lg font-mono font-bold ${hasCryptographicSignature ? 'text-emerald-400' : 'text-rose-400'}`}>
              {hasCryptographicSignature ? 'VERIFIED HARDWARE SIGNATURE' : 'SIGNATURE ABSENT (FAKE AUDIO)'}
            </div>
            <p className="text-slate-400 text-[11px]">
              Fake payment APKs replay standard MP3 audio without hardware TPM key signatures.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-2">
            <div>
              <span className="text-slate-400 block font-bold uppercase text-[10px]">Test Waveform Analyzer</span>
              <p className="text-slate-300 text-[11px] mt-1">
                Toggle between authentic soundbox hardware vs spoofed fake APK audio file.
              </p>
            </div>
            <button
              onClick={() => {
                setHasCryptographicSignature(!hasCryptographicSignature);
                setAudioFrequencyHz(hasCryptographicSignature ? 18450 : 19200);
              }}
              className="py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-bold text-xs transition-all cursor-pointer"
            >
              Toggle Soundbox Type: {hasCryptographicSignature ? 'Authentic Device' : 'Counterfeit APK'}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
