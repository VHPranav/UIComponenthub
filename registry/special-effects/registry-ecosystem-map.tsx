"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  MousePointerClick,
  LayoutGrid,
  Layers,
  Loader2,
  Sparkles,
  Wind,
  FileCode2,
  Globe,
  Zap,
} from "lucide-react"

// ─── Card positions — mirrored layout around center (50%, 50%) ───────────────
//  Left side cards fan out top-left → bottom-left
//  Right side cards fan out top-right → bottom-right

const sources = [
  { title: "Buttons",     desc: "Glass, Retro, Shimmer — interactive click targets.", top: 8,  left: 4,  color: "#6366f1", icon: MousePointerClick },
  { title: "Cards",       desc: "Tilt, Spotlight — premium surface components.",       top: 33, left: 16, color: "#ec4899", icon: LayoutGrid        },
  { title: "Backgrounds", desc: "Pixel grids, magnetic orbs — immersive layers.",      top: 60, left: 16, color: "#14b8a6", icon: Layers             },
  { title: "Loaders",     desc: "Orbit, Liquid — delightful loading states.",          top: 84, left: 4,  color: "#f59e0b", icon: Loader2            },
]

const outputs = [
  { title: "Next.js",       desc: "Optimised for the Next.js App Router.",     top: 8,  left: 80, color: "#18181b", icon: Globe    },
  { title: "Tailwind CSS",  desc: "Utility-first styling with design tokens.", top: 33, left: 68, color: "#06b6d4", icon: Wind     },
  { title: "Framer Motion", desc: "Spring-physics animations out of the box.", top: 60, left: 68, color: "#b855f6", icon: Zap      },
  { title: "TypeScript",    desc: "Fully typed APIs for safe, fast dev.",      top: 84, left: 80, color: "#3b82f6", icon: FileCode2},
]

// Connections: lines from card position → center (50%, 50%)
// Each card's connection originates from its `[left, top]`
const connections = [
  // sources
  { start: [4,  8 ] as [number,number], end: [50, 50] as [number,number] },
  { start: [16, 33] as [number,number], end: [50, 50] as [number,number] },
  { start: [16, 60] as [number,number], end: [50, 50] as [number,number] },
  { start: [4,  84] as [number,number], end: [50, 50] as [number,number] },
  // outputs
  { start: [80, 8 ] as [number,number], end: [50, 50] as [number,number] },
  { start: [68, 33] as [number,number], end: [50, 50] as [number,number] },
  { start: [68, 60] as [number,number], end: [50, 50] as [number,number] },
  { start: [80, 84] as [number,number], end: [50, 50] as [number,number] },
]

const SPARK_COLORS = [
  "#6366f1","#ec4899","#14b8a6","#f59e0b",
  "#18181b","#06b6d4","#b855f6","#3b82f6",
]

const VW = 1000
const VH = 500

function getCubicPath(p1: [number, number], p2: [number, number]) {
  const x1 = (p1[0] / 100) * VW
  const y1 = (p1[1] / 100) * VH
  const x2 = (p2[0] / 100) * VW
  const y2 = (p2[1] / 100) * VH
  // gentle S-curve that bends toward center
  const cp1x = x1 + (x2 - x1) * 0.5
  const cp2x = x2 - (x2 - x1) * 0.5
  return `M ${x1} ${y1} C ${cp1x} ${y1}, ${cp2x} ${y2}, ${x2} ${y2}`
}

// ─── InfoCard ────────────────────────────────────────────────────────────────

interface CardData {
  title: string
  desc: string
  top: number
  left: number
  color: string
  icon: React.ElementType
}

