import React from 'react';
import { 
  BarChart2, 
  CheckCircle2, 
  Flame, 
  Target, 
  Award, 
  RotateCcw,
  BookOpen,
  Map,
  HelpCircle
} from 'lucide-react';

interface ProgressDashboardProps {
  completedPaper1Units: string[];
  completedCsUnits: number[];
  completedRoadmapWeeks: number[];
  loggedErrorsCount: number;
  completedMocksCount: number;
  studyStreakDays: number;
  onResetProgress: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  completedPaper1Units,
  completedCsUnits,
  completedRoadmapWeeks,
  loggedErrorsCount,
  completedMocksCount,
  studyStreakDays,
  onResetProgress
}) => {
  const paper1Pct = Math.round((completedPaper1Units.length / 10) * 100);
  const paper2Pct = Math.round((completedCsUnits.length / 10) * 100);
  const roadmapPct = Math.round((completedRoadmapWeeks.length / 24) * 100);
  const mocksPct = Math.round((completedMocksCount / 5) * 100);

  // Overall syllabus completion (average of Paper 1 and Paper 2 CS units)
  const totalCompletedUnits = completedPaper1Units.length + completedCsUnits.length;
  const totalUnits = 20; // 10 P1 + 10 P2 CS
  const overallCompletionPct = Math.round((totalCompletedUnits / totalUnits) * 100);

  // SVG Donut calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallCompletionPct / 100) * circumference;

  return (
    <section id="progress" className="py-8 bg-slate-50/70 dark:bg-[#0B0C0F] border-b border-slate-200 dark:border-[#252932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red uppercase tracking-wider mb-1">
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Aspirant Analytics</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-[#F8FAFC]">
              My Preparation Progress
            </h2>
            <p className="text-xs text-slate-500 dark:text-[#A7AFBD] mt-0.5">
              Live tracking powered by your local study actions. 0% baseline until you mark units or weeks complete.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {totalCompletedUnits > 0 && (
              <button
                onClick={onResetProgress}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-[#15171C] transition-all"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset My Progress</span>
              </button>
            )}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          
          {/* SECTION 24: SYLLABUS COVERAGE DONUT & SEGMENTATION */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] shadow-sm flex flex-col items-center justify-center text-center">
            <span className="text-[11px] font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider mb-3">
              Total Syllabus Coverage
            </span>

            {/* SVG Interactive Donut */}
            <div className="relative w-28 h-28 flex items-center justify-center my-2">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="stroke-slate-100 dark:stroke-[#1F232B]"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Progress Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="stroke-brand-red transition-all duration-700 ease-out"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-900 dark:text-[#F8FAFC]">
                  {overallCompletionPct}%
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#7F8795]">
                  Finished
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-500 dark:text-[#A7AFBD] mt-2">
              <strong className="text-slate-900 dark:text-white">{totalCompletedUnits}</strong> of {totalUnits} Units Completed
            </div>

            {/* Paper 1 vs Paper 2 Breakdown Pills */}
            <div className="w-full grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-[#252932] text-xs">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-[#15171C]">
                <span className="text-[10px] text-slate-400 block font-bold">Paper 1</span>
                <span className="font-extrabold text-slate-900 dark:text-[#F8FAFC]">
                  {completedPaper1Units.length} / 10
                </span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-[#15171C]">
                <span className="text-[10px] text-slate-400 block font-bold">Paper 2</span>
                <span className="font-extrabold text-slate-900 dark:text-[#F8FAFC]">
                  {completedCsUnits.length} / 10
                </span>
              </div>
            </div>
          </div>

          {/* 3 Columns of Metric Progress Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            
            {/* Metric 1: Paper 1 Units */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 dark:text-[#7F8795] mb-2">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                    Paper 1 Syllabus
                  </span>
                  <span>{paper1Pct}%</span>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-[#F8FAFC] mb-1">
                  {completedPaper1Units.length} / 10 Units
                </div>
                <p className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                  {10 - completedPaper1Units.length} units remaining
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-100 dark:bg-[#1F232B] rounded-full overflow-hidden mt-4">
                <div
                  className="h-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${paper1Pct}%` }}
                />
              </div>
            </div>

            {/* Metric 2: Paper 2 CS Units */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 dark:text-[#7F8795] mb-2">
                  <span className="flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-brand-red" />
                    Paper 2 Domain (CS)
                  </span>
                  <span>{paper2Pct}%</span>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-[#F8FAFC] mb-1">
                  {completedCsUnits.length} / 10 Units
                </div>
                <p className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                  {10 - completedCsUnits.length} units remaining
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-100 dark:bg-[#1F232B] rounded-full overflow-hidden mt-4">
                <div
                  className="h-full bg-brand-red transition-all duration-500"
                  style={{ width: `${paper2Pct}%` }}
                />
              </div>
            </div>

            {/* Metric 3: 24-Week Roadmap */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 dark:text-[#7F8795] mb-2">
                  <span className="flex items-center gap-1.5">
                    <Map className="w-3.5 h-3.5 text-emerald-500" />
                    Roadmap Weeks
                  </span>
                  <span>{roadmapPct}%</span>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-[#F8FAFC] mb-1">
                  {completedRoadmapWeeks.length} / 24 Wks
                </div>
                <p className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                  {24 - completedRoadmapWeeks.length} weeks to exam readiness
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-100 dark:bg-[#1F232B] rounded-full overflow-hidden mt-4">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${roadmapPct}%` }}
                />
              </div>
            </div>

            {/* Metric 4: Mocks Completed */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 dark:text-[#7F8795] mb-2">
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-purple-500" />
                    CBT Simulations
                  </span>
                  <span>{mocksPct}%</span>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-[#F8FAFC] mb-1">
                  {completedMocksCount} / 5 Mocks
                </div>
                <p className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                  Phase 5 Marathon target
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-100 dark:bg-[#1F232B] rounded-full overflow-hidden mt-4">
                <div
                  className="h-full bg-purple-500 transition-all duration-500"
                  style={{ width: `${mocksPct}%` }}
                />
              </div>
            </div>

            {/* Metric 5: Error Log Size */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 dark:text-[#7F8795] mb-2">
                  <span className="flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                    Errors Logged
                  </span>
                  <span className="text-[10px] text-amber-600 font-bold">Autopsy</span>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-[#F8FAFC] mb-1">
                  {loggedErrorsCount} Items
                </div>
                <p className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                  Tracked in your Error Notebook
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#252932] text-[11px] text-slate-400">
                Categorized for targeted revision
              </div>
            </div>

            {/* Metric 6: Study Streak */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 dark:text-[#7F8795] mb-2">
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-orange-500" />
                    Consistency
                  </span>
                  <span className="text-[10px] text-orange-600 font-bold">Active</span>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-[#F8FAFC] mb-1 flex items-center gap-2">
                  <span>{studyStreakDays}</span>
                  <span className="text-sm font-normal text-slate-500">Days Active</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                  Daily execution habits
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#252932] text-[11px] text-slate-400">
                Every study day compounds into JRF cutoffs
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
