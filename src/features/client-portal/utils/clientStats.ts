import {
  CalendarClock,
  CheckCircle2,
  FileText,
  XCircle,
} from "lucide-react";

import type { Post } from "@/features/posts-management/types/types";
import type { StatCardItem } from "@/shared/types/statsCards";

function countByStatus(posts: Post[], status: Post["status"]): number {
  return posts.filter((post) => post.status === status).length;
}

export function buildClientStatCards(posts: Post[]): StatCardItem[] {
  return [
    {
      id: "client-total-posts",
      label: "Total posts",
      value: String(posts.length),
      description: "All content for your brand",
      icon: FileText,
      href: "/client-portal/posts",
    },
    {
      id: "client-scheduled",
      label: "Scheduled",
      value: String(countByStatus(posts, "Scheduled")),
      description: "Waiting to go live",
      icon: CalendarClock,
      href: "/client-portal/posts",
    },
    {
      id: "client-posted",
      label: "Posted",
      value: String(countByStatus(posts, "Posted")),
      description: "Published successfully",
      icon: CheckCircle2,
      href: "/client-portal/posts",
    },
    {
      id: "client-not-posted",
      label: "Not posted",
      value: String(countByStatus(posts, "Not posted")),
      description: "Awaiting publish or follow-up",
      icon: XCircle,
      href: "/client-portal/posts",
    },
  ];
}

export function getUpcomingPosts(posts: Post[], limit = 5): Post[] {
  const today = new Date().toISOString().slice(0, 10);

  return posts
    .filter(
      (post) => post.status !== "Posted" && post.to_be_posted_date >= today,
    )
    .sort((a, b) => {
      const dateCompare = a.to_be_posted_date.localeCompare(b.to_be_posted_date);
      if (dateCompare !== 0) {
        return dateCompare;
      }

      return (a.to_be_posted_time ?? "").localeCompare(b.to_be_posted_time ?? "");
    })
    .slice(0, limit);
}
