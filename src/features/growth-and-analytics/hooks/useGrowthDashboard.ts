import { useMemo, useState } from "react";

import {
  DUMMY_DASHBOARD_ACCOUNTS,
  getDummyMetricsForAccount,
  getDummyPostsForAccount,
} from "../constants/dashboardData";
import type { OrganicAccount } from "../types/types";
import { buildDashboardStatCards } from "../utils/dashboardMetrics";
import {
  filterMetricsByRange,
  filterPostsByRange,
  sumInteractionTotals,
} from "../utils/dashboardDataFilters";
import { buildContentTypeSplit } from "../utils/contentMetrics";
import { useGrowthDateRange } from "./useGrowthDateRange";

function platformLabel(account: OrganicAccount): string {
  return account.platform === "instagram" ? "Instagram" : "Facebook";
}

export function useGrowthDashboard() {
  const { range, dateFilterProps, periodLabel } = useGrowthDateRange();
  const accounts = DUMMY_DASHBOARD_ACCOUNTS;

  const [selectedId, setSelectedId] = useState(accounts[0]?.id ?? "");
  const activeAccount =
    accounts.find((account) => account.id === selectedId) ?? accounts[0];
  const accountId = activeAccount?.id ?? "";

  const metrics = useMemo(
    () => filterMetricsByRange(getDummyMetricsForAccount(accountId), range),
    [accountId, range],
  );

  const posts = useMemo(
    () => filterPostsByRange(getDummyPostsForAccount(accountId), range),
    [accountId, range],
  );

  const interactionTotals = useMemo(
    () => sumInteractionTotals(metrics),
    [metrics],
  );

  const accountOptions = useMemo(
    () =>
      accounts.map((account) => ({
        value: account.id,
        label: `${account.accountName} (${platformLabel(account)})`,
      })),
    [accounts],
  );

  const showTotalFollowers = !range.from && !range.to;

  const statCards = useMemo(
    () =>
      buildDashboardStatCards(
        metrics,
        activeAccount,
        interactionTotals,
        showTotalFollowers,
      ),
    [metrics, activeAccount, interactionTotals, showTotalFollowers],
  );

  const contentTypeSplit = useMemo(
    () => buildContentTypeSplit(posts),
    [posts],
  );

  return {
    accountOptions,
    accountId,
    setAccountId: setSelectedId,
    statCards,
    chartRows: metrics,
    contentTypeSplit,
    isLoading: false,
    error: null,
    dateFilterProps,
    periodLabel,
    hasAccounts: accounts.length > 0,
  };
}
