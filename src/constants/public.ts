export const agencyMeta = {
  name: "Digi Carotene",
  tagline: "Digital Marketing Agency",
  description:
    "Strategic content, social campaigns, and brand growth — delivered with clarity, creativity, and measurable results.",
} as const;

export const heroContent = {
  eyebrow: "Digital Marketing",
  title: "Grow your brand with Digi Carotene",
  description:
    "Full-service digital marketing for brands that want stronger social presence, smarter content calendars, and campaigns that convert.",
  primaryCta: { label: "About our agency", to: "/about" },
  secondaryCta: { label: "Team portal", to: "/admin/dashboard" },
} as const;

export const serviceHighlights = [
  {
    title: "Social Media Management",
    description:
      "Consistent posting, community engagement, and platform-specific content that builds audience trust.",
  },
  {
    title: "Content Strategy",
    description:
      "Editorial calendars, campaign planning, and creative direction aligned to your brand goals.",
  },
  {
    title: "Paid Media Campaigns",
    description:
      "Targeted ad campaigns across social and search with ongoing optimisation and reporting.",
  },
  {
    title: "Brand & Creative",
    description:
      "Visual identity, copy, and campaign assets that keep your messaging cohesive across channels.",
  },
] as const;

export const agencyStats = [
  { label: "Posts delivered monthly", value: "180+" },
  { label: "Client retention", value: "96%" },
  { label: "Average campaign cycle", value: "6–8 wks" },
  { label: "Specialists on team", value: "12" },
] as const;

export const aboutContent = {
  title: "About Digi Carotene",
  intro:
    "Digi Carotene is a digital marketing agency built around one belief: growth should feel structured, creative, and measurable.",
  sections: [
    {
      title: "Our approach",
      body: "Every client receives a clear content plan with defined milestones — from strategy and scheduling through publishing and performance review. We combine creative direction, channel expertise, and reporting in one collaborative workflow.",
    },
    {
      title: "Who we help",
      body: "From local brands building their first social presence to established companies scaling multi-channel campaigns, our team supports a wide range of marketing goals with the same level of attention and professionalism.",
    },
    {
      title: "Agency operations",
      body: "Our team portal keeps posts, client schedules, and campaign activity organised — so strategists can focus on creative work while operations run smoothly behind the scenes.",
    },
  ],
  values: ["Client-first strategy", "Data-informed creativity", "Transparent reporting"],
} as const;

export const publicNavLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Team portal", to: "/admin/dashboard" },
] as const;
