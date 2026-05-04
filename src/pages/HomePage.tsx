import React, { useState } from "react";
import AtomCanvas from "../features/AtomViewer/AtomCanvas";
import AtomDataSide from "../features/AtomData/AtomDataSide";
import BottomBar from "../components/BottomBar/BottomBar";
import { AtomDataProvider } from "../contexts/AtomDataContext";

/**
 * HomePage: viewer centered + side data + bottom bar
 */
const HomePage: React.FC = () => {
  const [protons, setProtons] = useState(1);
  const [neutrons, setNeutrons] = useState(0);
  const [electrons, setElectrons] = useState(1);


  return (
    <div className="app-shell">

      <main style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        <AtomDataProvider>
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
            />
          </div>
        <BottomBar />
        </AtomDataProvider>
      </main>

    </div >
  );
};

export default HomePage;
