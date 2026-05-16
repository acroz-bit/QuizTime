import { NextResponse } from "next/server";

function splitSentences(text: string) {
  return text
    .split(/[.!?]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

export async function POST(request: Request) {
  const { text } = await request.json();

  if (!text || typeof text !== "string") {
    return NextResponse.json({ error: "Text input is required." }, { status: 400 });
  }

  const sentences = splitSentences(text);
  const summary = sentences.slice(0, 4).map((sentence) => sentence.trim());
  const simplified = sentences.join(". ").replace(/\bbiological\b/gi, "life-related");
  const infographic = summary.map((sentence, index) => ({
    title: `Concept ${index + 1}`,
    detail: sentence
  }));

  return NextResponse.json({
    summary,
    simplified,
    infographic
  });
}
