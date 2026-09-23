import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  MapPin,
  Globe,
  ShieldCheck,
  Accessibility,
  FileText,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { RoseLoader } from '../components/common/RoseLoader';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { Breadcrumb } from '../components/common/Breadcrumb';

const GIL_SANS = { fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' };

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Contact form submission:', formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again later or email us directly.');
    }
  };

  return (
    <div className="w-full bg-white dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] pt-6 sm:pt-8 pb-16 transition-colors duration-200" style={GIL_SANS}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Contact' }]} />

        {/* Hero Section */}
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-brand-darkred dark:bg-red-950/40 dark:text-red-400 dark:border dark:border-red-900/30 text-xs font-bold uppercase tracking-wider mb-4">
              <MessageSquare className="w-3.5 h-3.5 text-brand-red" />
              <span>Contact &amp; Academic Support</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
              Get in Touch with Us
            </h1>
            <p className="mt-3 sm:mt-4 text-slate-500 dark:text-[#A7AFBD] text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">
              Have questions regarding open educational resources, syllabus indexing, or want to suggest verified public repositories? We're here to help.
            </p>
          </div>
        </ScrollReveal>

        {/* Main 2-Column Grid: Left Contact Info (5 cols) & Right Form (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Contact Channels & Campus Desk */}
          <div className="lg:col-span-5 space-y-4 min-w-0">

            {/* Channel 1: Academic Support */}
            <div className="bg-white dark:bg-[#111318] rounded-2xl p-5 border border-slate-200/90 dark:border-[#252932] shadow-soft hover:border-brand-red/40 hover:shadow-card-hover transition-all duration-200">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-100/80 dark:border-red-900/30 flex items-center justify-center text-brand-red flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-slate-900 dark:text-[#F8FAFC] text-sm">Academic Support</h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-50 text-brand-darkred dark:bg-red-950/40 dark:text-red-400">
                      Primary
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-[#A7AFBD] mt-1">General inquiries, syllabus guidance, or exam queries</p>
                  <a
                    href="mailto:support@technowallah.in"
                    className="mt-2 inline-block text-xs font-semibold text-brand-red hover:text-brand-darkred hover:underline break-all"
                  >
                    support@technowallah.in
                  </a>
                  <p className="mt-1 text-[11px] text-slate-400 dark:text-[#7F8795]">Response within 24 business hours</p>
                </div>
              </div>
            </div>

            {/* Channel 2: OER Content Curation */}
            <div className="bg-white dark:bg-[#111318] rounded-2xl p-5 border border-slate-200/90 dark:border-[#252932] shadow-soft hover:border-brand-red/40 hover:shadow-card-hover transition-all duration-200">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-100/80 dark:border-red-900/30 flex items-center justify-center text-brand-red flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-900 dark:text-[#F8FAFC] text-sm">OER Resource Curation</h3>
                  <p className="text-xs text-slate-500 dark:text-[#A7AFBD] mt-1">Suggest open textbooks, PYQ links, or report broken resources</p>
                  <a
                    href="mailto:curation@technowallah.in"
                    className="mt-2 inline-block text-xs font-semibold text-brand-red hover:text-brand-darkred hover:underline break-all"
                  >
                    curation@technowallah.in
                  </a>
                </div>
              </div>
            </div>

            {/* Channel 3: Privacy & Data Protection */}
            <div className="bg-white dark:bg-[#111318] rounded-2xl p-5 border border-slate-200/90 dark:border-[#252932] shadow-soft hover:border-brand-red/40 hover:shadow-card-hover transition-all duration-200">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-100/80 dark:border-red-900/30 flex items-center justify-center text-brand-red flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-900 dark:text-[#F8FAFC] text-sm">Privacy &amp; Data Rights</h3>
                  <p className="text-xs text-slate-500 dark:text-[#A7AFBD] mt-1">DPDP / GDPR inquiries, privacy concerns, and compliance</p>
                  <a
                    href="mailto:privacy@technowallah.in"
                    className="mt-2 inline-block text-xs font-semibold text-brand-red hover:text-brand-darkred hover:underline break-all"
                  >
                    privacy@technowallah.in
                  </a>
                </div>
              </div>
            </div>

            {/* Channel 4: Campus Center */}
            <div className="bg-white dark:bg-[#111318] rounded-2xl p-5 border border-slate-200/90 dark:border-[#252932] shadow-soft hover:border-brand-red/40 hover:shadow-card-hover transition-all duration-200">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-100/80 dark:border-red-900/30 flex items-center justify-center text-brand-red flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-900 dark:text-[#F8FAFC] text-sm">Campus Desk</h3>
                  <p className="text-xs text-slate-600 dark:text-[#A7AFBD] mt-1 leading-relaxed">
                    Techno India Campus • Salt Lake<br />
                    EM-4/1, Sector V, Bidhannagar, Kolkata, West Bengal 700091
                  </p>
                  <p className="mt-2 text-[11px] text-slate-400 dark:text-[#7F8795]">
                    Open education initiative desk for physical correspondence.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Interactive Contact Form */}
          <div className="lg:col-span-7 min-w-0">
            <div className="bg-white dark:bg-[#111318] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-[#252932] shadow-soft hover:shadow-card-hover transition-all duration-300">
              
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-[#252932]">
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-100/80 dark:border-red-900/30 flex items-center justify-center text-brand-red flex-shrink-0">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-[#F8FAFC]">Send Us a Direct Message</h2>
                  <p className="text-xs text-slate-500 dark:text-[#A7AFBD]">Fill out your inquiry and our academic desk will get in touch.</p>
                </div>
              </div>

              {/* Success Notification */}
              {status === 'success' && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-emerald-950/30 border border-red-200 dark:border-emerald-800/50 animate-fade-in-smooth flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-red-100 dark:bg-emerald-900/50 flex items-center justify-center text-brand-red dark:text-emerald-400 flex-shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-[#F8FAFC] text-sm">Message Sent Successfully!</p>
                    <p className="text-xs text-slate-600 dark:text-[#A7AFBD] mt-0.5">Thank you for contacting us. We'll respond within 1–2 business days.</p>
                  </div>
                </div>
              )}

              {/* Error Notification */}
              {status === 'error' && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 animate-fade-in-smooth flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-brand-red dark:text-red-400 flex-shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-brand-darkred dark:text-red-300 text-sm">Unable to Send Message</p>
                    <p className="text-xs text-brand-red dark:text-red-400 mt-0.5">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-slate-700 dark:text-[#F8FAFC] mb-1.5">
                      Full Name <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 dark:placeholder:text-[#7F8795] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red focus:bg-white dark:focus:bg-[#15171C] transition-all disabled:opacity-50"
                      placeholder="Your full name"
                      required
                      autoComplete="name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-slate-700 dark:text-[#F8FAFC] mb-1.5">
                      Email Address <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 dark:placeholder:text-[#7F8795] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red focus:bg-white dark:focus:bg-[#15171C] transition-all disabled:opacity-50"
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Subject Dropdown */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-slate-700 dark:text-[#F8FAFC] mb-1.5">
                    Subject / Category <span className="text-brand-red">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red focus:bg-white dark:focus:bg-[#15171C] transition-all disabled:opacity-50 cursor-pointer"
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="academic">Academic &amp; Syllabus Guidance</option>
                    <option value="content">Content Suggestion or Correction</option>
                    <option value="broken-link">Report Broken External Link</option>
                    <option value="new-resource">Suggest Verified OER Material</option>
                    <option value="privacy">Privacy &amp; Data Rights (DPDP)</option>
                    <option value="partnership">University / Campus Collaboration</option>
                    <option value="technical">Technical Support or Bug Report</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-slate-700 dark:text-[#F8FAFC] mb-1.5">
                    Message <span className="text-brand-red">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    rows={5}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 dark:placeholder:text-[#7F8795] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red focus:bg-white dark:focus:bg-[#15171C] transition-all disabled:opacity-50 resize-y min-h-[130px]"
                    placeholder="Describe your question or feedback in detail..."
                    required
                  />
                </div>

                {/* Privacy Consent */}
                <div className="flex items-start gap-2.5 text-xs text-slate-500 dark:text-[#A7AFBD] p-3.5 bg-slate-50 dark:bg-[#0E1015] border border-slate-100 dark:border-[#252932] rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    By submitting this form, you agree to our{' '}
                    <Link to="/privacy-policy" className="text-brand-red hover:underline font-semibold">
                      Privacy Policy
                    </Link>{' '}
                    and consent to processing your details to respond to your inquiry. We never share your contact information.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto px-7 py-3 rounded-xl bg-brand-red text-white text-xs sm:text-sm font-bold hover:bg-brand-darkred transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center shadow-red-glow hover:-translate-y-0.5"
                  >
                    {status === 'submitting' ? (
                      <div className="flex items-center gap-2">
                        <RoseLoader mode="inline" size={18} color="#ffffff" showNumbers={false} text="" />
                        <span>Sending Message...</span>
                      </div>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

        {/* Quick Policies & Reference Row */}
        <div className="mt-14 pt-10 border-t border-slate-200 dark:border-[#252932]">
          <div className="text-center mb-6">
            <h3 className="font-extrabold text-slate-900 dark:text-[#F8FAFC] text-sm sm:text-base">
              Quick Reference &amp; Guidelines
            </h3>
            <p className="text-xs text-slate-500 dark:text-[#A7AFBD] mt-1">
              Direct access to initiative documentation, rights, and policies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/privacy-policy"
              className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111318] border border-slate-200/80 dark:border-[#252932] hover:border-brand-red/40 hover:bg-white dark:hover:bg-[#15171C] transition-all text-center group"
            >
              <ShieldCheck className="w-5 h-5 text-brand-red mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC]">Privacy Policy</p>
              <p className="text-[11px] text-slate-500 dark:text-[#7F8795] mt-0.5">DPDP compliance &amp; student rights</p>
            </Link>

            <Link
              to="/terms"
              className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111318] border border-slate-200/80 dark:border-[#252932] hover:border-brand-red/40 hover:bg-white dark:hover:bg-[#15171C] transition-all text-center group"
            >
              <FileText className="w-5 h-5 text-brand-red mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC]">Terms &amp; Fair Use</p>
              <p className="text-[11px] text-slate-500 dark:text-[#7F8795] mt-0.5">Open education resource terms</p>
            </Link>

            <Link
              to="/accessibility"
              className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111318] border border-slate-200/80 dark:border-[#252932] hover:border-brand-red/40 hover:bg-white dark:hover:bg-[#15171C] transition-all text-center group"
            >
              <Accessibility className="w-5 h-5 text-brand-red mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC]">Accessibility</p>
              <p className="text-[11px] text-slate-500 dark:text-[#7F8795] mt-0.5">WCAG 2.1 AA academic standards</p>
            </Link>

            <Link
              to="/disclaimer"
              className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111318] border border-slate-200/80 dark:border-[#252932] hover:border-brand-red/40 hover:bg-white dark:hover:bg-[#15171C] transition-all text-center group"
            >
              <Globe className="w-5 h-5 text-brand-red mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC]">Disclaimer</p>
              <p className="text-[11px] text-slate-500 dark:text-[#7F8795] mt-0.5">Non-commercial OER index details</p>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};