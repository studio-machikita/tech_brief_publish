import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  createCloudCanvas,
  createEarthCanvases,
  createGlowCanvas,
  createMoonCanvases,
  createStarData,
} from './procedural.js';
import { BODY_INFO, MOON_PHASES, OVERVIEW_INFO } from './content.js';

window.__orbitLabReady = true; // モジュールの読み込みに成功した（index.html の案内を抑止）

const DEG = Math.PI / 180;

// 教育用に誇張したスケールと速度。時間の単位は「日」。
const CONFIG = {
  sunRadius: 5,
  earthRadius: 1.2,
  moonRadius: 0.34,
  earthOrbitRadius: 28,
  moonOrbitRadius: 3.6,
  axialTilt: 23.44 * DEG,
  moonInclination: 12 * DEG, // 実際は約 5.1°。傾きが見えるよう誇張
  moonStartAngle: 240 * DEG, // 開始時に三日月付近になる位置
  yearDays: 365.25,
  siderealMonthDays: 27.32,
  yearSeconds: 90, // 速度 ×1 で 1 公転にかかる実時間（秒）
  earthSpinSeconds: 2.5, // 速度 ×1 で 1 自転にかかる実時間（秒）。視認性のため減速
  maxPixelRatio: 2,
  maxDelta: 0.1, // タブ復帰時などの大きな dt で天体が飛ばないよう制限
  defaultSeed: 20260923,
};
const DAYS_PER_SECOND = CONFIG.yearDays / CONFIG.yearSeconds;

const $ = (id) => document.getElementById(id);
const dom = {
  stage: $('stage'),
  labels: $('labels'),
  loading: $('loading'),
  fallback: $('fallback'),
  fallbackDetail: $('fallback-detail'),
  timeReadout: $('time-readout'),
  status: $('status'),
  controls: $('controls'),
  play: $('btn-play'),
  speed: $('speed'),
  speedValue: $('speed-value'),
  orbits: $('btn-orbits'),
  reset: $('btn-reset'),
  focusButtons: [...document.querySelectorAll('[data-focus]')],
  info: $('info'),
  infoToggle: $('info-toggle'),
  infoKicker: $('info-kicker'),
  infoTitle: $('info-title'),
  infoDesc: $('info-desc'),
  infoFacts: $('info-facts'),
  infoLive: $('info-live'),
  infoNote: $('info-note'),
  infoFocus: $('info-focus'),
};

function showFallback(detail) {
  dom.loading.hidden = true;
  if (detail) dom.fallbackDetail.textContent = detail;
  dom.fallback.hidden = false;
}

function isWebGL2Available() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
  } catch {
    return false;
  }
}

function readSeed() {
  const raw = new URLSearchParams(location.search).get('seed');
  const parsed = Number.parseInt(raw ?? '', 10);
  return Number.isFinite(parsed) ? parsed >>> 0 : CONFIG.defaultSeed;
}

const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 0)));

// ---------------------------------------------------------------------------
// シェーダー
// ---------------------------------------------------------------------------

const SUN_VERTEX = /* glsl */ `
  varying vec3 vPos;
  varying vec3 vNormalView;
  varying vec3 vViewPos;
  void main() {
    vPos = position;
    vNormalView = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewPos = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const SUN_FRAGMENT = /* glsl */ `
  uniform float uTime;
  varying vec3 vPos;
  varying vec3 vNormalView;
  varying vec3 vViewPos;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
      f.z);
  }
  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }
  void main() {
    vec3 p = normalize(vPos);
    float large = fbm(p * 2.6 + vec3(0.0, uTime * 0.04, uTime * 0.02));
    float granules = fbm(p * 11.0 - vec3(uTime * 0.09));
    float g = large * 0.55 + granules * 0.45;
    vec3 deep = vec3(0.95, 0.38, 0.05);
    vec3 mid = vec3(1.0, 0.72, 0.25);
    vec3 hot = vec3(1.0, 0.96, 0.78);
    vec3 col = mix(deep, mid, smoothstep(0.32, 0.55, g));
    col = mix(col, hot, smoothstep(0.55, 0.75, g));
    // 周縁減光（縁ほど暗く赤い）
    float mu = clamp(dot(normalize(vNormalView), normalize(-vViewPos)), 0.0, 1.0);
    col *= 0.5 + 0.5 * pow(mu, 0.45);
    col = mix(vec3(1.0, 0.45, 0.1) * 0.8, col, smoothstep(0.0, 0.35, mu));
    gl_FragColor = vec4(col * 1.15, 1.0);
  }
