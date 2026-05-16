"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import { useAppStore } from "@/store/use-app-store";

type Lesson = {
  id: string;
  title: string;
  duration: string;
  summary: string;
  bullets: string[];
  visualType: string;
  content: string;
  quiz: { question: string; options: string[]; answer: string }[];
};

type Course = {
  _id: string;
  slug: string;
  title: string;
  accent: string;
  lessons: Lesson[];
};

type Props = {
  course: Course;
  lesson: Lesson;
  percentComplete: number;
};

export function CoursePlayer({ course, lesson, percentComplete }: Props) {
  const router = useRouter();
  const awardXp = useAppStore((state) => state.awardXp);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<string>("");
  const lessonIndex = course.lessons.findIndex((item) => item.id === lesson.id);
  const previousLesson = course.lessons[lessonIndex - 1];
  const nextLesson = course.lessons[lessonIndex + 1];

  const scorePreview = useMemo(() => {
    return lesson.quiz.reduce((accumulator, item, index) => {
      return accumulator + (selectedAnswers[index] === item.answer ? 1 : 0);
    }, 0);
  }, [lesson.quiz, selectedAnswers]);

  async function markComplete() {
    const response = await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId: course._id,
        lessonId: lesson.id
      })
    });

    if (response.ok) {
      awardXp(80, lesson.id);
      setFeedback("Lesson completed. Progress saved and +80 XP earned.");
      router.refresh();
    }
  }

  async function submitQuiz() {
    const answers = lesson.quiz.map((item, index) => ({
      question: item.question,
      selected: selectedAnswers[index] ?? "",
      correct: selectedAnswers[index] === item.answer
    }));

    const response = await fetch("/api/quiz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId: course._id,
        lessonId: lesson.id,
        answers
      })
    });

    const data = await response.json();
    if (response.ok) {
      awardXp(40);
      setFeedback(`Quiz submitted. You scored ${data.score}/${data.total}.`);
      router.refresh();
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <section className="glass-panel rounded-[32px] p-6">
        <div className="flex items-center justify-between text-sm text-white/60">
          <span>{course.title}</span>
          <span>{lesson.duration}</span>
        </div>
        <div className={`mt-6 rounded-[28px] bg-gradient-to-br ${course.accent} p-8 text-slate-950`}>
          <p className="text-sm uppercase tracking-[0.3em]">{lesson.visualType}</p>
          <h2 className="mt-4 text-4xl font-semibold">{lesson.title}</h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-900/80">{lesson.content}</p>
          <div className="mt-8 grid h-64 place-items-center rounded-[24px] border border-slate-950/10 bg-slate-950/10">
            <div className="h-40 w-40 animate-float rounded-full border border-white/50 bg-white/20 backdrop-blur-xl" />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={markComplete}
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-sky-400 px-5 py-3 text-sm font-semibold text-slate-950"
          >
            <CheckCircle2 size={16} />
            Mark complete
          </button>
          {previousLesson ? (
            <button
              onClick={() => router.push(`/learn/${course.slug}/${previousLesson.id}`)}
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-white/75"
            >
              <ChevronLeft size={16} />
              Previous
            </button>
          ) : null}
          {nextLesson ? (
            <button
              onClick={() => router.push(`/learn/${course.slug}/${nextLesson.id}`)}
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-white/75"
            >
              Next
              <ChevronRight size={16} />
            </button>
          ) : null}
        </div>
      </section>

      <aside className="space-y-6">
        <div className="glass-panel rounded-[32px] p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">Summary</p>
          <p className="mt-4 text-sm leading-7 text-white/70">{lesson.summary}</p>
          <ul className="mt-6 space-y-3">
            {lesson.bullets.map((bullet) => (
              <li key={bullet} className="rounded-[22px] bg-white/5 px-4 py-3 text-sm text-white/70">
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel rounded-[32px] p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">Progress</p>
            <span className="text-sm text-white/60">{percentComplete}% complete</span>
          </div>
          <div className="mt-4 h-3 rounded-full bg-white/10">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-300"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>

        <div className="glass-panel rounded-[32px] p-6">
          <div className="flex items-center gap-2">
            <Trophy className="text-cyan-200" size={18} />
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">Quick quiz</p>
          </div>
          <div className="mt-6 space-y-5">
            {lesson.quiz.map((item, index) => (
              <div key={item.question} className="rounded-[24px] bg-white/5 p-4">
                <p className="text-sm font-medium text-white">{item.question}</p>
                <div className="mt-4 space-y-2">
                  {item.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setSelectedAnswers((state) => ({
                          ...state,
                          [index]: option
                        }))
                      }
                      className={`block w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                        selectedAnswers[index] === option
                          ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-50"
                          : "border-white/10 bg-slate-950/30 text-white/70"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={submitQuiz}
            type="button"
            className="mt-6 w-full rounded-full border border-white/10 px-5 py-3 text-sm text-white transition hover:bg-white/10"
          >
            Submit quiz ({scorePreview}/{lesson.quiz.length} correct)
          </button>
          {feedback ? <p className="mt-4 text-sm text-cyan-100">{feedback}</p> : null}
        </div>
      </aside>
    </div>
  );
}
