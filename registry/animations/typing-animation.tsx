"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TypingAnimationProps {
  text?: string
  duration?: number
  delay?: number
  className?: string
  startOnView?: boolean
}

export function TypingAnimation({
  text = "Typing effect from the hub",
  duration = 100,
  delay = 0,
  className,
  startOnView = true,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("")
  const [i, setI] = useState<number>(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!startOnView) {
      const timer = setTimeout(() => setStarted(true), delay)
      return () => clearTimeout(timer)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setStarted(true), delay)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay, startOnView])

  useEffect(() => {
    if (!started) return

    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prevState) => prevState + text.charAt(i))
        setI(i + 1)
      } else {
        clearInterval(typingEffect)
      }
    }, duration)

    return () => {
      clearInterval(typingEffect)
    }
  }, [duration, i, started, text])

  return (
    <h1
      ref={ref}
      className={cn(
        "font-display text-center text-xl font-regular leading-[5rem] tracking-[-0.02em] drop-shadow-sm",
        className
      )}
    >
      {displayedText ? displayedText : "\u00A0"}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="inline-block w-[4px] h-[0.9em] bg-current ml-1 align-middle"
      />
    </h1>
  )
}
