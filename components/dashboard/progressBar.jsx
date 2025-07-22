import React from "react";

const ProgressBar = ({ label, value, max }) => {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div
      className="w-full mb-4"
      role="group"
      aria-labelledby={label ? `progress-label-${label}` : undefined}
    >
      {label && (
        <div className="flex justify-between mb-2">
          <label
            id={`progress-label-${label}`}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
          <span
            className="text-sm font-semibold text-[var(--color-text-primary)]"
            aria-label={`${value} tons out of ${max} tons`}
          >
            {value}t
          </span>
        </div>
      )}
      <div
        className="bg-[var(--color-progress-bg)] rounded-[20px] h-[34px] w-full overflow-hidden"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuetext={`${value} tons of ${max} tons (${Math.round(
          percent
        )}%)`}
      >
        <div
          className="bg-[var(--color-progress-fill)] h-full rounded-[20px] transition-[width] duration-[400ms]"
          style={{ width: `${percent}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default ProgressBar;
