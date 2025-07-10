"use client";

import { useMemo } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";
import type { AcvRange, RawAcvRange } from "@/lib/types";
import { ChartConfig, ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

const chartConfig = {
  acv: {
    label: "ACV",
  },
  tier1: {
    label: "<$20K",
    color: "hsl(var(--chart-1))",
  },
  tier2: {
    label: "$20K - 50K",
    color: "hsl(var(--chart-2))",
  },
  tier3: {
    label: "$50K - 100K",
    color: "hsl(var(--chart-3))",
  },
  tier4: {
    label: "$100K - 200K",
    color: "hsl(var(--chart-4))",
  },
  tier5: {
    label: ">=$200K",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const rangeToKey: { [key: string]: AcvRange['key'] } = {
  "<$20K": "tier1",
  "$20K - 50K": "tier2",
  "$50K - 100K": "tier3",
  "$100K - 200K": "tier4",
  ">=$200K": "tier5",
};

export function AcvRangeChart({ data: rawData }: { data: RawAcvRange[] }) {
  const data = useMemo(() => {
    const aggregatedData = rawData.reduce((acc, item) => {
      if (!acc[item.ACV_Range]) {
        acc[item.ACV_Range] = 0;
      }
      acc[item.ACV_Range] += item.acv;
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(aggregatedData).map(([range, value]) => ({
      range,
      value,
      key: rangeToKey[range] || 'other',
    }));
  }, [rawData]);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel nameKey="range" />}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="range"
            innerRadius={60}
            strokeWidth={5}
          >
            {data.map((entry) => (
              <Cell
                key={entry.key}
                fill={chartConfig[entry.key as keyof typeof chartConfig]?.color}
                className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            ))}
          </Pie>
          <ChartLegend content={<ChartLegendContent nameKey="range" />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}