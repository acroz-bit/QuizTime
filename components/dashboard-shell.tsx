import Link from "next/link";
import { navigation } from "@/lib/constants";

export function DashboardShell({
  heading,
  subheading,
  children
}: {
  heading: string;
  subheading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#05101d]">
      <div className="section-shell grid gap-8 py-10 lg:grid-cols-[260px_1fr]">
        <aside className="glass-panel rounded-[28px] p-6">
          <Link href="/" className="text-lg font-semibold text-white">
            edTech
          </Link>
          <nav className="mt-8 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-2xl px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/transform"
              className="block rounded-2xl px-4 py-3 text-sm text-cyan-200 transition hover:bg-cyan-300/10"
            >
              AI Transform
            </Link>
            <Link
              href="/leaderboard"
              className="block rounded-2xl px-4 py-3 text-sm text-cyan-200 transition hover:bg-cyan-300/10"
            >
              Leaderboard
            </Link>
          </nav>
        </aside>
        <main className="space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">
              Learning cockpit
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-5xl">
              {heading}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-white/60">{subheading}</p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
