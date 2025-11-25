import React, { useRef, useEffect } from "react";
import "./AtomCanvas.css";


/**
 * Minimal placeholder for the Three.js canvas.
 * Later you'll replace the internal code with your initScene / renderer.
 */
const AtomCanvas: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Placeholder background / demo glow so it doesn't look empty before Three.js
    const el = ref.current;
    if (!el) return;
    el.style.background = "radial-gradient(circle at 35% 30%, rgba(140,100,255,0.08), transparent 15%), radial-gradient(circle at 70% 70%, rgba(70,120,255,0.06), transparent 20%)";
    el.style.width = "100%";
    el.style.height = "100%";
  }, []);

  return (
    <div className="viewer">
      {/* Put the canvas element inside when you integrate Three.js */}
      <div ref={ref} style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", color: "var(--muted-200)" }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: "var(--accent-300)" }}>Atom Viewer</div>
          <div style={{ marginTop: 8, fontSize: 13 }}>Three.js canvas placeholder</div>
        </div>
      </div>
    </div>
  );
};

export default AtomCanvas;
