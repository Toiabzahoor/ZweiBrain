export type RegionId =
  | 'cerebral-cortex'
  | 'frontal-lobe'
  | 'parietal-lobe'
  | 'temporal-lobe'
  | 'occipital-lobe'
  | 'cerebellum'
  | 'brainstem'
  | 'corpus-callosum'
  | 'thalamus'
  | 'hypothalamus'
  | 'hippocampus'
  | 'ventricles'
  | 'vasculature'
  | 'vessel-circle-of-willis'
  | 'vessel-aca'
  | 'vessel-mca'
  | 'vessel-pca'
  | 'vessel-vertebrobasilar'
  | 'vessel-venous-sinuses'
  | 'vessel-cortical-veins'
  | 'cn-i-olfactory'
  | 'cn-ii-optic'
  | 'cn-iii-oculomotor'
  | 'cn-iv-trochlear'
  | 'cn-v-trigeminal'
  | 'cn-vi-abducens'
  | 'cn-vii-facial'
  | 'cn-viii-vestibulocochlear'
  | 'cn-ix-glossopharyngeal'
  | 'cn-x-vagus'
  | 'cn-xi-accessory'
  | 'cn-xii-hypoglossal'
  | 'nerve-cervical-spinal'
  | 'nerve-sympathetic-carotid'
  | 'nerve-parasympathetic-ganglia'
  | 'nerve-meningeal-dural'
  | 'spinal-cord-thoracic'
  | 'spinal-cord-lumbosacral'
  | 'nerve-cauda-equina'
  | 'nerve-phrenic'
  | 'nerve-brachial-plexus'
  | 'nerve-axillary'
  | 'nerve-musculocutaneous'
  | 'nerve-radial'
  | 'nerve-median'
  | 'nerve-ulnar'
  | 'nerve-intercostal'
  | 'nerve-lumbar-plexus'
  | 'nerve-femoral'
  | 'nerve-obturator'
  | 'nerve-sciatic'
  | 'nerve-tibial'
  | 'nerve-fibular-sural'
  | 'nerve-pudendal'
  | 'nerve-sympathetic-chain'
  | 'nerve-pelvic-splanchnic'
  | 'nerve-enteric-plexus';

export type ViewMode = 'intact' | 'glass' | 'split' | 'exploded';
export type TissueFinish = 'fresh' | 'fixed' | 'lobes' | 'knowledge' | 'temperature';
export type CameraPresetId =
  | 'lateral'
  | 'superior'
  | 'anterior'
  | 'inferior'
  | 'midsagittal'
  | 'whole-body';

export interface NerveEmbryologyMeta {
  emergenceGw: number;
  matureGw: number;
  carnegieStage: string;
  embryonicOrigin: string;
  myelinationOnset: string;
}

export interface BrainRegionInfo {
  id: RegionId;
  name: string;
  latinName: string;
  category:
    | 'Cortical'
    | 'Subcortical'
    | 'Hindbrain'
    | 'Vascular & CSF'
    | 'Blood Vessels'
    | 'Cranial Nerves'
    | 'Spinal & Autonomic Nerves';
  dimensionsMm: string;
  volumeCm3: string;
  swatchColor: string;
  landmarks: string[];
  summary: string;
  functions: string[];
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  recommendedViewMode?: ViewMode;
  embryology?: NerveEmbryologyMeta;
}

export interface CameraPreset {
  id: CameraPresetId;
  label: string;
  position: [number, number, number];
  target: [number, number, number];
}

export interface ReferencePlate {
  id: string;
  title: string;
  viewLabel: string;
  imageUrl: string;
  caption: string;
  structures: string[];
}

export const BRAIN_SCALE_MM_PER_UNIT = 70;

export function isVesselRegion(id: RegionId): boolean {
  return id === 'vasculature' || id.startsWith('vessel-');
}

export function isCranialNerveRegion(id: RegionId): boolean {
  return id.startsWith('cn-');
}

export function isPeripheralNerveRegion(id: RegionId): boolean {
  return id.startsWith('nerve-') || id.startsWith('spinal-cord-');
}

export function isBodyNerveRegion(id: RegionId): boolean {
  return (
    id.startsWith('spinal-cord-') ||
    (id.startsWith('nerve-') &&
      id !== 'nerve-cervical-spinal' &&
      id !== 'nerve-sympathetic-carotid' &&
      id !== 'nerve-parasympathetic-ganglia' &&
      id !== 'nerve-meningeal-dural')
  );
}

export function isNerveRegion(id: RegionId): boolean {
  return isCranialNerveRegion(id) || isPeripheralNerveRegion(id);
}

export const CAMERA_PRESETS: CameraPreset[] = [
  {
    id: 'lateral',
    label: 'Lateral',
    position: [-3.75, 0.38, 1.55],
    target: [0, -0.08, -0.02],
  },
  {
    id: 'superior',
    label: 'Superior',
    position: [0.01, 3.85, 0.25],
    target: [0, 0.12, 0],
  },
  {
    id: 'anterior',
    label: 'Anterior',
    position: [0, 0.26, 3.85],
    target: [0, -0.08, 0],
  },
  {
    id: 'inferior',
    label: 'Inferior',
    position: [0.01, -3.75, 0.65],
    target: [0, -0.05, -0.05],
  },
  {
    id: 'midsagittal',
    label: 'Midsagittal',
    position: [-3.95, 0.24, 0.12],
    target: [0, 0.14, -0.04],
  },
  {
    id: 'whole-body',
    label: 'Full Body',
    position: [0.0, -9.8, 36.0],
    target: [0, -10.4, -0.25],
  },
];

export const REFERENCE_PLATES: ReferencePlate[] = [
  {
    id: 'lateral-cortex',
    title: 'Left Lateral Cerebral Convexity',
    viewLabel: 'Lateral Specimen Plate',
    imageUrl: '/src/assets/images/ref_lateral_cortex_1794987440144.jpg',
    caption:
      'Hydrated lateral hemisphere highlighting the Sylvian fissure, central sulcus with motor/sensory strips, temporal gyri, cerebellar folia, and brainstem.',
    structures: [
      'Lateral Sulcus (Sylvian Fissure)',
      'Central Sulcus (of Rolando)',
      'Precentral & Postcentral Gyri',
      'Cerebellar Transverse Folia',
      'Pons & Medulla Oblongata',
    ],
  },
  {
    id: 'midsagittal-section',
    title: 'Midsagittal Hemisphere & Diencephalon',
    viewLabel: 'Sagittal Cross-Section',
    imageUrl: '/src/assets/images/ref_midsagittal_anatomy_1794987440895.jpg',
    caption:
      'Medial cross-section revealing the white-matter corpus callosum, cingulate gyrus, thalamus, hypothalamic funnel, brainstem, and cerebellar arbor vitae.',
    structures: [
      'Corpus Callosum (Genu, Body, Splenium)',
      'Cingulate Gyrus & Sulcus',
      'Thalamus & Interthalamic Adhesion',
      'Hypothalamus & Pituitary Stalk',
      'Cerebellar Arbor Vitae',
    ],
  },
  {
    id: 'basal-vasculature',
    title: 'Ventral Base & Cerebral Vasculature',
    viewLabel: 'Inferior Ventral Plate',
    imageUrl: '/src/assets/images/ref_basal_vasculature_1794987441642.jpg',
    caption:
      'Ventral aspect illustrating orbital frontal gyri, projecting temporal poles, optic chiasm, Circle of Willis arterial branches, pons, and cerebellar hemispheres.',
    structures: [
      'Orbital Frontal Gyri & Gyrus Rectus',
      'Temporal Poles',
      'Optic Chiasm',
      'Circle of Willis & MCA Branches',
      'Ventral Pons & Pyramids',
    ],
  },
];

