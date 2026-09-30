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
  HelpCircle,
  PenTool
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/home/HeroSection';
import { ExamCategoryGrid } from '../components/home/ExamCategoryGrid';
import { OpenPlatformsSection } from '../components/home/OpenPlatformsSection';
import { studyMaterialData } from '../data/studyMaterialData';
import { useBlogPosts } from '../data/blogData';
import { BlogCard } from '../components/blog/BlogCard';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const LandingPage: React.FC = () => {
  const spotlightMaterials = studyMaterialData.slice(0, 6);
  const blogPosts = useBlogPosts();
  const featuredBlogs = blogPosts.slice(0, 3);

  return (
    <div className="w-full">
      {/* 1. Hero Section with stats & open knowledge directory search */}
      <HeroSection />

      {/* 2. Target Examination Aggregator Grid */}
      <ExamCategoryGrid />

      {/* 3. Global Open Educational Resources (OER) Platforms Showcase */}
      <OpenPlatformsSection />

      {/* 4. Open-Access Study Material Spotlight */}
      <section className="py-10 sm:py-16 bg-slate-50/70 dark:bg-[#0B0C0F] border-t border-slate-200 dark:border-[#252932] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up" delay={50}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-dark-900 dark:text-[#F8FAFC] tracking-tight">
                  Curated Open Knowledge Library
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A7AFBD] max-w-xl leading-relaxed">
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
                <div className="bg-white dark:bg-[#111318] rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-[#252932] shadow-xs hover:shadow-md hover:border-brand-red/40 transition-all flex flex-col justify-between space-y-3.5 h-full">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-50 text-brand-darkred dark:bg-red-950/40 dark:text-red-400">
                        {mat.category}
                      </span>
                      <span className="text-[10px] font-medium text-slate-500 dark:text-[#7F8795]">
                        {mat.sourcePlatform}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-dark-900 dark:text-[#F8FAFC] leading-snug line-clamp-2">
                      {mat.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-[#A7AFBD] line-clamp-2 leading-relaxed">
                      {mat.previewSummary}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {mat.keyTopics.slice(0, 2).map((t, topicIdx) => (
                        <span key={topicIdx} className="text-[10px] px-2 py-0.5 bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] rounded text-slate-600 dark:text-[#A7AFBD]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-[#252932] flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 dark:text-[#7F8795] font-semibold">{mat.examName}</span>
                    <a
                      href={mat.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-brand-red dark:bg-[#15171C] dark:hover:bg-brand-red dark:border dark:border-[#252932] text-white text-xs font-bold transition-colors flex items-center gap-1"
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

      {/* 5. Blogs & Knowledge Hub: Knowledge Worth Sharing */}
      <section className="py-12 sm:py-18 bg-white dark:bg-[#08090B] border-t border-slate-200 dark:border-[#252932] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up" delay={50}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
                  Knowledge Worth Sharing
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A7AFBD] max-w-xl leading-relaxed">
                  Explore ideas, experiences, and practical knowledge from students, mentors, educators, and professionals across disciplines.
                </p>
              </div>

              <Link
                to="/blogs"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red hover:text-brand-darkred self-start md:self-auto group"
              >
                <span>Explore All Blogs</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          {featuredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBlogs.map((post, idx) => (
                <ScrollReveal
                  key={post.id}
                  animation="fade-up"
                  delay={idx * 80}
                  className="h-full flex flex-col"
                >
                  <BlogCard post={post} variant="compact" />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-8 sm:p-10 text-center max-w-xl mx-auto">
              <PenTool className="w-10 h-10 text-brand-red mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
                Open Academic Knowledge Hub
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-[#A7AFBD] mb-5 leading-relaxed">
                Contribute educational guides, research workflows, or technical deep dives. Newly published articles reflect immediately upon submission.
              </p>
              <Link
                to="/blogs/contribute"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-red hover:bg-brand-darkred text-white text-xs font-bold transition-all shadow-red-glow"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Write an Article</span>
              </Link>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-[#252932] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 dark:text-[#7F8795]">
              Written by students, university faculty, engineers, and independent builders. Free and open access.
            </p>
            <div className="flex items-center gap-3">
              <Link
                to="/blogs/contribute"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-[#A7AFBD] hover:text-brand-red dark:hover:text-white transition-colors"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Become a Contributor</span>
              </Link>
              <span className="text-slate-300 dark:text-[#252932]">•</span>
              <Link
                to="/blogs"
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-red hover:underline"
              >
                <span>Browse All Articles</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

