import * as THREE from "three";

function addPOrbital(
    scene: THREE.Scene,
    radius: number,
    material: THREE.Material,
    direction: THREE.Vector3
) {
    // Normalize direction so scaling works cleanly
    const dir = direction.clone().normalize();

    // Each lobe is basically a sphere scaled along the axis (stretched shape)
    const lobeGeo = new THREE.SphereGeometry(radius, 64, 64);
    // lobeGeo.translate(0, 0, radius); // move it along local z-axis

    const makeLobe = (sign: number) => {
        const mesh = new THREE.Mesh(lobeGeo, material.clone());
        mesh.renderOrder = 2;

        // Stretch the sphere along the axis
        mesh.scale.set(0.6, 0.6, 1.5);

        // Translate geometry so bottom touches nucleus
        mesh.geometry.translate(0, 0, radius * 0.55);

        // Create a pivot at the nucleus
        const pivot = new THREE.Object3D();
        pivot.position.set(0, 0, 0); // nucleus position
        pivot.add(mesh);

        // Rotate pivot to point the lobe in the right direction
        pivot.lookAt(dir.clone().multiplyScalar(sign));

        // Move pivot along axis if needed (optional)
        pivot.position.copy(dir.clone().multiplyScalar(sign * 0)); // usually 0 since geometry already offset

        scene.add(pivot);
    };

    makeLobe(+1);
    makeLobe(-1);
}

export { addPOrbital };
