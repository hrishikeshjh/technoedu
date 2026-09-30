import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, BookOpen, GraduationCap, Compass, Briefcase } from 'lucide-react';
import { BlogPost, BlogAudience } from '../../types/blog';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'standard' | 'featured-large' | 'featured-compact' | 'compact';
  className?: string;
  onTagClick?: (tag: string) => void;
  onAudienceClick?: (audience: BlogAudience) => void;
}

const audienceLabelMap: Record<BlogAudience, { label: string; icon: React.ReactNode }> = {
  students: {
    label: 'For Students',
    icon: <GraduationCap className="w-3 h-3 text-brand-red" />,
  },
  subjects: {
    label: 'Subjects',
    icon: <BookOpen className="w-3 h-3 text-brand-red" />,
  },
  mentors: {
    label: 'Lifelong Mentors',
    icon: <Compass className="w-3 h-3 text-brand-red" />,
  },
  professionals: {
    label: 'Educationists & Pros',
    icon: <Briefcase className="w-3 h-3 text-brand-red" />,
  },
};

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80';

export const BlogCard: React.FC<BlogCardProps> = ({
  post,
  variant = 'standard',
  className = '',
  onTagClick,
  onAudienceClick,
}) => {
  const audienceInfo = audienceLabelMap[post.audience] || audienceLabelMap.students;

  // 1. Featured Large Variant
  if (variant === 'featured-large') {
    return (
      <article
        className={`group relative bg-white dark:bg-[#111318] rounded-2xl border border-slate-200 dark:border-[#252932] overflow-hidden shadow-card hover:shadow-card-hover hover:border-brand-red/40 dark:hover:border-brand-red/40 transition-all duration-300 flex flex-col lg:flex-row ${className}`}
      >
        {/* Image Column */}
        <div className="lg:w-1/2 relative overflow-hidden bg-slate-100 dark:bg-[#15171C] aspect-[16/10] lg:aspect-auto">
          <img
            src={post.image || DEFAULT_FALLBACK_IMAGE}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = DEFAULT_FALLBACK_IMAGE;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
          <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 dark:bg-[#08090B]/95 text-slate-900 dark:text-white backdrop-blur-md shadow-sm border border-slate-200/50 dark:border-white/10">
              {audienceInfo.icon}
              <span>{audienceInfo.label}</span>
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-red text-white shadow-sm">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content Column */}
        <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-5">
          <div className="space-y-3.5">
            <div className="hidden lg:flex items-center gap-2">
              <button
                type="button"
                onClick={() => onAudienceClick?.(post.audience)}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-50 text-brand-darkred dark:bg-red-950/40 dark:text-red-400 border border-red-100 dark:border-red-900/30 hover:bg-red-100 transition-colors"
              >
                {audienceInfo.icon}
                <span>{audienceInfo.label}</span>
              </button>
              <span className="text-slate-300 dark:text-[#252932]">•</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-[#A7AFBD]">
                {post.subject}
              </span>
            </div>

            <Link to={`/blogs/${post.slug}`} className="block group-hover:text-brand-red transition-colors">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] leading-snug group-hover:text-brand-red dark:group-hover:text-red-400 transition-colors">
                {post.title}
              </h3>
            </Link>

            <p className="text-sm text-slate-600 dark:text-[#A7AFBD] leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {post.tags.slice(0, 3).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onTagClick?.(tag)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] text-slate-600 dark:text-[#A7AFBD] hover:border-brand-red/30 hover:text-brand-red dark:hover:text-red-400 transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Author & Meta footer */}
          <div className="pt-4 border-t border-slate-100 dark:border-[#252932] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={post.authorAvatar || post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-[#252932]"
              />
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC]">
                  {post.author.name}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-[#A7AFBD] line-clamp-1">
                  {post.authorRole}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-right">
              <div className="text-[11px] text-slate-400 dark:text-[#7F8795] flex flex-col items-end">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {post.readingTime}
                </span>
                <span>{post.date}</span>
              </div>
              <Link
                to={`/blogs/${post.slug}`}
                aria-label={`Read article: ${post.title}`}
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#15171C] hover:bg-brand-red hover:text-white dark:hover:bg-brand-red text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors shadow-xs"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // 2. Featured Compact Variant (for the 2-4 cards alongside large featured)
  if (variant === 'featured-compact') {
    return (
      <article
        className={`group bg-white dark:bg-[#111318] rounded-2xl border border-slate-200 dark:border-[#252932] p-4 sm:p-5 shadow-card hover:shadow-card-hover hover:border-brand-red/40 dark:hover:border-brand-red/40 transition-all duration-300 flex flex-col justify-between ${className}`}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-brand-darkred dark:bg-red-950/40 dark:text-red-400 border border-red-100 dark:border-red-900/30">
              {audienceInfo.icon}
              <span>{post.category}</span>
            </span>
            <span className="text-[11px] text-slate-400 dark:text-[#7F8795] flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readingTime}
            </span>
          </div>

          <Link to={`/blogs/${post.slug}`} className="block">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-[#F8FAFC] leading-snug group-hover:text-brand-red dark:group-hover:text-red-400 transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 dark:text-[#A7AFBD] leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        </div>

        <div className="pt-3 mt-3 border-t border-slate-100 dark:border-[#252932] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={post.authorAvatar || post.author.avatar}
              alt={post.author.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs font-medium text-slate-700 dark:text-[#F8FAFC] truncate max-w-[130px]">
              {post.author.name}
            </span>
          </div>
          <Link
            to={`/blogs/${post.slug}`}
            className="text-xs font-semibold text-brand-red hover:underline flex items-center gap-0.5"
          >
            <span>Read</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </article>
    );
  }

  // 3. Compact Variant (for Home & Related items)
  if (variant === 'compact') {
    return (
      <article
        className={`group bg-white dark:bg-[#111318] rounded-2xl border border-slate-200 dark:border-[#252932] overflow-hidden shadow-card hover:shadow-card-hover hover:border-brand-red/40 dark:hover:border-brand-red/40 transition-all duration-300 flex flex-col justify-between h-full ${className}`}
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-[#15171C]">
          <img
            src={post.image || DEFAULT_FALLBACK_IMAGE}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = DEFAULT_FALLBACK_IMAGE;
            }}
          />
          <div className="absolute top-2.5 left-2.5">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/95 dark:bg-[#08090B]/90 backdrop-blur text-brand-darkred dark:text-red-400 shadow-xs border border-slate-200/50 dark:border-white/10">
              {post.category}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-[#A7AFBD]">
              <span>{post.subject}</span>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>

            <Link to={`/blogs/${post.slug}`} className="block">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-[#F8FAFC] group-hover:text-brand-red dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h3>
            </Link>

            <p className="text-xs text-slate-600 dark:text-[#A7AFBD] line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-[#252932] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 truncate">
              <img
                src={post.authorAvatar || post.author.avatar}
                alt={post.author.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="font-semibold text-slate-700 dark:text-[#F8FAFC] truncate">
                {post.author.name}
              </span>
            </div>
            <Link
              to={`/blogs/${post.slug}`}
              className="text-brand-red font-bold hover:underline flex items-center gap-1 flex-shrink-0"
            >
              <span>Explore</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // 4. Default Standard Grid Card
  return (
    <article
      className={`group bg-white dark:bg-[#111318] rounded-2xl border border-slate-200 dark:border-[#252932] overflow-hidden shadow-card hover:shadow-card-hover hover:border-brand-red/40 dark:hover:border-brand-red/40 transition-all duration-300 flex flex-col justify-between h-full ${className}`}
    >
      {/* Cover Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-[#15171C]">
        <img
          src={post.image || DEFAULT_FALLBACK_IMAGE}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = DEFAULT_FALLBACK_IMAGE;
          }}
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10 flex-wrap">
          <button
            type="button"
            onClick={() => onAudienceClick?.(post.audience)}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 dark:bg-[#08090B]/95 text-slate-900 dark:text-white backdrop-blur-md shadow-xs border border-slate-200/50 dark:border-white/10 hover:border-brand-red/30 transition-colors"
          >
            {audienceInfo.icon}
            <span>{audienceInfo.label}</span>
          </button>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-red text-white shadow-xs">
            {post.category}
          </span>
        </div>

        {post.difficulty && (
          <div className="absolute bottom-2.5 right-2.5 z-10">
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/70 backdrop-blur text-white">
              {post.difficulty}
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-[#A7AFBD]">
            <span className="font-semibold text-brand-darkred dark:text-red-400">
              {post.subject}
            </span>
            <span className="flex items-center gap-1 text-slate-400 dark:text-[#7F8795]">
              <Clock className="w-3 h-3" />
              {post.readingTime}
            </span>
          </div>

          <Link to={`/blogs/${post.slug}`} className="block">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F8FAFC] group-hover:text-brand-red dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
              {post.title}
            </h3>
          </Link>

          <p className="text-xs sm:text-[13px] text-slate-600 dark:text-[#A7AFBD] line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 pt-1">
            {post.tags.slice(0, 3).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onTagClick?.(tag)}
                className="text-[10px] px-2 py-0.5 rounded bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] text-slate-600 dark:text-[#A7AFBD] hover:border-brand-red/30 hover:text-brand-red dark:hover:text-red-400 transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Card Footer: Author + Read Link */}
        <div className="pt-3 border-t border-slate-100 dark:border-[#252932] flex items-center justify-between">
          <div className="flex items-center gap-2.5 truncate max-w-[70%]">
            <img
              src={post.authorAvatar || post.author.avatar}
              alt={post.author.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 dark:ring-[#252932] flex-shrink-0"
            />
            <div className="truncate">
              <div className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC] truncate">
                {post.author.name}
              </div>
              <div className="text-[10px] text-slate-400 dark:text-[#7F8795] truncate">
                {post.authorRole}
              </div>
            </div>
          </div>

          <Link
            to={`/blogs/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-red hover:text-brand-darkred dark:text-red-400 transition-colors flex-shrink-0"
          >
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
