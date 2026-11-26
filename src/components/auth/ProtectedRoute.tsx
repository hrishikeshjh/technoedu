import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { buildLoginRedirectUrl } from '../../lib/authRedirect';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireOnboardingCompleted?: boolean;
  onlyWhenOnboardingIncomplete?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireOnboardingCompleted = true,
  onlyWhenOnboardingIncomplete = false,
}) => {
  const { user, isAuthenticated, isLoading, sessionExpired } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 bg-white dark:bg-[#08090B]">
        <Loader2 className="w-8 h-8 animate-spin text-brand-red" />
        <p className="text-xs font-medium text-slate-500 dark:text-[#A7AFBD]">
          Verifying your session...
        </p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    const loginUrl = buildLoginRedirectUrl(
      location.pathname,
      location.search,
      sessionExpired ? 'expired' : undefined
    );
    return <Navigate to={loginUrl} replace />;
  }

  const onboardingDone = Boolean(user.learningProfile?.onboardingCompleted);

  if (onlyWhenOnboardingIncomplete && onboardingDone) {
    return <Navigate to="/dashboard" replace />;
  }

  if (requireOnboardingCompleted && !onboardingDone && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};
