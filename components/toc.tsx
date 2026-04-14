"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TocItem {
  title: string
  url: string
  level: number
}

export function TableOfContents() {
  const [toc, setToc] = React.useState<TocItem[]>([])
  const [activeId, setActiveId] = React.useState<string>("")

  React.useEffect(() => {
    const headings = Array.from(document.querySelectorAll("h2, h3"))
      .map((heading) => {
        const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, "-") || ""
        heading.id = id
        return {
          title: heading.textContent || "",
          url: `#${id}`,
          level: parseInt(heading.tagName.replace("H", ""))
        }
      })
    setToc(headings)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0% 0% -80% 0%" }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.url.replace("#", ""))
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  if (toc.length === 0) return null

  return (
    <div className="space-y-2">
      <p className="font-medium text-sm">On This Page</p>
      <ul className="m-0 list-none text-sm">
        {toc.map((item) => (
          <li key={item.url} className={cn("mt-0 pt-2", item.level === 3 && "pl-4")}>
            <a
              href={item.url}
              className={cn(
                "inline-block no-underline transition-colors hover:text-foreground",
                activeId === item.url.replace("#", "")
                  ? "font-medium text-foreground underline underline-offset-4"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
