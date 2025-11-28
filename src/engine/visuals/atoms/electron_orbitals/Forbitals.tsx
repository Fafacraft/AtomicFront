import * as THREE from "three";

function addFOrbitals(
    scene: THREE.Scene,
    radius: number,
    material: THREE.Material,
    type: number
) {
    const pivot = new THREE.Group();
    scene.add(pivot);

    const lobeGeo = new THREE.SphereGeometry(radius, 32, 32);
    const torusGeo = new THREE.TorusGeometry(radius*1.2, radius*0.4, 32, 34)

    const addLobe = (pos: THREE.Vector3, rot?: THREE.Euler) => {
        const mesh = new THREE.Mesh(lobeGeo, material.clone());
        mesh.scale.set(0.8, 0.8, 1.2); 
        mesh.lookAt(pos);
        mesh.position.copy(pos.clone().multiplyScalar(radius));
        pivot.add(mesh);
    };
    const addCircle = (pos: THREE.Vector3, rot?: THREE.Euler) => {
        const mesh = new THREE.Mesh(lobeGeo, material.clone());
        mesh.position.copy(pos.clone().multiplyScalar(radius));
        if (rot) mesh.rotation.copy(rot);
        pivot.add(mesh);
    };
    const addTorus = (pos: THREE.Vector3, rot?: THREE.Euler) => {
        const mesh = new THREE.Mesh(torusGeo, material.clone());
        mesh.position.copy(pos.clone().multiplyScalar(radius));
        if (rot) mesh.rotation.copy(rot);
        pivot.add(mesh);
    };

    switch (type) {
        case 0: // f(x(x²-3y²))
            addLobe(new THREE.Vector3(0, 0, 1), new THREE.Euler(Math.PI/2, 0, 0));
            addLobe(new THREE.Vector3(0, 0, -1), new THREE.Euler(Math.PI/2, 0, 0)); 
            addLobe(new THREE.Vector3(1, 0, 0), new THREE.Euler(Math.PI/2, 0, 0));
            addLobe(new THREE.Vector3(-1, 0, 0), new THREE.Euler(Math.PI/2, 0, 0));
            addCircle(new THREE.Vector3(-1, 0, -1));
            addCircle(new THREE.Vector3(1, 0, 1));
            break;

        case 1: // f(x²-y²)
            addLobe(new THREE.Vector3(1, 1, 1));
            addLobe(new THREE.Vector3(1, 1, -1));
            addLobe(new THREE.Vector3(1, -1, 1));
            addLobe(new THREE.Vector3(1, -1, -1));
            addLobe(new THREE.Vector3(-1, 1, 1));
            addLobe(new THREE.Vector3(-1, 1, -1));
            addLobe(new THREE.Vector3(-1, -1, 1));
            addLobe(new THREE.Vector3(-1, -1, -1));
            break;

        case 2: // f(xz²)
            addLobe(new THREE.Vector3(1, 0, 0));
            addLobe(new THREE.Vector3(-1, 0, 0)); 
            addLobe(new THREE.Vector3(0, 1, 0));
            addLobe(new THREE.Vector3(0, -1, 0));
            addCircle(new THREE.Vector3(-1, -1, 0));
            addCircle(new THREE.Vector3(1, 1, 0));
            break;

        case 3: // f(z**3)
            addTorus(new THREE.Vector3(0, 0.5, 0), new THREE.Euler(Math.PI / 2, 0, 0));
            addTorus(new THREE.Vector3(0, -0.5, 0), new THREE.Euler(Math.PI / 2, 0, 0));
            addCircle(new THREE.Vector3(0, 1, 0));
            addCircle(new THREE.Vector3(0, -1, 0));    
            break;

        case 4: // f(yz²)
            addLobe(new THREE.Vector3(0, 0, 1), new THREE.Euler(0, Math.PI / 2, 0));
            addLobe(new THREE.Vector3(0, 0, -1), new THREE.Euler(0, Math.PI / 2, 0)); 
            addLobe(new THREE.Vector3(0, 1, 0), new THREE.Euler(0, Math.PI / 2, 0));
            addLobe(new THREE.Vector3(0, -1, 0), new THREE.Euler(0, Math.PI / 2, 0));
            addCircle(new THREE.Vector3(0, -1, -1));
            addCircle(new THREE.Vector3(0, 1, 1));
            break;

        case 5: // f(xyz)
            addLobe(new THREE.Vector3(1, 1, 1));
            addLobe(new THREE.Vector3(1, 1, -1));
            addLobe(new THREE.Vector3(1, -1, 1));
            addLobe(new THREE.Vector3(1, -1, -1));
            addLobe(new THREE.Vector3(-1, 1, 1));
            addLobe(new THREE.Vector3(-1, 1, -1));
            addLobe(new THREE.Vector3(-1, -1, 1));
            addLobe(new THREE.Vector3(-1, -1, -1));
            break;

        case 6: // f(y(y²-3x²))
            addLobe(new THREE.Vector3(0, 0, 1), new THREE.Euler(Math.PI/2, 0, 0));
            addLobe(new THREE.Vector3(0, 0, -1), new THREE.Euler(Math.PI/2, 0, 0)); 
            addLobe(new THREE.Vector3(1, 0, 1), new THREE.Euler(Math.PI/2, 0, 0));
            addLobe(new THREE.Vector3(-1, 0, -1), new THREE.Euler(Math.PI/2, 0, 0));
            addCircle(new THREE.Vector3(-1, 0, 0));
            addCircle(new THREE.Vector3(1, 0, 0));
            break;

        default:
            console.warn("Unknown f-orbital type:", type);
    }

    return pivot;
}

export { addFOrbitals };
