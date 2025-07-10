"use client";
import React from "react";
import ReportsColumn from "./components/report";
import NotificationColumn from "./components/Notification";
import GraphColumn from "./components/GraphColumn";
import CalendarColumn from "./components/Calendar";
import FieldsMap from "./components/Map";

const DashboardPage = () => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row px-6 pb-6 gap-6 overflow-hidden justify-center items-center">
      {/* Left side - Reports */}
      <div className="min-w-[320px] max-w-full w-full">
        <ReportsColumn />
      </div>
      
      {/* Right side - Notifications + Calendar */}
      <div className="flex flex-col flex-1 gap-6">
        <div className="flex flex-row gap-6 items-start">
          {/* Notifications + Graph */}
          <div className="w-[500px] flex flex-col gap-3">
            <NotificationColumn />
            <GraphColumn />
          </div>

          {/* Calendar + Map */}
          <div className="mt-12 flex flex-col gap-6">
            <CalendarColumn />
            <FieldsMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;