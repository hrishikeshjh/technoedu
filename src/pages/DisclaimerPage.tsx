import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ShieldCheck, ExternalLink, BookOpen, GraduationCap, Gavel, Globe, Info, Mail } from 'lucide-react';

const GIL_SANS = { fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' };

export const DisclaimerPage: React.FC = () => {
  const lastUpdated = 'September 19, 2026';

  return (
    <div className="w-full bg-white text-slate-900 pt-6 sm:pt-8 pb-16" style={GIL_SANS}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-6 flex items-center gap-2 text-xs sm:text-sm text-slate-400">
          <Link to="/" className="hover:text-brand-red transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">Disclaimer</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-medium mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Disclaimer</span>
          </div>
          <h1 className="text-2xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            General Disclaimer
          </h1>
          <p className="mt-3 sm:mt-4 text-slate-500 text-xs sm:text-base leading-relaxed">
            Important legal notices regarding the use of Techno Wallah and the educational resources linked herein.
          </p>
          <p className="mt-2 text-xs text-slate-400">Last Updated: {lastUpdated}</p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10">

          {/* 1. Educational Purpose */}
          <section className="card-subtle p-6 sm:p-8 border-l-4 border-amber-500">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                <BookOpen className="w-4 h-4" />
              </span>
              1. Educational & Informational Purpose Only
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Techno Wallah is an <strong className="text-slate-900">open-access academic initiative</strong> designed solely for
              educational and informational purposes. The website serves as a curated directory and aggregator of
              publicly available open educational resources (OER).
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2"><Info className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>We do <strong>not</strong> provide professional, legal, medical, financial, or career advice.</span></li>
              <li className="flex items-center gap-2"><Info className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>Content is for <strong>self-study and reference only</strong> — not a substitute for official study materials.</span></li>
              <li className="flex items-center gap-2"><Info className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>Always verify information with <strong>official sources</strong> (exam conducting bodies, universities, government portals).</span></li>
              <li className="flex items-center gap-2"><Info className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>Use of this website does <strong>not guarantee</strong> examination success, admission, or employment.</span></li>
            </ul>
          </section>

          {/* 2. No Professional Advice */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <AlertTriangle className="w-4 h-4" />
              </span>
              2. No Professional Advice
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              The information on this website and linked resources does not constitute professional advice of any kind:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl"><strong>Academic Advice:</strong> Consult official syllabi, university advisors, or coaching institutes.</div>
              <div className="p-3 bg-slate-50 rounded-xl"><strong>Career Guidance:</strong> Seek certified career counselors or official recruitment notifications.</div>
              <div className="p-3 bg-slate-50 rounded-xl"><strong>Legal Matters:</strong> Consult qualified legal professionals for legal interpretations.</div>
              <div className="p-3 bg-slate-50 rounded-xl"><strong>Medical/Health:</strong> Not applicable — this is an educational resource aggregator.</div>
            </div>
          </section>

          {/* 3. Accuracy & Currency */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Info className="w-4 h-4" />
              </span>
              3. Accuracy, Completeness & Currency
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              While we strive to provide accurate, up-to-date, and comprehensive information, we make no warranties
              or representations regarding:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span><strong>Accuracy:</strong> Linked content may contain errors, omissions, or outdated information.</span></li>
              <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span><strong>Completeness:</strong> Our directory is not exhaustive — new resources are added periodically.</span></li>
              <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span><strong>Currency:</strong> Exam patterns, syllabi, and official portals change frequently. Always cross-check with official sources.</span></li>
              <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span><strong>Availability:</strong> External links may break, move, or become inaccessible without notice.</span></li>
            </ul>
            <p className="mt-4 text-xs text-slate-500">
              If you find inaccurate or broken links, please <Link to="/contact" className="text-brand-red hover:underline">report them</Link> so we can investigate and update.
            </p>
          </section>

          {/* 4. Third-Party Content & External Links */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <ExternalLink className="w-4 h-4" />
              </span>
              4. Third-Party Content & External Links
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Techno Wallah links to resources hosted on third-party websites including (but not limited to):
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {['NPTEL', 'SWAYAM', 'NCERT', 'MIT OCW', 'OpenStax', 'e-GyanKosh', 'Indian Kanoon', 'Government Portals'].map((name) => (
                <span key={name} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">{name}</span>
              ))}
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>We have <strong>no control</strong> over the content, accuracy, or availability of third-party resources.</span></li>
              <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>Inclusion of a link does <strong>not imply endorsement</strong> of the third-party website or its content.</span></li>
              <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>Third-party terms of use, privacy policies, and copyright terms apply when you visit external sites.</span></li>
              <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>We are <strong>not liable</strong> for any damages arising from use of third-party resources.</span></li>
            </ul>
          </section>

          {/* 5. Copyright & Intellectual Property */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <ShieldCheck className="w-4 h-4" />
              </span>
              5. Copyright & Intellectual Property
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-600">
              <div>
                <h3 className="font-medium text-slate-900 mb-2">Our Content</h3>
                <p>The Techno Wallah brand, logo, website design, compilation, categorization, and original organizational structure are our intellectual property. You may not reproduce or redistribute our curated structure without permission.</p>
              </div>
              <div>
                <h3 className="font-medium text-slate-900 mb-2">Third-Party Content</h3>
                <p>All educational materials (textbooks, lectures, question papers, videos, etc.) remain the intellectual property of their respective creators, authors, institutions, and publishers. They are shared under their original licenses, which may include:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Creative Commons licenses (CC BY, CC BY-SA, CC BY-NC, etc.)</li>
                  <li>Government open data / public domain licenses</li>
                  <li>Institutional educational use policies</li>
                  <li>Publisher-specific terms</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-slate-900 mb-2">Your Responsibility</h3>
                <p>You are responsible for complying with the license terms of each resource you access. We do not grant any rights to third-party content beyond what the original licensor permits.</p>
              </div>
            </div>
          </section>

          {/* 6. Examination & Official Information */}
          <section className="card-subtle p-6 sm:p-8 border-l-4 border-brand-red">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <GraduationCap className="w-4 h-4" />
              </span>
              6. Examination Information & Official Notifications
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              <strong className="text-slate-900">Critical:</strong> Examination dates, patterns, eligibility criteria, application processes, and results
              are subject to change by the respective conducting authorities.
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" /><span>Always refer to <strong>official notification PDFs</strong> and <strong>official websites</strong> for the latest information.</span></li>
              <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" /><span>Techno Wallah is <strong>not affiliated</strong> with any examination conducting body (UPSC, SSC, State PSCs, NTA, etc.).</span></li>
              <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" /><span>We do <strong>not guarantee</strong> the accuracy of exam-related information — verify independently.</span></li>
              <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" /><span>Application deadlines, admit cards, and results must be tracked on <strong>official portals only</strong>.</span></li>
            </div>
          </section>

          {/* 7. No Affiliation or Endorsement */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Globe className="w-4 h-4" />
              </span>
              7. No Affiliation, Sponsorship, or Endorsement
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Techno Wallah is an independent, non-commercial, open-access initiative. We are:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /><span><strong>Not affiliated</strong> with any government body, university, examination board, or educational institution.</span></li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /><span><strong>Not sponsored</strong> by any coaching institute, ed-tech company, or publisher.</span></li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /><span><strong>Not endorsed</strong> by any official examination authority (UPSC, NTA, State PSCs, etc.).</span></li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /><span><strong>Not a substitute</strong> for official study materials, coaching, or guidance.</span></li>
            </ul>
            <p className="mt-4 text-xs text-slate-500">
              Any reference to examination names, logos, or trademarks is for <strong>identification and educational purposes only</strong>
              under nominative fair use. All trademarks belong to their respective owners.
            </p>
          </section>

          {/* 8. Limitation of Liability */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Gavel className="w-4 h-4" />
              </span>
              8. Limitation of Liability
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>Techno Wallah shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from use of this website or linked resources.</span></li>
              <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>We are not responsible for examination outcomes, academic performance, career decisions, or any actions taken based on information accessed through this website.</span></li>
              <li className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>Our total liability for any claim shall not exceed the amount paid by you to use this website (zero).</span></li>
            </ul>
          </section>

          {/* 9. Indemnification */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <ShieldCheck className="w-4 h-4" />
              </span>
              9. Indemnification
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              You agree to indemnify and hold harmless Techno Wallah from any claims, damages, or expenses
              (including legal fees) arising from your use of the website, violation of these disclaimers,
              or infringement of third-party rights.
            </p>
          </section>

          {/* 10. Jurisdiction */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Gavel className="w-4 h-4" />
              </span>
              10. Governing Law & Jurisdiction
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              This disclaimer is governed by the laws of <strong>India</strong>. Any disputes shall be subject to the
              exclusive jurisdiction of the courts in <strong>[CITY, STATE] <span className="text-amber-600">[PLACEHOLDER — REPLACE]</span></strong>.
            </p>
          </section>

          {/* 11. Changes */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <AlertTriangle className="w-4 h-4" />
              </span>
              11. Changes to This Disclaimer
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We may update this disclaimer at any time. The "Last Updated" date reflects the latest revision.
              Continued use of the website constitutes acceptance of the current version.
            </p>
          </section>

          {/* 12. Contact */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Globe className="w-4 h-4" />
              </span>
              12. Contact Us
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              For questions about this disclaimer or to report concerns:
            </p>
            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-red flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">Email</p>
                  <p className="text-xs text-slate-500 font-mono">legal@technoedu.example.com <span className="text-amber-600 ml-2">[PLACEHOLDER — REPLACE]</span></p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-brand-red flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">Contact Form</p>
                  <p className="text-xs text-slate-500"><Link to="/contact" className="text-brand-red hover:underline">Contact Us</Link></p>
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