import React from 'react';
import { PublicNavbar } from '../components/landing/PublicNavbar';
import { HeroSection } from '../components/landing/HeroSection';
import { PrimeExamsShowcase } from '../components/landing/PrimeExamsShowcase';
import { FeatureCards } from '../components/landing/FeatureCards';
import { OpenSourcesStrip } from '../components/landing/OpenSourcesStrip';
import { HowItWorks } from '../components/landing/HowItWorks';
import { LandingFaq } from '../components/landing/LandingFaq';
import { FinalCTA } from '../components/landing/FinalCTA';
import { Footer } from '../components/landing/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] transition-colors duration-200">
      <PublicNavbar />
      <HeroSection />
      <PrimeExamsShowcase />
      <FeatureCards />
      <OpenSourcesStrip />
      <HowItWorks />
      <LandingFaq />
      <FinalCTA />
      <Footer />
    </div>
  );
};