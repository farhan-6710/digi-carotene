import { useCallback } from "react";

import type { Post } from "@/features/posts-management/types/types";
import { fetchPostsForProjectId } from "@/services/postsService";
import type { TeamMember } from "@/features/team-management/types/types";
import { orderTeamMembersByIds } from "@/features/team-management/utils/teamMemberDisplayUtils";
import { fetchTeamMembersByIds } from "@/services/teamMembersService";
import type { ProjectListItem } from "@/features/projects-management/types/types";
import { fetchProjectById } from "@/services/projectsService";
import { useFetch } from "@/shared/hooks/useFetch";

type ProjectDetail = {
  project: ProjectListItem | null;
  posts: Post[];
  teamMembers: Pick<TeamMember, "id" | "member_name">[];
};

const EMPTY: ProjectDetail = { project: null, posts: [], teamMembers: [] };

export function useProjectDetailQuery(projectId: string) {
  const load = useCallback(async (): Promise<ProjectDetail> => {
    if (!projectId) {
      return EMPTY;
    }

    const project = await fetchProjectById(projectId);
    if (!project) {
      return EMPTY;
    }

    const memberIds = project.team_member_ids;
    const [posts, memberRows] = await Promise.all([
      fetchPostsForProjectId(projectId),
      memberIds.length > 0
        ? fetchTeamMembersByIds(memberIds)
        : Promise.resolve([]),
    ]);

    return {
      project,
      posts,
      teamMembers: orderTeamMembersByIds(memberRows, memberIds),
    };
  }, [projectId]);

  const { data, isLoading, error, reload } = useFetch(load, EMPTY);

  return {
    project: data.project,
    posts: data.posts,
    teamMembers: data.teamMembers,
    isLoading,
    error,
    reload,
  };
}
