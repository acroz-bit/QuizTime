import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Course } from "@/models/course";
import { Progress } from "@/models/progress";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const progress = await Progress.find({ userId: user.userId }).lean();
  return NextResponse.json(progress);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const { courseId, lessonId } = await request.json();
  const course = (await Course.findById(courseId).lean()) as {
    lessons: { id: string }[];
  } | null;
  if (!course) {
    return NextResponse.json({ error: "Course not found." }, { status: 404 });
  }

  const progress = await Progress.findOneAndUpdate(
    { userId: user.userId, courseId },
    {
      $set: { lessonId, lastVisitedAt: new Date() },
      $addToSet: { completedLessons: lessonId }
    },
    {
      new: true,
      upsert: true
    }
  );

  const completedSize = progress.completedLessons.length;
  progress.percentComplete = Math.round((completedSize / course.lessons.length) * 100);
  await progress.save();

  return NextResponse.json(progress);
}
