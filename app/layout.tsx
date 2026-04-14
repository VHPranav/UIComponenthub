import type { Metadata, Viewport } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { getAllComponentsMetadata } from "@/lib/mdx"
import { ToastProvider } from "@/components/ui/toast"
import { cn } from "@/lib/utils"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://uicomponenthub.dev"),
  title: {
    default: "UIComponentHub — Beautiful React Components",
    template: "%s | UIComponentHub",
  },
  description:
    "A curated collection of open-source, production-ready React components built with Tailwind CSS, TypeScript, and Framer Motion. Copy, paste, ship.",
  keywords: [
    "React components",
    "Tailwind CSS",
    "UI library",
    "TypeScript",
    "Framer Motion",
    "shadcn",
    "open source",
  ],
  authors: [{ name: "UIComponentHub" }],
  creator: "UIComponentHub",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://uicomponenthub.dev",
    title: "UIComponentHub — Beautiful React Components",
    description:
      "A curated collection of open-source, production-ready React components built with Tailwind CSS and Framer Motion.",
    siteName: "UIComponentHub",
  },
  twitter: {
    card: "summary_large_image",
    title: "UIComponentHub — Beautiful React Components",
    description:
      "A curated collection of open-source, production-ready React components built with Tailwind CSS and Framer Motion.",
    creator: "@uicomponenthub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const components = getAllComponentsMetadata()

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          dmSans.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar components={components} />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
