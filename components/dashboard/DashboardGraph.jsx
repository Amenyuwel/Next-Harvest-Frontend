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

const DashboardGraph = () => (
  <section className="flex h-full w-full flex-col rounded-2xl bg-white p-4 shadow">
    <header className="mb-3 flex-shrink-0">
      <h2 className="text-lg font-bold text-black">Annual Grain Production</h2>
    </header>
    <div
      className="min-h-0 w-full flex-1"
      role="img"
      aria-label="Performance data visualization chart"
    >
      <Line data={graphData} options={graphOptions} />
    </div>
  </section>
);

export default DashboardGraph;
