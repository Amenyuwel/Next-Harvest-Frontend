"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import ReportsColumn from "./components/report";

// Simple Graph Placeholder
const Graph = () => (
  <div className="bg-white rounded-xl shadow p-4 mt-4">
    <h3 className="font-semibold text-black mb-2">Graph</h3>
    {/* Replace with your chart component */}
    <div className="w-full h-40 flex items-center justify-center text-gray-400">
      {/* Example: <LineChart data={...} /> */}
      <span>Graph Placeholder</span>
    </div>
  </div>
);

// Notification Card with Ripple Effect
const NotificationCard = ({ icon, title, subtitle, date, delay }) => {
  const [ripple, setRipple] = useState(false);

  useEffect(() => {
    setTimeout(() => setRipple(true), delay);
  }, [delay]);

  return (
    <div
      className={`relative bg-[#e6f9ce] rounded-xl shadow p-4 mb-4 flex items-center transition-all duration-700 overflow-hidden ${
        ripple ? "animate-ripple" : ""
      }`}
      style={{ minWidth: 260 }}
    >
      <div className="flex-shrink-0 mr-3">{icon}</div>
      <div>
        <div className="font-semibold text-black">{title}</div>
        <div className="text-gray-600 text-sm">{subtitle}</div>
        <div className="font-bold text-black text-sm mt-1">{date}</div>
      </div>
      <span className="absolute top-2 right-2 bg-orange-100 text-orange-500 text-xs font-semibold px-2 py-1 rounded">
        New Alert
      </span>
      {/* Ripple effect */}
      <span
        className={`absolute left-0 top-0 w-full h-full pointer-events-none rounded-xl ${
          ripple ? "animate-ripple-effect" : ""
        }`}
      />
    </div>
  );
};

// Example Bug Icon for Notification
const BugIcon = () => (
  <svg
    className="w-8 h-8 text-black"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="14" r="4" stroke="currentColor" strokeWidth="2" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7l-2 2M5 7l2 2M19 17l-2-2M5 17l2-2"
    />
  </svg>
);

const DashboardPage = () => {
  return (
    <main className="bg-whitew-full h-screen p-10">
      <style>
        {`
        @keyframes ripple {
          0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.2);}
          100% { box-shadow: 0 0 0 20px rgba(34,197,94,0);}
        }
        .animate-ripple-effect {
          animation: ripple 0.7s;
        }
        `}
      </style>
      <div className="bg-[#F3F3F3] rounded-3xl shadow-2xl overflow-hidden w-full h-full flex flex-col lg:flex-row p-4 sm:p-6 lg:px-20 gap-4 lg:gap-10">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full">
          <div className="w-full flex justify-start items-start ml-5 mt-6 mb-6">
            <h1 className="text-4xl font-semibold text-black">Hi Admin!</h1>
          </div>
          <div className="flex-1 flex flex-col lg:flex-row gap-6 ml-4">
            {/* Left: Reports */}
            <div className="flex-1">
              <ReportsColumn />
            </div>
            {/* Right: Notifications and Graph */}
            <div className="flex flex-col w-full max-w-xs lg:max-w-sm">
              <h2 className="text-2xl font-bold mb-2 text-black">
                Notifications
              </h2>
              <NotificationCard
                icon={<BugIcon />}
                title="Pest Detected"
                subtitle="Rice Field"
                date="May 13"
                delay={100}
              />
              <NotificationCard
                icon={<BugIcon />}
                title="Pest Detected"
                subtitle="Rice Field"
                date="May 13"
                delay={300}
              />
              <NotificationCard
                icon={<BugIcon />}
                title="Pest Detected"
                subtitle="Rice Field"
                date="May 13"
                delay={500}
              />
              <Graph />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
