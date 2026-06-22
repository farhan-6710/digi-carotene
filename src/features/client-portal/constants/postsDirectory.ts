import type { DirectoryTableColumn } from "@/shared/types/components";

export const CLIENT_POSTS_GRID_CLASS =
  "grid-cols-[1.2fr_1fr_0.8fr_0.7fr]";
export const CLIENT_POSTS_ROW_GRID_CLASS =
  "sm:grid-cols-[1.2fr_1fr_0.8fr_0.7fr]";

export const clientPostsColumns: DirectoryTableColumn[] = [
  { label: "TITLE" },
  { label: "SCHEDULED" },
  { label: "PLATFORMS" },
  { label: "STATUS" },
];

export const clientPostsDirectoryConfig = {
  title: "Posts",
  description: "Read-only view of every post scheduled for your brand.",
  gridClass: CLIENT_POSTS_GRID_CLASS,
  columns: clientPostsColumns,
  emptyMessage: "No posts scheduled for your brand yet.",
} as const;
