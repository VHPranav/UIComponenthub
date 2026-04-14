import type { Metadata } from "next"
import { Hero } from "@/components/landing/hero"
import { FeaturedGrid } from "@/components/landing/featured-grid"
import { Categories } from "@/components/landing/categories"
import { Footer } from "@/components/landing/footer"

export const metadata: Metadata = {
  title: "UIComponentHub — Beautiful React Components",
  description:
    "A curated collection of open-source, production-ready React components built with Tailwind CSS, TypeScript, and Framer Motion. Copy, paste, ship.",
  openGraph: {
    title: "UIComponentHub — Beautiful React Components",
    description:
      "Open-source React components built with Tailwind CSS and Framer Motion. Copy, paste, ship.",
    url: "https://uicomponenthub.dev",
  },
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedGrid />
      <Categories />
      <div className="flex-1" />
      <Footer />
    </div>
  )
}
