// 手続き的なテクスチャ・恒星データの生成。外部画像は一切使わない。
// すべて seed 付き乱数で生成するため、同じ seed なら毎回同じ結果になる。

/** 32bit seed から [0, 1) の擬似乱数列を返す (mulberry32) */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function rand() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** seed 付き 3D バリューノイズと fBm */
export function createNoise3D(rand) {
  const base = new Uint8Array(256);
  for (let i = 0; i < 256; i++) base[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = base[i];
    base[i] = base[j];
    base[j] = tmp;
  }
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = base[i & 255];
  const values = new Float32Array(256);
  for (let i = 0; i < 256; i++) values[i] = rand();

  const lattice = (x, y, z) => values[perm[(x & 255) + perm[(y & 255) + perm[z & 255]]]];

  function noise(x, y, z) {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const zi = Math.floor(z);
    const xf = x - xi;
    const yf = y - yi;
    const zf = z - zi;
    const u = xf * xf * (3 - 2 * xf);
    const v = yf * yf * (3 - 2 * yf);
    const w = zf * zf * (3 - 2 * zf);

    const c000 = lattice(xi, yi, zi);
    const c100 = lattice(xi + 1, yi, zi);
    const c010 = lattice(xi, yi + 1, zi);
    const c110 = lattice(xi + 1, yi + 1, zi);
    const c001 = lattice(xi, yi, zi + 1);
    const c101 = lattice(xi + 1, yi, zi + 1);
    const c011 = lattice(xi, yi + 1, zi + 1);
    const c111 = lattice(xi + 1, yi + 1, zi + 1);

    const x00 = c000 + (c100 - c000) * u;
    const x10 = c010 + (c110 - c010) * u;
    const x01 = c001 + (c101 - c001) * u;
    const x11 = c011 + (c111 - c011) * u;
    const y0 = x00 + (x10 - x00) * v;
    const y1 = x01 + (x11 - x01) * v;
    return y0 + (y1 - y0) * w;
  }

  function fbm(x, y, z, octaves = 5) {
    let sum = 0;
    let amp = 0.5;
    let norm = 0;
    let f = 1;
    for (let o = 0; o < octaves; o++) {
      sum += amp * noise(x * f, y * f, z * f);
      norm += amp;
      amp *= 0.5;
      f *= 2.03;
    }
    return sum / norm;
  }

  return { noise, fbm };
}

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smoothstep = (a, b, v) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const mix = (a, b, t) => a + (b - a) * t;

/** 正距円筒図法の各ピクセルに対応する単位球上の点を、行・列ごとに前計算する */
function sphereGrid(width, height) {
  const cosLon = new Float32Array(width);
  const sinLon = new Float32Array(width);
  const cosLat = new Float32Array(height);
  const sinLat = new Float32Array(height);
  for (let x = 0; x < width; x++) {
    const lon = ((x + 0.5) / width) * Math.PI * 2;
    cosLon[x] = Math.cos(lon);
    sinLon[x] = Math.sin(lon);
  }
  for (let y = 0; y < height; y++) {
    const lat = (0.5 - (y + 0.5) / height) * Math.PI;
    cosLat[y] = Math.cos(lat);
    sinLat[y] = Math.sin(lat);
  }
  return { cosLon, sinLon, cosLat, sinLat };
}

function quantile(values, q) {
  const sample = [];
  for (let i = 0; i < values.length; i += 7) sample.push(values[i]);
  sample.sort((a, b) => a - b);
  return sample[Math.min(sample.length - 1, Math.floor(sample.length * q))];
}

