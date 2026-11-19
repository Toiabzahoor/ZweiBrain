export type LobeIndex = 0 | 1 | 2 | 3; // 0: Frontal, 1: Parietal, 2: Temporal, 3: Occipital

export interface SculptedVertexData {
  x: number;
  y: number;
  z: number;
  /** 0 = deep sulcus trough, 1 = raised gyral crown */
  gyrusHeight: number;
  /** 0 = lateral/convexity, 1 = medial wall */
  medialFactor: number;
  /** 0: Frontal, 1: Parietal, 2: Temporal, 3: Occipital */
  lobe: LobeIndex;
  /** Strength of named primary sulcus [0..1] */
  primarySulcus: number;
}

export function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function hash3(ix: number, iy: number, iz: number): number {
  let n = Math.imul(ix, 374761393) + Math.imul(iy, 668265263) + Math.imul(iz, 2147483647);
  n = (n ^ (n >>> 13)) >>> 0;
  n = Math.imul(n, 1274126177) >>> 0;
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function grad3(ix: number, iy: number, iz: number, dx: number, dy: number, dz: number): number {
  const h = Math.floor(hash3(ix, iy, iz) * 12);
  switch (h % 12) {
    case 0:
      return dx + dy;
    case 1:
      return -dx + dy;
    case 2:
      return dx - dy;
    case 3:
      return -dx - dy;
    case 4:
      return dx + dz;
    case 5:
      return -dx + dz;
    case 6:
      return dx - dz;
    case 7:
      return -dx - dz;
    case 8:
      return dy + dz;
    case 9:
      return -dy + dz;
    case 10:
      return dy - dz;
    default:
      return -dy - dz;
  }
}

/** Smooth C2 3D gradient noise in roughly [-1, 1]. */
export function gradientNoise3D(x: number, y: number, z: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const iz = Math.floor(z);

  const fx = x - ix;
  const fy = y - iy;
  const fz = z - iz;

  const u = fade(fx);
  const v = fade(fy);
  const w = fade(fz);

  const n000 = grad3(ix, iy, iz, fx, fy, fz);
  const n100 = grad3(ix + 1, iy, iz, fx - 1, fy, fz);
  const n010 = grad3(ix, iy + 1, iz, fx, fy - 1, fz);
  const n110 = grad3(ix + 1, iy + 1, iz, fx - 1, fy - 1, fz);
  const n001 = grad3(ix, iy, iz + 1, fx, fy, fz - 1);
  const n101 = grad3(ix + 1, iy, iz + 1, fx - 1, fy, fz - 1);
  const n011 = grad3(ix, iy + 1, iz + 1, fx, fy - 1, fz - 1);
  const n111 = grad3(ix + 1, iy + 1, iz + 1, fx - 1, fy - 1, fz - 1);

  const nx00 = lerp(n000, n100, u);
  const nx10 = lerp(n010, n110, u);
  const nx01 = lerp(n001, n101, u);
  const nx11 = lerp(n011, n111, u);

  const nxy0 = lerp(nx00, nx10, v);
  const nxy1 = lerp(nx01, nx11, v);

  return lerp(nxy0, nxy1, w);
}

export function fbm3D(x: number, y: number, z: number, octaves = 3): number {
  let sum = 0;
  let amp = 0.58;
  let freq = 1;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += amp * gradientNoise3D(x * freq, y * freq, z * freq);
    norm += amp;
    amp *= 0.48;
    freq *= 2.04;
  }
  return sum / norm;
}

/**
 * Classifies an anatomical cortical point (in MNI-scaled units, 1 unit = 70 mm)
 * into Frontal (0), Parietal (1), Temporal (2), or Occipital (3) lobes.
 */
