import React from 'react';
import { Link } from 'react-router-dom';
import { Cookie, ShieldCheck, Database, Eye, EyeOff, Globe, AlertCircle, CheckCircle, XCircle, Clock, ExternalLink } from 'lucide-react';

const GIL_SANS = { fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' };

export const CookiesPage: React.FC = () => {
  const lastUpdated = 'September 19, 2026';

  // Cookie data for the table
  const essentialCookies = [
    { name: 'session_id', purpose: 'Maintains user session across page navigation', expiry: 'Session', provider: 'First-party' },
    { name: 'csrf_token', purpose: 'Cross-site request forgery protection for forms', expiry: 'Session', provider: 'First-party' },
    { name: 'cookie_consent', purpose: 'Stores your cookie preference choices', expiry: '1 year', provider: 'First-party' },
  ];

  const analyticsCookies = [
    { name: 'plausible_session', purpose: 'Anonymous session tracking for privacy-friendly analytics', expiry: '30 minutes', provider: 'Plausible Analytics' },
    { name: 'plausible_visitor', purpose: 'Anonymous visitor identification (no personal data)', expiry: '1 year', provider: 'Plausible Analytics' },
  ];

  return (
    <div className="w-full bg-white text-slate-900 pt-6 sm:pt-8 pb-16" style={GIL_SANS}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-6 flex items-center gap-2 text-xs sm:text-sm text-slate-400">
          <Link to="/" className="hover:text-brand-red transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">Cookie Policy</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-brand-red text-xs font-medium mb-4">
            <Cookie className="w-3.5 h-3.5" />
            <span>Cookie Policy</span>
          </div>
          <h1 className="text-2xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            How We Use Cookies
          </h1>
          <p className="mt-3 sm:mt-4 text-slate-500 text-xs sm:text-base leading-relaxed">
            This Cookie Policy explains what cookies are, how we use them, and your choices regarding cookies
            on the Techno Wallah website.
          </p>
          <p className="mt-2 text-xs text-slate-400">Last Updated: {lastUpdated}</p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10">

          {/* 1. What Are Cookies */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Cookie className="w-4 h-4" />
              </span>
              1. What Are Cookies?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Cookies are small text files stored on your device (computer, tablet, or mobile) when you visit a website.
              They help websites function properly, remember your preferences, and understand how visitors interact with the site.
            </p>
            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 text-xs sm:text-sm">Session Cookies</p>
                  <p className="text-xs text-slate-500">Temporary cookies deleted when you close your browser</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 text-xs sm:text-sm">Persistent Cookies</p>
                  <p className="text-xs text-slate-500">Remain on your device until they expire or are deleted</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 text-xs sm:text-sm">First-Party Cookies</p>
                  <p className="text-xs text-slate-500">Set by the website you are visiting (technoedu.vercel.app)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 text-xs sm:text-sm">Third-Party Cookies</p>
                  <p className="text-xs text-slate-500">Set by external services (analytics, embedded content)</p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Our Cookie Philosophy */}
          <section className="card-subtle p-6 sm:p-8 border-l-4 border-emerald-500">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-4 h-4" />
              </span>
              2. Our Commitment: Minimal & Privacy-First
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Techno Wallah follows a <strong className="text-slate-900">minimal cookie philosophy</strong>. We believe educational resources
              should be accessible without invasive tracking.
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /><span><strong>No advertising cookies</strong> — We do not use marketing, retargeting, or behavioral advertising cookies</span></li>
              <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /><span><strong>No third-party tracking cookies</strong> — No Facebook Pixel, Google Ads, or similar trackers</span></li>
              <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /><span><strong>Privacy-friendly analytics only</strong> — We use Plausible Analytics (or similar) which does not use cookies to track individuals</span></li>
              <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /><span><strong>Essential cookies only by default</strong> — Non-essential cookies require your explicit consent</span></li>
            </ul>
          </section>

          {/* 3. Categories of Cookies We Use */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Database className="w-4 h-4" />
              </span>
              3. Categories of Cookies We Use
            </h2>

            {/* Essential Cookies */}
            <div className="mb-8">
              <h3 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-bold">1</span>
                Essential Cookies (Strictly Necessary)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-3">
                These cookies are required for the website to function properly. They cannot be disabled.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-slate-400">
                      <th className="pb-2 font-medium">Cookie Name</th>
                      <th className="pb-2 font-medium">Purpose</th>
                      <th className="pb-2 font-medium">Expiry</th>
                      <th className="pb-2 font-medium">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {essentialCookies.map((cookie) => (
                      <tr key={cookie.name} className="hover:bg-slate-50">
                        <td className="py-2 font-mono text-brand-red">{cookie.name}</td>
                        <td className="py-2 text-slate-600">{cookie.purpose}</td>
                        <td className="py-2 text-slate-500">{cookie.expiry}</td>
                        <td className="py-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-700">
                            {cookie.provider}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                <strong>Legal Basis:</strong> Legitimate interest (necessary for website operation).
                <strong>Opt-out:</strong> Not available — these are required for basic functionality.
              </p>
            </div>

            {/* Analytics Cookies */}
            <div className="mb-8">
              <h3 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xs font-bold">2</span>
                Analytics Cookies (Performance)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-3">
                These cookies help us understand how visitors interact with the website anonymously.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-slate-400">
                      <th className="pb-2 font-medium">Cookie Name</th>
                      <th className="pb-2 font-medium">Purpose</th>
                      <th className="pb-2 font-medium">Expiry</th>
                      <th className="pb-2 font-medium">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {analyticsCookies.map((cookie) => (
                      <tr key={cookie.name} className="hover:bg-slate-50">
                        <td className="py-2 font-mono text-amber-600">{cookie.name}</td>
                        <td className="py-2 text-slate-600">{cookie.purpose}</td>
                        <td className="py-2 text-slate-500">{cookie.expiry}</td>
                        <td className="py-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-100 text-amber-700">
                            {cookie.provider}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                <strong>Legal Basis:</strong> Consent (GDPR Art. 6(1)(a)).
                <strong>Opt-out:</strong> Available via cookie banner or browser settings.
              </p>
            </div>

            {/* Functional Cookies */}
            <div>
              <h3 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">3</span>
                Functional Cookies (Preferences)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-3">
                These cookies remember your preferences to enhance your experience.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-slate-400">
                      <th className="pb-2 font-medium">Cookie Name</th>
                      <th className="pb-2 font-medium">Purpose</th>
                      <th className="pb-2 font-medium">Expiry</th>
                      <th className="pb-2 font-medium">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="py-2 font-mono text-blue-600">theme_preference</td>
                      <td className="py-2 text-slate-600">Remembers light/dark mode preference</td>
                      <td className="py-2 text-slate-500">1 year</td>
                      <td className="py-2"><span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700">First-party</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2 font-mono text-blue-600">search_history</td>
                      <td className="py-2 text-slate-600">Stores recent search queries locally</td>
                      <td className="py-2 text-slate-500">30 days</td>
                      <td className="py-2"><span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700">First-party</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                <strong>Legal Basis:</strong> Consent. <strong>Opt-out:</strong> Available — disabling may reset preferences on each visit.
              </p>
            </div>
          </section>

          {/* 4. Third-Party Cookies */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Globe className="w-4 h-4" />
              </span>
              4. Third-Party Services & Embedded Content
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              When you click links to external educational resources (NPTEL, SWAYAM, NCERT, MIT OCW, OpenStax, etc.),
              those websites may set their own cookies. We have no control over third-party cookies.
            </p>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">External Links</p>
                  <p className="text-slate-500">All outbound links open with <code className="bg-slate-100 px-1 rounded text-[10px] font-mono">rel="noopener noreferrer"</code> for security. Third-party sites set their own cookies per their policies.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <Database className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Analytics Provider</p>
                  <p className="text-slate-500">We use <strong>Plausible Analytics</strong> (or similar privacy-first alternative) which is GDPR-compliant,
                  does not use cookies for personal tracking, and does not collect personally identifiable information.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">No Social Media Embeds</p>
                  <p className="text-slate-500">We do not embed social media widgets (Facebook, Twitter/X, LinkedIn, YouTube) that would set tracking cookies.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Cookie Consent & Management */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Eye className="w-4 h-4" />
              </span>
              5. Cookie Consent & Management
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              On your first visit, you will see a cookie consent banner allowing you to:
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 mb-6">
              <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /><span><strong>Accept All</strong> — Enable analytics and functional cookies</span></li>
              <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /><span><strong>Reject Non-Essential</strong> — Only essential cookies (recommended for privacy)</span></li>
              <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /><span><strong>Customize</strong> — Choose specific categories to enable/disable</span></li>
            </ul>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              You can change your preferences at any time by:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red text-[10px] font-bold">1</span> Clicking the "Cookie Settings" link in the footer (if implemented)</li>
              <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red text-[10px] font-bold">2</span> Clearing your browser cookies for this domain</li>
              <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-brand-red text-[10px] font-bold">3</span> Using your browser's cookie management settings (see below)</li>
            </ul>
          </section>

          {/* 6. Browser Cookie Controls */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <EyeOff className="w-4 h-4" />
              </span>
              6. Managing Cookies in Your Browser
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Most browsers allow you to control cookies through their settings. Below are links to instructions
              for popular browsers:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <Globe className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span>Google Chrome</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 ml-auto" />
              </a>
              <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <Globe className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Mozilla Firefox</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 ml-auto" />
              </a>
              <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <Globe className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>Apple Safari</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 ml-auto" />
              </a>
              <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <Globe className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Microsoft Edge</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 ml-auto" />
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              <strong>Note:</strong> Blocking all cookies (including essential) may cause the website to malfunction.
              We recommend only blocking non-essential cookies.
            </p>
          </section>

          {/* 7. Do Not Track */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <ShieldCheck className="w-4 h-4" />
              </span>
              7. Do Not Track (DNT)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Some browsers send a "Do Not Track" (DNT) header. We respect this signal and will not enable
              analytics cookies if DNT is detected. However, essential cookies required for site functionality
              will still be set regardless of DNT settings.
            </p>
          </section>

          {/* 8. Changes to This Policy */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <AlertCircle className="w-4 h-4" />
              </span>
              8. Changes to This Cookie Policy
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We may update this Cookie Policy to reflect changes in our practices, technology, or legal requirements.
              The "Last Updated" date at the top indicates the latest revision. We encourage you to review this page
              periodically. Continued use of the website after changes constitutes acceptance.
            </p>
          </section>

          {/* 9. Contact */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Globe className="w-4 h-4" />
              </span>
              9. Contact Us
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              If you have questions about our use of cookies, please contact us:
            </p>
            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Cookie className="w-4 h-4 text-brand-red flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">Email</p>
                  <p className="text-xs text-slate-500 font-mono">cookies@technoedu.example.com <span className="text-amber-600 ml-2">[PLACEHOLDER — REPLACE]</span></p>
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