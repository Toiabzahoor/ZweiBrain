import * as THREE from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { BRAIN_REGIONS, type RegionId } from '../data/neuroanatomy';
import { clamp, evaluateCorticalVertex, evaluateCorticalVertexLayers, fbm3D, lerp, smoothstep } from './math3d';
import {
  createCerebellumMaterial,
  createCortexMaterial,
  createNerveMaterial,
  createSubcorticalMaterial,
  createVesselMaterial,
  createWhiteMatterMaterial,
  type CortexUniforms,
  type SubcorticalUniforms,
} from './materials';
import { buildWholeBodyNervousSystem } from './wholeNervousSystemBuilder';

export interface BrainAssembly {
  root: THREE.Group;
  parts: {
    leftHemisphere: THREE.Mesh;
    rightHemisphere: THREE.Mesh;
    cerebellum: THREE.Mesh;
    brainstem: THREE.Mesh;
    corpusCallosum: THREE.Mesh;
    thalamus: THREE.Group;
    hypothalamus: THREE.Group;
    hippocampus: THREE.Group;
    ventricles: THREE.Group;
    vasculature: THREE.Group;
    leftCorticalVessels: THREE.Group;
    rightCorticalVessels: THREE.Group;
    brainstemVessels: THREE.Group;
    sinusVessels: THREE.Group;
    cranialNerves: THREE.Group;
    forebrainNerves: THREE.Group;
    brainstemNerves: THREE.Group;
    wholeBodyNerves: THREE.Group;
  };
  nerveRegionGroups: Map<RegionId, THREE.Group>;
  interactables: THREE.Object3D[];
  cortexMaterial: THREE.MeshPhysicalMaterial;
  cortexUniforms: CortexUniforms;
  subcorticalUniforms: Record<string, SubcorticalUniforms>;
  partBasePositions: Map<THREE.Object3D, THREE.Vector3>;
  dispose: () => void;
}

function tagRegion(obj: THREE.Object3D, regionId: RegionId): void {
  obj.userData.regionId = regionId;
  obj.traverse((child) => {
    child.userData.regionId = regionId;
  });
}

/**
 * Builds a high-resolution welded geodesic cortical hemisphere (`side`: -1 Left, +1 Right)
 * with smooth Laplacian crown relaxation and zero polar pinching.
 */
function buildHemisphereGeometry(side: -1 | 1): THREE.BufferGeometry {
  const raw = new THREE.IcosahedronGeometry(1, 56);
  raw.deleteAttribute('normal');
  raw.deleteAttribute('uv');
  const geom = mergeVertices(raw, 1e-4);
  raw.dispose();

  const posAttr = geom.attributes.position as THREE.BufferAttribute;
  const count = posAttr.count;
  const gyrusArr = new Float32Array(count);
  const lobeArr = new Float32Array(count);
  const sulcusArr = new Float32Array(count);
  const secondaryWeightArr = new Float32Array(count);
  const basePosArr = new Float32Array(count * 3);
  const primaryDeltaArr = new Float32Array(count * 3);
  const foldDeltaArr = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const nx = posAttr.getX(i);
    const ny = posAttr.getY(i);
    const nz = posAttr.getZ(i);
    const v = evaluateCorticalVertexLayers(nx, ny, nz, side);
    posAttr.setXYZ(i, v.x, v.y, v.z);
    gyrusArr[i] = v.gyrusHeight;
    lobeArr[i] = v.lobe;
    sulcusArr[i] = v.primarySulcus;
    secondaryWeightArr[i] = v.secondaryBranchWeight;

    basePosArr[i * 3] = v.baseX;
    basePosArr[i * 3 + 1] = v.baseY;
    basePosArr[i * 3 + 2] = v.baseZ;

    primaryDeltaArr[i * 3] = v.primaryDx;
    primaryDeltaArr[i * 3 + 1] = v.primaryDy;
    primaryDeltaArr[i * 3 + 2] = v.primaryDz;
  }

  // Compute smooth lissencephalic envelope normals on basePosArr
  const baseNormGeom = new THREE.BufferGeometry();
  baseNormGeom.setAttribute('position', new THREE.BufferAttribute(basePosArr, 3));
  const index = geom.getIndex();
  if (index) {
    baseNormGeom.setIndex(index);
  }
  baseNormGeom.computeVertexNormals();
  const baseNormalsArr = new Float32Array(
    (baseNormGeom.attributes.normal as THREE.BufferAttribute).array,
  );
  baseNormGeom.dispose();

  // Light Laplacian relax on final adult positions while preserving identity:
  // smoothedAdult = basePos + primaryDelta + foldDelta
  if (index) {
    const neighbors: number[][] = Array.from({ length: count }, () => []);
    const idxArr = index.array;
    for (let t = 0; t < idxArr.length; t += 3) {
      const a = idxArr[t];
      const b = idxArr[t + 1];
      const c = idxArr[t + 2];
      neighbors[a].push(b, c);
      neighbors[b].push(a, c);
      neighbors[c].push(a, b);
    }

    const smoothedPos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const nb = neighbors[i];
      if (nb.length === 0) {
        smoothedPos[i * 3] = posAttr.getX(i);
        smoothedPos[i * 3 + 1] = posAttr.getY(i);
        smoothedPos[i * 3 + 2] = posAttr.getZ(i);
        continue;
      }
      let sx = 0;
      let sy = 0;
      let sz = 0;
      for (let k = 0; k < nb.length; k++) {
        const j = nb[k];
        sx += posAttr.getX(j);
        sy += posAttr.getY(j);
        sz += posAttr.getZ(j);
      }
      const inv = 1 / nb.length;
      const alpha = 0.1;
      smoothedPos[i * 3] = lerp(posAttr.getX(i), sx * inv, alpha);
      smoothedPos[i * 3 + 1] = lerp(posAttr.getY(i), sy * inv, alpha);
      smoothedPos[i * 3 + 2] = lerp(posAttr.getZ(i), sz * inv, alpha);
    }
    for (let i = 0; i < count; i++) {
      posAttr.setXYZ(i, smoothedPos[i * 3], smoothedPos[i * 3 + 1], smoothedPos[i * 3 + 2]);
    }
  }

  for (let i = 0; i < count; i++) {
    const px = basePosArr[i * 3] + primaryDeltaArr[i * 3];
    const py = basePosArr[i * 3 + 1] + primaryDeltaArr[i * 3 + 1];
    const pz = basePosArr[i * 3 + 2] + primaryDeltaArr[i * 3 + 2];
    foldDeltaArr[i * 3] = posAttr.getX(i) - px;
    foldDeltaArr[i * 3 + 1] = posAttr.getY(i) - py;
    foldDeltaArr[i * 3 + 2] = posAttr.getZ(i) - pz;
  }

  geom.setAttribute('aGyrus', new THREE.BufferAttribute(gyrusArr, 1));
  geom.setAttribute('aLobe', new THREE.BufferAttribute(lobeArr, 1));
  geom.setAttribute('aPrimarySulcus', new THREE.BufferAttribute(sulcusArr, 1));
  geom.setAttribute('aSecondaryWeight', new THREE.BufferAttribute(secondaryWeightArr, 1));
  geom.setAttribute('aBasePos', new THREE.BufferAttribute(basePosArr, 3));
  geom.setAttribute('aBaseNormal', new THREE.BufferAttribute(baseNormalsArr, 3));
  geom.setAttribute('aPrimaryDelta', new THREE.BufferAttribute(primaryDeltaArr, 3));
  geom.setAttribute('aFoldDelta', new THREE.BufferAttribute(foldDeltaArr, 3));
  posAttr.needsUpdate = true;
  geom.computeVertexNormals();
  geom.computeBoundingSphere();
  return geom;
}

/**
 * Builds the Cerebellum (bilateral hemispheres + midline vermis + anterior notch + 80 transverse folia).
 */
function buildCerebellumGeometry(): THREE.BufferGeometry {
  const raw = new THREE.IcosahedronGeometry(1, 34);
  raw.deleteAttribute('normal');
  raw.deleteAttribute('uv');
  const geom = mergeVertices(raw, 1e-4);
  raw.dispose();

  const posAttr = geom.attributes.position as THREE.BufferAttribute;
  const count = posAttr.count;
  const foliaArr = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const nx = posAttr.getX(i);
    const ny = posAttr.getY(i);
    const nz = posAttr.getZ(i);

    // Base bilateral ellipsoid (106 mm wide, 48 mm tall, 56 mm AP)
    let x = nx * 0.76;
    let y = ny * 0.34;
    let z = nz * 0.40;

    // Bilateral hemisphere lobes + recessed midline vermis
    const absNx = Math.abs(nx);
    const vermisPinch = Math.exp(-Math.pow(absNx / 0.24, 2));
    const hemiBulge = Math.exp(-Math.pow((absNx - 0.52) / 0.34, 2));

    // Posterior cerebellar notch between hemispheres
    if (nz < -0.2) {
      z += 0.085 * vermisPinch * smoothstep(-0.2, -0.85, nz);
    }
    // Anterior cerebellar notch wrapping snugly behind the pons/4th ventricle
    if (nz > 0.25) {
      z -= 0.14 * vermisPinch * smoothstep(0.25, 0.9, nz);
    }

    // Sloped tentorial top surface + fuller inferior cerebellar tonsils
    if (ny > 0) {
      y *= 0.82 - 0.14 * smoothstep(0.2, 0.9, nz);
    } else {
      y *= 1.06 + 0.1 * hemiBulge;
    }

    // Horizontal fissure around equator
    const horizDist = Math.abs(ny + 0.05);
    const horizFissure = Math.exp(-Math.pow(horizDist / 0.05, 2)) * smoothstep(0.15, 0.75, absNx);

    // Primary fissure on superior surface
    const primDist = Math.abs(ny - 0.48 + nz * 0.35);
    const primFissure = Math.exp(-Math.pow(primDist / 0.055, 2)) * smoothstep(0.0, 0.5, ny);

    // Tightly packed transverse folia ridges
    const foliaPhase =
      ny * 82.0 + nz * 16.0 + 1.8 * Math.sin(absNx * 3.2) + fbm3D(x * 7, y * 7, z * 7, 2) * 1.5;
    const foliaWave = 0.5 + 0.5 * Math.sin(foliaPhase);
    const foliaSmooth = Math.pow(foliaWave, 0.6);

    const disp = (foliaSmooth - 0.55) * 0.011 - 0.028 * horizFissure - 0.022 * primFissure;
    const rLen = Math.hypot(x, y, z) || 1;
    x += (x / rLen) * disp;
    y += (y / rLen) * disp;
    z += (z / rLen) * disp;

    posAttr.setXYZ(i, x, y, z);
    foliaArr[i] = clamp(foliaSmooth * (1 - 0.72 * horizFissure) * (1 - 0.55 * primFissure), 0, 1);
  }

  geom.setAttribute('aFolia', new THREE.BufferAttribute(foliaArr, 1));
  posAttr.needsUpdate = true;
  geom.computeVertexNormals();
  geom.computeBoundingSphere();
  return geom;
}

