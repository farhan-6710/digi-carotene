import { needsAttentionPosts } from "@/constants/dashboard";
import { Link } from "react-router";

const statusStyles: Record<string, { dot: string; text: string }> = {
  Missed: { dot: "bg-status-missed", text: "text-status-missed" },
  "Due Today": { dot: "bg-status-scheduled", text: "text-status-scheduled" },
  "Needs Review": { dot: "bg-status-draft", text: "text-status-draft" },
};

const NeedsAttention = () => {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Needs Attention</div>
        <Link
          to="/admin/appointments-management"
          className="text-sm font-medium text-primary hover:opacity-90"
        >
          View appointments <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="mt-4 space-y-4">
        {needsAttentionPosts.map((row) => {
          const styles = statusStyles[row.status];

          return (
            <div
              key={`${row.time}-${row.from}`}
              className="flex items-start gap-3"
            >
              <div
                className={[
                  "mt-2 size-2 rounded-full",
                  styles?.dot ?? "bg-primary/80",
                ].join(" ")}
              />
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">{row.from}</div>
                  <div
                    className={
                      "text-xs " + (styles?.text ?? "text-muted-foreground")
                    }
                  >
                    • {row.status}
                  </div>
                </div>
                <div className="mt-1 font-mono text-xs text-muted-foreground">
                  Due: {row.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NeedsAttention;
