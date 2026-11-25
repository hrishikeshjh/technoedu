import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { GoogleAuthModal } from '../components/common/GoogleAuthModal';
import { resolveGoogleClientId, requestGoogleAccessToken } from '../lib/googleAuth';
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  BookOpen,
  Compass,
  Award,
} from 'lucide-react';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup, loginWithGoogle } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: '' };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass) || /[A-Z]/.test(pass)) score++;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-rose-500' };
    if (score <= 3) return { score: 2, label: 'Good', color: 'bg-amber-500' };
    return { score: 3, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = calculatePasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || fullName.trim().length < 2) {
      setError('Please provide your full name.');
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await signup(fullName.trim(), email.trim(), password);
      // Immediately redirect to onboarding interview
      navigate('/onboarding', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleClick = async () => {
    setError(null);
    setIsGoogleLoading(true);

    try {
      const clientId = await resolveGoogleClientId();
      if (!clientId) {
        setIsGoogleLoading(false);
        if (import.meta.env.DEV) {
          setIsGoogleModalOpen(true);
        } else {
          setError('Google Sign-In is not configured yet. Please sign up with your email and password.');
        }
        return;
      }

      const accessToken = await requestGoogleAccessToken(clientId);
      const res = await loginWithGoogle({ accessToken });
      if (res.needsOnboarding) {
        navigate('/onboarding', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (err: any) {
      setError(err.message || 'Google authentication failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSelectGoogleAccount = async (account: { name: string; email: string }) => {
    setIsGoogleLoading(true);
    setError(null);
    try {
      const res = await loginWithGoogle(account);
      setIsGoogleModalOpen(false);
      if (res.needsOnboarding) {
        navigate('/onboarding', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (err: any) {
      setError(err.message || 'Google authentication failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] flex flex-col justify-between transition-colors">
      {/* Top Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="TechnoEdu"
            className="h-8 w-auto object-contain block dark:hidden"
          />
          <img
            src="/logowhite.png"
            alt="TechnoEdu"
            className="h-8 w-auto object-contain hidden dark:block"
          />
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/login"
            className="text-xs font-semibold text-slate-600 dark:text-[#A7AFBD] hover:text-brand-red dark:hover:text-white transition-colors"
          >
            Already have an account? <span className="text-brand-red font-bold">Sign In</span>
          </Link>
        </div>
      </header>

      {/* Main Container: 2-column layout */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Educational Branding & Value Proposition */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-[#0F1117] text-white p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-red/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/20 border border-brand-red/30 text-rose-300 text-xs font-bold mb-6">
                <Sparkles className="w-3.5 h-3.5 text-brand-red" />
                <span>Personalized Learning</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight mb-4 text-white">
                Study Only What Matters For Your Goal.
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed mb-8">
                No cluttered feeds, no irrelevant materials. Whether you are preparing for UGC-NET, NEET, or JEE, TechnoEdu curates your syllabus, roadmaps, and PYQs exclusively for you.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Course-Isolated Learning Space</h4>
                    <p className="text-[11px] text-slate-400">Zero distractions from unrelated exams.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Tailored Study Roadmap</h4>
                    <p className="text-[11px] text-slate-400">Weekly targets and official PYQ strategy.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">100% Free Open Educational Resources</h4>
                    <p className="text-[11px] text-slate-400">NPTEL, NCERT, e-PG Pathshala &amp; SWAYAM.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-8 border-t border-slate-700/60 mt-8">
              <p className="text-xs text-slate-400 italic">
                "Simple sign-up → Personal onboarding → Focused learning."
              </p>
            </div>
          </div>

          {/* Right Column: Account Creation Form */}
          <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-center">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-[#F8FAFC]">
                Create Your Account
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-[#A7AFBD] mt-1">
                Begin your personalized preparation in under a minute.
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center gap-3 text-xs text-rose-700 dark:text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Google Authentication Only */}
            <div className="mb-5">
              <button
                type="button"
                onClick={handleGoogleClick}
                disabled={isLoading || isGoogleLoading}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-[#252932] bg-white dark:bg-[#111318] hover:bg-slate-50 dark:hover:bg-[#1A1D23] active:scale-[0.985] text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-3 transition-all shadow-xs hover:shadow-sm disabled:opacity-50"
              >
                {isGoogleLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-brand-red" />
                    <span className="text-xs font-bold text-brand-red">Signing in with Google...</span>
                  </>
                ) : (
                  <>
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
                    <span>Continue with Google</span>
                  </>
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-[#252932]" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white dark:bg-[#111318] text-slate-400 dark:text-[#7F8795] font-medium rounded-full">
                  or sign up with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full h-11 pl-10 pr-4 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
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
                    placeholder="student@example.com"
                    className="w-full h-11 pl-10 pr-4 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full h-11 pl-10 pr-4 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                    required
                  />
                </div>

                {/* Password strength indicator */}
                {password && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-100 dark:bg-[#1C1F26] rounded-full overflow-hidden flex gap-1">
                      <div className={`h-full rounded-full transition-all ${strength.score >= 1 ? strength.color : 'bg-transparent'} w-1/3`} />
                      <div className={`h-full rounded-full transition-all ${strength.score >= 2 ? strength.color : 'bg-transparent'} w-1/3`} />
                      <div className={`h-full rounded-full transition-all ${strength.score >= 3 ? strength.color : 'bg-transparent'} w-1/3`} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                      {strength.label}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 rounded-xl bg-brand-red hover:bg-brand-darkred text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-red-glow hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue to Onboarding</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-xs text-slate-500 dark:text-[#737B89]">
              By signing up, you agree to our{' '}
              <Link to="/terms" className="underline hover:text-brand-red">Terms</Link> and{' '}
              <Link to="/privacy-policy" className="underline hover:text-brand-red">Privacy Policy</Link>.
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-400">
        © 2026 TechnoEdu. All rights reserved.
      </footer>

      {/* Google Authentication Dialog */}
      <GoogleAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        onSelectGoogleAccount={handleSelectGoogleAccount}
        isLoading={isGoogleLoading}
      />
    </div>
  );
};
