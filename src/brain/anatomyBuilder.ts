import * as THREE from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { RegionId } from '../data/neuroanatomy';
import { clamp, evaluateCorticalVertex, fbm3D, lerp, smoothstep } from './math3d';
import {
  createCerebellumMaterial,
  createCortexMaterial,
  createSubcorticalMaterial,
  createWhiteMatterMaterial,
  type CortexUniforms,
  type SubcorticalUniforms,
} from './materials';

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
  };
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

  for (let i = 0; i < count; i++) {
    const nx = posAttr.getX(i);
    const ny = posAttr.getY(i);
    const nz = posAttr.getZ(i);
    const v = evaluateCorticalVertex(nx, ny, nz, side);
    posAttr.setXYZ(i, v.x, v.y, v.z);
    gyrusArr[i] = v.gyrusHeight;
    lobeArr[i] = v.lobe;
    sulcusArr[i] = v.primarySulcus;
  }

  // Light Laplacian relax (position only) to keep triangle normals smooth while preserving crisp sulcal crevices
  const index = geom.getIndex();
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

  geom.setAttribute('aGyrus', new THREE.BufferAttribute(gyrusArr, 1));
  geom.setAttribute('aLobe', new THREE.BufferAttribute(lobeArr, 1));
  geom.setAttribute('aPrimarySulcus', new THREE.BufferAttribute(sulcusArr, 1));
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

function buildHypothalamusGroup(mat: THREE.Material, opticMat: THREE.Material): THREE.Group {
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

  // Optic Chiasm & Nerves/Tracts
  for (const side of [-1, 1] as const) {
    const opticCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.14, -0.22, 0.36), // Optic nerve
      new THREE.Vector3(side * 0.025, -0.20, 0.23), // Chiasm crossing
      new THREE.Vector3(side * 0.16, -0.11, 0.02), // Optic tract wrapping toward LGN
    ]);
    const opticGeom = new THREE.TubeGeometry(opticCurve, 20, 0.017, 10, false);
    group.add(new THREE.Mesh(opticGeom, opticMat));
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

