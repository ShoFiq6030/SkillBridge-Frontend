const stats = [
  { label: "Expert tutors", value: "120+" },
  { label: "Subjects covered", value: "35+" },
  { label: "Satisfied learners", value: "4.9/5" },
  { label: "Secure bookings", value: "100%" },
];

const values = [
  {
    title: "Trusted mentoring",
    description:
      "We connect learners with committed tutors who deliver thoughtful guidance, honest feedback, and flexible session plans.",
  },
  {
    title: "Flexible scheduling",
    description:
      "Book sessions that fit your routine with a clear calendar, real-time availability, and smooth booking flow.",
  },
  {
    title: "Modern learning tools",
    description:
      "A clean interface, role-based dashboards, and responsive layouts designed for both students and tutors.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      <div className="relative overflow-hidden py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-linear-to-b from-orange-200/70 via-transparent to-transparent dark:from-orange-500/20" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-8">
              <span className="inline-flex rounded-full bg-accent/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-accent-foreground dark:bg-accent/20">
                About SkillBridge
              </span>
              <div className="space-y-6">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  A smarter way to learn, teach, and grow together.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                  SkillBridge brings students and tutors together with a
                  polished dashboard, reliable booking tools, and a fresh
                  interface built for both light and dark environments.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="/register"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90"
                >
                  Get started
                </a>
                <a
                  href="/tutors"
                  className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
                >
                  Browse tutors
                </a>
              </div>
            </div>
            <div className="rounded-[2rem] border border-border bg-white/90 p-8 shadow-[0_28px_70px_rgba(15,15,15,0.08)] backdrop-blur-xl dark:border-neutral-700 dark:bg-slate-950/95 dark:shadow-[0_28px_70px_rgba(0,0,0,0.45)]">
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                    Why we exist
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold text-foreground">
                    Built for learners and tutors who want everyday progress.
                  </h2>
                </div>
                <p className="text-base leading-7 text-muted-foreground">
                  From booking the right tutor to managing sessions and staying
                  motivated, SkillBridge simplifies the whole process with a
                  dependable, modern learning experience.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {stats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-3xl border border-border bg-background/80 p-5 shadow-sm dark:border-neutral-800 dark:bg-slate-900/80"
                    >
                      <p className="text-3xl font-semibold text-foreground">
                        {item.value}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <section className="rounded-[2rem] border border-border bg-white/90 p-8 shadow-[0_20px_60px_rgba(15,15,15,0.05)] dark:border-neutral-700 dark:bg-slate-950/95 dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-foreground">
              Our mission
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-foreground">
              Empower learning with clarity.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              We want every student to feel confident choosing their next tutor,
              and every tutor to feel supported with the tools they need to
              teach more effectively.
            </p>
          </section>

          <section className="rounded-[2rem] border border-border bg-white/90 p-8 shadow-[0_20px_60px_rgba(15,15,15,0.05)] dark:border-neutral-700 dark:bg-slate-950/95 dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-foreground">
              How it works
            </p>
            <ol className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground">
              <li>
                <span className="font-semibold text-foreground">
                  Discover tutors:
                </span>{" "}
                Browse profiles, reviews, and specialties in one clean listing.
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  Book in seconds:
                </span>{" "}
                Choose an available slot, confirm your session, and keep your
                schedule in sync.
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  Learn confidently:
                </span>{" "}
                Track your progress, manage sessions, and keep communication
                clear.
              </li>
            </ol>
          </section>

          <section className="rounded-[2rem] border border-border bg-white/90 p-8 shadow-[0_20px_60px_rgba(15,15,15,0.05)] dark:border-neutral-700 dark:bg-slate-950/95 dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-foreground">
              Core values
            </p>
            <div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground">
              {values.map((item) => (
                <div key={item.title}>
                  <h3 className="font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
