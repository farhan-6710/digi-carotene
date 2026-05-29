import {
  clinicReports,
  reportCategoryLabels,
  reportStatusLabels,
} from "@/constants/Reports/reports";
import type { ClinicReport } from "@/types/Reports/types";
import { Button } from "@/components/ui/button";

const statusStyles: Record<ClinicReport["status"], string> = {
  ready: "bg-status-done/15 text-status-done",
  generating: "bg-status-upcoming/15 text-status-upcoming",
  scheduled: "bg-muted text-muted-foreground",
};

type ReportsTableProps = {
  reports?: ClinicReport[];
};

export function ReportsTable({ reports = clinicReports }: ReportsTableProps) {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5">
        <div>
          <div className="text-sm font-semibold">Clinic Reports</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Download or track generated summaries for outcomes, billing, and
            compliance.
          </p>
        </div>
        <Button type="button" size="sm">
          Generate report
        </Button>
      </div>

      <div className="border-t border-border">
        <div className="grid grid-cols-[1.4fr_0.9fr_0.9fr_0.7fr_0.9fr_0.6fr] gap-4 bg-muted px-6 py-3 text-xs font-semibold tracking-wider text-muted-foreground max-lg:hidden">
          <div>REPORT</div>
          <div>CATEGORY</div>
          <div>PERIOD</div>
          <div>STATUS</div>
          <div>LAST GENERATED</div>
          <div className="text-right">FORMAT</div>
        </div>

        <div className="divide-y divide-border">
          {reports.map((report) => (
            <div
              key={report.id}
              className="grid gap-3 px-6 py-4 max-lg:space-y-2 lg:grid-cols-[1.4fr_0.9fr_0.9fr_0.7fr_0.9fr_0.6fr] lg:items-center lg:gap-4"
            >
              <div>
                <div className="text-sm font-medium text-foreground">
                  {report.title}
                </div>
                <div className="mt-0.5 font-mono text-xs text-muted-foreground">
                  {report.id}
                </div>
              </div>

              <div className="text-sm text-muted-foreground max-lg:text-xs">
                <span className="font-semibold tracking-wider text-muted-foreground lg:hidden">
                  CATEGORY{" "}
                </span>
                {reportCategoryLabels[report.category]}
              </div>

              <div className="text-sm text-muted-foreground max-lg:text-xs">
                <span className="font-semibold tracking-wider text-muted-foreground lg:hidden">
                  PERIOD{" "}
                </span>
                {report.period}
              </div>

              <div>
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[report.status]}`}
                >
                  {reportStatusLabels[report.status]}
                </span>
              </div>

              <div className="text-sm text-muted-foreground max-lg:text-xs">
                <span className="font-semibold tracking-wider text-muted-foreground lg:hidden">
                  LAST GENERATED{" "}
                </span>
                {report.lastGenerated}
              </div>

              <div className="text-right text-sm font-medium text-foreground max-lg:text-left">
                <span className="font-semibold tracking-wider text-muted-foreground lg:hidden">
                  FORMAT{" "}
                </span>
                {report.format}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
