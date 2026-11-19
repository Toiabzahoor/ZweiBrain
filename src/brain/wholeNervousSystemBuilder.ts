import * as THREE from 'three';
import { BRAIN_REGIONS, type RegionId } from '../data/neuroanatomy';
import { createNerveMaterial, type SubcorticalUniforms } from './materials';

export interface WholeBodyNervousSystemBuild {
  group: THREE.Group;
  nerveRegionGroups: Map<RegionId, THREE.Group>;
  subcorticalUniforms: Record<string, SubcorticalUniforms>;
}

function addTube(
  parent: THREE.Group,
  points: [number, number, number][],
  radius: number,
  mat: THREE.Material,
  tubularSegments = 20,
  radialSegments = 7,
  taperEnd?: number,
): THREE.Mesh {
  const curve = new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
  const geom = new THREE.TubeGeometry(curve, tubularSegments, radius, radialSegments, false);
  if (taperEnd !== undefined) {
    const pos = geom.attributes.position;
    const rings = tubularSegments + 1;
    const vertsPerRing = radialSegments + 1;
    const center = new THREE.Vector3();
    for (let i = 0; i < rings; i++) {
      const t = i / tubularSegments;
      curve.getPointAt(t, center);
      const scale = 1 + (taperEnd - 1) * t;
      for (let j = 0; j < vertsPerRing; j++) {
        const idx = i * vertsPerRing + j;
        pos.setXYZ(
          idx,
          center.x + (pos.getX(idx) - center.x) * scale,
          center.y + (pos.getY(idx) - center.y) * scale,
          center.z + (pos.getZ(idx) - center.z) * scale,
        );
      }
    }
    pos.needsUpdate = true;
    geom.computeVertexNormals();
  }
  const mesh = new THREE.Mesh(geom, mat);
  parent.add(mesh);
  return mesh;
}

function addNode(
  parent: THREE.Group,
  pos: [number, number, number],
  sx: number,
  sy: number,
  sz: number,
  mat: THREE.Material,
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 8), mat);
  mesh.position.set(pos[0], pos[1], pos[2]);
  mesh.scale.set(sx, sy, sz);
  parent.add(mesh);
  return mesh;
}

function tagRegion(obj: THREE.Object3D, regionId: RegionId): void {
  obj.userData.regionId = regionId;
  obj.traverse((child) => {
    child.userData.regionId = regionId;
  });
}

/**
 * Builds the continuous 3D Whole Human Nervous System anchored directly beneath the
 * C1–C5 upper cervical spinal cord (`y ≈ -1.30, z ≈ -0.34`) in MNI152 atlas units
 * (1 unit = 70 mm, scaled cleanly to anatomical adult human proportions down to y ≈ -17.6).
 */
