import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe2,
  Landmark,
  Scale,
  ArrowRight,
  BookOpen,
  ExternalLink,
} from 'lucide-react';
import { examsData } from '../../data/examsData';
import { ExamCategoryType } from '../../types';
import { getExamEmblem } from '../common/ExamEmblems';
import { ScrollReveal } from '../common/ScrollReveal';
import { AnimatedCounter } from '../common/AnimatedCounter';

export const ExamCategoryGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ExamCategoryType | 'All'>('All');

  const categories: { title: ExamCategoryType; icon: any; count: number; desc: string }[] = [
    {
      title: 'Study Abroad',
      icon: Globe2,
      count: examsData.filter(e => e.category === 'Study Abroad').length,
      desc: 'GRE, GMAT, IELTS, TOEFL & SAT connected to Khan Academy, MIT OCW & ETS'
    },
    {
      title: 'Government',
      icon: Landmark,
      count: examsData.filter(e => e.category === 'Government').length,
      desc: 'UPSC CSE, WBCS, SSC CGL, Banking, Railways & Defence mapped to NCERT & NPTEL'
    },
    {
      title: 'Law & Entrance',
      icon: Scale,
      count: examsData.filter(e => e.category === 'Law & Entrance').length,
      desc: 'CLAT, CUET, CAT & Management linked to NLU archives, OpenStax & SWAYAM'
    }
  ];

  const filteredExams = selectedCategory === 'All' 
    ? examsData 
    : examsData.filter(e => e.category === selectedCategory);

  return (
    <section className="py-12 sm:py-16 bg-slate-50/70 dark:bg-[#0B0C0F] border-y border-slate-200 dark:border-[#252932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-950/40 text-brand-darkred dark:text-red-400 text-xs font-bold uppercase tracking-wider no-min-touch">
              <span>Examination Directory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dark-900 dark:text-[#F8FAFC] tracking-tight">
              Select Your Target Examination
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A7AFBD]">
              Each examination is indexed with official syllabi, verified previous year question archives, and direct open-source study repositories.
            </p>

            {/* Category Filter Tabs — horizontally scrollable on mobile */}
            <div className="pt-3">
              <div className="category-scroll flex items-center justify-start sm:justify-center gap-2 pb-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`flex-shrink-0 px-4 py-2 rounded-2xl text-xs font-bold transition-all no-min-touch ${
                    selectedCategory === 'All'
                      ? 'bg-slate-900 dark:bg-red-600 text-white shadow-soft'
                      : 'bg-white dark:bg-[#111318] text-slate-600 dark:text-[#A7AFBD] hover:bg-slate-100 dark:hover:bg-[#15171C] border border-slate-200 dark:border-[#252932]'
                  }`}
                >
                  All Examinations (<AnimatedCounter end={examsData.length} duration={1200} />)
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.title}
                    onClick={() => setSelectedCategory(cat.title)}
                    className={`flex-shrink-0 px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      selectedCategory === cat.title
                        ? 'bg-brand-red text-white shadow-red-glow'
                        : 'bg-white dark:bg-[#111318] text-slate-600 dark:text-[#A7AFBD] hover:bg-slate-100 dark:hover:bg-[#15171C] border border-slate-200 dark:border-[#252932]'
                    }`}
                  >
                    <cat.icon className="w-3.5 h-3.5" />
                    <span>{cat.title} (<AnimatedCounter end={cat.count} duration={1000} />)</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Exams Grid with staggered scroll animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredExams.map((exam, idx) => (
            <ScrollReveal
              key={exam.id}
              animation="fade-up"
              delay={(idx % 6) * 75}
              duration={600}
              className="h-full flex flex-col"
            >
              <div className="bg-white dark:bg-[#111318] rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-[#252932] shadow-soft dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] hover:shadow-card-hover hover:border-brand-red/40 dark:hover:border-brand-red/60 transition-all duration-300 flex flex-col justify-between h-full">
                <div className="space-y-3.5">
                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#15171C] border-2 border-slate-200 dark:border-[#252932] flex items-center justify-center text-slate-900 dark:text-[#F8FAFC] shrink-0 shadow-sm">
                      {getExamEmblem(exam.shortCode, exam.category, 34)}
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#1A1D23] text-slate-700 dark:text-[#A7AFBD] no-min-touch">
                      {exam.tag}
                    </span>
                  </div>

                  {/* Exam Title & Category */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-dark-900 dark:text-[#F8FAFC] leading-snug">
                      {exam.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-[#7F8795] font-medium mt-0.5">
                      {exam.category} Pathway
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-[#A7AFBD] leading-relaxed">
                    {exam.description}
                  </p>

                  {/* Open Source Platforms Mapped */}
                  <div className="pt-1">
                    <div className="text-[11px] font-bold text-slate-700 dark:text-[#F8FAFC] mb-1.5">
                      Open Repositories:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {exam.openSourcePlatforms.slice(0, 3).map((plat) => (
                        <a
                          key={plat.id}
                          href={plat.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] px-2 py-1 rounded-xl bg-red-50 dark:bg-red-950/40 text-brand-darkred dark:text-red-400 border border-red-100 dark:border-red-900/30 font-semibold hover:bg-brand-red hover:text-white transition-colors inline-flex items-center gap-1 no-min-touch"
                          title={plat.description}
                        >
                          <span>{plat.name}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Core Topics Covered */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {exam.popularTopics.slice(0, 3).map((topic, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-lg text-slate-600 dark:text-[#A7AFBD] no-min-touch"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-[#252932] space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      to={`/exams/${exam.id}`}
                      className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-brand-red dark:bg-[#15171C] dark:hover:bg-brand-red dark:border dark:border-[#252932] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>View Syllabus &amp; Open Material</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-[#7F8795] pt-1">
                    <span>Official Authority:</span>
                    <a
                      href={exam.officialPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-slate-700 dark:text-[#F8FAFC] hover:text-brand-red dark:hover:text-red-400 flex items-center gap-1 transition-colors no-min-touch"
                    >
                      <span>{exam.officialPortalName}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
