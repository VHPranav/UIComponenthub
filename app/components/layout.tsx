import { ComponentsSidebar } from "@/components/components-sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { getAllComponentsMetadata } from "@/lib/mdx"
import { ComponentMetadata } from "@/lib/types"

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const components = getAllComponentsMetadata()
  
  // Group components by category
  const groupedComponents = components.reduce((acc, component) => {
    const category = component.category || "Uncategorized"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(component)
    return acc
  }, {} as Record<string, ComponentMetadata[]>)

  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 mx-auto px-4 md:px-8">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto pt-8 pr-6 border-r">
        <ComponentsSidebar items={groupedComponents} />
      </aside>
      <main className="relative py-6 lg:gap-10 lg:py-8">
        <MobileNav 
          items={groupedComponents} 
          allComponents={components} 
        />
        {children}
      </main>
    </div>
  )
}
