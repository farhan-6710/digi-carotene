import { appMeta } from "@/constants/navigation";
import type { StaffProfile } from "@/types/Profile/types";

type ProfileHeaderProps = {
  profile: StaffProfile;
};

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-wrap items-start gap-5">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/15 text-2xl font-semibold text-primary">
          {appMeta.userInitials}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              {profile.name}
            </h2>
            <p className="text-sm text-muted-foreground">{profile.role}</p>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {profile.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
