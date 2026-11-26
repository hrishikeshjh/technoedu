import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, KeyRound, ArrowRight, ArrowLeft, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getApiUrl, parseJsonResponse } from '../lib/apiClient';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get('token') || '';

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError(null);
    setSuccessMsg(null);

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(getApiUrl('/api/auth/forgot-password'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await parseJsonResponse(res);
      if (!res.ok) {
        throw new Error(data.error || 'Could not process recovery request.');
      }
      setSuccessMsg(data.message || 'If an account exists with this email, recovery instructions have been sent.');
    } catch (err: any) {
      setError(err.message || 'Could not process recovery request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError(null);
    setSuccessMsg(null);

    if (!newPassword || newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(getApiUrl('/api/auth/reset-password'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: resetToken, password: newPassword }),
      });
      const data = await parseJsonResponse(res);
      if (!res.ok) {
        throw new Error(data.error || 'Could not reset password.');
      }
      setSuccessMsg(data.message || 'Password reset successfully. Redirecting to sign in...');
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Could not reset password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] flex flex-col justify-between transition-colors">
      <header className="w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-[#A7AFBD] hover:text-brand-red dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="w-full max-w-md bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl shadow-xl p-6 sm:p-8">
          <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-brand-red/10 text-brand-red flex items-center justify-center mb-5">
            <KeyRound className="w-6 h-6" />
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-[#F8FAFC]">
            {resetToken ? 'Set a new password' : 'Reset your password'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#A7AFBD] mt-1.5 mb-6">
            {resetToken
              ? 'Choose a strong new password for your TechnoEdu account.'
              : 'Enter your registered email address and we will send you a password reset link.'}
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

          {!resetToken ? (
            <form onSubmit={handleRequestReset} className="space-y-4">
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl bg-brand-red hover:bg-brand-darkred text-white text-sm font-bold flex items-center justify-center gap-2 shadow-red-glow transition-all disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    disabled={isSubmitting}
                    className="w-full h-11 pl-10 pr-4 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-xl text-sm text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    disabled={isSubmitting}
                    className="w-full h-11 pl-10 pr-4 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-xl text-sm text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl bg-brand-red hover:bg-brand-darkred text-white text-sm font-bold flex items-center justify-center gap-2 shadow-red-glow transition-all disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <span>Update Password</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-slate-400">
        © 2026 TechnoEdu. All rights reserved.
      </footer>
    </div>
  );
};
