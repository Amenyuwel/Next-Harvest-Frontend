import React from "react";
import ProgressBar from "./progressBar";
import {
  FarmerIcon,
  BugIcon,
  LeafIcon,
  PestBugIcon,
  PestRatIcon,
  PestWormIcon,
} from "./Icons";

const ReportsColumn = () => (
  <div className="bg-white rounded-xl shadow p-6 h-full w-[600px] max-w-full">
    <h2 className="text-3xl font-semibold mb-4 text-black">Reports</h2>
    <div className="flex gap-4">
      {/* Farmers Column */}
      <div className="flex-1 bg-[#f3f3f3] rounded-lg p-4 flex flex-col relative">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-black">Farmers</h3>
          <FarmerIcon />
        </div>
        {/* Farmer stats */}
        <div className="space-y-1 mt-2">
          <div className="flex items-baseline justify-between">
            <span className="text-4xl font-bold text-black">7</span>
            <span className="text-gray-500 font-medium ml-2">Registered</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-black">4</span>
            <span className="text-gray-500 font-medium ml-2">Corn Farmers</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-black">3</span>
            <span className="text-gray-500 font-medium ml-2">Rice Farmers</span>
          </div>
        </div>
      </div>
      {/* Pests Column */}
      <div className="flex-1 bg-[#e6f9ce] rounded-lg p-4 flex flex-col relative">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-black">Pest</h3>
          <LeafIcon />
        </div>
        {/* Pest stats */}
        <div className="mt-2 flex flex-col items-center">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-black flex items-center">
              38
              <BugIcon />
            </span>
          </div>
          <div className="space-y-1 mt-2 w-full">
            <div className="flex items-center">
              <PestBugIcon />
              <span className="text-gray-700 font-medium ml-2">Registered</span>
            </div>
            <div className="flex items-center">
              <PestRatIcon />
              <span className="text-gray-700 font-medium ml-2">Registered</span>
            </div>
            <div className="flex items-center">
              <PestWormIcon />
              <span className="text-gray-700 font-medium ml-2">Registered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2 className="text-3xl font-semibold mb-4 mt-5 text-black">
        Recent Harvest
      </h2>

      <div className="flex items-end mb-2">
        <span className="text-4xl font-bold text-black mr-2">110</span>
        <span className="text-gray-400 text-lg font-semibold">t/3m</span>
      </div>
      {/* Recent Harvest Progress Bars */}
      <div className="space-y-4">
        {/* Rice ProgressBar */}
        <div>
          <span className="font-semibold text-black">Rice</span>
          <ProgressBar label="" value={70} max={100} />
        </div>
        {/* Corn ProgressBar */}
        <div>
          <span className="font-semibold text-black">Corn</span>
          <ProgressBar label="" value={40} max={100} />
        </div>
      </div>
    </div>
  </div>
);

export default ReportsColumn;
