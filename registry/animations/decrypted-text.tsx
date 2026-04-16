"use client"

import { useEffect, useState, useRef, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface DecryptedTextProps {
  text: string
  speed?: number
  maxIterations?: number
  sequential?: boolean
  revealDirection?: "start" | "end" | "center" | "random"
  useOriginalCharsOnly?: boolean
  characters?: string
  className?: string
  encryptedClassName?: string
  parentClassName?: string
  animateOn?: "view" | "hover" | "inViewHover" | "click"
  clickMode?: "once" | "toggle"
}

export function DecryptedText({
  text = "Cyberpunk Reveal",
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "text-blue-500 font-mono opacity-70",
  animateOn = "hover",
  clickMode = "once",
}: DecryptedTextProps) {
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set())
  const [isDecrypted, setIsDecrypted] = useState<boolean>(false)
  const [iteration, setIteration] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  const containerRef = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const availableChars = useMemo<string[]>(() => {
    if (!text) return []
    return useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
      : (characters || "").split("")
  }, [useOriginalCharsOnly, text, characters])

  const getNextIndex = useCallback((revealedSet: Set<number>, total: number) => {
    if (revealDirection === "random") {
      const remaining = Array.from({ length: total }, (_, i) => i).filter(i => !revealedSet.has(i))
      return remaining[Math.floor(Math.random() * remaining.length)]
    }
    
    if (revealDirection === "start") return revealedSet.size
    if (revealDirection === "end") return total - 1 - revealedSet.size
    
    // center
    const middle = Math.floor(total / 2)
    const offset = Math.floor(revealedSet.size / 2)
    const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1
    return (nextIndex >= 0 && nextIndex < total) ? nextIndex : revealedSet.size
  }, [revealDirection])

  const triggerDecrypt = useCallback(() => {
    setRevealedIndices(new Set())
    setIteration(0)
    setIsAnimating(true)
    setIsDecrypted(false)
  }, [])

  useEffect(() => {
    if (!isAnimating) return

    const interval = setInterval(() => {
      if (sequential) {
        setRevealedIndices((prev) => {
          if (prev.size >= text.length) {
            clearInterval(interval)
            setIsAnimating(false)
            setIsDecrypted(true)
            return prev
          }
          const next = new Set(prev)
          next.add(getNextIndex(prev, text.length))
          return next
        })
      } else {
        setIteration((prev) => {
          if (prev >= maxIterations) {
            clearInterval(interval)
            setIsAnimating(false)
            setIsDecrypted(true)
            return prev
          }
          return prev + 1
        })
      }
    }, speed)

    return () => clearInterval(interval)
  }, [isAnimating, sequential, text.length, speed, maxIterations, getNextIndex])

  // View Observer
  useEffect(() => {
    if (animateOn !== "view" && animateOn !== "inViewHover") return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          triggerDecrypt()
          setHasAnimated(true)
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [animateOn, hasAnimated, triggerDecrypt])

  const handleInteraction = () => {
    if (animateOn === "click") {
      if (clickMode === "once" && isDecrypted && !isAnimating) return
      triggerDecrypt()
    }
  }

  const hoverProps = (animateOn === "hover" || animateOn === "inViewHover") ? {
    onMouseEnter: triggerDecrypt,
    onMouseLeave: () => {
      setIsAnimating(false)
      setIsDecrypted(false)
      setRevealedIndices(new Set())
    }
  } : {}

  return (
    <motion.span
      ref={containerRef}
      className={cn("inline-block whitespace-pre-wrap transition-colors duration-300", parentClassName)}
      onClick={handleInteraction}
      {...hoverProps}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="flex flex-wrap">
        {(text || "").split("").map((char, index) => {
          const isRevealed = revealedIndices.has(index) || (isDecrypted && !isAnimating)
          
          // Use a stable character during hydration/SSR
          const randomChar = isMounted 
            ? availableChars[Math.floor(Math.random() * availableChars.length)]
            : char

          return (
            <motion.span
              key={index}
              layout
              className={cn(
                "inline-block min-w-[0.5em]",
                isRevealed ? className : encryptedClassName
              )}
            >
              <AnimatePresence mode="popLayout">
                {isRevealed ? (
                  <motion.span
                    key="original"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ) : (
                  <motion.span
                    key="encrypted"
                    initial={{ opacity: 0.5 }}
                    animate={{ 
                      opacity: [0.5, 1, 0.5],
                      x: [-1, 1, -1],
                      y: [1, -1, 1],
                      scale: [1, 1.1, 1]
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 0.15,
                      ease: "linear"
                    }}
                    className="font-mono"
                  >
                    {char === " " ? "\u00A0" : randomChar}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.span>
          )
        })}
      </span>
    </motion.span>
  )
}
