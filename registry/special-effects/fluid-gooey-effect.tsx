'use client';

import React, { useEffect, useRef, useId, useMemo, useState } from "react";
import gsap from "gsap";

// --- Types ---
type QuickToFunc = (value: number) => void;

interface FluidGooeyEffectProps {
  /** The base image path (visible by default) */
  mainImage: string;
  /** The image to reveal on hover */
  revealImage: string;
  /** Smoothness/length of the trail (default: 10) */
  trailCount?: number;
  /** Number of bouncy "liquid" droplets (default: 32) */
  dropletCount?: number;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * FluidGooeyEffect - A premium, interactive image reveal component.
 */
export default function FluidGooeyEffect({
  mainImage,
  revealImage,
  trailCount = 10,
  dropletCount = 32,
  className = "",
}: FluidGooeyEffectProps) {
  // Use a letter prefix for IDs to ensure total standard compatibility
  const reactId = useId().replace(/:/g, "");
  const containerId = useMemo(() => `gui-${reactId}`, [reactId]);
  
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const cursorGroup = useRef<SVGGElement>(null);
  const coreGroup = useRef<SVGGElement>(null);
  const followers = useRef<Array<SVGCircleElement | null>>([]);
  const droplets = useRef<Array<SVGCircleElement | null>>([]);

  const moveX = useRef<QuickToFunc | null>(null);
  const moveY = useRef<QuickToFunc | null>(null);
  const movers = useRef<Array<{ x: QuickToFunc; y: QuickToFunc }>>([]);
  const dropletMovers = useRef<Array<{ x: QuickToFunc; y: QuickToFunc }>>([]);

  const dropletData = useMemo(() => Array.from({ length: dropletCount }).map((_, i) => ({
    angle: (i * 137.5) * (Math.PI / 180),
    radius: 90 + (i % 3) * 10 + (i % 2) * 5,
    size: 15 + Math.random() * 15
  })), [dropletCount]);

  // Handle mounting separately
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize GSAP only after mounting and structure is present
  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // 1. Core cursor tracking
      if (cursorGroup.current) {
        moveX.current = gsap.quickTo(cursorGroup.current, "x", { duration: 0.15, ease: "power2.out" });
        moveY.current = gsap.quickTo(cursorGroup.current, "y", { duration: 0.15, ease: "power2.out" });
      }

      // 2. Liquid trail
      movers.current = followers.current.slice(0, trailCount).map((el, index) => {
        if (!el) return { x: () => {}, y: () => {} };
        const duration = 0.2 + (index / trailCount) * 0.5;
        return {
          x: gsap.quickTo(el, "x", { duration, ease: "power2.out" }),
          y: gsap.quickTo(el, "y", { duration, ease: "power2.out" }),
        };
      });

      // 3. Floating droplets
      dropletMovers.current = droplets.current.slice(0, dropletCount).map((el, index) => {
        if (!el) return { x: () => {}, y: () => {} };
        const duration = 0.6 + index * 0.1;
        return {
          x: gsap.quickTo(el, "x", { duration, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration, ease: "power3.out" }),
        };
      });

      // 4. Metaball shape shifting
      if (coreGroup.current) {
        Array.from(coreGroup.current.children).forEach((blob, i) => {
          gsap.to(blob, {
            x: "random(-40, 40)", 
            y: "random(-40, 40)",
            duration: "random(2, 4)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.5,
          });
          gsap.to(blob, {
            attr: { r: "random(60, 100)" },
            duration: "random(1.5, 3)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.3,
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [mounted, trailCount, dropletCount]);

  const updatePositions = (x: number, y: number) => {
    moveX.current?.(x);
    moveY.current?.(y);
    movers.current.forEach(m => { m.x(x); m.y(y); });
    dropletMovers.current.forEach((m, i) => {
        const d = dropletData[i];
        if (d) {
          m.x(x + Math.cos(d.angle) * d.radius);
          m.y(y + Math.sin(d.angle) * d.radius);
        }
    });
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (cursorRef.current) gsap.to(cursorRef.current, { opacity: 1, duration: 0.5 });
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (cursorGroup.current) gsap.set(cursorGroup.current, { x, y });
      followers.current.forEach(el => el && gsap.set(el, { x, y }));
      droplets.current.forEach(el => el && gsap.set(el, { x, y }));
      
      updatePositions(x, y);
    }
  };

  const handleMouseLeave = () => {
    if (cursorRef.current) gsap.to(cursorRef.current, { opacity: 0, duration: 0.5 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    updatePositions(x, y);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full min-h-[400px] overflow-hidden rounded-xl bg-zinc-900 group/fluid ${className}`}
    >
      {/* 1. Underlying Base Image - Always Rendered */}
      <div className="absolute inset-0 z-0">
        <img 
            src={mainImage} 
            alt="Base" 
            className="w-full h-full object-cover select-none pointer-events-none" 
        />
      </div>

      {/* 2. Masked Reveal Layer - Structure rendered after mount to prevent hydration mismatch */}
      {mounted && (
        <div
          ref={cursorRef}
          className="absolute inset-0 pointer-events-none opacity-0 will-change-[opacity]"
          style={{ zIndex: 15 }}
        >
          <svg className="w-full h-full overflow-visible" aria-hidden="true">
            <defs>
              <filter id={`filter-${containerId}`}>
                <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>

              <mask 
                id={`mask-${containerId}`} 
                maskUnits="userSpaceOnUse" 
                x="-5000" 
                y="-5000" 
                width="10000" 
                height="10000"
              >
                <g filter={`url(#filter-${containerId})`} fill="white">
                  <g ref={cursorGroup}>
                    <g ref={coreGroup}>
                      <circle cx="0" cy="0" r="80" />
                      <circle cx="30" cy="0" r="60" />
                      <circle cx="-30" cy="20" r="70" />
                      <circle cx="0" cy="-30" r="50" />
                      <circle cx="20" cy="20" r="40" />
                    </g>
                  </g>
                  
                  {Array.from({ length: trailCount }).map((_, i) => (
                    <circle
                      key={`trail-${i}`}
                      ref={(el) => { followers.current[i] = el; }}
                      cx="0"
                      cy="0"
                      r={80 - i * (60 / trailCount)}
                    />
                  ))}

                  {dropletData.map((d, i) => (
                    <circle
                      key={`droplet-${i}`}
                      ref={(el) => { droplets.current[i] = el; }}
                      cx="0"
                      cy="0"
                      r={d.size}
                    />
                  ))}
                </g>
              </mask>
            </defs>

            <image
              href={revealImage}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              mask={`url(#mask-${containerId})`}
            />
          </svg>
        </div>
      )}
    </div>
  );
}
