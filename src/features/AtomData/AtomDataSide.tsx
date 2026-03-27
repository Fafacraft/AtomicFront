import React, { useEffect, useState } from "react";
import "./AtomDataSide.css";
import { useAtomData } from "../../contexts/AtomDataContext";
import RangeControl from "../../components/slider";
import AtomSymbol from "../../components/atomSymbol/AtomSymbol";
import AtomName from "../../components/atomName/AtomName";
import { env } from "../../config/env";

const AtomDataSide: React.FC = () => {
  const [electrons, setElectrons] = useState(1);
  const [onSimulate, setOnSimulate] = useState<() => void>();
  const [uiProtonText, setUiProtonText] = useState(1);
  const [uiNeutronText, setUiNeutronText] = useState(1);
  const [uiElectronText, setUiElectronText] = useState(1);
  const [stability, setStability] = useState<string>("—");
  const { proton, setProton, neutron, setNeutron, electron, setElectron } = useAtomData();

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
    const handler = setTimeout(async () => { setStability(await getStability(proton, neutron)); }, 300);
    return () => clearTimeout(handler);
  }, [proton, neutron]);

  const getStability = async (proton: number, neutron: number): Promise<string> => {
    const response = await fetch(env.backServiceUrl + "/api/atom/stability?proton=" + proton + "&neutron=" + neutron, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-service-token": env.backServiceToken,
      },
    });

    if (!response.ok) {
      const bodyText = await response.text();
      let errBody: any;
      try {
        errBody = bodyText ? JSON.parse(bodyText) : null;
      } catch {
        errBody = { message: bodyText || "Failed to get stability information" };
      }

      const message = errBody?.message || `Failed to get stability information (status ${response.status})`;
      const err: any = new Error(message);
      err.status = response.status;
      err.body = errBody;
      throw err;
    }

    const data = await response.json();
    return data.stability; // API returns { stability: "Stable" } or similar
  }


  return (
    <aside className="atom-side">
      <div className="atom-header">
        <div className="atom-title">
          <AtomSymbol
            proton={proton}
            neutron={neutron}
            electron={electron}
          />
          <AtomName
            proton={proton}
            neutron={neutron}
            electron={electron}
          />
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
            <button className="btn" onClick={() => onSimulate?.()}>
              Refresh
            </button>
            <button className="btn">Export</button>
          </div>
        </div>

        <hr className="separator" />

        <div className="computed-title">Computed</div>

        <div className="data-row">
          <div className="label">Half Life</div>
          <div className="value">{stability}</div>
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