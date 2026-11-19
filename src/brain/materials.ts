import * as THREE from 'three';

export interface CortexUniforms {
  uFinishMode: { value: number }; // 0: fresh, 1: fixed, 2: lobes, 3: knowledge, 4: temperature
  uGlassMode: { value: number }; // 0..1
  uHighlightLobe: { value: number }; // -1: none, 0..3: lobe, 4: whole cortex
  uHoverLobe: { value: number }; // -1: none, 0..3: lobe
  uLobeKnowledge: { value: THREE.Vector4 }; // 0..1 empirical coverage per lobe (F, P, T, O)
  uLobeTemp: { value: THREE.Vector4 }; // 0..1 normalized temp or -1 if unmeasured (F, P, T, O)
  uPrimaryFold: { value: number }; // 0..1 primary sulcal cleft indentation
  uSecondaryFold: { value: number }; // 0..1 secondary serpentine gyral folding
  uTertiaryFold: { value: number }; // 0..1 tertiary sulcal branching
  uSulcalWidening: { value: number }; // 0..1 senescence sulcal widening & crown thinning
  uTime: { value: number };
}

export interface SubcorticalUniforms {
  uHighlighted: { value: number }; // 0..1
  uHovered: { value: number }; // 0..1
  uEpistemicTint: { value: THREE.Color };
  uEpistemicBlend: { value: number }; // 0..1
}

const GLSL_NOISE_CHUNK = /* glsl */ `
  vec3 hash33(vec3 p) {
    p = fract(p * vec3(0.1031, 0.1030, 0.0973));
    p += dot(p, p.yxz + 33.33);
    return fract((p.xxy + p.yxx) * p.zyx) * 2.0 - 1.0;
  }

  float vnoise3(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(
        mix(dot(hash33(i + vec3(0.0, 0.0, 0.0)), f - vec3(0.0, 0.0, 0.0)),
            dot(hash33(i + vec3(1.0, 0.0, 0.0)), f - vec3(1.0, 0.0, 0.0)), u.x),
        mix(dot(hash33(i + vec3(0.0, 1.0, 0.0)), f - vec3(0.0, 1.0, 0.0)),
            dot(hash33(i + vec3(1.0, 1.0, 0.0)), f - vec3(1.0, 1.0, 0.0)), u.x),
        u.y
      ),
      mix(
        mix(dot(hash33(i + vec3(0.0, 0.0, 1.0)), f - vec3(0.0, 0.0, 1.0)),
            dot(hash33(i + vec3(1.0, 0.0, 1.0)), f - vec3(1.0, 0.0, 1.0)), u.x),
        mix(dot(hash33(i + vec3(0.0, 1.0, 1.0)), f - vec3(0.0, 1.0, 1.0)),
            dot(hash33(i + vec3(1.0, 1.0, 1.0)), f - vec3(1.0, 1.0, 1.0)), u.x),
        u.y
      ),
      u.z
    );
  }

  vec3 vnoise3Grad(vec3 p) {
    float e = 0.02;
    float nx = vnoise3(p + vec3(e, 0.0, 0.0)) - vnoise3(p - vec3(e, 0.0, 0.0));
    float ny = vnoise3(p + vec3(0.0, e, 0.0)) - vnoise3(p - vec3(0.0, e, 0.0));
    float nz = vnoise3(p + vec3(0.0, 0.0, e)) - vnoise3(p - vec3(0.0, 0.0, e));
    return vec3(nx, ny, nz) / (2.0 * e);
  }
`;

