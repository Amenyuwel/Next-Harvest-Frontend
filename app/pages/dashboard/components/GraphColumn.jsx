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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { graphData, graphOptions } from '../../../assets/dummydata';

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
  <div className="relative h-full w-full">
    <div className="mb-4">
      <span className="text-xl sm:text-2xl font-bold text-black">Graph</span>
    </div>
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow p-3 sm:p-4 md:p-6 flex flex-col h-full min-h-[290px]">
      <div className="flex-1 w-full h-full">
        <Line data={graphData} options={graphOptions} />
      </div>
    </div>
  </div>
);

export default GraphColumn;