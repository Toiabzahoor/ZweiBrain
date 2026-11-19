import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { buildBrainAssembly, type BrainAssembly } from '../brain/anatomyBuilder';
import { classifyCorticalLobe } from '../brain/math3d';
import {
  computeCorticalDevelopment,
  computeViewportSpecimenScale,
  getKnowledgeColorRGB,
  getNormalizedTempForShader,
  getRegionEpistemicState,
} from '../data/lifespan';
import {
  BRAIN_REGIONS,
  CAMERA_PRESETS,
  isBodyNerveRegion,
  isNerveRegion,
  isVesselRegion,
  type CameraPresetId,
  type RegionId,
  type TissueFinish,
  type ViewMode,
} from '../data/neuroanatomy';

export interface BrainViewportProps {
  ageYears: number;
  viewMode: ViewMode;
  tissueFinish: TissueFinish;
  selectedRegion: RegionId | null;
  hoveredRegion: RegionId | null;
  cameraPreset: CameraPresetId | null;
  cameraRequestNonce: number;
  showVessels: boolean;
  showNerves: boolean;
  showWholeBody: boolean;
  showVentricles: boolean;
  autoRotate: boolean;
  onSelectRegion: (regionId: RegionId | null) => void;
  onHoverRegion: (regionId: RegionId | null, screenPos?: { x: number; y: number }) => void;
  onUserOrbit?: () => void;
}

function detectSoftwareWebGL(): boolean {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return false;
  }
}

function createContactShadowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(size / 2, size / 2, 4, size / 2, size / 2, size / 2);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.72)');
    grad.addColorStop(0.45, 'rgba(0, 0, 0, 0.34)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const LOBE_INDEX_TO_REGION: Record<number, RegionId> = {
  0: 'frontal-lobe',
  1: 'parietal-lobe',
  2: 'temporal-lobe',
  3: 'occipital-lobe',
};

const REGION_TO_HIGHLIGHT_VAL: Partial<Record<RegionId, number>> = {
  'frontal-lobe': 0,
  'parietal-lobe': 1,
  'temporal-lobe': 2,
  'occipital-lobe': 3,
  'cerebral-cortex': 4,
};

