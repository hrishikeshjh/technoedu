import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../../components/common/ScrollReveal';

export const FinalCTA: React.FC = () => (
  <section className="py-16 sm:py-20" aria-labelledby="final-cta-heading">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal animation="fade-up" delay={50} className="max-w-3xl mx-auto text-center space-y-5">
        <h2 id="final-cta-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-[#F8FAFC]">
          Your next chapter starts here.
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-[#A7AFBD] leading-relaxed">
          Build better habits, find the right resources, and move closer to your learning goals.
        </p>

        <Link
          to="/signup"
          className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-red hover:bg-brand-darkred text-white text-sm font-bold rounded-full shadow-red-glow hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#08090B]"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </ScrollReveal>
    </div>
  </section>
);