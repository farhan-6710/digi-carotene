import { LayoutDashboard } from "lucide-react";
import { Link, NavLink } from "react-router";

import { PublicThemeToggle } from "@/features/public/components/PublicThemeToggle";
import { AUTH_DASHBOARD_LINK, publicNavLinks } from "@/features/public/constants/nav";
import type { PublicHeaderMobileMenuProps } from "@/features/public/types/components";
import { Button } from "@/shared/ui/button";

export function PublicHeaderMobileMenu({
  isOpen,
  onNavClick,
}: PublicHeaderMobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="animate-in fade-in slide-in-from-top-5 border-b border-border/40 bg-background/95 backdrop-blur-lg duration-200 md:hidden">
      <div className="space-y-3 px-6 py-6">
        <div className="flex flex-col gap-1">
          {publicNavLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={(e) => onNavClick(e, link.to)}
              end={link.to === "/"}
              className={({ isActive }) =>
                [
                  "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                  isActive && !link.to.includes("#")
                    ? "bg-primary/5 text-primary dark:bg-primary/10"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <hr className="border-border/40" />

        <div className="flex items-center justify-between rounded-xl px-4 py-3">
          <span className="text-sm font-medium text-muted-foreground">Theme</span>
          <PublicThemeToggle />
        </div>

        <Button asChild className="w-full justify-center rounded-full">
          <Link to={AUTH_DASHBOARD_LINK.to} className="flex items-center gap-1.5">
            <LayoutDashboard className="size-4" />
            {AUTH_DASHBOARD_LINK.label}
          </Link>
        </Button>
      </div>
    </div>
  );
}
