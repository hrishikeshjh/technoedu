import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

interface PrimeExamItem {
  id: string;
  label: string;
  subtitle: string;
  emblemSrc: string;
  emblemAlt: string;
  to: string;
  invertInDark?: boolean;
}

const PRIME_EXAMS: PrimeExamItem[] = [
  {
    id: 'upsc-cse',
    label: 'UPSC CSE',
    subtitle: 'Civil Services',
    emblemSrc: '/emblems/emblem-of-india.svg',
    emblemAlt: 'State Emblem of India for UPSC CSE',
    to: '/courses/upsc-cse',
    invertInDark: true,
  },
  {
    id: 'wbcs',
    label: 'WBCS',
    subtitle: 'WB Civil Services',
    emblemSrc: '/emblems/seal-of-west-bengal.svg',
    emblemAlt: 'Official Seal of West Bengal for WBCS',
    to: '/exams/wbcs',
    invertInDark: true,
  },
  {
    id: 'ugc-net',
    label: 'UGC-NET',
    subtitle: 'NTA · JRF & Lectureship',
    emblemSrc: '/emblems/nta-emblem.png',
    emblemAlt: 'National Testing Agency emblem for UGC-NET',
    to: '/exams/ugc-net',
    invertInDark: false,
  },
  {
    id: 'ssc-cgl',
    label: 'SSC CGL',
    subtitle: 'Staff Selection Commission',
    emblemSrc: '/emblems/ssc-emblem.png',
    emblemAlt: 'Staff Selection Commission official emblem',
    to: '/exams/ssc-cgl',
    invertInDark: false,
  },
  {
    id: 'rbi-banking',
    label: 'RBI & Banking',
    subtitle: 'Grade B · IBPS · SBI',
    emblemSrc: '/emblems/seal-of-rbi.svg',
    emblemAlt: 'Reserve Bank of India official seal',
    to: '/exams',
    invertInDark: true,
  },
  {
    id: 'rrb-railways',
    label: 'RRB Railways',
    subtitle: 'NTPC · ALP · Technical',
    emblemSrc: '/emblems/indian-railways.svg',
    emblemAlt: 'Indian Railways official emblem',
    to: '/exams',
    invertInDark: false,
  },
];

export const PrimeExamsShowcase: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('upsc-cse');

  return (
    <section
      className="py-12 sm:py-16 border-b border-slate-100 dark:border-[#1E222A] bg-white dark:bg-[#08090B]"
      aria-labelledby="prime-exams-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2
                id="prime-exams-heading"
                className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-[#F8FAFC]"
              >
                Prime Government &amp; National Exams
              </h2>
              <p className="text-sm text-slate-600 dark:text-[#A7AFBD] mt-1">
                Syllabus-aligned study tracks, verified PYQs, and open resources for India&apos;s flagship examinations.
              </p>
            </div>
            <Link
              to="/exams"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red hover:text-brand-darkred transition-colors shrink-0"
            >
              <span>Explore All Exams</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={120}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {PRIME_EXAMS.map((exam) => {
              const isActive = activeId === exam.id;
              return (
                <Link
                  key={exam.id}
                  to={exam.to}
                  onMouseEnter={() => setActiveId(exam.id)}
                  onFocus={() => setActiveId(exam.id)}
                  className={`group flex flex-col items-center justify-center text-center px-3 py-5 rounded-2xl border transition-all duration-200 ${
                    isActive
                      ? 'border-brand-red/70 bg-red-50/60 dark:bg-brand-red/10 shadow-[0_8px_24px_-8px_rgba(220,38,38,0.2)]'
                      : 'border-slate-200/80 dark:border-[#252932] bg-slate-50/50 dark:bg-[#111318] hover:border-brand-red/50 hover:bg-red-50/30 dark:hover:bg-brand-red/5'
                  }`}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-3">
                    <img
                      src={exam.emblemSrc}
                      alt={exam.emblemAlt}
                      loading="lazy"
                      decoding="async"
                      className={`max-w-full max-h-full object-contain grayscale contrast-125 transition-all duration-200 ${
                        exam.invertInDark ? 'dark:invert' : ''
                      } ${
                        isActive
                          ? 'opacity-95 scale-105'
                          : 'opacity-70 group-hover:opacity-95 group-hover:scale-105'
                      }`}
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 dark:text-[#F8FAFC]">
                    {exam.label}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-[#7F8795] mt-0.5 line-clamp-1">
                    {exam.subtitle}
                  </span>
                </Link>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
