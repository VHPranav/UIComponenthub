"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronRight, Home, MoreHorizontal } from "lucide-react"
import { ComponentMetadata } from "@/lib/types"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface BreadcrumbsProps {
  components: ComponentMetadata[]
  currentTitle: string
}

export function Breadcrumbs({ components, currentTitle }: BreadcrumbsProps) {
  const params = useParams()
  const id = params.id as string

  // Get current component to find its category
  const currentComponent = components.find((c) => c.id === id)
  const category = currentComponent?.category || "Components"

  // Get other components in the same category
  const categoryComponents = components.filter(
    (c) => c.category === category && c.id !== id
  )

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-4 overflow-x-auto whitespace-nowrap pb-2 scrollbar-none">
      <Link
        href="/"
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      <ChevronRight className="h-4 w-4 shrink-0" />
      <Link
        href="/components"
        className="hover:text-foreground transition-colors font-medium"
      >
        Components
      </Link>
      <ChevronRight className="h-4 w-4 shrink-0" />
      
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center hover:text-foreground transition-colors font-medium outline-none">
          {category}
          <ChevronRight className="h-4 w-4 ml-1 shrink-0" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem asChild>
            <Link href="/components">All Categories</Link>
          </DropdownMenuItem>
          {/* We could list all categories here if we wanted */}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center text-foreground font-semibold outline-none hover:opacity-80 transition-opacity">
          {currentTitle}
          {categoryComponents.length > 0 && (
            <ChevronRight className="h-4 w-4 ml-1 rotate-90 shrink-0" />
          )}
        </DropdownMenuTrigger>
        {categoryComponents.length > 0 && (
          <DropdownMenuContent align="start" className="w-56 max-h-[300px] overflow-y-auto">
            {categoryComponents.map((comp) => (
              <DropdownMenuItem key={comp.id} asChild>
                <Link href={`/components/${comp.id}`}>
                  {comp.title}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </nav>
  )
}
