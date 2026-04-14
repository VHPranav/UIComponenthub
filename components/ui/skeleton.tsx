import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-zinc-200 dark:bg-zinc-800",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        "before:animate-[shimmer_1.5s_infinite]",
        className
      )}
      {...props}
    />
  )
}

export function ComponentCardSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col">
      {/* Preview area */}
      <Skeleton className="h-40 w-full rounded-none" />
      {/* Content */}
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        {/* Tags */}
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function ComponentsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <ComponentCardSkeleton key={i} />
      ))}
    </div>
  )
}

export { Skeleton }
