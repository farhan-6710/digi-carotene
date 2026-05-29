export type StatusKey = "Draft" | "Scheduled" | "Posted" | "Missed";

export type Post = {
  id: string;
  client_name: string;
  scheduled_date: string;
  scheduled_time: string;
  status: StatusKey;
  created_at: string;
};

export type SlotClient = {
  id: string;
  name: string;
  time: string;
  status: StatusKey;
};

export type Slot = {
  year: number;
  month: number;
  date: number;
  day: string;
  clients: SlotClient[];
};

export type ActiveSlot = {
  year: number;
  month: number;
  date: number;
  day: string;
};

export type Week = {
  label: string;
  range: string;
  dates: number[];
};
