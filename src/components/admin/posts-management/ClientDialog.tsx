import { useState } from "react";

import { PostSchedulePicker } from "@/components/admin/posts-management/PostSchedulePicker";
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
import type { StatusKey } from "@/types/admin/posts-management/types";
import { cn } from "@/lib/utils";

const fieldClassName = cn(
  "mt-2 w-full rounded-lg border border-ring/60 bg-background px-3 py-2 text-sm text-foreground shadow-xs outline-none transition-colors",
  "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25",
  "dark:border-input dark:bg-muted/40",
);

type ClientDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing: boolean;
  slotYear: number;
  slotMonth: number;
  slotDate: number;
  clientId: string;
  clientName: string;
  clientTime: string;
  clientStatus: StatusKey;
  statusOptions: StatusKey[];
  onClientNameChange: (value: string) => void;
  onClientTimeChange: (value: string) => void;
  onClientStatusChange: (value: StatusKey) => void;
  onSave: () => void;
  onDelete?: () => void;
  isSaving?: boolean;
};

export function ClientDialog({
  open,
  onOpenChange,
  isEditing,
  slotYear,
  slotMonth,
  slotDate,
  clientId,
  clientName,
  clientTime,
  clientStatus,
  statusOptions,
  onClientNameChange,
  onClientTimeChange,
  onClientStatusChange,
  onSave,
  onDelete,
  isSaving = false,
}: ClientDialogProps) {
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
        <DialogContent className="overflow-visible">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Client" : "Add Client"}
            </DialogTitle>
            <DialogDescription>
              Set the client name, schedule, and status for this day.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {isEditing ? (
              <label className="block text-xs font-semibold text-muted-foreground">
                Client ID
                <input
                  value={clientId}
                  readOnly
                  className={cn(fieldClassName, "bg-muted/40 dark:bg-muted/50")}
                />
              </label>
            ) : null}

            <label className="block text-xs font-semibold text-muted-foreground">
              Client name
              <input
                value={clientName}
                onChange={(event) => onClientNameChange(event.target.value)}
                placeholder="e.g. Bloom Skincare"
                className={fieldClassName}
              />
            </label>

            <div className="space-y-2">
              <span className="block text-xs font-semibold text-muted-foreground">
                Date & time
              </span>
              <PostSchedulePicker
                year={slotYear}
                month={slotMonth}
                date={slotDate}
                selectedTime={clientTime}
                onTimeChange={onClientTimeChange}
                disabled={isSaving}
              />
            </div>

            <label className="block text-xs font-semibold text-muted-foreground">
              Status
              <select
                value={clientStatus}
                onChange={(event) =>
                  onClientStatusChange(event.target.value as StatusKey)
                }
                className={fieldClassName}
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
                disabled={isSaving}
              >
                Remove Client
              </Button>
            ) : null}
            <DialogClose asChild>
              <Button variant="outline" disabled={isSaving}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={onSave}
              disabled={!clientName.trim() || !clientTime.trim() || isSaving}
              className="rounded-full"
            >
              {isSaving
                ? "Saving..."
                : isEditing
                  ? "Save Changes"
                  : "Add Client"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove client?</DialogTitle>
            <DialogDescription>
              This removes the client from the current day. This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isSaving}
            >
              Remove Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
