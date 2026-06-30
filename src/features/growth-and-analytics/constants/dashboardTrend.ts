export const DASHBOARD_TREND_METRICS = [
  { id: "reach", label: "Reach" },
  { id: "impressions", label: "Impressions" },
  { id: "clicks", label: "Clicks" },
  { id: "saves", label: "Saves" },
  { id: "shares", label: "Share" },
  { id: "likes", label: "Likes" },
  { id: "comments", label: "Comments" },
] as const;

export type DashboardTrendMetric = (typeof DASHBOARD_TREND_METRICS)[number]["id"];

export const DASHBOARD_TREND_METRIC_LABEL: Record<DashboardTrendMetric, string> =
  Object.fromEntries(
    DASHBOARD_TREND_METRICS.map((metric) => [metric.id, metric.label]),
  ) as Record<DashboardTrendMetric, string>;
