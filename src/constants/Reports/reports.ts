import type {
  ClinicReport,
  ReportStatCard,
} from "@/types/Reports/types";

export const reportStats: ReportStatCard[] = [
  {
    label: "Reports Generated",
    value: "48",
    delta: "+6",
    deltaLabel: "this month",
    trend: "positive",
  },
  {
    label: "Session Attendance Rate",
    value: "92%",
    delta: "+3.2%",
    deltaLabel: "vs last quarter",
    trend: "positive",
  },
  {
    label: "Billing Collected",
    value: "$24.8k",
    delta: "+$1.4k",
    deltaLabel: "vs last month",
    trend: "positive",
  },
  {
    label: "Compliance Score",
    value: "98%",
    delta: "-1%",
    deltaLabel: "from last audit",
    trend: "negative",
  },
];

export const clinicReports: ClinicReport[] = [
  {
    id: "RPT-2401",
    title: "Monthly Patient Outcomes",
    category: "patient-outcomes",
    period: "May 2026",
    status: "ready",
    lastGenerated: "May 26, 2026",
    format: "PDF",
  },
  {
    id: "RPT-2402",
    title: "Weekly Session Summary",
    category: "session-summary",
    period: "May 19 – May 25, 2026",
    status: "ready",
    lastGenerated: "May 25, 2026",
    format: "CSV",
  },
  {
    id: "RPT-2403",
    title: "Insurance Billing Summary",
    category: "billing",
    period: "May 2026",
    status: "generating",
    lastGenerated: "May 27, 2026",
    format: "PDF",
  },
  {
    id: "RPT-2404",
    title: "Clinic Compliance Audit",
    category: "compliance",
    period: "Q2 2026",
    status: "scheduled",
    lastGenerated: "Jun 1, 2026",
    format: "PDF",
  },
  {
    id: "RPT-2405",
    title: "No-Show & Cancellation Trends",
    category: "session-summary",
    period: "Apr – May 2026",
    status: "ready",
    lastGenerated: "May 20, 2026",
    format: "CSV",
  },
  {
    id: "RPT-2406",
    title: "Rehab Progress Benchmarks",
    category: "patient-outcomes",
    period: "May 2026",
    status: "ready",
    lastGenerated: "May 22, 2026",
    format: "PDF",
  },
];

export const reportCategoryLabels: Record<
  ClinicReport["category"],
  string
> = {
  "patient-outcomes": "Patient Outcomes",
  "session-summary": "Session Summary",
  billing: "Billing",
  compliance: "Compliance",
};

export const reportStatusLabels: Record<ClinicReport["status"], string> = {
  ready: "Ready",
  generating: "Generating",
  scheduled: "Scheduled",
};
