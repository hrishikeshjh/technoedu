import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Library, CheckCircle, GraduationCap, ShieldCheck, BookOpen, Globe2 } from 'lucide-react';
import { AnimatedCounter } from '../common/AnimatedCounter';
import { ScrollReveal } from '../common/ScrollReveal';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white">

      {/* Two-column hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] items-center gap-8 pt-8 pb-8 sm:pt-12 sm:pb-10 lg:pt-16 lg:pb-12">

          {/* Left: Text content */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-5 sm:space-y-6">

            {/* Brand wordmark */}
            <ScrollReveal animation="fade-down" delay={100}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-brand-red text-xs font-bold tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                <span>TechnoWallah Initiative</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
                Everything You Need<br /> to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600">Learn Better.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <p className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed">
                Curated resources, exam syllabi, peer-reviewed textbooks, and verified previous year question archives — 100% open and free.
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal animation="fade-up" delay={400}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <Link
                  to="/exams"
                  className="px-6 py-3.5 bg-brand-red hover:bg-brand-darkred text-white text-sm font-semibold rounded-2xl shadow-red-glow hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Exam Directory</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/library"
                  className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-2xl shadow-soft hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <Library className="w-4 h-4" />
                  <span>Open Textbooks &amp; PYQs</span>
                </Link>
              </div>
            </ScrollReveal>

            {/* Trust points */}
            <ScrollReveal animation="fade-up" delay={500}>
              <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs text-slate-600 pt-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-red flex-shrink-0" />
                  <span className="font-medium">NPTEL, MIT OCW &amp; SWAYAM</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-red flex-shrink-0" />
                  <span className="font-medium">NCERT &amp; OpenStax</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-red flex-shrink-0" />
                  <span className="font-medium">Official Govt PYQ Archives</span>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Right: Hero image with rounded corners and soft shadow */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex items-center justify-center">
            <ScrollReveal animation="zoom-in" delay={300} className="w-full">
              {/* Ambient soft glow backdrop */}
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-tr from-brand-red/15 via-rose-100/50 to-slate-200/50 rounded-[2.5rem] blur-2xl -z-10 opacity-70" />
              
              {/* Image card with rounded corners and soft shadow */}
              <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_15px_35px_-5px_rgba(0,0,0,0.12),0_6px_16px_-4px_rgba(0,0,0,0.06)] border border-slate-200/80 bg-white group">
                <img
                  src="/hero-illustration.png"
                  alt="Techno India Campus - Open Resource Hub"
                  className="w-full h-[220px] xs:h-[260px] sm:h-[320px] lg:h-[380px] object-cover select-none transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  draggable={false}
                />
                
                {/* Subtle bottom gradient vignette & caption overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-white text-xs pointer-events-none">
                  <span className="font-semibold drop-shadow-sm px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 text-[11px]">
                    Techno India Campus • Salt Lake
                  </span>
                  <span className="hidden xs:inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-brand-red/90 backdrop-blur-sm text-white">
                    OER Center
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>

      {/* Stats Section with Container & Rich Animated Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Stat 1 */}
          <ScrollReveal animation="fade-up" delay={100} className="h-full">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft hover:shadow-md hover:border-brand-red/40 transition-all duration-300 group flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-brand-red border border-red-100/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-50 text-brand-darkred">
                    Programs
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  <AnimatedCounter end={15} suffix="+" duration={1800} delay={100} />
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">Target Examinations</div>
                <p className="text-[11px] text-slate-500 mt-0.5">Civil Services, Abroad, Law &amp; Govt</p>
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-4">
                <div className="h-full bg-gradient-to-r from-red-600 to-rose-500 rounded-full animate-stat-fill" style={{ animationDelay: '150ms' }} />
              </div>
            </div>
          </ScrollReveal>

          {/* Stat 2 */}
          <ScrollReveal animation="fade-up" delay={200} className="h-full">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft hover:shadow-md hover:border-brand-red/40 transition-all duration-300 group flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-brand-red border border-red-100/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-50 text-brand-darkred">
                    Verified
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  <AnimatedCounter end={100} suffix="%" duration={2000} delay={250} />
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">Free &amp; Open Source</div>
                <p className="text-[11px] text-slate-500 mt-0.5">No paywalls or subscriptions</p>
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-4">
                <div className="h-full bg-gradient-to-r from-red-600 to-rose-500 rounded-full animate-stat-fill" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </ScrollReveal>

          {/* Stat 3 */}
          <ScrollReveal animation="fade-up" delay={300} className="h-full">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft hover:shadow-md hover:border-brand-red/40 transition-all duration-300 group flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-brand-red border border-red-100/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-50 text-brand-darkred">
                    Compendiums
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  <AnimatedCounter end={500} suffix="+" duration={2200} delay={400} />
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">Curated Textbooks</div>
                <p className="text-[11px] text-slate-500 mt-0.5">Direct links to verified repositories</p>
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-4">
                <div className="h-full bg-gradient-to-r from-red-600 to-rose-500 rounded-full animate-stat-fill" style={{ animationDelay: '450ms' }} />
              </div>
            </div>
          </ScrollReveal>

          {/* Stat 4 */}
          <ScrollReveal animation="fade-up" delay={400} className="h-full">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft hover:shadow-md hover:border-brand-red/40 transition-all duration-300 group flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-brand-red border border-red-100/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-50 text-brand-darkred">
                    OER Network
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  <AnimatedCounter end={9} suffix="+" duration={1600} delay={550} />
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">Global Open Platforms</div>
                <p className="text-[11px] text-slate-500 mt-0.5">NPTEL, MIT OCW, NCERT, OpenStax</p>
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-4">
                <div className="h-full bg-gradient-to-r from-red-600 to-rose-500 rounded-full animate-stat-fill" style={{ animationDelay: '600ms' }} />
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>

    </section>
  );
};

