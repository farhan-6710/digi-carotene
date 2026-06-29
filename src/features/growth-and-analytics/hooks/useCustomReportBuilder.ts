import { useCallback, useState } from "react";

import { showToast } from "@/shared/utils/showToast";

import { defaultCustomReportForm } from "../constants/customReportData";
import type { CustomReportFormState } from "../types/components";

function toggleId(ids: string[], id: string): string[] {
  return ids.includes(id)
    ? ids.filter((value) => value !== id)
    : [...ids, id];
}

export function useCustomReportBuilder() {
  const [values, setValues] = useState<CustomReportFormState>(
    defaultCustomReportForm,
  );

  const toggleAccount = useCallback((id: string) => {
    setValues((prev) => ({
      ...prev,
      selectedAccountIds: toggleId(prev.selectedAccountIds, id),
    }));
  }, []);

  const toggleMetric = useCallback((id: string) => {
    setValues((prev) => ({
      ...prev,
      selectedMetricIds: toggleId(prev.selectedMetricIds, id),
    }));
  }, []);

  const changeField = useCallback(
    (field: "startDate" | "endDate" | "format", value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
    },
    [],
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
