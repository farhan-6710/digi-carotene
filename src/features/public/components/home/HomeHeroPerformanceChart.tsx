import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import { HomeHeroChartTooltip } from "@/features/public/components/home/HomeHeroChartTooltip";
import { heroChartData, heroDashboardMeta } from "@/features/public/constants/hero";

export function HomeHeroPerformanceChart() {
  return (
    <div className="rounded-xl border border-border/30 bg-muted/10 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
          {heroDashboardMeta.performanceLabel}
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-emerald-500">
          <TrendingUp className="size-3.5" />
          {heroDashboardMeta.performanceDelta}
        </div>
      </div>
      <div className="h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={heroChartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.12} />
                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border)"
              opacity={0.15}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 9, fontWeight: 500 }}
              dy={6}
            />
            <Tooltip
              content={<HomeHeroChartTooltip />}
              cursor={{ stroke: "var(--border)", strokeWidth: 1, strokeDasharray: "4 4" }}
            />
            <Area
              type="monotone"
              dataKey="current"
              stroke="var(--primary)"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorCurrent)"
              isAnimationActive
              animationDuration={1200}
            />
            <Area
              type="monotone"
              dataKey="previous"
              stroke="var(--accent)"
              strokeWidth={1.5}
              strokeDasharray="3 3"
              fillOpacity={1}
              fill="url(#colorPrevious)"
              isAnimationActive
              animationDuration={1200}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
