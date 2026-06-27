import { useMemo } from "react";

import { useTeamReviewerAccess } from "@/features/post-approvals/providers/teamReviewerAccessContext";
import { canAccessApprovalsNav } from "@/features/post-approvals/utils/postApprovalRules";
import {
  approvalsNavItem,
  primaryNav,
} from "@/features/team-portal-shell/constants/navigation";
import { teamShellConfig } from "@/features/team-portal-shell/constants/shellConfig";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { ShellSidebarConfig } from "@/shared/types/components";

export function useTeamShellConfig(): ShellSidebarConfig {
  const { teamRole } = useAuth();
  const { managesProject } = useTeamReviewerAccess();

  return useMemo(() => {
    const showApprovals = canAccessApprovalsNav(teamRole, managesProject);
    const nav = showApprovals
      ? [...primaryNav.slice(0, 5), approvalsNavItem, ...primaryNav.slice(5)]
      : primaryNav;

    return {
      ...teamShellConfig,
      nav,
    };
  }, [managesProject, teamRole]);
}
