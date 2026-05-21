import { dashboardStats } from "../constants/dashboard";
import CustomerRequests from "@/components/dashboard/CustomerRequests";
import TopClients from "@/components/dashboard/TopClients";
import { ArrowUp } from "lucide-react";

function Trend({ delta, label }: { delta: string; label: string }) {
  return (
    <div className="mt-3 flex items-center gap-2 text-xs">
      <span className="inline-flex items-center gap-1 font-medium text-green-500">
        <ArrowUp className="size-3.5 rotate-45" aria-hidden="true" />
        {delta}
      </span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

export function HomePage() {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Posts Management
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Snapshot of monthly post performance and client activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
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
            <Trend delta={stat.delta} label={stat.deltaLabel} />
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TopClients />
        </div>

        {/* Needs attention */}
        <CustomerRequests />
      </div>
    </section>
  );
}
