import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ExternalLink, 
  BookOpen, 
  Layers, 
  GraduationCap, 
  Compass, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { paper2Subjects, all83SubjectsRepository, UgcPaper2Subject } from '../../data/ugcNetData';

interface Paper2SectionProps {
  selectedSubjectId: string;
  onSelectSubject: (subjectId: string) => void;
}

export const Paper2Section: React.FC<Paper2SectionProps> = ({
  selectedSubjectId,
  onSelectSubject
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = new Set(paper2Subjects.map((s) => s.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredSubjects = useMemo(() => {
    return paper2Subjects.filter((subject) => {
      const matchesCat = selectedCategory === 'All' || subject.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = q === '' ||
        subject.name.toLowerCase().includes(q) ||
        subject.subjectCode.toLowerCase().includes(q) ||
        subject.coreDomains.some((d) => d.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section id="paper-2" className="py-12 sm:py-16 border-b border-slate-200 dark:border-[#252932] bg-white dark:bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-[#15171C] text-slate-800 dark:text-[#F8FAFC] border border-slate-200 dark:border-[#252932] text-xs font-bold uppercase tracking-wider mb-2">
            <span>03</span>
            <span className="text-brand-red">PAPER 2</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Domain-Specific Preparation
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-[#A7AFBD] max-w-2xl leading-relaxed">
            Paper 2 consists of 100 questions (200 marks) based on the candidate's chosen post-graduate discipline. Explore high-enrollment disciplines below or access the complete 83-subject repository.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#7F8795]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search domain, subject code, or topic..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#252932] text-xs sm:text-sm text-slate-900 dark:text-[#F8FAFC] placeholder-slate-400 dark:placeholder-[#7F8795] focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white dark:bg-brand-red dark:text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-[#15171C] dark:text-[#A7AFBD] dark:hover:bg-[#1A1D23]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {filteredSubjects.map((sub) => {
            const isSelected = selectedSubjectId === sub.id;

            return (
              <div
                key={sub.id}
                className={`rounded-2xl p-6 transition-all border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-50/80 dark:bg-[#111318] border-brand-red ring-1 ring-brand-red/30 shadow-md'
                    : 'bg-white dark:bg-[#111318] border-slate-200 dark:border-[#252932] hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
                }`}
              >
                <div>
                  {/* Top Bar: Subject Code & Category */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md text-xs font-black bg-slate-900 text-white dark:bg-[#1A1D23] dark:border dark:border-[#252932]">
                      Subject {sub.subjectCode}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-[#A7AFBD]">
                      {sub.category}
                    </span>
                  </div>

                  {/* Subject Name */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-[#F8FAFC] mb-3">
                    {sub.name}
                  </h3>

                  {/* Core Domains */}
                  <div className="mb-4">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider block mb-2">
                      Core Syllabus Domains:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {sub.coreDomains.slice(0, 4).map((dom, dIdx) => (
                        <span
                          key={dIdx}
                          className="px-2 py-1 rounded-md text-[11px] bg-slate-50 dark:bg-[#15171C] text-slate-700 dark:text-[#CBD5E1] border border-slate-200/80 dark:border-[#252932]"
                        >
                          {dom}
                        </span>
                      ))}
                      {sub.coreDomains.length > 4 && (
                        <span className="px-2 py-1 rounded-md text-[11px] bg-slate-100 dark:bg-[#1A1D23] text-slate-500 dark:text-[#7F8795]">
                          +{sub.coreDomains.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Recommended OER */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] mb-4">
                    <div className="text-[10px] font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-brand-red" />
                      Recommended OER Portals:
                    </div>
                    <div className="space-y-1.5">
                      {sub.recommendedOer.map((oer, oIdx) => (
                        <a
                          key={oIdx}
                          href={oer.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between text-xs text-slate-700 dark:text-[#CBD5E1] hover:text-brand-red dark:hover:text-red-400 transition-colors group/oer"
                        >
                          <span className="truncate pr-2 font-medium">{oer.title}</span>
                          <ExternalLink className="w-3 h-3 text-slate-400 group-hover/oer:text-brand-red shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-4 border-t border-slate-100 dark:border-[#252932] flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-500 dark:text-[#7F8795]">
                    {sub.studyMaterialNote}
                  </span>

                  {sub.id === 'subject-87' ? (
                    <button
                      onClick={() => {
                        onSelectSubject(sub.id);
                        const csEl = document.getElementById('cs-detailed-section');
                        if (csEl) {
                          csEl.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-brand-red hover:bg-brand-darkred text-white text-xs font-semibold transition-all shrink-0 shadow-sm"
                    >
                      <span>10-Unit Grid</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <a
                      href="https://ugcnetonline.in/syllabus-new.php"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-brand-red text-white text-xs font-semibold transition-all shrink-0"
                    >
                      <span>Official Syllabus</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Complete 83 Subjects Syllabus Repository Card */}
        <div className="rounded-2xl p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-white/10 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-2">
                <span>All India Syllabus Archive</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-1">
                {all83SubjectsRepository.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {all83SubjectsRepository.description} Access official PDF syllabi for all languages, humanities, sciences, commerce, and social sciences.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {all83SubjectsRepository.officialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold transition-all"
                >
                  <span>{link.title}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
