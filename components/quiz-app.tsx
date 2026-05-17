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
type HintState = {
  hint: string;
  concept: string;
  count: number;
  loading: boolean;
  error?: string;
};
type HintStateMap = Record<string, HintState>;
type AskState = {
  question: string;
  answer: string;
  loading: boolean;
  error?: string;
  open?: boolean;
};
type AskStateMap = Record<string, AskState>;
type AiFeedbackData = {
  overallFeedback: string;
  weakAreas: string[];
  mistakes: Array<{
    question: string;
    whatIDidWrong: string;
    correctConcept: string;
    howToImprove: string;
  }>;
  improvementPlan: string[];
  recommendedPractice: string[];
};
type AiFeedbackState = {
  loading: boolean;
  data?: AiFeedbackData;
  error?: string;
};

const MAX_HINTS_PER_QUESTION = 2;

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

const getQuestionTopic = (question: QuizQuestion) =>
  question.moduleTitle || question.sectionTitle || question.subject;

const stripOptionLabel = (value: string) => value.replace(/^[A-D]\.\s*/, "").trim();

const resolveOptionFromLetter = (question: QuizQuestion, value: string) => {
  const option = question.options?.find((item) => item.charAt(0) === value);
  return option ? stripOptionLabel(option) : value;
};

const formatAnswerForAi = (question: QuizQuestion, value: AnswerValue | undefined) => {
  if (!value) {
    return "No answer provided";
  }

  if (question.type === "mcq") {
    return typeof value === "string" ? resolveOptionFromLetter(question, value) : value.join(", ");
  }

  if (question.type === "multi-select") {
    const values = Array.isArray(value) ? value : [value];
    return values.map((item) => resolveOptionFromLetter(question, item)).join(", ");
  }

  return Array.isArray(value) ? value.join(", ") : value;
};

const formatCorrectAnswerForAi = (question: QuizQuestion) => {
  if (question.type === "mcq") {
    return resolveOptionFromLetter(question, question.correctAnswer);
  }

  if (question.type === "multi-select") {
    return (question.answerKey ?? []).map((item) => resolveOptionFromLetter(question, item)).join(", ");
  }

  return question.correctAnswer;
};

const getFallbackAiFeedback = (
  quizTitle: string,
  score: number,
  totalQuestions: number,
  wrongAnswers: Array<{
    question: string;
    studentAnswer: string;
    correctAnswer: string;
    topic: string;
  }>
): AiFeedbackData => {
  if (score >= totalQuestions) {
    return {
      overallFeedback:
        "Excellent work. You have a strong grasp of this quiz, so your next step is practicing tougher mixed questions and improving speed.",
      weakAreas: ["Advanced practice"],
      mistakes: [],
      improvementPlan: [
        "Reattempt the quiz under time pressure to build confidence.",
        "Move to harder application-style questions for the same topic."
      ],
      recommendedPractice: [
        `Try another difficult set from ${quizTitle}.`,
        "Explain 3 answers out loud to make your reasoning sharper."
      ]
    };
  }

  const weakAreas = Array.from(new Set(wrongAnswers.map((item) => item.topic).filter(Boolean)));

  return {
    overallFeedback: `You scored ${score} out of ${totalQuestions}. Your mistakes seem focused in a few areas, which is good because targeted revision should help quickly.`,
    weakAreas: weakAreas.length > 0 ? weakAreas : ["Question interpretation"],
    mistakes: wrongAnswers.slice(0, 8).map((item) => ({
      question: item.question,
      whatIDidWrong:
        item.studentAnswer && item.studentAnswer !== "No answer provided"
          ? `You chose "${item.studentAnswer}", but the question was testing a different idea.`
          : "You left this unanswered or were unsure about the underlying idea.",
      correctConcept: item.topic || "Core concept",
      howToImprove:
        "Review the concept, compare the correct answer against the distractors, and practice one more similar question right away."
    })),
    improvementPlan: [
      "Revise one weak topic at a time instead of rereading everything.",
      "Practice eliminating wrong choices before selecting the final answer.",
      "Retry your missed questions after a short revision round."
    ],
    recommendedPractice: [
      "Do a short mixed quiz on your weak areas.",
      "Write one-line summaries for the concepts you missed."
    ]
  };
};

