import React from "react";
import { AtomLoaderModal } from "../AtomLoaderModal/AtomLoaderModal";
import { useAuthData } from "../../contexts/AuthDataContext";

const BottomBar: React.FC = () => {
  const [AtomLoaderModalOpen, setAtomLoaderModalOpen] = React.useState(false);

  const { setAuthOpen, isConnected } = useAuthData();

  return (
    <div className="bottom-bar">
      <div style={{ width: 400, display: "flex", justifyContent: "space-between" }}>
        <button className="btn primary" onClick={() => {
          if (isConnected && sessionStorage.getItem("user")) {
            setAtomLoaderModalOpen(true)
          } else {
            setAuthOpen(true);
          }
        }}>
          Atom Library
        </button>
      <AtomLoaderModal open={AtomLoaderModalOpen} onClose={() => setAtomLoaderModalOpen(false)} />
    </div>
    </div >
  );
};

export default BottomBar;
