import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const RecordsFarmerTable = ({
  farmers,
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  riceFarmers,
  cornFarmers,
  loading = false,
}) => {
  const tabs = ["All", "Monthly", "Weekly", "Today"];
  const [barangays, setBarangays] = useState([]);
  const [crops, setCrops] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Fetch barangays and crops for name lookup
  useEffect(() => {
    fetchBarangays();
    fetchCrops();
  }, []);

  const fetchBarangays = async () => {
    try {
      const response = await fetch(`${API_URL}/api/barangays`);
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setBarangays(result.data);
        }
      }
    } catch (error) {
      console.error("Error fetching barangays:", error);
    }
  };

  const fetchCrops = async () => {
    try {
      const response = await fetch(`${API_URL}/api/crops`);
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setCrops(result.data);
        }
      }
    } catch (error) {
      console.error("Error fetching crops:", error);
    }
  };

  // Helper functions to get names from IDs
  const getBarangayName = (barangayId) => {
    const barangay = barangays.find((b) => b.barangayId === barangayId);
    return barangay ? barangay.barangayName : barangayId;
  };

  const getCropName = (cropId) => {
    const crop = crops.find((c) => c.cropId === cropId);
    return crop
      ? crop.cropName.charAt(0).toUpperCase() +
          crop.cropName.slice(1).toLowerCase()
      : cropId;
  };

  // Format contact number to display as +63 format
  const formatContact = (contact) => {
    if (!contact) return "";

    // Remove any non-digit characters
    const digits = contact.replace(/\D/g, "");

    // If it's already in the right format with 63 prefix
    if (digits.startsWith("63") && digits.length === 12) {
      const number = digits.slice(2); // Remove '63'
      return `+63 ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
    }

    // If it's a 10-digit number (without country code)
    if (digits.length === 10 && digits.startsWith("9")) {
      return `+63 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    }

    // If it's 11 digits starting with 09
    if (digits.length === 11 && digits.startsWith("09")) {
      const number = digits.slice(1); // Remove the '0'
      return `+63 ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
    }

    // Return as-is if format is unclear
    return contact;
  };

  // Filter farmers based on date and active tab
  const getFilteredFarmers = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate(),
    );

    let filteredFarmers = [...farmers];

    // Filter by date based on active tab
    switch (activeTab) {
      case "Today":
        filteredFarmers = farmers.filter((farmer) => {
          const farmerDate = new Date(farmer.createdAt);
          return farmerDate >= today;
        });
        break;

      case "Weekly":
        filteredFarmers = farmers.filter((farmer) => {
          const farmerDate = new Date(farmer.createdAt);
          return farmerDate >= oneWeekAgo;
        });
        break;

      case "Monthly":
        filteredFarmers = farmers.filter((farmer) => {
          const farmerDate = new Date(farmer.createdAt);
          return farmerDate >= oneMonthAgo;
        });
        break;

      case "All":
      default:
        // No date filter for "All"
        break;
    }

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredFarmers = filteredFarmers.filter((farmer) => {
        const fullName =
          farmer.fullName ||
          farmer.name ||
          `${farmer.firstName} ${farmer.lastName}`;
        const barangayName = getBarangayName(farmer.barangay);
        const cropName = getCropName(farmer.crop);

        return (
          fullName?.toLowerCase().includes(searchLower) ||
          farmer.firstName?.toLowerCase().includes(searchLower) ||
          farmer.lastName?.toLowerCase().includes(searchLower) ||
          farmer.rsbsaNumber?.toLowerCase().includes(searchLower) ||
          cropName?.toLowerCase().includes(searchLower) ||
          barangayName?.toLowerCase().includes(searchLower) ||
          farmer.contact?.includes(searchTerm)
        );
      });
    }

    // Sort by creation date (newest first)
    return filteredFarmers.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return dateB - dateA; // Newest first
    });
  };

  const filteredAndSortedFarmers = getFilteredFarmers();

  // Get tab counts
  const getTabCounts = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate(),
    );

    const todayCount = farmers.filter((farmer) => {
      const farmerDate = new Date(farmer.createdAt);
      return farmerDate >= today;
    }).length;

    const weeklyCount = farmers.filter((farmer) => {
      const farmerDate = new Date(farmer.createdAt);
      return farmerDate >= oneWeekAgo;
    }).length;

    const monthlyCount = farmers.filter((farmer) => {
      const farmerDate = new Date(farmer.createdAt);
      return farmerDate >= oneMonthAgo;
    }).length;

    return {
      All: farmers.length,
      Monthly: monthlyCount,
      Weekly: weeklyCount,
      Today: todayCount,
    };
  };

  const tabCounts = getTabCounts();

  if (loading) {
    return (
      <div className="flex h-full w-full flex-col rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-center p-8">
          <div className="text-gray-500">Loading farmers...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
          Farmer Records Table
        </h2>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search farmer"
              className="w-72 rounded-lg border border-gray-200 py-2.5 pr-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute top-3 left-3 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 text-sm font-medium transition ${
                activeTab === tab
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab}
              <span className="ml-1 text-xs opacity-60">
                ({tabCounts[tab]})
              </span>
              {activeTab === tab && (
                <div className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-blue-500"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="scrollbar-hide flex-1 overflow-y-auto rounded-b-2xl">
        <table className="w-full table-auto">
          <thead className="sticky top-0 z-10 bg-gray-50/70">
            <tr className="text-left text-xs font-semibold tracking-wider text-[var(--color-text-primary)] uppercase">
              <th className="px-6 py-4">RSBSA Number</th>
              <th className="px-4 py-4">Full Name</th>
              <th className="px-4 py-4">Crop</th>
              <th className="px-4 py-4">Area</th>
              <th className="px-4 py-4">Barangay</th>
              <th className="px-4 py-4">Contact</th>
              <th className="px-4 py-4">Date Added</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filteredAndSortedFarmers.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                  {searchTerm
                    ? `No farmers found matching "${searchTerm}"`
                    : `No farmers found for ${activeTab.toLowerCase()}`}
                </td>
              </tr>
            ) : (
              filteredAndSortedFarmers.map((farmer, index) => (
                <tr
                  key={farmer._id || index}
                  className="transition-colors duration-150 hover:bg-gray-50/50"
                >
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className="text-sm font-medium text-[var(--color-text-description)]">
                      {farmer.rsbsaNumber || farmer.rsbsa}
                    </span>
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    <span className="text-sm font-medium text-[var(--color-text-description)]">
                      {farmer.fullName ||
                        farmer.name ||
                        `${farmer.firstName} ${farmer.lastName}`}
                    </span>
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    <span className="text-sm font-medium text-[var(--color-text-description)]">
                      {getCropName(farmer.crop)}
                    </span>
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    <span className="text-sm font-medium text-[var(--color-text-description)]">
                      {farmer.area} ha
                    </span>
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    <span className="text-sm font-medium text-[var(--color-text-description)]">
                      {getBarangayName(farmer.barangay)}
                    </span>
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    <span className="text-sm font-medium text-[var(--color-text-description)]">
                      {formatContact(farmer.contact)}
                    </span>
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    <span className="text-sm font-medium text-[var(--color-text-description)]">
                      {farmer.createdAt
                        ? new Date(farmer.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )
                        : "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition hover:bg-gray-200">
                        <Icon icon="mdi:pencil" width="16" height="16" />
                      </button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 transition hover:bg-red-200">
                        <Icon
                          icon="mdi:delete-outline"
                          width="16"
                          height="16"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecordsFarmerTable;
