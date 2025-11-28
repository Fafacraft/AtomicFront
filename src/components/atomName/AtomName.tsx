import React from "react";
import atomSymbols from "../../engine/constants/atomSymbol";
import atomNames from "../../engine/constants/atomNames";
import "./AtomName.css";

const AtomName = ({ proton, neutron, electron }) => (
    <div className="atom-name">
        {atomNames[proton]} {proton + neutron} {proton - electron !== 0 ? "ion" : "" }
    </div>
);

export default AtomName;