import React from "react";

const ToggleBtn = ({ label, active, onClick }) => (
  <div
    className={`viewport-toggle small-toggle ${active ? "active" : ""}`}
    onClick={onClick}
  >
    {label}
  </div>
);

export default ToggleBtn;