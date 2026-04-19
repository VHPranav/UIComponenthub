"use client"

import React, { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlareCardProps {
  children: React.ReactNode
  className?: string
  /**
   * The color of the glare effect
   * @default "rgba(255, 255, 255, 0.4)"
   */
  glareColor?: string
  /**
   * The size of the glare effect in percentage
   * @default 150
   */
  glareSize?: number
  /**
   * The opacity of the glare effect
   * @default 0.5
   */
  glareOpacity?: number
  /**
   * The angle of the glare gradient in degrees
   * @default 45
   */
  glareAngle?: number
  /**
   * Maximum tilt rotation in degrees
   * @default 20
   */
  tiltMax?: number
  /**
   * Perspective distance in pixels
   * @default 1000
   */
  perspective?: number
  /**
   * Enable spotlight mode (radial light following cursor) instead of beam mode
   * @default false
   */
  spotlight?: boolean
}

export const GlareCard: React.FC<GlareCardProps> = ({
  children,
  className,
  glareColor = "rgba(255, 255, 255, 0.4)",
  glareSize = 150,
  glareOpacity = 0.5,
  glareAngle = 45,
  tiltMax = 20,
  perspective = 1000,
  spotlight = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Motion values for normalized mouse position (-0.5 to 0.5)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics for smooth movement
  const springConfig = { damping: 25, stiffness: 150 }
  const mouseXSpring = useSpring(x, springConfig)
  const mouseYSpring = useSpring(y, springConfig)

  // Transform motion values to rotation and glare position
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [tiltMax, -tiltMax])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-tiltMax, tiltMax])

  // Glare position (0% to 100%)
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100])
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    // Normalized coordinates (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5
    const mouseY = (e.clientY - rect.top) / height - 0.5
    
    x.set(mouseX)
    y.set(mouseY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div
      className="group relative isolate"
      style={{ perspective }}
    >
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900 transition-shadow duration-500 hover:shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]",
          className
        )}
      >
        {/* Glare Overlay */}
        <motion.div
          style={{
            opacity: useTransform(
              [mouseXSpring, mouseYSpring],
              ([mx, my]) => {
                const distance = Math.sqrt(Math.pow(mx as number, 2) + Math.pow(my as number, 2))
                return Math.min(distance * 2, glareOpacity)
              }
            ),
            background: spotlight
              ? useTransform(
                  [glareX, glareY],
                  ([gx, gy]) =>
                    `radial-gradient(${glareSize}% circle at ${gx}% ${gy}%, ${glareColor}, transparent 80%)`
                )
              : useTransform(
                  glareX,
                  (gx) =>
                    `linear-gradient(${glareAngle}deg, transparent 0%, ${glareColor} ${gx}%, transparent 100%)`
                ),
          }}
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        />

        {/* Shine Layer (Subtle border highlight) */}
        <div className="pointer-events-none absolute inset-0 z-20 rounded-xl border border-white/20 transition-opacity duration-500 group-hover:opacity-100 opacity-0" />

        {/* Content */}
        <div className="relative z-0 h-full w-full">
          {children}
        </div>
      </motion.div>
    </div>
  )
}
