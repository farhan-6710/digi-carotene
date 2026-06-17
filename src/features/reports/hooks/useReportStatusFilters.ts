import { useCallback, useState } from "react";
import { useSearchParams } from "react-router";

import { getDefaultReportStatusFilters } from "@/features/reports/constants/reports";
import type { ReportDateRange } from "@/features/reports/types/types";
import {
  buildReportStatusSearchParams,
  parseReportStatusesFromSearchParams,
} from "@/features/reports/utils/reportsUrlParams";
import type { StatusKey } from "@/features/posts-management/types/types";

type UseReportStatusFiltersOptions = {
  appliedRange: ReportDateRange;
  loadReport: (from: Date, to: Date, statuses: StatusKey[]) => Promise<void>;
};

export function useReportStatusFilters({
  appliedRange,
  loadReport,
}: UseReportStatusFiltersOptions) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeStatuses, setActiveStatuses] = useState<StatusKey[]>(
    () =>
      parseReportStatusesFromSearchParams(searchParams) ??
      getDefaultReportStatusFilters(),
  );

  const syncStatusesToUrl = useCallback(
    (statuses: StatusKey[]) => {
      setSearchParams(
        (current) => buildReportStatusSearchParams(statuses, current),
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const toggleStatusFilter = useCallback(
    (status: StatusKey) => {
      let nextStatuses: StatusKey[];

      if (activeStatuses.includes(status)) {
        const next = activeStatuses.filter((entry) => entry !== status);
        if (next.length === 0) {
          return;
        }
        nextStatuses = next;
      } else {
        nextStatuses = [...activeStatuses, status];
      }

      setActiveStatuses(nextStatuses);
      syncStatusesToUrl(nextStatuses);

      if (appliedRange.from) {
        const to = appliedRange.to ?? appliedRange.from;
        void loadReport(appliedRange.from, to, nextStatuses);
      }
    },
    [activeStatuses, appliedRange.from, appliedRange.to, loadReport, syncStatusesToUrl],
  );

  return {
    activeStatuses,
    setActiveStatuses,
    toggleStatusFilter,
    syncStatusesToUrl,
    searchParams,
    setSearchParams,
  };
}
