export type ProfileStat = {
  label: string;
  value: string;
};

export type ProfileCredential = {
  title: string;
  issuer: string;
  year: string;
};

export type StaffProfile = {
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  licenseNumber: string;
  joinedDate: string;
  location: string;
  bio: string;
  specializations: string[];
  stats: ProfileStat[];
  credentials: ProfileCredential[];
};
