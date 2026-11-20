// 3D scene for /ab-test-simulator: a night-time plaza in front of the Ingversions office.
// Visitors walk through a gate, split along two glowing lanes to phones showing the control and
// the variant, buyers trigger a "+$65" pop, and a glowing column per version grows with sales.
// Loaded with a dynamic import so three.js never touches the rest of the site.
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { drawScreen, loadScreens, SCREEN_W, SCREEN_H } from "./screens.js";

const VIEWS = {
  overview: { pos: [0, 7.4, 30], target: [0, 3.6, -2] },
  overviewNarrow: { pos: [0, 6.2, 22.5], target: [0, 3, -1] },
  a: { pos: [-5.2, 3.6, 8.6], target: [-2.9, 2.9, 1.2] },
  b: { pos: [5.2, 3.6, 8.6], target: [2.9, 2.9, 1.2] },
};
const COLOR = { a: "#38bdf8", b: "#c084fc" };
const spawnEvery = (traffic) => Math.max(0.16, 1000 / traffic);
// ponytail: buy chance is exaggerated so the difference is visible; the panel shows the real
// simulated numbers, and the columns are driven by them.
const BUY = { a: 0.28, b: 0.45 };
const SIDE = { a: -1, b: 1 };
const MAX_PEOPLE = 90;
const POPS = 14;
const PLAZA = 10;

const roundedRect = (w, h, r) => {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
};

const canvasTex = (w, h, draw) => {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
};
const FONT = '"Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif';
const label = (txt, { fg = "#fff", bg = null, size = 64, w = 512, h = 128, weight = 800 } = {}) =>
  canvasTex(w, h, (ctx) => {
    if (bg) {
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.roundRect(4, 4, w - 8, h - 8, (h - 8) / 2);
      ctx.fill();
    }
    ctx.font = `${weight} ${size}px ${FONT}`;
    ctx.fillStyle = fg;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(txt, w / 2, h / 2 + 3);
  });
const glowTex = () =>
  canvasTex(256, 256, (ctx) => {
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.35)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
  });
const gridTex = () => {
  const t = canvasTex(256, 256, (ctx) => {
    ctx.fillStyle = "#121726";
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = "rgba(148,163,255,0.14)";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 256, 256);
  });
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(10, 10);
  return t;
};

