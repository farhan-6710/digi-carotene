import { GrowthDonutChart } from "../components/charts/GrowthDonutChart";
import { GrowthTrendChart } from "../components/charts/GrowthTrendChart";
import { TopAccountsTable } from "../components/tables/TopAccountsTable";
import {
  dashboardStatCards,
  dashboardTrend,
  platformSplit,
  topAccounts,
} from "../constants/dashboardData";
import { PageContent } from "@/shared/components/PageContent";
import { PageHeader } from "@/shared/components/PageHeader";
import { StatsCards } from "@/shared/components/StatsCards";

export function GrowthDashboardPage() {
  return (
    <PageContent>
      <PageHeader
        heading="Dashboard Overview"
        description="Cross-account view of audience growth, reach, and engagement performance."
      />

      <StatsCards cards={dashboardStatCards} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <PageContent className="space-y-6 lg:col-span-2">
          <GrowthTrendChart
            title="Audience Growth & Engagement"
            description="Monthly followers with engagement rate overlay."
            data={dashboardTrend}
          />
          <TopAccountsTable rows={topAccounts} />
        </PageContent>

        <PageContent className="space-y-6 lg:col-span-1">
          <GrowthDonutChart
            title="Followers by Platform"
            description="Share of total audience across connected platforms."
            data={platformSplit}
            centerLabel="Followers"
          />
        </PageContent>
      </div>
    </PageContent>
  );
}
