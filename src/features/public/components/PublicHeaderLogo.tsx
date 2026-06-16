import { Link } from "react-router";

import { agencyMeta } from "@/features/public/constants/agency";

export function PublicHeaderLogo() {
  return (
    <Link
      to="/"
      className="group flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground"
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
        D
      </span>
      <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
        {agencyMeta.name}
      </span>
    </Link>
  );
}
