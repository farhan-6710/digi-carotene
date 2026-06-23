import { format, parseISO } from "date-fns";

function formatPostDateTime(date: string | null, time: string | null): string {
  if (!date) {
    return "—";
  }

  const dateLabel = format(parseISO(date), "MMM d, yyyy");
  if (!time?.trim()) {
    return dateLabel;
  }

  return `${dateLabel} · ${time}`;
}

export function formatToBePostedOnLabel(
  toBePostedDate: string,
  toBePostedTime: string,
): string {
  return formatPostDateTime(toBePostedDate, toBePostedTime);
}

export function formatPostedOnLabel(
  postedDate: string | null,
  postedTime: string | null,
): string {
  return formatPostDateTime(postedDate, postedTime);
}
