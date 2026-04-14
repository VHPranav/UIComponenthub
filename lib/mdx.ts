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

export async function getComponentData(id: string) {
  const filePath = path.join(CONTENT_PATH, `${id}.mdx`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }

  const source = fs.readFileSync(filePath, "utf-8")
  const { content, data } = matter(source)

  return {
    id,
    metadata: data as ComponentMetadata,
    content,
  }
}
