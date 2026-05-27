import { TaskContributionGraph } from "@/components/analytics/TaskContributionGraph";
import {
  CONTRIBUTION_YEAR,
  contributionSummary,
} from "@/constants/Analytics/taskContributions";
import { formatContributionDate } from "@/lib/analytics/contributionLevels";

const summaryCards = [
  {
    label: "Tasks completed",
    value: contributionSummary.totalCompleted.toLocaleString(),
    hint: `In ${CONTRIBUTION_YEAR} so far`,
  },
  {
    label: "Active days",
    value: contributionSummary.activeDays.toLocaleString(),
    hint: "Days with at least one task done",
  },
  {
    label: "Current streak",
    value: `${contributionSummary.currentStreak} days`,
    hint: "Consecutive days with activity",
  },
  {
    label: "Best day",
    value: `${contributionSummary.bestDay.count} tasks`,
    hint: formatContributionDate(contributionSummary.bestDay.date),
  },
];

export function AnalyticsPage() {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Year-at-a-glance view of your task consistency, styled like a
          contribution graph.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="text-xs font-semibold tracking-wider text-muted-foreground">
              {card.label.toUpperCase()}
            </div>
            <div className="mt-4 text-3xl font-semibold tracking-tight">
              {card.value}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{card.hint}</p>
          </div>
        ))}
      </div>

      <TaskContributionGraph />
    </section>
  );
}