/**
 * Builds an organic parametric lofted Brainstem:
 * Midbrain (cerebral peduncles + colliculi) -> Pons (bulbous belly + middle peduncles) -> Medulla (pyramids + olives).
 */
function buildBrainstemGeometry(): THREE.BufferGeometry {
  const rings = 72;
  const segs = 48;
  const positions: number[] = [];
  const indices: number[] = [];

  for (let r = 0; r <= rings; r++) {
    const t = r / rings; // 0 = inferior medulla (-0.98), 1 = superior midbrain (-0.08)
    const y = lerp(-0.98, -0.09, t);

    // Anatomical anterior tilt as brainstem ascends
    const centerZ = lerp(-0.36, -0.06, Math.pow(t, 0.9)) + 0.04 * Math.sin(t * Math.PI);

    // Segment profile envelopes
    const ponsMask = Math.exp(-Math.pow((t - 0.54) / 0.17, 2));
    const midbrainMask = smoothstep(0.68, 0.96, t);
    const medullaMask = smoothstep(0.45, 0.1, t);

    const baseRx = lerp(0.105, 0.145, t) + 0.115 * ponsMask + 0.045 * midbrainMask;
    const baseRz = lerp(0.095, 0.125, t) + 0.095 * ponsMask;

    for (let s = 0; s <= segs; s++) {
      const theta = (s / segs) * Math.PI * 2;
      const cosT = Math.cos(theta); // +X / -X lateral
      const sinT = Math.sin(theta); // +Z anterior, -Z posterior

      let rx = baseRx;
      let rz = baseRz;
      let localZShift = 0;

      // Medulla: anterior pyramids + midline cleft + lateral olivary bulges
      if (medullaMask > 0.01) {
        const antPyramid = Math.exp(-Math.pow((Math.abs(cosT) - 0.36) / 0.25, 2)) * smoothstep(0.1, 0.8, sinT);
        const midFissure = Math.exp(-Math.pow(cosT / 0.16, 2)) * smoothstep(0.3, 0.9, sinT);
        const olive = Math.exp(-Math.pow((Math.abs(cosT) - 0.78) / 0.2, 2)) * smoothstep(-0.2, 0.4, sinT);
        rz += medullaMask * (0.022 * antPyramid - 0.018 * midFissure);
        rx += medullaMask * 0.018 * olive;
      }

      // Pons: prominent anterior pontine belly + basilar groove + posterolateral cerebellar peduncles
      if (ponsMask > 0.01) {
        const antBulge = smoothstep(-0.15, 0.85, sinT);
        const basilarGroove = Math.exp(-Math.pow(cosT / 0.22, 2)) * smoothstep(0.3, 0.95, sinT);
        const midPeduncle = Math.exp(-Math.pow((Math.abs(cosT) - 0.85) / 0.28, 2)) * smoothstep(0.2, -0.7, sinT);
        localZShift += 0.055 * ponsMask * antBulge;
        rz -= 0.018 * ponsMask * basilarGroove;
        rx += 0.045 * ponsMask * midPeduncle;
        localZShift -= 0.04 * ponsMask * midPeduncle;
      }

      // Midbrain: bilateral anterior cerebral peduncles (interpeduncular fossa) + posterior colliculi
      if (midbrainMask > 0.01) {
        const peduncle = Math.exp(-Math.pow((Math.abs(cosT) - 0.62) / 0.28, 2)) * smoothstep(0.05, 0.85, sinT);
        const interpeduncular = Math.exp(-Math.pow(cosT / 0.26, 2)) * smoothstep(0.2, 0.95, sinT);
        const colliculus =
          Math.exp(-Math.pow((Math.abs(cosT) - 0.35) / 0.24, 2)) *
          smoothstep(-0.15, -0.85, sinT) *
          (Math.exp(-Math.pow((t - 0.8) / 0.06, 2)) + Math.exp(-Math.pow((t - 0.91) / 0.06, 2)));
        rz += midbrainMask * (0.048 * peduncle - 0.055 * interpeduncular + 0.036 * colliculus);
        rx += midbrainMask * 0.032 * peduncle;
      }

      const px = cosT * rx;
      const pz = centerZ + sinT * rz + localZShift;
      positions.push(px, y, pz);
    }
  }

  for (let r = 0; r < rings; r++) {
    for (let s = 0; s < segs; s++) {
      const a = r * (segs + 1) + s;
      const b = a + segs + 1;
      indices.push(a, b, a + 1);
      indices.push(b, b + 1, a + 1);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  geom.computeBoundingSphere();
  return geom;
}

/**
 * Builds the Corpus Callosum as a variable-thickness C-shaped commissural arch:
 * thin Rostrum -> thick curved Genu -> broad arched Body -> bulbous Splenium.
 */
function buildCorpusCallosumGeometry(): THREE.BufferGeometry {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.04, 0.24), // Rostrum tip
    new THREE.Vector3(0, 0.14, 0.44), // Genu curve
    new THREE.Vector3(0, 0.26, 0.35), // Anterior body
    new THREE.Vector3(0, 0.31, 0.05), // Mid body
    new THREE.Vector3(0, 0.27, -0.26), // Posterior body / isthmus
    new THREE.Vector3(0, 0.17, -0.42), // Splenium bulb
  ]);

  const steps = 64;
  const radSegs = 28;
  const positions: number[] = [];
  const indices: number[] = [];

  const frames = curve.computeFrenetFrames(steps, false);

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const pt = curve.getPointAt(t);
    const tangent = frames.tangents[i];
    // Keep binormal fixed to +X (mediolateral) and compute in-plane up normal
    const binormal = new THREE.Vector3(1, 0, 0);
    const normal = new THREE.Vector3().crossVectors(binormal, tangent).normalize();

    // Anatomical thickness profile along the C-arch
    const rostrumThin = smoothstep(0.0, 0.18, t);
    const genuBulge = Math.exp(-Math.pow((t - 0.22) / 0.12, 2)) * 0.036;
    const isthmusDip = Math.exp(-Math.pow((t - 0.76) / 0.11, 2)) * 0.018;
    const spleniumBulb = Math.exp(-Math.pow((t - 0.93) / 0.1, 2)) * 0.048;

    const halfThickness = (0.025 + 0.042 * rostrumThin + genuBulge - isthmusDip + spleniumBulb);
    // Mediolateral span widens smoothly into callosal radiation
    const halfWidth = lerp(0.08, 0.20, Math.sin(t * Math.PI * 0.85 + 0.2));

    // Taper ends smoothly
    const endCap = smoothstep(0.0, 0.06, t) * smoothstep(1.0, 0.94, t);
    const rx = halfWidth * (0.3 + 0.7 * endCap);
    const ry = halfThickness * (0.25 + 0.75 * endCap);

    for (let j = 0; j <= radSegs; j++) {
      const a = (j / radSegs) * Math.PI * 2;
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      // Slight dorsal arch / ventral concavity in cross-section
      const archDip = -0.025 * (ca * ca) * smoothstep(0.2, 0.8, t);
      const vx = pt.x + binormal.x * (ca * rx) + normal.x * (sa * ry + archDip);
      const vy = pt.y + binormal.y * (ca * rx) + normal.y * (sa * ry + archDip);
      const vz = pt.z + binormal.z * (ca * rx) + normal.z * (sa * ry + archDip);
      positions.push(vx, vy, vz);
    }
  }

  for (let i = 0; i < steps; i++) {
    for (let j = 0; j < radSegs; j++) {
      const a = i * (radSegs + 1) + j;
      const b = a + radSegs + 1;
      indices.push(a, b, a + 1);
      indices.push(b, b + 1, a + 1);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  geom.computeBoundingSphere();
  return geom;
}

function buildThalamusGroup(mat: THREE.Material): THREE.Group {
  const group = new THREE.Group();
  const baseGeom = new THREE.SphereGeometry(1, 32, 24);
  const pos = baseGeom.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    // Ovoid egg shape: slightly broader posteriorly (pulvinar), flattened medially
    const pulvinar = z < 0 ? 1 + 0.22 * smoothstep(0, -1, z) : 1 - 0.18 * smoothstep(0, 1, z);
    pos.setXYZ(i, x * 0.115 * pulvinar, y * 0.125, z * 0.225);
  }
  baseGeom.computeVertexNormals();

  for (const side of [-1, 1] as const) {
    const lobe = new THREE.Mesh(baseGeom, mat);
    lobe.position.set(side * 0.145, 0.03, -0.04);
    lobe.rotation.y = side * -0.14;
    lobe.rotation.x = 0.08;
    group.add(lobe);
  }

  // Interthalamic adhesion (massa intermedia)
  const adhesionGeom = new THREE.CylinderGeometry(0.036, 0.036, 0.12, 16);
  adhesionGeom.rotateZ(Math.PI / 2);
  const adhesion = new THREE.Mesh(adhesionGeom, mat);
  adhesion.position.set(0, 0.04, -0.02);
  group.add(adhesion);

  return group;
}

function buildHypothalamusGroup(mat: THREE.Material): THREE.Group {
  const group = new THREE.Group();

  // Funnel-shaped hypothalamus floor tapering toward infundibulum
  const funnelGeom = new THREE.ConeGeometry(0.11, 0.18, 24);
  funnelGeom.rotateX(Math.PI);
  const funnel = new THREE.Mesh(funnelGeom, mat);
  funnel.position.set(0, -0.12, 0.12);
  funnel.scale.set(1.0, 1.0, 0.85);
  group.add(funnel);

  // Infundibulum stalk
  const stalkCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.18, 0.14),
    new THREE.Vector3(0, -0.26, 0.18),
    new THREE.Vector3(0, -0.31, 0.19),
  ]);
  const stalkGeom = new THREE.TubeGeometry(stalkCurve, 12, 0.018, 12, false);
  group.add(new THREE.Mesh(stalkGeom, mat));

  // Pituitary gland (anterior adenohypophysis + posterior neurohypophysis)
  const pitGeom = new THREE.SphereGeometry(0.048, 20, 16);
  pitGeom.scale(1.15, 0.82, 0.95);
  const pit = new THREE.Mesh(pitGeom, mat);
  pit.position.set(0, -0.33, 0.20);
  group.add(pit);

  // Paired Mammillary Bodies
  const mamGeom = new THREE.SphereGeometry(0.034, 16, 12);
  for (const side of [-1, 1] as const) {
    const mam = new THREE.Mesh(mamGeom, mat);
    mam.position.set(side * 0.042, -0.20, 0.03);
    group.add(mam);
  }

  return group;
}

