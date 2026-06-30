import { DB } from "@/services/db";
import {
  fetchAdCampaignStatuses,
  fetchAdDailyInsights,
  fetchFacebookDashboardInsights,
  fetchFacebookPosts,
  fetchInstagramDashboardInsights,
  fetchInstagramMedia,
  fetchInstagramMediaInsights,
  mergeIgMediaInsightValues,
  parseIgMediaInsightBlock,
} from "@/services/metaService";
import { supabase } from "@/services/supabaseClient";
import { META_INITIAL_POST_SYNC_LIMIT } from "@/features/growth-and-analytics/constants/metaConfig";
import type {
  CampaignMetricRow,
  DailyMetricRow,
  GrowthDateRange,
  GrowthPlatform,
  PostRow,
} from "@/features/growth-and-analytics/types/types";
import { formatMetaApiError } from "@/features/growth-and-analytics/utils/metaApiErrors";
import {
  buildDailyMetricRows,
  flattenInsightMetrics,
  getMetaInsightChunksForSpan,
  mapCampaignStatus,
  mapIgMediaType as mapMediaType,
  parseConversions,
  parseSpend,
  resolveGrowthMetaSpan,
} from "@/features/growth-and-analytics/utils/metaSyncMappers";

type OrganicLiveRow = {
  id: string;
  platform: GrowthPlatform;
  account_name: string;
  account_id: string;
  access_token: string | null;
  followers: number;
};

type AdLiveRow = {
  id: string;
  ad_account_id: string;
  access_token: string | null;
};

