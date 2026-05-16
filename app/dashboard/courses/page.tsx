import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { connectToDatabase } from "@/lib/db";
import { ensureSeedCourses } from "@/lib/seed";
import { requireUser } from "@/lib/auth";
import { Course } from "@/models/course";

export default async function CoursesPage() {
  await requireUser();
  await connectToDatabase();
  await ensureSeedCourses();
  const courses = await Course.find().lean();

  return (
    <DashboardShell
      heading="My courses"
      subheading="Browse your active visual courses and jump back into short, engaging lessons."
    >
      <section className="grid gap-6 xl:grid-cols-3">
        {courses.map((course) => (
          <div key={String(course._id)} className="glass-panel rounded-[30px] p-6">
            <div className={`rounded-[26px] bg-gradient-to-br ${course.accent} p-6 text-slate-950`}>
              <p className="text-sm uppercase tracking-[0.3em]">{course.level}</p>
              <h2 className="mt-5 text-2xl font-semibold">{course.title}</h2>
            </div>
            <p className="mt-5 text-sm leading-7 text-white/60">{course.description}</p>
            <Link
              href={`/learn/${course.slug}/${course.lessons[0].id}`}
              className="mt-6 inline-flex rounded-full border border-white/10 px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              Start course
            </Link>
          </div>
        ))}
      </section>
    </DashboardShell>
  );
}
