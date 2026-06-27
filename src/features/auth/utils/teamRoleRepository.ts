import { supabase } from "@/shared/lib/supabase";
import type { TeamMemberRole } from "@/features/team-management/constants/teamMemberRoles";
import { dedupeAsync } from "@/shared/utils/dedupeAsync";

export async function fetchTeamRoleByMemberId(
  teamMemberId: string,
): Promise<TeamMemberRole | null> {
  return dedupeAsync(`team-role:${teamMemberId}`, async () => {
    const { data, error } = await supabase
      .from("team_members")
      .select("team_role")
      .eq("id", teamMemberId)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return data.team_role as TeamMemberRole;
  });
}
