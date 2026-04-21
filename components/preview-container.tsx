"use client"

import React, { useState, useEffect } from "react"
import { RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface PreviewContainerProps {
  children: React.ReactNode
  showDots?: boolean
  className?: string
}

/**
 * PreviewContainer is the global wrapper for all component previews.
 * It handles:
 * 1. Hydration safety (ensures complex components only render on the client).
 * 2. Manual refresh/re-trigger logic.
 * 3. Base layout and decorative elements.
 */
export function PreviewContainer({ 
  children, 
  showDots = true, 
  className 
}: PreviewContainerProps) {
  const [mounted, setMounted] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  // Standard Hydration Safety Fix
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl border bg-muted/20 min-h-[400px] flex items-center justify-center p-8 transition-colors hover:border-primary/20 group",
      className
    )}>
      {showDots && (
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', 
            backgroundSize: '24px 24px' 
          }} 
        />
      )}
      
      {/* Refresh Button */}
      <button
        onClick={() => setRefreshKey((prev) => prev + 1)}
        className="absolute top-4 right-4 z-20 p-2.5 rounded-xl border bg-background/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-background hover:scale-110 active:scale-95 shadow-md flex items-center justify-center group/refresh"
        title="Refresh Preview"
      >
        <RotateCcw className="h-4 w-4 text-muted-foreground transition-transform group-hover/refresh:rotate-[-90deg]" />
      </button>

      <div className="z-10 w-full flex justify-center" key={refreshKey}>
        {/* Only render children once mounted on the client to avoid Three.js/GSAP hydration issues */}
        {mounted ? children : (
          <div className="animate-pulse flex space-x-4 opacity-20">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
