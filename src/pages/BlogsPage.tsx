import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  X,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Compass,
  Briefcase,
  PenTool,
  Clock,
  Users,
  Tag,
  ChevronDown,
  Layers,
  ArrowUpRight,
  Check
} from 'lucide-react';
import { useBlogPosts, blogSegments, blogSubjects, contributorRoles } from '../data/blogData';
import { BlogPost, BlogAudience, BlogContributorType, BlogDifficulty } from '../types/blog';
import { BlogCard } from '../components/blog/BlogCard';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ScrollReveal } from '../components/common/ScrollReveal';

const segmentIconMap: Record<BlogAudience, React.ReactNode> = {
  students: <GraduationCap className="w-6 h-6 text-brand-red" />,
  subjects: <BookOpen className="w-6 h-6 text-brand-red" />,
  mentors: <Compass className="w-6 h-6 text-brand-red" />,
  professionals: <Briefcase className="w-6 h-6 text-brand-red" />,
};

export const BlogsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const articlesSectionRef = useRef<HTMLDivElement>(null);

  // Subscribe to dynamic blog posts in real-time
  const blogPosts = useBlogPosts();

  // Read initial params
  const paramAudience = searchParams.get('audience') as BlogAudience | null;
  const paramSubject = searchParams.get('subject') || 'All';
  const paramRole = searchParams.get('role') as BlogContributorType | 'All' || 'All';
  const paramSearch = searchParams.get('search') || '';
  const paramTag = searchParams.get('tag') || '';
  const paramDifficulty = searchParams.get('difficulty') || 'All';

  const [selectedAudience, setSelectedAudience] = useState<BlogAudience | 'All'>(
    paramAudience && ['students', 'subjects', 'mentors', 'professionals'].includes(paramAudience)
      ? paramAudience
      : 'All'
  );
  const [selectedSubject, setSelectedSubject] = useState<string>(paramSubject);
  const [selectedRole, setSelectedRole] = useState<string>(paramRole);
  const [searchQuery, setSearchQuery] = useState<string>(paramSearch);
  const [activeTag, setActiveTag] = useState<string>(paramTag);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(paramDifficulty);
  const [selectedReadTime, setSelectedReadTime] = useState<string>('All');

  // Sync state with URL params if changed externally
  useEffect(() => {
    if (paramAudience) setSelectedAudience(paramAudience);
    if (paramTag) setActiveTag(paramTag);
    if (paramSearch) setSearchQuery(paramSearch);
  }, [paramAudience, paramTag, paramSearch]);

  const scrollToArticles = () => {
    articlesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Featured articles (safely handle empty or few posts)
  const featuredLarge = useMemo(() => {
    if (blogPosts.length === 0) return null;
    return blogPosts.find((p) => p.featured) || blogPosts[0];
  }, [blogPosts]);

  const featuredCompact = useMemo(() => {
    if (!featuredLarge) return [];
    return blogPosts.filter((p) => p.id !== featuredLarge.id).slice(0, 3);
  }, [blogPosts, featuredLarge]);

  // Segment counts
  const segmentCounts = useMemo(() => {
    const counts: Record<BlogAudience, number> = {
      students: 0,
      subjects: 0,
      mentors: 0,
      professionals: 0,
    };
    blogPosts.forEach((p) => {
      counts[p.audience] = (counts[p.audience] || 0) + 1;
    });
    return counts;
  }, [blogPosts]);

  // Filtered articles
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      // 1. Audience
      if (selectedAudience !== 'All' && post.audience !== selectedAudience) {
        return false;
      }

      // 2. Subject
      if (selectedSubject !== 'All' && post.subject.toLowerCase() !== selectedSubject.toLowerCase()) {
        return false;
      }

      // 3. Contributor Role
      if (selectedRole !== 'All' && post.author.contributorType !== selectedRole) {
        return false;
      }

      // 4. Tag
      if (activeTag && !post.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase())) {
        return false;
      }

      // 5. Difficulty
      if (selectedDifficulty !== 'All' && post.difficulty !== selectedDifficulty) {
        return false;
      }

      // 6. Reading Time filter
      if (selectedReadTime !== 'All') {
        const minutes = parseInt(post.readingTime, 10) || 5;
        if (selectedReadTime === 'quick' && minutes > 7) return false;
        if (selectedReadTime === 'deep' && minutes <= 7) return false;
      }

      // 7. Search text
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesExcerpt = post.excerpt.toLowerCase().includes(query);
        const matchesAuthor = post.author.name.toLowerCase().includes(query);
        const matchesCategory = post.category.toLowerCase().includes(query);
        const matchesSubject = post.subject.toLowerCase().includes(query);
        const matchesTags = post.tags.some((t) => t.toLowerCase().includes(query));
        const matchesContent = post.contentSections.some(
          (cs) => cs.heading?.toLowerCase().includes(query) || cs.body.some((b) => b.toLowerCase().includes(query))
        );

        if (!matchesTitle && !matchesExcerpt && !matchesAuthor && !matchesCategory && !matchesSubject && !matchesTags && !matchesContent) {
          return false;
        }
      }

      return true;
    });
  }, [selectedAudience, selectedSubject, selectedRole, activeTag, selectedDifficulty, selectedReadTime, searchQuery]);

  const hasActiveFilters =
    selectedAudience !== 'All' ||
    selectedSubject !== 'All' ||
    selectedRole !== 'All' ||
    searchQuery.trim() !== '' ||
    activeTag !== '' ||
    selectedDifficulty !== 'All' ||
    selectedReadTime !== 'All';

  const resetFilters = () => {
    setSelectedAudience('All');
    setSelectedSubject('All');
    setSelectedRole('All');
    setSearchQuery('');
    setActiveTag('');
    setSelectedDifficulty('All');
    setSelectedReadTime('All');
    setSearchParams({});
  };

  const handleSegmentCardClick = (audienceId: BlogAudience) => {
    setSelectedAudience(audienceId);
    setSearchParams({ audience: audienceId });
    scrollToArticles();
  };

  const handleSubjectChipClick = (subjectName: string) => {
    if (selectedSubject === subjectName) {
      setSelectedSubject('All');
    } else {
      setSelectedSubject(subjectName);
    }
    scrollToArticles();
  };

  const handleRoleClick = (roleId: BlogContributorType) => {
    if (selectedRole === roleId) {
      setSelectedRole('All');
    } else {
      setSelectedRole(roleId);
    }
    scrollToArticles();
  };

  const handleTagFilter = (tag: string) => {
    setActiveTag(tag);
    scrollToArticles();
  };

  return (
    <div className="w-full bg-white dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] pt-6 sm:pt-8 pb-20 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Knowledge Hub & Blogs' }]} />

        {/* 1. HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto pt-2 pb-10 sm:pb-14">
          <ScrollReveal animation="fade-up" delay={50}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight leading-tight sm:leading-tight">
              Learn from people who learn, teach, build, and explore.
            </h1>

            <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-slate-600 dark:text-[#A7AFBD] max-w-2xl mx-auto leading-relaxed">
              Stories, ideas, guides, research, and practical knowledge from students, mentors, educators, and professionals across disciplines.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={scrollToArticles}
                className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-brand-red text-white text-xs sm:text-sm font-bold shadow-red-glow hover:bg-brand-darkred transition-all hover:-translate-y-0.5"
              >
                <span>Explore Blogs</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/blogs/contribute"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-slate-100 dark:bg-[#15171C] text-slate-800 dark:text-[#F8FAFC] hover:bg-slate-200 dark:hover:bg-[#1A1D23] border border-slate-200 dark:border-[#252932] text-xs sm:text-sm font-bold transition-all hover:-translate-y-0.5"
              >
                <PenTool className="w-4 h-4 text-brand-red" />
                <span>Become a Contributor</span>
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* 2. FEATURED ARTICLES SECTION (EDITORIAL SPOTLIGHT) */}
        {featuredLarge && (
          <section className="mb-14 sm:mb-18">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 dark:border-[#252932]">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-darkred dark:text-red-400 mb-1">
                  <span>Editorial Spotlight</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                  Featured Articles &amp; Insights
                </h2>
              </div>
              <span className="text-xs text-slate-500 dark:text-[#7F8795] hidden sm:block">
                Curated by campus leads &amp; mentors
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* 1 Large Card (8 columns) */}
              <div className="lg:col-span-8 flex flex-col">
                <BlogCard
                  post={featuredLarge}
                  variant="featured-large"
                  className="h-full"
                  onTagClick={handleTagFilter}
                  onAudienceClick={(aud) => {
                    setSelectedAudience(aud);
                    scrollToArticles();
                  }}
                />
              </div>

              {/* 2-3 Smaller Alongside Cards (4 columns) */}
              {featuredCompact.length > 0 && (
                <div className="lg:col-span-4 flex flex-col gap-4 justify-between">
                  {featuredCompact.map((cPost) => (
                    <BlogCard
                      key={cPost.id}
                      post={cPost}
                      variant="featured-compact"
                      onAudienceClick={(aud) => {
                        setSelectedAudience(aud);
                        scrollToArticles();
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* 3. FOUR PRIMARY SEGMENT CARDS */}
        <section className="mb-14 sm:mb-18">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {blogSegments.map((segment, idx) => {
              const isSelected = selectedAudience === segment.id;
              const count = segmentCounts[segment.id] || 0;
              return (
                <ScrollReveal
                  key={segment.id}
                  animation="fade-up"
                  delay={idx * 60}
                  className="h-full"
                >
                  <div
                    onClick={() => handleSegmentCardClick(segment.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleSegmentCardClick(segment.id);
                      }
                    }}
                    className={`group cursor-pointer rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between h-full border ${
                      isSelected
                        ? 'bg-red-50/50 dark:bg-red-950/30 border-brand-red shadow-md scale-[1.02]'
                        : 'bg-white dark:bg-[#111318] border-slate-200 dark:border-[#252932] shadow-card hover:shadow-card-hover hover:border-brand-red/50 dark:hover:border-brand-red/50'
                    }`}
                  >
                    <div>
                      {/* Icon & Count */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/30 flex items-center justify-center transition-transform group-hover:scale-110">
                          {segmentIconMap[segment.id]}
                        </div>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#15171C] text-slate-600 dark:text-[#A7AFBD] border border-slate-200/60 dark:border-[#252932]">
                          {count} {count === 1 ? 'Article' : 'Articles'}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 dark:text-[#F8FAFC] mb-2 group-hover:text-brand-red dark:group-hover:text-red-400 transition-colors">
                        {segment.label}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-[#A7AFBD] leading-relaxed">
                        {segment.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-[#252932] flex items-center justify-between text-xs font-bold text-brand-red group-hover:translate-x-0.5 transition-transform">
                      <span>Explore Segment</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* 4. DISCOVER BY SUBJECT */}
        <section className="mb-14 sm:mb-18 bg-slate-50/70 dark:bg-[#0B0C0F] border border-slate-200 dark:border-[#252932] rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-darkred dark:text-red-400">
                Data-Driven Taxonomy
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                Explore by Subject
              </h2>
            </div>
            {selectedSubject !== 'All' && (
              <button
                type="button"
                onClick={() => setSelectedSubject('All')}
                className="text-xs font-semibold text-brand-red hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <span>Reset Subject Filter</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedSubject('All')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedSubject === 'All'
                  ? 'bg-brand-red text-white shadow-xs'
                  : 'bg-white dark:bg-[#15171C] text-slate-700 dark:text-[#A7AFBD] border border-slate-200 dark:border-[#252932] hover:border-brand-red/40 hover:text-brand-red'
              }`}
            >
              All Subjects
            </button>

            {blogSubjects.map((subj) => {
              const isMatch = selectedSubject.toLowerCase() === subj.name.toLowerCase();
              return (
                <button
                  key={subj.id}
                  type="button"
                  onClick={() => handleSubjectChipClick(subj.name)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isMatch
                      ? 'bg-brand-red text-white shadow-xs'
                      : 'bg-white dark:bg-[#15171C] text-slate-700 dark:text-[#A7AFBD] border border-slate-200 dark:border-[#252932] hover:border-brand-red/40 hover:text-brand-red dark:hover:text-white'
                  }`}
                >
                  {subj.name}
                </button>
              );
            })}
          </div>
        </section>

        {/* 5. LEARN FROM DIFFERENT PERSPECTIVES */}
        <section className="mb-14 sm:mb-18">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-slate-200 dark:border-[#252932] gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-darkred dark:text-red-400">
                Diverse Voices
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                Learn From Different Perspectives
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-[#7F8795] max-w-sm">
              Knowledge doesn't fit into a single box. Filter by contributor role to see how different minds build and teach.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {contributorRoles.map((role) => {
              const isRoleActive = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleRoleClick(role.id)}
                  className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between group ${
                    isRoleActive
                      ? 'bg-red-50 dark:bg-red-950/40 border-brand-red text-brand-darkred dark:text-red-400 shadow-xs scale-105'
                      : 'bg-white dark:bg-[#111318] border-slate-200 dark:border-[#252932] text-slate-800 dark:text-[#F8FAFC] hover:border-brand-red/40 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold truncate">{role.name}</span>
                    {isRoleActive && <Check className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />}
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-[#7F8795] line-clamp-1">
                    {role.description}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 6. SEARCH & FILTER SECTION */}
        <section ref={articlesSectionRef} className="pt-4 mb-8">
          <div className="bg-slate-50/80 dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-5 sm:p-6 shadow-xs">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">

              {/* Search Bar Input */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search titles, authors, topics, tags..."
                  className="w-full h-11 pl-10 pr-9 bg-white dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all shadow-xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-[#252932] rounded-full w-5 h-5 flex items-center justify-center no-min-touch"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Filter Controls Row */}
              <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">

                {/* Audience Filter Dropdown */}
                <select
                  value={selectedAudience}
                  onChange={(e) => setSelectedAudience(e.target.value as BlogAudience | 'All')}
                  className="h-10 px-3 rounded-xl bg-white dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] text-xs font-semibold text-slate-800 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                >
                  <option value="All">All Audiences</option>
                  <option value="students">For Students</option>
                  <option value="subjects">Subjects &amp; Interests</option>
                  <option value="mentors">Lifelong Mentors</option>
                  <option value="professionals">Educationists &amp; Pros</option>
                </select>

                {/* Difficulty Filter */}
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="h-10 px-3 rounded-xl bg-white dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] text-xs font-semibold text-slate-800 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                >
                  <option value="All">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>

                {/* Reading Time */}
                <select
                  value={selectedReadTime}
                  onChange={(e) => setSelectedReadTime(e.target.value)}
                  className="h-10 px-3 rounded-xl bg-white dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] text-xs font-semibold text-slate-800 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                >
                  <option value="All">Any Duration</option>
                  <option value="quick">&lt; 7 min (Quick)</option>
                  <option value="deep">8+ min (In-Depth)</option>
                </select>

                {/* Reset Filters Button */}
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl bg-red-50 text-brand-darkred dark:bg-red-950/40 dark:text-red-400 border border-red-200 dark:border-red-900/40 text-xs font-bold hover:bg-red-100 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Clear Filters</span>
                  </button>
                )}
              </div>

            </div>

            {/* Active Tag indicator */}
            {activeTag && (
              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-[#252932] flex items-center gap-2">
                <span className="text-xs text-slate-500">Filtered by tag:</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-lg bg-red-100 dark:bg-red-950/50 text-brand-darkred dark:text-red-400">
                  #{activeTag}
                  <button type="button" onClick={() => setActiveTag('')}>
                    <X className="w-3 h-3 ml-1" />
                  </button>
                </span>
              </div>
            )}
          </div>
        </section>

        {/* 7. ARTICLES GRID */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-[#A7AFBD]">
              Showing <span className="text-slate-900 dark:text-white font-bold">{filteredPosts.length}</span> {filteredPosts.length === 1 ? 'article' : 'articles'}
              {selectedAudience !== 'All' && <span> in <strong className="text-brand-red">{selectedAudience}</strong></span>}
            </div>

            <Link
              to="/blogs/contribute"
              className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1"
            >
              <span>Have an article to submit?</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {blogPosts.length === 0 ? (
            <div className="py-16 text-center bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-8 max-w-xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/30 text-brand-red flex items-center justify-center mx-auto mb-4">
                <PenTool className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-[#F8FAFC] mb-2">
                Be the First to Publish an Article!
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-[#A7AFBD] mb-6 leading-relaxed">
                All hardcoded articles have been cleared. Anyone can now contribute an article—your contribution will reflect immediately on this page and enter the peer verification queue.
              </p>
              <Link
                to="/blogs/contribute"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-red text-white text-xs sm:text-sm font-bold shadow-red-glow hover:bg-brand-darkred transition-all"
              >
                <PenTool className="w-4 h-4" />
                <span>Submit the First Article</span>
              </Link>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="py-16 text-center bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-8">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
                No articles found
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-[#A7AFBD] max-w-md mx-auto mb-5">
                We couldn’t find any articles matching your active search or filter criteria. Try adjusting your query or resetting filters.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl bg-brand-red text-white text-xs font-bold shadow-red-glow hover:bg-brand-darkred transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, idx) => (
                <ScrollReveal
                  key={post.id}
                  animation="fade-up"
                  delay={(idx % 6) * 50}
                  className="h-full"
                >
                  <BlogCard
                    post={post}
                    variant="standard"
                    onTagClick={handleTagFilter}
                    onAudienceClick={(aud) => {
                      setSelectedAudience(aud);
                      scrollToArticles();
                    }}
                  />
                </ScrollReveal>
              ))}
            </div>
          )}
        </section>

        {/* 8. BOTTOM CONTRIBUTOR BANNER */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-red mb-2 block">
              Knowledge from people who learn, teach, build, and explore
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 leading-snug">
              Write for the Open Academic Knowledge Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Whether you are an undergraduate who just shipped your first prototype, a professor with 20 years of pedagogy, or an industry engineer translating cloud architecture to syllabus topics: your perspective matters.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/blogs/contribute"
                className="px-5 py-2.5 rounded-xl bg-brand-red hover:bg-brand-darkred text-white text-xs font-bold transition-all shadow-red-glow flex items-center gap-1.5"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Become a Contributor</span>
              </Link>
              <Link
                to="/about"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all"
              >
                Learn About Our Mission
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
