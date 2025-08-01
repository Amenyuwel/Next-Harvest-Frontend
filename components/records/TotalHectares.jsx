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
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
      {/* Main Total Display */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="mb-8 text-center">
          <p className="mb-2 text-5xl font-bold text-gray-900">
            {totalHectares.toFixed(1)}
          </p>
          <p className="text-lg text-gray-600">Total Hectares</p>
        </div>

        {/* Breakdown by Crop */}
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div
                className="h-4 w-4 rounded-sm"
                style={{ backgroundColor: "var(--color-rice)" }}
              ></div>
              <span className="font-medium text-[var(--color-text-description)]">
                Rice
              </span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              {riceHectares.toFixed(1)} ha
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div
                className="h-4 w-4 rounded-sm"
                style={{ backgroundColor: "var(--color-corn)" }}
              ></div>
              <span className="font-medium text-[var(--color-text-description)]">
                Corn
              </span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              {cornHectares.toFixed(1)} ha
            </span>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <footer className="mt-6 border-t border-gray-100 pt-6">
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
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
