"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error ?? "Something went wrong.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="glass-panel w-full max-w-lg rounded-[32px] p-8">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">
        {mode === "signup" ? "Create account" : "Welcome back"}
      </p>
      <h1 className="mt-4 text-4xl font-semibold text-white">
        {mode === "signup" ? "Start your visual learning streak" : "Pick up where you left off"}
      </h1>
      <div className="mt-8 space-y-4">
        {mode === "signup" ? (
          <label className="block">
            <span className="mb-2 block text-sm text-white/65">Full name</span>
            <input
              name="name"
              required
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
              placeholder="Alex Johnson"
            />
          </label>
        ) : null}
        <label className="block">
          <span className="mb-2 block text-sm text-white/65">Email</span>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
            placeholder="you@example.com"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-white/65">Password</span>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
            placeholder="Minimum 6 characters"
          />
        </label>
      </div>
      {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full rounded-full bg-gradient-to-r from-cyan-300 to-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60"
      >
        {loading ? "Please wait..." : mode === "signup" ? "Create account" : "Login"}
      </button>
    </form>
  );
}
