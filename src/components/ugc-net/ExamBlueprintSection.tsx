import React from 'react';
import { 
  FileText, 
  Layers, 
  Clock, 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  Target,
  Sparkles,
  ShieldCheck,
  Percent
} from 'lucide-react';
import { ugcNetOverview } from '../../data/ugcNetData';

export const ExamBlueprintSection: React.FC = () => {
  return (
    <section id="blueprint" className="py-12 sm:py-16 border-b border-slate-200 dark:border-[#252932] bg-white dark:bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-[#15171C] text-slate-800 dark:text-[#F8FAFC] border border-slate-200 dark:border-[#252932] text-xs font-bold uppercase tracking-wider mb-2">
            <span>01</span>
            <span className="text-brand-red">EXAM BLUEPRINT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Exam Architecture &amp; Pattern
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-[#A7AFBD] max-w-2xl leading-relaxed">
            The Computer Based Test (CBT) consists of two papers conducted in a single 180-minute session without break. Every question carries +2 marks with zero negative marking.
          </p>
        </div>

        {/* Two Large Cards: Paper 1 vs Paper 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Paper 1 Card */}
          <div className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-slate-50 to-white dark:from-[#111318] dark:to-[#15171C] border-2 border-slate-200 dark:border-[#252932] hover:border-brand-red/40 dark:hover:border-brand-red/40 transition-all shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-900 text-white dark:bg-[#1A1D23] dark:border dark:border-[#252932]">
                PAPER 1
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-[#A7AFBD]">
                33.3% of Total Marks
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] mb-2">
              General Teaching &amp; Research Aptitude
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A7AFBD] leading-relaxed mb-6">
              Assesses teaching abilities, research acumen, comprehension, mathematical reasoning, logical reasoning, data interpretation, ICT, environmental awareness, and higher education governance.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200 dark:border-[#252932]">
              <div className="p-3 rounded-xl bg-white dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932]">
                <div className="text-[10px] font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider">
                  Questions
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-[#F8FAFC]">
                  50
                </div>
                <div className="text-[11px] text-slate-500 dark:text-[#A7AFBD]">All Compulsory</div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932]">
                <div className="text-[10px] font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider">
                  Marks
                </div>
                <div className="text-2xl font-black text-brand-red">
                  100
                </div>
                <div className="text-[11px] text-slate-500 dark:text-[#A7AFBD]">+2 per question</div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-[#A7AFBD]">
              <span>10 Units · 5 Qs per Unit</span>
              <span className="font-semibold text-slate-800 dark:text-[#F8FAFC]">Target: 70+ / 100</span>
            </div>
          </div>

          {/* Paper 2 Card */}
          <div className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-slate-50 to-white dark:from-[#111318] dark:to-[#15171C] border-2 border-slate-200 dark:border-[#252932] hover:border-brand-red/40 dark:hover:border-brand-red/40 transition-all shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-brand-red text-white">
                PAPER 2
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-[#A7AFBD]">
                66.7% of Total Marks
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] mb-2">
              Subject Domain
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A7AFBD] leading-relaxed mb-6">
              Post-graduate domain-specific evaluation across the candidate’s chosen discipline from 83 subjects. Evaluates specialized concepts, advanced theories, and deep analytical domain depth.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200 dark:border-[#252932]">
              <div className="p-3 rounded-xl bg-white dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932]">
                <div className="text-[10px] font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider">
                  Questions
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-[#F8FAFC]">
                  100
                </div>
                <div className="text-[11px] text-slate-500 dark:text-[#A7AFBD]">All Compulsory</div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932]">
                <div className="text-[10px] font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider">
                  Marks
                </div>
                <div className="text-2xl font-black text-brand-red">
                  200
                </div>
                <div className="text-[11px] text-slate-500 dark:text-[#A7AFBD]">+2 per question</div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-[#A7AFBD]">
              <span>83 Subjects · PG Level Depth</span>
              <span className="font-semibold text-slate-800 dark:text-[#F8FAFC]">Target: 130+ / 200</span>
            </div>
          </div>

        </div>

        {/* Visual Proportional Representation of Paper 1 vs Paper 2 (1:2 Mark Distribution) */}
        <div className="rounded-2xl p-6 bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#252932] mb-10 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">
                Marks &amp; Questions Distribution (1 : 2 Proportion)
              </h4>
              <p className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                Total: 150 Questions · 300 Marks · 180 Minutes (3 Hours Continuous CBT)
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-[#F8FAFC]">
                <span className="w-3 h-3 rounded-sm bg-slate-800 dark:bg-slate-300" />
                Paper 1 (100 Marks)
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-[#F8FAFC]">
                <span className="w-3 h-3 rounded-sm bg-brand-red" />
                Paper 2 (200 Marks)
              </span>
            </div>
          </div>

          {/* Proportional Segmented Bar */}
          <div className="relative w-full h-8 bg-slate-200 dark:bg-[#1C2028] rounded-xl overflow-hidden flex shadow-inner">
            <div 
              style={{ width: '33.333%' }}
              className="h-full bg-slate-900 dark:bg-slate-300 flex items-center justify-center text-white dark:text-slate-900 text-xs font-bold transition-all"
            >
              Paper 1: 100 Marks (33.3%)
            </div>
            <div 
              style={{ width: '66.667%' }}
              className="h-full bg-brand-red flex items-center justify-center text-white text-xs font-bold transition-all"
            >
              Paper 2: 200 Marks (66.7%)
            </div>
          </div>

          {/* Quick Metrics Bar below chart */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-center">
            <div className="p-2.5 rounded-lg bg-white dark:bg-[#15171C] border border-slate-200 dark:border-[#252932]">
              <span className="text-[10px] text-slate-400 dark:text-[#7F8795] uppercase font-bold block">Paper 1 Questions</span>
              <span className="text-base font-extrabold text-slate-900 dark:text-[#F8FAFC]">50 Questions</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-[#15171C] border border-slate-200 dark:border-[#252932]">
              <span className="text-[10px] text-slate-400 dark:text-[#7F8795] uppercase font-bold block">Paper 2 Questions</span>
              <span className="text-base font-extrabold text-slate-900 dark:text-[#F8FAFC]">100 Questions</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-[#15171C] border border-slate-200 dark:border-[#252932]">
              <span className="text-[10px] text-slate-400 dark:text-[#7F8795] uppercase font-bold block">Total Mark Pool</span>
              <span className="text-base font-extrabold text-brand-red">300 Marks</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-[#15171C] border border-slate-200 dark:border-[#252932]">
              <span className="text-[10px] text-slate-400 dark:text-[#7F8795] uppercase font-bold block">Negative Marking</span>
              <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">Zero (0) Penalty</span>
            </div>
          </div>
        </div>

        {/* Section 5: What Can UGC-NET Qualify You For? (3 Eligibility Categories) */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
              What Can UGC-NET Qualify You For?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-[#A7AFBD] mt-1">
              Per recent UGC Gazette policy, UGC-NET scores determine qualification across three distinct outcome categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ugcNetOverview.eligibilityCategories.map((cat, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-6 bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] shadow-sm flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 dark:bg-[#15171C] text-slate-800 dark:text-[#F8FAFC] border border-slate-200 dark:border-[#252932]">
                      {cat.categoryNumber}
                    </span>
                    <span className="text-[10px] font-bold text-brand-red dark:text-red-400">
                      {cat.badge}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-[#F8FAFC] mb-2 leading-snug">
                    {cat.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-[#A7AFBD] leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-[#252932] text-[11px] text-slate-500 dark:text-[#7F8795]">
                  <span className="font-semibold text-slate-700 dark:text-[#A7AFBD]">Validity: </span>
                  {cat.validity}
                </div>
              </div>
            ))}
          </div>

          {/* Safe Target Score Benchmarks */}
          <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#252932] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-brand-red shrink-0" />
              <span className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC]">
                Safe Score Benchmarks (from Source Document):
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-[#A7AFBD]">
              <span><strong className="text-slate-900 dark:text-white">Paper 1:</strong> 70+ / 100</span>
              <span>•</span>
              <span><strong className="text-slate-900 dark:text-white">Paper 2:</strong> 130+ / 200</span>
              <span>•</span>
              <span><strong className="text-brand-red">JRF Safe Target:</strong> 200–210+ / 300 (67–70%+)</span>
              <span>•</span>
              <span><strong className="text-slate-900 dark:text-white">Assistant Prof Target:</strong> 170–185+ / 300</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