export function classifyCorticalLobe(absX: number, y: number, z: number): LobeIndex {
  // Sylvian fissure boundary line on lateral surface: y = 0.095 - 0.43 * z
  const sylvianY = 0.095 - 0.43 * z;
  // Central sulcus boundary: z ≈ -0.075 + 0.17 * clamp(0.86 - y, 0, 1)
  const centralZ = -0.075 + 0.17 * clamp(0.86 - y, 0, 1);
  // Parieto-occipital / temporo-occipital boundary: z ≈ -0.64 - 0.08 * y
  const occipitalZ = -0.64 - 0.08 * y;

  if (z < occipitalZ) {
    return 3; // Occipital
  }
  const inTemporalZ = z < 0.49 || (z < 0.57 && y < -0.14 && absX > 0.28);
  if (y < sylvianY && inTemporalZ && (absX > 0.24 || y < -0.15)) {
    return 2; // Temporal
  }
  if (z > centralZ) {
    return 0; // Frontal
  }
  return 1; // Parietal
}

/**
 * Computes named primary anatomical sulci indentation [0..1] in cortical space.
 * Returns { depth: [0..1], sylvian: [0..1] } where 1 = deepest cleft.
 */
function computeNamedSulci(
  absX: number,
  y: number,
  z: number,
  lat: number,
  side: -1 | 1,
): { depth: number; sylvian: number } {
  // 1. Lateral Sulcus (Sylvian Fissure): deep oblique cleft separating temporal from frontal/parietal opercula
  const sylvianMask = smoothstep(0.24, 0.56, lat) * smoothstep(0.49, 0.34, z) * smoothstep(-0.56, -0.34, z);
  const sylvianLineY = 0.095 - 0.43 * z + 0.03 * Math.sin(z * 6.5 + side * 0.2);
  const distSylvian = Math.abs(y - sylvianLineY);
  const sylvian = sylvianMask * Math.exp(-Math.pow(distSylvian / 0.055, 2));

  // 2. Central Sulcus (of Rolando): includes the classic omega "hand-knob" posterior curve at y ~ 0.63
  const handKnob = -0.065 * Math.exp(-Math.pow((y - 0.63) / 0.11, 2));
  const centralWiggle = 0.025 * Math.sin(y * 12.0 + side * 0.4);
  const centralZ = -0.075 + 0.17 * clamp(0.86 - y, 0, 1) + handKnob + centralWiggle;
  const centralMask =
    smoothstep(0.12, 0.28, y) *
    smoothstep(0.92, 0.78, y) *
    smoothstep(-0.1, 0.25, lat);
  const distCentral = Math.abs(z - centralZ);
  const central = centralMask * Math.exp(-Math.pow(distCentral / 0.042, 2));

  // 3. Precentral & Postcentral Sulci (framing motor and somatosensory strips)
  const preCentral =
    centralMask *
    0.72 *
    Math.exp(-Math.pow(Math.abs(z - (centralZ + 0.175)) / 0.038, 2));
  const postCentral =
    centralMask *
    0.72 *
    Math.exp(-Math.pow(Math.abs(z - (centralZ - 0.17)) / 0.038, 2));

  // 4. Superior Temporal Sulcus (parallel and inferior to Sylvian fissure)
  const stsMask = smoothstep(0.32, 0.65, lat) * smoothstep(0.44, 0.24, z) * smoothstep(-0.62, -0.4, z);
  const stsLineY = sylvianLineY - 0.18 + 0.02 * Math.sin(z * 8.0);
  const sts = stsMask * 0.85 * Math.exp(-Math.pow(Math.abs(y - stsLineY) / 0.036, 2));

  // 5. Parieto-Occipital Sulcus (deep on medial wall & superomedial margin)
  const poMask = smoothstep(0.05, 0.55, y) * smoothstep(0.55, -0.4, lat);
  const poZ = -0.66 - 0.12 * y;
  const parietoOccipital = poMask * 0.9 * Math.exp(-Math.pow(Math.abs(z - poZ) / 0.042, 2));

  // 6. Calcarine Sulcus (medial occipital wall)
  const calcarineMask = smoothstep(0.1, -0.45, lat) * smoothstep(-0.52, -0.78, z);
  const calcarine = calcarineMask * 0.85 * Math.exp(-Math.pow(Math.abs(y - 0.01) / 0.04, 2));

  // 7. Cingulate Sulcus (arched above corpus callosum on medial wall)
  const cingMask = smoothstep(0.1, -0.5, lat) * smoothstep(-0.58, -0.35, z) * smoothstep(0.9, 0.65, z);
  const rCing = Math.hypot((z - 0.02) / 0.68, (y - 0.02) / 0.56);
  const cingulate = cingMask * 0.78 * Math.exp(-Math.pow((rCing - 1.0) / 0.075, 2));

  const depth = clamp(
    Math.max(sylvian, central, preCentral, postCentral, sts, parietoOccipital, calcarine, cingulate),
    0,
    1,
  );
  return { depth, sylvian };
}

