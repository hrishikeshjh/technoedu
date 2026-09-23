import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, User, Database, Cookie, Globe, Mail, AlertCircle } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';

const GIL_SANS = { fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' };

export const PrivacyPolicyPage: React.FC = () => {
  const lastUpdated = 'September 19, 2026';

  return (
    <div className="w-full bg-white dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] pt-6 sm:pt-8 pb-16 transition-colors duration-200" style={GIL_SANS}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Privacy Policy' }]} />

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-brand-red dark:bg-red-950/40 dark:text-red-400 dark:border dark:border-red-900/30 text-xs font-medium mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </div>
          <h1 className="text-2xl sm:text-5xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Your Privacy Matters
          </h1>
          <p className="mt-3 sm:mt-4 text-slate-500 dark:text-[#A7AFBD] text-xs sm:text-base leading-relaxed">
            This Privacy Policy explains how Techno Wallah collects, uses, and protects your information when you visit our website.
          </p>
          <p className="mt-2 text-xs text-slate-400 dark:text-[#7F8795]">Last Updated: {lastUpdated}</p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10">

          {/* 1. Introduction */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <ShieldCheck className="w-4 h-4" />
              </span>
              1. Introduction
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Techno Wallah ("we," "our," or "us") operates this website as an open-access academic initiative
              aggregating authentic open-source learning repositories, government digital portals, peer-reviewed textbooks,
              and verified previous year question banks. We are committed to protecting your personal information and
              your right to privacy. This Privacy Policy applies to all visitors, users, and others who access
              the website at <span className="font-mono text-brand-red">technoedu.vercel.app</span> (or any subdomain).
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Database className="w-4 h-4" />
              </span>
              2. Information We Collect
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              We collect only the minimal data necessary to operate and improve this educational resource hub:
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red text-[10px] font-bold">1</span>
                <div>
                  <p className="font-medium text-slate-900">Automatically Collected Data</p>
                  <p className="text-slate-500">When you visit our website, our servers automatically log standard information such as your IP address, browser type, operating system, referring page, pages visited, and time spent. This is standard web server logging and does not personally identify you.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red text-[10px] font-bold">2</span>
                <div>
                  <p className="font-medium text-slate-900">Analytics Data</p>
                  <p className="text-slate-500">We use privacy-respecting analytics (such as Plausible or similar) that do not use cookies or collect personally identifiable information. Aggregated data helps us understand which resources are most valuable to students.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red text-[10px] font-bold">3</span>
                <div>
                  <p className="font-medium text-slate-900">Contact Form Data</p>
                  <p className="text-slate-500">If you voluntarily submit our contact form, we collect your name, email address, and message content solely to respond to your inquiry.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red text-[10px] font-bold">4</span>
                <div>
                  <p className="font-medium text-slate-900">No Account Registration</p>
                  <p className="text-slate-500">This website does not require user accounts, login, or registration. We do not collect passwords, payment information, or sensitive personal data.</p>
                </div>
              </li>
            </ul>
          </section>

          {/* 3. How We Use Your Information */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <User className="w-4 h-4" />
              </span>
              3. How We Use Your Information
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red text-[10px] font-bold">•</span>
                <div>
                  <p className="font-medium text-slate-900">Operate the Website</p>
                  <p className="text-slate-500">To provide access to curated open educational resources and maintain site functionality.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red text-[10px] font-bold">•</span>
                <div>
                  <p className="font-medium text-slate-900">Improve Content Quality</p>
                  <p className="text-slate-500">Anonymous usage analytics help us identify which exam resources and study materials are most helpful.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red text-[10px] font-bold">•</span>
                <div>
                  <p className="font-medium text-slate-900">Respond to Inquiries</p>
                  <p className="text-slate-500">Contact form submissions are used solely to reply to your questions or feedback.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red text-[10px] font-bold">•</span>
                <div>
                  <p className="font-medium text-slate-900">Legal Compliance</p>
                  <p className="text-slate-500">To comply with applicable laws, regulations, and legal processes.</p>
                </div>
              </li>
            </ul>
            <p className="mt-4 text-xs sm:text-sm text-slate-500">
              We do <strong className="text-slate-700">not</strong> sell, rent, or trade your personal information to third parties for marketing purposes.
            </p>
          </section>

          {/* 4. Cookies & Tracking Technologies */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Cookie className="w-4 h-4" />
              </span>
              4. Cookies & Tracking Technologies
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Our website uses minimal cookies and tracking technologies. For detailed information, please see our
              <Link to="/cookies" className="text-brand-red hover:underline font-medium">Cookie Policy</Link>.
            </p>
            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="text-xs font-bold text-slate-900 mb-2">Cookie Categories Used:</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-medium">Essential Cookies:</span> Required for basic site functionality (session management, security).
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span className="font-medium">Analytics Cookies:</span> Privacy-friendly analytics (no personal data collected).
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  <span className="font-medium">No Advertising Cookies:</span> We do not use advertising, marketing, or tracking cookies.
                </li>
              </ul>
            </div>
          </section>

          {/* 5. Third-Party Services */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Globe className="w-4 h-4" />
              </span>
              5. Third-Party Services & External Links
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              This website serves as a directory linking to external open educational resources. When you click links to
              third-party websites (NPTEL, SWAYAM, NCERT, MIT OCW, OpenStax, etc.), you leave our website and their
              privacy policies apply.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                <span>We are not responsible for the privacy practices or content of external websites.</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                <span>We encourage you to review the privacy policies of every website you visit.</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                <span>External links open in new tabs with <code className="bg-slate-100 px-1 rounded text-[10px] font-mono">rel="noopener noreferrer"</code> for security.</span>
              </li>
            </ul>
          </section>

          {/* 6. Data Security */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <ShieldCheck className="w-4 h-4" />
              </span>
              6. Data Security
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect the information we collect:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5"></span>HTTPS encryption for all traffic</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5"></span>Content Security Policy headers</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5"></span>No database storage of personal data on our servers</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5"></span>Regular security updates and dependency auditing</li>
            </ul>
            <p className="mt-4 text-xs text-slate-500">
              However, no method of transmission over the Internet or electronic storage is 100% secure.
              We cannot guarantee absolute security of your data.
            </p>
          </section>

          {/* 7. Data Retention */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Database className="w-4 h-4" />
              </span>
              7. Data Retention
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We retain personal information only for as long as necessary to fulfill the purposes outlined in this
              Privacy Policy, unless a longer retention period is required or permitted by law. Contact form submissions
              are retained for <strong className="text-slate-900">12 months</strong> after resolution. Server logs are
              retained for <strong className="text-slate-900">30 days</strong>. Analytics data is aggregated and anonymized.
            </p>
          </section>

          {/* 8. Your Rights */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <User className="w-4 h-4" />
              </span>
              8. Your Rights (GDPR, CCPA, DPDP Act)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Depending on your jurisdiction, you may have the following rights regarding your personal data:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red text-[10px] font-bold">1</span> <strong>Right to Access</strong> — Request a copy of your personal data</li>
              <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red text-[10px] font-bold">2</span> <strong>Right to Rectification</strong> — Correct inaccurate or incomplete data</li>
              <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red text-[10px] font-bold">3</span> <strong>Right to Erasure</strong> — Request deletion of your personal data</li>
              <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red text-[10px] font-bold">4</span> <strong>Right to Restrict Processing</strong> — Limit how we process your data</li>
              <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red text-[10px] font-bold">5</span> <strong>Right to Data Portability</strong> — Receive your data in a structured format</li>
              <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red text-[10px] font-bold">6</span> <strong>Right to Object</strong> — Object to processing based on legitimate interests</li>
              <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red text-[10px] font-bold">7</span> <strong>Right to Withdraw Consent</strong> — Where processing is based on consent</li>
              <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red text-[10px] font-bold">8</span> <strong>Right to Lodge a Complaint</strong> — With a supervisory authority (e.g., India's Data Protection Board)</li>
            </ul>
            <p className="mt-4 text-xs sm:text-sm text-slate-600">
              To exercise any of these rights, please contact us at the address provided in Section 10.
            </p>
          </section>

          {/* 9. Children's Privacy */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <ShieldCheck className="w-4 h-4" />
              </span>
              9. Children's Privacy
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our website is designed for students and competitive exam aspirants of all ages. We do not knowingly
              collect personal information from children under 13 (or the applicable age in your jurisdiction) without
              verifiable parental consent. If you believe we have collected information from a child without consent,
              please contact us immediately and we will delete such information.
            </p>
          </section>

          {/* 10. Contact Information */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Mail className="w-4 h-4" />
              </span>
              10. Contact Us
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-red flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">Email</p>
                  <p className="text-xs text-slate-500 font-mono">privacy@technoedu.example.com <span className="text-amber-600 ml-2">[PLACEHOLDER — REPLACE]</span></p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-brand-red flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">Website</p>
                  <p className="text-xs text-slate-500"><Link to="/contact" className="text-brand-red hover:underline">Contact Form</Link></p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-brand-red flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">Data Protection Officer</p>
                  <p className="text-xs text-slate-500 font-mono">dpo@technoedu.example.com <span className="text-amber-600 ml-2">[PLACEHOLDER — REPLACE]</span></p>
                </div>
              </div>
            </div>
          </section>

          {/* 11. Changes to This Policy */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <AlertCircle className="w-4 h-4" />
              </span>
              11. Changes to This Privacy Policy
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other
              operational, legal, or regulatory reasons. The "Last Updated" date at the top of this page indicates
              when the latest revision was made. We encourage you to review this page periodically. Continued use
              of the website after changes constitutes acceptance of the updated policy.
            </p>
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