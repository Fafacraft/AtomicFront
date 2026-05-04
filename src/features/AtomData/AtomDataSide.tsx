import React, { use, useEffect, useState } from "react";
import "./AtomDataSide.css";
import { useAtomData } from "../../contexts/AtomDataContext";
import RangeControl from "../../components/slider";
import AtomSymbol from "../../components/atomSymbol/AtomSymbol";
import { getStability, getStabilityColor } from "./AtomDataSideLogic";
import { useAuthData } from "../../contexts/AuthDataContext";
import { SaveAtom } from "./SaveAtom";
import atomNames from "../../engine/constants/atomNames";

const getAtomName = (proton: number, neutron: number, electron: number) => {
  return `${atomNames[proton]} ${proton + neutron} ${proton - electron !== 0 ? "ion" : ""}`;
}


const AtomDataSide: React.FC = () => {
  const [electrons, setElectrons] = useState(1);
  const [onSimulate, setOnSimulate] = useState<() => void>();
  const [uiProtonText, setUiProtonText] = useState(1);
  const [uiNeutronText, setUiNeutronText] = useState(1);
  const [uiElectronText, setUiElectronText] = useState(1);
  const [stability, setStability] = useState<string>("—");
  const [stabilityLoading, setStabilityLoading] = useState(false);
  const [stabilityColor, setStabilityColor] = useState("white");
  const { proton, setProton, neutron, setNeutron, electron, setElectron } = useAtomData();
  const {authOpen, setAuthOpen, signup, setSignup, user, setUser, isConnected, setIsConnected} = useAuthData();

  useEffect(() => {
    const handler = setTimeout(() => setProton(uiProtonText), 300);
    return () => clearTimeout(handler);
  }, [uiProtonText]);

  useEffect(() => {
    const handler = setTimeout(() => setNeutron(uiNeutronText), 300);
    return () => clearTimeout(handler);
  }, [uiNeutronText]);

  useEffect(() => {
    const handler = setTimeout(() => setElectron(uiElectronText), 300);
    return () => clearTimeout(handler);
  }, [uiElectronText]);

  useEffect(() => {
    setStabilityLoading(true);
    setStabilityColor("white");
    setStability("—");
    const handler = setTimeout(async () => { 
      setStability(await getStability(proton, neutron));
      setStabilityLoading(false);
    }, 300);
    return () => clearTimeout(handler);
  }, [proton, neutron]);

  useEffect(() => {
    setStabilityColor(getStabilityColor(stability));
  }, [stability]);

  return (
    <aside className="atom-side">
      <div className="atom-header">
        <div className="atom-title">
          <AtomSymbol
            proton={proton}
            neutron={neutron}
            electron={electron}
          />
          <div className="atom-name">
            {getAtomName(proton, neutron, electron)}
          </div>
        </div>
      </div>

      <div className="scroll">
        <div className="data-row">
          <div className="label">Protons</div>
          <div className="value">{uiProtonText}</div>
        </div>
        <div className="data-row">
          <div className="label">Neutrons</div>
          <div className="value">{uiNeutronText}</div>
        </div>
        <div className="data-row">
          <div className="label">Electrons</div>
          <div className="value">{uiElectronText}</div>
        </div>

        <div className="controls">
          <RangeControl
            id="protons"
            label="Protons"
            min={0}
            max={118}
            value={uiProtonText}
            onChange={setUiProtonText}
          />

          <RangeControl
            id="neutrons"
            label="Neutrons"
            min={0}
            max={118}
            value={uiNeutronText}
            onChange={setUiNeutronText}
          />

          <RangeControl
            id="electrons"
            label="Electrons"
            min={0}
            max={118}
            value={uiElectronText}
            onChange={setUiElectronText}
          />

          <div className="control-buttons">
            <button className="btn" onClick={() => {
              if (isConnected && sessionStorage.getItem("user")) {
                SaveAtom(JSON.parse(sessionStorage.getItem("user")), proton, neutron, electron, getAtomName(proton, neutron, electron)); // Call save function with user and atom data
              } else {
                setAuthOpen(true); // Open login/signup modal from AuthData context
              }
            }}>
              Save
            </button>
            <button className="btn">Ask AI</button>
          </div>
        </div>

        <hr className="separator" />

        <div className="computed-title">Computed</div>

        <div className="data-row">
          <div className="label">Half Life</div>
          <div className="value" style={{ color: stabilityColor}}>
            {stability}
          </div>
        </div>

        <div className="data-row">
          <div className="label">Ionization</div>
          <div className="value">—</div>
        </div>

        <div className="data-row">
          <div className="label">Electromagnetism</div>
          <div className="value">—</div>
        </div>

        <div className="notes">
          <div className="notes-title">Notes</div>
          <div className="notes-content">
            This area will show calculated properties, electron shell helpers,
            and AI info. Scroll independently while the 3D view stays fixed.
          </div>
          <div className="notes-spacer" />
        </div>
      </div>
    </aside>
  );
};

export default AtomDataSide;