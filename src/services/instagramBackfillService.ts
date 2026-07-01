import { subDays, startOfDay } from "date-fns";

import { INSTAGRAM_BACKFILL_DAYS } from "@/features/growth-and-analytics/constants/metaConfig";
import type { InstagramDbMediaType } from "@/features/growth-and-analytics/types/types";
import {
  fetchInstagramBackfillMedia,
  fetchInstagramBackfillPostInsights,
  fetchInstagramBackfillProfile,
  type IgBackfillMediaItem,
} from "@/services/metaService";
import {
  fetchInstagramProfileByOrganicAccountId,
  updateInstagramProfileToken,
} from "@/services/instagramProfilesService";
import {
  replacePastPostsForProfile,
  type PastPostInsert,
} from "@/services/pastPostsMetricsService";

function mapMetaMediaTypeToDb(
  mediaType?: string,
  productType?: string,
): InstagramDbMediaType {
  if (productType === "REELS" || mediaType === "REELS") return "REEL";
  if (mediaType === "CAROUSEL_ALBUM") return "CAROUSEL";
  if (mediaType === "VIDEO") return "VIDEO";
  return "IMAGE";
}

function isWithinBackfillWindow(timestamp?: string): boolean {
  if (!timestamp) return false;
  const postedAt = new Date(timestamp);
  const cutoff = startOfDay(subDays(new Date(), INSTAGRAM_BACKFILL_DAYS));
  return postedAt >= cutoff;
}

function mapMediaToInsert(
  item: IgBackfillMediaItem,
  insights: { reach: number; impressions: number; saves: number; shares: number; reposts: number },
): PastPostInsert {
  return {
    postId: item.id,
    caption: item.caption?.trim() || "(No caption)",
    mediaType: mapMetaMediaTypeToDb(item.media_type, item.media_product_type),
    createdAt: item.timestamp ?? new Date().toISOString(),
    reach: insights.reach,
    impressions: insights.impressions,
    likes: item.like_count ?? 0,
    comments: item.comments_count ?? 0,
    saves: insights.saves,
    shares: insights.shares,
    reposts: insights.reposts,
  };
}

export async function runInstagram29DayBackfill(
  profileId: string,
  instagramId: string,
  accessToken: string,
): Promise<number> {
  const profile = await fetchInstagramBackfillProfile(instagramId, accessToken);
  const media = await fetchInstagramBackfillMedia(instagramId, accessToken);
  const recentMedia = media.filter((item) => isWithinBackfillWindow(item.timestamp));

  const posts: PastPostInsert[] = [];
  for (const item of recentMedia) {
    const insights = await fetchInstagramBackfillPostInsights(item.id, accessToken);
    posts.push(mapMediaToInsert(item, insights));
  }

  await replacePastPostsForProfile(profileId, posts);
  await updateInstagramProfileToken(
    profileId,
    accessToken,
    profile.followersCount,
    profile.username,
  );

  return posts.length;
}

export async function rerunInstagramBackfillForOrganicAccount(
  organicAccountId: string,
  accessToken: string,
): Promise<number> {
  const profile = await fetchInstagramProfileByOrganicAccountId(organicAccountId);
  if (!profile) return 0;

  return runInstagram29DayBackfill(profile.id, profile.instagramId, accessToken);
}
