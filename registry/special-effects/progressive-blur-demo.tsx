"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { ProgressiveBlur } from "@/registry/magicui/progressive-blur"

export function ProgressiveBlurDemo() {
  return (
    <div className="relative w-full max-w-xl mx-auto rounded-xl border bg-background text-foreground">
      <ScrollArea className="relative h-[400px] w-full overflow-hidden">
        <div className="flex flex-col gap-2 p-4">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="bg-card flex h-20 w-full items-center justify-center rounded-xl border text-muted-foreground font-bold"
            >
              {index}
            </div>
          ))}
        </div>
        
        {/* Progressive Blur Layer over the scroll content */}
        <ProgressiveBlur position="bottom" height="40%" className="z-20" />
      </ScrollArea>
    </div>
  )
}
