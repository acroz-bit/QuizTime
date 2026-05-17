type HintRequestBody = {
  question: string;
  options?: string[];
  topic?: string;
  previousHintsCount: number;
};

type AiFeedbackWrongAnswer = {
  question: string;
  studentAnswer: string;
  correctAnswer: string;
  topic?: string;
};

type AiFeedbackRequestBody = {
  quizTitle: string;
  score: number;
  totalQuestions: number;
  wrongAnswers: AiFeedbackWrongAnswer[];
};

type AskRequestBody = {
  question: string;
  options?: string[];
  topic?: string;
  userQuery: string;
};

export type HintResponseBody = {
  hint: string;
  concept: string;
};

export type AiFeedbackMistake = {
  question: string;
  whatIDidWrong: string;
  correctConcept: string;
  howToImprove: string;
};

export type AiFeedbackResponseBody = {
  overallFeedback: string;
  weakAreas: string[];
  mistakes: AiFeedbackMistake[];
  improvementPlan: string[];
  recommendedPractice: string[];
};

export type AskResponseBody = {
  answer: string;
};

type RateLimitConfig = {
  limit: number;
  windowMs: number;
};

const GEMINI_MODELS = ["gemini-2.5-flash-lite", "gemini-2.5-flash"] as const;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const clampText = (value: unknown, fallback = "", maxLength = 1600) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : fallback;

const clampOptions = (value: unknown) =>
  Array.isArray(value)
    ? value
        .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
        .slice(0, 8)
        .map((item) => item.trim().slice(0, 240))
    : [];

const compactWhitespace = (value: string) => value.replace(/\s+/g, " ").trim();

const uniqueStrings = (values: string[]) => Array.from(new Set(values.filter(Boolean)));

const parseJsonFromText = (value: string) => {
  const trimmed = value.trim();

  try {
    return JSON.parse(trimmed);
  } catch {
    const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);

    if (fencedMatch) {
      return JSON.parse(fencedMatch[1]);
    }

    const objectStart = trimmed.indexOf("{");
    const objectEnd = trimmed.lastIndexOf("}");

    if (objectStart !== -1 && objectEnd !== -1 && objectEnd > objectStart) {
      return JSON.parse(trimmed.slice(objectStart, objectEnd + 1));
    }

    throw new Error("Gemini JSON parsing failed");
  }
};

export const getClientIdentifier = (request: Request) => {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "anonymous";
  }

  return request.headers.get("x-real-ip") ?? "anonymous";
};

export const consumeRateLimit = (key: string, config: RateLimitConfig) => {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + config.windowMs });
    return {
      allowed: true,
      remaining: config.limit - 1,
      retryAfterMs: config.windowMs
    };
  }

  if (current.count >= config.limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: Math.max(current.resetAt - now, 0)
    };
  }

  current.count += 1;
  rateLimitStore.set(key, current);

  return {
    allowed: true,
    remaining: config.limit - current.count,
    retryAfterMs: Math.max(current.resetAt - now, 0)
  };
};

const extractGeminiText = (payload: any) =>
  payload?.candidates
    ?.flatMap((candidate: any) => candidate?.content?.parts ?? [])
    ?.map((part: any) => (typeof part?.text === "string" ? part.text : ""))
    ?.join("")
    ?.trim() ?? "";

export async function generateGeminiJson<T>({
  systemInstruction,
  userPayload,
  responseJsonSchema,
  temperature = 0.3
}: {
  systemInstruction: string;
  userPayload: unknown;
  responseJsonSchema: Record<string, unknown>;
  temperature?: number;
}) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  let lastError: Error | null = null;

  for (const model of GEMINI_MODELS) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `${systemInstruction}\n\nInput JSON:\n${JSON.stringify(userPayload, null, 2)}`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature,
              responseMimeType: "application/json",
              responseJsonSchema
            }
          }),
          cache: "no-store"
        }
      );

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        throw new Error(`Gemini request failed for ${model} with status ${response.status}${errorText ? `: ${errorText}` : ""}`);
      }

      const payload = await response.json();
      const text = extractGeminiText(payload);

      if (!text) {
        throw new Error(`Gemini response was empty for ${model}`);
      }

      return parseJsonFromText(text) as T;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown Gemini error");
      console.error(`[quiz-ai] ${model} failed`, lastError.message);
    }
  }

  throw lastError ?? new Error("Gemini request failed");
}

