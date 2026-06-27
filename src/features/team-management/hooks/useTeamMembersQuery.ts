import { useCallback } from "react";

import type { TeamMember } from "@/features/team-management/types/types";
import { fetchTeamMembers } from "@/services/teamMembersService";
import { useFetch } from "@/shared/hooks/useFetch";

export function useTeamMembersQuery() {
  const load = useCallback(() => fetchTeamMembers(), []);
  const { data: members, isLoading, error, setError, reload } = useFetch<TeamMember[]>(
    load,
    [],
  );

  return { members, isLoading, error, setError, reload };
}
