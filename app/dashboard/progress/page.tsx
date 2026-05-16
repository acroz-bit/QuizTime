import { DashboardShell } from "@/components/dashboard-shell";
import { connectToDatabase } from "@/lib/db";
import { ensureSeedCourses } from "@/lib/seed";
import { requireUser } from "@/lib/auth";
import { Course } from "@/models/course";
import { Progress } from "@/models/progress";
import { formatPercent } from "@/lib/utils";

export default async function ProgressPage() {
  const user = await requireUser();
  await connectToDatabase();
  await ensureSeedCourses();

  const [courses, progress] = await Promise.all([
    Course.find().lean(),
    Progress.find({ userId: user.userId }).lean()
  ]);

  const merged = courses.map((course) => {
    const item = progress.find((entry) => String(entry.courseId) === String(course._id));
    return {
      title: course.title,
      percent: item?.percentComplete ?? 0,
      completed: item?.completedLessons.length ?? 0,
      total: course.lessons.length
    };
  });

  return (
    <DashboardShell
      heading="Progress overview"
      subheading="Track completion, spot lagging courses, and decide where your next revision sprint should go."
    >
      <section className="space-y-6">
        {merged.map((course) => (
          <div key={course.title} className="glass-panel rounded-[28px] p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-semibold text-white">{course.title}</h2>
                <p className="mt-2 text-sm text-white/55">
                  {course.completed}/{course.total} lessons complete
                </p>
              </div>
              <p className="text-2xl font-semibold text-cyan-200">{formatPercent(course.percent)}</p>
            </div>
            <div className="mt-5 h-3 rounded-full bg-white/10">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-300"
                style={{ width: `${course.percent}%` }}
              />
            </div>
          </div>
        ))}
      </section>
    </DashboardShell>
  );
}
