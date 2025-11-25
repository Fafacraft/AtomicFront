import React, { useState } from "react";
import AtomCanvas from "../features/AtomViewer/AtomCanvas";
import AtomDataSide from "../features/AtomData/AtomDataSide";
import BottomBar from "../components/BottomBar/BottomBar";

/**
 * HomePage: viewer centered + side data + bottom bar
 */
const HomePage: React.FC = () => {
  const [protons, setProtons] = useState(1);
  const [neutrons, setNeutrons] = useState(0);
  const [electrons, setElectrons] = useState(1);

  const handleSimulate = () => {
    // placeholder - will call your backend or wasm simulation later
    console.log("Simulate atom", { protons, neutrons, electrons });
    // e.g. fetch('/api/simulate', { method: 'POST', body: JSON.stringify({...})})
  };

  return (
    <div className="app-shell">

      <main style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        <div className="main-area">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <AtomCanvas />
          </div>

          <AtomDataSide
            protons={protons}
            neutrons={neutrons}
            electrons={electrons}
            setProtons={setProtons}
            setNeutrons={setNeutrons}
            setElectrons={setElectrons}
            onSimulate={handleSimulate}
          />
        </div>
      <BottomBar />
      </main>

    </div>
  );
};

export default HomePage;
