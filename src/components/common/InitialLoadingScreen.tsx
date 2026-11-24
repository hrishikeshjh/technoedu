import React, { useEffect, useState, useRef } from 'react';
import { RoseThreeAnimation } from './RoseThreeAnimation';

interface InitialLoadingScreenProps {
  onComplete?: () => void;
  durationMs?: number;
}

export const InitialLoadingScreen: React.FC<InitialLoadingScreenProps> = ({
  onComplete,
  durationMs = 900,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const isFinishedRef = useRef(false);

  useEffect(() => {
    (window as any).__technoEduLoadingActive = true;
    const startTime = performance.now();
    let animFrame: number;
    let unmountTimeout: ReturnType<typeof setTimeout> | null = null;
    let safetyTimeout: ReturnType<typeof setTimeout> | null = null;

    const finishLoading = () => {
      if (isFinishedRef.current) return;
      isFinishedRef.current = true;
      setProgress(100);
      setIsFadingOut(true);
      (window as any).__technoEduLoadingActive = false;
      try {
        sessionStorage.setItem('technoedu_initial_loaded', '1');
      } catch {}
      window.dispatchEvent(new CustomEvent('technoedu:ready'));

      unmountTimeout = setTimeout(() => {
        setIsMounted(false);
        if (onCompleteRef.current) onCompleteRef.current();
      }, 300);
    };

    const updateProgress = (now: number) => {
      if (isFinishedRef.current) return;
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / durationMs, 1);
      
      const easedProgress = Math.floor(rawProgress * 100);
      setProgress(easedProgress);

      if (rawProgress < 1) {
        animFrame = requestAnimationFrame(updateProgress);
      } else {
        finishLoading();
      }
    };

    animFrame = requestAnimationFrame(updateProgress);

    // Fallback timer in case requestAnimationFrame is throttled in inactive/background tab
    safetyTimeout = setTimeout(() => {
      finishLoading();
    }, durationMs + 200);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finishLoading();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animFrame);
      if (unmountTimeout) clearTimeout(unmountTimeout);
      if (safetyTimeout) clearTimeout(safetyTimeout);
      window.removeEventListener('keydown', handleKeyDown);
      (window as any).__technoEduLoadingActive = false;
    };
  }, [durationMs]);

  if (!isMounted) return null;

  return (
    <div
      role="status"
      aria-label="Loading Learn Better"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white/95 dark:bg-[#08090B]/95 backdrop-blur-md text-slate-900 dark:text-[#F8FAFC] select-none transition-opacity duration-300 ease-out overflow-hidden px-4 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
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
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-[#F8FAFC] flex items-center justify-center gap-2">
            <span>Learn</span>
            <span className="text-brand-red">Better.</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#A7AFBD] font-medium tracking-wide">
            Techno Wallah • Curated Open Knowledge Aggregator
          </p>
        </div>

        {/* Animated Number & Progress Bar */}
        <div className="w-full max-w-[260px] space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 dark:text-[#7F8795] uppercase tracking-widest text-[10px]">Loading</span>
            <span className="text-brand-red font-bold tracking-wider tabular-nums">
              {progress.toString().padStart(2, '0')}%
            </span>
          </div>

          <div className="w-full h-1.5 bg-slate-100 dark:bg-[#252932] rounded-full overflow-hidden p-[1px]">
            <div
              className="h-full bg-brand-red rounded-full transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      </div>

      {/* Skip button for instant dismissal */}
      <button
        onClick={() => {
          setIsFadingOut(true);
          (window as any).__technoEduLoadingActive = false;
          try {
            sessionStorage.setItem('technoedu_initial_loaded', '1');
          } catch {}
          window.dispatchEvent(new CustomEvent('technoedu:ready'));
          setTimeout(() => {
            setIsMounted(false);
            if (onCompleteRef.current) onCompleteRef.current();
          }, 150);
        }}
        className="absolute bottom-6 text-[11px] text-slate-400 dark:text-[#7F8795] hover:text-slate-700 dark:hover:text-[#F8FAFC] font-mono tracking-wider transition-colors uppercase px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1A1D23]"
      >
        Skip [Esc]
      </button>
    </div>
  );
};
