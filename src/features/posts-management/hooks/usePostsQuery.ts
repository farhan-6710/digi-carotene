import { useCallback } from "react";

import type { Slot } from "@/features/posts-management/types/types";
import { fetchPostsForMonth } from "@/services/postsService";
import { postsToSlots } from "@/features/posts-management/utils/postsSlots";
import { useFetch } from "@/shared/hooks/useFetch";

export function usePostsQuery(year: number, month: number) {
  const load = useCallback(async () => {
    const posts = await fetchPostsForMonth(year, month);
    return postsToSlots(posts, year, month);
  }, [year, month]);

  const { data: slots, isLoading, error, setError, reload } = useFetch(
    load,
    postsToSlots([], year, month),
  );

  const getSlot = useCallback(
    (slotYear: number, slotMonth: number, date: number) =>
      slots.find(
        (slot) =>
          slot.year === slotYear &&
          slot.month === slotMonth &&
          slot.date === date,
      ),
    [slots],
  );

  return { slots, isLoading, error, setError, reload, getSlot };
}

export type { Slot };
