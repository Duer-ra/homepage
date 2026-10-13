import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SUBSCRIPTIONS = [
  ["Streaming", "₦4,400", "Oct 14"],
  ["Cloud hosting", "$24.00", "Oct 16"],
  ["AI assistant", "$20.00", "Oct 19"],
  ["Music", "₦2,900", "Oct 22"],
  ["Design tool", "$15.00", "Oct 27"],
  ["Domain", "$12.00", "Nov 02"],
  ["Storage", "$2.99", "Nov 05"],
  ["Gym", "₦15,000", "Nov 08"],
];

const SCENE_TARGETS = [
  { z: 20, risk: 0, dawn: 0 },
  { z: 58, risk: 0, dawn: 0 },
  { z: 96, risk: 0.95, dawn: 0 },
  { z: 134, risk: 0, dawn: 0.12 },
  { z: 170, risk: 0, dawn: 0.7 },
];

function makeTexture(width, height, draw) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  draw(canvas.getContext("2d"), width, height);
  return new THREE.CanvasTexture(canvas);
}

function createSoftTexture() {
  return makeTexture(128, 128, (context, width, height) => {
    const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.3, "rgba(255,255,255,.28)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  });
}

function createLaneTexture() {
  return makeTexture(64, 256, (context, width, height) => {
    const widthGradient = context.createLinearGradient(0, 0, width, 0);
    widthGradient.addColorStop(0, "rgba(255,255,255,0)");
    widthGradient.addColorStop(0.5, "rgba(255,255,255,.6)");
    widthGradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = widthGradient;
    context.fillRect(0, 0, width, height);

    context.globalCompositeOperation = "destination-in";
    const lengthGradient = context.createLinearGradient(0, 0, 0, height);
    lengthGradient.addColorStop(0, "rgba(0,0,0,.12)");
    lengthGradient.addColorStop(0.5, "rgba(0,0,0,1)");
    lengthGradient.addColorStop(1, "rgba(0,0,0,.12)");
    context.fillStyle = lengthGradient;
    context.fillRect(0, 0, width, height);
  });
}

function makeEnvironment() {
  const environment = new THREE.Scene();
  environment.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(24, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0x3a6b60, side: THREE.BackSide }),
    ),
  );

  [
    [0, 10, 0, 10, 0.2, 10, 5],
    [-10, 0, 0, 0.2, 9, 9, 3],
    [10, 2, 4, 0.2, 6, 6, 3],
  ].forEach(([x, y, z, width, height, depth, color]) => {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(color, color, color) }),
    );
    mesh.position.set(x, y, z);
    environment.add(mesh);
  });

  return environment;
}

