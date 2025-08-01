import React, { useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Sector, Cell } from "recharts";

const statsData = [
  { name: "Rice", value: 35, color: "#10b981" },
  { name: "Corn", value: 40, color: "#f59e0b" },
];

const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
}) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * (midAngle ?? 1));
  const cos = Math.cos(-RADIAN * (midAngle ?? 1));
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${payload.name} ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${((percent ?? 1) * 100).toFixed(1)}%)`}
      </text>
    </g>
  );
};

const RecordsFarmerPie = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalValue = statsData.reduce((sum, item) => sum + item.value, 0);

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
      <div
        className="relative mb-8 flex flex-1 justify-center"
        style={{ minHeight: 300 }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={statsData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
              onMouseEnter={(_, idx) => setActiveIndex(idx)}
              isAnimationActive={false}
            >
              {statsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
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
                {item.name}
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
