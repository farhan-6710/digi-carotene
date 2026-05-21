export type StatusKey = "Draft" | "Scheduled" | "Posted" | "Missed";

export type SlotClient = {
  name: string;
  status: StatusKey;
};

export type Slot = {
  day: string;
  date: number;
  clients: SlotClient[];
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
