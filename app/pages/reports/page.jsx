"use client";
import React from "react";
import ReportsChart from "@/components/reports/ReportsChart";
import PestReportsTable from "@/components/reports/PestReportsTable";

const ReportsPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-hidden p-4">
      {/* Charts Section */}
      <div className="w-full">
        <ReportsChart />
      </div>

      {/* Scrollable Table Section */}
      <PestReportsTable />
    </div>
  );
};

export default ReportsPage;
