import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  ExternalLink,
  Globe2,
  Landmark,
  FileText,
  Archive,
  BookOpen,
  MapPin,
  Layers,
  ShieldCheck,
  GraduationCap,
  Database,
} from 'lucide-react';
import { completeExamDirectory, directoryRegions } from '../data/completeExamDirectory';
import { DirectoryExam, DirectoryRegion } from '../types';
import { Breadcrumb } from '../components/common/Breadcrumb';

const regionBadgeStyles: Record<DirectoryRegion, string> = {
  'West Bengal': 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/30',
  'All India': 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/30',
  'International': 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-900/30',
};

const regionDotStyles: Record<DirectoryRegion, string> = {
  'West Bengal': 'bg-red-500',
  'All India': 'bg-emerald-500',
  'International': 'bg-sky-500',
};

export const CompleteDirectoryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedRegion = (searchParams.get('region') ?? 'All') as 'All' | DirectoryRegion;
  const searchQuery = searchParams.get('search') ?? '';

  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    completeExamDirectory.forEach((exam) => cats.add(exam.category));
    return ['All', ...Array.from(cats).sort()];
  }, []);

  const selectedCategory = searchParams.get('category') ?? 'All';

  const filteredExams = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return completeExamDirectory.filter((exam: DirectoryExam) => {
      const matchesRegion = selectedRegion === 'All' || exam.region === selectedRegion;
      const matchesCategory = selectedCategory === 'All' || exam.category === selectedCategory;
      let matchesSearch = true;
      if (q !== '') {
        matchesSearch =
          exam.name.toLowerCase().includes(q) ||
          exam.shortCode.toLowerCase().includes(q) ||
          exam.conductingBody.toLowerCase().includes(q) ||
          exam.category.toLowerCase().includes(q) ||
          exam.studyMaterials.some((s) => s.title.toLowerCase().includes(q));
      }
      return matchesRegion && matchesCategory && matchesSearch;
    });
  }, [selectedRegion, selectedCategory, searchQuery]);

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = { 'West Bengal': 0, 'All India': 0, International: 0 };
    completeExamDirectory.forEach((exam) => {
      counts[exam.region] += 1;
    });
    return counts;
  }, []);

  const syncParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === '' || value === 'All') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next, { replace: true });
  };

  const regions: ('All' | DirectoryRegion)[] = ['All', ...directoryRegions];

  return (
    <div
      className="w-full bg-white dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] pt-6 sm:pt-8 pb-16 transition-colors duration-200"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Directory' }]} />

        {/* Page Header */}
        <div className="mb-6 sm:mb-8 border-b border-slate-200 dark:border-[#252932] pb-6 sm:pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
                Complete Exam Directory
              </h1>
              <p className="mt-2 text-slate-500 dark:text-[#A7AFBD] max-w-3xl text-xs sm:text-base leading-relaxed">
                Every major and minor examination across West Bengal, all-India boards, and the
                international arena — each with direct links to its official portal, eligibility,
                roadmap and syllabus documentation, previous-year papers, and open-source study
                materials.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-xl text-xs text-slate-600 dark:text-[#A7AFBD]">
                <Database className="w-4 h-4 text-brand-red" />
                <strong className="text-slate-900 dark:text-[#F8FAFC]">{completeExamDirectory.length}</strong> examinations indexed
              </span>
            </div>
          </div>

          {/* Region summary strip */}
          <div className="mt-5 grid grid-cols-3 gap-3 max-w-xl">
            {directoryRegions.map((region) => (
              <div
                key={region}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-[#252932] bg-slate-50 dark:bg-[#111318]`}
              >
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${regionDotStyles[region]}`} />
                <div className="leading-tight">
                  <div className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-[#7F8795] font-bold">
                    {region === 'West Bengal' ? 'West Bengal' : region === 'All India' ? 'All India' : 'Worldwide'}
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">{regionCounts[region]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Region Tabs */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {regions.map((region) => {
            const active = selectedRegion === region;
            return (
              <button
                key={region}
                onClick={() => syncParam('region', region)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                  active
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-brand-red dark:border-brand-red dark:text-white shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-brand-red/40 hover:text-brand-red dark:bg-[#111318] dark:text-[#A7AFBD] dark:border-[#252932] dark:hover:text-[#F8FAFC] dark:hover:border-brand-red/40'
                }`}
              >
                {region === 'All' ? 'All Regions' : region}
                <span className={`ml-1.5 text-[10px] font-bold ${
                  active ? 'text-white/70' : 'text-slate-400 dark:text-[#7F8795]'
                }`}>
                  {region === 'All' ? completeExamDirectory.length : regionCounts[region]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-2xl p-3.5 sm:p-5 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
            <div className="md:col-span-7 relative">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#7F8795]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => syncParam('search', e.target.value)}
                placeholder="Search exam, short code, conducting body, subject category or open resource..."
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] rounded-xl text-xs sm:text-sm text-slate-800 dark:text-[#F8FAFC] placeholder-slate-400 dark:placeholder-[#7F8795] focus:outline-none focus:border-brand-red dark:focus:border-brand-red focus:ring-1 focus:ring-brand-red/30 transition-all"
              />
            </div>
            <div className="md:col-span-5">
              <select
                value={selectedCategory}
                onChange={(e) => syncParam('category', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] rounded-xl text-xs sm:text-sm text-slate-700 dark:text-[#F8FAFC] focus:outline-none focus:border-brand-red dark:focus:border-brand-red transition-all"
              >
                {allCategories.map((c: string) => (
                  <option key={c} value={c}>{c === 'All' ? 'All Subject Categories' : c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-5">
          <p className="text-sm text-slate-500 dark:text-[#A7AFBD]">
            Showing <span className="text-slate-900 dark:text-[#F8FAFC] font-semibold">{filteredExams.length}</span> of{' '}
            <span className="text-slate-900 dark:text-[#F8FAFC] font-semibold">{completeExamDirectory.length}</span> examinations
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredExams.map((exam: DirectoryExam) => (
            <div
              key={exam.id}
              className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-2xl p-5 hover:border-brand-red/40 dark:hover:border-brand-red/50 hover:shadow-md transition-all flex flex-col group"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${regionBadgeStyles[exam.region]}`}>
                      <MapPin className="w-3 h-3" />
                      {exam.region}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#1A1D23] text-slate-600 dark:text-[#A7AFBD] text-[10px] font-semibold">
                      {exam.category}
                    </span>
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-[#F8FAFC] leading-snug group-hover:text-brand-red transition-colors">
                    {exam.name}
                  </h2>
                </div>
                <span className="flex-shrink-0 text-[10px] font-bold px-2 py-1 rounded-lg bg-red-50 text-brand-darkred border border-red-100 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/30">
                  {exam.shortCode}
                </span>
              </div>

              {/* Conducting body */}
              <p className="flex items-start gap-1.5 text-xs text-slate-400 dark:text-[#7F8795] mb-4">
                <Landmark className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-slate-300 dark:text-slate-600" />
                <span>
                  Conducted by <strong className="text-slate-600 dark:text-[#A7AFBD] font-medium">{exam.conductingBody}</strong>
                </span>
              </p>

              {/* Action links */}
              <div className="space-y-2 mb-4">
                <a
                  href={exam.officialPortalUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  referrerPolicy="no-referrer"
                  className="w-full inline-flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg bg-slate-900 hover:bg-brand-red dark:bg-[#15171C] dark:hover:bg-brand-red dark:border dark:border-[#252932] text-white text-xs font-semibold transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Globe2 className="w-3.5 h-3.5" />
                    {exam.officialPortalName}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
                <a
                  href={exam.docsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  referrerPolicy="no-referrer"
                  className="w-full inline-flex items-center justify-between gap-2 px-3.5 py-2 rounded-lg border border-slate-200 hover:border-brand-red/50 hover:bg-red-50/50 text-slate-700 dark:border-[#252932] dark:hover:border-brand-red/50 dark:hover:bg-red-950/20 dark:text-[#F8FAFC] text-xs font-semibold transition-all"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-brand-red" />
                    {exam.docsLabel}
                  </span>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {exam.docsUrl.toLowerCase().endsWith('.pdf') && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/30 uppercase">
                        PDF
                      </span>
                    )}
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-[#7F8795]" />
                  </div>
                </a>
                {exam.pyqUrl && (
                  <a
                    href={exam.pyqUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    referrerPolicy="no-referrer"
                    className="w-full inline-flex items-center justify-between gap-2 px-3.5 py-2 rounded-lg border border-slate-200 hover:border-brand-red/50 hover:bg-red-50/50 text-slate-700 dark:border-[#252932] dark:hover:border-brand-red/50 dark:hover:bg-red-950/20 dark:text-[#F8FAFC] text-xs font-semibold transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <Archive className="w-3.5 h-3.5 text-brand-red" />
                      {exam.pyqLabel ?? 'Previous Papers'}
                    </span>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {exam.pyqUrl.toLowerCase().endsWith('.pdf') && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/30 uppercase">
                          PDF
                        </span>
                      )}
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-[#7F8795]" />
                    </div>
                  </a>
                )}
              </div>

              {/* Open study materials */}
              <div className="pt-3.5 border-t border-slate-100 dark:border-[#252932] mt-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    Open Study Materials
                    <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/30">
                      {exam.studyMaterials.length}
                    </span>
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <ul className="space-y-1.5">
                  {exam.studyMaterials.map((material) => (
                    <li key={material.url}>
                      <a
                        href={material.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        referrerPolicy="no-referrer"
                        className="flex items-center justify-between gap-2 text-[11px] text-slate-600 dark:text-[#A7AFBD] hover:text-brand-red dark:hover:text-red-400 transition-colors group/link"
                      >
                        <span className="flex items-center gap-1.5 min-w-0">
                          <GraduationCap className="w-3 h-3 text-slate-300 dark:text-slate-600 flex-shrink-0 group-hover/link:text-brand-red dark:group-hover/link:text-red-400 transition-colors" />
                          <span className="truncate">{material.title}</span>
                        </span>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {material.url.toLowerCase().endsWith('.pdf') && (
                            <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/30 uppercase">
                              PDF
                            </span>
                          )}
                          <ExternalLink className="w-3 h-3 text-slate-300 dark:text-slate-600 flex-shrink-0 group-hover/link:text-brand-red dark:group-hover/link:text-red-400 transition-colors" />
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredExams.length === 0 && (
          <div className="text-center py-20 border border-dashed border-slate-300 dark:border-[#252932] rounded-3xl bg-slate-50/50 dark:bg-[#111318]">
            <Layers className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-600 dark:text-[#F8FAFC]">No examinations match your filters</p>
            <p className="text-xs text-slate-400 dark:text-[#7F8795] mt-1">Try clearing the search or choosing another region.</p>
            <button
              onClick={() => setSearchParams({}, { replace: true })}
              className="mt-4 px-4 py-2 rounded-xl bg-brand-red hover:bg-brand-darkred text-white text-xs font-semibold transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};