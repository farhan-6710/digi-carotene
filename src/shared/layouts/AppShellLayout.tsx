import { useRef, useState } from "react";
import { Link } from "react-router";
import { Menu, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

import { useTheme } from "@/shared/providers/ThemeProvider";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  ShellMobileNavSheet,
  ShellSidebar,
} from "@/shared/components/ShellSidebar";
import { ShellNavSearch } from "@/shared/components/ShellNavSearch";
import {
  PageTransitionMain,
  PageTransitionProvider,
} from "@/shared/providers/PageTransitionProvider";
import { SHELL_HEADER_MOTION } from "@/shared/constants/pageMotion";
import type { AppShellLayoutProps } from "@/shared/types/components";
import { Button } from "@/shared/ui/button";
import { Switch } from "@/shared/ui/switch";
import {
  getUserAvatarUrl,
  getUserDisplayName,
  getUserInitials,
} from "@/shared/utils/authUserDisplay";
import { cn } from "@/shared/lib/utils";

export function AppShellLayout({
  sidebarConfig,
  accountPath,
  headerCenter,
  headerActions,
  mobileNavDescription,
}: AppShellLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { isDarkMode, setDarkMode } = useTheme();
  const { user } = useAuth();
  const displayName = getUserDisplayName(user);
  const initials = getUserInitials(user);
  const avatarUrl = getUserAvatarUrl(user);
  const mainRef = useRef<HTMLElement>(null);

  return (
    <PageTransitionProvider>
      <div className="fixed inset-0 grid grid-cols-[auto_minmax(0,1fr)] overflow-hidden bg-background text-foreground">
        <ShellSidebar config={sidebarConfig} collapsed={isSidebarCollapsed} />

        <div className="grid min-h-0 min-w-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden">
          <motion.header
            {...SHELL_HEADER_MOTION}
            className="flex shrink-0 items-center gap-4 border-b border-border/60 bg-card px-4 py-4 sm:px-6"
          >
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open navigation menu"
              className="inline-flex size-9 items-center justify-center rounded-xl border border-border md:hidden"
            >
              <Menu className="size-4" aria-hidden="true" />
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsSidebarCollapsed((prev) => !prev)}
              aria-label={
                isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
              }
              className="hidden size-9 items-center justify-center rounded-xl md:inline-flex"
            >
              <Menu className="size-4" aria-hidden="true" />
            </Button>

            <div className="flex min-w-0 flex-1 items-center gap-4">
              <ShellNavSearch
                nav={sidebarConfig.nav}
                placeholder={
                  sidebarConfig.searchPlaceholder ?? "Search navigation..."
                }
              />
              {headerCenter}
            </div>

            <div className="ml-auto flex items-center gap-3">
              {headerActions}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Sun className="size-4" aria-hidden="true" />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={setDarkMode}
                  aria-label="Toggle dark mode"
                  className="cursor-pointer"
                />
                <Moon className="size-4" aria-hidden="true" />
              </div>
              {accountPath ? (
                <Link
                  to={accountPath}
                  className={cn(
                    "flex size-9 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-sm font-semibold text-primary transition hover:bg-primary/20",
                    avatarUrl && "bg-transparent",
                  )}
                  aria-label={`Open account for ${displayName}`}
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
              ) : null}
            </div>
          </motion.header>

          <PageTransitionMain
            mainRef={mainRef}
            className="min-h-0 overflow-y-auto px-6 py-6 lg:px-8"
          />
        </div>
      </div>

      <ShellMobileNavSheet
        config={sidebarConfig}
        open={isMobileNavOpen}
        onOpenChange={setIsMobileNavOpen}
        sheetDescription={mobileNavDescription}
      />
    </PageTransitionProvider>
  );
}
