import { getPostsAnalyticsMonthRange } from "@/features/analytics/utils/postsAnalyticsUtils";
import {
  fetchNotPostedPosts,
  fetchPostsForMonth,
  fetchTodayPosts,
} from "@/features/posts-management/utils/postsRepository";
import { supabase } from "@/shared/lib/supabase";
import { dedupeAsync } from "@/shared/utils/dedupeAsync";

export type TeamDashboardCounts = {
  clientsCount: number;
  teamMembersCount: number;
  totalPostsCount: number;
  notPostedPostsCount: number;
};

const DASHBOARD_CACHE_MS = 5_000;

let cachedDashboardBundle: {
  fetchedAt: number;
  value: Promise<Awaited<ReturnType<typeof fetchTeamDashboardPostsBundleUncached>>>;
} | null = null;

async function fetchTableCount(table: "clients" | "team_members"): Promise<number> {
  const { count, error } = await supabase
    .from(table)
    .select("id", { count: "exact", head: true });

  if (error) {
    throw error;
  }

  return count ?? 0;
}

async function fetchPostsCountByFilter(
  filter?: { status: string },
): Promise<number> {
  let query = supabase.from("posts").select("id", { count: "exact", head: true });

  if (filter) {
    query = query.eq("status", filter.status);
  }

  const { count, error } = await query;

  if (error) {
    throw error;
  }

  return count ?? 0;
}

export async function fetchTeamDashboardCounts(): Promise<TeamDashboardCounts> {
  const [clientsCount, teamMembersCount, totalPostsCount, notPostedPostsCount] =
    await Promise.all([
      fetchTableCount("clients"),
      fetchTableCount("team_members"),
      fetchPostsCountByFilter(),
      fetchPostsCountByFilter({ status: "Not posted" }),
    ]);

  return {
    clientsCount,
    teamMembersCount,
    totalPostsCount,
    notPostedPostsCount,
  };
}

async function fetchTeamDashboardPostsBundleUncached() {
  const { currentYear, currentMonth } = getPostsAnalyticsMonthRange();

  const [counts, todayPosts, notPostedPosts, currentMonthPosts] =
    await Promise.all([
      fetchTeamDashboardCounts(),
      fetchTodayPosts(),
      fetchNotPostedPosts(),
      fetchPostsForMonth(currentYear, currentMonth),
    ]);

  return {
    counts,
    todayPosts,
    notPostedPosts,
    currentMonthPosts,
  };
}

export function invalidateTeamDashboardCache() {
  cachedDashboardBundle = null;
}

export async function fetchTeamDashboardPostsBundle() {
  const now = Date.now();

  if (
    cachedDashboardBundle &&
    now - cachedDashboardBundle.fetchedAt < DASHBOARD_CACHE_MS
  ) {
    return cachedDashboardBundle.value;
  }

  const value = dedupeAsync(
    "team-dashboard-posts-bundle",
    fetchTeamDashboardPostsBundleUncached,
  );

  cachedDashboardBundle = { fetchedAt: now, value };

  try {
    return await value;
  } catch (error) {
    cachedDashboardBundle = null;
    throw error;
  }
}