export function createCortexMaterial(sharedUniforms: CortexUniforms): THREE.MeshPhysicalMaterial {
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.42,
    metalness: 0.0,
    clearcoat: 0.88,
    clearcoatRoughness: 0.14,
    sheen: 0.32,
    sheenRoughness: 0.55,
    sheenColor: new THREE.Color('#f4c8be'),
    envMapIntensity: 1.15,
    transparent: false,
    opacity: 1.0,
  });

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uFinishMode = sharedUniforms.uFinishMode;
    shader.uniforms.uGlassMode = sharedUniforms.uGlassMode;
    shader.uniforms.uHighlightLobe = sharedUniforms.uHighlightLobe;
    shader.uniforms.uHoverLobe = sharedUniforms.uHoverLobe;
    shader.uniforms.uLobeKnowledge = sharedUniforms.uLobeKnowledge;
    shader.uniforms.uLobeTemp = sharedUniforms.uLobeTemp;
    shader.uniforms.uPrimaryFold = sharedUniforms.uPrimaryFold;
    shader.uniforms.uSecondaryFold = sharedUniforms.uSecondaryFold;
    shader.uniforms.uTertiaryFold = sharedUniforms.uTertiaryFold;
    shader.uniforms.uSulcalWidening = sharedUniforms.uSulcalWidening;
    shader.uniforms.uTime = sharedUniforms.uTime;

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        /* glsl */ `
        #include <common>
        uniform float uPrimaryFold;
        uniform float uSecondaryFold;
        uniform float uTertiaryFold;
        uniform float uSulcalWidening;
        attribute float aGyrus;
        attribute float aLobe;
        attribute float aPrimarySulcus;
        attribute float aSecondaryWeight;
        attribute vec3 aBasePos;
        attribute vec3 aBaseNormal;
        attribute vec3 aPrimaryDelta;
        attribute vec3 aFoldDelta;
        varying float vGyrus;
        varying float vLobe;
        varying float vPrimarySulcus;
        varying vec3 vObjPos;
        varying vec3 vNMat0;
        varying vec3 vNMat1;
        varying vec3 vNMat2;
      `,
      )
      .replace(
        '#include <beginnormal_vertex>',
        /* glsl */ `
        #include <beginnormal_vertex>
        float normFoldMix = clamp(uPrimaryFold * 0.25 + uSecondaryFold * mix(0.62, 1.0, uTertiaryFold) * 0.75, 0.0, 1.0);
        objectNormal = normalize(mix(aBaseNormal, objectNormal, normFoldMix));
      `,
      )
      .replace(
        '#include <begin_vertex>',
        /* glsl */ `
        #include <begin_vertex>
        float tertiaryWeightMix = mix(1.0, mix(0.55, 1.0, uTertiaryFold), aSecondaryWeight);
        float foldBlend = uSecondaryFold * tertiaryWeightMix;
        vec3 devPos = aBasePos + aPrimaryDelta * uPrimaryFold + aFoldDelta * foldBlend;
        // Senescent gyral thinning & sulcal widening (>42 yr)
        float atrophyInset = uSulcalWidening * (1.0 - 0.35 * aGyrus) * 0.022;
        devPos -= normalize(aBasePos + vec3(0.0001)) * atrophyInset;
        transformed = devPos;

        float foldPresence = clamp(uPrimaryFold * 0.25 + foldBlend * 0.75, 0.0, 1.0);
        float stageGyrus = mix(1.0, aGyrus, foldPresence);
        // Widen sulcal crevices slightly during late senescence
        stageGyrus = clamp(pow(max(stageGyrus, 0.0001), 1.0 + uSulcalWidening * 0.55), 0.0, 1.0);

        vGyrus = stageGyrus;
        vLobe = aLobe;
        vPrimarySulcus = aPrimarySulcus * uPrimaryFold;
        vObjPos = devPos;
        vNMat0 = normalMatrix[0];
        vNMat1 = normalMatrix[1];
        vNMat2 = normalMatrix[2];
      `,
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        /* glsl */ `
        #include <common>
        uniform float uFinishMode;
        uniform float uGlassMode;
        uniform float uHighlightLobe;
        uniform float uHoverLobe;
        uniform vec4 uLobeKnowledge;
        uniform vec4 uLobeTemp;
        uniform float uTime;
        varying float vGyrus;
        varying float vLobe;
        varying float vPrimarySulcus;
        varying vec3 vObjPos;
        varying vec3 vNMat0;
        varying vec3 vNMat1;
        varying vec3 vNMat2;
        ${GLSL_NOISE_CHUNK}

        float classifyLobeFrag(vec3 p) {
          float absX = abs(p.x);
          float y = p.y;
          float z = p.z;
          float sylvianY = 0.095 - 0.43 * z;
          float centralZ = -0.075 + 0.17 * clamp(0.86 - y, 0.0, 1.0);
          float occipitalZ = -0.64 - 0.08 * y;
          if (z < occipitalZ) return 3.0;
          bool inTemporalZ = (z < 0.49) || (z < 0.57 && y < -0.14 && absX > 0.28);
          if (y < sylvianY && inTemporalZ && (absX > 0.24 || y < -0.15)) return 2.0;
          if (z > centralZ) return 0.0;
          return 1.0;
        }

        vec3 knowledgeRamp(float k) {
          if (k >= 0.75) return vec3(0.04, 0.44, 0.23);
          if (k >= 0.35) return vec3(0.64, 0.28, 0.04);
          return vec3(0.38, 0.045, 0.08);
        }

        vec3 thermalRamp(float tNorm) {
          if (tNorm < -0.5) return vec3(0.08, 0.10, 0.14); // unmeasured thermal gap
          vec3 cool = vec3(0.04, 0.24, 0.66);
          vec3 mid = vec3(0.70, 0.32, 0.03);
          vec3 hot = vec3(0.76, 0.06, 0.03);
          return (tNorm < 0.5) ? mix(cool, mid, tNorm * 2.0) : mix(mid, hot, (tNorm - 0.5) * 2.0);
        }
      `,
      )
      .replace(
        '#include <color_fragment>',
        /* glsl */ `
        #include <color_fragment>
        // Object-space micro-texture & vascular modulation (zero UV seams)
        float micro1 = vnoise3(vObjPos * 14.0);
        float micro2 = vnoise3(vObjPos * 32.0 + vec3(4.1, 7.3, 1.9));
        float pore = vnoise3(vObjPos * 58.0);
        float fragLobe = classifyLobeFrag(vObjPos);

        // Delicate pial blood vessels branching predominantly along sulci and climbing gyral walls
        float vNoiseA = abs(vnoise3(vObjPos * 7.2 + vec3(micro1 * 0.48)));
        float vNoiseB = abs(vnoise3(vObjPos * 15.8 + vec3(micro2 * 0.36 + 11.2)));
        float capillarySulcus = smoothstep(0.115, 0.015, vNoiseA) * smoothstep(0.88, 0.10, vGyrus);
        float capillaryFine = smoothstep(0.068, 0.01, vNoiseB) * smoothstep(0.95, 0.26, vGyrus) * 0.58;
        float vesselMask = clamp(capillarySulcus + capillaryFine, 0.0, 1.0);

        // Fresh biological hydrated tissue palette
        vec3 freshSulcus = vec3(0.11, 0.032, 0.032);
        vec3 freshWall = vec3(0.54, 0.28, 0.25);
        vec3 freshCrown = vec3(0.75, 0.51, 0.46);
        float crownMix = smoothstep(0.06, 0.72, vGyrus);
        vec3 freshCol = mix(freshSulcus, freshWall, smoothstep(0.02, 0.36, vGyrus));
        freshCol = mix(freshCol, freshCrown, smoothstep(0.32, 0.88, vGyrus));
        freshCol += vec3(0.025, 0.012, 0.010) * micro1 + vec3(0.014) * pore;

        // Apply pial venous/arterial tints inside sulci and fine cortical capillaries
        vec3 veinCol = vec3(0.16, 0.035, 0.065);
        vec3 artCol = vec3(0.45, 0.08, 0.085);
        vec3 vesselCol = mix(veinCol, artCol, smoothstep(0.25, 0.75, vGyrus));
        freshCol = mix(freshCol, vesselCol, vesselMask * 0.68);

        // Formalin fixed museum specimen palette (matches anatomical reference plates)
        vec3 fixedSulcus = vec3(0.095, 0.068, 0.052);
        vec3 fixedWall = vec3(0.52, 0.44, 0.36);
        vec3 fixedCrown = vec3(0.73, 0.65, 0.55);
        vec3 fixedCol = mix(fixedSulcus, fixedWall, smoothstep(0.02, 0.36, vGyrus));
        fixedCol = mix(fixedCol, fixedCrown, smoothstep(0.32, 0.88, vGyrus));
        fixedCol += vec3(0.022) * micro1 + vec3(0.012) * pore;
        fixedCol = mix(fixedCol, vec3(0.20, 0.14, 0.11), vesselMask * 0.35);

        // Anatomical Lobe Map palette (crisp per-fragment boundaries + sulcal AO)
        vec3 lobeBase = vec3(0.34, 0.52, 0.78); // 0: Frontal
        float lobeKnown = uLobeKnowledge.x;
        float lobeTemp = uLobeTemp.x;
        if (fragLobe > 0.5 && fragLobe < 1.5) {
          lobeBase = vec3(0.28, 0.62, 0.50); // 1: Parietal
          lobeKnown = uLobeKnowledge.y;
          lobeTemp = uLobeTemp.y;
        } else if (fragLobe >= 1.5 && fragLobe < 2.5) {
          lobeBase = vec3(0.74, 0.52, 0.28); // 2: Temporal
          lobeKnown = uLobeKnowledge.z;
          lobeTemp = uLobeTemp.z;
        } else if (fragLobe >= 2.5) {
          lobeBase = vec3(0.58, 0.38, 0.74); // 3: Occipital
          lobeKnown = uLobeKnowledge.w;
          lobeTemp = uLobeTemp.w;
        }

        vec3 lobeCol = mix(lobeBase * 0.16, lobeBase * 0.96, smoothstep(0.04, 0.78, vGyrus));
        lobeCol += vec3(0.02) * micro1;

        vec3 knowBase = knowledgeRamp(lobeKnown);
        vec3 knowCol = mix(knowBase * 0.16, knowBase * 0.95, smoothstep(0.04, 0.78, vGyrus)) + vec3(0.015) * micro1;

        vec3 tempBase = thermalRamp(lobeTemp);
        vec3 tempCol = mix(tempBase * 0.18, tempBase * 0.96, smoothstep(0.04, 0.78, vGyrus)) + vec3(0.015) * micro1;

        vec3 tissueCol = freshCol;
        if (uFinishMode > 0.5 && uFinishMode < 1.5) {
          tissueCol = fixedCol;
        } else if (uFinishMode >= 1.5 && uFinishMode < 2.5) {
          tissueCol = lobeCol;
        } else if (uFinishMode >= 2.5 && uFinishMode < 3.5) {
          tissueCol = knowCol;
        } else if (uFinishMode >= 3.5) {
          tissueCol = tempCol;
        }

        // Crisp sulcal ambient occlusion darkening in crevices & primary fissures
        float ao = mix(0.28, 1.0, smoothstep(0.03, 0.52, vGyrus));
        ao *= mix(1.0, 0.52, vPrimarySulcus * (1.0 - crownMix));
        tissueCol *= ao;

        // Glass MRI mode tint
        vec3 glassCol = mix(vec3(0.38, 0.56, 0.70), vec3(0.68, 0.82, 0.92), vGyrus);
        diffuseColor.rgb *= mix(tissueCol, glassCol, uGlassMode);

        // Subtle lobe/cortex selection & hover accent
        float isSelected = (uHighlightLobe > 3.5)
          ? 1.0
          : (uHighlightLobe >= -0.5 ? step(abs(fragLobe - uHighlightLobe), 0.25) : 0.0);
        float isHovered = (uHoverLobe >= -0.5) ? step(abs(fragLobe - uHoverLobe), 0.25) : 0.0;
        if (isSelected > 0.5) {
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.95, 0.78, 0.68), 0.18);
        } else if (isHovered > 0.5) {
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.82, 0.91, 1.0), 0.13);
        }
      `,
      )
      .replace(
        '#include <roughnessmap_fragment>',
        /* glsl */ `
        #include <roughnessmap_fragment>
        // Gyral crowns are smoother/wetter (hydrated pia), sulci rougher
        roughnessFactor = mix(0.72, 0.30, smoothstep(0.1, 0.85, vGyrus));
        roughnessFactor += vnoise3(vObjPos * 24.0) * 0.05;
        roughnessFactor = clamp(roughnessFactor, 0.22, 0.86);
      `,
      )
      .replace(
        '#include <normal_fragment_maps>',
        /* glsl */ `
        #include <normal_fragment_maps>
        // Analytical 3D object-space micro-gyri & pial tissue normal perturbation (zero UV seam)
        vec3 gradFine = vnoise3Grad(vObjPos * 18.0) * 0.055;
        vec3 gradMicro = vnoise3Grad(vObjPos * 42.0) * 0.025;
        vec3 objBump = (gradFine + gradMicro) * (0.45 + 0.55 * vGyrus);
        vec3 viewBump = normalize(vNMat0 * objBump.x + vNMat1 * objBump.y + vNMat2 * objBump.z);
        // Project onto tangent plane of current normal
        vec3 tangentPerturb = viewBump - normal * dot(normal, viewBump);
        normal = normalize(normal - tangentPerturb * 0.22 * (1.0 - uGlassMode * 0.6));
      `,
      )
      .replace(
        '#include <emissivemap_fragment>',
        /* glsl */ `
        #include <emissivemap_fragment>
        // Biological subsurface wrap scatter & Fresnel pial rim glow
        vec3 viewDirFrag = normalize(vViewPosition);
        float fresnel = pow(1.0 - clamp(dot(normal, viewDirFrag), 0.0, 1.0), 3.0);
        vec3 sssTint = (uFinishMode > 0.5 && uFinishMode < 1.5)
          ? vec3(0.22, 0.16, 0.12)
          : vec3(0.36, 0.09, 0.08);
        totalEmissiveRadiance += sssTint * (0.03 + 0.12 * vGyrus) * fresnel * (1.0 - uGlassMode);

        float lobeHere = classifyLobeFrag(vObjPos);
        float selRim = (uHighlightLobe > 3.5)
          ? 1.0
          : (uHighlightLobe >= -0.5 ? step(abs(lobeHere - uHighlightLobe), 0.25) : 0.0);
        float hovRim = (uHoverLobe >= -0.5) ? step(abs(lobeHere - uHoverLobe), 0.25) : 0.0;
        totalEmissiveRadiance += vec3(0.32, 0.50, 0.76) * fresnel * (0.45 * selRim + 0.30 * hovRim);
      `,
      );
  };

  return material;
}

