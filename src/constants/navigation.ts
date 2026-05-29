export type NavIconKey =
  | "dashboard"
  | "appointments"
  | "analytics"
  | "reports"
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
    to: `${adminBasePath}/appointment-booking`,
    icon: "appointments",
  },
  { label: "Analytics", to: `${adminBasePath}/analytics`, icon: "analytics" },
  { label: "Reports", to: `${adminBasePath}/reports`, icon: "reports" },
  { label: "Settings", to: `${adminBasePath}/settings`, icon: "settings" },
];

export const appMeta = {
  name: "Reviva",
  userInitials: "R",
} as const;
