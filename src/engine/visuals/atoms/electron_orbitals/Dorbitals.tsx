import * as THREE from "three";

function addDOrbitals(
    scene: THREE.Scene,
    radius: number,
    material: THREE.Material,
    type: number,
) {
    // Pivot used to rotate the entire orbital
    const pivot = new THREE.Group();
    scene.add(pivot);

    const lobeGeo = new THREE.SphereGeometry(radius, 32, 32);

    const addLobe = (pos: THREE.Vector3, rot?: THREE.Euler) => {
        const mesh = new THREE.Mesh(lobeGeo, material.clone());
        mesh.scale.set(0.8, 0.8, 1.3); // stretched ellipsoid
        mesh.position.copy(pos.clone().multiplyScalar(radius * 0.8));

        if (rot) mesh.rotation.copy(rot);
        pivot.add(mesh);
    };

    switch (type) {
        case 0: // d(x² - y²)
            addLobe(new THREE.Vector3(1, 0, 0));
            addLobe(new THREE.Vector3(-1, 0, 0));
            addLobe(new THREE.Vector3(0, 1, 0));
            addLobe(new THREE.Vector3(0, -1, 0));
            pivot.rotation.copy(new THREE.Euler(Math.PI/2, 0, 0));
            break;

        case 1: // d(xz)
            addLobe(new THREE.Vector3(1, 1, 0));
            addLobe(new THREE.Vector3(-1, 1, 0));
            addLobe(new THREE.Vector3(-1, -1, 0));
            addLobe(new THREE.Vector3(1, -1, 0));
            break;

        case 2: // d(z²)
            addLobe(new THREE.Vector3(0, 1, 0), new THREE.Euler(Math.PI/2, 0, 0));
            addLobe(new THREE.Vector3(0, -1, 0), new THREE.Euler(Math.PI/2, 0, 0));

            const torus = new THREE.Mesh(
                new THREE.TorusGeometry(radius * 1.2, radius * 0.4, 32, 64),
                material.clone()
            );
            torus.rotation.x = Math.PI / 2;
            pivot.add(torus);
            break;

        case 3: // d(yz)
            addLobe(new THREE.Vector3(0, 1, 1), new THREE.Euler(0, Math.PI / 2, 0));
            addLobe(new THREE.Vector3(0, 1, -1), new THREE.Euler(0, Math.PI / 2, 0));
            addLobe(new THREE.Vector3(0, -1, 1), new THREE.Euler(0, Math.PI / 2, 0));
            addLobe(new THREE.Vector3(0, -1, -1), new THREE.Euler(0, Math.PI / 2, 0));
            break;

        case 4: // d(xy)
            addLobe(new THREE.Vector3(1, 1, 0));
            addLobe(new THREE.Vector3(-1, 1, 0));
            addLobe(new THREE.Vector3(-1, -1, 0));
            addLobe(new THREE.Vector3(1, -1, 0));
            pivot.rotation.copy(new THREE.Euler(Math.PI/2, 0, 0));
            break;
    }


    return pivot; // return so you can update/remove later if needed
}



export { addDOrbitals };
