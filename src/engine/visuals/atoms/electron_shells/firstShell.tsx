import * as THREE from "three";
import { add } from "three/tsl";
import { addSOrbitals } from "../electron_orbitals/SOrbitals";

// Function to generate first electron shell (1s orbital)
function generateFirstShell(scene: THREE.Scene, electron: number, orbitalRadius: number, orbitalMat: THREE.Material, shellVisibility: Record<number, boolean>, subVisibility: Record<string, boolean>) {
  if (electron <= 0) {
    return;
  } else if (electron == 1) {
    orbitalMat.opacity = 0.1;
  } else {
    orbitalMat.opacity = 0.2;
  }

  if (subVisibility["s"] && shellVisibility[1]) {
    // 1s Orbital
    addSOrbitals(scene, orbitalRadius, orbitalMat);
  }
}

export { generateFirstShell };