async function fetchOrganicLiveRow(dbAccountId: string): Promise<OrganicLiveRow | null> {
  const { data, error } = await supabase
    .from(DB.GROWTH_ORGANIC_ACCOUNTS.TABLE)
    .select("id, platform, account_name, account_id, access_token, followers")
    .eq("id", dbAccountId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return (data as OrganicLiveRow | null) ?? null;
}

async function fetchAdLiveRow(dbAdAccountId: string): Promise<AdLiveRow | null> {
  const { data, error } = await supabase
    .from(DB.GROWTH_AD_ACCOUNTS.TABLE)
    .select("id, ad_account_id, access_token")
    .eq("id", dbAdAccountId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return (data as AdLiveRow | null) ?? null;
}

function inSpan(date: string, span: { from: string; to: string }): boolean {
  return date >= span.from && date <= span.to;
}

async function resolveIgPostInsights(
  items: Array<{
    id: string;
    shares_count?: number;
    reposts_count?: number;
    insights?: { data?: Array<{ name?: string; values?: Array<{ value?: number }> }> };
  }>,
  token: string,
) {
  const byId = new Map<string, ReturnType<typeof parseIgMediaInsightBlock>>();
  const missingIds: string[] = [];

  for (const item of items) {
    if (item.insights?.data?.length) {
      byId.set(
        item.id,
        mergeIgMediaInsightValues(parseIgMediaInsightBlock(item.insights), item),
      );
    } else {
      missingIds.push(item.id);
    }
  }

  if (missingIds.length > 0) {
    const fetched = await Promise.all(
      missingIds.map(async (id) => {
        const item = items.find((entry) => entry.id === id);
        const insights = await fetchInstagramMediaInsights(id, token);
        return [
          id,
          item ? mergeIgMediaInsightValues(insights, item) : insights,
        ] as const;
      }),
    );
    for (const [id, insights] of fetched) {
      byId.set(id, insights);
    }
  }

  return byId;
}

function mergeInsightChunks(
  byDate: Map<string, Record<string, number>>,
  metrics: Array<{ name?: string; values?: Array<{ value?: number; end_time?: string }> }>,
  span: { from: string; to: string },
): void {
  for (const [date, values] of flattenInsightMetrics(metrics)) {
    if (inSpan(date, span)) {
      byDate.set(date, { ...(byDate.get(date) ?? {}), ...values });
    }
  }
}

async function fetchInstagramMetricsForRange(
  account: OrganicLiveRow,
  span: { from: string; to: string },
): Promise<DailyMetricRow[]> {
  const token = account.access_token!;
  const byDate = new Map<string, Record<string, number>>();
  const chunks = getMetaInsightChunksForSpan(span.from, span.to);

  const chunkMetrics = await Promise.all(
    chunks.map((chunk) =>
      fetchInstagramDashboardInsights(account.account_id, token, chunk),
    ),
  );

  for (const metrics of chunkMetrics) {
    mergeInsightChunks(byDate, metrics, span);
  }

  return buildDailyMetricRows(byDate, account.followers, {
    followerCountIsDailyDelta: true,
  }).map((row) => ({
    accountId: account.id,
    accountName: account.account_name,
    platform: account.platform,
    date: row.metric_date,
    followers: account.followers,
    newFollowers: row.new_followers,
    reach: row.reach,
    impressions: row.impressions,
    engagement: row.engagement,
  }));
}

async function fetchFacebookMetricsForRange(
  account: OrganicLiveRow,
  span: { from: string; to: string },
): Promise<DailyMetricRow[]> {
  const token = account.access_token!;
  const byDate = new Map<string, Record<string, number>>();
  const chunks = getMetaInsightChunksForSpan(span.from, span.to);

  const chunkMetrics = await Promise.all(
    chunks.map((chunk) =>
      fetchFacebookDashboardInsights(account.account_id, token, chunk),
    ),
  );

  for (const metrics of chunkMetrics) {
    mergeInsightChunks(byDate, metrics, span);
  }

  return buildDailyMetricRows(byDate, account.followers).map((row) => ({
    accountId: account.id,
    accountName: account.account_name,
    platform: account.platform,
    date: row.metric_date,
    followers: account.followers,
    newFollowers: row.new_followers,
    reach: row.reach,
    impressions: row.impressions,
    engagement: row.engagement,
  }));
}

/** Dashboard: Meta insights for one account in the selected range — no DB writes. */
export async function fetchLiveDailyMetricsForAccount(
  dbAccountId: string,
  range: GrowthDateRange,
): Promise<DailyMetricRow[]> {
  const account = await fetchOrganicLiveRow(dbAccountId);
  if (!account?.access_token) return [];

  const span = resolveGrowthMetaSpan(range);

  try {
    return account.platform === "instagram"
      ? await fetchInstagramMetricsForRange(account, span)
      : await fetchFacebookMetricsForRange(account, span);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load metrics.";
    throw new Error(formatMetaApiError(message, account.account_name), { cause: error });
  }
}

/** Content page: one media/posts list call, filtered to the selected range. */
export async function fetchLivePosts(
  dbAccountId: string,
  range: GrowthDateRange,
): Promise<PostRow[]> {
  const account = await fetchOrganicLiveRow(dbAccountId);
  if (!account?.access_token) return [];

  const span = resolveGrowthMetaSpan(range);
  const token = account.access_token;

  if (account.platform === "instagram") {
    const media = await fetchInstagramMedia(account.account_id, token);
    const filtered = media
      .filter((item) => {
        const date = item.timestamp?.slice(0, 10);
        return date && inSpan(date, span);
      })
      .slice(0, META_INITIAL_POST_SYNC_LIMIT);

    const insightsById = await resolveIgPostInsights(filtered, token);

    return filtered.map((item) => {
        const likes = item.like_count ?? 0;
        const comments = item.comments_count ?? 0;
        const { reach: insightReach, views, saved, shares, reposts } =
          insightsById.get(item.id) ?? {
            reach: 0,
            views: 0,
            saved: 0,
            shares: 0,
            reposts: 0,
          };
        const reach = insightReach || views || likes + comments;
        const engagement = likes + comments + saved + shares + reposts;
        const rate =
          reach > 0
            ? Number(((engagement / reach) * 100).toFixed(2))
            : account.followers > 0
              ? Number(((engagement / account.followers) * 100).toFixed(2))
              : 0;

        return {
          id: item.id,
          caption: (item.caption ?? "Untitled post").slice(0, 500),
          mediaType: mapMediaType(item.media_type, item.media_product_type),
          reach,
          likes,
          comments,
          saves: saved,
          shares,
          reposts,
          engagementRate: rate,
          postedAt: item.timestamp!.slice(0, 10),
        };
      });
  }

  const posts = await fetchFacebookPosts(account.account_id, token);
  return posts
    .filter((post) => {
      const date = post.created_time?.slice(0, 10);
      return date && inSpan(date, span);
    })
    .slice(0, META_INITIAL_POST_SYNC_LIMIT)
    .map((post) => {
      const likes = post.reactions?.summary?.total_count ?? 0;
      const comments = post.comments?.summary?.total_count ?? 0;
      const shares = post.shares?.count ?? 0;
      const engagement = likes + comments + shares;

      return {
        id: post.id,
        caption: (post.message ?? "Untitled post").slice(0, 500),
        mediaType: "Image" as const,
        reach: 0,
        likes,
        comments,
        saves: 0,
        shares,
        reposts: 0,
        engagementRate:
          account.followers > 0
            ? Number(((engagement / account.followers) * 100).toFixed(2))
            : 0,
        postedAt: post.created_time!.slice(0, 10),
      };
    });
}

/** Campaign page: insights for the selected range only — no DB writes. */
export async function fetchLiveCampaignMetrics(
  dbAdAccountId: string,
  range: GrowthDateRange,
): Promise<CampaignMetricRow[]> {
  const account = await fetchAdLiveRow(dbAdAccountId);
  if (!account?.access_token) return [];

  const span = resolveGrowthMetaSpan(range);
  const token = account.access_token;
  const dailyInsights = [];

  for (const chunk of getMetaInsightChunksForSpan(span.from, span.to)) {
    const chunkRows = await fetchAdDailyInsights(account.ad_account_id, token, chunk);
    dailyInsights.push(...chunkRows);
  }

  const campaigns = await fetchAdCampaignStatuses(account.ad_account_id, token);
  const statusById = new Map(
    campaigns.map((campaign) => [campaign.id, mapCampaignStatus(campaign.status)]),
  );
  const statusByName = new Map(
    campaigns.map((campaign) => [campaign.name, mapCampaignStatus(campaign.status)]),
  );

  return dailyInsights
    .filter((row) => row.date_start && row.campaign_name && inSpan(row.date_start, span))
    .map((row) => ({
      campaignName: row.campaign_name!,
      status:
        statusById.get(row.campaign_id ?? "") ??
        statusByName.get(row.campaign_name!) ??
        "Active",
      spend: parseSpend(row.spend),
      impressions: Math.round(Number(row.impressions ?? 0)),
      clicks: Math.round(Number(row.clicks ?? 0)),
      conversions: parseConversions(row.actions),
      date: row.date_start!,
    }));
}