export function createCerebellumMaterial(
  sharedUniforms: CortexUniforms,
  subUniforms: SubcorticalUniforms,
): THREE.MeshPhysicalMaterial {
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.46,
    metalness: 0.0,
    clearcoat: 0.80,
    clearcoatRoughness: 0.18,
    sheen: 0.24,
    sheenColor: new THREE.Color('#dba89d'),
    envMapIntensity: 0.95,
  });

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uFinishMode = sharedUniforms.uFinishMode;
    shader.uniforms.uHighlighted = subUniforms.uHighlighted;
    shader.uniforms.uHovered = subUniforms.uHovered;
    shader.uniforms.uEpistemicTint = subUniforms.uEpistemicTint;
    shader.uniforms.uEpistemicBlend = subUniforms.uEpistemicBlend;

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        /* glsl */ `
        #include <common>
        attribute float aFolia;
        varying float vFolia;
        varying vec3 vObjPos;
        varying vec3 vNMat0;
        varying vec3 vNMat1;
        varying vec3 vNMat2;
      `,
      )
      .replace(
        '#include <begin_vertex>',
        /* glsl */ `
        #include <begin_vertex>
        vFolia = aFolia;
        vObjPos = position;
        vNMat0 = normalMatrix[0];
        vNMat1 = normalMatrix[1];
        vNMat2 = normalMatrix[2];
      `,
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        /* glsl */ `
        #include <common>
        uniform float uFinishMode;
        uniform float uHighlighted;
        uniform float uHovered;
        uniform vec3 uEpistemicTint;
        uniform float uEpistemicBlend;
        varying float vFolia;
        varying vec3 vObjPos;
        varying vec3 vNMat0;
        varying vec3 vNMat1;
        varying vec3 vNMat2;
        ${GLSL_NOISE_CHUNK}
      `,
      )
      .replace(
        '#include <color_fragment>',
        /* glsl */ `
        #include <color_fragment>
        // Dense parallel cerebellar folia ridges
        float foliaWave = sin((vObjPos.y * 168.0 + vObjPos.z * 34.0) + vnoise3(vObjPos * 11.0) * 1.6);
        float foliaCrease = smoothstep(-0.75, 0.35, foliaWave);
        float foliaCombined = mix(vFolia, foliaCrease, 0.62);

        vec3 freshCrease = vec3(0.14, 0.048, 0.046);
        vec3 freshRidge = vec3(0.68, 0.43, 0.38);
        vec3 fixedCrease = vec3(0.14, 0.105, 0.085);
        vec3 fixedRidge = vec3(0.66, 0.57, 0.48);

        vec3 colCrease = mix(freshCrease, fixedCrease, step(0.5, uFinishMode) * step(uFinishMode, 1.5));
        vec3 colRidge = mix(freshRidge, fixedRidge, step(0.5, uFinishMode) * step(uFinishMode, 1.5));
        if (uFinishMode > 1.5 && uFinishMode < 2.5) {
          colCrease = vec3(0.18, 0.09, 0.10);
          colRidge = vec3(0.72, 0.41, 0.37);
        }
        vec3 baseCol = mix(colCrease, colRidge, foliaCombined);
        vec3 epCol = mix(uEpistemicTint * 0.22, uEpistemicTint * 0.96, foliaCombined);
        diffuseColor.rgb *= mix(baseCol, epCol, uEpistemicBlend);
      `,
      )
      .replace(
        '#include <normal_fragment_maps>',
        /* glsl */ `
        #include <normal_fragment_maps>
        vec3 foliaGrad = vec3(0.0, cos(vObjPos.y * 168.0 + vObjPos.z * 34.0) * 0.42, 0.08);
        vec3 viewFolia = normalize(vNMat0 * foliaGrad.x + vNMat1 * foliaGrad.y + vNMat2 * foliaGrad.z);
        normal = normalize(normal - (viewFolia - normal * dot(normal, viewFolia)) * 0.30);
      `,
      )
      .replace(
        '#include <emissivemap_fragment>',
        /* glsl */ `
        #include <emissivemap_fragment>
        vec3 viewDirFrag = normalize(vViewPosition);
        float fresnel = pow(1.0 - clamp(dot(normal, viewDirFrag), 0.0, 1.0), 2.8);
        totalEmissiveRadiance += vec3(0.32, 0.10, 0.09) * fresnel * 0.14;
        totalEmissiveRadiance += vec3(0.35, 0.52, 0.78) * fresnel * (0.5 * uHighlighted + 0.34 * uHovered);
      `,
      );
  };

  return material;
}

