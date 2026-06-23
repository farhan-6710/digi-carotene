import { supabase } from "@/shared/lib/supabase";
import type { Profile } from "@/features/auth/types/profile";

export async function fetchProfileByUserId(
  userId: string,
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, role, client_id, team_member_id")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (data as Profile | null) ?? null;
}

export async function resetProfilesForTeamMember(
  teamMemberId: string,
): Promise<void> {
  const { error } = await supabase
    .from("profiles")
    .update({ role: "user", team_member_id: null })
    .eq("team_member_id", teamMemberId);

  if (error) {
    throw error;
  }
}

export async function resetProfilesForClient(clientId: string): Promise<void> {
  const { error } = await supabase
    .from("profiles")
    .update({ role: "user", client_id: null })
    .eq("client_id", clientId);

  if (error) {
    throw error;
  }
}

export async function unlinkProfilesFromClient(
  clientId: string,
): Promise<void> {
  await resetProfilesForClient(clientId);
}
