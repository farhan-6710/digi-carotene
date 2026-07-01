import { useCallback, useMemo, useState } from "react";

import { fetchInstagramProfiles } from "@/services/instagramProfilesService";
import { fetchPastPostsForProfile } from "@/services/pastPostsMetricsService";
import { useFetch } from "@/shared/hooks/useFetch";

import type { InstagramProfile } from "../types/types";
import {
  buildContentStatCards,
  buildContentTypeSplit,
  buildEngagementByType,
  mapPostRows,
} from "../utils/contentMetrics";
import {
  mapPastPostToPostRow,
} from "../utils/instagramPostMetrics";
import { saveGrowthReport } from "../utils/generateReport";
import { resolveGrowthReportPeriod } from "../utils/reportPeriod";
import { useGrowthAccountsUpdated } from "./useGrowthAccountsUpdated";
import { useGrowthDateRange } from "./useGrowthDateRange";

const NO_PROFILES: InstagramProfile[] = [];

export function useGrowthContentPerformance() {
  const { range, dateFilterProps, periodLabel } = useGrowthDateRange();

  const loadProfiles = useCallback(() => fetchInstagramProfiles(), []);
  const {
    data: profiles,
    isLoading: isProfilesLoading,
    error: profilesError,
    reload: reloadProfiles,
  } = useFetch(loadProfiles, NO_PROFILES);

  const [selectedId, setSelectedId] = useState("");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
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

  const accountOptions = useMemo(
    () =>
      profiles.map((profile) => ({
        value: profile.id,
        label: `${profile.username} (Instagram)`,
      })),
    [profiles],
  );

  const statCards = useMemo(() => buildContentStatCards(posts), [posts]);
  const typeSplit = useMemo(() => buildContentTypeSplit(posts), [posts]);
  const engagementByType = useMemo(() => buildEngagementByType(posts), [posts]);
  const postRows = useMemo(() => mapPostRows(posts), [posts]);

  const generateReport = async () => {
    if (!activeProfile) return;

    const { periodStart, periodEnd } = resolveGrowthReportPeriod(range);
    setIsGeneratingReport(true);
    try {
      await saveGrowthReport({
        title: `${activeProfile.username} — Content Performance`,
        type: "content_performance",
        platform: "instagram",
        periodStart,
        periodEnd,
      });
    } finally {
      setIsGeneratingReport(false);
    }
  };

  return {
    accountOptions,
    accountId: profileId,
    setAccountId: setSelectedId,
    statCards,
    typeSplit,
    engagementByType,
    postRows,
    isLoading: isProfilesLoading || isPostsLoading,
    error: profilesError || postsError,
    dateFilterProps,
    periodLabel,
    generateReport,
    isGeneratingReport,
    hasAccounts: profiles.length > 0,
  };
}
