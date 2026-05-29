import { SessionActivityGraph } from "@/components/analytics/SessionActivityGraph";
import { analyticsStats } from "@/constants/Analytics/sessionActivity";
import type { AnalyticsStatTrend } from "@/types/Analytics/types";
import { ArrowDown, ArrowUp } from "lucide-react";

function Trend({
  delta,
  label,
  trend,
}: {
  delta: string;
  label: string;
  trend: AnalyticsStatTrend;
}) {
  const isPositive = trend === "positive";

  return (
    <div className="mt-3 flex items-center gap-2 text-xs">
      <span
        className={`inline-flex items-center gap-1 font-medium ${
          isPositive ? "text-status-done" : "text-status-missed"
        }`}
      >
        {isPositive ? (
          <ArrowUp className="size-3.5 rotate-45" aria-hidden="true" />
        ) : (
          <ArrowDown className="size-3.5 -rotate-45" aria-hidden="true" />
        )}
        {delta}
      </span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

export function AnalyticsPage() {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Year-at-a-glance view of Reviva session volume and appointment
          consistency across the clinic.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {analyticsStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="text-xs font-semibold tracking-wider text-muted-foreground">
              {stat.label.toUpperCase()}
            </div>
            <div className="mt-4 text-3xl font-semibold tracking-tight">
              {stat.value}
            </div>
            <Trend
              delta={stat.delta}
              label={stat.deltaLabel}
              trend={stat.trend}
            />
          </div>
        ))}
      </div>

      <SessionActivityGraph />
    </section>
  );
}
