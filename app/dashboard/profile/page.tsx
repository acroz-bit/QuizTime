import { DashboardShell } from "@/components/dashboard-shell";
import { connectToDatabase } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { User } from "@/models/user";

export default async function ProfilePage() {
  const session = await requireUser();
  await connectToDatabase();
  const user = (await User.findById(session.userId).lean()) as {
    name: string;
    email: string;
    badges: string[];
    xp: number;
    streak: number;
  } | null;

  return (
    <DashboardShell
      heading="Your profile"
      subheading="A quick summary of your momentum, learner identity, and motivation loops."
    >
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel rounded-[30px] p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">Account</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">{user?.name}</h2>
          <p className="mt-3 text-white/60">{user?.email}</p>
        </div>
        <div className="glass-panel rounded-[30px] p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">Badges</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {(user?.badges ?? []).map((badge: string) => (
              <span
                key={badge}
                className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100"
              >
                {badge}
              </span>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] bg-white/5 p-5">
              <p className="text-sm text-white/55">XP</p>
              <p className="mt-2 text-3xl font-semibold text-white">{user?.xp ?? 0}</p>
            </div>
            <div className="rounded-[24px] bg-white/5 p-5">
              <p className="text-sm text-white/55">Streak</p>
              <p className="mt-2 text-3xl font-semibold text-white">{user?.streak ?? 0} days</p>
            </div>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
