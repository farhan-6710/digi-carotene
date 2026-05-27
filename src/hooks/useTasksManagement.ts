import { useState } from "react";
import type {
  ActiveSlot,
  Slot,
  TaskStatusKey,
} from "@/types/TasksManagementPage/types";

const statusOptions: TaskStatusKey[] = ["Upcoming", "Done", "Missed"];

function buildEmptySlot(day: string, date: number): Slot {
  return { day, date, tasks: [] };
}

export function useTasksManagement(initialSlots: Slot[]) {
  const [slots, setSlots] = useState<Slot[]>(initialSlots);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState<ActiveSlot | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [taskName, setTaskName] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [taskStatus, setTaskStatus] = useState<TaskStatusKey>("Upcoming");

  const getSlot = (day: string, date: number) =>
    slots.find((slot) => slot.day === day && slot.date === date);

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setActiveSlot(null);
      setEditingIndex(null);
      setTaskName("");
      setTaskTime("");
      setTaskStatus("Upcoming");
    }
  };

  const openAddDialog = (day: string, date: number) => {
    setActiveSlot({ day, date });
    setEditingIndex(null);
    setTaskName("");
    setTaskTime("");
    setTaskStatus("Upcoming");
    setIsDialogOpen(true);
  };

  const openEditDialog = (day: string, date: number, taskIndex: number) => {
    const slot = getSlot(day, date);
    const task = slot?.tasks[taskIndex];

    if (!task) {
      return;
    }

    setActiveSlot({ day, date });
    setEditingIndex(taskIndex);
    setTaskName(task.name);
    setTaskTime(task.time);
    setTaskStatus(task.status);
    setIsDialogOpen(true);
  };

  const saveTask = () => {
    if (!activeSlot) {
      return;
    }

    const trimmedName = taskName.trim();
    const trimmedTime = taskTime.trim();
    if (!trimmedName || !trimmedTime) {
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
      const updatedTasks = [...targetSlot.tasks];

      if (editingIndex === null) {
        updatedTasks.push({
          name: trimmedName,
          time: trimmedTime,
          status: taskStatus,
        });
      } else if (updatedTasks[editingIndex]) {
        updatedTasks[editingIndex] = {
          name: trimmedName,
          time: trimmedTime,
          status: taskStatus,
        };
      }

      next[targetIndex] = { ...targetSlot, tasks: updatedTasks };
      return next;
    });

    handleDialogOpenChange(false);
  };

  const deleteTask = () => {
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
      const updatedTasks = targetSlot.tasks.filter(
        (_, index) => index !== editingIndex,
      );

      if (updatedTasks.length === 0) {
        next.splice(existingIndex, 1);
      } else {
        next[existingIndex] = { ...targetSlot, tasks: updatedTasks };
      }

      return next;
    });

    handleDialogOpenChange(false);
  };

  return {
    slots,
    statusOptions,
    isDialogOpen,
    taskName,
    taskTime,
    taskStatus,
    editingIndex,
    setTaskName,
    setTaskTime,
    setTaskStatus,
    getSlot,
    openAddDialog,
    openEditDialog,
    saveTask,
    deleteTask,
    handleDialogOpenChange,
  };
}
