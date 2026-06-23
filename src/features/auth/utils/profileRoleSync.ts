import type { User } from "@supabase/supabase-js";

import type { Profile } from "@/features/auth/types/profile";
import { validateProfileLinks } from "@/features/auth/utils/profileAccessValidation";
import { fetchProfileByUserId } from "@/features/auth/utils/profileRepository";

export async function loadProfileForUser(user: User): Promise<Profile | null> {
  const profile = await fetchProfileByUserId(user.id);
  if (!profile) {
    return null;
  }

  return validateProfileLinks(profile);
}
