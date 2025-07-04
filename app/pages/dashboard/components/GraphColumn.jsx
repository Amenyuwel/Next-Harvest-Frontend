import React from "react";

const GraphColumn = () => (
  <div className="relative mt-5">
    <div className="absolute -top-6 left-0">
      <span className="text-2xl font-bold text-black">Graph</span>
    </div>
    <div className="bg-white rounded-3xl shadow p-6 flex flex-col h-full min-h-[450px] mt-6">
      <div className="flex items-center justify-center flex-1">
        <span className="text-gray-400 text-xl font-semibold">
          Graph Handler
        </span>
      </div>
    </div>
  </div>
);

export default GraphColumn;
