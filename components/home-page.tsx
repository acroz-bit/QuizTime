import Link from "next/link";
import { ArrowRight, BookOpen, BrainCircuit, Files, Sparkles } from "lucide-react";
import { FadeIn, ScaleIn } from "@/components/motion";

const features = [
  {
    title: "MCQ Rounds",
    description: "Rapid-fire multiple choice practice with instant correction and a cleaner revision loop.",
    icon: BrainCircuit
  },
  {
    title: "Fill Blank Mode",
    description: "Closely related answer choices plus manual input so revision feels sharper, not repetitive.",
    icon: Sparkles
  },
  {
    title: "Case Study Review",
    description: "Long-answer practice with scenario cards, keyword-based checking, and final correction review.",
    icon: Files
  }
];

export function HomePage() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="section-shell">
        <FadeIn className="rounded-[32px] border border-white/10 bg-white/[0.045] p-5 shadow-glow sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Link href="/" className="inline-flex items-center gap-3" data-cursor-target>
              <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-100">
                Quiz Time
              </span>
              <span className="text-sm text-white/60">FSTE and Tech and Policy practice hub</span>
            </Link>

            <div className="flex flex-wrap gap-3">
              <Link
                href="#fste-quize"
                className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/80 transition hover:bg-white/10"
                data-cursor-target
              >
                FSTE
              </Link>
              <Link
                href="#tech-and-policy"
                className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/80 transition hover:bg-white/10"
                data-cursor-target
              >
                Tech and Policy
              </Link>
              <Link
                href="/quiz"
                className="rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/25"
                data-cursor-target
              >
                Start Quiz
              </Link>
            </div>
          </div>
        </FadeIn>

        <section className="relative mt-6 overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.05] px-6 py-16 shadow-glow sm:px-10">
          <div className="absolute inset-0 bg-hero-mesh opacity-90" />
          <div className="absolute inset-0 grid-overlay opacity-40" />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <FadeIn>
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-200/85">Exam Practice Platform</p>
              <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[1.04] text-white sm:text-6xl">
                Quiz Time.
                <br />
                Pick the subject, then open the exact quiz.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/74 sm:text-lg">
                Your question bank now lives inside a polished practice site with FSTE and Tech and Policy sections,
                navigation cards, score review, wrong-answer tracking, and quick movement across all sections.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
                  data-cursor-target
                >
                  Enter Quiz Arena
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#fste-quize"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10"
                  data-cursor-target
                >
                  Explore FSTE
                </a>
              </div>
            </FadeIn>

            <ScaleIn className="relative">
              <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-[32px] bg-cyan-400/10 blur-3xl" />
              <div className="relative rounded-[32px] border border-white/10 bg-slate-950/45 p-6">
                <div className="flex items-center justify-between rounded-[28px] border border-white/10 bg-white/5 px-4 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-white/40">Live Format</p>
                    <p className="mt-2 text-xl font-semibold text-white">Mixed Exam Flow</p>
                  </div>
                  <div className="rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-3 py-2 text-xs font-semibold text-emerald-100">
                    Mixed Subjects
                  </div>
                </div>

                <div className="mt-5 grid gap-4">
                  {[
                    { label: "FSTE", count: "Core systems thinking bank", tint: "from-cyan-300/20 to-sky-400/10" },
                    { label: "Tech and Policy", count: "Week 1-3 now included", tint: "from-emerald-300/20 to-lime-300/10" },
                    { label: "Question Styles", count: "Single, multi-select, blanks, case study", tint: "from-amber-300/20 to-orange-300/10" }
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`rounded-[26px] border border-white/10 bg-gradient-to-r ${item.tint} p-4`}
                    >
                      <p className="text-sm text-white/60">{item.label}</p>
                      <p className="mt-1 text-lg font-semibold text-white">{item.count}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScaleIn>
          </div>
        </section>

        <section id="tech-and-policy" className="pt-8 pb-20">
          <FadeIn className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.38em] text-emerald-200/80">Section</p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">Tech and Policy</h2>
            <p className="mt-5 text-base leading-8 text-white/72">
              Week 1-3 is now part of the quiz flow too, using the same styled format as FSTE while also supporting
              select-all questions and standard fill in the blanks.
            </p>
          </FadeIn>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.045] p-5 shadow-glow sm:p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/55">Module</p>
                <p className="mt-2 text-xl font-semibold text-white">Week 1-3</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/55">Coverage</p>
                <p className="mt-2 text-xl font-semibold text-white">Tech, security, globalization</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/55">Format</p>
                <p className="mt-2 text-xl font-semibold text-white">Mixed assessment bank</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-4">
            <Link
              href="/quiz/tech-and-policy"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
              data-cursor-target
            >
              Open Tech and Policy
              <ArrowRight className="h-4 w-4" />
            </Link>
            </div>
          </div>
        </section>

        <section id="fste-quize" className="py-20">
          <FadeIn className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.38em] text-cyan-200/80">Section</p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">FSTE</h2>
            <p className="mt-5 text-base leading-8 text-white/72">
              This section introduces the main experience: a dedicated exam-style practice space built around your own
              notes, your own patterns, and a much better revision rhythm than static markdown.
            </p>
          </FadeIn>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.045] p-5 shadow-glow sm:p-6">
            <div className="grid gap-4 lg:grid-cols-3">
              {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <FadeIn
                  key={feature.title}
                  delay={index * 0.08}
                  className="rounded-[22px] border border-white/10 bg-white/5 p-5"
                >
                  <div className="inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-100">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/68">{feature.description}</p>
                </FadeIn>
              );
            })}
            </div>

            <div className="mt-5 flex flex-wrap gap-4">
              <Link
                href="/quiz/fste"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
                data-cursor-target
              >
                Open FSTE
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <FadeIn className="mb-10 rounded-[34px] border border-white/10 bg-gradient-to-r from-cyan-300/10 via-transparent to-emerald-300/10 p-8 shadow-glow">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/85">Ready to Practice</p>
              <h3 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
                Open the quiz and test every chapter in one flow.
              </h3>
            </div>
            <Link
              href="/quiz/fste"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
              data-cursor-target
            >
              Open FSTE Quiz
              <BookOpen className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
