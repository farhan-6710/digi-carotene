import { ReportStatCards } from "@/components/admin/reports/ReportStatCards";
import { ReportsTable } from "@/components/admin/reports/ReportsTable";
import { reportStats } from "@/constants/admin/reports/reports";

export function ReportsPage() {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Reports</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Review agency performance summaries, billing exports, and compliance
          documents generated for Digi Carotene.
        </p>
      </div>

      <ReportStatCards stats={reportStats} />

      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        {(
          [
            { label: "Ready", color: "bg-status-done" },
            { label: "Generating", color: "bg-status-upcoming" },
            { label: "Scheduled", color: "bg-muted-foreground" },
          ] as const
        ).map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1"
          >
            <span className={`size-2 rounded-full ${item.color}`} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <ReportsTable />
    </section>
  );
}