export interface SculptedVertexLayers extends SculptedVertexData {
  baseX: number;
  baseY: number;
  baseZ: number;
  primaryDx: number;
  primaryDy: number;
  primaryDz: number;
  foldDx: number;
  foldDy: number;
  foldDz: number;
  /** Weight [0..1] distinguishing fine tertiary/secondary branching from broad primary crowns */
  secondaryBranchWeight: number;
}

/**
 * Evaluates the anatomically sculpted cortical hemisphere point for a unit sphere direction
 * `(nx, ny, nz)` and hemisphere side (`-1` Left, `+1` Right), decomposing the result into
 * lissencephalic envelope, primary named sulci delta, and secondary/tertiary gyral delta.
 * Scaled at 1.0 unit = 70 mm (adult MNI152 ~167 mm AP × 140 mm ML × 93 mm SI).
 */
export function evaluateCorticalVertexLayers(
  nx: number,
  ny: number,
  nz: number,
  side: -1 | 1,
): SculptedVertexLayers {
  // Normalize input direction cleanly
  const invLen = 1 / Math.hypot(nx, ny, nz);
  const ux = nx * invLen;
  const uy = ny * invLen;
  const uz = nz * invLen;

  // lat: -1 on medial wall center, +1 on lateral convexity peak
  const lat = ux * side;
  const medialFactor = smoothstep(0.18, -0.35, lat);

  // Subtle Yakovlevian torque asymmetry (right frontal / left occipital petalia)
  const zTorque = side > 0 ? 0.014 * smoothstep(-0.2, 0.9, uz) : -0.014 * smoothstep(0.2, -0.9, uz);

  // 1. Anterior-Posterior axis (~2.38 units total = 166.6 mm)
  const z = uz * 1.19 - 0.01 + zTorque;

  // Temporal pole tuck: anterolateral temporal lobe juts slightly forward beneath frontal operculum
  const temporalRegion =
    smoothstep(0.08, -0.45, uy) *
    smoothstep(-0.55, 0.15, uz) *
    smoothstep(0.62, 0.34, uz) *
    smoothstep(0.15, 0.55, lat);

  // 2. Medial-Lateral width profile (max ~1.00 per hemisphere -> ~140 mm total)
  const apWidthTaper =
    1.0 -
    0.22 * smoothstep(0.32, 1.0, uz) - // narrower frontal pole
    0.26 * smoothstep(-0.32, -1.0, uz); // narrower occipital pole
  const parietalBoss = 0.055 * Math.exp(-Math.pow((uz + 0.16) / 0.42, 2)) * smoothstep(-0.2, 0.4, uy);
  const widthScale = apWidthTaper + parietalBoss;

  let absX: number;
  if (lat < 0) {
    // Medial wall: nearly flat along longitudinal fissure with rounded rim at lat -> 0
    const rimT = smoothstep(-0.32, 0.0, lat);
    absX = 0.025 + 0.075 * rimT * widthScale;
  } else {
    // Lateral convexity
    absX = 0.025 + (0.075 + 0.905 * Math.pow(lat, 0.82)) * widthScale;
  }

  // Subtle frontal narrowing near orbital pole
  absX *= 1.0 - 0.12 * smoothstep(0.55, 1.0, uz) * smoothstep(0.2, -0.6, uy);

  // 3. Superior-Inferior silhouette
  let y: number;
  if (uy >= 0) {
    // Dorsal convexity: high parietal crown (~0.89), rounded frontal & occipital drop-offs
    const apArch =
      1.0 -
      0.14 * smoothstep(0.38, 1.0, uz) -
      0.24 * smoothstep(-0.38, -1.0, uz);
    const parietalPeak = 1.0 + 0.05 * Math.exp(-Math.pow((uz + 0.1) / 0.45, 2));
    y = 0.86 * Math.pow(uy, 0.86) * apArch * parietalPeak;
  } else {
    // Ventral silhouette: orbital plate (high/flat), temporal bulge (low), tentorial arch (vaulted)
    const down = Math.pow(-uy, 0.82);
    let ventralDepth = 0.24;
    const orbitalMask = smoothstep(0.22, 0.65, uz);
    ventralDepth = lerp(ventralDepth, 0.14, orbitalMask);
    ventralDepth += 0.23 * temporalRegion;
    const tentorialMask = smoothstep(-0.22, -0.72, uz);
    const medialTent = smoothstep(0.85, 0.05, absX);
    ventralDepth = lerp(ventralDepth, 0.06 + 0.12 * (1 - medialTent), tentorialMask);
    const preOccNotch =
      Math.exp(-Math.pow((uz + 0.45) / 0.12, 2)) * smoothstep(0.25, 0.7, -uy);
    ventralDepth -= 0.07 * preOccNotch;
    ventralDepth *= lerp(1.0, 0.86, medialFactor * smoothstep(0.0, -0.5, uy));
    y = -down * ventralDepth;
  }

  // Slight inferior tilt of frontal pole & occipital pole for natural anatomical posture
  y -= 0.05 * smoothstep(0.55, 1.0, uz);
  y -= 0.04 * smoothstep(-0.55, -1.0, uz);

  // 4. Medial Callosal & Diencephalic Recess
  if (lat < 0.2) {
    const recessZ = (z - 0.02) / 0.56;
    const recessY = (y - 0.02) / 0.36;
    const rRecess = Math.hypot(recessZ, recessY);
    const recessMask = smoothstep(1.15, 0.42, rRecess) * smoothstep(0.2, -0.18, lat);
    absX = Math.max(absX, 0.025 + 0.21 * recessMask);
  }

  // Smooth lissencephalic unfolded envelope (pre-sulcal, pre-gyral)
  const baseX = absX * side;
  const baseY = y;
  const baseZ = z;

  // 5. Named Primary Sulci & Sylvian Fissure Cleft
  const sulci = computeNamedSulci(absX, y, z, lat, side);

  // Carve Sylvian fissure inward along lateral surface
  let primaryAbsX = absX;
  let primaryY = y;
  if (sulci.sylvian > 0.01) {
    primaryAbsX -= 0.14 * sulci.sylvian;
    primaryY += 0.015 * sulci.sylvian;
  }

  // 6. Domain-Warped Zero-Crossing Cortical Convolutions (Tight Serpentine Gyri & Crisp Sulci)
  const phase = side * 2.17;
  const warpScale = 2.75;
  const wx = fbm3D(primaryAbsX * warpScale + 11.3 + phase, primaryY * warpScale + 3.7, z * warpScale + 5.1, 2);
  const wy = fbm3D(primaryAbsX * warpScale + 23.1, primaryY * warpScale + 17.9 + phase, z * warpScale + 9.4, 2);
  const wz = fbm3D(primaryAbsX * warpScale + 7.2, primaryY * warpScale + 31.4, z * warpScale + 19.8 + phase, 2);

  const px = primaryAbsX + 0.135 * wx;
  const py = primaryY + 0.135 * wy;
  const pz = z + 0.135 * wz;

  const isOrbital = smoothstep(0.28, 0.72, z) * smoothstep(0.05, -0.25, primaryY);
  const gyriFreq = lerp(5.95, 6.85, isOrbital);
  const n1 = fbm3D(px * gyriFreq + phase, py * gyriFreq, pz * gyriFreq, 2);
  const n2 = fbm3D(
    px * gyriFreq * 1.78 + 4.3 + phase,
    py * gyriFreq * 1.78 + 8.1,
    pz * gyriFreq * 1.78 + 2.7,
    2,
  );

  const absN1 = Math.abs(n1);
  const primaryRidge = 1.0 - Math.exp(-Math.pow(absN1 / 0.145, 1.9));
  const secondaryCrease = 1.0 - Math.exp(-Math.pow(Math.abs(n2) / 0.11, 1.7));

  const combinedCrown =
    primaryRidge * lerp(0.80, 1.0, secondaryCrease) * (1.0 - 0.82 * sulci.depth);
  const gyrusHeight = clamp(combinedCrown, 0, 1);

  const recessAtten =
    lat < 0.05
      ? 1.0 - 0.75 * smoothstep(0.85, 0.45, Math.hypot((z - 0.02) / 0.56, (primaryY - 0.02) / 0.36))
      : 1.0;
  const foldAmp =
    lerp(0.032, 0.048, smoothstep(-0.1, 0.4, lat)) *
    recessAtten *
    (1.0 - 0.45 * isOrbital);

  const disp = (gyrusHeight - 0.76) * foldAmp;
  const normLen = Math.hypot(primaryAbsX, primaryY * 1.15, z * 0.85) || 1;
  const nxOut = primaryAbsX / normLen;
  const nyOut = (primaryY * 1.15) / normLen;
  const nzOut = (z * 0.85) / normLen;

  const dx = nxOut * disp;
  const dy = nyOut * disp;
  const dz = nzOut * disp;

  const finalAbsX = Math.max(0.022, primaryAbsX + dx);
  const finalX = finalAbsX * side;
  const finalY = primaryY + dy;
  const finalZ = z + dz;

  // Primary sulcal indentation vector from smooth base envelope (Sylvian + named primary sulci troughs)
  const primaryGrooveDisp = -0.68 * sulci.depth * foldAmp;
  const primaryX = Math.max(0.022, primaryAbsX + nxOut * primaryGrooveDisp) * side;
  const primaryPosY = primaryY + nyOut * primaryGrooveDisp;
  const primaryPosZ = z + nzOut * primaryGrooveDisp;

  const primaryDx = primaryX - baseX;
  const primaryDy = primaryPosY - baseY;
  const primaryDz = primaryPosZ - baseZ;

  // Residual serpentine secondary/tertiary gyral displacement (sums exactly to adult position!)
  const foldDx = finalX - primaryX;
  const foldDy = finalY - primaryPosY;
  const foldDz = finalZ - primaryPosZ;

  const secondaryBranchWeight = clamp(1.0 - secondaryCrease, 0, 1);
  const lobe = classifyCorticalLobe(finalAbsX, finalY, finalZ);

  return {
    x: finalX,
    y: finalY,
    z: finalZ,
    gyrusHeight,
    medialFactor,
    lobe,
    primarySulcus: sulci.depth,
    baseX,
    baseY,
    baseZ,
    primaryDx,
    primaryDy,
    primaryDz,
    foldDx,
    foldDy,
    foldDz,
    secondaryBranchWeight,
  };
}

export function evaluateCorticalVertex(
  nx: number,
  ny: number,
  nz: number,
  side: -1 | 1,
): SculptedVertexData {
  const full = evaluateCorticalVertexLayers(nx, ny, nz, side);
  return {
    x: full.x,
    y: full.y,
    z: full.z,
    gyrusHeight: full.gyrusHeight,
    medialFactor: full.medialFactor,
    lobe: full.lobe,
    primarySulcus: full.primarySulcus,
  };
}

