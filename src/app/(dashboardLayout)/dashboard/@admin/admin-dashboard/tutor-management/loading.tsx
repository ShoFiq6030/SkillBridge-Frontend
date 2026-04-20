import { TableSkeleton } from "@/components/ui/SkeletonLoaders";

export default function Loading() {
  return <TableSkeleton rows={10} cols={6} />;
}
