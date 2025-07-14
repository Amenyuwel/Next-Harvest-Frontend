"use client";
import React from "react";
import ReportsChart from "./components/ReportsChart";
import PieChart from "./components/PieChart";
import PestReportsTable from "./components/PestReportsTable";

const ReportsPage = () => {
  return (
    <div className="w-full h-full flex flex-col px-4 sm:px-6 pb-4 sm:pb-6 gap-4 sm:gap-6 overflow-auto scrollbar-hide">
      {/* Chart Section - responsive layout */}
      <div className="flex-shrink-0 flex flex-col md:flex-row gap-4 sm:gap-6">
        {/* Reports Chart - responsive sizing */}
        <div className="flex-1 min-w-0 min-h-[300px] sm:min-h-[400px] lg:min-h-[450px]">
          <ReportsChart />
        </div>
        
        {/* Pie Chart - responsive sizing */}
        <div className="w-full md:w-[300px] lg:w-[350px] xl:w-[400px] flex-shrink-0 min-h-[300px] sm:min-h-[400px] lg:min-h-[450px]">
          <PieChart />
        </div>
      </div>

      {/* Table Section - responsive height */}
      <div className="flex-1 overflow-hidden min-h-0 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] p-4">
        <PestReportsTable />
      </div>
    </div>
  );
};

export default ReportsPage;