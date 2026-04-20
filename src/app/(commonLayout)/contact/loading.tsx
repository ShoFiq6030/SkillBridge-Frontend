import { FormSkeleton, PageHeaderSkeleton } from "@/components/ui/SkeletonLoaders";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeaderSkeleton />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 w-full bg-accent animate-pulse rounded-xl" />
          ))}
        </div>
        <div className="md:col-span-2">
          <FormSkeleton />
        </div>
      </div>
    </div>
  );
}
