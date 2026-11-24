import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Award,
  Users,
  ShieldCheck,
  User,
  GraduationCap,
  FileCheck2,
  Check,
} from 'lucide-react';
import { ThemeToggle } from '../components/common/ThemeToggle';

interface AuthFormData {
  name?: string;
  email: string;
  password: string;
}

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<Partial<AuthFormData>>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [shakeFields, setShakeFields] = useState<{ [key: string]: boolean }>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'google' | 'github' | null>(null);
  const [ripples, setRipples] = useState<{ [buttonId: string]: Ripple[] }>({});
  const [socialSkeleton, setSocialSkeleton] = useState(true);

  // Briefly show social skeleton on initial mount for polish, then resolve
  useEffect(() => {
    const timer = setTimeout(() => {
      setSocialSkeleton(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  // Ripple effect handler for micro-interaction
  const createRipple = (e: React.MouseEvent<HTMLElement>, buttonId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const newRipple: Ripple = { x, y, size, id: Date.now() };

    setRipples((prev) => ({
      ...prev,
      [buttonId]: [...(prev[buttonId] || []).slice(-2), newRipple],
    }));

    setTimeout(() => {
      setRipples((prev) => ({
        ...prev,
        [buttonId]: (prev[buttonId] || []).filter((r) => r.id !== newRipple.id),
      }));
    }, 700);
  };

  // Trigger shake animation on a field
  const triggerShake = (field: string) => {
    setShakeFields((prev) => ({ ...prev, [field]: true }));
    setTimeout(() => {
      setShakeFields((prev) => ({ ...prev, [field]: false }));
    }, 500);
  };

  // Live validation calculations
  const isEmailValid =
    formData.email.length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    !errors.email;

  const isPasswordValid = formData.password.length >= 6 && !errors.password;

  // Password strength calculator for sign-up
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

  const passwordStrength = calculatePasswordStrength(formData.password);

  const validateField = (field: 'name' | 'email' | 'password', value: string): string | undefined => {
    if (field === 'name' && isSignUp) {
      if (!value.trim()) return 'Name is required';
      if (value.trim().length < 2) return 'Name must be at least 2 characters';
    }
    if (field === 'email') {
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';
    }
    if (field === 'password') {
      if (!value) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
    }
    return undefined;
  };

  const validateAll = (): boolean => {
    const newErrors: Partial<AuthFormData> = {};
    if (isSignUp) {
      const nameErr = validateField('name', formData.name || '');
      if (nameErr) {
        newErrors.name = nameErr;
        triggerShake('name');
      }
    }
    const emailErr = validateField('email', formData.email);
    if (emailErr) {
      newErrors.email = emailErr;
      triggerShake('email');
    }
    const passErr = validateField('password', formData.password);
    if (passErr) {
      newErrors.password = passErr;
      triggerShake('password');
    }

    setErrors(newErrors);
    setTouched({ name: true, email: true, password: true });
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (field: 'name' | 'email' | 'password', val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (touched[field]) {
      const err = validateField(field, val);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleFieldBlur = (field: 'name' | 'email' | 'password') => {
    setFocusedField(null);
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field] || '');
    setErrors((prev) => ({ ...prev, [field]: err }));
    if (err) {
      triggerShake(field);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    setIsLoading(true);
    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setIsLoading(false);
    navigate('/', { replace: true });
  };

  const handleSocialAuth = async (
    e: React.MouseEvent<HTMLElement>,
    provider: 'google' | 'github'
  ) => {
    createRipple(e, `social-${provider}`);
    setOauthLoading(provider);
    // Simulate OAuth handshake
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setOauthLoading(null);
    navigate('/', { replace: true });
  };

  const handleModeSwitch = (toSignUp: boolean) => {
    setIsSignUp(toSignUp);
    setErrors({});
    setTouched({});
    setShakeFields({});
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50/70 dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] flex flex-col justify-between transition-colors duration-500">
      
      {/* =========================================================================
          1. ANIMATED BACKGROUND: Subtle Gradient Mesh & Floating Ambient Orbs
         ========================================================================= */}
      
      {/* Ambient Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1f242d_1px,transparent_1px)] [background-size:24px_24px] opacity-60 dark:opacity-40"
        aria-hidden="true"
      />

      {/* Floating Orb 1 (Top-Left): Brand Red / Rose Ambient Glow */}
      <div
        className="pointer-events-none absolute -top-28 -left-28 sm:-top-40 sm:-left-40 w-96 sm:w-[540px] h-96 sm:h-[540px] rounded-full bg-gradient-to-br from-brand-red/15 via-rose-300/10 to-transparent dark:from-brand-red/20 dark:via-rose-950/20 dark:to-transparent blur-3xl opacity-80 animate-orb-1"
        aria-hidden="true"
      />

      {/* Floating Orb 2 (Bottom-Right): Warm Sunset / Crimson Glow */}
      <div
        className="pointer-events-none absolute -bottom-36 -right-36 sm:-bottom-52 sm:-right-52 w-[420px] sm:w-[600px] h-[420px] sm:h-[600px] rounded-full bg-gradient-to-tl from-rose-200/25 via-brand-red/10 to-transparent dark:from-brand-900/25 dark:via-rose-900/20 dark:to-transparent blur-3xl opacity-75 animate-orb-2"
        aria-hidden="true"
      />

      {/* Floating Orb 3 (Center-Right Accent): Amber & Deep Crimson Touch */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/3 -translate-y-1/2 w-72 sm:w-[420px] h-72 sm:h-[420px] rounded-full bg-gradient-to-tr from-amber-200/10 via-red-200/10 to-transparent dark:from-red-950/20 dark:via-brand-950/25 dark:to-transparent blur-2xl opacity-60 animate-orb-3"
        aria-hidden="true"
      />

      {/* Soft Vignette Overlay for Crisp Contrast */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-slate-100/50 dark:from-transparent dark:to-[#08090B]/80"
        aria-hidden="true"
      />

      {/* =========================================================================
          TOP NAVIGATION BAR: Back Link, Center Logo (Mobile), Theme Toggle
         ========================================================================= */}
      <header className="relative z-20 w-full px-4 sm:px-8 py-5 flex items-center justify-between max-w-7xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-[#A7AFBD] hover:text-brand-red dark:hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#08090B] rounded-lg px-2.5 py-1.5 -ml-2.5 group"
          aria-label="Return to TechnoEdu Homepage"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          <span>Back to Home</span>
        </Link>

        {/* Mobile Header Logo */}
        <Link to="/" className="lg:hidden block" aria-label="TechnoEdu Home">
          <img src="/logo.png" alt="TechnoEdu" className="h-7 w-auto block dark:hidden" />
          <img src="/logowhite.png" alt="TechnoEdu" className="h-7 w-auto hidden dark:block" />
        </Link>

        {/* Theme Toggle Component */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block text-xs text-slate-500 dark:text-[#7F8795]">
            Theme
          </span>
          <ThemeToggle />
        </div>
      </header>

      {/* =========================================================================
          MAIN CONTAINER: Split Layout on Desktop (lg:) & Premium Card
         ========================================================================= */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* =====================================================================
              9. SPLIT LAYOUT LEFT COLUMN: Value Proposition & Interactive Graphic
             ===================================================================== */}
          <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 flex-col justify-center space-y-8 pr-2 xl:pr-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 dark:bg-brand-red/10 border border-brand-red/20 text-brand-red dark:text-rose-400 text-xs font-bold tracking-wide shadow-xs w-fit">
              <GraduationCap className="w-4 h-4" aria-hidden="true" />
              <span>100% Free & Open Academic Hub</span>
            </div>

            {/* Impact Heading */}
            <div className="space-y-3">
              <h1 className="text-3xl xl:text-5xl font-black text-slate-900 dark:text-[#F8FAFC] tracking-tight leading-[1.18]">
                Accelerate your learning with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-rose-500 to-amber-500">
                  open academic resources.
                </span>
              </h1>
              <p className="text-slate-600 dark:text-[#A7AFBD] text-base xl:text-lg leading-relaxed max-w-xl">
                Access curated university syllabi, previous years’ solved question papers, topper lecture notes, and structured exam roadmaps without subscriptions or paywalls.
              </p>
            </div>

            {/* Interactive / Floating Showcase Badges */}
            <div className="space-y-4 pt-1">
              
              {/* Feature Badge 1 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 dark:bg-[#111318]/70 backdrop-blur-xl border border-slate-200/80 dark:border-[#252932] shadow-soft hover:border-brand-red/40 dark:hover:border-brand-red/40 transition-all duration-300 animate-badge-float">
                <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red dark:text-rose-400 shrink-0 shadow-xs">
                  <BookOpen className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">
                    50,000+ Curated Study Materials
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-[#A7AFBD] mt-0.5">
                    Semester notes, syllabi, and official question papers for engineering & sciences.
                  </p>
                </div>
              </div>

              {/* Feature Badge 2 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 dark:bg-[#111318]/70 backdrop-blur-xl border border-slate-200/80 dark:border-[#252932] shadow-soft hover:border-amber-500/40 dark:hover:border-amber-500/40 transition-all duration-300 animate-badge-float-delayed">
                <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 shadow-xs">
                  <Award className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">
                    Competitive & University Exam Hubs
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-[#A7AFBD] mt-0.5">
                    GATE, UGC NET, WBJEE, MAKAUT, and state university syllabi continuously updated.
                  </p>
                </div>
              </div>

              {/* Feature Badge 3 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 dark:bg-[#111318]/70 backdrop-blur-xl border border-slate-200/80 dark:border-[#252932] shadow-soft hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 shadow-xs">
                  <FileCheck2 className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">
                    Verified Previous Year Questions (PYQs)
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-[#A7AFBD] mt-0.5">
                    Step-by-step solved question papers vetted by university toppers & educators.
                  </p>
                </div>
              </div>

            </div>

            {/* Social Proof & Trust Metric Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-600 dark:text-[#A7AFBD] border-t border-slate-200/60 dark:border-[#252932]/70">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">1,400+ online now</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-brand-red dark:text-rose-400" aria-hidden="true" />
                <span>15,000+ enrolled students</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                <span>Zero paywalls, ever</span>
              </div>
            </div>

          </div>

          {/* =====================================================================
              8. RIGHT COLUMN: Premium Glassmorphism Card
             ===================================================================== */}
          <div className="lg:col-span-6 xl:col-span-5 flex justify-center w-full">
            <div className="w-full max-w-md bg-white/85 dark:bg-[#111318]/85 backdrop-blur-2xl rounded-3xl border border-slate-200/90 dark:border-[#252932]/90 shadow-[0_20px_50px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06)] p-6 sm:p-8 relative overflow-hidden transition-all duration-300">
              
              {/* Premium Top Glowing Hairline Highlight */}
              <div
                className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-red/60 to-transparent"
                aria-hidden="true"
              />

              {/* Card Header & Brand Logo */}
              <div
                className="animate-field-enter text-center mb-6"
                style={{ animationDelay: '0ms' }}
              >
                <Link
                  to="/"
                  className="inline-block mb-4 p-1 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red group"
                  aria-label="TechnoEdu Home"
                >
                  <img
                    src="/logo.png"
                    alt="TechnoEdu"
                    className="h-8 sm:h-9 w-auto mx-auto block dark:hidden transition-transform duration-200 group-hover:scale-105"
                  />
                  <img
                    src="/logowhite.png"
                    alt="TechnoEdu"
                    className="h-8 sm:h-9 w-auto mx-auto hidden dark:block transition-transform duration-200 group-hover:scale-105"
                  />
                </Link>

                <h2 className="text-2xl sm:text-[26px] font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
                  {isSignUp ? 'Create your account' : 'Welcome back'}
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-[#A7AFBD]">
                  {isSignUp
                    ? 'Join TechnoEdu to bookmark and download open syllabus materials'
                    : 'Sign in to access your saved notes, syllabus & bookmarks'}
                </p>
              </div>

              {/* Mode Switcher Segmented Control (Tabs) */}
              <div
                className="animate-field-enter grid grid-cols-2 p-1 bg-slate-100/90 dark:bg-[#15171C] rounded-xl border border-slate-200/80 dark:border-[#252932] mb-6"
                style={{ animationDelay: '60ms' }}
                role="tablist"
                aria-label="Authentication Options"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={!isSignUp}
                  onClick={() => handleModeSwitch(false)}
                  className={`py-2 px-3 text-xs font-bold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${
                    !isSignUp
                      ? 'bg-white dark:bg-[#1E222A] text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 dark:text-[#A7AFBD] hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isSignUp}
                  onClick={() => handleModeSwitch(true)}
                  className={`py-2 px-3 text-xs font-bold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${
                    isSignUp
                      ? 'bg-white dark:bg-[#1E222A] text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 dark:text-[#A7AFBD] hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* =================================================================
                  5. SOCIAL AUTH BUTTONS: Loading Skeletons & OAuth UX
                 ================================================================= */}
              <div
                className="animate-field-enter mb-6"
                style={{ animationDelay: '120ms' }}
              >
                {socialSkeleton ? (
                  /* Loading Skeletons for Social Buttons */
                  <div className="grid grid-cols-2 gap-3" aria-label="Loading authentication options">
                    <div className="h-11 rounded-xl bg-slate-200/70 dark:bg-[#1E222A] skeleton-shimmer" />
                    <div className="h-11 rounded-xl bg-slate-200/70 dark:bg-[#1E222A] skeleton-shimmer" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    
                    {/* Google OAuth Button */}
                    <button
                      type="button"
                      onClick={(e) => handleSocialAuth(e, 'google')}
                      disabled={isLoading || oauthLoading !== null}
                      className="relative overflow-hidden flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-slate-200 dark:border-[#252932] bg-white dark:bg-[#111318] hover:bg-slate-50 dark:hover:bg-[#1A1D23] active:scale-[0.985] text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 transition-all duration-150 shadow-xs hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#111318]"
                      aria-label="Continue with Google"
                    >
                      {/* Ripple micro-interaction */}
                      {(ripples['social-google'] || []).map((r) => (
                        <span
                          key={r.id}
                          className="absolute rounded-full bg-slate-400/20 dark:bg-white/20 animate-ripple pointer-events-none"
                          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
                        />
                      ))}

                      {oauthLoading === 'google' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-brand-red" aria-hidden="true" />
                          <span className="text-xs font-bold text-brand-red">Connecting...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
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
                          <span>Google</span>
                        </>
                      )}
                    </button>

                    {/* GitHub OAuth Button */}
                    <button
                      type="button"
                      onClick={(e) => handleSocialAuth(e, 'github')}
                      disabled={isLoading || oauthLoading !== null}
                      className="relative overflow-hidden flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-slate-200 dark:border-[#252932] bg-white dark:bg-[#111318] hover:bg-slate-50 dark:hover:bg-[#1A1D23] active:scale-[0.985] text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 transition-all duration-150 shadow-xs hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#111318]"
                      aria-label="Continue with GitHub"
                    >
                      {/* Ripple micro-interaction */}
                      {(ripples['social-github'] || []).map((r) => (
                        <span
                          key={r.id}
                          className="absolute rounded-full bg-slate-400/20 dark:bg-white/20 animate-ripple pointer-events-none"
                          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
                        />
                      ))}

                      {oauthLoading === 'github' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-brand-red" aria-hidden="true" />
                          <span className="text-xs font-bold text-brand-red">Connecting...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4.5 h-4.5 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                          </svg>
                          <span>GitHub</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* OAuth status indicator message */}
                {oauthLoading && (
                  <div
                    className="mt-2.5 text-center text-xs text-brand-red dark:text-rose-400 font-medium animate-fade-in"
                    role="status"
                    aria-live="polite"
                  >
                    Authorizing with {oauthLoading === 'google' ? 'Google Identity' : 'GitHub'}...
                  </div>
                )}
              </div>

              {/* Section Divider */}
              <div
                className="relative my-6 animate-field-enter"
                style={{ animationDelay: '180ms' }}
              >
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-slate-200 dark:border-[#252932]" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white/95 dark:bg-[#111318] text-slate-400 dark:text-[#7F8795] font-medium rounded-full">
                    or continue with email
                  </span>
                </div>
              </div>

              {/* =================================================================
                  4. FORM VALIDATION UX: Inline checkmarks, error shake, inputs
                 ================================================================= */}
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                
                {/* Full Name field (Sign Up only) */}
                {isSignUp && (
                  <div
                    className={`animate-field-enter transition-transform ${
                      shakeFields.name ? 'animate-input-shake' : ''
                    }`}
                    style={{ animationDelay: '220ms' }}
                  >
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold text-slate-700 dark:text-[#A7AFBD] mb-1.5"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 pointer-events-none transition-colors duration-200 ${
                          focusedField === 'name'
                            ? 'text-brand-red dark:text-rose-400'
                            : 'text-slate-400 dark:text-slate-500'
                        }`}
                        aria-hidden="true"
                      />
                      <input
                        id="fullName"
                        type="text"
                        autoComplete="name"
                        value={formData.name || ''}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        onBlur={() => handleFieldBlur('name')}
                        onFocus={() => setFocusedField('name')}
                        placeholder="e.g. Alex Morgan"
                        disabled={isLoading || oauthLoading !== null}
                        className={`w-full h-11 pl-10 pr-10 bg-white dark:bg-[#0E1014] border rounded-xl text-sm text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 dark:placeholder-[#737B89] transition-all duration-200 shadow-xs hover:border-slate-300 dark:hover:border-[#374151] focus:outline-none focus:ring-2 focus-visible:ring-2 ${
                          errors.name
                            ? 'border-brand-red focus:border-brand-red focus:ring-brand-red/20'
                            : formData.name && (formData.name.trim().length >= 2)
                            ? 'border-emerald-500/70 dark:border-emerald-500/50 focus:border-emerald-500 focus:ring-emerald-500/20'
                            : 'border-slate-200 dark:border-[#252932] focus:border-brand-red focus:ring-brand-red/20'
                        }`}
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {/* Success / Error icon on right */}
                      {formData.name && formData.name.trim().length >= 2 && !errors.name && (
                        <CheckCircle2
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 animate-fade-in"
                          aria-label="Valid name"
                        />
                      )}
                      {errors.name && (
                        <AlertCircle
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-red animate-fade-in"
                          aria-label="Invalid name"
                        />
                      )}
                    </div>
                    {errors.name && (
                      <p
                        id="name-error"
                        className="mt-1.5 text-xs text-brand-red font-medium flex items-center gap-1.5 animate-fade-in"
                        role="alert"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* Email Address Field */}
                <div
                  className={`animate-field-enter transition-transform ${
                    shakeFields.email ? 'animate-input-shake' : ''
                  }`}
                  style={{ animationDelay: '260ms' }}
                >
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-slate-700 dark:text-[#A7AFBD] mb-1.5"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <Mail
                      className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 pointer-events-none transition-colors duration-200 ${
                        focusedField === 'email'
                          ? 'text-brand-red dark:text-rose-400'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                      aria-hidden="true"
                    />
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      onBlur={() => handleFieldBlur('email')}
                      onFocus={() => setFocusedField('email')}
                      placeholder="you@university.edu"
                      disabled={isLoading || oauthLoading !== null}
                      className={`w-full h-11 pl-10 pr-10 bg-white dark:bg-[#0E1014] border rounded-xl text-sm text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 dark:placeholder-[#737B89] transition-all duration-200 shadow-xs hover:border-slate-300 dark:hover:border-[#374151] focus:outline-none focus:ring-2 focus-visible:ring-2 ${
                        errors.email
                          ? 'border-brand-red focus:border-brand-red focus:ring-brand-red/20'
                          : isEmailValid
                          ? 'border-emerald-500/70 dark:border-emerald-500/50 focus:border-emerald-500 focus:ring-emerald-500/20'
                          : 'border-slate-200 dark:border-[#252932] focus:border-brand-red focus:ring-brand-red/20'
                      }`}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />

                    {/* Inline Success or Error Indicator */}
                    {isEmailValid && (
                      <CheckCircle2
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 animate-fade-in"
                        aria-label="Email address is valid"
                      />
                    )}
                    {errors.email && (
                      <AlertCircle
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-red animate-fade-in"
                        aria-label="Email address has error"
                      />
                    )}
                  </div>

                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-1.5 text-xs text-brand-red font-medium flex items-center gap-1.5 animate-fade-in"
                      role="alert"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div
                  className={`animate-field-enter transition-transform ${
                    shakeFields.password ? 'animate-input-shake' : ''
                  }`}
                  style={{ animationDelay: '310ms' }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="password"
                      className="block text-xs font-semibold text-slate-700 dark:text-[#A7AFBD]"
                    >
                      Password
                    </label>
                    {!isSignUp && (
                      <Link
                        to="/forgot-password"
                        className="text-xs font-semibold text-brand-red hover:text-brand-darkred dark:hover:text-rose-400 transition-colors focus-visible:outline-none focus-visible:underline rounded"
                      >
                        Forgot password?
                      </Link>
                    )}
                  </div>

                  <div className="relative">
                    <Lock
                      className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 pointer-events-none transition-colors duration-200 ${
                        focusedField === 'password'
                          ? 'text-brand-red dark:text-rose-400'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                      aria-hidden="true"
                    />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete={isSignUp ? 'new-password' : 'current-password'}
                      value={formData.password}
                      onChange={(e) => handleFieldChange('password', e.target.value)}
                      onBlur={() => handleFieldBlur('password')}
                      onFocus={() => setFocusedField('password')}
                      placeholder="••••••••"
                      disabled={isLoading || oauthLoading !== null}
                      className={`w-full h-11 pl-10 pr-11 bg-white dark:bg-[#0E1014] border rounded-xl text-sm text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 dark:placeholder-[#737B89] transition-all duration-200 shadow-xs hover:border-slate-300 dark:hover:border-[#374151] focus:outline-none focus:ring-2 focus-visible:ring-2 ${
                        errors.password
                          ? 'border-brand-red focus:border-brand-red focus:ring-brand-red/20'
                          : isPasswordValid
                          ? 'border-emerald-500/70 dark:border-emerald-500/50 focus:border-emerald-500 focus:ring-emerald-500/20'
                          : 'border-slate-200 dark:border-[#252932] focus:border-brand-red focus:ring-brand-red/20'
                      }`}
                      aria-invalid={errors.password ? 'true' : 'false'}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                    />

                    {/* Show/Hide Password Eye Button */}
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      aria-pressed={showPassword}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4.5 h-4.5" aria-hidden="true" />
                      ) : (
                        <Eye className="w-4.5 h-4.5" aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p
                      id="password-error"
                      className="mt-1.5 text-xs text-brand-red font-medium flex items-center gap-1.5 animate-fade-in"
                      role="alert"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.password}</span>
                    </p>
                  )}

                  {/* Password Strength Indicator (Sign-Up UX) */}
                  {isSignUp && formData.password.length > 0 && (
                    <div className="mt-2 space-y-1.5 animate-fade-in">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 dark:text-[#7F8795]">Password strength:</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 h-1">
                        <div
                          className={`rounded-full transition-all duration-300 ${
                            passwordStrength.score >= 1 ? passwordStrength.color : 'bg-slate-200 dark:bg-[#252932]'
                          }`}
                        />
                        <div
                          className={`rounded-full transition-all duration-300 ${
                            passwordStrength.score >= 2 ? passwordStrength.color : 'bg-slate-200 dark:bg-[#252932]'
                          }`}
                        />
                        <div
                          className={`rounded-full transition-all duration-300 ${
                            passwordStrength.score >= 3 ? passwordStrength.color : 'bg-slate-200 dark:bg-[#252932]'
                          }`}
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-[#7F8795]">
                        Use at least 6 characters with a mixture of letters & numbers
                      </p>
                    </div>
                  )}
                </div>

                {/* Options: Remember me & Terms acknowledgement */}
                <div
                  className="animate-field-enter flex items-center justify-between pt-1"
                  style={{ animationDelay: '360ms' }}
                >
                  <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="sr-only"
                        aria-label="Remember me on this browser"
                      />
                      <div
                        className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all duration-200 ${
                          rememberMe
                            ? 'bg-brand-red border-brand-red text-white'
                            : 'border-slate-300 dark:border-[#252932] bg-white dark:bg-[#0E1014] group-hover:border-slate-400 dark:group-hover:border-[#374151]'
                        }`}
                      >
                        {rememberMe && <Check className="w-3 h-3 stroke-[3]" aria-hidden="true" />}
                      </div>
                    </div>
                    <span className="text-xs text-slate-600 dark:text-[#A7AFBD]">
                      Remember me for 30 days
                    </span>
                  </label>
                </div>

                {/* =================================================================
                    2. PRIMARY CTA BUTTON: Ripple effect, press states, loader
                   ================================================================= */}
                <div
                  className="animate-field-enter pt-2"
                  style={{ animationDelay: '410ms' }}
                >
                  <button
                    type="submit"
                    onClick={(e) => createRipple(e, 'submit-btn')}
                    disabled={isLoading || oauthLoading !== null}
                    className="relative overflow-hidden w-full h-11 rounded-xl bg-gradient-to-r from-brand-red via-brand-darkred to-brand-red bg-[length:200%_100%] hover:bg-[right_center] text-white text-sm font-bold transition-all duration-200 shadow-red-glow hover:shadow-[0_12px_28px_-6px_rgba(220,38,38,0.35)] active:scale-[0.985] active:brightness-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#111318]"
                  >
                    {/* Dynamic ripple elements */}
                    {(ripples['submit-btn'] || []).map((r) => (
                      <span
                        key={r.id}
                        className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
                        style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
                      />
                    ))}

                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-white" aria-hidden="true" />
                        <span>{isSignUp ? 'Creating your account...' : 'Signing you in...'}</span>
                      </span>
                    ) : (
                      <span>{isSignUp ? 'Create Free Account' : 'Sign in to TechnoEdu'}</span>
                    )}
                  </button>
                </div>
              </form>

              {/* Bottom Switch Mode Link */}
              <div
                className="animate-field-enter mt-6 text-center text-xs sm:text-sm text-slate-600 dark:text-[#A7AFBD]"
                style={{ animationDelay: '460ms' }}
              >
                {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}{' '}
                <button
                  type="button"
                  onClick={() => handleModeSwitch(!isSignUp)}
                  className="text-brand-red dark:text-rose-400 font-bold hover:text-brand-darkred dark:hover:text-rose-300 transition-colors focus-visible:outline-none focus-visible:underline rounded px-1"
                >
                  {isSignUp ? 'Sign in' : 'Create an account'}
                </button>
              </div>

              {/* Legal & Security Footer */}
              <div
                className="animate-field-enter mt-6 pt-5 border-t border-slate-200/80 dark:border-[#252932] flex flex-col items-center gap-2.5 text-[11px] text-slate-500 dark:text-[#7F8795]"
                style={{ animationDelay: '510ms' }}
              >
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-[#7F8795]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                  <span>256-bit TLS encrypted • Privacy-first platform</span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/terms"
                    className="hover:text-brand-red dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    Terms of Service
                  </Link>
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                  <Link
                    to="/privacy-policy"
                    className="hover:text-brand-red dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    Privacy Policy
                  </Link>
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                  <Link
                    to="/cookies"
                    className="hover:text-brand-red dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    Cookie Policy
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Subtle Bottom Footer Info */}
      <footer className="relative z-10 py-4 px-4 text-center text-xs text-slate-400 dark:text-[#7F8795]">
        <p>© {new Date().getFullYear()} TechnoEdu. Empowering students with open-source higher education materials.</p>
      </footer>

    </div>
  );
};
