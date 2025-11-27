import * as THREE from "three";
import { addSOrbitals } from "../electron_orbitals/SOrbitals";

// Function to generate second electron shell (2s orbital)
function generateSecondShell(scene: THREE.Scene, electron: number, orbitalRadius: number, orbitalMat: THREE.Material) {
      if (electron <= 2) {
        return;
      }
      if (electron == 3) {
        orbitalMat.opacity = 0.1;
      } else if (electron > 3) {
        orbitalMat.opacity = 0.2;
      }

      

      // 2s Orbital
      addSOrbitals(scene, orbitalRadius, orbitalMat);
    }
    
export { generateSecondShell };