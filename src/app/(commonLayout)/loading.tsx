import { CardGridSkeleton, PageHeaderSkeleton } from "@/components/ui/SkeletonLoaders";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="h-[500px] w-full bg-accent animate-pulse rounded-3xl mb-16" />
      <PageHeaderSkeleton />
      <CardGridSkeleton count={3} />
      <div className="mt-16">
        <PageHeaderSkeleton />
        <CardGridSkeleton count={6} />
      </div>
    </div>
  );
}
