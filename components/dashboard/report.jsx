import React from "react";
import ProgressBar from "./progressBar";
import { Icon } from "@iconify/react";

const ReportsColumn = () => (
  <div className="bg-white rounded-2xl sm:rounded-3xl shadow p-3 sm:p-4 md:p-6 h-full w-full max-w-full overflow-hidden">
    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4 text-black">Reports</h2>
    
    {/* Top Section - Farmers and Pest Cards */}
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-10 justify-center items-stretch mb-6 sm:mb-8">
      {/* Farmers Column */}
      <div className="flex-1 bg-[var(--color-column-farmer)] rounded-2xl sm:rounded-3xl p-3 sm:p-4 flex flex-col relative min-h-[200px] sm:min-h-[250px] md:min-h-[300px]">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <h3 className="text-sm sm:text-base font-semibold text-black">Farmers</h3>
          <Icon
            icon="ph:farm-fill"
            width="18"
            height="18"
            className="text-gray-500 sm:w-5 sm:h-5 md:w-6 md:h-6"
          />
        </div>

        <div className="space-y-3 sm:space-y-5 md:space-y-7 mt-2 sm:mt-3 md:mt-5 ml-2 sm:ml-3 md:ml-5">
          <div className="flex items-center">
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mr-2 sm:mr-3">7</span>
            <span className="text-gray-500 font-medium text-xs sm:text-sm md:text-[15px]">
              Registered
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mr-2 sm:mr-3">4</span>
            <span className="text-gray-500 font-medium text-xs sm:text-sm md:text-[15px]">
              Corn Farmers
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mr-2 sm:mr-3">3</span>
            <span className="text-gray-500 font-medium text-xs sm:text-sm md:text-[15px]">
              Rice Farmers
            </span>
          </div>
        </div>
      </div>

      {/* Pests Column */}
      <div className="flex-1 bg-[var(--color-column-pests)] rounded-2xl sm:rounded-3xl p-3 sm:p-4 flex flex-col relative min-h-[200px] sm:min-h-[250px] md:min-h-[300px]">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <h3 className="text-sm sm:text-base font-semibold text-black">Pest</h3>
          <Icon
            icon="carbon:pest"
            width="18"
            height="18"
            className="text-gray-500 sm:w-5 sm:h-5 md:w-6 md:h-6"
          />
        </div>
        
        {/* Pest stats */}
        <div className="mt-2 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black flex items-center">
              38
              <Icon
                icon="oui:security-signal-detected"
                width="16"
                height="16"
                className="text-black ml-1 sm:w-5 sm:h-5 md:w-6 md:h-6"
              />
            </span>
          </div>
          <div className="space-y-3 sm:space-y-4 md:space-y-5 mt-3 sm:mt-4 md:mt-5 w-full flex flex-col items-start ml-4 sm:ml-6 md:ml-10">
            <div className="flex items-center">
              <Icon
                icon="solar:bug-bold"
                width="18"
                height="18"
                className="text-black sm:w-5 sm:h-5 md:w-6 md:h-6"
              />
              <span className="text-gray-600 font-medium ml-2 text-xs sm:text-sm md:text-[15px]">
                Registered
              </span>
            </div>
            <div className="flex items-center">
              <Icon
                icon="material-symbols:pest-control-rodent"
                width="18"
                height="18"
                className="text-black sm:w-5 sm:h-5 md:w-6 md:h-6"
              />
              <span className="text-gray-600 font-medium ml-2 text-xs sm:text-sm md:text-[15px]">
                Registered
              </span>
            </div>
            <div className="flex items-center">
              <Icon
                icon="fluent-emoji-high-contrast:worm"
                width="18"
                height="18"
                className="text-black sm:w-5 sm:h-5 md:w-6 md:h-6"
              />
              <span className="text-gray-600 font-medium ml-2 text-xs sm:text-sm md:text-[15px]">
                Registered
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Section - Recent Harvest */}
    <div className="flex-1 ">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4 text-black ">
        Recent Harvest
      </h2>

      <div className="flex items-end mb-2 sm:mb-3">
        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mr-2">110</span>
        <span className="text-gray-400 text-sm sm:text-base md:text-lg font-semibold">t/3m</span>
      </div>
      
      {/* Recent Harvest Progress Bars */}
      <div className="space-y-3 sm:space-y-4 ">
        {/* Rice ProgressBar */}
        <div>
          <span className="font-semibold text-black text-base sm:text-lg md:text-xl">Rice</span>
          <ProgressBar label="" value={70} max={100} />
        </div>
        {/* Corn ProgressBar */}
        <div>
          <span className="font-semibold text-black text-base sm:text-lg md:text-xl">Corn</span>
          <ProgressBar label="" value={40} max={100} />
        </div>
       
        
      </div>
    </div>
  </div>
);

export default ReportsColumn;