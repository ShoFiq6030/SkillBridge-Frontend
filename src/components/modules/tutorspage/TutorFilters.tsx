"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface TutorFiltersProps {
  categories: { id: string; name: string; slug: string }[];
}

export default function TutorFilters({ categories }: TutorFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ restore all states
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [minHourlyRate, setMinHourlyRate] = useState(
    searchParams.get("minHourlyRate") || "",
  );
  const [maxHourlyRate, setMaxHourlyRate] = useState(
    searchParams.get("maxHourlyRate") || "",
  );
  const [experienceYears, setExperienceYears] = useState(
    searchParams.get("experienceYears") || "",
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sortOrder") || "asc",
  );
  const [isOpen, setIsOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);

  // ✅ fixed function
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    search ? params.set("search", search) : params.delete("search");
    category ? params.set("category", category) : params.delete("category");
    minHourlyRate
      ? params.set("minHourlyRate", minHourlyRate)
      : params.delete("minHourlyRate");
    maxHourlyRate
      ? params.set("maxHourlyRate", maxHourlyRate)
      : params.delete("maxHourlyRate");
    experienceYears
      ? params.set("experienceYears", experienceYears)
      : params.delete("experienceYears");
    sortBy ? params.set("sortBy", sortBy) : params.delete("sortBy");
    sortOrder ? params.set("sortOrder", sortOrder) : params.delete("sortOrder");

    // reset page when filtering
    params.set("page", "1");

    router.push(`/tutors?${params.toString()}`, { scroll: false });
  };
  const sortOptions = [
    { label: "Default", value: "" },
    { label: "Hourly Rate", value: "hourlyRate" },
    { label: "Experience", value: "experienceYears" },
    { label: "Rating", value: "avgRating" },
    { label: "Reviews", value: "totalReviews" },
    { label: "Newest", value: "createdAt" },
  ];

  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false);
      setSortOpen(false);
      setOrderOpen(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleReset = () => {
    router.push("/tutors");
  };

  return (
    <div
      className="bg-card rounded-xl border p-6 mb-8"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          applyFilters();
        }
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search */}
        <div>
          <label className="block text-sm mb-2">Search</label>
          <div className="flex gap-2">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tutor name,bio and headline...."
            />
            {/* <Button onClick={applyFilters}>
              <FaSearch />
            </Button> */}
          </div>
        </div>

        {/* Category */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <label className="block text-sm mb-2">Category</label>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full border rounded-md px-3 py-2 text-left bg-background"
          >
            <div className="absolute right-3 top-10">
              {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {category
              ? categories.find((c) => c.slug === category)?.name
              : "All categories"}
          </button>

          {isOpen && (
            <div className="absolute z-50 mt-1 w-full rounded-md border bg-background shadow-lg">
              <div
                className="px-3 py-2 cursor-pointer hover:bg-muted"
                onClick={() => {
                  setCategory("");
                  setIsOpen(false);
                }}
              >
                All categories
              </div>

              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="px-3 py-2 cursor-pointer hover:bg-muted"
                  onClick={() => {
                    setCategory(cat.slug);
                    setIsOpen(false);
                  }}
                >
                  {cat.name}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Min */}
        <div>
          <label className="block text-sm mb-2">Min Rate</label>
          <Input
            type="number"
            placeholder="Minimum hourly rate... "
            value={minHourlyRate}
            onChange={(e) => setMinHourlyRate(e.target.value)}
          />
        </div>

        {/* Max */}
        <div>
          <label className="block text-sm mb-2">Max Rate</label>
          <Input
            type="number"
            placeholder="Maximum hourly rate..."
            value={maxHourlyRate}
            onChange={(e) => setMaxHourlyRate(e.target.value)}
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm mb-2">Experience</label>
          <Input
            type="number"
            placeholder="year"
            value={experienceYears}
            onChange={(e) => setExperienceYears(e.target.value)}
          />
        </div>

        {/* Sort */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <label className="block text-sm mb-2">Sort By</label>

          <button
            type="button"
            onClick={() => setSortOpen((prev) => !prev)}
            className="w-full border rounded-md px-3 py-2 text-left bg-background"
          >
            <div className="absolute right-3 top-10">
              {sortOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {sortBy
              ? sortOptions.find((opt) => opt.value === sortBy)?.label
              : "Default..."}
          </button>

          {sortOpen && (
            <div className="absolute z-50 mt-1 w-full rounded-md border bg-background shadow-lg">
              {sortOptions.map((opt) => (
                <div
                  key={opt.value}
                  className="px-3 py-2 cursor-pointer hover:bg-muted"
                  onClick={() => {
                    setSortBy(opt.value);
                    setSortOpen(false);
                  }}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <label className="block text-sm mb-2">Order</label>

          <button
            type="button"
            onClick={() => setOrderOpen((prev) => !prev)}
            className="w-full border rounded-md px-3 py-2 text-left bg-background"
          >
            <div className="absolute right-3 top-10">
              {orderOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {sortOrder === "desc" ? "Descending" : "Ascending"}
          </button>

          {orderOpen && (
            <div className="absolute z-50 mt-1 w-full rounded-md border bg-background shadow-lg">
              <div
                className="px-3 py-2 cursor-pointer hover:bg-muted"
                onClick={() => {
                  setSortOrder("asc");
                  setOrderOpen(false);
                }}
              >
                Ascending
              </div>
              <div
                className="px-3 py-2 cursor-pointer hover:bg-muted"
                onClick={() => {
                  setSortOrder("desc");
                  setOrderOpen(false);
                }}
              >
                Descending
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end gap-2">
          <Button variant="outline" onClick={handleReset} className="w-full">
            Reset Filter
          </Button>
          <Button onClick={applyFilters} className="w-full">
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
