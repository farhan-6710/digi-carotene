import { useCallback, useMemo } from "react";

import type {
  ManagedProjectSummary,
  MemberProjectAssignment,
  TeamMember,
} from "@/features/team-management/types/types";
import {
  fetchManagedProjects,
  fetchMemberProjectAssignments,
} from "@/services/projectTeamMembersService";
import { splitMemberAssignments } from "@/features/team-management/utils/teamMemberAssignmentUtils";
import { fetchTeamMemberById } from "@/services/teamMembersService";
import { useFetch } from "@/shared/hooks/useFetch";

type MemberDetail = {
  member: TeamMember | null;
  assignments: MemberProjectAssignment[];
  managedProjects: ManagedProjectSummary[];
};

const EMPTY: MemberDetail = { member: null, assignments: [], managedProjects: [] };

export function useTeamMemberDetailQuery(memberId: string) {
  const load = useCallback(async (): Promise<MemberDetail> => {
    if (!memberId) {
      return EMPTY;
    }

    const [member, assignments, managedProjects] = await Promise.all([
      fetchTeamMemberById(memberId),
      fetchMemberProjectAssignments(memberId),
      fetchManagedProjects(memberId),
    ]);

    return { member, assignments, managedProjects };
  }, [memberId]);

  const { data, isLoading, error, setError, reload } = useFetch(load, EMPTY);

  const { active: activeAssignments, past: pastAssignments } = useMemo(
    () => splitMemberAssignments(data.assignments),
    [data.assignments],
  );

  return {
    member: data.member,
    assignments: data.assignments,
    activeAssignments,
    pastAssignments,
    managedProjects: data.managedProjects,
    isLoading,
    error,
    setError,
    reload,
  };
}
