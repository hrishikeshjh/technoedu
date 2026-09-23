import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  ExternalLink,
  BookOpen,
  ShieldCheck,
  Share2,
  Check,
  Building2,
  GraduationCap,
  FlaskConical,
  Library,
  Globe2,
  Scale,
  Download,
  FileText,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { studyMaterials, materialCategories } from '../data/studyMaterialData';
import { examsData } from '../data/examsData';
import { StudyMaterialItem, ExamInfo } from '../types';
import { AnimatedCounter } from '../components/common/AnimatedCounter';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { Breadcrumb } from '../components/common/Breadcrumb';

const platformIconMap: Record<string, React.ReactNode> = {
  'NPTEL':         <GraduationCap className="w-3.5 h-3.5 text-brand-red" />,
  'SWAYAM':        <GraduationCap className="w-3.5 h-3.5 text-brand-red" />,
  'MIT OCW':       <FlaskConical className="w-3.5 h-3.5 text-brand-red" />,
  'NCERT':         <BookOpen className="w-3.5 h-3.5 text-brand-red" />,
  'OpenStax':      <Library className="w-3.5 h-3.5 text-brand-red" />,
  'Khan Academy':  <GraduationCap className="w-3.5 h-3.5 text-brand-red" />,
  'IGNOU':         <Building2 className="w-3.5 h-3.5 text-brand-red" />,
  'NDLI':          <Library className="w-3.5 h-3.5 text-brand-red" />,
  'PRS India':     <Scale className="w-3.5 h-3.5 text-brand-red" />,
  'Open Library':  <Globe2 className="w-3.5 h-3.5 text-brand-red" />,
};

function getPlatformIcon(platform: string): React.ReactNode {
  for (const key of Object.keys(platformIconMap)) {
    if (platform.includes(key)) return platformIconMap[key];
  }
  return <Building2 className="w-3.5 h-3.5 text-brand-red" />;
}

