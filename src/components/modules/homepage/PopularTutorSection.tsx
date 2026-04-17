import { tutorService } from "@/services/tutor.service";
import { Tutor } from "@/types";
import TutorCard from "../../layout/TutorCard";
import Link from "next/link";

export default async function PopularTutorSection() {
  const { data, error } = await tutorService.getTutors(
    {
      limit: 10,
      sortBy: "createdAt",
      sortOrder: "desc",
    },
    {
      cache: "force-cache",
      revalidate: 60, // Revalidate every 60 seconds
    },
  );
  // console.log(data);
  const tutors: Tutor[] = data.data;

  return (
    <section className="bg-[#f5f3f1] dark:bg-neutral-900 px-6 py-16 md:px-10 lg:px-16 lg:py-20 rounded-4xl">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="mx-auto ">
            <h2 className="text-3xl flex flex-col items-center justify-center font-semibold leading-tight tracking-tight text-[#1d120d] dark:text-white md:text-4xl">
              <p>Explore popular</p>
              <span className="font-serif italic mx-auto font-medium text-[#f47c4d]">
                Tutor
              </span>
            </h2>
          </div>

          {/* <div className="flex flex-wrap items-center gap-2">
            {[
              { label: "All", active: true },
              { label: "Trending" },
              { label: "Popular" },
              { label: "Featured" },
            ].map((item) => (
              <button
                key={item.label}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  item.active
                    ? "border-[#ff7a3d] bg-[#ff7a3d] text-white"
                    : "border-[#ebe7e3] bg-white text-neutral-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 hover:border-[#ff7a3d] hover:text-[#ff7a3d] dark:hover:border-[#ff7a3d] dark:hover:text-[#ff7a3d]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div> */}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {tutors.length === 0 ? (
            <div className="col-span-full text-center text-muted-foreground">
              No tutors found.
            </div>
          ) : error ? (
            <div className="col-span-full text-center text-destructive">
              Error loading tutors.
            </div>
          ) : (
            tutors.map((tutor: Tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} isTrending={true} />
            ))
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/tutors"
            className="inline-flex items-center rounded-full bg-[#ff7a3d] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 dark:shadow-none transition hover:translate-y-px hover:bg-[#f06f33]"
          >
            Browse More →
          </Link>
        </div>
      </div>
    </section>
  );
}
