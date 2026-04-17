import { Tutor } from "@/types";
import FavoriteButton from "./FavoriteButton";
import Link from "next/link";
import { Star, Flame, Clock } from "lucide-react";

export default function TutorCard({
  tutor,
  isTrending = false,
}: {
  tutor: Tutor;
  isTrending?: boolean;
}) {
  return (
    <article className="group h-full overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:border-neutral-700 dark:bg-slate-900/95">
      {/* Header Image Section */}
      <div className="relative h-56 overflow-hidden bg-linear-to-br from-primary/10 via-background to-primary/5 dark:from-primary/20 dark:via-slate-800 dark:to-primary/10">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Profile Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-44 w-44 overflow-hidden rounded-full border-4 border-card bg-muted dark:border-slate-700 dark:bg-slate-800 shadow-lg">
            {tutor.user.image ? (
              <img
                src={tutor.user.image}
                alt={tutor.user.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                alt="Instructor"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            )}
          </div>
        </div>

        {/* Badge Section - Top Left */}
        {isTrending && (
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/95 px-3 py-1 text-xs font-semibold text-primary-foreground shadow-lg backdrop-blur-sm">
              <Flame className="h-3 w-3" />
              Trending
            </span>
          </div>
        )}

        {/* Favorite Button - Top Right */}
        <div className="absolute right-4 top-4 z-20">
          <FavoriteButton />
        </div>

        {/* Price Badge - Bottom Right */}
        <div className="absolute bottom-4 right-4 rounded-full bg-primary/95 px-4 py-2 text-sm font-bold text-primary-foreground shadow-lg backdrop-blur-sm">
          ${tutor.hourlyRate}/hr
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-4 p-6">
        {/* Name */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground capitalize tracking-tight">
            {tutor.user.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {tutor.bio}
          </p>
        </div>

        {/* Headline */}
        <p className="line-clamp-2 min-h-10 text-sm font-medium text-foreground leading-5">
          {tutor.headline}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 py-3 border-y border-border dark:border-neutral-700">
          <div className="flex flex-col items-center gap-1 px-2">
            <div className="flex items-center gap-1 text-primary font-semibold text-sm">
              <Star className="h-4 w-4 fill-primary" />
              {tutor.avgRating}
            </div>
            <span className="text-xs text-muted-foreground">Rating</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-2 border-x border-border dark:border-neutral-700">
            <div className="flex items-center gap-1 text-primary font-semibold text-sm">
              <Clock className="h-4 w-4" />
              {tutor.experienceYears}
            </div>
            <span className="text-xs text-muted-foreground">Years</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-2">
            <div className="font-semibold text-primary text-sm">
              {tutor.totalReviews}
            </div>
            <span className="text-xs text-muted-foreground">Reviews</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={`/tutors/${tutor.id}`}
          className="group/btn relative mt-2 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 active:scale-95"
        >
          <span>View Profile</span>
          <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
