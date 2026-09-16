import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ExternalLink,
  BookOpen,
  ArrowLeft,
  FileCheck2,
  Globe2,
  Layers,
  FileText,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';
import { examsData } from '../data/examsData';
import { studyMaterials } from '../data/studyMaterialData';
import { ExamInfo, OpenSourcePlatform, ExamTopicResource, RecommendedBook } from '../types';
import { getExamEmblem } from '../components/common/ExamEmblems';

const GIL_SANS = { fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' };

export const ExamDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const exam = examsData.find((e: ExamInfo) => e.id === id || e.shortCode.toLowerCase() === id?.toLowerCase());

  if (!exam) {
    return (
      <div className="min-h-screen bg-white text-slate-900 pt-28 pb-16 flex items-center justify-center" style={GIL_SANS}>
        <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md text-center shadow-md">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Examination Not Found</h2>
          <p className="text-sm text-slate-500 mb-6">
            We couldn't locate this examination in our repository.
          </p>
          <Link
            to="/exams"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-red hover:bg-brand-darkred text-white text-sm font-semibold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Examinations</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white text-slate-900 pt-6 sm:pt-8 pb-16" style={GIL_SANS}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-400">
          <Link to="/" className="hover:text-brand-red transition-colors">Home</Link>
          <span>/</span>
          <Link to="/exams" className="hover:text-brand-red transition-colors">Examinations</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">{exam.name}</span>
        </div>

        {/* Hero Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-8 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              {/* Exam Icon */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center shrink-0 text-slate-900">
                {getExamEmblem(exam.shortCode, exam.category, 40)}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-900 text-white">
                    {exam.shortCode}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs bg-slate-100 text-slate-600 border border-slate-200">
                    {exam.category}
                  </span>
                  {exam.tag && (
                    <span className="px-2.5 py-1 rounded-md text-xs bg-red-50 text-brand-red border border-red-100">
                      {exam.tag}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
                  {exam.name}
                </h1>

                <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
                  {exam.description}
                </p>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shrink-0 flex flex-col gap-2.5 min-w-[220px]">
              <a
                href={exam.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-red hover:bg-brand-darkred text-white text-xs font-semibold transition-all"
              >
                <span>{exam.officialPortalName}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {exam.officialPYQUrl && (
                <a
                  href={exam.officialPYQUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-slate-200 hover:border-brand-red/40 text-slate-700 text-xs font-medium transition-all"
                >
                  <FileCheck2 className="w-3.5 h-3.5 text-brand-red" />
                  <span>Official PYQs Archive</span>
                </a>
              )}

              <Link
                to={`/library?exam=${encodeURIComponent(exam.shortCode)}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-slate-200 hover:border-brand-red/40 text-slate-700 text-xs font-medium transition-all"
              >
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <span>All Open Textbooks</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Two-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Column */}
          <div className="lg:col-span-8 space-y-6">

            {/* Topic-wise Open Learning Roadmap */}
            <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-brand-red" />
                    <span>Topic-Wise Open Learning Roadmap</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Direct access to public courses, university lecture series, and open text chapters.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {exam.topicResources && exam.topicResources.length > 0 ? (
                  exam.topicResources.map((topicItem: ExamTopicResource, idx: number) => (
                    <div
                      key={idx}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-brand-red/30 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-brand-red">
                              {topicItem.platformName}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="text-xs text-slate-400">
                              {topicItem.platformType}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-slate-900">
                            {topicItem.topicName}
                          </h3>
                        </div>

                        <a
                          href={topicItem.resourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-red hover:bg-brand-darkred text-white text-xs font-medium self-start transition-all shrink-0"
                        >
                          <span>{topicItem.resourceTitle}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed mb-3">
                        {topicItem.description}
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                        <span>
                          Resource Type: <strong className="text-slate-600 font-medium">{topicItem.platformType}</strong>
                        </span>
                        <span className="text-emerald-600 font-medium">
                          {topicItem.isFreeOpenSource ? '100% Free Open Access' : 'Open Access'}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">Topic resources are being updated for this examination.</p>
                )}
              </div>
            </section>

            {/* Curated Open Books */}
            <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-red" />
                  <span>Curated Open Books &amp; Public Notes</span>
                </h2>
                <Link to="/library" className="text-xs text-brand-red hover:underline">View All in Library</Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {exam.recommendedTextbooks.map((book: RecommendedBook, bIdx: number) => (
                  <a
                    key={bIdx}
                    href={book.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-red/30 hover:bg-white transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-semibold text-brand-red">{book.platform}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-500">
                          {book.author}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-red transition-colors line-clamp-2 mb-1">
                        {book.title}
                      </h4>
                    </div>

                    <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-xs">
                      <span className="text-emerald-600 font-medium text-[11px]">Free Open Access</span>
                      <span className="text-brand-red group-hover:underline flex items-center gap-1">
                        Read <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-5">

            {/* Direct Open Repositories */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <Globe2 className="w-4 h-4 text-brand-red" />
                <span>Direct Open Repositories</span>
              </h3>

              <div className="space-y-2.5">
                {exam.openSourcePlatforms.map((platform: OpenSourcePlatform, pIdx: number) => (
                  <a
                    key={pIdx}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-red/30 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-slate-900 group-hover:text-brand-red transition-colors">
                        {platform.name}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-red" />
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {platform.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            {/* Syllabus Highlights */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <Layers className="w-4 h-4 text-brand-red" />
                <span>Syllabus Highlights</span>
              </h3>

              <div className="space-y-2">
                {exam.syllabusHighlights.map((highlight: string, hIdx: number) => (
                  <div
                    key={hIdx}
                    className="p-2.5 rounded-lg bg-slate-50 text-slate-700 text-xs border border-slate-200 leading-relaxed"
                  >
                    {highlight}
                  </div>
                ))}
              </div>
            </div>

            {/* OER Guarantee */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-xs text-slate-500 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Open Educational Guarantee</span>
              </div>
              <p className="leading-relaxed">
                All external links point to verified non-profit, government-sponsored, or Creative Commons licensed educational archives. No premium memberships required.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
