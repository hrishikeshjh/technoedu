import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Eye, Keyboard, Volume2, Brain, Monitor, MousePointer, Touchpad, AlertCircle, CheckCircle, Mail, Globe, Wrench, Palette, Type } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';

const GIL_SANS = { fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' };

export const AccessibilityPage: React.FC = () => {
  const lastUpdated = 'September 19, 2026';
  const conformanceTarget = 'WCAG 2.1 Level AA';
  const conformanceStatus = 'Substantial Conformance (Self-Assessed)';

  return (
    <div className="w-full bg-white dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] pt-6 sm:pt-8 pb-16 transition-colors duration-200" style={GIL_SANS}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Accessibility' }]} />

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 dark:border dark:border-blue-900/30 text-xs font-medium mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Accessibility Statement</span>
          </div>
          <h1 className="text-2xl sm:text-5xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Commitment to Accessibility
          </h1>
          <p className="mt-3 sm:mt-4 text-slate-500 dark:text-[#A7AFBD] text-xs sm:text-base leading-relaxed">
            Techno Wallah is committed to ensuring digital accessibility for all students, including those with disabilities.
            We continuously work to improve the user experience for everyone.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 dark:border dark:border-blue-800/40 rounded-full font-medium">{conformanceTarget}</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-[#15171C] text-slate-700 dark:text-[#A7AFBD] dark:border dark:border-[#252932] rounded-full">{conformanceStatus}</span>
            <span className="text-slate-400 dark:text-[#7F8795]">Updated: {lastUpdated}</span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-10">

          {/* 1. Our Commitment */}
          <section className="card-subtle p-6 sm:p-8 border-l-4 border-blue-500">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <ShieldCheck className="w-4 h-4" />
              </span>
              1. Our Accessibility Commitment
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              As an educational resource hub serving students across India and globally, we believe that access to
              quality education should not be hindered by digital barriers. Our commitment includes:
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>Designing and developing with accessibility as a <strong>core requirement</strong>, not an afterthought</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>Targeting <strong>WCAG 2.1 Level AA</strong> conformance across all pages and features</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>Regular <strong>automated and manual accessibility testing</strong> during development</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>Promptly addressing reported <strong>accessibility barriers</strong></span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>Ensuring <strong>third-party linked resources</strong> are evaluated for accessibility where possible</span>
              </li>
            </ul>
          </section>

          {/* 2. Supported Features */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Eye className="w-4 h-4" />
              </span>
              2. Currently Supported Accessibility Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-slate-50 rounded-xl">
                <h3 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
                  <Keyboard className="w-4 h-4 text-brand-red" />
                  <span>Keyboard Navigation</span>
                </h3>
                <ul className="space-y-1 text-xs text-slate-600">
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Full keyboard operability (Tab, Enter, Escape, Arrow keys)</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Visible focus indicators on all interactive elements</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Logical tab order matching visual layout</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Skip to main content link</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>No keyboard traps</span></li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <h3 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-brand-red" />
                  <span>Screen Reader Support</span>
                </h3>
                <ul className="space-y-1 text-xs text-slate-600">
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Semantic HTML5 structure (header, main, nav, section, article)</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Proper heading hierarchy (h1-h6)</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>ARIA labels on icon-only buttons and complex components</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Alt text for all meaningful images</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Descriptive link text (no "click here")</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Form labels associated with inputs</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Live regions for dynamic content updates</span></li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <h3 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-brand-red" />
                  <span>Visual Design & Contrast</span>
                </h3>
                <ul className="space-y-1 text-xs text-slate-600">
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Minimum 4.5:1 contrast ratio for text (WCAG AA)</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>3:1 contrast for UI components and graphics</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>No color-only information conveyance</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Support for prefers-color-scheme (light/dark mode)</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Support for prefers-reduced-motion</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Scalable text up to 200% without loss of function</span></li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <h3 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-brand-red" />
                  <span>Responsive & Mobile</span>
                </h3>
                <ul className="space-y-1 text-xs text-slate-600">
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Fully responsive down to 320px width</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Touch targets minimum 44×44 CSS pixels</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>No horizontal scrolling at 320px</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Viewport zoom not disabled</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Safe area insets for notched devices</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Portrait and landscape orientation support</span></li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <h3 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-brand-red" />
                  <span>Media & Content</span>
                </h3>
                <ul className="space-y-1 text-xs text-slate-600">
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>No auto-playing audio or video</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>No flashing content (&gt;3 flashes/second)</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Text-based content primary (not images of text)</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>External video links go to platforms with captions</span></li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <h3 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-brand-red" />
                  <span>Cognitive Accessibility</span>
                </h3>
                <ul className="space-y-1 text-xs text-slate-600">
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Clear, consistent navigation and layout</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Plain language, minimal jargon</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Predictable interactions (no surprise popups/redirects)</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Error messages with clear recovery instructions</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Breadcrumbs for orientation</span></li>
                  <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500" /><span>Search functionality with live results</span></li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Known Limitations */}
          <section className="card-subtle p-6 sm:p-8 border-l-4 border-amber-500">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                <AlertCircle className="w-4 h-4" />
              </span>
              3. Known Limitations & Areas for Improvement
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              We are transparent about areas where we are still working to improve accessibility:
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Third-Party Linked Content</p>
                  <p className="text-slate-600 mt-1">We link to external resources (NPTEL, MIT OCW, NCERT, etc.) over which we have no control.
                  Their accessibility varies. We prioritize linking to accessible versions where available.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">PDF Documents</p>
                  <p className="text-slate-600 mt-1">Some linked PDFs (previous year papers, syllabi) may not be fully tagged for screen readers.
                  This depends on the source institution's publishing practices.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Complex Data Tables</p>
                  <p className="text-slate-600 mt-1">Exam comparison tables and directory listings may be challenging for screen reader users.
                  We are exploring alternative list views.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Search Autocomplete Announcements</p>
                  <p className="text-slate-600 mt-1">Live search results may not be fully announced to screen readers in all browsers.
                  We are refining ARIA live region usage.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Language Declaration</p>
                  <p className="text-slate-600 mt-1">Primary language is English. Some linked content is in Hindi or regional languages.
                  lang attributes on external links may not always reflect content language.</p>
                </div>
              </li>
            </ul>
          </section>

          {/* 4. Technical Specifications */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Wrench className="w-4 h-4" />
              </span>
              4. Technical Implementation Details
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-600">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <h4 className="font-medium text-slate-900 mb-2">Frontend Stack</h4>
                  <ul className="space-y-1 text-slate-600">
                    <li>React 18 with TypeScript</li>
                    <li>Tailwind CSS for styling</li>
                    <li>React Router v6 for SPA navigation</li>
                    <li>Vite for build tooling</li>
                  </ul>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <h4 className="font-medium text-slate-900 mb-2">Accessibility Libraries</h4>
                  <ul className="space-y-1 text-slate-600">
                    <li>lucide-react (accessible SVG icons)</li>
                    <li>Native HTML5 semantics (no custom UI libs)</li>
                    <li>CSS-based focus styles (no outline removal)</li>
                  </ul>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <h4 className="font-medium text-slate-900 mb-2">Testing Methodology</h4>
                <ul className="space-y-1 text-slate-600">
                  <li>Automated: axe-core (via browser devtools), Lighthouse accessibility audit</li>
                  <li>Manual: Keyboard-only navigation testing, NVDA/VoiceOver screen reader testing</li>
                  <li>Zoom testing: 200%, 400% browser zoom</li>
                  <li>Color contrast: Verified via DevTools and tools like WebAIM Contrast Checker</li>
                  <li>Reduced motion: Tested with OS-level "Reduce Motion" setting</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 5. Browser & Assistive Technology Support */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Monitor className="w-4 h-4" />
              </span>
              5. Browser & Assistive Technology Support
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              We test with and aim to support the following combinations:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl text-center">
                <p className="font-medium text-slate-900">NVDA + Firefox</p>
                <p className="text-slate-500">Windows</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl text-center">
                <p className="font-medium text-slate-900">JAWS + Chrome</p>
                <p className="text-slate-500">Windows</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl text-center">
                <p className="font-medium text-slate-900">VoiceOver + Safari</p>
                <p className="text-slate-500">macOS / iOS</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl text-center">
                <p className="font-medium text-slate-900">TalkBack + Chrome</p>
                <p className="text-slate-500">Android</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              We use progressive enhancement — core functionality works without JavaScript,
              though enhanced features (search autocomplete, smooth scrolling) require JS.
            </p>
          </section>

          {/* 6. How to Report Issues */}
          <section className="card-subtle p-6 sm:p-8 border-l-4 border-brand-red">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Mail className="w-4 h-4" />
              </span>
              6. Report Accessibility Barriers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              If you encounter an accessibility barrier on Techno Wallah, please let us know. We take all reports seriously
              and aim to respond within <strong>5 business days</strong>.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <h3 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  What to Include in Your Report
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-red flex-shrink-0"></span>URL of the page where you encountered the barrier</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-red flex-shrink-0"></span>Description of the problem</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-red flex-shrink-0"></span>Assistive technology used (screen reader, browser, OS)</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-red flex-shrink-0"></span>Steps to reproduce the issue</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-red flex-shrink-0"></span>Suggested improvement (if any)</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="flex-1 px-4 py-3 rounded-xl bg-brand-red text-white text-sm font-bold hover:bg-brand-darkred transition-all text-center shadow-red-glow"
                >
                  <Mail className="w-4 h-4 inline-block mr-1" />
                  Report via Contact Form
                </Link>
                <a
                  href="mailto:accessibility@technoedu.example.com"
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 transition-all text-center flex items-center justify-center gap-1"
                >
                  <Mail className="w-4 h-4" />
                  Email Directly
                </a>
              </div>
            </div>
          </section>

          {/* 7. Feedback & Continuous Improvement */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Type className="w-4 h-4" />
              </span>
              7. Feedback & Continuous Improvement
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Accessibility is an ongoing journey. We welcome your feedback to make Techno Wallah more inclusive:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /><span>We review all accessibility feedback and prioritize fixes based on impact</span></li>
              <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /><span>Major accessibility regressions are treated as critical bugs</span></li>
              <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /><span>This accessibility statement is reviewed and updated at least annually</span></li>
              <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /><span>We aim for formal third-party audit in the future</span></li>
            </ul>
          </section>

          {/* 8. Legal References */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <ShieldCheck className="w-4 h-4" />
              </span>
              8. Applicable Standards & Regulations
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <Globe className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">WCAG 2.1 Level AA</p>
                  <p className="text-slate-600 mt-1">World Wide Web Consortium (W3C) Web Content Accessibility Guidelines 2.1</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <Globe className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Rights of Persons with Disabilities Act, 2016 (India)</p>
                  <p className="text-slate-600 mt-1">Section 40-46: Accessibility standards for ICT, websites, and digital content</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <Globe className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">GIGW 3.0</p>
                  <p className="text-slate-600 mt-1">Guidelines for Indian Government Websites (for reference, as we link to govt portals)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <Globe className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Section 508 (US) / EN 301 549 (EU)</p>
                  <p className="text-slate-600 mt-1">International accessibility standards for reference</p>
                </div>
              </div>
            </div>
          </section>

          {/* 9. Contact */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Globe className="w-4 h-4" />
              </span>
              9. Accessibility Contact
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Dedicated accessibility contact:
            </p>
            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-red flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">Email</p>
                  <p className="text-xs text-slate-500 font-mono">accessibility@technoedu.example.com <span className="text-amber-600 ml-2">[PLACEHOLDER — REPLACE]</span></p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-brand-red flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">Contact Form</p>
                  <p className="text-xs text-slate-500"><Link to="/contact" className="text-brand-red hover:underline">Contact Us (select "Accessibility Concern")</Link></p>
                </div>
              </div>
            </div>
          </section>

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
};