export function createWhiteMatterMaterial(
  baseHex: string,
  striationAxis: 'transverse' | 'longitudinal',
  subUniforms: SubcorticalUniforms,
): THREE.MeshPhysicalMaterial {
  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(baseHex),
    roughness: 0.44,
    metalness: 0.0,
    clearcoat: 0.52,
    clearcoatRoughness: 0.25,
    sheen: 0.24,
    sheenColor: new THREE.Color('#f5e8d8'),
    envMapIntensity: 0.88,
  });

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uHighlighted = subUniforms.uHighlighted;
    shader.uniforms.uHovered = subUniforms.uHovered;
    shader.uniforms.uEpistemicTint = subUniforms.uEpistemicTint;
    shader.uniforms.uEpistemicBlend = subUniforms.uEpistemicBlend;
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        /* glsl */ `
        #include <common>
        varying vec3 vObjPos;
        varying vec3 vNMat0;
        varying vec3 vNMat1;
        varying vec3 vNMat2;
      `,
      )
      .replace(
        '#include <begin_vertex>',
        /* glsl */ `
        #include <begin_vertex>
        vObjPos = position;
        vNMat0 = normalMatrix[0];
        vNMat1 = normalMatrix[1];
        vNMat2 = normalMatrix[2];
      `,
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        /* glsl */ `
        #include <common>
        uniform float uHighlighted;
        uniform float uHovered;
        uniform vec3 uEpistemicTint;
        uniform float uEpistemicBlend;
        varying vec3 vObjPos;
        varying vec3 vNMat0;
        varying vec3 vNMat1;
        varying vec3 vNMat2;
        ${GLSL_NOISE_CHUNK}
      `,
      )
      .replace(
        '#include <color_fragment>',
        /* glsl */ `
        #include <color_fragment>
        float coord = ${
          striationAxis === 'transverse'
            ? 'vObjPos.y * 62.0 + vnoise3(vObjPos * 14.0) * 1.4'
            : 'vObjPos.x * 52.0 + vObjPos.z * 24.0 + vnoise3(vObjPos * 14.0) * 1.2'
        };
        float tract = 0.88 + 0.12 * sin(coord);
        float grain = 0.92 + 0.08 * vnoise3(vObjPos * 26.0);
        float deepTone = 0.92 + 0.08 * vnoise3(vObjPos * 8.0);
        diffuseColor.rgb = mix(diffuseColor.rgb, uEpistemicTint, uEpistemicBlend) * tract * grain * deepTone;
      `,
      )
      .replace(
        '#include <normal_fragment_maps>',
        /* glsl */ `
        #include <normal_fragment_maps>
        vec3 fiberGrad = vnoise3Grad(vObjPos * 22.0) * 0.035;
        vec3 tractWave = ${
          striationAxis === 'transverse'
            ? 'vec3(0.0, cos(vObjPos.y * 62.0) * 0.08, 0.0)'
            : 'vec3(cos(vObjPos.x * 52.0) * 0.07, 0.0, cos(vObjPos.z * 24.0) * 0.04)'
        };
        vec3 objBump = fiberGrad + tractWave;
        vec3 viewBump = normalize(vNMat0 * objBump.x + vNMat1 * objBump.y + vNMat2 * objBump.z);
        normal = normalize(normal - (viewBump - normal * dot(normal, viewBump)) * 0.22);
      `,
      )
      .replace(
        '#include <emissivemap_fragment>',
        /* glsl */ `
        #include <emissivemap_fragment>
        vec3 viewDirFrag = normalize(vViewPosition);
        float fresnel = pow(1.0 - clamp(dot(normal, viewDirFrag), 0.0, 1.0), 2.8);
        totalEmissiveRadiance += vec3(0.35, 0.52, 0.78) * fresnel * (0.55 * uHighlighted + 0.35 * uHovered);
      `,
      );
  };

  return material;
}

