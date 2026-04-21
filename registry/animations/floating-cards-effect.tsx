"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

// --- Types ---
interface FloatingCardsEffectProps {
  /** Number of cards (default: 80) */
  count?: number;
  /** Space between cards (default: 0.45) */
  spacing?: number;
  /** Card width (default: 2.0) */
  cardWidth?: number;
  /** Card height (default: 2.0) */
  cardHeight?: number;
  /** Card corner radius (default: 0.15) */
  radius?: number;
  /** Array of hex colors for the cards */
  colors?: number[];
  /** Background color of the scene (hex) */
  bgColor?: number;
  /** Whether to show the animated topographic background lines */
  showBackgroundLines?: boolean;
  /** Color of the background lines */
  lineColor?: string;
  /** Optional container class */
  className?: string;
}

// --- Floating Cards Sub-Component ---
function FloatingCards({ 
  count, 
  spacing, 
  cardWidth, 
  cardHeight, 
  cardColors 
}: { 
  count: number, 
  spacing: number, 
  cardWidth: number, 
  cardHeight: number, 
  cardColors: number[] 
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { mouse } = useThree();

  // Harden: Use BoxGeometry for now to ensure rendering stability
  const geometry = useMemo(() => new THREE.BoxGeometry(cardWidth, cardHeight, 0.05), [cardWidth, cardHeight]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const colorArray = useMemo(() => {
    const colors = new Float32Array(count * 3);
    const tempColor = new THREE.Color();
    for (let i = 0; i < count; i++) {
      tempColor.setHex(cardColors[i % cardColors.length]);
      tempColor.toArray(colors, i * 3);
    }
    return colors;
  }, [count, cardColors]);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    }
  }, []);

  const state = useRef({
    speed: 1.5,
    amplitude: 2.0,
    targetSpeed: 1.5,
    targetAmplitude: 2.0,
    distance: 0,
  });

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const time = _.clock.getElapsedTime();

    // Responsive interaction
    state.current.targetSpeed = 0.5 + (mouse.x + 1) * 1.5;
    state.current.targetAmplitude = 1.0 + (mouse.y + 1) * 1.0;

    state.current.speed = THREE.MathUtils.damp(state.current.speed, state.current.targetSpeed, 4, delta);
    state.current.amplitude = THREE.MathUtils.damp(state.current.amplitude, state.current.targetAmplitude, 4, delta);

    state.current.distance += state.current.speed * delta;

    for (let i = 0; i < count; i++) {
      const dist = i * spacing + state.current.distance;
      const totalWidth = 35;
      const loopPos = (dist % totalWidth) - totalWidth / 2;

      const x = -loopPos;
      const waveFreq = 0.35;
      // Adjusted wave logic for better visual flow
      const y = Math.sin(x * waveFreq + time * 0.4) * state.current.amplitude;
      const z = Math.cos(x * waveFreq + time * 0.4) * (state.current.amplitude * 0.4);

      dummy.position.set(x, y, z);

      const nextX = x - 0.1;
      const nextY = Math.sin(nextX * waveFreq + time * 0.4) * state.current.amplitude;
      const nextZ = Math.cos(nextX * waveFreq + time * 0.4) * (state.current.amplitude * 0.4);

      dummy.lookAt(nextX, nextY, nextZ);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, count]} castShadow receiveShadow>
      <meshStandardMaterial roughness={0.3} metalness={0.2} />
      <instancedBufferAttribute attach="instanceColor" args={[colorArray, 3]} />
    </instancedMesh>
  );
}

// --- Particles Sub-Component ---
function Particles() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={0x888888} size={0.06} transparent opacity={0.4} />
    </points>
  );
}

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
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none opacity-20 select-none overflow-hidden z-10">
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

// --- Main Export ---
export default function FloatingCardsEffect({
  count = 80,
  spacing = 0.45,
  cardWidth = 2.0,
  cardHeight = 2.0,
  colors = [0x2962FF, 0xFF1744, 0xFFD600, 0x00E676, 0xFF2D95, 0xAA00FF],
  bgColor = 0xffffff,
  showBackgroundLines = true,
  lineColor = "#C4A484",
  className = "",
}: FloatingCardsEffectProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`relative w-full h-full min-h-[500px] overflow-hidden ${className}`}>
      {showBackgroundLines && <TopographicBackground color={lineColor} />}
      
      <div className="absolute inset-0 z-0 bg-transparent">
        {mounted && (
          <Canvas
            shadows
            camera={{ position: [0, 0, 10], fov: 35 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
            style={{ width: '100%', height: '100%' }} // Explicit sizing
          >
            <color attach="background" args={[bgColor]} />
            <fog attach="fog" args={[bgColor, 5, 20]} />

            <ambientLight intensity={0.8} />
            <directionalLight
              position={[5, 10, 7]}
              intensity={1.5}
              castShadow
              shadow-mapSize={[1024, 1024]}
            />
            <pointLight position={[-10, 0, 10]} intensity={1} color={0xffffff} />

            <FloatingCards 
              count={count} 
              spacing={spacing} 
              cardWidth={cardWidth} 
              cardHeight={cardHeight} 
              cardColors={colors} 
            />
            <Particles />
          </Canvas>
        )}
      </div>
    </div>
  );
}
