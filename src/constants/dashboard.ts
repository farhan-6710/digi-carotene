export type StatCard = {
  label: string;
  value: string;
  delta: string;
  deltaLabel: string;
};

export const dashboardStats: StatCard[] = [
  {
    label: "Sessions Completed This Month",
    value: "186",
    delta: "+12.4%",
    deltaLabel: "vs last month",
  },
  {
    label: "Appointments Scheduled",
    value: "52",
    delta: "+6",
    deltaLabel: "since last week",
  },
  {
    label: "Patients Seen This Month",
    value: "134",
    delta: "+9",
    deltaLabel: "new this month",
  },
  {
    label: "No-Shows This Month",
    value: "7",
    delta: "-2",
    deltaLabel: "from last month",
  },
];

export type NeedsAttentionPosts = {
  time: string;
  from: string;
  status: "Missed" | "Due Today" | "Needs Review";
};

export const needsAttentionPosts: NeedsAttentionPosts[] = [
  {
    time: "09:00 AM",
    from: "Sarah Khan - Knee rehab follow-up",
    status: "Missed",
  },
  {
    time: "10:30 AM",
    from: "James O'Neill - Post-op assessment",
    status: "Due Today",
  },
  {
    time: "11:15 AM",
    from: "Maria Lopez - Shoulder mobility",
    status: "Needs Review",
  },
  {
    time: "01:00 PM",
    from: "David Chen - Gait training",
    status: "Due Today",
  },
  {
    time: "03:30 PM",
    from: "Emily Watson - Sports injury review",
    status: "Needs Review",
  },
  {
    time: "04:45 PM",
    from: "Robert Singh - Back pain session",
    status: "Missed",
  },
  {
    time: "05:20 PM",
    from: "Aisha Malik - ACL recovery",
    status: "Due Today",
  },
  {
    time: "06:15 PM",
    from: "Tom Bradley - Initial consultation",
    status: "Needs Review",
  },
];

export type TopPatient = {
  name: string;
  sessions: number;
  upcoming: number;
  noShows: number;
};

export const topPatients: TopPatient[] = [
  { name: "Sarah Khan", sessions: 24, upcoming: 6, noShows: 1 },
  { name: "James O'Neill", sessions: 21, upcoming: 5, noShows: 0 },
  { name: "Maria Lopez", sessions: 18, upcoming: 4, noShows: 2 },
  { name: "David Chen", sessions: 16, upcoming: 3, noShows: 1 },
  { name: "Emily Watson", sessions: 14, upcoming: 2, noShows: 1 },
  { name: "Robert Singh", sessions: 13, upcoming: 3, noShows: 0 },
  { name: "Aisha Malik", sessions: 12, upcoming: 2, noShows: 1 },
  { name: "Tom Bradley", sessions: 11, upcoming: 2, noShows: 0 },
  { name: "Nina Patel", sessions: 10, upcoming: 1, noShows: 1 },
  { name: "Chris Evans", sessions: 9, upcoming: 1, noShows: 0 },
];

export type RecentAppointment = {
  time: string;
  patient: string;
  id: string;
  sessionType: string;
  status: "Upcoming" | "Attended" | "Missed";
};

export const recentAppointments: RecentAppointment[] = [
  {
    time: "09:00 AM",
    patient: "Sarah Khan",
    id: "RV-728",
    sessionType: "Knee rehab",
    status: "Attended",
  },
  {
    time: "09:45 AM",
    patient: "James O'Neill",
    id: "RV-727",
    sessionType: "Post-op review",
    status: "Upcoming",
  },
  {
    time: "10:30 AM",
    patient: "Maria Lopez",
    id: "RV-726",
    sessionType: "Shoulder mobility",
    status: "Attended",
  },
  {
    time: "11:15 AM",
    patient: "David Chen",
    id: "RV-725",
    sessionType: "Gait training",
    status: "Missed",
  },
  {
    time: "12:00 PM",
    patient: "Emily Watson",
    id: "RV-724",
    sessionType: "Sports injury",
    status: "Upcoming",
  },
  {
    time: "01:30 PM",
    patient: "Robert Singh",
    id: "RV-723",
    sessionType: "Back pain session",
    status: "Attended",
  },
  {
    time: "02:15 PM",
    patient: "Aisha Malik",
    id: "RV-722",
    sessionType: "ACL recovery",
    status: "Upcoming",
  },
  {
    time: "03:00 PM",
    patient: "Tom Bradley",
    id: "RV-721",
    sessionType: "Initial consult",
    status: "Attended",
  },
];
