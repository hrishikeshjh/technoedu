import { useEffect, useRef, useState, RefObject } from 'react';

interface UseLazyAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  animationClass?: string;
  delay?: number;
}

export function useLazyAnimation<T extends HTMLElement = HTMLElement>(
  options: UseLazyAnimationOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    animationClass = 'lazy-fade-in',
    delay = 0
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Add initial animation class
    element.classList.add(animationClass);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Apply delay if specified
            setTimeout(() => {
              entry.target.classList.add('visible');
              setIsVisible(true);
            }, delay);

            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            entry.target.classList.remove('visible');
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, animationClass, delay]);

  return { ref: elementRef, isVisible };
}

/**
 * Hook for staggered lazy animations on multiple elements
 */
export function useStaggeredLazyAnimation<T extends HTMLElement = HTMLElement>(
  count: number,
  options: UseLazyAnimationOptions = {}
) {
  const refs = useRef<(T | null)[]>(Array(count).fill(null));
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = refs.current.indexOf(entry.target as T);
          if (index !== -1) {
            if (entry.isIntersecting) {
              // Stagger the animations
              setTimeout(() => {
                entry.target.classList.add('visible');
                setVisibleIndices(prev => new Set([...prev, index]));
              }, (options.delay || 0) + index * 100);

              if (options.triggerOnce !== false) {
                observer.unobserve(entry.target);
              }
            } else if (options.triggerOnce === false) {
              entry.target.classList.remove('visible');
              setVisibleIndices(prev => {
                const next = new Set(prev);
                next.delete(index);
                return next;
              });
            }
          }
        });
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px'
      }
    );

    refs.current.forEach((ref) => {
      if (ref) {
        ref.classList.add(options.animationClass || 'lazy-fade-in');
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, [count, options.threshold, options.rootMargin, options.triggerOnce, options.animationClass, options.delay]);

  const setRef = (index: number) => (el: T | null) => {
    refs.current[index] = el;
  };

  return { setRef, visibleIndices };
}