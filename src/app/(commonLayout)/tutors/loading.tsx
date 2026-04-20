import { CardGridSkeleton, PageHeaderSkeleton } from "@/components/ui/SkeletonLoaders";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-20 bg-accent animate-pulse rounded" />
              <div className="h-10 w-full bg-accent animate-pulse rounded" />
            </div>
          ))}
        </div>
        <div className="flex-1">
          <PageHeaderSkeleton />
          <CardGridSkeleton count={6} />
        </div>
      </div>
    </div>
  );
}
