import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  Library, 
  Globe2, 
  ExternalLink, 
  CheckCircle, 
  FileText,
  Layers,
  HelpCircle
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/home/HeroSection';
import { ExamCategoryGrid } from '../components/home/ExamCategoryGrid';
import { OpenPlatformsSection } from '../components/home/OpenPlatformsSection';
import { studyMaterialData } from '../data/studyMaterialData';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const LandingPage: React.FC = () => {
  const spotlightMaterials = studyMaterialData.slice(0, 6);

  return (
    <div className="w-full">
      {/* 1. Hero Section with stats & open knowledge directory search */}
      <HeroSection />

      {/* 2. Target Examination Aggregator Grid */}
      <ExamCategoryGrid />

      {/* 3. Global Open Educational Resources (OER) Platforms Showcase */}
      <OpenPlatformsSection />

      {/* 4. Open-Access Study Material Spotlight */}
      <section className="py-10 sm:py-16 bg-slate-50/70 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up" delay={50}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-brand-darkred text-xs font-bold uppercase tracking-wider">
                  <span>Open Textbooks & Handbooks</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-dark-900 tracking-tight">
                  Curated Open Knowledge Library
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                  Direct access to NCERT foundational series, OpenStax peer-reviewed college textbooks, official UPSC/SSC PYQ archives, and formula compendiums.
                </p>
              </div>

              <Link
                to="/library"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red hover:text-brand-darkred self-start md:self-auto"
              >
                <span>View All Open Documents</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {spotlightMaterials.map((mat, idx) => (
              <ScrollReveal
                key={mat.id}
                animation="fade-up"
                delay={(idx % 6) * 70}
                duration={550}
                className="h-full flex flex-col"
              >
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-brand-red/40 transition-all flex flex-col justify-between space-y-3.5 h-full">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-50 text-brand-darkred">
                        {mat.category}
                      </span>
                      <span className="text-[10px] font-medium text-slate-500">
                        {mat.sourcePlatform}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-dark-900 leading-snug line-clamp-2">
                      {mat.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {mat.previewSummary}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {mat.keyTopics.slice(0, 2).map((t, topicIdx) => (
                        <span key={topicIdx} className="text-[10px] px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-slate-600">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-semibold">{mat.examName}</span>
                    <a
                      href={mat.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-brand-red text-white text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <span>Open Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

