import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, ShieldCheck, ArrowRight, Loader2, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const VerifyEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { verifyEmail, resendVerification, isAuthenticated, user } = useAuth();

  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && user?.isVerified) {
      const needsOnboarding = !user.learningProfile?.onboardingCompleted;
      navigate(needsOnboarding ? '/onboarding' : '/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError(null);
    setSuccessMsg(null);

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!code.trim() || code.trim().length < 4) {
      setError('Please enter the verification code sent to your email.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await verifyEmail(email.trim(), code.trim());
      setSuccessMsg('Email verified! Redirecting to your learning space...');
      setTimeout(() => {
        navigate(res.needsOnboarding ? '/onboarding' : '/dashboard', { replace: true });
      }, 600);
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please check the code and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (isResending) return;
    setError(null);
    setSuccessMsg(null);
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter your registered email address first.');
      return;
    }

    setIsResending(true);
    try {
      const msg = await resendVerification(email.trim());
      setSuccessMsg(msg);
    } catch (err: any) {
      setError(err.message || 'Could not resend verification code.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] flex flex-col justify-between transition-colors">
      <header className="w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="TechnoEdu" className="h-8 w-auto object-contain block dark:hidden" />
          <img src="/logowhite.png" alt="TechnoEdu" className="h-8 w-auto object-contain hidden dark:block" />
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-xs font-semibold text-brand-red hover:underline">
            Back to Sign In
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="w-full max-w-md bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl shadow-xl p-6 sm:p-8">
          <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-brand-red/10 text-brand-red flex items-center justify-center mb-5">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-[#F8FAFC]">
            Verify your email
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#A7AFBD] mt-1.5 mb-6">
            Enter the 6-digit verification code sent to your email address to activate your account.
          </p>

          {error && (
            <div className="mb-4 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center gap-2.5 text-xs text-rose-700 dark:text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-center gap-2.5 text-xs text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={isSubmitting}
                  className="w-full h-11 pl-10 pr-4 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-xl text-sm text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Verification Code
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={10}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter 6-digit code"
                disabled={isSubmitting}
                className="w-full h-11 px-4 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-xl text-sm tracking-widest font-semibold text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 rounded-xl bg-brand-red hover:bg-brand-darkred text-white text-sm font-bold flex items-center justify-center gap-2 shadow-red-glow transition-all disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Verify &amp; Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-[#252932] flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-[#A7AFBD]">Didn&apos;t receive a code?</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="inline-flex items-center gap-1.5 font-bold text-brand-red hover:underline disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
              <span>{isResending ? 'Sending...' : 'Resend Code'}</span>
            </button>
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-slate-400">
        © 2026 TechnoEdu. All rights reserved.
      </footer>
    </div>
  );
};