export const createAbScene = (container, { labels, traffic, playing, coarse, onSelect }) => {
  const lowPower = coarse || (navigator.hardwareConcurrency || 8) <= 4;
  const renderer = new THREE.WebGLRenderer({
    antialias: !lowPower,
    alpha: true,
    powerPreference: lowPower ? "low-power" : "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1.25 : 1.5));
  renderer.shadowMap.enabled = !lowPower;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.domElement.setAttribute("aria-hidden", "true");
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog("#0b0f1c", 40, 80);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTarget = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envTarget.texture;
  scene.environmentIntensity = 0.35;
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 200);
  camera.position.set(...VIEWS.overview.pos);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(...VIEWS.overview.target);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.minPolarAngle = 0.35;
  controls.maxPolarAngle = 1.5;
  // Touch drags must keep scrolling the page; phones use the view buttons and taps instead,
  // and can turn the model only in 360° mode (setExplore), which also spins it slowly.
  controls.autoRotateSpeed = 3; // one full turn every 20 s
  const setExplore = (on) => {
    controls.enabled = on || !coarse;
    renderer.domElement.style.touchAction = controls.enabled ? "none" : "";
    controls.autoRotate = on;
  };
  setExplore(false);

  scene.add(new THREE.HemisphereLight("#8fa4ff", "#1a1530", 0.9));
  const moon = new THREE.DirectionalLight("#c7d2fe", 1.4);
  moon.position.set(-8, 16, 10);
  moon.castShadow = true;
  moon.shadow.mapSize.set(768, 768);
  moon.shadow.radius = 4;
  moon.shadow.bias = -0.0004;
  Object.assign(moon.shadow.camera, { left: -13, right: 13, top: 13, bottom: -13, far: 60 });
  scene.add(moon);
  ["a", "b"].forEach((v) => {
    const l = new THREE.PointLight(COLOR[v], 18, 9, 1.6);
    l.position.set(SIDE[v] * 3, 3, 3.2);
    scene.add(l);
  });

  const std = (color, extra) =>
    new THREE.MeshStandardMaterial({ color, roughness: 0.75, ...extra });
  const glowMat = (color, intensity = 2) =>
    new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: intensity });
  const add = (mesh, parent = scene, cast = true) => {
    mesh.castShadow = cast;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };
  const box = (w, h, d, material, x, y, z, parent, cast) => {
    const m = add(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material), parent, cast);
    m.position.set(x, y, z);
    return m;
  };
  const glow = glowTex();
  const halo = (color, size, x, y, z, parent = scene, opacity = 0.5) => {
    const s = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glow,
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    s.scale.set(size, size, 1);
    s.position.set(x, y, z);
    parent.add(s);
    return s;
  };

  // Square plinth with a faint grid and glowing rim
  box(PLAZA * 2 + 0.4, 0.6, PLAZA * 2 + 0.4, std("#0d111d"), 0, -0.32, 0);
  box(PLAZA * 2, 0.04, PLAZA * 2, std("#ffffff", { map: gridTex(), roughness: 0.6 }), 0, 0, 0);
  const rim = glowMat("#6366f1", 1.5);
  [
    [PLAZA * 2 + 0.4, 0.05, 0.05, 0, 0, PLAZA + 0.2],
    [PLAZA * 2 + 0.4, 0.05, 0.05, 0, 0, -PLAZA - 0.2],
    [0.05, 0.05, PLAZA * 2 + 0.4, PLAZA + 0.2, 0, 0],
    [0.05, 0.05, PLAZA * 2 + 0.4, -PLAZA - 0.2, 0, 0],
  ].forEach(([w, h, d, x, , z]) => box(w, h, d, rim, x, 0.02, z, scene, false));

  // Entrance gate and the two glowing lanes
  const gateMat = glowMat("#e0e7ff", 1.2);
  box(0.18, 2.1, 0.18, gateMat, -1.3, 1.05, 9.2, scene, false);
  box(0.18, 2.1, 0.18, gateMat, 1.3, 1.05, 9.2, scene, false);
  box(2.78, 0.18, 0.18, gateMat, 0, 2.1, 9.2, scene, false);
  const gateSign = new THREE.Mesh(
    new THREE.PlaneGeometry(2.4, 0.6),
    new THREE.MeshBasicMaterial({
      map: label(labels.gate, { size: 56 }),
      transparent: true,
      toneMapped: false,
    }),
  );
  gateSign.scale.setScalar(0.75);
  gateSign.position.set(0, 2.5, 9.2);
  scene.add(gateSign);
  halo("#a5b4fc", 4.5, 0, 1.4, 9, scene, 0.22);
  const lane = (v) => {
    const from = new THREE.Vector3(0, 0.04, 6.4);
    const to = new THREE.Vector3(SIDE[v] * 2.9, 0.04, 3.4);
    const len = from.distanceTo(to);
    const m = box(0.12, 0.02, len, glowMat(COLOR[v], 2.5), 0, 0.04, 0, scene, false);
    m.position.copy(from).lerp(to, 0.5);
    m.lookAt(to);
  };
  lane("a");
  lane("b");
  box(0.12, 0.02, 2.2, glowMat("#e0e7ff", 1.5), 0, 0.04, 7.5, scene, false);

  // Trees in planters at the back corners
  const leafGeo = new THREE.SphereGeometry(1, 18, 12);
  const leafMat = std("#1f4d3a");
  const tree = (x, z, s) => {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.scale.setScalar(s);
    box(1, 0.5, 1, std("#1b2030"), 0, 0.25, 0, g);
    add(
      new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 1.6, 8), std("#3b2a20")),
      g,
    ).position.y = 1.2;
    [
      [0, 2.3, 0, 0.75],
      [0.35, 2.0, 0.2, 0.55],
      [-0.3, 2.05, -0.15, 0.6],
    ].forEach(([lx, ly, lz, r]) => {
      const m = add(new THREE.Mesh(leafGeo, leafMat), g);
      m.position.set(lx, ly, lz);
      m.scale.setScalar(r);
    });
    scene.add(g);
  };
  [
    [-8.6, -2, 1.2],
    [8.8, -2.6, 1],
    [-8.4, 7.8, 0.9],
    [8.4, 7.8, 0.95],
  ].forEach((t) => tree(...t));

  // Ingversions Digital head office: glass tower with a lit lobby, side wings and a logo sign band
  const loader = new THREE.TextureLoader();
  const office = new THREE.Group();
  office.position.set(0, 0, -8.2);
  scene.add(office);
  const W = 13;
  const H = 9.4;
  const D = 4.4;
  const front = D / 2;
  const glass = std("#141a2c", { roughness: 0.15, metalness: 0.7 });
  const metal = std("#2b3350", { roughness: 0.35, metalness: 0.8 });
  const windowOn = std("#2a2214", { emissive: "#fbbf24", emissiveIntensity: 0.55 });
  const windowCool = std("#141c33", { emissive: "#818cf8", emissiveIntensity: 0.4 });
  const windowOff = std("#1c2338", { roughness: 0.1, metalness: 0.8 });
  const pane = (i) => [windowOn, windowOff, windowCool, windowOff, windowOff][i % 5];
  box(W, H, D, glass, 0, H / 2, 0, office);

  [-1, 1].forEach((side) => {
    const x = side * (W / 2 + 2.1);
    box(4.2, 5.6, 3.6, glass, x, 2.8, -0.6, office);
    box(4.4, 0.25, 3.8, metal, x, 5.72, -0.6, office);
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 3; c++)
        box(
          0.9,
          1,
          0.04,
          pane(r * 3 + c + side),
          x + (c - 1) * 1.25,
          1.3 + r * 1.5,
          1.22,
          office,
          false,
        );
  });

  box(
    W - 0.8,
    1.8,
    0.05,
    std("#3a2a12", { emissive: "#fcd34d", emissiveIntensity: 0.35 }),
    0,
    1,
    front + 0.03,
    office,
    false,
  );
  box(2.4, 1.7, 0.06, glowMat("#fde68a", 1.1), 0, 0.85, front + 0.06, office, false);
  box(0.06, 1.7, 0.08, metal, 0, 0.85, front + 0.09, office, false);
  box(4.2, 0.14, 1.6, metal, 0, 2.05, front + 0.8, office);
  [-1.9, 1.9].forEach((x) => box(0.1, 2, 0.1, metal, x, 1, front + 1.5, office));
  box(4.2, 0.04, 0.04, glowMat("#c084fc", 2.5), 0, 1.97, front + 1.6, office, false);

  [2.2, 3.6, 5].forEach((y) => box(W + 0.12, 0.12, D + 0.12, metal, 0, y, 0, office));
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 10; c++)
      box(
        1.05,
        1.05,
        0.04,
        pane(r * 7 + c * 3),
        -5.4 + c * 1.2,
        2.9 + r * 1.4,
        front + 0.03,
        office,
        false,
      );
  for (let c = 0; c <= 10; c++) box(0.08, 4.2, 0.3, metal, -6 + c * 1.2, 4.3, front + 0.12, office);

  box(
    W,
    2.6,
    0.14,
    std("#0b0f1c", { roughness: 0.3, metalness: 0.5 }),
    0,
    7.75,
    front + 0.08,
    office,
  );
  const signGlow = glowMat("#a78bfa", 2.6);
  [6.45, 9.05].forEach((y) => box(W, 0.06, 0.06, signGlow, 0, y, front + 0.16, office, false));
  [-1, 1].forEach((side) =>
    box(0.1, H, 0.1, glowMat("#c084fc", 2), side * (W / 2), H / 2, front + 0.05, office, false),
  );
  const logoTex = loader.load(labels.logo);
  logoTex.colorSpace = THREE.SRGBColorSpace;
  const logo = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 1.215),
    new THREE.MeshBasicMaterial({ map: logoTex, transparent: true, toneMapped: false }),
  );
  logo.position.set(0, 7.75, front + 0.17);
  office.add(logo);

  box(W + 0.2, 0.3, D + 0.2, metal, 0, H + 0.15, 0, office);
  box(2.4, 0.8, 1.6, metal, -3.2, H + 0.7, -0.4, office);
  box(1.6, 0.6, 1.2, metal, 3.6, H + 0.6, 0.2, office);
  add(new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 2.4, 8), metal), office).position.set(
    4.8,
    H + 1.5,
    -0.6,
  );
  const beacon = add(
    new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 12, 8),
      new THREE.MeshStandardMaterial({
        color: "#ef4444",
        emissive: "#ef4444",
        emissiveIntensity: 2,
      }),
    ),
    office,
    false,
  );
  beacon.position.set(4.8, H + 2.75, -0.6);

  // Phones on glowing pedestals
  const phoneW = 2.3;
  const phoneH = 4.8;
  const bodyGeo = new THREE.ExtrudeGeometry(roundedRect(phoneW, phoneH, 0.32), {
    depth: 0.2,
    bevelEnabled: true,
    bevelSize: 0.04,
    bevelThickness: 0.04,
    bevelSegments: 3,
    curveSegments: 12,
  });
  bodyGeo.translate(0, 0, -0.1);
  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: "#1c1f26",
    metalness: 0.8,
    roughness: 0.25,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
  });
  const sw = phoneW - 0.14;
  const sh = phoneH - 0.14;
  const screenGeo = new THREE.ShapeGeometry(roundedRect(sw, sh, 0.27), 12);
  const uv = screenGeo.attributes.uv;
  const pos = screenGeo.attributes.position;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, pos.getX(i) / sw + 0.5, pos.getY(i) / sh + 0.5);

  const screens = {};
  const phones = [];
  const columns = {};
  const counters = {};
  ["a", "b"].forEach((v) => {
    const x = SIDE[v] * 2.9;
    box(1.6, 0.5, 0.9, std("#151a2a", { metalness: 0.4, roughness: 0.4 }), x, 0.25, 1.2);
    box(1.62, 0.04, 0.92, glowMat(COLOR[v], 2.5), x, 0.5, 1.2, scene, false);
    halo(COLOR[v], 7, x, 2.9, 0.6, scene, 0.28);
    const g = new THREE.Group();
    g.position.set(x, 0.6 + phoneH / 2, 1.2);
    g.rotation.y = -SIDE[v] * 0.22;
    scene.add(g);
    const body = add(new THREE.Mesh(bodyGeo, bodyMat), g);
    body.userData.view = v;
    phones.push(body);
    const canvas = document.createElement("canvas");
    canvas.width = SCREEN_W;
    canvas.height = SCREEN_H;
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    drawScreen(canvas.getContext("2d"), v, null);
    const screen = new THREE.Mesh(
      screenGeo,
      new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }),
    );
    screen.position.z = 0.15;
    screen.userData.view = v;
    phones.push(screen);
    g.add(screen);
    const island = new THREE.Mesh(
      new THREE.ShapeGeometry(roundedRect(0.62, 0.17, 0.085), 8),
      new THREE.MeshBasicMaterial({ color: "#05060a" }),
    );
    island.position.set(0, sh / 2 - 0.2, 0.16);
    g.add(island);
    box(0.05, 0.55, 0.12, bodyMat, phoneW / 2 + 0.03, 0.9, 0, g, false);
    box(0.05, 0.38, 0.12, bodyMat, -phoneW / 2 - 0.03, 1.2, 0, g, false);
    box(0.05, 0.38, 0.12, bodyMat, -phoneW / 2 - 0.03, 0.7, 0, g, false);
    screens[v] = { canvas, tex };
    const tag = new THREE.Mesh(
      new THREE.PlaneGeometry(2.1, 0.37),
      new THREE.MeshBasicMaterial({
        map: label(labels[v], { bg: COLOR[v], fg: "#0b0f1c", size: 44, w: 720 }),
        transparent: true,
        toneMapped: false,
      }),
    );
    tag.position.set(0, phoneH / 2 + 0.35, 0.1);
    g.add(tag);

    // Sales column, driven by the simulated conversions
    const col = box(
      0.8,
      1,
      0.8,
      new THREE.MeshStandardMaterial({
        color: COLOR[v],
        emissive: COLOR[v],
        emissiveIntensity: 1.1,
        transparent: true,
        opacity: 0.85,
      }),
      SIDE[v] * 5.4,
      0.5,
      1.6,
      scene,
      false,
    );
    col.scale.y = 0.001;
    columns[v] = col;
    const cv = document.createElement("canvas");
    cv.width = 256;
    cv.height = 96;
    const ct = new THREE.CanvasTexture(cv);
    ct.colorSpace = THREE.SRGBColorSpace;
    const counter = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: ct,
        transparent: true,
        toneMapped: false,
        depthWrite: false,
      }),
    );
    counter.scale.set(1.6, 0.6, 1);
    scene.add(counter);
    counters[v] = { cv, ct, sprite: counter, last: -1 };
  });

  let highlighted = null;
  const redraw = () =>
    ["a", "b"].forEach((v) => {
      drawScreen(screens[v].canvas.getContext("2d"), v, highlighted?.[v]);
      screens[v].tex.needsUpdate = true;
    });
  loadScreens(labels.screens).then(redraw);

  const winnerTag = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: label("✓ WINNER", { bg: "#34d399", fg: "#052e1f", size: 58 }),
      transparent: true,
      toneMapped: false,
    }),
  );
  winnerTag.scale.set(0.001, 0.001, 1);
  scene.add(winnerTag);

  // "+$65" pops above a phone on every visual sale
  const popTex = label(labels.sale, { fg: "#4ade80", size: 84 });
  const pops = Array.from({ length: POPS }, () => {
    const s = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: popTex,
        transparent: true,
        toneMapped: false,
        depthWrite: false,
      }),
    );
    s.scale.set(1.3, 0.33, 1);
    s.visible = false;
    scene.add(s);
    return { s, t: 1 };
  });
  let popIndex = 0;
  const popSale = (v) => {
    const p = pops[popIndex++ % POPS];
    p.t = 0;
    p.x = SIDE[v] * 2.9 + (Math.random() - 0.5) * 1.2;
    p.s.visible = true;
  };

  // Shoppers: three instanced meshes for every person in the scene
  const people = {
    torso: new THREE.InstancedMesh(
      new THREE.CapsuleGeometry(0.15, 0.36, 4, 10),
      std("#fff"),
      MAX_PEOPLE,
    ),
    head: new THREE.InstancedMesh(new THREE.SphereGeometry(0.115, 14, 10), std("#fff"), MAX_PEOPLE),
    legs: new THREE.InstancedMesh(
      new THREE.BoxGeometry(0.1, 0.5, 0.11).translate(0, -0.25, 0),
      std("#fff"),
      MAX_PEOPLE * 2,
    ),
  };
  Object.values(people).forEach((m) => {
    m.castShadow = true;
    m.count = 0;
    m.frustumCulled = false;
    scene.add(m);
  });
  const shirts = ["#e2e8f0", "#93c5fd", "#fda4af", "#fcd34d", "#a7f3d0", "#c4b5fd", "#f8fafc"];
  const pants = ["#334155", "#1e3a5f", "#475569", "#3f3f46"];
  const skins = ["#f1c7a5", "#d9a47c", "#a86f4c", "#7a4d33", "#e8b896"];
  const pick = (list) => list[Math.floor(Math.random() * list.length)];
  const shoppers = [];
  let alternate = 0;

  const spawn = () => {
    const v = alternate++ % 2 ? "b" : "a";
    const s = SIDE[v];
    const jitter = () => (Math.random() - 0.5) * 0.6;
    const buys = Math.random() < BUY[v];
    shoppers.push({
      v,
      buys,
      pos: new THREE.Vector3(jitter(), 0, PLAZA - 0.3),
      heading: Math.PI,
      route: [
        new THREE.Vector3(jitter() * 0.5, 0, 6.4),
        new THREE.Vector3(s * 2.9 + jitter(), 0, 3.5),
      ],
      after: buys
        ? [new THREE.Vector3(s * 4.4, 0, -1.5), new THREE.Vector3(s * 2.2, 0, -4.6)]
        : [new THREE.Vector3(s * (PLAZA + 0.5), 0, 4.6 + jitter())],
      leg: 0,
      wait: 0,
      life: Math.random() * 3,
      speed: 1.7 + Math.random() * 0.5,
      colors: [
        new THREE.Color(pick(shirts)),
        new THREE.Color(pick(skins)),
        new THREE.Color(pick(pants)),
      ],
    });
  };

  const m4 = new THREE.Matrix4();
  const tmp = new THREE.Matrix4();
  const base = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  const one = new THREE.Vector3(1, 1, 1);
  const drawPeople = () => {
    shoppers.forEach((s, i) => {
      const bob = s.wait > 0 ? 0 : Math.abs(Math.sin(s.life * 7)) * 0.03;
      const swing = s.wait > 0 ? 0 : Math.sin(s.life * 7) * 0.5;
      q.setFromAxisAngle(up, s.heading);
      base.compose(s.pos, q, one);
      people.torso.setMatrixAt(i, m4.copy(base).multiply(tmp.makeTranslation(0, 0.84 + bob, 0)));
      people.torso.setColorAt(i, s.colors[0]);
      people.head.setMatrixAt(i, m4.copy(base).multiply(tmp.makeTranslation(0, 1.32 + bob, 0)));
      people.head.setColorAt(i, s.colors[1]);
      [-1, 1].forEach((side, k) => {
        m4.copy(base)
          .multiply(tmp.makeTranslation(side * 0.07, 0.5 + bob, 0))
          .multiply(tmp.makeRotationX(side * swing));
        people.legs.setMatrixAt(i * 2 + k, m4);
        people.legs.setColorAt(i * 2 + k, s.colors[2]);
      });
    });
    people.torso.count = shoppers.length;
    people.head.count = shoppers.length;
    people.legs.count = shoppers.length * 2;
    Object.values(people).forEach((m) => {
      m.instanceMatrix.needsUpdate = true;
      if (m.instanceColor) m.instanceColor.needsUpdate = true;
    });
  };

  // Columns follow the simulated conversions; counters redraw only when the number changes.
  const totals = { a: 0, b: 0, max: 1 };
  const drawCounter = (v, n) => {
    const c = counters[v];
    if (c.last === n) return;
    c.last = n;
    const ctx = c.cv.getContext("2d");
    ctx.clearRect(0, 0, 256, 96);
    ctx.font = `800 60px ${FONT}`;
    ctx.fillStyle = COLOR[v];
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(n.toLocaleString("en-US"), 128, 52);
    c.ct.needsUpdate = true;
  };

  // Camera tweens, clicks on phones
  let tween = null;
  let distance = 1;
  let pristine = true;
  const overviewName = () => (camera.aspect < 1.3 ? "overviewNarrow" : "overview");
  const setView = (name) => {
    pristine = false;
    const v = VIEWS[name === "overview" ? overviewName() : name] || VIEWS.overview;
    distance = 1;
    tween = {
      t: 0,
      fromPos: camera.position.clone(),
      fromTarget: controls.target.clone(),
      toPos: new THREE.Vector3(...v.pos),
      toTarget: new THREE.Vector3(...v.target),
    };
  };
  controls.addEventListener("start", () => {
    tween = null;
    pristine = false;
  });
  // A few seconds in, swing the camera 25° and back so visitors see the model can be turned.
  let swing = null;
  const swingTimer = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? null
    : setTimeout(() => {
        if (pristine) swing = { t: 0, offset: camera.position.clone().sub(controls.target) };
      }, 2500);
  const zoom = (factor) => {
    const next = THREE.MathUtils.clamp(distance * factor, 0.55, 1.5);
    const dir = camera.position.clone().sub(controls.target);
    camera.position.copy(controls.target).add(dir.multiplyScalar(next / distance));
    distance = next;
    tween = null;
    pristine = false;
  };
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const hitPhone = (e) => {
    const r = renderer.domElement.getBoundingClientRect();
    pointer.set(
      ((e.clientX - r.left) / r.width) * 2 - 1,
      -((e.clientY - r.top) / r.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObjects(phones, false)[0]?.object.userData.view;
  };
  let downAt = null;
  const onDown = (e) => (downAt = [e.clientX, e.clientY]);
  const onUp = (e) => {
    // a click, not the end of a drag
    if (!downAt || Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 6) return;
    const v = hitPhone(e);
    if (v) {
      setView(v);
      onSelect?.(v);
    }
  };
  const onMove = (e) => {
    if (e.buttons) return;
    renderer.domElement.style.cursor = hitPhone(e) ? "pointer" : "";
  };
  renderer.domElement.addEventListener("pointerdown", onDown);
  renderer.domElement.addEventListener("pointerup", onUp);
  renderer.domElement.addEventListener("pointermove", onMove);

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = container;
    if (!w || !h) return;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    // Keep a ~48° horizontal view so the whole plinth fits narrow stages too.
    const fit = 2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(24)) / camera.aspect);
    camera.fov = Math.max(32, THREE.MathUtils.radToDeg(fit));
    camera.updateProjectionMatrix();
    if (pristine) {
      const v = VIEWS[overviewName()];
      camera.position.set(...v.pos);
      controls.target.set(...v.target);
    }
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  let isPlaying = playing;
  let interval = spawnEvery(traffic);
  let spawnClock = 0;
  let winner = false;
  const timer = new THREE.Timer();

  const step = () => {
    timer.update();
    const dt = Math.min(timer.getDelta(), 0.05);
    const time = timer.getElapsed();

    if (tween) {
      tween.t = Math.min(1, tween.t + dt / 1.1);
      const e = tween.t < 0.5 ? 2 * tween.t * tween.t : 1 - (-2 * tween.t + 2) ** 2 / 2;
      camera.position.lerpVectors(tween.fromPos, tween.toPos, e);
      controls.target.lerpVectors(tween.fromTarget, tween.toTarget, e);
      if (tween.t === 1) tween = null;
    }
    if (swing && pristine) {
      swing.t = Math.min(1, swing.t + dt / 3.2);
      const angle = THREE.MathUtils.degToRad(25) * Math.sin(Math.PI * swing.t);
      camera.position
        .copy(controls.target)
        .add(swing.offset.clone().applyAxisAngle(camera.up, angle));
      if (swing.t === 1) swing = null;
    } else swing = null;
    controls.update();

    if (isPlaying) {
      spawnClock += dt;
      if (spawnClock > interval && shoppers.length < MAX_PEOPLE) {
        spawnClock = 0;
        spawn();
      }
      for (let i = shoppers.length - 1; i >= 0; i--) {
        const s = shoppers[i];
        s.life += dt;
        if (s.wait > 0) {
          s.wait -= dt;
          if (s.wait <= 0 && s.buys) popSale(s.v);
          continue;
        }
        const target = s.route[s.leg];
        if (!target) {
          shoppers.splice(i, 1);
          continue;
        }
        const d = target.clone().sub(s.pos);
        const dist = d.length();
        const move = s.speed * dt;
        if (dist <= move) {
          s.pos.copy(target);
          s.leg++;
          if (s.leg === s.route.length && s.after) {
            s.route = s.after;
            s.after = null;
            s.leg = 0;
            s.wait = 0.8;
            s.heading = Math.PI;
          }
        } else {
          s.pos.add(d.multiplyScalar(move / dist));
          s.heading = Math.atan2(d.x, d.z);
        }
      }
      drawPeople();
    }

    pops.forEach((p) => {
      if (p.t >= 1) return;
      p.t = Math.min(1, p.t + dt / 1.4);
      p.s.position.set(p.x, 5.6 + p.t * 1.6, 1.4);
      p.s.material.opacity = 1 - p.t * p.t;
      if (p.t === 1) p.s.visible = false;
    });

    ["a", "b"].forEach((v) => {
      const h = Math.max(0.001, (totals[v] / totals.max) * 4.2);
      const col = columns[v];
      col.scale.y = THREE.MathUtils.lerp(col.scale.y, h, 0.12);
      col.position.y = col.scale.y / 2;
      counters[v].sprite.position.set(SIDE[v] * 5.4, col.scale.y + 0.45, 1.6);
    });

    const wt = winner ? 1 : 0.001;
    const ws = THREE.MathUtils.lerp(winnerTag.scale.x / 1.8, wt, 0.15);
    winnerTag.scale.set(ws * 1.8, ws * 0.45, 1);
    winnerTag.position.set(2.9, 6.2 + Math.sin(time * 2.4) * 0.08, 1.2);
    beacon.material.emissiveIntensity = Math.sin(time * 3) > 0.7 ? 3 : 0.15;

    renderer.render(scene, camera);
  };

  // Only render while the stage is on screen and the tab is visible.
  let onScreen = true;
  const sync = () => renderer.setAnimationLoop(onScreen && !document.hidden ? step : null);
  const io = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    sync();
  });
  io.observe(container);
  document.addEventListener("visibilitychange", sync);
  sync();

  return {
    setPlaying: (p) => (isPlaying = p),
    setTraffic: (t) => (interval = spawnEvery(t)),
    setWinner: (w) => (winner = w),
    setTotals: ({ a, b, max }) => {
      Object.assign(totals, { a, b, max: Math.max(1, max) });
      drawCounter("a", a);
      drawCounter("b", b);
    },
    highlight: (variant, region) => {
      highlighted = region ? { [variant]: region } : null;
      redraw();
    },
    setView,
    zoom,
    setExplore: (on) => {
      if (on === controls.autoRotate) return;
      setExplore(on);
      if (on) {
        pristine = false;
        swing = null;
        tween = null;
      } else setView("overview");
    },
    reset: () => {
      shoppers.length = 0;
      pops.forEach((p) => ((p.t = 1), (p.s.visible = false)));
      drawPeople();
    },
    dispose: () => {
      renderer.setAnimationLoop(null);
      clearTimeout(swingTimer);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      renderer.domElement.removeEventListener("pointerdown", onDown);
      renderer.domElement.removeEventListener("pointerup", onUp);
      renderer.domElement.removeEventListener("pointermove", onMove);
      controls.dispose();
      scene.traverse((o) => {
        o.geometry?.dispose();
        const m = o.material;
        if (m) (Array.isArray(m) ? m : [m]).forEach((x) => (x.map?.dispose(), x.dispose()));
      });
      envTarget.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
};
