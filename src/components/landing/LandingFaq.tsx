import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

const FAQS = [
  {
    question: 'Is Techno Wallah completely free to use?',
    answer:
      'Yes. All curated syllabi, open textbooks, university lecture links, and official previous year question archives are 100% free with zero paywalls or subscriptions.',
  },
  {
    question: 'What happens when I sign up for a specific exam like UGC-NET?',
    answer:
      'Your workspace is strictly isolated to your chosen examination. You only see the syllabus, study materials, PYQs, and planner tailored to that exam without clutter from other tracks.',
  },
  {
    question: 'Where do the study materials and PYQs come from?',
    answer:
      'We index verified open educational resources (OERs) from official portals including NTA, UPSC, UGC e-PG Pathshala, NPTEL, SWAYAM, IGNOU eGyanKosh, NCERT, and OpenStax.',
  },
  {
    question: 'Can I read or write articles on the Blogs page?',
    answer:
      'Anyone can read study guides and exam strategies on the Blogs page without signing in. Creating an account lets you contribute articles to the community.',
  },
];

export const LandingFaq: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      className="py-14 sm:py-18 bg-white dark:bg-[#08090B] border-b border-slate-100 dark:border-[#1E222A]"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up" delay={50} className="mb-8">
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F8FAFC]"
          >
            Common questions
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-[#A7AFBD]">
            Quick answers about how Techno Wallah works.
          </p>
        </ScrollReveal>

        <div className="space-y-3">
          {FAQS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={item.question}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-brand-red/40 bg-red-50/30 dark:bg-[#14171E] shadow-xs'
                    : 'border-slate-200/80 dark:border-[#252932] bg-slate-50/50 dark:bg-[#111318] hover:border-brand-red/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm sm:text-base font-bold text-slate-900 dark:text-[#F8FAFC] hover:text-brand-red transition-colors active:scale-[0.995]"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ease-out ${
                      isOpen ? 'rotate-180 text-brand-red' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 dark:text-[#A7AFBD] leading-relaxed border-t border-slate-100 dark:border-[#1E222A] pt-3">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
