import React from "react";
import "./chip.css";

const scentColorMap = {
  WOODSY: "#165834",
  FRESH: "#006fd6",
  CITRUS: "#de7c00",
  HERBAL: "#5a3714",
  RICH: "#e0a17e",
  SPICED: "#c10000",
};

const Chip = ({ label }) => {
  const color = scentColorMap[label] || "#9E9E9E";

  return (
    <div style={{ backgroundColor: color }} className="chip">
      {label}
    </div>
  );
};

export default Chip;
