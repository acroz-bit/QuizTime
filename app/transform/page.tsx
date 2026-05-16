import { DashboardShell } from "@/components/dashboard-shell";
import { TransformPanel } from "@/components/transform-panel";
import { requireUser } from "@/lib/auth";

export default async function TransformPage() {
  await requireUser();

  return (
    <DashboardShell
      heading="AI content transform"
      subheading="Paste dense study text and get cleaner bullets, simpler language, and infographic-friendly structure."
    >
      <TransformPanel />
    </DashboardShell>
  );
}
