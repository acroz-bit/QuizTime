"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, ChartColumn, Gamepad2, Sparkles } from "lucide-react";
import { FadeIn, ScaleIn } from "@/components/motion";
import { testimonials } from "@/lib/sample-data";

const solutionCards = [
  {
    title: "Animations",
    copy: "Concepts unfold frame by frame so formulas and processes feel intuitive.",
    icon: Sparkles
  },
  {
    title: "Infographics",
    copy: "Dense chapters turn into visual maps, hierarchy stacks, and memory anchors.",
    icon: ChartColumn
  },
  {
    title: "Micro-learning",
    copy: "Lessons are chunked into short bursts built for low attention bandwidth.",
    icon: BrainCircuit
  },
  {
    title: "Gamification",
    copy: "XP, streaks, and quizzes keep momentum alive without making learning feel childish.",
    icon: Gamepad2
  }
];

const pricing = [
  { name: "Starter", price: "$0", blurb: "For curious learners", features: "3 courses, streak tracking, AI previews" },
  { name: "Pro", price: "$12", blurb: "For exam-ready consistency", features: "Unlimited courses, quizzes, dashboards" },
  { name: "Team", price: "$29", blurb: "For coaching batches", features: "Shared analytics, cohorts, leaderboard access" }
];

export function LandingPage() {
  return (
    <div className="overflow-hidden">
      <section className="relative">
        <div className="absolute inset-0 bg-hero-mesh opacity-100" />
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="section-shell relative pb-24 pt-24 sm:pb-36 sm:pt-28">
          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
            <FadeIn className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                Built for attention-light learners
              </div>
              <h1 className="mt-8 text-5xl font-semibold leading-tight text-white sm:text-7xl">
                Learn Smarter,
                <span className="block bg-gradient-to-r from-white via-cyan-100 to-sky-300 bg-clip-text text-transparent">
                  Not Harder
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
                Turn boring content into visual learning with animations, infographics, micro-lessons,
                and game loops that make revision feel fast and rewarding.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20"
                >
                  Start Learning
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="#how-it-works"
                  className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10"
                >
                  Watch Demo
                </Link>
              </div>
              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {[
                  ["120K+", "visual learning sessions"],
                  ["87%", "weekly learner retention"],
                  ["4.9/5", "student delight score"]
                ].map(([value, label]) => (
                  <div key={label} className="glass-panel rounded-[24px] p-5">
                    <p className="text-2xl font-semibold text-white">{value}</p>
                    <p className="mt-2 text-sm text-white/55">{label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <ScaleIn className="relative">
              <div className="glass-panel relative overflow-hidden rounded-[32px] p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/10 via-transparent to-fuchsia-300/10" />
                <div className="relative grid gap-4">
                  <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-5">
                    <div className="flex items-center justify-between text-sm text-white/55">
                      <span>Biology Cells</span>
                      <span>Lesson 4</span>
                    </div>
                    <div className="mt-4 h-48 rounded-[24px] bg-gradient-to-br from-emerald-300/40 via-teal-300/15 to-transparent p-6">
                      <motion.div
                        className="h-full w-full rounded-[24px] border border-white/10 bg-white/5"
                        animate={{ rotate: [0, 2, -1, 0], y: [0, -6, 4, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 10 }}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                      <p className="text-sm text-white/55">XP Boost</p>
                      <p className="mt-2 text-3xl font-semibold text-cyan-200">+120 XP</p>
                    </div>
                    <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                      <p className="text-sm text-white/55">Streak</p>
                      <p className="mt-2 text-3xl font-semibold text-fuchsia-200">14 days</p>
                    </div>
                  </div>
                </div>
              </div>
              <motion.div
                className="absolute -left-8 top-10 h-24 w-24 rounded-full bg-cyan-300/20 blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.75, 0.3] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4 }}
              />
              <motion.div
                className="absolute -bottom-10 right-0 h-36 w-36 rounded-full bg-fuchsia-300/20 blur-3xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.6, 0.25] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5 }}
              />
            </ScaleIn>
          </div>
        </div>
      </section>

      <section className="section-shell py-24" id="problem">
        <FadeIn className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/75">The problem</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
            Most online lessons still feel like static PDFs pretending to be products.
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <FadeIn className="glass-panel rounded-[32px] p-8" delay={0.1}>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                ["63%", "drop off in long text lessons"],
                ["2.8x", "higher recall with visual cues"],
                ["41%", "more completion with micro-learning"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-[24px] bg-white/5 p-5">
                  <p className="text-4xl font-semibold text-white">{value}</p>
                  <p className="mt-3 text-sm text-white/55">{label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn className="glass-panel rounded-[32px] p-8" delay={0.2}>
            <div className="space-y-5">
              {[
                { label: "Traditional content", value: "22%" },
                { label: "Visual capsules", value: "79%" },
                { label: "Quiz engagement", value: "66%" }
              ].map((item, index) => (
                <div key={item.label}>
                  <div className="mb-2 flex justify-between text-sm text-white/60">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <motion.div
                    className="h-3 rounded-full bg-white/10"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="h-3 rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-300"
                      initial={{ width: 0 }}
                      whileInView={{ width: item.value }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.12 }}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-shell py-24" id="features">
        <FadeIn className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/75">The solution</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
            Every hard topic becomes something you can see, feel, and complete.
          </h2>
        </FadeIn>
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {solutionCards.map((card, index) => (
            <FadeIn key={card.title} delay={index * 0.08}>
              <div className="glass-panel group h-full rounded-[28px] p-6 transition hover:-translate-y-1">
                <card.icon className="h-10 w-10 text-cyan-200 transition group-hover:scale-110" />
                <h3 className="mt-6 text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/60">{card.copy}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="section-shell py-24" id="how-it-works">
        <FadeIn className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/75">How it works</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
            Input → AI → Visual Output
          </h2>
        </FadeIn>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {[
            ["Input", "Paste a long paragraph, textbook page, or class notes."],
            ["AI", "Our transformer simplifies, structures, and extracts memory hooks."],
            ["Visual Output", "Receive summaries, infographic blocks, and quiz-ready concepts."]
          ].map(([title, copy], index) => (
            <FadeIn key={title} delay={index * 0.12}>
              <div className="glass-panel rounded-[30px] p-8">
                <div className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">0{index + 1}</div>
                <h3 className="mt-5 text-2xl font-semibold text-white">{title}</h3>
                <p className="mt-4 text-base leading-7 text-white/60">{copy}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="section-shell py-24" id="courses">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/75">Feature showcase</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Story-driven learning experiences built to keep focus alive.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">
              From immersive course players to instant quizzes and streak loops, every interaction is designed to create tiny wins.
            </p>
          </FadeIn>
          <div className="space-y-6">
            {[
              "Course player with split-screen visual + summary view",
              "Save progress, continue learning, and earn XP live",
              "Lesson-based MCQs with instant correctness feedback",
              "Leaderboard and badge loops for healthy motivation"
            ].map((item, index) => (
              <FadeIn key={item} delay={index * 0.1}>
                <div className="glass-panel rounded-[28px] p-6 text-white/80">{item}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-24">
        <FadeIn className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/75">Loved by learners</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
            Testimonials that sound like relief.
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <FadeIn key={item.name} delay={index * 0.08}>
              <div className="glass-panel rounded-[30px] p-8">
                <p className="text-lg leading-8 text-white/75">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-8">
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-sm text-white/55">{item.role}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="section-shell py-24" id="pricing">
        <FadeIn className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/75">Pricing</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
            Simple plans for students and study groups.
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pricing.map((plan, index) => (
            <FadeIn key={plan.name} delay={index * 0.08}>
              <div className="glass-panel h-full rounded-[32px] p-8">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">{plan.name}</p>
                <p className="mt-6 text-5xl font-semibold text-white">{plan.price}</p>
                <p className="mt-4 text-white/60">{plan.blurb}</p>
                <p className="mt-8 text-sm leading-7 text-white/65">{plan.features}</p>
                <Link
                  href="/signup"
                  className="mt-10 inline-flex rounded-full border border-white/10 px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Choose {plan.name}
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
