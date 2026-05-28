import { useState } from "react";
import type {
  ActiveSlot,
  AppointmentSlot,
  AppointmentStatusKey,
} from "@/types/AppointmentBooking/types";

const statusOptions: AppointmentStatusKey[] = [
  "Upcoming",
  "Attended",
  "Missed",
];

function buildEmptySlot(day: string, date: number): AppointmentSlot {
  return {
    id: `slot-${date}`,
    date,
    day,
    appointments: [],
  };
}

function createAppointmentId() {
  return `apt-${Date.now()}`;
}

export function useAppointmentBooking(initialSlots: AppointmentSlot[]) {
  const [slots, setSlots] = useState<AppointmentSlot[]>(initialSlots);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState<ActiveSlot | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [appointmentId, setAppointmentId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentStatus, setAppointmentStatus] =
    useState<AppointmentStatusKey>("Upcoming");

  const getSlot = (day: string, date: number) =>
    slots.find((slot) => slot.day === day && slot.date === date);

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setActiveSlot(null);
      setEditingIndex(null);
      setAppointmentId("");
      setPatientName("");
      setAppointmentTime("");
      setAppointmentStatus("Upcoming");
    }
  };

  const openAddDialog = (day: string, date: number) => {
    setActiveSlot({ day, date });
    setEditingIndex(null);
    setAppointmentId(createAppointmentId());
    setPatientName("");
    setAppointmentTime("");
    setAppointmentStatus("Upcoming");
    setIsDialogOpen(true);
  };

  const openEditDialog = (
    day: string,
    date: number,
    appointmentIndex: number,
  ) => {
    const slot = getSlot(day, date);
    const appointment = slot?.appointments[appointmentIndex];

    if (!appointment) {
      return;
    }

    setActiveSlot({ day, date });
    setEditingIndex(appointmentIndex);
    setAppointmentId(appointment.id);
    setPatientName(appointment.patientName);
    setAppointmentTime(appointment.time);
    setAppointmentStatus(appointment.status);
    setIsDialogOpen(true);
  };

  const saveAppointment = () => {
    if (!activeSlot) {
      return;
    }

    const trimmedName = patientName.trim();
    const trimmedTime = appointmentTime.trim();
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
      const updatedAppointments = [...targetSlot.appointments];

      if (editingIndex === null) {
        updatedAppointments.push({
          id: appointmentId || createAppointmentId(),
          patientName: trimmedName,
          time: trimmedTime,
          status: appointmentStatus,
        });
      } else if (updatedAppointments[editingIndex]) {
        updatedAppointments[editingIndex] = {
          id: appointmentId,
          patientName: trimmedName,
          time: trimmedTime,
          status: appointmentStatus,
        };
      }

      next[targetIndex] = { ...targetSlot, appointments: updatedAppointments };
      return next;
    });

    handleDialogOpenChange(false);
  };

  const deleteAppointment = () => {
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
      const updatedAppointments = targetSlot.appointments.filter(
        (_, index) => index !== editingIndex,
      );

      next[existingIndex] = { ...targetSlot, appointments: updatedAppointments };
      return next;
    });

    handleDialogOpenChange(false);
  };

  return {
    slots,
    statusOptions,
    isDialogOpen,
    appointmentId,
    patientName,
    appointmentTime,
    appointmentStatus,
    editingIndex,
    setPatientName,
    setAppointmentTime,
    setAppointmentStatus,
    getSlot,
    openAddDialog,
    openEditDialog,
    saveAppointment,
    deleteAppointment,
    handleDialogOpenChange,
  };
}
