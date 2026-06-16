export type ServiceColor = "primary" | "accent";

export type ServiceIconName = "Users" | "Layers" | "Activity" | "Flame";

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: ServiceIconName;
  features: readonly string[];
};

export type HeroChartPoint = {
  day: string;
  current: number;
  previous: number;
};

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type PortalFeatureIcon =
  | "Clock"
  | "CheckCircle2"
  | "Activity"
  | "Layers"
  | "UserRound"
  | "Flame";

export type PortalCardItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: readonly { icon: PortalFeatureIcon; label: string }[];
  ctaLabel: string;
  ctaTo: string;
  variant: "primary" | "accent";
};

export type ContactDetailItem = {
  id: string;
  label: string;
  value: string;
  href?: string;
  icon: "Mail" | "Phone" | "MapPin";
};

export type SocialPlatform = "facebook" | "instagram" | "linkedin" | "youtube";

export type SocialLinkItem = {
  platform: SocialPlatform;
  href: string;
  label: string;
};

export type DashboardStatItem = {
  label: string;
  value: string;
  sublabel: string;
  icon: "UserRound" | "Users";
  color: ServiceColor;
};
