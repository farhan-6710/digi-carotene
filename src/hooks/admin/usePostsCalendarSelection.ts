import { useCallback, useMemo, useState } from "react";

import {
  buildMonthWeeks,
  toCalendarParts,
} from "@/utils/admin/posts-management/calendarUtils";

export function usePostsCalendarSelection(initialDate = new Date()) {
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const { year, month } = useMemo(
    () => toCalendarParts(selectedDate),
    [selectedDate],
  );

  const calendarWeeks = useMemo(
    () => buildMonthWeeks(year, month),
    [year, month],
  );

  const selectDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  return {
    selectedDate,
    calendarWeeks,
    year,
    month,
    selectDate,
  };
}
