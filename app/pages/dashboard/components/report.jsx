import React from "react";
import ProgressBar from "./progressBar";
import { Icon } from "@iconify/react";

const ReportsColumn = () => (
  <div className="bg-white rounded-4xl shadow p-6 h-full w-[550px] max-w-full">
    <h2 className="text-3xl font-semibold mb-4 text-black">Reports</h2>
    <div className="flex gap-10 justify-center items-center">
      {/* Farmers Column */}
      <div className="flex-1 bg-[var(--column-farmer)] rounded-3xl p-3 flex flex-col relative min-w-[160px] max-w-[300px] h-[300px]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold text-black">Farmers</h3>
          <Icon
            icon="ph:farm-fill"
            width="22"
            height="22"
            className="text-gray-500"
          />
        </div>

        <div className="space-y-7 mt-5 ml-5 ">
          <div className="flex items-center">
            <span className="text-5xl font-bold text-black mr-3">7</span>
            <span className="text-gray-500 font-medium text-[15px]">
              Registered
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-5xl font-bold text-black mr-3">4</span>
            <span className="text-gray-500 font-medium text-[15px]">
              Corn Farmers
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-5xl font-bold text-black mr-3">3</span>
            <span className="text-gray-500 font-medium text-[15px]">
              Rice Farmers
            </span>
          </div>
        </div>
      </div>
      {/* Pests Column */}
      <div className="flex-1 bg-[var(--column-pests)] rounded-3xl p-3 flex flex-col relative min-w-[160px] max-w-[300px] h-[300px]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold text-black">Pest</h3>
          <Icon
            icon="carbon:pest"
            width="22"
            height="22"
            className="text-gray-500"
          />
        </div>
        {/* Pest stats */}
        <div className="mt-2 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold text-black flex items-center">
              38
              <Icon
                icon="oui:security-signal-detected"
                width="22"
                height="22"
                className="text-black ml-1"
              />
            </span>
          </div>
          <div className="space-y-5 mt-5 w-full flex flex-col items-start ml-10 gap-4">
            <div className="flex items-center">
              <Icon
                icon="solar:bug-bold"
                width="25"
                height="25"
                className="text-black"
              />
              <span className="text-gray-600 font-medium ml-2 text-[15px]">
                Registered
              </span>
            </div>
            <div className="flex items-center">
              <Icon
                icon="material-symbols:pest-control-rodent"
                width="25"
                height="25"
                className="text-black"
              />
              <span className="text-gray-600 font-medium ml-2 text-[15px]">
                Registered
              </span>
            </div>
            <div className="flex items-center">
              <Icon
                icon="fluent-emoji-high-contrast:worm"
                width="25"
                height="25"
                className="text-black"
              />
              <span className="text-gray-600 font-medium ml-2 text-[15px]">
                Registered
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2 className="text-3xl font-semibold mb-4 mt-15 text-black">
        Recent Harvest
      </h2>

      <div className="flex items-end mb-2">
        <span className="text-6xl font-bold text-black mr-2">110</span>
        <span className="text-gray-400 text-lg font-semibold">t/3m</span>
      </div>
      {/* Recent Harvest Progress Bars */}
      <div className="space-y-4">
        {/* Rice ProgressBar */}
        <div>
          <span className="font-semibold text-black text-xl">Rice</span>
          <ProgressBar label="" value={70} max={100} />
        </div>
        {/* Corn ProgressBar */}
        <div>
          <span className="font-semibold text-black text-xl">Corn</span>
          <ProgressBar label="" value={40} max={100} />
        </div>
      </div>
    </div>
  </div>
);

export default ReportsColumn;
