import Link from "next/link";
import { ArrowRight, BookOpen, Files, Layers3 } from "lucide-react";
import { loadQuizQuestions } from "@/lib/quiz-data";
import { getModuleSlug, getSubjectSlug } from "@/lib/quiz-catalog";

export function QuizSubjectsPage() {
  const questions = loadQuizQuestions();
  const fsteCount = questions.filter((question) => question.subject === "FSTE").length;
  const techPolicyModules = Array.from(
    new Set(
      questions
        .filter((question) => question.subject === "Tech and Policy" && question.moduleTitle)
        .map((question) => question.moduleTitle as string)
    )
  );
  const techPolicyCount = questions.filter((question) => question.subject === "Tech and Policy").length;

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="section-shell space-y-8">
        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.05] px-6 py-12 shadow-glow sm:px-10">
          <div className="absolute inset-0 bg-hero-mesh opacity-90" />
          <div className="absolute inset-0 grid-overlay opacity-40" />
          <div className="relative max-w-4xl">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/85">Quiz Time</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-6xl">
              Choose your subject, then open the exact quiz you want.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/74">
              FSTE opens directly as one subject quiz, while Tech and Policy opens into a week list so you can choose
              the module first and then start the questions.
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 shadow-glow">
            <div className="inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-100">
              <BookOpen className="h-6 w-6" />
            </div>
            <p className="mt-5 text-sm uppercase tracking-[0.28em] text-cyan-200/80">Subject</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-white">FSTE</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Foundations of Systems Thinking and Engineering in one continuous question flow including assertion-reason
              questions, fill in the blanks, and case-study prompts.
            </p>
            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white/55">Questions</p>
              <p className="mt-1 text-2xl font-semibold text-white">{fsteCount}</p>
            </div>
            <Link
              href={`/quiz/${getSubjectSlug("FSTE")}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
            >
              Open FSTE
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>

          <article className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 shadow-glow">
            <div className="inline-flex rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-3 text-emerald-100">
              <Layers3 className="h-6 w-6" />
            </div>
            <p className="mt-5 text-sm uppercase tracking-[0.28em] text-emerald-200/80">Subject</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-white">Tech and Policy</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Organized by weeks. Click the subject first, then choose the week you want to open.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/55">Questions</p>
                <p className="mt-1 text-2xl font-semibold text-white">{techPolicyCount}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/55">Weeks</p>
                <p className="mt-1 text-2xl font-semibold text-white">{techPolicyModules.length}</p>
              </div>
            </div>
            <Link
              href={`/quiz/${getSubjectSlug("Tech and Policy")}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
            >
              Open Tech and Policy
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 shadow-glow">
          <div className="inline-flex rounded-2xl border border-amber-300/20 bg-amber-300/10 p-3 text-amber-100">
            <Files className="h-6 w-6" />
          </div>
          <p className="mt-5 text-sm uppercase tracking-[0.28em] text-amber-200/80">Tech and Policy Weeks</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white">Choose a Week</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {techPolicyModules.map((moduleTitle) => (
              <Link
                key={moduleTitle}
                href={`/quiz/${getSubjectSlug("Tech and Policy")}/${getModuleSlug(moduleTitle)}`}
                className="rounded-[24px] border border-white/10 bg-white/5 p-5 transition hover:border-emerald-300/25 hover:bg-emerald-300/10"
              >
                <p className="text-sm text-white/55">Module</p>
                <p className="mt-2 text-2xl font-semibold text-white">{moduleTitle}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
