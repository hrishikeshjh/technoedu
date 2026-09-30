import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  CheckSquare, 
  Square, 
  Coffee, 
  BookOpen, 
  FileText, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { 
  fullTimeSchedule, 
  workingProfessionalSchedule, 
  DailyScheduleSlot 
} from '../../data/ugcNetData';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const PLANNER_ROWS = [
  { id: 'paper1', label: 'Paper 1 Concept Study' },
  { id: 'paper2', label: 'Paper 2 Domain Focus' },
  { id: 'pyq', label: 'PYQ Drill & Active Recall' },
  { id: 'revision', label: 'Flashcards & Revision' },
  { id: 'mock', label: 'Sectional / CBT Mock' },
  { id: 'errorLog', label: 'Error Log Update' },
];

const STORAGE_KEY_WEEKLY_PLAN = 'ugc_net_weekly_plan';

export const StudyPlannerSection: React.FC = () => {
  const [plannerTab, setPlannerTab] = useState<'full-time' | 'working'>('full-time');
  
  // Weekly grid checkboxes state: { 'Monday-paper1': true, ... }
  const [weeklyState, setWeeklyState] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WEEKLY_PLAN);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WEEKLY_PLAN, JSON.stringify(weeklyState));
    } catch {
      // Ignore localStorage errors
    }
  }, [weeklyState]);

  const toggleTask = (day: string, rowId: string) => {
    const key = `${day}-${rowId}`;
    setWeeklyState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const clearWeeklyPlanner = () => {
    if (window.confirm('Reset all checkboxes for this week?')) {
      setWeeklyState({});
    }
  };

  const getDayCompletedCount = (day: string) => {
    return PLANNER_ROWS.filter((r) => weeklyState[`${day}-${r.id}`]).length;
  };

  return (
    <section id="study-plan" className="py-12 sm:py-16 border-b border-slate-200 dark:border-[#252932] bg-slate-50/50 dark:bg-[#0B0C0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-[#15171C] text-slate-800 dark:text-[#F8FAFC] border border-slate-200 dark:border-[#252932] text-xs font-bold uppercase tracking-wider mb-2">
            <span>05</span>
            <span className="text-brand-red">STUDY PLAN</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
                Daily Study Planner &amp; Weekly Scheduler
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-[#A7AFBD] max-w-2xl leading-relaxed">
                Calibrated daily routines for full-time students and working professionals, coupled with an interactive weekly execution matrix saved to your browser.
              </p>
            </div>

            {/* Profile Tab Switcher */}
            <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] shrink-0">
              <button
                onClick={() => setPlannerTab('full-time')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  plannerTab === 'full-time'
                    ? 'bg-slate-900 text-white dark:bg-brand-red shadow-sm'
                    : 'text-slate-600 dark:text-[#A7AFBD] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>FULL-TIME (8–9 HRS/DAY)</span>
              </button>
              <button
                onClick={() => setPlannerTab('working')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  plannerTab === 'working'
                    ? 'bg-slate-900 text-white dark:bg-brand-red shadow-sm'
                    : 'text-slate-600 dark:text-[#A7AFBD] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>WORKING / PG (3.5–4.5 HRS)</span>
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 15: DAILY TIMETABLE (Visual Timeline) */}
        {plannerTab === 'full-time' ? (
          <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] mb-12 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 dark:border-[#252932] gap-2 mb-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F8FAFC] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-red" />
                  Full-Time Aspirant Calibrated Routine (07:00 to 22:30)
                </h3>
                <p className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                  Balanced distribution of theory, quantitative drills, domain depth, timed PYQs, and physical decompression.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/30">
                Total Study: ~8.5 Hours/Day
              </span>
            </div>

            {/* Vertical Flow Visual Timeline */}
            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-[#252932]">
              {fullTimeSchedule.map((slot, sIdx) => {
                const isBreak = slot.type === 'break';
                const isP1 = slot.type === 'study-p1';
                const isP2 = slot.type === 'study-p2';
                const isPractice = slot.type === 'practice';

                return (
                  <div key={sIdx} className="relative group">
                    {/* Timeline Node Dot */}
                    <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                      isBreak
                        ? 'bg-slate-100 border-slate-300 dark:bg-[#15171C] dark:border-slate-600'
                        : isP1
                        ? 'bg-blue-600 border-white dark:border-[#111318] ring-2 ring-blue-100 dark:ring-blue-950'
                        : isP2
                        ? 'bg-brand-red border-white dark:border-[#111318] ring-2 ring-red-100 dark:ring-red-950'
                        : 'bg-emerald-600 border-white dark:border-[#111318] ring-2 ring-emerald-100 dark:ring-emerald-950'
                    }`} />

                    <div className={`p-4 rounded-xl border transition-all ${
                      isBreak
                        ? 'bg-slate-50/60 dark:bg-[#0E1015]/60 border-slate-200/60 dark:border-[#252932]/60'
                        : 'bg-white dark:bg-[#15171C] border-slate-200 dark:border-[#252932] shadow-sm hover:border-slate-300 dark:hover:border-slate-700'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-black text-slate-900 dark:text-[#F8FAFC]">
                            {slot.timeSlot}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1A1D23] text-slate-500 dark:text-[#7F8795]">
                            {slot.duration}
                          </span>
                        </div>
                        <span className={`text-xs font-bold ${
                          isBreak
                            ? 'text-slate-500 dark:text-[#7F8795]'
                            : isP1
                            ? 'text-blue-600 dark:text-blue-400'
                            : isP2
                            ? 'text-brand-red'
                            : 'text-emerald-600 dark:text-emerald-400'
                        }`}>
                          {slot.component}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-[#A7AFBD]">
                        {slot.activity}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Working Professional / PG Schedule Visual Timeline */
          <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] mb-12 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 dark:border-[#252932] gap-2 mb-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F8FAFC] flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-brand-red" />
                  Working Professional / PG Student Calibrated Schedule
                </h3>
                <p className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                  Optimized for working hours: early morning deep theory, transit flashcard micro-habits, night domain sprints, and weekend marathons.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/30">
                Weekday: 3.5–4.5h · Weekend: 8h/day
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Morning Slot */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932]">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                    MORNING DEEP WORK
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-700 dark:text-[#F8FAFC]">
                    {workingProfessionalSchedule.morningSlot.time}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
                  {workingProfessionalSchedule.morningSlot.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-[#A7AFBD] leading-relaxed">
                  {workingProfessionalSchedule.morningSlot.description}
                </p>
              </div>

              {/* Transit & Micro-breaks */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932]">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                    TRANSIT &amp; COMMUTE
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-700 dark:text-[#F8FAFC]">
                    {workingProfessionalSchedule.transitMicroBreaks.duration}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
                  {workingProfessionalSchedule.transitMicroBreaks.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-[#A7AFBD] leading-relaxed">
                  {workingProfessionalSchedule.transitMicroBreaks.description}
                </p>
              </div>

              {/* Evening Slot */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932]">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300">
                    EVENING DOMAIN &amp; DI
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-700 dark:text-[#F8FAFC]">
                    {workingProfessionalSchedule.eveningSlot.time}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
                  {workingProfessionalSchedule.eveningSlot.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-[#A7AFBD] leading-relaxed">
                  {workingProfessionalSchedule.eveningSlot.description}
                </p>
              </div>

              {/* Weekend Sprint */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932]">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    WEEKEND SPRINT
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-700 dark:text-[#F8FAFC]">
                    {workingProfessionalSchedule.weekendSprint.duration}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
                  {workingProfessionalSchedule.weekendSprint.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-[#A7AFBD] leading-relaxed">
                  {workingProfessionalSchedule.weekendSprint.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 16: INTERACTIVE WEEKLY STUDY PLANNER */}
        <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 dark:border-[#252932] gap-4 mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F8FAFC] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-red" />
                Interactive Weekly Execution Matrix
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                Track daily execution across 6 essential dimensions. Saved locally to your browser.
              </p>
            </div>

            <button
              onClick={clearWeeklyPlanner}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-brand-red dark:text-[#A7AFBD] dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-[#15171C] transition-all self-start sm:self-center"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Week</span>
            </button>
          </div>

          {/* Interactive Responsive Grid */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-[#252932]">
            <table className="w-full text-center text-xs">
              <thead className="bg-slate-100 dark:bg-[#15171C] border-b border-slate-200 dark:border-[#252932] text-slate-700 dark:text-[#F8FAFC] font-bold">
                <tr>
                  <th className="py-3 px-4 text-left w-52">Daily Study Component</th>
                  {WEEK_DAYS.map((day) => (
                    <th key={day} className="py-3 px-3 min-w-[90px]">
                      <div>{day.slice(0, 3)}</div>
                      <div className="text-[10px] font-normal text-slate-400 dark:text-[#7F8795]">
                        {getDayCompletedCount(day)} / {PLANNER_ROWS.length}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#252932] bg-white dark:bg-[#111318]">
                {PLANNER_ROWS.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-[#15171C]/50 transition-colors">
                    <td className="py-3 px-4 text-left font-bold text-slate-900 dark:text-[#F8FAFC]">
                      {row.label}
                    </td>
                    {WEEK_DAYS.map((day) => {
                      const isChecked = Boolean(weeklyState[`${day}-${row.id}`]);
                      return (
                        <td key={day} className="py-3 px-3">
                          <button
                            type="button"
                            onClick={() => toggleTask(day, row.id)}
                            className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-all ${
                              isChecked
                                ? 'bg-emerald-600 text-white shadow-sm scale-105'
                                : 'bg-slate-100 hover:bg-slate-200 dark:bg-[#15171C] dark:hover:bg-[#1A1D23] text-slate-400'
                            }`}
                            title={`${day} - ${row.label}`}
                          >
                            {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                          </button>
                        </td>
                      );
                    })}
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
