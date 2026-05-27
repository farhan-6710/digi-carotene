export type TaskStatusKey = "Upcoming" | "Done" | "Missed";

export type TaskItem = {
  name: string;
  time: string;
  status: TaskStatusKey;
};

export type Slot = {
  day: string;
  date: number;
  tasks: TaskItem[];
};

export type ActiveSlot = {
  day: string;
  date: number;
};

export type Week = {
  label: string;
  range: string;
  dates: number[];
};
