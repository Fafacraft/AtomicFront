import * as THREE from "three";
import { add } from "three/tsl";
import { addSOrbitals } from "../electron_orbitals/SOrbitals";
import { addFOrbitals } from "../electron_orbitals/Forbitals";
import { addDOrbitals } from "../electron_orbitals/Dorbitals";
import { addPOrbital } from "../electron_orbitals/POrbitals";


// Function to generate sixth electron shel
function generateSixthShell(scene: THREE.Scene, electron: number, orbitalRadius: number, orbitalMat: THREE.Material, shellVisibility: Record<number, boolean>, subVisibility: Record<string, boolean>) {
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
  
    if (electron <= 54) {
        return;
    }

    // 6s shell
    if (shellVisibility[6] && subVisibility["s"]) {
        if (electron >= 55) {
            if (electron >= 56) {
                SOrbitalMat.opacity = 0.3;
            }
            if (electron in [78, 79]) { // 6s goes to fill 5d first
                SOrbitalMat.opacity = 0.1
            }
            addSOrbitals(scene, orbitalRadius, SOrbitalMat);
        }
    }

    // 4f shells
    if (shellVisibility[4] && subVisibility["f"]) {
        if (electron >= 58) {
            if (electron >= 65) {
                F0OrbitalMat.opacity = 0.3;
            }
            addFOrbitals(scene, orbitalRadius, F0OrbitalMat, 0);
        }
        if (electron >=59) {
            if (electron >= 65) {
                F1OrbitalMat.opacity = 0.3
            }
            addFOrbitals(scene, orbitalRadius, F1OrbitalMat, 1);
        }
        if (electron >=59) {
            if (electron >= 66) {
                F2OrbitalMat.opacity = 0.3
            }
            addFOrbitals(scene, orbitalRadius, F2OrbitalMat, 2);
        }
        if (electron >=60) {
            if (electron >= 67) {
                F3OrbitalMat.opacity = 0.3
            }
            addFOrbitals(scene, orbitalRadius, F3OrbitalMat, 3);
        }
        if (electron >=61) {
            if (electron >= 68) {
                F4OrbitalMat.opacity = 0.3
            }
            addFOrbitals(scene, orbitalRadius, F4OrbitalMat, 4);
        }
        if (electron >=62) {
            if (electron >= 69) {
                F5OrbitalMat.opacity = 0.3
            }
            addFOrbitals(scene, orbitalRadius, F5OrbitalMat, 5);
        }
        if (electron >=63) {
            if (electron >= 70) {
                F6OrbitalMat.opacity = 0.3
            }
            addFOrbitals(scene, orbitalRadius, F6OrbitalMat, 6);
        }
    }

    // 5d shell
    if (shellVisibility[5] && subVisibility["d"]) {
        if (electron >= 71 || electron in [57, 58, 64]) { // populated from f orbitals
            if (electron >= 76) {
                D0OrbitalMat.opacity = 0.3;
            }
            addDOrbitals(scene, orbitalRadius*1.5, D0OrbitalMat, 0);
        }
        if (electron >= 72) {
            if (electron >= 77) {
                D1OrbitalMat.opacity = 0.3;
            }
            addDOrbitals(scene, orbitalRadius*1.5, D1OrbitalMat, 1);
        }
        if (electron >= 73) {
            if (electron >= 78) {
                D2OrbitalMat.opacity = 0.3;
            }
            addDOrbitals(scene, orbitalRadius*1.5, D2OrbitalMat, 2);
        }
        if (electron >= 74) {
            if (electron >= 78) {
                D3OrbitalMat.opacity = 0.3;
            }
            addDOrbitals(scene, orbitalRadius*1.5, D3OrbitalMat, 3);
        }
        if (electron >= 75 || electron in [57, 58, 64]) {
            if (electron >= 79) {
                D4OrbitalMat.opacity = 0.3;
            }
            addDOrbitals(scene, orbitalRadius*1.5, D4OrbitalMat, 4);
        }
    }

    // 6p shell
    if (shellVisibility[6] && subVisibility["p"]) {
        if (electron >= 81) {
            if (electron >= 84) {
                PxOrbitalMat.opacity = 0.2
            }
            addPOrbital(scene, orbitalRadius*2, PxOrbitalMat, new THREE.Vector3(1, 0, 0));
        }
        if (electron >= 82) {
            if (electron >= 85) {
                PyOrbitalMat.opacity = 0.2
            }
            addPOrbital(scene, orbitalRadius*2, PyOrbitalMat, new THREE.Vector3(0, 1, 0));
        }
        if (electron >= 83) {
            if (electron >= 86) {
                PzOrbitalMat.opacity = 0.2
            }
            addPOrbital(scene, orbitalRadius*2, PzOrbitalMat, new THREE.Vector3(0, 0, 1));
        }
    }


}

export { generateSixthShell };