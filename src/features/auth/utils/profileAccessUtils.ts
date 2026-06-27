import type { Profile } from "@/features/auth/types/profile";
import {
  hasClientPortalAccess,
  hasTeamPortalAccess,
} from "@/features/auth/types/profile";

/** Profile already linked to a portal — skip email sync and FK checks on load. */
export function hasEstablishedPortalAccess(profile: Profile): boolean {
  return hasTeamPortalAccess(profile) || hasClientPortalAccess(profile);
}
