import { useCallback } from "react";

import type { AnalyticsDataset } from "@/features/analytics/types/types";
import { fetchClients } from "@/services/clientsService";
import { fetchAllPosts } from "@/services/postsService";
import { fetchProjects } from "@/services/projectsService";
import { fetchTeamMembers } from "@/services/teamMembersService";
import { useFetch } from "@/shared/hooks/useFetch";

const EMPTY_DATASET: AnalyticsDataset = {
  posts: [],
  clients: [],
  teamMembers: [],
  projects: [],
};

export function useAnalyticsData() {
  const load = useCallback(async (): Promise<AnalyticsDataset> => {
    const [posts, clients, teamMembers, projects] = await Promise.all([
      fetchAllPosts(),
      fetchClients(),
      fetchTeamMembers(),
      fetchProjects(),
    ]);

    return { posts, clients, teamMembers, projects };
  }, []);

  const { data, isLoading, error, reload } = useFetch(load, EMPTY_DATASET);

  return { data, isLoading, error, reload };
}