export function setupScene({ host, pauseButton, storySections }) {
  if (!host) return () => {};

  const cleanups = [];
  const on = (eventName, handler, target = window) => {
    target.addEventListener(eventName, handler);
    cleanups.push(() => target.removeEventListener(eventName, handler));
  };
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let paused = reduceMotion;
  let raf = 0;
  let renderer;
  let pmrem;
  let scene;
  let camera;

  const state = { z: 0, risk: 0, dawn: 0, intro: reduceMotion ? 1 : 0 };
  const sceneSections = Array.from(storySections || []);

  const setPauseLabel = () => {
    if (!pauseButton) return;
    pauseButton.setAttribute("aria-pressed", String(paused));
    pauseButton.setAttribute(
      "aria-label",
      reduceMotion ? "Motion is reduced" : paused ? "Resume motion" : "Pause motion",
    );
  };

  setPauseLabel();
  if (pauseButton) {
    const togglePause = () => {
      if (reduceMotion) return;
      paused = !paused;
      setPauseLabel();
    };
    pauseButton.addEventListener("click", togglePause);
    cleanups.push(() => pauseButton.removeEventListener("click", togglePause));
  }

  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    return () => cleanups.forEach((cleanup) => cleanup());
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 700 ? 1.5 : 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  if ("outputColorSpace" in renderer) renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  host.appendChild(renderer.domElement);

  const fogColor = new THREE.Color(0x0b403a);
  const dawnColor = new THREE.Color(0x1b7a6c);
  const riskColor = new THREE.Color(0x4a2218);
  const currentFog = new THREE.Color();
  const lagColor = new THREE.Color(0x4fd1b9);
  const warningColor = new THREE.Color(0xff7a5c);
  const pearlColor = new THREE.Color(0xf3e7c4);
  const tealColor = new THREE.Color(0x9be8d8);
  const workingColor = new THREE.Color();

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b403a, 0.012);
  camera = new THREE.PerspectiveCamera(55, 1, 0.1, 600);

  pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(makeEnvironment(), 0.04).texture;

  const soft = createSoftTexture();
  const laneTexture = createLaneTexture();
  laneTexture.wrapS = laneTexture.wrapT = THREE.RepeatWrapping;
  laneTexture.repeat.set(1, 8);

  const skyUniforms = {
    top: { value: new THREE.Color(0x04100e) },
    horizon: { value: new THREE.Color(0x0b403a) },
  };
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(150, 32, 16),
    new THREE.ShaderMaterial({
      uniforms: skyUniforms,
      side: THREE.BackSide,
      depthWrite: false,
      vertexShader: "varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
      fragmentShader: "uniform vec3 top,horizon;varying vec3 vP;void main(){float h=normalize(vP).y;vec3 color=mix(horizon,top,smoothstep(0.,.55,h));color+=horizon*exp(-abs(h)*7.)*.5;gl_FragColor=vec4(color,1.);}",
    }),
  );
  sky.renderOrder = -1;
  scene.add(sky);

  const destination = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: soft,
      color: 0x7fe5d3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.85,
    }),
  );
  destination.position.set(0, 1, -214);
  destination.scale.set(130, 130, 1);
  scene.add(destination);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(240, 450),
    new THREE.MeshStandardMaterial({ color: 0x06201c, roughness: 0.35, metalness: 0.7 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -2.6, -125);
  floor.receiveShadow = true;
  scene.add(floor);

  const beam = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 310),
    new THREE.MeshBasicMaterial({
      map: laneTexture,
      color: 0x4fd1b9,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  beam.rotation.x = -Math.PI / 2;
  beam.position.set(0, -2.58, -105);
  scene.add(beam);
  scene.add(new THREE.HemisphereLight(0x9fe0d0, 0x0a1e1a, 0.5));

  const sun = new THREE.DirectionalLight(0xdff7f0, 1.2);
  sun.castShadow = true;
  sun.shadow.mapSize.set(window.innerWidth < 700 ? 1024 : 2048, window.innerWidth < 700 ? 1024 : 2048);
  sun.shadow.bias = -0.0005;
  sun.shadow.camera.left = -30;
  sun.shadow.camera.right = 30;
  sun.shadow.camera.top = 45;
  sun.shadow.camera.bottom = -45;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 90;
  scene.add(sun, sun.target);

  const dotCount = 72;
  const dotPositions = new Float32Array(dotCount * 3);
  const dotColors = new Float32Array(dotCount * 3);
  for (let index = 0; index < dotCount; index += 1) {
    dotPositions[index * 3] = index % 2 ? 5 : -5;
    dotPositions[index * 3 + 1] = -2.48;
    dotPositions[index * 3 + 2] = 8 - 3 * Math.floor(index / 2);
  }
  const dotGeometry = new THREE.BufferGeometry();
  dotGeometry.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
  dotGeometry.setAttribute("color", new THREE.BufferAttribute(dotColors, 3));
  const dots = new THREE.Points(
    dotGeometry,
    new THREE.PointsMaterial({
      size: 0.9,
      map: soft,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  dots.frustumCulled = false;
  scene.add(dots);

  const coins = SUBSCRIPTIONS.map(([name, amount, date], index) => {
    const isDollar = amount.startsWith("$");
    const color = isDollar ? 0xf3e7c4 : 0x9be8d8;
    const group = new THREE.Group();
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(1.3, 1.3, 0.18, 64),
      new THREE.MeshPhysicalMaterial({
        color,
        metalness: 0.65,
        roughness: 0.18,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        emissive: color,
        emissiveIntensity: 0.22,
      }),
    );
    mesh.rotation.x = Math.PI / 2;
    mesh.castShadow = true;
    group.add(mesh);
    group.position.set(0, 0.5, -22 * (index + 1));
    scene.add(group);

    const mark = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 7),
      new THREE.MeshBasicMaterial({
        map: soft,
        color: 0x4fd1b9,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    mark.rotation.x = -Math.PI / 2;
    mark.position.set(0, -2.57, -22 * (index + 1));
    scene.add(mark);

    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: soft,
        color,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        opacity: 0.38,
      }),
    );
    glow.scale.set(9, 9, 1);
    glow.position.set(0, 0.5, -22 * (index + 1) - 0.6);
    scene.add(glow);

    return { name, date, group, mesh, mark, glow, baseColor: isDollar ? pearlColor : tealColor, index };
  });

  const setSceneTarget = (target, instant = false) => {
    if (instant || reduceMotion) {
      Object.assign(state, target);
      return;
    }
    gsap.to(state, {
      ...target,
      duration: 0.9,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  sceneSections.forEach((section, index) => {
    const fallbackTarget = SCENE_TARGETS[index] || SCENE_TARGETS[SCENE_TARGETS.length - 1];
    const readTarget = (attribute, fallback) => {
      const value = Number(section.dataset[attribute]);
      return Number.isFinite(value) ? value : fallback;
    };
    const target = {
      z: readTarget("cameraZ", fallbackTarget.z),
      risk: readTarget("risk", fallbackTarget.risk),
      dawn: readTarget("dawn", fallbackTarget.dawn),
    };
    const card = section.querySelector(".story-card");
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 62%",
      end: "bottom 38%",
      onEnter: () => {
        setSceneTarget(target);
        card?.classList.add("is-active");
      },
      onEnterBack: () => {
        setSceneTarget(target);
        card?.classList.add("is-active");
      },
      onLeave: () => {
        if (!reduceMotion) card?.classList.remove("is-active");
      },
      onLeaveBack: () => {
        if (!reduceMotion) card?.classList.remove("is-active");
      },
    });
    cleanups.push(() => trigger.kill());
    if (reduceMotion) card?.classList.add("is-active");
  });

  const resize = () => {
    const width = host.clientWidth || window.innerWidth;
    const height = host.clientHeight || window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  resize();
  on("resize", resize);

  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
  on("pointermove", (event) => {
    if (reduceMotion || paused) return;
    pointer.targetX = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.targetY = (event.clientY / window.innerHeight) * 2 - 1;
  });

  let time = 0;
  let previousTime = performance.now();
  let lastRisk = -1;

  const tick = (now) => {
    raf = requestAnimationFrame(tick);
    const delta = Math.min(0.05, (now - previousTime) / 1000);
    previousTime = now;
    const motion = paused ? 0 : 1;
    if (!paused) time += delta;

    pointer.x += (pointer.targetX - pointer.x) * 0.05 * motion;
    pointer.y += (pointer.targetY - pointer.y) * 0.05 * motion;

    const cameraZ = -state.z + (1 - state.intro) * 30;
    const cameraX = pointer.x * 0.5;
    const cameraY = 0.7 + Math.sin(time * 0.6) * 0.05 * motion;
    camera.position.set(cameraX, cameraY, cameraZ);
    camera.lookAt(cameraX + pointer.x * 5, cameraY - pointer.y * 2.5 - 0.2, cameraZ - 20);
    camera.updateMatrixWorld(true);

    sun.position.set(cameraX + 12, 16, cameraZ + 4);
    sun.target.position.set(cameraX, -2.6, cameraZ - 24);

    coins.forEach((coin) => {
      const risk = coin.index >= 4 ? state.risk : 0;
      coin.group.position.y = 0.5 + Math.sin(time * 1.1 + coin.index) * 0.12 * motion;
      coin.group.rotation.y = Math.sin(time * 0.7 + coin.index) * 0.55 * motion;
      coin.mesh.material.color.copy(coin.baseColor).lerp(warningColor, risk * 0.8);
      coin.mesh.material.emissive.copy(coin.mesh.material.color);
      coin.mark.material.color.copy(lagColor).lerp(warningColor, risk);
      coin.glow.material.color.copy(coin.mesh.material.color);
      coin.glow.position.y = coin.group.position.y;
    });

    if (Math.abs(state.risk - lastRisk) > 0.005) {
      lastRisk = state.risk;
      for (let index = 0; index < dotCount; index += 1) {
        workingColor.copy(lagColor).multiplyScalar(0.55);
        if (dotPositions[index * 3 + 2] < -88) workingColor.lerp(warningColor, state.risk);
        dotColors[index * 3] = workingColor.r;
        dotColors[index * 3 + 1] = workingColor.g;
        dotColors[index * 3 + 2] = workingColor.b;
      }
      dotGeometry.attributes.color.needsUpdate = true;
    }

    laneTexture.offset.y -= delta * 0.12 * motion;
    currentFog.copy(fogColor).lerp(dawnColor, state.dawn).lerp(riskColor, state.risk * 0.7);
    scene.fog.color.copy(currentFog);
    skyUniforms.horizon.value.copy(currentFog);
    beam.material.color.copy(lagColor).lerp(warningColor, state.risk * 0.7);
    destination.material.color.copy(lagColor).lerp(warningColor, state.risk * 0.8);
    destination.scale.setScalar(130 * (1 + state.dawn * 0.4));
    sky.position.copy(camera.position);

    renderer.render(scene, camera);
  };

  raf = requestAnimationFrame(tick);

  return () => {
    cleanups.forEach((cleanup) => cleanup());
    cancelAnimationFrame(raf);
    gsap.killTweensOf(state);
    renderer.dispose();
    pmrem.dispose();
    if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
  };
}
