import { analyticsStats } from "@/shared/fixtures/sessionActivityMock";
import { buildAgencyAnalyticsStatCards } from "@/features/analytics/utils/analyticsStatsUtils";
import { StatsCards } from "@/shared/components/StatsCards";

export function AgencyAnalyticsPanel() {
  const statCards = buildAgencyAnalyticsStatCards(analyticsStats);

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Year-at-a-glance publishing consistency and posting streaks across Digi Carotene.
      </p>
      <StatsCards cards={statCards} />
    </div>
  );
}
