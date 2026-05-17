import { NextResponse } from "next/server";
import {
  buildAskFallback,
  consumeRateLimit,
  generateGeminiJson,
  getClientIdentifier,
  parseAskRequest,
  type AskResponseBody
} from "@/lib/quiz-ai";

export const runtime = "nodejs";

const ASK_SCHEMA = {
  type: "object",
  properties: {
    answer: {
      type: "string",
      description: "A helpful explanation that supports thinking without directly revealing the final answer."
    }
  },
  required: ["answer"]
} as const;

export async function POST(request: Request) {
  const clientId = getClientIdentifier(request);
  const rateLimit = consumeRateLimit(`${clientId}:quiz-ask`, {
    limit: 20,
    windowMs: 10 * 60 * 1000
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many AI question requests. Please wait a bit before asking again." },
      { status: 429 }
    );
  }

  const body = parseAskRequest(await request.json().catch(() => null));

  if (!body) {
    return NextResponse.json({ error: "Invalid AI ask request body." }, { status: 400 });
  }

  try {
    const result = await generateGeminiJson<AskResponseBody>({
      systemInstruction: [
        "You are a clear and supportive quiz tutor.",
        "Return strict JSON only.",
        "Answer the learner's question in a concept-focused way.",
        "Do not reveal the final option letter, exact final answer, or directly solve the quiz for them before submission.",
        "Explain the idea, reasoning path, or comparison strategy in under 120 words."
      ].join(" "),
      userPayload: body,
      responseJsonSchema: ASK_SCHEMA,
      temperature: 0.45
    });

    return NextResponse.json({
      answer: result.answer?.trim() || buildAskFallback(body).answer
    });
  } catch {
    return NextResponse.json(buildAskFallback(body));
  }
}
