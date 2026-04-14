import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, Terminal } from "lucide-react"
import { getComponentData, getAllComponentsMetadata } from "@/lib/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import { registry } from "@/registry"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block"
import { TableOfContents } from "@/components/toc"
import { Breadcrumbs } from "@/components/breadcrumbs"

interface ComponentPageProps {
  params: { id: string }
}

export async function generateStaticParams() {
  const components = getAllComponentsMetadata()
  return components.map((c) => ({ id: c.id }))
}

export async function generateMetadata({ params }: ComponentPageProps): Promise<Metadata> {
  const data = await getComponentData(params.id)
  if (!data) return { title: "Component Not Found" }

  const { metadata } = data
  return {
    title: `${metadata.title} | UIComponentHub`,
    description: metadata.description,
    openGraph: {
      title: `${metadata.title} | UIComponentHub`,
      description: metadata.description,
      url: `https://uicomponenthub.dev/components/${params.id}`,
    },
  }
}

const mdxComponents = {
  h1: (props: React.ComponentPropsWithoutRef<"h1">) => (
    <h1 className="mt-8 scroll-m-20 text-3xl font-bold tracking-tight" {...props} />
  ),
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0" {...props} />
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight" {...props} />
  ),
  p: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p className="mt-6 leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground" {...props} />
  ),
  code: (props: React.ComponentPropsWithoutRef<"code">) => (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.1rem] font-mono text-sm font-semibold" {...props} />
  ),
  pre: ({ children }: React.ComponentPropsWithoutRef<"pre">) => {
    const el = children as React.ReactElement<{ children: string; className?: string }>
    const code = el?.props?.children ?? ""
    const language = el?.props?.className?.replace("language-", "") || "tsx"
    return <CodeBlock code={code} language={language} />
  },
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const componentData = await getComponentData(params.id)
  const allComponents = getAllComponentsMetadata()
  if (!componentData) notFound()

  const { metadata, content } = componentData
  const PreviewComponent = registry[params.id]

  return (
    <div className="xl:grid xl:grid-cols-[1fr_250px] xl:gap-10">
      <div className="mx-auto w-full min-w-0">
        <Breadcrumbs 
          components={allComponents} 
          currentTitle={metadata.title} 
        />

        <div className="space-y-4 mb-10">
          <h1 className="text-4xl font-bold tracking-tight font-display">{metadata.title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            {metadata.description}
          </p>
        </div>

        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 gap-6">
            <TabsTrigger 
              value="preview" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-2 text-sm font-medium"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger 
              value="code" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-2 text-sm font-medium"
            >
              Code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="mt-8">
            <div className="relative overflow-hidden rounded-xl border bg-muted/20 min-h-[400px] flex items-center justify-center p-8">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                   style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} 
              />
              <div className="z-10 w-full flex justify-center">
                {PreviewComponent ? (
                  <PreviewComponent />
                ) : (
                  <div className="text-muted-foreground text-sm italic text-center">
                    Component implementation not found in registry.
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="code" className="mt-8">
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <MDXRemote source={content} components={mdxComponents} />
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-12 opacity-50" />
        
        <div className="bg-zinc-950 rounded-2xl p-8 border border-dashed text-center">
           <h2 className="text-xl font-bold mb-2">Ready to use?</h2>
           <p className="text-muted-foreground mb-6">Installation instructions for CLI coming soon. For now, copy the source directly.</p>
           <div className="max-w-md mx-auto relative group">
              <div className="bg-zinc-900/50 rounded-lg p-3 pl-4 text-left border overflow-hidden flex items-center justify-between">
                 <code className="text-zinc-300 font-mono text-sm truncate">npx shadcn@latest add {params.id}</code>
                 <Terminal className="h-4 w-4 text-zinc-500" />
              </div>
           </div>
        </div>
      </div>

      <aside className="hidden xl:sticky xl:top-20 xl:block xl:h-[calc(100vh-5rem)] xl:w-[250px] xl:shrink-0">
        <div className="sticky top-20">
          <TableOfContents />
        </div>
      </aside>
    </div>
  )
}
