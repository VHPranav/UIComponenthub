"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ComponentMetadata } from "@/lib/types"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { FileText, Laptop, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

interface CommandMenuProps {
  components: ComponentMetadata[]
}

export function CommandMenu({ components }: CommandMenuProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative inline-flex h-9 w-full items-center justify-start rounded-[0.5rem] border bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900 md:w-40 lg:w-64"
      >
        <span className="hidden lg:inline-flex">Search components...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Components">
            {components.map((component) => (
              <CommandItem
                key={component.id}
                value={component.title}
                onSelect={() => {
                  runCommand(() => router.push(`/components/${component.id}`))
                }}
              >
                <FileText className="mr-2 h-4 w-4" />
                <span className="flex-1">{component.title}</span>
                {component.isNew && (
                  <span className="ml-2 flex h-4 items-center rounded-full bg-indigo-500 px-1.5 text-[9px] font-black uppercase text-white shadow-[0_0_8px_rgba(99,102,241,0.5)]">
                    New
                  </span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <Sun className="mr-2 h-4 w-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Laptop className="mr-2 h-4 w-4" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
