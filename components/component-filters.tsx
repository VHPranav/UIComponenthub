"use client"

import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CATEGORIES, Category } from "@/lib/types"
import { Search, X, SlidersHorizontal } from "lucide-react"

const ALL_TAGS = [
  "Animated",
  "Interactive",
  "Gradient",
  "Glassmorphism",
  "Micro-interaction",
  "Minimal",
  "Futuristic",
]

interface ComponentFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  activeCategory: Category
  setActiveCategory: (category: Category) => void
  activeTags: string[]
  toggleTag: (tag: string) => void
}

export function ComponentFilters({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  activeTags,
  toggleTag,
}: ComponentFiltersProps) {
  const hasActiveFilters = searchQuery || activeCategory !== "All" || activeTags.length > 0

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          id="component-search"
          placeholder="Search components..."
          className="pl-10 pr-10 h-11 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus-visible:ring-1 focus-visible:ring-primary/40"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category + Tag row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Categories */}
        <div className="space-y-1.5 flex-1">
          <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
            <SlidersHorizontal className="h-3 w-3" />
            Category
          </label>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all duration-150 ${
                  activeCategory === category
                    ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-transparent shadow-sm"
                    : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-1.5 flex-1">
          <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Tags
          </label>
          <div className="flex flex-wrap gap-1.5">
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all duration-150 ${
                  activeTags.includes(tag)
                    ? "bg-primary/10 text-primary border-primary/30 shadow-sm"
                    : "bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-500 border-zinc-200 dark:border-zinc-800 border-dashed hover:border-zinc-400 dark:hover:border-zinc-600"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active filter summary */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Filters active:</span>
          {searchQuery && (
            <Badge variant="outline" className="text-[11px] font-normal gap-1 pr-1">
              &ldquo;{searchQuery}&rdquo;
              <button onClick={() => setSearchQuery("")}><X className="h-3 w-3" /></button>
            </Badge>
          )}
          {activeCategory !== "All" && (
            <Badge variant="outline" className="text-[11px] font-normal gap-1 pr-1">
              {activeCategory}
              <button onClick={() => setActiveCategory("All")}><X className="h-3 w-3" /></button>
            </Badge>
          )}
          {activeTags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[11px] font-normal gap-1 pr-1">
              {tag}
              <button onClick={() => toggleTag(tag)}><X className="h-3 w-3" /></button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
