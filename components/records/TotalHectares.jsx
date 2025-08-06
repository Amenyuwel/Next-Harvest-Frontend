import React from "react";
import { farmersData } from "@/assets/dummydata";

const TotalHectares = () => {
  // Calculate total hectares from farmers data
  const totalHectares = farmersData.reduce((total, farmer) => {
    // Extract numeric value from area string (e.g., "1.1 ha" -> 1.1)
    const hectares = parseFloat(farmer.area.replace(" ha", ""));
    return total + hectares;
  }, 0);

  // Calculate hectares by crop type
  const riceHectares = farmersData
    .filter((farmer) => farmer.crop === "Rice")
    .reduce((total, farmer) => {
      const hectares = parseFloat(farmer.area.replace(" ha", ""));
      return total + hectares;
    }, 0);

  const cornHectares = farmersData
    .filter((farmer) => farmer.crop === "Corn")
    .reduce((total, farmer) => {
      const hectares = parseFloat(farmer.area.replace(" ha", ""));
      return total + hectares;
    }, 0);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
      {/* Main Total Display */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="mb-2 text-center">
          <p className="mb-1 text-4xl font-bold text-gray-900">
            {totalHectares.toFixed(1)}
          </p>
          <p className="text-sm text-gray-600">Total Hectares</p>
        </div>

        {/* Breakdown by Crop */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between rounded-lg p-2">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: "var(--color-rice)" }}
              ></div>
              <span className="text-sm font-medium text-[var(--color-text-description)]">
                Rice
              </span>
            </div>
            <span className="text-lg font-bold text-gray-900">
              {riceHectares.toFixed(1)} ha
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg p-2">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: "var(--color-corn)" }}
              ></div>
              <span className="text-sm font-medium text-[var(--color-text-description)]">
                Corn
              </span>
            </div>
            <span className="text-lg font-bold text-gray-900">
              {cornHectares.toFixed(1)} ha
            </span>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <footer className="mt-1 border-t border-gray-100 pt-3">
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900">
              {(totalHectares / farmersData.length).toFixed(1)}
            </p>
            <p className="text-xs text-gray-600">Avg. per Farmer</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TotalHectares;
