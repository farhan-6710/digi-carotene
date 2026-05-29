import { format } from "date-fns";

import {
  DEFAULT_POST_TIME,
  POST_AVAILABLE_TIMES,
} from "@/constants/admin/posts-management/postSchedule";

export function normalizePostTime(time: string): string {
  const trimmed = time.trim();
  if (!trimmed) {
    return DEFAULT_POST_TIME;
  }

  const match = POST_AVAILABLE_TIMES.find(
    (option) => option.toLowerCase() === trimmed.toLowerCase(),
  );

  return match ?? trimmed;
}

export function formatPostScheduleLabel(
  year: number,
  month: number,
  date: number,
  time: string,
): string {
  const dateLabel = format(new Date(year, month - 1, date), "MMMM do yyyy");
  return `${dateLabel} · ${time}`;
}

export function isValidPostTime(time: string): boolean {
  return POST_AVAILABLE_TIMES.some(
    (option) => option.toLowerCase() === time.trim().toLowerCase(),
  );
}

export function parsePostDate(
  dateValue: string | null | undefined,
): { year: number; month: number; day: number } | null {
  if (!dateValue) {
    return null;
  }

  const [year, month, day] = dateValue.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return { year, month, day };
}

export function toPostDateString(
  year: number,
  month: number,
  day: number,
): string {
  return format(new Date(year, month - 1, day), "yyyy-MM-dd");
}

export function formatOptionalPostScheduleLabel(
  year: number | null,
  month: number | null,
  day: number | null,
  time: string | null,
): string {
  if (!year || !month || !day || !time?.trim()) {
    return "Not set";
  }

  return formatPostScheduleLabel(year, month, day, time);
}

export function isCompletePostDateTime(
  dateValue: string | null,
  timeValue: string | null,
): boolean {
  return Boolean(dateValue && timeValue?.trim() && isValidPostTime(timeValue));
}
