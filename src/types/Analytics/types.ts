export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type DayContribution = {
  date: string;
  completedCount: number;
  level: ContributionLevel;
  isFuture: boolean;
};

export type ContributionWeek = {
  index: number;
  days: (DayContribution | null)[];
};

export type MonthLabel = {
  label: string;
  columnIndex: number;
};

export type ContributionSummary = {
  totalCompleted: number;
  activeDays: number;
  bestDay: { date: string; count: number };
  currentStreak: number;
  longestStreak: number;
};
