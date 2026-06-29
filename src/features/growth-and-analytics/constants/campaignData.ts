import { MousePointerClick, Target, TrendingUp, Wallet } from "lucide-react";

import type { StatCardItem } from "@/shared/types/statsCards";

import type { CampaignRow, SpendPoint } from "../types/types";

export const adAccountOptions = [
  { value: "armario-ads", label: "Armario Pro — Ads (INR)" },
  { value: "otc-ads", label: "OTC Kompally — Ads (INR)" },
  { value: "bloom-ads", label: "Bloom Theory — Ads (INR)" },
];

export const campaignStatCards: StatCardItem[] = [
  {
    id: "spend",
    label: "Total Spend",
    value: "₹4.82L",
    description: "Last 30 days",
    delta: "+6.3%",
    deltaLabel: "vs prev period",
    trend: "positive",
    icon: Wallet,
  },
  {
    id: "impressions",
    label: "Impressions",
    value: "3.2M",
    description: "Across 6 campaigns",
    delta: "+14.1%",
    deltaLabel: "vs prev period",
    trend: "positive",
    icon: Target,
  },
  {
    id: "clicks",
    label: "Clicks",
    value: "86.4K",
    description: "Across 6 campaigns",
    delta: "+9.8%",
    deltaLabel: "vs prev period",
    trend: "positive",
    icon: MousePointerClick,
  },
  {
    id: "conversions",
    label: "Conversions",
    value: "3,140",
    description: "Tracked via pixel",
    delta: "+4.5%",
    deltaLabel: "vs prev period",
    trend: "positive",
    icon: TrendingUp,
  },
];

export const spendTrend: SpendPoint[] = [
  { label: "Week 1", spend: 98000, clicks: 18200 },
  { label: "Week 2", spend: 112000, clicks: 21400 },
  { label: "Week 3", spend: 134000, clicks: 24600 },
  { label: "Week 4", spend: 138000, clicks: 22200 },
];

export const campaigns: CampaignRow[] = [
  {
    id: "c1",
    name: "Summer Sale — Conversion",
    status: "Active",
    spend: 184000,
    impressions: 1240000,
    clicks: 34200,
    ctr: 2.76,
    conversions: 1420,
  },
  {
    id: "c2",
    name: "Brand Awareness — Reels",
    status: "Active",
    spend: 96000,
    impressions: 980000,
    clicks: 18600,
    ctr: 1.9,
    conversions: 320,
  },
  {
    id: "c3",
    name: "Retargeting — Cart Abandon",
    status: "Paused",
    spend: 72000,
    impressions: 410000,
    clicks: 16800,
    ctr: 4.1,
    conversions: 980,
  },
  {
    id: "c4",
    name: "New Menu Launch",
    status: "Completed",
    spend: 130000,
    impressions: 620000,
    clicks: 16800,
    ctr: 2.71,
    conversions: 420,
  },
];
