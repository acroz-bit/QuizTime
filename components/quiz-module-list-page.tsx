import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { QuizQuestion } from "@/lib/quiz-data";
import { getModuleSlug, getSubjectSlug } from "@/lib/quiz-catalog";

export function QuizModuleListPage({
  subject,
  questions
}: {
  subject: string;
  questions: QuizQuestion[];
}) {
  const modules = Array.from(new Set(questions.map((question) => question.moduleTitle).filter(Boolean))) as string[];

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="section-shell space-y-8">
        <Link
          href="/quiz"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 transition hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Subjects
        </Link>

        <section className="rounded-[34px] border border-white/10 bg-white/[0.045] p-8 shadow-glow">
          <p className="text-sm uppercase tracking-[0.32em] text-emerald-200/80">Quiz Time</p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">{subject}</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">
            Choose a week to open the exact module quiz. Each week uses the same question styling and result flow as
            the rest of the site.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((moduleTitle) => (
            <Link
              key={moduleTitle}
              href={`/quiz/${getSubjectSlug(subject)}/${getModuleSlug(moduleTitle)}`}
              className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-glow transition hover:border-emerald-300/25 hover:bg-emerald-300/10"
            >
              <p className="text-sm text-white/55">Module</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">{moduleTitle}</h2>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-100">
                Open Questions
                <ArrowRight className="h-4 w-4" />
              </p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
