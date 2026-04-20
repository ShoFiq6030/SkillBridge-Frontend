import { FormSkeleton } from "@/components/ui/SkeletonLoaders";

export default function Loading() {
  return (
    <div className="container mx-auto max-w-2xl py-10">
      <FormSkeleton />
    </div>
  );
}
