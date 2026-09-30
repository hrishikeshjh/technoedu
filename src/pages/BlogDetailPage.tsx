import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  Calendar,
  Share2,
  Check,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Compass,
  Briefcase,
  Copy,
  ChevronRight,
  List,
  Sparkles,
  ExternalLink,
  AlertCircle,
  Tag as TagIcon
} from 'lucide-react';
import { useBlogPosts, blogSegments } from '../data/blogData';
import { BlogPost, BlogAudience } from '../types/blog';
import { BlogCard } from '../components/blog/BlogCard';
import { AuthorCard } from '../components/blog/AuthorCard';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  // Dynamically subscribe to blog posts
  const allPosts = useBlogPosts();
  const post = allPosts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-[#F8FAFC] mb-4">
          Article Not Found
        </h1>
        <p className="text-slate-600 dark:text-[#A7AFBD] mb-8">
          The requested article could not be located in our Knowledge Hub.
        </p>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-red text-white text-sm font-bold shadow-red-glow hover:bg-brand-darkred transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Knowledge Hub</span>
        </Link>
      </div>
    );
  }

  // Related articles: same audience or subject, excluding current
  const relatedArticles = allPosts
    .filter((p) => p.id !== post.id && (p.audience === post.audience || p.subject === post.subject))
    .slice(0, 3);

  // Author other articles
  const authorOtherArticles = allPosts.filter((p) => p.author.id === post.author.id && p.id !== post.id);

  // Previous & Next posts
  const currentIndex = allPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const segmentMeta = blogSegments.find((s) => s.id === post.audience);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  return (
    <div className="w-full bg-white dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] pt-6 sm:pt-8 pb-20 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 1. Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Knowledge Hub', path: '/blogs' },
            { label: segmentMeta?.label || 'Articles', path: `/blogs?audience=${post.audience}` },
            { label: post.title },
          ]}
        />

        {/* 2. Article Header */}
        <header className="max-w-4xl mx-auto pt-2 pb-8 sm:pb-10 border-b border-slate-200 dark:border-[#252932]">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Link
              to={`/blogs?audience=${post.audience}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-brand-darkred dark:bg-red-950/40 dark:text-red-400 border border-red-100 dark:border-red-900/30 hover:bg-red-100 transition-colors"
            >
              <span>{segmentMeta?.label || post.audience}</span>
            </Link>

            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-[#15171C] text-slate-700 dark:text-[#A7AFBD] border border-slate-200/60 dark:border-[#252932]">
              {post.category}
            </span>

            {post.difficulty && (
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-slate-100 dark:bg-[#15171C] text-slate-600 dark:text-[#7F8795]">
                {post.difficulty}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight leading-tight sm:leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-[#A7AFBD] leading-relaxed mb-6">
            {post.excerpt}
          </p>

          {/* Author Meta Strip & Sharing */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-[#252932]/70">
            <div className="flex items-center gap-3.5">
              <img
                src={post.authorAvatar || post.author.avatar}
                alt={post.author.name}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-200 dark:ring-[#252932]"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}&background=e11d48&color=fff&bold=true`;
                }}
              />
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">
                  {post.author.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                  {post.authorRole}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-[#7F8795]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#15171C] text-slate-700 dark:text-[#F8FAFC] hover:bg-brand-red hover:text-white dark:hover:bg-brand-red transition-all no-min-touch"
                title="Share article link"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-500 dark:text-green-400" />
                    <span className="text-green-600 dark:text-green-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* 3. Hero Cover Image */}
        <div className="max-w-4xl mx-auto my-8">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-slate-200 dark:border-[#252932] shadow-sm bg-slate-100 dark:bg-[#111318]">
            <img
              src={post.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80';
              }}
            />
          </div>
        </div>

        {/* 4. Article Layout: Sticky Table of Contents + Content Body */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Table of Contents: Desktop Sidebar */}
          {post.tableOfContents && post.tableOfContents.length > 0 && (
            <aside className="hidden lg:block lg:col-span-4 sticky top-20 space-y-4">
              <div className="bg-slate-50/70 dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-2xl p-5 shadow-xs">
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200 dark:border-[#252932]">
                  <List className="w-4 h-4 text-brand-red" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-[#F8FAFC]">
                    Table of Contents
                  </span>
                </div>
                <nav className="space-y-1.5">
                  {post.tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-xs text-slate-600 dark:text-[#A7AFBD] hover:text-brand-red dark:hover:text-red-400 py-1 transition-colors leading-snug"
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Quick Contributor Callout */}
              <div className="bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-2xl p-4 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-brand-darkred dark:text-red-400 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Have knowledge to share?</span>
                </div>
                <p className="text-slate-600 dark:text-[#A7AFBD] leading-relaxed mb-2.5">
                  Publish your research, tutorials, and career lessons to thousands of students and mentors.
                </p>
                <Link
                  to="/blogs/contribute"
                  className="font-bold text-brand-red hover:underline inline-flex items-center gap-1"
                >
                  <span>Submit an Article</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </aside>
          )}

          {/* Mobile TOC Drawer Toggle */}
          {post.tableOfContents && post.tableOfContents.length > 0 && (
            <div className="lg:hidden col-span-1 bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-2xl p-4">
              <button
                type="button"
                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                <span className="flex items-center gap-2">
                  <List className="w-4 h-4 text-brand-red" />
                  <span>Table of Contents ({post.tableOfContents.length} Sections)</span>
                </span>
                <ChevronRight className={`w-4 h-4 transition-transform ${mobileTocOpen ? 'rotate-90' : ''}`} />
              </button>

              {mobileTocOpen && (
                <nav className="mt-3 pt-3 border-t border-slate-200 dark:border-[#252932] space-y-1.5">
                  {post.tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setMobileTocOpen(false)}
                      className="block text-xs text-slate-600 dark:text-[#A7AFBD] hover:text-brand-red py-1"
                    >
                      • {item.text}
                    </a>
                  ))}
                </nav>
              )}
            </div>
          )}

          {/* Main Content Body */}
          <main
            className={`${
              post.tableOfContents && post.tableOfContents.length > 0
                ? 'lg:col-span-8'
                : 'max-w-3xl mx-auto col-span-12'
            } space-y-8`}
          >
            {post.contentSections.map((section, idx) => (
              <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
                {section.heading && (
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight pt-3">
                    {section.heading}
                  </h2>
                )}

                {section.body.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-base sm:text-lg text-slate-700 dark:text-[#D1D5DB] leading-relaxed"
                  >
                    {para}
                  </p>
                ))}

                {/* Blockquote */}
                {section.quote && (
                  <blockquote className="my-6 p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#111318] border-l-4 border-brand-red dark:border-brand-red italic">
                    <p className="text-base sm:text-lg text-slate-800 dark:text-[#F8FAFC] font-medium leading-relaxed mb-2">
                      “{section.quote.text}”
                    </p>
                    <cite className="block text-xs font-semibold text-slate-500 dark:text-[#7F8795] not-italic">
                      — {section.quote.citation}
                    </cite>
                  </blockquote>
                )}

                {/* Code Snippet */}
                {section.codeSnippet && (
                  <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-[#252932] shadow-sm bg-slate-900 text-slate-100">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-950/70 border-b border-slate-800 text-xs">
                      <span className="font-mono text-slate-400">{section.codeSnippet.language}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(section.codeSnippet!.code, idx)}
                        className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
                      >
                        {copiedCodeIndex === idx ? (
                          <>
                            <Check className="w-3 h-3 text-green-400" />
                            <span className="text-green-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed text-slate-200">
                      <code>{section.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {/* Bullet Points */}
                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="space-y-2.5 my-4">
                    {section.bulletPoints.map((bp, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700 dark:text-[#D1D5DB] leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-red mt-2.5 flex-shrink-0" />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Key Takeaway Callout Box */}
                {section.keyTakeaway && (
                  <div className="my-6 p-5 rounded-2xl bg-red-50/70 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-darkred dark:text-red-400 mb-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>Key Takeaway</span>
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-[#F8FAFC] leading-snug">
                      {section.keyTakeaway}
                    </p>
                  </div>
                )}
              </section>
            ))}

            {/* Article Tags */}
            <div className="pt-8 border-t border-slate-200 dark:border-[#252932]">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-500 dark:text-[#7F8795] uppercase tracking-wider">
                <TagIcon className="w-3.5 h-3.5" />
                <span>Related Topics & Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/blogs?tag=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 rounded-xl text-xs font-medium bg-slate-100 dark:bg-[#15171C] text-slate-700 dark:text-[#A7AFBD] hover:border-brand-red/30 hover:text-brand-red dark:hover:text-red-400 border border-slate-200 dark:border-[#252932] transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Author Profile Card */}
            <div className="pt-6">
              <h3 className="text-sm font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider mb-4">
                About the Author
              </h3>
              <AuthorCard author={post.author} articleCount={authorOtherArticles.length + 1} />
            </div>

            {/* Previous & Next Post Navigation */}
            <div className="pt-6 border-t border-slate-200 dark:border-[#252932] grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevPost ? (
                <Link
                  to={`/blogs/${prevPost.slug}`}
                  className="p-4 rounded-2xl bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] hover:border-brand-red/40 transition-all text-left flex flex-col justify-between group"
                >
                  <span className="text-[11px] font-semibold text-slate-400 dark:text-[#7F8795] flex items-center gap-1 mb-1">
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    Previous Article
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-[#F8FAFC] group-hover:text-brand-red dark:group-hover:text-red-400 transition-colors line-clamp-2">
                    {prevPost.title}
                  </span>
                </Link>
              ) : <div />}

              {nextPost ? (
                <Link
                  to={`/blogs/${nextPost.slug}`}
                  className="p-4 rounded-2xl bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] hover:border-brand-red/40 transition-all text-right flex flex-col justify-between group"
                >
                  <span className="text-[11px] font-semibold text-slate-400 dark:text-[#7F8795] flex items-center justify-end gap-1 mb-1">
                    Next Article
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-[#F8FAFC] group-hover:text-brand-red dark:group-hover:text-red-400 transition-colors line-clamp-2">
                    {nextPost.title}
                  </span>
                </Link>
              ) : <div />}
            </div>
          </main>
        </div>

        {/* 5. Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t border-slate-200 dark:border-[#252932]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                  Recommended Reading
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-[#A7AFBD] mt-1">
                  More insights from {segmentMeta?.label || 'Knowledge Hub'}
                </p>
              </div>
              <Link
                to="/blogs"
                className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relPost) => (
                <BlogCard key={relPost.id} post={relPost} variant="compact" />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
