import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router";

import {
  ANALYTICS_FROM_PARAM,
  ANALYTICS_TO_PARAM,
} from "@/features/analytics/constants/analyticsFilters";
import {
  getTodayUrlDate,
  parseUrlDateParam,
  readUrlDateString,
} from "@/shared/utils/urlDateParams";

export function useUrlDateFields() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(
      (current) => {
        const today = getTodayUrlDate();
        const next = new URLSearchParams(current);
        let changed = false;

        if (!readUrlDateString(next, ANALYTICS_FROM_PARAM)) {
          next.set(ANALYTICS_FROM_PARAM, today);
          changed = true;
        }
        if (!readUrlDateString(next, ANALYTICS_TO_PARAM)) {
          next.set(ANALYTICS_TO_PARAM, today);
          changed = true;
        }

        return changed ? next : current;
      },
      { replace: true },
    );
  }, [setSearchParams]);

  const fromDate =
    readUrlDateString(searchParams, ANALYTICS_FROM_PARAM) ?? getTodayUrlDate();
  const toDate =
    readUrlDateString(searchParams, ANALYTICS_TO_PARAM) ?? getTodayUrlDate();

  const setFromDate = useCallback(
    (value: string) => {
      if (!parseUrlDateParam(value)) {
        return;
      }

      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current);
          next.set(ANALYTICS_FROM_PARAM, value);
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const setToDate = useCallback(
    (value: string) => {
      if (!parseUrlDateParam(value)) {
        return;
      }

      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current);
          next.set(ANALYTICS_TO_PARAM, value);
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  return { fromDate, toDate, setFromDate, setToDate };
}
