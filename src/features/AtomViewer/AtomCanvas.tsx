import React, { useRef, useEffect, useState, use } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { generateNucleus, generateNucleusPositions } from "../../engine/visuals/atoms/NucleusEngine";
import { useAtomData } from "../../contexts/AtomDataContext";
import { generateFirstShell } from "../../engine/visuals/atoms/electron_shells/firstShell";
import { generateSecondShell } from "../../engine/visuals/atoms/electron_shells/secondShell";
import { generateThirdShell } from "../../engine/visuals/atoms/electron_shells/thirdShell";
import { generateFourthShell } from "../../engine/visuals/atoms/electron_shells/fourthShell";
import { generateFifthShell } from "../../engine/visuals/atoms/electron_shells/fifthShell";
import ToggleBtn from "../../components/ToggleBtn";
import "./AtomCanvas.css";

const AtomCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [autoRotateEnabled, setAutoRotateEnabled] = useState(true);
  const autoRotateEnabledRef = useRef(autoRotateEnabled); // ref to hold the latest auto-rotate state
  const [reload, setReload] = useState(0); // state to trigger reloads

  const [shellVisibility, setShellVisibility] = useState<Record<number, boolean>>({
    1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true,
  });

  const [subVisibility, setSubVisibility] = useState<Record<string, boolean>>({
    "s": true,
    "p": true,
    "d": true,
    "f": true,
  });


  // Get proton count from context
  const proton = useAtomData().proton;
  const neutron = useAtomData().neutron;
  const electron = useAtomData().electron;

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

  useEffect(() => {
    if (loaded) {
      setReload((prev) => prev + 1);
    }
  }, [proton, neutron, electron, loaded, shellVisibility, subVisibility]);

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
      100000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x111111, 0.5); // background color

    mount.appendChild(renderer.domElement);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    const spotLight = new THREE.SpotLight(0xffffff, 150);
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
    controls.maxDistance = 2000;
    controls.autoRotate = autoRotateEnabled;
    controls.autoRotateSpeed = 1;
    controls.target.set(0, 0, 0);
    controls.update();

    // Orbital material
    const orbitalMat = new THREE.MeshBasicMaterial({
      color: 0x3399ff,
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
    });

    // Generate the atom
    generateNucleus(scene, proton, neutron);
    camera.position.set(0, 0, 2); // zoom in on nucleus

    if (electron >= 1) {
      camera.position.set(0, 0, 5); // zoom out 1s shell
      generateFirstShell(scene, electron, 1.5, orbitalMat, shellVisibility, subVisibility);
    }
    if (electron >= 3) {
      camera.position.set(0, 0, 12); // zoom out 2s shells
      generateSecondShell(scene, electron, 4, orbitalMat, shellVisibility, subVisibility);
      if (electron >= 5) {
        camera.position.set(0, 0, 32); // zoom out 2p shells
      }
    }
    if (electron >= 11) {
      camera.position.set(0, 0, 50); // zoom out 3s shells
      generateThirdShell(scene, electron, 15, orbitalMat, shellVisibility, subVisibility);
      if (electron >= 13) {
        camera.position.set(0, 0, 130); // zoom out 3p shells
      }
    }
    if (electron >= 19) {
      camera.position.multiplyScalar(1.5); // zoom out 4s shells
      generateFourthShell(scene, electron, 50, orbitalMat, shellVisibility, subVisibility);
      if (electron >= 21) {
        camera.position.set(0, 0, 400); // zoom out 3d shells
      }
      if (electron >= 31) {
        camera.position.set(0, 0, 700); // zoom out 4p shells
      }
    }
    if (electron >= 37) {
      camera.position.set(0, 0, 700); // zoom out 5s shells
      generateFifthShell(scene, electron, 150, orbitalMat, shellVisibility, subVisibility);
      if (electron >= 39) {
        camera.position.set(0, 0, 1000); // zoom out 4d shells
      }
      if (electron >= 49) {
        camera.position.set(0, 0, 1700); // zoom out 5p shells
      }
    }

    // sixth and seventh shells to be added later

    // Animation
    const animate = () => {
      // we can't use autoRotate directly because of stale closure, so we use a ref
      if (autoRotateEnabledRef.current) {
        controls.autoRotate = true;
      } else {
        controls.autoRotate = false;
      }
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();
    setLoaded(true);

    return () => {
      // Clean up
      renderer.dispose();

      // remove duplicated canvas from dev mode hot reloads
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };


    // Function to get view size
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
        <div className="toggle-container">

          {/* Autorotate toggle */}
          <div
            className="viewport-toggle"
            onClick={() => setAutoRotateEnabled(!autoRotateEnabled)}
          >
            {autoRotateEnabled ? "⏸ Stop" : "▶ Play"}
          </div>

          {/* Shell toggles */}
          <div className="toggle-row">
            <div>
              Shells Visibility : 
            </div>
            {[1, 2, 3, 4, 5, 6, 7].map(shell => (
              <ToggleBtn
                key={shell}
                label={`${shell}`}
                active={shellVisibility[shell]}
                onClick={() =>
                  setShellVisibility(prev => ({ ...prev, [shell]: !prev[shell] }))
                }
              />
            ))}
          </div>

          {/* Subshell toggles */}
          <div className="toggle-row">
            <div>
              Subshell types Visibility : 
            </div>
            {["s", "p", "d", "f"].map(sub => (
              <ToggleBtn
                key={sub}
                label={sub}
                active={subVisibility[sub]}
                onClick={() =>
                  setSubVisibility(prev => ({ ...prev, [sub]: !prev[sub] }))
                }
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AtomCanvas;
