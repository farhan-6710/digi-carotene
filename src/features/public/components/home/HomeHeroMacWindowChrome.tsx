import { Lock } from "lucide-react";

import { heroDashboardMeta } from "@/features/public/constants/hero";

export function HomeHeroMacWindowChrome() {
  return (
    <div className="flex h-11 items-center justify-between border-b border-border/40 bg-muted/20 px-4">
      <div className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-full border border-[#e0443e] bg-[#ff5f56]" />
        <span className="size-2.5 rounded-full border border-[#dea123] bg-[#ffbd2e]" />
        <span className="size-2.5 rounded-full border border-[#1aab29] bg-[#27c93f]" />
      </div>
      <div className="flex h-6 w-full max-w-[220px] items-center justify-center gap-1.5 rounded-md border border-border/40 bg-background/60 px-3 text-[10px] font-medium text-muted-foreground backdrop-blur-xs">
        <Lock className="size-3 shrink-0 text-emerald-500" />
        <span className="truncate tracking-wide">{heroDashboardMeta.url}</span>
      </div>
      <div className="w-[52px]" />
    </div>
  );
}
