import type { SettingsSection } from "@/types/Settings/types";

export const settingsSections: SettingsSection[] = [
  {
    id: "notifications",
    title: "Notifications",
    description:
      "Choose how Reviva keeps your clinic team informed about appointments and patient activity.",
    toggles: [
      {
        id: "appointment-reminders",
        label: "Appointment reminders",
        description:
          "Notify staff when a new patient appointment is booked or rescheduled.",
        defaultEnabled: true,
      },
      {
        id: "no-show-alerts",
        label: "No-show alerts",
        description:
          "Send an alert when a patient misses a scheduled rehab session.",
        defaultEnabled: true,
      },
      {
        id: "daily-schedule-digest",
        label: "Daily schedule digest",
        description:
          "Receive a morning summary of today’s sessions and follow-ups.",
        defaultEnabled: false,
      },
      {
        id: "patient-outcome-reports",
        label: "Patient outcome reports",
        description:
          "Email when monthly outcome reports finish generating.",
        defaultEnabled: true,
      },
    ],
  },
  {
    id: "appearance",
    title: "Appearance",
    description:
      "Adjust how the Reviva staff portal looks and feels during daily clinic work.",
    toggles: [
      {
        id: "dark-theme",
        label: "Dark theme",
        description:
          "Use a darker palette for low-light environments and reduced glare.",
        defaultEnabled: false,
      },
      {
        id: "compact-sidebar",
        label: "Compact sidebar by default",
        description:
          "Start each session with the navigation sidebar collapsed.",
        defaultEnabled: false,
      },
    ],
  },
  {
    id: "clinic-preferences",
    title: "Clinic preferences",
    description:
      "Workflow defaults that apply across appointments, notes, and analytics.",
    toggles: [
      {
        id: "auto-save-notes",
        label: "Auto-save session notes",
        description:
          "Automatically save in-progress notes while documenting a session.",
        defaultEnabled: true,
      },
      {
        id: "anonymized-analytics",
        label: "Share anonymized analytics",
        description:
          "Include de-identified session data in Reviva benchmark insights.",
        defaultEnabled: false,
      },
    ],
  },
];