function buildHippocampusGroup(hippoMat: THREE.Material, fornixMat: THREE.Material): THREE.Group {
  const group = new THREE.Group();

  for (const side of [-1, 1] as const) {
    // Hippocampal head, body, and tail curving in medial temporal lobe (anterior tip tucked inside amygdala)
    const hippoCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.29, -0.21, 0.25), // Tucked smoothly inside amygdala
      new THREE.Vector3(side * 0.30, -0.24, 0.16), // Hippocampal head (pes)
      new THREE.Vector3(side * 0.33, -0.22, 0.01), // Body
      new THREE.Vector3(side * 0.30, -0.14, -0.18), // Posterior body
      new THREE.Vector3(side * 0.22, -0.02, -0.28), // Tail curving upward
    ]);
    const hippoGeom = new THREE.TubeGeometry(hippoCurve, 36, 0.038, 14, false);
    group.add(new THREE.Mesh(hippoGeom, hippoMat));

    // Rounded tail cap transitioning smoothly into the fimbria/fornix crus
    const tailCap = new THREE.Mesh(new THREE.SphereGeometry(0.038, 14, 12), hippoMat);
    tailCap.position.set(side * 0.22, -0.02, -0.28);
    group.add(tailCap);

    // Almond-shaped Amygdala enclosing anterior hippocampal head
    const amygGeom = new THREE.SphereGeometry(0.056, 20, 16);
    amygGeom.scale(0.95, 0.88, 1.12);
    const amygdala = new THREE.Mesh(amygGeom, hippoMat);
    amygdala.position.set(side * 0.29, -0.21, 0.27);
    group.add(amygdala);

    // Crus, body, and descending columns of the Fornix terminating at mammillary bodies
    const fornixCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.22, -0.02, -0.28), // Fimbria / Crus start
      new THREE.Vector3(side * 0.11, 0.14, -0.19), // Crus arching superomedially
      new THREE.Vector3(side * 0.032, 0.19, 0.02), // Body of fornix beneath corpus callosum
      new THREE.Vector3(side * 0.038, 0.06, 0.16), // Anterior column descending
      new THREE.Vector3(side * 0.042, -0.19, 0.04), // Terminates inside mammillary body
    ]);
    const fornixGeom = new THREE.TubeGeometry(fornixCurve, 36, 0.021, 10, false);
    group.add(new THREE.Mesh(fornixGeom, fornixMat));
  }

  return group;
}

function buildVentriclesGroup(): THREE.Group {
  const group = new THREE.Group();
  const csfMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#6db6d9'),
    roughness: 0.14,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    transparent: true,
    opacity: 0.46,
    depthWrite: false,
  });

  for (const side of [-1, 1] as const) {
    // C-shaped Lateral Ventricle (Frontal horn -> Body -> Atrium -> Inferior temporal horn)
    const latVentCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.11, 0.14, 0.34), // Frontal horn
      new THREE.Vector3(side * 0.13, 0.21, 0.08), // Central body
      new THREE.Vector3(side * 0.19, 0.14, -0.24), // Atrium / trigone
      new THREE.Vector3(side * 0.28, -0.08, -0.16), // Descending curve
      new THREE.Vector3(side * 0.31, -0.20, 0.12), // Temporal horn tip
    ]);
    const latGeom = new THREE.TubeGeometry(latVentCurve, 36, 0.046, 14, false);
    group.add(new THREE.Mesh(latGeom, csfMat));

    // Occipital horn spur
    const occCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.19, 0.14, -0.24),
      new THREE.Vector3(side * 0.17, 0.09, -0.45),
    ]);
    const occGeom = new THREE.TubeGeometry(occCurve, 12, 0.032, 10, false);
    group.add(new THREE.Mesh(occGeom, csfMat));
  }

  // Midline Third Ventricle + Cerebral Aqueduct + Fourth Ventricle
  const midlineCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.04, 0.06), // Third ventricle
    new THREE.Vector3(0, -0.10, -0.04),
    new THREE.Vector3(0, -0.28, -0.18), // Cerebral aqueduct
    new THREE.Vector3(0, -0.52, -0.32), // Fourth ventricle
    new THREE.Vector3(0, -0.78, -0.35), // Central canal
  ]);
  const midGeom = new THREE.TubeGeometry(midlineCurve, 28, 0.022, 10, false);
  group.add(new THREE.Mesh(midGeom, csfMat));

  return group;
}

/**
 * Builds a tapered cylindrical tube along a Catmull-Rom curve for realistic vessel/nerve calibers.
 */
