import type { ContributionLevel } from "@/types/Analytics/types";

export const contributionLevelClasses: Record<ContributionLevel, string> = {
  0: "bg-status-muted",
  1: "bg-contrib-1",
  2: "bg-contrib-2",
  3: "bg-contrib-3",
  4: "bg-contrib-4",
};

export function getContributionLevel(completedCount: number): ContributionLevel {
  if (completedCount <= 0) {
    return 0;
  }

  if (completedCount <= 2) {
    return 1;
  }

  if (completedCount <= 4) {
    return 2;
  }

  if (completedCount <= 6) {
    return 3;
  }

  return 4;
}

export function formatContributionDate(dateKey: string): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
