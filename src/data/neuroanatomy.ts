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
  | 'vasculature';

export type ViewMode = 'intact' | 'glass' | 'split' | 'exploded';
export type TissueFinish = 'fresh' | 'fixed' | 'lobes' | 'knowledge' | 'temperature';
export type CameraPresetId =
  | 'lateral'
  | 'superior'
  | 'anterior'
  | 'inferior'
  | 'midsagittal';

export interface BrainRegionInfo {
  id: RegionId;
  name: string;
  latinName: string;
  category: 'Cortical' | 'Subcortical' | 'Hindbrain' | 'Vascular & CSF';
  dimensionsMm: string;
  volumeCm3: string;
  swatchColor: string;
  landmarks: string[];
  summary: string;
  functions: string[];
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  recommendedViewMode?: ViewMode;
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
    category: 'Vascular & CSF',
    dimensionsMm: 'Circle of Willis & MCA',
    volumeCm3: '~150 mL blood vol.',
    swatchColor: '#c94343',
    landmarks: [
      'Circle of Willis (Basal Anastomosis)',
      'Middle Cerebral Artery (Sylvian Branches)',
      'Superior Cortical & Anastomotic Veins',
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
    recommendedViewMode: 'intact',
  },
};
