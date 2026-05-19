import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { QuizApp } from "@/components/quiz-app";
import { getModuleFromSlug, getSubjectFromSlug, getSubjectSlug, TECH_POLICY_MODULES } from "@/lib/quiz-catalog";
import { loadQuizQuestions } from "@/lib/quiz-data";

export default async function ModuleQuizPage({
  params
}: {
  params: Promise<{ subject: string; module: string }>;
}) {
  const { subject: subjectSlug, module: moduleSlug } = await params;
  const subject = getSubjectFromSlug(subjectSlug);
  const moduleTitle = getModuleFromSlug(moduleSlug);

  if (!subject || !moduleTitle) {
    notFound();
  }

  const questions = loadQuizQuestions().filter(
    (question) => question.subject === subject && question.moduleTitle === moduleTitle
  );

  if (questions.length === 0) {
    if (subject === "Tech and Policy" && TECH_POLICY_MODULES.includes(moduleTitle as (typeof TECH_POLICY_MODULES)[number])) {
      return (
        <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
          <div className="section-shell space-y-8">
            <Link
              href={`/quiz/${getSubjectSlug(subject)}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 transition hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Modules
            </Link>

            <section className="rounded-[34px] border border-white/10 bg-white/[0.045] p-8 shadow-glow">
              <p className="text-sm uppercase tracking-[0.32em] text-emerald-200/80">Quiz Time</p>
              <h1 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">{moduleTitle}</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">
                This module is visible now, but its question bank has not been added yet. Once you send the full
                Week 13 or Week 14 questions, I can wire them in here directly.
              </p>
            </section>
          </div>
        </main>
      );
    }

    notFound();
  }

  return <QuizApp questions={questions} title="Quiz Time" subtitle={`${subject} · ${moduleTitle}`} />;
}
