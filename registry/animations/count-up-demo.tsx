"use client"

import { CountUp } from "./count-up"

export function CountUpDemo() {
  const previewBoxStyles = "relative overflow-hidden rounded-xl border bg-muted/20 min-h-[350px] flex items-center justify-center p-8 transition-colors hover:border-primary/20"
  const radialDots = (
    <div
      className="absolute inset-0 opacity-[0.03] pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
        backgroundSize: '24px 24px'
      }}
    />
  )

  return (
    <div className="flex flex-col gap-20 w-full max-w-2xl px-4 my-12">
      {/* Whole Number Box */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground ml-1">Whole Number Count</h3>
        <div className={previewBoxStyles}>
          {radialDots}
          <div className="z-10 w-full flex justify-center">
            <CountUp
              to={123}
              separator=","
              duration={2.5}
              className="text-white text-7xl font-black tracking-tighter"
            />
          </div>
        </div>
      </div>

      {/* Decimal Box */}
      <div className="space-y-4 pt-16 border-t border-zinc-500/10">
        <h3 className="text-sm font-medium text-muted-foreground ml-1">Decimal Precision</h3>
        <div className={previewBoxStyles}>
          {radialDots}
          <div className="z-10 w-full flex justify-center">
            <CountUp
              to={99.99}
              duration={3}
              className="text-white text-7xl font-black tracking-tighter"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
