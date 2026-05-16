import { DashboardShell } from "@/components/dashboard-shell";
import { SkeletonCard } from "@/components/skeleton-card";

export default function DashboardLoading() {
  return (
    <DashboardShell heading="Loading dashboard" subheading="Pulling your current streak and course progress.">
      <div className="grid gap-6 lg:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </DashboardShell>
  );
}
