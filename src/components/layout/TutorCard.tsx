import { Tutor } from "@/types";
import FavoriteButton from "./FavoriteButton";
import Link from "next/link";


export default function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <article
      key={tutor.id}
      className="group overflow-hidden rounded-[22px] border border-[#ece7e2] dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-[0_14px_40px_rgba(15,15,15,0.05)] dark:shadow-[0_14px_40px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,15,15,0.08)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
    >
      <div className="relative h-48 overflow-hidden">
        {/* <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                /> */}
        <div className="absolute h-40 w-40 top-8 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700 z-10">
          {tutor.user.image ? (
            <img
              src={tutor.user.image}
              alt={tutor.user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
              alt="Instructor"
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="absolute inset-0 bg-linear-to-br from-[#943cff]/60 via-[#6d47ff]/40 to-[#1d5cff]/50 " />

        <span className="absolute left-4 top-4 rounded-full bg-[#ff7a3d] px-3 py-1 text-xs font-semibold text-white z-10">
          Trending
        </span>

        <FavoriteButton />

        <div className="absolute bottom-4 left-32 rounded-full bg-[#ff7a3d] px-3 py-2 text-xs font-semibold text-white shadow-lg z-10">
          {`$${tutor.hourlyRate}/hr`}
        </div>
      </div>

      <div className="p-5">
        <div
          className=" flex items-center gap-2 text-md text-black dark:text-white font-semibold capitalize
"
        >
          <span>{tutor.user.name}</span>
        </div>
        <div className="mb-1 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <span>{tutor.bio}</span>
        </div>

        <h3
          className="line-clamp-2 min-h-14 text-lg font-semibold leading-7 text-[#221611] dark:text-white capitalize
"
        >
          {tutor.headline}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-1">
            <span className="text-[#ff7a3d]">•</span>
            {tutor.experienceYears} Years of Experience
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#ff7a3d]">•</span>
            {tutor.avgRating} Rating
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#ff7a3d]">•</span>
            {tutor.totalReviews} Reviews
          </span>
        </div>

        <Link href={`/tutors/${tutor.id}`} className="mt-5 inline-flex items-center rounded-full border border-[#ff7a3d] px-5 py-2 text-sm font-medium text-[#ff7a3d] transition hover:bg-[#ff7a3d] hover:text-white">
          Book a Slot →
        </Link>
      </div>
    </article>
  );
}
