"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComponentItem } from "@/lib/components-data"
import { Monitor, Code2, Terminal } from "lucide-react"

interface ComponentPreviewProps {
  component: ComponentItem
  children?: React.ReactNode // For actual live component
}

export function ComponentPreview({ component, children }: ComponentPreviewProps) {
  return (
    <div className="w-full space-y-4">
      <Tabs defaultValue="preview" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList className="bg-muted/50 border">
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              Code
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="preview" className="relative mt-4 overflow-hidden rounded-xl border bg-muted/20 min-h-[400px] flex items-center justify-center">
          {/* Subtle noise/grid background for preview area */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '16px 16px' }} 
          />
          
          <div className="z-10 w-full max-w-2xl px-8 flex justify-center">
            {children || (
              <div className="text-muted-foreground flex flex-col items-center gap-2">
                <Terminal className="h-8 w-8 opacity-20" />
                <p className="text-sm font-medium">Component Preview Instance</p>
                <p className="text-xs opacity-50 underline cursor-pointer hover:text-primary transition-colors">
                  Interactive Preview for {component.name}
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="code" className="mt-4">
          <div className="rounded-xl overflow-hidden border">
             {/* The actual CodeBlock is passed from the Parent (Page) usually to keep it Server-Side */}
             <div id="code-content-placeholder">
                {/* SSR code will be injected here or passed as prop */}
             </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Installation Section */}
      <div className="mt-12 space-y-4">
        <div className="flex items-center gap-2 text-foreground/80 font-semibold">
          <Terminal className="h-5 w-5" />
          <h2>Installation</h2>
        </div>
        <div className="bg-zinc-950 rounded-lg p-4 border flex items-center justify-between font-mono text-sm group">
          <code className="text-zinc-300">$ {component.installation}</code>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
             {/* We can re-use CopyButton easily here */}
          </div>
        </div>
      </div>
    </div>
  )
}
