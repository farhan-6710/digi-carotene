export type NavIconKey =
  | "dashboard"
  | "posts"
  | "tasks"
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
  { label: "Tasks Management", to: "/tasks-management", icon: "tasks" },
  { label: "Analytics", to: "/analytics", icon: "analytics" },
  { label: "Reports", to: "/reports", icon: "reports" },
  { label: "Settings", to: "/settings", icon: "settings" },
];

export const appMeta = {
  name: "Digi Carotene",
  userInitials: "DC",
} as const;
