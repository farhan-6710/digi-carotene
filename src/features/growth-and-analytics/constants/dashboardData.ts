import { Eye, Heart, TrendingUp, Users } from "lucide-react";

import type { StatCardItem } from "@/shared/types/statsCards";

import type { CategoryDatum, TopAccountRow, TrendPoint } from "../types/types";

export const dashboardStatCards: StatCardItem[] = [
  {
    id: "followers",
    label: "Total Followers",
    value: "248.6K",
    description: "Across 12 connected accounts",
    delta: "+4.2%",
    deltaLabel: "vs last month",
    trend: "positive",
    icon: Users,
  },
  {
    id: "engagement",
    label: "Avg Engagement Rate",
    value: "3.8%",
    description: "Weighted across all posts",
    delta: "+0.6%",
    deltaLabel: "vs last month",
    trend: "positive",
    icon: Heart,
  },
  {
    id: "reach",
    label: "Total Reach",
    value: "1.9M",
    description: "Last 30 days",
    delta: "+12.4%",
    deltaLabel: "vs last month",
    trend: "positive",
    icon: Eye,
  },
  {
    id: "growth",
    label: "Net New Followers",
    value: "9.4K",
    description: "Last 30 days",
    delta: "-1.1%",
    deltaLabel: "vs last month",
    trend: "negative",
    icon: TrendingUp,
  },
];

export const dashboardTrend: TrendPoint[] = [
  { label: "Jan", followers: 198000, reach: 1200000, engagement: 3.1 },
  { label: "Feb", followers: 206000, reach: 1340000, engagement: 3.3 },
  { label: "Mar", followers: 213000, reach: 1410000, engagement: 3.5 },
  { label: "Apr", followers: 221000, reach: 1520000, engagement: 3.4 },
  { label: "May", followers: 232000, reach: 1680000, engagement: 3.7 },
  { label: "Jun", followers: 248600, reach: 1900000, engagement: 3.8 },
];

export const platformSplit: CategoryDatum[] = [
  { key: "instagram", label: "Instagram", value: 162400, color: "var(--chart-1)" },
  { key: "facebook", label: "Facebook", value: 86200, color: "var(--chart-3)" },
];

export const topAccounts: TopAccountRow[] = [
  {
    id: "armario",
    name: "Armario Pro",
    platform: "instagram",
    followers: 58200,
    engagementRate: 4.6,
    reach: 412000,
  },
  {
    id: "bloom",
    name: "Bloom Theory Cafe",
    platform: "instagram",
    followers: 41800,
    engagementRate: 5.2,
    reach: 388000,
  },
  {
    id: "otc",
    name: "OTC Kompally",
    platform: "facebook",
    followers: 36400,
    engagementRate: 2.9,
    reach: 254000,
  },
  {
    id: "sorshe",
    name: "Sorshe",
    platform: "instagram",
    followers: 31200,
    engagementRate: 4.1,
    reach: 221000,
  },
  {
    id: "ninties",
    name: "90's Authentic Kitchen",
    platform: "facebook",
    followers: 24600,
    engagementRate: 2.4,
    reach: 168000,
  },
];
