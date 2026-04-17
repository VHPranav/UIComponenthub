"use client"

import React, { useState } from "react"
import { RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface PreviewContainerProps {
  children: React.ReactNode
  showDots?: boolean
  className?: string
}

export function PreviewContainer({ 
  children, 
  showDots = true, 
  className 
}: PreviewContainerProps) {
  const [refreshKey, setRefreshKey] = useState(0)

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
        {children}
      </div>
    </div>
  )
}
