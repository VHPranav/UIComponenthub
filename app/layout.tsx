import type { Metadata, Viewport } from "next"
import { Inter, DM_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { ToastProvider } from "@/components/ui/toast"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          dmSans.variable
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
              <Navbar />
              <main className="flex-1">{children}</main>
            </div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
