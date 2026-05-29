import { useState } from "react";
import type {
  ActiveSlot,
  Slot,
  StatusKey,
} from "@/types/admin/posts-management/types";
import { getDayLabel } from "@/utils/admin/posts-management/calendarUtils";

const statusOptions: StatusKey[] = ["Draft", "Scheduled", "Posted", "Missed"];

function buildEmptySlot(
  year: number,
  month: number,
  date: number,
  day: string,
): Slot {
  return { year, month, date, day, clients: [] };
}

function createClientId() {
  return `cli-${Date.now()}`;
}

function matchesSlot(
  slot: Slot,
  year: number,
  month: number,
  date: number,
) {
  return slot.year === year && slot.month === month && slot.date === date;
}

export function usePostsManagement(initialSlots: Slot[]) {
  const [slots, setSlots] = useState<Slot[]>(initialSlots);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState<ActiveSlot | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientTime, setClientTime] = useState("");
  const [clientStatus, setClientStatus] = useState<StatusKey>("Draft");

  const getSlot = (year: number, month: number, date: number) =>
    slots.find((slot) => matchesSlot(slot, year, month, date));

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setActiveSlot(null);
      setEditingIndex(null);
      setClientId("");
      setClientName("");
      setClientTime("");
      setClientStatus("Draft");
    }
  };

  const openAddDialog = (year: number, month: number, date: number) => {
    const day = getDayLabel(year, month, date);
    setActiveSlot({ year, month, date, day });
    setEditingIndex(null);
    setClientId(createClientId());
    setClientName("");
    setClientTime("");
    setClientStatus("Draft");
    setIsDialogOpen(true);
  };

  const openEditDialog = (
    year: number,
    month: number,
    date: number,
    clientIndex: number,
  ) => {
    const slot = getSlot(year, month, date);
    const client = slot?.clients[clientIndex];

    if (!client) {
      return;
    }

    setActiveSlot({
      year,
      month,
      date,
      day: slot?.day ?? getDayLabel(year, month, date),
    });
    setEditingIndex(clientIndex);
    setClientId(client.id);
    setClientName(client.name);
    setClientTime(client.time);
    setClientStatus(client.status);
    setIsDialogOpen(true);
  };

  const saveClient = () => {
    if (!activeSlot) {
      return;
    }

    const trimmedName = clientName.trim();
    const trimmedTime = clientTime.trim();
    if (!trimmedName || !trimmedTime) {
      return;
    }

    setSlots((prev) => {
      const existingIndex = prev.findIndex((slot) =>
        matchesSlot(slot, activeSlot.year, activeSlot.month, activeSlot.date),
      );

      const next = [...prev];
      const targetIndex =
        existingIndex === -1
          ? next.push(
              buildEmptySlot(
                activeSlot.year,
                activeSlot.month,
                activeSlot.date,
                activeSlot.day,
              ),
            ) - 1
          : existingIndex;

      const targetSlot = next[targetIndex];
      const updatedClients = [...targetSlot.clients];

      if (editingIndex === null) {
        updatedClients.push({
          id: clientId || createClientId(),
          name: trimmedName,
          time: trimmedTime,
          status: clientStatus,
        });
      } else if (updatedClients[editingIndex]) {
        updatedClients[editingIndex] = {
          id: clientId,
          name: trimmedName,
          time: trimmedTime,
          status: clientStatus,
        };
      }

      next[targetIndex] = { ...targetSlot, clients: updatedClients };
      return next;
    });

    handleDialogOpenChange(false);
  };

  const deleteClient = () => {
    if (!activeSlot || editingIndex === null) {
      return;
    }

    setSlots((prev) => {
      const existingIndex = prev.findIndex((slot) =>
        matchesSlot(slot, activeSlot.year, activeSlot.month, activeSlot.date),
      );

      if (existingIndex === -1) {
        return prev;
      }

      const next = [...prev];
      const targetSlot = next[existingIndex];
      const updatedClients = targetSlot.clients.filter(
        (_, index) => index !== editingIndex,
      );

      if (updatedClients.length === 0) {
        next.splice(existingIndex, 1);
      } else {
        next[existingIndex] = { ...targetSlot, clients: updatedClients };
      }

      return next;
    });

    handleDialogOpenChange(false);
  };

  return {
    slots,
    statusOptions,
    isDialogOpen,
    clientId,
    clientName,
    clientTime,
    clientStatus,
    editingIndex,
    setClientName,
    setClientTime,
    setClientStatus,
    getSlot,
    openAddDialog,
    openEditDialog,
    saveClient,
    deleteClient,
    handleDialogOpenChange,
  };
}
