import { Navigate, Outlet, useLocation } from "react-router";

import { useAuth } from "@/features/auth/providers/AuthProvider";
import { CLIENT_HOME } from "@/features/auth/constants/routes";
import { isClientRole } from "@/features/auth/types/profile";
import { CenteredLoading } from "@/shared/components/LoadingSpinner";

export function StaffRoute() {
  const { loading, user, isStaff, role, profile, homePath } = useAuth();
  const location = useLocation();

  if (loading) {
    return <CenteredLoading />;
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!profile) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (role && isClientRole(role)) {
    return <Navigate to={CLIENT_HOME} replace />;
  }

  if (!isStaff) {
    return <Navigate to={homePath} replace />;
  }

  return <Outlet />;
}
