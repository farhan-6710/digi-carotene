import { type ReactNode, useState } from "react";
import { Outlet } from "react-router";
import { Menu, Search } from "lucide-react";
import { appMeta } from "../constants/navigation";
import Sidebar from "../components/Sidebar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

function ShellSection({ children }: { children: ReactNode }) {
  return <div className="px-6 py-6 lg:px-8">{children}</div>;
}

export function RootLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.body.classList.contains("dark"),
  );

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
                className="hidden size-10 items-center justify-center rounded-r-2xl border border-input md:inline-flex"
              >
                <Menu className="size-4" aria-hidden="true" />
              </Button>

              <div className="relative w-full max-w-md">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                  <Search className="size-4" aria-hidden="true" />
                </span>
                <input
                  type="search"
                  placeholder="Search patients or appointments..."
                  className="h-10 w-full rounded-full border border-ring bg-muted/40 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-ring"
                />
              </div>

              <div className="ml-auto flex items-center gap-3">
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={(checked) => {
                    setIsDarkMode(checked);
                    document.body.classList.toggle("dark", checked);
                  }}
                  aria-label="Toggle dark mode"
                  className="cursor-pointer"
                />
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                  {appMeta.userInitials}
                </div>
              </div>
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-y-auto">
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
