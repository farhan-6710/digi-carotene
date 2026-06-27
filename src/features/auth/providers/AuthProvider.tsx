import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { AUTH_FORM_TYPES, type AuthFormType } from "@/features/auth/constants/auth";
import { getHomePathForProfile } from "@/features/auth/constants/routes";
import { useProfileAccessSync } from "@/features/auth/hooks/useProfileAccessSync";
import {
  AuthContext,
  type AuthContextValue,
} from "@/features/auth/providers/authContext";
import type { Profile } from "@/features/auth/types/profile";
import {
  hasClientPortalAccess,
  hasTeamPortalAccess,
  isPendingAccess,
} from "@/features/auth/types/profile";
import { buildAuthUrl } from "@/features/auth/utils/authUrlParams";
import { loadProfileForUser } from "@/features/auth/utils/profileRoleSync";
import { fetchTeamRoleByMemberId } from "@/features/auth/utils/teamRoleRepository";
import type { TeamMemberRole } from "@/features/team-management/constants/teamMemberRoles";
import { supabase } from "@/shared/lib/supabase";
import type { User } from "@supabase/supabase-js";

const authRedirectUrl = (formType: AuthFormType = AUTH_FORM_TYPES.login) =>
  `${window.location.origin}${buildAuthUrl(formType)}`;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [teamRole, setTeamRole] = useState<TeamMemberRole | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const userRef = useRef<User | null>(null);
  const profileLoadUserIdRef = useRef<string | null>(null);

  userRef.current = user;

  const clearSession = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setTeamRole(null);
    profileLoadUserIdRef.current = null;
  }, []);

  const loadProfile = useCallback(
    async (authUser: User, options?: { force?: boolean }) => {
      if (!options?.force && profileLoadUserIdRef.current === authUser.id) {
        return;
      }

      try {
        const nextProfile = await loadProfileForUser(authUser);
        if (!nextProfile) {
          await clearSession();
          return;
        }

        profileLoadUserIdRef.current = authUser.id;
        setProfile(nextProfile);
      } catch {
        await clearSession();
      }
    },
    [clearSession],
  );

  const refreshProfile = useCallback(async () => {
    const authUser = userRef.current;
    if (!authUser) {
      return;
    }

    await loadProfile(authUser, { force: true });
  }, [loadProfile]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthReady(true);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const userId = user?.id ?? null;

    if (!userId) {
      profileLoadUserIdRef.current = null;
      setProfile(null);
      setTeamRole(null);
      return;
    }

    const authUser = userRef.current;
    if (!authUser) {
      return;
    }

    void loadProfile(authUser);
  }, [user?.id, loadProfile]);

  useEffect(() => {
    const teamMemberId = profile?.team_member_id;
    if (!teamMemberId) {
      setTeamRole(null);
      return;
    }

    let isMounted = true;

    void fetchTeamRoleByMemberId(teamMemberId)
      .then((role) => {
        if (isMounted) {
          setTeamRole(role);
        }
      })
      .catch(() => {
        if (isMounted) {
          setTeamRole(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [profile?.team_member_id]);

  const loading = !authReady || (user !== null && profile === null);

  useProfileAccessSync({
    userId: user?.id,
    loading,
    profile,
    refreshProfile,
  });

  const role = profile?.role ?? null;
  const clientId = profile?.client_id ?? null;
  const teamMemberId = profile?.team_member_id ?? null;
  const isTeam = hasTeamPortalAccess(profile);
  const isClient = hasClientPortalAccess(profile);
  const isPending = isPendingAccess(profile);
  const homePath = getHomePathForProfile(profile);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      role,
      teamRole,
      clientId,
      teamMemberId,
      isTeam,
      isClient,
      isPending,
      homePath,
      loading,
      refreshProfile,
      signInWithEmail: async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        return error;
      },
      signUpWithOtp: async (email, fullName) => {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            shouldCreateUser: true,
            data: { full_name: fullName },
            emailRedirectTo: authRedirectUrl(AUTH_FORM_TYPES.login),
          },
        });
        return error;
      },
      signInWithGoogle: async (options) => {
        const formType = options?.isSignup
          ? AUTH_FORM_TYPES.signup
          : AUTH_FORM_TYPES.login;

        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: authRedirectUrl(formType) },
        });
        return error;
      },
      signOut: async () => {
        await clearSession();
      },
    }),
    [
      user,
      profile,
      role,
      teamRole,
      clientId,
      teamMemberId,
      isTeam,
      isClient,
      isPending,
      homePath,
      loading,
      refreshProfile,
      clearSession,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
