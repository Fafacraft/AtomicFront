import React from "react";

export const AtomLoaderModalItem = ({ id, name, proton, neutron, electron }: { id: number; name: string; proton: number; neutron: number; electron: number }) => {
    return (
        <div className="atom-card" key={id}>

        <div className="atom-card-header">
            <span className="atom-name">{name}</span>
            <button className="delete-btn">🗑</button>
        </div>

        <div className="atom-stats">
            <div className="stat proton">P: {proton}</div>
            <div className="stat neutron">N: {neutron}</div>
            <div className="stat electron">E: {electron}</div>
        </div>

    </div>)
}