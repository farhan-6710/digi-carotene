import type {
  AdAccount,
  OrganicAccount,
  ReportableAccount,
} from "../types/types";

function organicPlatformLabel(platform: OrganicAccount["platform"]): string {
  return platform === "instagram" ? "Instagram" : "Facebook";
}

export function buildReportableAccounts(
  organic: OrganicAccount[],
  ads: AdAccount[],
): ReportableAccount[] {
  return [
    ...organic.map((account) => ({
      id: account.id,
      label: account.accountName,
      caption: organicPlatformLabel(account.platform),
      kind: "organic" as const,
      growthPlatform: account.platform,
    })),
    ...ads.map((account) => ({
      id: account.id,
      label: account.accountName,
      caption: `Ad account · ${account.clientName}`,
      kind: "ad" as const,
    })),
  ];
}
