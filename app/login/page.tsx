import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <div className="section-shell flex min-h-screen items-center justify-center py-16">
      <div className="grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_0.85fr]">
        <div className="hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-cyan-300/10 to-fuchsia-300/10 p-10 lg:block">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">Return to flow</p>
          <h2 className="mt-6 text-5xl font-semibold text-white">
            Your streak, courses, and saved progress are waiting.
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-8 text-white/60">
            Jump back into motion lessons, visual summaries, and quick quizzes without losing momentum.
          </p>
        </div>
        <div className="flex flex-col items-center gap-6">
          <AuthForm mode="login" />
          <p className="text-sm text-white/60">
            No account yet?{" "}
            <Link href="/signup" className="text-cyan-200">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
