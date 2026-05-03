import { CodeTabs } from "@/components/code-tabs"

export const CodeTabsDemo = () => {
  return (
    <div className="w-full max-w-xl mx-auto">
      <CodeTabs
        codes={{
          npm: "npm install @animate-ui/tabs",
          yarn: "yarn add @animate-ui/tabs",
          pnpm: "pnpm add @animate-ui/tabs",
          bun: "bun add @animate-ui/tabs",
        }}
        lang="bash"
      />
    </div>
  )
}
