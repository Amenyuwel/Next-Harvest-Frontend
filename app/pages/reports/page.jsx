"use client";
import React from "react";
import ReportsChart from "@/components/reports/ReportsChart";
import PieChart from "@/components/reports/PieChart";
import PestReportsTable from "@/components/reports/PestReportsTable";

const ReportsPage = () => {
  return (
    <div className="w-full h-full flex flex-col px-4 sm:px-6 gap-4 sm:gap-6 overflow-y-auto scrollbar-hide">
      {/* Chart Section - responsive layout */}
      <div className="flex-shrink-0 flex flex-col md:flex-row gap-4 sm:gap-6">
        {/* Reports Chart - responsive sizing */}
        <div className="flex-1 h-full md:flex-cols-1">
          <ReportsChart />
        </div>

        {/* Pie Chart - responsive sizing */}
        <div className="w-full md:w-[300px] lg:w-[350px] xl:w-[400px] flex-shrink-0 min-h-[300px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[450px]">
          <PieChart />
        </div>
      </div>

      {/* Table Section - responsive height */}
      <div className="flex-1 w-full h-full">
        <PestReportsTable />
      </div>
    </div>
  );
};

export default ReportsPage;
