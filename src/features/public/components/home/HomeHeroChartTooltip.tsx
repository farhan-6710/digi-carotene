import type { HeroChartTooltipProps } from "@/features/public/types/components";

export function HomeHeroChartTooltip({ active, payload }: HeroChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-border/50 bg-background/80 p-3 text-xs shadow-xl backdrop-blur-md">
      <p className="mb-1 font-bold text-foreground">{payload[0].payload.day}</p>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-primary" />
          <span className="text-muted-foreground">Current:</span>
          <span className="font-bold text-foreground">{payload[0].value}k</span>
        </div>
        {payload[1] && (
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-accent" />
            <span className="text-muted-foreground">Previous:</span>
            <span className="font-bold text-foreground">{payload[1].value}k</span>
          </div>
        )}
      </div>
    </div>
  );
}