function makeCanvas(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

/**
 * 地球の色マップと粗さマップ（海は滑らか、陸は粗い）を生成する。
 * 3D ノイズを球面上でサンプリングするため、経度 0/360° の継ぎ目が出ない。
 */
export function createEarthCanvases(seed, width = 1024) {
  const height = width / 2;
  const rand = mulberry32(seed);
  const terrain = createNoise3D(rand);
  const climate = createNoise3D(rand);
  const { cosLon, sinLon, cosLat, sinLat } = sphereGrid(width, height);

  const elevation = new Float32Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const nx = cosLat[y] * cosLon[x];
      const ny = sinLat[y];
      const nz = cosLat[y] * sinLon[x];
      // ドメインワープで海岸線を複雑にする
      const warp = terrain.fbm(nx * 1.4 + 17.1, ny * 1.4 + 3.7, nz * 1.4 - 8.2, 3) - 0.5;
      elevation[y * width + x] = terrain.fbm(
        nx * 1.7 + warp * 1.6 + 5.3,
        ny * 1.7 + warp * 1.6,
        nz * 1.7 + warp * 1.6 - 2.1,
        6,
      );
    }
  }
  // 陸地が約 30% になるよう海面高度を決める
  const seaLevel = quantile(elevation, 0.7);
  const peakLevel = quantile(elevation, 0.985);

  const colorCanvas = makeCanvas(width, height);
  const roughCanvas = makeCanvas(width, height);
  const colorCtx = colorCanvas.getContext('2d');
  const roughCtx = roughCanvas.getContext('2d');
  const colorImg = colorCtx.createImageData(width, height);
  const roughImg = roughCtx.createImageData(width, height);
  const c = colorImg.data;
  const r = roughImg.data;

  for (let y = 0; y < height; y++) {
    const latDeg = Math.abs(90 - ((y + 0.5) / height) * 180);
    const desertBand = Math.exp(-(((latDeg - 24) / 9) ** 2));
    const tropics = Math.exp(-((latDeg / 12) ** 2));
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const p = i * 4;
      const nx = cosLat[y] * cosLon[x];
      const ny = sinLat[y];
      const nz = cosLat[y] * sinLon[x];
      const e = elevation[i];
      const grain = climate.noise(nx * 40, ny * 40, nz * 40) - 0.5;
      const iceEdge = 71 + (climate.fbm(nx * 3 + 9, ny * 3, nz * 3, 3) - 0.5) * 16;

      let R;
      let G;
      let B;
      let rough;
      if (latDeg > iceEdge + (e > seaLevel ? -6 : 0)) {
        // 極冠（海氷・氷床）
        const t = 0.92 + grain * 0.12;
        R = 232 * t;
        G = 240 * t;
        B = 248 * t;
        rough = 190;
      } else if (e < seaLevel) {
        const depth = smoothstep(0, 0.12, seaLevel - e);
        R = mix(34, 7, depth);
        G = mix(112, 30, depth);
        B = mix(158, 78, depth);
        rough = 70;
      } else {
        const h = clamp01((e - seaLevel) / (peakLevel - seaLevel));
        const moisture =
          climate.fbm(nx * 2.6 + 40, ny * 2.6, nz * 2.6, 4) - desertBand * 0.2 + tropics * 0.12 + (e - seaLevel) * 0.3;
        const lush = smoothstep(0.36, 0.56, moisture);
        // 乾燥地 → 草原 → 森林
        R = mix(196, mix(74, 34, lush), lush);
        G = mix(168, mix(120, 82, lush), lush);
        B = mix(116, mix(56, 40, lush), lush);
        // 高緯度はツンドラ寄り
        const tundra = smoothstep(52, 66, latDeg);
        R = mix(R, 112, tundra);
        G = mix(G, 116, tundra);
        B = mix(B, 96, tundra);
        // 山地と雪
        const mountain = smoothstep(0.45, 0.85, h);
        R = mix(R, 118, mountain);
        G = mix(G, 104, mountain);
        B = mix(B, 88, mountain);
        const snow = smoothstep(0.88, 1, h);
        R = mix(R, 236, snow);
        G = mix(G, 238, snow);
        B = mix(B, 242, snow);
        const t = 1 + grain * 0.18;
        R *= t;
        G *= t;
        B *= t;
        rough = 235;
      }
      c[p] = R;
      c[p + 1] = G;
      c[p + 2] = B;
      c[p + 3] = 255;
      r[p] = rough;
      r[p + 1] = rough;
      r[p + 2] = rough;
      r[p + 3] = 255;
    }
  }
  colorCtx.putImageData(colorImg, 0, 0);
  roughCtx.putImageData(roughImg, 0, 0);
  return { colorCanvas, roughCanvas };
}

