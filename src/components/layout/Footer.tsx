import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Library,
  Globe,
  ExternalLink,
  BookOpen,
  ShieldCheck,
  Award,
  ArrowUpRight,
  FileText,
  Shield,
  Cookie,
  Scale,
  Accessibility,
  HeartHandshake
} from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-24 lg:pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Open Brand Row */}
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-10 border-b border-slate-800">

          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logowhite.png"
                alt="Techno Wallah"
                className="h-12 w-auto object-contain"
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              An open-access academic initiative aggregating authentic open-source learning repositories, government digital portals, peer-reviewed textbooks, and verified previous year question banks.
            </p>

            <div className="pt-1 text-xs text-slate-500">
              Curated under Open Educational Resources (OER) guidelines by Techno Wallah for students and competitive exam aspirants.
            </div>
          </div>

          {/* Exam Programs Column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5">
              Target Examinations
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                  <Link to={`/exams/upsc`} className="hover:text-white transition-colors flex items-center justify-between">
                    <span>UPSC Civil Services (CSE)</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-600" />
                  </Link>
              </li>
              <li>
                <Link to="/exams/wbcs" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>West Bengal PSC (WBCS)</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </Link>
              </li>
              <li>
                <Link to="/exams/gre" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>GRE General Test</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </Link>
              </li>
              <li>
                <Link to="/exams/sat" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Digital SAT (College Board)</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </Link>
              </li>
              <li>
                <Link to="/exams/clat" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>CLAT & NLUs Law</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </Link>
              </li>
              <li>
                <Link to="/exams/cat" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>CAT & Management</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Open Education Repositories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5">
              Open Repositories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="https://nptel.ac.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>NPTEL & SWAYAM</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://ocw.mit.edu" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>MIT OpenCourseWare</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://ncert.nic.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>NCERT e-Pathshala</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://openstax.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>OpenStax Textbooks</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://egyankosh.ac.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>e-GyanKosh (IGNOU)</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://indiankanoon.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Indian Kanoon Law</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Hub Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5">
              Hub Directory
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/exams" className="hover:text-white transition-colors">Exams</Link></li>
              <li><Link to="/directory" className="hover:text-white transition-colors">Directory</Link></li>
              <li><Link to="/library" className="hover:text-white transition-colors">Library</Link></li>
              <li><Link to="/platforms" className="hover:text-white transition-colors">Platforms</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal & Policy Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5">
              Legal & Policies
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors flex items-center gap-1">
                  <Shield className="w-2.5 h-2.5 text-slate-500" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors flex items-center gap-1">
                  <FileText className="w-2.5 h-2.5 text-slate-500" />
                  <span>Terms & Conditions</span>
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-white transition-colors flex items-center gap-1">
                  <Cookie className="w-2.5 h-2.5 text-slate-500" />
                  <span>Cookie Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-white transition-colors flex items-center gap-1">
                  <Scale className="w-2.5 h-2.5 text-slate-500" />
                  <span>Disclaimer</span>
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-white transition-colors flex items-center gap-1">
                  <HeartHandshake className="w-2.5 h-2.5 text-slate-500" />
                  <span>Refund Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="hover:text-white transition-colors flex items-center gap-1">
                  <Accessibility className="w-2.5 h-2.5 text-slate-500" />
                  <span>Accessibility</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </ScrollReveal>

      {/* Bottom Strip */}
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div>
          Techno Wallah Open Education Resource Initiative. Non-commercial, open-access public knowledge repository.
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/about" className="hover:text-slate-300">About</Link>
          <Link to="/contact" className="hover:text-slate-300">Contact</Link>
          <Link to="/privacy-policy" className="hover:text-slate-300">Privacy</Link>
          <Link to="/terms" className="hover:text-slate-300">Terms</Link>
          <Link to="/cookies" className="hover:text-slate-300">Cookies</Link>
          <Link to="/disclaimer" className="hover:text-slate-300">Disclaimer</Link>
          <Link to="/accessibility" className="hover:text-slate-300">Accessibility</Link>
        </div>
      </div>

      </div>
    </footer>
  );
};

