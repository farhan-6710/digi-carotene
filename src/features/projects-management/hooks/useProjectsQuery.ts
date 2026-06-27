import { useCallback } from "react";

import type { ProjectListItem } from "@/features/projects-management/types/types";
import { fetchProjects } from "@/services/projectsService";
import { useFetch } from "@/shared/hooks/useFetch";

export function useProjectsQuery() {
  const load = useCallback(() => fetchProjects(), []);
  const {
    data: projects,
    isLoading,
    error,
    setError,
    reload,
  } = useFetch<ProjectListItem[]>(load, []);

  return { projects, isLoading, error, setError, reload };
}
