import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { QuizAttempt } from "@/models/quiz-attempt";
import { User } from "@/models/user";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const { courseId, lessonId, answers } = await request.json();
  const score = answers.filter((answer: { correct: boolean }) => answer.correct).length;

  await QuizAttempt.create({
    userId: user.userId,
    courseId,
    lessonId,
    score,
    total: answers.length,
    answers
  });

  const currentUser = await User.findById(user.userId);
  if (currentUser) {
    currentUser.xp += 40;
    if (score === answers.length && !currentUser.badges.includes("Quiz Ace")) {
      currentUser.badges.push("Quiz Ace");
    }
    await currentUser.save();
  }

  return NextResponse.json({ score, total: answers.length });
}
