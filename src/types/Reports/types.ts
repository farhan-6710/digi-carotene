export type ReportCategory =
  | "patient-outcomes"
  | "session-summary"
  | "billing"
  | "compliance";

export type ReportStatus = "ready" | "generating" | "scheduled";

export type ReportStatTrend = "positive" | "negative";

export type ReportStatCard = {
  label: string;
  value: string;
  delta: string;
  deltaLabel: string;
  trend: ReportStatTrend;
};

export type ClinicReport = {
  id: string;
  title: string;
  category: ReportCategory;
  period: string;
  status: ReportStatus;
  lastGenerated: string;
  format: "PDF" | "CSV";
};
