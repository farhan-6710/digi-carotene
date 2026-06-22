import type {
  StaffNeedsAttentionStatus,
  StaffNeedsAttentionStatusStyle,
} from "@/features/staff-portal/types/types";

export const staffNeedsAttentionStatusStyles: Record<
  StaffNeedsAttentionStatus,
  StaffNeedsAttentionStatusStyle
> = {
  Missed: { dot: "bg-status-missed", text: "text-status-missed" },
  "Due Today": { dot: "bg-status-scheduled", text: "text-status-scheduled" },
  "Needs Review": { dot: "bg-primary", text: "text-primary" },
};
