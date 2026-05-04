import { AtomLoaderModalItem } from "./AtomLoaderModalItem";
import "./AtomLoaderModal.css";
import React, { useEffect, useState } from "react";
import { GetAllAtomsForUser } from "./AtomLoaderModalLogic";



export const AtomLoaderModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    if (!open) return null;

    const [allAtomData, setAllAtomData] = useState<any[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);

    // Load atoms when modal opens, from backend
    useEffect(() => {
        if (!open) return;

        const load = async () => {
            const user = JSON.parse(sessionStorage.getItem("user") || "null");
            if (!user) return;

            const data = await GetAllAtomsForUser(user);
            setAllAtomData(data);
        };

        load();
    }, [open, refreshKey]);

    return (
        <div className="atom-modal-overlay" onClick={() => onClose()}>
            <div className="atom-modal" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="atom-modal-header">
                    <h2>Your Atoms</h2>
                </div>

                {/* Grid */}
                <div className="atom-grid">
                    {allAtomData.map((atom, index) => (
                        <AtomLoaderModalItem
                            key={index}
                            id={atom.Atom_Id}
                            name={atom.Atom_name ?? "Unnamed Atom"}
                            proton={atom.Atom_proton}
                            neutron={atom.Atom_neutron}
                            electron={atom.Atom_electron}
                            onRefresh={() => setRefreshKey((prev) => prev + 1)}
                            onClose={() => onClose()} />
                    ))}
                </div>

            </div>
        </div>
    );
};