export const parseHintRequest = (value: any): HintRequestBody | null => {
  const question = clampText(value?.question);

  if (!question) {
    return null;
  }

  return {
    question,
    options: clampOptions(value?.options),
    topic: clampText(value?.topic, "General quiz concept", 120),
    previousHintsCount:
      typeof value?.previousHintsCount === "number" && value.previousHintsCount >= 0
        ? Math.min(value.previousHintsCount, 5)
        : 0
  };
};

export const parseAiFeedbackRequest = (value: any): AiFeedbackRequestBody | null => {
  const quizTitle = clampText(value?.quizTitle, "Quiz Time", 180);
  const score = typeof value?.score === "number" ? value.score : Number.NaN;
  const totalQuestions =
    typeof value?.totalQuestions === "number" ? value.totalQuestions : Number.NaN;

  if (!Number.isFinite(score) || !Number.isFinite(totalQuestions)) {
    return null;
  }

  const wrongAnswers = Array.isArray(value?.wrongAnswers)
    ? value.wrongAnswers
        .map((item: any) => ({
          question: clampText(item?.question, "", 320),
          studentAnswer: clampText(item?.studentAnswer, "No answer provided", 240),
          correctAnswer: clampText(item?.correctAnswer, "Not available", 240),
          topic: clampText(item?.topic, "General quiz concept", 120)
        }))
        .filter((item: { question: string }) => item.question)
        .slice(0, 20)
    : [];

  return {
    quizTitle,
    score,
    totalQuestions,
    wrongAnswers
  };
};

export const parseAskRequest = (value: any): AskRequestBody | null => {
  const question = clampText(value?.question, "", 320);
  const userQuery = clampText(value?.userQuery, "", 600);

  if (!question || !userQuery) {
    return null;
  }

  return {
    question,
    options: clampOptions(value?.options),
    topic: clampText(value?.topic, "General quiz concept", 120),
    userQuery
  };
};

export const buildHintFallback = (body?: Partial<HintRequestBody>): HintResponseBody => ({
  hint:
    body?.previousHintsCount && body.previousHintsCount > 0
      ? "Focus on the most important idea in the question and eliminate choices that do not match that idea."
      : "Start by identifying the key concept being tested, then compare each option against that concept instead of guessing quickly.",
  concept: body?.topic || "Core concept"
});

export const buildAskFallback = (body?: Partial<AskRequestBody>): AskResponseBody => ({
  answer: `Gemini is unavailable right now. Re-read the question through the lens of ${body?.topic || "the core concept"} and break your thinking into: what is being asked, which evidence matters, and which options or ideas can be eliminated first.`
});

export const buildAiFeedbackFallback = (
  body: AiFeedbackRequestBody
): AiFeedbackResponseBody => {
  const weakAreas = uniqueStrings(
    body.wrongAnswers.map((item) => compactWhitespace(item.topic || "General quiz concept"))
  );
  const hasPerfectScore = body.score >= body.totalQuestions;

  if (hasPerfectScore) {
    return {
      overallFeedback:
        "Excellent work. Your score shows strong understanding, so the next step is reinforcing speed, confidence, and deeper application.",
      weakAreas: ["Advanced practice"],
      mistakes: [],
      improvementPlan: [
        "Keep practicing mixed-difficulty questions to maintain speed and accuracy.",
        "Challenge yourself with case-based and integrated questions."
      ],
      recommendedPractice: [
        "Revise one tough topic from memory without looking at notes.",
        "Attempt another timed quiz to strengthen retention."
      ]
    };
  }

  return {
    overallFeedback: `You scored ${body.score} out of ${body.totalQuestions}. Your mistakes suggest a few concept gaps, but they look fixable with targeted revision and more deliberate option elimination.`,
    weakAreas: weakAreas.length > 0 ? weakAreas : ["Question interpretation"],
    mistakes: body.wrongAnswers.slice(0, 8).map((item) => ({
      question: item.question,
      whatIDidWrong:
        item.studentAnswer && item.studentAnswer !== "No answer provided"
          ? `Your response was "${item.studentAnswer}", which did not line up with the expected idea behind this question.`
          : "You either left this blank or did not give a usable answer, which usually points to uncertainty about the core concept.",
      correctConcept: item.topic || "Core concept",
      howToImprove:
        "Review the underlying concept, then practice explaining why the correct answer works and why the other choices do not."
    })),
    improvementPlan: [
      "Revise the weak topics one by one instead of rereading everything at once.",
      "After each revision session, solve 5 to 10 similar questions and explain your reasoning out loud.",
      "Pay extra attention to keywords in the question before choosing an answer."
    ],
    recommendedPractice: [
      "Retry the wrong questions after a short break without looking at the answers first.",
      "Use one short summary sheet per weak topic with definitions, patterns, and common traps."
    ]
  };
};
