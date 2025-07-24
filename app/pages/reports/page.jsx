"use client";
import React from "react";
import ReportsChart from "@/components/reports/ReportsChart";
import PieChart from "@/components/reports/PieChart";
import PestReportsTable from "@/components/reports/PestReportsTable";

const ReportsPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-hidden p-4">
      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ReportsChart />
        <PieChart />
      </div>

      {/* Scrollable Table Section */}
      <PestReportsTable />
    </div>
  );
};

export default ReportsPage;
