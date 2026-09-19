import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Info, AlertCircle, CreditCard, RotateCcw, HeartHandshake, Mail, Globe } from 'lucide-react';

const GIL_SANS = { fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' };

export const RefundPolicyPage: React.FC = () => {
  const lastUpdated = 'September 19, 2026';

  return (
    <div className="w-full bg-white text-slate-900 pt-6 sm:pt-8 pb-16" style={GIL_SANS}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-6 flex items-center gap-2 text-xs sm:text-sm text-slate-400">
          <Link to="/" className="hover:text-brand-red transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">Refund Policy</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Refund & Cancellation Policy</span>
          </div>
          <h1 className="text-2xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            No Payments, No Refunds Needed
          </h1>
          <p className="mt-3 sm:mt-4 text-slate-500 text-xs sm:text-base leading-relaxed">
            Techno Wallah is a completely free, open-access educational resource. There are no payments,
            subscriptions, purchases, or transactions of any kind on this website.
          </p>
          <p className="mt-2 text-xs text-slate-400">Last Updated: {lastUpdated}</p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10">

          {/* 1. Free Access Statement */}
          <section className="card-subtle p-6 sm:p-8 border-l-4 border-emerald-500">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                <HeartHandshake className="w-4 h-4" />
              </span>
              1. Completely Free & Open Access
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              <strong className="text-slate-900">Techno Wallah does not charge any fees for access to its website, directory,
              curated links, or any educational resources.</strong>
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /><span><strong>No subscription fees</strong> — No monthly, yearly, or one-time payments required.</span></li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /><span><strong>No paywalls</strong> — All curated content is freely accessible without login.</span></li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /><span><strong>No premium tiers</strong> — No "pro," "plus," or "premium" features behind payment.</span></li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /><span><strong>No hidden charges</strong> — No in-app purchases, upgrades, or freemium limitations.</span></li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /><span><strong>No payment processing</strong> — We do not collect credit cards, UPI, or any payment information.</span></li>
            </ul>
            <p className="mt-4 text-xs text-slate-500">
              Since there are <strong>no financial transactions</strong> on this website, a traditional refund policy is not applicable.
            </p>
          </section>

          {/* 2. What This Means for You */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Info className="w-4 h-4" />
              </span>
              2. What This Means for You
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-600">
              <div className="p-4 bg-slate-50 rounded-xl">
                <h3 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-slate-400" />
                  <span>No Purchase = No Refund Needed</span>
                </h3>
                <p>You cannot request a refund for something you never paid for. All resources on this website
                are provided at zero cost to you.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <h3 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-slate-400" />
                  <span>No Cancellation Process</span>
                </h3>
                <p>There are no subscriptions, memberships, or recurring services to cancel. You simply
                stop visiting the website if you no longer wish to use it.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <h3 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-slate-400" />
                  <span>No Financial Risk</span>
                </h3>
                <p>You bear zero financial risk using this website. Your only investment is time spent
                exploring educational resources.</p>
              </div>
            </div>
          </section>

          {/* 3. Third-Party Paid Services */}
          <section className="card-subtle p-6 sm:p-8 border-l-4 border-amber-500">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                <AlertCircle className="w-4 h-4" />
              </span>
              3. Third-Party Paid Services (Important)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              While Techno Wallah itself is completely free, our directory links to external educational platforms.
              Some of these third-party platforms may offer paid services:
            </p>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">External Platforms May Have Fees</p>
                  <p className="text-slate-600 mt-1">Some linked platforms (e.g., certain course providers, test series platforms, coaching institutes)
                  may offer paid subscriptions, courses, or test series <strong>on their own websites</strong>.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">Their Policies Apply</p>
                  <p className="text-slate-600 mt-1">Any purchases, subscriptions, or payments made on third-party websites are subject to
                  <strong>their own refund, cancellation, and billing policies</strong> — not ours.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">We Clearly Label Access Types</p>
                  <p className="text-slate-600 mt-1">In our directory, we label each resource with its access type (e.g., "Free," "Freemium," "Paid")
                  so you can make informed decisions before clicking through.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">No Responsibility for Third-Party Payments</p>
                  <p className="text-slate-600 mt-1"><strong>Techno Wallah is not a party to any transaction</strong> between you and third-party platforms.
                  We do not process payments, receive commissions, or have any contractual relationship with paid services.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Donations (If Applicable) */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <HeartHandshake className="w-4 h-4" />
              </span>
              4. Donations & Voluntary Support
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Techno Wallah is a non-commercial, community-driven initiative. We do not currently accept donations
              or voluntary financial contributions through this website.
            </p>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-600 mb-2">
                If we ever introduce a voluntary support mechanism (e.g., GitHub Sponsors, Open Collective) in the future:
              </p>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2"><Info className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" /><span>It will be <strong>purely voluntary</strong> — all content remains free regardless.</span></li>
                <li className="flex items-center gap-2"><Info className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" /><span>Donations would be <strong>non-refundable</strong> as they are voluntary contributions, not purchases.</span></li>
                <li className="flex items-center gap-2"><Info className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" /><span>Any such program would have its own <strong>clear terms</strong> disclosed at the time.</span></li>
              </ul>
            </div>
          </section>

          {/* 5. What If You Were Charged? */}
          <section className="card-subtle p-6 sm:p-8 border-l-4 border-red-500">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                <AlertCircle className="w-4 h-4" />
              </span>
              5. If You Were Charged by Someone Claiming to Be Us
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              <strong className="text-red-600">Techno Wallah never charges for access.</strong> If anyone requests payment claiming to be
              from Techno Wallah, or if you encounter a fake website mimicking us asking for payment:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" /><span><strong>It is a scam.</strong> Do not provide any payment information.</span></li>
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" /><span>Report it immediately via our <Link to="/contact" className="text-brand-red hover:underline">contact form</Link>.</span></li>
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" /><span>Contact your bank/payment provider to dispute any unauthorized charges.</span></li>
              <li className="flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" /><span>Verify the URL: only <code className="bg-slate-100 px-1 rounded text-[10px] font-mono">technoedu.vercel.app</code> (or our verified domain) is official.</span></li>
            </ul>
          </section>

          {/* 6. Contact */}
          <section className="card-subtle p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand-red">
                <Globe className="w-4 h-4" />
              </span>
              6. Questions? Contact Us
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              If you have any questions about this policy or encounter suspicious payment requests:
            </p>
            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-red flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">Email</p>
                  <p className="text-xs text-slate-500 font-mono">support@technoedu.example.com <span className="text-amber-600 ml-2">[PLACEHOLDER — REPLACE]</span></p>
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