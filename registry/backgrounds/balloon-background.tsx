"use client"

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Box, Line } from '@react-three/drei'
import * as THREE from 'three'

interface BalloonProps {
    initialX: number
    initialY: number
    initialZ: number
    initialSpeed: number
    color: string
    textureType: 'stripes' | 'dots' | 'checkered' | 'plain'
}

const generateBalloonTexture = (color: string, type: string) => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')!

    // Background color
    ctx.fillStyle = color
    ctx.fillRect(0, 0, 256, 256)

    // More distinct version for the pattern
    const darkenColor = (hex: string) => {
        const h = hex.startsWith('#') ? hex : '#' + hex
        const r = parseInt(h.slice(1, 3), 16)
        const g = parseInt(h.slice(3, 5), 16)
        const b = parseInt(h.slice(5, 7), 16)
        // Subtract more (40) and use higher opacity (0.5) for clear visibility
        return `rgba(${Math.max(0, r - 40)}, ${Math.max(0, g - 40)}, ${Math.max(0, b - 40)}, 0.5)`
    }

    ctx.strokeStyle = darkenColor(color.slice(0, 7))
    ctx.fillStyle = darkenColor(color.slice(0, 7))

    if (type === 'stripes') {
        ctx.lineWidth = 30 // Thicker stripes
        for (let i = 0; i < 256; i += 60) {
            ctx.beginPath()
            ctx.moveTo(i, 0)
            ctx.lineTo(i, 256)
            ctx.stroke()
        }
    } else if (type === 'dots') {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                ctx.beginPath()
                ctx.arc(i * 35 + 20, j * 35 + 20, 8, 0, Math.PI * 2) // Larger dots
                ctx.fill()
            }
        }
    } else if (type === 'checkered') {
        for (let i = 0; i < 256; i += 64) {
            for (let j = 0; j < 256; j += 64) {
                if ((i / 64 + j / 64) % 2 === 0) {
                    ctx.fillRect(i, j, 64, 64) // Larger squares
                }
            }
        }
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    return texture
}

function Balloon({ initialX, initialY, initialZ, initialSpeed, color, textureType }: BalloonProps) {
    const groupRef = useRef<THREE.Group>(null!)
    const mouseRef = useRef({ x: 0, y: 0 })
    const speed = initialSpeed
    const resetY = -15
    const topLimit = 15

    const texture = useMemo(() => generateBalloonTexture(color, textureType), [color, textureType])

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    useFrame(() => {
        if (!groupRef.current) return

        groupRef.current.position.y += speed

        if (groupRef.current.position.y > topLimit) {
            groupRef.current.position.y = resetY
            groupRef.current.position.x = (Math.random() - 0.5) * 80
        }

        const targetMouseX = mouseRef.current.x
        const targetMouseY = mouseRef.current.y

        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -targetMouseX * 0.6, 0.05)
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetMouseY * 0.6, 0.05)
        groupRef.current.position.x += Math.sin(Date.now() * 0.001 + initialZ) * 0.003
    })

    const ropes = useMemo(() => [
        { start: [-0.4, -3.2, 0.4], end: [-1, -1, 0] },
        { start: [0.4, -3.2, 0.4], end: [1, -1, 0] },
        { start: [-0.4, -3.2, -0.4], end: [-1, -1, 0] },
        { start: [0.4, -3.2, -0.4], end: [1, -1, 0] }
    ], [])

    return (
        <group ref={groupRef} position={[initialX, initialY, initialZ]}>
            <Sphere args={[2, 32, 32]} scale={[1, 1.2, 1]}>
                <meshBasicMaterial map={texture} />
            </Sphere>
            <Box args={[0.8, 0.6, 0.8]} position={[0, -3.5, 0]}>
                <meshBasicMaterial color={color} />
            </Box>
            {ropes.map((rope, i) => (
                <Line
                    key={i}
                    points={[rope.start as [number, number, number], rope.end as [number, number, number]]}
                    color="#E8E8E8"
                    lineWidth={1}
                />
            ))}
        </group>
    )
}

export function BalloonBackground() {
    const balloonData = useMemo(() => {
        const colors = [
            "#ffadad", // soft pink
            "#ffd6a5", // apricot
            "#fdffb6", // pale yellow
            "#caffbf", // light green
            "#9bf6ff", // light blue
            "#a0c4ff", // periwinkle
            "#bdb2ff", // light purple
            "#ffc6ff", // lavender pink
        ];

        const types: ('stripes' | 'dots' | 'checkered' | 'plain')[] = ['stripes', 'dots', 'checkered', 'plain']
        return Array.from({ length: 12 }).map((_, i) => ({
            id: i,
            x: (Math.random() - 0.5) * 80,
            y: (Math.random() - 0.5) * 60,
            z: -(Math.random() * 30),
            speed: 0.01 + Math.random() * 0.02,
            color: colors[i % colors.length],
            textureType: types[i % types.length]
        }))
    }, [])

    return (
        <div className="fixed inset-0 z-[-1]">
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }} style={{ background: 'transparent' }}>
                <ambientLight intensity={1} />
                {balloonData.map((balloon) => (
                    <Balloon
                        key={balloon.id}
                        initialX={balloon.x}
                        initialY={balloon.y}
                        initialZ={balloon.z}
                        initialSpeed={balloon.speed}
                        color={balloon.color}
                        textureType={balloon.textureType}
                    />
                ))}
            </Canvas>
        </div>
    )
}

export default BalloonBackground
