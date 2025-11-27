import React, { useRef, useEffect, useState, use } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const AtomCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [autoRotateEnabled, setAutoRotateEnabled] = useState(true);
  const autoRotateEnabledRef = useRef(autoRotateEnabled); // ref to hold the latest auto-rotate state
  const [reload, setReload] = useState(0); // state to trigger reloads

  // Handle window resize by triggering a reload of the scene
  useEffect(() => {
    const handleResize = () => {
      setReload((prev) => prev + 1);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Loading and setting up the scene
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    var { width, height } = getViewSize(mount);

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
    renderer.setClearColor(0x111111, 0.5); // background color

    mount.appendChild(renderer.domElement);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    const spotLight = new THREE.SpotLight(0xffffff, 100);
    spotLight.position.set(0, 0, 10);
    scene.add(ambientLight);
    scene.add(spotLight);

    //enable orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.minDistance = 1;
    controls.maxDistance = 20;
    controls.autoRotate = autoRotateEnabled;
    controls.autoRotateSpeed = 1;
    controls.target.set(0, 0, 0);
    controls.update();

    // Red Sphere
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: "#ff3b3b" });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Animation
    const animate = () => {
      // we can't use autoRotate directly because of stale closure, so we use a ref
      if (autoRotateEnabledRef.current) {
        controls.autoRotate = true;
      } else {
        controls.autoRotate = false;
      }
      controls.update();
      console.log("Auto-rotate:", autoRotateEnabled);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();
    setLoaded(true);

    return () => {
      // Clean up
      renderer.dispose();
      geometry.dispose();
      material.dispose();

      // remove duplicated canvas from dev mode hot reloads
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };


    function getViewSize(mount: HTMLDivElement) {
      var width = mount.clientWidth;
      var height = window.innerHeight * 0.6;
      if (window.innerWidth < 450) {
        width = window.innerWidth * 0.925;
        height = window.innerHeight * 0.6;
      }
      return { width, height };
    }
  }, [reload]);

  // Sync ref with state
  useEffect(() => {
    autoRotateEnabledRef.current = autoRotateEnabled;
  }, [autoRotateEnabled]);

  return (
    <div className="viewer">
      <div className="canvas-container" ref={mountRef}>
        <div
          className="viewport-toggle"
          onClick={() => setAutoRotateEnabled(!autoRotateEnabled)}
        >
          {autoRotateEnabled ? "⏸ Stop" : "▶ Play"}
        </div>
      </div>
    </div>
  );
};

export default AtomCanvas;
