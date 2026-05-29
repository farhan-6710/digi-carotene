import type { StaffProfile } from "@/types/Profile/types";

export const staffProfile: StaffProfile = {
  name: "Dr. Rachel Verma",
  role: "Lead Physiotherapist",
  department: "Rehabilitation & Sports Medicine",
  email: "r.verma@reviva-clinic.com",
  phone: "+1 (555) 014-8820",
  licenseNumber: "PT-48291-NY",
  joinedDate: "March 2022",
  location: "Reviva Downtown Clinic",
  bio: "Specializes in post-operative rehabilitation, ACL recovery programs, and return-to-sport planning for active patients.",
  specializations: [
    "Orthopedic rehab",
    "Sports injury recovery",
    "Manual therapy",
    "Gait retraining",
  ],
  stats: [
    { label: "Patients this month", value: "42" },
    { label: "Sessions led", value: "186" },
    { label: "Avg. attendance", value: "94%" },
    { label: "Patient rating", value: "4.9" },
  ],
  credentials: [
    {
      title: "Doctor of Physical Therapy (DPT)",
      issuer: "Columbia University",
      year: "2019",
    },
    {
      title: "Certified Orthopedic Manual Therapist (COMT)",
      issuer: "IAOM-US",
      year: "2021",
    },
    {
      title: "Sports Rehab Specialist",
      issuer: "APTA Academy of Sports PT",
      year: "2023",
    },
  ],
};
