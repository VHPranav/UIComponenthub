import { CodeTabs } from "@/components/code-tabs"

export const CodeTabsDemo = () => {
  return (
    <div className="w-full max-w-xl mx-auto">
      <CodeTabs
        codes={{
          "app.tsx": `import { CodeTabs } from "@/components/code-tabs";

export default function App() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <CodeTabs 
        codes={{ bash: "npm run dev" }} 
        lang="bash" 
      />
    </main>
  );
}`,
          "utils.ts": `export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US").format(date);
};`,
          "config.ts": `export const siteConfig = {
  name: "UI Component Hub",
  description: "Beautiful, reusable components built with Tailwind CSS.",
  url: "https://example.com",
};`,
        }}
        lang="tsx"
      />
    </div>
  )
}
