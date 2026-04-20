import { TableSkeleton } from "@/components/ui/SkeletonLoaders";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="h-8 w-48 bg-accent animate-pulse rounded" />
        <div className="h-10 w-32 bg-accent animate-pulse rounded" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-32 w-full bg-accent animate-pulse rounded-xl" />
        ))}
      </div>
    </div>
  );
}
