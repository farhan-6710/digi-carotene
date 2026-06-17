export const CONTRIBUTION_YEAR = 2026;
export const CONTRIBUTION_END_MONTH = 4;
export const CONTRIBUTION_END_DAY = 27;
export const MAX_DAILY_POSTS = 8;

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
