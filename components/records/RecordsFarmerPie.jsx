import React, { useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Sector, Cell } from "recharts";

const statsData = [
  { name: "Rice", value: 35, color: "var(--color-rice)" },
  { name: "Corn", value: 40, color: "var(--color-corn)" },
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
      {/* Center text showing hovered item details */}
      <text
        x={cx}
        y={cy}
        dy={-10}
        textAnchor="middle"
        fill="#333"
        fontSize="24"
        fontWeight="bold"
      >
        {value}
      </text>
      <text x={cx} y={cy} dy={10} textAnchor="middle" fill="#666" fontSize="14">
        {payload.name}
      </text>
      <text x={cx} y={cy} dy={25} textAnchor="middle" fill="#999" fontSize="12">
        {`${((percent ?? 1) * 100).toFixed(1)}%`}
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
  const [activeIndex, setActiveIndex] = useState(null);
  const totalValue = statsData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex h-[370px] flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-center">
        <header>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
            Crop Distribution
          </h2>
        </header>
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
              activeShape={activeIndex !== null ? renderActiveShape : undefined}
              data={statsData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
              onMouseEnter={(_, idx) => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
              isAnimationActive={false}
            >
              {statsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {activeIndex === null && (
              <text
                x="50%"
                y="50%"
                dy={-5}
                textAnchor="middle"
                fill="#333"
                fontSize="28"
                fontWeight="bold"
              >
                {totalValue}
              </text>
            )}
            {activeIndex === null && (
              <text
                x="50%"
                y="50%"
                dy={20}
                textAnchor="middle"
                fill="#666"
                fontSize="14"
              >
                Total Farmers
              </text>
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RecordsFarmerPie;
