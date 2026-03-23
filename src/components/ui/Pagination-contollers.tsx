"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface PaginationControllersProps {
  pagination: {
    page: number;
    totalPages: number;
    limit: number;
    total: number;
  };
}

export default function PaginationControllers({ pagination }: PaginationControllersProps) {
  const searchParams = useSearchParams();

  
  const buildPaginationUrl = (page: number, limit?: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page.toString());
    params.set("limit", (limit ?? pagination.limit).toString());

    return `?${params.toString()}`;
  };

  return (
    <div className="my-10 flex items-center justify-between">

      {/* ✅ Custom limit selector (no shadcn Select) */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-nowrap">Item per page:</span>

        <div className="flex gap-2">
          {[6, 10, 25, 50, 100].map((limit) => (
            <Link
              key={limit}
              href={buildPaginationUrl(1, limit)}
              className={`px-3 py-1 border rounded-md text-sm ${
                pagination.limit === limit
                  ? "bg-primary text-white dark:text-black"
                  : "hover:bg-muted"
              }`}
            >
              {limit}
            </Link>
          ))}
        </div>
      </div>

      {/* ✅ Pagination */}
      <Pagination>
        <PaginationContent>

          {/* Prev */}
          {pagination.page > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={buildPaginationUrl(pagination.page - 1)}
              />
            </PaginationItem>
          )}

          {/* Prev Page */}
          {pagination.page > 1 && (
            <PaginationItem>
              <PaginationLink href={buildPaginationUrl(pagination.page - 1)}>
                {pagination.page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Current */}
          <PaginationItem>
            <PaginationLink
              href={buildPaginationUrl(pagination.page)}
              isActive
            >
              {pagination.page}
            </PaginationLink>
          </PaginationItem>

          {/* Next Page */}
          {pagination.page < pagination.totalPages && (
            <PaginationItem>
              <PaginationLink
                href={buildPaginationUrl(pagination.page + 1)}
              >
                {pagination.page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Ellipsis */}
          {pagination.page < pagination.totalPages - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Next */}
          {pagination.page < pagination.totalPages && (
            <PaginationItem>
              <PaginationNext
                href={buildPaginationUrl(pagination.page + 1)}
              />
            </PaginationItem>
          )}

        </PaginationContent>
      </Pagination>
    </div>
  );
}