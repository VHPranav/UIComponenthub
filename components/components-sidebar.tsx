"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ComponentMetadata } from "@/lib/types"

export interface SidebarNavProps {
  items: Record<string, ComponentMetadata[]>
}

export function ComponentsSidebar({ items }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h4 className="px-2 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/50 mb-1 font-display">
          Getting Started
        </h4>
        <Link
          href="/components"
          className={cn(
            "flex w-full items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
            pathname === "/components"
              ? "bg-muted text-foreground font-semibold"
              : "text-muted-foreground"
          )}
        >
          Introduction
        </Link>
      </div>

      {Object.entries(items).map(([category, components]) => (
        <div key={category} className="flex flex-col gap-2">
          <h4 className="px-2 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/50 mb-1 font-display">
            {category}
          </h4>
          <div className="flex flex-col gap-1">
            {components.map((component) => {
              const href = `/components/${component.id}`
              const isActive = pathname === href

              return (
                <Link
                  key={component.id}
                  href={href}
                  className={cn(
                    "flex w-full items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted/50 hover:text-foreground",
                    isActive
                      ? "bg-primary/5 text-primary font-semibold"
                      : "text-muted-foreground"
                  )}
                >
                  <span className="truncate">{component.title}</span>
                  {component.isNew && (
                    <span className="ml-auto flex h-4 items-center rounded-full bg-indigo-500 px-1.5 text-[9px] font-black uppercase text-white shadow-[0_0_8px_rgba(99,102,241,0.5)]">
                      New
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
