const canvas = document.getElementById('sceneCanvas');
const fallback = document.getElementById('fallback');
const fallbackReason = document.getElementById('fallbackReason');

function showFallback(message) {
  fallbackReason.textContent = message;
  fallback.hidden = false;
}

let testContext;
try { testContext = document.createElement('canvas').getContext('webgl2'); } catch (_) { /* WebGL unavailable */ }
if (!testContext) {
  showFallback('WebGL 2.0に対応したブラウザと端末で開いてください。ブラウザのハードウェアアクセラレーションも確認してください。');
} else {
  start().catch((error) => {
    console.error('Orbit Lab could not start:', error);
    showFallback('3Dライブラリを読み込めませんでした。インターネット接続を確認して再読み込みしてください。');
  });
}

async function start() {
  const THREE = await import('three');
  const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');

  // A fixed seed keeps stars and painted surfaces the same on every visit.
  function randomGenerator(seed) {
    let state = seed >>> 0;
    return () => {
      state = (Math.imul(1664525, state) + 1013904223) >>> 0;
      return state / 4294967296;
    };
  }
  const random = randomGenerator(20260923);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x070d1b);
  const camera = new THREE.PerspectiveCamera(43, 1, 0.1, 1000);
  camera.position.set(0, 8, 18);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.065;
  controls.minDistance = 1.2;
  controls.maxDistance = 52;
  controls.maxPolarAngle = Math.PI * 0.92;
  controls.target.set(0, 0, 0);

  const ambient = new THREE.AmbientLight(0x406080, 0.095);
  scene.add(ambient);
  const sunlight = new THREE.PointLight(0xffffff, 115, 0, 2);
  sunlight.position.set(0, 0, 0);
  scene.add(sunlight);

  function hash3(x, y, z) {
    let n = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(z, 2147483647);
    n = Math.imul(n ^ (n >>> 13), 1274126177);
    return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
  }
  const smooth = (t) => t * t * (3 - 2 * t);
  function noise3(x, y, z) {
    const ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z);
    const fx = smooth(x - ix), fy = smooth(y - iy), fz = smooth(z - iz);
    const mix = (a, b, t) => a + (b - a) * t;
    const a = mix(hash3(ix, iy, iz), hash3(ix + 1, iy, iz), fx);
    const b = mix(hash3(ix, iy + 1, iz), hash3(ix + 1, iy + 1, iz), fx);
    const c = mix(hash3(ix, iy, iz + 1), hash3(ix + 1, iy, iz + 1), fx);
    const d = mix(hash3(ix, iy + 1, iz + 1), hash3(ix + 1, iy + 1, iz + 1), fx);
    return mix(mix(a, b, fy), mix(c, d, fy), fz);
  }
  function fbm(x, y, z, octaves = 4) {
    let sum = 0, amplitude = 0.5, frequency = 1, total = 0;
    for (let i = 0; i < octaves; i++) {
      sum += noise3(x * frequency, y * frequency, z * frequency) * amplitude;
      total += amplitude;
      frequency *= 2;
      amplitude *= 0.5;
    }
    return sum / total;
  }
  function paintSphere(width, height, painter) {
    const surface = document.createElement('canvas');
    surface.width = width;
    surface.height = height;
    const context = surface.getContext('2d');
    const image = context.createImageData(width, height);
    for (let y = 0; y < height; y++) {
      const lat = Math.PI * (y / height - 0.5);
      for (let x = 0; x < width; x++) {
        const lon = Math.PI * 2 * x / width;
        const unit = [Math.cos(lat) * Math.cos(lon), Math.sin(lat), Math.cos(lat) * Math.sin(lon)];
        const color = painter(unit, lat);
        const i = (y * width + x) * 4;
        image.data[i] = color[0]; image.data[i + 1] = color[1]; image.data[i + 2] = color[2]; image.data[i + 3] = 255;
      }
    }
    context.putImageData(image, 0, 0);
    const texture = new THREE.CanvasTexture(surface);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
    return texture;
  }
  const sunMap = paintSphere(512, 256, ([x, y, z]) => {
    const cloud = fbm(x * 7 + 12, y * 7, z * 7, 4);
    const grain = noise3(x * 29 + 4, y * 29, z * 29);
    const heat = Math.max(0, Math.min(1, cloud * 1.7 - 0.36 + grain * 0.14));
    return [255, 130 + 105 * heat, 32 + 90 * heat];
  });
  const earthMap = paintSphere(768, 384, ([x, y, z], lat) => {
    const land = fbm(x * 3.1 + 11, y * 3.1 + 2, z * 3.1 + 7, 5)
      + 0.11 * Math.sin(8 * x + 3 * z) * Math.cos(5 * y) - 0.51;
    const detail = fbm(x * 19 + 5, y * 19, z * 19 + 2, 3);
    const polar = Math.abs(lat) / (Math.PI / 2);
    if (polar > 0.83 + detail * 0.12) return [210 + detail * 40, 225 + detail * 25, 231 + detail * 22];
    if (land > 0) {
      const green = Math.max(0, Math.min(1, detail * 1.8 - polar * 0.5));
      const dry = Math.max(0, Math.min(1, Math.abs(lat) * 0.6 + noise3(x * 11 + 3, y * 11, z * 11) * 0.5 - 0.35));
      return [54 + dry * 103 + detail * 17, 84 + green * 65 + dry * 53, 49 + green * 35 + dry * 25];
    }
    const shallow = Math.max(0, Math.min(1, (land + 0.08) * 12));
    return [9 + shallow * 20, 48 + shallow * 64 + detail * 13, 108 + shallow * 73 + detail * 23];
  });
  const moonMap = paintSphere(512, 256, ([x, y, z]) => {
    const terrain = fbm(x * 11 + 8, y * 11 + 5, z * 11, 5);
    const maria = fbm(x * 3 + 14, y * 3 + 4, z * 3 + 9, 4);
    const tint = terrain * 72 - (maria > 0.54 ? 34 : 0);
    return [122 + tint, 125 + tint, 129 + tint];
  });

  const sphere = (radius, material, segments = 48) => new THREE.Mesh(new THREE.SphereGeometry(radius, segments, Math.floor(segments * 0.66)), material);
  const sun = sphere(1.25, new THREE.MeshBasicMaterial({ map: sunMap, color: 0xffe2ae }));
  sun.name = 'sun';
  scene.add(sun);
  function glowTexture() {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(64, 64, 15, 64, 64, 64);
    g.addColorStop(0, 'rgba(255,192,81,.6)');
    g.addColorStop(0.25, 'rgba(255,132,55,.28)');
    g.addColorStop(0.65, 'rgba(255,112,39,.08)');
    g.addColorStop(1, 'rgba(255,112,39,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }
  const corona = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  corona.scale.set(5.8, 5.8, 1);
  scene.add(corona);

  const earthOrbit = new THREE.Group();
  earthOrbit.rotation.x = THREE.MathUtils.degToRad(11);
  scene.add(earthOrbit);
  const earthPivot = new THREE.Group();
  earthOrbit.add(earthPivot);
  const earthCarrier = new THREE.Group();
  earthCarrier.position.x = 5.4;
  earthPivot.add(earthCarrier);
  const earthAxis = new THREE.Group();
  earthAxis.rotation.z = THREE.MathUtils.degToRad(23.4);
  earthCarrier.add(earthAxis);
  const earth = sphere(0.73, new THREE.MeshStandardMaterial({ map: earthMap, roughness: 0.9, metalness: 0 }), 64);
  earth.name = 'earth';
  earthAxis.add(earth);
  const earthAtmosphere = sphere(0.754, new THREE.MeshBasicMaterial({ color: 0x65bbff, transparent: true, opacity: 0.065, side: THREE.BackSide, depthWrite: false }), 48);
  earthAxis.add(earthAtmosphere);

  const moonOrbit = new THREE.Group();
  moonOrbit.rotation.x = THREE.MathUtils.degToRad(28);
  earthCarrier.add(moonOrbit);
  const moonPivot = new THREE.Group();
  moonOrbit.add(moonPivot);
  const moonCarrier = new THREE.Group();
  moonCarrier.position.x = 1.35;
  moonPivot.add(moonCarrier);
  const moon = sphere(0.22, new THREE.MeshStandardMaterial({ map: moonMap, roughness: 1, metalness: 0, bumpMap: moonMap, bumpScale: 0.026 }), 40);
  moon.name = 'moon';
  moonCarrier.add(moon);

  function orbitLine(radius, color, opacity, segments = 180) {
    const positions = [];
    for (let i = 0; i < segments; i++) {
      const angle = i / segments * Math.PI * 2;
      positions.push(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return new THREE.LineLoop(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false }));
  }
  const orbitVisuals = new THREE.Group();
  scene.add(orbitVisuals);
  const earthPath = orbitLine(5.4, 0x69aeec, 0.46);
  earthPath.rotation.x = earthOrbit.rotation.x;
  orbitVisuals.add(earthPath);
  const referencePath = orbitLine(5.4, 0x63718b, 0.16);
  orbitVisuals.add(referencePath);
  const moonPath = orbitLine(1.35, 0xabc4df, 0.42, 96);
  moonOrbit.add(moonPath);
  const earthPlane = new THREE.Mesh(new THREE.RingGeometry(5.26, 5.55, 128), new THREE.MeshBasicMaterial({ color: 0x69a8dc, transparent: true, opacity: 0.045, side: THREE.DoubleSide, depthWrite: false }));
  earthPlane.rotation.x = -Math.PI / 2 + earthOrbit.rotation.x;
  orbitVisuals.add(earthPlane);
  const moonPlane = new THREE.Mesh(new THREE.RingGeometry(1.25, 1.45, 96), new THREE.MeshBasicMaterial({ color: 0xa3c6e9, transparent: true, opacity: 0.075, side: THREE.DoubleSide, depthWrite: false }));
  moonPlane.rotation.x = -Math.PI / 2;
  moonOrbit.add(moonPlane);

  // Each star is one point in a single buffer, rather than a separate mesh.
  const starPositions = [], starColors = [];
  const starColor = new THREE.Color();
  for (let i = 0; i < 1200; i++) {
    const u = random() * 2 - 1;
    const angle = random() * Math.PI * 2;
    const radius = 95 + random() * 55;
    const side = Math.sqrt(1 - u * u);
    starPositions.push(Math.cos(angle) * side * radius, u * radius, Math.sin(angle) * side * radius);
    const shade = random();
    starColor.setRGB(0.38 + shade * 0.5, 0.5 + shade * 0.42, 0.68 + shade * 0.32);
    starColors.push(starColor.r, starColor.g, starColor.b);
  }
  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
  starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
  scene.add(new THREE.Points(starGeometry, new THREE.PointsMaterial({ size: 0.55, vertexColors: true, sizeAttenuation: true, depthWrite: false })));

  const data = {
    sun: { index: '01 / 03', category: 'OUR STAR', english: 'THE SUN', title: '太陽', description: '太陽系の中心にある恒星。自ら光と熱を放ち、地球と月を照らしています。', factLabel: '地球からの平均距離', fact: '約1億5,000万 km', icon: 'sun-icon' },
    earth: { index: '02 / 03', category: 'OUR HOME', english: 'THE EARTH', title: '地球', description: '太陽のまわりを公転しながら、傾いた軸を中心に自転します。昼と夜、季節の変化を観察できます。', factLabel: '地軸の傾き', fact: '約23.4°', icon: 'earth-icon' },
    moon: { index: '03 / 03', category: 'NATURAL SATELLITE', english: 'THE MOON', title: '月', description: '地球の唯一の自然衛星。地球のまわりを公転し、太陽に照らされた面が明るく見えます。', factLabel: '地球からの平均距離', fact: '約38万4,400 km', icon: 'moon-icon' }
  };
  const info = {
    index: document.getElementById('infoIndex'), category: document.getElementById('infoCategory'),
    english: document.getElementById('infoEnglish'), title: document.getElementById('infoTitle'),
    description: document.getElementById('infoDescription'), factLabel: document.getElementById('infoFactLabel'),
    fact: document.getElementById('infoFact'), icon: document.getElementById('infoIcon')
  };
  function selectBody(name) {
    const d = data[name];
    info.index.textContent = d.index; info.category.textContent = d.category;
    info.english.textContent = d.english; info.title.textContent = d.title;
    info.description.textContent = d.description; info.factLabel.textContent = d.factLabel;
    info.fact.textContent = d.fact; info.icon.className = `info-icon ${d.icon}`;
    document.querySelectorAll('.object-label').forEach((el) => el.classList.toggle('is-selected', el.id === `${name}Label`));
  }
  const focusButtons = [...document.querySelectorAll('[data-focus]')];
  const position = new THREE.Vector3();
  const previousTarget = new THREE.Vector3();
  let focus = 'overview';
  let tweening = false;
  const offsets = {
    overview: new THREE.Vector3(0, 8, 18), sun: new THREE.Vector3(0, 3.5, 7),
    earth: new THREE.Vector3(0, 1.6, 3.4), moon: new THREE.Vector3(0, 0.7, 2.0)
  };
  function bodyPosition(name, output) {
    if (name === 'overview' || name === 'sun') return output.set(0, 0, 0);
    return (name === 'earth' ? earth : moon).getWorldPosition(output);
  }
  function focusOn(name, instant = false) {
    focus = name;
    focusButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.focus === name));
    bodyPosition(name, previousTarget);
    if (instant) {
      controls.target.copy(previousTarget);
      camera.position.copy(previousTarget).add(offsets[name]);
      controls.update();
      tweening = false;
    } else {
      tweening = true;
    }
    if (data[name]) selectBody(name);
  }
  focusButtons.forEach((button) => button.addEventListener('click', () => focusOn(button.dataset.focus)));

  const playButton = document.getElementById('playButton');
  const playIcon = document.getElementById('playIcon');
  const playText = document.getElementById('playText');
  const speedSlider = document.getElementById('speedSlider');
  const speedValue = document.getElementById('speedValue');
  const orbitToggle = document.getElementById('orbitToggle');
  let playing = true;
  let speed = 1;
  const initial = { earthOrbit: 2.45, earthSpin: 0.5, moonOrbit: 0.6 };
  function updatePlayUI() {
    playIcon.textContent = playing ? 'Ⅱ' : '▶';
    playText.textContent = playing ? '一時停止' : '再生';
    playButton.setAttribute('aria-label', playing ? '一時停止' : '再生');
    document.querySelector('.stage-bottom').classList.toggle('is-paused', !playing);
    document.querySelector('.stage-bottom>span:first-child').lastChild.textContent = playing ? ' SIMULATION ACTIVE' : ' SIMULATION PAUSED';
  }
  function reset() {
    playing = true; speed = 1; speedSlider.value = '1'; speedValue.textContent = '1.0×';
    orbitToggle.checked = true; orbitVisuals.visible = true; moonPath.visible = true; moonPlane.visible = true;
    earthPivot.rotation.y = initial.earthOrbit; earth.rotation.y = initial.earthSpin; moonPivot.rotation.y = initial.moonOrbit;
    sun.rotation.y = 0;
    focusOn('overview', true); selectBody('sun'); updatePlayUI();
  }
  playButton.addEventListener('click', () => { playing = !playing; updatePlayUI(); });
  speedSlider.addEventListener('input', () => { speed = Number(speedSlider.value); speedValue.textContent = `${speed.toFixed(2).replace(/0$/, '')}×`; });
  orbitToggle.addEventListener('change', () => {
    orbitVisuals.visible = orbitToggle.checked;
    moonPath.visible = orbitToggle.checked;
    moonPlane.visible = orbitToggle.checked;
  });
  document.getElementById('resetButton').addEventListener('click', reset);
  window.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    if (event.code === 'Space') { event.preventDefault(); playing = !playing; updatePlayUI(); }
    if (event.key.toLowerCase() === 'r') reset();
  });

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let pointerStart = null;
  canvas.addEventListener('pointerdown', (event) => { pointerStart = { x: event.clientX, y: event.clientY }; });
  canvas.addEventListener('pointerup', (event) => {
    if (!pointerStart || Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) > 6) return;
    pointerStart = null;
    const rect = canvas.getBoundingClientRect();
    pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects([sun, earth, moon], false)[0];
    if (hit) { focusOn(hit.object.name); document.getElementById('stageHint').style.display = 'none'; }
  });

  function resize() {
    const width = Math.max(1, canvas.clientWidth), height = Math.max(1, canvas.clientHeight);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  window.addEventListener('resize', resize);
  resize();
  reset();

  const labelElements = { sun: document.getElementById('sunLabel'), earth: document.getElementById('earthLabel'), moon: document.getElementById('moonLabel') };
  const world = new THREE.Vector3(), projected = new THREE.Vector3(), focusPoint = new THREE.Vector3();
  function updateLabels() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    for (const [name, element] of Object.entries(labelElements)) {
      bodyPosition(name, world);
      projected.copy(world).project(camera);
      const visible = projected.z < 1 && Math.abs(projected.x) < 0.95 && Math.abs(projected.y) < 0.92;
      element.style.display = visible ? 'flex' : 'none';
      if (visible) {
        const radius = name === 'sun' ? 1.25 : name === 'earth' ? 0.73 : 0.22;
        const distance = Math.max(1, camera.position.distanceTo(world));
        const offset = radius * h / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * distance) + 7;
        element.style.left = `${(projected.x * 0.5 + 0.5) * w + offset}px`;
        element.style.top = `${(-projected.y * 0.5 + 0.5) * h}px`;
      }
    }
  }
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const delta = Math.min(clock.getDelta(), 0.05);
    if (playing) {
      const step = delta * speed;
      earthPivot.rotation.y += step * 0.12;
      earth.rotation.y += step * 0.85;
      moonPivot.rotation.y += step * 0.95;
      sun.rotation.y += step * 0.05;
    }
    scene.updateMatrixWorld(true);
    bodyPosition(focus, focusPoint);
    if (tweening) {
      const desired = focusPoint.clone().add(offsets[focus]);
      const blend = 1 - Math.exp(-delta * 4.2);
      controls.target.lerp(focusPoint, blend);
      camera.position.lerp(desired, blend);
      if (controls.target.distanceTo(focusPoint) < 0.015 && camera.position.distanceTo(desired) < 0.025) tweening = false;
    } else if (focus !== 'overview') {
      const movement = focusPoint.clone().sub(previousTarget);
      controls.target.add(movement);
      camera.position.add(movement);
    }
    previousTarget.copy(focusPoint);
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
  }
  animate();
}
