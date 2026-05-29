import type { User } from "@supabase/supabase-js";
import { Loader2, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import type { StaffProfile } from "@/types/admin/profile/types";
import {
  getUserAvatarUrl,
  getUserDisplayName,
  getUserEmail,
  getUserInitials,
} from "@/utils/admin/authUserDisplay";

type ProfileHeaderProps = {
  user: User | null;
  profile: StaffProfile;
};

export function ProfileHeader({ user, profile }: ProfileHeaderProps) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);

  const displayName = getUserDisplayName(user);
  const initials = getUserInitials(user);
  const email = getUserEmail(user);
  const avatarUrl = getUserAvatarUrl(user);

  async function handleSignOut() {
    setSigningOut(true);
    await signOut();
    navigate("/auth", { replace: true });
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-wrap items-start gap-5">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="size-16 rounded-2xl border border-border object-cover"
          />
        ) : (
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/15 text-2xl font-semibold text-primary">
            {initials}
          </div>
        )}

        <div className="min-w-0 flex-1 space-y-2">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              {displayName}
            </h2>
            <p className="text-sm text-muted-foreground">{profile.role}</p>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {profile.bio}
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          disabled={signingOut}
          className="shrink-0"
        >
          {signingOut ? (
            <Loader2 className="animate-spin" aria-hidden="true" />
          ) : (
            <LogOut aria-hidden="true" />
          )}
          Sign out
        </Button>
      </div>
    </div>
  );
}
