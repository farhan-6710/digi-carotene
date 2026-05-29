export type NavIconKey =
  | "dashboard"
  | "posts"
  | "analytics"
  | "reports"
  | "profile"
  | "settings";

export type NavItem = {
  label: string;
  to: string;
  icon: NavIconKey;
};

export const adminBasePath = "/admin";

export const primaryNav: NavItem[] = [
  { label: "Dashboard", to: `${adminBasePath}/dashboard`, icon: "dashboard" },
  {
    label: "Posts Management",
    to: `${adminBasePath}/posts-management`,
    icon: "posts",
  },
  { label: "Analytics", to: `${adminBasePath}/analytics`, icon: "analytics" },
  { label: "Reports", to: `${adminBasePath}/reports`, icon: "reports" },
  { label: "Profile", to: `${adminBasePath}/profile`, icon: "profile" },
  { label: "Settings", to: `${adminBasePath}/settings`, icon: "settings" },
];

export const appMeta = {
  name: "Digi Carotene",
  userInitials: "D",
} as const;
