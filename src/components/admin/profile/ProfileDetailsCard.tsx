import type { User } from "@supabase/supabase-js";

import type { StaffProfile } from "@/types/admin/profile/types";
import {
  getUserAuthProvider,
  getUserEmail,
  getUserJoinedDate,
} from "@/utils/admin/authUserDisplay";

type ProfileDetailsCardProps = {
  user: User | null;
  profile: StaffProfile;
};

export function ProfileDetailsCard({ user, profile }: ProfileDetailsCardProps) {
  const details = [
    { label: "Department", value: profile.department },
    { label: "Email", value: getUserEmail(user) },
    { label: "Phone", value: profile.phone },
    { label: "Certification", value: profile.licenseNumber },
    { label: "Joined", value: getUserJoinedDate(user) },
    { label: "Sign-in method", value: getUserAuthProvider(user) },
    { label: "Location", value: profile.location },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-6 py-5">
        <div className="text-sm font-semibold">Professional details</div>
      </div>

      <div className="divide-y divide-border">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="flex flex-wrap items-center justify-between gap-2 px-6 py-3"
          >
            <span className="text-xs font-semibold tracking-wider text-muted-foreground">
              {detail.label.toUpperCase()}
            </span>
            <span className="text-sm text-foreground">{detail.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
