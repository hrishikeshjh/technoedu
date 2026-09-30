import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  Search, 
  Globe2, 
  FileText, 
  Video, 
  BookOpen, 
  Layers, 
  Building2,
  GraduationCap,
  ShieldCheck,
  Filter
} from 'lucide-react';
import { oerResources, OerResourceItem } from '../../data/ugcNetData';

export const OerLibrarySection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  const topicFilters = [
    'All',
    'Paper 1',
    'Paper 2',
    'Computer Science',
    'Research',
    'Teaching',
    'Mathematics',
    'ICT',
    'Environment',
    'Higher Education'
  ];

  const typeFilters = [
    'All',
    'PDF',
    'Video',
    'Course',
    'Textbook',
    'Repository',
    'Mock Test',
    'Official Portal'
  ];

  const filteredResources = useMemo(() => {
    return oerResources.filter((res) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = q === '' ||
        res.name.toLowerCase().includes(q) ||
        res.provider.toLowerCase().includes(q) ||
        res.category.toLowerCase().includes(q) ||
        res.highlights.toLowerCase().includes(q);

      const matchesTopic = selectedTopic === 'All' || res.topics.includes(selectedTopic);
      const matchesType = selectedType === 'All' || (res.types as string[]).includes(selectedType);

      return matchesSearch && matchesTopic && matchesType;
    });
  }, [searchQuery, selectedTopic, selectedType]);

  const getPlatformIcon = (name: string) => {
    if (name.includes('Video') || name.includes('CEC') || name.includes('PRABHA')) {
      return <Video className="w-5 h-5 text-red-500" />;
    }
    if (name.includes('Mock') || name.includes('NTA')) {
      return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
    }
    if (name.includes('Repository') || name.includes('Shodhganga') || name.includes('NDLI')) {
      return <Layers className="w-5 h-5 text-purple-500" />;
    }
    return <BookOpen className="w-5 h-5 text-brand-red" />;
  };

  return (
    <section id="oer-library" className="py-12 sm:py-16 border-b border-slate-200 dark:border-[#252932] bg-white dark:bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-[#15171C] text-slate-800 dark:text-[#F8FAFC] border border-slate-200 dark:border-[#252932] text-xs font-bold uppercase tracking-wider mb-2">
            <span>07</span>
            <span className="text-brand-red">OER LIBRARY</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Open Educational Resources (OER) Digital Library
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-[#A7AFBD] max-w-2xl leading-relaxed">
            Verified, government-sponsored, and university-grade open repositories indexed for UGC-NET / JRF aspirants. Zero cost, no paywalls.
          </p>
        </div>

        {/* Discovery Filter & Search Bar */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#7F8795]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search OER repository, provider, or keyword..."
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

            {/* Type Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Type:
              </span>
              {typeFilters.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedType === t
                      ? 'bg-slate-900 text-white dark:bg-brand-red'
                      : 'bg-slate-100 text-slate-600 dark:bg-[#15171C] dark:text-[#A7AFBD] border border-slate-200 dark:border-[#252932]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider shrink-0">
              Topic Filter:
            </span>
            {topicFilters.map((top) => (
              <button
                key={top}
                onClick={() => setSelectedTopic(top)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedTopic === top
                    ? 'bg-brand-red text-white'
                    : 'bg-white text-slate-600 dark:bg-[#111318] dark:text-[#A7AFBD] border border-slate-200 dark:border-[#252932]'
                }`}
              >
                {top}
              </button>
            ))}
          </div>
        </div>

        {/* 12 Digital Library Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="rounded-2xl p-6 bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between shadow-sm group"
            >
              <div>
                {/* Header with Icon & Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {getPlatformIcon(res.name)}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/30">
                    {res.badge}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-[#F8FAFC] mb-1 group-hover:text-brand-red transition-colors">
                  {res.name}
                </h3>

                {/* Provider */}
                <div className="text-xs text-slate-400 dark:text-[#7F8795] mb-3">
                  Sponsor / Authority: <strong className="text-slate-700 dark:text-[#CBD5E1]">{res.provider}</strong>
                </div>

                {/* Highlights / Description */}
                <p className="text-xs text-slate-600 dark:text-[#A7AFBD] leading-relaxed mb-4">
                  {res.highlights}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {res.types.map((type, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-50 dark:bg-[#15171C] text-slate-600 dark:text-[#A7AFBD] border border-slate-200/80 dark:border-[#252932]"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer with Direct Access Link */}
              <div className="pt-4 border-t border-slate-100 dark:border-[#252932]">
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-brand-red text-white text-xs font-bold transition-all shadow-sm"
                >
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>Access Digital Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
