import type { StatusKey } from "@/types/admin/posts-management/types";

export const statusOptions: StatusKey[] = ["Not posted", "Scheduled", "Posted"];

export const DEFAULT_POST_STATUS: StatusKey = "Not posted";

export const statusColors: Record<StatusKey, string> = {
  "Not posted": "bg-status-not-posted",
  Scheduled: "bg-status-scheduled",
  Posted: "bg-status-posted",
};

export const statusText: Record<StatusKey, string> = {
  "Not posted": "text-status-not-posted",
  Scheduled: "text-status-scheduled",
  Posted: "text-status-posted",
};