function InfoCard({
  title, desc, top, left, color, icon: Icon, pillSide, delay,
}: CardData & { pillSide: "left" | "right"; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] }}
      // Card is centred on its [left, top] coordinate — matches connection line origin
      className="absolute z-[5] w-[155px] -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.07)]"
      style={{ top: `${top}%`, left: `${left}%` }}
    >
      {/* Header row */}
      <div className="flex items-center gap-2 px-3.5 py-3">
        <div
          className="w-7 h-7 rounded-[8px] flex items-center justify-center flex-shrink-0 border"
          style={{ backgroundColor: `${color}15`, borderColor: `${color}28` }}
        >
          <Icon size={13} color={color} strokeWidth={2.5} />
        </div>
        <span className="font-semibold text-[0.77rem]" style={{ color }}>
          {title}
        </span>
      </div>

      {/* Body */}
      <div className="relative px-3.5 pb-3.5 border-t border-zinc-100 dark:border-zinc-800 pt-2.5">
        <p className="text-zinc-500 dark:text-zinc-400 text-[0.67rem] leading-snug">
          {desc}
        </p>
        {/* Accent pill on the inner edge */}
        <div
          className="absolute top-[18%] rounded-[3px]"
          style={{
            [pillSide]: -1.5,
            width: 3,
            height: 20,
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
      </div>
    </motion.div>
  )
}

// ─── Central Hub ─────────────────────────────────────────────────────────────

function CentralHub() {
  const Ring = ({ size, delay, opacity }: { size: number; delay: number; opacity: number }) => (
    <motion.div
      className="absolute rounded-full border border-blue-300/40"
      style={{ width: size, height: size, top: "50%", left: "50%", x: "-50%", y: "-50%" }}
      animate={{ scale: [1, 1.08, 1], opacity: [opacity, opacity * 0.35, opacity] }}
      transition={{ duration: 3.5, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  )

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.65 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="relative w-[96px] h-[96px] flex items-center justify-center rounded-full z-[10] shadow-[0_0_0_8px_rgba(99,102,241,0.07),0_6px_28px_rgba(0,0,0,0.10)]"
      style={{
        background:
          "linear-gradient(white, white) padding-box, linear-gradient(135deg, #6366f1, #93c5fd) border-box",
        border: "2px solid transparent",
      }}
    >
      <Ring size={130} delay={0}   opacity={0.55} />
      <Ring size={172} delay={1.1} opacity={0.28} />
      <Ring size={218} delay={2.0} opacity={0.12} />

      <div className="flex flex-col items-center gap-0.5 text-center relative z-[2] px-1">
        <Sparkles size={15} className="text-indigo-500" />
        <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-[0.68rem] leading-tight">
          Component<br />Registry
        </span>
      </div>
    </motion.div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function RegistryEcosystemMap() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <section className="relative w-full h-[400px] overflow-hidden bg-transparent">

      {/* SVG connection lines + animated sparks */}
      {mounted && (
        <svg
          className="absolute inset-0 z-[1] pointer-events-none"
          width="100%" height="100%"
          viewBox={`0 0 ${VW} ${VH}`}
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="ecosGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {connections.map((conn, i) => {
            const d = getCubicPath(conn.start, conn.end)
            const dur = 2.4 + (i % 4) * 0.6
            return (
              <g key={i}>
                {/* Static line */}
                <path d={d} fill="none" stroke="#e2e8f0" strokeWidth="1.2" opacity="0.7" />
                {/* Travelling spark */}
                <circle r="3" fill={SPARK_COLORS[i]} filter="url(#ecosGlow)">
                  <animateMotion
                    dur={`${dur}s`}
                    repeatCount="indefinite"
                    path={d}
                    begin={`${i * 0.4}s`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.08;0.88;1"
                    dur={`${dur}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.4}s`}
                  />
                </circle>
              </g>
            )
          })}
        </svg>
      )}

      {/* Central hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10]">
        <CentralHub />
      </div>

      {/* Source cards (left side) */}
      {sources.map((card, i) => (
        <InfoCard key={`src-${i}`} {...card} pillSide="right" delay={0.1 + i * 0.1} />
      ))}

      {/* Output cards (right side) */}
      {outputs.map((card, i) => (
        <InfoCard key={`out-${i}`} {...card} pillSide="left" delay={0.5 + i * 0.1} />
      ))}
    </section>
  )
}
