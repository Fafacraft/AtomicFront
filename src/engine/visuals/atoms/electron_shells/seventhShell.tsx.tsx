import * as THREE from "three";
import { add } from "three/tsl";
import { addSOrbitals } from "../electron_orbitals/SOrbitals";
import { addFOrbitals } from "../electron_orbitals/Forbitals";
import { addDOrbitals } from "../electron_orbitals/Dorbitals";
import { addPOrbital } from "../electron_orbitals/POrbitals";


// Function to generate seventh electron shel
function generateSeventhShell(scene: THREE.Scene, electron: number, orbitalRadius: number, orbitalMat: THREE.Material, shellVisibility: Record<number, boolean>, subVisibility: Record<string, boolean>) {
    const SOrbitalMat = orbitalMat.clone();
    const F0OrbitalMat = orbitalMat.clone();
    const F1OrbitalMat = orbitalMat.clone();
    const F2OrbitalMat = orbitalMat.clone();
    const F3OrbitalMat = orbitalMat.clone();
    const F4OrbitalMat = orbitalMat.clone();
    const F5OrbitalMat = orbitalMat.clone();
    const F6OrbitalMat = orbitalMat.clone();
    const D0OrbitalMat = orbitalMat.clone();
    const D1OrbitalMat = orbitalMat.clone();
    const D2OrbitalMat = orbitalMat.clone();
    const D3OrbitalMat = orbitalMat.clone();
    const D4OrbitalMat = orbitalMat.clone();
    const PxOrbitalMat = orbitalMat.clone();
    const PyOrbitalMat = orbitalMat.clone();
    const PzOrbitalMat = orbitalMat.clone();
  
    if (electron <= 86) {
        return;
    }

    // 7s shell
    if (shellVisibility[6] && subVisibility["s"]) {
        if (electron >= 87) {
            if (electron >= 88) {
                SOrbitalMat.opacity = 0.3;
            }
            if (electron === 110) { // 7s goes to fill 6d first
                SOrbitalMat.opacity = 0.1
            }
            addSOrbitals(scene, orbitalRadius, SOrbitalMat);
        }
    }

    // 5f shells
    if (shellVisibility[4] && subVisibility["f"]) {
        if (electron >= 91) {
            if (electron >= 97) {
                F0OrbitalMat.opacity = 0.3;
            }
            addFOrbitals(scene, orbitalRadius, F0OrbitalMat, 0);
        }
        if (electron >=91) {
            if (electron >= 97) {
                F1OrbitalMat.opacity = 0.3
            }
            addFOrbitals(scene, orbitalRadius, F1OrbitalMat, 1);
        }
        if (electron >=92) {
            if (electron >= 98) {
                F2OrbitalMat.opacity = 0.3
            }
            addFOrbitals(scene, orbitalRadius, F2OrbitalMat, 2);
        }
        if (electron >=93) {
            if (electron >= 99) {
                F3OrbitalMat.opacity = 0.3
            }
            addFOrbitals(scene, orbitalRadius, F3OrbitalMat, 3);
        }
        if (electron >=94) {
            if (electron >= 100) {
                F4OrbitalMat.opacity = 0.3
            }
            addFOrbitals(scene, orbitalRadius, F4OrbitalMat, 4);
        }
        if (electron >=94) {
            if (electron >= 101) {
                F5OrbitalMat.opacity = 0.3
            }
            addFOrbitals(scene, orbitalRadius, F5OrbitalMat, 5);
        }
        if (electron >=95) {
            if (electron >= 102) {
                F6OrbitalMat.opacity = 0.3
            }
            addFOrbitals(scene, orbitalRadius, F6OrbitalMat, 6);
        }
    }

    // 6d shell
    if (shellVisibility[5] && subVisibility["d"]) {
        if (electron >= 104|| electron in [89, 91, 92, 93, 96]) { // populated from f orbitals
            if (electron >= 108) {
                D0OrbitalMat.opacity = 0.3;
            }
            addDOrbitals(scene, orbitalRadius*1.5, D0OrbitalMat, 0);
        }
        if (electron >= 104 || electron === 90) {
            if (electron >= 109) {
                D1OrbitalMat.opacity = 0.3;
            }
            addDOrbitals(scene, orbitalRadius*1.5, D1OrbitalMat, 1);
        }
        if (electron >= 105) {
            if (electron >= 110) {
                D2OrbitalMat.opacity = 0.3;
            }
            addDOrbitals(scene, orbitalRadius*1.5, D2OrbitalMat, 2);
        }
        if (electron >= 106) {
            if (electron >= 110) {
                D3OrbitalMat.opacity = 0.3;
            }
            addDOrbitals(scene, orbitalRadius*1.5, D3OrbitalMat, 3);
        }
        if (electron >= 107 || electron in [57, 58, 64]) {
            if (electron >= 112) {
                D4OrbitalMat.opacity = 0.3;
            }
            addDOrbitals(scene, orbitalRadius*1.5, D4OrbitalMat, 4);
        }
    }

    // 7p shell
    if (shellVisibility[6] && subVisibility["p"]) {
        if (electron >= 113) {
            if (electron >= 116) {
                PxOrbitalMat.opacity = 0.2
            }
            addPOrbital(scene, orbitalRadius*2, PxOrbitalMat, new THREE.Vector3(1, 0, 0));
        }
        if (electron >= 114) {
            if (electron >= 117) {
                PyOrbitalMat.opacity = 0.2
            }
            addPOrbital(scene, orbitalRadius*2, PyOrbitalMat, new THREE.Vector3(0, 1, 0));
        }
        if (electron >= 115) {
            if (electron >= 118) {
                PzOrbitalMat.opacity = 0.2
            }
            addPOrbital(scene, orbitalRadius*2, PzOrbitalMat, new THREE.Vector3(0, 0, 1));
        }
    }


}

export { generateSeventhShell };