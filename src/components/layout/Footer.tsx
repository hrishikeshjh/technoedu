import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Shield,
  Cookie,
  Scale,
  Accessibility,
  HeartHandshake,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Footer: React.FC = () => {
  const { isAuthenticated, activeCourseId } = useAuth();
  const courseSlug = activeCourseId || 'ugc-net';

  return (
    <footer className="bg-slate-950 dark:bg-[#08090B] text-slate-300 pt-12 pb-24 lg:pb-12 border-t border-slate-900 dark:border-[#252932]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800 dark:border-[#252932]">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logowhite.png"
                alt="TechnoEdu"
                className="h-10 w-auto object-contain"
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              A personalized learning environment designed around your academic goals. Organize your preparation, track progress, and study without distractions.
            </p>
          </div>

          {/* Platform Links (Strictly scoped by auth state) */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5">
              {isAuthenticated ? 'Learning Workspace' : 'TechnoEdu'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {isAuthenticated ? (
                <>
                  <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                  <li><Link to="/my-learning" className="hover:text-white transition-colors">My Learning</Link></li>
                  <li><Link to={`/courses/${courseSlug}/resources`} className="hover:text-white transition-colors">Study Materials</Link></li>
                  <li><Link to="/library" className="hover:text-white transition-colors">Library</Link></li>
                  <li><Link to="/blogs" className="hover:text-white transition-colors">Blogs</Link></li>
                  <li><Link to="/profile" className="hover:text-white transition-colors">Profile</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link to="/login" className="hover:text-white transition-colors">Sign In</Link></li>
                  <li><Link to="/signup" className="hover:text-white transition-colors">Get Started</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Legal & Policy Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5">
              Legal &amp; Policies
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-slate-500" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <FileText className="w-3 h-3 text-slate-500" />
                  <span>Terms &amp; Conditions</span>
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Cookie className="w-3 h-3 text-slate-500" />
                  <span>Cookie Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Scale className="w-3 h-3 text-slate-500" />
                  <span>Disclaimer</span>
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <HeartHandshake className="w-3 h-3 text-slate-500" />
                  <span>Refund Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Accessibility className="w-3 h-3 text-slate-500" />
                  <span>Accessibility</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} TechnoEdu. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/about" className="hover:text-slate-300">About</Link>
            <Link to="/contact" className="hover:text-slate-300">Contact</Link>
            <Link to="/privacy" className="hover:text-slate-300">Privacy</Link>
            <Link to="/terms" className="hover:text-slate-300">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
