import React from 'react';
import { ExternalLink, Globe, Award, CheckCircle } from 'lucide-react';
import { BlogAuthor } from '../../types/blog';

interface AuthorCardProps {
  author: BlogAuthor;
  articleCount?: number;
  className?: string;
}

const roleBadgeMap: Record<string, string> = {
  student: 'Student Contributor',
  teacher: 'Faculty / Professor',
  mentor: 'Lifelong Mentor',
  researcher: 'Research Scientist',
  engineer: 'Industry Engineer',
  developer: 'Open Source Builder',
  founder: 'Technology Founder',
  scientist: 'Domain Scientist',
  designer: 'Product Designer',
  educationist: 'Educationist',
  professional: 'Industry Specialist',
};

// Inline SVGs for social platforms
const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const TwitterIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export const AuthorCard: React.FC<AuthorCardProps> = ({ author, articleCount, className = '' }) => {
  return (
    <div
      className={`bg-slate-50/70 dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-2xl p-6 sm:p-7 shadow-xs ${className}`}
    >
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-slate-200 dark:ring-[#252932] shadow-sm"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=e11d48&color=fff&bold=true`;
            }}
          />
          <div className="absolute -bottom-1.5 -right-1.5 bg-brand-red text-white p-1 rounded-full shadow-xs">
            <CheckCircle className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F8FAFC]">
                  {author.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-brand-darkred dark:bg-red-950/40 dark:text-red-400 border border-red-100 dark:border-red-900/30">
                  {roleBadgeMap[author.contributorType] || author.contributorType}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-[#A7AFBD] mt-0.5">
                {author.role} {author.affiliation ? `• ${author.affiliation}` : ''}
              </p>
            </div>

            {articleCount !== undefined && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-white dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] text-slate-600 dark:text-[#A7AFBD]">
                {articleCount} {articleCount === 1 ? 'Article' : 'Articles'}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A7AFBD] leading-relaxed">
            {author.bio}
          </p>

          {/* Expertise Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {author.expertise.map((skill) => (
              <span
                key={skill}
                className="text-[11px] px-2 py-0.5 rounded-md bg-white dark:bg-[#15171C] border border-slate-200/80 dark:border-[#252932] text-slate-600 dark:text-[#A7AFBD]"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Social Links */}
          {author.socials && (
            <div className="flex items-center gap-3 pt-2 text-xs">
              {author.socials.website && (
                <a
                  href={author.socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-brand-red dark:text-[#A7AFBD] dark:hover:text-red-400 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Website</span>
                </a>
              )}
              {author.socials.github && (
                <a
                  href={author.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-brand-red dark:text-[#A7AFBD] dark:hover:text-red-400 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {author.socials.linkedin && (
                <a
                  href={author.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-brand-red dark:text-[#A7AFBD] dark:hover:text-red-400 transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
              {author.socials.twitter && (
                <a
                  href={author.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-brand-red dark:text-[#A7AFBD] dark:hover:text-red-400 transition-colors"
                >
                  <TwitterIcon className="w-3.5 h-3.5" />
                  <span>Twitter</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
