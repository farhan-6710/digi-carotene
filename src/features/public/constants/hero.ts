import type { HeroChartPoint } from "@/features/public/types/types";

export const heroContent = {
  eyebrow: "Digital Marketing & Content Strategy",
  title: "Grow your brand with Digi Carotene",
  description:
    "Full-service digital marketing for brands that want stronger social presence, smarter content calendars, and campaigns that convert.",
  primaryCta: { label: "Explore Services", to: "#services" },
  secondaryCta: { label: "About Our Agency", to: "/about" },
} as const;

export const heroChartData: HeroChartPoint[] = [
  { day: "Day 1", current: 4, previous: 3 },
  { day: "Day 5", current: 6, previous: 5 },
  { day: "Day 10", current: 3, previous: 4 },
  { day: "Day 15", current: 8, previous: 6 },
  { day: "Day 20", current: 12, previous: 7 },
  { day: "Day 25", current: 10, previous: 9 },
  { day: "Day 30", current: 16, previous: 11 },
];

export const heroDashboardMeta = {
  eyebrow: "Live Operations",
  title: "Digi Carotene",
  url: "digicarotene.vercel.app",
  performanceLabel: "Publishing Performance",
  performanceDelta: "+18.5%",
  stats: [
    {
      label: "Team Members",
      value: "12",
      sublabel: "Active specialists",
      icon: "UserRound" as const,
      color: "primary" as const,
    },
    {
      label: "Total Clients",
      value: "24",
      sublabel: "Registered brands",
      icon: "Users" as const,
      color: "accent" as const,
    },
  ],
} as const;
