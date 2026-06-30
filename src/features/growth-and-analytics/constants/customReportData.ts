import { buildReportableAccounts } from "../utils/reportableAccounts";
import { DUMMY_AD_ACCOUNTS } from "./campaignData";
import { DUMMY_DASHBOARD_ACCOUNTS } from "./dashboardData";

export const DUMMY_REPORTABLE_ACCOUNTS = buildReportableAccounts(
  DUMMY_DASHBOARD_ACCOUNTS,
  DUMMY_AD_ACCOUNTS,
);

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
  selectedAccountIds: DUMMY_REPORTABLE_ACCOUNTS.slice(0, 2).map(
    (account) => account.id,
  ),
  selectedMetricIds: ["followers", "reach", "engagement", "topPosts"],
  format: "pdf",
};
