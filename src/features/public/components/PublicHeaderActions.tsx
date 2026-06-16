import { ArrowRight, LayoutDashboard } from "lucide-react";
import { Link } from "react-router";

import { PublicThemeToggle } from "@/features/public/components/PublicThemeToggle";
import { AUTH_DASHBOARD_LINK } from "@/features/public/constants/nav";
import { Button } from "@/shared/ui/button";

export function PublicHeaderActions() {
  return (
    <div className="hidden items-center gap-3 md:flex">
      <PublicThemeToggle />
      <Button
        asChild
        className="rounded-full shadow-md transition-all duration-300 hover:shadow-primary/20"
      >
        <Link to={AUTH_DASHBOARD_LINK.to} className="flex items-center gap-1.5">
          <LayoutDashboard className="size-4" />
          {AUTH_DASHBOARD_LINK.label}
          <ArrowRight className="size-3.5" />
        </Link>
      </Button>
    </div>
  );
}
