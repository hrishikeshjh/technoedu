import React from 'react';
import { Map, BookOpen, Clock, FileCheck2, ExternalLink } from 'lucide-react';
import { UgcNetEmblem } from '../common/ExamEmblems';

interface UgcNetHeroProps {
  onExploreRoadmap: () => void;
  onExploreStudyMaterial: () => void;
}

export const UgcNetHero: React.FC<UgcNetHeroProps> = ({
  onExploreRoadmap,
  onExploreStudyMaterial
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-10 sm:pb-14 border-b border-slate-200 dark:border-[#252932] bg-gradient-to-b from-slate-50/80 via-white to-white dark:from-[#0E1015] dark:via-[#08090B] dark:to-[#08090B]">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-red-500/5 dark:bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 -z-10 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          
          {/* Left Column: Heading & CTAs */}
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 text-brand-darkred dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span>UGC-NET / JRF</span>
            </div>

            {/* Main Heading */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-900 dark:bg-[#15171C] border-2 border-amber-500/30 flex items-center justify-center shrink-0 shadow-sm">
                <UgcNetEmblem size={44} />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-[#F8FAFC] tracking-tight leading-tight">
                  UGC-NET &amp; JRF<br />
                  <span className="text-brand-red">Complete Preparation Hub</span>
                </h1>
              </div>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-[#A7AFBD] leading-relaxed mb-6 max-w-2xl">
              A structured preparation system covering syllabus, study material, roadmaps, PYQs, revision, and open educational resources.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreRoadmap}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-red hover:bg-brand-darkred text-white text-sm font-bold shadow-md shadow-red-500/20 hover:shadow-red-500/30 transition-all active:scale-[0.98]"
              >
                <Map className="w-4 h-4" />
                <span>Explore Roadmap</span>
              </button>

              <button
                onClick={onExploreStudyMaterial}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-[#111318] hover:bg-slate-100 dark:hover:bg-[#15171C] border border-slate-200 dark:border-[#252932] text-slate-800 dark:text-[#F8FAFC] text-sm font-bold transition-all active:scale-[0.98]"
              >
                <BookOpen className="w-4 h-4 text-brand-red" />
                <span>Study Material</span>
              </button>

              <a
                href="https://ugcnet.nta.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-slate-500 hover:text-slate-800 dark:text-[#A7AFBD] dark:hover:text-[#F8FAFC] text-xs font-semibold transition-colors"
              >
                <span>NTA Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Secondary Information Cards (Values from source document only) */}
          <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-2 gap-3 shrink-0">
            {/* Card 1: Paper 1 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div className="text-[11px] font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider mb-1">
                Paper 1
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-[#F8FAFC]">
                10 Units
              </div>
              <div className="text-xs text-slate-500 dark:text-[#A7AFBD] mt-0.5">
                50 Questions · 100 Marks
              </div>
            </div>

            {/* Card 2: Paper 2 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div className="text-[11px] font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider mb-1">
                Paper 2
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-[#F8FAFC]">
                Subject Specific
              </div>
              <div className="text-xs text-slate-500 dark:text-[#A7AFBD] mt-0.5">
                100 Questions · 200 Marks
              </div>
            </div>

            {/* Card 3: Exam Questions */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div className="text-[11px] font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider mb-1">
                Exam
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-[#F8FAFC]">
                150 Questions
              </div>
              <div className="text-xs text-slate-500 dark:text-[#A7AFBD] mt-0.5">
                Total 300 Marks · No Negative
              </div>
            </div>

            {/* Card 4: Duration */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div className="text-[11px] font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider mb-1">
                Duration
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-[#F8FAFC]">
                180 Minutes
              </div>
              <div className="text-xs text-slate-500 dark:text-[#A7AFBD] mt-0.5">
                Continuous CBT · No Break
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