/** 雲レイヤー（白 + アルファ） */
export function createCloudCanvas(seed, width = 1024) {
  const height = width / 2;
  const noise = createNoise3D(mulberry32(seed ^ 0x5bd1e995));
  const { cosLon, sinLon, cosLat, sinLat } = sphereGrid(width, height);
  const canvas = makeCanvas(width, height);
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(width, height);
  const d = img.data;
  for (let y = 0; y < height; y++) {
    const latDeg = Math.abs(90 - ((y + 0.5) / height) * 180);
    // 赤道収束帯と中緯度の雲帯を少し強調
    const band = 0.05 * Math.exp(-((latDeg / 8) ** 2)) + 0.05 * Math.exp(-(((latDeg - 55) / 12) ** 2));
    for (let x = 0; x < width; x++) {
      const nx = cosLat[y] * cosLon[x];
      const ny = sinLat[y];
      const nz = cosLat[y] * sinLon[x];
      const stretch = noise.fbm(nx * 2 + 3, ny * 6, nz * 2 - 5, 3);
      const n = noise.fbm(nx * 3.2 + stretch, ny * 5.5, nz * 3.2 - stretch, 5) + band;
      const a = smoothstep(0.5, 0.72, n) * 0.92;
      const p = (y * width + x) * 4;
      d[p] = 255;
      d[p + 1] = 255;
      d[p + 2] = 255;
      d[p + 3] = a * 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}

/** 月面の色マップと高さ（バンプ）マップ。海（暗い領域）とクレーターを生成 */
export function createMoonCanvases(seed, width = 1024) {
  const height = width / 2;
  const rand = mulberry32(seed ^ 0x27d4eb2d);
  const noise = createNoise3D(rand);
  const { cosLon, sinLon, cosLat, sinLat } = sphereGrid(width, height);

  const heightField = new Float32Array(width * height);
  const albedo = new Float32Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const nx = cosLat[y] * cosLon[x];
      const ny = sinLat[y];
      const nz = cosLat[y] * sinLon[x];
      const maria = smoothstep(0.52, 0.6, noise.fbm(nx * 1.3 + 7, ny * 1.3, nz * 1.3, 4));
      const detail = noise.fbm(nx * 8, ny * 8, nz * 8, 4);
      albedo[i] = 0.72 - maria * 0.3 + (detail - 0.5) * 0.18;
      heightField[i] = (detail - 0.5) * 0.4 - maria * 0.15;
    }
  }

  // クレーターは影響範囲の緯度・経度ボックスだけを走査する
  const craterCount = 260;
  for (let k = 0; k < craterCount; k++) {
    const z = rand() * 2 - 1;
    const phi = rand() * Math.PI * 2;
    const s = Math.sqrt(1 - z * z);
    const cx = s * Math.cos(phi);
    const cy = z;
    const cz = s * Math.sin(phi);
    const radius = 0.015 + Math.pow(rand(), 3.2) * 0.16; // ラジアン
    const depth = 0.35 + rand() * 0.35;
    const reach = radius * 1.6;
    const lat0 = Math.asin(cy);
    const lon0 = Math.atan2(cz, cx);
    const yMin = Math.max(0, Math.floor((0.5 - (lat0 + reach) / Math.PI) * height));
    const yMax = Math.min(height - 1, Math.ceil((0.5 - (lat0 - reach) / Math.PI) * height));
    const cosReach = Math.cos(reach);
    const brightRay = rand() < 0.12;
    for (let y = yMin; y <= yMax; y++) {
      const cl = cosLat[y];
      const lonSpan = cl > 0.02 ? reach / cl : Math.PI;
      const full = lonSpan >= Math.PI;
      const x0 = full ? 0 : Math.floor(((lon0 - lonSpan) / (Math.PI * 2)) * width);
      const x1 = full ? width - 1 : Math.ceil(((lon0 + lonSpan) / (Math.PI * 2)) * width);
      for (let xx = x0; xx <= x1; xx++) {
        const x = ((xx % width) + width) % width;
        const dot = cl * cosLon[x] * cx + sinLat[y] * cy + cl * sinLon[x] * cz;
        if (dot < cosReach) continue;
        const d = Math.acos(Math.min(1, dot)) / radius;
        const i = y * width + x;
        let h = 0;
        if (d < 1) h -= depth * (1 - d * d);
        h += depth * 0.45 * Math.exp(-(((d - 1) / 0.18) ** 2));
        heightField[i] += h;
        albedo[i] += d < 1.05 ? 0.05 : 0;
        if (brightRay && d < 1.6) albedo[i] += 0.08 * (1.6 - d);
      }
    }
  }

  const colorCanvas = makeCanvas(width, height);
  const bumpCanvas = makeCanvas(width, height);
  const cctx = colorCanvas.getContext('2d');
  const bctx = bumpCanvas.getContext('2d');
  const cimg = cctx.createImageData(width, height);
  const bimg = bctx.createImageData(width, height);
  for (let i = 0; i < width * height; i++) {
    const p = i * 4;
    const a = clamp01(albedo[i]) * 255;
    cimg.data[p] = a * 1.0;
    cimg.data[p + 1] = a * 0.98;
    cimg.data[p + 2] = a * 0.94;
    cimg.data[p + 3] = 255;
    const h = clamp01(0.5 + heightField[i] * 0.6) * 255;
    bimg.data[p] = h;
    bimg.data[p + 1] = h;
    bimg.data[p + 2] = h;
    bimg.data[p + 3] = 255;
  }
  cctx.putImageData(cimg, 0, 0);
  bctx.putImageData(bimg, 0, 0);
  return { colorCanvas, bumpCanvas };
}

