import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  FileCheck2, 
  AlertCircle, 
  RotateCcw,
  Sparkles,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { 
  mockMarathonSchedule, 
  cbt3PassStrategy, 
  MockTestCalendarItem 
} from '../../data/ugcNetData';

export interface MockResultLog {
  mockId: string;
  score: string;
  timeSpentMins: string;
  conceptualErrors: string;
  misreadingErrors: string;
  calculationErrors: string;
  topicsToRevise: string;
  completedDate: string;
}

const STORAGE_KEY_MOCK_LOGS = 'ugc_net_mock_autopsy_logs';

export const MocksAndStrategySection: React.FC = () => {
  const [mockLogs, setMockLogs] = useState<Record<string, MockResultLog>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MOCK_LOGS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeMockId, setActiveMockId] = useState<string>('mock-1');
  const [formScore, setFormScore] = useState('');
  const [formTime, setFormTime] = useState('');
  const [formConceptual, setFormConceptual] = useState('');
  const [formMisreading, setFormMisreading] = useState('');
  const [formCalculation, setFormCalculation] = useState('');
  const [formTopics, setFormTopics] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MOCK_LOGS, JSON.stringify(mockLogs));
    } catch {
      // Ignore localStorage errors
    }
  }, [mockLogs]);

  useEffect(() => {
    const existing = mockLogs[activeMockId];
    if (existing) {
      setFormScore(existing.score || '');
      setFormTime(existing.timeSpentMins || '');
      setFormConceptual(existing.conceptualErrors || '');
      setFormMisreading(existing.misreadingErrors || '');
      setFormCalculation(existing.calculationErrors || '');
      setFormTopics(existing.topicsToRevise || '');
    } else {
      setFormScore('');
      setFormTime('');
      setFormConceptual('');
      setFormMisreading('');
      setFormCalculation('');
      setFormTopics('');
    }
  }, [activeMockId, mockLogs]);

  const handleSaveMockAutopsy = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: MockResultLog = {
      mockId: activeMockId,
      score: formScore,
      timeSpentMins: formTime,
      conceptualErrors: formConceptual,
      misreadingErrors: formMisreading,
      calculationErrors: formCalculation,
      topicsToRevise: formTopics,
      completedDate: new Date().toISOString().split('T')[0],
    };

    setMockLogs((prev) => ({
      ...prev,
      [activeMockId]: entry,
    }));
  };

  const handleClearMockAutopsy = (mockId: string) => {
    const newLogs = { ...mockLogs };
    delete newLogs[mockId];
    setMockLogs(newLogs);
  };

  return (
    <section id="mocks" className="py-12 sm:py-16 border-b border-slate-200 dark:border-[#252932] bg-white dark:bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-[#15171C] text-slate-800 dark:text-[#F8FAFC] border border-slate-200 dark:border-[#252932] text-xs font-bold uppercase tracking-wider mb-2">
            <span>08</span>
            <span className="text-brand-red">MOCKS &amp; REVISION</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            CBT Mock Marathon &amp; 3-Pass Exam-Day Strategy
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-[#A7AFBD] max-w-2xl leading-relaxed">
            Phase 5 conditioning: 5 full-length 180-minute simulations with systematic 2-hour post-mock autopsies and test-day time management.
          </p>
        </div>

        {/* SECTION 26: 3-PASS CBT STRATEGY (Visual Horizontal Timeline) */}
        <div className="rounded-2xl p-6 sm:p-8 bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#252932] mb-12 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-[#252932] gap-2 mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F8FAFC] flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-red" />
                The 3-Pass CBT Exam-Day Strategy (180 Minutes Uninterrupted)
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                Never get stuck on difficult questions. Divide your 3 hours into 3 disciplined waves.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-50 text-brand-darkred border border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/30">
              100% Attempt Guarantee
            </span>
          </div>

          {/* 3 Horizontal Wave Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
            {cbt3PassStrategy.map((pass, pIdx) => (
              <div
                key={pIdx}
                className="p-5 rounded-xl bg-white dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-md text-xs font-black bg-slate-900 text-white dark:bg-[#1A1D23] dark:border dark:border-[#252932]">
                      {pass.pass}
                    </span>
                    <span className="font-mono text-xs font-bold text-brand-red">
                      {pass.time}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
                    {pass.objective}
                  </h4>

                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#0E1015] border border-slate-200/80 dark:border-[#252932] mb-3 text-xs">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-[#7F8795] uppercase block mb-1">
                      Question Types:
                    </span>
                    <span className="text-slate-700 dark:text-[#CBD5E1] leading-relaxed">
                      {pass.questionTypes}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-[#A7AFBD] leading-relaxed mb-4">
                    {pass.action}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-[#252932] text-xs font-bold text-slate-800 dark:text-[#F8FAFC] flex items-center justify-between">
                  <span>Target:</span>
                  <span className="text-brand-red">{pass.targetQuestions}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Crucial NTA Test Rule: </strong>Because there is <strong>NO negative marking</strong> in UGC-NET, never leave any question unattempted before submitting. In Pass 3, ensure all 150 questions have an active choice selected.
            </span>
          </div>
        </div>

        {/* SECTION 25: CBT MOCK MARATHON TEST CALENDAR & POST-MOCK AUTOPSY */}
        <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 dark:border-[#252932] gap-4 mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F8FAFC] flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-red" />
                CBT Mock Marathon Schedule (Weeks 23 &amp; 24)
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                Week 23: 3 Full Tests · Week 24: 2 Full Tests. Record your scores and post-mock autopsy below.
              </p>
            </div>

            <a
              href="https://nta.ac.in/quiz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-brand-red text-white text-xs font-bold transition-all shrink-0 shadow-sm"
            >
              <span>NTA Official Mock Engine</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Test Calendar Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-8">
            {mockMarathonSchedule.map((mock) => {
              const isSelected = activeMockId === mock.id;
              const hasLogged = Boolean(mockLogs[mock.id]);

              return (
                <button
                  key={mock.id}
                  onClick={() => setActiveMockId(mock.id)}
                  className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900 text-white dark:bg-brand-red dark:text-white border-transparent shadow-md'
                      : 'bg-slate-50 dark:bg-[#15171C] border-slate-200 dark:border-[#252932] hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-[#CBD5E1]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                      <span className={isSelected ? 'text-white/80' : 'text-slate-400 dark:text-[#7F8795]'}>
                        Week {mock.week}
                      </span>
                      {hasLogged && (
                        <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-500'}`} />
                      )}
                    </div>
                    <div className="text-xs font-bold leading-tight line-clamp-1 mb-1">
                      Mock #{mock.testNumber}
                    </div>
                  </div>

                  <div className="text-[10px] font-mono opacity-80 pt-2 border-t border-slate-200/40 dark:border-white/10">
                    {hasLogged ? `Score: ${mockLogs[mock.id].score}/300` : mock.targetScore}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Mock Diagnostic & Autopsy Form */}
          {(() => {
            const currentMock = mockMarathonSchedule.find((m) => m.id === activeMockId) || mockMarathonSchedule[0];
            const currentLog = mockLogs[activeMockId];

            return (
              <div className="p-5 sm:p-6 rounded-xl bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-[#252932] gap-2 mb-4">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-[#1A1D23] text-slate-700 dark:text-[#CBD5E1] mr-2">
                      Week {currentMock.week}
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">
                      {currentMock.title} (180 Mins · 150 Qs · 300 Marks)
                    </span>
                  </div>

                  {currentLog && (
                    <button
                      onClick={() => handleClearMockAutopsy(currentMock.id)}
                      className="text-xs font-semibold text-slate-400 hover:text-red-500 flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset Mock Data</span>
                    </button>
                  )}
                </div>

                {/* Autopsy Checklist from Source */}
                <div className="mb-6">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider block mb-2">
                    Recommended 2-Hour Post-Mock Autopsy Checklist:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {currentMock.autopsyChecklist.map((item, idx) => (
                      <li key={idx} className="p-2.5 rounded-lg bg-white dark:bg-[#15171C] border border-slate-200/80 dark:border-[#252932] text-xs text-slate-700 dark:text-[#CBD5E1] flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interactive Autopsy Input Form */}
                <form onSubmit={handleSaveMockAutopsy} className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-[#A7AFBD] mb-1">
                        Score (out of 300)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="300"
                        value={formScore}
                        onChange={(e) => setFormScore(e.target.value)}
                        placeholder="e.g. 195"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-red font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-[#A7AFBD] mb-1">
                        Time Taken (mins)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="180"
                        value={formTime}
                        onChange={(e) => setFormTime(e.target.value)}
                        placeholder="e.g. 175"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-red font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-red-600 mb-1">
                        Conceptual Errors
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formConceptual}
                        onChange={(e) => setFormConceptual(e.target.value)}
                        placeholder="e.g. 8"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-red font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-amber-600 mb-1">
                        Misreading Errors
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formMisreading}
                        onChange={(e) => setFormMisreading(e.target.value)}
                        placeholder="e.g. 4"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-red font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-blue-600 mb-1">
                        Calculation Errors
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formCalculation}
                        onChange={(e) => setFormCalculation(e.target.value)}
                        placeholder="e.g. 2"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-red font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-[#A7AFBD] mb-1">
                      Topics Identified to Revise Before Next Mock:
                    </label>
                    <input
                      type="text"
                      value={formTopics}
                      onChange={(e) => setFormTopics(e.target.value)}
                      placeholder="e.g. Square of Opposition contrary rules, NEP 2020 verticals, Indifference curve"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-red"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-brand-red text-white text-xs font-bold transition-all shadow-sm"
                    >
                      Save Mock Autopsy Entry
                    </button>
                  </div>
                </form>
              </div>
            );
          })()}

        </div>

      </div>
    </section>
  );
};
