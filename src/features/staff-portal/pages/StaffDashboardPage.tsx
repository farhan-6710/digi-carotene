import { StaffNeedsAttention } from "@/features/staff-portal/components/StaffNeedsAttention";
import { StaffPostingChart } from "@/features/staff-portal/components/StaffPostingChart";
import { useStaffDashboardQuery } from "@/features/staff-portal/hooks/useStaffDashboardQuery";
import { PostsTopClientsTable } from "@/features/analytics/components/PostsTopClientsTable";
import { ErrorBanner } from "@/shared/components/ErrorBanner";
import { PageHeader } from "@/shared/components/PageHeader";
import { StatsCards } from "@/shared/components/StatsCards";

export function StaffDashboardPage() {
  const { statCards, topClients, isStatsLoading, isPostsLoading, error } =
    useStaffDashboardQuery();

  return (
    <section className="space-y-8">
      <PageHeader
        heading="Dashboard"
        description="Real-time operations, team workload, and publishing performance."
      />

      {error ? <ErrorBanner message={error} /> : null}

      <StatsCards cards={statCards} isLoading={isStatsLoading} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <StaffPostingChart />
          <PostsTopClientsTable clients={topClients} isLoading={isPostsLoading} />
        </div>

        <div className="lg:col-span-1">
          <StaffNeedsAttention />
        </div>
      </div>
    </section>
  );
}
