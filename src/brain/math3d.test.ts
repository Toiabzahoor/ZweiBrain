import test from 'node:test';
import assert from 'node:assert/strict';
import {
  classifyCorticalLobe,
  evaluateCorticalVertex,
  fbm3D,
  gradientNoise3D,
} from './math3d';

test('gradientNoise3D and fbm3D are deterministic and bounded', () => {
  const a = gradientNoise3D(1.25, -0.75, 2.5);
  const b = gradientNoise3D(1.25, -0.75, 2.5);
  assert.equal(a, b);
  assert.ok(a >= -1.5 && a <= 1.5);

  const f = fbm3D(0.5, 0.5, 0.5, 3);
  assert.ok(f >= -1.5 && f <= 1.5);
});

test('sculpted cerebrum matches adult MNI152 anatomical proportions (1 unit = 70 mm)', () => {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  let minZ = Infinity;
  let maxZ = -Infinity;

  // Sample dense Fibonacci sphere directions across both hemispheres
  const N = 1200;
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (const side of [-1, 1] as const) {
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      const v = evaluateCorticalVertex(x, y, z, side);
      if (v.x < minX) minX = v.x;
      if (v.x > maxX) maxX = v.x;
      if (v.y < minY) minY = v.y;
      if (v.y > maxY) maxY = v.y;
      if (v.z < minZ) minZ = v.z;
      if (v.z > maxZ) maxZ = v.z;

      // Hemispheres stay strictly on their respective side of the midline fissure
      if (side === -1) {
        assert.ok(v.x <= -0.02, `Left hemisphere crossed midline: ${v.x}`);
      } else {
        assert.ok(v.x >= 0.02, `Right hemisphere crossed midline: ${v.x}`);
      }

      assert.ok(v.gyrusHeight >= 0 && v.gyrusHeight <= 1);
      assert.ok(v.medialFactor >= 0 && v.medialFactor <= 1);
    }
  }

  const apSpan = maxZ - minZ; // Target ~2.38 units (~167 mm)
  const mlSpan = maxX - minX; // Target ~2.00 units (~140 mm)
  const siSpan = maxY - minY; // Target ~1.33 units (~93 mm)

  assert.ok(apSpan > 2.2 && apSpan < 2.55, `Unexpected AP span: ${apSpan}`);
  assert.ok(mlSpan > 1.85 && mlSpan < 2.2, `Unexpected ML span: ${mlSpan}`);
  assert.ok(siSpan > 1.15 && siSpan < 1.5, `Unexpected SI span: ${siSpan}`);
  // Human brain is longer AP than wide ML, and wider ML than tall SI
  assert.ok(apSpan > mlSpan && mlSpan > siSpan);
});

test('medial callosal recess leaves midline clearance for corpus callosum', () => {
  // Pure medial direction pointing directly toward midline (side = 1, nx = -1, ny = 0.1, nz = 0.05)
  const rightMedial = evaluateCorticalVertex(-1, 0.1, 0.05, 1);
  assert.ok(
    rightMedial.x >= 0.18,
    `Expected medial callosal recess clearance >= 0.18, got ${rightMedial.x}`,
  );
});

test('classifyCorticalLobe distinguishes Frontal, Parietal, Temporal, and Occipital lobes', () => {
  assert.equal(classifyCorticalLobe(0.5, 0.2, 0.85), 0); // Frontal pole
  assert.equal(classifyCorticalLobe(0.55, 0.65, -0.3), 1); // Parietal crown
  assert.equal(classifyCorticalLobe(0.75, -0.25, 0.1), 2); // Temporal convexity
  assert.equal(classifyCorticalLobe(0.35, 0.05, -0.95), 3); // Occipital pole
});
