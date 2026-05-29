import { ReportStatCards } from "@/components/reports/ReportStatCards";
import { ReportsTable } from "@/components/reports/ReportsTable";
import { reportStats } from "@/constants/Reports/reports";

export function ReportsPage() {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Review clinic performance summaries, billing exports, and compliance
          documents generated for Reviva.
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
