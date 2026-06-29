import { useMemo } from "react";

import { AnalyticsTabNav } from "@/features/analytics/components/AnalyticsTabNav";
import { AnalyticsTabPanel } from "@/features/analytics/components/AnalyticsTabPanel";
import { useAnalyticsData } from "@/features/analytics/hooks/useAnalyticsData";
import { useAnalyticsFilters } from "@/features/analytics/hooks/useAnalyticsFilters";
import { useAnalyticsTab } from "@/features/analytics/hooks/useAnalyticsTab";
import { filterPostsByAnalyticsFilter } from "@/features/analytics/utils/analyticsFilterUtils";
import { DateFilters } from "@/shared/components/DateFilters";
import { PageContent } from "@/shared/components/PageContent";
import { ErrorBanner } from "@/shared/components/ErrorBanner";
import { PageHeader } from "@/shared/components/PageHeader";

export function AnalyticsPage() {
  const { activeTab, setActiveTab } = useAnalyticsTab();
  const { data, isLoading, error } = useAnalyticsData();
  const { filter, periodLabel, dateFilterProps } = useAnalyticsFilters();

  const filteredPosts = useMemo(
    () => filterPostsByAnalyticsFilter(data.posts, filter),
    [data.posts, filter],
  );

  return (
    <PageContent>
      <PageHeader
        heading="Analytics"
        description="Explore posts, clients, team members, and agency-wide publishing performance."
      />

      {error ? <ErrorBanner message={error} /> : null}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <AnalyticsTabNav activeTab={activeTab} onTabChange={setActiveTab} />
        <DateFilters {...dateFilterProps} />
      </div>

      <AnalyticsTabPanel
        activeTab={activeTab}
        data={data}
        filteredPosts={filteredPosts}
        filter={filter}
        periodLabel={periodLabel}
        isLoading={isLoading}
      />
    </PageContent>
  );
}
