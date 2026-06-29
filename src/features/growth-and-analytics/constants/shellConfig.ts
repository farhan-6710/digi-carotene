import type { ShellSidebarConfig } from "@/shared/types/components";

import { growthBasePath, growthMeta, growthNav } from "./navigation";

export const growthShellConfig: ShellSidebarConfig = {
  homeLink: "/",
  initials: growthMeta.initials,
  brandName: growthMeta.brandName,
  brandSubtitle: growthMeta.brandSubtitle,
  nav: growthNav,
  quickAction: {
    title: "Quick Actions",
    description: "Build a tailored client report with the metrics that matter.",
    buttonLabel: "Build a Report",
    buttonTo: `${growthBasePath}/custom-report`,
  },
};
