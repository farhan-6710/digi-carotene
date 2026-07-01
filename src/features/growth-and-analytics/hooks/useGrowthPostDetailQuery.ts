import { useCallback } from "react";

import { fetchInstagramProfileById } from "@/services/instagramProfilesService";
import { fetchPastPostById } from "@/services/pastPostsMetricsService";
import { useFetch } from "@/shared/hooks/useFetch";

import type { GrowthPostDetailView } from "../types/types";
import { buildGrowthPostDetailView } from "../utils/growthPostDetail";

const EMPTY: GrowthPostDetailView | null = null;

export function useGrowthPostDetailQuery(postId: string) {
  const load = useCallback(async (): Promise<GrowthPostDetailView | null> => {
    if (!postId) return EMPTY;

    const post = await fetchPastPostById(postId);
    if (!post) return EMPTY;

    const profile = await fetchInstagramProfileById(post.accountId);
    const accountUsername = profile?.username ?? "Unknown account";

    return buildGrowthPostDetailView(post, accountUsername);
  }, [postId]);

  const { data, isLoading, error, reload } = useFetch(load, EMPTY);

  return {
    view: data,
    isLoading,
    error,
    reload,
  };
}
