"use client"

import React, { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

// SSR-safe layout effect
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect

gsap.registerPlugin(ScrollTrigger)

type AnimationDirection =
  | "vertical"
  | "horizontal"
  | "diagonal"
  | "none"

interface AnimatedContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  distance?: number
  direction?: AnimationDirection
  reverse?: boolean
  duration?: number
  ease?: string
  initialOpacity?: number
  animateOpacity?: boolean
  scale?: number
  threshold?: number
  delay?: number
  disappearAfter?: number
}

export const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  disappearAfter = 0,
  className = "",
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Position calculation
    let x = 0
    let y = 0
    const offset = reverse ? -distance : distance

    switch (direction) {
      case "vertical":
        y = offset
        break
      case "horizontal":
        x = offset
        break
      case "diagonal":
        x = offset
        y = offset
        break
      default:
        break
    }

    // Set initial state
    gsap.set(el, {
      x,
      y,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
      visibility: "visible",
    })

    const tl = gsap.timeline({
      paused: true,
      delay,
      onComplete: () => {
        if (disappearAfter > 0) {
          gsap.to(el, {
            y: direction === "vertical" || direction === "diagonal" ? (reverse ? distance : -distance) : 0,
            x: direction === "horizontal" || direction === "diagonal" ? (reverse ? distance : -distance) : 0,
            scale: 0.8,
            opacity: animateOpacity ? initialOpacity : 0,
            delay: disappearAfter,
            duration: 0.5,
            ease: "power3.in",
          })
        }
      },
    })

    tl.to(el, {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease,
    })

    const st = ScrollTrigger.create({
      trigger: el,
      start: `top ${100 - threshold * 100}%`,
      once: true,
      onEnter: () => tl.play(),
    })

    return () => {
      st.kill()
      tl.kill()
    }
  }, [
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    disappearAfter,
  ])

  return (
    <div
      ref={containerRef}
      className={cn("invisible", className)}
      {...props}
    >
      {children}
    </div>
  )
}
