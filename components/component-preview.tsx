import React from "react"
import { registry } from "@/registry"
import { cn } from "@/lib/utils"
import { PreviewContainer } from "./preview-container"

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
      <PreviewContainer>
        <Component {...props} />
      </PreviewContainer>
    </div>
  )
}
