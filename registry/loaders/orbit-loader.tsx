"use client"

import React from "react"
import { motion } from "framer-motion"

export const OrbitLoader = ({ size = 60 }: { size?: number }) => {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Center Circle */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]"
      />
      
      {/* Orbiting Particles */}
      {[0, 120, 240].map((rotate, i) => (
        <motion.div
          key={i}
          className="absolute"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ width: "100%", height: "100%", transform: `rotate(${rotate}deg)` }}
        >
          <motion.div
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
            className="w-2 h-2 rounded-full bg-primary/70 absolute top-0 left-1/2 -translate-x-1/2"
          />
        </motion.div>
      ))}

      {/* Outer Glow Ring */}
      <div className="absolute inset-0 rounded-full border border-primary/10 animate-pulse" />
    </div>
  )
}
