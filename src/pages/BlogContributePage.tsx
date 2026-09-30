import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  PenTool,
  CheckCircle,
  Sparkles,
  GraduationCap,
  BookOpen,
  Compass,
  Briefcase,
  Users,
  Send,
  HelpCircle,
  FileText,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Check,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { addStoredBlogPost } from '../data/blogData';
import { BlogPost, BlogAudience, BlogContributorType, ContentSection } from '../types/blog';

function createBlogPostFromForm(data: {
  fullName: string;
  email: string;
  role: string;
  expertise: string;
  articleTitle: string;
  targetSegment: string;
  primarySubject: string;
  shortDescription: string;
  portfolioUrl: string;
  articleDraft: string;
}): BlogPost {
  const slugBase = data.articleTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  const slug = `${slugBase || 'article'}-${Date.now().toString().slice(-5)}`;
  const authorId = data.fullName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  // Map segment
  let audience: BlogAudience = 'students';
  if (data.targetSegment.includes('Subjects')) audience = 'subjects';
  else if (data.targetSegment.includes('Mentors')) audience = 'mentors';
  else if (data.targetSegment.includes('Professionals')) audience = 'professionals';

  // Map contributor type
  const roleLower = data.role.toLowerCase();
  let contributorType: BlogContributorType = 'student';
  if (roleLower.includes('teacher')) contributorType = 'teacher';
  else if (roleLower.includes('mentor')) contributorType = 'mentor';
  else if (roleLower.includes('researcher')) contributorType = 'researcher';
  else if (roleLower.includes('engineer')) contributorType = 'engineer';
  else if (roleLower.includes('founder')) contributorType = 'founder';
  else if (roleLower.includes('educationist')) contributorType = 'educationist';
  else if (roleLower.includes('professional')) contributorType = 'professional';

  // Parse draft into sections
  const draft = data.articleDraft.trim();
  const contentSections: ContentSection[] = [];
  const tableOfContents: { id: string; text: string; level: number }[] = [];

  if (draft) {
    const headerParts = draft.split(/^##\s+/m);
    if (headerParts.length > 1) {
      headerParts.forEach((part, idx) => {
        if (!part.trim()) return;
        const firstLineEnd = part.indexOf('\n');
        const heading = firstLineEnd !== -1 ? part.substring(0, firstLineEnd).trim() : `Section ${idx + 1}`;
        const bodyText = firstLineEnd !== -1 ? part.substring(firstLineEnd).trim() : part.trim();
        const secId = `section-${idx + 1}`;
        tableOfContents.push({ id: secId, text: heading, level: 2 });
        contentSections.push({
          id: secId,
          heading,
          body: bodyText.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean),
        });
      });
    } else {
      const paragraphs = draft.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
      contentSections.push({
        id: 'overview',
        heading: 'Overview & Context',
        body: paragraphs.slice(0, 2),
      });
      if (paragraphs.length > 2) {
        contentSections.push({
          id: 'deep-dive',
          heading: 'Core Insights & Methodology',
          body: paragraphs.slice(2),
        });
        tableOfContents.push({ id: 'overview', text: 'Overview & Context', level: 2 });
        tableOfContents.push({ id: 'deep-dive', text: 'Core Insights & Methodology', level: 2 });
      }
    }
  }

  if (contentSections.length === 0) {
    contentSections.push({
      id: 'abstract',
      heading: 'Abstract & Key Insights',
      body: [data.shortDescription],
      keyTakeaway: 'This paper has been published to the Open Knowledge Hub and queued for peer verification.',
    });
    tableOfContents.push({ id: 'abstract', text: 'Abstract & Key Insights', level: 2 });
  }

  const wordCount = (data.shortDescription + ' ' + data.articleDraft).split(/\s+/).length;
  const readingTime = `${Math.max(2, Math.ceil(wordCount / 160))} min read`;
  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.fullName)}&background=e11d48&color=fff&bold=true`;

  const subjectImages: Record<string, string> = {
    'Computer Science': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    'AI & Machine Learning': 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
    'Robotics & Control': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    'Mathematics': 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80',
    'Electronics': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'Software Engineering': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    'Cybersecurity': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    'Education': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
  };
  const image = subjectImages[data.primarySubject] || 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80';

  return {
    id: `post-${Date.now()}`,
    slug,
    title: data.articleTitle,
    excerpt: data.shortDescription,
    category: data.primarySubject,
    subject: data.primarySubject,
    audience,
    author: {
      id: authorId,
      name: data.fullName,
      role: `${data.role} in ${data.expertise}`,
      contributorType,
      avatar,
      bio: `${data.role} specializing in ${data.expertise}. Contributor to TechnoEdu Knowledge Hub.`,
      expertise: data.expertise.split(',').map(s => s.trim()).filter(Boolean),
      socials: data.portfolioUrl ? { website: data.portfolioUrl } : undefined,
    },
    authorRole: `${data.role} • ${data.expertise}`,
    authorAvatar: avatar,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readingTime,
    image,
    tags: [data.primarySubject, data.role, ...data.expertise.split(',').map(s => s.trim()).slice(0, 3)].filter(Boolean),
    featured: false,
    difficulty: 'Intermediate',
    status: 'queued_for_checking',
    submittedAt: new Date().toISOString(),
    tableOfContents,
    contentSections,
  };
}

export const BlogContributePage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedPost, setSubmittedPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'Student',
    expertise: '',
    articleTitle: '',
    targetSegment: 'For Students',
    primarySubject: 'Computer Science',
    shortDescription: '',
    portfolioUrl: '',
    articleDraft: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newPost = createBlogPostFromForm(formData);
      addStoredBlogPost(newPost);
      setSubmittedPost(newPost);
      setFormSubmitted(true);
      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    } catch (err) {
      console.error('Failed to publish article:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] pt-6 sm:pt-8 pb-20 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Knowledge Hub', path: '/blogs' },
            { label: 'Become a Contributor' },
          ]}
        />

        {/* Hero Section */}
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 text-brand-darkred dark:bg-red-950/40 dark:text-red-400 border border-red-100 dark:border-red-900/30 text-xs font-bold uppercase tracking-wider mb-4">
              <PenTool className="w-3.5 h-3.5" />
              <span>Contribute to Techno Wallah Knowledge Hub</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight leading-tight">
              Share Your Knowledge With{' '}
              <span className="text-brand-red">Curious Minds.</span>
            </h1>
            <p className="mt-4 text-slate-600 dark:text-[#A7AFBD] text-sm sm:text-base leading-relaxed">
              We publish rigorous, educational, and authentic perspectives from students who build, educators who teach, researchers who investigate, and professionals who solve real-world problems.
            </p>
          </div>
        </ScrollReveal>

        {/* Two Explanation Columns: Who Can Contribute & What You Can Write */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">

          {/* Column 1: Who Can Contribute */}
          <ScrollReveal animation="fade-up" delay={100} className="h-full">
            <div className="bg-slate-50/70 dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-2xl p-6 sm:p-7 shadow-xs h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/30 flex items-center justify-center text-brand-red mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-[#F8FAFC] mb-2">
                  Who Can Contribute?
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A7AFBD] mb-5">
                  Knowledge is not confined to one title or credential. We welcome authors from across all stages of learning and practice:
                </p>

                <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-700 dark:text-[#D1D5DB]">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#15171C] border border-slate-200/60 dark:border-[#252932]">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                    <span className="font-semibold">Students & Builders</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#15171C] border border-slate-200/60 dark:border-[#252932]">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                    <span className="font-semibold">Teachers & Faculty</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#15171C] border border-slate-200/60 dark:border-[#252932]">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                    <span className="font-semibold">Lifelong Mentors</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#15171C] border border-slate-200/60 dark:border-[#252932]">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                    <span className="font-semibold">Research Scholars</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#15171C] border border-slate-200/60 dark:border-[#252932]">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                    <span className="font-semibold">Software Engineers</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#15171C] border border-slate-200/60 dark:border-[#252932]">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                    <span className="font-semibold">Founders & Builders</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#15171C] border border-slate-200/60 dark:border-[#252932]">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                    <span className="font-semibold">Scientists & Theorists</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#15171C] border border-slate-200/60 dark:border-[#252932]">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                    <span className="font-semibold">Educationists</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-200 dark:border-[#252932] text-[11px] text-slate-500 dark:text-[#7F8795]">
                No prior publishing credentials required. Peer-reviewed by student leads and faculty advisors.
              </div>
            </div>
          </ScrollReveal>

          {/* Column 2: What You Can Write */}
          <ScrollReveal animation="fade-up" delay={150} className="h-full">
            <div className="bg-slate-50/70 dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-2xl p-6 sm:p-7 shadow-xs h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/30 flex items-center justify-center text-brand-red mb-4">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-[#F8FAFC] mb-2">
                  What Can You Write?
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A7AFBD] mb-5">
                  We look for thoughtful, knowledge-focused pieces rather than generic marketing or promotional articles:
                </p>

                <div className="space-y-2 text-xs text-slate-700 dark:text-[#D1D5DB]">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#15171C] border border-slate-200/60 dark:border-[#252932] flex items-center justify-between">
                    <span className="font-semibold">Deep-dive Technical Tutorials & Systems Guides</span>
                    <span className="text-[10px] text-brand-red font-bold">Code & Proofs</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#15171C] border border-slate-200/60 dark:border-[#252932] flex items-center justify-between">
                    <span className="font-semibold">Deconstructions of Academic Research Papers</span>
                    <span className="text-[10px] text-brand-red font-bold">Literature</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#15171C] border border-slate-200/60 dark:border-[#252932] flex items-center justify-between">
                    <span className="font-semibold">Real-world Project Ship Logs & Failure Post-mortems</span>
                    <span className="text-[10px] text-brand-red font-bold">Authentic</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#15171C] border border-slate-200/60 dark:border-[#252932] flex items-center justify-between">
                    <span className="font-semibold">Cross-disciplinary Insights & Pedagogical Lessons</span>
                    <span className="text-[10px] text-brand-red font-bold">Mentorship</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#15171C] border border-slate-200/60 dark:border-[#252932] flex items-center justify-between">
                    <span className="font-semibold">Open Source & Hackathon Playbooks</span>
                    <span className="text-[10px] text-brand-red font-bold">Actionable</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-200 dark:border-[#252932] text-[11px] text-slate-500 dark:text-[#7F8795]">
                Avoid promotional pitches or buzzword lists. Focus on substance, clarity, and reproducible knowledge.
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Contributor Submission Form */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-2xl p-6 sm:p-10 shadow-card">
            {formSubmitted && submittedPost ? (
              <div className="py-8 text-center space-y-5 max-w-xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800/40 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40">
                  <Clock className="w-3.5 h-3.5 animate-pulse" />
                  <span>Status: Queued for Checking</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-[#F8FAFC]">
                  Article Published &amp; Live!
                </h3>

                <p className="text-sm text-slate-600 dark:text-[#A7AFBD] leading-relaxed">
                  Thank you, <strong className="text-slate-900 dark:text-white">{submittedPost.author.name}</strong>. Your article has been published immediately to the Knowledge Hub and placed in the peer verification queue for fact-checking.
                </p>

                {/* Article Snapshot Card */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-red block mb-1">
                    {submittedPost.category} • {submittedPost.readingTime}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug mb-1">
                    {submittedPost.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-[#A7AFBD] line-clamp-2">
                    {submittedPost.excerpt}
                  </p>
                </div>

                {/* Direct Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    to={`/blogs/${submittedPost.slug}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-red text-white text-xs sm:text-sm font-bold hover:bg-brand-darkred transition-all shadow-red-glow"
                  >
                    <span>Read Your Live Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/blogs"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-[#1A1D23] border border-slate-200 dark:border-[#252932] text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold hover:bg-slate-200 dark:hover:bg-[#252932] transition-colors"
                  >
                    <span>Explore Knowledge Hub</span>
                  </Link>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setSubmittedPost(null);
                      setFormData({
                        fullName: '',
                        email: '',
                        role: 'Student',
                        expertise: '',
                        articleTitle: '',
                        targetSegment: 'For Students',
                        primarySubject: 'Computer Science',
                        shortDescription: '',
                        portfolioUrl: '',
                        articleDraft: '',
                      });
                    }}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-brand-red dark:hover:text-red-400 underline"
                  >
                    Write and submit another article
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="border-b border-slate-200 dark:border-[#252932] pb-6 mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                    Article Pitch &amp; Submission Form
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-[#A7AFBD] mt-1">
                    Fill out the fields below to pitch an idea or submit an existing draft for publication.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Full Name <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Hrishikesh Jha"
                        className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] text-sm text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Email Address <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@university.edu"
                        className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] text-sm text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Role & Expertise */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Primary Role <span className="text-brand-red">*</span>
                      </label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] text-sm text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                      >
                        <option value="Student">Student (Undergraduate / Graduate)</option>
                        <option value="Teacher">Teacher / University Professor</option>
                        <option value="Lifelong Mentor">Lifelong Mentor</option>
                        <option value="Researcher">Research Scholar / Scientist</option>
                        <option value="Software Engineer">Software / Systems Engineer</option>
                        <option value="Founder">Founder / Entrepreneur</option>
                        <option value="Educationist">Educationist / Curriculum Designer</option>
                        <option value="Industry Professional">Industry Professional</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Area of Expertise / Discipline <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="text"
                        name="expertise"
                        required
                        value={formData.expertise}
                        onChange={handleChange}
                        placeholder="e.g. Distributed Systems, Robotics, Pedagogy"
                        className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] text-sm text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 3: Target Segment & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Target Audience Segment <span className="text-brand-red">*</span>
                      </label>
                      <select
                        name="targetSegment"
                        value={formData.targetSegment}
                        onChange={handleChange}
                        className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] text-sm text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                      >
                        <option value="For Students">For Students (Learning & Career Guides)</option>
                        <option value="Subjects & Core Interests">Subjects & Core Interests (Technical Deep-dives)</option>
                        <option value="Lifelong Mentors">Lifelong Mentors (Pedagogy & Enduring Lessons)</option>
                        <option value="Educationists & Professionals">Educationists & Professionals (Industry Intersections)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Primary Subject / Domain <span className="text-brand-red">*</span>
                      </label>
                      <select
                        name="primarySubject"
                        value={formData.primarySubject}
                        onChange={handleChange}
                        className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] text-sm text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                      >
                        <option value="Computer Science">Computer Science</option>
                        <option value="AI & Machine Learning">AI & Machine Learning</option>
                        <option value="Robotics & Control">Robotics & Control</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Electronics">Electronics & Hardware</option>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="Education">Education & Pedagogy</option>
                        <option value="Cross-disciplinary">Cross-disciplinary Work</option>
                      </select>
                    </div>
                  </div>

                  {/* Proposed Article Title */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Proposed Article Title <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="text"
                      name="articleTitle"
                      required
                      value={formData.articleTitle}
                      onChange={handleChange}
                      placeholder="e.g. Understanding Consensus in Distributed Key-Value Stores"
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] text-sm text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                    />
                  </div>

                  {/* Short Pitch / Description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Short Pitch / Outline (2–4 sentences) <span className="text-brand-red">*</span>
                    </label>
                    <textarea
                      name="shortDescription"
                      required
                      rows={3}
                      value={formData.shortDescription}
                      onChange={handleChange}
                      placeholder="Explain the problem your article addresses and the concrete takeaways readers will gain."
                      className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] text-sm text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all leading-relaxed"
                    />
                  </div>

                  {/* Portfolio or Profile Link */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Portfolio, GitHub, or LinkedIn URL
                    </label>
                    <input
                      type="url"
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleChange}
                      placeholder="https://github.com/yourusername"
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] text-sm text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                    />
                  </div>

                  {/* Draft / Content Submission (Optional if pitch only) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Article Content / Draft (Optional if pitching an idea)
                      </label>
                      <span className="text-[11px] text-slate-400 dark:text-[#7F8795]">
                        Markdown supported
                      </span>
                    </div>
                    <textarea
                      name="articleDraft"
                      rows={6}
                      value={formData.articleDraft}
                      onChange={handleChange}
                      placeholder="Paste your rough draft, section outlines, or full article text here if already written..."
                      className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] text-sm font-mono text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-[11px] text-slate-500 dark:text-[#7F8795]">
                      All submissions are evaluated under Open Educational Resource (OER) principles. No paywalls.
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-red text-white text-sm font-bold shadow-red-glow hover:bg-brand-darkred transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Processing Pitch...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Pitch for Review</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>
            )}
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
