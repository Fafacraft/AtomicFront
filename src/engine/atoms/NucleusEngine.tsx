type Vec3 = [number, number, number];
import * as THREE from "three";

// Function to generate positions for N particles in a roughly spherical nucleus
function generateNucleusPositions(N: number, particleRadius: number): Vec3[] {
  const positions: Vec3[] = [];
  const particleR = particleRadius; // radius of each particle
  const radius = particleR * Math.cbrt(N) * 1.1;    // approximate radius of nucleus, tweak coefficient as needed
  const iterations = 5; // number of relaxation steps  lower = less compact

  // 1. initialize random positions inside sphere
  for (let i = 0; i < N; i++) {
    let x: number, y: number, z: number;
    do {
      x = (Math.random() * 2 - 1) * radius;
      y = (Math.random() * 2 - 1) * radius;
      z = (Math.random() * 2 - 1) * radius;
    } while (x*x + y*y + z*z > radius*radius);
    positions.push([x, y, z]);
  }

  // 2. relaxation iterations
  for (let iter = 0; iter < iterations; iter++) {
    for (let i = 0; i < N; i++) {
      let [x, y, z] = positions[i];
      let dx = 0, dy = 0, dz = 0;

      for (let j = 0; j < N; j++) {
        if (i === j) continue;
        const [xj, yj, zj] = positions[j];
        const dist = Math.sqrt((x-xj)**2 + (y-yj)**2 + (z-zj)**2);
        if (dist < 2*particleR && dist > 0) {
          // push away slightly
          const push = (2*particleR - dist) * 0.5;
          dx += ((x - xj)/dist) * push;
          dy += ((y - yj)/dist) * push;
          dz += ((z - zj)/dist) * push;
        }
      }

      // apply push
      positions[i][0] += dx;
      positions[i][1] += dy;
      positions[i][2] += dz;

      // keep inside sphere
      const len = Math.sqrt(positions[i][0]**2 + positions[i][1]**2 + positions[i][2]**2);
      if (len > radius - particleR) {
        positions[i][0] *= (radius - particleR)/len;
        positions[i][1] *= (radius - particleR)/len;
        positions[i][2] *= (radius - particleR)/len;
      }
    }
  }

  return positions;
}

// Function to generate nucleus particles
    function generateNucleus(scene: THREE.Scene, proton: number, neutron: number) {
      const N = proton + neutron;
      const particleRadius = 0.1;

      // get positions for N particles
      const positions = generateNucleusPositions(N, particleRadius);

      let protonRemaining = proton;
      let neutronRemaining = neutron;
      let protonProportion = proton / N;
      let neutronProportion = neutron / N;

      // for each position, create a proton or neutron sphere
      positions.forEach((pos, i) => {
        // Decide type based on which is closer to running out
        let type: "proton" | "neutron";
        if (protonRemaining === 0) type = "neutron";
        else if (neutronRemaining === 0) type = "proton";
        else {
          // alternate or balance: pick the type with fewer used so far
          const usedProtons = proton - protonRemaining;
          const usedNeutrons = neutron - neutronRemaining;
          const useProtonsProportion = usedProtons / proton;
          const useNeutronsProportion = usedNeutrons / neutron;
          type = protonProportion / useProtonsProportion >= neutronProportion / useNeutronsProportion ? "proton" : "neutron";
        }

        if (type === "proton") protonRemaining--;
        else neutronRemaining--;

        // Create sphere with color based on type
        const material = type === "proton"
          ? new THREE.MeshStandardMaterial({ color: "#ff3b3b" })
          : new THREE.MeshStandardMaterial({ color: "#8d8d8d" });

        const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(particleRadius, 16, 16),
          material
        );

        // Set position and add to scene
        sphere.position.set(...pos);
        scene.add(sphere);
      });
    }


export { generateNucleusPositions, generateNucleus };
