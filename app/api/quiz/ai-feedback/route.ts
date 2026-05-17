import { NextResponse } from "next/server";
import {
  buildAiFeedbackFallback,
  consumeRateLimit,
  generateGeminiJson,
  getClientIdentifier,
  parseAiFeedbackRequest,
  type AiFeedbackResponseBody
} from "@/lib/quiz-ai";

export const runtime = "nodejs";

const AI_FEEDBACK_SCHEMA = {
  type: "object",
  properties: {
    overallFeedback: {
      type: "string",
      description: "Supportive overall feedback based on the score and wrong answers."
    },
    weakAreas: {
      type: "array",
      items: { type: "string" },
      description: "A short list of weak topics or skill gaps."
    },
    mistakes: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          whatIDidWrong: { type: "string" },
          correctConcept: { type: "string" },
          howToImprove: { type: "string" }
        },
        required: ["question", "whatIDidWrong", "correctConcept", "howToImprove"]
      }
    },
    improvementPlan: {
      type: "array",
      items: { type: "string" },
      description: "A short step-by-step improvement plan."
    },
    recommendedPractice: {
      type: "array",
      items: { type: "string" },
      description: "A few focused next-practice suggestions."
    }
  },
  required: [
    "overallFeedback",
    "weakAreas",
    "mistakes",
    "improvementPlan",
    "recommendedPractice"
  ]
} as const;

export async function POST(request: Request) {
  const clientId = getClientIdentifier(request);
  const rateLimit = consumeRateLimit(`${clientId}:quiz-ai-feedback`, {
    limit: 8,
    windowMs: 10 * 60 * 1000
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many AI feedback requests. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  const body = parseAiFeedbackRequest(await request.json().catch(() => null));

  if (!body) {
    return NextResponse.json({ error: "Invalid AI feedback request body." }, { status: 400 });
  }

  try {
    const result = await generateGeminiJson<AiFeedbackResponseBody>({
      systemInstruction: [
        "You are a student-friendly quiz coach.",
        "Return strict JSON only.",
        "Do not change the user's score or total questions.",
        "Base the analysis only on the supplied wrong answers and score.",
        "Be specific, practical, encouraging, and concise.",
        "Avoid markdown and avoid generic motivational filler.",
        "If there are no wrong answers, congratulate the learner and suggest advanced practice."
      ].join(" "),
      userPayload: body,
      responseJsonSchema: AI_FEEDBACK_SCHEMA,
      temperature: 0.35
    });

    return NextResponse.json({
      overallFeedback: result.overallFeedback?.trim() || buildAiFeedbackFallback(body).overallFeedback,
      weakAreas:
        Array.isArray(result.weakAreas) && result.weakAreas.length > 0
          ? result.weakAreas.map((item) => item.trim()).filter(Boolean)
          : buildAiFeedbackFallback(body).weakAreas,
      mistakes:
        Array.isArray(result.mistakes) && result.mistakes.length > 0
          ? result.mistakes.map((item) => ({
              question: item.question?.trim() || "Question review",
              whatIDidWrong: item.whatIDidWrong?.trim() || "Your answer did not align with the expected concept.",
              correctConcept: item.correctConcept?.trim() || "Core concept",
              howToImprove: item.howToImprove?.trim() || "Review the concept and retry a similar question."
            }))
          : buildAiFeedbackFallback(body).mistakes,
      improvementPlan:
        Array.isArray(result.improvementPlan) && result.improvementPlan.length > 0
          ? result.improvementPlan.map((item) => item.trim()).filter(Boolean)
          : buildAiFeedbackFallback(body).improvementPlan,
      recommendedPractice:
        Array.isArray(result.recommendedPractice) && result.recommendedPractice.length > 0
          ? result.recommendedPractice.map((item) => item.trim()).filter(Boolean)
          : buildAiFeedbackFallback(body).recommendedPractice
    });
  } catch {
    return NextResponse.json(buildAiFeedbackFallback(body));
  }
}
