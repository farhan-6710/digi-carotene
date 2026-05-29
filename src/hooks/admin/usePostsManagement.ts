import { useCallback, useEffect, useState } from "react";

import type { ActiveSlot, StatusKey } from "@/types/admin/posts-management/types";
import { DEFAULT_POST_TIME } from "@/constants/admin/posts-management/postSchedule";
import { getDayLabel } from "@/utils/admin/posts-management/calendarUtils";
import { normalizePostTime, isValidPostTime } from "@/utils/admin/posts-management/postScheduleUtils";
import {
  createPost,
  deletePost,
  fetchPostsForMonth,
  postsToSlots,
  toScheduledDate,
  updatePost,
} from "@/utils/admin/posts-management/postsRepository";

const statusOptions: StatusKey[] = ["Draft", "Scheduled", "Posted", "Missed"];

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
  const [clientTime, setClientTime] = useState("");
  const [clientStatus, setClientStatus] = useState<StatusKey>("Draft");

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
    setClientTime("");
    setClientStatus("Draft");
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
      setClientTime(DEFAULT_POST_TIME);
      setClientStatus("Draft");
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
      setClientId(client.id);
      setClientName(client.name);
      setClientTime(normalizePostTime(client.time));
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
    if (!trimmedName || !isValidPostTime(clientTime)) {
      return;
    }

    const trimmedTime = normalizePostTime(clientTime);

    setIsSaving(true);
    setError(null);

    try {
      if (editingPostId) {
        await updatePost(editingPostId, {
          clientName: trimmedName,
          scheduledTime: trimmedTime,
          status: clientStatus,
        });
      } else {
        await createPost({
          clientName: trimmedName,
          scheduledDate: toScheduledDate(
            activeSlot.year,
            activeSlot.month,
            activeSlot.date,
          ),
          scheduledTime: trimmedTime,
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
    clientTime,
    editingPostId,
    handleDialogOpenChange,
    isSaving,
    loadPosts,
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
    clientTime,
    clientStatus,
    editingPostId,
    setClientName,
    setClientTime,
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
