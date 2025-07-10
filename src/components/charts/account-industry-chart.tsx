"use client";

import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import { RawAccountIndustry } from "@/lib/types";

/**
 * AccountIndustryChart component renders a horizontal bar chart visualizing the distribution of account industries.
 * This component is responsible for aggregating the raw account industry data and rendering the chart using D3.js.
 *
 * @param {object} props - The component props.
 * @param {RawAccountIndustry[]} props.data - The raw account industry data fetched from the API.
 * @returns {JSX.Element} The rendered SVG chart.
 */
export function AccountIndustryChart({ data: rawData }: { data: RawAccountIndustry[] }) {
  // A ref to the SVG element, which allows D3 to manipulate it.
  const ref = useRef<SVGSVGElement>(null);

  // useMemo is used to aggregate the data only when the rawData prop changes.
  const data = useMemo(() => {
    // Aggregate the raw data by account industry, summing the counts.
    const aggregatedData = rawData.reduce((acc, item) => {
      if (!acc[item.Acct_Industry]) {
        acc[item.Acct_Industry] = 0;
      }
      acc[item.Acct_Industry] += item.count;
      return acc;
    }, {} as { [key: string]: number });

    // Format the aggregated data into an array of objects that D3 can use.
    return Object.entries(aggregatedData).map(([key, value]) => ({
      Acct_Industry: key,
      count: value,
    }));
  }, [rawData]);

  // useEffect is used to draw the chart whenever the data changes.
  useEffect(() => {
    if (data && ref.current) {
      const svg = d3.select(ref.current);
      svg.selectAll("*").remove(); // Clear the SVG.

      // Define the dimensions and margins of the chart.
      const width = 500;
      const height = 300;
      const margin = { top: 20, right: 30, bottom: 40, left: 100 };

      // Create the y-axis scale. It's a band scale for the categorical industry names.
      const y = d3.scaleBand()
        .domain(data.map(d => d.Acct_Industry))
        .range([margin.top, height - margin.bottom])
        .padding(0.1);

      // Create the x-axis scale. It's a linear scale for the numerical count.
      const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count) || 0])
        .nice()
        .range([margin.left, width - margin.right]);

      // Define the x-axis generator.
      const xAxis = (g: any) => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(5));

      // Define the y-axis generator.
      const yAxis = (g: any) => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

      // Append a group element for the bars.
      const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px");

      svg.append("g")
        .selectAll("rect")
        .data(data)
        .join("rect")
          .attr("x", margin.left)
          .attr("y", d => y(d.Acct_Industry)!)
          .attr("width", d => x(d.count) - margin.left)
          .attr("height", y.bandwidth())
          .attr("fill", "steelblue")
          .on("mouseover", function(event, d) {
            d3.select(this).attr("fill", "orange");
            tooltip.style("opacity", 1)
              .html(`Industry: ${d.Acct_Industry}<br>Count: ${d.count}`)
              .style("left", (event.pageX + 10) + "px")
              .style("top", (event.pageY - 28) + "px");
          })
          .on("mouseout", function() {
            d3.select(this).attr("fill", "steelblue");
            tooltip.style("opacity", 0);
          });

      svg.append("g").call(xAxis);
      svg.append("g").call(yAxis);
    }
  }, [data]);

  // The SVG element that D3 will use to draw the chart.
  return (
    <svg ref={ref} width={500} height={300} />
  );
}
