import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

import {
  footerCompanyLinks,
  footerPortalLinks,
} from "@/features/public/constants/footer";

export function PublicFooterLinks() {
  return (
    <>
      <div>
        <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Company
        </h3>
        <ul className="mt-4 space-y-2 text-sm">
          {footerCompanyLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Access
        </h3>
        <ul className="mt-4 space-y-2 text-sm">
          {footerPortalLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                className="group inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
