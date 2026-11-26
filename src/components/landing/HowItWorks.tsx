import React from 'react';
import { UserPlus, ClipboardCheck, Rocket } from 'lucide-react';
import { ScrollReveal } from '../../components/common/ScrollReveal';

interface StepProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  delay?: number;
  isLast?: boolean;
}

const Step: React.FC<StepProps> = ({
  number,
  icon,
  title,
  subtitle,
  delay = 0,
}) => (
  <ScrollReveal animation="fade-up" delay={delay} className="h-full">
    <div className="relative flex flex-col items-center text-center space-y-4 h-full">
      {/* Numbered Badge */}
      <div
        className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-brand-red text-white text-sm font-extrabold flex-shrink-0 shadow-red-glow"
        aria-label={`Step ${number.replace(/^0/, '')}`}
      >
        {number}
      </div>

      {/* Icon */}
      <div
        className="relative z-10 w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] flex items-center justify-center flex-shrink-0"
      >
        {icon}
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-1.5 w-full">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F8FAFC]">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A7AFBD] leading-relaxed max-w-xs mx-auto">
          {subtitle}
        </p>
      </div>
    </div>
  </ScrollReveal>
);

const VerticalStep: React.FC<StepProps> = ({
  number,
  icon,
  title,
  subtitle,
  delay = 0,
  isLast = false,
}) => (
  <ScrollReveal animation="fade-up" delay={delay} className="w-full">
    <div className="flex items-start gap-4 relative">
      {/* Vertical connecting line */}
      {!isLast && (
        <div
          className="absolute left-7 top-14 -bottom-8 w-0.5 bg-gradient-to-b from-brand-red/40 to-brand-red/10"
          aria-hidden="true"
        />
      )}
      
      {/* Numbered Badge */}
      <div
        className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-brand-red text-white text-sm font-extrabold flex-shrink-0"
        aria-label={`Step ${number.replace(/^0/, '')}`}
      >
        {number}
      </div>

      {/* Icon */}
      <div className="relative z-10 w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1.5 text-left">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F8FAFC]">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A7AFBD] leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  </ScrollReveal>
);

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: (
        <UserPlus className="w-5 h-5 text-slate-700 dark:text-slate-300" aria-hidden="true" />
      ),
      title: 'Sign Up',
      subtitle: 'Create your account',
    },
    {
      number: '02',
      icon: (
        <ClipboardCheck className="w-5 h-5 text-slate-700 dark:text-slate-300" aria-hidden="true" />
      ),
      title: 'Tell Us Your Goal',
      subtitle: 'Choose your course',
    },
    {
      number: '03',
      icon: (
        <Rocket className="w-5 h-5 text-slate-700 dark:text-slate-300" aria-hidden="true" />
      ),
      title: 'Start Learning',
      subtitle: 'Follow your roadmap',
    },
  ];

  return (
    <section
      className="py-16 sm:py-20 bg-slate-50/70 dark:bg-[#0B0C0F] border-b border-slate-100 dark:border-[#1E222A]"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up" delay={50} className="mb-12">
          <div className="max-w-2xl">
            <h2 id="how-it-works-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F8FAFC]">
              How It Works
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-[#A7AFBD]">
              Get started in just a few simple steps.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Container with subtle red accent geometry */}
          <div className="relative rounded-3xl bg-white dark:bg-[#111318] border border-slate-200/80 dark:border-[#252932] p-6 sm:p-8 lg:p-12">
            {/* Red vertical accent line on left */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-red to-brand-red/20 rounded-l-3xl"
              aria-hidden="true"
            />

            {/* Decorative red geometry at bottom-right */}
            <div
              className="absolute bottom-4 right-4 w-24 h-24 rounded-full border-2 border-brand-red/20 opacity-50"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-brand-red/10"
              aria-hidden="true"
            />

            {/* Desktop: Horizontal Steps */}
            <div className="hidden md:grid md:grid-cols-3 md:gap-8 relative z-10">
              {/* Connecting Line across step badges */}
              <div
                className="hidden md:block absolute top-7 left-[16.666%] right-[16.666%] h-0.5 bg-gradient-to-r from-brand-red/30 via-brand-red/40 to-brand-red/30 z-0"
                aria-hidden="true"
              />
              {steps.map((step, idx) => (
                <Step
                  key={step.number}
                  number={step.number}
                  icon={step.icon}
                  title={step.title}
                  subtitle={step.subtitle}
                  delay={50 + idx * 100}
                  isLast={idx === steps.length - 1}
                />
              ))}
            </div>

            {/* Mobile: Vertical Timeline */}
            <div className="md:hidden relative z-10 space-y-8">
              {steps.map((step, idx) => (
                <VerticalStep
                  key={step.number}
                  number={step.number}
                  icon={step.icon}
                  title={step.title}
                  subtitle={step.subtitle}
                  delay={50 + idx * 100}
                  isLast={idx === steps.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};