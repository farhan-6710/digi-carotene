import { staffShellConfig } from "@/features/staff-portal-shell/constants/shellConfig";
import { AppShellLayout } from "@/shared/layouts/AppShellLayout";

export function StaffLayout() {
  return (
    <AppShellLayout
      sidebarConfig={staffShellConfig}
      accountPath="/staff-portal/account"
      mobileNavDescription="Staff portal navigation links and quick actions"
      scrollContainerId="staff-portal"
    />
  );
}
