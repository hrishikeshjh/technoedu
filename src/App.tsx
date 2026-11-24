import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { InitialLoadingScreen } from './components/common/InitialLoadingScreen';
import { LandingPage } from './pages/LandingPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { LearningSettingsPage } from './pages/LearningSettingsPage';
import { MyLearningPage } from './pages/MyLearningPage';
import { CourseHubPage } from './pages/CourseHubPage';
import { ExamExplorerPage } from './pages/ExamExplorerPage';
import { ExamDetailPage } from './pages/ExamDetailPage';
import { UgcNetHubPage } from './pages/UgcNetHubPage';
import { StudyMaterialPage } from './pages/StudyMaterialPage';
import { PlatformsDirectoryPage } from './pages/PlatformsDirectoryPage';
import { CompleteDirectoryPage } from './pages/CompleteDirectoryPage';
import { AboutPage } from './pages/AboutPage';
import { BlogsPage } from './pages/BlogsPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { BlogContributePage } from './pages/BlogContributePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { CookiesPage } from './pages/CookiesPage';
import { ContactPage } from './pages/ContactPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { RefundPolicyPage } from './pages/RefundPolicyPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Scroll to top automatically upon route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  const [showInitialLoader, setShowInitialLoader] = useState(() => {
    try {
      // Only show initial splash loader on root landing page for first-time session visitors
      if (typeof window !== 'undefined' && window.location.pathname !== '/') {
        return false;
      }
      return !sessionStorage.getItem('technoedu_initial_loaded');
    } catch {
      return false;
    }
  });

  const handleLoaderComplete = useCallback(() => {
    setShowInitialLoader(false);
    try {
      sessionStorage.setItem('technoedu_initial_loaded', '1');
    } catch {}
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-white dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] flex flex-col selection:bg-brand-red selection:text-white transition-colors duration-200">
          {showInitialLoader && (
            <InitialLoadingScreen 
              durationMs={900} 
              onComplete={handleLoaderComplete} 
            />
          )}
          <ScrollToTop />
          <Navbar />
          <main className="flex-1 pb-16 lg:pb-0">
            <Routes>
              {/* Core Landing & Authentication Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<SignInPage />} />
              <Route path="/signin" element={<SignInPage />} />

              {/* Personalized Learning Platform Experience */}
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/my-learning" element={<MyLearningPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings/learning" element={<LearningSettingsPage />} />

              {/* Course-Specific Isolated Routes */}
              <Route path="/courses" element={<CourseHubPage />} />
              <Route path="/courses/:slug" element={<CourseHubPage />} />
              <Route path="/courses/:slug/subjects" element={<CourseHubPage />} />
              <Route path="/courses/:slug/subjects/:subject" element={<CourseHubPage />} />
              <Route path="/courses/:slug/resources" element={<CourseHubPage />} />
              <Route path="/courses/:slug/pyq" element={<CourseHubPage />} />
              <Route path="/courses/:slug/mock-tests" element={<CourseHubPage />} />

              {/* Core Open Aggregator Routes */}
              <Route path="/exams" element={<ExamExplorerPage />} />
              <Route path="/exams/ugc-net" element={<UgcNetHubPage />} />
              <Route path="/exams/ugc-net-jrf" element={<Navigate to="/exams/ugc-net" replace />} />
              <Route path="/exams/:id" element={<ExamDetailPage />} />
              <Route path="/library" element={<StudyMaterialPage />} />
              <Route path="/platforms" element={<PlatformsDirectoryPage />} />
              <Route path="/directory" element={<CompleteDirectoryPage />} />
              <Route path="/about" element={<AboutPage />} />

              {/* Blogs & Knowledge Hub Routes */}
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/blogs/contribute" element={<BlogContributePage />} />
              <Route path="/blogs/:slug" element={<BlogDetailPage />} />

              {/* Legal & Policy Pages */}
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="/refund-policy" element={<RefundPolicyPage />} />
              <Route path="/accessibility" element={<AccessibilityPage />} />

              {/* Aliases & Fallbacks */}
              <Route path="/user" element={<Navigate to="/profile" replace />} />
              <Route path="/account" element={<Navigate to="/profile" replace />} />
              <Route path="/settings" element={<Navigate to="/settings/learning" replace />} />
              <Route path="/practice" element={<Navigate to="/courses" replace />} />
              <Route path="/study-material" element={<Navigate to="/library" replace />} />
              <Route path="/test-series" element={<Navigate to="/courses" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <MobileNav />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};
