import { Eye, MessageCircle, TrendingUp, Users } from "lucide-react";

import type { StatCardItem } from "@/shared/types/statsCards";

import type { DashboardTrendMetric } from "../constants/dashboardTrend";
import type {
  CategoryDatum,
  DailyMetricRow,
  GrowthPlatform,
  InteractionTotals,
  OrganicAccount,
  TrendPoint,
} from "../types/types";
import { formatCompact, monthLabel } from "./formatters";

const TREND_METRIC_FIELD: Record<
  DashboardTrendMetric,
  keyof Pick<
    DailyMetricRow,
    | "reach"
    | "impressions"
    | "clicks"
    | "saves"
    | "shares"
    | "likes"
    | "comments"
  >
> = {
  reach: "reach",
  impressions: "impressions",
  clicks: "clicks",
  saves: "saves",
  shares: "shares",
  likes: "likes",
  comments: "comments",
};

const PLATFORM_LABEL: Record<GrowthPlatform, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
};

const PLATFORM_COLOR: Record<GrowthPlatform, string> = {
  instagram: "var(--chart-1)",
  facebook: "var(--chart-3)",
};

export function buildDashboardStatCards(
  rows: DailyMetricRow[],
  account?: OrganicAccount,
  interactionTotals?: InteractionTotals,
  showTotalFollowers = false,
): StatCardItem[] {
  const totalFollowers = account?.followers ?? 0;
  const totalReach = rows.reduce((sum, row) => sum + row.reach, 0);
  const totalLikes = interactionTotals?.likes ?? 0;
  const totalComments = interactionTotals?.comments ?? 0;
  const totalShares = interactionTotals?.shares ?? 0;
  const totalReposts = interactionTotals?.reposts ?? 0;
  const totalEngagement =
    totalLikes + totalComments + totalShares + totalReposts;
  const netNew = rows.reduce((sum, row) => sum + row.newFollowers, 0);

  const interactionDescription =
    account?.platform === "facebook"
      ? "Range total; breakdown unavailable from Meta page insights"
      : [
          `${formatCompact(totalLikes)} likes`,
          `${formatCompact(totalComments)} comments`,
          `${formatCompact(totalShares)} shares`,
          `${formatCompact(totalReposts)} reposts`,
        ].join(" · ");

  return [
    {
      id: "followers",
      label: showTotalFollowers ? "Total Followers" : "Followers Added",
      value: formatCompact(showTotalFollowers ? totalFollowers : netNew),
      description: showTotalFollowers
        ? "Current audience size"
        : "In selected range",
      icon: Users,
    },
    {
      id: "engagement",
      label: "Total Interactions",
      value: formatCompact(totalEngagement),
      description: interactionDescription,
      icon: MessageCircle,
    },
    {
      id: "reach",
      label: "Total Reach",
      value: formatCompact(totalReach),
      description: "In selected range",
      icon: Eye,
    },
    {
      id: "growth",
      label: "Net New Followers",
      value: formatCompact(netNew),
      description: "In selected range",
      icon: TrendingUp,
    },
  ];
}

export function buildTrend(
  rows: DailyMetricRow[],
  metric: DashboardTrendMetric,
): TrendPoint[] {
  const field = TREND_METRIC_FIELD[metric];
  const byDate = new Map<string, number>();

  for (const row of rows) {
    byDate.set(row.date, (byDate.get(row.date) ?? 0) + row[field]);
  }

  const byMonth = new Map<string, { label: string; value: number }>();

  for (const date of [...byDate.keys()].sort()) {
    const value = byDate.get(date) ?? 0;
    const key = date.slice(0, 7);
    const current = byMonth.get(key) ?? {
      label: monthLabel(date),
      value: 0,
    };
    current.value += value;
    byMonth.set(key, current);
  }

  return [...byMonth.values()];
}

export function buildPlatformSplit(
  _rows: DailyMetricRow[],
  account?: OrganicAccount,
): CategoryDatum[] {
  if (!account) return [];

  return [
    {
      key: account.platform,
      label: PLATFORM_LABEL[account.platform],
      value: account.followers,
      color: PLATFORM_COLOR[account.platform],
    },
  ];
}
