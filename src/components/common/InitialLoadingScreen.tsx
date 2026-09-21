import React, { useEffect, useState } from 'react';
import { RoseThreeAnimation } from './RoseThreeAnimation';

interface InitialLoadingScreenProps {
  onComplete?: () => void;
  durationMs?: number;
}

export const InitialLoadingScreen: React.FC<InitialLoadingScreenProps> = ({
  onComplete,
  durationMs = 3000,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    (window as any).__technoEduLoadingActive = true;
    const startTime = performance.now();
    let animFrame: number;

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / durationMs, 1);
      
      // Smooth easing for number animation
      const easedProgress = Math.floor(rawProgress * 100);
      setProgress(easedProgress);

      if (rawProgress < 1) {
        animFrame = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        // Begin fade out exactly at 3 seconds
        setIsFadingOut(true);
        (window as any).__technoEduLoadingActive = false;
        window.dispatchEvent(new CustomEvent('technoedu:ready'));
        setTimeout(() => {
          setIsMounted(false);
          if (onComplete) onComplete();
        }, 550);
      }
    };

    animFrame = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animFrame);
      (window as any).__technoEduLoadingActive = false;
    };
  }, [durationMs, onComplete]);

  if (!isMounted) return null;

  return (
    <div
      role="status"
      aria-label="Loading Learn Better"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white/85 backdrop-blur-2xl text-slate-900 select-none transition-all duration-500 ease-out overflow-hidden px-4 ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-105 filter blur-xs' : 'opacity-100'
      }`}
      style={{
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div className="relative flex flex-col items-center max-w-md w-full text-center space-y-6">
        
        {/* Rose Three Animation Canvas in vibrant red color */}
        <div className="relative w-full flex items-center justify-center py-2 bg-transparent">
          <RoseThreeAnimation
            size="min(68vmin, 280px)"
            color="#dc2626"
            particleColor="#dc2626"
            showTrack={true}
            trackOpacity={0.15}
          />
        </div>

        {/* Main Headline */}
        <div className="space-y-1.5">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 flex items-center justify-center gap-2">
            <span>Learn</span>
            <span className="text-brand-red">Better.</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium tracking-wide">
            Techno Wallah • Curated Open Knowledge Aggregator
          </p>
        </div>

        {/* Animated Number & Progress Bar */}
        <div className="w-full max-w-[260px] space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 uppercase tracking-widest text-[10px]">Loading</span>
            <span className="text-brand-red font-bold tracking-wider tabular-nums">
              {progress.toString().padStart(2, '0')}%
            </span>
          </div>

          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden p-[1px]">
            <div
              className="h-full bg-brand-red rounded-full transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      </div>

      {/* Subtle skip link at bottom corner for power users */}
      <button
        onClick={() => {
          setIsFadingOut(true);
          setTimeout(() => {
            setIsMounted(false);
            if (onComplete) onComplete();
          }, 250);
        }}
        className="absolute bottom-6 text-[11px] text-slate-400 hover:text-slate-700 font-mono tracking-wider transition-colors uppercase px-3 py-1.5 rounded-lg hover:bg-slate-100"
      >
        Skip [Esc]
      </button>
    </div>
  );
};
