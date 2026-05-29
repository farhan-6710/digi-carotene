import { Link } from "react-router";
import { clinicMeta } from "@/constants/public";

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <div className="text-lg font-semibold tracking-tight">
            {clinicMeta.name}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {clinicMeta.tagline}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <Link to="/" className="transition hover:text-foreground">
            Home
          </Link>
          <Link to="/about" className="transition hover:text-foreground">
            About
          </Link>
          <Link
            to="/admin/dashboard"
            className="transition hover:text-foreground"
          >
            Staff portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
