"use client"

import React from "react"
import { registry } from "@/registry"
import { cn } from "@/lib/utils"

interface ComponentPreviewProps {
  id: string
  className?: string
  props?: Record<string, unknown>
}

export function ComponentPreview({ id, className, props = {} }: ComponentPreviewProps) {
  const Component = registry[id]

  if (!Component) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
        Component &quot;{id}&quot; not found in registry.
      </div>
    )
  }

  return (
    <div className={cn("group relative my-8", className)}>
      <div className="relative overflow-hidden rounded-xl border bg-muted/20 min-h-[350px] flex items-center justify-center p-8 transition-colors hover:border-primary/20">
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', 
            backgroundSize: '24px 24px' 
          }} 
        />
        <div className="z-10 w-full flex justify-center">
          <Component {...props} />
        </div>
      </div>
    </div>
  )
}
