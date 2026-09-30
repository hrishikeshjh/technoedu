import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  ExternalLink, 
  Zap, 
  Compass, 
  ListChecks,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { paper1Units, UgcPaper1Unit } from '../../data/ugcNetData';

interface Paper1SectionProps {
  completedUnits: string[];
  onToggleUnitCompletion: (unitId: string) => void;
}

export const Paper1Section: React.FC<Paper1SectionProps> = ({
  completedUnits,
  onToggleUnitCompletion
}) => {
  const [expandedUnitId, setExpandedUnitId] = useState<string | null>('unit-1');

  const toggleUnit = (unitId: string) => {
    setExpandedUnitId((prev) => (prev === unitId ? null : unitId));
  };

  const handleNodeClick = (unitId: string) => {
    setExpandedUnitId(unitId);
    const element = document.getElementById(`unit-card-${unitId}`);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="paper-1" className="py-12 sm:py-16 border-b border-slate-200 dark:border-[#252932] bg-slate-50/50 dark:bg-[#0B0C0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-[#15171C] text-slate-800 dark:text-[#F8FAFC] border border-slate-200 dark:border-[#252932] text-xs font-bold uppercase tracking-wider mb-2">
            <span>02</span>
            <span className="text-brand-red">PAPER 1</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
                General Paper on Teaching &amp; Research Aptitude
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-[#A7AFBD] max-w-2xl leading-relaxed">
                10 Core Units · 50 Compulsory Questions · 100 Marks. Master theoretical concepts, reasoning mechanics, and verified open educational resources.
              </p>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                Completed: <strong className="text-slate-900 dark:text-white">{completedUnits.length}</strong> / 10 Units
              </span>
              <div className="w-24 h-2 bg-slate-200 dark:bg-[#252932] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${(completedUnits.length / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 7: PAPER 1 VISUAL ROADMAP (Interactive Clickable Progression) */}
        <div className="rounded-2xl p-6 bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] mb-10 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC] flex items-center gap-2">
                <Compass className="w-4 h-4 text-brand-red" />
                Paper 1 Learning Progression Timeline
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                Click any unit node to jump directly to its syllabus breakdown, high-yield focus, and verified OER links.
              </p>
            </div>
            <span className="hidden sm:inline-block text-[11px] font-semibold text-slate-400 dark:text-[#7F8795]">
              Sequential Study Order
            </span>
          </div>

          {/* Horizontal scrollable roadmap timeline */}
          <div className="overflow-x-auto pb-2 scrollbar-thin">
            <div className="flex items-center min-w-[850px] justify-between relative py-4 px-2">
              {/* Timeline Connector Line */}
              <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-slate-200 dark:bg-[#252932] -z-0" />

              {paper1Units.map((u, i) => {
                const isCompleted = completedUnits.includes(u.id);
                const isSelected = expandedUnitId === u.id;
                return (
                  <button
                    key={u.id}
                    onClick={() => handleNodeClick(u.id)}
                    className="group relative z-10 flex flex-col items-center focus:outline-none"
                  >
                    {/* Circle Node */}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-sm ${
                        isCompleted
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 dark:ring-emerald-950/60'
                          : isSelected
                          ? 'bg-brand-red text-white ring-4 ring-red-100 dark:ring-red-950/60 scale-110'
                          : 'bg-white dark:bg-[#15171C] text-slate-700 dark:text-[#A7AFBD] border-2 border-slate-300 dark:border-[#252932] group-hover:border-brand-red group-hover:scale-105'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : u.number}
                    </div>

                    {/* Node Label */}
                    <div className="mt-2 text-center max-w-[76px]">
                      <span className={`text-[11px] font-semibold block truncate leading-tight ${
                        isSelected
                          ? 'text-brand-red font-bold'
                          : 'text-slate-600 dark:text-[#A7AFBD] group-hover:text-slate-900 dark:group-hover:text-white'
                      }`}>
                        {u.name.split(' ')[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION 6: 10 INTERACTIVE UNIT CARDS */}
        <div className="space-y-4">
          {paper1Units.map((unit) => {
            const isExpanded = expandedUnitId === unit.id;
            const isCompleted = completedUnits.includes(unit.id);

            return (
              <div
                key={unit.id}
                id={`unit-card-${unit.id}`}
                className={`rounded-2xl transition-all duration-200 border ${
                  isExpanded
                    ? 'bg-white dark:bg-[#111318] border-brand-red/40 shadow-md ring-1 ring-brand-red/20'
                    : 'bg-white dark:bg-[#111318] border-slate-200 dark:border-[#252932] hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
                }`}
              >
                {/* Unit Header Bar (Clickable) */}
                <div 
                  onClick={() => toggleUnit(unit.id)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Unit Number Badge */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                      isCompleted 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                        : 'bg-slate-100 text-slate-800 dark:bg-[#15171C] dark:text-[#F8FAFC]'
                    }`}>
                      {unit.number}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F8FAFC] truncate">
                          {unit.name}
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-[#15171C] text-slate-500 dark:text-[#7F8795]">
                          5 Questions · 10 Marks
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-[#A7AFBD] truncate mt-0.5">
                        {unit.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Chevron */}
                  <div className="flex items-center gap-3 shrink-0">
                    {/* Toggle Completion */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleUnitCompletion(unit.id);
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isCompleted
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : 'bg-slate-100 hover:bg-slate-200 dark:bg-[#15171C] dark:hover:bg-[#1A1D23] text-slate-600 dark:text-[#A7AFBD] border border-slate-200 dark:border-[#252932]'
                      }`}
                      title={isCompleted ? 'Mark as incomplete' : 'Mark unit as completed'}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span className="hidden sm:inline">Completed</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-3.5 h-3.5 text-slate-400" />
                          <span className="hidden sm:inline">Mark Done</span>
                        </>
                      )}
                    </button>

                    <div className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-[#F8FAFC]">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Detailed Content */}
                {isExpanded && (
                  <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-[#252932] space-y-6 animate-fadeIn">
                    
                    {/* 1. Official Syllabus Topics */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <ListChecks className="w-3.5 h-3.5 text-brand-red" />
                        Official Syllabus Topics (NTA UGC-NET)
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {unit.officialSyllabus.map((topic, tIdx) => (
                          <li 
                            key={tIdx}
                            className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1015] border border-slate-200/70 dark:border-[#252932] text-xs text-slate-700 dark:text-[#CBD5E1] leading-relaxed flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-red mt-1.5 shrink-0" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 2. High-Yield Exam Focus */}
                    <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
                      <h4 className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        High-Yield Exam Focus (Recurring Question Core)
                      </h4>
                      <ul className="space-y-1.5">
                        {unit.highYieldFocus.map((focus, fIdx) => (
                          <li key={fIdx} className="text-xs text-amber-900 dark:text-amber-200/90 leading-relaxed flex items-start gap-2">
                            <span className="font-bold text-amber-700 dark:text-amber-400 shrink-0">→</span>
                            <span>{focus}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 3. Verified Free Study Materials & OER Links */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-brand-red" />
                        Verified Free Study Materials &amp; OER Repositories
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {unit.freeStudyMaterials.map((mat, mIdx) => (
                          <a
                            key={mIdx}
                            href={mat.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] hover:border-brand-red/50 hover:bg-white dark:hover:bg-[#1A1D23] transition-all group flex items-start justify-between gap-2"
                          >
                            <div>
                              <div className="text-xs font-bold text-slate-800 dark:text-[#F8FAFC] group-hover:text-brand-red transition-colors">
                                {mat.title}
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 dark:text-[#7F8795]">
                                <span>{mat.platform}</span>
                                <span>•</span>
                                <span className="text-brand-darkred dark:text-red-400 font-medium">{mat.type}</span>
                              </div>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-red shrink-0 mt-0.5" />
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* 4. PYQ & Practice Action */}
                    <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC]">
                            Recommended Practice Action:
                          </div>
                          <p className="text-xs text-slate-600 dark:text-[#A7AFBD] mt-0.5">
                            {unit.pyqPracticeAction}
                          </p>
                        </div>
                      </div>

                      <a
                        href="https://ugcnet.nta.ac.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-brand-red text-white text-xs font-semibold transition-all shrink-0"
                      >
                        <span>Official PYQ Archive</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
