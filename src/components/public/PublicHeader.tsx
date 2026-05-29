import { Link, NavLink } from "react-router";
import { clinicMeta, publicNavLinks } from "@/constants/public";
import { Button } from "@/components/ui/button";

export function PublicHeader() {
  return (
    <header className="border-b border-border/80 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-primary dark:text-foreground"
        >
          {clinicMeta.name}
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {publicNavLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                [
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Button asChild className="rounded-full">
          <Link to="/admin/dashboard">Staff login</Link>
        </Button>
      </div>
    </header>
  );
}
