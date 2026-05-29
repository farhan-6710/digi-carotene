import { useCallback, useEffect, useState } from "react";

import {
  DEFAULT_POST_STATUS,
  statusOptions,
} from "@/constants/admin/posts-management/postsManagement";
import { DEFAULT_POST_TIME } from "@/constants/admin/posts-management/postSchedule";
import type {
  ActiveSlot,
  PostDateTimeValue,
  StatusKey,
} from "@/types/admin/posts-management/types";
import { getDayLabel } from "@/utils/admin/posts-management/calendarUtils";
import {
  isValidPostTime,
  normalizePostTime,
  parsePostDate,
  toPostDateString,
} from "@/utils/admin/posts-management/postScheduleUtils";
import {
  createPost,
  deletePost,
  fetchPostsForMonth,
  postsToSlots,
  updatePost,
} from "@/utils/admin/posts-management/postsRepository";

function toPostDateTimeValue(
  dateValue: string | null | undefined,
  timeValue: string | null | undefined,
): PostDateTimeValue | null {
  const dateParts = parsePostDate(dateValue);
  const time = timeValue?.trim();

  if (!dateParts || !time || !isValidPostTime(time)) {
    return null;
  }

  return {
    year: dateParts.year,
    month: dateParts.month,
    day: dateParts.day,
    time: normalizePostTime(time),
  };
}

function toRepositoryDateTime(
  value: PostDateTimeValue | null,
): { date: string; time: string } | null {
  if (!value?.time.trim() || !isValidPostTime(value.time)) {
    return null;
  }

  return {
    date: toPostDateString(value.year, value.month, value.day),
    time: normalizePostTime(value.time),
  };
}

export function usePostsManagement(year: number, month: number) {
  const [slots, setSlots] = useState(() => postsToSlots([], year, month));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState<ActiveSlot | null>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [toBePostedOn, setToBePostedOn] = useState<PostDateTimeValue | null>(
    null,
  );
  const [postedOn, setPostedOn] = useState<PostDateTimeValue | null>(null);
  const [clientStatus, setClientStatus] = useState<StatusKey>(DEFAULT_POST_STATUS);

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const posts = await fetchPostsForMonth(year, month);
      setSlots(postsToSlots(posts, year, month));
    } catch (loadError) {
      const message =
        loadError instanceof Error
          ? loadError.message
          : "Failed to load posts for this month.";
      setError(message);
      setSlots(postsToSlots([], year, month));
    } finally {
      setIsLoading(false);
    }
  }, [year, month]);

  useEffect(() => {
    void loadPosts();
  }, [loadPosts]);

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

  const resetDialogState = useCallback(() => {
    setActiveSlot(null);
    setEditingPostId(null);
    setClientId("");
    setClientName("");
    setToBePostedOn(null);
    setPostedOn(null);
    setClientStatus(DEFAULT_POST_STATUS);
  }, []);

  const handleDialogOpenChange = useCallback(
    (open: boolean) => {
      setIsDialogOpen(open);
      if (!open) {
        resetDialogState();
      }
    },
    [resetDialogState],
  );

  const openAddDialog = useCallback(
    (slotYear: number, slotMonth: number, date: number) => {
      setActiveSlot({
        year: slotYear,
        month: slotMonth,
        date,
        day: getDayLabel(slotYear, slotMonth, date),
      });
      setEditingPostId(null);
      setClientId("");
      setClientName("");
      setToBePostedOn({
        year: slotYear,
        month: slotMonth,
        day: date,
        time: DEFAULT_POST_TIME,
      });
      setPostedOn(null);
      setClientStatus(DEFAULT_POST_STATUS);
      setIsDialogOpen(true);
    },
    [],
  );

  const openEditDialog = useCallback(
    (slotYear: number, slotMonth: number, date: number, postId: string) => {
      const slot = slots.find(
        (entry) =>
          entry.year === slotYear &&
          entry.month === slotMonth &&
          entry.date === date,
      );
      const client = slot?.clients.find((entry) => entry.id === postId);

      if (!client) {
        return;
      }

      setActiveSlot({
        year: slotYear,
        month: slotMonth,
        date,
        day: slot?.day ?? getDayLabel(slotYear, slotMonth, date),
      });
      setEditingPostId(postId);
      setClientId(postId);
      setClientName(client.name);
      setToBePostedOn(
        toPostDateTimeValue(client.scheduledDate, client.scheduledTime) ?? {
          year: slotYear,
          month: slotMonth,
          day: date,
          time: normalizePostTime(client.scheduledTime),
        },
      );
      setPostedOn(toPostDateTimeValue(client.postedDate, client.postedTime));
      setClientStatus(client.status);
      setIsDialogOpen(true);
    },
    [slots],
  );

  const saveClient = useCallback(async () => {
    if (!activeSlot || isSaving) {
      return;
    }

    const trimmedName = clientName.trim();
    const scheduled = toRepositoryDateTime(toBePostedOn);
    const posted = toRepositoryDateTime(postedOn);
    const hasPostedInput = Boolean(
      postedOn &&
        (postedOn.time.trim() ||
          postedOn.day ||
          postedOn.month ||
          postedOn.year),
    );

    if (!trimmedName || !scheduled) {
      setError("To be posted on requires both date and time.");
      return;
    }

    if (hasPostedInput && !posted) {
      setError("Posted on requires both date and time, or leave both empty.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      if (editingPostId) {
        await updatePost(editingPostId, {
          clientName: trimmedName,
          scheduled,
          posted,
          status: clientStatus,
        });
      } else {
        await createPost({
          clientName: trimmedName,
          scheduled,
          posted,
          status: clientStatus,
        });
      }

      await loadPosts();
      handleDialogOpenChange(false);
    } catch (saveError) {
      const message =
        saveError instanceof Error
          ? saveError.message
          : "Failed to save this post.";
      setError(message);
    } finally {
      setIsSaving(false);
    }
  }, [
    activeSlot,
    clientName,
    clientStatus,
    editingPostId,
    handleDialogOpenChange,
    isSaving,
    loadPosts,
    postedOn,
    toBePostedOn,
  ]);

  const deleteClient = useCallback(async () => {
    if (!editingPostId || isSaving) {
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await deletePost(editingPostId);
      await loadPosts();
      handleDialogOpenChange(false);
    } catch (deleteError) {
      const message =
        deleteError instanceof Error
          ? deleteError.message
          : "Failed to delete this post.";
      setError(message);
    } finally {
      setIsSaving(false);
    }
  }, [editingPostId, handleDialogOpenChange, isSaving, loadPosts]);

  return {
    statusOptions,
    isLoading,
    error,
    isSaving,
    isDialogOpen,
    activeSlot,
    clientId,
    clientName,
    toBePostedOn,
    postedOn,
    clientStatus,
    editingPostId,
    setClientName,
    setToBePostedOn,
    setPostedOn,
    setClientStatus,
    getSlot,
    openAddDialog,
    openEditDialog,
    saveClient,
    deleteClient,
    handleDialogOpenChange,
    reloadPosts: loadPosts,
  };
}
