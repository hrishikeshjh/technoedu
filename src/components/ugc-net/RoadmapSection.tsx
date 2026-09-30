import React, { useState } from 'react';
import { 
  Map, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Layers, 
  ArrowRight,
  Zap,
  Info,
  SlidersHorizontal
} from 'lucide-react';
import { 
  roadmapPhases, 
  roadmap24Weeks, 
  roadmap90Days, 
  roadmapComparison,
  RoadmapPhase,
  RoadmapWeek,
  Roadmap90DayWeek
} from '../../data/ugcNetData';

interface RoadmapSectionProps {
  completedWeeks: number[];
  onToggleWeekCompletion: (weekNum: number) => void;
}

export const RoadmapSection: React.FC<RoadmapSectionProps> = ({
  completedWeeks,
  onToggleWeekCompletion
}) => {
  const [activePlanType, setActivePlanType] = useState<'6-month' | '90-day'>('6-month');
  const [selectedPhaseId, setSelectedPhaseId] = useState<number>(1);
  const [expandedWeekNum, setExpandedWeekNum] = useState<number | null>(1);
  const [expandedPhaseId, setExpandedPhaseId] = useState<number | null>(1);

  const selectedPhase = roadmapPhases.find((p) => p.id === selectedPhaseId) || roadmapPhases[0];

  return (
    <section id="roadmap" className="py-12 sm:py-16 border-b border-slate-200 dark:border-[#252932] bg-white dark:bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-[#15171C] text-slate-800 dark:text-[#F8FAFC] border border-slate-200 dark:border-[#252932] text-xs font-bold uppercase tracking-wider mb-2">
            <span>04</span>
            <span className="text-brand-red">MASTER ROADMAP</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
                Calibrated Preparation Roadmaps
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-[#A7AFBD] max-w-2xl leading-relaxed">
                Choose between the comprehensive 6-Month Master Plan (24 Weeks) or the accelerated 90-Day Express Plan (12 Weeks) designed for working professionals.
              </p>
            </div>

            {/* Plan Switcher Toggle */}
            <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] shrink-0">
              <button
                onClick={() => setActivePlanType('6-month')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activePlanType === '6-month'
                    ? 'bg-slate-900 text-white dark:bg-brand-red shadow-sm'
                    : 'text-slate-600 dark:text-[#A7AFBD] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                6-MONTH MASTER PLAN (24 WEEKS)
              </button>
              <button
                onClick={() => setActivePlanType('90-day')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activePlanType === '90-day'
                    ? 'bg-slate-900 text-white dark:bg-brand-red shadow-sm'
                    : 'text-slate-600 dark:text-[#A7AFBD] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                90-DAY EXPRESS (12 WEEKS)
              </button>
            </div>
          </div>
        </div>

        {activePlanType === '6-month' ? (
          <>
            {/* SECTION 11: PLANNING VISUALIZATION (Preparation Roadmap Gantt Graph) */}
            <div className="rounded-2xl p-6 bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#252932] mb-10 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC] flex items-center gap-2">
                    <Map className="w-4 h-4 text-brand-red" />
                    Preparation Roadmap — 24 Weeks Progression Graph
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                    Planning visualization across 5 structured phases. Click any phase segment to inspect weekly goals.
                  </p>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-[#1A1D23] text-slate-700 dark:text-[#CBD5E1]">
                  Structural Planning Data
                </span>
              </div>

              {/* Gantt Bar Visualization */}
              <div className="space-y-2 mb-4">
                {/* 24-Week Horizontal Multi-Segment Bar */}
                <div className="relative w-full h-12 bg-slate-200 dark:bg-[#1C2028] rounded-xl overflow-hidden flex shadow-inner">
                  {/* Phase 1 (Weeks 1–6 = 25%) */}
                  <button
                    onClick={() => setSelectedPhaseId(1)}
                    style={{ width: `${(6 / 24) * 100}%` }}
                    className={`h-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex flex-col items-center justify-center border-r border-white/20 transition-all ${
                      selectedPhaseId === 1 ? 'ring-2 ring-emerald-300 ring-inset brightness-110' : ''
                    }`}
                    title="Phase 1: Foundation & Paper 1 Bedrock (Weeks 1–6)"
                  >
                    <span className="truncate px-1">Phase 1</span>
                    <span className="text-[10px] font-normal opacity-90 hidden sm:inline">W1–6</span>
                  </button>

                  {/* Phase 2 (Weeks 7–14 = 33.33%) */}
                  <button
                    onClick={() => setSelectedPhaseId(2)}
                    style={{ width: `${(8 / 24) * 100}%` }}
                    className={`h-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex flex-col items-center justify-center border-r border-white/20 transition-all ${
                      selectedPhaseId === 2 ? 'ring-2 ring-blue-300 ring-inset brightness-110' : ''
                    }`}
                    title="Phase 2: Core Domain & Quant Mastery (Weeks 7–14)"
                  >
                    <span className="truncate px-1">Phase 2</span>
                    <span className="text-[10px] font-normal opacity-90 hidden sm:inline">W7–14</span>
                  </button>

                  {/* Phase 3 (Weeks 15–18 = 16.67%) */}
                  <button
                    onClick={() => setSelectedPhaseId(3)}
                    style={{ width: `${(4 / 24) * 100}%` }}
                    className={`h-full bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex flex-col items-center justify-center border-r border-white/20 transition-all ${
                      selectedPhaseId === 3 ? 'ring-2 ring-amber-300 ring-inset brightness-110' : ''
                    }`}
                    title="Phase 3: Deep Synthesis & Revision (Weeks 15–18)"
                  >
                    <span className="truncate px-1">Phase 3</span>
                    <span className="text-[10px] font-normal opacity-90 hidden sm:inline">W15–18</span>
                  </button>

                  {/* Phase 4 (Weeks 19–22 = 16.67%) */}
                  <button
                    onClick={() => setSelectedPhaseId(4)}
                    style={{ width: `${(4 / 24) * 100}%` }}
                    className={`h-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex flex-col items-center justify-center border-r border-white/20 transition-all ${
                      selectedPhaseId === 4 ? 'ring-2 ring-purple-300 ring-inset brightness-110' : ''
                    }`}
                    title="Phase 4: PYQ Reverse Engineering (Weeks 19–22)"
                  >
                    <span className="truncate px-1">Phase 4</span>
                    <span className="text-[10px] font-normal opacity-90 hidden sm:inline">W19–22</span>
                  </button>

                  {/* Phase 5 (Weeks 23–24 = 8.33%) */}
                  <button
                    onClick={() => setSelectedPhaseId(5)}
                    style={{ width: `${(2 / 24) * 100}%` }}
                    className={`h-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex flex-col items-center justify-center transition-all ${
                      selectedPhaseId === 5 ? 'ring-2 ring-rose-300 ring-inset brightness-110' : ''
                    }`}
                    title="Phase 5: CBT Mock Marathon & Polish (Weeks 23–24)"
                  >
                    <span className="truncate px-1">Phase 5</span>
                    <span className="text-[10px] font-normal opacity-90 hidden sm:inline">W23–24</span>
                  </button>
                </div>

                {/* X-Axis Labels */}
                <div className="flex justify-between text-[10px] text-slate-400 dark:text-[#7F8795] font-semibold px-1">
                  <span>Week 1 (Start)</span>
                  <span>Week 6</span>
                  <span>Week 14</span>
                  <span>Week 18</span>
                  <span>Week 22</span>
                  <span>Week 24 (Exam Ready)</span>
                </div>
              </div>

              {/* Selected Phase Info Panel */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-brand-red uppercase tracking-wider">
                      {selectedPhase.title}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">•</span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-[#A7AFBD]">
                      {selectedPhase.weeksRange}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-[#CBD5E1]">
                    <strong>Phase Goal: </strong>{selectedPhase.goal}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setExpandedPhaseId(selectedPhase.id);
                      setExpandedWeekNum(selectedPhase.startWeek);
                      const el = document.getElementById(`week-row-${selectedPhase.startWeek}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-brand-red text-white text-xs font-semibold transition-all"
                  >
                    View Weeks {selectedPhase.startWeek}–{selectedPhase.endWeek}
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION 10: 5 EXPANDABLE PHASES CAROUSEL / PROGRESSION */}
            <div className="mb-10">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F8FAFC] mb-4">
                Five Master Preparation Phases
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {roadmapPhases.map((phase) => {
                  const isActive = expandedPhaseId === phase.id;
                  return (
                    <div
                      key={phase.id}
                      onClick={() => setExpandedPhaseId(isActive ? null : phase.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isActive
                          ? 'bg-slate-50 dark:bg-[#15171C] border-brand-red shadow-sm'
                          : 'bg-white dark:bg-[#111318] border-slate-200 dark:border-[#252932] hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-bold text-slate-400 dark:text-[#7F8795] mb-1">
                          <span>Phase {phase.id}</span>
                          <span>{phase.weeksRange}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC] leading-snug mb-2">
                          {phase.title.replace(`Phase ${phase.id}: `, '')}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-[#A7AFBD] line-clamp-3">
                          {phase.subtitle}
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-100 dark:border-[#252932] flex items-center justify-between text-[11px] font-semibold text-brand-red">
                        <span>{isActive ? 'Hide Weeks' : 'Expand Phase'}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isActive ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION 12: 24-WEEK DETAILED TIMELINE ACCORDION */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F8FAFC]">
                    Week-by-Week Preparation Timeline (Weeks 1 to 24)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                    Detailed weekly focus for Paper 1, Paper 2, activities, and required deliverables.
                  </p>
                </div>
                <div className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                  Completed: <strong className="text-slate-900 dark:text-white">{completedWeeks.length}</strong> / 24 Weeks
                </div>
              </div>

              <div className="space-y-3">
                {roadmap24Weeks.map((wk) => {
                  const isExpanded = expandedWeekNum === wk.week;
                  const isCompleted = completedWeeks.includes(wk.week);

                  return (
                    <div
                      key={wk.week}
                      id={`week-row-${wk.week}`}
                      className={`rounded-xl border transition-all ${
                        isExpanded
                          ? 'bg-white dark:bg-[#111318] border-brand-red/40 shadow-sm'
                          : 'bg-white dark:bg-[#111318] border-slate-200 dark:border-[#252932] hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      {/* Week Row Header */}
                      <div
                        onClick={() => setExpandedWeekNum(isExpanded ? null : wk.week)}
                        className="p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Week Number Tag */}
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                              : 'bg-slate-100 text-slate-700 dark:bg-[#15171C] dark:text-[#F8FAFC]'
                          }`}>
                            W{wk.week}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC]">
                                Week {wk.week}
                              </span>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-[#15171C] text-slate-500 dark:text-[#7F8795]">
                                {wk.phaseName}
                              </span>
                            </div>
                            <div className="text-xs text-slate-500 dark:text-[#A7AFBD] truncate mt-0.5">
                              P1: {wk.paper1Focus}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {/* Mark Week Completed */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleWeekCompletion(wk.week);
                            }}
                            className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                              isCompleted
                                ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30'
                                : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'
                            }`}
                            title={isCompleted ? 'Mark week as incomplete' : 'Mark week as completed'}
                          >
                            {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                          </button>

                          <div className="text-slate-400">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Week Content */}
                      {isExpanded && (
                        <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100 dark:border-[#252932] space-y-3.5 text-xs">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                            {/* Paper 1 Focus */}
                            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1015] border border-slate-200/80 dark:border-[#252932]">
                              <span className="text-[10px] font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider block mb-1">
                                Paper 1 Focus:
                              </span>
                              <span className="text-slate-800 dark:text-[#F8FAFC] leading-relaxed">
                                {wk.paper1Focus}
                              </span>
                            </div>

                            {/* Paper 2 Focus */}
                            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1015] border border-slate-200/80 dark:border-[#252932]">
                              <span className="text-[10px] font-bold text-brand-red uppercase tracking-wider block mb-1">
                                Paper 2 Focus:
                              </span>
                              <span className="text-slate-800 dark:text-[#F8FAFC] leading-relaxed">
                                {wk.paper2Focus}
                              </span>
                            </div>
                          </div>

                          {/* Activity & Deliverable */}
                          <div className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-1.5">
                            <div>
                              <strong className="text-amber-900 dark:text-amber-300">Activity: </strong>
                              <span className="text-amber-950 dark:text-amber-200">{wk.activity}</span>
                            </div>
                            <div>
                              <strong className="text-emerald-800 dark:text-emerald-300">Deliverable / Output: </strong>
                              <span className="text-emerald-950 dark:text-emerald-200 font-medium">{wk.deliverable}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          /* SECTION 13: 90-DAY EXPRESS FAST-TRACK ROADMAP */
          <div className="space-y-8">
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-blue-900 dark:text-blue-200 uppercase tracking-wider mb-0.5">
                  90-Day Express Fast-Track Architecture
                </h4>
                <p className="text-xs text-blue-950 dark:text-blue-200/90 leading-relaxed">
                  Designed for working professionals, post-graduate final-year students, or repeat candidates aiming to optimize their score under time constraints. Focuses on high-yield weightage matrix.
                </p>
              </div>
            </div>

            {/* 12-Week Visual Timeline Table / Grid */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#252932] shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-[#15171C] border-b border-slate-200 dark:border-[#252932] text-slate-700 dark:text-[#F8FAFC] font-bold">
                  <tr>
                    <th className="py-3 px-4 w-20">Week</th>
                    <th className="py-3 px-4 w-32">Focus Area</th>
                    <th className="py-3 px-4">Paper 1 Priority</th>
                    <th className="py-3 px-4">Paper 2 Priority</th>
                    <th className="py-3 px-4">Deliverable / Output</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#252932] bg-white dark:bg-[#111318]">
                  {roadmap90Days.map((item, idx) => (
                    <tr 
                      key={idx}
                      className="hover:bg-slate-50 dark:hover:bg-[#15171C] transition-colors"
                    >
                      <td className="py-3 px-4 font-black text-brand-red">
                        {item.week}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-[#F8FAFC]">
                        {item.focusArea}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-[#A7AFBD]">
                        {item.paper1Priority}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-[#A7AFBD]">
                        {item.paper2Priority}
                      </td>
                      <td className="py-3 px-4 font-medium text-emerald-700 dark:text-emerald-400">
                        {item.deliverable}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 14: ROADMAP COMPARISON (6-Month vs 90-Day Plan) */}
        <div className="mt-12 pt-10 border-t border-slate-200 dark:border-[#252932]">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-[#F8FAFC] mb-4">
            Roadmap Strategy Comparison: 6-Month vs. 90-Day Express
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#252932]">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-[#15171C] border-b border-slate-200 dark:border-[#252932] text-slate-700 dark:text-[#F8FAFC] font-bold">
                <tr>
                  <th className="py-3.5 px-4 w-1/4">Comparison Criterion</th>
                  <th className="py-3.5 px-4 w-3/8 text-emerald-700 dark:text-emerald-400">Long-Form Preparation (6-Month Plan)</th>
                  <th className="py-3.5 px-4 w-3/8 text-blue-700 dark:text-blue-400">Fast-Track Preparation (90-Day Plan)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#252932] bg-white dark:bg-[#111318]">
                {roadmapComparison.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-[#15171C] transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-[#F8FAFC]">
                      {row.parameter}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-[#A7AFBD] leading-relaxed">
                      {row.sixMonthPlan}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-[#A7AFBD] leading-relaxed">
                      {row.ninetyDayPlan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
