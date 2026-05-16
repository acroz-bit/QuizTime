"use client";

import { useMemo, useRef, useState } from "react";
import type { QuizQuestion } from "@/lib/quiz-data";

type QuizAppProps = {
  questions: QuizQuestion[];
  title?: string;
  subtitle?: string;
};

type AnswerValue = string | string[];
type AnswerMap = Record<string, AnswerValue>;

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "because",
  "by",
  "for",
  "from",
  "has",
  "in",
  "is",
  "it",
  "its",
  "of",
  "on",
  "or",
  "that",
  "the",
  "their",
  "this",
  "to",
  "was",
  "with"
]);

const normalizeAnswer = (value: string) =>
  value
    .toLowerCase()
    .replace(/[*_`"]/g, "")
    .replace(/[^a-z0-9\s+-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getAnswerText = (value: AnswerValue | undefined) => {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  return value ?? "";
};

const hasProvidedAnswer = (value: AnswerValue | undefined) =>
  Array.isArray(value) ? value.length > 0 : Boolean(value?.trim());

const tokenize = (value: string) =>
  normalizeAnswer(value)
    .split(" ")
    .filter((token) => token && token.length > 2 && !STOP_WORDS.has(token));

const checkCaseStudyAnswer = (userAnswer: string, correctAnswer: string) => {
  const expectedTokens = Array.from(new Set(tokenize(correctAnswer)));
  const userTokens = new Set(tokenize(userAnswer));

  if (expectedTokens.length === 0) {
    return false;
  }

  const matches = expectedTokens.filter((token) => userTokens.has(token)).length;
  return matches / expectedTokens.length >= 0.35;
};

const isAnswerCorrect = (question: QuizQuestion, userAnswer: string) => {
  if (!userAnswer.trim()) {
    return false;
  }

  if (question.type === "mcq") {
    return normalizeAnswer(userAnswer) === normalizeAnswer(question.correctAnswer);
  }

  if (question.type === "fill-blank") {
    return normalizeAnswer(userAnswer) === normalizeAnswer(question.correctAnswer);
  }

  return checkCaseStudyAnswer(userAnswer, question.correctAnswer);
};

const isQuestionCorrect = (question: QuizQuestion, userAnswer: AnswerValue | undefined) => {
  if (!hasProvidedAnswer(userAnswer)) {
    return false;
  }

  if (question.type === "multi-select") {
    const expected = (question.answerKey ?? []).map(normalizeAnswer).sort();
    const received = (Array.isArray(userAnswer) ? userAnswer : [userAnswer])
      .filter((value): value is string => Boolean(value))
      .map(normalizeAnswer)
      .sort();

    return expected.length === received.length && expected.every((value, index) => value === received[index]);
  }

  return isAnswerCorrect(question, Array.isArray(userAnswer) ? userAnswer.join(", ") : userAnswer ?? "");
};

export function QuizApp({
  questions,
  title = "Quiz Time",
  subtitle = "Mixed quiz with MCQs, fill in the blanks, and case-study answers from your question bank."
}: QuizAppProps) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const evaluatedResults = useMemo(
    () =>
      questions.map((question) => {
        const userAnswer = answers[question.id];
        const isCorrect = isQuestionCorrect(question, userAnswer);

        return {
          ...question,
          userAnswer,
          isCorrect
        };
      }),
    [answers, questions]
  );

  const correctCount = evaluatedResults.filter((item) => item.isCorrect).length;
  const wrongAnswers = evaluatedResults.filter((item) => submitted && !item.isCorrect);
  const attemptedCount = evaluatedResults.filter((item) => hasProvidedAnswer(answers[item.id])).length;

  const updateAnswer = (questionId: string, value: string) => {
    setAnswers((current) => ({
      ...current,
      [questionId]: value
    }));
  };

  const toggleMultiSelectAnswer = (questionId: string, optionLetter: string) => {
    setAnswers((current) => {
      const currentValue = current[questionId];
      const selected = Array.isArray(currentValue) ? currentValue : [];
      const nextValue = selected.includes(optionLetter)
        ? selected.filter((value) => value !== optionLetter)
        : [...selected, optionLetter].sort();

      return {
        ...current,
        [questionId]: nextValue
      };
    });
  };

  const jumpToQuestion = (questionId: string) => {
    document.getElementById(questionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-transparent px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="xl:sticky xl:top-8 xl:self-start">
          <div className="glass-panel rounded-[28px] p-5">
            <p className="font-display text-2xl font-semibold text-white">{title}</p>
            <p className="mt-2 text-sm leading-6 text-white/70">{subtitle}</p>

            <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">Progress</p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-3 text-white/85">
                  <p className="text-white/50">Questions</p>
                  <p className="mt-1 text-xl font-semibold">{questions.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-3 text-white/85">
                  <p className="text-white/50">Attempted</p>
                  <p className="mt-1 text-xl font-semibold">{attemptedCount}</p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs uppercase tracking-[0.3em] text-white/45">Question Box</p>
              <div className="mt-3 max-h-[18rem] overflow-y-auto pr-1 sm:max-h-[24rem] xl:max-h-[48vh]">
                <div className="grid grid-cols-4 gap-2">
                {evaluatedResults.map((question, index) => {
                  const hasAnswer = hasProvidedAnswer(answers[question.id]);
                  const showWrong = submitted && hasAnswer && !question.isCorrect;
                  const showCorrect = submitted && hasAnswer && question.isCorrect;

                  return (
                    <button
                      key={question.id}
                      type="button"
                      onClick={() => jumpToQuestion(question.id)}
                      className={[
                        "rounded-2xl border px-2 py-3 text-xs font-semibold transition",
                        showWrong
                          ? "border-rose-400/50 bg-rose-500/15 text-rose-100"
                          : showCorrect
                            ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-100"
                            : hasAnswer
                              ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
                              : "border-white/10 bg-white/5 text-white/65 hover:border-cyan-300/30 hover:text-white"
                      ].join(" ")}
                    >
                      {index + 1}
                    </button>
                  );
                })}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="mt-5 w-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-300 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/25"
            >
              Submit Quiz
            </button>

            <p className="mt-3 text-xs leading-5 text-white/50">
              Case-study answers are auto-checked by keyword match, so use meaningful words from your answer.
            </p>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-glow sm:p-8">
            <div className="absolute inset-0 bg-hero-mesh opacity-90" />
            <div className="absolute inset-0 grid-overlay opacity-40" />
            <div className="relative">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/85">Systems Thinking Practice</p>
              <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-white/75">
                {subtitle}
              </p>
            </div>
          </div>

          <div
            ref={resultsRef}
            className="rounded-[28px] border border-white/10 bg-slate-950/40 p-5 shadow-glow sm:p-6"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/45">Results</p>
                <p className="mt-2 font-display text-3xl font-semibold text-white">
                  {submitted ? `${correctCount} / ${questions.length} correct` : "Submit when you're ready"}
                </p>
              </div>
              {submitted ? (
                <div className="max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-white/75">
                    Wrong questions:
                    {" "}
                    {wrongAnswers.length === 0 ? (
                      <span className="text-emerald-200">None. Great work.</span>
                    ) : (
                      wrongAnswers.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => jumpToQuestion(item.id)}
                          className="ml-2 rounded-full border border-rose-400/35 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-100"
                        >
                          {item.questionNumber}
                        </button>
                      ))
                    )}
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          {evaluatedResults.map((question, index) => {
            const userAnswer = answers[question.id];
            const userAnswerText = getAnswerText(userAnswer);
            const showFeedback = submitted;
            const answerCorrect = question.isCorrect;

            return (
              <article
                key={question.id}
                id={question.id}
                className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 shadow-glow sm:p-6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">
                    {question.sectionTitle}
                  </span>
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">
                    {question.subject}
                  </span>
                  {question.moduleTitle ? (
                    <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs text-amber-100">
                      {question.moduleTitle}
                    </span>
                  ) : null}
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                    {question.questionNumber}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                    Card {index + 1}
                  </span>
                </div>

                {question.scenario ? (
                  <div className="mt-5 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-7 text-amber-50/90">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-amber-100/80">Scenario</p>
                    <p>{question.scenario}</p>
                  </div>
                ) : null}

                <h2 className="mt-5 text-xl font-semibold leading-8 text-white">{question.prompt}</h2>

                {question.type === "mcq" ? (
                  <div className="mt-5 grid gap-3">
                    {question.options?.map((option) => {
                      const optionLetter = option.charAt(0);
                      const selected = userAnswer === optionLetter;

                      return (
                        <label
                          key={option}
                          className={[
                            "flex cursor-pointer items-start gap-3 rounded-3xl border p-4 transition",
                            selected
                              ? "border-cyan-300/50 bg-cyan-300/10"
                              : "border-white/10 bg-white/5 hover:border-white/20"
                          ].join(" ")}
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={optionLetter}
                            checked={selected}
                            onChange={(event) => updateAnswer(question.id, event.target.value)}
                            className="mt-1 h-4 w-4 accent-cyan-300"
                          />
                          <span className="text-sm leading-7 text-white/85">{option}</span>
                        </label>
                      );
                    })}
                  </div>
                ) : null}

                {question.type === "multi-select" ? (
                  <div className="mt-5 grid gap-3">
                    {question.options?.map((option) => {
                      const optionLetter = option.charAt(0);
                      const selected = Array.isArray(userAnswer) && userAnswer.includes(optionLetter);

                      return (
                        <label
                          key={option}
                          className={[
                            "flex cursor-pointer items-start gap-3 rounded-3xl border p-4 transition",
                            selected
                              ? "border-cyan-300/50 bg-cyan-300/10"
                              : "border-white/10 bg-white/5 hover:border-white/20"
                          ].join(" ")}
                        >
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleMultiSelectAnswer(question.id, optionLetter)}
                            className="mt-1 h-4 w-4 accent-cyan-300"
                          />
                          <span className="text-sm leading-7 text-white/85">{option}</span>
                        </label>
                      );
                    })}
                  </div>
                ) : null}

                {question.type === "fill-blank" ? (
                  <div className="mt-5 space-y-4">
                    <div className="grid gap-3 md:grid-cols-2">
                      {question.options?.map((option) => {
                        const selected = userAnswer === option;

                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => updateAnswer(question.id, option)}
                            className={[
                              "rounded-3xl border px-4 py-4 text-left text-sm font-medium transition",
                              selected
                                ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-100"
                                : "border-white/10 bg-white/5 text-white/80 hover:border-cyan-300/25 hover:text-white"
                            ].join(" ")}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                    <input
                      type="text"
                      value={typeof userAnswer === "string" ? userAnswer : ""}
                      onChange={(event) => updateAnswer(question.id, event.target.value)}
                      placeholder="Or type your own answer here"
                      className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/50"
                    />
                  </div>
                ) : null}

                {question.type === "case-study" ? (
                  <div className="mt-5">
                    <textarea
                      value={typeof userAnswer === "string" ? userAnswer : ""}
                      onChange={(event) => updateAnswer(question.id, event.target.value)}
                      placeholder="Write your case-study answer here"
                      rows={7}
                      className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/50"
                    />
                  </div>
                ) : null}

                {showFeedback ? (
                  <div
                    className={[
                      "mt-5 rounded-3xl border p-4",
                      answerCorrect
                        ? "border-emerald-400/30 bg-emerald-500/10"
                        : "border-rose-400/30 bg-rose-500/10"
                    ].join(" ")}
                  >
                    <p className="text-sm font-semibold text-white">
                      {answerCorrect ? "Correct answer" : "Needs review"}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/80">
                      <span className="font-semibold text-white">Your answer:</span>
                      {" "}
                      {userAnswerText || "Not answered"}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/80">
                      <span className="font-semibold text-white">Expected answer:</span>
                      {" "}
                      {question.correctAnswer}
                    </p>
                    {question.explanation ? (
                      <p className="mt-2 text-sm leading-7 text-white/70">
                        <span className="font-semibold text-white">Why:</span>
                        {" "}
                        {question.explanation}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
