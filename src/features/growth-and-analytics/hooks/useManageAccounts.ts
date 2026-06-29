import { useCallback, useState } from "react";

import { showToast } from "@/shared/utils/showToast";

import {
  adAccounts as seedAdAccounts,
  emptyAdForm,
  emptyOrganicForm,
  organicAccounts as seedOrganicAccounts,
} from "../constants/accountsData";
import type {
  AdAccount,
  AdAccountForm,
  OrganicAccount,
  OrganicAccountForm,
} from "../types/types";

export function useManageAccounts() {
  const [organic] = useState<OrganicAccount[]>(seedOrganicAccounts);
  const [ads] = useState<AdAccount[]>(seedAdAccounts);

  const [isOrganicOpen, setIsOrganicOpen] = useState(false);
  const [isOrganicEditing, setIsOrganicEditing] = useState(false);
  const [organicForm, setOrganicForm] =
    useState<OrganicAccountForm>(emptyOrganicForm);

  const [isAdOpen, setIsAdOpen] = useState(false);
  const [isAdEditing, setIsAdEditing] = useState(false);
  const [adForm, setAdForm] = useState<AdAccountForm>(emptyAdForm);

  const openOrganicCreate = useCallback(() => {
    setOrganicForm(emptyOrganicForm);
    setIsOrganicEditing(false);
    setIsOrganicOpen(true);
  }, []);

  const openOrganicEdit = useCallback((account: OrganicAccount) => {
    setOrganicForm({
      platform: account.platform,
      accountName: account.accountName,
      accountId: account.accountId,
      accessToken: "",
    });
    setIsOrganicEditing(true);
    setIsOrganicOpen(true);
  }, []);

  const changeOrganicField = useCallback(
    <Field extends keyof OrganicAccountForm>(
      field: Field,
      value: OrganicAccountForm[Field],
    ) => {
      setOrganicForm((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const saveOrganic = useCallback(() => {
    showToast(
      "success",
      isOrganicEditing
        ? "Account updated (UI preview only)."
        : "Account connected (UI preview only).",
    );
    setIsOrganicOpen(false);
  }, [isOrganicEditing]);

  const openAdCreate = useCallback(() => {
    setAdForm(emptyAdForm);
    setIsAdEditing(false);
    setIsAdOpen(true);
  }, []);

  const openAdEdit = useCallback((account: AdAccount) => {
    setAdForm({
      clientName: account.clientName,
      accountName: account.accountName,
      adAccountId: account.adAccountId,
      accessToken: "",
      currency: account.currency,
    });
    setIsAdEditing(true);
    setIsAdOpen(true);
  }, []);

  const changeAdField = useCallback(
    <Field extends keyof AdAccountForm>(
      field: Field,
      value: AdAccountForm[Field],
    ) => {
      setAdForm((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const saveAd = useCallback(() => {
    showToast(
      "success",
      isAdEditing
        ? "Ad account updated (UI preview only)."
        : "Ad account connected (UI preview only).",
    );
    setIsAdOpen(false);
  }, [isAdEditing]);

  return {
    organic,
    ads,
    organicDialog: {
      open: isOrganicOpen,
      onOpenChange: setIsOrganicOpen,
      isEditing: isOrganicEditing,
      values: organicForm,
      onFieldChange: changeOrganicField,
      onSave: saveOrganic,
    },
    adDialog: {
      open: isAdOpen,
      onOpenChange: setIsAdOpen,
      isEditing: isAdEditing,
      values: adForm,
      onFieldChange: changeAdField,
      onSave: saveAd,
    },
    openOrganicCreate,
    openOrganicEdit,
    openAdCreate,
    openAdEdit,
  };
}
