import React from "react";

const ProgressBar = ({ label, value, max }) => {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div style={{ width: "100%", marginBottom: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <span style={{ fontWeight: 600 }}>{label}</span>
        <span style={{ fontWeight: 600, color: "#000" }}>{value}t</span>
      </div>
      <div
        style={{
          background: "#e6ffe6",
          borderRadius: 20,
          height: 24,
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "#b6ec8a",
            width: `${percent}%`,
            height: "100%",
            borderRadius: 20,
            transition: "width 0.4s",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
