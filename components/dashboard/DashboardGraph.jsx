"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { graphData, graphOptions } from "@/assets/dummydata";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const DashboardGraph = () => {
  // Get CSS custom property values
  const getRootCSSVar = (varName) => {
    if (typeof window !== "undefined") {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
    }
    return "";
  };

  // Create customized chart data with colors applied in JSX
  const customizedGraphData = {
    ...graphData,
    datasets: graphData.datasets.map((dataset, index) => {
      if (dataset.label === "Rice Production") {
        const riceColor = getRootCSSVar("--color-rice") || "#A3D977";
        return {
          ...dataset,
          borderColor: riceColor,
          backgroundColor: `${riceColor}20`, // Add transparency
          pointBackgroundColor: riceColor,
        };
      } else if (dataset.label === "Corn Production") {
        const cornColor = getRootCSSVar("--color-corn") || "#F4C542";
        return {
          ...dataset,
          borderColor: cornColor,
          backgroundColor: `${cornColor}20`, // Add transparency
          pointBackgroundColor: cornColor,
        };
      }
      return dataset;
    }),
  };

  return (
    <section className="flex h-full w-full flex-col rounded-2xl bg-white p-4 shadow">
      <header className="mb-3 flex-shrink-0">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
          Annual Grain Production
        </h2>
      </header>
      <div
        className="min-h-0 w-full flex-1"
        role="img"
        aria-label="Performance data visualization chart"
      >
        <Line data={customizedGraphData} options={graphOptions} />
      </div>
    </section>
  );
};

export default DashboardGraph;
