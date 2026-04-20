'use client';

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Define a custom Gradient Shader Material
const GradientMaterial = shaderMaterial(
    {
        uColor1: new THREE.Color("#ffff00"),
        uColor2: new THREE.Color("#ff0000"),
    },
    `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec2 vUv;
    void main() {
        vec3 color = mix(uColor1, uColor2, vUv.y);
        gl_FragColor = vec4(color, 1.0);
    }
    `
);

// Register the material
import { shaderMaterial } from "@react-three/drei";
extend({ GradientMaterial });

// Add the type to JSX namespace for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      gradientMaterial: any;
    }
  }
}

const CONFETTI_COUNT = 120; // Increased count for smaller particles
const GRADIENT_PALETTE = [
    { c1: "#ffff00", c2: "#ff4e00" },
    { c1: "#ffae00", c2: "#ff0000" },
    { c1: "#ffe600", c2: "#ff7b00" },
    { c1: "#ffcc00", c2: "#e60000" },
];

interface ParticleProps {
    index: number;
}

const ConfettiParticle: React.FC<ParticleProps> = ({ index }) => {
    const meshRef = useRef<THREE.Mesh>(null!);

    const { geometry, colors, velocity, spin, pulse } = useMemo(() => {
        const gType = Math.floor(Math.random() * 4);
        let geom: THREE.BufferGeometry;

        switch (gType) {
            case 0:
                geom = new THREE.TorusKnotGeometry(0.4, 0.15, 32, 8);
                break;
            case 1:
                geom = new THREE.SphereGeometry(0.3, 16, 16);
                break;
            case 2: {
                const shape = new THREE.Shape();
                const outerRadius = 0.6;
                const innerRadius = 0.3;
                const points = 5;
                for (let i = 0; i < points * 2; i++) {
                    const radius = i % 2 === 0 ? outerRadius : innerRadius;
                    const angle = (i * Math.PI) / points;
                    if (i === 0) shape.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
                    else shape.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
                }
                shape.closePath();
                geom = new THREE.ExtrudeGeometry(shape, {
                    depth: 0.1,
                    bevelEnabled: true,
                    bevelThickness: 0.02,
                    bevelSize: 0.02,
                    bevelSegments: 3
                });
                break;
            }
            default:
                geom = new THREE.BoxGeometry(0.6, 0.6, 0.1);
                break;
        }

        const { c1, c2 } = GRADIENT_PALETTE[index % GRADIENT_PALETTE.length];
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.6 + Math.random() * 1.8;

        return {
            geometry: geom,
            colors: { uColor1: new THREE.Color(c1), uColor2: new THREE.Color(c2) },
            velocity: new THREE.Vector3(
                speed * Math.cos(angle),
                speed * Math.sin(angle),
                (Math.random() - 0.5) * 0.6
            ),
            spin: {
                x: (Math.random() - 0.5) * 0.2,
                y: (Math.random() - 0.5) * 0.2,
                z: (Math.random() - 0.5) * 0.2,
            },
            pulse: {
                should: Math.random() > 0.5,
                speed: 1 + Math.random() * 2,
                amplitude: 0.05,
            }
        };
    }, [index]);

    useFrame((state) => {
        if (!meshRef.current) return;

        meshRef.current.position.add(velocity);
        meshRef.current.rotation.x += spin.x;
        meshRef.current.rotation.y += spin.y;
        meshRef.current.rotation.z += spin.z;

        if (pulse.should) {
            const s = 1 + Math.sin(state.clock.elapsedTime * pulse.speed) * pulse.amplitude;
            meshRef.current.scale.set(s, s, s);
        }

        // Increased friction to keep them from flying off-screen
        velocity.multiplyScalar(0.94);
        spin.x *= 0.94;
        spin.y *= 0.94;
        spin.z *= 0.94;
    });

    return (
        <mesh ref={meshRef} geometry={geometry}>
            <gradientMaterial 
                key={`${colors.uColor1.getHexString()}-${colors.uColor2.getHexString()}`}
                uColor1={colors.uColor1} 
                uColor2={colors.uColor2} 
                transparent 
            />
        </mesh>
    );
};

const ResponsiveCamera = () => {
    const { size, camera } = useThree();
    useEffect(() => {
        if (size.width < 768) {
            camera.position.set(0, 0, 40);
        } else {
            camera.position.set(0, 0, 20);
        }
        (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    }, [size.width, camera]);
    return null;
};

interface ThreeConfettiProps {
    manualPosition?: boolean;
}

export const ThreeConfetti: React.FC<ThreeConfettiProps> = ({ manualPosition = false }) => {
    return (
        <div 
            className={manualPosition ? "w-full h-full pointer-events-none" : "fixed inset-0 z-[9999] pointer-events-none"}
        >
            <Canvas 
                shadows 
                gl={{ alpha: true }}
                camera={{ position: [0, 0, 20], fov: 60 }}
                style={{ width: '100%', height: '100%' }}
            >
                <ResponsiveCamera />
                <ambientLight intensity={1.5} />
                <pointLight position={[10, 10, 10]} intensity={2} />
                
                {Array.from({ length: CONFETTI_COUNT }).map((_, i) => (
                    <ConfettiParticle key={i} index={i} />
                ))}
            </Canvas>
        </div>
    );
};

export default ThreeConfetti;
