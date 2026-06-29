import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/ui/chart";

import { GrowthChartCard } from "./GrowthChartCard";
import type { GrowthSpendChartProps } from "../../types/components";
import { formatCompact } from "../../utils/formatters";

const chartConfig: ChartConfig = {
  spend: { label: "Spend", color: "var(--chart-1)" },
  clicks: { label: "Clicks", color: "var(--chart-3)" },
};

export function GrowthSpendChart({
  title,
  description,
  data,
}: GrowthSpendChartProps) {
  return (
    <GrowthChartCard
      title={title}
      description={description}
      isEmpty={data.length === 0}
    >
      <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
        <BarChart data={data} margin={{ left: -8, right: 8, top: 8 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/50" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            className="text-muted-foreground font-medium"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => formatCompact(Number(value))}
            className="text-muted-foreground font-medium"
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="spend" fill="var(--color-spend)" radius={[4, 4, 0, 0]} barSize={28} />
          <Bar dataKey="clicks" fill="var(--color-clicks)" radius={[4, 4, 0, 0]} barSize={28} />
        </BarChart>
      </ChartContainer>
    </GrowthChartCard>
  );
}
