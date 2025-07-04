"use client";
import React from "react";
import Sidebar from "./components/Sidebar";
import ReportsColumn from "./components/report";
import NotificationColumn from "./components/Notification";
import GraphColumn from "./components/GraphColumn";
import CalendarColumn from "./components/Calendar";
import FieldsMap from "./components/Map";

const DashboardPage = () => {
  return (
    <main className="bg-white w-full h-screen p-10">
      <div className="bg-[#F3F3F3] rounded-3xl shadow-2xl overflow-hidden w-full h-full flex flex-col lg:flex-row p-4 sm:p-6 gap-4 lg:gap-8">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full">
          <div className="w-full flex justify-start items-start ml-5 mt-6 mb-6">
            <h1 className="text-4xl font-semibold text-black">Hi Admin!</h1>
          </div>
          {/* Ensure flex-row on large screens */}
          <div className="flex-1 flex flex-col lg:flex-row gap-2 lg:gap-4">
            {/* ReportsColumn with min-w */}
            <div className="min-w-[320px] max-w-[550px] w-full">
              <ReportsColumn />
            </div>
            {/* Right side: Notifications + Calendar */}
            <div className="flex flex-col flex-1 ml-6 gap-6">
              <div className="flex flex-row gap-6 items-start">
                {/* Notifications */}
                <div className="w-[500px] flex flex-col gap-6">
                  <NotificationColumn />
                  <GraphColumn />
                </div>

                <div className="mt-12 flex flex-col gap-10">
                  <CalendarColumn />
                  <FieldsMap /> {/* Add this line below the calendar */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
