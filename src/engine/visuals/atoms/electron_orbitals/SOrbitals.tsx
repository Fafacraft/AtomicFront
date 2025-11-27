import * as THREE from "three";

function addSOrbitals(scene: THREE.Scene, radius: number, material: THREE.Material) {
    const obital1SGeo = new THREE.SphereGeometry(radius, 64, 64);
    const orbital1SMesh = new THREE.Mesh(obital1SGeo, material);
    orbital1SMesh.renderOrder = 1; // helps transparency
    scene.add(orbital1SMesh);
}

export { addSOrbitals };