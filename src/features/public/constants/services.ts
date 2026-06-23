import type { ServiceItem } from "@/features/public/types/types";

export const servicesSectionContent = {
  badge: "What We Do",
  title: "Marketing services built for impact",
  description:
    "Campaigns and content programmes for brands that partner with Digi Carotene — structured, creative, and measurable.",
} as const;

export const servicesData: ServiceItem[] = [
  {
    id: "social",
    title: "Social Media Management",
    description:
      "Consistent posting, community engagement, and platform-specific content that builds audience trust and drives organic reach.",
    icon: "Users",
    features: [
      "Platform-specific content creation",
      "Community management & engagement",
      "Hashtag & keyword optimization",
      "Monthly performance reporting",
    ],
  },
  {
    id: "content",
    title: "Content Strategy",
    description:
      "Editorial calendars, campaign planning, and creative direction aligned to your brand goals and target audience behavior.",
    icon: "Layers",
    features: [
      "Multi-channel content calendars",
      "Creative direction & copywriting",
      "SEO-focused blog & article writing",
      "Brand voice & tone development",
    ],
  },
  {
    id: "paid",
    title: "Paid Media Campaigns",
    description:
      "Targeted ad campaigns across social and search with ongoing optimization, precise audience targeting, and high ROI.",
    icon: "Activity",
    features: [
      "Meta, LinkedIn, and Google Ads",
      "A/B testing of creatives & copy",
      "Precise demographic targeting",
      "Conversion rate optimization",
    ],
  },
  {
    id: "brand",
    title: "Brand & Creative",
    description:
      "Visual identity, high-quality copy, and campaign assets that keep your messaging cohesive and stunning across all channels.",
    icon: "Flame",
    features: [
      "Logo & visual identity design",
      "Social media templates",
      "Ad creative & video assets",
      "Cohesive brand style guides",
    ],
  },
];
