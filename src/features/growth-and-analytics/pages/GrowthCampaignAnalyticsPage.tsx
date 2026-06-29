import { useState } from "react";

import { GrowthSpendChart } from "../components/charts/GrowthSpendChart";
import { GrowthPageSelect } from "../components/GrowthPageSelect";
import { CampaignTable } from "../components/tables/CampaignTable";
import {
  adAccountOptions,
  campaignStatCards,
  campaigns,
  spendTrend,
} from "../constants/campaignData";
import { PageContent } from "@/shared/components/PageContent";
import { PageHeader } from "@/shared/components/PageHeader";
import { StatsCards } from "@/shared/components/StatsCards";

export function GrowthCampaignAnalyticsPage() {
  const [adAccountId, setAdAccountId] = useState(adAccountOptions[0].value);

  return (
    <PageContent>
      <PageHeader
        heading="Campaign Analytics"
        description="Track paid performance — spend, reach, clicks, and conversions."
        actions={
          <GrowthPageSelect
            label="Ad Account"
            value={adAccountId}
            options={adAccountOptions}
            onChange={setAdAccountId}
          />
        }
      />

      <StatsCards cards={campaignStatCards} />

      <GrowthSpendChart
        title="Weekly Spend vs Clicks"
        description="Ad spend and click volume across the selected period."
        data={spendTrend}
      />

      <CampaignTable rows={campaigns} />
    </PageContent>
  );
}