export function BrainViewport(props: BrainViewportProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [contextLost, setContextLost] = useState(false);

  // Store latest props in refs so the WebGL lifecycle never tears down on UI updates
  const propsRef = useRef(props);
  propsRef.current = props;

  // Imperative bridge to trigger camera transitions & on-demand renders when props change
  const engineRef = useRef<{
    requestRender: () => void;
    applyCameraGoal: (pos: [number, number, number], target: [number, number, number]) => void;
    syncFromProps: () => void;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#07090e');
    scene.fog = new THREE.FogExp2(0x07090e, 0.055);

    const computeResponsiveFov = (w: number, h: number) => {
      const aspect = w / Math.max(1, h);
      return aspect < 0.95 ? Math.min(60, 36 / Math.max(0.56, aspect)) : 36;
    };

    const camera = new THREE.PerspectiveCamera(computeResponsiveFov(width, height), width / height, 0.1, 100);
    const defaultPreset = CAMERA_PRESETS[0];
    camera.position.set(...defaultPreset.position);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.94;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.setAttribute('aria-label', 'Interactive 3D human brain model');

    container.appendChild(renderer.domElement);

    // Mandatory Studio Environment Reflections (RoomEnvironment) on every device
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    // 3-Point Warm/Cool Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xbcd4f5, 0x261a1c, 0.65);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff1e3, 1.65);
    keyLight.position.set(-4.2, 4.6, 3.8);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 1.0;
    keyLight.shadow.camera.far = 14.0;
    keyLight.shadow.camera.left = -2.2;
    keyLight.shadow.camera.right = 2.2;
    keyLight.shadow.camera.top = 2.2;
    keyLight.shadow.camera.bottom = -2.2;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x9bc2f7, 0.9);
    rimLight.position.set(3.8, 2.4, -4.4);
    scene.add(rimLight);

    const ventralFill = new THREE.DirectionalLight(0xf3cbbd, 0.45);
    ventralFill.position.set(1.2, -3.5, 2.2);
    scene.add(ventralFill);

    if (!isSoftwareGl) {
      RectAreaLightUniformsLib.init();
      const softboxTop = new THREE.RectAreaLight(0xfff6ed, 1.45, 3.5, 2.2);
      softboxTop.position.set(-2.0, 3.8, 2.0);
      softboxTop.lookAt(0, 0, 0);
      scene.add(softboxTop);

      const softboxRim = new THREE.RectAreaLight(0xd4e6ff, 1.1, 3.0, 2.0);
      softboxRim.position.set(3.0, 1.4, -3.2);
      softboxRim.lookAt(0, 0, 0);
      scene.add(softboxRim);
    }

    // Build Composite Multi-Part 3D Human Brain
    const assembly: BrainAssembly = buildBrainAssembly();
    scene.add(assembly.root);

    // Grounding radial contact shadow beneath the specimen
    const shadowTex = createContactShadowTexture();
    const shadowPlane = new THREE.Mesh(
      new THREE.CircleGeometry(1.75, 48),
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.48,
        depthWrite: false,
      }),
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.16;
    scene.add(shadowPlane);

    // Pre-warm shaders on GPU
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(...defaultPreset.target);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.07;
    controls.rotateSpeed = 0.78;
    controls.zoomSpeed = 0.85;
    controls.panSpeed = 0.65;
    controls.minDistance = 1.65;
    controls.maxDistance = 6.5;
    controls.autoRotate = !isSoftwareGl && propsRef.current.autoRotate;
    controls.autoRotateSpeed = 0.75;
    controls.update();

    // Smooth animation state (pre-allocated scratch vectors -> zero GC in render loop)
    const desiredCamPos = new THREE.Vector3(...defaultPreset.position);
    const desiredTarget = new THREE.Vector3(...defaultPreset.target);
    let cameraFlightActive = false;

    const initialDev = computeCorticalDevelopment(propsRef.current.ageYears);
    let currentGlass = 0;
    let targetGlass = 0;
    let currentSplit = 0;
    let targetSplit = 0;
    let currentExplode = 0;
    let targetExplode = 0;
    let currentScale = computeViewportSpecimenScale(propsRef.current.ageYears);
    let targetScale = currentScale;
    let currentPrimaryFold = initialDev.primaryFold;
    let targetPrimaryFold = currentPrimaryFold;
    let currentSecondaryFold = initialDev.secondaryFold;
    let targetSecondaryFold = currentSecondaryFold;
    let currentTertiaryFold = initialDev.tertiaryFold;
    let targetTertiaryFold = currentTertiaryFold;
    let currentSulcalWidening = initialDev.sulcalWidening;
    let targetSulcalWidening = currentSulcalWidening;
    let currentCerebellumRel = initialDev.cerebellumRelScale;
    let targetCerebellumRel = currentCerebellumRel;
    let currentVentricleRel = initialDev.ventricleRelScale;
    let targetVentricleRel = currentVentricleRel;

    let frameId = 0;
    let renderBusy = false;
    let renderDirty = false;
    let disposed = false;
    let lastTime = performance.now();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
      if (!sync) {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      gl.flush();
      const poll = () => {
        if (disposed) {
          gl.deleteSync(sync);
          return;
        }
        const state = gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function stepTransitions(dt: number): boolean {
      const lambda = isSoftwareGl ? 24 : 7.5;
      let needsAnotherFrame = false;

      // Camera flight
      if (cameraFlightActive) {
        camera.position.x = THREE.MathUtils.damp(camera.position.x, desiredCamPos.x, lambda, dt);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, desiredCamPos.y, lambda, dt);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, desiredCamPos.z, lambda, dt);
        controls.target.x = THREE.MathUtils.damp(controls.target.x, desiredTarget.x, lambda, dt);
        controls.target.y = THREE.MathUtils.damp(controls.target.y, desiredTarget.y, lambda, dt);
        controls.target.z = THREE.MathUtils.damp(controls.target.z, desiredTarget.z, lambda, dt);

        const posDist = camera.position.distanceTo(desiredCamPos);
        const tgtDist = controls.target.distanceTo(desiredTarget);
        if (posDist < 0.008 && tgtDist < 0.008) {
          camera.position.copy(desiredCamPos);
          controls.target.copy(desiredTarget);
          cameraFlightActive = false;
        } else {
          needsAnotherFrame = true;
        }
      }

      // Glass cortex / Split / Exploded / Lifespan Scale & Morphogenesis transitions
      const morphLambda = isSoftwareGl ? 28 : 11.0;
      currentGlass = THREE.MathUtils.damp(currentGlass, targetGlass, lambda, dt);
      currentSplit = THREE.MathUtils.damp(currentSplit, targetSplit, lambda, dt);
      currentExplode = THREE.MathUtils.damp(currentExplode, targetExplode, lambda, dt);
      currentScale = THREE.MathUtils.damp(currentScale, targetScale, morphLambda, dt);
      currentPrimaryFold = THREE.MathUtils.damp(currentPrimaryFold, targetPrimaryFold, morphLambda, dt);
      currentSecondaryFold = THREE.MathUtils.damp(currentSecondaryFold, targetSecondaryFold, morphLambda, dt);
      currentTertiaryFold = THREE.MathUtils.damp(currentTertiaryFold, targetTertiaryFold, morphLambda, dt);
      currentSulcalWidening = THREE.MathUtils.damp(currentSulcalWidening, targetSulcalWidening, morphLambda, dt);
      currentCerebellumRel = THREE.MathUtils.damp(currentCerebellumRel, targetCerebellumRel, morphLambda, dt);
      currentVentricleRel = THREE.MathUtils.damp(currentVentricleRel, targetVentricleRel, morphLambda, dt);

      if (
        Math.abs(currentGlass - targetGlass) > 0.004 ||
        Math.abs(currentSplit - targetSplit) > 0.004 ||
        Math.abs(currentExplode - targetExplode) > 0.004 ||
        Math.abs(currentScale - targetScale) > 0.002 ||
        Math.abs(currentPrimaryFold - targetPrimaryFold) > 0.003 ||
        Math.abs(currentSecondaryFold - targetSecondaryFold) > 0.003 ||
        Math.abs(currentTertiaryFold - targetTertiaryFold) > 0.003 ||
        Math.abs(currentSulcalWidening - targetSulcalWidening) > 0.003
      ) {
        needsAnotherFrame = true;
      } else {
        currentGlass = targetGlass;
        currentSplit = targetSplit;
        currentExplode = targetExplode;
        currentScale = targetScale;
        currentPrimaryFold = targetPrimaryFold;
        currentSecondaryFold = targetSecondaryFold;
        currentTertiaryFold = targetTertiaryFold;
        currentSulcalWidening = targetSulcalWidening;
        currentCerebellumRel = targetCerebellumRel;
        currentVentricleRel = targetVentricleRel;
      }

      assembly.root.scale.setScalar(currentScale);
      shadowPlane.scale.setScalar(currentScale);
      shadowPlane.position.y = 0.24 - 1.40 * currentScale;

      // Apply GPU cortical folding & aging sulcal widening uniforms
      assembly.cortexUniforms.uPrimaryFold.value = currentPrimaryFold;
      assembly.cortexUniforms.uSecondaryFold.value = currentSecondaryFold;
      assembly.cortexUniforms.uTertiaryFold.value = currentTertiaryFold;
      assembly.cortexUniforms.uSulcalWidening.value = currentSulcalWidening;

      // Apply cortical glass material state
      assembly.cortexUniforms.uGlassMode.value = currentGlass;
      const cortexMat = assembly.cortexMaterial;
      const targetOpacity = THREE.MathUtils.lerp(1.0, 0.21, currentGlass);
      const wantTransparent = currentGlass > 0.02;
      if (cortexMat.transparent !== wantTransparent) {
        cortexMat.transparent = wantTransparent;
        cortexMat.depthWrite = !wantTransparent;
        cortexMat.needsUpdate = true;
      }
      cortexMat.opacity = targetOpacity;

      // Apply split + exploded offsets & relative cerebellar/ventricular scaling
      const { parts, partBasePositions } = assembly;
      parts.cerebellum.scale.setScalar(currentCerebellumRel);
      parts.ventricles.scale.setScalar(currentVentricleRel);
      const hemiLateral = currentSplit * 0.56 + currentExplode * 0.62;

      const baseLeft = partBasePositions.get(parts.leftHemisphere)!;
      parts.leftHemisphere.position.set(baseLeft.x - hemiLateral, baseLeft.y + currentExplode * 0.14, baseLeft.z);

      const baseRight = partBasePositions.get(parts.rightHemisphere)!;
      parts.rightHemisphere.position.set(baseRight.x + hemiLateral, baseRight.y + currentExplode * 0.14, baseRight.z);

      const baseCereb = partBasePositions.get(parts.cerebellum)!;
      parts.cerebellum.position.set(
        baseCereb.x,
        baseCereb.y - currentExplode * 0.34,
        baseCereb.z - currentExplode * 0.44,
      );

      const baseStem = partBasePositions.get(parts.brainstem)!;
      parts.brainstem.position.set(baseStem.x, baseStem.y - currentExplode * 0.40, baseStem.z);

      const baseCC = partBasePositions.get(parts.corpusCallosum)!;
      parts.corpusCallosum.position.set(baseCC.x, baseCC.y + currentExplode * 0.32, baseCC.z);

      const baseThal = partBasePositions.get(parts.thalamus)!;
      parts.thalamus.position.set(baseThal.x, baseThal.y + currentExplode * 0.08, baseThal.z);

      const baseHypo = partBasePositions.get(parts.hypothalamus)!;
      parts.hypothalamus.position.set(baseHypo.x, baseHypo.y - currentExplode * 0.16, baseHypo.z + currentExplode * 0.18);

      const baseHippo = partBasePositions.get(parts.hippocampus)!;
      parts.hippocampus.position.set(baseHippo.x, baseHippo.y - currentExplode * 0.06, baseHippo.z);

      const baseVasc = partBasePositions.get(parts.vasculature)!;
      parts.vasculature.position.set(baseVasc.x, baseVasc.y, baseVasc.z);

      const baseLeftVessels = partBasePositions.get(parts.leftCorticalVessels)!;
      parts.leftCorticalVessels.position.set(
        baseLeftVessels.x - hemiLateral,
        baseLeftVessels.y + currentExplode * 0.14,
        baseLeftVessels.z,
      );

      const baseRightVessels = partBasePositions.get(parts.rightCorticalVessels)!;
      parts.rightCorticalVessels.position.set(
        baseRightVessels.x + hemiLateral,
        baseRightVessels.y + currentExplode * 0.14,
        baseRightVessels.z,
      );

      const baseStemVessels = partBasePositions.get(parts.brainstemVessels)!;
      parts.brainstemVessels.position.set(
        baseStemVessels.x,
        baseStemVessels.y - currentExplode * 0.40,
        baseStemVessels.z,
      );

      const baseSinusVessels = partBasePositions.get(parts.sinusVessels)!;
      parts.sinusVessels.position.set(
        baseSinusVessels.x,
        baseSinusVessels.y + currentExplode * 0.16,
        baseSinusVessels.z,
      );

      const baseForeNerves = partBasePositions.get(parts.forebrainNerves)!;
      parts.forebrainNerves.position.set(baseForeNerves.x, baseForeNerves.y, baseForeNerves.z);

      const baseStemNerves = partBasePositions.get(parts.brainstemNerves)!;
      parts.brainstemNerves.position.set(
        baseStemNerves.x,
        baseStemNerves.y - currentExplode * 0.40,
        baseStemNerves.z,
      );

      const baseBodyNerves = partBasePositions.get(parts.wholeBodyNerves);
      if (baseBodyNerves) {
        parts.wholeBodyNerves.position.set(
          baseBodyNerves.x,
          baseBodyNerves.y - currentExplode * 0.40,
          baseBodyNerves.z,
        );
      }

      return needsAnotherFrame;
    }

    function requestRender() {
      if (disposed) return;
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      frameId = requestAnimationFrame(() => {
        if (disposed) return;
        renderDirty = false;
        const now = performance.now();
        const dt = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;

        const animating = stepTransitions(dt);
        const controlsChanged = controls.update();
        renderer.render(scene, camera);

        const done = () => {
          renderBusy = false;
          if (disposed) return;
          const keepGoing =
            renderDirty ||
            animating ||
            (!isSoftwareGl && controls.autoRotate) ||
            (!isSoftwareGl && controlsChanged);
          if (keepGoing) {
            requestRender();
          }
        };

        if (isSoftwareGl) {
          afterDraw(done);
        } else {
          done();
        }
      });
    }

    function syncFromProps() {
      const p = propsRef.current;
      targetGlass = p.viewMode === 'glass' ? 1 : 0;
      targetSplit = p.viewMode === 'split' && p.cameraPreset !== 'midsagittal' ? 1 : 0;
      targetExplode = p.viewMode === 'exploded' ? 1 : 0;
      targetScale = computeViewportSpecimenScale(p.ageYears);

      const dev = computeCorticalDevelopment(p.ageYears);
      targetPrimaryFold = dev.primaryFold;
      targetSecondaryFold = dev.secondaryFold;
      targetTertiaryFold = dev.tertiaryFold;
      targetSulcalWidening = dev.sulcalWidening;
      targetCerebellumRel = dev.cerebellumRelScale;
      targetVentricleRel = dev.ventricleRelScale;

      const finishCode =
        p.tissueFinish === 'fresh'
          ? 0
          : p.tissueFinish === 'fixed'
            ? 1
            : p.tissueFinish === 'lobes'
              ? 2
              : p.tissueFinish === 'knowledge'
                ? 3
                : 4;
      assembly.cortexUniforms.uFinishMode.value = finishCode;

      assembly.cortexUniforms.uLobeKnowledge.value.set(
        getRegionEpistemicState('frontal-lobe', p.ageYears).knownPct / 100,
        getRegionEpistemicState('parietal-lobe', p.ageYears).knownPct / 100,
        getRegionEpistemicState('temporal-lobe', p.ageYears).knownPct / 100,
        getRegionEpistemicState('occipital-lobe', p.ageYears).knownPct / 100,
      );

      assembly.cortexUniforms.uLobeTemp.value.set(
        getNormalizedTempForShader('frontal-lobe', p.ageYears),
        getNormalizedTempForShader('parietal-lobe', p.ageYears),
        getNormalizedTempForShader('temporal-lobe', p.ageYears),
        getNormalizedTempForShader('occipital-lobe', p.ageYears),
      );

      const highlightVal = p.selectedRegion ? REGION_TO_HIGHLIGHT_VAL[p.selectedRegion] ?? -1 : -1;
      assembly.cortexUniforms.uHighlightLobe.value = highlightVal;

      const hoverVal = p.hoveredRegion ? REGION_TO_HIGHLIGHT_VAL[p.hoveredRegion] ?? -1 : -1;
      assembly.cortexUniforms.uHoverLobe.value = hoverVal;

      const isEpistemicMode = p.tissueFinish === 'knowledge' || p.tissueFinish === 'temperature';
      for (const [key, uni] of Object.entries(assembly.subcorticalUniforms)) {
        const regId = key as RegionId;
        const selectedMatches =
          p.selectedRegion === key || (p.selectedRegion === 'vasculature' && isVesselRegion(regId));
        const hoveredMatches =
          p.hoveredRegion === key || (p.hoveredRegion === 'vasculature' && isVesselRegion(regId));
        uni.uHighlighted.value = selectedMatches ? 1 : 0;
        uni.uHovered.value = hoveredMatches ? 1 : 0;
        uni.uEpistemicBlend.value = isEpistemicMode ? 1 : 0;

        if (p.tissueFinish === 'knowledge') {
          const [r, g, b] = getKnowledgeColorRGB(getRegionEpistemicState(regId, p.ageYears).knownPct);
          uni.uEpistemicTint.value.setRGB(r, g, b, THREE.SRGBColorSpace);
        } else if (p.tissueFinish === 'temperature') {
          const tNorm = getNormalizedTempForShader(regId, p.ageYears);
          if (tNorm < 0) {
            uni.uEpistemicTint.value.setRGB(0.08, 0.10, 0.14);
          } else if (tNorm < 0.5) {
            const k = tNorm * 2;
            uni.uEpistemicTint.value.setRGB(
              THREE.MathUtils.lerp(0.04, 0.70, k),
              THREE.MathUtils.lerp(0.24, 0.32, k),
              THREE.MathUtils.lerp(0.66, 0.03, k),
            );
          } else {
            const k = (tNorm - 0.5) * 2;
            uni.uEpistemicTint.value.setRGB(
              THREE.MathUtils.lerp(0.70, 0.76, k),
              THREE.MathUtils.lerp(0.32, 0.06, k),
              THREE.MathUtils.lerp(0.03, 0.03, k),
            );
          }
        }
      }

      // Chronological embryonic nerve emergence & outgrowth (GW4 -> GW9+)
      for (const [nerveId, grp] of assembly.nerveRegionGroups.entries()) {
        if (dev.isPrenatal) {
          const emerge = (grp.userData.emergenceGw as number) ?? 5.0;
          const mature = (grp.userData.matureGw as number) ?? 8.5;
          const rawT = THREE.MathUtils.clamp(
            (dev.gestationalWeek - (emerge - 0.35)) / Math.max(0.5, mature - (emerge - 0.35)),
            0,
            1,
          );
          const t = rawT * rawT * (3 - 2 * rawT);
          grp.visible = t > 0.02 || p.selectedRegion === nerveId;
          if (grp.visible) {
            const s =
              nerveId === 'nerve-cervical-spinal'
                ? THREE.MathUtils.lerp(0.55, 1.0, t)
                : THREE.MathUtils.lerp(0.16, 1.0, t);
            grp.scale.setScalar(s);
          }
        } else {
          grp.visible = true;
          grp.scale.setScalar(1.0);
        }
      }

      const bodyVisible =
        p.showWholeBody || Boolean(p.selectedRegion && isBodyNerveRegion(p.selectedRegion));
      assembly.parts.vasculature.visible =
        p.showVessels || Boolean(p.selectedRegion && isVesselRegion(p.selectedRegion));
      assembly.parts.cranialNerves.visible =
        p.showNerves || bodyVisible || Boolean(p.selectedRegion && isNerveRegion(p.selectedRegion));
      assembly.parts.wholeBodyNerves.visible = bodyVisible;
      assembly.parts.ventricles.visible = p.showVentricles || p.selectedRegion === 'ventricles';
      assembly.parts.leftHemisphere.visible = p.cameraPreset !== 'midsagittal';
      assembly.parts.leftCorticalVessels.visible = p.cameraPreset !== 'midsagittal';

      controls.maxDistance = bodyVisible ? 50 : 7.5;
      if (scene.fog instanceof THREE.FogExp2) {
        scene.fog.density = bodyVisible ? 0.005 : 0.055;
      }
      shadowPlane.visible = !bodyVisible;

      controls.autoRotate = !isSoftwareGl && p.autoRotate;
      requestRender();
    }

    function applyCameraGoal(pos: [number, number, number], target: [number, number, number]) {
      desiredCamPos.set(...pos);
      desiredTarget.set(...target);
      cameraFlightActive = true;
      requestRender();
    }

    engineRef.current = {
      requestRender,
      applyCameraGoal,
      syncFromProps,
    };

    // OrbitControls listeners
    const onControlStart = () => {
      cameraFlightActive = false;
      propsRef.current.onUserOrbit?.();
    };
    const onControlChange = () => {
      requestRender();
    };
    controls.addEventListener('start', onControlStart);
    controls.addEventListener('change', onControlChange);

    // Click & Throttled Hover Raycasting
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2();
    const localHit = new THREE.Vector3();
    let downX = 0;
    let downY = 0;
    let isPointerDown = false;
    let lastHoverTime = 0;

    const resolvePickedRegion = (clientX: number, clientY: number): RegionId | null => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return null;
      pointerNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerNDC.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointerNDC, camera);
      const hits = raycaster.intersectObjects(assembly.interactables, true);
      if (hits.length === 0) return null;

      const isGlass = propsRef.current.viewMode === 'glass';
      const picked = hits.find((h) => {
        let cur: THREE.Object3D | null = h.object;
        while (cur) {
          if (!cur.visible) return false;
          cur = cur.parent;
        }
        if (isGlass && h.object.userData.regionId === 'cerebral-cortex') {
          return false;
        }
        return Boolean(h.object.userData.regionId);
      });

      if (!picked) return null;

      const rawId = picked.object.userData.regionId as RegionId;
      if (rawId === 'cerebral-cortex') {
        localHit.copy(picked.point);
        picked.object.worldToLocal(localHit);
        const lobeIdx = classifyCorticalLobe(Math.abs(localHit.x), localHit.y, localHit.z);
        return LOBE_INDEX_TO_REGION[lobeIdx] ?? 'cerebral-cortex';
      }
      return rawId;
    };

    const onPointerDown = (e: PointerEvent) => {
      downX = e.clientX;
      downY = e.clientY;
      isPointerDown = true;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isPointerDown) return;
      const now = performance.now();
      if (now - lastHoverTime < 55) return;
      lastHoverTime = now;

      const region = resolvePickedRegion(e.clientX, e.clientY);
      propsRef.current.onHoverRegion(region, region ? { x: e.clientX, y: e.clientY } : undefined);
    };

    const onPointerLeave = () => {
      isPointerDown = false;
      propsRef.current.onHoverRegion(null);
    };

    const onPointerUp = (e: PointerEvent) => {
      isPointerDown = false;
      const dist = Math.hypot(e.clientX - downX, e.clientY - downY);
      if (dist > 5) return;

      const region = resolvePickedRegion(e.clientX, e.clientY);
      propsRef.current.onSelectRegion(region);
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerleave', onPointerLeave);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    // ResizeObserver & Window Resize
    const handleResize = () => {
      if (!container || disposed) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.fov = computeResponsiveFov(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      requestRender();
    };
    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // WebGL Context Loss Safety
    const onContextLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };
    const onContextRestored = () => {
      setContextLost(false);
      requestRender();
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);

    // Initial sync & first frame
    syncFromProps();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      controls.removeEventListener('start', onControlStart);
      controls.removeEventListener('change', onControlChange);
      controls.dispose();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerleave', onPointerLeave);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);
      assembly.dispose();
      shadowPlane.geometry.dispose();
      (shadowPlane.material as THREE.Material).dispose();
      shadowTex.dispose();
      envTarget.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      engineRef.current = null;
    };
  }, []);

  // Sync reactive props to imperative WebGL scene
  useEffect(() => {
    engineRef.current?.syncFromProps();
  }, [
    props.ageYears,
    props.viewMode,
    props.tissueFinish,
    props.selectedRegion,
    props.hoveredRegion,
    props.cameraPreset,
    props.showVessels,
    props.showNerves,
    props.showWholeBody,
    props.showVentricles,
    props.autoRotate,
  ]);

  // Trigger smooth camera preset flight
  useEffect(() => {
    if (!props.cameraPreset) return;
    const preset = CAMERA_PRESETS.find((p) => p.id === props.cameraPreset);
    if (preset) {
      engineRef.current?.applyCameraGoal(preset.position, preset.target);
    }
  }, [props.cameraPreset, props.cameraRequestNonce]);

  // Focus camera gently when user picks a specific deep structure
  useEffect(() => {
    if (!props.selectedRegion) return;
    const info = BRAIN_REGIONS[props.selectedRegion];
    if (info && props.cameraPreset === null) {
      engineRef.current?.applyCameraGoal(info.cameraPosition, info.cameraTarget);
    }
  }, [props.selectedRegion, props.cameraPreset]);

  return (
    <div className="relative w-full h-full">
      <div
        ref={mountRef}
        data-testid="brain-viewport"
        className={`w-full h-full ${props.hoveredRegion ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'}`}
      />
      {contextLost && (
        <div
          role="alert"
          className="absolute inset-0 flex flex-col items-center justify-center bg-[#07090e] text-[#eef1f6] p-6 text-center z-30"
        >
          <p className="text-base font-semibold">3D Graphics Context Suspended</p>
          <p className="text-sm text-[#98a2b3] mt-1 max-w-md">
            WebGL rendering was interrupted by the browser. Reload the page to restore the 3D brain specimen.
          </p>
        </div>
      )}
    </div>
  );
}
