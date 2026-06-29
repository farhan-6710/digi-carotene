import { useState } from "react";

import { GrowthAccountComboBox } from "../components/GrowthAccountComboBox";
import { GrowthSpendChart } from "../components/charts/GrowthSpendChart";
import { CampaignTable } from "../components/tables/CampaignTable";
import {
  adAccountOptions,
  campaignStatCards,
  campaigns,
  spendTrend,
} from "../constants/campaignData";
import { useAnalyticsFilters } from "@/features/analytics/hooks/useAnalyticsFilters";
import { generateGrowthReport } from "../utils/generateReport";
import { DateFilters } from "@/shared/components/DateFilters";
import { PageContent } from "@/shared/components/PageContent";
import { PageHeader } from "@/shared/components/PageHeader";
import { StatsCards } from "@/shared/components/StatsCards";
import { Button } from "@/shared/ui/button";

export function GrowthCampaignAnalyticsPage() {
  const [adAccountId, setAdAccountId] = useState(adAccountOptions[0].value);
  const { periodLabel, dateFilterProps } = useAnalyticsFilters();

  return (
    <PageContent>
      <PageHeader
        heading="Campaign Analytics"
        description="Track paid performance — spend, reach, clicks, and conversions."
        actions={
          <div className="flex flex-wrap items-center justify-end gap-2">
            <DateFilters {...dateFilterProps} />
            <Button
              onClick={() => generateGrowthReport(periodLabel)}
              className="rounded-full"
            >
              Generate Report
            </Button>
          </div>
        }
      />

      <GrowthAccountComboBox
        label="Ad Account"
        value={adAccountId}
        options={adAccountOptions}
        onChange={setAdAccountId}
        placeholder="Select ad account"
      />

      <StatsCards cards={campaignStatCards} />

      <GrowthSpendChart
        title="Weekly Spend vs Conversions"
        description="Ad spend and conversions across the selected period."
        data={spendTrend}
      />

      <CampaignTable rows={campaigns} />
    </PageContent>
  );
}
