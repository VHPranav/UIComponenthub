"use client"

import React, { useState, useEffect, useRef, ReactNode, HTMLAttributes } from "react"
import { motion } from "framer-motion"
import {
  Database,
  Mail,
  Globe,
  MessageSquare,
  Zap,
  Shield,
  Activity,
  Cpu,
  Layers,
  Lock,
} from "lucide-react"

// --- User-provided Smooth Magnet Component ---
interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  padding?: number
  disabled?: boolean
  magnetStrength?: number
  activeTransition?: string
  inactiveTransition?: string
  wrapperClassName?: string
  innerClassName?: string
}

const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.5s ease-in-out",
  wrapperClassName = "",
  innerClassName = "",
  ...props
}) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const magnetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (disabled) {
      setPosition({ x: 0, y: 0 })
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetRef.current) return

      const { left, top, width, height } = magnetRef.current.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2

      const distX = Math.abs(centerX - e.clientX)
      const distY = Math.abs(centerY - e.clientY)

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        setIsActive(true)
        const offsetX = (e.clientX - centerX) / magnetStrength
        const offsetY = (e.clientY - centerY) / magnetStrength
        setPosition({ x: offsetX, y: offsetY })
      } else {
        setIsActive(false)
        setPosition({ x: 0, y: 0 })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [padding, disabled, magnetStrength])

  const transitionStyle = isActive ? activeTransition : inactiveTransition

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: "relative", display: "inline-block" }}
      {...props}
    >
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: transitionStyle,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  )
}

// --- Scattered Category Icons Data ---
interface IconItem {
  Icon: React.ElementType
  color: string
  top: string
  left: string
  opacity: number
  scale: number
  delay: number
  floatDuration: number
}

const TOOLS: IconItem[] = [
  { Icon: Database,      color: "#3b82f6", top: "15%", left: "12%", opacity: 0.8, scale: 1,    delay: 0,   floatDuration: 8   },
  { Icon: Mail,          color: "#ec4899", top: "12%", left: "85%", opacity: 0.7, scale: 1,    delay: 1.5, floatDuration: 7   },
  { Icon: Globe,         color: "#10b981", top: "75%", left: "15%", opacity: 0.7, scale: 0.9,  delay: 2.5, floatDuration: 9   },
  { Icon: MessageSquare, color: "#8b5cf6", top: "85%", left: "82%", opacity: 0.8, scale: 1.05, delay: 3,   floatDuration: 6.5 },
  { Icon: Zap,           color: "#f59e0b", top: "45%", left: "8%",  opacity: 0.8, scale: 0.95, delay: 0.8, floatDuration: 7.5 },
  { Icon: Shield,        color: "#6366f1", top: "45%", left: "92%", opacity: 0.9, scale: 1,    delay: 1.8, floatDuration: 8.5 },
  { Icon: Activity,      color: "#ef4444", top: "10%", left: "50%", opacity: 0.6, scale: 1,    delay: 4,   floatDuration: 10  },
  { Icon: Cpu,           color: "#14b8a6", top: "88%", left: "50%", opacity: 0.5, scale: 0.85, delay: 2.2, floatDuration: 7   },
  { Icon: Layers,        color: "#f97316", top: "30%", left: "28%", opacity: 0.7, scale: 0.8,  delay: 3.2, floatDuration: 9   },
  { Icon: Lock,          color: "#06b6d4", top: "70%", left: "70%", opacity: 0.7, scale: 0.95, delay: 1.2, floatDuration: 8   },
]

interface MagneticIntegrationsOrbProps {
  heading?: string
  subheading?: string
}

export function MagneticIntegrationsOrb({
  heading = "Integrated Tools",
  subheading = "Minimal icons with a smooth magnetic response.",
}: MagneticIntegrationsOrbProps) {
  return (
    <section className="relative w-full min-h-[400px] flex items-center justify-center overflow-hidden bg-transparent">
      {/* Background Floating Layer */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {TOOLS.map((tool, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-auto"
            style={{
              top: tool.top,
              left: tool.left,
              opacity: tool.opacity,
              scale: tool.scale,
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              y: ["-50%", "calc(-50% - 12px)", "calc(-50% + 8px)", "-50%"],
            }}
            transition={{
              duration: tool.floatDuration,
              delay: tool.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Magnet magnetStrength={1.5} padding={120}>
              <div className="group cursor-pointer p-3">
                <tool.Icon 
                  size={32} 
                  color={tool.color} 
                  strokeWidth={1.5}
                  className="drop-shadow-sm transition-transform duration-300 group-hover:scale-110" 
                />
              </div>
            </Magnet>
          </motion.div>
        ))}
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-[2] flex flex-col items-center justify-center text-center max-w-sm px-6"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            {subheading}
          </p>
        )}
      </motion.div>
    </section>
  )
}
