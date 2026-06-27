import type { Profile } from "@/features/auth/types/profile";
import { hasEstablishedPortalAccess } from "@/features/auth/utils/profileAccessUtils";
import { supabase } from "@/shared/lib/supabase";

async function linkedTeamMemberExists(teamMemberId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("team_members")
    .select("id")
    .eq("id", teamMemberId)
    .maybeSingle();

  return !error && data !== null;
}

async function linkedClientExists(clientId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("clients")
    .select("id")
    .eq("id", clientId)
    .maybeSingle();

  return !error && data !== null;
}

export async function validateProfileLinks(profile: Profile): Promise<Profile> {
  if (hasEstablishedPortalAccess(profile)) {
    return profile;
  }

  let teamMemberId = profile.team_member_id;
  let clientId = profile.client_id;

  if (teamMemberId && !(await linkedTeamMemberExists(teamMemberId))) {
    teamMemberId = null;
  }

  if (clientId && !(await linkedClientExists(clientId))) {
    clientId = null;
  }

  if (
    teamMemberId === profile.team_member_id &&
    clientId === profile.client_id
  ) {
    return profile;
  }

  return {
    ...profile,
    team_member_id: teamMemberId,
    client_id: clientId,
  };
}
