"use client"

import React from "react"
import { AnimatedContent } from "./animated-content"

export function AnimatedContentDemo() {
  const directions = ["vertical", "horizontal", "diagonal"] as const

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-20">
      <div className="text-center mb-16 space-y-4">
        <AnimatedContent direction="vertical" distance={50}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-display">
            Animated Entrance Effects
          </h2>
        </AnimatedContent>
        <AnimatedContent direction="vertical" distance={50} delay={0.2}>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Bring your components to life with smooth, scroll-triggered entrance animations. 
            Choose from vertical, horizontal, or diagonal paths.
          </p>
        </AnimatedContent>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Row 1: Vertical */}
        <AnimatedContent direction="vertical" distance={100} delay={0.4} threshold={0.2}>
          <div className="h-48 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border flex flex-col items-center justify-center p-6 text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">Vertical</span>
            <p className="font-semibold">Slide from bottom</p>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="vertical" distance={100} reverse delay={0.5} threshold={0.2}>
          <div className="h-48 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border flex flex-col items-center justify-center p-6 text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">Vertical Reverse</span>
            <p className="font-semibold">Slide from top</p>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="vertical" scale={0.8} distance={0} delay={0.6} threshold={0.2}>
          <div className="h-48 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border flex flex-col items-center justify-center p-6 text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">Scale</span>
            <p className="font-semibold">Elastic Zoom In</p>
          </div>
        </AnimatedContent>

        {/* Row 2: Horizontal */}
        <AnimatedContent direction="horizontal" distance={100} delay={0.7} threshold={0.2}>
          <div className="h-48 rounded-2xl bg-primary/10 border-primary/20 border flex flex-col items-center justify-center p-6 text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-primary/60 mb-2">Horizontal</span>
            <p className="font-semibold">Slide from right</p>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="horizontal" distance={100} reverse delay={0.8} threshold={0.2}>
          <div className="h-48 rounded-2xl bg-primary/10 border-primary/20 border flex flex-col items-center justify-center p-6 text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-primary/60 mb-2">Horizontal Reverse</span>
            <p className="font-semibold">Slide from left</p>
          </div>
        </AnimatedContent>

        <AnimatedContent direction="diagonal" distance={100} delay={0.9} threshold={0.2}>
          <div className="h-48 rounded-2xl bg-primary/10 border-primary/20 border flex flex-col items-center justify-center p-6 text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-primary/60 mb-2">Diagonal</span>
            <p className="font-semibold">Top-Left Entrance</p>
          </div>
        </AnimatedContent>
      </div>

      <div className="mt-20">
         <AnimatedContent 
            direction="vertical" 
            distance={50} 
            disappearAfter={2} 
            className="flex justify-center"
         >
            <div className="bg-amber-500/10 border-amber-500/20 border px-6 py-4 rounded-full text-amber-500 font-medium">
               This element will disappear after 2 seconds
            </div>
         </AnimatedContent>
      </div>
    </div>
  )
}
