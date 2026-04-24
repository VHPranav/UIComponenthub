// Shared types and constants — safe to import in both client and server components
// Do NOT import 'fs', 'path', or any other Node.js-only modules here.

export const CATEGORIES = [
  "All",
  "Buttons",
  "Cards",
  "Inputs",
  "Animations",
  "Special Effects",
  "Backgrounds",
  "Navigation",
] as const

export type Category = (typeof CATEGORIES)[number]

export interface ComponentMetadata {
  id: string
  title: string
  description: string
  category: Category
  tags: string[]
  date: string
  isNew?: boolean
}
