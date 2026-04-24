"use client"

import React from "react"
import { AnimatedContent } from "./animated-content"

export function AnimatedContentDemo() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Row 1: Vertical */}
        <AnimatedContent direction="vertical" distance={100} delay={0.2} threshold={0.2}>
          <div className="h-48 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border flex flex-col items-center justify-center p-6 text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">Vertical</span>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">Slide from bottom</p>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="vertical" distance={100} reverse delay={0.3} threshold={0.2}>
          <div className="h-48 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border flex flex-col items-center justify-center p-6 text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">Vertical Reverse</span>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">Slide from top</p>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="vertical" scale={0.8} distance={0} delay={0.4} threshold={0.2}>
          <div className="h-48 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border flex flex-col items-center justify-center p-6 text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">Scale</span>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">Elastic Zoom In</p>
          </div>
        </AnimatedContent>

        {/* Row 2: Horizontal */}
        <AnimatedContent direction="horizontal" distance={100} delay={0.5} threshold={0.2}>
          <div className="h-48 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border flex flex-col items-center justify-center p-6 text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">Horizontal</span>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">Slide from right</p>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="horizontal" distance={100} reverse delay={0.6} threshold={0.2}>
          <div className="h-48 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border flex flex-col items-center justify-center p-6 text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">Horizontal Reverse</span>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">Slide from left</p>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="diagonal" distance={100} delay={0.7} threshold={0.2}>
          <div className="h-48 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border flex flex-col items-center justify-center p-6 text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">Diagonal</span>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">Top-Left Entrance</p>
          </div>
        </AnimatedContent>
      </div>
    </div>
  )
}

export default AnimatedContentDemo
