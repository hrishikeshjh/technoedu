import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Check
} from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const BlogContributePage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    // Simulate clean local validation and processing
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 600);
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
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4 max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800/40 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                  Submission Received!
                </h3>
                <p className="text-sm text-slate-600 dark:text-[#A7AFBD] leading-relaxed">
                  Thank you, <strong className="text-slate-900 dark:text-white">{formData.fullName}</strong>. Your proposal for <em className="text-brand-red">"{formData.articleTitle}"</em> has been recorded locally. Our editorial coordinators review submissions on a weekly cadence.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
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
                    className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-[#252932] text-xs font-bold text-slate-700 dark:text-[#F8FAFC] hover:bg-slate-50 dark:hover:bg-[#15171C] transition-colors"
                  >
                    Submit Another Idea
                  </button>
                  <Link
                    to="/blogs"
                    className="px-5 py-2.5 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-brand-darkred transition-colors shadow-red-glow"
                  >
                    Back to Knowledge Hub
                  </Link>
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
