import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { ComponentMetadata } from "@/lib/types"

// Re-export for convenience — server components can import everything from here
export type { ComponentMetadata, Category } from "@/lib/types"
export { CATEGORIES } from "@/lib/types"

const CONTENT_PATH = path.join(process.cwd(), "content/components")

export function getAllComponentsMetadata(): ComponentMetadata[] {
  if (!fs.existsSync(CONTENT_PATH)) {
    return []
  }

  const files = fs.readdirSync(CONTENT_PATH)

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(CONTENT_PATH, file)
      const source = fs.readFileSync(filePath, "utf-8")
      const { data } = matter(source)

      return {
        id: file.replace(".mdx", ""),
        ...data,
      } as ComponentMetadata
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function findComponentFile(dir: string, filename: string): string | null {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const res = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      const found = findComponentFile(res, filename)
      if (found) return found
    } else if (entry.name === filename) {
      return res
    }
  }

  return null
}

export async function getComponentData(id: string) {
  const filePath = path.join(CONTENT_PATH, `${id}.mdx`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }

  const sourceFile = fs.readFileSync(filePath, "utf-8")
  const { content, data } = matter(sourceFile)

  // Find corresponding source code in registry
  let sourceCode = ""
  const registryPath = path.join(process.cwd(), "registry")
  const sourceFilePath = findComponentFile(registryPath, `${id}.tsx`)
  
  if (sourceFilePath) {
    sourceCode = fs.readFileSync(sourceFilePath, "utf-8")
  }

  // Inject source code into content before ## Props
  let finalContent = content
  if (sourceCode) {
    const sourceSection = `\n\n## Source Code\n\n\`\`\`tsx\n${sourceCode}\n\`\`\`\n\n`
    if (finalContent.includes("## Props")) {
      finalContent = finalContent.replace("## Props", `${sourceSection}## Props`)
    } else {
      finalContent += sourceSection
    }
  }

  return {
    id,
    metadata: data as ComponentMetadata,
    content: finalContent,
    sourceCode,
  }
}