function buildTaperedTubeGeometry(
  curve: THREE.CatmullRomCurve3,
  tubularSegs: number,
  radiusStart: number,
  radiusEnd: number,
  radialSegs = 10,
): THREE.BufferGeometry {
  const frames = curve.computeFrenetFrames(tubularSegs, false);
  const positions: number[] = [];
  const indices: number[] = [];
  const vertex = new THREE.Vector3();

  for (let i = 0; i <= tubularSegs; i++) {
    const t = i / tubularSegs;
    const pt = curve.getPointAt(t);
    const r = lerp(radiusStart, radiusEnd, t);
    const N = frames.normals[i];
    const B = frames.binormals[i];

    for (let j = 0; j <= radialSegs; j++) {
      const a = (j / radialSegs) * Math.PI * 2;
      const sin = Math.sin(a);
      const cos = -Math.cos(a);
      vertex.x = pt.x + r * (cos * N.x + sin * B.x);
      vertex.y = pt.y + r * (cos * N.y + sin * B.y);
      vertex.z = pt.z + r * (cos * N.z + sin * B.z);
      positions.push(vertex.x, vertex.y, vertex.z);
    }
  }

  for (let i = 0; i < tubularSegs; i++) {
    for (let j = 0; j < radialSegs; j++) {
      const a = i * (radialSegs + 1) + j;
      const b = a + radialSegs + 1;
      indices.push(a, b, a + 1);
      indices.push(b, b + 1, a + 1);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  geom.computeBoundingSphere();
  return geom;
}

function addTaggedTube(
  parent: THREE.Object3D,
  points: THREE.Vector3[],
  radiusStart: number,
  radiusEnd: number,
  mat: THREE.Material,
  regionId: RegionId,
  tubularSegs = 28,
  radialSegs = 10,
): THREE.Mesh {
  const curve = new THREE.CatmullRomCurve3(points);
  const geom =
    Math.abs(radiusStart - radiusEnd) < 0.0005
      ? new THREE.TubeGeometry(curve, tubularSegs, radiusStart, radialSegs, false)
      : buildTaperedTubeGeometry(curve, tubularSegs, radiusStart, radiusEnd, radialSegs);
  const mesh = new THREE.Mesh(geom, mat);
  tagRegion(mesh, regionId);
  parent.add(mesh);
  return mesh;
}

function buildVasculatureGroup(vesselMats: Record<string, THREE.Material>): {
  group: THREE.Group;
  leftCorticalVessels: THREE.Group;
  rightCorticalVessels: THREE.Group;
  brainstemVessels: THREE.Group;
  sinusVessels: THREE.Group;
} {
  const group = new THREE.Group();
  const leftCorticalVessels = new THREE.Group();
  const rightCorticalVessels = new THREE.Group();
  const brainstemVessels = new THREE.Group();
  const sinusVessels = new THREE.Group();
  leftCorticalVessels.name = 'leftCorticalVessels';
  rightCorticalVessels.name = 'rightCorticalVessels';
  brainstemVessels.name = 'brainstemVessels';
  sinusVessels.name = 'sinusVessels';

  // Sample dense points cleanly on the outer arachnoid/pial envelope so vessels never turn dashed inside gyri
  const sampleCorticalVessel = (
    startDir: [number, number, number],
    endDir: [number, number, number],
    side: -1 | 1,
    steps: number,
    wiggleAmp = 0.024,
    offset = 0.011,
  ): THREE.Vector3[] => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const nx = lerp(startDir[0], endDir[0], t) * side;
      const ny = lerp(startDir[1], endDir[1], t) + Math.sin(t * Math.PI * 3.0) * wiggleAmp;
      const nz = lerp(startDir[2], endDir[2], t) + Math.cos(t * Math.PI * 2.5) * wiggleAmp;
      const v = evaluateCorticalVertex(nx, ny, nz, side);
      const len = Math.hypot(v.x, v.y, v.z) || 1;
      const envelopeLift = offset + (1.0 - v.gyrusHeight) * 0.01;
      pts.push(
        new THREE.Vector3(
          v.x + (v.x / len) * envelopeLift,
          v.y + (v.y / len) * envelopeLift,
          v.z + (v.z / len) * envelopeLift,
        ),
      );
    }
    return pts;
  };

  // --- 1. VERTEBROBASILAR & CEREBELLAR ARTERIES (vessel-vertebrobasilar) ---
  const vbMat = vesselMats['vessel-vertebrobasilar'];

  // Midline Basilar Artery ascending cleanly on the ventral pontine basilar groove
  addTaggedTube(
    brainstemVessels,
    [
      new THREE.Vector3(0, -0.64, -0.055),
      new THREE.Vector3(0, -0.51, 0.068),
      new THREE.Vector3(0, -0.39, 0.072),
      new THREE.Vector3(0, -0.28, 0.032),
    ],
    0.021,
    0.018,
    vbMat,
    'vessel-vertebrobasilar',
    24,
    12,
  );

  for (const side of [-1, 1] as const) {
    // Intradural Vertebral Artery (VA) along anterolateral medulla -> basilar confluence
    addTaggedTube(
      brainstemVessels,
      [
        new THREE.Vector3(side * 0.095, -0.99, -0.26),
        new THREE.Vector3(side * 0.082, -0.84, -0.155),
        new THREE.Vector3(side * 0.048, -0.71, -0.085),
        new THREE.Vector3(0, -0.64, -0.055),
      ],
      0.016,
      0.015,
      vbMat,
      'vessel-vertebrobasilar',
      22,
      10,
    );

    // Superior Cerebellar Artery (SCA) exiting below basilar tip, cradling CN III from below
    addTaggedTube(
      brainstemVessels,
      [
        new THREE.Vector3(0, -0.31, 0.035),
        new THREE.Vector3(side * 0.11, -0.315, -0.01),
        new THREE.Vector3(side * 0.22, -0.28, -0.20),
        new THREE.Vector3(side * 0.34, -0.21, -0.44),
      ],
      0.011,
      0.005,
      vbMat,
      'vessel-vertebrobasilar',
      24,
      9,
    );

    // Anterior Inferior Cerebellar Artery (AICA) coursing across CPA near CN VII/VIII
    addTaggedTube(
      brainstemVessels,
      [
        new THREE.Vector3(0, -0.52, 0.065),
        new THREE.Vector3(side * 0.14, -0.55, -0.01),
        new THREE.Vector3(side * 0.26, -0.57, -0.16),
        new THREE.Vector3(side * 0.41, -0.51, -0.36),
      ],
      0.009,
      0.0045,
      vbMat,
      'vessel-vertebrobasilar',
      20,
      8,
    );

    // Posterior Inferior Cerebellar Artery (PICA) looping around medulla onto inferior cerebellum
    addTaggedTube(
      brainstemVessels,
      [
        new THREE.Vector3(side * 0.082, -0.83, -0.16),
        new THREE.Vector3(side * 0.14, -0.80, -0.31),
        new THREE.Vector3(side * 0.17, -0.75, -0.46),
        new THREE.Vector3(side * 0.27, -0.65, -0.64),
      ],
      0.010,
      0.005,
      vbMat,
      'vessel-vertebrobasilar',
      22,
      8,
    );
  }

  // --- 2. CIRCLE OF WILLIS & INTERNAL CAROTID ARTERIES (vessel-circle-of-willis) ---
  const cowMat = vesselMats['vessel-circle-of-willis'];

  // Anterior Communicating Artery (ACom) bridging bilateral ACA A1/A2 junctions
  addTaggedTube(
    group,
    [
      new THREE.Vector3(-0.04, -0.195, 0.255),
      new THREE.Vector3(0, -0.192, 0.265),
      new THREE.Vector3(0.04, -0.195, 0.255),
    ],
    0.009,
    0.009,
    cowMat,
    'vessel-circle-of-willis',
    10,
    8,
  );

  for (const side of [-1, 1] as const) {
    // Supraclinoid Internal Carotid Artery (ICA) rising beside optic chiasm & pituitary
    addTaggedTube(
      group,
      [
        new THREE.Vector3(side * 0.135, -0.45, 0.18),
        new THREE.Vector3(side * 0.125, -0.33, 0.16),
        new THREE.Vector3(side * 0.12, -0.245, 0.145),
      ],
      0.023,
      0.020,
      cowMat,
      'vessel-circle-of-willis',
      18,
      11,
    );

    // Posterior Communicating Artery (PCom) linking ICA bifurcation to PCA P1
    addTaggedTube(
      group,
      [
        new THREE.Vector3(side * 0.12, -0.245, 0.145),
        new THREE.Vector3(side * 0.105, -0.258, 0.065),
        new THREE.Vector3(side * 0.095, -0.265, -0.01),
      ],
      0.009,
      0.0085,
      cowMat,
      'vessel-circle-of-willis',
      14,
      8,
    );

    // Medial & Lateral Lenticulostriate Perforators rising from proximal M1 into striatum
    for (const pIdx of [0, 1] as const) {
      const xBase = side * (0.19 + pIdx * 0.06);
      addTaggedTube(
        group,
        [
          new THREE.Vector3(xBase, -0.225, 0.165),
          new THREE.Vector3(xBase * 0.94, -0.12, 0.15),
          new THREE.Vector3(xBase * 0.88, -0.02, 0.12),
        ],
        0.0048,
        0.0032,
        cowMat,
        'vessel-circle-of-willis',
        12,
        6,
      );
    }
  }

  // --- 3. CORTICAL & HEMISPHERIC VESSELS (ACA, MCA, PCA, Cortical Bridging Veins) ---
  const acaMat = vesselMats['vessel-aca'];
  const mcaMat = vesselMats['vessel-mca'];
  const pcaMat = vesselMats['vessel-pca'];
  const cvMat = vesselMats['vessel-cortical-veins'];

  for (const side of [-1, 1] as const) {
    const sideGroup = side === -1 ? leftCorticalVessels : rightCorticalVessels;

    // A1 + Pericallosal Anterior Cerebral Artery (ACA) A2-A4 arching over corpus callosum
    addTaggedTube(
      sideGroup,
      [
        new THREE.Vector3(side * 0.12, -0.245, 0.145),
        new THREE.Vector3(side * 0.04, -0.195, 0.255),
        new THREE.Vector3(side * 0.024, -0.02, 0.42),
        new THREE.Vector3(side * 0.024, 0.17, 0.51),
        new THREE.Vector3(side * 0.024, 0.34, 0.39),
        new THREE.Vector3(side * 0.024, 0.38, 0.05),
        new THREE.Vector3(side * 0.024, 0.32, -0.32),
      ],
      0.013,
      0.008,
      acaMat,
      'vessel-aca',
      40,
      9,
    );

    // Callosomarginal Artery coursing along cingulate sulcus & medial paracentral lobule
    addTaggedTube(
      sideGroup,
      [
        new THREE.Vector3(side * 0.026, 0.12, 0.49),
        new THREE.Vector3(side * 0.030, 0.36, 0.56),
        new THREE.Vector3(side * 0.032, 0.54, 0.30),
        new THREE.Vector3(side * 0.032, 0.58, -0.04),
      ],
      0.0095,
      0.006,
      acaMat,
      'vessel-aca',
      30,
      8,
    );

    // Middle Cerebral Artery (MCA): M1 sphenoidal -> M2 insular curve -> M3/M4 Sylvian main trunk
    const mcaMainPts = [
      new THREE.Vector3(side * 0.12, -0.245, 0.145),
      new THREE.Vector3(side * 0.26, -0.225, 0.175),
      new THREE.Vector3(side * 0.41, -0.195, 0.215),
      new THREE.Vector3(side * 0.56, -0.135, 0.26),
      ...sampleCorticalVessel([0.84, -0.07, 0.34], [0.90, 0.24, -0.36], side, 42, 0.014, 0.010),
    ];
    addTaggedTube(sideGroup, mcaMainPts, 0.017, 0.0055, mcaMat, 'vessel-mca', 68, 9);

    // MCA M4 Prefrontal / Broca ascending branch
    addTaggedTube(
      sideGroup,
      sampleCorticalVessel([0.85, -0.02, 0.30], [0.28, 0.80, 0.44], side, 40, 0.026, 0.010),
      0.010,
      0.0032,
      mcaMat,
      'vessel-mca',
      50,
      8,
    );

    // MCA M4 Central / Precentral opercular branch
    addTaggedTube(
      sideGroup,
      sampleCorticalVessel([0.92, 0.06, 0.08], [0.26, 0.90, 0.04], side, 40, 0.022, 0.010),
      0.0095,
      0.0030,
      mcaMat,
      'vessel-mca',
      50,
      8,
    );

    // MCA M4 Angular / Posterior Parietal terminal branch
    addTaggedTube(
      sideGroup,
      sampleCorticalVessel([0.90, 0.18, -0.20], [0.36, 0.72, -0.58], side, 36, 0.020, 0.010),
      0.009,
      0.0030,
      mcaMat,
      'vessel-mca',
      44,
      8,
    );

    // MCA Inferior Temporal descending cortical branch
    addTaggedTube(
      sideGroup,
      sampleCorticalVessel([0.88, -0.12, 0.22], [0.88, -0.36, -0.34], side, 32, 0.018, 0.010),
      0.009,
      0.0032,
      mcaMat,
      'vessel-mca',
      38,
      8,
    );

    // Posterior Cerebral Artery (PCA): P1 interpeduncular -> P2 ambient -> P3/P4 calcarine
    addTaggedTube(
      sideGroup,
      [
        new THREE.Vector3(0, -0.28, 0.032),
        new THREE.Vector3(side * 0.095, -0.265, -0.01),
        new THREE.Vector3(side * 0.21, -0.22, -0.18),
        new THREE.Vector3(side * 0.19, -0.14, -0.44),
        new THREE.Vector3(side * 0.11, -0.04, -0.78),
        new THREE.Vector3(side * 0.09, -0.03, -1.04),
      ],
      0.013,
      0.0045,
      pcaMat,
      'vessel-pca',
      38,
      9,
    );

    // PCA Parieto-Occipital lateral occipital cortical branch
    addTaggedTube(
      sideGroup,
      sampleCorticalVessel([0.52, -0.12, -0.68], [0.34, 0.34, -0.96], side, 28, 0.018, 0.010),
      0.0085,
      0.0032,
      pcaMat,
      'vessel-pca',
      34,
      8,
    );

    // --- Cortical Bridging & Anastomotic Veins (vessel-cortical-veins) ---
    // Superficial Middle Cerebral Vein (Sylvian Vein)
    addTaggedTube(
      sideGroup,
      sampleCorticalVessel([0.82, -0.11, 0.32], [0.92, 0.04, -0.08], side, 32, 0.014, 0.011),
      0.011,
      0.013,
      cvMat,
      'vessel-cortical-veins',
      38,
      8,
    );

    // Superior Anastomotic Vein of Trolard (Sylvian -> SSS across parietal convexity)
    addTaggedTube(
      sideGroup,
      sampleCorticalVessel([0.92, 0.10, -0.12], [0.06, 0.96, -0.22], side, 44, 0.022, 0.0115),
      0.012,
      0.015,
      cvMat,
      'vessel-cortical-veins',
      52,
      8,
    );

    // Inferior Anastomotic Vein of Labbe (Sylvian -> Transverse Sinus across temporal cortex)
    addTaggedTube(
      sideGroup,
      sampleCorticalVessel([0.92, 0.04, -0.08], [0.70, -0.24, -0.50], side, 36, 0.018, 0.0115),
      0.011,
      0.014,
      cvMat,
      'vessel-cortical-veins',
      44,
      8,
    );

    // Prefrontal & Central Bridging Veins draining toward Superior Sagittal Sinus
    addTaggedTube(
      sideGroup,
      sampleCorticalVessel([0.74, 0.16, 0.56], [0.06, 0.86, 0.42], side, 36, 0.020, 0.011),
      0.0085,
      0.012,
      cvMat,
      'vessel-cortical-veins',
      42,
      8,
    );
    addTaggedTube(
      sideGroup,
      sampleCorticalVessel([0.92, 0.18, 0.12], [0.06, 0.95, 0.02], side, 40, 0.020, 0.011),
      0.009,
      0.013,
      cvMat,
      'vessel-cortical-veins',
      44,
      8,
    );
  }

  // --- 4. DURAL VENOUS SINUSES & DEEP VENOUS SYSTEM (vessel-venous-sinuses) ---
  const sinusMat = vesselMats['vessel-venous-sinuses'];

  // Superior Sagittal Sinus (SSS) widening posteriorly along longitudinal fissure to Torcular Herophili
  addTaggedTube(
    sinusVessels,
    [
      new THREE.Vector3(0, 0.24, 1.07),
      new THREE.Vector3(0, 0.64, 0.78),
      new THREE.Vector3(0, 0.86, 0.34),
      new THREE.Vector3(0, 0.90, -0.14),
      new THREE.Vector3(0, 0.72, -0.66),
      new THREE.Vector3(0, 0.32, -1.04),
      new THREE.Vector3(0, -0.06, -1.10),
    ],
    0.018,
    0.036,
    sinusMat,
    'vessel-venous-sinuses',
    56,
    12,
  );

  // Inferior Sagittal Sinus -> Straight Sinus -> Torcular Herophili
  addTaggedTube(
    sinusVessels,
    [
      new THREE.Vector3(0, 0.44, 0.38),
      new THREE.Vector3(0, 0.40, -0.08),
      new THREE.Vector3(0, 0.10, -0.38),
      new THREE.Vector3(0, 0.01, -0.76),
      new THREE.Vector3(0, -0.06, -1.09),
    ],
    0.009,
    0.020,
    sinusMat,
    'vessel-venous-sinuses',
    36,
    10,
  );

  // Great Cerebral Vein (of Galen) joining deep veins into Straight Sinus
  addTaggedTube(
    sinusVessels,
    [
      new THREE.Vector3(0, 0.09, -0.24),
      new THREE.Vector3(0, 0.08, -0.31),
      new THREE.Vector3(0, 0.10, -0.38),
    ],
    0.014,
    0.018,
    sinusMat,
    'vessel-venous-sinuses',
    12,
    10,
  );

  for (const side of [-1, 1] as const) {
    // Internal Cerebral Vein (roof of third ventricle -> Vein of Galen)
    addTaggedTube(
      sinusVessels,
      [
        new THREE.Vector3(side * 0.024, 0.10, 0.05),
        new THREE.Vector3(side * 0.022, 0.11, -0.11),
        new THREE.Vector3(0, 0.09, -0.24),
      ],
      0.007,
      0.009,
      sinusMat,
      'vessel-venous-sinuses',
      16,
      8,
    );

    // Basal Vein of Rosenthal wrapping around midbrain toward Vein of Galen
    addTaggedTube(
      sinusVessels,
      [
        new THREE.Vector3(side * 0.13, -0.22, 0.08),
        new THREE.Vector3(side * 0.15, -0.15, -0.10),
        new THREE.Vector3(side * 0.08, -0.02, -0.22),
        new THREE.Vector3(0, 0.08, -0.27),
      ],
      0.0075,
      0.009,
      sinusMat,
      'vessel-venous-sinuses',
      18,
      8,
    );

    // Transverse & Sigmoid Sinuses (Torcular -> Tentorial Margin -> Jugular Bulb near CN IX/X/XI)
    addTaggedTube(
      sinusVessels,
      [
        new THREE.Vector3(0, -0.06, -1.09),
        new THREE.Vector3(side * 0.33, -0.10, -0.96),
        new THREE.Vector3(side * 0.56, -0.17, -0.70),
        new THREE.Vector3(side * 0.52, -0.32, -0.44),
        new THREE.Vector3(side * 0.39, -0.56, -0.28),
        new THREE.Vector3(side * 0.32, -0.74, -0.17),
      ],
      0.025,
      0.015,
      sinusMat,
      'vessel-venous-sinuses',
      40,
      12,
    );
  }

  group.add(leftCorticalVessels, rightCorticalVessels, brainstemVessels, sinusVessels);
  return {
    group,
    leftCorticalVessels,
    rightCorticalVessels,
    brainstemVessels,
    sinusVessels,
  };
}

