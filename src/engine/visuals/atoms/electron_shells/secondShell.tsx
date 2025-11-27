import * as THREE from "three";
import { addSOrbitals } from "../electron_orbitals/SOrbitals";
import { addPOrbital } from "../electron_orbitals/POrbitals";

// Function to generate second electron shell (2s orbital)
function generateSecondShell(scene: THREE.Scene, electron: number, orbitalRadius: number, orbitalMat: THREE.Material) {
      const SOrbitalMat = orbitalMat.clone();
      const PxOrbitalMat = orbitalMat.clone();
      const PyOrbitalMat = orbitalMat.clone();
      const PzOrbitalMat = orbitalMat.clone();

      if (electron <= 2) {
        return;
      }
      
      // 2s Orbital
      if (electron >= 3) {
        SOrbitalMat.opacity = 0.1;
      } 
      if (electron >= 4) {
        SOrbitalMat.opacity = 0.2;
      }
      addSOrbitals(scene, orbitalRadius, SOrbitalMat);

      // 2p Orbitals
      if (electron >= 5) {
        if (electron >= 8) {
          PxOrbitalMat.opacity = 0.3;
        }
        addPOrbital(scene, orbitalRadius, PxOrbitalMat, new THREE.Vector3(1, 0, 0));
      }
      if (electron >= 6) {
        if (electron >= 9) {
          PyOrbitalMat.opacity = 0.3;
        }
        addPOrbital(scene, orbitalRadius, PyOrbitalMat, new THREE.Vector3(0, 1, 0));
      }
      if (electron >= 7) {
        if (electron >= 10) {
          PzOrbitalMat.opacity = 0.3;
        }
        addPOrbital(scene, orbitalRadius, PzOrbitalMat, new THREE.Vector3(0, 0, 1));
      }
      

    }
    
export { generateSecondShell };