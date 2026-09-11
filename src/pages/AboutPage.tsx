import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  ExternalLink,
  HeartHandshake,
  GraduationCap,
  Layers,
  ArrowRight,
  Globe2,
} from 'lucide-react';
import { platformsData } from '../data/platformsData';
import { LearningPlatformInfo } from '../types';

const GIL_SANS = { fontFamily: "'Gil Sans', 'Gill Sans MT', 'Gill Sans', Calibri, sans-serif" };

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full bg-white text-slate-900 pt-6 sm:pt-8 pb-16" style={GIL_SANS}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-6 flex items-center gap-2 text-xs sm:text-sm text-slate-400">
          <Link to="/" className="hover:text-brand-red transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">About</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h1 className="text-2xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Knowledge Belongs to Everyone.{' '}
            <span className="text-brand-red">Free &amp; Open.</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-slate-500 text-xs sm:text-base leading-relaxed">
            Techno Wallah is an open-source study material library. We curate, map, and organize India's and the world's most prestigious open educational resources (OER) to syllabus roadmaps for every major competitive examination.
          </p>
        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-brand-red mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">100% Free &amp; Open Access</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Every link directs to official public repositories — NPTEL, SWAYAM, NCERT, MIT OCW, OpenStax. Zero paywalls or hidden subscriptions.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-brand-red mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Syllabus-Aligned Mapping</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Every examination topic is systematically cataloged and connected to high-yield open lecture series and verified textbooks.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-brand-red mb-4">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Focused Learning Environment</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Free from gamification tricks, streak anxiety, countdown timers, and commercial upsells. A clean, distraction-free scholarly reference.
            </p>
          </div>
        </div>

        {/* Featured Open Providers */}
        <section className="bg-white border border-slate-200 rounded-2xl p-8 mb-14 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Open Educational Repositories</h2>
              <p className="text-xs text-slate-400 mt-1">Directly accessible via our curated links</p>
            </div>
            <Link to="/platforms" className="text-xs text-brand-red hover:underline flex items-center gap-1">
              <span>View All Platforms</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {platformsData.map((plat: LearningPlatformInfo) => (
              <a
                key={plat.id}
                href={plat.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-red/30 hover:bg-white transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-slate-900 group-hover:text-brand-red transition-colors">
                      {plat.name}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-red" />
                  </div>
                  <span className="text-[11px] text-brand-red font-medium block mb-2">{plat.organization}</span>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {plat.description}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] font-medium text-emerald-600">
                  {plat.accessType}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* OER Commitment */}
        <div className="bg-slate-900 rounded-2xl p-8 text-center">
          <HeartHandshake className="w-10 h-10 text-brand-red mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-white mb-2">Open Educational Resources (OER) Commitment</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6">
            We actively support UNESCO's Recommendation on Open Educational Resources (OER). All materials linked through Techno Wallah remain under the copyright and terms of their respective institutions under open licenses such as CC BY, CC BY-NC-SA, and public government distribution.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/exams"
              className="px-5 py-2.5 rounded-lg bg-brand-red hover:bg-brand-darkred text-white text-xs sm:text-sm font-semibold transition-all"
            >
              Start Exploring Exams
            </Link>
            <Link
              to="/library"
              className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium border border-white/20 transition-all"
            >
              Search Open Library
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
