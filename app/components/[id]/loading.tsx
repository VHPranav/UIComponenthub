import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function Loading() {
  return (
    <div className="xl:grid xl:grid-cols-[1fr_250px] xl:gap-10">
      <div className="mx-auto w-full min-w-0">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center space-x-2 mb-4">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Header skeleton */}
        <div className="space-y-4 mb-10">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-6 w-full max-w-xl" />
        </div>

        {/* Tabs skeleton */}
        <div className="space-y-8">
          <div className="flex space-x-6 border-b pb-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>

          <div className="relative rounded-xl border bg-muted/20 h-[400px] flex items-center justify-center p-8">
             <Skeleton className="h-full w-full rounded-lg" />
          </div>
        </div>

        <Separator className="my-12 opacity-50" />
        
        {/* Ready to use section */}
        <div className="bg-zinc-950 rounded-2xl p-8 border border-dashed text-center">
           <Skeleton className="h-8 w-40 mx-auto mb-2" />
           <Skeleton className="h-4 w-64 mx-auto mb-6" />
           <div className="max-w-md mx-auto">
              <Skeleton className="h-12 w-full rounded-lg" />
           </div>
        </div>
      </div>

      <aside className="hidden xl:block xl:w-[250px] space-y-4">
        <Skeleton className="h-4 w-24 mb-4" />
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-3 w-36" />
      </aside>
    </div>
  )
}
