"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Ensure component is mounted before rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current
    if (!button || !mounted) return

    const isDark = resolvedTheme === "dark"
    const { top, left, width, height } = button.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    
    const viewportWidth = window.visualViewport?.width ?? window.innerWidth
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight
    const maxRadius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y)
    )

    const applyTheme = () => {
      setTheme(isDark ? "light" : "dark")
    }

    // Handle browsers that don't support View Transition API
    if (!document.startViewTransition) {
      applyTheme()
      return
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        applyTheme()
      })
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    })
  }, [resolvedTheme, mounted, setTheme, duration])

  if (!mounted) {
    return (
      <button className={cn("p-2 opacity-0", className)} {...props}>
        <div className="h-5 w-5" />
      </button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        "relative rounded-full p-2 hover:bg-muted transition-colors outline-none",
        className
      )}
      {...props}
    >
      <div className="relative h-5 w-5 pointer-events-none">
        <Sun className={cn(
          "h-full w-full transition-all duration-300 absolute inset-0",
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
        )} />
        <Moon className={cn(
          "h-full w-full transition-all duration-300 absolute inset-0",
          isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        )} />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
