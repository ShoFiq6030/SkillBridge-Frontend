import React from "react";
import { GraduationCap, Users, BookOpen } from "lucide-react";

const FloatCard = ({
  icon,
  className,
}: {
  icon: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`absolute z-20 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-sm dark:border-neutral-700/70 dark:bg-neutral-800/80 ${className}`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
        {icon}
      </div>
      <div className="space-y-2">
        <div className="h-2.5 w-16 rounded-full bg-neutral-200 dark:bg-neutral-700" />
        <div className="h-2.5 w-10 rounded-full bg-neutral-100 dark:bg-neutral-600" />
      </div>
    </div>
  );
};

export default function LearningHeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[32px] bg-[#f5f3f1] dark:bg-neutral-900 px-6 py-16 md:px-10 lg:px-16 lg:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-[#20130d] dark:text-white md:text-5xl">
            Accessing your{" "}
            <span className="font-serif italic font-medium">course</span>
            anywhere to learn new skill for grow your{" "}
            <span className="font-serif italic font-medium text-[#f47c4d] dark:text-orange-400">
              Career
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400 md:text-base">
            In recent years, the popularity of online learning has surged,
            providing individuals with a flexible and convenient avenue to
            pursue education.
          </p>
        </div>

        <div className="relative mx-auto mt-12 w-full max-w-5xl px-4 md:px-8">
          <FloatCard
            icon={<GraduationCap className="h-5 w-5" />}
            className="-top-4 right-6 md:right-10"
          />
          <FloatCard
            icon={<Users className="h-5 w-5" />}
            className="bottom-6 left-0 md:left-2"
          />
          <FloatCard
            icon={<BookOpen className="h-5 w-5" />}
            className="bottom-10 right-0 md:right-2"
          />

          <div className="relative overflow-hidden rounded-[28%_28%_28%_28%/20%_20%_20%_20%] bg-white dark:bg-neutral-800 shadow-[0_25px_80px_rgba(0,0,0,0.08)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.3)]">
            

            <div className="aspect-16/7 w-full">
              <video
                src={"/skill-bridge.video.mp4"}
                autoPlay
                muted
                loop
                playsInline
                // controls
                className="h-full w-full object-cover"
                poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
