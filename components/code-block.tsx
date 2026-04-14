import { codeToHtml } from "shiki"
import { CopyButton } from "@/components/copy-button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

export async function CodeBlock({ code, language = "tsx", filename }: CodeBlockProps) {
  const html = await codeToHtml(code?.trim() ?? "", {
    lang: language,
    theme: "github-dark",
  })

  return (
    <div className="relative group rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 my-6 shadow-xl shadow-black/20">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/80">
        <div className="flex items-center gap-2">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/70" />
            <div className="h-3 w-3 rounded-full bg-amber-500/70" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/70" />
          </div>
          {filename && (
            <span className="text-xs text-zinc-500 font-mono ml-1">{filename}</span>
          )}
          {!filename && (
            <span className="text-xs text-zinc-600 font-mono ml-1">{language}</span>
          )}
        </div>
        <CopyButton
          value={code}
          variant="ghost"
          successMessage="Code copied!"
          className="opacity-60 group-hover:opacity-100 h-7 w-7"
        />
      </div>

      {/* Code */}
      <ScrollArea className="max-h-[560px] w-full">
        <div
          className="p-5 text-[13px] font-mono leading-6 [&>pre]:!bg-transparent [&>pre]:!p-0 overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </ScrollArea>
    </div>
  )
}
