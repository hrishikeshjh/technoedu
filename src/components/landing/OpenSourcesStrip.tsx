import React from 'react';
import { BookOpen, GraduationCap, Library, FileCheck2, Landmark, Globe2 } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

const SOURCES = [
  {
    name: 'UGC e-PG Pathshala',
    role: 'Postgraduate OERs & Paper 1/2 Modules',
    icon: GraduationCap,
  },
  {
    name: 'NPTEL & SWAYAM',
    role: 'IIT / IISc Video Lectures & Notes',
    icon: BookOpen,
  },
  {
    name: 'IGNOU eGyanKosh',
    role: 'Research Methodology & Self-Learning PDFs',
    icon: Library,
  },
  {
    name: 'NTA & UPSC Archives',
    role: 'Official Previous Year Question Papers',
    icon: FileCheck2,
  },
  {
    name: 'NCERT e-Pathshala',
    role: 'Core Foundation Textbooks (Classes 6–12)',
    icon: Landmark,
  },
  {
    name: 'OpenStax & MIT OCW',
    role: 'Peer-Reviewed Open Textbooks & Stats',
    icon: Globe2,
  },
];

export const OpenSourcesStrip: React.FC = () => {
  return (
    <section
      className="py-14 sm:py-18 bg-white dark:bg-[#08090B] border-b border-slate-100 dark:border-[#1E222A]"
      aria-labelledby="open-sources-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up" delay={50} className="max-w-2xl mb-10">
          <h2
            id="open-sources-heading"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F8FAFC]"
          >
            Built on verified open repositories
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-[#A7AFBD]">
            Every textbook, lecture, and previous year paper is sourced from official government and university open-access portals.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SOURCES.map((source, idx) => {
            const Icon = source.icon;
            return (
              <ScrollReveal key={source.name} animation="fade-up" delay={idx * 50}>
                <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-[#111318] border border-slate-200/80 dark:border-[#252932]">
                  <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">
                      {source.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-[#A7AFBD] mt-0.5 leading-relaxed">
                      {source.role}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
