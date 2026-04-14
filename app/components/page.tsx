import type { Metadata } from "next"
import { Suspense } from "react"
import { ComponentsListing } from "@/components/components-listing"
import { ComponentsGridSkeleton } from "@/components/ui/skeleton"
import { getAllComponentsMetadata } from "@/lib/mdx"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Components | UIComponentHub",
  description:
    "Browse 10+ beautifully crafted, open-source React components. Buttons, cards, inputs, loaders and special effects — all built with Tailwind CSS and Framer Motion.",
  openGraph: {
    title: "Components | UIComponentHub",
    description: "Browse production-ready React components built with Tailwind CSS and Framer Motion.",
    url: "https://uicomponenthub.dev/components",
  },
}

function ComponentsList() {
  const components = getAllComponentsMetadata()
  return <ComponentsListing components={components} />
}

export default function ComponentsIndexPage() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight font-display">Introduction</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.
        </p>
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none mb-10">
        <p>
          UIComponentHub is a collection of re-usable components that you can copy and paste into your apps. 
          It's not a component library. It's a collection of re-usable components that you can copy and paste into your apps.
        </p>
        <p>
          <strong>What do you mean by not a component library?</strong> I mean you do not install it as a dependency. It is not available or distributed via npm.
        </p>
      </div>

      <Separator className="my-10" />

      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-6 font-display">Explore the library</h2>
      <Suspense fallback={<ComponentsGridSkeleton />}>
        <ComponentsList />
      </Suspense>
    </div>
  )
}
