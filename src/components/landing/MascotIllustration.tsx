import React from 'react';

interface MascotIllustrationProps {
  className?: string;
  'aria-label'?: string;
}

export const MascotIllustration: React.FC<MascotIllustrationProps> = ({
  className = '',
  'aria-label': ariaLabel = 'Techno Wallah mascot illustration',
}) => {
  return (
    <div
      className={`relative flex justify-center items-center ${className}`}
      aria-hidden="true"
    >
      {/* Red decorative circle behind mascot */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute w-64 h-64 sm:w-[420px] sm:h-[420px] lg:w-[500px] lg:h-[500px] rounded-full border-2 border-brand-red/20 animate-pulse-subtle"
          style={{
            animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        />
        <div
          className="absolute w-52 h-52 sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px] rounded-full border border-brand-red/10"
        />
        {/* Orbital line decoration */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
          viewBox="0 0 600 600"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <ellipse
            cx="300"
            cy="300"
            rx="220"
            ry="120"
            fill="none"
            stroke="#dc2626"
            strokeWidth="1.5"
            strokeDasharray="8 12"
            style={{ transform: 'rotate(-15deg)' }}
          />
          <ellipse
            cx="300"
            cy="300"
            rx="160"
            ry="80"
            fill="none"
            stroke="#dc2626"
            strokeWidth="1"
            strokeDasharray="6 10"
            opacity="0.7"
            style={{ transform: 'rotate(25deg)' }}
          />
        </svg>
      </div>

      {/* Mascot Image */}
      <div className="relative z-10">
        <picture>
          <source srcSet="/mascot.webp" type="image/webp" />
          <img
            src="/mascot.png"
            alt={ariaLabel}
            className="w-[440px] sm:w-[480px] max-w-full h-auto object-contain select-none"
            width={925}
            height={1000}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            draggable={false}
          />
        </picture>
      </div>
    </div>
  );
};

// Responsive variant for mobile/tablet
interface ResponsiveMascotProps {
  variant?: 'desktop' | 'tablet' | 'mobile';
  className?: string;
}

export const ResponsiveMascot: React.FC<ResponsiveMascotProps> = ({
  variant = 'desktop',
  className = '',
}) => {
  const sizeMap = {
    desktop: 'w-[520px]',
    tablet: 'w-[400px]',
    mobile: 'w-[320px]',
  };

  return (
    <MascotIllustration
      className={`${sizeMap[variant]} ${className}`}
      aria-label="Techno Wallah learning mascot"
    />
  );
};