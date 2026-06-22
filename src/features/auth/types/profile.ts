export type UserRole = "staff" | "client" | "user";

export type Profile = {
  id: string;
  role: UserRole;
  client_id: string | null;
};

export function isStaffRole(role: UserRole): boolean {
  return role === "staff" || role === "user";
}

export function isClientRole(role: UserRole): boolean {
  return role === "client";
}
