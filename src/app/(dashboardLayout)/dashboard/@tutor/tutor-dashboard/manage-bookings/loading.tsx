import { TableSkeleton } from "@/components/ui/SkeletonLoaders";

export default function Loading() {
  return <TableSkeleton rows={8} cols={5} />;
}
