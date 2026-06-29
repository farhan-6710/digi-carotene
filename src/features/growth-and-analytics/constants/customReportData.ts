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
  selectedAccountIds: [] as string[],
  selectedMetricIds: ["followers", "reach", "engagement", "topPosts"],
  format: "pdf",
};
