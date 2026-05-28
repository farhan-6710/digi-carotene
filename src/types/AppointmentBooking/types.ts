export type AppointmentStatusKey = "Upcoming" | "Attended" | "Missed";

export type Appointment = {
  id: string;
  time: string;
  patientName: string;
  status: AppointmentStatusKey;
};

export type AppointmentSlot = {
  id: string;
  date: number;
  day: string;
  appointments: Appointment[];
};

export type ActiveSlot = {
  day: string;
  date: number;
};

export type Week = {
  label: string;
  range: string;
  dates: number[];
};
