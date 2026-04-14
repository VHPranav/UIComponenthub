"use client"

import { useState, useMemo } from "react"
import { ComponentCard } from "@/components/component-card"
import { ComponentFilters } from "@/components/component-filters"
import { AnimatePresence, motion } from "framer-motion"
import { ComponentMetadata, Category } from "@/lib/types"
import { PackageSearch } from "lucide-react"

export function ComponentsListing({ components }: { components: ComponentMetadata[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<Category>("All")
  const [activeTags, setActiveTags] = useState<string[]>([])

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const filteredComponents = useMemo(() => {
    return components.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory === "All" || item.category === activeCategory
      const matchesTags = activeTags.length === 0 || activeTags.every((tag) => item.tags.includes(tag))
      return matchesSearch && matchesCategory && matchesTags
    })
  }, [components, searchQuery, activeCategory, activeTags])

  const hasFilters = searchQuery || activeCategory !== "All" || activeTags.length > 0

  return (
    <div className="flex flex-col space-y-8">
      <ComponentFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeTags={activeTags}
        toggleTag={toggleTag}
      />

      <AnimatePresence mode="popLayout">
        {filteredComponents.length > 0 ? (
          <motion.div
            key="grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredComponents.map((component, index) => (
                <ComponentCard key={component.id} component={component} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="col-span-full py-24 flex flex-col items-center justify-center text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl"
          >
            <PackageSearch className="h-12 w-12 text-zinc-300 dark:text-zinc-700 mb-4" />
            <p className="text-zinc-600 dark:text-zinc-400 font-medium">No components found</p>
            <p className="text-sm text-muted-foreground mt-1">
              {hasFilters ? "Try adjusting your filters or search query." : "Check back soon — more components are on the way."}
            </p>
            {hasFilters && (
              <button
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("All")
                  setActiveTags([])
                }}
                className="mt-5 text-sm font-medium text-primary hover:underline underline-offset-4 transition-all"
              >
                Clear all filters
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Count */}
      {filteredComponents.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-muted-foreground text-center pb-4"
        >
          Showing {filteredComponents.length} of {components.length} components
        </motion.p>
      )}
    </div>
  )
}
