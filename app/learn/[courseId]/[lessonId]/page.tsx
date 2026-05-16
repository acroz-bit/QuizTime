import { notFound } from "next/navigation";
import { CoursePlayer } from "@/components/course-player";
import { DashboardShell } from "@/components/dashboard-shell";
import { connectToDatabase } from "@/lib/db";
import { ensureSeedCourses } from "@/lib/seed";
import { requireUser } from "@/lib/auth";
import { Course } from "@/models/course";
import { Progress } from "@/models/progress";

export default async function CoursePlayerPage({
  params
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = await params;
  const user = await requireUser();
  await connectToDatabase();
  await ensureSeedCourses();

  const course = (await Course.findOne({ slug: courseId }).lean()) as {
    _id: string;
    slug: string;
    title: string;
    accent: string;
    lessons: {
      id: string;
      title: string;
      duration: string;
      summary: string;
      bullets: string[];
      visualType: string;
      content: string;
      quiz: { question: string; options: string[]; answer: string }[];
    }[];
  } | null;
  if (!course) {
    notFound();
  }

  const lesson = course.lessons.find((item) => item.id === lessonId);
  if (!lesson) {
    notFound();
  }

  const progress = (await Progress.findOne({
    userId: user.userId,
    courseId: course._id
  }).lean()) as { percentComplete: number } | null;

  return (
    <DashboardShell
      heading={course.title}
      subheading="A premium split-screen player designed for short attention loops, quick wins, and better concept recall."
    >
      <CoursePlayer
        course={{
          _id: String(course._id),
          slug: course.slug,
          title: course.title,
          accent: course.accent,
          lessons: course.lessons
        }}
        lesson={lesson}
        percentComplete={progress?.percentComplete ?? 0}
      />
    </DashboardShell>
  );
}
