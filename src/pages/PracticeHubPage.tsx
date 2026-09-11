import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  FileCheck2,
  Search,
  ExternalLink,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { practiceQuestions } from '../data/mockQuestionsData';
import { examsData } from '../data/examsData';
import { PracticeQuestion, ExamInfo } from '../types';

const GIL_SANS = { fontFamily: "'Gil Sans', 'Gill Sans MT', 'Gill Sans', Calibri, sans-serif" };

export const PracticeHubPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const examParam = searchParams.get('exam') || 'All';

  const [selectedExam, setSelectedExam] = useState<string>(examParam);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});

  const filteredQuestions = useMemo(() => {
    return practiceQuestions.filter((q: PracticeQuestion) => {
      const matchesExam = selectedExam === 'All' ||
        q.examShortCode.toLowerCase().includes(selectedExam.toLowerCase());
      const matchesSearch = searchQuery === '' ||
        q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.sourceReference.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesExam && matchesSearch;
    });
  }, [selectedExam, searchQuery]);

  const handleSelectOption = (questionId: string, optionId: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleResetQuestion = (questionId: string) => {
    setUserAnswers(prev => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  const totalAnswered = Object.keys(userAnswers).length;
  const totalCorrect = Object.entries(userAnswers).filter(([qid, selectedOptId]) => {
    const q = practiceQuestions.find(item => item.id === qid);
    return q && q.correctOptionId === selectedOptId;
  }).length;

  return (
    <div className="w-full bg-white text-slate-900 pt-6 sm:pt-8 pb-16" style={GIL_SANS}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-6 flex items-center gap-2 text-xs sm:text-sm text-slate-400">
          <Link to="/" className="hover:text-brand-red transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">Practice &amp; Official Papers Archive</span>
        </div>

        {/* Page Header */}
        <div className="mb-6 sm:mb-8 border-b border-slate-200 pb-6 sm:pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Previous Questions &amp; Self-Evaluation
              </h1>
              <p className="mt-2 text-slate-500 max-w-2xl text-xs sm:text-sm leading-relaxed">
                Practice authentic previous-year questions from UPSC, GRE, GMAT, and CLAT — no timers, instant explanations, mapped to open textbooks.
              </p>
            </div>

            {/* Session stats */}
            {totalAnswered > 0 && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 flex items-center gap-4 text-xs shrink-0 self-start md:self-auto">
                <div>
                  <span className="text-slate-400 block text-[10px]">Reviewed</span>
                  <span className="text-slate-900 font-bold text-sm sm:text-base">{totalAnswered}</span>
                </div>
                <div className="h-7 w-px bg-slate-200" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Correct</span>
                  <span className="text-emerald-600 font-bold text-sm sm:text-base">{totalCorrect}</span>
                </div>
                <button
                  onClick={() => setUserAnswers({})}
                  className="text-slate-400 hover:text-brand-red p-1 rounded transition-colors no-min-touch"
                  title="Reset session"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 sm:p-5 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">

            {/* Search */}
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by concept, topic, or exam..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/30 transition-all"
              />
            </div>

            {/* Exam dropdown */}
            <div className="md:col-span-4">
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-brand-red transition-all"
              >
                <option value="All">All Examinations</option>
                {examsData.map((e: ExamInfo) => (
                  <option key={e.id} value={e.shortCode}>{e.shortCode} — {e.name}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="text-slate-900 font-semibold">{filteredQuestions.length}</span> questions
          </p>
        </div>

        {/* Questions Feed */}
        <div className="space-y-5">
          {filteredQuestions.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-slate-800">No questions found</h3>
              <p className="text-sm text-slate-500 mt-1">Try selecting 'All Examinations' or broadening your search.</p>
            </div>
          ) : (
            filteredQuestions.map((q: PracticeQuestion, qIndex: number) => {
              const selectedOptId = userAnswers[q.id];
              const isAnswered = selectedOptId !== undefined;
              const isCorrect = isAnswered && selectedOptId === q.correctOptionId;

              return (
                <div
                  key={q.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm transition-all"
                >
                  {/* Top Metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded text-xs font-bold bg-slate-900 text-white">
                        {q.examShortCode}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-600 border border-slate-200">
                        {q.subject}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {q.topic}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">Q{qIndex + 1}</span>
                  </div>

                  {/* Question Text */}
                  <div className="mb-6 whitespace-pre-line">
                    <p className="text-base font-medium text-slate-900 leading-relaxed">
                      {q.questionText}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-2.5 mb-6">
                    {q.options.map((option, optIdx: number) => {
                      let optionStyle = "bg-slate-50 border-slate-200 text-slate-700 hover:border-brand-red/30 hover:bg-white";

                      if (isAnswered) {
                        if (option.id === q.correctOptionId) {
                          optionStyle = "bg-emerald-50 border-emerald-300 text-emerald-900 font-medium";
                        } else if (option.id === selectedOptId) {
                          optionStyle = "bg-red-50 border-red-300 text-red-800";
                        } else {
                          optionStyle = "bg-slate-50 border-slate-100 text-slate-400 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={option.id}
                          onClick={() => handleSelectOption(q.id, option.id)}
                          disabled={isAnswered}
                          className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${optionStyle}`}
                        >
                          <span className={`flex items-center justify-center w-6 h-6 rounded-md text-xs font-mono shrink-0 border ${
                            isAnswered && option.id === q.correctOptionId
                              ? 'bg-emerald-600 text-white border-emerald-500'
                              : isAnswered && option.id === selectedOptId
                              ? 'bg-red-500 text-white border-red-400'
                              : 'bg-white border-slate-300 text-slate-500'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="text-sm leading-snug pt-0.5">{option.text}</span>

                          {isAnswered && option.id === q.correctOptionId && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />
                          )}
                          {isAnswered && option.id === selectedOptId && option.id !== q.correctOptionId && (
                            <XCircle className="w-5 h-5 text-red-500 ml-auto shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  {isAnswered && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-3 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {isCorrect ? (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                              <CheckCircle2 className="w-4 h-4" /> Correct Answer
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-red-500">
                              <XCircle className="w-4 h-4" /> Incorrect
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleResetQuestion(q.id)}
                          className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Reset
                        </button>
                      </div>

                      <div className="pt-2 border-t border-slate-200">
                        <h4 className="text-xs font-semibold text-slate-700 mb-1">Explanation:</h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>

                      {q.sourceUrl && (
                        <div className="pt-3 border-t border-slate-200 flex items-center justify-between flex-wrap gap-2 text-xs">
                          <span className="text-slate-400 flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-brand-red" />
                            Study topic in open textbook library:
                          </span>
                          <a
                            href={q.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-brand-red font-medium hover:underline"
                          >
                            <span>Open Source Reference</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                    <span>Source: {q.sourceReference}</span>
                    <Link
                      to={`/library?exam=${encodeURIComponent(q.examShortCode)}`}
                      className="text-brand-red hover:underline flex items-center gap-1"
                    >
                      <span>Find {q.examShortCode} Textbooks</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
