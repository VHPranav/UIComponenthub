import { ComponentsGridSkeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-6 w-full max-w-2xl" />
        <Skeleton className="h-6 w-3/4 max-w-xl" />
      </div>

      <div className="space-y-4 mb-10">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <Separator className="my-10" />

      <Skeleton className="h-8 w-40 mb-6" />
      <ComponentsGridSkeleton />
    </div>
  )
}
