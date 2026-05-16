export function SkeletonCard() {
  return (
    <div className="glass-panel animate-pulse rounded-[28px] p-6">
      <div className="h-4 w-24 rounded-full bg-white/10" />
      <div className="mt-4 h-8 w-2/3 rounded-full bg-white/10" />
      <div className="mt-6 h-24 rounded-[22px] bg-white/10" />
    </div>
  );
}
