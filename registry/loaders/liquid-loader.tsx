"use client"

import React from "react"
import { motion } from "framer-motion"

export const LiquidLoader = () => {
  return (
    <div className="relative flex items-center justify-center h-24 w-24">
      <svg width="0" height="0">
        <defs>
          <filter id="liquid">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" 
              result="liquid" 
            />
            <feComposite in="SourceGraphic" in2="liquid" operator="atop" />
          </filter>
        </defs>
      </svg>
      
      <div className="flex gap-4" style={{ filter: "url(#liquid)" }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
            className="w-8 h-8 rounded-full bg-primary shadow-lg shadow-primary/30"
          />
        ))}
      </div>
    </div>
  )
}
