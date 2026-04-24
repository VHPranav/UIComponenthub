"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function UnityNodes() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        // --- 1. SCENE SETUP ---
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.z = 30

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        const container = containerRef.current
        container.appendChild(renderer.domElement)

        // --- 2. LIGHTING ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
        scene.add(ambientLight)

        const pointLight = new THREE.PointLight(0xffffff, 1)
        pointLight.position.set(10, 10, 20)
        scene.add(pointLight)

        // --- 3. NODES SETUP ---
        const NODE_COUNT = 150
        const nodeGeometry = new THREE.SphereGeometry(0.12, 12, 12)
        const nodeMaterial = new THREE.MeshStandardMaterial({
            roughness: 0,
            metalness: 0.5,
            emissiveIntensity: 0.5
        })

        const mesh = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, NODE_COUNT)
        scene.add(mesh)

        const PALETTE = [
            new THREE.Color(0xD3EFFF), // Soft Blue
            new THREE.Color(0xFFE4BC), // Soft Gold
            new THREE.Color(0xE0C3FC), // Soft Purple
            new THREE.Color(0xFFF0F3), // Pale Rose
            new THREE.Color(0x80FFDB)  // Light Mint
        ]

        const nodes: any[] = []
        const dummy = new THREE.Object3D()

        for (let i = 0; i < NODE_COUNT; i++) {
            const pos = new THREE.Vector3(
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 15
            )

            const color = PALETTE[Math.floor(Math.random() * PALETTE.length)]
            mesh.setColorAt(i, color)

            nodes.push({
                idx: i,
                pos: pos.clone(),
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02
                ),
                scale: 0.5 + Math.random() * 1.5,
                color: color
            })
        }
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true

        // --- 4. LINES SETUP ---
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x888888, // Slightly lighter for visibility on dark/light
            transparent: true,
            opacity: 0.1,
            blending: THREE.AdditiveBlending
        })
        const lineGeometry = new THREE.BufferGeometry()
        const linePositions = new Float32Array(NODE_COUNT * NODE_COUNT * 6) // Max potential connections
        lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3))
        const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial)
        scene.add(lineMesh)

        // --- 5. INTERACTION ---
        const mouse = new THREE.Vector2(-100, -100)
        const rippleCenter = new THREE.Vector3()

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
        }

        window.addEventListener("mousemove", handleMouseMove)

        // --- 6. ANIMATION ---
        const clock = new THREE.Clock()
        let animationId: number

        function animate() {
            animationId = requestAnimationFrame(animate)
            const time = clock.getElapsedTime()

            // Update mouse sphere/target for ripple
            rippleCenter.set(mouse.x * 25, mouse.y * 15, 0)

            let lineIdx = 0
            const maxConnectDist = 6

            for (let i = 0; i < NODE_COUNT; i++) {
                const node = nodes[i]

                // Movement
                node.pos.add(node.velocity)

                // Hover Ripple Effect
                const distToMouse = node.pos.distanceTo(rippleCenter)
                if (distToMouse < 8) {
                    const force = (1 - distToMouse / 8) * 0.5
                    const dir = node.pos.clone().sub(rippleCenter).normalize()
                    node.pos.add(dir.multiplyScalar(force))
                }

                // Bounce
                if (Math.abs(node.pos.x) > 22) node.velocity.x *= -1
                if (Math.abs(node.pos.y) > 15) node.velocity.y *= -1
                if (Math.abs(node.pos.z) > 10) node.velocity.z *= -1

                // Update Instance Matrix
                dummy.position.copy(node.pos)
                const s = node.scale * (1 + Math.sin(time + i) * 0.1)
                dummy.scale.set(s, s, s)
                dummy.updateMatrix()
                mesh.setMatrixAt(i, dummy.matrix)

                // Find Connections
                for (let j = i + 1; j < NODE_COUNT; j++) {
                    const other = nodes[j]
                    const d = node.pos.distanceTo(other.pos)
                    if (d < maxConnectDist) {
                        linePositions[lineIdx++] = node.pos.x
                        linePositions[lineIdx++] = node.pos.y
                        linePositions[lineIdx++] = node.pos.z
                        linePositions[lineIdx++] = other.pos.x
                        linePositions[lineIdx++] = other.pos.y
                        linePositions[lineIdx++] = other.pos.z
                    }
                }
            }

            mesh.instanceMatrix.needsUpdate = true
            lineGeometry.attributes.position.needsUpdate = true
            lineGeometry.setDrawRange(0, lineIdx / 3)

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
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("resize", handleResize)
            cancelAnimationFrame(animationId)
            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement)
            }
            nodeGeometry.dispose()
            nodeMaterial.dispose()
            lineGeometry.dispose()
            lineMaterial.dispose()
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

export default UnityNodes
