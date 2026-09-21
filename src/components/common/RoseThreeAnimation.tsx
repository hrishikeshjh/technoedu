import React, { useEffect, useRef } from 'react';

export interface RoseThreeConfig {
  rotate?: boolean;
  particleCount?: number;
  trailSpan?: number;
  durationMs?: number;
  rotationDurationMs?: number;
  pulseDurationMs?: number;
  strokeWidth?: number;
  roseA?: number;
  roseABoost?: number;
  roseBreathBase?: number;
  roseBreathBoost?: number;
  roseScale?: number;
}

export interface RoseThreeAnimationProps {
  size?: number | string;
  className?: string;
  color?: string;
  particleColor?: string;
  glowColor?: string;
  config?: RoseThreeConfig;
  showTrack?: boolean;
  trackOpacity?: number;
}

export const DEFAULT_ROSE_CONFIG: Required<RoseThreeConfig> = {
  rotate: true,
  particleCount: 76,
  trailSpan: 0.31,
  durationMs: 5300,
  rotationDurationMs: 28000,
  pulseDurationMs: 4400,
  strokeWidth: 4.6,
  roseA: 9.2,
  roseABoost: 0.60,
  roseBreathBase: 0.72,
  roseBreathBoost: 0.28,
  roseScale: 3.25,
};

export const ROSE_THREE_FORMULA = [
  'r(t) = (9.2 + 0.60s)(0.72 + 0.28s) cos(3t)',
  'x(t) = 50 + cos t · r(t) · 3.25',
  'y(t) = 50 + sin t · r(t) · 3.25',
].join('\n');

export const RoseThreeAnimation: React.FC<RoseThreeAnimationProps> = ({
  size = 280,
  className = '',
  color = 'currentColor',
  particleColor,
  glowColor,
  config: userConfig,
  showTrack = true,
  trackOpacity = 0.12,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const mergedConfig = { ...DEFAULT_ROSE_CONFIG, ...userConfig };

  useEffect(() => {
    const group = groupRef.current;
    const path = pathRef.current;
    if (!group || !path) return;

    const SVG_NS = 'http://www.w3.org/2000/svg';
    const cfg = mergedConfig;

    // Set path stroke properties
    path.setAttribute('stroke-width', String(cfg.strokeWidth));
    path.setAttribute('stroke', color);
    path.setAttribute('opacity', showTrack ? String(trackOpacity) : '0');

    // Remove any previously created circles in this group except the path
    const existingCircles = group.querySelectorAll('circle');
    existingCircles.forEach((c) => c.remove());

    // Create particle elements
    const particles = Array.from({ length: cfg.particleCount }, () => {
      const circle = document.createElementNS(SVG_NS, 'circle');
      circle.setAttribute('fill', particleColor || color);
      group.appendChild(circle);
      return circle;
    });

    const normalizeProgress = (progress: number) => {
      return ((progress % 1) + 1) % 1;
    };

    const getDetailScale = (time: number) => {
      const pulseProgress = (time % cfg.pulseDurationMs) / cfg.pulseDurationMs;
      const pulseAngle = pulseProgress * Math.PI * 2;
      return 0.52 + ((Math.sin(pulseAngle + 0.55) + 1) / 2) * 0.48;
    };

    const getRotation = (time: number) => {
      if (!cfg.rotate) return 0;
      return -((time % cfg.rotationDurationMs) / cfg.rotationDurationMs) * 360;
    };

    const getPoint = (progress: number, detailScale: number) => {
      const t = progress * Math.PI * 2;
      const a = cfg.roseA + detailScale * cfg.roseABoost;
      const r = a * (cfg.roseBreathBase + detailScale * cfg.roseBreathBoost) * Math.cos(3 * t);
      return {
        x: 50 + Math.cos(t) * r * cfg.roseScale,
        y: 50 + Math.sin(t) * r * cfg.roseScale,
      };
    };

    const buildPath = (detailScale: number, steps = 480) => {
      return Array.from({ length: steps + 1 }, (_, index) => {
        const pt = getPoint(index / steps, detailScale);
        return `${index === 0 ? 'M' : 'L'} ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`;
      }).join(' ');
    };

    const getParticle = (index: number, progress: number, detailScale: number) => {
      const tailOffset = index / Math.max(1, cfg.particleCount - 1);
      const pt = getPoint(normalizeProgress(progress - tailOffset * cfg.trailSpan), detailScale);
      const fade = Math.pow(1 - tailOffset, 0.56);
      return {
        x: pt.x,
        y: pt.y,
        radius: 0.9 + fade * 2.7,
        opacity: 0.04 + fade * 0.96,
      };
    };

    let animationFrameId: number;
    const startedAt = performance.now();

    const render = (now: number) => {
      const time = now - startedAt;
      const progress = (time % cfg.durationMs) / cfg.durationMs;
      const detailScale = getDetailScale(time);

      group.setAttribute('transform', `rotate(${getRotation(time)} 50 50)`);

      if (showTrack) {
        path.setAttribute('d', buildPath(detailScale));
      }

      for (let i = 0; i < particles.length; i++) {
        const p = getParticle(i, progress, detailScale);
        const node = particles[i];
        node.setAttribute('cx', p.x.toFixed(2));
        node.setAttribute('cy', p.y.toFixed(2));
        node.setAttribute('r', p.radius.toFixed(2));
        node.setAttribute('opacity', p.opacity.toFixed(3));
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    color,
    particleColor,
    showTrack,
    trackOpacity,
    mergedConfig.particleCount,
    mergedConfig.durationMs,
    mergedConfig.rotationDurationMs,
    mergedConfig.pulseDurationMs,
    mergedConfig.strokeWidth,
    mergedConfig.roseA,
    mergedConfig.roseABoost,
    mergedConfig.roseBreathBase,
    mergedConfig.roseBreathBoost,
    mergedConfig.roseScale,
    mergedConfig.rotate,
  ]);

  const sizeStyle = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: sizeStyle, height: sizeStyle, color: color }}
      aria-label="Rose Three Loader Animation"
    >
      {glowColor && (
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-30 pointer-events-none -z-10"
          style={{ background: glowColor }}
        />
      )}
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        fill="none"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <g ref={groupRef}>
          <path
            ref={pathRef}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={trackOpacity}
          />
        </g>
      </svg>
    </div>
  );
};
