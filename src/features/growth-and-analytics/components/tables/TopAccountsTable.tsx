import { DirectoryTable } from "@/shared/components/DirectoryTable";
import { cn } from "@/shared/lib/utils";

import { MobileLabel, PlatformBadge } from "./tableBits";
import type { TopAccountsTableProps } from "../../types/components";
import { formatCompact, formatPercent } from "../../utils/formatters";

const GRID_CLASS = "grid-cols-[1.6fr_1fr_0.8fr_0.8fr]";

export function TopAccountsTable({ rows }: TopAccountsTableProps) {
  return (
    <DirectoryTable
      title="Top Performing Accounts"
      description="Ranked by reach across the selected period."
      gridClass={GRID_CLASS}
      columns={[
        { label: "ACCOUNT" },
        { label: "PLATFORM" },
        { label: "FOLLOWERS", align: "right" },
        { label: "ENGAGEMENT", align: "right" },
      ]}
      isLoading={false}
      isEmpty={rows.length === 0}
      emptyMessage="No accounts connected yet."
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
            <MobileLabel>ACCOUNT</MobileLabel>
            {row.name}
          </div>
          <div>
            <MobileLabel>PLATFORM</MobileLabel>
            <PlatformBadge platform={row.platform} />
          </div>
          <div className="text-right font-mono text-sm text-foreground sm:text-right">
            <MobileLabel>FOLLOWERS</MobileLabel>
            {formatCompact(row.followers)}
          </div>
          <div className="text-right font-mono text-sm text-primary sm:text-right">
            <MobileLabel>ENGAGEMENT</MobileLabel>
            {formatPercent(row.engagementRate)}
          </div>
        </div>
      ))}
    </DirectoryTable>
  );
}
