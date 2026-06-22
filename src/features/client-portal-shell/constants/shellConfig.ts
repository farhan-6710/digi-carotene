import type { ShellSidebarConfig } from "@/shared/types/components";

import { clientMeta, clientNav } from "./navigation";

export const clientShellConfig: ShellSidebarConfig = {
  homeLink: "/client-portal/dashboard",
  initials: clientMeta.userInitials,
  brandName: clientMeta.name,
  brandSubtitle: clientMeta.portalLabel,
  nav: clientNav,
  quickAction: {
    title: "Your content",
    description: "View scheduled posts and account details for your brand.",
    buttonLabel: "View Posts",
    buttonTo: "/client-portal/posts",
  },
};
