import type {
  ContributionSummary,
  ContributionWeek,
  DayContribution,
  MonthLabel,
} from "@/types/Analytics/types";
import { getContributionLevel } from "@/lib/analytics/contributionLevels";

export const CONTRIBUTION_YEAR = 2026;
export const MAX_DAILY_TASKS = 8;

export const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const legendItems = [
  { level: 0, className: "bg-status-muted" },
  { level: 1, className: "bg-contrib-1" },
  { level: 2, className: "bg-contrib-2" },
  { level: 3, className: "bg-contrib-3" },
  { level: 4, className: "bg-contrib-4" },
] as const;

function formatDateKey(year: number, month: number, day: number): string {
  const paddedMonth = String(month + 1).padStart(2, "0");
  const paddedDay = String(day).padStart(2, "0");
  return `${year}-${paddedMonth}-${paddedDay}`;
}

function seededValue(seed: number): number {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function generateCompletedCount(date: Date): number {
  const dayOfWeek = date.getDay();
  const month = date.getMonth();
  const day = date.getDate();
  const seed = date.getFullYear() * 10000 + (month + 1) * 100 + day;
  const random = seededValue(seed);

  if (month === 7 && day >= 10 && day <= 18) {
    return random > 0.55 ? 0 : 1;
  }

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    if (random < 0.08) {
      return 0;
    }

    if (random < 0.35) {
      return Math.floor(random * 3) + 1;
    }

    return Math.floor(random * 5) + 3;
  }

  if (random < 0.04) {
    return 0;
  }

  if (random < 0.2) {
    return Math.floor(random * 4) + 1;
  }

  if (random < 0.55) {
    return Math.floor(random * 3) + 4;
  }

  return Math.floor(random * 3) + 6;
}

function buildDailyCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  const today = new Date(CONTRIBUTION_YEAR, 4, 27);

  for (let month = 0; month < 12; month += 1) {
    const daysInMonth = new Date(CONTRIBUTION_YEAR, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(CONTRIBUTION_YEAR, month, day);

      if (date > today) {
        continue;
      }

      const dateKey = formatDateKey(CONTRIBUTION_YEAR, month, day);
      counts[dateKey] = generateCompletedCount(date);
    }
  }

  return counts;
}

export const dailyContributionCounts = buildDailyCounts();

function buildDayContribution(
  date: Date,
  isFuture: boolean,
): DayContribution {
  const dateKey = formatDateKey(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const completedCount = isFuture ? 0 : (dailyContributionCounts[dateKey] ?? 0);

  return {
    date: dateKey,
    completedCount,
    level: isFuture ? 0 : getContributionLevel(completedCount),
    isFuture,
  };
}

export function buildContributionWeeks(): ContributionWeek[] {
  const weeks: ContributionWeek[] = [];
  const today = new Date(CONTRIBUTION_YEAR, 4, 27);
  const yearStart = new Date(CONTRIBUTION_YEAR, 0, 1);
  const yearEnd = new Date(CONTRIBUTION_YEAR, 11, 31);

  const gridStart = new Date(yearStart);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());

  let cursor = new Date(gridStart);
  let weekIndex = 0;

  while (cursor <= yearEnd || cursor.getDay() !== 0) {
    const days: (DayContribution | null)[] = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      const inYear =
        cursor.getFullYear() === CONTRIBUTION_YEAR &&
        cursor >= yearStart &&
        cursor <= yearEnd;

      if (inYear) {
        days.push(
          buildDayContribution(cursor, cursor > today),
        );
      } else {
        days.push(null);
      }

      cursor.setDate(cursor.getDate() + 1);
    }

    weeks.push({ index: weekIndex, days });
    weekIndex += 1;

    if (cursor > yearEnd && cursor.getDay() === 0) {
      break;
    }
  }

  return weeks;
}

export function buildMonthLabels(weeks: ContributionWeek[]): MonthLabel[] {
  const labels: MonthLabel[] = [];

  weeks.forEach((week, columnIndex) => {
    for (const day of week.days) {
      if (!day || day.isFuture) {
        continue;
      }

      const [, month, date] = day.date.split("-").map(Number);

      if (date === 1) {
        labels.push({
          label: monthLabels[month - 1],
          columnIndex,
        });
        break;
      }
    }
  });

  return labels;
}

function buildSummary(): ContributionSummary {
  const entries = Object.entries(dailyContributionCounts);
  const totalCompleted = entries.reduce(
    (sum, [, count]) => sum + count,
    0,
  );
  const activeDays = entries.filter(([, count]) => count > 0).length;

  const bestDay = entries.reduce(
    (best, [date, count]) =>
      count > best.count ? { date, count } : best,
    { date: entries[0]?.[0] ?? "", count: entries[0]?.[1] ?? 0 },
  );

  const sortedDates = entries
    .map(([date]) => date)
    .sort((a, b) => a.localeCompare(b));

  let currentStreak = 0;
  let longestStreak = 0;
  let streak = 0;

  for (const date of sortedDates) {
    if ((dailyContributionCounts[date] ?? 0) > 0) {
      streak += 1;
      longestStreak = Math.max(longestStreak, streak);
    } else {
      streak = 0;
    }
  }

  for (let index = sortedDates.length - 1; index >= 0; index -= 1) {
    if ((dailyContributionCounts[sortedDates[index]] ?? 0) > 0) {
      currentStreak += 1;
    } else {
      break;
    }
  }

  return {
    totalCompleted,
    activeDays,
    bestDay,
    currentStreak,
    longestStreak,
  };
}

export const contributionWeeks = buildContributionWeeks();
export const contributionMonthLabels = buildMonthLabels(contributionWeeks);
export const contributionSummary = buildSummary();
