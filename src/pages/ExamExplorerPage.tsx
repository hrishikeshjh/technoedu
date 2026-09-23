import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  ExternalLink,
  BookOpen,
  Globe2,
  ChevronRight,
  Landmark,
  Scale,
} from 'lucide-react';
import { examsData, examCategories } from '../data/examsData';
import { ExamInfo } from '../types';
import { getExamEmblem } from '../components/common/ExamEmblems';
import { AnimatedCounter } from '../components/common/AnimatedCounter';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { Breadcrumb } from '../components/common/Breadcrumb';

// Icon per exam category (for filter tabs only)
const categoryIcon: Record<string, React.ReactNode> = {
  'Study Abroad':   <Globe2 className="w-4 h-4" />,
  'Government':     <Landmark className="w-4 h-4" />,
  'Law & Entrance': <Scale className="w-4 h-4" />,
};

export const ExamExplorerPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);

  const filteredExams = useMemo(() => {
    return examsData.filter((exam: ExamInfo) => {
      const matchesCat = selectedCategory === 'All' || exam.category === selectedCategory;
      const matchesSearch = searchQuery === '' ||
        exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.shortCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.popularTopics.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        exam.openSourcePlatforms.some((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div
      className="w-full bg-white dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] pt-6 sm:pt-8 pb-16"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Exams' }]} />

        {/* Page Header */}
        <div className="mb-6 sm:mb-8 border-b border-slate-200 dark:border-[#252932] pb-6 sm:pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
                All Major Examinations
              </h1>
              <p className="mt-2 text-slate-500 dark:text-[#A7AFBD] max-w-3xl text-xs sm:text-base leading-relaxed">
                Official syllabi, open-source study platforms, and verified PYQs for every competitive examination.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/library"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-red hover:bg-brand-darkred text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Material Library</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-2xl p-3.5 sm:p-5 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">

            {/* Search input */}
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#7F8795]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search examination, shortcode, topic or platform..."
                className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] rounded-xl text-xs sm:text-sm text-slate-800 dark:text-[#F8FAFC] placeholder-slate-400 dark:placeholder-[#7F8795] focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/30 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 dark:text-[#7F8795] hover:text-slate-700 dark:hover:text-[#F8FAFC] no-min-touch"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category dropdown */}
            <div className="md:col-span-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] rounded-xl text-xs sm:text-sm text-slate-700 dark:text-[#F8FAFC] focus:outline-none focus:border-brand-red transition-all"
              >
                {examCategories.map((cat: string) => (
                  <option key={cat} value={cat} className="dark:bg-[#111318] dark:text-[#F8FAFC]">{cat === 'All' ? 'All Exam Categories' : cat}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Quick Category Buttons — scrollable on phone */}
          <div className="mt-3.5 pt-3 border-t border-slate-200 dark:border-[#252932] flex items-center gap-2 text-xs overflow-x-auto pb-1 category-scroll">
            <span className="text-slate-500 dark:text-[#7F8795] flex items-center gap-1 font-medium shrink-0">
              <Filter className="w-3.5 h-3.5" />
              Filter:
            </span>
            {examCategories.map((cat: string) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full border transition-all flex items-center gap-1.5 shrink-0 no-min-touch ${
                  selectedCategory === cat
                    ? 'bg-brand-red text-white border-brand-red font-medium'
                    : 'bg-white dark:bg-[#15171C] text-slate-500 dark:text-[#A7AFBD] border-slate-200 dark:border-[#252932] hover:border-brand-red/40 hover:text-slate-800 dark:hover:text-[#F8FAFC]'
                }`}
              >
                {cat !== 'All' && categoryIcon[cat]}
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500 dark:text-[#A7AFBD]">
            Showing <span className="text-slate-900 dark:text-[#F8FAFC] font-semibold"><AnimatedCounter end={filteredExams.length} duration={500} /></span> examinations
          </p>
          {(selectedCategory !== 'All' || searchQuery !== '') && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs text-brand-red hover:text-brand-darkred hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredExams.map((exam: ExamInfo, idx: number) => (
            <ScrollReveal
              key={exam.id}
              animation="fade-up"
              delay={(idx % 6) * 60}
              duration={550}
              className="h-full flex flex-col"
            >
              <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-2xl p-6 hover:border-brand-red/40 dark:hover:border-brand-red/60 hover:shadow-md transition-all flex flex-col justify-between group h-full">
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white dark:bg-[#15171C] border-2 border-slate-200 dark:border-[#252932] flex items-center justify-center flex-shrink-0 text-slate-900 dark:text-[#F8FAFC]">
                    {getExamEmblem(exam.shortCode, exam.category, 32)}
                  </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 dark:bg-[#1A1D23] dark:border dark:border-[#252932] text-white">
                          {exam.shortCode}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-[#7F8795] font-medium">{exam.category}</span>
                      </div>
                      <h2 className="text-base font-bold text-slate-900 dark:text-[#F8FAFC] group-hover:text-brand-red transition-colors leading-snug">
                        {exam.name}
                      </h2>
                    </div>
                  </div>
                  {exam.tag && (
                    <span className="text-[10px] text-slate-500 dark:text-[#A7AFBD] font-medium bg-slate-100 dark:bg-[#15171C] px-2 py-1 rounded-full border border-slate-200 dark:border-[#252932] shrink-0">
                      {exam.tag}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A7AFBD] leading-relaxed mb-4">
                  {exam.description}
                </p>

                {/* Popular Topics */}
                <div className="mb-4">
                  <span className="text-[10px] font-semibold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider block mb-1.5">
                    Core Syllabus Areas:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {exam.popularTopics.map((topic: string, i: number) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] bg-slate-50 dark:bg-[#15171C] text-slate-600 dark:text-[#A7AFBD] border border-slate-200 dark:border-[#252932]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Open Repositories */}
                <div className="bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] rounded-xl p-3 mb-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-[#A7AFBD] font-medium flex items-center gap-1.5">
                      <Globe2 className="w-3.5 h-3.5 text-brand-red" />
                      Open Repositories:
                    </span>
                    <span className="text-slate-400 dark:text-[#7F8795] text-[11px]">{exam.openSourcePlatforms.length} portals</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                    {exam.openSourcePlatforms.slice(0, 4).map((plat, pIdx: number) => (
                      <a
                        key={pIdx}
                        href={plat.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] hover:border-brand-red/40 text-xs text-slate-700 dark:text-[#F8FAFC] group/plat transition-all"
                      >
                        <div className="truncate pr-1">
                          <span className="font-semibold text-brand-red block group-hover/plat:underline">{plat.name}</span>
                          <span className="text-[10px] text-slate-400 dark:text-[#7F8795] truncate block">{plat.provider}</span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-slate-300 dark:text-slate-600 group-hover/plat:text-brand-red shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-[#252932] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <a
                    href={exam.officialPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-[#7F8795] hover:text-slate-700 dark:hover:text-[#F8FAFC] transition-colors"
                  >
                    <span>{exam.officialPortalName}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-slate-300 dark:text-[#252932]">•</span>
                  <Link
                    to={`/library?exam=${encodeURIComponent(exam.shortCode)}`}
                    className="inline-flex items-center gap-1 text-xs text-brand-red font-medium hover:underline"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Open Books ({exam.recommendedTextbooks.length})</span>
                  </Link>
                </div>

                <Link
                  to={`/exams/${exam.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-brand-red dark:bg-[#15171C] dark:hover:bg-brand-red dark:border dark:border-[#252932] text-white text-xs font-semibold transition-all"
                >
                  <span>Explore Roadmap</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </ScrollReveal>
        ))}
        </div>

      </div>
    </div>
  );
};
