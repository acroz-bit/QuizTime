import { NextResponse } from "next/server";
import {
  buildHintFallback,
  consumeRateLimit,
  generateGeminiJson,
  getClientIdentifier,
  parseHintRequest,
  type HintResponseBody
} from "@/lib/quiz-ai";

export const runtime = "nodejs";

const HINT_SCHEMA = {
  type: "object",
  properties: {
    hint: {
      type: "string",
      description: "A short thinking-oriented hint that does not reveal the final answer."
    },
    concept: {
      type: "string",
      description: "The main concept the learner should focus on."
    }
  },
  required: ["hint", "concept"]
} as const;

export async function POST(request: Request) {
  const clientId = getClientIdentifier(request);
  const rateLimit = consumeRateLimit(`${clientId}:quiz-hint`, {
    limit: 30,
    windowMs: 10 * 60 * 1000
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many hint requests. Please wait a bit before asking again." },
      { status: 429 }
    );
  }

  const body = parseHintRequest(await request.json().catch(() => null));

  if (!body) {
    return NextResponse.json({ error: "Invalid hint request body." }, { status: 400 });
  }

  if (body.previousHintsCount >= 2) {
    return NextResponse.json<HintResponseBody>({
      hint: "You have already used the available hints for this question. Try re-reading the keywords and eliminating weak options first.",
      concept: body.topic || "Core concept"
    });
  }

  try {
    const result = await generateGeminiJson<HintResponseBody>({
      systemInstruction: [
        "You are an encouraging quiz tutor.",
        "Return strict JSON only.",
        "Do not reveal the correct option, option letter, or exact fill-in-the-blank answer.",
        "Give a short, student-friendly hint that guides thinking.",
        "If this is the second hint, you may be a little more specific, but still do not reveal the answer.",
        "Keep the hint under 40 words."
      ].join(" "),
      userPayload: body,
      responseJsonSchema: HINT_SCHEMA,
      temperature: 0.4
    });

    return NextResponse.json({
      hint: result.hint?.trim() || buildHintFallback(body).hint,
      concept: result.concept?.trim() || body.topic || "Core concept"
    });
  } catch {
    return NextResponse.json(buildHintFallback(body));
  }
}