function buildCranialNervesGroup(
  nerveMats: Record<string, THREE.Material>,
  spinalCordMat: THREE.Material,
): {
  group: THREE.Group;
  forebrainNerves: THREE.Group;
  brainstemNerves: THREE.Group;
  nerveRegionGroups: Map<RegionId, THREE.Group>;
} {
  const group = new THREE.Group();
  const forebrainNerves = new THREE.Group();
  const brainstemNerves = new THREE.Group();
  forebrainNerves.name = 'forebrainNerves';
  brainstemNerves.name = 'brainstemNerves';

  const nerveRegionGroups = new Map<RegionId, THREE.Group>();

  const ensureNerveGroup = (regionId: RegionId, parent: THREE.Group): THREE.Group => {
    let sub = nerveRegionGroups.get(regionId);
    if (!sub) {
      sub = new THREE.Group();
      sub.name = `nerveGroup_${regionId}`;
      const emb = BRAIN_REGIONS[regionId].embryology;
      sub.userData.regionId = regionId;
      sub.userData.emergenceGw = emb?.emergenceGw ?? 4.0;
      sub.userData.matureGw = emb?.matureGw ?? 7.0;
      nerveRegionGroups.set(regionId, sub);
      parent.add(sub);
    }
    return sub;
  };

  // Pre-create all nerve region groups in deterministic anatomical attachment parents
  const cnIGrp = ensureNerveGroup('cn-i-olfactory', forebrainNerves);
  const cnIIGrp = ensureNerveGroup('cn-ii-optic', forebrainNerves);
  const sympGrp = ensureNerveGroup('nerve-sympathetic-carotid', forebrainNerves);
  const duralGrp = ensureNerveGroup('nerve-meningeal-dural', forebrainNerves);

  const cnIIIGrp = ensureNerveGroup('cn-iii-oculomotor', brainstemNerves);
  const cnIVGrp = ensureNerveGroup('cn-iv-trochlear', brainstemNerves);
  const cnVGrp = ensureNerveGroup('cn-v-trigeminal', brainstemNerves);
  const cnVIGrp = ensureNerveGroup('cn-vi-abducens', brainstemNerves);
  const cnVIIGrp = ensureNerveGroup('cn-vii-facial', brainstemNerves);
  const cnVIIIGrp = ensureNerveGroup('cn-viii-vestibulocochlear', brainstemNerves);
  const cnIXGrp = ensureNerveGroup('cn-ix-glossopharyngeal', brainstemNerves);
  const cnXGrp = ensureNerveGroup('cn-x-vagus', brainstemNerves);
  const cnXIGrp = ensureNerveGroup('cn-xi-accessory', brainstemNerves);
  const cnXIIGrp = ensureNerveGroup('cn-xii-hypoglossal', brainstemNerves);
  const spinalGrp = ensureNerveGroup('nerve-cervical-spinal', brainstemNerves);
  const paraGrp = ensureNerveGroup('nerve-parasympathetic-ganglia', brainstemNerves);

  // Optic Chiasm midline bridge (CN II)
  const chiasmGeom = new THREE.BoxGeometry(0.085, 0.026, 0.045);
  const chiasmMesh = new THREE.Mesh(chiasmGeom, nerveMats['cn-ii-optic']);
  chiasmMesh.position.set(0, -0.22, 0.23);
  tagRegion(chiasmMesh, 'cn-ii-optic');
  cnIIGrp.add(chiasmMesh);

  // Upper Cervical Spinal Cord (C1–C5) extending seamlessly from inferior medulla (-0.96 -> -1.32)
  const cordCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.96, -0.355),
    new THREE.Vector3(0, -1.08, -0.368),
    new THREE.Vector3(0, -1.20, -0.376),
    new THREE.Vector3(0, -1.32, -0.382),
  ]);
  const cordGeom = buildTaperedTubeGeometry(cordCurve, 20, 0.092, 0.084, 24);
  const cordMesh = new THREE.Mesh(cordGeom, spinalCordMat);
  tagRegion(cordMesh, 'nerve-cervical-spinal');
  spinalGrp.add(cordMesh);

  for (const side of [-1, 1] as const) {
    // CN I: Olfactory Bulb + Fila Olfactoria (through cribriform plate) + Tract + Medial & Lateral Striae
    const cnIMat = nerveMats['cn-i-olfactory'];
    const bulbGeom = new THREE.SphereGeometry(0.024, 16, 12);
    bulbGeom.scale(0.85, 0.62, 2.25);
    const bulb = new THREE.Mesh(bulbGeom, cnIMat);
    bulb.position.set(side * 0.068, -0.205, 0.73);
    tagRegion(bulb, 'cn-i-olfactory');
    cnIGrp.add(bulb);

    for (const filaZ of [0.69, 0.725, 0.76]) {
      addTaggedTube(
        cnIGrp,
        [
          new THREE.Vector3(side * 0.068, -0.215, filaZ),
          new THREE.Vector3(side * 0.066, -0.258, filaZ + 0.005),
        ],
        0.0042,
        0.0028,
        cnIMat,
        'cn-i-olfactory',
        6,
        6,
      );
    }

    addTaggedTube(
      cnIGrp,
      [
        new THREE.Vector3(side * 0.068, -0.204, 0.69),
        new THREE.Vector3(side * 0.065, -0.196, 0.48),
        new THREE.Vector3(side * 0.068, -0.185, 0.31),
      ],
      0.011,
      0.010,
      cnIMat,
      'cn-i-olfactory',
      16,
      8,
    );
    addTaggedTube(
      cnIGrp,
      [
        new THREE.Vector3(side * 0.068, -0.185, 0.31),
        new THREE.Vector3(side * 0.14, -0.19, 0.23),
      ],
      0.008,
      0.006,
      cnIMat,
      'cn-i-olfactory',
      10,
      7,
    );
    addTaggedTube(
      cnIGrp,
      [
        new THREE.Vector3(side * 0.068, -0.185, 0.31),
        new THREE.Vector3(side * 0.032, -0.17, 0.24),
      ],
      0.007,
      0.005,
      cnIMat,
      'cn-i-olfactory',
      10,
      7,
    );

    // CN II: Optic Nerve -> Chiasm -> Optic Tract to Thalamic LGN
    const cnIIMat = nerveMats['cn-ii-optic'];
    addTaggedTube(
      cnIIGrp,
      [
        new THREE.Vector3(side * 0.155, -0.245, 0.41),
        new THREE.Vector3(side * 0.09, -0.232, 0.31),
        new THREE.Vector3(side * 0.032, -0.22, 0.23),
        new THREE.Vector3(side * 0.095, -0.185, 0.13),
        new THREE.Vector3(side * 0.175, -0.135, 0.02),
        new THREE.Vector3(side * 0.205, -0.09, -0.09),
      ],
      0.020,
      0.018,
      cnIIMat,
      'cn-ii-optic',
      28,
      10,
    );

    // CN III: Oculomotor Nerve
    addTaggedTube(
      cnIIIGrp,
      [
        new THREE.Vector3(side * 0.038, -0.268, 0.015),
        new THREE.Vector3(side * 0.078, -0.278, 0.09),
        new THREE.Vector3(side * 0.118, -0.282, 0.21),
        new THREE.Vector3(side * 0.145, -0.285, 0.33),
      ],
      0.013,
      0.012,
      nerveMats['cn-iii-oculomotor'],
      'cn-iii-oculomotor',
      20,
      9,
    );

    // CN IV: Trochlear Nerve
    addTaggedTube(
      cnIVGrp,
      [
        new THREE.Vector3(side * 0.036, -0.282, -0.20),
        new THREE.Vector3(side * 0.135, -0.292, -0.16),
        new THREE.Vector3(side * 0.185, -0.296, -0.02),
        new THREE.Vector3(side * 0.165, -0.30, 0.15),
        new THREE.Vector3(side * 0.152, -0.30, 0.29),
      ],
      0.0085,
      0.008,
      nerveMats['cn-iv-trochlear'],
      'cn-iv-trochlear',
      28,
      8,
    );

    // CN V: Trigeminal Sensory + Motor Root (portio minor) + Gasserian Ganglion + V1/V2/V3
    const cnVMat = nerveMats['cn-v-trigeminal'];
    addTaggedTube(
      cnVGrp,
      [
        new THREE.Vector3(side * 0.215, -0.455, -0.055),
        new THREE.Vector3(side * 0.245, -0.44, 0.05),
        new THREE.Vector3(side * 0.255, -0.43, 0.145),
      ],
      0.022,
      0.024,
      cnVMat,
      'cn-v-trigeminal',
      16,
      10,
    );
    // Motor root (portio minor) tucking beneath ganglion into V3
    addTaggedTube(
      cnVGrp,
      [
        new THREE.Vector3(side * 0.195, -0.468, -0.045),
        new THREE.Vector3(side * 0.235, -0.462, 0.065),
        new THREE.Vector3(side * 0.265, -0.455, 0.16),
      ],
      0.0075,
      0.0068,
      cnVMat,
      'cn-v-trigeminal',
      14,
      7,
    );

    const ganglionGeom = new THREE.SphereGeometry(0.034, 16, 14);
    ganglionGeom.scale(1.15, 0.65, 1.35);
    const ganglion = new THREE.Mesh(ganglionGeom, cnVMat);
    ganglion.position.set(side * 0.255, -0.43, 0.155);
    ganglion.rotation.y = side * -0.25;
    tagRegion(ganglion, 'cn-v-trigeminal');
    cnVGrp.add(ganglion);

    // V1 Ophthalmic
    addTaggedTube(
      cnVGrp,
      [
        new THREE.Vector3(side * 0.255, -0.425, 0.175),
        new THREE.Vector3(side * 0.22, -0.37, 0.29),
        new THREE.Vector3(side * 0.19, -0.33, 0.37),
      ],
      0.011,
      0.008,
      cnVMat,
      'cn-v-trigeminal',
      14,
      8,
    );
    // V2 Maxillary
    addTaggedTube(
      cnVGrp,
      [
        new THREE.Vector3(side * 0.26, -0.435, 0.175),
        new THREE.Vector3(side * 0.275, -0.465, 0.29),
        new THREE.Vector3(side * 0.27, -0.485, 0.38),
      ],
      0.012,
      0.0085,
      cnVMat,
      'cn-v-trigeminal',
      14,
      8,
    );
    // V3 Mandibular
    addTaggedTube(
      cnVGrp,
      [
        new THREE.Vector3(side * 0.265, -0.445, 0.16),
        new THREE.Vector3(side * 0.30, -0.535, 0.22),
        new THREE.Vector3(side * 0.32, -0.615, 0.25),
      ],
      0.013,
      0.009,
      cnVMat,
      'cn-v-trigeminal',
      14,
      8,
    );

    // CN VI: Abducens Nerve
    addTaggedTube(
      cnVIGrp,
      [
        new THREE.Vector3(side * 0.044, -0.625, -0.075),
        new THREE.Vector3(side * 0.072, -0.51, 0.065),
        new THREE.Vector3(side * 0.102, -0.38, 0.20),
        new THREE.Vector3(side * 0.128, -0.315, 0.32),
      ],
      0.010,
      0.009,
      nerveMats['cn-vi-abducens'],
      'cn-vi-abducens',
      20,
      8,
    );

    // CN VII: Facial Nerve
    addTaggedTube(
      cnVIIGrp,
      [
        new THREE.Vector3(side * 0.155, -0.61, -0.135),
        new THREE.Vector3(side * 0.255, -0.595, -0.085),
        new THREE.Vector3(side * 0.355, -0.575, -0.025),
        new THREE.Vector3(side * 0.435, -0.565, 0.04),
      ],
      0.0115,
      0.0105,
      nerveMats['cn-vii-facial'],
      'cn-vii-facial',
      18,
      8,
    );

    // CN VIII: Vestibulocochlear Nerve
    addTaggedTube(
      cnVIIIGrp,
      [
        new THREE.Vector3(side * 0.18, -0.612, -0.172),
        new THREE.Vector3(side * 0.275, -0.598, -0.125),
        new THREE.Vector3(side * 0.37, -0.582, -0.065),
        new THREE.Vector3(side * 0.445, -0.572, 0.005),
      ],
      0.0145,
      0.0135,
      nerveMats['cn-viii-vestibulocochlear'],
      'cn-viii-vestibulocochlear',
      18,
      9,
    );

    // CN IX: Glossopharyngeal Nerve
    addTaggedTube(
      cnIXGrp,
      [
        new THREE.Vector3(side * 0.13, -0.71, -0.225),
        new THREE.Vector3(side * 0.22, -0.71, -0.185),
        new THREE.Vector3(side * 0.315, -0.712, -0.14),
      ],
      0.010,
      0.009,
      nerveMats['cn-ix-glossopharyngeal'],
      'cn-ix-glossopharyngeal',
      14,
      8,
    );

    // CN X: Vagus Nerve (post-olivary rootlets + descending carotid-sheath cervical trunk)
    const cnXMat = nerveMats['cn-x-vagus'];
    for (const rootY of [-0.745, -0.775, -0.805]) {
      addTaggedTube(
        cnXGrp,
        [
          new THREE.Vector3(side * 0.125, rootY, -0.24),
          new THREE.Vector3(side * 0.21, -0.775, -0.205),
          new THREE.Vector3(side * 0.305, -0.785, -0.16),
        ],
        0.0072,
        0.0085,
        cnXMat,
        'cn-x-vagus',
        14,
        7,
      );
    }
    addTaggedTube(
      cnXGrp,
      [
        new THREE.Vector3(side * 0.305, -0.785, -0.16),
        new THREE.Vector3(side * 0.32, -0.96, -0.14),
        new THREE.Vector3(side * 0.30, -1.18, -0.12),
      ],
      0.009,
      0.0075,
      cnXMat,
      'cn-x-vagus',
      16,
      7,
    );

    // CN XI: Spinal Accessory Nerve (ascending C1–C5 rootlets + medullary bridge)
    addTaggedTube(
      cnXIGrp,
      [
        new THREE.Vector3(side * 0.098, -1.22, -0.375),
        new THREE.Vector3(side * 0.105, -1.03, -0.35),
        new THREE.Vector3(side * 0.125, -0.90, -0.29),
        new THREE.Vector3(side * 0.145, -0.83, -0.25),
        new THREE.Vector3(side * 0.285, -0.835, -0.18),
      ],
      0.009,
      0.010,
      nerveMats['cn-xi-accessory'],
      'cn-xi-accessory',
      22,
      8,
    );

    // CN XII: Hypoglossal Nerve
    const cnXIIMat = nerveMats['cn-xii-hypoglossal'];
    for (const rootY of [-0.745, -0.78, -0.815]) {
      addTaggedTube(
        cnXIIGrp,
        [
          new THREE.Vector3(side * 0.062, rootY, -0.175),
          new THREE.Vector3(side * 0.135, -0.79, -0.135),
          new THREE.Vector3(side * 0.215, -0.805, -0.08),
        ],
        0.0068,
        0.0082,
        cnXIIMat,
        'cn-xii-hypoglossal',
        14,
        7,
      );
    }

    // --- NERVE SYSTEM 13: Cervical Spinal Nerves C1–C5, DRGs, Greater Occipital & Phrenic Roots ---
    const spMat = nerveMats['nerve-cervical-spinal'];
    const cLevelsY = [-1.01, -1.075, -1.14, -1.205, -1.27];
    const cLevelsZ = [-0.36, -0.365, -0.37, -0.375, -0.38];

    cLevelsY.forEach((cy, idx) => {
      const cz = cLevelsZ[idx];
      // Dorsal sensory root + Dorsal Root Ganglion (DRG) + mixed spinal nerve trunk
      addTaggedTube(
        spinalGrp,
        [
          new THREE.Vector3(side * 0.062, cy + 0.012, cz - 0.055),
          new THREE.Vector3(side * 0.145, cy, cz - 0.03),
          new THREE.Vector3(side * 0.225, cy - 0.015, cz + 0.015),
        ],
        0.007,
        0.0082,
        spMat,
        'nerve-cervical-spinal',
        12,
        7,
      );
      // Ventral motor root joining spinal nerve at intervertebral foramen
      addTaggedTube(
        spinalGrp,
        [
          new THREE.Vector3(side * 0.058, cy - 0.010, cz + 0.052),
          new THREE.Vector3(side * 0.14, cy - 0.008, cz + 0.025),
          new THREE.Vector3(side * 0.20, cy - 0.012, cz + 0.005),
        ],
        0.0065,
        0.007,
        spMat,
        'nerve-cervical-spinal',
        10,
        7,
      );

      const drgGeom = new THREE.SphereGeometry(0.017, 12, 10);
      drgGeom.scale(1.45, 0.85, 0.85);
      const drg = new THREE.Mesh(drgGeom, spMat);
      drg.position.set(side * 0.165, cy - 0.004, cz - 0.018);
      tagRegion(drg, 'nerve-cervical-spinal');
      spinalGrp.add(drg);
    });

    // Greater Occipital Nerve (C2 dorsal ramus arching posterosuperiorly behind posterior fossa)
    addTaggedTube(
      spinalGrp,
      [
        new THREE.Vector3(side * 0.20, -1.08, -0.365),
        new THREE.Vector3(side * 0.26, -1.04, -0.52),
        new THREE.Vector3(side * 0.24, -0.84, -0.68),
      ],
      0.007,
      0.005,
      spMat,
      'nerve-cervical-spinal',
      16,
      7,
    );

    // Phrenic Nerve Roots (C3–C5 converging anterolaterally toward diaphragm)
    for (const py of [-1.14, -1.205, -1.27]) {
      addTaggedTube(
        spinalGrp,
        [
          new THREE.Vector3(side * 0.225, py - 0.015, -0.355),
          new THREE.Vector3(side * 0.285, py - 0.065, -0.26),
          new THREE.Vector3(side * 0.30, -1.36, -0.18),
        ],
        0.0058,
        0.0068,
        spMat,
        'nerve-cervical-spinal',
        12,
        7,
      );
    }

    // --- NERVE SYSTEM 14: Internal Carotid Sympathetic Plexus (SCG + perivascular ICA/CoW helix) ---
    const symMat = nerveMats['nerve-sympathetic-carotid'];
    const scgGeom = new THREE.SphereGeometry(0.025, 14, 12);
    scgGeom.scale(0.85, 2.1, 0.85);
    const scg = new THREE.Mesh(scgGeom, symMat);
    scg.position.set(side * 0.148, -0.56, 0.165);
    tagRegion(scg, 'nerve-sympathetic-carotid');
    sympGrp.add(scg);

    // Helical postganglionic sympathetic filaments spiraling up the ICA to Circle of Willis
    const helixPtsA: THREE.Vector3[] = [];
    const helixPtsB: THREE.Vector3[] = [];
    for (let k = 0; k <= 18; k++) {
      const t = k / 18;
      const cx = side * lerp(0.138, 0.12, t);
      const cy = lerp(-0.50, -0.245, t);
      const cz = lerp(0.18, 0.145, t);
      const angle = t * Math.PI * 5.0 * side;
      const rad = 0.0245;
      helixPtsA.push(new THREE.Vector3(cx + Math.cos(angle) * rad, cy, cz + Math.sin(angle) * rad));
      helixPtsB.push(new THREE.Vector3(cx - Math.cos(angle) * rad, cy, cz - Math.sin(angle) * rad));
    }
    addTaggedTube(sympGrp, helixPtsA, 0.0042, 0.0032, symMat, 'nerve-sympathetic-carotid', 28, 6);
    addTaggedTube(sympGrp, helixPtsB, 0.0040, 0.0030, symMat, 'nerve-sympathetic-carotid', 28, 6);
    // Perivascular continuation onto proximal MCA & ACA
    addTaggedTube(
      sympGrp,
      [
        new THREE.Vector3(side * 0.12, -0.245, 0.145),
        new THREE.Vector3(side * 0.24, -0.225, 0.175),
        new THREE.Vector3(side * 0.36, -0.20, 0.21),
      ],
      0.0038,
      0.0024,
      symMat,
      'nerve-sympathetic-carotid',
      14,
      6,
    );
    addTaggedTube(
      sympGrp,
      [
        new THREE.Vector3(side * 0.12, -0.245, 0.145),
        new THREE.Vector3(side * 0.045, -0.195, 0.255),
        new THREE.Vector3(side * 0.032, -0.08, 0.36),
      ],
      0.0038,
      0.0024,
      symMat,
      'nerve-sympathetic-carotid',
      14,
      6,
    );

    // --- NERVE SYSTEM 15: Cranial Parasympathetic Ganglia & Petrosal Nerves ---
    const paraMat = nerveMats['nerve-parasympathetic-ganglia'];
    const addGanglionNode = (pos: [number, number, number], r = 0.017) => {
      const g = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 10), paraMat);
      g.position.set(side * pos[0], pos[1], pos[2]);
      tagRegion(g, 'nerve-parasympathetic-ganglia');
      paraGrp.add(g);
    };

    // 1. Ciliary Ganglion (on CN III / V1 orbital path)
    addGanglionNode([0.155, -0.295, 0.32], 0.015);
    addTaggedTube(
      paraGrp,
      [
        new THREE.Vector3(side * 0.142, -0.286, 0.30),
        new THREE.Vector3(side * 0.155, -0.295, 0.32),
        new THREE.Vector3(side * 0.165, -0.292, 0.385),
      ],
      0.0045,
      0.0035,
      paraMat,
      'nerve-parasympathetic-ganglia',
      10,
      6,
    );

    // 2. Pterygopalatine (Sphenopalatine) Ganglion + Greater Petrosal Nerve (CN VII -> V2)
    addGanglionNode([0.255, -0.475, 0.335], 0.020);
    addTaggedTube(
      paraGrp,
      [
        new THREE.Vector3(side * 0.26, -0.59, -0.075),
        new THREE.Vector3(side * 0.23, -0.52, 0.11),
        new THREE.Vector3(side * 0.255, -0.475, 0.335),
      ],
      0.0055,
      0.0048,
      paraMat,
      'nerve-parasympathetic-ganglia',
      18,
      6,
    );

    // 3. Otic Ganglion + Lesser Petrosal Nerve (CN IX -> V3)
    addGanglionNode([0.285, -0.555, 0.20], 0.016);
    addTaggedTube(
      paraGrp,
      [
        new THREE.Vector3(side * 0.23, -0.70, -0.175),
        new THREE.Vector3(side * 0.275, -0.625, 0.02),
        new THREE.Vector3(side * 0.285, -0.555, 0.20),
      ],
      0.0048,
      0.0042,
      paraMat,
      'nerve-parasympathetic-ganglia',
      16,
      6,
    );

    // 4. Submandibular Ganglion + Chorda Tympani (CN VII -> lingual V3 branch)
    addGanglionNode([0.305, -0.605, 0.255], 0.015);
    addTaggedTube(
      paraGrp,
      [
        new THREE.Vector3(side * 0.33, -0.578, -0.03),
        new THREE.Vector3(side * 0.325, -0.595, 0.14),
        new THREE.Vector3(side * 0.305, -0.605, 0.255),
      ],
      0.0045,
      0.0038,
      paraMat,
      'nerve-parasympathetic-ganglia',
      14,
      6,
    );

    // --- NERVE SYSTEM 16: Trigeminovascular & Dural Meningeal Nerves ---
    const duralMat = nerveMats['nerve-meningeal-dural'];
    // Recurrent Tentorial Nerve of Arnold (V1 -> free edge of tentorium -> Straight & Transverse sinuses)
    addTaggedTube(
      duralGrp,
      [
        new THREE.Vector3(side * 0.245, -0.415, 0.165),
        new THREE.Vector3(side * 0.26, -0.29, -0.08),
        new THREE.Vector3(side * 0.24, -0.17, -0.38),
        new THREE.Vector3(side * 0.32, -0.15, -0.68),
        new THREE.Vector3(side * 0.44, -0.16, -0.84),
      ],
      0.0062,
      0.0036,
      duralMat,
      'nerve-meningeal-dural',
      26,
      7,
    );
    // Medial tentorial / straight sinus branch (Type 1 innervation per Lee 2017)
    addTaggedTube(
      duralGrp,
      [
        new THREE.Vector3(side * 0.24, -0.17, -0.38),
        new THREE.Vector3(side * 0.12, -0.09, -0.62),
        new THREE.Vector3(side * 0.035, -0.04, -0.88),
      ],
      0.0046,
      0.0028,
      duralMat,
      'nerve-meningeal-dural',
      16,
      6,
    );
    // Middle cranial fossa meningeal plexus (V2/V3 Nervus Spinosus ascending over lateral dura)
    addTaggedTube(
      duralGrp,
      [
        new THREE.Vector3(side * 0.27, -0.455, 0.175),
        new THREE.Vector3(side * 0.50, -0.36, 0.16),
        new THREE.Vector3(side * 0.72, -0.14, 0.08),
        new THREE.Vector3(side * 0.68, 0.28, -0.05),
      ],
      0.0055,
      0.0030,
      duralMat,
      'nerve-meningeal-dural',
      20,
      6,
    );
  }

  group.add(forebrainNerves, brainstemNerves);
  return { group, forebrainNerves, brainstemNerves, nerveRegionGroups };
}

