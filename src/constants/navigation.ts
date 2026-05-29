export type NavIconKey =
  | "dashboard"
  | "appointments"
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
    label: "Appointments",
    to: `${adminBasePath}/appointments-management`,
    icon: "appointments",
  },
  { label: "Analytics", to: `${adminBasePath}/analytics`, icon: "analytics" },
  { label: "Reports", to: `${adminBasePath}/reports`, icon: "reports" },
  { label: "Profile", to: `${adminBasePath}/profile`, icon: "profile" },
  { label: "Settings", to: `${adminBasePath}/settings`, icon: "settings" },
];

export const appMeta = {
  name: "Reviva",
  userInitials: "R",
} as const;
