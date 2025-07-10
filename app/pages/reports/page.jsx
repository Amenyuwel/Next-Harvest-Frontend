"use client";
import React from "react";
import ReportsChart from "./components/ReportsChart";
import PieChart from "./components/PieChart";
import PestReportsTable from "./components/PestReportsTable";

const ReportsPage = () => {
  return (
    <div className="w-full h-full flex flex-col px-4 sm:px-6 pb-4 sm:pb-6 gap-4 sm:gap-6 overflow-hidden">
      {/* Chart Section - responsive layout */}
      <div className="flex-shrink-0 flex flex-col lg:flex-row gap-4 sm:gap-6">
        <div className="flex-1 min-w-0">
          <ReportsChart />
        </div>
        <div className="flex-shrink-0 w-full lg:w-auto lg:flex-shrink-0">
          <PieChart />
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 overflow-hidden min-h-0">
        <PestReportsTable />
      </div>
    </div>
  );
};

export default ReportsPage;