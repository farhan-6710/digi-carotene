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
