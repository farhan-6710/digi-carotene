export type NavIconKey =
  | "dashboard"
  | "posts"
  | "analytics"
  | "reports"
  | "settings";

export type NavItem = {
  label: string;
  to: string;
  icon: NavIconKey;
};

export const primaryNav: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: "dashboard" },
  { label: "Posts Management", to: "/posts-management", icon: "posts" },
  { label: "Analytics", to: "/analytics", icon: "analytics" },
  { label: "Reports", to: "/reports", icon: "reports" },
  { label: "Settings", to: "/settings", icon: "settings" },
];

export const appMeta = {
  name: "Digi Carotene",
  userInitials: "DC",
} as const;
