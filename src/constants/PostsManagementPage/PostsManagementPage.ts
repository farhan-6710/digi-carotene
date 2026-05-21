import type { Slot, StatusKey, Week } from "@/types/PostsManagementPage/types";

export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const weeks: Week[] = [
  { label: "Week 1", range: "May 1 to May 7", dates: [1, 2, 3, 4, 5, 6, 7] },
  {
    label: "Week 2",
    range: "May 8 to May 14",
    dates: [8, 9, 10, 11, 12, 13, 14],
  },
  {
    label: "Week 3",
    range: "May 15 to May 21",
    dates: [15, 16, 17, 18, 19, 20, 21],
  },
  {
    label: "Week 4",
    range: "May 22 to May 28",
    dates: [22, 23, 24, 25, 26, 27, 28],
  },
];

export const initialSlots: Slot[] = [
  {
    day: "Mon",
    date: 1,
    clients: [
      { name: "Nina H.", status: "Draft" },
      { name: "Pulse Co.", status: "Scheduled" },
      { name: "Reverb Labs", status: "Posted" },
      { name: "Marlow & Co.", status: "Missed" },
    ],
  },
  {
    day: "Tue",
    date: 2,
    clients: [],
  },
  {
    day: "Wed",
    date: 3,
    clients: [
      { name: "Lumen Grocers", status: "Draft" },
      { name: "Vibe Agency", status: "Missed" },
    ],
  },
  {
    day: "Thu",
    date: 4,
    clients: [
      { name: "Echo Tech", status: "Missed" },
      { name: "Nova Design", status: "Scheduled" },
      { name: "Pulse Co.", status: "Posted" },
    ],
  },
  {
    day: "Fri",
    date: 5,
    clients: [
      { name: "Marlow & Co.", status: "Draft" },
      { name: "Nina H.", status: "Scheduled" },
      { name: "Atlas & Pine", status: "Posted" },
    ],
  },
  {
    day: "Sat",
    date: 6,
    clients: [
      { name: "Reverb Labs", status: "Draft" },
      { name: "Echo Tech", status: "Scheduled" },
      { name: "Vibe Agency", status: "Posted" },
    ],
  },
  {
    day: "Sun",
    date: 7,
    clients: [
      { name: "Nova Design", status: "Draft" },
      { name: "Octave Studio", status: "Scheduled" },
      { name: "Lumen Grocers", status: "Posted" },
    ],
  },
  {
    day: "Mon",
    date: 8,
    clients: [],
  },
  {
    day: "Tue",
    date: 9,
    clients: [{ name: "Vibe Agency", status: "Draft" }],
  },
  {
    day: "Wed",
    date: 10,
    clients: [{ name: "Echo Tech", status: "Posted" }],
  },
  {
    day: "Thu",
    date: 11,
    clients: [],
  },
  {
    day: "Fri",
    date: 12,
    clients: [{ name: "Pulse Co.", status: "Draft" }],
  },
  {
    day: "Sat",
    date: 13,
    clients: [{ name: "Reverb Labs", status: "Posted" }],
  },
  {
    day: "Sun",
    date: 14,
    clients: [{ name: "Lumen Grocers", status: "Missed" }],
  },
  {
    day: "Mon",
    date: 15,
    clients: [
      { name: "Marlow & Co.", status: "Scheduled" },
      { name: "Octave Studio", status: "Posted" },
    ],
  },
  {
    day: "Tue",
    date: 16,
    clients: [],
  },
  {
    day: "Wed",
    date: 17,
    clients: [
      { name: "Nina H.", status: "Draft" },
      { name: "Harbor Studio", status: "Scheduled" },
    ],
  },
  {
    day: "Thu",
    date: 18,
    clients: [{ name: "Lumen Grocers", status: "Scheduled" }],
  },
  {
    day: "Fri",
    date: 19,
    clients: [],
  },
  {
    day: "Sat",
    date: 20,
    clients: [{ name: "Nova Design", status: "Missed" }],
  },
  {
    day: "Sun",
    date: 21,
    clients: [{ name: "Pulse Co.", status: "Scheduled" }],
  },
  {
    day: "Mon",
    date: 22,
    clients: [{ name: "Reverb Labs", status: "Draft" }],
  },
  {
    day: "Tue",
    date: 23,
    clients: [{ name: "Atlas & Pine", status: "Posted" }],
  },
  {
    day: "Wed",
    date: 24,
    clients: [
      { name: "Harbor Studio", status: "Scheduled" },
      { name: "Vibe Agency", status: "Posted" },
      { name: "Marlow & Co.", status: "Missed" },
    ],
  },
  {
    day: "Thu",
    date: 25,
    clients: [{ name: "Vibe Agency", status: "Draft" }],
  },
  {
    day: "Fri",
    date: 26,
    clients: [{ name: "Marlow & Co.", status: "Posted" }],
  },
  {
    day: "Sat",
    date: 27,
    clients: [],
  },
  {
    day: "Sun",
    date: 28,
    clients: [{ name: "Lumen Grocers", status: "Posted" }],
  },
];

export const statusColors: Record<StatusKey, string> = {
  Draft: "bg-status-draft",
  Scheduled: "bg-status-scheduled",
  Posted: "bg-status-posted",
  Missed: "bg-status-missed",
};

export const statusText: Record<StatusKey, string> = {
  Draft: "text-status-draft",
  Scheduled: "text-status-scheduled",
  Posted: "text-status-posted",
  Missed: "text-status-missed",
};
