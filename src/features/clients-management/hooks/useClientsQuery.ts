import { useCallback } from "react";

import type { Client } from "@/features/clients-management/types/types";
import { fetchClients } from "@/services/clientsService";
import { useFetch } from "@/shared/hooks/useFetch";

export function useClientsQuery() {
  const load = useCallback(() => fetchClients(), []);
  const {
    data: clients,
    isLoading,
    error,
    setError,
    reload,
  } = useFetch<Client[]>(load, []);

  return { clients, isLoading, error, setError, reload };
}
