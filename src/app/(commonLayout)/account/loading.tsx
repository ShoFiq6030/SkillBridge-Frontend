import { FormSkeleton, PageHeaderSkeleton } from "@/components/ui/SkeletonLoaders";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeaderSkeleton />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 w-full bg-accent animate-pulse rounded" />
          ))}
        </div>
        <div className="lg:col-span-3">
          <FormSkeleton />
        </div>
      </div>
    </div>
  );
}
