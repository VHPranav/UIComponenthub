"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface InteractivePixelGridProps {
  squareSize?: number
  squareMargin?: number
  squareColor?: string
  activeColor?: string
  idleDelay?: number
  className?: string
  /**
   * If true, the grid will use absolute positioning to fill its parent.
   * Useful when using as a background.
   */
  absolute?: boolean
}

/**
 * InteractivePixelGrid Component
 * Renders a grid of small squares with hover effects and idle ripple animation.
 */
export function InteractivePixelGrid({
  squareSize = 40,
  squareMargin = 4,
  squareColor = "rgba(0, 0, 0, 0.05)",
  activeColor = "#eeff00ff",
  idleDelay = 4000,
  className,
  absolute = true,
}: InteractivePixelGridProps) {
  const [gridDimensions, setGridDimensions] = useState({ rows: 0, columns: 0 })
  const [rippling, setRippling] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<{ r: number; c: number } | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null)
  const rippleTimeoutsRef = useRef<NodeJS.Timeout[]>([])

  const updateGridDimensions = useCallback(() => {
    if (!containerRef.current) return
    const { width, height } = containerRef.current.getBoundingClientRect()

    // If height is 0 (often happens in flex/hidden containers), 
    // we default to a reasonable height for the preview.
    const effectiveHeight = height || 400

    const cols = Math.ceil(width / (squareSize + squareMargin))
    const rows = Math.ceil(effectiveHeight / (squareSize + squareMargin))
    setGridDimensions({ rows, columns: cols })
  }, [squareSize, squareMargin])

  const clearRipples = useCallback(() => {
    rippleTimeoutsRef.current.forEach(clearTimeout)
    rippleTimeoutsRef.current = []
    setRippling(false)

    // Clear the visual state of ripples
    if (typeof document !== "undefined") {
      const rippled = document.querySelectorAll('.pixel-ripple')
      rippled.forEach(el => el.classList.remove('pixel-ripple'))
    }
  }, [])

  const triggerRipple = useCallback(() => {
    if (!gridDimensions.columns || rippling) return
    setRippling(true)

    const centerCol = Math.floor(gridDimensions.columns / 2)
    const centerRow = Math.floor(gridDimensions.rows / 2)

    for (let r = 0; r < gridDimensions.rows; r++) {
      for (let c = 0; c < gridDimensions.columns; c++) {
        const distance = Math.sqrt(Math.pow(r - centerRow, 2) + Math.pow(c - centerCol, 2))
        const delay = distance * 50

        const t = setTimeout(() => {
          if (typeof document !== "undefined") {
            const el = document.getElementById(`pixel-${r}-${c}`)
            if (el) {
              el.classList.add('pixel-ripple')
              setTimeout(() => el.classList.remove('pixel-ripple'), 1000)
            }
          }
        }, delay)
        rippleTimeoutsRef.current.push(t)
      }
    }

    const resetT = setTimeout(() => {
      setRippling(false)
      startIdleTimer()
    }, 6000)
    rippleTimeoutsRef.current.push(resetT)
  }, [gridDimensions, rippling])

  const startIdleTimer = useCallback((immediate = false) => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    idleTimerRef.current = setTimeout(() => {
      triggerRipple()
    }, immediate ? 0 : idleDelay)
  }, [triggerRipple, idleDelay])

  useEffect(() => {
    updateGridDimensions()
    window.addEventListener("resize", updateGridDimensions)
    return () => {
      window.removeEventListener("resize", updateGridDimensions)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      clearRipples()
    }
  }, [updateGridDimensions, clearRipples])

  useEffect(() => {
    if (gridDimensions.columns > 0) {
      startIdleTimer(true)
    }
  }, [gridDimensions, startIdleTimer])

  const handleMouseMove = (e: React.MouseEvent) => {
    startIdleTimer()
    if (rippling) clearRipples()

    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const col = Math.floor(x / (squareSize + squareMargin))
    const row = Math.floor(y / (squareSize + squareMargin))

    if (col >= 0 && col < gridDimensions.columns && row >= 0 && row < gridDimensions.rows) {
      setHoveredIndex({ r: row, c: col })
    } else {
      setHoveredIndex(null)
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIndex(null)}
      className={cn(
        "overflow-hidden bg-background select-none",
        absolute ? "absolute inset-0 z-0" : "relative w-full h-full",
        className
      )}
      style={{
        // Define common styles for the ripple effect via CSS
        // This is more performant than Framer Motion for hundreds of elements
        // @ts-ignore
        "--active-color": activeColor,
        "--square-color": squareColor,
      } as React.CSSProperties}
    >
      <style jsx>{`
        .pixel-ripple {
          animation: pixel-ripple-anim 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes pixel-ripple-anim {
          0% {
            background-color: transparent;
            transform: scale(1);
          }
          20% {
            background-color: var(--active-color);
            transform: scale(0.9);
            box-shadow: 0 0 15px var(--active-color);
          }
          100% {
            background-color: transparent;
            transform: scale(1);
          }
        }
      `}</style>

      <div className="flex flex-col">
        {Array.from({ length: gridDimensions.rows }).map((_, r) => (
          <div key={`row-${r}`} className="flex flex-row">
            {Array.from({ length: gridDimensions.columns }).map((_, c) => {
              const isHovered = hoveredIndex?.r === r && hoveredIndex?.c === c
              return (
                <div
                  key={`pixel-${r}-${c}`}
                  id={`pixel-${r}-${c}`}
                  className="transition-all duration-500 ease-out border"
                  style={{
                    width: squareSize,
                    height: squareSize,
                    margin: squareMargin / 2,
                    borderColor: isHovered ? activeColor : squareColor,
                    backgroundColor: isHovered ? activeColor : "transparent",
                    boxShadow: isHovered ? `0 0 15px ${activeColor}` : "none",
                    transform: isHovered ? "scale(0.95)" : "scale(1)",
                    opacity: isHovered ? 1 : 0.3,
                    borderRadius: "2px",
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