function buildVasculatureGroup(): {
  group: THREE.Group;
  leftCorticalVessels: THREE.Group;
  rightCorticalVessels: THREE.Group;
} {
  const group = new THREE.Group();
  const leftCorticalVessels = new THREE.Group();
  const rightCorticalVessels = new THREE.Group();
  leftCorticalVessels.name = 'leftCorticalVessels';
  rightCorticalVessels.name = 'rightCorticalVessels';

  const arteryMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#8e1d23'),
    roughness: 0.30,
    metalness: 0.0,
    clearcoat: 0.82,
    clearcoatRoughness: 0.16,
  });
  const veinMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#391d3e'),
    roughness: 0.36,
    metalness: 0.0,
    clearcoat: 0.72,
  });

  // Sample dense points cleanly on the outer arachnoid/pial envelope so vessels never turn dashed inside gyri
  const sampleCorticalVessel = (
    startDir: [number, number, number],
    endDir: [number, number, number],
    side: -1 | 1,
    steps: number,
    wiggleAmp = 0.026,
    offset = 0.0085,
  ): THREE.Vector3[] => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const nx = lerp(startDir[0], endDir[0], t) * side;
      const ny = lerp(startDir[1], endDir[1], t) + Math.sin(t * Math.PI * 3.0) * wiggleAmp;
      const nz = lerp(startDir[2], endDir[2], t) + Math.cos(t * Math.PI * 2.5) * wiggleAmp;
      const v = evaluateCorticalVertex(nx, ny, nz, side);
      const len = Math.hypot(v.x, v.y, v.z) || 1;
      // Extra outward cushion when crossing deep sulcal troughs keeps the continuous 3D tube unclipped
      const envelopeLift = offset + (1.0 - v.gyrusHeight) * 0.009;
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

  // Midline Basilar Artery ascending along the anterior pontine groove
  const basilar = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.78, -0.17),
    new THREE.Vector3(0, -0.54, -0.03),
    new THREE.Vector3(0, -0.31, 0.01),
  ]);
  group.add(new THREE.Mesh(new THREE.TubeGeometry(basilar, 20, 0.012, 8, false), arteryMat));

  for (const side of [-1, 1] as const) {
    const sideGroup = side === -1 ? leftCorticalVessels : rightCorticalVessels;

    // Circle of Willis & Posterior Cerebral Artery (PCA) curving cleanly around the midbrain peduncle
    const pca = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.31, 0.01),
      new THREE.Vector3(side * 0.11, -0.27, -0.03),
      new THREE.Vector3(side * 0.20, -0.22, -0.22),
      new THREE.Vector3(side * 0.15, -0.09, -0.56),
    ]);
    sideGroup.add(new THREE.Mesh(new THREE.TubeGeometry(pca, 24, 0.008, 8, false), arteryMat));

    // Pericallosal Anterior Cerebral Artery (ACA) arching gracefully outside the Rostrum, Genu & Body
    const aca = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.10, -0.25, 0.16),
      new THREE.Vector3(side * 0.03, -0.14, 0.29),
      new THREE.Vector3(side * 0.025, 0.02, 0.38),
      new THREE.Vector3(side * 0.025, 0.16, 0.51),
      new THREE.Vector3(side * 0.025, 0.33, 0.41),
      new THREE.Vector3(side * 0.025, 0.38, 0.05),
      new THREE.Vector3(side * 0.025, 0.33, -0.28),
    ]);
    sideGroup.add(new THREE.Mesh(new THREE.TubeGeometry(aca, 36, 0.0075, 8, false), arteryMat));

    // Middle Cerebral Artery (MCA) entering & coursing along the Sylvian fissure
    const mcaPts = [
      new THREE.Vector3(side * 0.10, -0.25, 0.16),
      new THREE.Vector3(side * 0.42, -0.19, 0.24),
      ...sampleCorticalVessel([0.84, -0.08, 0.36], [0.91, 0.25, -0.34], side, 40, 0.012, 0.0075),
    ];
    sideGroup.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(mcaPts), 64, 0.0062, 7, false),
        arteryMat,
      ),
    );

    // Ascending Frontal Cortical Artery (prefrontal opercular branch)
    const branch1Pts = sampleCorticalVessel([0.86, -0.01, 0.30], [0.28, 0.84, 0.40], side, 42, 0.028, 0.008);
    sideGroup.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(branch1Pts), 56, 0.0045, 6, false),
        arteryMat,
      ),
    );

    // Central Sulcus Cortical Vein draining toward superior sagittal sinus
    const branch2Pts = sampleCorticalVessel([0.94, 0.12, 0.05], [0.18, 0.94, -0.10], side, 42, 0.024, 0.008);
    sideGroup.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(branch2Pts), 56, 0.0048, 6, false),
        veinMat,
      ),
    );

    // Superior Anastomotic Vein (of Trolard) across parietal convexity
    const trolardPts = sampleCorticalVessel([0.92, 0.22, -0.22], [0.12, 0.95, -0.26], side, 42, 0.024, 0.008);
    sideGroup.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(trolardPts), 56, 0.0052, 6, false),
        veinMat,
      ),
    );
  }

  group.add(leftCorticalVessels, rightCorticalVessels);
  return { group, leftCorticalVessels, rightCorticalVessels };
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
  };

  const cortexMaterial = createCortexMaterial(cortexUniforms);
  const cerebellumMat = createCerebellumMaterial(cortexUniforms, subcorticalUniforms.cerebellum);
  const brainstemMat = createWhiteMatterMaterial('#ded0be', 'transverse', subcorticalUniforms.brainstem);
  const callosumMat = createWhiteMatterMaterial('#e8dac7', 'longitudinal', subcorticalUniforms['corpus-callosum']);
  const thalamusMat = createSubcorticalMaterial('#be857c', subcorticalUniforms.thalamus, 0.44);
  const hypoMat = createSubcorticalMaterial('#cf756e', subcorticalUniforms.hypothalamus, 0.42);
  const opticMat = createSubcorticalMaterial('#e8dac9', subcorticalUniforms.hypothalamus, 0.38);
  const hippoMat = createSubcorticalMaterial('#d4a668', subcorticalUniforms.hippocampus, 0.44);
  const fornixMat = createSubcorticalMaterial('#e6d8c5', subcorticalUniforms.hippocampus, 0.38);

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

  // 6. Hypothalamus, Optic Chiasm & Pituitary
  const hypothalamus = buildHypothalamusGroup(hypoMat, opticMat);
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

  // 9. Pial & Basal Vasculature
  const {
    group: vasculature,
    leftCorticalVessels,
    rightCorticalVessels,
  } = buildVasculatureGroup();
  vasculature.name = 'vasculature';
  tagRegion(vasculature, 'vasculature');

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
  );

  // Shift whole assembly upward so brain + medulla float comfortably above bottom control dock
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
  ]);

  const interactables: THREE.Object3D[] = [
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
  ];

  const dispose = () => {
    root.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material.dispose();
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
    },
    interactables,
    cortexMaterial,
    cortexUniforms,
    subcorticalUniforms,
    partBasePositions,
    dispose,
  };
}
