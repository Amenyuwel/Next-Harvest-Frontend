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
  Filler
);

const GraphColumn = () => (
  <section className="bg-white rounded-2xl shadow p-4 h-full w-full flex flex-col">
    <header className="mb-3 flex-shrink-0">
      <h2 className="text-lg font-bold text-black">Performance Graph</h2>
    </header>
    <div
      className="w-full flex-1 min-h-0"
      role="img"
      aria-label="Performance data visualization chart"
    >
      <Line data={graphData} options={graphOptions} />
    </div>
  </section>
);

export default GraphColumn;
