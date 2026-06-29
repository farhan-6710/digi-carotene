import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/ui/chart";

import { GrowthChartCard } from "./GrowthChartCard";
import type { GrowthTrendChartProps } from "../../types/components";
import { formatCompact } from "../../utils/formatters";

const chartConfig: ChartConfig = {
  followers: { label: "Followers", color: "var(--chart-1)" },
  engagement: { label: "Engagement %", color: "var(--accent)" },
};

export function GrowthTrendChart({
  title,
  description,
  data,
}: GrowthTrendChartProps) {
  return (
    <GrowthChartCard
      title={title}
      description={description}
      isEmpty={data.length === 0}
    >
      <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
        <ComposedChart data={data} margin={{ left: -8, right: 8, top: 8 }}>
          <defs>
            <linearGradient id="growthFollowers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-followers)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-followers)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/50" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            className="text-muted-foreground font-medium"
          />
          <YAxis
            yAxisId="left"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => formatCompact(Number(value))}
            className="text-muted-foreground font-medium"
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            domain={[0, "dataMax + 2"]}
            className="text-muted-foreground font-medium"
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="followers"
            stroke="var(--color-followers)"
            strokeWidth={2}
            fill="url(#growthFollowers)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="engagement"
            stroke="var(--color-engagement)"
            strokeWidth={2}
            dot={false}
          />
        </ComposedChart>
      </ChartContainer>
    </GrowthChartCard>
  );
}
