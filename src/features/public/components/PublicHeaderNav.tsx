import { NavLink } from "react-router";

import { publicNavLinks } from "@/features/public/constants/nav";
import type { PublicHeaderNavProps } from "@/features/public/types/components";

export function PublicHeaderNav({ onNavClick }: PublicHeaderNavProps) {
  return (
    <nav className="hidden items-center gap-1 md:flex">
      {publicNavLinks.map((link) => {
        const isHash = link.to.includes("#");

        return (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={(e) => onNavClick(e, link.to)}
            end={link.to === "/"}
            className={({ isActive }) =>
              [
                "relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                !isHash && isActive
                  ? "text-primary bg-primary/5 dark:bg-primary/10"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              ].join(" ")
            }
          >
            {link.label}
          </NavLink>
        );
      })}
    </nav>
  );
}
