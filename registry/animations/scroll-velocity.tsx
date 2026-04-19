"use client"

import React, { useRef, useState, useEffect, useLayoutEffect } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion"
import { cn } from "@/lib/utils"

interface VelocityMapping {
  input: [number, number]
  output: [number, number]
}

interface ScrollVelocityProps {
  texts: string[]
  velocity?: number
  className?: string
  damping?: number
  stiffness?: number
  numCopies?: number
  velocityMapping?: VelocityMapping
  parallaxClassName?: string
  scrollerClassName?: string
}

// SSR-safe layout effect
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

function useElementWidth<T extends HTMLElement>(
  ref: React.RefObject<T | null>
): number {
  const [width, setWidth] = useState(0)

  useIsomorphicLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth)
      }
    }
    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [ref])

  return width
}

interface VelocityTextProps {
  children: string
  baseVelocity: number
  scrollContainerRef?: React.RefObject<HTMLElement>
  className?: string
  damping?: number
  stiffness?: number
  numCopies?: number
  velocityMapping?: VelocityMapping
}

function VelocityText({
  children,
  baseVelocity = 100,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
}: VelocityTextProps) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: damping,
    stiffness: stiffness,
  })
  
  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping.input,
    velocityMapping.output,
    { clamp: false }
  )

  const copyRef = useRef<HTMLSpanElement>(null)
  const copyWidth = useElementWidth(copyRef)

  function wrap(min: number, max: number, v: number): number {
    const range = max - min
    const mod = (((v - min) % range) + range) % range
    return mod + min
  }

  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return "0px"
    return `${wrap(-copyWidth, 0, v)}px`
  })

  const directionFactor = useRef<number>(1)
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="relative overflow-hidden whitespace-nowrap py-4">
      <motion.div
        className={cn(
          "flex whitespace-nowrap text-4xl font-bold uppercase tracking-tighter sm:text-5xl md:text-7xl lg:text-8xl",
          className
        )}
        style={{ x }}
      >
        {Array.from({ length: numCopies }).map((_, i) => (
          <span
            key={i}
            ref={i === 0 ? copyRef : null}
            className="flex-shrink-0 pr-8"
          >
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  texts = [],
  velocity = 100,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
}) => {
  return (
    <section 
      className={cn(
        "relative w-full overflow-hidden", 
        parallaxClassName
      )}
    >
      {/* Optional Gradient Mask */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent md:w-48" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent md:w-48" />

      <div className="flex flex-col gap-4 py-8">
        {texts.map((text, index) => (
          <VelocityText
            key={index}
            className={className}
            baseVelocity={index % 2 !== 0 ? -velocity : velocity}
            damping={damping}
            stiffness={stiffness}
            numCopies={numCopies}
            velocityMapping={velocityMapping}
          >
            {text}
          </VelocityText>
        ))}
      </div>
    </section>
  )
}
