import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle, Loader2, MapPin, Phone, Globe, ShieldCheck, Accessibility, FileText } from 'lucide-react';

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
      // In production, replace this with your actual form submission endpoint
      // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // For demonstration - in production, integrate with:
      // - Formspree, Netlify Forms, EmailJS, SendGrid, etc.
      // - Or your own backend API endpoint

      console.log('Contact form submission:', formData);

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again later or email us directly.');
    }
  };

  const lastUpdated = 'September 19, 2026';

  return (
    <div className="w-full bg-white text-slate-900 pt-6 sm:pt-8 pb-16" style={GIL_SANS}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-6 flex items-center gap-2 text-xs sm:text-sm text-slate-400">
          <Link to="/" className="hover:text-brand-red transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">Contact Us</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-brand-red text-xs font-medium mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact Us</span>
          </div>
          <h1 className="text-2xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Get in Touch
          </h1>
          <p className="mt-3 sm:mt-4 text-slate-500 text-xs sm:text-base leading-relaxed">
            Have questions, feedback, or suggestions? We'd love to hear from you.
            Choose the best way to reach us below.
          </p>
        </div>

        {/* Contact Methods & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">

            {/* Email */}
            <div className="card-subtle p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-brand-red flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Email Us</h3>
                  <p className="text-xs text-slate-500">For general inquiries, partnerships, or feedback</p>
                  <a
                    href="mailto:hello@technoedu.example.com"
                    className="mt-2 inline-block text-xs text-brand-red hover:underline font-mono"
                  >
                    hello@technoedu.example.com
                    <span className="text-amber-600 ml-1">[PLACEHOLDER]</span>
                  </a>
                  <p className="mt-1 text-[10px] text-slate-400">Typical response: 1-2 business days</p>
                </div>
              </div>
            </div>

            {/* Data Protection / Privacy */}
            <div className="card-subtle p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Data Protection Officer</h3>
                  <p className="text-xs text-slate-500">Privacy concerns, data requests, GDPR/DPDP inquiries</p>
                  <a
                    href="mailto:privacy@technoedu.example.com"
                    className="mt-2 inline-block text-xs text-emerald-600 hover:underline font-mono"
                  >
                    privacy@technoedu.example.com
                    <span className="text-amber-600 ml-1">[PLACEHOLDER]</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Legal */}
            <div className="card-subtle p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Legal & Compliance</h3>
                  <p className="text-xs text-slate-500">Terms of use, copyright, DMCA, legal notices</p>
                  <a
                    href="mailto:legal@technoedu.example.com"
                    className="mt-2 inline-block text-xs text-amber-600 hover:underline font-mono"
                  >
                    legal@technoedu.example.com
                    <span className="text-amber-600 ml-1">[PLACEHOLDER]</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Social / Community */}
            <div className="card-subtle p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Community & Feedback</h3>
                  <p className="text-xs text-slate-500">Content suggestions, broken links, new resource requests</p>
                  <a
                    href="mailto:feedback@technoedu.example.com"
                    className="mt-2 inline-block text-xs text-blue-600 hover:underline font-mono"
                  >
                    feedback@technoedu.example.com
                    <span className="text-amber-600 ml-1">[PLACEHOLDER]</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Office Address Placeholder */}
            <div className="card-subtle p-6 border-l-4 border-amber-500">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Physical Address</h3>
                  <p className="text-xs text-slate-500">
                    Techno Wallah Open Education Initiative<br/>
                    [CITY, STATE, PIN CODE] <span className="text-amber-600">[PLACEHOLDER — REPLACE]</span><br/>
                    India
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">This is an online-first initiative. For postal correspondence only.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card-subtle p-6 sm:p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                  <MessageSquare className="w-4 h-4" />
                </span>
                Send Us a Message
              </h2>

              {/* Success State */}
              {status === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-emerald-800 text-sm">Message Sent Successfully!</p>
                      <p className="text-xs text-emerald-600">Thank you for reaching out. We'll respond within 1-2 business days.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error State */}
              {status === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-red-800 text-sm">Unable to Send Message</p>
                      <p className="text-xs text-red-600">{errorMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-slate-700 mb-1.5">
                      Full Name <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red focus:bg-white transition-all disabled:opacity-50"
                      placeholder="Your full name"
                      required
                      autoComplete="name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-slate-700 mb-1.5">
                      Email Address <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red focus:bg-white transition-all disabled:opacity-50"
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-slate-700 mb-1.5">
                    Subject <span className="text-brand-red">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red focus:bg-white transition-all disabled:opacity-50"
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="content">Content Suggestion / Correction</option>
                    <option value="broken-link">Report Broken Link</option>
                    <option value="new-resource">Suggest New Resource</option>
                    <option value="privacy">Privacy / Data Protection</option>
                    <option value="legal">Legal / Copyright / DMCA</option>
                    <option value="partnership">Partnership / Collaboration</option>
                    <option value="technical">Technical Issue / Bug Report</option>
                    <option value="accessibility">Accessibility Concern</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-slate-700 mb-1.5">
                    Message <span className="text-brand-red">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    rows={5}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red focus:bg-white transition-all disabled:opacity-50 resize-y min-h-[120px]"
                    placeholder="Describe your inquiry in detail..."
                    required
                  />
                </div>

                {/* Privacy Notice */}
                <div className="flex items-start gap-2 text-xs text-slate-500 p-3 bg-slate-50 rounded-xl">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p>
                    By submitting this form, you agree to our <Link to="/privacy-policy" className="text-brand-red hover:underline">Privacy Policy</Link>
                    and consent to us processing your data to respond to your inquiry. We do not share your information with third parties.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-red text-white text-sm font-bold hover:bg-brand-darkred transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center shadow-red-glow"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Alternative Contact Methods */}
            <div className="mt-6 card-subtle p-6">
              <h3 className="font-bold text-slate-900 text-sm mb-4">Prefer Another Way?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  to="/privacy-policy"
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-red/30 hover:bg-white transition-all text-center"
                >
                  <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                  <p className="text-xs font-medium text-slate-900">Privacy Concerns</p>
                  <p className="text-[10px] text-slate-500">GDPR/DPDP requests, data deletion</p>
                </Link>
                <Link
                  to="/terms"
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-red/30 hover:bg-white transition-all text-center"
                >
                  <FileText className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                  <p className="text-xs font-medium text-slate-900">Legal Matters</p>
                  <p className="text-[10px] text-slate-500">Copyright, DMCA, terms questions</p>
                </Link>
                <Link
                  to="/accessibility"
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-red/30 hover:bg-white transition-all text-center"
                >
                  <Accessibility className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-xs font-medium text-slate-900">Accessibility Issues</p>
                  <p className="text-[10px] text-slate-500">Report barriers, suggest improvements</p>
                </Link>
                <a
                  href="https://github.com/technoedu/technoedu/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-red/30 hover:bg-white transition-all text-center flex items-center justify-center gap-1"
                >
                  <Globe className="w-5 h-5 text-purple-600" />
                  <span className="flex flex-col items-start text-left">
                    <p className="text-xs font-medium text-slate-900">GitHub Issues</p>
                    <p className="text-[10px] text-slate-500">Bug reports, feature requests</p>
                  </span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-red hover:bg-brand-darkred text-white text-xs sm:text-sm font-semibold transition-all">
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}