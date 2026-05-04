import { AtomLoaderModalItem } from "./AtomLoaderModalItem";
import "./AtomLoaderModal.css";
import React from "react";

export const AtomLoaderModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    if (!open) return null;
    return (
        <div className="atom-modal-overlay" onClick={() => onClose()}>
            <div className="atom-modal" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="atom-modal-header">
                    <h2>Your Atoms</h2>
                    <button className="close-btn">✕</button>
                </div>

                {/* Grid */}
                <div className="atom-grid">
                    {[...Array(12)].map((_, i) => (
                        <AtomLoaderModalItem key={i} id={i} name={`Atom ${i + 1}`} proton={1} neutron={0} electron={1} />
                    ))}
                </div>

            </div>
        </div>
    );
};