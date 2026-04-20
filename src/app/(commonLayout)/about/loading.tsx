import { PageHeaderSkeleton } from "@/components/ui/SkeletonLoaders";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <PageHeaderSkeleton />
      <div className="aspect-video w-full bg-accent animate-pulse rounded-3xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="h-8 w-48 bg-accent animate-pulse rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-accent animate-pulse rounded" />
            <div className="h-4 w-full bg-accent animate-pulse rounded" />
            <div className="h-4 w-2/3 bg-accent animate-pulse rounded" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-8 w-48 bg-accent animate-pulse rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-accent animate-pulse rounded" />
            <div className="h-4 w-full bg-accent animate-pulse rounded" />
            <div className="h-4 w-2/3 bg-accent animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
