"use client";
import React, { useState, useEffect } from "react";
import FarmerTable from "@/components/records/RecordsFarmerTable";
import FarmerStats from "@/components/records/RecordsFarmerPie";
import TotalHectares from "@/components/records/TotalHectares";

function RecordsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Fetch farmers when component mounts
  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/farmers`);

      if (response.ok) {
        const result = await response.json();
        console.log("Farmers fetched:", result);

        if (result.success && result.data) {
          setFarmers(result.data);
        } else {
          console.error("API returned error:", result.message);
          setFarmers([]);
        }
      } else {
        const errorText = await response.text();
        console.error("Failed to fetch farmers:", response.status, errorText);
        setFarmers([]);
      }
    } catch (error) {
      console.error("Network error fetching farmers:", error);
      setFarmers([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter farmers based on search term
  const filteredFarmers = farmers.filter((farmer) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      farmer.fullName?.toLowerCase().includes(searchLower) ||
      farmer.firstName?.toLowerCase().includes(searchLower) ||
      farmer.lastName?.toLowerCase().includes(searchLower) ||
      farmer.rsbsaNumber?.toLowerCase().includes(searchLower) ||
      farmer.crop?.toLowerCase().includes(searchLower) ||
      farmer.barangay?.toLowerCase().includes(searchLower)
    );
  });

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
