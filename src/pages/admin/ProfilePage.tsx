import { ProfileCredentialsList } from "@/components/admin/profile/ProfileCredentialsList";
import { ProfileDetailsCard } from "@/components/admin/profile/ProfileDetailsCard";
import { ProfileHeader } from "@/components/admin/profile/ProfileHeader";
import { ProfileStatsGrid } from "@/components/admin/profile/ProfileStatsGrid";
import { staffProfile } from "@/constants/admin/profile/profile";

export function ProfilePage() {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Profile</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your Digi Carotene team profile, credentials, and current agency
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
