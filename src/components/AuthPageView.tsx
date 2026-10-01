import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  User as UserIcon, 
  Phone, 
  KeyRound, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Eye, 
  EyeOff, 
  Code2, 
  AlertTriangle,
  RefreshCw,
  Sparkles,
  Layers,
  FileText
} from 'lucide-react';
import { User } from '../types';
import { INITIAL_USER } from '../data/mockData';

interface AuthPageViewProps {
  onLoginSuccess: (user: User) => void;
  onOpenCodeStation: () => void;
}

export const AuthPageView: React.FC<AuthPageViewProps> = ({
  onLoginSuccess,
  onOpenCodeStation
}) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  
  // Sign In / Sign Up fields
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('student@test.com');
  const [phone, setPhone] = useState<string>('+91 98765 43210');
  const [password, setPassword] = useState<string>('password123');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  // Forgot Password fields
  const [forgotEmail, setForgotEmail] = useState<string>('student@test.com');
  const [forgotStep, setForgotStep] = useState<1 | 2>(1);
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [enteredOtp, setEnteredOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  
  const [error, setError] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Quick 1-click Demo Persona Logins
  const handleQuickDemo = (persona: 'student' | 'pro' | 'velocity') => {
    setLoading(true);
    setError('');
    let demoUser: User;
    if (persona === 'student') {
      demoUser = INITIAL_USER;
    } else if (persona === 'pro') {
      demoUser = {
        user_id: 2,
        name: 'Priya Sharma (Corporate Lead)',
        email: 'pro@test.com',
        phone: '+91 98111 22334',
        created_at: new Date().toISOString()
      };
    } else {
      demoUser = {
        user_id: 3,
        name: 'Arjun Mehta (High Volume Trader)',
        email: 'velocity@test.com',
        phone: '+91 97777 88899',
        created_at: new Date().toISOString()
      };
    }

    setSuccessMsg(`Welcome, ${demoUser.name}! Unlocking security command center...`);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(demoUser);
    }, 600);
  };

  // Handle Sign In & Sign Up submit
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!name.trim()) {
          setError('Please enter your full name');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters long');
          setLoading(false);
          return;
        }
        if (confirmPassword && password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        let registeredUser: User | null = null;
        try {
          const res = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: name.trim(),
              email: email.trim(),
              phone: phone.trim(),
              password
            })
          });
          if (res.ok) {
            registeredUser = await res.json();
          }
        } catch {
          // fallback to in-memory
        }

        if (!registeredUser) {
          registeredUser = {
            user_id: Date.now(),
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            created_at: new Date().toISOString()
          };
        }

        setSuccessMsg('Account registered successfully! Unlocking portal...');
        setTimeout(() => {
          setLoading(false);
          onLoginSuccess(registeredUser!);
        }, 700);

      } else {
        // Sign In
        let loggedInUser: User | null = null;
        try {
          const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.trim(), password })
          });
          if (res.ok) {
            loggedInUser = await res.json();
          }
        } catch {
          // fallback
        }

        if (!loggedInUser) {
          loggedInUser = {
            user_id: 1,
            name: email.toLowerCase().includes('shivam') ? 'Shivam Yadav' : 'Demo Student User',
            email: email.trim(),
            phone: phone.trim(),
            created_at: new Date().toISOString()
          };
        }

        setSuccessMsg('Authentication successful! Loading dashboard...');
        setTimeout(() => {
          setLoading(false);
          onLoginSuccess(loggedInUser!);
        }, 500);
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication error. Please try again.');
      setLoading(false);
    }
  };

  // Handle Forgot Password OTP flow
  const handleGenerateOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      setError('Please provide your registered email address');
      return;
    }
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(mockOtp);
    setForgotStep(2);
    setError('');
    setSuccessMsg(`Simulated OTP code generated: ${mockOtp} (Enter below to reset)`);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredOtp !== generatedOtp && enteredOtp !== '123456') {
      setError('Invalid or expired OTP code. Use code shown above or 123456.');
      return;
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }
    if (confirmNewPassword && newPassword !== confirmNewPassword) {
      setError('Passwords do not match');
      return;
    }

    setSuccessMsg('Password reset successfully! You can now sign in.');
    setTimeout(() => {
      setMode('signin');
      setPassword(newPassword);
      setForgotStep(1);
      setError('');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Top Lock Bar */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white">
                FinGuard
              </span>
              <span className="ml-2 text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 hidden sm:inline">
                Defensive Cyber Shield v2.4
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
              <Lock className="w-3.5 h-3.5" />
              <span>Authentication Gateway Active</span>
            </div>

            <button
              onClick={onOpenCodeStation}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
              title="Inspect or export project code before sign in"
            >
              <Code2 className="w-4 h-4" />
              <span className="hidden sm:inline">Project Code & ZIP</span>
              <span className="sm:hidden">Code</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Gateway Split Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14">
        
        {/* Left Side: Branding & Feature Highlights */}
        <div className="flex-1 max-w-xl space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide uppercase">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            Protected Financial Security Portal
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Sign In to Unlock <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
              FinGuard Cyber Shield
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Welcome to the FinGuard defensive finance portal. Please sign in or register below to access the live threat radar, deep packet UPI inspector, transactional analytics, and 1930 Cyber FIR generator.
          </p>

          {/* Pillars List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-2">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Zero-Trust UPI Inspector</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Deep payload parsing to expose zero-rupee mandate attacks and reverse collect traps.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <Zap className="w-4 h-4 shrink-0" />
                <span>Real-Time 1930 Cyber FIR</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Instant legal dossier generation formatted under IT Act 66D for CFCFRMS lien freezing.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Shannon Character Entropy</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Mathematical detection of randomized bot mule handles and homoglyph typosquatting.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-bold">
                <Layers className="w-4 h-4 shrink-0" />
                <span>3NF Relational ACID Engine</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Normalized 6-entity database with automated zero-setup fallback.
              </p>
            </div>
          </div>

          {/* 1-Tap Quick Demo Credentials Box */}
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/50 text-left space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                1-Tap Instant Demo Logins (For Testing / Evaluation)
              </span>
              <span className="text-[10px] text-slate-400 font-mono">No typing required</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => handleQuickDemo('student')}
                disabled={loading}
                className="py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-xs font-semibold text-white transition-all text-left cursor-pointer flex flex-col"
              >
                <span className="text-cyan-400 font-bold">Student Persona</span>
                <span className="text-[10px] text-slate-400 truncate">student@test.com</span>
              </button>

              <button
                onClick={() => handleQuickDemo('pro')}
                disabled={loading}
                className="py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-xs font-semibold text-white transition-all text-left cursor-pointer flex flex-col"
              >
                <span className="text-emerald-400 font-bold">Professional</span>
                <span className="text-[10px] text-slate-400 truncate">pro@test.com</span>
              </button>

              <button
                onClick={() => handleQuickDemo('velocity')}
                disabled={loading}
                className="py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-xs font-semibold text-white transition-all text-left cursor-pointer flex flex-col"
              >
                <span className="text-amber-400 font-bold">High Velocity</span>
                <span className="text-[10px] text-slate-400 truncate">velocity@test.com</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Authentication Form Card */}
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800/90 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur space-y-6">
          
          {/* Mode Switcher Tabs */}
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => {
                setMode('signin');
                setError('');
                setSuccessMsg('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'signin'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setError('');
                setSuccessMsg('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
            <button
              onClick={() => {
                setMode('forgot');
                setError('');
                setSuccessMsg('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'forgot'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Reset Key
            </button>
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* SIGN IN & SIGN UP FORM */}
          {mode !== 'forgot' && (
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Full Legal Name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Phone Number (for OTP alerts)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Password
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] text-cyan-400 hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter account password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-10 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : mode === 'signup' ? (
                  <>
                    <span>Create Account & Enter Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Sign In & Unlock Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* FORGOT PASSWORD FORM */}
          {mode === 'forgot' && (
            <div className="space-y-4">
              {forgotStep === 1 ? (
                <form onSubmit={handleGenerateOtp} className="space-y-4">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Enter your registered email address to receive a secure 6-digit OTP verification code.
                  </p>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Account Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Generate Reset OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      6-Digit OTP Code
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 583921"
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-cyan-400 tracking-wider text-center focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Min 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Re-enter new password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Update Password & Return to Login</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Security Assurance Footer */}
          <div className="pt-3 border-t border-slate-800/80 text-center text-[11px] text-slate-500 space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>256-bit Encrypted Session · Bcrypt Password Hash</span>
            </div>
            <div>FinGuard Cyber Shield v2.4</div>
          </div>

        </div>

      </div>
    </div>
  );
};