export function buildWholeBodyNervousSystem(): WholeBodyNervousSystemBuild {
  const root = new THREE.Group();
  root.name = 'wholeBodyNervousSystem';

  const nerveRegionGroups = new Map<RegionId, THREE.Group>();
  const subcorticalUniforms: Record<string, SubcorticalUniforms> = {};

  const makeRegion = (
    id: RegionId,
    hexColor: number,
    roughness = 0.44,
  ): { group: THREE.Group; mat: THREE.MeshPhysicalMaterial } => {
    const uniforms: SubcorticalUniforms = {
      uHighlighted: { value: 0 },
      uHovered: { value: 0 },
      uEpistemicTint: { value: new THREE.Color('#64748b') },
      uEpistemicBlend: { value: 0 },
    };
    const hexStr = `#${hexColor.toString(16).padStart(6, '0')}`;
    const mat = createNerveMaterial(hexStr, uniforms);
    mat.roughness = roughness;
    subcorticalUniforms[id] = uniforms;
    const grp = new THREE.Group();
    grp.name = id;
    const emb = BRAIN_REGIONS[id]?.embryology;
    grp.userData.emergenceGw = emb?.emergenceGw ?? 5.0;
    grp.userData.matureGw = emb?.matureGw ?? 8.5;
    nerveRegionGroups.set(id, grp);
    root.add(grp);
    return { group: grp, mat };
  };

  // Subtle translucent anatomical body silhouette guide (non-pickable) for immediate spatial grounding
  const silhouetteGroup = new THREE.Group();
  silhouetteGroup.name = 'bodySilhouetteGuide';
  const silMat = new THREE.LineBasicMaterial({
    color: 0x3b4d6b,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  });
  const addGuideLoop = (pts: [number, number, number][]) => {
    const curve = new THREE.CatmullRomCurve3(pts.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
    const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(36));
    const line = new THREE.Line(geo, silMat);
    silhouetteGroup.add(line);
  };
  for (const s of [-1, 1] as const) {
    // Neck -> Shoulder -> Lateral Torso -> Hip -> Outer Leg -> Ankle
    addGuideLoop([
      [s * 0.55, -1.2, -0.15],
      [s * 0.72, -1.9, -0.18],
      [s * 2.15, -2.35, -0.15],
      [s * 2.35, -3.4, -0.12],
      [s * 1.95, -5.8, -0.10],
      [s * 1.72, -7.2, -0.12],
      [s * 1.98, -8.8, -0.10],
      [s * 1.85, -12.6, -0.10],
      [s * 1.52, -16.8, -0.05],
    ]);
    // Outer Arm contour
    addGuideLoop([
      [s * 2.15, -2.35, -0.15],
      [s * 2.85, -3.5, -0.12],
      [s * 3.48, -5.8, -0.05],
      [s * 4.05, -8.3, 0.08],
      [s * 4.35, -9.4, 0.14],
    ]);
    // Inner Leg contour
    addGuideLoop([
      [s * 0.12, -9.5, -0.08],
      [s * 0.68, -12.8, -0.08],
      [s * 0.85, -16.8, -0.02],
    ]);
  }
  root.add(silhouetteGroup);

  // 1. Thoracic Spinal Cord (T1–T12): y = -1.30 down to -5.90 (gentle thoracic kyphosis)
  const { group: thoracicCordGrp, mat: thoracicCordMat } = makeRegion('spinal-cord-thoracic', 0xedd6ae, 0.40);
  addTube(
    thoracicCordGrp,
    [
      [0, -1.28, -0.34],
      [0, -2.20, -0.44],
      [0, -3.50, -0.56],
      [0, -4.80, -0.52],
      [0, -5.95, -0.42],
    ],
    0.105,
    thoracicCordMat,
    28,
    12,
    0.92,
  );
  // Segmental T1–T12 dorsal root ganglia & short rootlets
  for (let i = 0; i < 12; i++) {
    const ty = -1.60 - i * 0.38;
    const tz = -0.38 - Math.sin((i / 11) * Math.PI) * 0.17;
    for (const s of [-1, 1] as const) {
      addTube(
        thoracicCordGrp,
        [
          [s * 0.08, ty + 0.05, tz],
          [s * 0.24, ty - 0.04, tz + 0.03],
        ],
        0.024,
        thoracicCordMat,
        6,
        6,
      );
      addNode(thoracicCordGrp, [s * 0.26, ty - 0.05, tz + 0.03], 0.042, 0.030, 0.032, thoracicCordMat);
    }
  }
  tagRegion(thoracicCordGrp, 'spinal-cord-thoracic');

  // 2. Lumbosacral Enlargement & Conus Medullaris (L1–Co1): y = -5.95 down to -7.65
  const { group: lumbosacralGrp, mat: lumbosacralMat } = makeRegion('spinal-cord-lumbosacral', 0xebd09e, 0.40);
  addTube(
    lumbosacralGrp,
    [
      [0, -5.90, -0.42],
      [0, -6.45, -0.36],
      [0, -6.95, -0.32],
    ],
    0.125,
    lumbosacralMat,
    16,
    12,
    1.05,
  );
  // Conus Medullaris taper at L1–L2
  addTube(
    lumbosacralGrp,
    [
      [0, -6.92, -0.32],
      [0, -7.35, -0.32],
      [0, -7.75, -0.34],
    ],
    0.125,
    lumbosacralMat,
    14,
    12,
    0.16,
  );
  tagRegion(lumbosacralGrp, 'spinal-cord-lumbosacral');

  // 3. Cauda Equina & Filum Terminale (L2–Co1): y = -7.30 down to -9.60
  const { group: caudaGrp, mat: caudaMat } = makeRegion('nerve-cauda-equina', 0xf4e3bd, 0.44);
  // Central filum terminale
  addTube(
    caudaGrp,
    [
      [0, -7.72, -0.34],
      [0, -8.65, -0.40],
      [0, -9.60, -0.48],
    ],
    0.018,
    caudaMat,
    12,
    6,
    0.65,
  );
  // Fanning intrathecal L2–S5 nerve rootlets
  for (const s of [-1, 1] as const) {
    for (let r = 0; r < 7; r++) {
      const spread = 0.04 + r * 0.032;
      const endY = -7.85 - r * 0.24;
      addTube(
        caudaGrp,
        [
          [s * (0.04 + r * 0.008), -7.15 - r * 0.07, -0.32],
          [s * (spread * 0.65), -7.55 - r * 0.14, -0.34 - r * 0.012],
          [s * spread, endY, -0.36 - r * 0.015],
        ],
        0.020,
        caudaMat,
        12,
        6,
        0.8,
      );
      addNode(caudaGrp, [s * (spread + 0.04), endY - 0.04, -0.36 - r * 0.015], 0.038, 0.028, 0.028, caudaMat);
    }
  }
  tagRegion(caudaGrp, 'nerve-cauda-equina');

  // 4. Phrenic Nerve (C3–C5 descending anteriorly through mediastinum to diaphragm at y ≈ -5.2)
  const { group: phrenicGrp, mat: phrenicMat } = makeRegion('nerve-phrenic', 0xf2dba6, 0.45);
  for (const s of [-1, 1] as const) {
    // C3, C4, C5 root convergence
    addTube(
      phrenicGrp,
      [
        [s * 0.24, -1.06, -0.30],
        [s * 0.46, -1.52, -0.10],
        [s * 0.48, -2.50, 0.16],
        [s * 0.56, -3.90, 0.24],
        [s * 0.64, -5.08, 0.14],
      ],
      0.022,
      phrenicMat,
      20,
      7,
      0.75,
    );
    // Diaphragmatic arborization
    addTube(
      phrenicGrp,
      [
        [s * 0.64, -5.08, 0.14],
        [s * 1.05, -5.26, 0.05],
        [s * 1.42, -5.38, -0.05],
      ],
      0.016,
      phrenicMat,
      10,
      6,
      0.55,
    );
    addTube(
      phrenicGrp,
      [
        [s * 0.64, -5.08, 0.14],
        [s * 0.42, -5.20, 0.34],
        [s * 0.18, -5.25, 0.42],
      ],
      0.015,
      phrenicMat,
      8,
      6,
      0.5,
    );
  }
  tagRegion(phrenicGrp, 'nerve-phrenic');

  // 5. Brachial Plexus (C5–T1 Roots -> Trunks -> Divisions -> Cords into Axilla)
  const { group: bpGrp, mat: bpMat } = makeRegion('nerve-brachial-plexus', 0xf4dc9c, 0.42);
  for (const s of [-1, 1] as const) {
    const rootYs = [-1.25, -1.42, -1.58, -1.76, -1.94];
    // 5 roots converging into 3 trunks
    rootYs.forEach((ry, idx) => {
      const trunkY = idx <= 1 ? -1.80 : idx === 2 ? -2.02 : -2.22;
      addTube(
        bpGrp,
        [
          [s * 0.24, ry, -0.34],
          [s * 0.68, (ry + trunkY) * 0.5, -0.26],
          [s * 1.15, trunkY, -0.18],
        ],
        0.028,
        bpMat,
        10,
        6,
      );
    });
    // 3 trunks -> 3 cords (Lateral, Posterior, Medial)
    const trunkYs = [-1.80, -2.02, -2.22];
    const cordYs = [-2.22, -2.42, -2.62];
    trunkYs.forEach((ty, i) => {
      addTube(
        bpGrp,
        [
          [s * 1.15, ty, -0.18],
          [s * 1.62, (ty + cordYs[i]) * 0.5, -0.14],
          [s * 2.08, cordYs[i], -0.12],
        ],
        0.032,
        bpMat,
        10,
        7,
      );
      // Cross-divisions creating authentic plexus lattice
      if (i < 2) {
        addTube(
          bpGrp,
          [
            [s * 1.35, ty, -0.17],
            [s * 1.82, cordYs[i + 1], -0.13],
          ],
          0.021,
          bpMat,
          8,
          6,
        );
      }
      if (i > 0) {
        addTube(
          bpGrp,
          [
            [s * 1.35, ty, -0.17],
            [s * 1.82, cordYs[i - 1], -0.13],
          ],
          0.021,
          bpMat,
          8,
          6,
        );
      }
    });
  }
  tagRegion(bpGrp, 'nerve-brachial-plexus');

  // 6. Axillary Nerve (C5–C6 wrapping around humeral surgical neck)
  const { group: axGrp, mat: axMat } = makeRegion('nerve-axillary', 0xebd093, 0.45);
  for (const s of [-1, 1] as const) {
    addTube(
      axGrp,
      [
        [s * 2.08, -2.42, -0.14],
        [s * 2.48, -2.62, -0.26],
        [s * 2.74, -2.92, -0.18],
        [s * 2.66, -3.12, 0.04],
      ],
      0.025,
      axMat,
      14,
      7,
      0.65,
    );
  }
  tagRegion(axGrp, 'nerve-axillary');

  // 7. Musculocutaneous Nerve (C5–C7 lateral cord -> anterior arm -> lateral forearm cutaneous)
  const { group: mcGrp, mat: mcMat } = makeRegion('nerve-musculocutaneous', 0xead49d, 0.45);
  for (const s of [-1, 1] as const) {
    addTube(
      mcGrp,
      [
        [s * 2.08, -2.22, -0.10],
        [s * 2.52, -3.05, 0.06],
        [s * 2.92, -4.35, 0.14],
        [s * 3.30, -5.65, 0.14],
        [s * 3.75, -7.25, 0.18],
      ],
      0.024,
      mcMat,
      18,
      7,
      0.55,
    );
  }
  tagRegion(mcGrp, 'nerve-musculocutaneous');

  // 8. Radial Nerve (C5–T1 posterior cord -> spiral groove -> lateral forearm -> dorsal hand)
  const { group: radGrp, mat: radMat } = makeRegion('nerve-radial', 0xf5dc96, 0.42);
  for (const s of [-1, 1] as const) {
    addTube(
      radGrp,
      [
        [s * 2.08, -2.42, -0.16],
        [s * 2.58, -3.55, -0.32],
        [s * 3.08, -4.85, -0.24],
        [s * 3.45, -5.95, -0.05],
        [s * 3.85, -7.50, 0.02],
        [s * 4.18, -8.85, 0.08],
      ],
      0.032,
      radMat,
      24,
      8,
      0.50,
    );
    // Posterior interosseous branch
    addTube(
      radGrp,
      [
        [s * 3.45, -5.95, -0.05],
        [s * 3.72, -6.95, -0.16],
        [s * 3.98, -8.15, -0.12],
      ],
      0.020,
      radMat,
      12,
      6,
      0.5,
    );
  }
  tagRegion(radGrp, 'nerve-radial');

  // 9. Median Nerve (C6–T1 M-union -> anterior arm/forearm -> carpal tunnel -> palmar digits 1–3)
  const { group: medGrp, mat: medMat } = makeRegion('nerve-median', 0xf7e4a8, 0.42);
  for (const s of [-1, 1] as const) {
    // Medial/lateral cord roots forming M
    addTube(
      medGrp,
      [
        [s * 2.08, -2.22, -0.10],
        [s * 2.34, -2.72, 0.02],
      ],
      0.024,
      medMat,
      6,
      6,
    );
    addTube(
      medGrp,
      [
        [s * 2.08, -2.62, -0.10],
        [s * 2.34, -2.72, 0.02],
      ],
      0.024,
      medMat,
      6,
      6,
    );
    // Main trunk to carpal tunnel
    addTube(
      medGrp,
      [
        [s * 2.34, -2.72, 0.02],
        [s * 2.75, -4.35, 0.06],
        [s * 3.18, -5.85, 0.08],
        [s * 3.60, -7.45, 0.14],
        [s * 3.92, -8.68, 0.18],
      ],
      0.031,
      medMat,
      22,
      8,
      0.72,
    );
    // Palmar digital branches (thumb, index, middle)
    for (let d = 0; d < 3; d++) {
      addTube(
        medGrp,
        [
          [s * 3.92, -8.68, 0.18],
          [s * (4.06 + d * 0.08), -9.15, 0.24 - d * 0.04],
          [s * (4.14 + d * 0.10), -9.62 + (d === 0 ? 0.18 : 0), 0.28 - d * 0.05],
        ],
        0.015,
        medMat,
        8,
        6,
        0.55,
      );
    }
  }
  tagRegion(medGrp, 'nerve-median');

  // 10. Ulnar Nerve (C8–T1 medial arm -> cubital tunnel -> medial forearm -> Guyon canal -> digits 4–5)
  const { group: ulnGrp, mat: ulnMat } = makeRegion('nerve-ulnar', 0xebd7a0, 0.42);
  for (const s of [-1, 1] as const) {
    addTube(
      ulnGrp,
      [
        [s * 2.08, -2.62, -0.12],
        [s * 2.48, -4.35, -0.12],
        [s * 2.90, -5.92, -0.14],
        [s * 3.38, -7.48, 0.00],
        [s * 3.74, -8.70, 0.10],
      ],
      0.029,
      ulnMat,
      22,
      8,
      0.68,
    );
    // Digits 4 & 5 + deep palmar arch
    for (let d = 0; d < 2; d++) {
      addTube(
        ulnGrp,
        [
          [s * 3.74, -8.70, 0.10],
          [s * (3.76 + d * 0.12), -9.20, 0.11],
          [s * (3.74 + d * 0.16), -9.58, 0.12],
        ],
        0.014,
        ulnMat,
        8,
        6,
        0.55,
      );
    }
  }
  tagRegion(ulnGrp, 'nerve-ulnar');

  // 11. Thoracic Intercostal & Subcostal Nerves (T1–T12 wrapping ribcage)
  const { group: icGrp, mat: icMat } = makeRegion('nerve-intercostal', 0xe9cf9c, 0.46);
  for (let i = 0; i < 12; i++) {
    const ty = -1.68 - i * 0.38;
    const tz = -0.38 - Math.sin((i / 11) * Math.PI) * 0.16;
    const ribWidth = 1.25 + Math.sin((i / 11) * Math.PI * 0.92) * 0.68;
    const frontZ = i < 7 ? 0.62 : 0.46 - (i - 7) * 0.04;
    const drop = i < 7 ? 0.24 : 0.44 + (i - 7) * 0.06;
    for (const s of [-1, 1] as const) {
      addTube(
        icGrp,
        [
          [s * 0.28, ty, tz],
          [s * (ribWidth * 0.78), ty - drop * 0.30, tz + 0.14],
          [s * ribWidth, ty - drop * 0.62, 0.14],
          [s * (ribWidth * 0.56), ty - drop * 0.90, frontZ],
          [s * (i < 7 ? 0.22 : 0.36), ty - drop, frontZ + 0.06],
        ],
        0.018,
        icMat,
        14,
        6,
        0.65,
      );
    }
  }
  tagRegion(icGrp, 'nerve-intercostal');

  // 12. Lumbar Plexus (L1–L4: iliohypogastric, ilioinguinal, genitofemoral, lateral femoral cutaneous)
  const { group: lpGrp, mat: lpMat } = makeRegion('nerve-lumbar-plexus', 0xf2d99b, 0.43);
  for (const s of [-1, 1] as const) {
    // L1–L4 roots
    for (let i = 0; i < 4; i++) {
      const ly = -6.28 - i * 0.42;
      addTube(
        lpGrp,
        [
          [s * 0.16, ly, -0.34],
          [s * 0.64, ly - 0.36, -0.20],
          [s * 0.98, ly - 0.74, -0.06],
        ],
        0.029,
        lpMat,
        10,
        7,
      );
    }
    // Iliohypogastric / Ilioinguinal sweep over iliac crest
    addTube(
      lpGrp,
      [
        [s * 0.64, -6.64, -0.20],
        [s * 1.38, -7.25, 0.05],
        [s * 1.15, -8.10, 0.34],
        [s * 0.42, -8.52, 0.42],
      ],
      0.019,
      lpMat,
      12,
      6,
      0.6,
    );
    // Lateral femoral cutaneous nerve (L2–L3)
    addTube(
      lpGrp,
      [
        [s * 0.96, -7.35, -0.10],
        [s * 1.56, -8.45, 0.14],
        [s * 1.72, -10.50, 0.10],
      ],
      0.019,
      lpMat,
      12,
      6,
      0.55,
    );
  }
  tagRegion(lpGrp, 'nerve-lumbar-plexus');

  // 13. Femoral & Saphenous Nerve (L2–L4 anterior thigh -> quadriceps -> medial leg/ankle)
  const { group: femGrp, mat: femMat } = makeRegion('nerve-femoral', 0xf4de9e, 0.42);
  for (const s of [-1, 1] as const) {
    // Main femoral trunk -> saphenous continuation to medial ankle
    addTube(
      femGrp,
      [
        [s * 0.96, -7.65, -0.06],
        [s * 1.24, -8.72, 0.14],
        [s * 1.22, -10.45, 0.22],
        [s * 1.02, -12.60, 0.14],
        [s * 0.96, -14.80, 0.12],
        [s * 0.94, -16.85, 0.14],
      ],
      0.034,
      femMat,
      26,
      8,
      0.42,
    );
    // Quadriceps muscular fan in anterior thigh
    addTube(
      femGrp,
      [
        [s * 1.24, -8.92, 0.16],
        [s * 1.48, -10.30, 0.24],
        [s * 1.42, -11.75, 0.22],
      ],
      0.022,
      femMat,
      10,
      6,
      0.5,
    );
  }
  tagRegion(femGrp, 'nerve-femoral');

  // 14. Obturator Nerve (L2–L4 medial pelvic brim -> obturator canal -> medial thigh adductors)
  const { group: obtGrp, mat: obtMat } = makeRegion('nerve-obturator', 0xe5cb8d, 0.44);
  for (const s of [-1, 1] as const) {
    addTube(
      obtGrp,
      [
        [s * 0.72, -7.60, -0.14],
        [s * 0.68, -8.68, -0.02],
        [s * 0.62, -9.65, 0.08],
        [s * 0.72, -11.40, 0.06],
      ],
      0.024,
      obtMat,
      16,
      7,
      0.55,
    );
  }
  tagRegion(obtGrp, 'nerve-obturator');

  // 15. Sacral Plexus & Sciatic Nerve (L4–S3 largest nerve in body down posterior thigh to popliteal apex)
  const { group: sciGrp, mat: sciMat } = makeRegion('nerve-sciatic', 0xfae5a6, 0.40);
  for (const s of [-1, 1] as const) {
    // L4, L5, S1, S2, S3 sacral plexus convergence
    for (let i = 0; i < 5; i++) {
      const sy = -7.60 - i * 0.30;
      addTube(
        sciGrp,
        [
          [s * (0.28 + i * 0.02), sy, -0.36],
          [s * 0.84, -8.52 - i * 0.08, -0.32],
          [s * 1.18, -9.05, -0.26],
        ],
        0.028,
        sciMat,
        10,
        7,
      );
    }
    // Massive sciatic trunk down posterior thigh
    addTube(
      sciGrp,
      [
        [s * 1.18, -9.05, -0.26],
        [s * 1.32, -10.25, -0.28],
        [s * 1.28, -11.55, -0.24],
        [s * 1.22, -12.45, -0.20],
      ],
      0.056,
      sciMat,
      18,
      10,
      0.86,
    );
  }
  tagRegion(sciGrp, 'nerve-sciatic');

  // 16. Tibial & Plantar Nerves (Popliteal fossa -> posterior calf -> tarsal tunnel -> plantar foot)
  const { group: tibGrp, mat: tibMat } = makeRegion('nerve-tibial', 0xf3d997, 0.42);
  for (const s of [-1, 1] as const) {
    addTube(
      tibGrp,
      [
        [s * 1.22, -12.42, -0.20],
        [s * 1.18, -13.65, -0.20],
        [s * 1.14, -15.30, -0.18],
        [s * 1.06, -16.85, -0.12],
        [s * 1.08, -17.32, 0.28],
        [s * 1.12, -17.40, 0.62],
      ],
      0.036,
      tibMat,
      24,
      8,
      0.50,
    );
  }
  tagRegion(tibGrp, 'nerve-tibial');

  // 17. Common Fibular (Peroneal) & Sural Nerves (Fibular head -> anterior/lateral leg -> dorsum of foot)
  const { group: fibGrp, mat: fibMat } = makeRegion('nerve-fibular-sural', 0xe8d094, 0.43);
  for (const s of [-1, 1] as const) {
    // Common -> Deep Fibular to dorsum of foot
    addTube(
      fibGrp,
      [
        [s * 1.22, -12.42, -0.20],
        [s * 1.54, -13.28, -0.06],
        [s * 1.46, -14.85, 0.08],
        [s * 1.26, -16.72, 0.16],
        [s * 1.24, -17.20, 0.56],
      ],
      0.030,
      fibMat,
      22,
      8,
      0.50,
    );
    // Superficial fibular lateral branch
    addTube(
      fibGrp,
      [
        [s * 1.54, -13.28, -0.06],
        [s * 1.62, -14.95, -0.02],
        [s * 1.42, -16.82, 0.14],
        [s * 1.42, -17.16, 0.46],
      ],
      0.020,
      fibMat,
      16,
      6,
      0.5,
    );
    // Sural cutaneous nerve descending posterior-lateral calf
    addTube(
      fibGrp,
      [
        [s * 1.28, -12.75, -0.22],
        [s * 1.38, -14.65, -0.28],
        [s * 1.36, -16.88, -0.10],
        [s * 1.44, -17.28, 0.26],
      ],
      0.017,
      fibMat,
      16,
      6,
      0.6,
    );
  }
  tagRegion(fibGrp, 'nerve-fibular-sural');

  // 18. Pudendal Nerve (S2–S4 looping around ischial spine through Alcock canal)
  const { group: pudGrp, mat: pudMat } = makeRegion('nerve-pudendal', 0xe3c48e, 0.45);
  for (const s of [-1, 1] as const) {
    addTube(
      pudGrp,
      [
        [s * 0.34, -8.55, -0.38],
        [s * 0.78, -9.10, -0.34],
        [s * 0.64, -9.52, -0.14],
        [s * 0.24, -9.62, 0.14],
      ],
      0.021,
      pudMat,
      14,
      7,
      0.6,
    );
  }
  tagRegion(pudGrp, 'nerve-pudendal');

  // 19. Paravertebral Sympathetic Trunk & Splanchnic Nerves (C1–Co1 + Celiac/SMA/IMA Ganglia)
  const { group: symGrp, mat: symMat } = makeRegion('nerve-sympathetic-chain', 0xed9e5b, 0.42);
  for (const s of [-1, 1] as const) {
    // Full bilateral paravertebral sympathetic chain from cervical SCG to Ganglion Impar
    addTube(
      symGrp,
      [
        [s * 0.34, -1.15, -0.18],
        [s * 0.38, -2.20, -0.26],
        [s * 0.40, -4.00, -0.36],
        [s * 0.36, -6.20, -0.24],
        [s * 0.28, -8.20, -0.24],
        [s * 0.06, -9.45, -0.36],
      ],
      0.022,
      symMat,
      32,
      7,
    );
    // 18 segmental paravertebral "pearls-on-a-string" ganglia (Stellate + T1–T12 + L1–L4 + Sacral)
    for (let g = 0; g < 18; g++) {
      const gy = -1.55 - g * 0.44;
      const gz = -0.22 - Math.sin((g / 17) * Math.PI) * 0.13;
      const gx = s * (g < 14 ? 0.38 : 0.38 - (g - 13) * 0.06);
      const isStellate = g === 1;
      addNode(
        symGrp,
        [gx, gy, gz],
        isStellate ? 0.056 : 0.036,
        isStellate ? 0.078 : 0.048,
        isStellate ? 0.042 : 0.034,
        symMat,
      );
    }
    // Greater & Lesser Thoracic Splanchnic nerves converging onto Celiac & Superior Mesenteric Ganglia
    addTube(
      symGrp,
      [
        [s * 0.38, -3.65, -0.34],
        [s * 0.28, -4.70, -0.06],
        [s * 0.16, -5.65, 0.14],
      ],
      0.018,
      symMat,
      12,
      6,
    );
    addTube(
      symGrp,
      [
        [s * 0.38, -4.65, -0.32],
        [s * 0.24, -5.50, 0.02],
        [s * 0.14, -6.18, 0.16],
      ],
      0.016,
      symMat,
      10,
      6,
    );
  }
  // Ganglion Impar + Prevertebral Celiac, SMA, IMA ganglia & Superior Hypogastric Plexus
  addNode(symGrp, [0, -9.48, -0.36], 0.044, 0.055, 0.038, symMat);
  addNode(symGrp, [0, -5.68, 0.16], 0.12, 0.09, 0.07, symMat); // Celiac ganglion complex
  addNode(symGrp, [0, -6.22, 0.18], 0.09, 0.07, 0.06, symMat); // Superior mesenteric
  addNode(symGrp, [0, -7.20, 0.16], 0.08, 0.06, 0.05, symMat); // Inferior mesenteric
  addTube(
    symGrp,
    [
      [0, -5.68, 0.16],
      [0, -6.50, 0.18],
      [0, -7.35, 0.16],
      [0, -8.10, 0.10],
    ],
    0.022,
    symMat,
    14,
    7,
  );
  tagRegion(symGrp, 'nerve-sympathetic-chain');

  // 20. Pelvic Splanchnic Nerves & Inferior Hypogastric Plexus (S2–S4)
  const { group: pelvGrp, mat: pelvMat } = makeRegion('nerve-pelvic-splanchnic', 0x6ecfb0, 0.44);
  for (const s of [-1, 1] as const) {
    addTube(
      pelvGrp,
      [
        [s * 0.32, -8.52, -0.36],
        [s * 0.48, -8.72, -0.08],
        [s * 0.42, -8.88, 0.16],
        [s * 0.16, -8.98, 0.28],
      ],
      0.021,
      pelvMat,
      14,
      7,
    );
    // Hypogastric bridge + vesical/rectal mesh
    addTube(
      pelvGrp,
      [
        [0, -8.08, 0.10],
        [s * 0.30, -8.48, 0.14],
        [s * 0.42, -8.88, 0.16],
      ],
      0.017,
      pelvMat,
      10,
      6,
    );
    addNode(pelvGrp, [s * 0.42, -8.88, 0.16], 0.068, 0.055, 0.048, pelvMat);
  }
  tagRegion(pelvGrp, 'nerve-pelvic-splanchnic');

  // 21. Enteric Nervous System (Myenteric & Submucosal Intrinsic Gut Lattice)
  const { group: ensGrp, mat: ensMat } = makeRegion('nerve-enteric-plexus', 0x76d496, 0.46);
  // Esophageal -> Gastric -> Colonic frame + coiled jejunal/ileal myenteric lattice
  addTube(
    ensGrp,
    [
      [0.02, -4.65, 0.22],
      [0.16, -5.25, 0.34],
      [0.54, -5.75, 0.38],
      [0.24, -6.12, 0.36],
    ],
    0.022,
    ensMat,
    14,
    7,
  );
  // Ascending -> Transverse -> Descending -> Sigmoid colonic enteric plexus frame
  addTube(
    ensGrp,
    [
      [-0.78, -7.85, 0.26],
      [-0.84, -6.65, 0.28],
      [-0.72, -6.10, 0.36],
      [0.0, -6.22, 0.42],
      [0.74, -6.02, 0.34],
      [0.84, -7.05, 0.26],
      [0.64, -7.98, 0.24],
      [0.10, -8.32, 0.20],
    ],
    0.024,
    ensMat,
    28,
    7,
  );
  // Small intestine sinusoidal myenteric/submucosal loops
  addTube(
    ensGrp,
    [
      [0.18, -6.38, 0.34],
      [-0.48, -6.62, 0.36],
      [0.46, -6.92, 0.38],
      [-0.50, -7.24, 0.38],
      [0.44, -7.54, 0.36],
      [-0.44, -7.82, 0.34],
      [0.14, -8.02, 0.28],
    ],
    0.020,
    ensMat,
    34,
    7,
  );
  // Intrinsic enteric ganglia nodes along myenteric loops
  const ensNodes: [number, number, number][] = [
    [0.46, -5.75, 0.38],
    [-0.78, -6.45, 0.30],
    [0.0, -6.22, 0.42],
    [0.80, -6.65, 0.30],
    [-0.45, -7.15, 0.38],
    [0.40, -7.45, 0.36],
    [0.10, -8.28, 0.22],
  ];
  for (const pt of ensNodes) {
    addNode(ensGrp, pt, 0.044, 0.038, 0.036, ensMat);
  }
  tagRegion(ensGrp, 'nerve-enteric-plexus');

  // Default hidden until Whole Nervous System mode is enabled (or a body nerve is selected)
  root.visible = false;

  return {
    group: root,
    nerveRegionGroups,
    subcorticalUniforms,
  };
}
