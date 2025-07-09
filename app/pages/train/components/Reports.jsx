import React from "react";
import { Icon } from "@iconify/react";
import ProgressBar from "../../dashboard/components/progressBar";

const Reports = () => (
  <div className="bg-white rounded-2xl sm:rounded-3xl shadow p-4 sm:p-6 h-full">
    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-black">Reports</h2>
    
    {/* Pest Cards */}
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1 bg-[#E8F5E8] rounded-2xl p-4 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-black">Pest</h3>
          <Icon icon="carbon:pest" width="20" height="20" className="text-gray-500" />
        </div>
        <div className="text-center mb-4">
          <span className="text-4xl font-bold text-black">38</span>
          <span className="text-sm text-gray-500">%</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Icon icon="solar:bug-bold" width="16" height="16" className="text-black mr-2" />
            <span className="text-gray-600">Registered</span>
          </div>
          <div className="flex items-center text-sm">
            <Icon icon="material-symbols:pest-control-rodent" width="16" height="16" className="text-black mr-2" />
            <span className="text-gray-600">Registered</span>
          </div>
          <div className="flex items-center text-sm">
            <Icon icon="fluent-emoji-high-contrast:worm" width="16" height="16" className="text-black mr-2" />
            <span className="text-gray-600">Registered</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 bg-[#E8F5E8] rounded-2xl p-4 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-black">Pest</h3>
          <Icon icon="carbon:pest" width="20" height="20" className="text-gray-500" />
        </div>
        <div className="text-center mb-4">
          <span className="text-4xl font-bold text-black">38</span>
          <span className="text-sm text-gray-500">%</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Icon icon="solar:bug-bold" width="16" height="16" className="text-black mr-2" />
            <span className="text-gray-600">Registered</span>
          </div>
          <div className="flex items-center text-sm">
            <Icon icon="material-symbols:pest-control-rodent" width="16" height="16" className="text-black mr-2" />
            <span className="text-gray-600">Registered</span>
          </div>
          <div className="flex items-center text-sm">
            <Icon icon="fluent-emoji-high-contrast:worm" width="16" height="16" className="text-black mr-2" />
            <span className="text-gray-600">Registered</span>
          </div>
        </div>
      </div>
    </div>

    {/* Recent Pest Data */}
    <div className="flex-1">
      <h3 className="text-lg font-semibold mb-3 text-black">Recent Pest Data</h3>
      <div className="flex items-end mb-3">
        <span className="text-4xl font-bold text-black mr-2">15,4</span>
        <span className="text-gray-400 text-sm font-semibold">t/3m</span>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-black">Cat</span>
            <span className="text-sm text-gray-500">6,4t</span>
          </div>
          <ProgressBar value={70} max={100} />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-black">Dog</span>
            <span className="text-sm text-gray-500">3,4t</span>
          </div>
          <ProgressBar value={40} max={100} />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-black">Worm</span>
            <span className="text-sm text-gray-500">5,4t</span>
          </div>
          <ProgressBar value={60} max={100} />
        </div>
      </div>
    </div>
  </div>
);

export default Reports;