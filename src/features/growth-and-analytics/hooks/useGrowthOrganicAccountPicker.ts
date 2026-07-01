import { useCallback, useMemo, useState } from "react";

import { fetchOrganicAccounts } from "@/services/growthAccountsService";
import { fetchInstagramProfiles } from "@/services/instagramProfilesService";
import { useFetch } from "@/shared/hooks/useFetch";

import type { InstagramProfile, OrganicAccount } from "../types/types";
import { buildOrganicAccountOptions } from "../utils/reportableAccounts";
import { useGrowthAccountsUpdated } from "./useGrowthAccountsUpdated";

const NO_ACCOUNTS: OrganicAccount[] = [];
const NO_PROFILES: InstagramProfile[] = [];

export function useGrowthOrganicAccountPicker() {
  const loadAccounts = useCallback(() => fetchOrganicAccounts(), []);
  const {
    data: accounts,
    isLoading: isAccountsLoading,
    error: accountsError,
    reload: reloadAccounts,
  } = useFetch(loadAccounts, NO_ACCOUNTS);

  const loadProfiles = useCallback(() => fetchInstagramProfiles(), []);
  const {
    data: profiles,
    isLoading: isProfilesLoading,
    error: profilesError,
    reload: reloadProfiles,
  } = useFetch(loadProfiles, NO_PROFILES);

  const [selectedId, setSelectedId] = useState("");

  const activeAccount =
    accounts.find((account) => account.id === selectedId) ?? accounts[0];

  const activeInstagramProfile = useMemo(
    () =>
      activeAccount
        ? profiles.find(
            (profile) => profile.organicAccountId === activeAccount.id,
          )
        : undefined,
    [activeAccount, profiles],
  );

  const accountOptions = useMemo(
    () => buildOrganicAccountOptions(accounts),
    [accounts],
  );

  useGrowthAccountsUpdated(async () => {
    await reloadAccounts();
    await reloadProfiles();
  });

  return {
    accountOptions,
    accountId: activeAccount?.id ?? "",
    setAccountId: setSelectedId,
    activeAccount,
    activeInstagramProfile,
    isAccountsLoading: isAccountsLoading || isProfilesLoading,
    accountsError: accountsError || profilesError,
    hasAccounts: accounts.length > 0,
    reloadProfiles,
  };
}
