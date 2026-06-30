import { useMemo, useState } from "react";

import {
  DUMMY_DASHBOARD_ACCOUNTS,
  getDummyPostsForAccount,
} from "../constants/dashboardData";
import type { OrganicAccount } from "../types/types";
import {
  buildContentStatCards,
  buildContentTypeSplit,
  buildEngagementByType,
  mapPostRows,
} from "../utils/contentMetrics";
import { filterPostsByRange } from "../utils/dashboardDataFilters";
import { saveGrowthReport } from "../utils/generateReport";
import { resolveGrowthReportPeriod } from "../utils/reportPeriod";
import { useGrowthDateRange } from "./useGrowthDateRange";

function platformLabel(account: OrganicAccount): string {
  return account.platform === "instagram" ? "Instagram" : "Facebook";
}

export function useGrowthContentPerformance() {
  const { range, dateFilterProps, periodLabel } = useGrowthDateRange();
  const accounts = DUMMY_DASHBOARD_ACCOUNTS;

  const [selectedId, setSelectedId] = useState(accounts[0]?.id ?? "");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const activeAccount =
    accounts.find((account) => account.id === selectedId) ?? accounts[0];
  const accountId = activeAccount?.id ?? "";

  const posts = useMemo(
    () => filterPostsByRange(getDummyPostsForAccount(accountId), range),
    [accountId, range],
  );

  const accountOptions = useMemo(
    () =>
      accounts.map((account) => ({
        value: account.id,
        label: `${account.accountName} (${platformLabel(account)})`,
      })),
    [accounts],
  );

  const statCards = useMemo(() => buildContentStatCards(posts), [posts]);
  const typeSplit = useMemo(() => buildContentTypeSplit(posts), [posts]);
  const engagementByType = useMemo(() => buildEngagementByType(posts), [posts]);
  const postRows = useMemo(() => mapPostRows(posts), [posts]);

  const generateReport = async () => {
    if (!activeAccount) return;

    const { periodStart, periodEnd } = resolveGrowthReportPeriod(range);
    setIsGeneratingReport(true);
    try {
      await saveGrowthReport({
        title: `${activeAccount.accountName} — Content Performance`,
        type: "content_performance",
        platform: activeAccount.platform,
        periodStart,
        periodEnd,
      });
    } finally {
      setIsGeneratingReport(false);
    }
  };

  return {
    accountOptions,
    accountId,
    setAccountId: setSelectedId,
    statCards,
    typeSplit,
    engagementByType,
    postRows,
    isLoading: false,
    error: null,
    dateFilterProps,
    periodLabel,
    generateReport,
    isGeneratingReport,
    hasAccounts: accounts.length > 0,
  };
}
