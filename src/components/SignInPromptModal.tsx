import React from 'react';
import { 
  X, 
  ShieldCheck, 
  ArrowRight, 
  UserPlus, 
  LogIn, 
  Zap, 
  Clock, 
  Sparkles,
  Lock
} from 'lucide-react';

interface SignInPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
  onQuickDemoLogin: () => void;
}

export const SignInPromptModal: React.FC<SignInPromptModalProps> = ({
  isOpen,
  onClose,
  onSignIn,
  onSignUp,
  onQuickDemoLogin
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-slate-900 border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden text-slate-200 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Cyber glowing strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          title="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-7 space-y-5">
          {/* Header Icon & 10s Session Badge */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-[10px] font-mono tracking-wide uppercase">
                <Clock className="w-3 h-3 text-cyan-400" />
                Active Guest Session
              </div>
              <h3 className="text-lg font-bold text-white mt-1">
                Please Sign In to FinGuard
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Welcome! To access personalized transaction telemetry, real-time UPI anomaly detection, and the 1930 Cyber FIR generator, please sign in or register your account.
          </p>

          {/* Security Features Overview */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Personalized financial accounts & transaction recording</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Real-time Composite Anomaly Vector (CAV) Threat Radar</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Proactive UPI payload quarantine & 1930 FIR drafting</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            <button
              onClick={() => {
                onClose();
                onSignIn();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In to Account</span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </button>

            <button
              onClick={() => {
                onClose();
                onSignUp();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-cyan-400" />
              <span>Create New Account</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onQuickDemoLogin();
              }}
              className="w-full py-2 px-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/50 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              title="1-Tap instant login for student demo"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Quick 1-Tap Demo Login (Student)</span>
            </button>
          </div>

          {/* Dismiss button */}
          <div className="text-center pt-1 border-t border-slate-800/60">
            <button
              onClick={onClose}
              className="text-[11px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              Continue browsing as guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
