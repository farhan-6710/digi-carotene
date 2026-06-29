import type { ReportRow, ReportType } from "../types/types";

export const reportTabs: { id: ReportType | "all"; label: string }[] = [
  { id: "all", label: "All Reports" },
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook" },
  { id: "campaigns", label: "Campaigns" },
  { id: "content_performance", label: "Content Performance" },
];

export const savedReports: ReportRow[] = [
  {
    id: "r1",
    title: "Armario Pro — Monthly Organic",
    type: "instagram",
    platform: "instagram",
    periodStart: "2026-05-01",
    periodEnd: "2026-05-31",
    createdAt: "2026-06-01",
  },
  {
    id: "r2",
    title: "OTC Kompally — Page Insights",
    type: "facebook",
    platform: "facebook",
    periodStart: "2026-05-01",
    periodEnd: "2026-05-31",
    createdAt: "2026-06-02",
  },
  {
    id: "r3",
    title: "Summer Sale — Campaign Recap",
    type: "campaigns",
    platform: "campaigns",
    periodStart: "2026-05-10",
    periodEnd: "2026-06-10",
    createdAt: "2026-06-11",
  },
  {
    id: "r4",
    title: "Bloom Theory — Content Breakdown",
    type: "content_performance",
    platform: "instagram",
    periodStart: "2026-05-01",
    periodEnd: "2026-05-31",
    createdAt: "2026-06-03",
  },
  {
    id: "r5",
    title: "Sorshe — Monthly Organic",
    type: "instagram",
    platform: "instagram",
    periodStart: "2026-04-01",
    periodEnd: "2026-04-30",
    createdAt: "2026-05-02",
  },
  {
    id: "r6",
    title: "90's Kitchen — Page Insights",
    type: "facebook",
    platform: "facebook",
    periodStart: "2026-04-01",
    periodEnd: "2026-04-30",
    createdAt: "2026-05-04",
  },
];
