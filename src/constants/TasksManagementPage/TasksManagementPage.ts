import type { Slot, TaskItem, TaskStatusKey, Week } from "@/types/TasksManagementPage/types";

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

export const defaultTasks: TaskItem[] = [
  { name: "Early Wake Up", time: "8:00 am", status: "Upcoming" },
  { name: "Morning Prayer", time: "8:30 am", status: "Upcoming" },
  { name: "Breakfast", time: "9:00 am", status: "Upcoming" },
  { name: "Leave for Office", time: "9:30 am", status: "Upcoming" },
  { name: "Back to Home", time: "7:30 pm", status: "Upcoming" },
  { name: "Evening Prayer", time: "8:00 pm", status: "Upcoming" },
  { name: "Dinner", time: "10:00 pm", status: "Upcoming" },
  { name: "Sleep", time: "12:00 am", status: "Upcoming" },
];

function buildSlot(day: string, date: number, tasks: TaskItem[]): Slot {
  return {
    day,
    date,
    tasks: tasks.map((task) => ({ ...task })),
  };
}

function buildInitialSlots(): Slot[] {
  const slots: Slot[] = [];

  for (const week of weeks) {
    days.forEach((day, dayIndex) => {
      const date = week.dates[dayIndex];
      const tasks = defaultTasks.map((task) => ({ ...task }));

      if (date === 1) {
        tasks[0] = { ...tasks[0], status: "Done" };
        tasks[1] = { ...tasks[1], status: "Done" };
        tasks[2] = { ...tasks[2], status: "Done" };
        tasks[7] = { ...tasks[7], time: "1:00 am", status: "Missed" };
      }

      if (date === 3) {
        tasks[4] = { ...tasks[4], status: "Missed" };
      }

      if (date === 5) {
        tasks[0] = { ...tasks[0], time: "8:45 am", status: "Done" };
      }

      slots.push(buildSlot(day, date, tasks));
    });
  }

  return slots;
}

export const initialSlots: Slot[] = buildInitialSlots();

export const statusColors: Record<TaskStatusKey, string> = {
  Upcoming: "bg-status-upcoming",
  Done: "bg-status-done",
  Missed: "bg-status-missed",
};

export const statusText: Record<TaskStatusKey, string> = {
  Upcoming: "text-status-upcoming",
  Done: "text-status-done",
  Missed: "text-status-missed",
};
