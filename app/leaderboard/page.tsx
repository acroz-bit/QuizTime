import { DashboardShell } from "@/components/dashboard-shell";
import { leaderboardSeed } from "@/lib/sample-data";
import { requireUser } from "@/lib/auth";

export default async function LeaderboardPage() {
  await requireUser();

  return (
    <DashboardShell
      heading="Leaderboard"
      subheading="Friendly competition that rewards consistency, speed, and quiz accuracy."
    >
      <section className="glass-panel rounded-[32px] p-6">
        <div className="grid gap-4">
          {leaderboardSeed.map((entry, index) => (
            <div
              key={entry.name}
              className="grid gap-4 rounded-[24px] border border-white/10 bg-white/5 p-5 md:grid-cols-[80px_1fr_120px_120px_160px]"
            >
              <div className="text-2xl font-semibold text-cyan-200">#{index + 1}</div>
              <div>
                <p className="font-semibold text-white">{entry.name}</p>
                <p className="text-sm text-white/55">{entry.badge}</p>
              </div>
              <div className="text-sm text-white/70">{entry.xp} XP</div>
              <div className="text-sm text-white/70">{entry.streak} day streak</div>
              <div className="text-sm text-white/70">{entry.badge}</div>
            </div>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
