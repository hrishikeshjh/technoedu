import React, { useState, useEffect, useMemo } from 'react';
import { 
  HelpCircle, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Trash2, 
  Plus, 
  FileEdit, 
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { 
  pyqTypologies, 
  pyqPreparationTimeline, 
  PyqTypology 
} from '../../data/ugcNetData';

export interface ErrorLogEntry {
  id: string;
  question: string;
  topic: string;
  errorType: 'Conceptual' | 'Misreading' | 'Calculation';
  correctConcept: string;
  date: string;
  revisionStatus: 'Needs Revision' | 'Revised';
}

const STORAGE_KEY_ERROR_LOG = 'ugc_net_error_log';

export const PyqStrategySection: React.FC = () => {
  const [expandedTypologyId, setExpandedTypologyId] = useState<string | null>('assertion-reason');

  // Error Log State
  const [errorLogs, setErrorLogs] = useState<ErrorLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ERROR_LOG);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Form State
  const [newQuestion, setNewQuestion] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [newErrorType, setNewErrorType] = useState<'Conceptual' | 'Misreading' | 'Calculation'>('Conceptual');
  const [newCorrectConcept, setNewCorrectConcept] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ERROR_LOG, JSON.stringify(errorLogs));
    } catch {
      // Ignore localStorage errors
    }
  }, [errorLogs]);

  const handleAddError = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newTopic.trim()) return;

    const entry: ErrorLogEntry = {
      id: Date.now().toString(),
      question: newQuestion.trim(),
      topic: newTopic.trim(),
      errorType: newErrorType,
      correctConcept: newCorrectConcept.trim() || 'Review foundational notes and re-solve.',
      date: new Date().toISOString().split('T')[0],
      revisionStatus: 'Needs Revision',
    };

    setErrorLogs([entry, ...errorLogs]);
    setNewQuestion('');
    setNewTopic('');
    setNewCorrectConcept('');
    setShowAddForm(false);
  };

  const handleDeleteError = (id: string) => {
    setErrorLogs(errorLogs.filter((item) => item.id !== id));
  };

  const handleToggleRevision = (id: string) => {
    setErrorLogs(
      errorLogs.map((item) =>
        item.id === id
          ? {
              ...item,
              revisionStatus: item.revisionStatus === 'Needs Revision' ? 'Revised' : 'Needs Revision',
            }
          : item
      )
    );
  };

  // Error distribution metrics
  const distribution = useMemo(() => {
    const conceptual = errorLogs.filter((e) => e.errorType === 'Conceptual').length;
    const misreading = errorLogs.filter((e) => e.errorType === 'Misreading').length;
    const calculation = errorLogs.filter((e) => e.errorType === 'Calculation').length;
    const total = errorLogs.length;

    return {
      conceptual,
      misreading,
      calculation,
      total,
      pctConceptual: total ? Math.round((conceptual / total) * 100) : 0,
      pctMisreading: total ? Math.round((misreading / total) * 100) : 0,
      pctCalculation: total ? Math.round((calculation / total) * 100) : 0,
    };
  }, [errorLogs]);

  return (
    <section id="pyq-strategy" className="py-12 sm:py-16 border-b border-slate-200 dark:border-[#252932] bg-white dark:bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-[#15171C] text-slate-800 dark:text-[#F8FAFC] border border-slate-200 dark:border-[#252932] text-xs font-bold uppercase tracking-wider mb-2">
            <span>05</span>
            <span className="text-brand-red">PYQ STRATEGY</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            PYQ Reverse-Engineering &amp; Error Log System
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-[#A7AFBD] max-w-2xl leading-relaxed">
            Deconstruct the 5 NTA question typologies, follow the chronological 2020–2024 preparation timeline, and log every mistake in your personalized Error Log.
          </p>
        </div>

        {/* SECTION 20: 5 QUESTION TYPOLOGIES CARDS */}
        <div className="mb-12">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F8FAFC] mb-4">
            Master the 5 UGC-NET Question Typologies
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pyqTypologies.map((typology) => {
              const isExpanded = expandedTypologyId === typology.id;

              return (
                <div
                  key={typology.id}
                  className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                    isExpanded
                      ? 'bg-slate-50/70 dark:bg-[#111318] border-brand-red shadow-sm'
                      : 'bg-white dark:bg-[#111318] border-slate-200 dark:border-[#252932] hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-brand-darkred dark:bg-red-950/40 dark:text-red-400">
                        {typology.subtitle}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-[#F8FAFC] mb-2">
                      {typology.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-[#A7AFBD] leading-relaxed mb-4">
                      {typology.nature}
                    </p>

                    {isExpanded && (
                      <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-[#252932] text-xs animate-fadeIn">
                        <div>
                          <strong className="text-slate-900 dark:text-white block mb-1">
                            Execution Strategy:
                          </strong>
                          <ul className="space-y-1.5 pl-3 list-disc text-slate-600 dark:text-[#CBD5E1]">
                            {typology.strategy.map((st, sIdx) => (
                              <li key={sIdx} className="leading-relaxed">{st}</li>
                            ))}
                          </ul>
                        </div>

                        {typology.tactic && (
                          <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200 text-xs">
                            <strong>Tactic: </strong>{typology.tactic}
                          </div>
                        )}

                        <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200 text-xs">
                          <strong>Practice: </strong>{typology.practiceAction}
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setExpandedTypologyId(isExpanded ? null : typology.id)}
                    className="mt-4 pt-3 border-t border-slate-100 dark:border-[#252932] flex items-center justify-between text-xs font-semibold text-brand-red w-full text-left"
                  >
                    <span>{isExpanded ? 'Collapse Strategy' : 'Inspect Strategy & Rules'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 21: PYQ PREPARATION TIMELINE (Visual Chronology) */}
        <div className="rounded-2xl p-6 sm:p-8 bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#252932] mb-12 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-[#252932] gap-2 mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F8FAFC] flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-red" />
                PYQ Reverse-Engineering Timeline (Phase 4 Schedule)
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                Systematic progression across 5 years of bi-annual papers (Weeks 19 to 22 of Master Roadmap).
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900/30">
              10 Exam Cycles Total
            </span>
          </div>

          {/* Timeline Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pyqPreparationTimeline.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] relative"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-black text-brand-red">
                    {item.year}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1A1D23] text-slate-600 dark:text-[#A7AFBD]">
                    {item.phaseWeek}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
                  {item.cycle}
                </div>
                <div className="text-xs text-slate-500 dark:text-[#A7AFBD] mb-2">
                  Scope: {item.focus}
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-[#252932] text-[11px] text-slate-700 dark:text-[#CBD5E1]">
                  <strong>Action: </strong>{item.action}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 22: ERROR LOG SYSTEM */}
        <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 dark:border-[#252932] gap-4 mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F8FAFC] flex items-center gap-2">
                <FileEdit className="w-4 h-4 text-brand-red" />
                Aspirant Error Log Notebook
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                Record questions missed during PYQ drills or mocks. Categorize into Conceptual, Misreading, or Calculation.
              </p>
            </div>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-red hover:bg-brand-darkred text-white text-xs font-bold shadow-sm transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>{showAddForm ? 'Cancel' : 'Log New Mistake'}</span>
            </button>
          </div>

          {/* User Error Distribution Visual Chart */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC]">
                My Error Distribution ({distribution.total} Total Recorded)
              </span>
              <span className="text-[10px] text-slate-400 dark:text-[#7F8795]">
                Calculated strictly from your logged mistakes
              </span>
            </div>

            {distribution.total === 0 ? (
              <p className="text-xs text-slate-400 dark:text-[#7F8795] py-2">
                No mistakes logged yet. Click "Log New Mistake" to record errors from your practice tests.
              </p>
            ) : (
              <div className="space-y-3">
                {/* Proportional Segmented Bar */}
                <div className="w-full h-4 bg-slate-200 dark:bg-[#1C2028] rounded-full overflow-hidden flex">
                  {distribution.conceptual > 0 && (
                    <div
                      style={{ width: `${distribution.pctConceptual}%` }}
                      className="h-full bg-red-500 transition-all"
                      title={`Conceptual: ${distribution.conceptual} (${distribution.pctConceptual}%)`}
                    />
                  )}
                  {distribution.misreading > 0 && (
                    <div
                      style={{ width: `${distribution.pctMisreading}%` }}
                      className="h-full bg-amber-500 transition-all"
                      title={`Misreading: ${distribution.misreading} (${distribution.pctMisreading}%)`}
                    />
                  )}
                  {distribution.calculation > 0 && (
                    <div
                      style={{ width: `${distribution.pctCalculation}%` }}
                      className="h-full bg-blue-500 transition-all"
                      title={`Calculation: ${distribution.calculation} (${distribution.pctCalculation}%)`}
                    />
                  )}
                </div>

                {/* Distribution Legend & Values */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-white dark:bg-[#15171C] border border-slate-200 dark:border-[#252932]">
                    <span className="text-[10px] font-bold text-red-600 block">Conceptual</span>
                    <span className="text-sm font-black text-slate-900 dark:text-[#F8FAFC]">{distribution.conceptual}</span>
                    <span className="text-[10px] text-slate-400 block">({distribution.pctConceptual}%)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-[#15171C] border border-slate-200 dark:border-[#252932]">
                    <span className="text-[10px] font-bold text-amber-600 block">Misreading</span>
                    <span className="text-sm font-black text-slate-900 dark:text-[#F8FAFC]">{distribution.misreading}</span>
                    <span className="text-[10px] text-slate-400 block">({distribution.pctMisreading}%)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-[#15171C] border border-slate-200 dark:border-[#252932]">
                    <span className="text-[10px] font-bold text-blue-600 block">Calculation</span>
                    <span className="text-sm font-black text-slate-900 dark:text-[#F8FAFC]">{distribution.calculation}</span>
                    <span className="text-[10px] text-slate-400 block">({distribution.pctCalculation}%)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Add Error Form */}
          {showAddForm && (
            <form onSubmit={handleAddError} className="p-4 rounded-xl bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] mb-6 space-y-4 animate-fadeIn">
              <h4 className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC] uppercase tracking-wider">
                Record an Error from Practice / Mock Test
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-[#A7AFBD] mb-1">
                    Question Summary / Snippet *
                  </label>
                  <input
                    type="text"
                    required
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="e.g. Nyaya logic fallacy in Anumana..."
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-red"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-[#A7AFBD] mb-1">
                    Topic / Unit *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    placeholder="e.g. Unit VI: Indian Logic (Hetvabhasa)"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-red"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-[#A7AFBD] mb-1">
                    Error Category *
                  </label>
                  <select
                    value={newErrorType}
                    onChange={(e) => setNewErrorType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-red"
                  >
                    <option value="Conceptual">Conceptual (Did not understand theory)</option>
                    <option value="Misreading">Misreading (Missed "NOT", read wrong option)</option>
                    <option value="Calculation">Calculation (Arithmetic or formula typo)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-[#A7AFBD] mb-1">
                    Correct Concept / Takeaway
                  </label>
                  <input
                    type="text"
                    value={newCorrectConcept}
                    onChange={(e) => setNewCorrectConcept(e.target.value)}
                    placeholder="e.g. Savyabhichara is irregular middle term..."
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-red"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-[#A7AFBD]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-brand-red hover:bg-brand-darkred text-white text-xs font-bold"
                >
                  Save Entry
                </button>
              </div>
            </form>
          )}

          {/* List of Logged Errors */}
          {errorLogs.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-[#252932]">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-[#15171C] border-b border-slate-200 dark:border-[#252932] text-slate-700 dark:text-[#F8FAFC] font-bold">
                  <tr>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Topic</th>
                    <th className="py-2.5 px-3">Question Note</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Correct Concept</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#252932] bg-white dark:bg-[#111318]">
                  {errorLogs.map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-50 dark:hover:bg-[#15171C] transition-colors">
                      <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                        {entry.date}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-[#F8FAFC] whitespace-nowrap">
                        {entry.topic}
                      </td>
                      <td className="py-2.5 px-3 text-slate-700 dark:text-[#CBD5E1] max-w-xs truncate">
                        {entry.question}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          entry.errorType === 'Conceptual'
                            ? 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400'
                            : entry.errorType === 'Misreading'
                            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                            : 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400'
                        }`}>
                          {entry.errorType}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 dark:text-[#A7AFBD] max-w-xs truncate">
                        {entry.correctConcept}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleRevision(entry.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                            entry.revisionStatus === 'Revised'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                              : 'bg-slate-100 text-slate-600 dark:bg-[#1A1D23] dark:text-[#A7AFBD]'
                          }`}
                        >
                          {entry.revisionStatus}
                        </button>
                      </td>
                      <td className="py-2.5 px-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteError(entry.id)}
                          className="p-1 rounded text-slate-400 hover:text-red-600 transition-colors"
                          title="Delete entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-slate-400 dark:text-[#7F8795]">
              No mistakes recorded yet. Tracking your errors prevents recurring pitfalls in the actual exam!
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
