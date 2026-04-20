'use client';

import React, { useEffect, useRef, useId, useMemo } from "react";
import gsap from "gsap";

// --- Types ---
type QuickToFunc = (value: number) => void;

interface FluidGooeyEffectProps {
  /** The base image path (visible by default) */
  mainImage: string;
  /** The image to reveal on hover */
  revealImage: string;
  /** Whether to show the topographic background */
  showBackgroundLines?: boolean;
  /** Color of the background lines */
  lineColor?: string;
  /** Smoothness/length of the trail (default: 10) */
  trailCount?: number;
  /** Number of bouncy "liquid" droplets (default: 32) */
  dropletCount?: number;
  /** Optional additional CSS classes */
  className?: string;
}

// --- Sub-Component: Topographic Background ---
const TopographicBackground = ({ color = "#C4A484" }: { color?: string }) => {
  const linesRef = useRef<SVGPathElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targetPaths = [
        "M200,0 C200,150 190,300 185,450 C190,600 190,750 190,900",
        "M220,0 C220,160 215,320 215,480 C215,640 220,800 220,900",
        "M0,200 C150,205 300,205 450,205 C600,205 750,205 900,205 C1100,205 1300,205 1440,210",
        "M500,0 C500,50 500,100 510,150 C520,220 530,250 540,320 C550,400 560,450 570,550 C580,650 600,750 620,850 C630,890 640,900 680,900",
        "M510,0 C510,55 515,105 520,155 C530,225 540,255 550,325 C560,405 570,455 580,555 C590,655 600,755 660,855",
        "M1000,100 C1000,300 1025,500 1050,700",
        "M800,0 C800,200 790,400 800,600 C810,800 800,900 800,900",
        "M0,600 C200,605 400,595 600,600 C800,605 1000,595 1200,600 C1300,605 1440,600 1440,600",
        "M1200,0 C1200,200 1210,400 1200,600 C1190,800 1200,900 1200,900",
        "M0,400 C300,405 600,395 900,400 C1200,405 1350,400 1440,400"
      ];

      linesRef.current.forEach((path, i) => {
        if (!path || !targetPaths[i]) return;
        gsap.to(path, {
          attr: { d: targetPaths[i] },
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });
    });
    return () => ctx.revert();
  }, [color]);

  return (
    <div className="absolute inset-0 pointer-events-none opacity-40 select-none overflow-hidden z-10">
      <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 10 }).map((_, i) => (
          <path 
            key={i} 
            ref={el => { if (el) linesRef.current[i] = el }} 
            stroke={color} 
            strokeWidth={i % 2 === 0 ? "1.5" : "1"} 
            strokeDasharray={i % 3 === 0 ? "4 4" : "none"}
          />
        ))}
      </svg>
    </div>
  );
};

/**
 * FluidGooeyEffect - A premium, interactive image reveal component.
 */
