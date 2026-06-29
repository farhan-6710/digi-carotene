import { DirectoryTable } from "@/shared/components/DirectoryTable";
import { cn } from "@/shared/lib/utils";

import { MobileLabel } from "./tableBits";
import type { ContentPostsTableProps } from "../../types/components";
import { formatCompact, formatPercent } from "../../utils/formatters";

const GRID_CLASS = "grid-cols-[2fr_0.8fr_0.8fr_0.7fr_0.8fr]";

export function ContentPostsTable({ rows }: ContentPostsTableProps) {
  return (
    <DirectoryTable
      title="Post Performance"
      description="Individual post metrics for the selected account and period."
      gridClass={GRID_CLASS}
      columns={[
        { label: "POST" },
        { label: "TYPE" },
        { label: "REACH", align: "right" },
        { label: "LIKES", align: "right" },
        { label: "ENG. RATE", align: "right" },
      ]}
      isLoading={false}
      isEmpty={rows.length === 0}
      emptyMessage="No posts found for this period."
    >
      {rows.map((row) => (
        <div
          key={row.id}
          className={cn(
            "grid items-center gap-2 px-6 py-4 transition-colors hover:bg-muted/10 sm:gap-4",
            GRID_CLASS,
          )}
        >
          <div className="text-sm font-medium text-foreground">
            <MobileLabel>POST</MobileLabel>
            <span className="line-clamp-1">{row.caption}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <MobileLabel>TYPE</MobileLabel>
            {row.mediaType}
          </div>
          <div className="text-right font-mono text-sm text-foreground">
            <MobileLabel>REACH</MobileLabel>
            {formatCompact(row.reach)}
          </div>
          <div className="text-right font-mono text-sm text-foreground">
            <MobileLabel>LIKES</MobileLabel>
            {formatCompact(row.likes)}
          </div>
          <div className="text-right font-mono text-sm text-primary">
            <MobileLabel>ENG. RATE</MobileLabel>
            {formatPercent(row.engagementRate)}
          </div>
        </div>
      ))}
    </DirectoryTable>
  );
}
