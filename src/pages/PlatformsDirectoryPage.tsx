import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Search,
  ExternalLink,
  Globe2,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  FlaskConical,
  Library,
  Scale,
} from 'lucide-react';
import { platformsData } from '../data/platformsData';
import { LearningPlatformInfo } from '../types';

const platformIconMap: Record<string, React.ReactNode> = {
  'nptel-swayam':             <GraduationCap className="w-5 h-5 text-brand-red" />,
  'mit-ocw':                  <FlaskConical className="w-5 h-5 text-brand-red" />,
  'ncert-epathshala':         <BookOpen className="w-5 h-5 text-brand-red" />,
  'openstax':                 <Library className="w-5 h-5 text-brand-red" />,
  'khan-academy':             <GraduationCap className="w-5 h-5 text-brand-red" />,
  'egyankosh':                <Building2 className="w-5 h-5 text-brand-red" />,
  'ndli':                     <Library className="w-5 h-5 text-brand-red" />,
  'prs-india':                <Scale className="w-5 h-5 text-brand-red" />,
  'internet-archive-openlib': <Globe2 className="w-5 h-5 text-brand-red" />,
};

export const PlatformsDirectoryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPlatforms = useMemo(() => {
    return platformsData.filter((platform: LearningPlatformInfo) => {
      const matchesCategory = selectedCategory === 'All' || platform.category === selectedCategory;
      const matchesSearch = searchQuery === '' ||
        platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        platform.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        platform.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        platform.featuredSubjects.some((d: string) => d.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categories = ['All', 'University Video Lectures & Courses', 'Global Open Courseware', 'Foundational Textbooks & Reference', 'Peer-Reviewed Open Textbooks', 'Mastery Learning & Test Foundations', 'Higher Distance Education Repository', 'All-Discipline Digital Library', 'Policy, Governance & Constitutional Acts', 'Public Domain Books & Archives'];

  return (
    <div
      className="w-full bg-white text-slate-900 pt-6 sm:pt-8 pb-16"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-6 flex items-center gap-2 text-xs sm:text-sm text-slate-400">
          <Link to="/" className="hover:text-brand-red transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">Open Learning Platforms</span>
        </div>

        {/* Page Header */}
        <div className="mb-6 sm:mb-8 border-b border-slate-200 pb-6 sm:pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Open-Source Learning Platforms
              </h1>
              <p className="mt-2 text-slate-500 max-w-3xl text-xs sm:text-base leading-relaxed">
                Premier state-funded, university-backed, and non-profit open education repositories — completely free, no subscriptions.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/library"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-red hover:bg-brand-darkred text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Browse Curated Books</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 sm:p-5 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">

            {/* Search */}
            <div className="md:col-span-7 relative">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search platform, institution (IITs, MIT, NCERT...) or subject..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/30 transition-all"
              />
            </div>

            {/* Category */}
            <div className="md:col-span-5">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-brand-red transition-all"
              >
                {categories.map((c: string) => (
                  <option key={c} value={c}>{c === 'All' ? 'All Platform Categories' : c}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-slate-500">
            Showing <span className="text-slate-900 font-semibold">{filteredPlatforms.length}</span> platforms
          </p>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPlatforms.map((platform: LearningPlatformInfo) => (
            <div
              key={platform.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-brand-red/40 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
                    {platformIconMap[platform.id] ?? <Globe2 className="w-5 h-5 text-brand-red" />}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-brand-red uppercase tracking-wider mb-0.5">
                      {platform.logoText}
                    </div>
                    <h2 className="text-base font-bold text-slate-900 group-hover:text-brand-red transition-colors leading-snug">
                      {platform.name}
                    </h2>
                  </div>
                </div>

                {/* Org */}
                <p className="text-xs text-slate-400 mb-3">
                  by <strong className="text-slate-600 font-medium">{platform.organization}</strong>
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {platform.description}
                </p>

                {/* Subjects */}
                <div className="mb-4">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Coverage:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {platform.featuredSubjects.map((disc: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] bg-slate-50 text-slate-600 border border-slate-200"
                      >
                        {disc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {platform.accessType}
                  </span>
                </div>

                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-brand-red text-white text-xs font-semibold transition-all group/btn"
                >
                  <span>Launch Open Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
