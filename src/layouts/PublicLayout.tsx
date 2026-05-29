import { Outlet } from "react-router";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";

export function PublicLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
