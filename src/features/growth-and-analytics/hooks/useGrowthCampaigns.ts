import { useMemo, useState } from "react";

import {
  DUMMY_AD_ACCOUNTS,
  getDummyCampaignMetrics,
} from "../constants/campaignData";
import {
  buildCampaignRows,
  buildCampaignStatCards,
  buildSpendTrend,
} from "../utils/campaignMetrics";
import { filterCampaignMetricsByRange } from "../utils/dashboardDataFilters";
import { saveGrowthReport } from "../utils/generateReport";
import { resolveGrowthReportPeriod } from "../utils/reportPeriod";
import { useGrowthDateRange } from "./useGrowthDateRange";

export function useGrowthCampaigns() {
  const { range, dateFilterProps, periodLabel } = useGrowthDateRange();
  const accounts = DUMMY_AD_ACCOUNTS;

  const [selectedId, setSelectedId] = useState(accounts[0]?.id ?? "");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const activeAccount =
    accounts.find((account) => account.id === selectedId) ?? accounts[0];
  const adAccountId = activeAccount?.id ?? "";
  const currency = activeAccount?.currency ?? "INR";

  const metrics = useMemo(
    () => filterCampaignMetricsByRange(getDummyCampaignMetrics(adAccountId), range),
    [adAccountId, range],
  );

  const accountOptions = useMemo(
    () =>
      accounts.map((account) => ({
        value: account.id,
        label: `${account.accountName} (${account.currency})`,
      })),
    [accounts],
  );

  const statCards = useMemo(
    () => buildCampaignStatCards(metrics, currency),
    [metrics, currency],
  );
  const spendTrend = useMemo(() => buildSpendTrend(metrics), [metrics]);
  const campaignRows = useMemo(() => buildCampaignRows(metrics), [metrics]);

  const generateReport = async () => {
    if (!activeAccount) return;

    const { periodStart, periodEnd } = resolveGrowthReportPeriod(range);
    setIsGeneratingReport(true);
    try {
      await saveGrowthReport({
        title: `${activeAccount.accountName} — Campaign Analytics`,
        type: "campaigns",
        platform: "campaigns",
        periodStart,
        periodEnd,
      });
    } finally {
      setIsGeneratingReport(false);
    }
  };

  return {
    accountOptions,
    adAccountId,
    setAdAccountId: setSelectedId,
    statCards,
    spendTrend,
    campaignRows,
    isLoading: false,
    error: null,
    dateFilterProps,
    periodLabel,
    generateReport,
    isGeneratingReport,
    hasAccounts: accounts.length > 0,
  };
}
