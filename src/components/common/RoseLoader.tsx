import React, { useEffect, useState } from 'react';
import { RoseThreeAnimation } from './RoseThreeAnimation';

export interface RoseLoaderProps {
  mode?: 'fullscreen' | 'section' | 'inline' | 'card';
  size?: 'sm' | 'md' | 'lg' | number;
  text?: string;
  subtitle?: string;
  dark?: boolean;
  color?: string;
  showNumbers?: boolean;
  className?: string;
}

export const RoseLoader: React.FC<RoseLoaderProps> = ({
  mode = 'section',
  size = 'md',
  text = 'Learn Better.',
  subtitle = 'Loading curated open resources...',
  dark = false,
  color,
  showNumbers = true,
  className = '',
}) => {
  const [ticker, setTicker] = useState(0);

  // Subtle animated counter for loaders that request numbers
  useEffect(() => {
    if (!showNumbers) return;
    const interval = setInterval(() => {
      setTicker((prev) => (prev + 1) % 100);
    }, 45);
    return () => clearInterval(interval);
  }, [showNumbers]);

  const resolveSize = () => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'sm':
        return 36;
      case 'lg':
        return 220;
      case 'md':
      default:
        return mode === 'inline' ? 28 : 120;
    }
  };

  const resolvedSize = resolveSize();
  const resolvedColor = color || (dark ? '#f5f5f5' : '#dc2626');

  if (mode === 'inline') {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`}>
        <RoseThreeAnimation
          size={resolvedSize}
          color={resolvedColor}
          showTrack={true}
          trackOpacity={0.2}
          config={{ particleCount: 32 }}
        />
        {text && <span className="text-xs font-semibold">{text}</span>}
      </span>
    );
  }

  if (mode === 'fullscreen') {
    return (
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 ${
          dark ? 'bg-[#050505] text-[#f5f5f5]' : 'bg-white/95 dark:bg-[#08090B]/95 backdrop-blur-md text-slate-900 dark:text-[#F8FAFC]'
        } ${className}`}
      >
        <RoseThreeAnimation
          size={260}
          color={resolvedColor}
          particleColor={dark ? '#ffffff' : '#dc2626'}
          showTrack={true}
          trackOpacity={dark ? 0.15 : 0.2}
        />
        {text && (
          <h3 className="mt-6 text-xl font-extrabold tracking-tight">
            {text}
          </h3>
        )}
        {subtitle && (
          <p className="mt-1 text-xs text-slate-500 dark:text-[#A7AFBD] max-w-sm text-center">
            {subtitle}
          </p>
        )}
        {showNumbers && (
          <div className="mt-4 flex items-center gap-2 font-mono text-xs text-slate-400 dark:text-[#7F8795]">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
            <span>Processing nodes: {ticker.toString().padStart(2, '0')}%</span>
          </div>
        )}
      </div>
    );
  }

  // Section or card mode
  return (
    <div
      className={`flex flex-col items-center justify-center py-10 px-4 text-center ${
        dark ? 'bg-[#050505] text-[#f5f5f5] rounded-2xl' : 'text-slate-800 dark:text-[#F8FAFC]'
      } ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <RoseThreeAnimation
          size={resolvedSize}
          color={resolvedColor}
          showTrack={true}
          trackOpacity={0.15}
          config={{ particleCount: resolvedSize < 80 ? 36 : 60 }}
        />
      </div>

      {text && (
        <h4 className="mt-4 text-sm sm:text-base font-bold tracking-tight">
          {text}
        </h4>
      )}

      {subtitle && (
        <p className="mt-1 text-xs text-slate-500 dark:text-[#A7AFBD] max-w-xs leading-relaxed">
          {subtitle}
        </p>
      )}

      {showNumbers && (
        <div className="mt-2.5 inline-flex items-center gap-1.5 font-mono text-[11px] text-slate-400 dark:text-[#7F8795] bg-slate-100 dark:bg-[#15171C] px-2.5 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-ping" />
          <span>Syncing: {ticker}%</span>
        </div>
      )}
    </div>
  );
};
