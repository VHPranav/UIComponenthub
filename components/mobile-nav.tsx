"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ComponentsSidebar } from "@/components/components-sidebar"
import { CommandMenu } from "@/components/command-menu"
import { ComponentMetadata } from "@/lib/types"

interface MobileNavProps {
  items: Record<string, ComponentMetadata[]>
  allComponents: ComponentMetadata[]
}

export function MobileNav({ items, allComponents }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 md:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      {open && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)}>
          <div className="fixed inset-y-0 left-0 z-50 w-full max-w-xs border-r bg-background p-6 shadow-lg animate-in slide-in-from-left duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col gap-4 h-full">
              <div className="flex items-center justify-between">
                <span className="font-bold">UIComponentHub</span>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="px-1">
                <CommandMenu components={allComponents} />
              </div>

              <div className="flex-1 overflow-y-auto pr-2 mt-4" onClick={() => setOpen(false)}>
                <ComponentsSidebar items={items} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