export function buildBrainAssembly(): BrainAssembly {
  const root = new THREE.Group();
  root.name = 'HumanBrainAssembly';

  const cortexUniforms: CortexUniforms = {
    uFinishMode: { value: 0 },
    uGlassMode: { value: 0 },
    uHighlightLobe: { value: -1 },
    uHoverLobe: { value: -1 },
    uLobeKnowledge: { value: new THREE.Vector4(0.8, 0.8, 0.8, 0.8) },
    uLobeTemp: { value: new THREE.Vector4(0.25, 0.25, 0.3, 0.25) },
    uPrimaryFold: { value: 1 },
    uSecondaryFold: { value: 1 },
    uTertiaryFold: { value: 1 },
    uSulcalWidening: { value: 0 },
    uTime: { value: 0 },
  };

  const makeSubUniform = (): SubcorticalUniforms => ({
    uHighlighted: { value: 0 },
    uHovered: { value: 0 },
    uEpistemicTint: { value: new THREE.Color('#2e9e75') },
    uEpistemicBlend: { value: 0 },
  });

  const subcorticalUniforms: Record<string, SubcorticalUniforms> = {
    cerebellum: makeSubUniform(),
    brainstem: makeSubUniform(),
    'corpus-callosum': makeSubUniform(),
    thalamus: makeSubUniform(),
    hypothalamus: makeSubUniform(),
    hippocampus: makeSubUniform(),
    'vessel-circle-of-willis': makeSubUniform(),
    'vessel-aca': makeSubUniform(),
    'vessel-mca': makeSubUniform(),
    'vessel-pca': makeSubUniform(),
    'vessel-vertebrobasilar': makeSubUniform(),
    'vessel-venous-sinuses': makeSubUniform(),
    'vessel-cortical-veins': makeSubUniform(),
    'cn-i-olfactory': makeSubUniform(),
    'cn-ii-optic': makeSubUniform(),
    'cn-iii-oculomotor': makeSubUniform(),
    'cn-iv-trochlear': makeSubUniform(),
    'cn-v-trigeminal': makeSubUniform(),
    'cn-vi-abducens': makeSubUniform(),
    'cn-vii-facial': makeSubUniform(),
    'cn-viii-vestibulocochlear': makeSubUniform(),
    'cn-ix-glossopharyngeal': makeSubUniform(),
    'cn-x-vagus': makeSubUniform(),
    'cn-xi-accessory': makeSubUniform(),
    'cn-xii-hypoglossal': makeSubUniform(),
    'nerve-cervical-spinal': makeSubUniform(),
    'nerve-sympathetic-carotid': makeSubUniform(),
    'nerve-parasympathetic-ganglia': makeSubUniform(),
    'nerve-meningeal-dural': makeSubUniform(),
  };

  const cortexMaterial = createCortexMaterial(cortexUniforms);
  const cerebellumMat = createCerebellumMaterial(cortexUniforms, subcorticalUniforms.cerebellum);
  const brainstemMat = createWhiteMatterMaterial('#ded0be', 'transverse', subcorticalUniforms.brainstem);
  const spinalCordMat = createWhiteMatterMaterial(
    '#e4d6c4',
    'longitudinal',
    subcorticalUniforms['nerve-cervical-spinal'],
  );
  const callosumMat = createWhiteMatterMaterial('#e8dac7', 'longitudinal', subcorticalUniforms['corpus-callosum']);
  const thalamusMat = createSubcorticalMaterial('#be857c', subcorticalUniforms.thalamus, 0.44);
  const hypoMat = createSubcorticalMaterial('#cf756e', subcorticalUniforms.hypothalamus, 0.42);
  const hippoMat = createSubcorticalMaterial('#d4a668', subcorticalUniforms.hippocampus, 0.44);
  const fornixMat = createSubcorticalMaterial('#e6d8c5', subcorticalUniforms.hippocampus, 0.38);

  const vesselMats: Record<string, THREE.Material> = {
    'vessel-circle-of-willis': createVesselMaterial('#b81f28', 'artery', subcorticalUniforms['vessel-circle-of-willis']),
    'vessel-aca': createVesselMaterial('#bd252e', 'artery', subcorticalUniforms['vessel-aca']),
    'vessel-mca': createVesselMaterial('#aa1d25', 'artery', subcorticalUniforms['vessel-mca']),
    'vessel-pca': createVesselMaterial('#9d1c23', 'artery', subcorticalUniforms['vessel-pca']),
    'vessel-vertebrobasilar': createVesselMaterial('#931920', 'artery', subcorticalUniforms['vessel-vertebrobasilar']),
    'vessel-venous-sinuses': createVesselMaterial('#372e66', 'sinus', subcorticalUniforms['vessel-venous-sinuses']),
    'vessel-cortical-veins': createVesselMaterial('#432761', 'vein', subcorticalUniforms['vessel-cortical-veins']),
  };

  const nerveMats: Record<string, THREE.Material> = {
    'cn-i-olfactory': createNerveMaterial('#e7d5a6', subcorticalUniforms['cn-i-olfactory']),
    'cn-ii-optic': createNerveMaterial('#efe2be', subcorticalUniforms['cn-ii-optic']),
    'cn-iii-oculomotor': createNerveMaterial('#ead9ae', subcorticalUniforms['cn-iii-oculomotor']),
    'cn-iv-trochlear': createNerveMaterial('#e2d2aa', subcorticalUniforms['cn-iv-trochlear']),
    'cn-v-trigeminal': createNerveMaterial('#f2e3bc', subcorticalUniforms['cn-v-trigeminal']),
    'cn-vi-abducens': createNerveMaterial('#e6d6ab', subcorticalUniforms['cn-vi-abducens']),
    'cn-vii-facial': createNerveMaterial('#ebdbb1', subcorticalUniforms['cn-vii-facial']),
    'cn-viii-vestibulocochlear': createNerveMaterial('#f1e2ba', subcorticalUniforms['cn-viii-vestibulocochlear']),
    'cn-ix-glossopharyngeal': createNerveMaterial('#e2d1a6', subcorticalUniforms['cn-ix-glossopharyngeal']),
    'cn-x-vagus': createNerveMaterial('#eeddb1', subcorticalUniforms['cn-x-vagus']),
    'cn-xi-accessory': createNerveMaterial('#e0d0a5', subcorticalUniforms['cn-xi-accessory']),
    'cn-xii-hypoglossal': createNerveMaterial('#eddcb2', subcorticalUniforms['cn-xii-hypoglossal']),
    'nerve-cervical-spinal': createNerveMaterial('#f3d9a4', subcorticalUniforms['nerve-cervical-spinal']),
    'nerve-sympathetic-carotid': createNerveMaterial('#eab676', subcorticalUniforms['nerve-sympathetic-carotid']),
    'nerve-parasympathetic-ganglia': createNerveMaterial('#a6d9c5', subcorticalUniforms['nerve-parasympathetic-ganglia']),
    'nerve-meningeal-dural': createNerveMaterial('#f0b89e', subcorticalUniforms['nerve-meningeal-dural']),
  };

  // 1. Left & Right Cerebral Hemispheres
  const leftGeom = buildHemisphereGeometry(-1);
  const rightGeom = buildHemisphereGeometry(1);

  const leftHemisphere = new THREE.Mesh(leftGeom, cortexMaterial);
  leftHemisphere.castShadow = true;
  leftHemisphere.receiveShadow = true;
  leftHemisphere.name = 'leftHemisphere';
  tagRegion(leftHemisphere, 'cerebral-cortex');

  const rightHemisphere = new THREE.Mesh(rightGeom, cortexMaterial);
  rightHemisphere.castShadow = true;
  rightHemisphere.receiveShadow = true;
  rightHemisphere.name = 'rightHemisphere';
  tagRegion(rightHemisphere, 'cerebral-cortex');

  // 2. Cerebellum
  const cerebellumGeom = buildCerebellumGeometry();
  const cerebellum = new THREE.Mesh(cerebellumGeom, cerebellumMat);
  cerebellum.position.set(0, -0.41, -0.52);
  cerebellum.rotation.x = 0.14;
  cerebellum.castShadow = true;
  cerebellum.receiveShadow = true;
  cerebellum.name = 'cerebellum';
  tagRegion(cerebellum, 'cerebellum');

  // 3. Brainstem
  const brainstemGeom = buildBrainstemGeometry();
  const brainstem = new THREE.Mesh(brainstemGeom, brainstemMat);
  brainstem.castShadow = true;
  brainstem.receiveShadow = true;
  brainstem.name = 'brainstem';
  tagRegion(brainstem, 'brainstem');

  // 4. Corpus Callosum
  const callosumGeom = buildCorpusCallosumGeometry();
  const corpusCallosum = new THREE.Mesh(callosumGeom, callosumMat);
  corpusCallosum.castShadow = true;
  corpusCallosum.receiveShadow = true;
  corpusCallosum.name = 'corpusCallosum';
  tagRegion(corpusCallosum, 'corpus-callosum');

  // 5. Thalamus
  const thalamus = buildThalamusGroup(thalamusMat);
  thalamus.name = 'thalamus';
  tagRegion(thalamus, 'thalamus');

  // 6. Hypothalamus & Pituitary
  const hypothalamus = buildHypothalamusGroup(hypoMat);
  hypothalamus.name = 'hypothalamus';
  tagRegion(hypothalamus, 'hypothalamus');

  // 7. Hippocampus, Amygdala & Fornix
  const hippocampus = buildHippocampusGroup(hippoMat, fornixMat);
  hippocampus.name = 'hippocampus';
  tagRegion(hippocampus, 'hippocampus');

  // 8. Ventricular System
  const ventricles = buildVentriclesGroup();
  ventricles.name = 'ventricles';
  ventricles.visible = false;
  tagRegion(ventricles, 'ventricles');

  // 9. Named Arterial & Venous Cerebral Vasculature (children individually tagged per vessel-*)
  const {
    group: vasculature,
    leftCorticalVessels,
    rightCorticalVessels,
    brainstemVessels,
    sinusVessels,
  } = buildVasculatureGroup(vesselMats);
  vasculature.name = 'vasculature';

  // 10. Complete Cranial, Cervical Spinal, Autonomic & Meningeal Nerves
  const {
    group: cranialNerves,
    forebrainNerves,
    brainstemNerves,
    nerveRegionGroups,
  } = buildCranialNervesGroup(nerveMats, spinalCordMat);
  cranialNerves.name = 'cranialNerves';

  // 11. Continuous Whole-Body Nervous System (Thoracic/Lumbosacral Cord, Plexuses, Limb, Autonomic & Enteric)
  const wholeBodyBuild = buildWholeBodyNervousSystem();
  const wholeBodyNerves = wholeBodyBuild.group;
  for (const [id, grp] of wholeBodyBuild.nerveRegionGroups.entries()) {
    nerveRegionGroups.set(id, grp);
  }
  Object.assign(subcorticalUniforms, wholeBodyBuild.subcorticalUniforms);

  root.add(
    leftHemisphere,
    rightHemisphere,
    cerebellum,
    brainstem,
    corpusCallosum,
    thalamus,
    hypothalamus,
    hippocampus,
    ventricles,
    vasculature,
    cranialNerves,
    wholeBodyNerves,
  );

  // Shift whole assembly upward so brain + cervical cord float comfortably above bottom control dock
  root.position.y = 0.24;

  const partBasePositions = new Map<THREE.Object3D, THREE.Vector3>([
    [leftHemisphere, leftHemisphere.position.clone()],
    [rightHemisphere, rightHemisphere.position.clone()],
    [cerebellum, cerebellum.position.clone()],
    [brainstem, brainstem.position.clone()],
    [corpusCallosum, corpusCallosum.position.clone()],
    [thalamus, thalamus.position.clone()],
    [hypothalamus, hypothalamus.position.clone()],
    [hippocampus, hippocampus.position.clone()],
    [ventricles, ventricles.position.clone()],
    [vasculature, vasculature.position.clone()],
    [leftCorticalVessels, leftCorticalVessels.position.clone()],
    [rightCorticalVessels, rightCorticalVessels.position.clone()],
    [brainstemVessels, brainstemVessels.position.clone()],
    [sinusVessels, sinusVessels.position.clone()],
    [cranialNerves, cranialNerves.position.clone()],
    [forebrainNerves, forebrainNerves.position.clone()],
    [brainstemNerves, brainstemNerves.position.clone()],
    [wholeBodyNerves, wholeBodyNerves.position.clone()],
  ]);

  const interactables: THREE.Object3D[] = [
    vasculature,
    cranialNerves,
    wholeBodyNerves,
    leftHemisphere,
    rightHemisphere,
    cerebellum,
    brainstem,
    corpusCallosum,
    thalamus,
    hypothalamus,
    hippocampus,
    ventricles,
  ];

  const dispose = () => {
    root.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh || (obj as THREE.Line).isLine) {
        const renderable = obj as THREE.Mesh | THREE.Line;
        renderable.geometry.dispose();
        if (Array.isArray(renderable.material)) {
          renderable.material.forEach((m) => m.dispose());
        } else {
          renderable.material.dispose();
        }
      }
    });
  };

  return {
    root,
    parts: {
      leftHemisphere,
      rightHemisphere,
      cerebellum,
      brainstem,
      corpusCallosum,
      thalamus,
      hypothalamus,
      hippocampus,
      ventricles,
      vasculature,
      leftCorticalVessels,
      rightCorticalVessels,
      brainstemVessels,
      sinusVessels,
      cranialNerves,
      forebrainNerves,
      brainstemNerves,
      wholeBodyNerves,
    },
    nerveRegionGroups,
    interactables,
    cortexMaterial,
    cortexUniforms,
    subcorticalUniforms,
    partBasePositions,
    dispose,
  };
}