`;

const ATMOSPHERE_VERTEX = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vViewDirW;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vViewDirW = normalize(cameraPosition - wp.xyz);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const ATMOSPHERE_FRAGMENT = /* glsl */ `
  uniform vec3 uSunDir;
  uniform vec3 uColor;
  varying vec3 vNormalW;
  varying vec3 vViewDirW;
  void main() {
    vec3 n = normalize(vNormalW);
    float fresnel = pow(1.0 - clamp(dot(n, normalize(vViewDirW)), 0.0, 1.0), 2.6);
    // 大気の光も昼側だけに出して、昼夜の境界を見やすくする
    float lit = smoothstep(-0.3, 0.45, dot(n, uSunDir));
    float a = fresnel * lit;
    gl_FragColor = vec4(uColor * a * 1.3, a);
  }
`;

const STAR_VERTEX = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aPhase;
  uniform float uPixelRatio;
  uniform float uTime;
  varying vec3 vColor;
  void main() {
    float twinkle = 0.82 + 0.18 * sin(uTime * (0.6 + aPhase * 1.8) + aPhase * 40.0);
    vColor = aColor * twinkle;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio;
  }
`;

const STAR_FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d);
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor * a, 1.0);
  }
`;

// ---------------------------------------------------------------------------
// シーン構築
// ---------------------------------------------------------------------------

function canvasTexture(canvas, { srgb = true, anisotropy = 1 } = {}) {
  const texture = new THREE.CanvasTexture(canvas);
  if (srgb) texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = anisotropy;
  return texture;
}

function makeCircle(radius, color, opacity, segments = 256) {
  const points = [];
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(a) * radius, 0, -Math.sin(a) * radius));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false, toneMapped: false });
  return new THREE.LineLoop(geometry, material);
}

function makeDisc(radius, color, opacity) {
  const geometry = new THREE.CircleGeometry(radius, 96);
  geometry.rotateX(-Math.PI / 2);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    side: THREE.DoubleSide,
    depthWrite: false,
    toneMapped: false,
  });
  return new THREE.Mesh(geometry, material);
}

function makeLine(from, to, color, opacity = 1, dashed = false) {
  const geometry = new THREE.BufferGeometry().setFromPoints([from, to]);
  const material = dashed
    ? new THREE.LineDashedMaterial({ color, dashSize: 0.25, gapSize: 0.18, transparent: true, opacity, toneMapped: false })
    : new THREE.LineBasicMaterial({ color, transparent: true, opacity, toneMapped: false });
  const line = new THREE.Line(geometry, material);
  if (dashed) line.computeLineDistances();
  return line;
}

function addPickProxy(parent, radius, key) {
  // 小さな天体（特に月）をタップしやすくするための、見えない当たり判定球
  const proxy = new THREE.Mesh(new THREE.SphereGeometry(radius, 16, 12), new THREE.MeshBasicMaterial({ visible: false }));
  proxy.userData.bodyKey = key;
  parent.add(proxy);
  return proxy;
}

function buildScene(renderer, seed) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x02030a);
  const anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  // 光源: 太陽を唯一の点光源とし、夜側がわずかに見える程度の環境光を足す
  const sunLight = new THREE.PointLight(0xfff1dc, 3.4, 0, 0);
  scene.add(sunLight);
  scene.add(new THREE.AmbientLight(0x6078a8, 0.18));

  // 恒星背景（カメラに追従させて視差をなくす）
  const starData = createStarData(seed);
  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starData.positions, 3));
  starGeometry.setAttribute('aColor', new THREE.BufferAttribute(starData.colors, 3));
  starGeometry.setAttribute('aSize', new THREE.BufferAttribute(starData.sizes, 1));
  starGeometry.setAttribute('aPhase', new THREE.BufferAttribute(starData.phases, 1));
  const starMaterial = new THREE.ShaderMaterial({
    uniforms: { uPixelRatio: { value: 1 }, uTime: { value: 0 } },
    vertexShader: STAR_VERTEX,
    fragmentShader: STAR_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const stars = new THREE.Points(starGeometry, starMaterial);
  stars.frustumCulled = false;
  stars.renderOrder = -1;
  scene.add(stars);

  // 太陽
  const sunMaterial = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: SUN_VERTEX,
    fragmentShader: SUN_FRAGMENT,
  });
  const sun = new THREE.Mesh(new THREE.SphereGeometry(CONFIG.sunRadius, 64, 48), sunMaterial);
  sun.userData.bodyKey = 'sun';
  scene.add(sun);

  const glowTexture = canvasTexture(createGlowCanvas(256));
  const glowMaterial = (color, opacity) =>
    new THREE.SpriteMaterial({
      map: glowTexture,
      color,
      opacity,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
  const glow = new THREE.Sprite(glowMaterial(0xffc070, 0.9));
  glow.scale.setScalar(CONFIG.sunRadius * 4.6);
  const corona = new THREE.Sprite(glowMaterial(0xff8a3a, 0.35));
  corona.scale.setScalar(CONFIG.sunRadius * 10);
  scene.add(glow, corona);

  // 軌道線・軌道面（表示切替の対象）
  const orbitVisuals = [];
  const ecliptic = new THREE.Group();
  const grid = new THREE.PolarGridHelper(CONFIG.earthOrbitRadius + 8, 12, 6, 128, 0x24476b, 0x152a42);
  grid.material.transparent = true;
  grid.material.opacity = 0.32;
  grid.material.depthWrite = false;
  ecliptic.add(grid);
  ecliptic.add(makeCircle(CONFIG.earthOrbitRadius, 0x4fa3ff, 0.85));
  scene.add(ecliptic);
  orbitVisuals.push(ecliptic);

  // 地球系: 位置だけ動かし、回転させない（地軸の向きを宇宙空間に対して固定するため）
  const earthSystem = new THREE.Group();
  scene.add(earthSystem);

  const localEcliptic = new THREE.Group();
  localEcliptic.add(makeDisc(CONFIG.moonOrbitRadius + 1.1, 0x4fa3ff, 0.07));
  localEcliptic.add(makeCircle(CONFIG.moonOrbitRadius + 1.1, 0x4fa3ff, 0.35, 128));
  earthSystem.add(localEcliptic);
  orbitVisuals.push(localEcliptic);

  const earthTilt = new THREE.Group();
  earthTilt.rotation.z = -CONFIG.axialTilt; // 北極は +X 方向へ傾いたまま
  earthSystem.add(earthTilt);

  const earthMaps = createEarthCanvases(seed);
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(CONFIG.earthRadius, 96, 64),
    new THREE.MeshStandardMaterial({
      map: canvasTexture(earthMaps.colorCanvas, { anisotropy }),
      roughnessMap: canvasTexture(earthMaps.roughCanvas, { srgb: false, anisotropy }),
      roughness: 1,
      metalness: 0,
    }),
  );
  earthTilt.add(earth);

  const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(CONFIG.earthRadius * 1.012, 96, 64),
    new THREE.MeshStandardMaterial({
      map: canvasTexture(createCloudCanvas(seed, 1024), { anisotropy }),
      transparent: true,
      depthWrite: false,
      roughness: 1,
      metalness: 0,
    }),
  );
  earth.add(clouds);

  const atmosphereMaterial = new THREE.ShaderMaterial({
    uniforms: { uSunDir: { value: new THREE.Vector3(-1, 0, 0) }, uColor: { value: new THREE.Color(0x5fb4ff) } },
    vertexShader: ATMOSPHERE_VERTEX,
    fragmentShader: ATMOSPHERE_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(CONFIG.earthRadius * 1.07, 64, 48), atmosphereMaterial);
  earthTilt.add(atmosphere);

  // 地軸と赤道（傾きの可視化。常に表示）
  const axisLength = CONFIG.earthRadius * 1.9;
  earthTilt.add(makeLine(new THREE.Vector3(0, -axisLength, 0), new THREE.Vector3(0, axisLength, 0), 0x8fd8ff, 0.9));
  const northMarker = new THREE.Mesh(
    new THREE.ConeGeometry(0.07, 0.22, 12),
    new THREE.MeshBasicMaterial({ color: 0xff7a7a, toneMapped: false }),
  );
  northMarker.position.y = axisLength;
  earthTilt.add(northMarker);
  earthTilt.add(makeCircle(CONFIG.earthRadius * 1.1, 0xffd27a, 0.45, 128));

  // 月: 傾いた軌道面 → 公転ピボット → 月（ピボットの子なので常に同じ面が地球を向く）
  const moonPlane = new THREE.Group();
  moonPlane.rotation.x = CONFIG.moonInclination;
  earthSystem.add(moonPlane);

  const moonOrbitVisuals = new THREE.Group();
  moonOrbitVisuals.add(makeDisc(CONFIG.moonOrbitRadius, 0xffd27a, 0.1));
  moonOrbitVisuals.add(makeCircle(CONFIG.moonOrbitRadius, 0xc8ccd6, 0.9, 192));
  // 交点線（黄道面と月の軌道面が交わる線）
  const nodeReach = CONFIG.moonOrbitRadius + 1.1;
  moonOrbitVisuals.add(
    makeLine(new THREE.Vector3(-nodeReach, 0, 0), new THREE.Vector3(nodeReach, 0, 0), 0xffd27a, 0.7, true),
  );
  moonPlane.add(moonOrbitVisuals);
  orbitVisuals.push(moonOrbitVisuals);

  const moonPivot = new THREE.Group();
  moonPlane.add(moonPivot);
  const moonMaps = createMoonCanvases(seed, 1024);
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(CONFIG.moonRadius, 64, 48),
    new THREE.MeshStandardMaterial({
      map: canvasTexture(moonMaps.colorCanvas, { anisotropy }),
      bumpMap: canvasTexture(moonMaps.bumpCanvas, { srgb: false, anisotropy }),
      bumpScale: 2.5,
      roughness: 1,
      metalness: 0,
    }),
  );
  moon.position.set(CONFIG.moonOrbitRadius, 0, 0);
  moonPivot.add(moon);

  // 選択リング（常にカメラを向く）
  const selectionRing = new THREE.Mesh(
    new THREE.RingGeometry(1, 1.035, 96),
    new THREE.MeshBasicMaterial({
      color: 0x7fdcff,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  selectionRing.renderOrder = 10;
  selectionRing.visible = false;
  scene.add(selectionRing);

  const pickTargets = [
    sun,
    addPickProxy(earth, CONFIG.earthRadius * 1.3, 'earth'),
    addPickProxy(moon, 0.75, 'moon'),
  ];

  return {
    scene,
    stars,
    sun,
    earth,
    clouds,
    earthSystem,
    earthTilt,
    atmosphereMaterial,
    moonPivot,
    moon,
    selectionRing,
    orbitVisuals,
    pickTargets,
  };
}

// ---------------------------------------------------------------------------
// アプリ本体
// ---------------------------------------------------------------------------

async function main() {
  if (!isWebGL2Available()) {
    showFallback();
    return;
  }

  // 生成処理の前に読み込み表示を一度描画させる
  await nextFrame();

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  } catch (error) {
    console.error(error);
    showFallback('WebGL の初期化に失敗しました。ハードウェアアクセラレーションが無効か、GPU が利用できない可能性があります。');
    return;
  }
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  dom.stage.appendChild(renderer.domElement);
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute('aria-label', '3Dビュー。ドラッグで回転、ホイールでズーム、クリックで天体を選択');

  // コンテキスト消失時は three.js の自動復旧を待ち、復旧しなければ案内を出す
  let contextLostTimer = 0;
  renderer.domElement.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    console.warn('WebGL context lost; waiting for restore');
    contextLostTimer = setTimeout(
      () => showFallback('GPU の描画コンテキストが失われ、復旧できませんでした。ページを再読み込みしてください。'),
      5000,
    );
  });
  renderer.domElement.addEventListener('webglcontextrestored', () => {
    clearTimeout(contextLostTimer);
    console.info('WebGL context restored');
  });

  const seed = readSeed();
  const world = buildScene(renderer, seed);
  const { scene } = world;

  const camera = new THREE.PerspectiveCamera(45, 1, 0.05, 3000);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false; // フォーカス追従と両立させるため、回転とズームのみ
  controls.minDistance = CONFIG.sunRadius * 1.4;
  controls.maxDistance = 260;
  controls.rotateSpeed = 0.8;

  const bodies = {
    sun: { key: 'sun', object: world.sun, radius: CONFIG.sunRadius, focusDistance: 26 },
    earth: { key: 'earth', object: world.earth, radius: CONFIG.earthRadius, focusDistance: 8 },
    moon: { key: 'moon', object: world.moon, radius: CONFIG.moonRadius, focusDistance: 2.8 },
  };

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const state = {
    playing: !reducedMotion,
    speed: 1,
    simDays: 0,
    showOrbits: true,
    selected: null,
    focus: 'overview',
    transition: null,
    lastFocusPos: new THREE.Vector3(),
  };

  // ---- 共通の一時オブジェクト ----
  const tmpA = new THREE.Vector3();
  const tmpB = new THREE.Vector3();
  const tmpC = new THREE.Vector3();
  const ORIGIN = new THREE.Vector3();
  // 開始位置の地球（+X）が画面の左手前に来る向き。右上の説明パネルと重ならない
  const OVERVIEW_DIR = new THREE.Vector3(0.72, 0.55, -0.72).normalize();

  function bodyWorldPosition(key, out) {
    if (key === 'overview') return out.copy(ORIGIN);
    return bodies[key].object.getWorldPosition(out);
  }

  // 縦長画面では同じ天体が収まるよう距離を伸ばす
  const aspectFactor = () => THREE.MathUtils.clamp(0.9 / camera.aspect, 1, 2.1);

  function overviewDistance() {
    const halfWidth = CONFIG.earthOrbitRadius + CONFIG.moonOrbitRadius + 3;
    const tanHalf = Math.tan((camera.fov * DEG) / 2);
    return THREE.MathUtils.clamp(halfWidth / (tanHalf * Math.min(camera.aspect, 1.5)), 50, 200);
  }

  function focusDistance(key) {
    return key === 'overview' ? overviewDistance() : bodies[key].focusDistance * aspectFactor();
  }

  function minDistanceFor(key) {
    return key === 'overview' ? CONFIG.sunRadius * 1.4 : bodies[key].radius * (key === 'sun' ? 1.4 : 1.8);
  }

  // OrbitControls の慣性を残さずにカメラを置く
  function placeCamera(position, target) {
    camera.position.copy(position);
    controls.target.copy(target);
    const damping = controls.enableDamping;
    controls.enableDamping = false;
    controls.update();
    controls.enableDamping = damping;
  }

  // ---- シミュレーション ----
  function updateSimulation() {
    const simSeconds = state.simDays / DAYS_PER_SECOND;
    const theta = (state.simDays / CONFIG.yearDays) * Math.PI * 2;
    world.earthSystem.position.set(
      Math.cos(theta) * CONFIG.earthOrbitRadius,
      0,
      -Math.sin(theta) * CONFIG.earthOrbitRadius,
    );
    world.earth.rotation.y = (simSeconds / CONFIG.earthSpinSeconds) * Math.PI * 2;
    world.clouds.rotation.y = simSeconds * 0.04;
    world.moonPivot.rotation.y = CONFIG.moonStartAngle + (state.simDays / CONFIG.siderealMonthDays) * Math.PI * 2;
    world.sun.rotation.y = simSeconds * 0.02;
    world.sun.material.uniforms.uTime.value = simSeconds;
    world.atmosphereMaterial.uniforms.uSunDir.value.copy(world.earthSystem.position).negate().normalize();
    scene.updateMatrixWorld();
  }

  // ---- カメラフォーカス ----
  function focusOn(key, { select: shouldSelect = true } = {}) {
    const offset = tmpA.copy(camera.position).sub(controls.target);
    const fromDistance = offset.length();
    let dir;
    if (key === 'overview') {
      dir = OVERVIEW_DIR.clone();
    } else if (key === 'sun') {
      dir = offset.normalize().clone();
      if (Math.abs(dir.y) > 0.97) dir.set(0, 0.5, 1).normalize(); // 真上・真下からの急な反転を避ける
    } else {
      // 太陽方向から約55°ずらした斜め前から見る: 昼側と明暗境界線が同時に見える
      const toSun = bodyWorldPosition(key, new THREE.Vector3()).setY(0).negate().normalize();
      dir = toSun.applyAxisAngle(THREE.Object3D.DEFAULT_UP, 55 * DEG).setY(0.38).normalize();
    }
    state.focus = key;
    state.transition = {
      from: controls.target.clone(),
      fromDistance,
      toDistance: focusDistance(key),
      dir,
      elapsed: 0,
      duration: 1.1,
    };
    controls.enabled = false;
    controls.minDistance = Math.min(minDistanceFor(key), fromDistance);
    if (shouldSelect) select(key === 'overview' ? null : key);
    syncUI();
    announce(key === 'overview' ? '全体表示に切り替えました' : `${BODY_INFO[key].name}にフォーカスしました`);
  }

  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  function updateCamera(dt) {
    const target = bodyWorldPosition(state.focus, tmpB);
    const tr = state.transition;
    if (tr) {
      tr.elapsed += dt;
      const k = easeInOut(Math.min(tr.elapsed / tr.duration, 1));
      const distance = THREE.MathUtils.lerp(tr.fromDistance, tr.toDistance, k);
      const center = tmpC.lerpVectors(tr.from, target, k);
      placeCamera(tmpA.copy(center).addScaledVector(tr.dir, distance), center);
      if (k >= 1) {
        state.transition = null;
        controls.enabled = true;
        controls.minDistance = minDistanceFor(state.focus);
      }
    } else {
      // 追従: 天体の移動量だけカメラと注視点を平行移動する（ユーザーの回転・ズームは保たれる）
      const delta = tmpA.copy(target).sub(state.lastFocusPos);
      controls.target.add(delta);
      camera.position.add(delta);
      controls.update();
    }
    state.lastFocusPos.copy(target);
  }

  // ---- 選択と説明パネル ----
  const labelEls = {};
  for (const key of Object.keys(bodies)) {
    const el = document.createElement('div');
    el.className = 'body-label';
    el.textContent = BODY_INFO[key].name;
    dom.labels.appendChild(el);
    labelEls[key] = el;
  }

  function renderInfo(key) {
    const info = key ? BODY_INFO[key] : OVERVIEW_INFO;
    dom.infoKicker.textContent = info.kicker;
    dom.infoTitle.textContent = info.name;
    dom.infoDesc.textContent = info.description;
    dom.infoFacts.replaceChildren(
      ...info.facts.flatMap(([term, value]) => {
        const dt = document.createElement('dt');
        dt.textContent = term;
        const dd = document.createElement('dd');
        dd.textContent = value;
        return [dt, dd];
      }),
    );
    dom.infoNote.textContent = key ? info.note : `${info.note} ・ 恒星配置の seed: ${seed}`;
    dom.infoFocus.hidden = !key;
    dom.info.dataset.body = key ?? 'overview';
    updateLiveInfo();
  }

  function select(key) {
    state.selected = key;
    world.selectionRing.visible = Boolean(key);
    for (const [k, el] of Object.entries(labelEls)) el.classList.toggle('is-selected', k === key);
    renderInfo(key);
    if (key) setInfoCollapsed(false);
  }

  function setInfoCollapsed(collapsed) {
    dom.info.classList.toggle('collapsed', collapsed);
    dom.infoToggle.setAttribute('aria-expanded', String(!collapsed));
  }

  function liveRows(rows) {
    dom.infoLive.replaceChildren(
      ...rows.map(([label, value]) => {
        const row = document.createElement('div');
        const a = document.createElement('span');
        const b = document.createElement('span');
        a.textContent = label;
        b.textContent = value;
        row.append(a, b);
        return row;
      }),
    );
  }

  const eclipticAngle = (v) => Math.atan2(-v.z, v.x);
  const wrap360 = (deg) => ((deg % 360) + 360) % 360;

  function updateLiveInfo() {
    const key = state.selected;
    const earthPos = world.earthSystem.position;
    const orbitDeg = wrap360((state.simDays / CONFIG.yearDays) * 360);
    if (!key) {
      dom.infoLive.hidden = true;
      return;
    }
    dom.infoLive.hidden = false;
    if (key === 'sun') {
      liveRows([
        ['光源', '点光源（減衰なし）'],
        ['地球の公転位置', `${orbitDeg.toFixed(0)}°`],
      ]);
    } else if (key === 'earth') {
      // 太陽の赤緯 = 地軸と「地球→太陽」方向のなす角の余角
      const axis = tmpA.set(0, 1, 0).applyQuaternion(world.earthTilt.getWorldQuaternion(new THREE.Quaternion()));
      const toSun = tmpB.copy(earthPos).negate().normalize();
      const declination = Math.asin(THREE.MathUtils.clamp(axis.dot(toSun), -1, 1)) / DEG;
      const seasons = ['冬（冬至付近）', '春（春分付近）', '夏（夏至付近）', '秋（秋分付近）'];
      const southern = ['夏', '秋', '冬', '春'];
      const idx = Math.round(orbitDeg / 90) % 4;
      liveRows([
        ['公転位置（冬至=0°）', `${orbitDeg.toFixed(0)}°`],
        ['太陽の赤緯', `${declination >= 0 ? '+' : ''}${declination.toFixed(1)}°`],
        ['北半球の季節', seasons[idx]],
        ['南半球の季節', southern[idx]],
      ]);
    } else if (key === 'moon') {
      const moonPos = world.moon.getWorldPosition(tmpA);
      const rel = tmpC.copy(moonPos).sub(earthPos);
      const toSun = tmpB.copy(earthPos).negate();
      const elongation = wrap360((eclipticAngle(rel) - eclipticAngle(toSun)) / DEG);
      const phase = MOON_PHASES[Math.round(elongation / 45) % 8];
      const age = (elongation / 360) * 29.53;
      const latitude = Math.asin(rel.y / rel.length()) / DEG;
      liveRows([
        ['月相', phase],
        ['月齢（目安）', `${age.toFixed(1)} 日`],
        ['黄道面からの角度', `${latitude >= 0 ? '北' : '南'} ${Math.abs(latitude).toFixed(1)}°`],
      ]);
    }
  }

  function updateSelectionRing(time) {
    const key = state.selected;
    if (!key) return;
    const ring = world.selectionRing;
    bodyWorldPosition(key, ring.position);
    ring.quaternion.copy(camera.quaternion);
    const pulse = 1 + Math.sin(time * 3) * 0.035;
    ring.scale.setScalar(bodies[key].radius * (key === 'sun' ? 1.3 : 1.6) * pulse);
  }

  // ---- ラベル ----
  const viewport = { width: 1, height: 1 };
  const projected = {};
  function updateLabels() {
    const tanHalf = Math.tan((camera.fov * DEG) / 2);
    for (const [key, body] of Object.entries(bodies)) {
      const pos = body.object.getWorldPosition(tmpA);
      const distance = pos.distanceTo(camera.position);
      pos.project(camera);
      const visible = pos.z < 1 && Math.abs(pos.x) < 1.2 && Math.abs(pos.y) < 1.2;
      const x = (pos.x * 0.5 + 0.5) * viewport.width;
      const y = (-pos.y * 0.5 + 0.5) * viewport.height;
      const radiusPx = (body.radius / (distance * tanHalf)) * (viewport.height / 2);
      projected[key] = { x, y, radiusPx, visible };
    }
    // 月が地球に重なって見えるほど小さいときは月のラベルを隠す
    const e = projected.earth;
    const m = projected.moon;
    const moonCrowded = Math.hypot(e.x - m.x, e.y - m.y) < 30 && state.selected !== 'moon';
    for (const [key, p] of Object.entries(projected)) {
      const el = labelEls[key];
      const show = p.visible && !(key === 'moon' && moonCrowded);
      el.style.display = show ? '' : 'none';
      if (show) {
        const offset = Math.min(p.radiusPx, viewport.height * 0.4) + 6;
        el.style.transform = `translate(${p.x.toFixed(1)}px, ${(p.y + offset).toFixed(1)}px) translateX(-50%)`;
      }
    }
  }

  // ---- クリック / タップで選択 ----
  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2();
  let pointerDown = null;
  let hoverPending = false;
  let hoverEvent = null;

  function pickAt(clientX, clientY) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointerNdc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(pointerNdc, camera);
    const hit = raycaster.intersectObjects(world.pickTargets, false)[0];
    return hit ? hit.object.userData.bodyKey : null;
  }

  renderer.domElement.addEventListener('pointerdown', (event) => {
    pointerDown = { x: event.clientX, y: event.clientY, id: event.pointerId, button: event.button };
  });
  renderer.domElement.addEventListener('pointerup', (event) => {
    const start = pointerDown;
    pointerDown = null;
    if (!start || start.id !== event.pointerId || start.button !== 0) return;
    // ドラッグ（視点回転）とクリックを区別する
    if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 6) return;
    const key = pickAt(event.clientX, event.clientY);
    select(key);
    if (key) announce(`${BODY_INFO[key].name}を選択しました`);
  });
  renderer.domElement.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return;
    hoverEvent = event;
    hoverPending = true;
  });

  function updateHover() {
    if (!hoverPending || !hoverEvent) return;
    hoverPending = false;
    if (pointerDown) return;
    const key = pickAt(hoverEvent.clientX, hoverEvent.clientY);
    renderer.domElement.style.cursor = key ? 'pointer' : '';
  }

  // ---- UI ----
  let announceTimer = 0;
  function announce(message) {
    dom.status.textContent = message;
    clearTimeout(announceTimer);
    announceTimer = setTimeout(() => (dom.status.textContent = ''), 2500);
  }

  function syncUI() {
    dom.play.setAttribute('aria-pressed', String(state.playing));
    dom.play.querySelector('.btn-icon').textContent = state.playing ? '⏸' : '▶';
    dom.play.querySelector('.btn-text').textContent = state.playing ? '停止' : '再生';
    dom.speed.value = String(state.speed);
    dom.speedValue.textContent = `×${state.speed.toFixed(1)}`;
    dom.orbits.setAttribute('aria-pressed', String(state.showOrbits));
    for (const button of dom.focusButtons) {
      button.setAttribute('aria-pressed', String(button.dataset.focus === state.focus));
    }
    for (const visual of world.orbitVisuals) visual.visible = state.showOrbits;
    updateTimeReadout();
  }

  function updateTimeReadout() {
    const years = Math.floor(state.simDays / CONFIG.yearDays);
    const days = Math.floor(state.simDays - years * CONFIG.yearDays);
    dom.timeReadout.textContent =
      `経過 ${years}年 ${String(days).padStart(3, '0')}日 ・ ×${state.speed.toFixed(1)} ・ ${state.playing ? '再生中' : '停止中'}`;
  }

  function togglePlay() {
    state.playing = !state.playing;
    syncUI();
    announce(state.playing ? '再生' : '停止');
  }

  function toggleOrbits() {
    state.showOrbits = !state.showOrbits;
    syncUI();
    announce(state.showOrbits ? '軌道線を表示' : '軌道線を非表示');
  }

  function resetAll() {
    state.simDays = 0;
    state.playing = !reducedMotion;
    state.speed = 1;
    state.showOrbits = true;
    state.focus = 'overview';
    state.transition = null;
    controls.enabled = true;
    controls.minDistance = minDistanceFor('overview');
    updateSimulation();
    placeCamera(tmpA.copy(OVERVIEW_DIR).multiplyScalar(overviewDistance()), ORIGIN);
    state.lastFocusPos.copy(ORIGIN);
    select(null);
    setInfoCollapsed(isCompactLayout());
    syncUI();
    announce('初期状態に戻しました');
  }

  dom.play.addEventListener('click', togglePlay);
  dom.orbits.addEventListener('click', toggleOrbits);
  dom.reset.addEventListener('click', resetAll);
  dom.speed.addEventListener('input', () => {
    state.speed = Number(dom.speed.value);
    dom.speedValue.textContent = `×${state.speed.toFixed(1)}`;
    updateTimeReadout();
  });
  for (const button of dom.focusButtons) {
    button.addEventListener('click', () => focusOn(button.dataset.focus));
  }
  dom.infoFocus.addEventListener('click', () => state.selected && focusOn(state.selected));
  dom.infoToggle.addEventListener('click', () => setInfoCollapsed(!dom.info.classList.contains('collapsed')));

  window.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const key = event.key;
    if (event.code === 'Space' || key === 'k' || key === 'K') {
      event.preventDefault();
      if (!event.repeat) togglePlay();
    } else if (key === 'r' || key === 'R') {
      event.preventDefault();
      if (!event.repeat) resetAll();
    } else if (key === 'o' || key === 'O') {
      if (!event.repeat) toggleOrbits();
    } else if (key === '0') {
      focusOn('overview');
    } else if (key === '1') {
      focusOn('sun');
    } else if (key === '2') {
      focusOn('earth');
    } else if (key === '3') {
      focusOn('moon');
    } else if (key === 'Escape') {
      select(null);
    }
  });
  // フォーカス中のボタンが Space で二重に反応しないようにする
  window.addEventListener('keyup', (event) => {
    if (event.code === 'Space') event.preventDefault();
  });

  // ---- リサイズとピクセル比制限 ----
  const isCompactLayout = () => window.matchMedia('(max-width: 720px)').matches;

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    viewport.width = width;
    viewport.height = height;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, CONFIG.maxPixelRatio);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    world.stars.material.uniforms.uPixelRatio.value = pixelRatio;
    updateOverlayLayout();
  }

  // スマホ幅では画面下部をパネルが覆うので、投影の中心を空いている領域の中央へずらす
  function updateOverlayLayout() {
    document.documentElement.style.setProperty('--controls-h', `${dom.controls.offsetHeight}px`);
    const { width, height } = viewport;
    const coveredTop = Math.min(dom.info.getBoundingClientRect().top, dom.controls.getBoundingClientRect().top);
    const shift = isCompactLayout() ? Math.max(0, (height - coveredTop) / 2) : 0;
    if (shift > 0) camera.setViewOffset(width, height, 0, shift, width, height);
    else camera.clearViewOffset();
  }
  window.addEventListener('resize', resize);
  const layoutObserver = new ResizeObserver(updateOverlayLayout);
  layoutObserver.observe(dom.controls);
  layoutObserver.observe(dom.info);

  // ---- 初期化 ----
  resize();
  resetAll();
  dom.status.textContent = '';
  if (reducedMotion) announce('視差効果を減らす設定のため停止状態で開始しました');

  // ---- メインループ（delta time ベース） ----
  let lastTime = performance.now();
  let liveTimer = 0;
  let firstFrame = true;
  renderer.setAnimationLoop((time) => {
    const dt = Math.min(Math.max((time - lastTime) / 1000, 0), CONFIG.maxDelta);
    lastTime = time;

    if (state.playing) state.simDays += dt * state.speed * DAYS_PER_SECOND;
    updateSimulation();
    updateCamera(dt);

    world.stars.position.copy(camera.position);
    world.stars.material.uniforms.uTime.value = time / 1000;
    updateSelectionRing(time / 1000);
    updateLabels();
    updateHover();

    liveTimer += dt;
    if (liveTimer > 0.2) {
      liveTimer = 0;
      updateLiveInfo();
      updateTimeReadout();
    }

    renderer.render(scene, camera);
    if (firstFrame) {
      firstFrame = false;
      dom.loading.hidden = true;
    }
  });

  // 動作確認用の読み取り専用フック
  window.orbitLab = {
    get state() {
      return { ...state, lastFocusPos: undefined, transition: Boolean(state.transition) };
    },
    renderer,
    camera,
  };
}

main().catch((error) => {
  console.error(error);
  showFallback(`初期化中にエラーが発生しました: ${error.message}`);
});