export default function FluidGooeyEffect({
  mainImage,
  revealImage,
  showBackgroundLines = true,
  lineColor = "#C4A484",
  trailCount = 10,
  dropletCount = 32,
  className = "",
}: FluidGooeyEffectProps) {
  // Use unique ID to prevent filter collisions between multiple instances
  const containerId = useId().replace(/:/g, "");
  
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

  // Memoize droplet distribution for performance and consistency
  const dropletData = useMemo(() => Array.from({ length: dropletCount }).map((_, i) => ({
    angle: (i * 137.5) * (Math.PI / 180),
    radius: 90 + (i % 3) * 15,
    size: 15 + (i % 5) * 4
  })), [dropletCount]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Core cursor tracking
      if (cursorGroup.current) {
        moveX.current = gsap.quickTo(cursorGroup.current, "x", { duration: 0.15, ease: "power2.out" });
        moveY.current = gsap.quickTo(cursorGroup.current, "y", { duration: 0.15, ease: "power2.out" });
      }

      // 2. Liquid trail followers (using attr:cx/cy for SVG stability)
      movers.current = followers.current.slice(0, trailCount).map((el, index) => {
        if (!el) return { x: () => {}, y: () => {} };
        const duration = 0.2 + (index / trailCount) * 0.5;
        return {
          x: gsap.quickTo(el, "attr:cx", { duration, ease: "power2.out" }),
          y: gsap.quickTo(el, "attr:cy", { duration, ease: "power2.out" }),
        };
      });

      // 3. Floating bouncy droplets
      dropletMovers.current = droplets.current.slice(0, dropletCount).map((el, index) => {
        if (!el) return { x: () => {}, y: () => {} };
        const duration = 0.6 + index * 0.05;
        return {
          x: gsap.quickTo(el, "attr:cx", { duration, ease: "power3.out" }),
          y: gsap.quickTo(el, "attr:cy", { duration, ease: "power3.out" }),
        };
      });

      // 4. Inner "Metaball" shifting
      if (coreGroup.current) {
        Array.from(coreGroup.current.children).forEach((blob, i) => {
          gsap.to(blob, {
            attr: { 
              cx: "random(-40, 40)", 
              cy: "random(-40, 40)",
              r: "random(60, 100)" 
            },
            duration: gsap.utils.random(2, 4),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.3,
          });
        });
      }
    });

    return () => ctx.revert();
  }, [trailCount, dropletCount]);

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
    gsap.to(cursorRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" });
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Reset positions to prevent "gliding" from far away on first entry
      if (cursorGroup.current) gsap.set(cursorGroup.current, { x, y });
      followers.current.forEach(el => el && gsap.set(el, { attr: { cx: x, cy: y } }));
      droplets.current.forEach(el => el && gsap.set(el, { attr: { cx: x, cy: y } }));
      
      updatePositions(x, y);
    }
  };

  const handleMouseLeave = () => {
    gsap.to(cursorRef.current, { opacity: 0, duration: 0.4, ease: "power2.in" });
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
      className={`relative w-full h-full min-h-[500px] bg-white overflow-hidden group/fluid ${className}`}
    >
      {/* 1. Underlying Image */}
      <div className="absolute inset-0 z-0">
        <img src={mainImage} alt="" className="w-full h-full object-cover select-none pointer-events-none" />
      </div>

      {showBackgroundLines && <TopographicBackground color={lineColor} />}

      {/* 2. Revealed Layer (Active on Hover) */}
      <div
        ref={cursorRef}
        className="absolute inset-0 pointer-events-none opacity-0 will-change-[opacity]"
        style={{ zIndex: 15 }}
      >
        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <defs>
            {/* The "Gooey" Logic */}
            <filter id={`gooey-${containerId}`} colorInterpolationFilters="sRGB">
              <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
                result="goo"
              />
            </filter>

            {/* The Dynamic Alpha Mask */}
            <mask 
              id={`mask-${containerId}`} 
              maskUnits="userSpaceOnUse" 
              x="-100%" 
              y="-100%" 
              width="300%" 
              height="300%"
            >
              <g filter={`url(#gooey-${containerId})`} fill="white">
                <g ref={cursorGroup}>
                  <g ref={coreGroup}>
                    <circle cx="0" cy="0" r="100" />
                    <circle cx="40" cy="0" r="80" />
                    <circle cx="-40" cy="30" r="90" />
                    <circle cx="0" cy="-40" r="70" />
                  </g>
                </g>
                
                {Array.from({ length: trailCount }).map((_, i) => (
                  <circle
                    key={`f-${i}`}
                    ref={(el) => { followers.current[i] = el; }}
                    cx="-1000"
                    cy="-1000"
                    r={100 - i * (80 / trailCount)}
                  />
                ))}

                {dropletData.map((d, i) => (
                  <circle
                    key={`d-${i}`}
                    ref={(el) => { droplets.current[i] = el; }}
                    cx="-1000"
                    cy="-1000"
                    r={d.size}
                  />
                ))}
              </g>
            </mask>
          </defs>

          <image
            href={revealImage}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask={`url(#mask-${containerId})`}
          />
        </svg>
      </div>

      {/* Subtle Gradient Polish */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/20 to-transparent z-10" />
    </div>
  );
}
