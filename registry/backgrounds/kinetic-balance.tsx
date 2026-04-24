"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function KineticBalance() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        // --- 1. SCENE SETUP ---
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.set(0, 0, 40)
        camera.lookAt(0, 0, 0)

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.2

        const container = containerRef.current
        container.appendChild(renderer.domElement)

        // --- 2. LIGHTING ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
        scene.add(ambientLight)

        const topLight = new THREE.DirectionalLight(0xffffff, 1.5)
        topLight.position.set(5, 10, 5)
        scene.add(topLight)

        const fillLight = new THREE.PointLight(0xffffff, 0.5)
        fillLight.position.set(-10, -5, 10)
        scene.add(fillLight)

        // --- 3. PLANKS SETUP ---
        const PLANK_COUNT = 10
        const planks: any[] = []

        // Glass-like material
        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.1,
            roughness: 0.05,
            transmission: 0.9,
            thickness: 0.5,
            ior: 1.5,
            opacity: 1,
            transparent: true,
            envMapIntensity: 1,
            clearcoat: 1,
            clearcoatRoughness: 0.1
        })

        const plankGeometry = new THREE.BoxGeometry(8, 0.4, 3)

        for (let i = 0; i < PLANK_COUNT; i++) {
            const mesh = new THREE.Mesh(plankGeometry, glassMaterial.clone())

            // Diagonal Staircase: Bottom-Left to Top-Right
            const xPos = (i - (PLANK_COUNT - 1) / 2) * 6
            const yPos = (i - (PLANK_COUNT - 1) / 2) * 3
            mesh.position.set(xPos, yPos, 0)

            scene.add(mesh)

            planks.push({
                mesh: mesh,
                targetY: yPos,
                currentY: yPos,
                velocity: 0,
                baseY: yPos,
                baseX: xPos,
                hovered: false,
                color: new THREE.Color(0xffffff)
            })
        }

        // --- 4. INTERACTION & RAYCASTING ---
        const raycaster = new THREE.Raycaster()


        // --- 5. ANIMATION & PHYSICS ---
        const clock = new THREE.Clock()
        let animationId: number

        // Spring Config
        const springK = 0.05
        const damping = 0.85

        function animate() {
            animationId = requestAnimationFrame(animate)
            const time = clock.getElapsedTime()

            // Procedural hover wave
            planks.forEach((p, i) => {
                // Wave travels through the steps based on time
                const wave = Math.sin(time * 1.2 - i * 0.6)
                p.hovered = wave > 0.8 // Threshold for "active" state
            })

            // Physics Update: Equilibrium
            // 1. Calculate desired offsets based on hover
            planks.forEach((p, i) => {
                if (p.hovered) {
                    p.targetY = p.baseY - 1.5 // Move down on "step"
                    // Glow effect
                    const mat = p.mesh.material as THREE.MeshPhysicalMaterial
                    mat.emissive.setHex(0x99ccff)
                    mat.emissiveIntensity = 0.5
                } else {
                    p.targetY = p.baseY
                    // Fade glow back
                    const mat = p.mesh.material as THREE.MeshPhysicalMaterial
                    mat.emissive.setHex(0x000000)
                    mat.emissiveIntensity = 0
                }

                // Add tiny oscillation for "floaty" feel
                p.targetY += Math.sin(time + i * 0.5) * 0.2
            })

            // 2. Adjust targets to maintain total equilibrium
            const currentTotalY = planks.reduce((sum, p) => sum + (p.targetY - p.baseY), 0)
            const compensator = currentTotalY / PLANK_COUNT

            // 3. Apply spring physics
            planks.forEach((p, i) => {
                const adjustedTarget = p.targetY - compensator

                const force = (adjustedTarget - p.currentY) * springK
                p.velocity += force
                p.velocity *= damping
                p.currentY += p.velocity

                p.mesh.position.y = p.currentY
                p.mesh.position.x = p.baseX


                // Subtle rotation based on velocity (physics-driven)
                const targetRotX = (p.velocity * 0.8)
                const targetRotZ = (Math.sin(time + i) * 0.05)
                p.mesh.rotation.x += (targetRotX - p.mesh.rotation.x) * 0.1
                p.mesh.rotation.z += (targetRotZ - p.mesh.rotation.z) * 0.1
            })

            renderer.render(scene, camera)
        }

        animate()

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            cancelAnimationFrame(animationId)
            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement)
            }
            plankGeometry.dispose()
            glassMaterial.dispose()
            planks.forEach(p => p.mesh.material.dispose())
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-0 opacity-40"
            style={{ background: "transparent" }}
        />
    )
}

export default KineticBalance