export function QuizApp({
  questions,
  title = "Quiz Time",
  subtitle = "Mixed quiz with MCQs, fill in the blanks, and case-study answers from your question bank."
}: QuizAppProps) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [visibleFillBlankOptions, setVisibleFillBlankOptions] = useState<Record<string, boolean>>({});
  const [hintsByQuestion, setHintsByQuestion] = useState<HintStateMap>({});
  const [askByQuestion, setAskByQuestion] = useState<AskStateMap>({});
  const [aiFeedback, setAiFeedback] = useState<AiFeedbackState>({ loading: false });
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

  const toggleFillBlankOptions = (questionId: string) => {
    setVisibleFillBlankOptions((current) => ({
      ...current,
      [questionId]: !current[questionId]
    }));
  };

  const toggleAskPanel = (questionId: string) => {
    setAskByQuestion((current) => {
      const existing = current[questionId] ?? {
        question: "",
        answer: "",
        loading: false,
        open: false
      };

      return {
        ...current,
        [questionId]: {
          ...existing,
          open: !existing.open
        }
      };
    });
  };

  const updateAskQuestion = (questionId: string, value: string) => {
    setAskByQuestion((current) => ({
      ...current,
      [questionId]: {
        ...(current[questionId] ?? { answer: "", loading: false, open: true }),
        question: value
      }
    }));
  };

  const jumpToQuestion = (questionId: string) => {
    document.getElementById(questionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  const requestHint = async (question: QuizQuestion) => {
    const currentState = hintsByQuestion[question.id];
    const currentCount = currentState?.count ?? 0;

    if (currentCount >= MAX_HINTS_PER_QUESTION) {
      return;
    }

    setHintsByQuestion((current) => ({
      ...current,
      [question.id]: {
        hint: currentState?.hint ?? "",
        concept: currentState?.concept ?? "",
        count: currentCount,
        loading: true,
        error: undefined
      }
    }));

    try {
      const response = await fetch("/api/quiz/hint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question: question.prompt,
          options: question.options?.map(stripOptionLabel),
          topic: getQuestionTopic(question),
          previousHintsCount: currentCount
        })
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Unable to generate a hint right now.");
      }

      setHintsByQuestion((current) => ({
        ...current,
        [question.id]: {
          hint: typeof payload?.hint === "string" ? payload.hint : "Try focusing on the core concept first.",
          concept: typeof payload?.concept === "string" ? payload.concept : getQuestionTopic(question),
          count: currentCount + 1,
          loading: false,
          error: undefined
        }
      }));
    } catch (error) {
      setHintsByQuestion((current) => ({
        ...current,
        [question.id]: {
          hint: currentState?.hint ?? "Try identifying the core concept and ruling out weak choices first.",
          concept: currentState?.concept ?? getQuestionTopic(question),
          count: currentCount,
          loading: false,
          error: error instanceof Error ? error.message : "Unable to generate a hint right now."
        }
      }));
    }
  };

  const askGemini = async (question: QuizQuestion) => {
    const askState = askByQuestion[question.id];
    const userQuery = askState?.question?.trim();

    if (!userQuery) {
      setAskByQuestion((current) => ({
        ...current,
        [question.id]: {
          ...(current[question.id] ?? { answer: "", loading: false, open: true }),
          question: current[question.id]?.question ?? "",
          error: "Type your question first.",
          loading: false,
          open: true
        }
      }));
      return;
    }

    setAskByQuestion((current) => ({
      ...current,
      [question.id]: {
        ...(current[question.id] ?? { answer: "", loading: false, open: true }),
        question: userQuery,
        loading: true,
        error: undefined,
        open: true
      }
    }));

    try {
      const response = await fetch("/api/quiz/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question: question.prompt,
          options: question.options?.map(stripOptionLabel),
          topic: getQuestionTopic(question),
          userQuery
        })
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Unable to ask Gemini right now.");
      }

      setAskByQuestion((current) => ({
        ...current,
        [question.id]: {
          ...(current[question.id] ?? { question: userQuery, loading: false, open: true }),
          question: userQuery,
          answer:
            typeof payload?.answer === "string"
              ? payload.answer
              : "Try breaking the question into concept, clue, and elimination steps.",
          loading: false,
          error: undefined,
          open: true
        }
      }));
    } catch (error) {
      setAskByQuestion((current) => ({
        ...current,
        [question.id]: {
          ...(current[question.id] ?? { question: userQuery, answer: "", open: true }),
          question: userQuery,
          answer:
            current[question.id]?.answer ||
            `Gemini is unavailable right now. Focus on ${getQuestionTopic(question)} and ask yourself what the question is really testing.`,
          loading: false,
          error: error instanceof Error ? error.message : "Unable to ask Gemini right now.",
          open: true
        }
      }));
    }
  };

  const generateAiFeedback = async () => {
    const wrongAnswerPayload = evaluatedResults
      .filter((item) => !item.isCorrect)
      .map((item) => ({
        question: item.prompt,
        studentAnswer: formatAnswerForAi(item, item.userAnswer),
        correctAnswer: formatCorrectAnswerForAi(item),
        topic: getQuestionTopic(item)
      }));

    const fallback = getFallbackAiFeedback(title, correctCount, questions.length, wrongAnswerPayload);

    setAiFeedback({
      loading: true
    });

    try {
      const response = await fetch("/api/quiz/ai-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          quizTitle: title,
          score: correctCount,
          totalQuestions: questions.length,
          wrongAnswers: wrongAnswerPayload
        })
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Unable to generate AI feedback right now.");
      }

      setAiFeedback({
        loading: false,
        data: {
          overallFeedback:
            typeof payload?.overallFeedback === "string"
              ? payload.overallFeedback
              : fallback.overallFeedback,
          weakAreas: Array.isArray(payload?.weakAreas) ? payload.weakAreas : fallback.weakAreas,
          mistakes: Array.isArray(payload?.mistakes) ? payload.mistakes : fallback.mistakes,
          improvementPlan: Array.isArray(payload?.improvementPlan)
            ? payload.improvementPlan
            : fallback.improvementPlan,
          recommendedPractice: Array.isArray(payload?.recommendedPractice)
            ? payload.recommendedPractice
            : fallback.recommendedPractice
        }
      });
    } catch (error) {
      setAiFeedback({
        loading: false,
        data: fallback,
        error: error instanceof Error ? error.message : "Unable to generate AI feedback right now."
      });
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    void generateAiFeedback();
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

            {submitted ? (
              <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">AI Improvement Analysis</p>
                  {aiFeedback.loading ? (
                    <p className="mt-3 text-sm leading-7 text-white/70">
                      Gemini is analyzing your wrong answers and building a study plan...
                    </p>
                  ) : (
                    <div className="mt-3 space-y-4">
                      <p className="text-sm leading-7 text-white/80">
                        {aiFeedback.data?.overallFeedback || "AI feedback will appear here after submission."}
                      </p>

                      {aiFeedback.error ? (
                        <p className="rounded-2xl border border-amber-300/25 bg-amber-400/10 px-3 py-2 text-xs text-amber-100/90">
                          Using fallback feedback because Gemini was unavailable just now.
                        </p>
                      ) : null}

                      <div>
                        <p className="text-sm font-semibold text-white">Weak Areas</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {(aiFeedback.data?.weakAreas ?? []).map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-rose-300/20 bg-rose-400/10 px-3 py-1 text-xs text-rose-100"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {aiFeedback.data?.mistakes?.length ? (
                        <div className="space-y-3">
                          <p className="text-sm font-semibold text-white">Mistake Breakdown</p>
                          {aiFeedback.data.mistakes.map((mistake, mistakeIndex) => (
                            <div
                              key={`${mistake.question}-${mistakeIndex}`}
                              className="rounded-3xl border border-white/10 bg-slate-950/40 p-4"
                            >
                              <p className="text-sm font-semibold text-white">{mistake.question}</p>
                              <p className="mt-2 text-sm leading-7 text-white/75">
                                <span className="font-semibold text-white">What went wrong:</span>{" "}
                                {mistake.whatIDidWrong}
                              </p>
                              <p className="mt-2 text-sm leading-7 text-white/75">
                                <span className="font-semibold text-white">Correct concept:</span>{" "}
                                {mistake.correctConcept}
                              </p>
                              <p className="mt-2 text-sm leading-7 text-white/75">
                                <span className="font-semibold text-white">How to improve:</span>{" "}
                                {mistake.howToImprove}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">Wrong Answer Review</p>
                    {wrongAnswers.length === 0 ? (
                      <p className="mt-3 text-sm leading-7 text-emerald-200">
                        No wrong answers. You can use the AI review as an advanced practice guide.
                      </p>
                    ) : (
                      <div className="mt-3 space-y-3">
                        {wrongAnswers.map((item) => (
                          <div key={item.id} className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
                            <button
                              type="button"
                              onClick={() => jumpToQuestion(item.id)}
                              className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100"
                            >
                              {item.questionNumber}
                            </button>
                            <p className="mt-3 text-sm leading-7 text-white/75">
                              <span className="font-semibold text-white">Your answer:</span>{" "}
                              {formatAnswerForAi(item, item.userAnswer)}
                            </p>
                            <p className="mt-2 text-sm leading-7 text-white/75">
                              <span className="font-semibold text-white">Correct answer:</span>{" "}
                              {formatCorrectAnswerForAi(item)}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">Improvement Plan</p>
                    <ul className="mt-3 space-y-2 text-sm leading-7 text-white/75">
                      {(aiFeedback.data?.improvementPlan ?? []).map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>

                    <p className="mt-4 text-sm font-semibold text-white">Recommended Practice</p>
                    <ul className="mt-3 space-y-2 text-sm leading-7 text-white/75">
                      {(aiFeedback.data?.recommendedPractice ?? []).map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {evaluatedResults.map((question, index) => {
            const userAnswer = answers[question.id];
            const userAnswerText = formatAnswerForAi(question, userAnswer);
            const showFeedback = submitted;
            const answerCorrect = question.isCorrect;
            const hintState = hintsByQuestion[question.id];
            const askState = askByQuestion[question.id];
            const hintsUsed = hintState?.count ?? 0;
            const hintsRemaining = Math.max(MAX_HINTS_PER_QUESTION - hintsUsed, 0);

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

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => requestHint(question)}
                    disabled={hintState?.loading || hintsRemaining === 0}
                    className={[
                      "rounded-full border px-4 py-2 text-sm font-medium transition",
                      hintState?.loading || hintsRemaining === 0
                        ? "cursor-not-allowed border-white/10 bg-white/5 text-white/40"
                        : "border-cyan-300/30 bg-cyan-300/10 text-cyan-100 hover:border-cyan-300/50"
                    ].join(" ")}
                  >
                    {hintState?.loading
                      ? "Generating hint..."
                      : hintsRemaining === 0
                        ? "Hint limit reached"
                        : `Get Hint (${hintsRemaining} left)`}
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleAskPanel(question.id)}
                    className="rounded-full border border-violet-300/25 bg-violet-300/10 px-4 py-2 text-sm font-medium text-violet-100 transition hover:border-violet-300/50"
                  >
                    {askState?.open ? "Hide Ask Gemini" : "Ask Gemini"}
                  </button>
                </div>

                {hintState?.hint || hintState?.error ? (
                  <div className="mt-4 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/80">
                      Hint · {hintState?.concept || getQuestionTopic(question)}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-cyan-50/90">
                      {hintState?.hint || "Hint unavailable right now."}
                    </p>
                    {hintState?.error ? (
                      <p className="mt-2 text-xs text-cyan-100/75">{hintState.error}</p>
                    ) : null}
                  </div>
                ) : null}

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
                    {question.options?.length ? (
                      <div className="space-y-3">
                        <button
                          type="button"
                          onClick={() => toggleFillBlankOptions(question.id)}
                          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-cyan-300/25 hover:text-white"
                        >
                          {visibleFillBlankOptions[question.id] ? "Hide options" : "Show options"}
                        </button>

                        {visibleFillBlankOptions[question.id] ? (
                          <div className="grid gap-3 md:grid-cols-2">
                            {question.options.map((option) => {
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
                        ) : null}
                      </div>
                    ) : null}
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

                {askState?.open ? (
                  <div className="mt-5 rounded-3xl border border-violet-300/15 bg-violet-300/10 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-100/80">
                      Ask Gemini About This Question
                    </p>
                    <textarea
                      value={askState.question ?? ""}
                      onChange={(event) => updateAskQuestion(question.id, event.target.value)}
                      placeholder="Ask for a concept explanation, elimination strategy, or how to think about this question."
                      rows={3}
                      className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-violet-300/50"
                    />
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => askGemini(question)}
                        disabled={askState.loading}
                        className={[
                          "rounded-full border px-4 py-2 text-sm font-medium transition",
                          askState.loading
                            ? "cursor-not-allowed border-white/10 bg-white/5 text-white/40"
                            : "border-violet-300/30 bg-violet-300/10 text-violet-100 hover:border-violet-300/50"
                        ].join(" ")}
                      >
                        {askState.loading ? "Gemini is thinking..." : "Send to Gemini"}
                      </button>
                      <p className="text-xs text-white/50">
                        Gemini explains the concept, but it does not decide your score.
                      </p>
                    </div>

                    {askState.answer ? (
                      <div className="mt-4 rounded-3xl border border-white/10 bg-slate-950/40 p-4">
                        <p className="text-sm leading-7 text-white/80">{askState.answer}</p>
                      </div>
                    ) : null}

                    {askState.error ? (
                      <p className="mt-3 text-xs text-violet-100/75">{askState.error}</p>
                    ) : null}
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
                      {formatCorrectAnswerForAi(question)}
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
