import { Link, Outlet } from "react-router";
import { Menu, Search } from "lucide-react";
import Sidebar from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useThemePreference } from "@/providers/admin/ThemePreferenceProvider";
import { useAuth } from "@/providers/AuthProvider";
import {
  getUserAvatarUrl,
  getUserDisplayName,
  getUserInitials,
} from "@/utils/admin/authUserDisplay";
import { cn } from "@/lib/utils";
import { type ReactNode, useState } from "react";

function ShellSection({ children }: { children: ReactNode }) {
  return <div className="px-6 py-6 lg:px-8">{children}</div>;
}

export function AdminLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { isDarkMode, setDarkMode } = useThemePreference();
  const { user } = useAuth();
  const displayName = getUserDisplayName(user);
  const initials = getUserInitials(user);
  const avatarUrl = getUserAvatarUrl(user);

  return (
    <div className="h-dvh overflow-hidden bg-background text-foreground">
      <div className="flex h-full">
        {/* Sidebar is hidden on smaller screens to maximize space for the main content. You can add a mobile navigation pattern if needed. */}
        <Sidebar collapsed={isSidebarCollapsed} />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-sidebar-border/80 bg-sidebar! backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="flex items-center gap-4 px-4 py-4 sm:px-6">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsSidebarCollapsed((prev) => !prev)}
                aria-label={
                  isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
                }
                className="hidden size-10 items-center justify-center rounded-r-2xl border border-ring/60! md:inline-flex"
              >
                <Menu className="size-4" aria-hidden="true" />
              </Button>

              <div className="relative w-full max-w-md">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                  <Search className="size-4" aria-hidden="true" />
                </span>
                <input
                  type="search"
                  placeholder="Search clients or posts..."
                  className="h-10 w-full rounded-full border border-ring/60 bg-muted/40 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-ring"
                />
              </div>

              <div className="ml-auto flex items-center gap-3">
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={setDarkMode}
                  aria-label="Toggle dark mode"
                  className="cursor-pointer"
                />
                <Link
                  to="/admin/profile"
                  className={cn(
                    "flex size-10 items-center justify-center overflow-hidden rounded-full bg-primary/20 text-sm font-semibold text-primary transition hover:bg-primary/30",
                    avatarUrl && "bg-transparent",
                  )}
                  aria-label={`Open profile for ${displayName}`}
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={displayName}
                      className="size-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </Link>
              </div>
            </div>
          </header>

          <main
            data-admin-scroll-container
            className="min-h-0 flex-1 overflow-y-auto scroll-smooth"
          >
            <ShellSection>
              <div className="mx-auto w-full">
                <Outlet />
              </div>
            </ShellSection>
          </main>
        </div>
      </div>
    </div>
  );
}
