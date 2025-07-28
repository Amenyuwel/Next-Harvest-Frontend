"use client";
import React, { useState } from "react";
import FarmerTable from "@/components/records/RecordsFarmerTable";
import FarmerStats from "@/components/records/RecordsFarmerPie";

function RecordsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // This needs to be transferred to assets/dummyData.js
  const farmersData = [
    {
      id: 1,
      rsbsa: "G1015",
      name: "Emerson Alvarado",
      description: "Regular",
      crop: "Rice",
      area: "1.1 ha",
      barangay: "Lagao",
      contact: "+63 912 345 6789",
    },
    {
      id: 2,
      rsbsa: "G1016",
      name: "Romel Birada",
      description: "Regular",
      crop: "Corn",
      area: "1.1 ha",
      barangay: "San Isidro",
      contact: "+63 912 345 6790",
    },
    {
      id: 3,
      rsbsa: "G1017",
      name: "Billy Joe Mengote",
      description: "Premium",
      crop: "Rice",
      area: "10 ha",
      barangay: "Fatima",
      contact: "+63 912 345 6791",
    },
    {
      id: 4,
      rsbsa: "G1018",
      name: "Kylie Malagamba",
      description: "Regular",
      crop: "Corn",
      area: "5 ha",
      barangay: "San Isidro",
      contact: "+63 912 345 6792",
    },
    {
      id: 5,
      rsbsa: "G1019",
      name: "Anita Salubre Palomares",
      description: "Regular",
      crop: "Rice",
      area: "2 ha",
      barangay: "Lagao",
      contact: "+63 912 345 6793",
    },
    {
      id: 6,
      rsbsa: "G1020",
      name: "Maria Santos",
      description: "Premium",
      crop: "Corn",
      area: "1 ha",
      barangay: "Conel",
      contact: "+63 912 345 6794",
    },
    {
      id: 7,
      rsbsa: "G1021",
      name: "Juan Dela Cruz",
      description: "Regular",
      crop: "Corn",
      area: "1 ha",
      barangay: "Antipolo",
      contact: "+63 912 345 6795",
    },
    {
      id: 8,
      rsbsa: "G1022",
      name: "Rosa Martinez",
      description: "Premium",
      crop: "Corn",
      area: "3 ha",
      barangay: "Lagao",
      contact: "+63 912 345 6796",
    },
    {
      id: 9,
      rsbsa: "G1023",
      name: "Carlos Reyes",
      description: "Regular",
      crop: "Corn",
      area: "2.5 ha",
      barangay: "Fatima",
      contact: "+63 912 345 6797",
    },
    {
      id: 10,
      rsbsa: "G1024",
      name: "Elena Gonzales",
      description: "Premium",
      crop: "Corn",
      area: "4 ha",
      barangay: "San Isidro",
      contact: "+63 912 345 6798",
    },
  ];

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
