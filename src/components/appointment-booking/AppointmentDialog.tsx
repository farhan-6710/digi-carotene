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
import type { AppointmentStatusKey } from "@/types/AppointmentBooking/types";

type AppointmentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing: boolean;
  appointmentId: string;
  patientName: string;
  appointmentTime: string;
  appointmentStatus: AppointmentStatusKey;
  statusOptions: AppointmentStatusKey[];
  onPatientNameChange: (value: string) => void;
  onAppointmentTimeChange: (value: string) => void;
  onAppointmentStatusChange: (value: AppointmentStatusKey) => void;
  onSave: () => void;
  onDelete?: () => void;
};

export function AppointmentDialog({
  open,
  onOpenChange,
  isEditing,
  appointmentId,
  patientName,
  appointmentTime,
  appointmentStatus,
  statusOptions,
  onPatientNameChange,
  onAppointmentTimeChange,
  onAppointmentStatusChange,
  onSave,
  onDelete,
}: AppointmentDialogProps) {
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
              {isEditing ? "Edit Appointment" : "Add Appointment"}
            </DialogTitle>
            <DialogDescription>
              Set the patient name, appointment time, and status for this day.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <label className="block text-xs font-semibold text-muted-foreground">
              Appointment ID
              <input
                value={appointmentId}
                readOnly
                className="mt-2 w-full rounded-lg border border-input bg-muted/40 px-3 py-2 text-sm text-foreground outline-none"
              />
            </label>

            <label className="block text-xs font-semibold text-muted-foreground">
              Patient name
              <input
                value={patientName}
                onChange={(event) => onPatientNameChange(event.target.value)}
                placeholder="e.g. Sarah Khan"
                className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring"
              />
            </label>

            <label className="block text-xs font-semibold text-muted-foreground">
              Time
              <input
                value={appointmentTime}
                onChange={(event) => onAppointmentTimeChange(event.target.value)}
                placeholder="e.g. 9:30 am"
                className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring"
              />
            </label>

            <label className="block text-xs font-semibold text-muted-foreground">
              Status
              <select
                value={appointmentStatus}
                onChange={(event) =>
                  onAppointmentStatusChange(
                    event.target.value as AppointmentStatusKey,
                  )
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
                Remove Appointment
              </Button>
            ) : null}
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={onSave}
              disabled={!patientName.trim() || !appointmentTime.trim()}
              className="rounded-full"
            >
              {isEditing ? "Save Changes" : "Add Appointment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove appointment?</DialogTitle>
            <DialogDescription>
              This removes the appointment from the current day. This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Remove Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
