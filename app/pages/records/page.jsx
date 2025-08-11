"use client";
import React, { useState } from "react";
import FarmerTable from "@/components/records/RecordsFarmerTable";
import FarmerStats from "@/components/records/RecordsFarmerPie";
import TotalHectares from "@/components/records/TotalHectares";
import { useFarmers, useSearch } from "@/hooks/index.js";

function RecordsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Use custom hook for farmers
  const { farmers, loading, error } = useFarmers();

  // Use search hook for filtering
  const searchFields = ["firstName", "lastName", "middleName", "contact"];
  const filteredFarmers = useSearch(farmers, searchFields, searchTerm);

  // Count farmers by crop type
  const riceFarmers = farmers.filter((farmer) =>
    farmer.crop?.toLowerCase().includes("rice"),
  ).length;

  const cornFarmers = farmers.filter((farmer) =>
    farmer.crop?.toLowerCase().includes("corn"),
  ).length;

  // Calculate total hectares
  const totalHectares = farmers.reduce((total, farmer) => {
    const area = parseFloat(farmer.area) || 0;
    return total + area;
  }, 0);

  return (
    <div className="scrollbar-hide h-full w-full overflow-auto bg-gray-50/30 p-4">
      <div className="grid h-full w-full grid-cols-[320px_1fr] grid-rows-2 gap-4">
        {/* Top Left: Pie chart */}
        <div>
          <FarmerStats farmers={farmers} loading={loading} />
        </div>

        {/* Right side: Farmer table spanning both rows */}
        <div className="row-span-2">
          <FarmerTable
            farmers={filteredFarmers}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            riceFarmers={riceFarmers}
            cornFarmers={cornFarmers}
            loading={loading}
          />
        </div>

        {/* Bottom Left: Total hectares */}
        <div>
          <TotalHectares farmers={farmers} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default RecordsPage;
