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
import type { StatusKey } from "@/types/PostsManagementPage/types";

type ClientDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing: boolean;
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
};

export function ClientDialog({
  open,
  onOpenChange,
  isEditing,
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Client" : "Add Client"}
            </DialogTitle>
            <DialogDescription>
              Set the client name, post time, and status for this day.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <label className="block text-xs font-semibold text-muted-foreground">
              Client ID
              <input
                value={clientId}
                readOnly
                className="mt-2 w-full rounded-lg border border-input bg-muted/40 px-3 py-2 text-sm text-foreground outline-none"
              />
            </label>

            <label className="block text-xs font-semibold text-muted-foreground">
              Client name
              <input
                value={clientName}
                onChange={(event) => onClientNameChange(event.target.value)}
                placeholder="e.g. Bloom Skincare"
                className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring"
              />
            </label>

            <label className="block text-xs font-semibold text-muted-foreground">
              Time
              <input
                value={clientTime}
                onChange={(event) => onClientTimeChange(event.target.value)}
                placeholder="e.g. 9:30 am"
                className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring"
              />
            </label>

            <label className="block text-xs font-semibold text-muted-foreground">
              Status
              <select
                value={clientStatus}
                onChange={(event) =>
                  onClientStatusChange(event.target.value as StatusKey)
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
                Remove Client
              </Button>
            ) : null}
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={onSave}
              disabled={!clientName.trim() || !clientTime.trim()}
              className="rounded-full"
            >
              {isEditing ? "Save Changes" : "Add Client"}
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
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Remove Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
