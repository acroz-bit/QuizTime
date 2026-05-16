"use client";

import { useState } from "react";

type TransformResult = {
  summary: string[];
  simplified: string;
  infographic: { title: string; detail: string }[];
};

export function TransformPanel() {
  const [text, setText] = useState(
    "Photosynthesis is the biological process by which green plants, algae, and some bacteria convert light energy into chemical energy stored in glucose. It mainly happens in chloroplasts, using carbon dioxide, water, and sunlight to produce glucose and oxygen."
  );
  const [result, setResult] = useState<TransformResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleTransform() {
    setLoading(true);
    const response = await fetch("/api/ai/transform", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    const data = await response.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
      <div className="glass-panel rounded-[30px] p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">AI input</p>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="mt-5 min-h-[320px] w-full rounded-[24px] border border-white/10 bg-slate-950/50 p-5 text-white outline-none"
        />
        <button
          onClick={handleTransform}
          type="button"
          disabled={loading}
          className="mt-6 rounded-full bg-gradient-to-r from-cyan-300 to-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60"
        >
          {loading ? "Transforming..." : "Transform content"}
        </button>
      </div>
      <div className="space-y-6">
        <div className="glass-panel rounded-[30px] p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">Bullet summary</p>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-white/70">
            {(result?.summary ?? []).map((item) => (
              <li key={item} className="rounded-[20px] bg-white/5 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-panel rounded-[30px] p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">Simplified explanation</p>
          <p className="mt-5 text-sm leading-8 text-white/70">{result?.simplified}</p>
        </div>
        <div className="glass-panel rounded-[30px] p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">Infographic blocks</p>
          <div className="mt-5 grid gap-4">
            {(result?.infographic ?? []).map((item) => (
              <div key={item.title} className="rounded-[22px] bg-white/5 p-4">
                <p className="font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-white/60">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
