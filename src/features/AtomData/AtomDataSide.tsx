import React from "react";
import "./AtomDataSide.css";


type Props = {
  protons: number;
  neutrons: number;
  electrons: number;
  setProtons: (n: number) => void;
  setNeutrons: (n: number) => void;
  setElectrons: (n: number) => void;
  onSimulate?: () => void;
};

const AtomDataSide: React.FC<Props> = ({
  protons,
  neutrons,
  electrons,
  setProtons,
  setNeutrons,
  setElectrons,
  onSimulate
}) => {
  return (
    <aside className="atom-side">
      <div className="atom-header">
        <div className="atom-title">Atom Data</div>
      </div>

      <div className="scroll">
        <div className="data-row">
          <div className="label">Protons</div>
          <div className="value">{protons}</div>
        </div>
        <div className="data-row">
          <div className="label">Neutrons</div>
          <div className="value">{neutrons}</div>
        </div>
        <div className="data-row">
          <div className="label">Electrons</div>
          <div className="value">{electrons}</div>
        </div>

        <div className="controls">
          <div className="control">
            <label>Protons: {protons}</label>
            <input
              type="range"
              min={0}
              max={118}
              value={protons}
              onChange={e => setProtons(parseInt(e.target.value))}
            />
          </div>

          <div className="control">
            <label>Neutrons: {neutrons}</label>
            <input
              type="range"
              min={0}
              max={200}
              value={neutrons}
              onChange={e => setNeutrons(parseInt(e.target.value))}
            />
          </div>

          <div className="control">
            <label>Electrons: {electrons}</label>
            <input
              type="range"
              min={0}
              max={118}
              value={electrons}
              onChange={e => setElectrons(parseInt(e.target.value))}
            />
          </div>

          <div className="control-buttons">
            <button className="btn" onClick={() => onSimulate?.()}>Refresh</button>
            <button className="btn">Export</button>
          </div>
        </div>

        <hr className="separator" />

        <div className="computed-title">Computed</div>

        <div className="data-row">
          <div className="label">Stability</div>
          <div className="value">—</div>
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
            This area will show calculated properties, electron shell helpers, and AI info.
            Scroll independently while the 3D view stays fixed.
          </div>
          <div className="notes-spacer" />
        </div>
      </div>
    </aside>
  );
};

export default AtomDataSide;
