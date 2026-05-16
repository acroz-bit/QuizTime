import { SkeletonCard } from "@/components/skeleton-card";

export default function Loading() {
  return (
    <div className="section-shell space-y-6 py-16">
      <SkeletonCard />
      <div className="grid gap-6 md:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}
