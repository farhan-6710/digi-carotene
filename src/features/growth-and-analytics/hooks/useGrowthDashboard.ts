import { useCallback, useMemo, useState } from "react";

import { fetchInstagramProfiles } from "@/services/instagramProfilesService";
import { fetchPastPostsForProfile } from "@/services/pastPostsMetricsService";
import { useFetch } from "@/shared/hooks/useFetch";

import type { InstagramProfile } from "../types/types";
import { buildDashboardStatCards } from "../utils/dashboardMetrics";
import { buildContentTypeSplit } from "../utils/contentMetrics";
import {
  aggregatePostsToDailyRows,
  mapPastPostToPostRow,
  profileToOrganicAccount,
  sumPostInteractionTotals,
} from "../utils/instagramPostMetrics";
import { useGrowthAccountsUpdated } from "./useGrowthAccountsUpdated";
import { useGrowthDateRange } from "./useGrowthDateRange";

const NO_PROFILES: InstagramProfile[] = [];

export function useGrowthDashboard() {
  const { range, dateFilterProps, periodLabel } = useGrowthDateRange();

  const loadProfiles = useCallback(() => fetchInstagramProfiles(), []);
  const {
    data: profiles,
    isLoading: isProfilesLoading,
    error: profilesError,
    reload: reloadProfiles,
  } = useFetch(loadProfiles, NO_PROFILES);

  const [selectedId, setSelectedId] = useState("");
  const activeProfile =
    profiles.find((profile) => profile.id === selectedId) ?? profiles[0];
  const profileId = activeProfile?.id ?? "";

  const loadPosts = useCallback(
    () =>
      profileId
        ? fetchPastPostsForProfile(profileId, range)
        : Promise.resolve([]),
    [profileId, range],
  );
  const {
    data: pastPosts,
    isLoading: isPostsLoading,
    error: postsError,
    reload: reloadPosts,
  } = useFetch(loadPosts, []);

  useGrowthAccountsUpdated(async () => {
    await reloadProfiles();
    await reloadPosts();
  });

  const posts = useMemo(
    () => pastPosts.map(mapPastPostToPostRow),
    [pastPosts],
  );

  const postsDataRows = useMemo(
    () =>
      activeProfile ? aggregatePostsToDailyRows(pastPosts, activeProfile) : [],
    [pastPosts, activeProfile],
  );

  const interactionTotals = useMemo(
    () => sumPostInteractionTotals(pastPosts),
    [pastPosts],
  );

  const accountOptions = useMemo(
    () =>
      profiles.map((profile) => ({
        value: profile.id,
        label: `${profile.username} (Instagram)`,
      })),
    [profiles],
  );

  const activeAccount = useMemo(
    () => (activeProfile ? profileToOrganicAccount(activeProfile) : undefined),
    [activeProfile],
  );

  const statCards = useMemo(
    () =>
      buildDashboardStatCards(postsDataRows, activeAccount, interactionTotals),
    [postsDataRows, activeAccount, interactionTotals],
  );

  const contentTypeSplit = useMemo(
    () => buildContentTypeSplit(posts),
    [posts],
  );

  return {
    accountOptions,
    accountId: profileId,
    setAccountId: setSelectedId,
    statCards,
    postsDataRows,
    contentTypeSplit,
    isLoading: isProfilesLoading || isPostsLoading,
    error: profilesError || postsError,
    dateFilterProps,
    periodLabel,
    hasAccounts: profiles.length > 0,
  };
}
