import type {
  AdAccount,
  AdAccountForm,
  GrowthPlatform,
  OrganicAccount,
  OrganicAccountForm,
} from "../types/types";

export const platformOptions: { value: GrowthPlatform; label: string }[] = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
];

export const currencyOptions = [
  { value: "INR", label: "INR — Indian Rupee" },
  { value: "USD", label: "USD — US Dollar" },
  { value: "EUR", label: "EUR — Euro" },
  { value: "GBP", label: "GBP — British Pound" },
];

export const organicAccounts: OrganicAccount[] = [
  {
    id: "oa1",
    platform: "instagram",
    accountName: "Armario Pro",
    accountId: "17841400000000001",
    followers: 58200,
    isActive: true,
  },
  {
    id: "oa2",
    platform: "instagram",
    accountName: "Bloom Theory Cafe",
    accountId: "17841400000000002",
    followers: 41800,
    isActive: true,
  },
  {
    id: "oa3",
    platform: "facebook",
    accountName: "OTC Kompally",
    accountId: "1029384756",
    followers: 36400,
    isActive: false,
  },
];

export const adAccounts: AdAccount[] = [
  {
    id: "ad1",
    clientName: "Armario Pro",
    accountName: "Armario Pro — Ads",
    adAccountId: "act_1234567890",
    currency: "INR",
  },
  {
    id: "ad2",
    clientName: "OTC Kompally",
    accountName: "OTC Kompally — Ads",
    adAccountId: "act_2345678901",
    currency: "INR",
  },
];

export const emptyOrganicForm: OrganicAccountForm = {
  platform: "instagram",
  accountName: "",
  accountId: "",
  accessToken: "",
};

export const emptyAdForm: AdAccountForm = {
  clientName: "",
  accountName: "",
  adAccountId: "",
  accessToken: "",
  currency: "INR",
};