export function createSubcorticalMaterial(
  baseHex: string,
  subUniforms: SubcorticalUniforms,
  roughness = 0.44,
): THREE.MeshPhysicalMaterial {
  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(baseHex),
    roughness,
    metalness: 0.0,
    clearcoat: 0.46,
    clearcoatRoughness: 0.26,
    sheen: 0.24,
    sheenColor: new THREE.Color('#efd0c8'),
    envMapIntensity: 0.85,
  });

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uHighlighted = subUniforms.uHighlighted;
    shader.uniforms.uHovered = subUniforms.uHovered;
    shader.uniforms.uEpistemicTint = subUniforms.uEpistemicTint;
    shader.uniforms.uEpistemicBlend = subUniforms.uEpistemicBlend;
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        /* glsl */ `
        #include <common>
        varying vec3 vObjPos;
        varying vec3 vNMat0;
        varying vec3 vNMat1;
        varying vec3 vNMat2;
      `,
      )
      .replace(
        '#include <begin_vertex>',
        /* glsl */ `
        #include <begin_vertex>
        vObjPos = position;
        vNMat0 = normalMatrix[0];
        vNMat1 = normalMatrix[1];
        vNMat2 = normalMatrix[2];
      `,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        /* glsl */ `
        #include <common>
        uniform float uHighlighted;
        uniform float uHovered;
        uniform vec3 uEpistemicTint;
        uniform float uEpistemicBlend;
        varying vec3 vObjPos;
        varying vec3 vNMat0;
        varying vec3 vNMat1;
        varying vec3 vNMat2;
        ${GLSL_NOISE_CHUNK}
      `,
      )
      .replace(
        '#include <color_fragment>',
        /* glsl */ `
        #include <color_fragment>
        float m1 = vnoise3(vObjPos * 16.0);
        float m2 = vnoise3(vObjPos * 34.0);
        diffuseColor.rgb = mix(diffuseColor.rgb, uEpistemicTint, uEpistemicBlend) * (0.90 + 0.07 * m1 + 0.04 * m2);
      `,
      )
      .replace(
        '#include <normal_fragment_maps>',
        /* glsl */ `
        #include <normal_fragment_maps>
        vec3 objBump = vnoise3Grad(vObjPos * 20.0) * 0.04 + vnoise3Grad(vObjPos * 42.0) * 0.02;
        vec3 viewBump = normalize(vNMat0 * objBump.x + vNMat1 * objBump.y + vNMat2 * objBump.z);
        normal = normalize(normal - (viewBump - normal * dot(normal, viewBump)) * 0.18);
      `,
      )
      .replace(
        '#include <emissivemap_fragment>',
        /* glsl */ `
        #include <emissivemap_fragment>
        vec3 viewDirFrag = normalize(vViewPosition);
        float fresnel = pow(1.0 - clamp(dot(normal, viewDirFrag), 0.0, 1.0), 2.6);
        totalEmissiveRadiance += vec3(0.35, 0.52, 0.78) * fresnel * (0.6 * uHighlighted + 0.36 * uHovered);
      `,
      );
  };

  return material;
}

