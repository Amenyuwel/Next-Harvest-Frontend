"use client";
import React, { useState } from "react";
import FarmerTable from "@/components/records/RecordsFarmerTable";
import FarmerStats from "@/components/records/RecordsFarmerPie";
import { farmersData as importedFarmersData } from "@/assets/dummydata";

function RecordsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const farmersData = importedFarmersData;

  // Count farmers by crop type
  const riceFarmers = farmersData.filter(
    (farmer) => farmer.crop === "Rice",
  ).length;
  const cornFarmers = farmersData.filter(
    (farmer) => farmer.crop === "Corn",
  ).length;

  const filteredFarmers = farmersData.filter(
    (farmer) =>
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.barangay.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.crop.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="h-full w-full bg-gray-50/30 p-4">
      <div className="flex h-full w-full gap-4">
        {/* Left side: Chart */}
        <div className="w-80">
          <FarmerStats />
        </div>

        {/* Right side: FarmerTable (most prominent) */}
        <div className="flex-1">
          <FarmerTable
            farmers={filteredFarmers}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            riceFarmers={riceFarmers}
            cornFarmers={cornFarmers}
          />
        </div>
      </div>
    </div>
  );
}

export default RecordsPage;
