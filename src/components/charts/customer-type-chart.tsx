"use client";

import { useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import type { CustomerType, RawCustomerType } from "@/lib/types";
import { professionalColors } from "@/lib/colors";

const chartConfig = {
  count: {
    label: "Customers",
    color: "hsl(var(--primary))",
  },
};

export function CustomerTypeChart({ data: rawData }: { data: RawCustomerType[] }) {
  const data = useMemo(() => {
    const aggregatedData = rawData.reduce((acc, item) => {
      if (!acc[item.Cust_Type]) {
        acc[item.Cust_Type] = 0;
      }
      acc[item.Cust_Type] += item.count;
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(aggregatedData).map(([key, value]) => ({
      Cust_Type: key,
      count: value,
    }));
  }, [rawData]);

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <XAxis
            dataKey="Cust_Type"
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
          <Bar dataKey="count" name="Customers" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={professionalColors[index % professionalColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
