import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { InitialLoadingScreen } from './components/common/InitialLoadingScreen';
import { LandingPage } from './pages/LandingPage';
import { ExamExplorerPage } from './pages/ExamExplorerPage';
import { ExamDetailPage } from './pages/ExamDetailPage';
import { StudyMaterialPage } from './pages/StudyMaterialPage';
import { PlatformsDirectoryPage } from './pages/PlatformsDirectoryPage';
import { CompleteDirectoryPage } from './pages/CompleteDirectoryPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { CookiesPage } from './pages/CookiesPage';
import { ContactPage } from './pages/ContactPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { RefundPolicyPage } from './pages/RefundPolicyPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top automatically upon route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  const [showInitialLoader, setShowInitialLoader] = useState(true);

  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-brand-red selection:text-white">
      {showInitialLoader && (
        <InitialLoadingScreen 
          durationMs={3000} 
          onComplete={() => setShowInitialLoader(false)} 
        />
      )}
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 pb-16 lg:pb-0">
        <Routes>
          {/* Core Open Aggregator Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/exams" element={<ExamExplorerPage />} />
          <Route path="/exams/:id" element={<ExamDetailPage />} />
          <Route path="/library" element={<StudyMaterialPage />} />
          <Route path="/platforms" element={<PlatformsDirectoryPage />} />
          <Route path="/directory" element={<CompleteDirectoryPage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Legal & Policy Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />

          {/* Aliases & Fallbacks */}
          <Route path="/practice" element={<Navigate to="/exams" replace />} />
          <Route path="/study-material" element={<Navigate to="/library" replace />} />
          <Route path="/courses" element={<Navigate to="/exams" replace />} />
          <Route path="/courses/:id" element={<Navigate to="/exams" replace />} />
          <Route path="/test-series" element={<Navigate to="/exams" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

