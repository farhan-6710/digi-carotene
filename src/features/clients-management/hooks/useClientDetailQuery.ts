import { useCallback } from "react";

import type { Client } from "@/features/clients-management/types/types";
import { fetchClientById } from "@/services/clientsService";
import type { ProjectListItem } from "@/features/projects-management/types/types";
import { fetchProjectsByClientId } from "@/services/projectsService";
import { useFetch } from "@/shared/hooks/useFetch";

type ClientDetail = {
  client: Client | null;
  projects: ProjectListItem[];
};

const EMPTY: ClientDetail = { client: null, projects: [] };

export function useClientDetailQuery(clientId: string) {
  const load = useCallback(async (): Promise<ClientDetail> => {
    if (!clientId) {
      return EMPTY;
    }

    const [client, projects] = await Promise.all([
      fetchClientById(clientId),
      fetchProjectsByClientId(clientId),
    ]);

    return { client, projects };
  }, [clientId]);

  const { data, isLoading, error, setError, reload } = useFetch(load, EMPTY);

  return {
    client: data.client,
    projects: data.projects,
    isLoading,
    error,
    setError,
    reload,
  };
}
