import React, { useState, useMemo } from 'react';
import { 
  Library, 
  ExternalLink, 
  BookOpen, 
  Layers, 
  Sparkles, 
  Filter, 
  CheckCircle2,
  Clock,
  Compass
} from 'lucide-react';
import { 
  studyMaterialsList, 
  paper1Units, 
  paper2Subjects,
  StudyMaterialEntry 
} from '../../data/ugcNetData';

export const StudyMaterialSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'paper1' | 'paper2' | 'by-stage'>('all');
  const [selectedPurpose, setSelectedPurpose] = useState<string>('All');
  const [selectedStage, setSelectedStage] = useState<string>('All');
  const [selectedPaper1Unit, setSelectedPaper1Unit] = useState<string>('All');

  const purposes = [
    'All',
    'OFFICIAL SOURCES',
    'Core Textbooks & Modules',
    'Video Lectures',
    'MOOCs',
    'Research Resources',
    'PYQs & Official Exam Resources',
    'Mock Tests',
    'Reference Material'
  ];

  const stages = ['All', 'FOUNDATION', 'CONCEPT BUILDING', 'PRACTICE', 'REVISION', 'MOCK'];

  const filteredMaterials = useMemo(() => {
    return studyMaterialsList.filter((item) => {
      // Purpose filter
      if (selectedPurpose !== 'All' && item.category !== selectedPurpose) {
        return false;
      }
      // Stage filter
      if (selectedStage !== 'All' && item.stage !== selectedStage) {
        return false;
      }
      // Tab filter
      if (activeTab === 'paper1' && item.paper === 'Paper 2') {
        return false;
      }
      if (activeTab === 'paper2' && item.paper === 'Paper 1') {
        return false;
      }
      return true;
    });
  }, [activeTab, selectedPurpose, selectedStage]);

  return (
    <section id="study-material" className="py-12 sm:py-16 border-b border-slate-200 dark:border-[#252932] bg-slate-50/50 dark:bg-[#0B0C0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-[#15171C] text-slate-800 dark:text-[#F8FAFC] border border-slate-200 dark:border-[#252932] text-xs font-bold uppercase tracking-wider mb-2">
            <span>06</span>
            <span className="text-brand-red">STUDY MATERIAL</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Study Material Guide
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-[#A7AFBD] max-w-2xl leading-relaxed">
            Curated textbooks, modules, videos, and repositories organized by what they are for, which paper they target, and what preparation stage you are in.
          </p>
        </div>

        {/* Major Tabs: All Resources | Paper 1 Material | Paper 2 Material | By Stage */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-slate-200 dark:border-[#252932] pb-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white dark:bg-brand-red shadow-sm'
                : 'bg-white text-slate-600 dark:bg-[#111318] dark:text-[#A7AFBD] hover:bg-slate-100 dark:hover:bg-[#15171C] border border-slate-200 dark:border-[#252932]'
            }`}
          >
            All Resources ({studyMaterialsList.length})
          </button>
          <button
            onClick={() => setActiveTab('paper1')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'paper1'
                ? 'bg-slate-900 text-white dark:bg-brand-red shadow-sm'
                : 'bg-white text-slate-600 dark:bg-[#111318] dark:text-[#A7AFBD] hover:bg-slate-100 dark:hover:bg-[#15171C] border border-slate-200 dark:border-[#252932]'
            }`}
          >
            Paper 1 Material (10 Units)
          </button>
          <button
            onClick={() => setActiveTab('paper2')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'paper2'
                ? 'bg-slate-900 text-white dark:bg-brand-red shadow-sm'
                : 'bg-white text-slate-600 dark:bg-[#111318] dark:text-[#A7AFBD] hover:bg-slate-100 dark:hover:bg-[#15171C] border border-slate-200 dark:border-[#252932]'
            }`}
          >
            Paper 2 Material (Domain Specific)
          </button>
          <button
            onClick={() => setActiveTab('by-stage')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'by-stage'
                ? 'bg-slate-900 text-white dark:bg-brand-red shadow-sm'
                : 'bg-white text-slate-600 dark:bg-[#111318] dark:text-[#A7AFBD] hover:bg-slate-100 dark:hover:bg-[#15171C] border border-slate-200 dark:border-[#252932]'
            }`}
          >
            By Preparation Stage
          </button>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Purpose Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Purpose:
            </span>
            {purposes.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPurpose(p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedPurpose === p
                    ? 'bg-brand-red text-white'
                    : 'bg-white text-slate-600 dark:bg-[#15171C] dark:text-[#A7AFBD] border border-slate-200 dark:border-[#252932]'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Preparation Stage Selector */}
          {activeTab === 'by-stage' && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider shrink-0">
                Stage:
              </span>
              {stages.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStage(st)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedStage === st
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-600 dark:bg-[#15171C] dark:text-[#A7AFBD] border border-slate-200 dark:border-[#252932]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 18: SPECIALIZED PAPER 1 UNIT ACCORDION IF PAPER 1 TAB ACTIVE */}
        {activeTab === 'paper1' && (
          <div className="p-4 rounded-2xl bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] mb-8 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC] mb-2 flex items-center gap-2">
              <Compass className="w-4 h-4 text-brand-red" />
              "What Should I Study For This Topic?" — Unit-to-Resource Index
            </h3>
            <p className="text-xs text-slate-500 dark:text-[#A7AFBD] mb-4">
              Direct mapping of each Paper 1 unit to concrete study modules.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {paper1Units.map((u) => (
                <div key={u.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#15171C] border border-slate-200/80 dark:border-[#252932]">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
                    <span>Unit {u.number}: {u.name}</span>
                    <span className="text-brand-red font-mono text-[11px]">10 Marks</span>
                  </div>
                  <div className="space-y-1 mt-2">
                    {u.freeStudyMaterials.slice(0, 2).map((m, mIdx) => (
                      <a
                        key={mIdx}
                        href={m.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-xs text-slate-600 dark:text-[#CBD5E1] hover:text-brand-red transition-colors"
                      >
                        <span className="truncate pr-2">• {m.title}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 18: SPECIALIZED PAPER 2 SUBJECT INDEX IF PAPER 2 TAB ACTIVE */}
        {activeTab === 'paper2' && (
          <div className="p-4 rounded-2xl bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] mb-8 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC] mb-2 flex items-center gap-2">
              <Compass className="w-4 h-4 text-brand-red" />
              Paper 2 Domain-to-Resource Directory
            </h3>
            <p className="text-xs text-slate-500 dark:text-[#A7AFBD] mb-4">
              Select your subject domain to find post-graduate level OER textbooks and courseware.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {paper2Subjects.map((s) => (
                <div key={s.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#15171C] border border-slate-200/80 dark:border-[#252932]">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
                    <span>Subject {s.subjectCode}: {s.name}</span>
                    <span className="text-slate-400 text-[11px]">{s.category}</span>
                  </div>
                  <div className="space-y-1 mt-2">
                    {s.recommendedOer.map((oer, oIdx) => (
                      <a
                        key={oIdx}
                        href={oer.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-xs text-slate-600 dark:text-[#CBD5E1] hover:text-brand-red transition-colors"
                      >
                        <span className="truncate pr-2">• {oer.title} ({oer.platform})</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMaterials.map((mat) => (
            <div
              key={mat.id}
              className="rounded-2xl p-5 bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* Category & Paper Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-[#15171C] text-slate-600 dark:text-[#A7AFBD]">
                    {mat.category}
                  </span>
                  <span className="text-[10px] font-bold text-brand-red dark:text-red-400">
                    {mat.paper}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-base font-bold text-slate-900 dark:text-[#F8FAFC] mb-1 leading-snug">
                  {mat.title}
                </h4>

                <div className="text-[11px] text-slate-400 dark:text-[#7F8795] mb-3">
                  Provider: <strong className="text-slate-700 dark:text-[#CBD5E1]">{mat.provider}</strong>
                </div>

                {/* Best Used For */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1015] border border-slate-200/80 dark:border-[#252932] mb-3 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider block mb-1">
                    Best Used For:
                  </span>
                  <p className="text-slate-700 dark:text-[#CBD5E1] leading-relaxed">
                    {mat.bestUsedFor}
                  </p>
                </div>

                {/* Stage & Relevant Units */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-[#7F8795] mb-2">
                  <span>Stage: <strong className="text-slate-800 dark:text-[#F8FAFC]">{mat.stage}</strong></span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Free / OER</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-100 dark:border-[#252932] mt-2">
                <a
                  href={mat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-brand-red text-white text-xs font-bold transition-all shadow-sm group"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open Resource</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
