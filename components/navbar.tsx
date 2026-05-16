import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#06111f]/70 backdrop-blur-2xl">
      <div className="section-shell flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold">
          <span className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-cyan-200">
            edTech
          </span>
          <span className="text-white/85">Visual Learning</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/65 md:flex">
          <Link href="#features">Features</Link>
          <Link href="#courses">Courses</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-gradient-to-r from-cyan-300 to-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/25"
          >
            Start Learning
          </Link>
        </div>
      </div>
    </header>
  );
}
