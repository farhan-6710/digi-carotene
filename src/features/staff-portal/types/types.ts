export type StaffNeedsAttentionStatus =
  | "Missed"
  | "Due Today"
  | "Needs Review";

export type StaffNeedsAttentionItem = {
  time: string;
  from: string;
  status: StaffNeedsAttentionStatus;
};

export type StaffRecentPost = {
  time: string;
  client: string;
  id: string;
  postType: string;
  status: "Scheduled" | "Posted" | "Missed";
};

export type StaffNeedsAttentionStatusStyle = {
  dot: string;
  text: string;
};
