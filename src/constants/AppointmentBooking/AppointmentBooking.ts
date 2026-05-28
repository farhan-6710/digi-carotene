import type {
  AppointmentSlot,
  AppointmentStatusKey,
  Week,
} from "@/types/AppointmentBooking/types";

export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const weeks: Week[] = [
  { label: "Week 1", range: "May 1 to May 7", dates: [1, 2, 3, 4, 5, 6, 7] },
  {
    label: "Week 2",
    range: "May 8 to May 14",
    dates: [8, 9, 10, 11, 12, 13, 14],
  },
  {
    label: "Week 3",
    range: "May 15 to May 21",
    dates: [15, 16, 17, 18, 19, 20, 21],
  },
  {
    label: "Week 4",
    range: "May 22 to May 28",
    dates: [22, 23, 24, 25, 26, 27, 28],
  },
  {
    label: "Week 5",
    range: "May 29 to May 31",
    dates: [29, 30, 31, 0, 0, 0, 0],
  },
];

export const dummyAppointmentsData: AppointmentSlot[] = [
  {
    id: "slot-1",
    date: 1,
    day: "Mon",
    appointments: [
      {
        id: "apt-101",
        time: "9:00 am",
        patientName: "Sarah Khan",
        status: "Attended",
      },
      {
        id: "apt-102",
        time: "10:30 am",
        patientName: "James O'Neill",
        status: "Attended",
      },
      {
        id: "apt-103",
        time: "12:00 pm",
        patientName: "Maria Lopez",
        status: "Missed",
      },
      {
        id: "apt-104",
        time: "3:30 pm",
        patientName: "David Chen",
        status: "Upcoming",
      },
    ],
  },
  {
    id: "slot-2",
    date: 2,
    day: "Tue",
    appointments: [
      {
        id: "apt-201",
        time: "8:30 am",
        patientName: "Emily Watson",
        status: "Attended",
      },
      {
        id: "apt-202",
        time: "11:00 am",
        patientName: "Robert Singh",
        status: "Attended",
      },
      {
        id: "apt-203",
        time: "1:15 pm",
        patientName: "Aisha Malik",
        status: "Upcoming",
      },
      {
        id: "apt-204",
        time: "4:45 pm",
        patientName: "Tom Bradley",
        status: "Upcoming",
      },
    ],
  },
  {
    id: "slot-3",
    date: 3,
    day: "Wed",
    appointments: [
      {
        id: "apt-301",
        time: "9:15 am",
        patientName: "Nina Patel",
        status: "Attended",
      },
      {
        id: "apt-302",
        time: "10:45 am",
        patientName: "Chris Evans",
        status: "Missed",
      },
      {
        id: "apt-303",
        time: "2:00 pm",
        patientName: "Hannah Lee",
        status: "Upcoming",
      },
      {
        id: "apt-304",
        time: "5:00 pm",
        patientName: "Omar Hassan",
        status: "Upcoming",
      },
    ],
  },
  { id: "slot-4", date: 4, day: "Thu", appointments: [] },
  {
    id: "slot-5",
    date: 5,
    day: "Fri",
    appointments: [
      {
        id: "apt-501",
        time: "9:30 am",
        patientName: "Priya Sharma",
        status: "Attended",
      },
      {
        id: "apt-502",
        time: "11:30 am",
        patientName: "Luke Turner",
        status: "Upcoming",
      },
    ],
  },
  { id: "slot-6", date: 6, day: "Sat", appointments: [] },
  {
    id: "slot-7",
    date: 7,
    day: "Sun",
    appointments: [
      {
        id: "apt-701",
        time: "10:00 am",
        patientName: "Grace Miller",
        status: "Attended",
      },
      {
        id: "apt-702",
        time: "1:00 pm",
        patientName: "Ben Carter",
        status: "Missed",
      },
      {
        id: "apt-703",
        time: "3:00 pm",
        patientName: "Zara Ahmed",
        status: "Upcoming",
      },
    ],
  },
  { id: "slot-8", date: 8, day: "Mon", appointments: [] },
  {
    id: "slot-9",
    date: 9,
    day: "Tue",
    appointments: [
      {
        id: "apt-901",
        time: "8:00 am",
        patientName: "Daniel Brooks",
        status: "Attended",
      },
    ],
  },
  {
    id: "slot-10",
    date: 10,
    day: "Wed",
    appointments: [
      {
        id: "apt-1001",
        time: "9:45 am",
        patientName: "Fatima Noor",
        status: "Upcoming",
      },
      {
        id: "apt-1002",
        time: "2:30 pm",
        patientName: "Ethan Cole",
        status: "Upcoming",
      },
    ],
  },
  { id: "slot-11", date: 11, day: "Thu", appointments: [] },
  {
    id: "slot-12",
    date: 12,
    day: "Fri",
    appointments: [
      {
        id: "apt-1201",
        time: "11:15 am",
        patientName: "Isabella Ross",
        status: "Attended",
      },
    ],
  },
  { id: "slot-13", date: 13, day: "Sat", appointments: [] },
  {
    id: "slot-14",
    date: 14,
    day: "Sun",
    appointments: [
      {
        id: "apt-1401",
        time: "10:30 am",
        patientName: "Michael Tran",
        status: "Missed",
      },
      {
        id: "apt-1402",
        time: "4:00 pm",
        patientName: "Sophie Allen",
        status: "Upcoming",
      },
    ],
  },
  {
    id: "slot-15",
    date: 15,
    day: "Mon",
    appointments: [
      {
        id: "apt-1501",
        time: "9:00 am",
        patientName: "Ryan Cooper",
        status: "Attended",
      },
      {
        id: "apt-1502",
        time: "12:30 pm",
        patientName: "Layla Ibrahim",
        status: "Upcoming",
      },
      {
        id: "apt-1503",
        time: "3:15 pm",
        patientName: "Victor Ng",
        status: "Upcoming",
      },
    ],
  },
  { id: "slot-16", date: 16, day: "Tue", appointments: [] },
  {
    id: "slot-17",
    date: 17,
    day: "Wed",
    appointments: [
      {
        id: "apt-1701",
        time: "8:45 am",
        patientName: "Chloe Davis",
        status: "Attended",
      },
    ],
  },
  { id: "slot-18", date: 18, day: "Thu", appointments: [] },
  {
    id: "slot-19",
    date: 19,
    day: "Fri",
    appointments: [
      {
        id: "apt-1901",
        time: "10:00 am",
        patientName: "Adam Wright",
        status: "Upcoming",
      },
      {
        id: "apt-1902",
        time: "1:45 pm",
        patientName: "Maya Johnson",
        status: "Upcoming",
      },
    ],
  },
  { id: "slot-20", date: 20, day: "Sat", appointments: [] },
  {
    id: "slot-21",
    date: 21,
    day: "Sun",
    appointments: [
      {
        id: "apt-2101",
        time: "11:00 am",
        patientName: "Kevin Park",
        status: "Attended",
      },
    ],
  },
  { id: "slot-22", date: 22, day: "Mon", appointments: [] },
  {
    id: "slot-23",
    date: 23,
    day: "Tue",
    appointments: [
      {
        id: "apt-2301",
        time: "9:30 am",
        patientName: "Olivia Reed",
        status: "Missed",
      },
      {
        id: "apt-2302",
        time: "2:00 pm",
        patientName: "Samuel Price",
        status: "Upcoming",
      },
    ],
  },
  { id: "slot-24", date: 24, day: "Wed", appointments: [] },
  {
    id: "slot-25",
    date: 25,
    day: "Thu",
    appointments: [
      {
        id: "apt-2501",
        time: "8:15 am",
        patientName: "Amelia Scott",
        status: "Attended",
      },
      {
        id: "apt-2502",
        time: "11:45 am",
        patientName: "Noah Phillips",
        status: "Attended",
      },
      {
        id: "apt-2503",
        time: "4:30 pm",
        patientName: "Rachel Green",
        status: "Upcoming",
      },
    ],
  },
  { id: "slot-26", date: 26, day: "Fri", appointments: [] },
  {
    id: "slot-27",
    date: 27,
    day: "Sat",
    appointments: [
      {
        id: "apt-2701",
        time: "10:15 am",
        patientName: "Henry Clark",
        status: "Upcoming",
      },
    ],
  },
  { id: "slot-28", date: 28, day: "Sun", appointments: [] },
  {
    id: "slot-29",
    date: 29,
    day: "Mon",
    appointments: [
      {
        id: "apt-2901",
        time: "9:00 am",
        patientName: "Ella Morgan",
        status: "Upcoming",
      },
      {
        id: "apt-2902",
        time: "12:00 pm",
        patientName: "Jack Foster",
        status: "Upcoming",
      },
    ],
  },
  {
    id: "slot-30",
    date: 30,
    day: "Tue",
    appointments: [
      {
        id: "apt-3001",
        time: "10:30 am",
        patientName: "Lucy Bennett",
        status: "Upcoming",
      },
    ],
  },
  { id: "slot-31", date: 31, day: "Wed", appointments: [] },
];

export const initialSlots: AppointmentSlot[] = dummyAppointmentsData;

export const statusColors: Record<AppointmentStatusKey, string> = {
  Upcoming: "bg-status-upcoming",
  Attended: "bg-status-done",
  Missed: "bg-status-missed",
};

export const statusText: Record<AppointmentStatusKey, string> = {
  Upcoming: "text-status-upcoming",
  Attended: "text-status-done",
  Missed: "text-status-missed",
};
