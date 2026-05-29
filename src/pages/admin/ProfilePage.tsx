import { ProfileCredentialsList } from "@/components/profile/ProfileCredentialsList";
import { ProfileDetailsCard } from "@/components/profile/ProfileDetailsCard";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileStatsGrid } from "@/components/profile/ProfileStatsGrid";
import { staffProfile } from "@/constants/Profile/profile";

export function ProfilePage() {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your Reviva staff profile, credentials, and current clinic
          performance snapshot.
        </p>
      </div>

      <ProfileHeader profile={staffProfile} />

      <ProfileStatsGrid stats={staffProfile.stats} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ProfileDetailsCard profile={staffProfile} />
        <ProfileCredentialsList
          credentials={staffProfile.credentials}
          specializations={staffProfile.specializations}
        />
      </div>
    </section>
  );
}
