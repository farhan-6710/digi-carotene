import type { CustomReportFormState } from "../types/components";

export const reportableAccounts = [
  { id: "armario", label: "Armario Pro", platform: "Instagram" },
  { id: "bloom", label: "Bloom Theory Cafe", platform: "Instagram" },
  { id: "otc", label: "OTC Kompally", platform: "Facebook" },
  { id: "sorshe", label: "Sorshe", platform: "Instagram" },
  { id: "ninties", label: "90's Authentic Kitchen", platform: "Facebook" },
];

export const reportMetrics = [
  { id: "followers", label: "Follower growth" },
  { id: "reach", label: "Reach & impressions" },
  { id: "engagement", label: "Engagement rate" },
  { id: "topPosts", label: "Top performing posts" },
  { id: "audience", label: "Audience demographics" },
  { id: "spend", label: "Ad spend & ROAS" },
];

export const reportFormatOptions = [
  { value: "pdf", label: "PDF document" },
  { value: "csv", label: "CSV export" },
  { value: "slides", label: "Presentation slides" },
];

export const defaultCustomReportForm = {
  selectedAccountIds: ["armario", "bloom"],
  selectedMetricIds: ["followers", "reach", "engagement", "topPosts"],
  format: "pdf",
} satisfies Omit<CustomReportFormState, "startDate" | "endDate">;
