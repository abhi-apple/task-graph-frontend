"use client";

import { useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import type { AccountIndustry, RawAccountIndustry } from "@/lib/types";
import { professionalColors } from "@/lib/colors";

const chartConfig = {
  count: {
    label: "Accounts",
    color: "hsl(var(--primary))",
  },
};

export function AccountIndustryChart({ data: rawData }: { data: RawAccountIndustry[] }) {
  const data = useMemo(() => {
    const aggregatedData = rawData.reduce((acc, item) => {
      if (!acc[item.Acct_Industry]) {
        acc[item.Acct_Industry] = 0;
      }
      acc[item.Acct_Industry] += item.count;
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(aggregatedData).map(([key, value]) => ({
      Acct_Industry: key,
      count: value,
    }));
  }, [rawData]);

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <XAxis 
              type="number" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `${value}`} 
          />
          <YAxis 
              type="category" 
              dataKey="Acct_Industry" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              width={100}
          />
          <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
          <Bar dataKey="count" name="Accounts" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={professionalColors[index % professionalColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
