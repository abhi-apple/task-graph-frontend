"use client";

import { useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import type { Team, RawTeam } from "@/lib/types";
import { professionalColors } from "@/lib/colors";

const chartConfig = {
  count: {
    label: "Members",
    color: "hsl(var(--primary))",
  },
};

export function TeamChart({ data: rawData }: { data: RawTeam[] }) {
  const data = useMemo(() => {
    const aggregatedData = rawData.reduce((acc, item) => {
      if (!acc[item.Team]) {
        acc[item.Team] = 0;
      }
      acc[item.Team] += item.count;
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(aggregatedData).map(([key, value]) => ({
      Team: key,
      count: value,
    }));
  }, [rawData]);

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <XAxis
            dataKey="Team"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Bar dataKey="count" name="Members" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={professionalColors[index % professionalColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