export const BRAIN_REGIONS: Record<RegionId, BrainRegionInfo> = {
  'cerebral-cortex': {
    id: 'cerebral-cortex',
    name: 'Cerebral Cortex',
    latinName: 'Cortex cerebri',
    category: 'Cortical',
    dimensionsMm: '167 × 140 × 93 mm',
    volumeCm3: '1,130 cm³',
    swatchColor: '#d49d90',
    landmarks: [
      'Longitudinal Fissure',
      'Central Sulcus (of Rolando)',
      'Lateral Sulcus (Sylvian Fissure)',
      'Parieto-Occipital Sulcus',
    ],
    summary:
      'Highly folded outer gray-matter sheet (~2.5–4.0 mm thick) organized into continuous gyral ribbons and deep sulci, generating ~1,800 cm² of cortical surface area.',
    functions: [
      'Conscious perception & sensory integration',
      'Voluntary motor planning & execution',
      'Language, executive reasoning & episodic memory',
    ],
    cameraPosition: [-3.35, 0.42, 1.35],
    cameraTarget: [0, -0.02, -0.02],
  },
  'frontal-lobe': {
    id: 'frontal-lobe',
    name: 'Frontal Lobe',
    latinName: 'Lobus frontalis',
    category: 'Cortical',
    dimensionsMm: '78 × 98 × 72 mm',
    volumeCm3: '410 cm³',
    swatchColor: '#5b8fd9',
    landmarks: [
      'Precentral Gyrus (Primary Motor)',
      'Superior, Middle & Inferior Frontal Gyri',
      'Broca Area (Pars Opercularis / Triangularis)',
      'Orbital Frontal Cortex',
    ],
    summary:
      'Anterior third of each cerebral hemisphere extending from the frontal pole back to the central sulcus and resting inferiorly upon the orbital roof.',
    functions: [
      'Executive control, working memory & decision-making',
      'Voluntary movement via primary motor cortex (M1)',
      'Expressive speech production & social inhibition',
    ],
    cameraPosition: [-2.65, 0.45, 2.35],
    cameraTarget: [0, 0.12, 0.45],
  },
  'parietal-lobe': {
    id: 'parietal-lobe',
    name: 'Parietal Lobe',
    latinName: 'Lobus parietalis',
    category: 'Cortical',
    dimensionsMm: '66 × 136 × 58 mm',
    volumeCm3: '245 cm³',
    swatchColor: '#4da88b',
    landmarks: [
      'Postcentral Gyrus (Primary Somatosensory)',
      'Intraparietal Sulcus',
      'Supramarginal & Angular Gyri',
      'Precuneus (Medial Wall)',
    ],
    summary:
      'Superior-posterior cortical crown bounded anteriorly by the central sulcus and posteriorly by the parieto-occipital sulcus.',
    functions: [
      'Tactile, proprioceptive & nociceptive processing (S1)',
      'Visuospatial attention & coordinate transformations',
      'Numerical cognition & multisensory integration',
    ],
    cameraPosition: [-2.55, 1.95, -1.35],
    cameraTarget: [0, 0.35, -0.25],
  },
  'temporal-lobe': {
    id: 'temporal-lobe',
    name: 'Temporal Lobe',
    latinName: 'Lobus temporalis',
    category: 'Cortical',
    dimensionsMm: '84 × 138 × 46 mm',
    volumeCm3: '220 cm³',
    swatchColor: '#d69a4e',
    landmarks: [
      'Temporal Pole',
      'Superior, Middle & Inferior Temporal Gyri',
      'Heschl Transverse Gyrus (A1)',
      'Fusiform & Parahippocampal Gyri',
    ],
    summary:
      'Ventrolateral lobe tucked beneath the Sylvian fissure, projecting anteriorly into a rounded temporal pole and housing the medial hippocampal complex.',
    functions: [
      'Primary auditory reception & language comprehension',
      'Visual object & facial recognition',
      'Declarative memory encoding & emotional salience',
    ],
    cameraPosition: [-3.1, -0.35, 1.05],
    cameraTarget: [0, -0.18, 0.05],
  },
  'occipital-lobe': {
    id: 'occipital-lobe',
    name: 'Occipital Lobe',
    latinName: 'Lobus occipitalis',
    category: 'Cortical',
    dimensionsMm: '48 × 84 × 56 mm',
    volumeCm3: '130 cm³',
    swatchColor: '#a674d6',
    landmarks: [
      'Occipital Pole',
      'Calcarine Sulcus (Primary Visual V1)',
      'Cuneus & Lingual Gyrus',
      'Pre-occipital Notch',
    ],
    summary:
      'Posterior apex of the cerebrum resting on the tentorium cerebelli directly above the cerebellum, centered around the medial calcarine fissure.',
    functions: [
      'Primary visual cortex (V1 / striate cortex)',
      'Retinotopic edge, motion & color processing',
      'Dorsal ("where/how") & ventral ("what") visual streams',
    ],
    cameraPosition: [-2.25, 0.28, -2.65],
    cameraTarget: [0, 0.04, -0.55],
  },
  cerebellum: {
    id: 'cerebellum',
    name: 'Cerebellum',
    latinName: 'Cerebellum',
    category: 'Hindbrain',
    dimensionsMm: '58 × 104 × 52 mm',
    volumeCm3: '136 cm³',
    swatchColor: '#c97b6d',
    landmarks: [
      'Midline Vermis',
      'Bilateral Cerebellar Hemispheres',
      'Primary & Horizontal Fissures',
      'Transverse Folia & Arbor Vitae',
    ],
    summary:
      'Densely folded posterior cranial fossa structure nestled beneath the tentorial surface of the occipital lobes, containing more than half of all brain neurons.',
    functions: [
      'Motor timing, balance & postural coordination',
      'Error-driven motor adaptation & precision',
      'Cognitive sequencing & predictive processing',
    ],
    cameraPosition: [-2.4, -0.62, -1.95],
    cameraTarget: [0, -0.45, -0.52],
  },
  brainstem: {
    id: 'brainstem',
    name: 'Brainstem',
    latinName: 'Truncus encephali',
    category: 'Hindbrain',
    dimensionsMm: '72 × 30 × 26 mm',
    volumeCm3: '32 cm³',
    swatchColor: '#dfd2c0',
    landmarks: [
      'Midbrain (Cerebral Peduncles & Colliculi)',
      'Pons (Ventral Pontine Bulge)',
      'Medulla Oblongata (Pyramids & Olives)',
    ],
    summary:
      'Vital stalk linking the diencephalon to the spinal cord, composed sequentially of the midbrain, bulbous pons, and tapered medulla oblongata.',
    functions: [
      'Autonomic respiration, heart rate & blood pressure',
      'Cranial nerve nuclei (III–XII) & sleep-wake arousal',
      'Ascending sensory & descending corticospinal tracts',
    ],
    cameraPosition: [-2.15, -0.45, 1.45],
    cameraTarget: [0, -0.45, -0.14],
    recommendedViewMode: 'glass',
  },
  'corpus-callosum': {
    id: 'corpus-callosum',
    name: 'Corpus Callosum',
    latinName: 'Corpus callosum',
    category: 'Subcortical',
    dimensionsMm: '75 × 24 × 25 mm',
    volumeCm3: '16 cm³',
    swatchColor: '#f2e8da',
    landmarks: [
      'Rostrum (Anteroinferior taper)',
      'Genu (Anterior bend)',
      'Truncus / Body',
      'Splenium (Posterior bulb)',
    ],
    summary:
      'Largest white-matter commissural tract (~200–250 million myelinated axons) arching across the midline to link homologous cortical areas of both hemispheres.',
    functions: [
      'Rapid interhemispheric sensory & motor transfer',
      'Bilateral cognitive & attentional synchronization',
      'Roof of the lateral ventricles',
    ],
    cameraPosition: [-2.2, 0.18, 0.2],
    cameraTarget: [0, 0.14, 0.04],
    recommendedViewMode: 'split',
  },
  thalamus: {
    id: 'thalamus',
    name: 'Thalamus',
    latinName: 'Thalamus',
    category: 'Subcortical',
    dimensionsMm: '32 × 28 × 19 mm',
    volumeCm3: '15 cm³',
    swatchColor: '#c29086',
    landmarks: [
      'Paired Ovoid Dorsal Nuclei',
      'Interthalamic Adhesion (Massa Intermedia)',
      'Pulvinar & Geniculate Bodies',
    ],
    summary:
      'Paired egg-shaped diencephalic gray-matter nuclei flanking the third ventricle, acting as the central relay hub for nearly all sensory and motor pathways.',
    functions: [
      'Gating sensory input (except olfaction) to cortex',
      'Cortico-thalamo-cortical oscillatory rhythm control',
      'Conscious awareness & selective attention filtering',
    ],
    cameraPosition: [-1.85, 0.08, 0.35],
    cameraTarget: [0, -0.02, -0.04],
    recommendedViewMode: 'glass',
  },
  hypothalamus: {
    id: 'hypothalamus',
    name: 'Hypothalamus & Pituitary',
    latinName: 'Hypothalamus et hypophysis',
    category: 'Subcortical',
    dimensionsMm: '22 × 16 × 18 mm',
    volumeCm3: '4.2 cm³',
    swatchColor: '#d97a73',
    landmarks: [
      'Optic Chiasm (Anterior border)',
      'Infundibular Stalk & Pituitary Gland',
      'Paired Mammillary Bodies',
    ],
    summary:
      'Anteroinferior diencephalic floor funneling down to the pituitary gland via the infundibulum, anchored posteriorly by the mammillary bodies.',
    functions: [
      'Homeostatic thermoregulation, hunger & thirst',
      'Circadian rhythm pacing (suprachiasmatic nucleus)',
      'Neuroendocrine control of the pituitary axis',
    ],
    cameraPosition: [-1.75, -0.22, 0.95],
    cameraTarget: [0, -0.24, 0.12],
    recommendedViewMode: 'glass',
  },
  hippocampus: {
    id: 'hippocampus',
    name: 'Hippocampus & Fornix',
    latinName: 'Hippocampus et fornix',
    category: 'Subcortical',
    dimensionsMm: '44 × 24 × 18 mm',
    volumeCm3: '7.6 cm³',
    swatchColor: '#dfb476',
    landmarks: [
      'Hippocampal Head (Pes Hippocampi) & Amygdala',
      'Hippocampal Body & Tail',
      'Crus, Body & Columns of the Fornix',
    ],
    summary:
      'Curved seahorse-shaped medial temporal limbic structure sweeping into the arched fornix tract beneath the corpus callosum toward the mammillary bodies.',
    functions: [
      'Consolidation of episodic & declarative memories',
      'Spatial navigation & cognitive map representation',
      'Limbic-emotional coupling via adjacent amygdala',
    ],
    cameraPosition: [-2.15, -0.05, 0.48],
    cameraTarget: [0, -0.1, 0.02],
    recommendedViewMode: 'glass',
  },
  ventricles: {
    id: 'ventricles',
    name: 'Ventricular System',
    latinName: 'Systema ventriculare',
    category: 'Vascular & CSF',
    dimensionsMm: '92 × 48 × 54 mm',
    volumeCm3: '26 cm³',
    swatchColor: '#76b9d8',
    landmarks: [
      'Lateral Ventricles (Frontal, Occipital, Temporal Horns)',
      'Interventricular Foramina of Monro',
      'Third Ventricle, Cerebral Aqueduct & Fourth Ventricle',
    ],
    summary:
      'Interconnected C-shaped CSF cavities lined by ependyma and choroid plexus, providing mechanical buoyancy and metabolic clearance.',
    functions: [
      'Cerebrospinal fluid (CSF) production & circulation',
      'Hydraulic cushioning reducing effective brain weight',
      'Glymphatic waste transport',
    ],
    cameraPosition: [-2.35, 0.25, 0.85],
    cameraTarget: [0, 0.02, -0.04],
    recommendedViewMode: 'glass',
  },
  vasculature: {
    id: 'vasculature',
    name: 'Cerebral Pial Vasculature',
    latinName: 'Vasa cerebri',
    category: 'Blood Vessels',
    dimensionsMm: 'Circle of Willis & MCA',
    volumeCm3: '~150 mL blood vol.',
    swatchColor: '#c94343',
    landmarks: [
      'Circle of Willis (Basal Anastomosis)',
      'Middle Cerebral Artery (Sylvian Branches)',
      'Superior Sagittal Sinus & Bridging Veins',
    ],
    summary:
      'Dense arterial and venous network traveling within the subarachnoid space and sulcal cisterns, delivering ~20% of total cardiac output.',
    functions: [
      'Continuous oxygenated perfusion (~750 mL/min)',
      'Collateral redundancy via the Circle of Willis',
      'Venous drainage toward dural venous sinuses',
    ],
    cameraPosition: [-2.95, 0.1, 1.45],
    cameraTarget: [0, -0.05, 0.08],
  },

  // --- Named Cerebral Blood Vessels ---
  'vessel-circle-of-willis': {
    id: 'vessel-circle-of-willis',
    name: 'Circle of Willis & Internal Carotid (ICA)',
    latinName: 'Circulus arteriosus cerebri',
    category: 'Blood Vessels',
    dimensionsMm: 'ICA Ø 3.5–4.5 mm · PCom/ACom Ø 1–2 mm',
    volumeCm3: 'Basal anastomotic ring',
    swatchColor: '#c42b33',
    landmarks: [
      'Supraclinoid Internal Carotid Arteries (ICA)',
      'Anterior Communicating Artery (ACom)',
      'Posterior Communicating Arteries (PCom)',
      'Lenticulostriate Perforating Arterioles',
    ],
    summary:
      'Polygonal arterial anastomosis encircling the optic chiasm and pituitary stalk at the brain base, linking anterior carotid and posterior vertebrobasilar circulations.',
    functions: [
      'Interhemispheric & anteroposterior collateral flow',
      'Direct basal ganglia supply via lenticulostriate perforators',
      'Pressure dampening before distal cortical branching',
    ],
    cameraPosition: [0.05, -2.55, 0.95],
    cameraTarget: [0, -0.22, 0.08],
    recommendedViewMode: 'glass',
  },
  'vessel-aca': {
    id: 'vessel-aca',
    name: 'Anterior Cerebral Artery (ACA)',
    latinName: 'Arteria cerebri anterior',
    category: 'Blood Vessels',
    dimensionsMm: 'A1 Ø 2.0–2.5 mm · Pericallosal Ø 1.6 mm',
    volumeCm3: '~18% cortical CBF',
    swatchColor: '#d4363d',
    landmarks: [
      'A1 Horizontal Precommunicating Segment',
      'A2–A4 Pericallosal Artery (along Corpus Callosum)',
      'Callosomarginal Artery (Cingulate Sulcus)',
      'Recurrent Artery of Heubner',
    ],
    summary:
      'Medial terminal branch of the internal carotid artery curving around the genu and body of the corpus callosum to supply medial frontal and parietal cortices.',
    functions: [
      'Perfuses medial motor/sensory leg & foot cortex',
      'Supplies corpus callosum, cingulate & orbital gyri',
      'Supplies anterior limb of internal capsule (Heubner)',
    ],
    cameraPosition: [-2.65, 0.25, 0.35],
    cameraTarget: [0, 0.16, 0.15],
  },
  'vessel-mca': {
    id: 'vessel-mca',
    name: 'Middle Cerebral Artery (MCA)',
    latinName: 'Arteria cerebri media',
    category: 'Blood Vessels',
    dimensionsMm: 'M1 Ø 2.8–3.4 mm · M4 Ø 0.9–1.4 mm',
    volumeCm3: '~45% hemispheric CBF',
    swatchColor: '#bf262d',
    landmarks: [
      'M1 Sphenoidal Trunk & Lenticulostriate Perforators',
      'M2 Insular Bifurcation / Trifurcation',
      'M3 Opercular Loops (Sylvian Fissure)',
      'M4 Cortical Convexity Branches (Precentral, Angular)',
    ],
    summary:
      'Largest cerebral artery continuing directly from the internal carotid through the Sylvian fissure to fan out across the lateral frontal, parietal, and temporal convexities.',
    functions: [
      'Perfuses primary motor/sensory face, hand & arm strips',
      'Supplies Broca & Wernicke perisylvian language networks',
      'Feeds insular cortex & deep striatal nuclei',
    ],
    cameraPosition: [-3.25, 0.15, 0.95],
    cameraTarget: [-0.35, -0.02, 0.05],
  },
  'vessel-pca': {
    id: 'vessel-pca',
    name: 'Posterior Cerebral Artery (PCA)',
    latinName: 'Arteria cerebri posterior',
    category: 'Blood Vessels',
    dimensionsMm: 'P1–P2 Ø 2.0–2.4 mm · Calcarine Ø 1.3 mm',
    volumeCm3: '~15% hemispheric CBF',
    swatchColor: '#ad232a',
    landmarks: [
      'P1 Precommunicating Segment (Interpeduncular)',
      'P2 Ambient Cistern Segment (around Midbrain)',
      'P3–P4 Calcarine & Parieto-Occipital Branches',
      'Thalamoperforating & Posterior Choroidal Arteries',
    ],
    summary:
      'Terminal bifurcation of the basilar artery wrapping around the midbrain peduncles to supply the occipital visual cortex, inferior temporal lobe, thalamus, and splenium.',
    functions: [
      'Perfuses primary visual cortex (V1) along calcarine sulcus',
      'Supplies thalamus, lateral geniculate & midbrain tectum',
      'Perfuses hippocampus & inferior temporal fusiform gyri',
    ],
    cameraPosition: [-2.45, -0.25, -2.05],
    cameraTarget: [0, -0.15, -0.45],
  },
  'vessel-vertebrobasilar': {
    id: 'vessel-vertebrobasilar',
    name: 'Vertebrobasilar & Cerebellar Arteries',
    latinName: 'Systema vertebrobasilare (VA, BA, SCA, AICA, PICA)',
    category: 'Blood Vessels',
    dimensionsMm: 'Basilar Ø 3.2–3.8 mm · VA Ø 2.8–3.5 mm',
    volumeCm3: '~20% total CBF (posterior)',
    swatchColor: '#9e1c24',
    landmarks: [
      'Intradural Vertebral Arteries (VA)',
      'Midline Basilar Artery (Pontine Sulcus)',
      'Superior Cerebellar Arteries (SCA, cradling CN III)',
      'Anterior & Posterior Inferior Cerebellar Arteries (AICA, PICA)',
    ],
    summary:
      'Posterior arterial axis formed by paired vertebral arteries uniting into the midline basilar trunk, giving rise to pontine perforators and the three paired cerebellar arteries.',
    functions: [
      'Perfuses medulla, pons, midbrain & cranial nerve nuclei',
      'Supplies entire cerebellum via SCA, AICA & PICA',
      'Feeds labyrinthine inner ear via AICA',
    ],
    cameraPosition: [0.05, -2.55, 1.35],
    cameraTarget: [0, -0.58, -0.18],
  },
  'vessel-venous-sinuses': {
    id: 'vessel-venous-sinuses',
    name: 'Dural Venous Sinuses & Vein of Galen',
    latinName: 'Sinus durae matris et vena cerebri magna',
    category: 'Blood Vessels',
    dimensionsMm: 'SSS Ø 5–9 mm · Transverse Ø 5–8 mm',
    volumeCm3: 'Primary cranial venous outflow',
    swatchColor: '#483b82',
    landmarks: [
      'Superior Sagittal Sinus (SSS) & Torcular Herophili',
      'Inferior Sagittal & Straight Sinuses',
      'Internal Cerebral Veins, Basal Vein of Rosenthal & Vein of Galen',
      'Transverse & Sigmoid Sinuses (to Internal Jugular)',
    ],
    summary:
      'Valveless endothelium-lined dural channels and deep midline veins collecting ~750 mL/min of cerebral venous blood and arachnoid-granulation CSF outflow.',
    functions: [
      'Primary convective export of 88–91% of brain metabolic heat',
      'CSF absorption into venous blood via arachnoid granulations',
      'Meningeal lymphatic conduit lining dural sinuses',
    ],
    cameraPosition: [-2.95, 1.45, -1.35],
    cameraTarget: [0, 0.25, -0.15],
  },
  'vessel-cortical-veins': {
    id: 'vessel-cortical-veins',
    name: 'Cortical Bridging Veins (Trolard & Labbé)',
    latinName: 'Venae anastomoticae superior et inferior',
    category: 'Blood Vessels',
    dimensionsMm: 'Trolard Ø 2.0–3.2 mm · Labbé Ø 1.8–2.8 mm',
    volumeCm3: 'Superficial cortical drainage',
    swatchColor: '#584499',
    landmarks: [
      'Superior Anastomotic Vein of Trolard',
      'Inferior Anastomotic Vein of Labbé',
      'Superficial Middle Cerebral Vein (Sylvian)',
      'Prefrontal & Central Cortical Bridging Veins',
    ],
    summary:
      'Superficial cortical venous network draping across the pial gyri to bridge the Sylvian vein upward to the Superior Sagittal Sinus (Trolard) and downward to the Transverse Sinus (Labbé).',
    functions: [
      'Drains lateral frontal, parietal & temporal cortex',
      'Provides bidirectional collateral drainage around Sylvian fissure',
      'Critical neurosurgical preservation landmarks',
    ],
    cameraPosition: [-3.25, 0.55, -0.55],
    cameraTarget: [-0.35, 0.15, -0.15],
  },

  // --- 12 Cranial Nerves (CN I–XII) ---
  'cn-i-olfactory': {
    id: 'cn-i-olfactory',
    name: 'CN I · Olfactory Nerve & Bulb',
    latinName: 'Nervus olfactorius (I)',
    category: 'Cranial Nerves',
    dimensionsMm: 'Bulb 11 × 4.5 mm · Tract L ~25 mm',
    volumeCm3: 'Cribriform plate (Ethmoid)',
    swatchColor: '#e6d3a3',
    landmarks: [
      'Olfactory Bulb (Ventral Orbital Sulcus)',
      'Olfactory Tract (Gyrus Rectus Lateral Margin)',
      'Medial & Lateral Olfactory Striae',
    ],
    summary:
      'Forebrain chemosensory outgrowth lying in the olfactory sulcus beneath the orbital frontal cortex, projecting directly to piriform cortex and amygdala without thalamic relay.',
    functions: [
      'Special visceral afferent sense of smell (olfaction)',
      'Direct limbic-amygdalar & entorhinal coupling',
      'Adult subventricular/olfactory neuroblast target in mammals',
    ],
    cameraPosition: [0.05, -2.15, 1.55],
    cameraTarget: [0, -0.22, 0.45],
    embryology: {
      emergenceGw: 6.0,
      matureGw: 9.0,
      carnegieStage: 'CS 16–22 (days 37–54)',
      embryonicOrigin: 'Olfactory nasal placode & ventral telencephalic bulb induction (olfactory ensheathing glia)',
      myelinationOnset: 'Unmyelinated olfactory fila (ensheathing glia); olfactory tract axons myelinate postnatally (~2–8 mo)',
    },
  },
  'cn-ii-optic': {
    id: 'cn-ii-optic',
    name: 'CN II · Optic Nerve, Chiasm & Tract',
    latinName: 'Nervus opticus et chiasma opticum (II)',
    category: 'Cranial Nerves',
    dimensionsMm: 'Ø 3.5–4.0 mm · ~1.0–1.2M axons',
    volumeCm3: 'Optic canal (Sphenoid)',
    swatchColor: '#efe2be',
    landmarks: [
      'Intracranial Optic Nerve',
      'Optic Chiasm (Nasal Hemiretina Decussation)',
      'Optic Tract (to Lateral Geniculate Nucleus)',
    ],
    summary:
      'Central nervous system diencephalic tract myelinated by oligodendrocytes (not Schwann cells), conveying retinal ganglion axons through the chiasm to the thalamic LGN.',
    functions: [
      'Special somatic afferent visual transmission',
      'Hemiretinal decussation for binocular visual fields',
      'Pupillary light reflex & circadian SCN entrainment',
    ],
    cameraPosition: [0.05, -2.15, 1.15],
    cameraTarget: [0, -0.18, 0.16],
    embryology: {
      emergenceGw: 5.0,
      matureGw: 8.5,
      carnegieStage: 'CS 14–21 (days 32–52)',
      embryonicOrigin: 'Diencephalic optic stalk neuroectoderm; retinal ganglion axons invade stalk by CS 15',
      myelinationOnset: 'Central oligodendrocytes (~GW28–32 retrobulbar -> lamina cribrosa complete ~4–6 mo postnatal)',
    },
  },
  'cn-iii-oculomotor': {
    id: 'cn-iii-oculomotor',
    name: 'CN III · Oculomotor Nerve',
    latinName: 'Nervus oculomotorius (III)',
    category: 'Cranial Nerves',
    dimensionsMm: 'Ø 1.8–2.4 mm · Interpeduncular exit',
    volumeCm3: 'Superior orbital fissure',
    swatchColor: '#e8d7ae',
    landmarks: [
      'Interpeduncular Fossa Root Exit (Midbrain)',
      'Passage between PCA & Superior Cerebellar Artery',
      'Lateral Cavernous Sinus Wall',
    ],
    summary:
      'Somatic motor and parasympathetic nerve emerging anteriorly from the midbrain interpeduncular fossa directly between the PCA and SCA.',
    functions: [
      'Innervates 4 extraocular muscles (SR, IR, MR, IO) + levator palpebrae',
      'Parasympathetic pupillary constriction (Edinger–Westphal)',
      'Lens accommodation for near focus',
    ],
    cameraPosition: [-1.85, -1.85, 1.75],
    cameraTarget: [0, -0.22, 0.12],
    embryology: {
      emergenceGw: 4.0,
      matureGw: 6.5,
      carnegieStage: 'CS 12–17 (days 26–43)',
      embryonicOrigin: 'Ventral mesencephalic basal plate + Edinger–Westphal preganglionic visceromotor column',
      myelinationOnset: 'Late second trimester (~GW24–28; early extraocular fixation reflex maturation)',
    },
  },
  'cn-iv-trochlear': {
    id: 'cn-iv-trochlear',
    name: 'CN IV · Trochlear Nerve',
    latinName: 'Nervus trochlearis (IV)',
    category: 'Cranial Nerves',
    dimensionsMm: 'Ø 0.75–1.1 mm (slenderest CN)',
    volumeCm3: 'Superior orbital fissure',
    swatchColor: '#dfd0a8',
    landmarks: [
      'Dorsal Midbrain Exit (below Inferior Colliculus)',
      'Circum-mesencephalic Ambient Cistern Course',
      'Lateral Cavernous Sinus Wall',
    ],
    summary:
      'Smallest cranial nerve by axon count and the only nerve exiting the dorsal aspect of the brainstem, decussating fully before wrapping around the midbrain peduncle.',
    functions: [
      'Pure somatic motor control of superior oblique muscle',
      'Intorsion and depression of the adducted eye',
      'Longest intracranial cisternal trajectory of any CN',
    ],
    cameraPosition: [-2.05, -1.15, 1.35],
    cameraTarget: [0, -0.22, 0.02],
    embryology: {
      emergenceGw: 4.5,
      matureGw: 7.5,
      carnegieStage: 'CS 13–19 (days 28–48)',
      embryonicOrigin: 'Isthmic/rhombomere-1 basal plate decussating dorsally via superior medullary velum',
      myelinationOnset: 'Late second trimester (~GW25–30) by peripheral Schwann cells after short dorsal exit zone',
    },
  },
  'cn-v-trigeminal': {
    id: 'cn-v-trigeminal',
    name: 'CN V · Trigeminal Nerve & Ganglion',
    latinName: 'Nervus trigeminus (V)',
    category: 'Cranial Nerves',
    dimensionsMm: 'Root Ø 2.6–3.4 mm · Ganglion 15 mm',
    volumeCm3: 'V1 SOF · V2 Rotundum · V3 Ovale',
    swatchColor: '#f2e3bc',
    landmarks: [
      'Prepontine Root Entry Zone (Obersteiner–Redlich)',
      'Trigeminal (Gasserian) Ganglion in Meckel Cave',
      'Ophthalmic (V1), Maxillary (V2) & Mandibular (V3) Divisions',
    ],
    summary:
      'Largest mixed sensory-motor cranial nerve emerging from the mid-lateral pons, expanding into the semilunar Gasserian ganglion before trifurcating to the face and jaw.',
    functions: [
      'Facial, corneal, sinus & oral somatosensation (V1–V3)',
      'Motor innervation to muscles of mastication (V3)',
      'Afferent limb of corneal blink & jaw-jerk reflexes',
    ],
    cameraPosition: [-2.15, -1.45, 1.75],
    cameraTarget: [0, -0.36, 0.06],
    embryology: {
      emergenceGw: 4.0,
      matureGw: 6.8,
      carnegieStage: 'CS 12–18 (days 26–45)',
      embryonicOrigin: 'Rhombomeres 1–3 neural crest + trigeminal ectodermal placode (sensory) & r2/r3 motor root',
      myelinationOnset: 'Early prenatal (~GW16–22; first oral/perioral fetal suckling reflex pathway)',
    },
  },
  'cn-vi-abducens': {
    id: 'cn-vi-abducens',
    name: 'CN VI · Abducens Nerve',
    latinName: 'Nervus abducens (VI)',
    category: 'Cranial Nerves',
    dimensionsMm: 'Ø 1.1–1.5 mm · Dorello canal',
    volumeCm3: 'Superior orbital fissure',
    swatchColor: '#e5d4a8',
    landmarks: [
      'Medial Pontomedullary Junction Exit',
      'Steep Clival Ascent in Prepontine Cistern',
      'Dorello Canal & Intracavernous Course',
    ],
    summary:
      'Somatic motor nerve emerging medially at the pontomedullary sulcus and ascending steeply along the clivus into Dorello canal to reach the lateral rectus muscle.',
    functions: [
      'Eye abduction via lateral rectus muscle',
      'Coordinated horizontal conjugate gaze with CN III via MLF',
    ],
    cameraPosition: [0.05, -2.35, 1.65],
    cameraTarget: [0, -0.42, 0.05],
    embryology: {
      emergenceGw: 5.0,
      matureGw: 7.2,
      carnegieStage: 'CS 14–18 (days 32–45)',
      embryonicOrigin: 'Rhombomere 5 ventral somatic efferent column projecting to lateral rectus primordium',
      myelinationOnset: 'Late second trimester (~GW24–28; peripheral Schwann cell ensheathment)',
    },
  },
  'cn-vii-facial': {
    id: 'cn-vii-facial',
    name: 'CN VII · Facial Nerve',
    latinName: 'Nervus facialis (VII)',
    category: 'Cranial Nerves',
    dimensionsMm: 'Ø 1.4–1.8 mm · Cerebellopontine angle',
    volumeCm3: 'Internal acoustic meatus',
    swatchColor: '#ead9ae',
    landmarks: [
      'Cerebellopontine Angle (Medial to CN VIII)',
      'Nervus Intermedius (Parasympathetic & Taste)',
      'Internal Acoustic Meatus & Stylomastoid Foramen',
    ],
    summary:
      'Mixed branchiomotor, parasympathetic, and special-sensory nerve emerging at the lateral pontomedullary junction alongside CN VIII into the internal acoustic meatus.',
    functions: [
      'Muscles of facial expression & stapedius reflex',
      'Anterior two-thirds tongue taste (chorda tympani)',
      'Lacrimal, submandibular & sublingual secretomotor control',
    ],
    cameraPosition: [-2.15, -1.55, 1.35],
    cameraTarget: [0, -0.50, -0.10],
    embryology: {
      emergenceGw: 4.0,
      matureGw: 7.0,
      carnegieStage: 'CS 12–18 (days 26–45)',
      embryonicOrigin: 'Rhombomeres 4–5 (2nd pharyngeal arch motor) + geniculate epibranchial placode/neural crest',
      myelinationOnset: 'Mid-fetal (~GW18–24; intratemporal Schwann myelination finishes postnatally)',
    },
  },
  'cn-viii-vestibulocochlear': {
    id: 'cn-viii-vestibulocochlear',
    name: 'CN VIII · Vestibulocochlear Nerve',
    latinName: 'Nervus vestibulocochlearis (VIII)',
    category: 'Cranial Nerves',
    dimensionsMm: 'Ø 1.9–2.4 mm · Longest CNS myelin',
    volumeCm3: 'Internal acoustic meatus',
    swatchColor: '#f0e0b6',
    landmarks: [
      'Cerebellopontine Angle Root Entry Zone',
      'Vestibular & Cochlear Nerve Divisions',
      'Internal Acoustic Meatus',
    ],
    summary:
      'Special somatic sensory nerve entering the lateral pontomedullary junction with an unusually long (~10 mm) central glial segment before its Schwann-cell transition.',
    functions: [
      'Auditory transduction from spiral organ of Corti',
      'Angular & linear head acceleration (vestibular apparatus)',
      'Vestibulo-ocular reflex (VOR) gaze stabilization',
    ],
    cameraPosition: [-2.20, -1.55, 1.25],
    cameraTarget: [0, -0.52, -0.12],
    embryology: {
      emergenceGw: 5.5,
      matureGw: 8.5,
      carnegieStage: 'CS 14–21 (days 32–52)',
      embryonicOrigin: 'Otic placode delaminating vestibular & spiral ganglia splitting ~CS 17',
      myelinationOnset: 'Vestibular ~GW18–20; cochlear division ~GW20–24 (earliest fetal acoustic hearing onset)',
    },
  },
  'cn-ix-glossopharyngeal': {
    id: 'cn-ix-glossopharyngeal',
    name: 'CN IX · Glossopharyngeal Nerve',
    latinName: 'Nervus glossopharyngeus (IX)',
    category: 'Cranial Nerves',
    dimensionsMm: 'Ø 1.0–1.4 mm · Post-olivary sulcus',
    volumeCm3: 'Jugular foramen',
    swatchColor: '#e0cfa3',
    landmarks: [
      'Superior Post-Olivary Sulcus (Medulla)',
      'Superior Jugular Foramen Passage',
      'Carotid Sinus & Pharyngeal Plexus',
    ],
    summary:
      'Uppermost post-olivary medullary nerve exiting through the anterior compartment of the jugular foramen to innervate the pharynx, parotid, and carotid baroreceptors.',
    functions: [
      'Posterior third tongue taste & general sensation',
      'Carotid body chemoreceptor & sinus baroreceptor afferents',
      'Afferent limb of gag reflex & parotid secretomotor',
    ],
    cameraPosition: [-2.15, -1.65, 1.15],
    cameraTarget: [0, -0.62, -0.18],
    embryology: {
      emergenceGw: 4.0,
      matureGw: 6.5,
      carnegieStage: 'CS 12–17 (days 26–43)',
      embryonicOrigin: 'Rhombomere 6–7 (3rd pharyngeal arch) + petrosal/superior ganglia (neural crest & placode)',
      myelinationOnset: 'Mid-to-late second trimester (~GW20–26; swallowing & pharyngeal reflex readiness)',
    },
  },
  'cn-x-vagus': {
    id: 'cn-x-vagus',
    name: 'CN X · Vagus Nerve',
    latinName: 'Nervus vagus (X)',
    category: 'Cranial Nerves',
    dimensionsMm: 'Rootlets Ø 2.0 mm · CSA 1.9–2.1 mm²',
    volumeCm3: 'Jugular foramen',
    swatchColor: '#eddcaf',
    landmarks: [
      'Post-Olivary Medullary Rootlet Fan',
      'Jugular Foramen (Pars Vascularis)',
      'Carotid Sheath & Thoracoabdominal Parasympathetic Trunk',
    ],
    summary:
      'Longest cranial nerve emerging as 8–10 post-olivary medullary rootlets that coalesce through the jugular foramen to govern cardiopulmonary and visceral autonomic tone.',
    functions: [
      'Parasympathetic heart rate, airway & GI motility control',
      'Laryngeal phonation & pharyngeal swallowing motor',
      '~80% visceral afferent brain-body interoceptive signaling',
    ],
    cameraPosition: [-2.15, -1.70, 1.15],
    cameraTarget: [0, -0.68, -0.18],
    embryology: {
      emergenceGw: 4.0,
      matureGw: 6.5,
      carnegieStage: 'CS 12–17 (days 26–43)',
      embryonicOrigin: 'Rhombomere 7–8 (4th–6th pharyngeal arches) + nodose placode & jugular neural crest ganglia',
      myelinationOnset: 'Motor & A-fiber afferents myelinate ~GW22–40 (cardiorespiratory vagal control continues infant yr 1)',
    },
  },
  'cn-xi-accessory': {
    id: 'cn-xi-accessory',
    name: 'CN XI · Spinal Accessory Nerve',
    latinName: 'Nervus accessorius (XI)',
    category: 'Cranial Nerves',
    dimensionsMm: 'Ø 1.2–1.6 mm · C1–C5 ascending root',
    volumeCm3: 'Foramen magnum -> Jugular foramen',
    swatchColor: '#dfd0a5',
    landmarks: [
      'Cervical Spinal Rootlets (ascending via Foramen Magnum)',
      'Cranial Medullary Rootlets',
      'Jugular Foramen Exit',
    ],
    summary:
      'Unique motor nerve whose spinal rootlets originate in cervical segments C1–C5, ascend through the foramen magnum beside the medulla, and exit via the jugular foramen.',
    functions: [
      'Sternocleidomastoid head rotation & flexion',
      'Upper trapezius shoulder elevation & scapular stability',
    ],
    cameraPosition: [-2.15, -1.75, 0.95],
    cameraTarget: [0, -0.76, -0.24],
    embryology: {
      emergenceGw: 4.5,
      matureGw: 7.0,
      carnegieStage: 'CS 13–18 (days 28–45)',
      embryonicOrigin: 'Cervical spinal cord C1–C5 lateral ventral horn motor columns ascending dorsolateral to denticulate ligament',
      myelinationOnset: 'Mid-to-late gestation (~GW20–28; early head-turning & postural tone)',
    },
  },
  'cn-xii-hypoglossal': {
    id: 'cn-xii-hypoglossal',
    name: 'CN XII · Hypoglossal Nerve',
    latinName: 'Nervus hypoglossus (XII)',
    category: 'Cranial Nerves',
    dimensionsMm: 'Rootlets Ø 1.4–1.9 mm · Pre-olivary',
    volumeCm3: 'Hypoglossal canal',
    swatchColor: '#ecdbb0',
    landmarks: [
      'Pre-Olivary Sulcus Rootlets (between Pyramid & Olive)',
      'Vertebral Artery Cisternal Crossing',
      'Hypoglossal Canal (Occipital Condyle)',
    ],
    summary:
      'Pure somatic motor nerve emerging anteriorly as a vertical row of rootlets in the pre-olivary sulcus between the medullary pyramid and olivary eminence.',
    functions: [
      'Intrinsic and extrinsic tongue musculature control',
      'Articulation, bolus manipulation & airway patency',
    ],
    cameraPosition: [-1.95, -1.80, 1.25],
    cameraTarget: [0, -0.70, -0.15],
    embryology: {
      emergenceGw: 4.0,
      matureGw: 6.5,
      carnegieStage: 'CS 12–17 (days 26–43)',
      embryonicOrigin: 'Occipital somite hypoglossal motor column (rhombomere 8) projecting ventrally to tongue myotomes',
      myelinationOnset: 'Mid-gestation (~GW18–24; supporting fetal swallowing & neonatal suckling)',
    },
  },

  // --- Cervical Spinal, Autonomic & Meningeal Nerves ---
  'nerve-cervical-spinal': {
    id: 'nerve-cervical-spinal',
    name: 'Cervical Spinal Cord & Nerves (C1–C5)',
    latinName: 'Medulla spinalis cervicalis et nervi spinales C1–C5',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: 'Cord Ø 11–13 mm · C1–C5 Dorsal Root Ganglia',
    volumeCm3: 'Intervertebral foramina C1–C5',
    swatchColor: '#f3d9a4',
    landmarks: [
      'Upper Cervical Cord & Ventral/Dorsal Rootlets (C1–C5)',
      'Paired Dorsal Root Ganglia (DRG)',
      'Greater Occipital Nerve (C2 Dorsal Ramus)',
      'Phrenic Nerve Roots (C3–C5 Ventral Rami)',
    ],
    summary:
      'Rostral cervical spinal segments descending seamlessly below the foramen magnum, emitting segmented dorsal sensory (with DRGs) and ventral motor rootlets including the C2 occipital sensory and C3–C5 phrenic diaphragmatic trunks.',
    functions: [
      'Posterior scalp/occipital & neck somatosensation (C2–C4)',
      'Diaphragmatic respiratory motor drive via Phrenic nerve (C3–C5)',
      'Cervicomedullary pain & proprioceptive integration (Spinal trigeminal overlap)',
    ],
    cameraPosition: [-2.15, -1.55, 1.35],
    cameraTarget: [0, -1.04, -0.32],
    embryology: {
      emergenceGw: 4.0,
      matureGw: 6.8,
      carnegieStage: 'CS 11–18 (days 24–45)',
      embryonicOrigin: 'Cervical neural tube basal/alar plates + trunk neural crest (segmental DRGs condensing by CS 13)',
      myelinationOnset: 'Ventral motor roots ~GW16–20 ahead of dorsal sensory columns (~GW20–28)',
    },
  },
  'nerve-sympathetic-carotid': {
    id: 'nerve-sympathetic-carotid',
    name: 'Internal Carotid Sympathetic Plexus',
    latinName: 'Plexus caroticus internus (Sympathicus)',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: 'Postganglionic perivascular fibers (SCG -> ICA/CoW)',
    volumeCm3: 'Carotid canal & Cavernous sinus',
    swatchColor: '#eab676',
    landmarks: [
      'Superior Cervical Ganglion (T1–T2 preganglionic relay)',
      'Internal Carotid Nerve & Cavernous Sympathetic Plexus',
      'Deep Petrosal Nerve (joining Vidian canal)',
      'Perivascular CoW, ACA & MCA Adventitial Fibers',
    ],
    summary:
      'Unmyelinated postganglionic noradrenergic/NPY sympathetic plexus ascending from the superior cervical ganglion along the internal carotid artery to innervate the Circle of Willis and pial cerebral arteries.',
    functions: [
      'Vasoconstrictor buffering against acute cerebral perfusion pressure surges',
      'Ocular pupillary dilation (dilator pupillae) & superior tarsal (Müller) tone',
      'Pineal circadian melatonin drive & cranial sweat/vasomotor regulation',
    ],
    cameraPosition: [-1.85, -1.35, 1.45],
    cameraTarget: [0, -0.34, 0.14],
    recommendedViewMode: 'glass',
    embryology: {
      emergenceGw: 5.0,
      matureGw: 8.5,
      carnegieStage: 'CS 14–21 (days 32–52)',
      embryonicOrigin: 'Cervicothoracic neural crest sympathoadrenal progenitors migrating along dorsal aorta & ICA',
      myelinationOnset: 'Postganglionic fibers remain unmyelinated (Remak C-fibers); preganglionic T1–T2 B-fibers myelinate late fetal–postnatal',
    },
  },
  'nerve-parasympathetic-ganglia': {
    id: 'nerve-parasympathetic-ganglia',
    name: 'Cranial Parasympathetic Ganglia & Petrosals',
    latinName: 'Ganglia parasympathica capitis (Ciliare, Pterygopalatinum, Oticum, Submandibulare)',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: 'Ganglia 2–4 mm · Petrosal & Chorda Tympani rami',
    volumeCm3: 'Orbit, Pterygopalatine & Infratemporal fossae',
    swatchColor: '#a6d9c5',
    landmarks: [
      'Ciliary Ganglion (CN III postganglionic pupillary/ciliary relay)',
      'Pterygopalatine (Sphenopalatine) Ganglion & Greater Petrosal Nerve (CN VII)',
      'Otic Ganglion & Lesser Petrosal Nerve (CN IX)',
      'Submandibular Ganglion & Chorda Tympani (CN VII)',
    ],
    summary:
      'Four paired head parasympathetic relay ganglia suspended off CN V divisions, receiving preganglionic cholinergic input from CN III, CN VII, and CN IX to control pupil constriction, lacrimation, salivation, and cerebral pial vasodilation.',
    functions: [
      'Pupillary light constriction & lens accommodation (Ciliary ganglion)',
      'Lacrimal, nasal mucosa & pial/choroidal vasodilation (Pterygopalatine)',
      'Parotid (Otic) & submandibular/sublingual salivary secretion',
    ],
    cameraPosition: [-1.95, -1.15, 1.55],
    cameraTarget: [0, -0.38, 0.25],
    recommendedViewMode: 'glass',
    embryology: {
      emergenceGw: 6.0,
      matureGw: 9.0,
      carnegieStage: 'CS 16–22 (days 37–55)',
      embryonicOrigin: 'Cranial neural crest & nerve-associated Schwann cell precursors migrating along CN III, VII, and IX',
      myelinationOnset: 'Preganglionic B-fibers thinly myelinate late fetal; postganglionic secretomotor axons remain unmyelinated',
    },
  },
  'nerve-meningeal-dural': {
    id: 'nerve-meningeal-dural',
    name: 'Trigeminovascular & Dural Meningeal Nerves',
    latinName: 'Rami meningei durae matris (Nervus tentorii et vasa)',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: 'Recurrent Tentorial (Arnold) & MMA dural plexuses',
    volumeCm3: 'Falx, Tentorium, Venous Sinuses & Cranial Fossae',
    swatchColor: '#f0b89e',
    landmarks: [
      'Recurrent Tentorial Nerve of Arnold (from V1 Ophthalmic)',
      'Middle Meningeal Perivascular Plexus (V2/V3 Nervus Spinosus)',
      'Superior Sagittal, Straight & Transverse Sinus Afferents',
      'Posterior Fossa C1–C2 & CN X Meningeal Rami',
    ],
    summary:
      'Pain-sensitive nociceptive & peptidergic (CGRP/Substance P) trigeminovascular network arising primarily from CN V1–V3 (plus C1–C2 and CN X in the posterior fossa) that arborizes over the tentorium cerebelli, falx, and dural venous sinuses.',
    functions: [
      'Intracranial nociception & stretch sensing of dura and sinuses',
      'CGRP-mediated neurogenic vasodilation & migraine pathophysiology',
      'Meningeal immune–neurovascular crosstalk alongside dural lymphatics',
    ],
    cameraPosition: [-2.75, 0.25, -1.25],
    cameraTarget: [0, -0.05, -0.25],
    recommendedViewMode: 'glass',
    embryology: {
      emergenceGw: 7.5,
      matureGw: 14.0,
      carnegieStage: 'CS 20–early fetal (GW7.5–14)',
      embryonicOrigin: 'Trigeminal & upper cervical (C1–C2) neural crest afferents tracking dural vascular primordia',
      myelinationOnset: 'Mixed thinly myelinated Aδ mechanonociceptors (mid-to-late fetal) & unmyelinated peptidergic C-fibers',
    },
  },

  // --- Whole-Body Spinal Cord, Plexuses, Limb, Autonomic & Enteric Nervous System ---
  'spinal-cord-thoracic': {
    id: 'spinal-cord-thoracic',
    name: 'Thoracic Spinal Cord (T1–T12)',
    latinName: 'Pars thoracica medullae spinalis (T1–T12)',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: 'AP 6.5–7.5 mm · ML 8.0–9.5 mm · Length ~220 mm',
    volumeCm3: 'Vertebral canal T1–T9',
    swatchColor: '#f1d6a7',
    landmarks: [
      'Intermediolateral Cell Column (T1–L2 Sympathetic Origin)',
      'Dorsal & Ventral Horn Gray Columns + Clarke Nucleus',
      'Segmental T1–T12 Dorsal Root Ganglia & Ventral Roots',
    ],
    summary:
      'Slender thoracic segment of the central spinal cord housing the thoracolumbar sympathetic preganglionic columns, ascending dorsal columns, and corticospinal tracts.',
    functions: [
      'Thoracic trunk sensory relay & intercostal/abdominal motor control',
      'Preganglionic sympathetic outflow (T1–T12) to heart, lungs & viscera',
      'Long-tract highway linking brain with lumbosacral motor circuits',
    ],
    cameraPosition: [0.0, -4.3, 8.8],
    cameraTarget: [0, -4.4, -0.35],
    embryology: {
      emergenceGw: 4.0,
      matureGw: 7.5,
      carnegieStage: 'CS 10–19 (days 22–48)',
      embryonicOrigin: 'Thoracic neural tube alar (sensory), basal (motor), and intermediolateral autonomic plates',
      myelinationOnset: 'Propriospinal & ventral roots GW16–20; corticospinal tract late fetal through 2 yr',
    },
  },
  'spinal-cord-lumbosacral': {
    id: 'spinal-cord-lumbosacral',
    name: 'Lumbosacral Enlargement & Conus Medullaris',
    latinName: 'Intumescentia lumbosacralis et conus medullaris (L1–Co1)',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: 'ML ~11.5 mm enlargement -> tapered conus at L1–L2',
    volumeCm3: 'Vertebral levels T10–L1/L2',
    swatchColor: '#eed19c',
    landmarks: [
      'Lumbosacral Enlargement (L2–S3 Motor Neuron Pools)',
      'Conus Medullaris (adult mean termination lower L1)',
      'Sacral Parasympathetic Nucleus (S2–S4)',
    ],
    summary:
      'Expanded lower motor neuron pool supplying both lower limbs that tapers cleanly into the conus medullaris around the L1–L2 vertebral junction in adults.',
    functions: [
      'Lower-limb locomotor central pattern generators & motor pools',
      'Bladder, bowel & sexual sacral reflex integration (S2–S4)',
      'Ascending proprioceptive & nociceptive relay from pelvis and legs',
    ],
    cameraPosition: [0.0, -7.2, 8.2],
    cameraTarget: [0, -7.1, -0.32],
    embryology: {
      emergenceGw: 4.2,
      matureGw: 8.5,
      carnegieStage: 'CS 11–21 (secondary neurulation for caudal tip)',
      embryonicOrigin: 'Primary neural tube (lumbar) + caudal eminence secondary neurulation (sacral/coccygeal); conus ascends from S2 at GW16 to L1–L2 postnatally',
      myelinationOnset: 'Ventral lumbar roots ~GW18–22; corticospinal lumbar projection matures 0–2 yr',
    },
  },
  'nerve-cauda-equina': {
    id: 'nerve-cauda-equina',
    name: 'Cauda Equina & Filum Terminale',
    latinName: 'Cauda equina et filum terminale (L2–Co1)',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: '20 paired intrathecal roots · Length ~160–220 mm',
    volumeCm3: 'Lumbar cistern (L1/L2 -> S2)',
    swatchColor: '#f5e4be',
    landmarks: [
      'Intrathecal L2–S5 Dorsal & Ventral Nerve Roots in CSF',
      'Filum Terminale Internum & Externum (Coccygeal Anchor)',
      'Lumbar Subarachnoid Cistern',
    ],
    summary:
      'Bundle of descending lumbar, sacral, and coccygeal spinal nerve roots suspended in cerebrospinal fluid below the conus medullaris as vertebral growth outpaces spinal cord length.',
    functions: [
      'Conveys all L2–S5 motor and sensory signals to pelvic & lower-limb plexuses',
      'Carries S2–S4 pelvic parasympathetic & sphincter control roots',
    ],
    cameraPosition: [0.0, -8.7, 7.6],
    cameraTarget: [0, -8.5, -0.32],
    embryology: {
      emergenceGw: 6.0,
      matureGw: 16.0,
      carnegieStage: 'CS 16 -> fetal ascent (GW12–term)',
      embryonicOrigin: 'Differential vertebral column elongation pulls L2–Co1 roots caudally into an elongated intrathecal bundle',
      myelinationOnset: 'Peripheral Schwann myelination of intrathecal roots ~GW20–36',
    },
  },
  'nerve-phrenic': {
    id: 'nerve-phrenic',
    name: 'Phrenic Nerve (C3–C5)',
    latinName: 'Nervus phrenicus (C3–C5)',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: 'CSA 0.53–0.54 mm² at anterior scalene',
    volumeCm3: 'Neck -> Mediastinum -> Diaphragm',
    swatchColor: '#f2dba6',
    landmarks: [
      'C3–C5 Ventral Rami Convergence (chiefly C4)',
      'Anterior Scalene Muscle Surface Crossing',
      'Pericardiophrenic Mediastinal Descent to Diaphragm',
    ],
    summary:
      'Essential bilateral motor and sensory nerve originating high in the neck (C3–C5) and descending through the thoracic mediastinum to drive every diaphragmatic breath.',
    functions: [
      'Sole somatic motor innervation to the thoracic diaphragm',
      'Sensory innervation of central diaphragmatic pleura & fibrous pericardium',
    ],
    cameraPosition: [0.0, -3.5, 8.6],
    cameraTarget: [0, -3.5, 0.0],
    embryology: {
      emergenceGw: 4.5,
      matureGw: 7.5,
      carnegieStage: 'CS 13–19 (days 28–48)',
      embryonicOrigin: 'Cervical myotome motor axons tracking the descending septum transversum from neck to thorax',
      myelinationOnset: 'Early fetal myelination (~GW18–26) enabling fetal breathing movements',
    },
  },
  'nerve-brachial-plexus': {
    id: 'nerve-brachial-plexus',
    name: 'Brachial Plexus (C5–T1)',
    latinName: 'Plexus brachialis (C5–T1)',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: 'Roots CSA: C5 5.1 · C6 5.8 · C7 6.3 mm²',
    volumeCm3: 'Interscalene groove -> Axilla',
    swatchColor: '#f3d99b',
    landmarks: [
      'C5–T1 Ventral Rami Roots (Interscalene Triangle)',
      'Superior, Middle & Inferior Trunks',
      'Anterior/Posterior Divisions -> Lateral, Posterior & Medial Cords',
    ],
    summary:
      'Intricate somatic neural network emerging from cervical C5–C8 and T1 roots that reorganizes into trunks, divisions, and cords to wire the entire upper limb.',
    functions: [
      'Routes motor & sensory fibers into Axillary, Musculocutaneous, Radial, Median & Ulnar nerves',
      'Supplies shoulder girdle via suprascapular, long thoracic & thoracodorsal branches',
    ],
    cameraPosition: [0.0, -2.6, 8.2],
    cameraTarget: [0, -2.5, -0.2],
    embryology: {
      emergenceGw: 4.5,
      matureGw: 7.5,
      carnegieStage: 'CS 13–19 (days 28–48)',
      embryonicOrigin: 'C5–T1 spinal motor & DRG axons invading upper limb bud mesenchyme at CS 13–15',
      myelinationOnset: 'Rapid Schwann-cell myelination ~GW20–term, continuing rapidly in infancy',
    },
  },
  'nerve-axillary': {
    id: 'nerve-axillary',
    name: 'Axillary Nerve (C5–C6)',
    latinName: 'Nervus axillaris (C5–C6)',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: 'CSA 2.9 ± 1.1 mm² (quadrangular space)',
    volumeCm3: 'Posterior cord -> Surgical neck of humerus',
    swatchColor: '#ebd093',
    landmarks: [
      'Posterior Cord Bifurcation in Axilla',
      'Quadrangular Space with Posterior Circumflex Humeral Artery',
      'Deltoid & Teres Minor Muscular + Superior Lateral Cutaneous Branches',
    ],
    summary:
      'Terminal branch of the brachial plexus posterior cord wrapping posteriorly around the surgical neck of the humerus to power shoulder abduction.',
    functions: [
      'Deltoid & teres minor motor control (arm abduction & external rotation)',
      'Regimental-badge skin sensation over lateral shoulder',
    ],
    cameraPosition: [0.0, -3.2, 9.4],
    cameraTarget: [0, -3.1, -0.1],
    embryology: {
      emergenceGw: 5.0,
      matureGw: 7.8,
      carnegieStage: 'CS 14–20 (days 32–50)',
      embryonicOrigin: 'Posterior division C5–C6 axons tracking dorsal proximal limb-bud premuscle mass',
      myelinationOnset: 'Late second trimester (~GW22–32) peripheral Schwann myelination',
    },
  },
  'nerve-musculocutaneous': {
    id: 'nerve-musculocutaneous',
    name: 'Musculocutaneous Nerve (C5–C7)',
    latinName: 'Nervus musculocutaneus (C5–C7)',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: 'CSA ~5.5–6.9 mm² (proximal arm)',
    volumeCm3: 'Lateral cord -> Coracobrachialis -> Forearm',
    swatchColor: '#ead49d',
    landmarks: [
      'Lateral Cord Continuation Piercing Coracobrachialis',
      'Biceps Brachii & Brachialis Plane',
      'Lateral Antebrachial Cutaneous Nerve Continuation',
    ],
    summary:
      'Primary anterior arm flexor nerve arising from the lateral cord of the brachial plexus, piercing coracobrachialis before continuing as lateral forearm sensation.',
    functions: [
      'Elbow flexion & forearm supination (biceps brachii, brachialis, coracobrachialis)',
      'Cutaneous sensation over lateral forearm',
    ],
    cameraPosition: [0.0, -4.4, 9.6],
    cameraTarget: [0, -4.3, -0.05],
    embryology: {
      emergenceGw: 5.0,
      matureGw: 8.0,
      carnegieStage: 'CS 14–20 (days 32–50)',
      embryonicOrigin: 'Anterior division C5–C7 fibers innervating ventral flexor arm compartment',
      myelinationOnset: 'Late second to third trimester (~GW22–34) peripheral Schwann cells',
    },
  },
  'nerve-radial': {
    id: 'nerve-radial',
    name: 'Radial Nerve (C5–T1)',
    latinName: 'Nervus radialis (C5–T1)',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: 'CSA 5.0–7.9 mm² (spiral groove & antecubital)',
    volumeCm3: 'Posterior cord -> Humeral groove -> Dorsum of hand',
    swatchColor: '#f5dc96',
    landmarks: [
      'Posterior Cord Continuation into Radial (Spiral) Groove',
      'Arcade of Frohse & Posterior Interosseous Motor Branch',
      'Superficial Radial Sensory Branch (Anatomical Snuffbox)',
    ],
    summary:
      'Largest branch of the posterior cord spiraling around the humeral shaft to innervate all posterior arm and forearm extensors plus dorsal hand sensation.',
    functions: [
      'Elbow, wrist & finger extension (triceps & posterior forearm compartment)',
      'Dorsolateral hand & first web-space cutaneous sensation',
    ],
    cameraPosition: [0.0, -5.6, 11.4],
    cameraTarget: [0, -5.4, -0.05],
    embryology: {
      emergenceGw: 5.0,
      matureGw: 8.2,
      carnegieStage: 'CS 14–21 (days 32–52)',
      embryonicOrigin: 'Posterior division C5–T1 dorsal extensor trunk extending to hand plate by CS 20',
      myelinationOnset: 'Mid-to-late fetal (~GW22–36), completing fast saltatory maturation postnatally',
    },
  },
  'nerve-median': {
    id: 'nerve-median',
    name: 'Median Nerve (C6–T1)',
    latinName: 'Nervus medianus (C6–T1)',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: 'CSA 6.5–9.8 mm² (forearm -> carpal tunnel)',
    volumeCm3: 'Lateral + Medial cords -> Carpal tunnel -> Digits 1–4',
    swatchColor: '#f7e4a8',
    landmarks: [
      'M-Shaped Union of Lateral & Medial Brachial Cords',
      'Anterior Interosseous Nerve (AIN) in Forearm',
      'Carpal Tunnel Passage, Recurrent Thenar & Palmar Digital Branches',
    ],
    summary:
      'Central flexor and precision-grip nerve of the upper extremity descending down the anterior forearm through the carpal tunnel to innervate the thumb thenar muscles and palmar digits 1–3.5.',
    functions: [
      'Forearm pronation, wrist/finger flexion & thumb opposition (precision pinch)',
      'High-acuity palmar sensory feedback from thumb, index, middle & lateral ring fingers',
    ],
    cameraPosition: [0.0, -6.2, 11.4],
    cameraTarget: [0, -6.0, 0.05],
    embryology: {
      emergenceGw: 5.0,
      matureGw: 8.2,
      carnegieStage: 'CS 14–21 (days 32–52)',
      embryonicOrigin: 'Ventral limb-bud anterior division fibers reaching digital rays by CS 20–21',
      myelinationOnset: 'Fetal Schwann ensheathment ~GW22–38; myelinated fiber diameter doubles over childhood',
    },
  },
  'nerve-ulnar': {
    id: 'nerve-ulnar',
    name: 'Ulnar Nerve (C8–T1)',
    latinName: 'Nervus ulnaris (C8–T1)',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: 'CSA 5.8–7.6 mm² (cubital tunnel -> Guyon canal)',
    volumeCm3: 'Medial cord -> Medial epicondyle -> Intrinsic hand',
    swatchColor: '#ebd7a0',
    landmarks: [
      'Medial Cord Descent & Arcade of Struthers',
      'Cubital Tunnel behind Medial Humeral Epicondyle',
      'Guyon Canal, Deep Motor Arch (Interossei/Adductor Pollicis) & Digits 4–5',
    ],
    summary:
      'Medial arm and intrinsic-hand nerve traversing the cubital tunnel at the elbow and Guyon canal at the wrist to drive fine finger abduction, adduction, and medial hand sensation.',
    functions: [
      'Intrinsic hand dexterity (interossei, lumbricals 3–4, hypothenar, adductor pollicis)',
      'Palmar and dorsal sensation of little finger and medial ring finger',
    ],
    cameraPosition: [0.0, -6.2, 11.4],
    cameraTarget: [0, -6.0, 0.0],
    embryology: {
      emergenceGw: 5.2,
      matureGw: 8.3,
      carnegieStage: 'CS 15–21 (days 33–52)',
      embryonicOrigin: 'C8–T1 medial cord ventral flexor fibers reaching ulnar digital primordia by CS 21',
      myelinationOnset: 'Late second to third trimester (~GW24–38), refining hand motor conduction in childhood',
    },
  },
  'nerve-intercostal': {
    id: 'nerve-intercostal',
    name: 'Thoracic Intercostal & Subcostal Nerves (T1–T12)',
    latinName: 'Nervi intercostales (T1–T11) et nervus subcostalis (T12)',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: '12 paired segmental rami · Ø 1.5–2.5 mm',
    volumeCm3: 'Subcostal grooves wrapping ribcage T1–T12',
    swatchColor: '#e9cf9c',
    landmarks: [
      'Subcostal Neurovascular Groove (Vein-Artery-Nerve)',
      'Lateral Cutaneous Perforating Branches (Midaxillary Line)',
      'Anterior Cutaneous & Thoracoabdominal Wall Terminations (T7–T12)',
    ],
    summary:
      'Twelve paired segmental anterior rami of the thoracic spinal nerves coursing around the ribcage between internal and innermost intercostal muscles to drive respiratory wall mechanics and trunk dermatomes.',
    functions: [
      'Intercostal & abdominal wall respiratory/postural muscle contraction',
      'Segmental T1–T12 thoracic and abdominal skin & parietal pleural sensation',
    ],
    cameraPosition: [0.0, -4.6, 10.6],
    cameraTarget: [0, -4.6, 0.0],
    embryology: {
      emergenceGw: 4.5,
      matureGw: 7.5,
      carnegieStage: 'CS 13–19 (days 28–48)',
      embryonicOrigin: 'Segmental thoracic somite dermomyotome innervation preserving metameric body-wall bands',
      myelinationOnset: 'Mid-fetal (~GW18–26) supporting intercostal and trunk proprioception',
    },
  },
  'nerve-lumbar-plexus': {
    id: 'nerve-lumbar-plexus',
    name: 'Lumbar Plexus (L1–L4)',
    latinName: 'Plexus lumbalis (T12–L4)',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: 'Intra-psoas root network · L1–L4 ventral rami',
    volumeCm3: 'Posterior abdominal wall (Psoas major)',
    swatchColor: '#f2d99b',
    landmarks: [
      'Iliohypogastric & Ilioinguinal Nerves (L1)',
      'Genitofemoral (L1–L2) & Lateral Femoral Cutaneous (L2–L3)',
      'Lumbosacral Trunk (L4–L5) Bridge to Sacral Plexus',
    ],
    summary:
      'Upper lumbosacral neural plexus embedded within the psoas major muscle that gives rise to the femoral, obturator, lateral femoral cutaneous, and inguinal nerves.',
    functions: [
      'Anterior/medial thigh motor & sensory routing',
      'Lower abdominal wall, groin & lateral thigh cutaneous innervation',
    ],
    cameraPosition: [0.0, -7.8, 9.6],
    cameraTarget: [0, -7.7, -0.15],
    embryology: {
      emergenceGw: 5.0,
      matureGw: 8.2,
      carnegieStage: 'CS 14–21 (days 32–52)',
      embryonicOrigin: 'L1–L4 ventral rami invading proximal lower limb bud mesenchyme (~2 days after brachial plexus)',
      myelinationOnset: 'Second to third trimester (~GW20–34) peripheral Schwann myelination',
    },
  },
  'nerve-femoral': {
    id: 'nerve-femoral',
    name: 'Femoral & Saphenous Nerve (L2–L4)',
    latinName: 'Nervus femoralis et nervus saphenus (L2–L4)',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: 'AP 2.9–3.6 mm · ML 10.5–12.0 mm at inguinal ligament',
    volumeCm3: 'Femoral triangle -> Anterior thigh -> Medial ankle',
    swatchColor: '#f4de9e',
    landmarks: [
      'Iliopsoas Groove Lateral to Femoral Artery',
      'Quadriceps Femoris & Sartorius Muscular Branches',
      'Saphenous Nerve (Longest Pure Sensory Limb Nerve to Medial Foot)',
    ],
    summary:
      'Largest branch of the lumbar plexus passing beneath the inguinal ligament to power knee extension and hip flexion, continuing as the pure sensory saphenous nerve to the medial foot.',
    functions: [
      'Hip flexion (iliacus/pectineus/sartorius) & knee extension (quadriceps femoris)',
      'Anterior thigh, medial leg & medial foot cutaneous sensation',
    ],
    cameraPosition: [0.0, -10.8, 12.6],
    cameraTarget: [0, -10.8, 0.0],
    embryology: {
      emergenceGw: 5.2,
      matureGw: 8.5,
      carnegieStage: 'CS 15–22 (days 35–55)',
      embryonicOrigin: 'Posterior divisions of L2–L4 ventral rami rotated anteriorly with lower limb-bud torsion',
      myelinationOnset: 'Late second to third trimester (~GW22–36); rapid postnatal conduction growth for walking',
    },
  },
  'nerve-obturator': {
    id: 'nerve-obturator',
    name: 'Obturator Nerve (L2–L4)',
    latinName: 'Nervus obturatorius (L2–L4)',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: 'Ø 2.5–3.5 mm (obturator canal)',
    volumeCm3: 'Medial psoas -> Obturator foramen -> Medial thigh',
    swatchColor: '#e5cb8d',
    landmarks: [
      'Anterior Divisions of L2–L4 Descending Medial to Psoas',
      'Obturator Canal Passage into Medial Thigh',
      'Anterior & Posterior Adductor Compartment Divisions',
    ],
    summary:
      'Medial thigh adductor nerve descending along the pelvic brim through the obturator canal to supply the hip adductors, gracilis, and medial thigh skin.',
    functions: [
      'Thigh adduction & pelvic gait stabilization (adductor longus/brevis/magnus, gracilis)',
      'Medial thigh cutaneous sensation & hip/knee articular branches',
    ],
    cameraPosition: [0.0, -10.0, 10.6],
    cameraTarget: [0, -10.0, 0.0],
    embryology: {
      emergenceGw: 5.2,
      matureGw: 8.5,
      carnegieStage: 'CS 15–22 (days 35–55)',
      embryonicOrigin: 'Anterior divisions of L2–L4 ventral rami tracking medial thigh adductor primordia',
      myelinationOnset: 'Late second to third trimester (~GW22–36)',
    },
  },
  'nerve-sciatic': {
    id: 'nerve-sciatic',
    name: 'Sacral Plexus & Sciatic Nerve (L4–S3)',
    latinName: 'Plexus sacralis et nervus ischiadicus (L4–S3)',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: 'CSA 42–55 mm² (largest nerve in the human body)',
    volumeCm3: 'Greater sciatic foramen -> Posterior thigh -> Popliteal apex',
    swatchColor: '#fae5a6',
    landmarks: [
      'L4–S3 Sacral Plexus & Superior/Inferior Gluteal Nerves',
      'Greater Sciatic Foramen Exit Inferior to Piriformis',
      'Hamstring Muscular Trunk -> Popliteal Bifurcation into Tibial & Fibular',
    ],
    summary:
      'Thickest and longest single nerve trunk in the human body (~2 cm wide at the buttock), uniting L4–S3 roots to power posterior thigh hamstrings and all muscles below the knee.',
    functions: [
      'Knee flexion & hip extension (hamstrings & adductor magnus)',
      'Main conduit carrying both Tibial and Common Fibular trunks down the leg',
    ],
    cameraPosition: [0.0, -10.6, 12.8],
    cameraTarget: [0, -10.6, -0.15],
    embryology: {
      emergenceGw: 5.0,
      matureGw: 8.5,
      carnegieStage: 'CS 14–22 (days 32–55)',
      embryonicOrigin: 'L4–S3 anterior (tibial) & posterior (fibular) divisions bundled inside a shared epineurial sheath',
      myelinationOnset: 'Begins ~GW20–24 and increases dramatically through infancy/early childhood bipedal gait',
    },
  },
  'nerve-tibial': {
    id: 'nerve-tibial',
    name: 'Tibial & Plantar Nerves (L4–S3)',
    latinName: 'Nervus tibialis et nervi plantares (L4–S3)',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: 'CSA 13–24 mm² (popliteal) -> 10–14 mm² (tarsal tunnel)',
    volumeCm3: 'Popliteal fossa -> Posterior calf -> Plantar foot',
    swatchColor: '#f3d997',
    landmarks: [
      'Popliteal Fossa Midline Descent',
      'Deep Posterior Calf Compartment (Gastrocnemius/Soleus/Flexors)',
      'Tarsal Tunnel -> Medial & Lateral Plantar Nerves',
    ],
    summary:
      'Larger medial terminal division of the sciatic nerve descending deep through the calf and tarsal tunnel to power ankle plantarflexion and sole-of-foot weight-bearing sensation.',
    functions: [
      'Ankle plantarflexion, foot inversion & toe flexion (push-off phase of gait)',
      'Plantar foot cutaneous & proprioceptive balance feedback',
    ],
    cameraPosition: [0.0, -14.2, 12.2],
    cameraTarget: [0, -14.2, -0.05],
    embryology: {
      emergenceGw: 5.5,
      matureGw: 9.0,
      carnegieStage: 'CS 15–23 (days 35–58)',
      embryonicOrigin: 'Ventral anterior divisions of L4–S3 reaching distal foot plate by CS 22',
      myelinationOnset: 'Third trimester (~GW24–38), continuing through early walking milestones',
    },
  },
  'nerve-fibular-sural': {
    id: 'nerve-fibular-sural',
    name: 'Common Fibular (Peroneal) & Sural Nerves (L4–S2)',
    latinName: 'Nervus fibularis communis et nervus suralis (L4–S2)',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: 'Fibular CSA 8.5–12 mm² · Sural CSA 2.1–3.2 mm²',
    volumeCm3: 'Fibular neck -> Anterior/Lateral leg -> Dorsum of foot',
    swatchColor: '#e8d094',
    landmarks: [
      'Common Fibular Nerve Wrapping Fibular Neck',
      'Deep Fibular Nerve (Ankle Dorsiflexion) & Superficial Fibular (Eversion)',
      'Sural Sensory Nerve (Lateral Calf & Lateral Foot Border)',
    ],
    summary:
      'Lateral sciatic bifurcation wrapping superficially around the fibular head to divide into deep and superficial fibular nerves (foot dorsiflexion/eversion) paired with the cutaneous sural nerve.',
    functions: [
      'Ankle dorsiflexion & toe extension (prevents foot drop) + foot eversion',
      'Anterolateral leg, dorsal foot & lateral heel/foot sensory feedback (sural)',
    ],
    cameraPosition: [0.0, -14.2, 12.2],
    cameraTarget: [0, -14.2, 0.05],
    embryology: {
      emergenceGw: 5.5,
      matureGw: 9.0,
      carnegieStage: 'CS 15–23 (days 35–58)',
      embryonicOrigin: 'Posterior divisions of L4–S2 extending into lateral/anterior leg and dorsal foot plate',
      myelinationOnset: 'Third trimester (~GW24–38), refining distal conduction velocities into adolescence',
    },
  },
  'nerve-pudendal': {
    id: 'nerve-pudendal',
    name: 'Pudendal Nerve (S2–S4)',
    latinName: 'Nervus pudendus (S2–S4)',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: 'CSA ~4.0 mm² (piriformis) -> 0.35 mm² (Alcock canal)',
    volumeCm3: 'Greater/Lesser sciatic foramina -> Pudendal (Alcock) canal',
    swatchColor: '#e3c48e',
    landmarks: [
      'S2–S4 Onuf Nucleus Somatic Motor & Sensory Convergence',
      'Ischial Spine & Sacrospinous/Sacrotuberous Ligament Grip',
      'Pudendal (Alcock) Canal -> Inferior Rectal, Perineal & Dorsal Nerves',
    ],
    summary:
      'Principal somatic nerve of the pelvic floor and perineum arising from S2–S4 (Onuf nucleus), looping around the ischial spine through Alcock canal.',
    functions: [
      'Voluntary external urethral and anal sphincter continence control',
      'Perineal & external genital somatic sensory innervation',
    ],
    cameraPosition: [0.0, -9.2, 8.0],
    cameraTarget: [0, -9.2, -0.15],
    embryology: {
      emergenceGw: 6.0,
      matureGw: 9.5,
      carnegieStage: 'CS 16–23 (days 37–60)',
      embryonicOrigin: 'S2–S4 ventral sacral neural tube (Onuf nucleus) & DRGs innervating cloacal sphincter derivatives',
      myelinationOnset: 'Late fetal (~GW26–38); voluntary sphincter cortical control matures ages 1–3 yr',
    },
  },
  'nerve-sympathetic-chain': {
    id: 'nerve-sympathetic-chain',
    name: 'Sympathetic Trunk & Splanchnic Nerves (C1–Co1)',
    latinName: 'Truncus sympathicus et nervi splanchnici (Thoracolumbar)',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: '22–24 paired paravertebral ganglia + Celiac/Mesenteric plexuses',
    volumeCm3: 'Skull base -> Ganglion impar (Paravertebral)',
    swatchColor: '#ed9e5b',
    landmarks: [
      'Superior, Middle & Stellate (Cervicothoracic) Ganglia',
      'Thoracic (T1–T12), Lumbar (L1–L4) & Sacral Chains -> Ganglion Impar',
      'Greater (T5–T9), Lesser (T10–T11) & Least Splanchnic Nerves -> Celiac/SMA/IMA Ganglia',
    ],
    summary:
      'Bilateral ganglionated autonomic trunk flanking the entire vertebral column from skull base to coccyx, distributing sympathetic vasomotor, cardiopulmonary, sudomotor, and visceral splanchnic control.',
    functions: [
      'Fight-or-flight heart rate, bronchodilation & systemic vasoconstriction',
      'Abdominal & pelvic visceral blood flow, metabolic & adrenal medullary drive',
      'Thermoregulatory sweating & piloerection via gray rami communicantes',
    ],
    cameraPosition: [0.0, -5.6, 12.2],
    cameraTarget: [0, -5.6, -0.15],
    embryology: {
      emergenceGw: 4.5,
      matureGw: 8.5,
      carnegieStage: 'CS 13–21 (days 28–52)',
      embryonicOrigin: 'Trunk neural crest sympathoadrenal cells migrating ventrally beside dorsal aorta to form primary chains & prevertebral ganglia',
      myelinationOnset: 'Preganglionic white rami myelinate ~GW22–38; postganglionic gray rami remain unmyelinated C-fibers',
    },
  },
  'nerve-pelvic-splanchnic': {
    id: 'nerve-pelvic-splanchnic',
    name: 'Pelvic Splanchnic & Inferior Hypogastric Plexus (S2–S4)',
    latinName: 'Nervi splanchnici pelvici et plexus hypogastricus inferior',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: 'Bilateral S2–S4 parasympathetic roots + Pelvic plexus mesh',
    volumeCm3: 'Deep lateral pelvic wall (S2–S4 -> Bladder/Rectum)',
    swatchColor: '#6ecfb0',
    landmarks: [
      'Pelvic Splanchnic Nerves (Nervi Erigentes, S2–S4)',
      'Inferior Hypogastric (Pelvic) Autonomic Meshwork',
      'Vesical, Prostatic/Uterovaginal & Middle Rectal Plexuses',
    ],
    summary:
      'Sacral parasympathetic outflow (S2–S4) merging with hypogastric sympathetic fibers inside the inferior hypogastric plexus to govern bladder emptying, hindgut motility, and sexual vasodilation.',
    functions: [
      'Detrusor bladder contraction & distal colon/rectal peristalsis',
      'Pelvic visceral vasodilation & autonomic sexual arousal pathways',
    ],
    cameraPosition: [0.0, -8.8, 8.2],
    cameraTarget: [0, -8.8, 0.05],
    embryology: {
      emergenceGw: 6.0,
      matureGw: 9.5,
      carnegieStage: 'CS 16–23 (days 37–60)',
      embryonicOrigin: 'Sacral S2–S4 autonomic preganglionic neurons + sacral neural crest intramural pelvic ganglia',
      myelinationOnset: 'Thinly myelinated preganglionic B-fibers late fetal; postganglionic fibers unmyelinated',
    },
  },
  'nerve-enteric-plexus': {
    id: 'nerve-enteric-plexus',
    name: 'Enteric Nervous System (Myenteric & Submucosal)',
    latinName: 'Systema nervosum entericum (Plexus myentericus et submucosus)',
    category: 'Spinal & Autonomic Nerves',
    dimensionsMm: '200–600 million intrinsic gut neurons (GI wall lattice)',
    volumeCm3: 'Esophagus -> Stomach -> Small & Large Intestine',
    swatchColor: '#76d496',
    landmarks: [
      'Myenteric Plexus (of Auerbach) Controlling Peristaltic Motility',
      'Submucosal Plexus (of Meissner) Regulating Secretion & Mucosal Flow',
      'Vagal (CN X), Sympathetic Celiac/Mesenteric & Pelvic Splanchnic Inputs',
    ],
    summary:
      'Semi-autonomous intrinsic nervous system embedded throughout the gastrointestinal wall containing hundreds of millions of neurons that orchestrate peristalsis, secretion, and gut–brain signaling.',
    functions: [
      'Autonomous peristaltic reflexes, migrating motor complexes & sphincter coordination',
      'Mucosal fluid/electrolyte secretion, local blood flow & immune-microbiome sensing',
      'Bidirectional gut–brain axis communication with vagal & spinal afferents',
    ],
    cameraPosition: [0.0, -6.5, 9.6],
    cameraTarget: [0, -6.5, 0.25],
    embryology: {
      emergenceGw: 4.5,
      matureGw: 10.0,
      carnegieStage: 'CS 13–fetal GW10 (rostrocaudal vagal neural crest wave)',
      embryonicOrigin: 'Vagal (somites 1–7) and sacral neural crest progenitors migrating rostrocaudally along the gut tube (GW4–GW7.5)',
      myelinationOnset: 'Intrinsic enteric plexus axons are entirely unmyelinated, supported by enteric glial cells',
    },
  },
};


