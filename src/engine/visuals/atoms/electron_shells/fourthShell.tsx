import * as THREE from "three";
import { add } from "three/tsl";
import { addSOrbitals } from "../electron_orbitals/SOrbitals";
import { addDOrbitals } from "../electron_orbitals/Dorbitals";
import { addPOrbital } from "../electron_orbitals/POrbitals";

// Function to generate fourth electron shell
function generateFourthShell(scene: THREE.Scene, electron: number, orbitalRadius: number, orbitalMat: THREE.Material) {
    const SOrbitalMat = orbitalMat.clone();
    const D0OrbitalMat = orbitalMat.clone();
    const D1OrbitalMat = orbitalMat.clone();
    const D2OrbitalMat = orbitalMat.clone();
    const D3OrbitalMat = orbitalMat.clone();
    const D4OrbitalMat = orbitalMat.clone();
    const PxOrbitalMat = orbitalMat.clone();
    const PyOrbitalMat = orbitalMat.clone();
    const PzOrbitalMat = orbitalMat.clone();

    if (electron <= 18) {
        return;
    }

    if (electron >= 19) {
        SOrbitalMat.opacity = 0.1;
    }
    if (electron >= 20) {
        SOrbitalMat.opacity = 0.2;
        // in this configuration, 4s loses stability to 3d, like for Cr and Cu
        if (electron == 24 || electron == 29) {
            SOrbitalMat.opacity = 0.1;
        }
    }

    // 4s Orbital
    addSOrbitals(scene, orbitalRadius, SOrbitalMat);

    // 3d Orbitals (21-30)
    if (electron >= 21) {
        if (electron >=26) {
            D0OrbitalMat.opacity = 0.3;
        }
        addDOrbitals(scene, orbitalRadius*1.2, D0OrbitalMat, 0);
    }
    if (electron >= 22) {
        if (electron >=27) {
            D1OrbitalMat.opacity = 0.3;
        }
        addDOrbitals(scene, orbitalRadius*1.2, D1OrbitalMat, 1);
    }
    if (electron >= 23) {
        if (electron >=28) {
            D2OrbitalMat.opacity = 0.3;
        }
        addDOrbitals(scene, orbitalRadius*1.2, D2OrbitalMat, 2);
    }
    if (electron >= 24) {
        if (electron >=29) {
            D3OrbitalMat.opacity = 0.3;
        }
        addDOrbitals(scene, orbitalRadius*1.2, D3OrbitalMat, 3);
    }
    if (electron >= 24) { // stabilization of 3d for Cu and Cr from 4s
        if (electron >=29) {
            D4OrbitalMat.opacity = 0.3;
        }
        addDOrbitals(scene, orbitalRadius*1.2, D4OrbitalMat, 4);
    }

    // 4p Orbitals (31-38)
    if (electron >= 31) {
        if (electron >=34) {
            PxOrbitalMat.opacity = 0.3;
        }
        addPOrbital(scene, orbitalRadius*1.5, PxOrbitalMat, new THREE.Vector3(1, 0, 0));
    }
    if (electron >= 32) {
        if (electron >=35) {
            PyOrbitalMat.opacity = 0.3;
        }
        addPOrbital(scene, orbitalRadius*1.5, PyOrbitalMat, new THREE.Vector3(0, 1, 0));
    }
    if (electron >= 33) {
        if (electron >=36) {
            PzOrbitalMat.opacity = 0.3;
        }
        addPOrbital(scene, orbitalRadius*1.5, PzOrbitalMat, new THREE.Vector3(0, 0, 1));
    }
            

}

export { generateFourthShell };