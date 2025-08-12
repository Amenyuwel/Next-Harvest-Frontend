"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import GlobalHeader from "@/components/GlobalHeader";
import ProtectedRoute from "@/components/ProtectedRoute";
import routeConfig from "@/app/config/routeConfig";
import AddFarmerModal from "@/components/records/AddFarmerModal";
import AddBarangayModal from "@/components/reports/AddBarangayModal";

export default function PagesLayout({ children }) {
  const pathname = usePathname();
  const [isAddFarmerModalOpen, setIsAddFarmerModalOpen] = useState(false);
  const [isAddBarangayModalOpen, setIsAddBarangayModalOpen] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Add handler for farmer modal - this should actually save the farmer
  const handleAddFarmer = async (farmerData) => {
    try {
      console.log("Layout: Farmer data received:", farmerData);

      // The farmer is already saved in the AddFarmerModal component
      // So we just need to handle the success case here
      console.log("Farmer added successfully:", farmerData);

      // Close the modal
      setIsAddFarmerModalOpen(false);

      // Success message is already shown in AddFarmerModal via toast
      // No need to show another alert here

      // If you're on the records page, you might want to refresh it
      if (pathname === "/records") {
        // The records page should handle refreshing its own data
        // through the onSubmit callback in AddFarmerModal
        window.location.reload(); // Simple solution for now
      }
    } catch (error) {
      console.error("Layout: Error handling farmer submission:", error);
      alert("Error adding farmer. Please try again.");
    }
  };

  // Add handler for barangay modal
  const handleAddBarangay = async (barangayData) => {
    try {
      console.log("Layout: Barangay data received:", barangayData);

      // The barangay is already saved in the AddBarangayModal component
      console.log("Barangay added successfully:", barangayData);

      // Close the modal
      setIsAddBarangayModalOpen(false);

      // Success message is already shown in ReportsHeatMap via toast
      // No need to show another alert here

      // If you're on the reports page, refresh it
      if (pathname === "/reports") {
        window.location.reload(); // Simple solution for now
      }
    } catch (error) {
      console.error("Layout: Error handling barangay submission:", error);
      alert("Error adding barangay. Please try again.");
    }
  };

  const handleAddClick = () => {
    if (pathname === "/dashboard" || pathname === "/records") {
      setIsAddFarmerModalOpen(true);
    }
    if (pathname === "/reports") {
      setIsAddBarangayModalOpen(true);
    }
  };

  const headerConfig = {
    ...(routeConfig[pathname] || {
      title: "Page",
      showAddButton: false,
      addButtonText: "",
    }),
    onAddClick: handleAddClick,
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-[var(--color-sidebar-bg)] p-4">
        <div className="flex h-full w-full overflow-hidden rounded-3xl bg-[var(--color-background-gray)] shadow-sm">
          <div className="flex-shrink-0 p-4">
            <Sidebar />
          </div>

          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-shrink-0">
              <GlobalHeader {...headerConfig} showProfile />
            </div>

            <div className="flex-1 overflow-auto p-2">{children}</div>
          </div>
        </div>

        {/* Modals */}
        <AddFarmerModal
          isOpen={isAddFarmerModalOpen}
          onClose={() => setIsAddFarmerModalOpen(false)}
          onSubmit={handleAddFarmer}
        />

        <AddBarangayModal
          isOpen={isAddBarangayModalOpen}
          onClose={() => setIsAddBarangayModalOpen(false)}
          onSubmit={handleAddBarangay}
        />
      </div>
    </ProtectedRoute>
  );
}
