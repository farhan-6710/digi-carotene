import { useCallback, useState } from "react";

import { useUrlDateFields } from "@/shared/hooks/useUrlDateFields";
import { showToast } from "@/shared/utils/showToast";

import { defaultCustomReportForm } from "../constants/customReportData";
import type { CustomReportFormState } from "../types/components";

function toggleId(ids: string[], id: string): string[] {
  return ids.includes(id)
    ? ids.filter((value) => value !== id)
    : [...ids, id];
}

export function useCustomReportBuilder() {
  const { fromDate, toDate, setFromDate, setToDate } = useUrlDateFields();

  const [localValues, setLocalValues] = useState(() => ({
    selectedAccountIds: defaultCustomReportForm.selectedAccountIds,
    selectedMetricIds: defaultCustomReportForm.selectedMetricIds,
    format: defaultCustomReportForm.format,
  }));

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

  const generate = useCallback(() => {
    if (values.selectedAccountIds.length === 0) {
      showToast("error", "Select at least one account to include in the report.");
      return;
    }
    if (values.selectedMetricIds.length === 0) {
      showToast("error", "Select at least one metric to include in the report.");
      return;
    }
    showToast("success", "Report queued — this is a UI preview only.");
  }, [values.selectedAccountIds.length, values.selectedMetricIds.length]);

  return { values, toggleAccount, toggleMetric, changeField, generate };
}
