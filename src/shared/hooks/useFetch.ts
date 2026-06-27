import { useCallback, useEffect, useRef, useState } from "react";

// Small data-loading helper used by query hooks.
// Loads once on mount and exposes loading/error state plus a manual reload.
// On error it shows the message and resets data back to `fallback` (blank on error).
// Pass a `load` function wrapped in useCallback so it stays stable across renders.
export function useFetch<T>(load: () => Promise<T>, fallback: T) {
  const fallbackRef = useRef(fallback);

  const [data, setData] = useState<T>(fallback);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fallbackRef.current = fallback;
  }, [fallback]);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      setData(await load());
    } catch (err) {
      setData(fallbackRef.current);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [load]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void reload();
  }, [reload]);

  return { data, setData, isLoading, error, setError, reload };
}
