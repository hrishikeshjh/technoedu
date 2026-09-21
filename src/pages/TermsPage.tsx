import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShieldCheck, ExternalLink, AlertCircle, Gavel, Scale, Globe, Clock } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';

const GIL_SANS = { fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' };

export const TermsPage: React.FC = () => {
  const lastUpdated = 'September 19, 2026';
  const effectiveDate = 'September 19, 2026';

  return (
    <div className="w-full bg-white text-slate-900 pt-6 sm:pt-8 pb-16" style={GIL_SANS}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Terms & Conditions' }]} />

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-brand-red text-xs font-medium mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>Terms & Conditions</span>
          </div>
          <h1 className="text-2xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Terms of Use
          </h1>
          <p className="mt-3 sm:mt-4 text-slate-500 text-xs sm:text-base leading-relaxed">
            Please read these Terms carefully before using Techno Wallah. By accessing or using our website,
            you agree to be bound by these Terms.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-slate-400">
            <span>Effective: {effectiveDate}</span>
            <span>•</span>
            <span>Last Updated: {lastUpdated}</span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-10">

          {/* 1. Acceptance of Terms */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <FileText className="w-4 h-4" />
              </span>
              1. Acceptance of Terms
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              By accessing, browsing, or using the Techno Wallah website (<span className="font-mono text-brand-red">technoedu.vercel.app</span>),
              you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions
              ("Terms"), our <Link to="/privacy-policy" className="text-brand-red hover:underline">Privacy Policy</Link>,
              and <Link to="/cookies" className="text-brand-red hover:underline">Cookie Policy</Link>.
              If you do not agree with any part of these Terms, you must not use this website.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes take effect immediately upon posting
              to this page with an updated "Last Updated" date. Your continued use of the website after changes
              constitutes acceptance of the revised Terms.
            </p>
          </section>

          {/* 2. Description of Service */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <ShieldCheck className="w-4 h-4" />
              </span>
              2. Description of Service
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Techno Wallah is an <strong className="text-slate-900">open-access academic initiative</strong> that aggregates and
              organizes links to authentic open-source learning repositories, government digital portals,
              peer-reviewed textbooks, and verified previous year question banks for competitive examinations.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5"></span>We are a <strong>directory and aggregator</strong> — we do not host, create, or modify the educational content linked.</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5"></span>All materials remain the intellectual property of their respective creators and institutions.</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5"></span>We provide curated navigation and syllabus-aligned organization as a free public service.</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5"></span>No fees, subscriptions, or paywalls are associated with using this website.</li>
            </ul>
          </section>

          {/* 3. Acceptable Use */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Scale className="w-4 h-4" />
              </span>
              3. Acceptable Use
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              You agree to use this website only for lawful purposes and in accordance with these Terms.
              You must not:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" /><span>Use the website for any illegal or unauthorized purpose</span></li>
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" /><span>Attempt to gain unauthorized access to any portion of the website or its systems</span></li>
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" /><span>Interfere with or disrupt the website's operation, servers, or networks</span></li>
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" /><span>Use automated scripts, bots, scrapers, or crawlers to extract content systematically</span></li>
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" /><span>Transmit viruses, malware, or any harmful code</span></li>
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" /><span>Impersonate any person or entity or misrepresent your affiliation</span></li>
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" /><span>Remove or alter any copyright, trademark, or proprietary notices</span></li>
            </ul>
            <p className="mt-4 text-xs text-slate-500">
              We reserve the right to suspend or terminate your access to the website for any violation of these Terms.
            </p>
          </section>

          {/* 4. Intellectual Property */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <ShieldCheck className="w-4 h-4" />
              </span>
              4. Intellectual Property Rights
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-600">
              <div>
                <h3 className="font-medium text-slate-900 mb-2">Our Rights</h3>
                <p className="leading-relaxed">
                  The Techno Wallah brand, logo, website design, compilation, organization, and curation of links
                  (the "Platform IP") are owned by us and protected by copyright, trademark, and other intellectual
                  property laws. You may not reproduce, distribute, or create derivative works of the Platform IP
                  without our prior written consent.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-slate-900 mb-2">Third-Party Content</h3>
                <p className="leading-relaxed">
                  All educational materials, textbooks, lecture videos, question papers, and other resources
                  linked from this website are the intellectual property of their respective creators, institutions,
                  and publishers. They are shared under their original licenses (e.g., CC BY, CC BY-NC-SA,
                  government open data licenses, institutional policies). We claim no ownership over third-party content.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-slate-900 mb-2">Fair Use & Educational Purpose</h3>
                <p className="leading-relaxed">
                  Our linking and organizational activities are conducted in good faith for non-commercial
                  educational purposes, consistent with fair use/fair dealing principles and open educational
                  resource (OER) best practices.
                </p>
              </div>
            </div>
          </section>

          {/* 5. External Links Disclaimer */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <ExternalLink className="w-4 h-4" />
              </span>
              5. External Links & Third-Party Resources
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              This website contains links to third-party websites and resources that are not owned or controlled by us.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>We have <strong>no control</strong> over the content, privacy policies, or practices of external sites.</span></li>
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>We <strong>do not endorse</strong> and are <strong>not responsible</strong> for any third-party content, accuracy, or availability.</span></li>
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>Your use of external links is <strong>at your own risk</strong> and subject to the terms of those websites.</span></li>
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>We are not liable for any damage or loss caused by or in connection with use of external resources.</span></li>
            </ul>
          </section>

          {/* 6. No Warranties */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <AlertCircle className="w-4 h-4" />
              </span>
              6. Disclaimer of Warranties
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              THE WEBSITE AND ALL CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>Accuracy, completeness, or currency of linked educational materials</span></li>
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>Uninterrupted, timely, secure, or error-free access</span></li>
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>Suitability for any particular examination, course, or purpose</span></li>
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>Correction of defects or errors</span></li>
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>Freedom from viruses or harmful components</span></li>
            </ul>
            <p className="mt-4 text-xs text-slate-500">
              Some jurisdictions do not allow the exclusion of certain warranties, so the above may not apply to you in full.
            </p>
          </section>

          {/* 7. Limitation of Liability */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Gavel className="w-4 h-4" />
              </span>
              7. Limitation of Liability
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL TECHNO WALLAH, ITS CONTRIBUTORS,
              OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
              INCLUDING WITHOUT LIMITATION:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>Loss of profits, data, use, goodwill, or other intangible losses</span></li>
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>Examination results, academic outcomes, or career impacts</span></li>
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>Reliance on any information obtained through the website</span></li>
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /><span>Unauthorized access to or alteration of your transmissions or data</span></li>
            </ul>
            <p className="mt-4 text-xs text-slate-500">
              Our total aggregate liability for any claims arising from these Terms or your use of the website
              shall not exceed the amount you paid to use the website (which is zero).
            </p>
          </section>

          {/* 8. Indemnification */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Scale className="w-4 h-4" />
              </span>
              8. Indemnification
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              You agree to indemnify, defend, and hold harmless Techno Wallah and its contributors from and against
              any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out
              of or related to your use of the website, violation of these Terms, or infringement of any third-party rights.
            </p>
          </section>

          {/* 9. Termination */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Clock className="w-4 h-4" />
              </span>
              9. Termination
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              We may suspend or terminate your access to the website at any time, with or without cause,
              with or without notice, effective immediately. Upon termination, your right to use the website
              ceases immediately. Sections 4, 5, 6, 7, 8, 9, 10, and 11 shall survive termination.
            </p>
          </section>

          {/* 10. Governing Law */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Gavel className="w-4 h-4" />
              </span>
              10. Governing Law & Jurisdiction
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of <strong>India</strong>,
              without regard to its conflict of law principles.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Any dispute arising out of or relating to these Terms or the website shall be subject to the
              <strong>exclusive jurisdiction of the courts in [CITY, STATE] <span className="text-amber-600">[PLACEHOLDER — REPLACE]</span></strong>.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              If you are accessing from outside India, you are responsible for compliance with local laws.
            </p>
          </section>

          {/* 11. Changes to Terms */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <AlertCircle className="w-4 h-4" />
              </span>
              11. Changes to These Terms
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We may revise these Terms at any time. The updated version will be posted on this page with a new
              "Last Updated" date. Material changes will be communicated via a prominent notice on the website.
              Your continued use after changes constitutes acceptance. If you disagree with changes, your sole
              remedy is to discontinue use of the website.
            </p>
          </section>

          {/* 12. Severability & Waiver */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <FileText className="w-4 h-4" />
              </span>
              12. Severability & Waiver
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2">
              If any provision of these Terms is held invalid or unenforceable, the remaining provisions
              shall continue in full force and effect. The failure to enforce any right or provision
              shall not constitute a waiver of that right or provision.
            </p>
          </section>

          {/* 13. Contact Information */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Globe className="w-4 h-4" />
              </span>
              13. Contact Information
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              For questions about these Terms, please contact us:
            </p>
            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-brand-red flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">Email</p>
                  <p className="text-xs text-slate-500 font-mono">legal@technoedu.example.com <span className="text-amber-600 ml-2">[PLACEHOLDER — REPLACE]</span></p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-brand-red flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">Website</p>
                  <p className="text-xs text-slate-500"><Link to="/contact" className="text-brand-red hover:underline">Contact Form</Link></p>
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