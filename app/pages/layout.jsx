"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import GlobalHeader from "@/components/GlobalHeader";
import routeConfig from "@/app/config/routeConfig";
import AddFarmerModal from "@/components/records/AddFarmerModal";
import AddBarangayModal from "@/components/reports/AddBarangayModal";

export default function PagesLayout({ children }) {
  const pathname = usePathname();
  const [isAddFarmerModalOpen, setIsAddFarmerModalOpen] = useState(false);
  const [isAddBarangayModalOpen, setIsAddBarangayModalOpen] = useState(false); // <-- Add this

  // Add handler for barangay modal
  const handleAddBarangay = (data) => {
    // handle barangay submission here (e.g., API call)
    setIsAddBarangayModalOpen(false);
  };

  const handleAddClick = () => {
    if (pathname === "/pages/dashboard" || pathname === "/pages/records") {
      setIsAddFarmerModalOpen(true);
    }
    if (pathname === "/pages/reports") {
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

      {/* Modal */}
      <AddFarmerModal
        isOpen={isAddFarmerModalOpen}
        onClose={() => setIsAddFarmerModalOpen(false)}
      />

      <AddBarangayModal
        isOpen={isAddBarangayModalOpen}
        onClose={() => setIsAddBarangayModalOpen(false)}
        onSubmit={handleAddBarangay}
      />
    </div>
  );
}
