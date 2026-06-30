import { useCallback, useState } from "react";

import {
  DUMMY_REPORTABLE_ACCOUNTS,
  defaultCustomReportForm,
} from "../constants/customReportData";
import type { CustomReportFormState } from "../types/components";
import { buildCustomReportInput } from "../utils/customReportMeta";
import { saveGrowthReport } from "../utils/generateReport";
import { resolveGrowthReportPeriod } from "../utils/reportPeriod";
import { useUrlDateFields } from "@/shared/hooks/useUrlDateFields";
import { showToast } from "@/shared/utils/showToast";

function toggleId(ids: string[], id: string): string[] {
  return ids.includes(id)
    ? ids.filter((value) => value !== id)
    : [...ids, id];
}

export function useCustomReportBuilder() {
  const { fromDate, toDate, setFromDate, setToDate } = useUrlDateFields();
  const reportableAccounts = DUMMY_REPORTABLE_ACCOUNTS;

  const [localValues, setLocalValues] = useState(() => ({
    selectedAccountIds: defaultCustomReportForm.selectedAccountIds,
    selectedMetricIds: defaultCustomReportForm.selectedMetricIds,
    format: defaultCustomReportForm.format,
  }));
  const [isGenerating, setIsGenerating] = useState(false);

  const values: CustomReportFormState = {
    ...localValues,
    startDate: fromDate,
    endDate: toDate,
  };

  const toggleAccount = useCallback((id: string) => {
    setLocalValues((prev) => ({
      ...prev,
      selectedAccountIds: toggleId(prev.selectedAccountIds, id),
    }));
  }, []);

  const toggleMetric = useCallback((id: string) => {
    setLocalValues((prev) => ({
      ...prev,
      selectedMetricIds: toggleId(prev.selectedMetricIds, id),
    }));
  }, []);

  const changeField = useCallback(
    (field: "startDate" | "endDate" | "format", value: string) => {
      if (field === "startDate") {
        setFromDate(value);
        return;
      }
      if (field === "endDate") {
        setToDate(value);
        return;
      }
      setLocalValues((prev) => ({ ...prev, [field]: value }));
    },
    [setFromDate, setToDate],
  );

  const generate = useCallback(async () => {
    if (values.selectedAccountIds.length === 0) {
      showToast("error", "Select at least one account to include in the report.");
      return;
    }
    if (values.selectedMetricIds.length === 0) {
      showToast("error", "Select at least one metric to include in the report.");
      return;
    }

    const { periodStart, periodEnd } = resolveGrowthReportPeriod({
      from: values.startDate,
      to: values.endDate,
    });

    setIsGenerating(true);
    try {
      await saveGrowthReport(
        buildCustomReportInput(
          values.selectedAccountIds,
          reportableAccounts,
          periodStart,
          periodEnd,
        ),
      );
    } finally {
      setIsGenerating(false);
    }
  }, [
    reportableAccounts,
    values.endDate,
    values.selectedAccountIds,
    values.selectedMetricIds.length,
    values.startDate,
  ]);

  return {
    values,
    reportableAccounts,
    isAccountsLoading: false,
    accountsError: null,
    accountsEmpty: false,
    isGenerating,
    toggleAccount,
    toggleMetric,
    changeField,
    generate,
  };
}
