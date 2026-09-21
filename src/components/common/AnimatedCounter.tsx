import React, { useEffect, useRef, useState } from 'react';

export interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  triggerOnce?: boolean;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  start = 0,
  duration = 1800,
  delay = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  triggerOnce = true,
}) => {
  const [value, setValue] = useState<number>(start);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animFrame: number;
    let delayTimeout: ReturnType<typeof setTimeout> | null = null;
    let startTime: number | null = null;

    const runCountAnimation = () => {
      startTime = null;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth Quartic ease-out
        const ease = 1 - Math.pow(1 - progress, 4);
        const currentVal = start + (end - start) * ease;

        setValue(currentVal);

        if (progress < 1) {
          animFrame = requestAnimationFrame(animate);
        } else {
          setValue(end);
        }
      };

      animFrame = requestAnimationFrame(animate);
    };

    const triggerAnimation = () => {
      // If initial loading screen is active, wait until it finishes
      if ((window as any).__technoEduLoadingActive) {
        const handleReady = () => {
          window.removeEventListener('technoedu:ready', handleReady);
          delayTimeout = setTimeout(runCountAnimation, delay + 100);
        };
        window.addEventListener('technoedu:ready', handleReady);
        return;
      }

      if (delay > 0) {
        delayTimeout = setTimeout(runCountAnimation, delay);
      } else {
        runCountAnimation();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasAnimatedRef.current || !triggerOnce) {
              hasAnimatedRef.current = true;
              triggerAnimation();
            }
          } else if (!triggerOnce) {
            setValue(start);
            hasAnimatedRef.current = false;
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    // Also listen directly to technoedu:ready in case element was already in viewport during load
    const onReadyDirect = () => {
      if (!hasAnimatedRef.current) {
        hasAnimatedRef.current = true;
        delayTimeout = setTimeout(runCountAnimation, delay + 150);
      }
    };
    window.addEventListener('technoedu:ready', onReadyDirect);

    return () => {
      observer.disconnect();
      window.removeEventListener('technoedu:ready', onReadyDirect);
      if (delayTimeout) clearTimeout(delayTimeout);
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [end, start, duration, delay, triggerOnce]);

  const formattedValue = decimals > 0 
    ? value.toFixed(decimals) 
    : Math.round(value).toLocaleString();

  return (
    <span ref={elementRef} className={`tabular-nums inline-block transition-transform duration-300 ${className}`}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
};
