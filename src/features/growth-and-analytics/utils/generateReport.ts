import { createGrowthReport } from "@/services/growthAnalyticsService";
import { showToast } from "@/shared/utils/showToast";

import type { CreateGrowthReportInput } from "../types/types";

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

export async function saveGrowthReport(input: CreateGrowthReportInput) {
  try {
    await createGrowthReport(input);
    showToast("success", "Report saved to the report library.");
  } catch (error) {
    showToast("error", errorMessage(error, "Failed to save the report."));
  }
}
