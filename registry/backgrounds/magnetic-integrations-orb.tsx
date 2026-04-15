"use client"

import React, { useRef, ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { ShieldCheck, Mail, Bot } from "lucide-react"

// --- Magnet Component ---
interface MagnetProps {
  children: ReactNode
  magnetStrength?: number
}

function Magnet({ children, magnetStrength = 4 }: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  // Capture the original center ONCE on mouseenter (before the element starts moving)
  // so the moving transform doesn't pollute the reference point and cause jitter
  const origin = useRef<{ cx: number; cy: number } | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  // Lower stiffness + damping = smooth, buttery pull with a tiny natural overshoot
  const springX = useSpring(x, { stiffness: 120, damping: 14, mass: 0.08 })
  const springY = useSpring(y, { stiffness: 120, damping: 14, mass: 0.08 })

  const handleMouseEnter = () => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    origin.current = {
      cx: rect.left + rect.width / 2,
      cy: rect.top + rect.height / 2,
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!origin.current) return
    x.set((e.clientX - origin.current.cx) / magnetStrength)
    y.set((e.clientY - origin.current.cy) / magnetStrength)
  }

  const handleMouseLeave = () => {
    origin.current = null
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

// --- Tool data — all positions kept within 8%–88% (h) and 6%–88% (v) ---
interface ToolItem {
  type: "img" | "lucide"
  src?: string
  Icon?: React.ElementType
  iconColor?: string
  top: string
  left: string
  blur: string
  opacity: number
  scale: number
  delay: number
  floatDuration: number
}

const TOOLS: ToolItem[] = [
  // Top-left cluster
  { type: "img", src: "https://cdn.simpleicons.org/slack",             top: "12%", left: "10%", blur: "0px", opacity: 1,   scale: 1,    delay: 0,   floatDuration: 7   },
  { type: "img", src: "https://cdn.simpleicons.org/shopify/96bf48",   top: "28%", left: "18%", blur: "1px", opacity: 0.6, scale: 0.85, delay: 1.5, floatDuration: 9   },
  { type: "img", src: "https://cdn.simpleicons.org/hubspot/ff7a59",   top: "10%", left: "28%", blur: "0px", opacity: 0.8, scale: 0.9,  delay: 2.5, floatDuration: 8   },
  { type: "lucide", Icon: ShieldCheck, iconColor: "#4285F4",          top: "20%", left: "36%", blur: "0px", opacity: 0.85,scale: 0.85, delay: 1.2, floatDuration: 6.5 },
  { type: "lucide", Icon: Mail,        iconColor: "#EA4335",          top: "7%",  left: "16%", blur: "1px", opacity: 0.5, scale: 0.8,  delay: 3.2, floatDuration: 10  },
  { type: "lucide", Icon: Bot,         iconColor: "#33A852",          top: "38%", left: "8%",  blur: "0px", opacity: 0.9, scale: 1,    delay: 0.8, floatDuration: 7.5 },

  // Top-right cluster
  { type: "img", src: "https://cdn.simpleicons.org/salesforce/00a1e0",top: "10%", left: "72%", blur: "0px", opacity: 0.9, scale: 1,    delay: 3,   floatDuration: 8   },
  { type: "img", src: "https://cdn.simpleicons.org/whatsapp/25d366",  top: "28%", left: "82%", blur: "1px", opacity: 0.6, scale: 0.85, delay: 1,   floatDuration: 9   },
  { type: "img", src: "https://cdn.simpleicons.org/shopify/96bf48",   top: "12%", left: "64%", blur: "0px", opacity: 1,   scale: 1.05, delay: 4,   floatDuration: 6.5 },
  { type: "lucide", Icon: ShieldCheck, iconColor: "#4285F4",          top: "20%", left: "58%", blur: "0px", opacity: 0.8, scale: 0.85, delay: 1.7, floatDuration: 8   },
  { type: "lucide", Icon: Mail,        iconColor: "#EA4335",          top: "7%",  left: "84%", blur: "1px", opacity: 0.5, scale: 0.8,  delay: 2.8, floatDuration: 7   },
  { type: "lucide", Icon: Bot,         iconColor: "#33A852",          top: "38%", left: "88%", blur: "0px", opacity: 0.9, scale: 1,    delay: 1.4, floatDuration: 9.5 },

  // Bottom-left cluster
  { type: "img", src: "https://cdn.simpleicons.org/square",           top: "60%", left: "12%", blur: "0px", opacity: 0.8, scale: 0.95, delay: 2,   floatDuration: 7.5 },
  { type: "img", src: "https://cdn.simpleicons.org/slack",            top: "78%", left: "22%", blur: "2px", opacity: 0.4, scale: 0.8,  delay: 3.5, floatDuration: 8.5 },
  { type: "img", src: "https://cdn.simpleicons.org/whatsapp/25d366",  top: "55%", left: "8%",  blur: "0px", opacity: 0.9, scale: 1,    delay: 1.8, floatDuration: 6   },
  { type: "img", src: "https://cdn.simpleicons.org/hubspot/ff7a59",   top: "72%", left: "36%", blur: "1px", opacity: 0.5, scale: 0.85, delay: 5,   floatDuration: 9   },
  { type: "lucide", Icon: ShieldCheck, iconColor: "#4285F4",          top: "85%", left: "14%", blur: "0px", opacity: 0.6, scale: 0.8,  delay: 0.5, floatDuration: 7   },
  { type: "lucide", Icon: Mail,        iconColor: "#EA4335",          top: "58%", left: "38%", blur: "0px", opacity: 0.9, scale: 1,    delay: 2.2, floatDuration: 8   },
  { type: "lucide", Icon: Bot,         iconColor: "#33A852",          top: "88%", left: "28%", blur: "1px", opacity: 0.5, scale: 0.8,  delay: 4.1, floatDuration: 10  },

  // Bottom-right cluster
  { type: "img", src: "https://cdn.simpleicons.org/shopify/96bf48",   top: "60%", left: "82%", blur: "0px", opacity: 1,   scale: 1,    delay: 4.5, floatDuration: 7   },
  { type: "img", src: "https://cdn.simpleicons.org/square",           top: "78%", left: "72%", blur: "2px", opacity: 0.4, scale: 0.8,  delay: 0.8, floatDuration: 6.5 },
  { type: "img", src: "https://cdn.simpleicons.org/salesforce/00a1e0",top: "55%", left: "88%", blur: "0px", opacity: 0.8, scale: 1,    delay: 2.2, floatDuration: 8.5 },
  { type: "lucide", Icon: ShieldCheck, iconColor: "#4285F4",          top: "85%", left: "84%", blur: "0px", opacity: 0.6, scale: 0.8,  delay: 1.2, floatDuration: 9   },
  { type: "lucide", Icon: Mail,        iconColor: "#EA4335",          top: "58%", left: "60%", blur: "0px", opacity: 0.9, scale: 1,    delay: 3.5, floatDuration: 7.5 },
  { type: "lucide", Icon: Bot,         iconColor: "#33A852",          top: "88%", left: "68%", blur: "1px", opacity: 0.5, scale: 0.8,  delay: 2.8, floatDuration: 8   },
]

interface MagneticIntegrationsOrbProps {
  heading?: string
  subheading?: string
}

export function MagneticIntegrationsOrb({
  heading = "Hover over the icons",
  subheading = "Connect with 100+ tools your team already loves.",
}: MagneticIntegrationsOrbProps) {
  return (
    <section className="relative w-full min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Floating Icons Layer */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {TOOLS.map((tool, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-auto"
            style={{
              top: tool.top,
              left: tool.left,
              opacity: tool.opacity,
              filter: `blur(${tool.blur})`,
              scale: tool.scale,
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              y: ["-50%", "calc(-50% - 8px)", "calc(-50% + 6px)", "-50%"],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: tool.floatDuration,
              delay: tool.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Magnet magnetStrength={4}>
              <div className="w-8 h-8 p-[7px] bg-white rounded-xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.07)] flex items-center justify-center hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] hover:scale-110 transition-shadow duration-300 cursor-pointer">
                {tool.type === "lucide" && tool.Icon ? (
                  <tool.Icon size="100%" color={tool.iconColor} strokeWidth={1.5} />
                ) : (
                  <img
                    src={tool.src}
                    alt="Integration"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </Magnet>
          </motion.div>
        ))}
      </div>

      {/* Central Content */}
      <motion.div
        className="relative z-[2] flex flex-col items-center justify-center text-center max-w-xs px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <h2
          className="text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.1]"
          style={{ textShadow: "0 0 40px rgba(255,255,255,1)" }}
        >
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
