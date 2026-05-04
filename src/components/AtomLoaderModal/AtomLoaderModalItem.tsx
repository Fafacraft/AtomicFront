import React from "react";
import { deleteAtom } from "./AtomLoaderModalLogic";
import { useAtomData } from "../../contexts/AtomDataContext";

export const AtomLoaderModalItem = ({ id, name, proton, neutron, electron, onRefresh, onClose }: { id: number; name: string; proton: number; neutron: number; electron: number; onRefresh: () => void; onClose: () => void }) => {
    const { setProton, setNeutron, setElectron } = useAtomData();

    const updateSelected = () => {
        setProton(proton);
        setNeutron(neutron);
        setElectron(electron);
        onClose(); // Close modal after selecting
    }

    return (
        <div className="atom-card" key={id} onClick={() => updateSelected()}>

            <div className="atom-card-header">
                <span className="atom-name">{name}</span>
                <button className="delete-btn" onClick={async (e) => {
                    e.stopPropagation(); // Prevent card click
                    await deleteAtom(id);
                    onRefresh(); // Trigger refresh in parent
                }}>🗑</button>
            </div>

            <div className="atom-stats">
                <div className="stat proton">P: {proton}</div>
                <div className="stat neutron">N: {neutron}</div>
                <div className="stat electron">E: {electron}</div>
            </div>

        </div>)
}