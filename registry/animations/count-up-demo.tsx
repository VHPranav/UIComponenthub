"use client"

import { CountUp } from "./count-up"
import { PreviewContainer } from "@/components/preview-container"
import { cn } from "@/lib/utils"

export function CountUpDemo(props: any) {
  const isDemoMode = Object.keys(props).length > 0

  if (isDemoMode) {
    return (
      <PreviewContainer>
        <CountUp
          to={100}
          {...props}
          className={cn("text-white text-7xl font-black tracking-tighter", props.className)}
        />
      </PreviewContainer>
    )
  }

  return (
    <div className="flex flex-col gap-20 w-full max-w-2xl px-4 my-12">
      {/* Whole Number Box */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground ml-1">Whole Number Count</h3>
        <PreviewContainer>
          <CountUp
            to={123}
            separator=","
            duration={2.5}
            className="text-white text-7xl font-black tracking-tighter"
          />
        </PreviewContainer>
      </div>

      {/* Decimal Box */}
      <div className="space-y-4 pt-16 border-t border-zinc-500/10">
        <h3 className="text-sm font-medium text-muted-foreground ml-1">Decimal Precision</h3>
        <PreviewContainer>
          <CountUp
            to={99.99}
            duration={3}
            className="text-white text-7xl font-black tracking-tighter"
          />
        </PreviewContainer>
      </div>
    </div>
  )
}
