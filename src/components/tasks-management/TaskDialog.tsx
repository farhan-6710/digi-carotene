import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TaskStatusKey } from "@/types/TasksManagementPage/types";

type TaskDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing: boolean;
  taskName: string;
  taskTime: string;
  taskStatus: TaskStatusKey;
  statusOptions: TaskStatusKey[];
  onTaskNameChange: (value: string) => void;
  onTaskTimeChange: (value: string) => void;
  onTaskStatusChange: (value: TaskStatusKey) => void;
  onSave: () => void;
  onDelete?: () => void;
};

export function TaskDialog({
  open,
  onOpenChange,
  isEditing,
  taskName,
  taskTime,
  taskStatus,
  statusOptions,
  onTaskNameChange,
  onTaskTimeChange,
  onTaskStatusChange,
  onSave,
  onDelete,
}: TaskDialogProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDeleteClick = () => {
    if (!onDelete) {
      return;
    }

    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!onDelete) {
      return;
    }

    onDelete();
    setIsConfirmOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Task" : "Add Task"}</DialogTitle>
            <DialogDescription>
              Set the task name, scheduled time, and status for this day.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <label className="block text-xs font-semibold text-muted-foreground">
              Task name
              <input
                value={taskName}
                onChange={(event) => onTaskNameChange(event.target.value)}
                placeholder="e.g. Morning Prayer"
                className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring"
              />
            </label>

            <label className="block text-xs font-semibold text-muted-foreground">
              Time
              <input
                value={taskTime}
                onChange={(event) => onTaskTimeChange(event.target.value)}
                placeholder="e.g. 8:30 am"
                className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring"
              />
            </label>

            <label className="block text-xs font-semibold text-muted-foreground">
              Status
              <select
                value={taskStatus}
                onChange={(event) =>
                  onTaskStatusChange(event.target.value as TaskStatusKey)
                }
                className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <DialogFooter>
            {isEditing && onDelete ? (
              <Button
                variant="destructive"
                onClick={handleDeleteClick}
                className="mr-auto"
              >
                Remove Task
              </Button>
            ) : null}
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={onSave}
              disabled={!taskName.trim() || !taskTime.trim()}
              className="rounded-full"
            >
              {isEditing ? "Save Changes" : "Add Task"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove task?</DialogTitle>
            <DialogDescription>
              This removes the task from the current day. This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Remove Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
