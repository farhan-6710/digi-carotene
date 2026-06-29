export type GrowthPlatform = "instagram" | "facebook";

export type TrendPoint = {
  label: string;
  followers: number;
  reach: number;
  engagement: number;
};

export type CategoryDatum = {
  key: string;
  label: string;
  value: number;
  color: string;
};

export type LabeledValue = {
  label: string;
  value: number;
};

export type SpendPoint = {
  label: string;
  spend: number;
  conversions: number;
};

export type TopAccountRow = {
  id: string;
  name: string;
  platform: GrowthPlatform;
  followers: number;
  engagementRate: number;
  reach: number;
};

export type ContentPostRow = {
  id: string;
  caption: string;
  mediaType: "Reel" | "Image" | "Carousel" | "Story";
  reach: number;
  likes: number;
  comments: number;
  saves: number;
  engagementRate: number;
};

export type CampaignRow = {
  id: string;
  name: string;
  status: "Active" | "Paused" | "Completed";
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
};

export type ReportType =
  | "instagram"
  | "facebook"
  | "campaigns"
  | "content_performance";

export type ReportRow = {
  id: string;
  title: string;
  type: ReportType;
  platform: GrowthPlatform | "campaigns";
  periodStart: string;
  periodEnd: string;
  createdAt: string;
};

export type OrganicAccount = {
  id: string;
  platform: GrowthPlatform;
  accountName: string;
  accountId: string;
  followers: number;
  isActive: boolean;
};

export type AdAccount = {
  id: string;
  clientName: string;
  accountName: string;
  adAccountId: string;
  currency: string;
};

export type OrganicAccountForm = {
  platform: GrowthPlatform;
  accountName: string;
  accountId: string;
  accessToken: string;
};

export type AdAccountForm = {
  clientName: string;
  accountName: string;
  adAccountId: string;
  accessToken: string;
  currency: string;
};
