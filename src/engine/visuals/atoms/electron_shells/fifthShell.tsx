import * as THREE from "three";
import { add } from "three/tsl";
import { addSOrbitals } from "../electron_orbitals/SOrbitals";
import { addDOrbitals } from "../electron_orbitals/Dorbitals";
import { addPOrbital } from "../electron_orbitals/POrbitals";

// Function to generate fifth electron shell
function generateFifthShell(scene: THREE.Scene, electron: number, orbitalRadius: number, orbitalMat: THREE.Material) {
    const SOrbitalMat = orbitalMat.clone();
    const D0OrbitalMat = orbitalMat.clone();
    const D1OrbitalMat = orbitalMat.clone();
    const D2OrbitalMat = orbitalMat.clone();
    const D3OrbitalMat = orbitalMat.clone();
    const D4OrbitalMat = orbitalMat.clone();
    const PxOrbitalMat = orbitalMat.clone();
    const PyOrbitalMat = orbitalMat.clone();
    const PzOrbitalMat = orbitalMat.clone();

    if (electron <= 36) {
        return;
    }

    if (electron >= 37) {
        SOrbitalMat.opacity = 0.1;
    }
    if (electron >= 48 || electron in [38, 39, 40, 43]) { // exceptions where 5s loses stability to 4d
        SOrbitalMat.opacity = 0.2;
    }

    // 5s Orbital
    if (electron != 46) { // exception for Pd, which has no 5s electrons because they fill 4d first
        addSOrbitals(scene, orbitalRadius, SOrbitalMat);
    }

    // 4d Orbitals (39-48)
    if (electron >= 39) {
        if (electron >= 44) {
            D0OrbitalMat.opacity = 0.3;
        }
        addDOrbitals(scene, orbitalRadius * 1.2, D0OrbitalMat, 0);
    }
    if (electron >= 40) {
        if (electron >= 44) { // filled from 5s first for 40-43
            D1OrbitalMat.opacity = 0.3;
        }
        addDOrbitals(scene, orbitalRadius * 1.2, D1OrbitalMat, 1);
    }
    if (electron >= 41) {
        if (electron >= 45) {
            D2OrbitalMat.opacity = 0.3;
        }
        addDOrbitals(scene, orbitalRadius * 1.2, D2OrbitalMat, 2);
    }
    if (electron >= 41) { // starts filling 3rd d electron at 41
        if (electron >= 46) {
            D3OrbitalMat.opacity = 0.3;
        }
        addDOrbitals(scene, orbitalRadius * 1.2, D3OrbitalMat, 3);
    }
    if (electron >= 42) { // starts filling 4th d electron at 42
        if (electron >= 46) { // stabilization from 5s for 47 and 48
            D4OrbitalMat.opacity = 0.3;
        }
        addDOrbitals(scene, orbitalRadius * 1.2, D4OrbitalMat, 4);
    }

    // 5p Orbitals (49-54)
    if (electron >= 49) {
        if (electron >= 52) {
            PxOrbitalMat.opacity = 0.3;
        }
        addPOrbital(scene, orbitalRadius * 1.5, PxOrbitalMat, new THREE.Vector3(1, 0, 0));
    }
    if (electron >= 50) {
        if (electron >= 53) {
            PyOrbitalMat.opacity = 0.3;
        }
        addPOrbital(scene, orbitalRadius * 1.5, PyOrbitalMat, new THREE.Vector3(0, 1, 0));
    }
    if (electron >= 51) {
        if (electron >= 54) {
            PzOrbitalMat.opacity = 0.3;
        }
        addPOrbital(scene, orbitalRadius * 1.5, PzOrbitalMat, new THREE.Vector3(0, 0, 1));
    }


}

export { generateFifthShell };