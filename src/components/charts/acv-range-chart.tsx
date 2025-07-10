"use client";

import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import { RawAcvRange } from "@/lib/types";

/**
 * AcvRangeChart component renders a donut chart visualizing the distribution of ACV ranges.
 * This component is responsible for aggregating the raw ACV range data and rendering the chart using D3.js.
 *
 * @param {object} props - The component props.
 * @param {RawAcvRange[]} props.data - The raw ACV range data fetched from the API.
 * @returns {JSX.Element} The rendered SVG chart.
 */
export function AcvRangeChart({ data: rawData }: { data: RawAcvRange[] }) {
  // A ref to the SVG element, which allows D3 to manipulate it.
  const ref = useRef<SVGSVGElement>(null);

  // useMemo is used to aggregate the data only when the rawData prop changes.
  const data = useMemo(() => {
    // Aggregate the raw data by ACV range, summing the ACV values.
    const aggregatedData = rawData.reduce((acc, item) => {
      if (!acc[item.ACV_Range]) {
        acc[item.ACV_Range] = 0;
      }
      acc[item.ACV_Range] += item.acv;
      return acc;
    }, {} as { [key: string]: number });

    // Format the aggregated data into an array of objects that D3 can use.
    return Object.entries(aggregatedData).map(([key, value]) => ({
      range: key,
      value: value,
    }));
  }, [rawData]);

  // useEffect is used to draw the chart whenever the data changes.
  useEffect(() => {
    if (data && ref.current) {
      const svg = d3.select(ref.current);
      svg.selectAll("*").remove(); // Clear the SVG.

      // Define the dimensions and radius of the donut chart.
      const width = 500;
      const height = 300;
      const radius = Math.min(width, height) / 2;
      const innerRadius = radius * 0.6; // This creates the "donut" hole.

      // Create a color scale.
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      // Create the pie generator.
      const pie = d3.pie<any>().value(d => d.value);
      // Create the arc generator for the donut slices.
      const arc = d3.arc<any>().innerRadius(innerRadius).outerRadius(radius);

      // Append a group element to center the chart in the SVG.
      const g = svg.append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      // Create the donut slices.
      const arcs = g.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

      // Append the path for each slice.
      arcs.append("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.range));

      // Append the text labels to each slice.
      // A function to determine the best contrasting text color (black or white)
      const getContrastYIQ = (hexcolor: string) => {
        const r = parseInt(hexcolor.substring(1, 3), 16);
        const g = parseInt(hexcolor.substring(3, 5), 16);
        const b = parseInt(hexcolor.substring(5, 7), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
      };

      // ... (inside the useEffect)

      arcs.append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("dy", "0.35em")
        .text(d => d.data.range)
        .style("text-anchor", "middle")
        .style("fill", d => getContrastYIQ(color(d.data.range)));
    }
  }, [data]);

  // The SVG element that D3 will use to draw the chart.
  return (
    <svg ref={ref} width={500} height={300} />
  );
}