import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { MascotIllustration } from './MascotIllustration';

export const HeroSection: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden border-b border-slate-100 dark:border-[#1E222A]"
      aria-labelledby="hero-heading"
    >
      {/* Background decorative element */}
      <div
        className="pointer-events-none absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-brand-red/8 via-rose-200/8 to-transparent dark:from-brand-red/12 dark:via-rose-950/12 blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="lg:col-span-7 lg:pr-8 space-y-7">
            {/* Main Headline */}
            <ScrollReveal animation="fade-up" delay={120}>
              <h1
                id="hero-heading"
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-slate-900 dark:text-[#F8FAFC] max-w-3xl"
              >
                Your learning journey,{' '}
                <span className="text-brand-red">your way.</span>
              </h1>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal animation="fade-up" delay={180}>
              <p className="text-base sm:text-lg text-slate-600 dark:text-[#A7AFBD] leading-relaxed max-w-2xl">
                A personalized learning environment designed around your academic goals. Find your resources, organize your preparation, and make meaningful progress.
              </p>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal animation="fade-up" delay={240}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link
                  to="/signup"
                  className="relative inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-red hover:bg-brand-darkred text-white text-sm font-bold rounded-full shadow-red-glow hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#08090B]"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] text-slate-800 dark:text-slate-200 text-sm font-semibold rounded-full hover:bg-slate-50 dark:hover:bg-[#1A1D23] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#08090B]"
                >
                  Sign In
                </Link>
              </div>
            </ScrollReveal>

            {/* Minimal Trust Points */}
            <ScrollReveal animation="fade-up" delay={280}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-slate-600 dark:text-[#A7AFBD]">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" aria-hidden="true" />
                  100% Free &amp; Open
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" aria-hidden="true" />
                  Official PYQ Archives
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" aria-hidden="true" />
                  Exam-Isolated Workspace
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column - Mascot Illustration */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal animation="scale-up" delay={300} duration={800}>
              <MascotIllustration
                className="w-full max-w-[580px] mx-auto"
                aria-label="Techno Wallah mascot - a friendly student character with glasses and red headphones coding on a laptop"
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};