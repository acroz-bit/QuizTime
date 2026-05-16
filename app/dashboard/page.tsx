import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { connectToDatabase } from "@/lib/db";
import { ensureSeedCourses } from "@/lib/seed";
import { requireUser } from "@/lib/auth";
import { Course } from "@/models/course";
import { Progress } from "@/models/progress";
import { formatPercent } from "@/lib/utils";

export default async function DashboardPage() {
  const user = await requireUser();
  await connectToDatabase();
  await ensureSeedCourses();

  const [courses, progress] = await Promise.all([
    Course.find().lean(),
    Progress.find({ userId: user.userId }).lean()
  ]);

  const progressMap = new Map(progress.map((item) => [String(item.courseId), item]));
  const continueCourse = courses[0];

  return (
    <DashboardShell
      heading={`Welcome back, ${user.name.split(" ")[0]}`}
      subheading="Your learning cockpit tracks active courses, visual lessons, and progress streaks in one calm place."
    >
      <section className="grid gap-6 lg:grid-cols-3">
        {[
          ["XP Points", "1200+", "Climb the leaderboard with each lesson"],
          ["Streak", "14 days", "Keep the habit alive with daily micro-learning"],
          ["Completion", "76%", "You are ahead of your weekly revision goal"]
        ].map(([title, value, copy]) => (
          <div key={title} className="glass-panel rounded-[28px] p-6">
            <p className="text-sm text-white/55">{title}</p>
            <p className="mt-3 text-4xl font-semibold text-white">{value}</p>
            <p className="mt-3 text-sm leading-7 text-white/60">{copy}</p>
          </div>
        ))}
      </section>

      <section className="glass-panel rounded-[32px] p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">Continue learning</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">{continueCourse.title}</h2>
            <p className="mt-3 max-w-2xl text-white/60">{continueCourse.description}</p>
          </div>
          <Link
            href={`/learn/${continueCourse.slug}/${continueCourse.lessons[0].id}`}
            className="rounded-full bg-gradient-to-r from-cyan-300 to-sky-400 px-6 py-3 text-sm font-semibold text-slate-950"
          >
            Resume lesson
          </Link>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        {courses.map((course) => {
          const courseProgress = progressMap.get(String(course._id));
          return (
            <div key={String(course._id)} className="glass-panel rounded-[30px] p-6">
              <div className={`rounded-[24px] bg-gradient-to-br ${course.accent} p-6 text-slate-950`}>
                <p className="text-sm font-semibold uppercase tracking-[0.3em]">{course.category}</p>
                <h3 className="mt-8 text-2xl font-semibold">{course.title}</h3>
              </div>
              <p className="mt-5 text-sm leading-7 text-white/60">{course.description}</p>
              <div className="mt-6 flex items-center justify-between text-sm text-white/55">
                <span>{course.duration}</span>
                <span>{formatPercent(courseProgress?.percentComplete ?? 0)}</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-300"
                  style={{ width: `${courseProgress?.percentComplete ?? 0}%` }}
                />
              </div>
              <Link
                href={`/learn/${course.slug}/${course.lessons[0].id}`}
                className="mt-6 inline-flex text-sm font-medium text-cyan-200"
              >
                Open course
              </Link>
            </div>
          );
        })}
      </section>
    </DashboardShell>
  );
}