export const StudyMaterialPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const examParam = searchParams.get('exam') || 'All';
  const searchInitial = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedExam, setSelectedExam] = useState<string>(examParam);
  const [searchQuery, setSearchQuery] = useState<string>(searchInitial);
  const [selectedItem, setSelectedItem] = useState<StudyMaterialItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredMaterials = useMemo(() => {
    return studyMaterials.filter((item: StudyMaterialItem) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesExam = selectedExam === 'All' || item.examName.toLowerCase().includes(selectedExam.toLowerCase());
      const matchesSearch = searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.previewSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sourcePlatform.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.examName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keyTopics.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesExam && matchesSearch;
    });
  }, [selectedCategory, selectedExam, searchQuery]);

  const handleShare = (item: StudyMaterialItem) => {
    navigator.clipboard.writeText(window.location.origin + '/library?search=' + encodeURIComponent(item.title));
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      className="w-full bg-white dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] pt-6 sm:pt-8 pb-16"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Library' }]} />

        {/* Page Header */}
        <div className="mb-6 sm:mb-8 border-b border-slate-200 dark:border-[#252932] pb-6 sm:pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
                Open Study Material Library
              </h1>
              <p className="mt-2 text-slate-500 dark:text-[#A7AFBD] max-w-3xl text-xs sm:text-base leading-relaxed">
                Free textbooks, lecture notes, and official PYQs — zero paywalls.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/platforms"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] text-slate-700 dark:text-[#F8FAFC] text-xs sm:text-sm font-medium hover:border-brand-red/40 hover:text-brand-red transition-all"
              >
                <Building2 className="w-4 h-4 text-brand-red" />
                <span>Browse All Platforms</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-2xl p-3.5 sm:p-5 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">

            {/* Search input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#7F8795]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, topic, platform or exam..."
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

            {/* Exam selector */}
            <div className="md:col-span-3">
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] rounded-xl text-xs sm:text-sm text-slate-700 dark:text-[#F8FAFC] focus:outline-none focus:border-brand-red transition-all"
              >
                <option value="All" className="dark:bg-[#111318] dark:text-[#F8FAFC]">All Targeted Exams</option>
                {examsData.map((e: ExamInfo) => (
                  <option key={e.id} value={e.shortCode} className="dark:bg-[#111318] dark:text-[#F8FAFC]">{e.shortCode} — {e.name}</option>
                ))}
              </select>
            </div>

            {/* Category selector */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] rounded-xl text-xs sm:text-sm text-slate-700 dark:text-[#F8FAFC] focus:outline-none focus:border-brand-red transition-all"
              >
                {materialCategories.map((cat: string) => (
                  <option key={cat} value={cat} className="dark:bg-[#111318] dark:text-[#F8FAFC]">{cat === 'All' ? 'All Resource Categories' : cat}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Active filter pills — scrollable on phone */}
          <div className="mt-3.5 pt-3 border-t border-slate-200 dark:border-[#252932] flex items-center gap-2 text-xs overflow-x-auto pb-1 category-scroll">
            <span className="text-slate-500 dark:text-[#7F8795] flex items-center gap-1 font-medium shrink-0">
              <Filter className="w-3.5 h-3.5" />
              Categories:
            </span>
            {materialCategories.map((cat: string) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full border transition-all shrink-0 no-min-touch ${
                  selectedCategory === cat
                    ? 'bg-brand-red text-white border-brand-red font-medium'
                    : 'bg-white dark:bg-[#15171C] text-slate-500 dark:text-[#A7AFBD] border-slate-200 dark:border-[#252932] hover:border-brand-red/40 hover:text-slate-800 dark:hover:text-[#F8FAFC]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500 dark:text-[#A7AFBD]">
            Showing <span className="text-slate-900 dark:text-[#F8FAFC] font-semibold"><AnimatedCounter end={filteredMaterials.length} duration={500} /></span> resources
          </p>
          {(selectedCategory !== 'All' || selectedExam !== 'All' || searchQuery !== '') && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedExam('All');
                setSearchQuery('');
              }}
              className="text-xs text-brand-red hover:text-brand-darkred hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Materials Grid */}
        {filteredMaterials.length === 0 ? (
          <div className="bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-2xl p-12 text-center">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-[#F8FAFC]">No materials match your query</h3>
            <p className="text-sm text-slate-500 dark:text-[#A7AFBD] mt-1 max-w-md mx-auto">
              Try adjusting your search, exam selection, or category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedExam('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-slate-900 hover:bg-brand-red dark:bg-[#15171C] dark:hover:bg-brand-red dark:border dark:border-[#252932] text-white rounded-lg text-sm font-medium transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMaterials.map((item: StudyMaterialItem, idx: number) => (
              <ScrollReveal
                key={item.id}
                animation="fade-up"
                delay={(idx % 6) * 60}
                duration={550}
                className="h-full flex flex-col"
              >
                <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-xl p-5 hover:border-brand-red/40 dark:hover:border-brand-red/60 hover:shadow-md transition-all flex flex-col justify-between group h-full">
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-red">
                      {getPlatformIcon(item.sourcePlatform)}
                      {item.sourcePlatform}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-[#15171C] text-slate-500 dark:text-[#A7AFBD] border border-slate-200 dark:border-[#252932]">
                      {item.fileSize}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC] group-hover:text-brand-red transition-colors line-clamp-2 leading-snug mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-500 dark:text-[#A7AFBD] leading-relaxed line-clamp-3 mb-4">
                    {item.previewSummary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.keyTopics.slice(0, 3).map((topic: string, i: number) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] bg-slate-50 dark:bg-[#15171C] text-slate-600 dark:text-[#A7AFBD] border border-slate-200 dark:border-[#252932]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Metadata */}
                  <div className="pt-3 border-t border-slate-100 dark:border-[#252932] mb-3 flex items-center justify-between text-xs text-slate-400 dark:text-[#7F8795]">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-slate-600 dark:text-[#A7AFBD] text-[11px]">{item.licenseType}</span>
                    </span>
                    <span className="text-[11px]">{item.pageCount} Pages</span>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    {item.directPdfUrl && (
                      <a
                        href={item.directPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all shadow-emerald-glow"
                        title="Direct PDF Download"
                      >
                        <Download className="w-3 h-3" />
                        <span>Direct PDF</span>
                      </a>
                    )}
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-brand-red hover:bg-brand-darkred text-white text-xs font-semibold transition-all"
                    >
                      <span>Open Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={() => setSelectedItem(item)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 dark:bg-[#15171C] hover:bg-slate-200 dark:hover:bg-[#1A1D23] text-slate-700 dark:text-[#F8FAFC] text-xs font-medium border border-slate-200 dark:border-[#252932] transition-all"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Details</span>
                    </button>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          ))}
          </div>
        )}

        {/* Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-2xl">

              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/30 text-brand-red dark:text-red-400">
                      {selectedItem.sourcePlatform}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-[#7F8795]">{selectedItem.category}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-[#F8FAFC]">{selectedItem.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-[#15171C] hover:bg-slate-200 dark:hover:bg-[#1A1D23] text-slate-500 dark:text-[#A7AFBD] hover:text-slate-800 dark:hover:text-[#F8FAFC] transition-all"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-slate-600 dark:text-[#A7AFBD] leading-relaxed mb-6">
                {selectedItem.previewSummary}
              </p>

              {/* Detail list */}
              <div className="space-y-4 bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] rounded-xl p-4 mb-6 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 dark:text-[#7F8795] block">Applicable Examination</span>
                    <span className="text-slate-800 dark:text-[#F8FAFC] font-medium">{selectedItem.examName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-[#7F8795] block">Open License</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">{selectedItem.licenseType}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-[#7F8795] block">Document Volume</span>
                    <span className="text-slate-800 dark:text-[#F8FAFC]">{selectedItem.pageCount} Pages ({selectedItem.fileSize})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-[#7F8795] block">Access Model</span>
                    <span className="text-emerald-600 dark:text-emerald-400">100% Free Open Educational Resource</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 dark:text-[#7F8795] block mb-1.5">Covered Topics</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedItem.keyTopics.map((t: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 rounded bg-white dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] text-slate-700 dark:text-[#A7AFBD]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chapter-level Direct PDF Links */}
              {selectedItem.chapterPdfUrls && selectedItem.chapterPdfUrls.length > 0 && (
                <div className="bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-700 dark:text-[#F8FAFC] flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      Chapter-level Direct PDF Downloads
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-[#7F8795] bg-white dark:bg-[#15171C] px-2 py-0.5 rounded border border-slate-200 dark:border-[#252932]">
                      {selectedItem.chapterPdfUrls.length} chapters
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                    {selectedItem.chapterPdfUrls.map((ch, idx) => (
                      <a
                        key={idx}
                        href={ch.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] hover:border-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all text-xs"
                        title="Open chapter PDF directly"
                      >
                        <span className="text-slate-700 dark:text-[#F8FAFC] truncate pr-2">{ch.chapter}</span>
                        <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      </a>
                    ))}
                  </div>
                  <p className="mt-2 text-[10px] text-slate-500 dark:text-[#7F8795] text-center">
                    Opens directly in browser. Use "Save as..." to download.
                  </p>
                </div>
              )}

              {/* Direct PDF Download Button (Full Book) */}
              {selectedItem.directPdfUrl && !selectedItem.chapterPdfUrls && (
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-4 mb-6 text-center">
                  <Download className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-600 dark:text-[#A7AFBD] mb-2">Full book direct PDF available</p>
                  <a
                    href={selectedItem.directPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Full PDF</span>
                  </a>
                  <p className="mt-2 text-[10px] text-slate-500 dark:text-[#7F8795]">Opens in new tab. Use browser "Save as..." to save locally.</p>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-[#252932]">
                <button
                  onClick={() => handleShare(selectedItem)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-[#15171C] hover:bg-slate-200 dark:hover:bg-[#1A1D23] text-slate-700 dark:text-[#F8FAFC] text-xs font-medium border border-slate-200 dark:border-[#252932] transition-all"
                >
                  {copiedId === selectedItem.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Copy Share Link</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-slate-100 dark:bg-[#15171C] text-slate-700 dark:text-[#F8FAFC] hover:bg-slate-200 dark:hover:bg-[#1A1D23] text-xs font-medium"
                  >
                    Close
                  </button>
                  <a
                    href={selectedItem.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-brand-red hover:bg-brand-darkred text-white text-xs font-semibold transition-all"
                  >
                    <span>Open Resource</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
