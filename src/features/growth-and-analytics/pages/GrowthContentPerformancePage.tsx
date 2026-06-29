import { useState } from "react";

import { GrowthBarChart } from "../components/charts/GrowthBarChart";
import { GrowthDonutChart } from "../components/charts/GrowthDonutChart";
import { GrowthPageSelect } from "../components/GrowthPageSelect";
import { ContentPostsTable } from "../components/tables/ContentPostsTable";
import {
  contentAccountOptions,
  contentPosts,
  contentStatCards,
  contentTypeSplit,
  engagementByType,
} from "../constants/contentPerformanceData";
import { PageContent } from "@/shared/components/PageContent";
import { PageHeader } from "@/shared/components/PageHeader";
import { StatsCards } from "@/shared/components/StatsCards";

export function GrowthContentPerformancePage() {
  const [accountId, setAccountId] = useState(contentAccountOptions[0].value);

  return (
    <PageContent>
      <PageHeader
        heading="Content Performance"
        description="Break down how individual posts perform across formats and engagement."
        actions={
          <GrowthPageSelect
            label="Account"
            value={accountId}
            options={contentAccountOptions}
            onChange={setAccountId}
          />
        }
      />

      <StatsCards cards={contentStatCards} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <GrowthDonutChart
          title="Posts by Content Type"
          description="Distribution of published formats."
          data={contentTypeSplit}
          centerLabel="Posts"
        />
        <GrowthBarChart
          title="Avg Engagement by Format"
          description="Engagement rate (%) by content type."
          data={engagementByType}
          color="var(--accent)"
        />
      </div>

      <ContentPostsTable rows={contentPosts} />
    </PageContent>
  );
}
