import React from "react";

const BottomBar: React.FC = () => {
  return (
    <div className="bottom-bar">
      <div style={{ width: 400, display: "flex", justifyContent: "space-between" }}>
        <button className="btn primary">Save</button>
        <button className="btn">Reload</button>
        <button className="btn">Library</button>
      </div>
    </div>
  );
};

export default BottomBar;
