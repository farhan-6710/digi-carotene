import type { GrowthDateRange, PastPostMetric } from "../types/types";

function isDateInRange(date: string, range: GrowthDateRange): boolean {
  if (!range.from && !range.to) {
    return true;
  }

  if (range.from && date < range.from) {
    return false;
  }

  if (range.to && date > range.to) {
    return false;
  }

  return true;
}

export function filterPastPostsByRange(
  posts: PastPostMetric[],
  range: GrowthDateRange,
): PastPostMetric[] {
  return posts.filter((post) =>
    isDateInRange(post.createdAt.slice(0, 10), range),
  );
}
