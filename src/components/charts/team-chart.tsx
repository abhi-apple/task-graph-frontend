"use client";

import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import { RawTeam } from "@/lib/types";

/**
 * TeamChart component renders a bar chart visualizing the size of different teams.
 * This component is responsible for aggregating the raw team data and rendering the chart using D3.js.
 *
 * @param {object} props - The component props.
 * @param {RawTeam[]} props.data - The raw team data fetched from the API.
 * @returns {JSX.Element} The rendered SVG chart.
 */
export function TeamChart({ data: rawData }: { data: RawTeam[] }) {
  // A ref to the SVG element, which allows D3 to manipulate it.
  const ref = useRef<SVGSVGElement>(null);

  // useMemo is used to aggregate the data only when the rawData prop changes.
  const data = useMemo(() => {
    // Aggregate the raw data by team, summing the counts.
    const aggregatedData = rawData.reduce((acc, item) => {
      if (!acc[item.Team]) {
        acc[item.Team] = 0;
      }
      acc[item.Team] += item.count;
      return acc;
    }, {} as { [key: string]: number });

    // Format the aggregated data into an array of objects that D3 can use.
    return Object.entries(aggregatedData).map(([key, value]) => ({
      Team: key,
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
      const margin = { top: 20, right: 30, bottom: 40, left: 40 };

      // Create the x-axis scale.
      const x = d3.scaleBand()
        .domain(data.map(d => d.Team))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      // Create the y-axis scale.
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count) || 0])
        .nice()
        .range([height - margin.bottom, margin.top]);

      // Define the x-axis and y-axis generators.
      const xAxis = (g: any) => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

      const yAxis = (g: any) => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

      // Append the bars to the SVG.
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
          .attr("x", d => x(d.Team)!)
          .attr("y", d => y(d.count))
          .attr("height", d => y(0) - y(d.count))
          .attr("width", x.bandwidth())
          .attr("fill", "steelblue")
          .on("mouseover", function(event, d) {
            d3.select(this).attr("fill", "orange");
            tooltip.style("opacity", 1)
              .html(`Team: ${d.Team}<br>Count: ${d.count}`)
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
