import { TeamDashboardPostList } from "@/features/team-portal/components/TeamDashboardPostList";
import type { TeamTodaysPostsProps } from "@/features/team-portal/types/components";

export function TeamTodaysPosts({
  items,
  isLoading,
  error,
  updatingPostId,
  onStatusChange,
}: TeamTodaysPostsProps) {
  return (
    <TeamDashboardPostList
      title="Today's to be posted"
      items={items}
      isLoading={isLoading}
      error={error}
      emptyMessage="No posts to be posted today."
      updatingPostId={updatingPostId}
      onStatusChange={onStatusChange}
    />
  );
}
