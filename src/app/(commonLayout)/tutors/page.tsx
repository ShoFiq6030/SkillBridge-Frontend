import { tutorService, TutorsParams } from "@/services/tutor.service";
import TutorCard from "@/components/layout/TutorCard";
import TutorFilters from "@/components/modules/tutorspage/TutorFilters";
import PaginationControllers from "@/components/ui/Pagination-contollers";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tutor } from "@/types/tutor.type";

interface TutorsPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    category?: string;
    minHourlyRate?: string;
    maxHourlyRate?: string;
    experienceYears?: string;
    sortBy?:
      | "hourlyRate"
      | "experienceYears"
      | "avgRating"
      | "createdAt"
      | "updatedAt"
      | "totalReviews";
    sortOrder?: "asc" | "desc";
  }>;
}

export default async function TutorsPage({ searchParams }: TutorsPageProps) {
  const params = await searchParams;

  const page = parseInt(params.page || "1");
  const limit = parseInt(params.limit || "6");
  const skip = (page - 1) * limit;

  const tutorParams: TutorsParams = {
    page,
    limit,
    skip,
  };

  if (params.search) tutorParams.search = params.search;
  if (params.category) tutorParams.category = params.category;
  if (params.minHourlyRate)
    tutorParams.minHourlyRate = parseFloat(params.minHourlyRate);
  if (params.maxHourlyRate)
    tutorParams.maxHourlyRate = parseFloat(params.maxHourlyRate);
  if (params.experienceYears)
    tutorParams.experienceYears = parseInt(params.experienceYears);
  if (params.sortBy) tutorParams.sortBy = params.sortBy;
  if (params.sortOrder) tutorParams.sortOrder = params.sortOrder;

  const { data: tutorsData, error: tutorsError } =
    await tutorService.getTutors(tutorParams);
  const { data: categoriesData, error: categoriesError } =
    await tutorService.getCategories();

  if (tutorsError || !tutorsData) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center text-destructive">
          {tutorsError?.message || "Failed to load tutors"}
        </div>
      </div>
    );
  }

  const tutors = tutorsData.data || [];
  const pagination = tutorsData.pagination || {
    page: 1,
    totalPages: 1,
    limit,
    total: 0,
  };

  const categories = categoriesData || [];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Tutors</h1>
        <p className="text-muted-foreground">
          Discover expert tutors and book your learning sessions
        </p>
      </div>

      {!categoriesError && categories.length > 0 && (
        <TutorFilters categories={categories} />
      )}

      <PaginationControllers pagination={pagination} />

      {tutors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tutors found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {tutors.map((tutor: Tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        </>
      )}
      <PaginationControllers pagination={pagination} />
    </div>
  );
}
