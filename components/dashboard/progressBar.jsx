import React from "react";

const ProgressBar = ({ label, value, max }) => {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-semibold">{label}</span>
        <span className="font-semibold text-[var(--color-text-primary)]">
          {value}t
        </span>
      </div>
      <div className="bg-[var(--color-progress-bg)] rounded-[20px] h-[34px] w-full overflow-hidden">
        <div
          className="bg-[var(--color-progress-fill)] h-full rounded-[20px] transition-[width] duration-[400ms]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
