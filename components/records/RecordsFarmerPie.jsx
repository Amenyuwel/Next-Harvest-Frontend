import React from "react";

const RecordsFarmerPie = () => {
  const statsData = [
    { crop: "Rice", value: 35, color: "#10b981", lightColor: "#f0fdf4" },
    { crop: "Corn", value: 40, color: "#f59e0b", lightColor: "#fffbeb" },
  ];

  const totalValue = statsData.reduce((sum, item) => sum + item.value, 0);
  const radius = 120;
  const centerX = 200;
  const centerY = 150;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            Crop Distribution
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Farmer statistics by crop type
          </p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="relative mb-8 flex flex-1 justify-center">
        <svg
          width="400"
          height="300"
          viewBox="0 0 400 300"
          className="overflow-visible"
        >
          <defs>
            {statsData.map((item, index) => (
              <linearGradient
                key={index}
                id={`pieGradient${index + 1}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: item.color, stopOpacity: 0.9 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: item.color, stopOpacity: 0.7 }}
                />
              </linearGradient>
            ))}
          </defs>

          {/* Pie Slices */}
          {statsData.map((item, index) => {
            let startAngle = 0;
            for (let i = 0; i < index; i++) {
              startAngle += (statsData[i].value / totalValue) * 360;
            }
            const endAngle = startAngle + (item.value / totalValue) * 360;
            const midAngle = (startAngle + endAngle) / 2;

            // Convert to radians
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;
            const midRad = (midAngle * Math.PI) / 180;

            // Calculate arc path
            const x1 = centerX + radius * Math.cos(startRad);
            const y1 = centerY + radius * Math.sin(startRad);
            const x2 = centerX + radius * Math.cos(endRad);
            const y2 = centerY + radius * Math.sin(endRad);

            const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

            const pathData = [
              `M ${centerX} ${centerY}`,
              `L ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              "Z",
            ].join(" ");

            // Label position
            const labelRadius = radius + 30;
            const labelX = centerX + labelRadius * Math.cos(midRad);
            const labelY = centerY + labelRadius * Math.sin(midRad);

            const percentage = ((item.value / totalValue) * 100).toFixed(1);

            return (
              <g key={index} className="group cursor-pointer">
                {/* Pie slice */}
                <path
                  d={pathData}
                  fill={`url(#pieGradient${index + 1})`}
                  stroke="white"
                  strokeWidth="3"
                  className="origin-center transition-all duration-300 hover:scale-105"
                  style={{ transformOrigin: `${centerX}px ${centerY}px` }}
                />

                {/* Value label */}
                <text
                  x={centerX + radius * 0.7 * Math.cos(midRad)}
                  y={centerY + radius * 0.7 * Math.sin(midRad)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-white text-sm font-bold"
                >
                  {item.value}
                </text>

                {/* Percentage label outside */}
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-gray-600 text-xs font-medium"
                >
                  {percentage}%
                </text>

                {/* Crop name */}
                <text
                  x={labelX}
                  y={labelY + 15}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-sm font-semibold"
                  fill={item.color}
                >
                  {item.crop}
                </text>
              </g>
            );
          })}

          {/* Center circle for donut effect (optional) */}
          <circle
            cx={centerX}
            cy={centerY}
            r="40"
            fill="white"
            stroke="#e5e7eb"
            strokeWidth="2"
          />

          {/* Total in center */}
          <text
            x={centerX}
            y={centerY - 5}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-gray-900 text-lg font-bold"
          >
            {totalValue}
          </text>
          <text
            x={centerX}
            y={centerY + 12}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-gray-500 text-xs"
          >
            Total
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="mb-6 flex flex-wrap justify-center gap-6">
        {statsData.map((item, index) => {
          const percentage = ((item.value / totalValue) * 100).toFixed(1);
          return (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded-sm"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm font-medium text-gray-700">
                {item.crop}
              </span>
              <span className="text-sm text-gray-500">
                ({item.value} - {percentage}%)
              </span>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="border-t border-gray-100 pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{totalValue}</p>
            <p className="text-xs text-gray-600">Total Farmers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {statsData.length}
            </p>
            <p className="text-xs text-gray-600">Crop Types</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordsFarmerPie;
