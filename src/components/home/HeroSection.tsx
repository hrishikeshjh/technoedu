import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Library, CheckCircle } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white">

      {/* Two-column hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] items-center gap-8 pt-8 pb-8 sm:pt-12 sm:pb-10 lg:pt-16 lg:pb-12">

          {/* Left: Text content */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-5 sm:space-y-6">

            {/* Brand wordmark */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-brand-red text-xs font-bold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span>TechnoWallah Initiative</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
              Everything You Need<br /> to Learn Better.
            </h1>

            <p className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed">
              Curated resources, exam syllabi, peer-reviewed textbooks, and verified previous year question archives — 100% open and free.
            </p>

            {/* CTAs */}
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

            {/* Trust points */}
            <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs text-slate-600 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-medium">NPTEL, MIT OCW &amp; SWAYAM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-medium">NCERT &amp; OpenStax</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-medium">Official Govt PYQ Archives</span>
              </div>
            </div>

          </div>

          {/* Right: Hero image with rounded corners and soft shadow */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex items-center justify-center">
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
                <span className="hidden xs:inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-500/80 backdrop-blur-sm text-white">
                  OER Center
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Stats — full width flush bar */}
      <div className="border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200">

        <div className="space-y-0.5 p-3.5 sm:p-5 bg-white">
          <div className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">15+</div>
          <div className="text-xs font-semibold text-slate-800">Target Examinations</div>
          <p className="text-[11px] text-slate-400 hidden xs:block">Civil Services, Abroad, Law &amp; Govt</p>
        </div>

        <div className="space-y-0.5 p-3.5 sm:p-5 bg-white">
          <div className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">100%</div>
          <div className="text-xs font-semibold text-slate-800">Free &amp; Open Source</div>
          <p className="text-[11px] text-slate-400 hidden xs:block">No paywalls or subscriptions</p>
        </div>

        <div className="space-y-0.5 p-3.5 sm:p-5 bg-white">
          <div className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">500+</div>
          <div className="text-xs font-semibold text-slate-800">Curated Textbooks</div>
          <p className="text-[11px] text-slate-400 hidden xs:block">Direct links to verified repositories</p>
        </div>

        <div className="space-y-0.5 p-3.5 sm:p-5 bg-white">
          <div className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">9+</div>
          <div className="text-xs font-semibold text-slate-800">Global Open Platforms</div>
          <p className="text-[11px] text-slate-400 hidden xs:block">NPTEL, MIT OCW, NCERT, OpenStax</p>
        </div>

      </div>

    </section>
  );
};
