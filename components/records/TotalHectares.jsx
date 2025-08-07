import React, { useState, useEffect } from "react";

const TotalHectares = ({ farmers = [], loading = false }) => {
  const [crops, setCrops] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Fetch crops for name lookup
  useEffect(() => {
    fetchCrops();
  }, []);

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

  // Helper function to get crop name from ID
  const getCropName = (cropId) => {
    const crop = crops.find((c) => c.cropId === cropId);
    return crop
      ? crop.cropName.charAt(0).toUpperCase() +
          crop.cropName.slice(1).toLowerCase()
      : cropId;
  };

  // Calculate total hectares from farmers data
  const totalHectares = farmers.reduce((total, farmer) => {
    const hectares = parseFloat(farmer.area) || 0;
    return total + hectares;
  }, 0);

  // Calculate hectares by crop type
  const riceHectares = farmers
    .filter((farmer) => {
      const cropName = getCropName(farmer.crop);
      return cropName.toLowerCase().includes("rice");
    })
    .reduce((total, farmer) => {
      const hectares = parseFloat(farmer.area) || 0;
      return total + hectares;
    }, 0);

  const cornHectares = farmers
    .filter((farmer) => {
      const cropName = getCropName(farmer.crop);
      return cropName.toLowerCase().includes("corn");
    })
    .reduce((total, farmer) => {
      const hectares = parseFloat(farmer.area) || 0;
      return total + hectares;
    }, 0);

  // Calculate average per farmer
  const averagePerFarmer =
    farmers.length > 0 ? totalHectares / farmers.length : 0;

  // Count farmers by crop type
  const riceFarmersCount = farmers.filter((farmer) => {
    const cropName = getCropName(farmer.crop);
    return cropName.toLowerCase().includes("rice");
  }).length;

  const cornFarmersCount = farmers.filter((farmer) => {
    const cropName = getCropName(farmer.crop);
    return cropName.toLowerCase().includes("corn");
  }).length;

  if (loading) {
    return (
      <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
        <div className="flex flex-1 items-center justify-center">
          <div className="text-gray-500">Loading hectares data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
      {/* Header */}
      <div className="mb-3 text-center">
        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
          Total Hectares
        </h3>
      </div>

      {/* Main Total Display */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="mb-4 text-center">
          <p className="mb-1 text-4xl font-bold text-gray-900">
            {totalHectares.toFixed(1)}
          </p>
          <p className="text-sm text-gray-600">Total Hectares</p>
        </div>

        {/* Breakdown by Crop */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: "var(--color-rice)" }}
              ></div>
              <div>
                <span className="text-sm font-medium text-[var(--color-text-description)]">
                  Rice
                </span>
              </div>
            </div>
            <span className="text-lg font-bold text-gray-900">
              {riceHectares.toFixed(1)} ha
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-yellow-50 p-3">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: "var(--color-corn)" }}
              ></div>
              <div>
                <span className="text-sm font-medium text-[var(--color-text-description)]">
                  Corn
                </span>
              </div>
            </div>
            <span className="text-lg font-bold text-gray-900">
              {cornHectares.toFixed(1)} ha
            </span>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <footer className="mt-2 border-t border-gray-300 pt-3">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">
              {averagePerFarmer.toFixed(1)}
            </p>
            <p className="text-xs text-gray-600">Avg. per Farmer</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TotalHectares;
