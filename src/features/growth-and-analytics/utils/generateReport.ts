import { showToast } from "@/shared/utils/showToast";

export function generateGrowthReport(periodLabel: string) {
  showToast("success", `Report queued for ${periodLabel} (UI preview only).`);
}
