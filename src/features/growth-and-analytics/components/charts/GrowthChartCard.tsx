import type { GrowthChartCardProps } from "../../types/components";
import { cn } from "@/shared/lib/utils";

export function GrowthChartCard({
  title,
  description,
  action,
  isEmpty = false,
  emptyMessage = "No data available yet.",
  className,
  children,
}: GrowthChartCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border border-border bg-card p-6 shadow-xs",
        className,
      )}
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {description ? (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action}
      </div>

      {isEmpty ? (
        <div className="flex min-h-[200px] flex-1 items-center justify-center text-sm text-muted-foreground">
          {emptyMessage}
        </div>
      ) : (
        <div className="flex-1">{children}</div>
      )}
    </div>
  );
}
