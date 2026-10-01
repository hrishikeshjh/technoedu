import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
  ExternalLink,
  Image as ImageIcon,
  UploadCloud,
  Trash2,
  Link2
} from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { addStoredBlogPost, getBlogPostBySlug } from '../data/blogData';
import { BlogPost, BlogAudience, BlogContributorType, ContentSection } from '../types/blog';

function createBlogPostFromForm(
  data: {
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
    customImage?: string;
  },
  existingId?: string,
  existingSlug?: string
): BlogPost {
  const slugBase = data.articleTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  const slug = existingSlug || `${slugBase || 'article'}-${Date.now().toString().slice(-5)}`;
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
      keyTakeaway: 'This article is published and open to the entire TechnoEdu learning community.',
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
  const image = data.customImage?.trim() || subjectImages[data.primarySubject] || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80';

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
    status: 'approved',
    submittedAt: new Date().toISOString(),
    tableOfContents,
    contentSections,
  };
}

export const BlogContributePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const editSlug = searchParams.get('edit');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingPostSlug, setEditingPostSlug] = useState<string | null>(null);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageTab, setImageTab] = useState<'upload' | 'url'>('upload');
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
    customImage: '',
  });

  useEffect(() => {
    if (editSlug) {
      const existing = getBlogPostBySlug(editSlug);
      if (existing) {
        setEditingPostId(existing.id);
        setEditingPostSlug(existing.slug);
        const reconstructedDraft = existing.contentSections
          ?.map((s) => `## ${s.heading}\n\n${s.body.join('\n\n')}`)
          .join('\n\n') || '';
        setFormData({
          fullName: existing.author.name || '',
          email: '',
          role: existing.author.role ? existing.author.role.split(' in ')[0] : 'Student',
          expertise: existing.author.expertise?.join(', ') || '',
          articleTitle: existing.title || '',
          targetSegment: existing.audience === 'students' ? 'For Students' : 'Subjects & Core Interests',
          primarySubject: existing.subject || existing.category || 'Computer Science',
          shortDescription: existing.excerpt || '',
          portfolioUrl: existing.author.socials?.website || '',
          articleDraft: reconstructedDraft,
          customImage: existing.image || '',
        });
        if (existing.image) {
          setImagePreview(existing.image);
          if (!existing.image.startsWith('data:')) {
            setImageTab('url');
          }
        }
      }
    }
  }, [editSlug]);

