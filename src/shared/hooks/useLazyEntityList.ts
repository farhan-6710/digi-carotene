import { useCallback, useLayoutEffect, useRef, useState } from "react";

type UseLazyEntityListOptions = {
  preload?: boolean;
};

export function useLazyEntityList<T>(
  fetcher: () => Promise<T[]>,
  { preload = false }: UseLazyEntityListOptions = {},
) {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const hasLoadedRef = useRef(false);

  const loadItems = useCallback(() => {
    setIsLoading(true);
    fetcher()
      .then((data) => {
        setItems(data);
        hasLoadedRef.current = true;
      })
      .catch(() => setItems([]))
      .finally(() => setIsLoading(false));
  }, [fetcher]);

  useLayoutEffect(() => {
    if (!preload) {
      hasLoadedRef.current = false;
      return;
    }

    if (!hasLoadedRef.current) {
      loadItems();
    }
  }, [loadItems, preload]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (open && !hasLoadedRef.current) {
        loadItems();
      }
    },
    [loadItems],
  );

  return {
    items,
    isLoading,
    loadItems,
    handleOpenChange,
  };
}
