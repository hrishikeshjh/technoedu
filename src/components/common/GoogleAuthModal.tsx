import React, { useState } from 'react';
import { X, User, ArrowRight, Sparkles, Loader2, Mail, ShieldCheck } from 'lucide-react';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGoogleAccount: (account: { name: string; email: string }) => Promise<void>;
  isLoading?: boolean;
}

const PRESET_ACCOUNTS = [
  {
    name: 'Ananya Sharma',
    email: 'ananya.sharma@gmail.com',
    initial: 'A',
    bgColor: 'bg-purple-600',
    subtitle: 'UGC-NET & Higher Education',
  },
  {
    name: 'Rohan Das',
    email: 'rohan.das@gmail.com',
    initial: 'R',
    bgColor: 'bg-emerald-600',
    subtitle: 'NEET Medical Aspirant',
  },
  {
    name: 'Aditya Verma',
    email: 'aditya.verma@gmail.com',
    initial: 'A',
    bgColor: 'bg-blue-600',
    subtitle: 'JEE Engineering Aspirant',
  },
];

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  onSelectGoogleAccount,
  isLoading = false,
}) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [customError, setCustomError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCustomError(null);

    if (!customEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customEmail)) {
      setCustomError('Please enter a valid Google email address.');
      return;
    }

    const nameToUse = customName.trim() || customEmail.split('@')[0];
    await onSelectGoogleAccount({ name: nameToUse, email: customEmail.trim() });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="google-auth-title"
    >
      <div
        className="w-full max-w-md bg-white dark:bg-[#121419] border border-slate-200 dark:border-[#272B35] rounded-3xl shadow-2xl overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-[#22252E] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <div>
              <h2 id="google-auth-title" className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">
                Sign in with Google
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-[#8E97A6]">
                Choose an account to continue to TechnoEdu
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1E222A] transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!showCustomInput ? (
            <div className="space-y-2.5">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Available Google Profiles:
              </p>

              {PRESET_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => onSelectGoogleAccount({ name: acc.name, email: acc.email })}
                  disabled={isLoading}
                  className="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-200 dark:border-[#272B35] hover:border-brand-red/50 dark:hover:border-red-500/50 hover:bg-slate-50 dark:hover:bg-[#171A21] transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full ${acc.bgColor} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
                    >
                      {acc.initial}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC] group-hover:text-brand-red dark:group-hover:text-red-400 transition-colors">
                        {acc.name}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-[#8E97A6]">
                        {acc.email}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-red dark:group-hover:text-red-400 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomInput(true)}
                  disabled={isLoading}
                  className="w-full py-2.5 px-3 rounded-xl border border-dashed border-slate-300 dark:border-[#323744] hover:border-slate-400 dark:hover:border-slate-500 text-xs font-semibold text-slate-600 dark:text-[#A7AFBD] hover:text-slate-900 dark:hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Use another Google account</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-3.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Enter your Google Account
                </span>
                <button
                  type="button"
                  onClick={() => setShowCustomInput(false)}
                  className="text-[11px] text-brand-red hover:underline"
                >
                  Back to profiles
                </button>
              </div>

              {customError && (
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-[11px] text-rose-700 dark:text-rose-300">
                  {customError}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-[#A7AFBD] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Swati Sengupta"
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#272B35] bg-slate-50 dark:bg-[#171A21] text-xs text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-[#A7AFBD] mb-1">
                  Google Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="email"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="student@gmail.com"
                    required
                    className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 dark:border-[#272B35] bg-slate-50 dark:bg-[#171A21] text-xs text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-10 rounded-xl bg-brand-red hover:bg-brand-darkred text-white text-xs font-bold flex items-center justify-center gap-2 shadow-red-glow transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Signing in with Google...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue with this account</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Privacy Note */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#22252E] flex items-start gap-2 text-[10px] text-slate-400 dark:text-[#788292]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
            <span>
              Google Identity Services verifies your email securely. TechnoEdu accesses your name and email to personalize your learning dashboard.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
