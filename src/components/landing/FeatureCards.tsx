import React from 'react';
import { BookOpen, Target, BarChart3, Users } from 'lucide-react';
import { ScrollReveal } from '../../components/common/ScrollReveal';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  delay?: number;
  index?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  subtitle,
  delay = 0,
}) => (
  <ScrollReveal animation="fade-up" delay={delay} className="h-full">
    <div
      className="group h-full p-6 sm:p-8 rounded-[18px] bg-white dark:bg-[#111318] border border-slate-200/80 dark:border-[#252932] space-y-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-soft-lg"
      style={{
        boxShadow: '0 2px 16px -2px rgba(0, 0, 0, 0.04)',
      }}
    >
      <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-brand-red/10 text-brand-red flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-[#F8FAFC]">
        {title}
      </h3>
      <p className="text-sm text-slate-600 dark:text-[#A7AFBD] leading-relaxed">
        {subtitle}
      </p>
    </div>
  </ScrollReveal>
);

export const FeatureCards: React.FC = () => {
  const features = [
    {
      icon: (
        <BookOpen className="w-5 h-5" aria-hidden="true" />
      ),
      title: 'Comprehensive Resources',
      subtitle: 'Syllabus-aligned textbooks, university lecture notes, and verified PYQs in one place.',
    },
    {
      icon: (
        <Target className="w-5 h-5" aria-hidden="true" />
      ),
      title: 'Structured Roadmaps',
      subtitle: 'Unit-by-unit study plans calibrated to your target exam and daily pace.',
    },
    {
      icon: (
        <BarChart3 className="w-5 h-5" aria-hidden="true" />
      ),
      title: 'Track Progress',
      subtitle: 'Monitor completed chapters, mock test accuracy, and revision streaks.',
    },
    {
      icon: (
        <Users className="w-5 h-5" aria-hidden="true" />
      ),
      title: 'Learn Together',
      subtitle: 'Read open exam strategies and contribute study notes with fellow aspirants.',
    },
  ];

  return (
    <section
      className="py-16 sm:py-20 bg-slate-50/70 dark:bg-[#0B0C0F] border-b border-slate-100 dark:border-[#1E222A]"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up" delay={50} className="max-w-2xl mb-12">
          <h2 id="features-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F8FAFC]">
            What Techno Wallah offers
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-[#A7AFBD]">
            Everything you need to structure your study routine inside one focused platform.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, idx) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              subtitle={feature.subtitle}
              delay={idx * 80}
            />
          ))}
        </div>
      </div>
    </section>
  );
};