import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto px-4 md:px-8">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <Link
            href="https://github.com/VHPranav"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Pranav
          </Link>
          . The source code is available on{" "}
          <Link
            href="https://github.com/VHPranav/UIComponenthub"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
          >
            GitHub
          </Link>
          .
        </p>
        <p className="text-sm text-muted-foreground font-display tracking-tight">
          © {new Date().getFullYear()} UIComponentHub. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
