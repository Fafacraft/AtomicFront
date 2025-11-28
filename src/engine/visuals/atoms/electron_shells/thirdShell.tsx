import * as THREE from "three";
import { addSOrbitals } from "../electron_orbitals/SOrbitals";
import { addPOrbital } from "../electron_orbitals/POrbitals";

// Function to generate third electron shell
function generateThirdShell(scene: THREE.Scene, electron: number, orbitalRadius: number, orbitalMat: THREE.Material) {
      const SOrbitalMat = orbitalMat.clone();
      const PxOrbitalMat = orbitalMat.clone();
      const PyOrbitalMat = orbitalMat.clone();
      const PzOrbitalMat = orbitalMat.clone();

      if (electron <= 10) {
        return;
      }
      
      // 3s Orbital
      if (electron >= 11) {
        SOrbitalMat.opacity = 0.1;
      } 
      if (electron >= 12) {
        SOrbitalMat.opacity = 0.2;
      }
      addSOrbitals(scene, orbitalRadius, SOrbitalMat);

      // 3p Orbitals
      if (electron >= 13) {
        if (electron >= 16) {
          PxOrbitalMat.opacity = 0.3;
        }
        addPOrbital(scene, orbitalRadius, PxOrbitalMat, new THREE.Vector3(0, 1, 0));
      }
      if (electron >= 14) {
        if (electron >= 17) {
          PyOrbitalMat.opacity = 0.3;
        }
        addPOrbital(scene, orbitalRadius, PyOrbitalMat, new THREE.Vector3(0, 0, 1));
      }
      if (electron >= 15) {
        if (electron >= 18) {
          PzOrbitalMat.opacity = 0.3;
        }
        addPOrbital(scene, orbitalRadius, PzOrbitalMat, new THREE.Vector3(1, 0, 0));
      }
      

    }
    
export { generateThirdShell };