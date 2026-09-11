import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe2,
  Landmark,
  Scale,
  ArrowRight,
  BookOpen,
  ExternalLink,
} from 'lucide-react';
import { examsData } from '../../data/examsData';
import { ExamCategoryType } from '../../types';
import { getExamEmblem } from '../common/ExamEmblems';

export const ExamCategoryGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ExamCategoryType | 'All'>('All');

  const categories: { title: ExamCategoryType; icon: any; count: number; desc: string }[] = [
    {
      title: 'Study Abroad',
      icon: Globe2,
      count: examsData.filter(e => e.category === 'Study Abroad').length,
      desc: 'GRE, GMAT, IELTS, TOEFL & SAT connected to Khan Academy, MIT OCW & ETS'
    },
    {
      title: 'Government',
      icon: Landmark,
      count: examsData.filter(e => e.category === 'Government').length,
      desc: 'UPSC CSE, WBCS, SSC CGL, Banking, Railways & Defence mapped to NCERT & NPTEL'
    },
    {
      title: 'Law & Entrance',
      icon: Scale,
      count: examsData.filter(e => e.category === 'Law & Entrance').length,
      desc: 'CLAT, CUET, CAT & Management linked to NLU archives, OpenStax & SWAYAM'
    }
  ];

  const filteredExams = selectedCategory === 'All' 
    ? examsData 
    : examsData.filter(e => e.category === selectedCategory);

  return (
    <section className="py-12 sm:py-16 bg-slate-50/70 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-brand-darkred text-xs font-bold uppercase tracking-wider no-min-touch">
            <span>Examination Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dark-900 tracking-tight">
            Select Your Target Examination
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Each examination is indexed with official syllabi, verified previous year question archives, and direct open-source study repositories.
          </p>

          {/* Category Filter Tabs — horizontally scrollable on mobile */}
          <div className="pt-3">
            <div className="category-scroll flex items-center justify-start sm:justify-center gap-2 pb-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`flex-shrink-0 px-4 py-2 rounded-2xl text-xs font-bold transition-all no-min-touch ${
                  selectedCategory === 'All'
                    ? 'bg-slate-900 text-white shadow-soft'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                All Examinations ({examsData.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.title}
                  onClick={() => setSelectedCategory(cat.title)}
                  className={`flex-shrink-0 px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat.title
                      ? 'bg-brand-red text-white shadow-red-glow'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <cat.icon className="w-3.5 h-3.5" />
                  <span>{cat.title} ({cat.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:border-brand-red/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-slate-900 shrink-0 shadow-sm">
                    {getExamEmblem(exam.shortCode, exam.category, 34)}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 no-min-touch">
                    {exam.tag}
                  </span>
                </div>

                {/* Exam Title & Category */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-dark-900 leading-snug">
                    {exam.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {exam.category} Pathway
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {exam.description}
                </p>

                {/* Open Source Platforms Mapped */}
                <div className="pt-1">
                  <div className="text-[11px] font-bold text-slate-700 mb-1.5">
                    Open Repositories:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {exam.openSourcePlatforms.slice(0, 3).map((plat) => (
                      <a
                        key={plat.id}
                        href={plat.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] px-2 py-1 rounded-xl bg-red-50 text-brand-darkred border border-red-100 font-semibold hover:bg-brand-red hover:text-white transition-colors inline-flex items-center gap-1 no-min-touch"
                        title={plat.description}
                      >
                        <span>{plat.name}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Core Topics Covered */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {exam.popularTopics.slice(0, 3).map((topic, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 no-min-touch"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <Link
                    to={`/exams/${exam.id}`}
                    className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-brand-red text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Syllabus &amp; Open Material</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>Official Authority:</span>
                  <a
                    href={exam.officialPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-slate-700 hover:text-brand-red flex items-center gap-1 transition-colors no-min-touch"
                  >
                    <span>{exam.officialPortalName}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
