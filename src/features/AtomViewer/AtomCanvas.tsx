import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const AtomCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    
      var width = mount.clientWidth;
      var height = window.innerHeight * 0.6;
      if (window.innerWidth < 450) {
        width = window.innerWidth * 0.925;
        height = window.innerHeight * 0.6;
      }

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x111111, 1);

    mount.appendChild(renderer.domElement);

    // Red Sphere
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: "#ff3b3b" });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Light
    const light = new THREE.AmbientLight(0xffffff, 2);
    light.position.set(0, 0, 10);
    scene.add(light);

    // Animation
    const animate = () => {
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();
    setLoaded(true);

    // Resize handler
    const handleResize = () => {
      if (!mount) return;

      var width = mount.clientWidth * 0.98;
      var height = window.innerHeight * 0.6;
      if (window.innerWidth < 450) {
        width = window.innerWidth * 0.925;
        height = window.innerHeight * 0.6;
      }

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();

      // remove duplicated canvas from dev mode hot reloads
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return (
    <div className="viewer">
      <div className="canvas-container" ref={mountRef}>
      </div>
    </div>
  );
};

export default AtomCanvas;
