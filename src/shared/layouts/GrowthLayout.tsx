import { growthShellConfig } from "@/features/growth-and-analytics/constants/shellConfig";
import { AppShellLayout } from "@/shared/layouts/AppShellLayout";

export function GrowthLayout() {
  return (
    <AppShellLayout
      sidebarConfig={growthShellConfig}
      mobileNavDescription="Growth and analytics navigation links"
    />
  );
}