function compressImageFile(file: File, maxWidth = 1200, quality = 0.82): Promise<string> {
  return new Promise((resolve) => {
    if (file.type === 'image/svg+xml' || file.size < 50 * 1024) {
      const reader = new FileReader();
      reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '');
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(typeof e.target?.result === 'string' ? e.target.result : '');
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const format = file.type === 'image/png' ? 'image/jpeg' : (file.type || 'image/jpeg');
        const compressed = canvas.toDataURL(format, quality);
        resolve(compressed);
      };
      img.onerror = () => {
        resolve(typeof e.target?.result === 'string' ? e.target.result : '');
      };
      img.src = typeof e.target?.result === 'string' ? e.target.result : '';
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      alert('File size exceeds 15MB. Please choose a smaller image.');
      return;
    }
    const compressed = await compressImageFile(file);
    if (compressed) {
      setImagePreview(compressed);
      setFormData((prev) => ({ ...prev, customImage: compressed }));
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImagePreview(url);
    setFormData((prev) => ({ ...prev, customImage: url }));
  };

  const handleClearImage = () => {
    setImagePreview('');
    setFormData((prev) => ({ ...prev, customImage: '' }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newPost = createBlogPostFromForm(formData, editingPostId || undefined, editingPostSlug || undefined);
      await addStoredBlogPost(newPost);
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

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400 border border-green-200 dark:border-green-800/40">
                  <Check className="w-3.5 h-3.5 text-green-500" />
                  <span>Published &amp; Live Instantly</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-[#F8FAFC]">
                  Article Published!
                </h3>

                <p className="text-sm text-slate-600 dark:text-[#A7AFBD] leading-relaxed">
                  Thank you, <strong className="text-slate-900 dark:text-white">{submittedPost.author.name}</strong>. Your article and cover picture are now live and published on the Knowledge Hub.
                </p>

                {/* Article Snapshot Card with Image */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] text-left flex gap-4 items-center">
                  <img
                    src={submittedPost.image}
                    alt={submittedPost.title}
                    className="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-xl border border-slate-200 dark:border-[#252932] flex-shrink-0"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-red block mb-1">
                      {submittedPost.category} • {submittedPost.readingTime}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug mb-1 truncate">
                      {submittedPost.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-[#A7AFBD] line-clamp-1">
                      {submittedPost.excerpt}
                    </p>
                  </div>
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
                      setImagePreview('');
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
                        customImage: '',
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

                  {/* Article Cover Picture Upload / URL */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Article Cover Picture (Upload or Paste URL)
                      </label>
                      <div className="flex items-center gap-1 p-0.5 bg-slate-100 dark:bg-[#1a1d24] rounded-lg border border-slate-200 dark:border-[#252932] text-xs">
                        <button
                          type="button"
                          onClick={() => setImageTab('upload')}
                          className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                            imageTab === 'upload'
                              ? 'bg-white dark:bg-[#111318] text-brand-red shadow-xs'
                              : 'text-slate-600 dark:text-[#A7AFBD] hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          Upload File
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageTab('url')}
                          className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                            imageTab === 'url'
                              ? 'bg-white dark:bg-[#111318] text-brand-red shadow-xs'
                              : 'text-slate-600 dark:text-[#A7AFBD] hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          Image / R2 URL
                        </button>
                      </div>
                    </div>

                    {imageTab === 'upload' ? (
                      <div className="relative border-2 border-dashed border-slate-300 dark:border-[#2E333D] hover:border-brand-red/60 rounded-2xl p-6 text-center transition-all bg-slate-50/50 dark:bg-[#0E1015]/60">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          id="article-image-upload"
                          className="sr-only"
                        />
                        <label
                          htmlFor="article-image-upload"
                          className="cursor-pointer flex flex-col items-center justify-center gap-2"
                        >
                          <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/30 flex items-center justify-center text-brand-red">
                            <UploadCloud className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-brand-red hover:underline">
                              Click to choose an image
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {' '}or drag & drop
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-[#7F8795]">
                            PNG, JPG, WEBP, or SVG up to 8MB. Appears as your article's main banner.
                          </p>
                        </label>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Link2 className="w-4 h-4" />
                        </div>
                        <input
                          type="url"
                          value={formData.customImage.startsWith('data:') ? '' : formData.customImage}
                          onChange={handleImageUrlChange}
                          placeholder="https://pub-3f62a1750c20425f95e67ab76e9d98ea.r2.dev/your-image.png or any web URL"
                          className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] text-sm text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                        />
                      </div>
                    )}

                    {/* Preview Area */}
                    {imagePreview && (
                      <div className="flex items-center gap-4 p-3 bg-white dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-xl">
                        <div className="w-20 h-14 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 shrink-0 border border-slate-200/80 dark:border-[#2E333D]">
                          <img
                            src={imagePreview}
                            alt="Cover Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                            Cover Image Attached
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-[#A7AFBD] truncate">
                            Will be displayed on your live article card and header
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleClearImage}
                          className="px-2.5 py-1.5 rounded-lg border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    )}
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

                  {/* Draft / Content Submission */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Article Content / Draft
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
                      {editingPostId
                        ? 'Changes are saved immediately and reflect across the website.'
                        : 'All published articles become live immediately across the TechnoEdu network.'}
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-red text-white text-sm font-bold shadow-red-glow hover:bg-brand-darkred transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>{editingPostId ? 'Saving Changes...' : 'Publishing Article...'}</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{editingPostId ? 'Save & Update Article' : 'Publish Article Instantly'}</span>
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
