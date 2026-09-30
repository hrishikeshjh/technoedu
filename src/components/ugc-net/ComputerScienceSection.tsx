import React, { useState } from 'react';
import { 
  Code2, 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  BookOpen, 
  Cpu, 
  HelpCircle,
  Lightbulb,
  ListOrdered
} from 'lucide-react';
import { cs10Units, UgcCsUnit } from '../../data/ugcNetData';

interface ComputerScienceSectionProps {
  completedCsUnits: number[];
  onToggleCsUnitCompletion: (unitId: number) => void;
}

export const ComputerScienceSection: React.FC<ComputerScienceSectionProps> = ({
  completedCsUnits,
  onToggleCsUnitCompletion
}) => {
  const [selectedUnitId, setSelectedUnitId] = useState<number>(1);

  const activeUnit = cs10Units.find((u) => u.id === selectedUnitId) || cs10Units[0];

  return (
    <section id="cs-detailed-section" className="py-12 sm:py-16 border-b border-slate-200 dark:border-[#252932] bg-slate-50/50 dark:bg-[#0B0C0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-50 dark:bg-red-950/40 text-brand-darkred dark:text-red-400 border border-red-200 dark:border-red-900/40 text-xs font-bold uppercase tracking-wider mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>SUBJECT 87 DEEP DIVE</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
                Computer Science &amp; Applications — 10 Core Units
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-[#A7AFBD] max-w-2xl leading-relaxed">
                Complete unit breakdown for Subject 87 with recommended sequencing, algorithmic problem sets, verified NPTEL/MIT OCW modules, and PYQ focus areas.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                Completed: <strong className="text-slate-900 dark:text-white">{completedCsUnits.length}</strong> / 10 Units
              </span>
              <div className="w-24 h-2 bg-slate-200 dark:bg-[#252932] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${(completedCsUnits.length / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 10-Unit Navigation Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-8">
          {cs10Units.map((unit) => {
            const isSelected = selectedUnitId === unit.id;
            const isCompleted = completedCsUnits.includes(unit.id);

            return (
              <button
                key={unit.id}
                onClick={() => setSelectedUnitId(unit.id)}
                className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between min-h-[72px] ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-brand-red dark:text-white border-transparent shadow-md'
                    : 'bg-white dark:bg-[#111318] border-slate-200 dark:border-[#252932] text-slate-700 dark:text-[#CBD5E1] hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className={isSelected ? 'text-white/80' : 'text-slate-400 dark:text-[#7F8795]'}>
                    Unit {unit.id}
                  </span>
                  {isCompleted && (
                    <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-500'}`} />
                  )}
                </div>
                <div className="text-xs font-bold leading-tight line-clamp-2">
                  {unit.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Unit Detailed Showcase Card */}
        <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] shadow-sm">
          
          {/* Header of Active Unit */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 dark:border-[#252932] gap-4 mb-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-brand-red/10 dark:bg-brand-red/20 text-brand-red flex items-center justify-center font-black text-lg shrink-0">
                {activeUnit.id}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider">
                    Unit {activeUnit.id} of 10
                  </span>
                  <span>•</span>
                  <span className="text-xs font-semibold text-brand-red flex items-center gap-1">
                    <ListOrdered className="w-3.5 h-3.5" />
                    Recommended Sequence: #{activeUnit.recommendedSequence}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                  {activeUnit.name}
                </h3>
              </div>
            </div>

            {/* Toggle Completion */}
            <button
              onClick={() => onToggleCsUnitCompletion(activeUnit.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                completedCsUnits.includes(activeUnit.id)
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-[#15171C] dark:hover:bg-[#1A1D23] text-slate-700 dark:text-[#CBD5E1] border border-slate-200 dark:border-[#252932]'
              }`}
            >
              {completedCsUnits.includes(activeUnit.id) ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Unit Marked Completed</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-slate-400" />
                  <span>Mark Unit Completed</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Syllabus Topics & Study Resources */}
            <div className="lg:col-span-2 space-y-6">
              {/* Topics */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider mb-3">
                  Core Topics to Master:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeUnit.topics.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1015] border border-slate-200/80 dark:border-[#252932] text-xs text-slate-700 dark:text-[#CBD5E1] flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-red mt-1.5 shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Study Resources */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider mb-3">
                  Curated OER Courseware &amp; Repositories:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeUnit.studyResources.map((res, rIdx) => (
                    <a
                      key={rIdx}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] hover:border-brand-red/40 transition-all flex items-start justify-between gap-3 group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC] group-hover:text-brand-red transition-colors">
                          {res.title}
                        </div>
                        <div className="text-[11px] text-slate-400 dark:text-[#7F8795] mt-1">
                          Platform: <span className="font-semibold text-slate-600 dark:text-[#CBD5E1]">{res.platform}</span>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-red shrink-0 mt-0.5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 1 Col: Strategy Notes & PYQ Focus */}
            <div className="space-y-4">
              {/* Unit Notes */}
              <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider mb-2">
                  <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Strategy &amp; Exam Tips
                </div>
                <p className="text-xs text-blue-950 dark:text-blue-200 leading-relaxed">
                  {activeUnit.notes}
                </p>
              </div>

              {/* PYQ Recurring Focus */}
              <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider mb-2">
                  <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  PYQ Recurring Questions Focus
                </div>
                <p className="text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
                  {activeUnit.pyqFocus}
                </p>
              </div>

              {/* Quick Official Portal Link */}
              <div className="pt-2">
                <a
                  href="https://epgp.inflibnet.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-brand-red text-white text-xs font-bold transition-all shadow-sm"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open e-PG Pathshala CS Modules</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
