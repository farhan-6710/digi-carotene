import type { ReactNode } from "react";

import { Link, NavLink } from "react-router";
import {
  BarChart3,
  CalendarClock,
  FileText,
  LayoutDashboard,
  Settings,
  UserRound,
} from "lucide-react";
import { appMeta, primaryNav, type NavIconKey } from "../constants/navigation";

const icons: Record<NavIconKey, (props: { className?: string }) => ReactNode> =
  {
    dashboard: (props) => <LayoutDashboard {...props} aria-hidden="true" />,
    appointments: (props) => <CalendarClock {...props} aria-hidden="true" />,
    analytics: (props) => <BarChart3 {...props} aria-hidden="true" />,
    reports: (props) => <FileText {...props} aria-hidden="true" />,
    profile: (props) => <UserRound {...props} aria-hidden="true" />,
    settings: (props) => <Settings {...props} aria-hidden="true" />,
  };

const Icon = ({ name }: { name: NavIconKey }) => {
  const Component = icons[name];
  return <Component className="size-4" />;
};

type SidebarProps = {
  collapsed: boolean;
};

const Sidebar = ({ collapsed }: SidebarProps) => {
  return (
    <aside
      className={[
        "hidden h-full shrink-0 border-r border-sidebar-border/80 bg-sidebar text-sidebar-foreground md:block",
        "transition-[width] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
        collapsed ? "w-20" : "w-64",
      ].join(" ")}
    >
      <div className={"flex h-full flex-col"}>
        <div className="flex items-center justify-center border-b border-sidebar-border/80 p-4.5">
          <Link
            to="/admin/dashboard"
            className={
              "flex items-center justify-center " + (collapsed ? "" : "gap-3")
            }
          >
            <div className="flex"></div>
            <div
              className={
                "size-9 text-3xl font-bold tracking-tight flex justify-center items-center text-primary dark:text-foreground " +
                (collapsed ? "" : "hidden")
              }
            >
              {appMeta.userInitials}
            </div>
            <div
              className={
                "text-3xl font-bold tracking-tight text-primary dark:text-foreground " +
                (collapsed ? "sr-only" : "")
              }
            >
              {appMeta.name}
            </div>
          </Link>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {primaryNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "flex items-center rounded-2xl text-sm font-medium transition gap-3 ",
                  collapsed ? "justify-center px-4 py-4" : "px-6 py-3",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-secondary hover:text-secondary-foreground",
                ].join(" ")
              }
            >
              <Icon name={item.icon} />
              {collapsed ? (
                <span className="sr-only">{item.label}</span>
              ) : (
                <span>{item.label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {!collapsed && (
          <div className="p-4">
            <div className="mt-4 rounded-2xl border border-primary/40 bg-muted p-4 shadow-sm">
              <div className="text-sm font-semibold">Quick Actions</div>
              <p className="mt-1 text-xs text-muted-foreground">
                Review today&apos;s patient appointments and session schedule.
              </p>
              <Link
                to="/admin/appointments-management"
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-95"
              >
                View Appointments
              </Link>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
