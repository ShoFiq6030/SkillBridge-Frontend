// _components/BookingSearchFilter.tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  currentStatus: string;
  currentSearch: string;
  counts: {
    ALL: number;
    CONFIRMED: number;
    COMPLETED: number;
    CANCELLED: number;
  };
}

const FILTERS = [
  { key: "ALL",       label: "All" },
  { key: "CONFIRMED", label: "Confirmed" },
  { key: "COMPLETED", label: "Completed" },
  { key: "CANCELLED", label: "Cancelled" },
] as const;

export function BookingSearchFilter({ currentStatus, currentSearch, counts }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const updateParams = useCallback(
    (status: string, search: string) => {
      const params = new URLSearchParams();
      if (status !== "CONFIRMED") params.set("status", status);
      if (search) params.set("search", search);
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search & Filter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Search by student name or subject..."
          defaultValue={currentSearch}
          onChange={(e) => updateParams(currentStatus, e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <Button
              key={filter.key}
              variant={currentStatus === filter.key ? "default" : "outline"}
              onClick={() => updateParams(filter.key, currentSearch)}
            >
              {filter.label} ({counts[filter.key]})
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}