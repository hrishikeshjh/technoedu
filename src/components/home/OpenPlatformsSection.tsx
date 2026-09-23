import React from 'react';
import { Link } from 'react-router-dom';
import { Globe2, ExternalLink, ArrowRight, ShieldCheck, BookOpen, FlaskConical, Scale, Building, GraduationCap, Library } from 'lucide-react';
import { platformsData } from '../../data/platformsData';
import { LearningPlatformInfo } from '../../types';
import { ScrollReveal } from '../common/ScrollReveal';

// Platform icon map
const platformIconMap: Record<string, React.ReactNode> = {
  'nptel-swayam':             <GraduationCap className="w-5 h-5 text-brand-red" />,
  'mit-ocw':                  <FlaskConical className="w-5 h-5 text-brand-red" />,
  'ncert-epathshala':         <BookOpen className="w-5 h-5 text-brand-red" />,
  'openstax':                 <Library className="w-5 h-5 text-brand-red" />,
  'khan-academy':             <GraduationCap className="w-5 h-5 text-brand-red" />,
  'egyankosh':                <Building className="w-5 h-5 text-brand-red" />,
  'ndli':                     <Library className="w-5 h-5 text-brand-red" />,
  'prs-india':                <Scale className="w-5 h-5 text-brand-red" />,
  'internet-archive-openlib': <Globe2 className="w-5 h-5 text-brand-red" />,
};

export const OpenPlatformsSection: React.FC = () => {
  return (
    <section
      className="py-16 bg-white dark:bg-[#08090B] border-y border-slate-200 dark:border-[#252932]"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
                Curated Open-Source Learning Platforms
              </h2>
              <p className="mt-1 text-slate-500 dark:text-[#A7AFBD] text-xs sm:text-sm max-w-2xl">
                Direct access to world-class university courses, government e-learning initiatives, and open digital libraries.
              </p>
            </div>

            <Link
              to="/platforms"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-red hover:text-brand-darkred transition-colors"
            >
              <span>View All Platforms</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {platformsData.slice(0, 6).map((platform: LearningPlatformInfo, idx: number) => (
            <ScrollReveal
              key={platform.id}
              animation="fade-up"
              delay={(idx % 6) * 80}
              duration={600}
              className="h-full flex flex-col"
            >
              <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-2xl p-5 hover:border-brand-red/40 dark:hover:border-brand-red/60 hover:shadow-md transition-all flex flex-col justify-between group h-full">
                <div>
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/30 flex items-center justify-center flex-shrink-0">
                        {platformIconMap[platform.id] ?? <Globe2 className="w-5 h-5 text-brand-red" />}
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-brand-red uppercase tracking-wider">
                          {platform.logoText}
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC] group-hover:text-brand-red transition-colors leading-snug">
                          {platform.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-[#7F8795] font-medium mb-2">{platform.organization}</p>

                  <p className="text-xs text-slate-600 dark:text-[#A7AFBD] leading-relaxed mb-4 line-clamp-2">
                    {platform.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {platform.featuredSubjects.slice(0, 3).map((disc: string, sIdx: number) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded text-[10px] bg-slate-50 dark:bg-[#15171C] text-slate-600 dark:text-[#A7AFBD] border border-slate-200 dark:border-[#252932]"
                      >
                        {disc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-[#252932] flex items-center justify-between">
                  <span className="text-[10px] font-medium text-slate-600 dark:text-[#A7AFBD] flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-brand-red" />
                    {platform.accessType}
                  </span>

                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-red hover:text-brand-darkred hover:underline"
                  >
                    <span>Open Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
