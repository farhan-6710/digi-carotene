export type StaffNeedsAttentionItem = {
  id: string;
  label: string;
  status: "Not posted";
  scheduleLabel: string;
  isOverdue: boolean;
};

export type StaffNeedsAttentionStatusStyle = {
  dot: string;
  text: string;
};