export function createVesselMaterial(
  baseHex: string,
  kind: 'artery' | 'vein' | 'sinus',
  subUniforms: SubcorticalUniforms,
): THREE.MeshPhysicalMaterial {
  const isSinus = kind === 'sinus';
  const isArtery = kind === 'artery';

  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(baseHex),
    roughness: isSinus ? 0.46 : isArtery ? 0.24 : 0.30,
    metalness: 0.0,
    clearcoat: isSinus ? 0.48 : isArtery ? 0.88 : 0.78,
    clearcoatRoughness: isSinus ? 0.28 : isArtery ? 0.12 : 0.16,
    sheen: isSinus ? 0.30 : 0.22,
    sheenColor: new THREE.Color(isArtery ? '#f5b8b8' : isSinus ? '#c2bce0' : '#b7a8e8'),
    envMapIntensity: isSinus ? 0.85 : 1.1,
  });

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uHighlighted = subUniforms.uHighlighted;
    shader.uniforms.uHovered = subUniforms.uHovered;
    shader.uniforms.uEpistemicTint = subUniforms.uEpistemicTint;
    shader.uniforms.uEpistemicBlend = subUniforms.uEpistemicBlend;
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        /* glsl */ `
        #include <common>
        varying vec3 vObjPos;
        varying vec3 vNMat0;
        varying vec3 vNMat1;
        varying vec3 vNMat2;
      `,
      )
      .replace(
        '#include <begin_vertex>',
        /* glsl */ `
        #include <begin_vertex>
        vObjPos = position;
        vNMat0 = normalMatrix[0];
        vNMat1 = normalMatrix[1];
        vNMat2 = normalMatrix[2];
      `,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        /* glsl */ `
        #include <common>
        uniform float uHighlighted;
        uniform float uHovered;
        uniform vec3 uEpistemicTint;
        uniform float uEpistemicBlend;
        varying vec3 vObjPos;
        varying vec3 vNMat0;
        varying vec3 vNMat1;
        varying vec3 vNMat2;
        ${GLSL_NOISE_CHUNK}
      `,
      )
      .replace(
        '#include <color_fragment>',
        /* glsl */ `
        #include <color_fragment>
        float m1 = vnoise3(vObjPos * 22.0);
        float band = 0.94 + 0.06 * sin((vObjPos.x + vObjPos.y + vObjPos.z) * 44.0 + m1 * 2.0);
        diffuseColor.rgb = mix(diffuseColor.rgb, uEpistemicTint, uEpistemicBlend) * band * (0.93 + 0.07 * m1);
        if (uHighlighted > 0.5) {
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(1.0, 0.86, 0.72), 0.32);
        } else if (uHovered > 0.5) {
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.88, 0.94, 1.0), 0.24);
        }
      `,
      )
      .replace(
        '#include <normal_fragment_maps>',
        /* glsl */ `
        #include <normal_fragment_maps>
        vec3 objBump = vnoise3Grad(vObjPos * 30.0) * 0.025;
        vec3 viewBump = normalize(vNMat0 * objBump.x + vNMat1 * objBump.y + vNMat2 * objBump.z);
        normal = normalize(normal - (viewBump - normal * dot(normal, viewBump)) * 0.14);
      `,
      )
      .replace(
        '#include <emissivemap_fragment>',
        /* glsl */ `
        #include <emissivemap_fragment>
        vec3 viewDirFrag = normalize(vViewPosition);
        float fresnel = pow(1.0 - clamp(dot(normal, viewDirFrag), 0.0, 1.0), 2.3);
        totalEmissiveRadiance += vec3(0.38, 0.62, 0.95) * fresnel * (0.78 * uHighlighted + 0.48 * uHovered);
        totalEmissiveRadiance += diffuseColor.rgb * (0.28 * uHighlighted + 0.16 * uHovered);
      `,
      );
  };

  return material;
}

