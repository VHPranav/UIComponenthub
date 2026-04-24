"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function AutumnBreeze() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        // --- 1. PROCEDURAL TEXTURE (Maple-ish Leaf) ---
        function createLeafTexture() {
            const size = 512;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            if (!ctx) return null;

            // Draw a white leaf shape
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();

            ctx.moveTo(size / 2, size); // Stem
            ctx.bezierCurveTo(size * 0.1, size * 0.8, 0, size * 0.3, size * 0.2, size * 0.2); // Left lobe
            ctx.bezierCurveTo(size * 0.4, size * 0.4, size * 0.6, size * 0.4, size * 0.6, size * 0.2); // Right lobe
            ctx.bezierCurveTo(size, size * 0.3, size * 0.9, size * 0.8, size / 2, size); // Back to stem
            ctx.fill();

            // Draw Veins
            ctx.strokeStyle = 'rgba(0,0,0,0.2)';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(size / 2, size);
            ctx.lineTo(size / 2, size * 0.2);
            ctx.stroke();

            // Side veins
            ctx.beginPath();
            ctx.moveTo(size / 2, size * 0.7);
            ctx.lineTo(size * 0.2, size * 0.4);
            ctx.moveTo(size / 2, size * 0.7);
            ctx.lineTo(size * 0.8, size * 0.4);
            ctx.stroke();

            const tex = new THREE.CanvasTexture(canvas);
            return tex;
        }

        // --- 2. SCENE SETUP ---
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 25;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;

        const container = containerRef.current;
        if (container) {
            container.appendChild(renderer.domElement);
        }

        // --- 3. LIGHTING ---
        const ambient = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambient);

        const dirLight = new THREE.DirectionalLight(0xffaa55, 1.5);
        dirLight.position.set(-10, 10, 10);
        scene.add(dirLight);

        // --- 4. LEAVES SETUP ---
        const LEAF_COUNT = 40;

        // Autumn Palette
        const PALETTE = [
            new THREE.Color(0xDCECF6), // Soft Ice Blue
            new THREE.Color(0xE4F1F8), // Sky Mist Blue
            new THREE.Color(0xEEF4F8), // Pale Blue Gray
            new THREE.Color(0xDFE8F0), // Cool Cloud Blue
            new THREE.Color(0xEAF2F7)  // Light Frost Blue
        ];


        // Geometry: Curved Plane
        const geometry = new THREE.PlaneGeometry(1, 1.2, 4, 4);
        const pos = geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const z = Math.pow(x, 2) * 0.5; // Parabola bend
            pos.setZ(i, z);
        }
        geometry.computeVertexNormals();
        geometry.rotateX(Math.PI / 2);

        const leafTexture = createLeafTexture();
        if (!leafTexture) return;

        // Material
        const material = new THREE.MeshStandardMaterial({
            map: leafTexture,
            alphaMap: leafTexture,
            transparent: true,
            side: THREE.DoubleSide,
            roughness: 0.7,
            metalness: 0.1,
            alphaTest: 0.1
        });

        const mesh = new THREE.InstancedMesh(geometry, material, LEAF_COUNT);
        scene.add(mesh);

        // --- 5. PHYSICS DATA ---
        const leaves: any[] = [];

        for (let i = 0; i < LEAF_COUNT; i++) {
            const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
            mesh.setColorAt(i, color);

            const scale = 0.8 + Math.random() * 0.6;

            leaves.push({
                idx: i,
                pos: new THREE.Vector3(
                    (Math.random() - 0.5) * 50,
                    (Math.random() - 0.5) * 30,
                    (Math.random() - 0.5) * 20
                ),
                speedMultiplier: 0.5 + Math.random() * 0.5,
                swayFreq: 1 + Math.random() * 2,
                swayAmp: 0.02 + Math.random() * 0.03,
                rotationSpeed: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02
                ),
                currentRot: new THREE.Euler(Math.random(), Math.random(), Math.random()),
                offset: Math.random() * 100,
                scale: new THREE.Vector3(scale, scale, scale)
            });
        }
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

        // --- 6. SCROLL LOGIC ---
        let windForce = 0;
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentY = window.scrollY;
            const delta = currentY - lastScrollY;
            windForce += Math.abs(delta) * 0.003;
            if (windForce > 1.5) windForce = 1.5;
            lastScrollY = currentY;
        };

        window.addEventListener('scroll', handleScroll);

        // --- 7. ANIMATION ---
        const dummy = new THREE.Object3D();
        const clock = new THREE.Clock();
        let animationId: number;

        function animate() {
            animationId = requestAnimationFrame(animate);
            const time = clock.getElapsedTime();

            windForce *= 0.95;

            leaves.forEach(leaf => {
                // Gravity
                leaf.pos.y -= 0.02 * leaf.speedMultiplier;

                // Turbulence
                const turbulenceX = Math.sin(time * leaf.swayFreq + leaf.offset) * leaf.swayAmp;
                const turbulenceY = Math.cos(time * leaf.swayFreq + leaf.offset) * leaf.swayAmp;
                const turbulenceZ = Math.sin(time * 0.5 + leaf.offset) * leaf.swayAmp;

                leaf.pos.x += turbulenceX;
                leaf.pos.y += turbulenceY;
                leaf.pos.z += turbulenceZ;

                // Gust of Wind
                if (windForce > 0.01) {
                    leaf.pos.x += windForce * leaf.speedMultiplier * 0.8;
                    leaf.pos.y += (turbulenceY * windForce * 10);

                    leaf.rotationSpeed.x += windForce * 0.001;
                    leaf.rotationSpeed.z += windForce * 0.001;
                }

                // Boundary Loop
                const boundsX = 35;
                const boundsY = 20;

                if (leaf.pos.x > boundsX || leaf.pos.y < -boundsY) {
                    leaf.pos.x = -boundsX - (Math.random() * 10);
                    leaf.pos.y = (Math.random() - 0.5) * 30;
                    leaf.pos.z = (Math.random() - 0.5) * 20;
                    leaf.rotationSpeed.set(
                        (Math.random() - 0.5) * 0.02,
                        (Math.random() - 0.5) * 0.02,
                        (Math.random() - 0.5) * 0.02
                    );
                }

                // Apply Rotation
                leaf.currentRot.x += leaf.rotationSpeed.x;
                leaf.currentRot.y += leaf.rotationSpeed.y;
                leaf.currentRot.z += leaf.rotationSpeed.z;

                dummy.position.copy(leaf.pos);
                dummy.rotation.copy(leaf.currentRot);
                dummy.scale.copy(leaf.scale);
                dummy.updateMatrix();
                mesh.setMatrixAt(leaf.idx, dummy.matrix);
            });

            mesh.instanceMatrix.needsUpdate = true;
            renderer.render(scene, camera);
        }

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement);
            }
            // Clean up Three.js resources
            geometry.dispose();
            material.dispose();
            leafTexture.dispose();
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-50"
            style={{ background: 'transparent' }}
        />
    )
}

export default AutumnBreeze
