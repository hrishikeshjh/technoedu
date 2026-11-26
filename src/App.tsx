import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { InitialLoadingScreen } from './components/common/InitialLoadingScreen';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { VerifyEmailPage } from './pages/VerifyEmailPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
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
import { LecturesRoadmapPage } from './pages/LecturesRoadmapPage';
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
import { AuthProvider, useAuth } from './context/AuthContext';

const STANDALONE_ROUTES = ['/login', '/signin', '/signup', '/verify-email', '/forgot-password', '/onboarding'];

// Scroll to top automatically upon route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ActiveCourseRedirect: React.FC<{ section: 'resources' | 'pyq' | 'mock-tests' }> = ({ section }) => {
  const { activeCourseId } = useAuth();
  const slug = activeCourseId || 'ugc-net';
  return <Navigate to={`/courses/${slug}/${section}`} replace />;
};

const AppShell: React.FC = () => {
  const location = useLocation();
  const isStandalone = STANDALONE_ROUTES.includes(location.pathname);
  const isLanding = location.pathname === '/';
  const hideChrome = isStandalone || isLanding;

  const [showInitialLoader, setShowInitialLoader] = useState(() => {
    try {
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
    <div className="min-h-screen bg-white dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] flex flex-col selection:bg-brand-red selection:text-white transition-colors duration-200">
      {showInitialLoader && (
        <InitialLoadingScreen durationMs={900} onComplete={handleLoaderComplete} />
      )}
      <ScrollToTop />
      {!hideChrome && <Navbar />}
      <main className={`flex-1 ${!hideChrome ? 'pb-16 lg:pb-0' : ''}`}>
        <Routes>
          {/* Public Routes ONLY */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/signin" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />

          {/* Onboarding (Authenticated, only when onboarding is incomplete) */}
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute requireOnboardingCompleted={false} onlyWhenOnboardingIncomplete={true}>
                <OnboardingPage />
              </ProtectedRoute>
            }
          />

          {/* Protected Personalized Learning Platform Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/planner" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/my-learning" element={<ProtectedRoute><MyLearningPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/settings/learning" element={<ProtectedRoute><LearningSettingsPage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Navigate to="/settings/learning" replace /></ProtectedRoute>} />
          <Route path="/user" element={<ProtectedRoute><Navigate to="/profile" replace /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><Navigate to="/profile" replace /></ProtectedRoute>} />

          {/* Protected Course-Specific Isolated Routes */}
          <Route path="/courses" element={<ProtectedRoute><CourseHubPage /></ProtectedRoute>} />
          <Route path="/courses/:slug" element={<ProtectedRoute><CourseHubPage /></ProtectedRoute>} />
          <Route path="/courses/:slug/subjects" element={<ProtectedRoute><CourseHubPage /></ProtectedRoute>} />
          <Route path="/courses/:slug/subjects/:subject" element={<ProtectedRoute><CourseHubPage /></ProtectedRoute>} />
          <Route path="/courses/:slug/resources" element={<ProtectedRoute><CourseHubPage /></ProtectedRoute>} />
          <Route path="/courses/:slug/pyq" element={<ProtectedRoute><CourseHubPage /></ProtectedRoute>} />
          <Route path="/courses/:slug/mock-tests" element={<ProtectedRoute><CourseHubPage /></ProtectedRoute>} />
          <Route path="/courses/:slug/lectures" element={<ProtectedRoute><LecturesRoadmapPage /></ProtectedRoute>} />
          <Route path="/lectures" element={<ProtectedRoute><LecturesRoadmapPage /></ProtectedRoute>} />
          <Route path="/roadmap" element={<ProtectedRoute><LecturesRoadmapPage /></ProtectedRoute>} />

          {/* Protected Educational Directories & Resources */}
          <Route path="/exams" element={<ProtectedRoute><ExamExplorerPage /></ProtectedRoute>} />
          <Route path="/exams/ugc-net" element={<ProtectedRoute><UgcNetHubPage /></ProtectedRoute>} />
          <Route path="/exams/ugc-net-jrf" element={<ProtectedRoute><Navigate to="/exams/ugc-net" replace /></ProtectedRoute>} />
          <Route path="/exams/:id" element={<ProtectedRoute><ExamDetailPage /></ProtectedRoute>} />
          <Route path="/library" element={<ProtectedRoute><StudyMaterialPage /></ProtectedRoute>} />
          <Route path="/study-materials" element={<ProtectedRoute><StudyMaterialPage /></ProtectedRoute>} />
          <Route path="/study-material" element={<ProtectedRoute><Navigate to="/study-materials" replace /></ProtectedRoute>} />
          <Route path="/platforms" element={<ProtectedRoute><PlatformsDirectoryPage /></ProtectedRoute>} />
          <Route path="/directory" element={<ProtectedRoute><CompleteDirectoryPage /></ProtectedRoute>} />
          <Route path="/pyq" element={<ProtectedRoute><ActiveCourseRedirect section="pyq" /></ProtectedRoute>} />
          <Route path="/mock-tests" element={<ProtectedRoute><ActiveCourseRedirect section="mock-tests" /></ProtectedRoute>} />
          <Route path="/practice" element={<ProtectedRoute><ActiveCourseRedirect section="mock-tests" /></ProtectedRoute>} />
          <Route path="/test-series" element={<ProtectedRoute><ActiveCourseRedirect section="mock-tests" /></ProtectedRoute>} />

          {/* Blogs & Knowledge Hub Routes (Public reading; contributing requires login) */}
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/contribute" element={<ProtectedRoute><BlogContributePage /></ProtectedRoute>} />
          <Route path="/blogs/:slug" element={<BlogDetailPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!hideChrome && <Footer />}
      {!hideChrome && <MobileNav />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </ThemeProvider>
  );
};
