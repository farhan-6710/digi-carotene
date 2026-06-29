import type {
  CreateGrowthReportInput,
  ReportableAccount,
  ReportType,
} from "../types/types";

export function buildCustomReportInput(
  selectedAccountIds: string[],
  accounts: ReportableAccount[],
  periodStart: string,
  periodEnd: string,
): CreateGrowthReportInput {
  const selected = accounts.filter((account) =>
    selectedAccountIds.includes(account.id),
  );
  const organic = selected.filter((account) => account.kind === "organic");
  const ads = selected.filter((account) => account.kind === "ad");
  const title = `Custom report — ${selected.map((account) => account.label).join(", ")}`;

  if (ads.length > 0 && organic.length === 0) {
    return {
      title,
      type: "campaigns",
      platform: "campaigns",
      periodStart,
      periodEnd,
    };
  }

  const firstOrganic = organic[0];
  const type: ReportType =
    organic.length === 1 && firstOrganic?.growthPlatform
      ? firstOrganic.growthPlatform
      : "content_performance";

  return {
    title,
    type,
    platform: firstOrganic?.growthPlatform ?? "instagram",
    periodStart,
    periodEnd,
  };
}
