import type { StatusKey } from "@/types/admin/posts-management/types";

export const statusColors: Record<StatusKey, string> = {
  Draft: "bg-status-draft ",
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
