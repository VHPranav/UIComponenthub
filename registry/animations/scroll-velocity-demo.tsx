"use client"

import React from "react"
import { ScrollVelocity } from "./scroll-velocity"

export function ScrollVelocityDemo() {
  return (
    <div className="flex w-full flex-col gap-8 py-20">
      <ScrollVelocity
        texts={["High Performance", "Infinite Scrolling"]}
        velocity={100}
        className="text-white dark:text-zinc-50"
      />
      
      <ScrollVelocity
        texts={["Design Hub", "Creative Hub"]}
        velocity={80}
        className="text-emerald-500"
      />

      <ScrollVelocity
        texts={["Modern Typography", "Fluid Animations"]}
        velocity={120}
        className="text-zinc-600 dark:text-zinc-400"
      />
    </div>
  )
}