export function createNerveMaterial(
  baseHex: string,
  subUniforms: SubcorticalUniforms,
): THREE.MeshPhysicalMaterial {
  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(baseHex),
    roughness: 0.34,
    metalness: 0.0,
    clearcoat: 0.60,
    clearcoatRoughness: 0.22,
    sheen: 0.48,
    sheenRoughness: 0.42,
    sheenColor: new THREE.Color('#fff4da'),
    envMapIntensity: 0.95,
  });

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uHighlighted = subUniforms.uHighlighted;
    shader.uniforms.uHovered = subUniforms.uHovered;
    shader.uniforms.uEpistemicTint = subUniforms.uEpistemicTint;
    shader.uniforms.uEpistemicBlend = subUniforms.uEpistemicBlend;
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        /* glsl */ `
        #include <common>
        varying vec3 vObjPos;
        varying vec3 vNMat0;
        varying vec3 vNMat1;
        varying vec3 vNMat2;
      `,
      )
      .replace(
        '#include <begin_vertex>',
        /* glsl */ `
        #include <begin_vertex>
        vObjPos = position;
        vNMat0 = normalMatrix[0];
        vNMat1 = normalMatrix[1];
        vNMat2 = normalMatrix[2];
      `,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        /* glsl */ `
        #include <common>
        uniform float uHighlighted;
        uniform float uHovered;
        uniform vec3 uEpistemicTint;
        uniform float uEpistemicBlend;
        varying vec3 vObjPos;
        varying vec3 vNMat0;
        varying vec3 vNMat1;
        varying vec3 vNMat2;
        ${GLSL_NOISE_CHUNK}
      `,
      )
      .replace(
        '#include <color_fragment>',
        /* glsl */ `
        #include <color_fragment>
        float m1 = vnoise3(vObjPos * 24.0);
        float fascicle = 0.91 + 0.09 * sin(vObjPos.z * 78.0 + vObjPos.x * 54.0 + m1 * 2.2);
        diffuseColor.rgb = mix(diffuseColor.rgb, uEpistemicTint, uEpistemicBlend) * fascicle * (0.94 + 0.06 * m1);
        if (uHighlighted > 0.5) {
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(1.0, 0.95, 0.78), 0.34);
        } else if (uHovered > 0.5) {
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.84, 0.93, 1.0), 0.25);
        }
      `,
      )
      .replace(
        '#include <normal_fragment_maps>',
        /* glsl */ `
        #include <normal_fragment_maps>
        vec3 fiberWave = vec3(cos(vObjPos.x * 68.0) * 0.06, cos(vObjPos.y * 68.0) * 0.04, cos(vObjPos.z * 78.0) * 0.05);
        vec3 objBump = vnoise3Grad(vObjPos * 28.0) * 0.025 + fiberWave;
        vec3 viewBump = normalize(vNMat0 * objBump.x + vNMat1 * objBump.y + vNMat2 * objBump.z);
        normal = normalize(normal - (viewBump - normal * dot(normal, viewBump)) * 0.18);
      `,
      )
      .replace(
        '#include <emissivemap_fragment>',
        /* glsl */ `
        #include <emissivemap_fragment>
        vec3 viewDirFrag = normalize(vViewPosition);
        float fresnel = pow(1.0 - clamp(dot(normal, viewDirFrag), 0.0, 1.0), 2.2);
        totalEmissiveRadiance += vec3(0.42, 0.68, 0.98) * fresnel * (0.78 * uHighlighted + 0.48 * uHovered);
        totalEmissiveRadiance += diffuseColor.rgb * (0.30 * uHighlighted + 0.18 * uHovered);
      `,
      );
  };

  return material;
}

