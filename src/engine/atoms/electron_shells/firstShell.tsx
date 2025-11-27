import * as THREE from "three";

// Function to generate first electron shell (1s orbital)
function generateFirstShell(scene: THREE.Scene, electron: number, orbitalRadius: number, orbitalMat: THREE.Material) {
      if (electron <= 0) {
        return;
      } else if (electron == 1) {
        orbitalMat.opacity = 0.1;
      } else {
        orbitalMat.opacity = 0.2;
      }

      // 1s Orbital
      const obital1SGeo = new THREE.SphereGeometry(orbitalRadius, 64, 64);
      const orbital1SMesh = new THREE.Mesh(obital1SGeo, orbitalMat);
      orbital1SMesh.renderOrder = 1; // helps transparency
      scene.add(orbital1SMesh);
    }
    
export { generateFirstShell };