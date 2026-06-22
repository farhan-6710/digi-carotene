import type { UserRole } from "@/features/auth/types/profile";
import { isStaffRole, isClientRole } from "@/features/auth/types/profile";

export const STAFF_HOME = "/staff-portal/dashboard";
export const CLIENT_HOME = "/client-portal/dashboard";

export function getHomePathForRole(role: UserRole): string {
  if (isClientRole(role)) {
    return CLIENT_HOME;
  }

  if (isStaffRole(role)) {
    return STAFF_HOME;
  }

  return STAFF_HOME;
}

export function isStaffPath(pathname: string): boolean {
  return pathname.startsWith("/staff-portal");
}

export function isClientPath(pathname: string): boolean {
  return pathname.startsWith("/client-portal");
}
