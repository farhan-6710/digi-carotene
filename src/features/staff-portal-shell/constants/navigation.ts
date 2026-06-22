import type { ShellNavIconKey } from "@/shared/constants/shellNavIcons";

export type NavIconKey = ShellNavIconKey;

export type NavItem = {
  label: string;
  to: string;
  icon: NavIconKey;
};

export const staffBasePath = "/staff-portal";

export const primaryNav: NavItem[] = [
  { label: "Dashboard", to: `${staffBasePath}/dashboard`, icon: "dashboard" },
  { label: "Team", to: `${staffBasePath}/team-management`, icon: "team" },
  { label: "Clients", to: `${staffBasePath}/clients-management`, icon: "clients" },
  { label: "Projects", to: `${staffBasePath}/projects-management`, icon: "projects" },
  { label: "Posts", to: `${staffBasePath}/posts-management`, icon: "posts" },
  { label: "Analytics", to: `${staffBasePath}/analytics`, icon: "analytics" },
  { label: "Reports", to: `${staffBasePath}/reports`, icon: "reports" },
  { label: "Account", to: `${staffBasePath}/account`, icon: "account" },
  { label: "Settings", to: `${staffBasePath}/settings`, icon: "settings" },
];

export const appMeta = {
  name: "Digi Carotene",
  userInitials: "D",
} as const;
