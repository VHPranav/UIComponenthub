"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/toast"

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string
  variant?: "default" | "outline" | "ghost"
  successMessage?: string
}

export function CopyButton({
  value,
  className,
  variant = "ghost",
  successMessage = "Copied to clipboard!",
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)
  const { toast } = useToast()

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
      setHasCopied(true)
      toast(successMessage, "success")
      setTimeout(() => setHasCopied(false), 2000)
    } catch {
      toast("Failed to copy. Please try manually.", "error")
    }
  }, [value, successMessage, toast])

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn(
        "relative z-10 h-8 w-8 transition-all duration-200",
        "text-zinc-400 hover:text-white hover:bg-zinc-700",
        hasCopied && "text-emerald-400 hover:text-emerald-400",
        className
      )}
      onClick={handleCopy}
      aria-label={hasCopied ? "Copied!" : "Copy code"}
      {...props}
    >
      <span className="sr-only">{hasCopied ? "Copied" : "Copy"}</span>
      <div className="relative h-4 w-4">
        <Copy
          className={cn(
            "h-4 w-4 absolute inset-0 transition-all duration-200",
            hasCopied ? "scale-0 opacity-0" : "scale-100 opacity-100"
          )}
        />
        <Check
          className={cn(
            "h-4 w-4 absolute inset-0 transition-all duration-200",
            hasCopied ? "scale-100 opacity-100" : "scale-0 opacity-0"
          )}
        />
      </div>
    </Button>
  )
}
