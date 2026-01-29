import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

function initFluidGlass(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const {
    ior = 1.15,
    thickness = 5,
    color = 0xffffff,
    roughness = 0,
    metalness = 0,
    transmission = 1,
  } = options;

  // Scene setup
  const scene = new THREE.Scene();

  // Camera
  const width = container.clientWidth;
  const height = container.clientHeight;
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 10;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 3);
  dirLight.position.set(2, 5, 5);
  scene.add(dirLight);

  const pointLight = new THREE.PointLight(0xffffff, 2);
  pointLight.position.set(-2, -2, 5);
  scene.add(pointLight);

  // Material
  const material = new THREE.MeshPhysicalMaterial({
    color: color,
    roughness: roughness,
    metalness: metalness,
    transmission: transmission,
    thickness: thickness,
    ior: ior,
    clearcoat: 1,
    clearcoatRoughness: 0,
  });

  // Geometry - Torus Knot
  const geometry = new THREE.TorusKnotGeometry(2.1, 0.7, 100, 16);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Handle Resize
  window.addEventListener("resize", () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });

  // Animation Loop
  const animate = () => {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.005;
    renderer.render(scene, camera);
  };
  animate();
}

// Initialize on load
window.addEventListener("load", () => {
  initFluidGlass("fluid-glass-container", {
    ior: 1.15,
    thickness: 5,
    chromaticAberration: 0.1,
    anisotropy: 0.01,
  });
});
