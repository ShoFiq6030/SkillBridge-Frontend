import { FaStar } from "react-icons/fa";
import { RiGlobalLine } from "react-icons/ri";

type HeroSectionProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
};

const profileCards = [
  {
    id: 1,
    name: "Alex",
    role: "Product Designer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    bg: "bg-indigo-300",
    className:
      "top-10 left-0 w-[280px] rotate-[4deg] sm:w-[320px] lg:top-6 lg:left-8",
    rating: 4,
    comment:
      "This course transformed my design skills! The hands-on projects and expert guidance made learning enjoyable and effective. Highly recommend to anyone looking to level up their design game.",
  },
  {
    id: 2,
    name: "Emma",
    role: "Student",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    bg: "bg-fuchsia-300",
    className:
      "top-6 right-0 w-[200px] -rotate-[8deg] sm:w-[230px] lg:top-2 lg:right-0",
    rating: 5,
    comment:
      "Outstanding instruction and engaging content. This course significantly improved my understanding of the subject matter.",
  },
  {
    id: 3,
    name: "Noah",
    role: "Developer",
    image:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=900&q=80",
    bg: "bg-amber-200",
    className:
      "top-[250px] right-[60px] w-[260px] -rotate-[2deg] sm:w-[320px] lg:top-[280px] lg:right-[20px]",
    rating: 4,
    comment:
      "The course content was comprehensive and well-structured. The instructor's expertise and clear explanations made complex topics easy to grasp.",
  },
  {
    id: 4,
    name: "Mia",
    role: "Marketing Lead",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    bg: "bg-emerald-200",
    className:
      "bottom-0 left-[40px] w-[260px] rotate-[3deg] sm:w-[320px] lg:bottom-[-10px] lg:left-[30px]",
    rating: 5,
    comment:
      "I was blown away by the depth of knowledge and practical insights shared in this course. It exceeded my expectations and provided immense value.",
  },
];

function RatingCard({ rating, comment }: { rating: number; comment: string }) {
  return (
    <div className="absolute -top-8 left-0 z-20 flex w-40 h-12 items-center gap-3 rounded-[12px] bg-white px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:left-[220px] lg:-top-8 lg:left-0 animate-bounce ">
      <div className="min-w-0 ">
        <div className="mb-1 flex gap-1 text-stone-300">
          {Array.from({ length: rating }).map((_, i) => (
            <FaStar className="text-yellow-400" />
          ))}
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-800 ">
            {comment.slice(0, 20)}...
          </p>
        </div>
      </div>
    </div>
  );
}

function CourseCard({
  className,
  bg,
  image,
  alt,
  rating,
  comment,
}: {
  className: string;
  bg: string;
  image: string;
  alt: string;
  rating: number;
  comment: string;
}) {
  return (
    <div
      className={`absolute  rounded-[34px] shadow-[12px_16px_0_rgba(255,255,255,0.08)] ${bg} ${className}`}
    >
      <img
        src={image}
        alt={alt}
        className="h-[180px] relative rounded-[34px] w-full object-cover object-top sm:h-[210px] lg:h-[180px]"
      />
      <RatingCard rating={rating} comment={comment} />
    </div>
  );
}

export default function Hero({
  title = "SkillBridge",
  subtitle = "Connect with Expert Tutors, Learn Anything, Anytime.",
  ctaLabel = "Explore our courses",
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#165f00]  text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-y-0 left-[44%] w-px -skew-x-[22deg] bg-white/20 " />
        <div className="absolute inset-y-0 left-[58%] w-px -skew-x-[22deg] bg-white/10 " />
        <div className="absolute inset-y-0 left-[73%] w-px -skew-x-[22deg] bg-white/10 " />
      </div>

      <div className="absolute -left-12 -top-10 h-28 w-28 rounded-[36px] bg-gradient-to-br from-white/35 to-white/5 rotate-[22deg] blur-[1px] animate-pulse" />
      <div className="absolute -left-3 top-0 h-12 w-12 rounded-b-full bg-black/10 animate-pulse" />
      <div className="absolute bottom-10 left-[18%] h-20 w-20 rotate-[35deg] rounded-xl bg-white/10 animate-pulse" />
      <div className="absolute bottom-0 right-0 h-16 w-16 rounded-tl-[28px] bg-white/12 animate-pulse" />

      <div className="relative mx-auto grid h-[90vh] max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.05fr_1fr] lg:px-10 lg:py-10">
        {/* hero  left side  */}
        <div className="max-w-xl">
          <h1 className="text-3xl font-extrabold leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-5xl">
            {/* <span>{title}</span> */}
            <span className="mt-3 block font-serif text-[#f1d447] italic">
              Expert Tutors
              <svg
                viewBox="0 0 240 18"
                className="mt-1 h-4 w-[220px] text-[#f1d447]"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 13.5C56.5 5.5 117.5 3.5 237 11"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="mt-1 block">to enhance</span>
            <span className="mt-1 block">your professional </span>
            <span className="font-serif italic text-[#f1d447]">Skills</span>
          </h1>

          <p className="mt-8 max-w-lg text-base text-white/90 sm:text-lg">
            {subtitle}
          </p>

          <button className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#ff6b2c] px-8 py-5 text-lg font-semibold text-white shadow-[0_18px_45px_rgba(255,107,44,0.28)] transition hover:-translate-y-0.5">
            {ctaLabel}
            <span aria-hidden="true" className="text-2xl leading-none">
              →
            </span>
          </button>

          <div className="mt-12 flex flex-wrap items-center gap-4 text-lg">
            <div className="flex items-center gap-1 text-[#ffb01f]">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <p className="text-white/95">Based on 1000+ reviews from</p>
            <div className="flex items-center ">
              <RiGlobalLine size={20} />
            </div>
          </div>
        </div>
        {/* hero right  */}
        <div className="relative min-h-[560px] lg:min-h-[520px]">
          {profileCards.map((card) => (
            <div>
              <CourseCard
                key={card.id}
                className={card.className}
                bg={card.bg}
                image={card.image}
                alt={card.name}
                rating={card.rating}
                comment={card.comment}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
