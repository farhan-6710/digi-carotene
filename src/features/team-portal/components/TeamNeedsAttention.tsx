import { TeamDashboardPostList } from "@/features/team-portal/components/TeamDashboardPostList";
import type { TeamNeedsAttentionProps } from "@/features/team-portal/types/components";

export function TeamNeedsAttention({
  items,
  isLoading,
  error,
  updatingPostId,
  onStatusChange,
}: TeamNeedsAttentionProps) {
  return (
    <TeamDashboardPostList
      title="Needs Attention"
      items={items}
      isLoading={isLoading}
      error={error}
      emptyMessage="No other not posted posts right now."
      updatingPostId={updatingPostId}
      onStatusChange={onStatusChange}
    />
  );
}