/** 太陽のグロー用の放射グラデーション */
export function createGlowCanvas(size = 256) {
  const canvas = makeCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.18, 'rgba(255,236,190,0.85)');
  g.addColorStop(0.35, 'rgba(255,190,110,0.35)');
  g.addColorStop(0.6, 'rgba(255,140,60,0.1)');
  g.addColorStop(1, 'rgba(255,120,40,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return canvas;
}

function randomUnit(rand, out) {
  const z = rand() * 2 - 1;
  const phi = rand() * Math.PI * 2;
  const s = Math.sqrt(1 - z * z);
  out[0] = s * Math.cos(phi);
  out[1] = z;
  out[2] = s * Math.sin(phi);
  return out;
}

const STAR_PALETTE = [
  [0.7, 0.8, 1.0], // 青白
  [0.92, 0.95, 1.0], // 白
  [1.0, 0.95, 0.84], // 黄白
  [1.0, 0.8, 0.62], // 橙
];

/**
 * 恒星背景の頂点データ。約 4 割は天の川風の帯に集中させる。
 * 同じ seed なら位置・色・大きさ・瞬きの位相まで完全に同じになる。
 */
export function createStarData(seed, count = 5000) {
  const rand = mulberry32(seed ^ 0x9e3779b9);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const galacticNormal = randomUnit(rand, [0, 0, 0]);
  const v = [0, 0, 0];

  for (let i = 0; i < count; i++) {
    randomUnit(rand, v);
    const inBand = i < count * 0.4;
    if (inBand) {
      // 銀河面の法線方向の成分を縮めて帯状に集める
      const d = v[0] * galacticNormal[0] + v[1] * galacticNormal[1] + v[2] * galacticNormal[2];
      const squeeze = 0.9 * rand() + 0.05;
      v[0] -= galacticNormal[0] * d * squeeze;
      v[1] -= galacticNormal[1] * d * squeeze;
      v[2] -= galacticNormal[2] * d * squeeze;
      const len = Math.hypot(v[0], v[1], v[2]);
      v[0] /= len;
      v[1] /= len;
      v[2] /= len;
    }
    const radius = 700 + rand() * 250;
    positions[i * 3] = v[0] * radius;
    positions[i * 3 + 1] = v[1] * radius;
    positions[i * 3 + 2] = v[2] * radius;

    const magnitude = Math.pow(rand(), inBand ? 5 : 3.5); // 明るい星ほど少ない
    sizes[i] = 0.9 + magnitude * 3.4;
    const t = rand();
    const base = STAR_PALETTE[t < 0.14 ? 0 : t < 0.58 ? 1 : t < 0.86 ? 2 : 3];
    const brightness = (inBand ? 0.35 : 0.45) + magnitude * 0.6 + rand() * 0.15;
    colors[i * 3] = base[0] * brightness;
    colors[i * 3 + 1] = base[1] * brightness;
    colors[i * 3 + 2] = base[2] * brightness;
    phases[i] = rand();
  }
  return { positions, colors, sizes, phases };
}
