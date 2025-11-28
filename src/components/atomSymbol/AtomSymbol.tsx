import React from "react";
import atomSymbols from "../../engine/constants/atomSymbol";
import "./AtomSymbol.css";

const AtomSymbol = ({ proton, neutron, electron }) => (
    <div className="atom-symbol">
        <div className="atom-symbol-left">
            <div className="atom-symbol-mass">
                {proton + neutron}
            </div>
            <div className="atom-symbol-proton">
                {proton}
            </div>
        </div>
        <div className="atom-symbol-center">
            <div className="atom-symbol-letters">
                {atomSymbols[proton] ? atomSymbols[proton] : "?"}
            </div>
        </div>
        <div className="atom-symbol-right"
            style= {
                proton === electron ? {} : { color: electron > proton ? "#2754dcff" : "#f44336" }
            }
        >
            {(electron - proton) !== 0 && (
                <div className="atom-symbol-charge">
                    {Math.abs(electron - proton)}
                    {electron - proton > 0 ? "-" : "+"}
                </div>
            )}
        </div>
    </div>
);

export default AtomSymbol;