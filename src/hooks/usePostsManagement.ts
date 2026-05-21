import { useState } from "react";
import type {
  ActiveSlot,
  Slot,
  StatusKey,
} from "@/types/PostsManagementPage/types";

const statusOptions: StatusKey[] = ["Draft", "Scheduled", "Posted", "Missed"];

function buildEmptySlot(day: string, date: number): Slot {
  return { day, date, clients: [] };
}

export function usePostsManagement(initialSlots: Slot[]) {
  const [slots, setSlots] = useState<Slot[]>(initialSlots);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState<ActiveSlot | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [clientName, setClientName] = useState("");
  const [clientStatus, setClientStatus] = useState<StatusKey>("Draft");

  const getSlot = (day: string, date: number) =>
    slots.find((slot) => slot.day === day && slot.date === date);

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setActiveSlot(null);
      setEditingIndex(null);
      setClientName("");
      setClientStatus("Draft");
    }
  };

  const openAddDialog = (day: string, date: number) => {
    setActiveSlot({ day, date });
    setEditingIndex(null);
    setClientName("");
    setClientStatus("Draft");
    setIsDialogOpen(true);
  };

  const openEditDialog = (day: string, date: number, clientIndex: number) => {
    const slot = getSlot(day, date);
    const client = slot?.clients[clientIndex];

    if (!client) {
      return;
    }

    setActiveSlot({ day, date });
    setEditingIndex(clientIndex);
    setClientName(client.name);
    setClientStatus(client.status);
    setIsDialogOpen(true);
  };

  const saveClient = () => {
    if (!activeSlot) {
      return;
    }

    const trimmedName = clientName.trim();
    if (!trimmedName) {
      return;
    }

    setSlots((prev) => {
      const existingIndex = prev.findIndex(
        (slot) => slot.day === activeSlot.day && slot.date === activeSlot.date,
      );

      const next = [...prev];
      const targetIndex =
        existingIndex === -1
          ? next.push(buildEmptySlot(activeSlot.day, activeSlot.date)) - 1
          : existingIndex;

      const targetSlot = next[targetIndex];
      const updatedClients = [...targetSlot.clients];

      if (editingIndex === null) {
        updatedClients.push({ name: trimmedName, status: clientStatus });
      } else if (updatedClients[editingIndex]) {
        updatedClients[editingIndex] = {
          name: trimmedName,
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
      const existingIndex = prev.findIndex(
        (slot) => slot.day === activeSlot.day && slot.date === activeSlot.date,
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
    clientName,
    clientStatus,
    editingIndex,
    setClientName,
    setClientStatus,
    getSlot,
    openAddDialog,
    openEditDialog,
    saveClient,
    deleteClient,
    handleDialogOpenChange,
  };
}
