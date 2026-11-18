import type { RegionId } from './neuroanatomy';

export interface ResearchPaperCitation {
  id: string;
  authors: string;
  year: number;
  title: string;
  journal: string;
  doi?: string;
  pmcId?: string;
  isOwnResearch?: boolean;
  ownResearchBadge?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  verbatimQuote: string;
}

export interface OwnResearchHighlight {
  id: string;
  category:
    | 'Multi-Omic & Dynamical Systems'
    | 'Quantitative Bioheat Model'
    | 'Bioenergetic & Thermal Limit'
    | 'Comparative Neuroenergetics';
  title: string;
  summary: string;
  metric: string;
  sourcePaperId: string;
}

export interface RegionEpistemicState {
  regionId: RegionId;
  ageYears: number;
  knownPct: number;
  gapPct: number;
  isUnchartedOver100: boolean;
  hasOwnResearch: boolean;
  ownResearchCount: number;
  sizeStatus: string;
  myelinationStatus: string;
  temperatureStatus: string;
  modeledTempNote?: string;
  tempCelsius: number | null;
  ownResearchHighlights: OwnResearchHighlight[];
  citations: ResearchPaperCitation[];
  gaps: string[];
}

export const RESEARCH_PAPERS: Record<string, ResearchPaperCitation> = {
  zahoor2026_pediatric_thermo: {
    id: 'zahoor2026_pediatric_thermo',
    authors: 'Zahoor T.',
    year: 2026,
    title:
      'Multi-Scale Developmental Neurothermodynamics Across the Human Childhood-to-Adolescence Transition: From Global Vascular Shielding and White–Gray Matter Compartmental Balance to Sensorimotor–Association Ribbon Micro-Gradients',
    journal: 'Own Research · Independent Computational & Systems Neurobiology Research (Nov 17, 2026)',
    isOwnResearch: true,
    ownResearchBadge: 'Own Research · Toiab Zahoor (Nov 17, 2026)',
    sourceUrl: '/assets/aistudio/Pediatric_brain_mechanisms_1c371fac.pdf',
    sourceLabel: 'Open Manuscript PDF',
    verbatimQuote:
      'At the macro scale, a 5–8-year-old brain under a 30% whole-brain AG split produces 20.34 W across 1,100 mL (18,493 W/m³, +54.5% above an adult baseline of 13.41 W across 1,120 mL). Because no healthy pediatric brain temperature atlas exists and 3D finite-element runs on raw HCP-Development and PNC scans are laid out here as a proposed pipeline rather than completed subject meshes, I formalize a four-stage Schaefer-400 workflow and an accelerated 3D ¹H-MRSI validation protocol (n = 20–73 youths for 80% power) with five falsifiable predictions.',
  },
  zahoor2026_leak_packing: {
    id: 'zahoor2026_leak_packing',
    authors: 'Zahoor T.',
    year: 2026,
    title:
      'The Leak-Packing Limit of the Brain: Bioenergetic, Microvascular, and Thermodynamic Constraints on Neuronal Density and Synaptic Complexity Across Mammals and Birds',
    journal: 'Own Research · Independent Computational & Systems Neurobiology Research (Nov 7, 2026)',
    isOwnResearch: true,
    ownResearchBadge: 'Own Research · Toiab Zahoor (Nov 7, 2026)',
    sourceUrl: '/assets/aistudio/paper_830b11c9.pdf',
    sourceLabel: 'Open Manuscript PDF',
    verbatimQuote:
      'Across rodents and primates, these coupled constraints lock the whole-brain energy budget at 5.79 × 10⁻⁹ µmol glucose/neuron/min. By contrast, birds (Columba livia, Corvidae, and Psittaciformes) bypass the mammalian packing limit, packing two to four times more neurons into brains of the same mass while burning roughly three times less glucose per neuron (1.86 × 10⁻⁹ ± 0.2 × 10⁻⁹ µmol glucose/neuron/min in awake pigeons).',
  },
  zahoor2026_neocortical: {
    id: 'zahoor2026_neocortical',
    authors: 'Zahoor T.',
    year: 2026,
    title:
      'Mechano-Sterol Homeostasis, Ciliary Hedgehog-YAP/ERK Signaling, and Sequential Post-Transcriptional Clocks in Human Neocortical Expansion: A Multi-Omic Dynamical Systems Framework',
    journal: 'Own Research · Independent Computational & Systems Neurobiology Research (Nov 1, 2026)',
    isOwnResearch: true,
    ownResearchBadge: 'Own Research · Toiab Zahoor (Nov 1, 2026)',
    sourceUrl: '/assets/aistudio/neocortical_expansion_42dcb875.pdf',
    sourceLabel: 'Open Manuscript PDF',
    verbatimQuote:
      'In primary human fetal oRGs (GSE162170), neighborhood metacell pooling (n = 80) confirms positive covariance between PIEZO1/YAP1 and the Paleo-Sterol Module (PIEZO1: Spearman ρ = 0.4935, p = 3.29 × 10⁻⁶; YAP1: Pearson r = 0.5029, p = 1.99 × 10⁻⁶).',
  },
  zahoor2026_amniote_scaling: {
    id: 'zahoor2026_amniote_scaling',
    authors: 'Zahoor T.',
    year: 2026,
    title:
      'Comparative Neuroenergetics, Allometric Scaling, and Cytoarchitectural Evolution Across Amniote Brains',
    journal: 'Own Research · Companion Systems Neurobiology Synthesis (2026)',
    isOwnResearch: true,
    ownResearchBadge: 'Own Research · Toiab Zahoor (2026)',
    sourceUrl: '/assets/aistudio/latex_4201ef61.md',
    sourceLabel: 'Open Manuscript Source',
    verbatimQuote:
      'Whereas crown mammals elaborated a six-layered dorsal pallial neocortex that scales across four orders of magnitude in brain mass under a rigid per-neuron metabolic ceiling of 5.79 × 10⁻⁹ ± 0.76 × 10⁻⁹ μmol glucose per neuron per minute and an invariant local primary visual cortex (V1) bioenergetic coupling ratio of 1.91 ± 0.47 mitochondria per synapse',
  },
  bethlehem2022: {
    id: 'bethlehem2022',
    authors: 'Bethlehem RAI, Seidlitz J, White SR, et al.',
    year: 2022,
    title: 'Brain charts for the human lifespan',
    journal: 'Nature 604, 525–533',
    doi: '10.1038/s41586-022-04554-y',
    pmcId: 'PMC9021023',
    verbatimQuote:
      'we aggregated 123,984 MRI scans, across more than 100 primary studies, from 101,457 human participants between 115 days post-conception to 100 years of age.',
  },
  rzechorzek2022: {
    id: 'rzechorzek2022',
    authors: 'Rzechorzek NM, Thrippleton MJ, Chappell FM, et al.',
    year: 2022,
    title: 'A daily temperature rhythm in the human brain predicts survival after brain injury',
    journal: 'Brain 145(6), 2031–2048',
    doi: '10.1093/brain/awac086',
    pmcId: 'PMC9336587',
    verbatimQuote:
      'In healthy participants, brain temperature ranged from 36.1 to 40.9°C, with a mean brain temperature of 38.5°C.',
  },
  deoni2011: {
    id: 'deoni2011',
    authors: 'Deoni SCL, Mercure E, Blasi A, et al.',
    year: 2011,
    title: 'Mapping infant brain myelination with magnetic resonance imaging',
    journal: 'The Journal of Neuroscience 31(2), 784–791',
    doi: '10.1523/JNEUROSCI.2106-10.2011',
    pmcId: 'PMC6623428',
    verbatimQuote:
      'Using a new myelin-specific MRI technique, we report a spatiotemporal pattern beginning in the cerebellum, pons, and internal capsule; proceeding caudocranially from the splenium of the corpus callosum and optic radiations (at 3–4 months); to the occipital and parietal lobes (at 4–6 months); and then to the genu of the corpus callosum and frontal and temporal lobes (at 6–8 months).',
  },
  knickmeyer2008: {
    id: 'knickmeyer2008',
    authors: 'Knickmeyer RC, Gouttard S, Kang C, et al.',
    year: 2008,
    title: 'A structural MRI study of human brain development from birth to 2 years',
    journal: 'The Journal of Neuroscience 28(47), 12176–12182',
    doi: '10.1523/JNEUROSCI.3479-08.2008',
    pmcId: 'PMC2758136',
    verbatimQuote:
      'Total brain volume increased 101% in the first year, with a 15% increase in the second. The majority of hemispheric growth was accounted for by gray matter, which increased 149% in the first year; hemispheric white matter volume increased by only 11%. Cerebellum volume increased 240% in the first year.',
  },
  holland2014: {
    id: 'holland2014',
    authors: 'Holland D, Chang L, Ernst TM, et al.',
    year: 2014,
    title: 'Structural Growth Trajectories and Rates of Change in the First 3 Months of Infant Brain Development',
    journal: 'JAMA Neurology 71(10), 1266–1274',
    doi: '10.1001/jamaneurol.2014.1638',
    pmcId: 'PMC4940157',
    verbatimQuote:
      'Whole-brain volume at birth was approximately one-third of healthy elderly brain volume, and did not differ significantly between male and female infants (347 388 mm3 and 335 509 mm3, respectively, P = .12). Overall growth in the first 90 days was 64%.',
  },
  tanaka2015: {
    id: 'tanaka2015',
    authors: 'Tanaka-Arakawa MM, Matsui M, Tanaka C, et al.',
    year: 2015,
    title: 'Developmental Changes in the Corpus Callosum from Infancy to Early Adulthood: A Structural Magnetic Resonance Imaging Study',
    journal: 'PLoS ONE 10(3): e0118760',
    doi: '10.1371/journal.pone.0118760',
    pmcId: 'PMC4366258',
    verbatimQuote:
      'We performed a morphometric magnetic resonance imaging (MRI) study of 114 healthy individuals, aged 1 month to 25 years old, measuring the size of the corpus callosum. Locally weighted regression analysis (LOESS) indicated significant non-linear age-related changes regardless of sex, particularly during the first few years of life.',
  },
  lebel2012: {
    id: 'lebel2012',
    authors: 'Lebel C, Gee M, Camicioli R, Wieler M, Martin W, Beaulieu C.',
    year: 2012,
    title: 'Diffusion tensor imaging of white matter tract evolution over the lifespan',
    journal: 'NeuroImage 60(1), 340–352',
    doi: '10.1016/j.neuroimage.2011.11.094',
    verbatimQuote:
      'FA increased during childhood and adolescence, reached a peak between 20 and 42 years of age, and then decreased. The corpus callosum and fornix showed early reversals of development trends, while frontal-temporal connections (cingulum, uncinate, superior longitudinal) showed more prolonged maturation and delayed declines.',
  },
};

export const MAJOR_EPISTEMIC_REGIONS: RegionId[] = [
  'frontal-lobe',
  'parietal-lobe',
  'temporal-lobe',
  'occipital-lobe',
  'cerebellum',
  'brainstem',
  'corpus-callosum',
  'thalamus',
  'hippocampus',
  'hypothalamus',
];

export const QUICK_JUMP_AGES = [0, 0.5, 6, 28, 75, 100, 122] as const;

function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * Published human whole-brain volume trajectory normalized to adult baseline (age 28 = 1.00).
 * Anchors:
 *  - 0.0 yr (Birth): ~0.35 of adult volume (Holland et al. 2014; Knickmeyer et al. 2008)
 *  - 0.25 yr (3 mo): ~0.57 (+64% in first 90 days)
 *  - 1.0 yr: ~0.70 (+101% in year 1)
 *  - 3.0 yr: ~0.80 (~80% of adult volume)
 *  - 6.0 yr: ~0.94 (cortical gray matter volume peaks ~5.9 yr, Bethlehem et al. 2022)
 *  - 12.5 yr: ~1.045 (peak total cerebrum volume ~12.5 yr, Bethlehem et al. 2022)
 *  - 28.0 yr: 1.00 (adult baseline; white matter peaks ~28.7 yr)
 *  - 50–100 yr: gradual senescence from ~0.96 down to ~0.86
 *  - 101–122 yr: held constant at ~0.86 (no normative MRI dataset beyond 100 yr)
 */
const VOLUME_ANCHORS: readonly [number, number][] = [
  [0, 0.35],
  [0.25, 0.57],
  [1.0, 0.70],
  [2.0, 0.77],
  [3.0, 0.80],
  [6.0, 0.94],
  [12.5, 1.045],
  [20.0, 1.02],
  [28.0, 1.0],
  [40.0, 0.985],
  [50.0, 0.965],
  [65.0, 0.935],
  [80.0, 0.90],
  [100.0, 0.86],
  [122.0, 0.86],
];

export function computeBrainVolumeRatio(ageYears: number): number {
  const age = clamp(ageYears, 0, 122);
  if (age >= 100) return 0.86;
  for (let i = 0; i < VOLUME_ANCHORS.length - 1; i++) {
    const [a0, v0] = VOLUME_ANCHORS[i];
    const [a1, v1] = VOLUME_ANCHORS[i + 1];
    if (age <= a1) {
      const t = (age - a0) / (a1 - a0);
      const eased = age < 12.5 ? t * t * (3 - 2 * t) * 0.45 + t * 0.55 : t;
      return lerp(v0, v1, eased);
    }
  }
  return 0.86;
}

export function computeBrainLinearScale(ageYears: number): number {
  return Math.cbrt(computeBrainVolumeRatio(ageYears));
}

export function computeScaledDimensionsMm(ageYears: number): {
  ap: number;
  ml: number;
  si: number;
  volumePct: number;
  isUnchartedOver100: boolean;
} {
  const volumeRatio = computeBrainVolumeRatio(ageYears);
  const s = Math.cbrt(volumeRatio);
  return {
    ap: Math.round(167 * s),
    ml: Math.round(140 * s),
    si: Math.round(93 * s),
    volumePct: Math.round(volumeRatio * 100),
    isUnchartedOver100: ageYears > 100,
  };
}

function getAdultBaselineTempCelsius(regionId: RegionId): number | null {
  switch (regionId) {
    case 'thalamus':
      return 39.2;
    case 'hypothalamus':
      return 39.0;
    case 'hippocampus':
      return 38.8;
    case 'corpus-callosum':
      return 38.7;
    case 'brainstem':
      return 38.6;
    case 'cerebellum':
      return 38.4;
    case 'occipital-lobe':
      return 38.1;
    case 'temporal-lobe':
      return 38.2;
    case 'parietal-lobe':
      return 38.0;
    case 'frontal-lobe':
    case 'cerebral-cortex':
      return 38.1;
    default:
      return null;
  }
}

export function formatAgeLabel(ageYears: number): string {
  if (ageYears === 0) return 'Birth (0.0 yr)';
  if (ageYears < 1) return `${Math.round(ageYears * 12)} mo (${ageYears.toFixed(2)} yr)`;
  return `${ageYears % 1 === 0 ? ageYears.toFixed(0) : ageYears.toFixed(2)} yr`;
}

function isCorticalRegion(regionId: RegionId): boolean {
  return (
    regionId === 'frontal-lobe' ||
    regionId === 'parietal-lobe' ||
    regionId === 'temporal-lobe' ||
    regionId === 'occipital-lobe' ||
    regionId === 'cerebral-cortex'
  );
}

function isAssociationCorticalRegion(regionId: RegionId): boolean {
  return (
    regionId === 'frontal-lobe' ||
    regionId === 'parietal-lobe' ||
    regionId === 'temporal-lobe' ||
    regionId === 'cerebral-cortex'
  );
}

function buildOwnResearchForRegion(
  regionId: RegionId,
  age: number,
): {
  highlights: OwnResearchHighlight[];
  paperIds: string[];
  modeledTempNote?: string;
  extraGaps: string[];
} {
  const highlights: OwnResearchHighlight[] = [];
  const paperIds = new Set<string>();
  const extraGaps: string[] = [];
  let modeledTempNote: string | undefined;

  // 1. Birth to Early Infancy (0–2.5 yr): Prenatal Neocortical Origin & Neonatal Compartments
  if (age < 3) {
    if (isCorticalRegion(regionId) || regionId === 'corpus-callosum') {
      paperIds.add('zahoor2026_neocortical');
      highlights.push({
        id: 'neocortical_org_origin',
        category: 'Multi-Omic & Dynamical Systems',
        title: 'Prenatal oRG Expansion & Stage-I IGF2BP1 Clearance (≤GW26)',
        summary:
          'Cortical neuron pools are established prenatally by GW26 via PIEZO1–KLF6/pancMEIS1–SCAP sterol amplification and nuclear YAP retention (86% human bRGs vs. 4% mouse). Early IGF2BP1 shutoff (58.8-fold drop GW16–GW24) clears subplate migration trapping (1.011 cells/hr) before a GW22.1 saddle-node bifurcation seeds CRYAB+ tRGs and gliogenic Tri-IPCs.',
        metric: 'PIEZO1 ρ=0.4935, YAP1 r=0.5029 (GSE162170 n=80 metacells)',
        sourcePaperId: 'zahoor2026_neocortical',
      });
      extraGaps.push(
        'Own Research Boundary (Zahoor 2026): Human germinal niche stiffening (E = 180→880 Pa) is mapped from mouse/ferret slice AFM pending direct unfixed primary human fetal AFM micro-indentation across GW14–GW24.',
      );
    }

    if (regionId === 'cerebral-cortex' || regionId === 'frontal-lobe' || regionId === 'ventricles' || regionId === 'vasculature') {
      paperIds.add('zahoor2026_pediatric_thermo');
      highlights.push({
        id: 'infant_thermodynamics_boundary',
        category: 'Quantitative Bioheat Model',
        title: 'Early Vascular Shielding & Postnatal Growth Consolidation',
        summary:
          'Newborn lower CBF (~50 mL/100g/min) and smaller radius stretch vascular shielding length Δ to ~6 mm (vs. ~12 mm in 27-week preterms), permitting partial transcranial cooling before rapid postnatal hyperperfusion tightens Δ toward pediatric vascular shielding.',
        metric: 'Term Δ ≈ 6 mm vs. 3.3 mm adult GM',
        sourcePaperId: 'zahoor2026_pediatric_thermo',
      });
    }

    if (regionId === 'corpus-callosum') {
      paperIds.add('zahoor2026_pediatric_thermo');
      highlights.push({
        id: 'callosal_early_oligo_birth',
        category: 'Quantitative Bioheat Model',
        title: 'Front-Loaded Callosal Oligodendrogenesis (<5 yr)',
        summary:
          'Active OPC proliferation and early tract myelination front-load callosal oligodendrocyte populations prior to age 5 (~0.3%/yr adult turnover thereafter), shifting later development toward high-ATP myelin sheath remodeling.',
        metric: 'Born <5 yr (14C) -> 0.3%/yr adult turnover',
        sourcePaperId: 'zahoor2026_pediatric_thermo',
      });
    }
  }

  // 2. Childhood to Adolescent Transition (3–21 yr): Pediatric Neurothermodynamics
  if (age >= 2.5 && age <= 21.5) {
    paperIds.add('zahoor2026_pediatric_thermo');

    if (isAssociationCorticalRegion(regionId)) {
      highlights.push({
        id: 'pediatric_hyperemic_ag_shield',
        category: 'Quantitative Bioheat Model',
        title: 'Peak Metabolic Power Clamped by Hyperemia & Aerobic Glycolysis',
        summary:
          'Whole-brain glucose uptake peaks at 5.2 yr (167.0 g/d males, 146.1 g/d females; ~66% RMR), generating 20.34 W across 1,100 mL (+54.5% power density). Childhood CBF (71–106.4 mL/100g/min; 88.3–91.2% convective clearance) and 30% nonoxidative AG (sparing 4.87 W) hold deep-brain ΔT at +0.263 to +0.395 °C above arterial blood (blocking +0.560–0.694 °C unbuffered heating).',
        metric: '20.34 W (18,493 W/m³) · ΔT = +0.263–0.395 °C',
        sourcePaperId: 'zahoor2026_pediatric_thermo',
      });

      if (age >= 6 && age <= 18) {
        highlights.push({
          id: 'sa_phase_lag_association',
          category: 'Quantitative Bioheat Model',
          title: 'Sensorimotor–Association Thermal–Plasticity Phase Lag (Ages 7–12)',
          summary:
            'Late-maturing association hubs (DLPFC, IPL, PCC, lateral temporal) sustain prolonged synaptic remodeling and steeper adolescent CBF drops (Δβ1 = |0.62|). A +22% GM / +18% WM metabolic-to-perfusion lag elevates association cortex +0.060 °C (+0.076 °C in 0–2 mm SWM) above sensorimotor cortex at ages 7–12 before attenuating to ≤0.03 °C by 18–21 yr.',
          metric: 'GM +0.060 °C · SWM +0.076 °C (gyral–sulcal +0.049–0.058 °C)',
          sourcePaperId: 'zahoor2026_pediatric_thermo',
        });
      } else {
        highlights.push({
          id: 'folded_ribbon_cooling',
          category: 'Quantitative Bioheat Model',
          title: 'Folded 2.7 mm Cortical Ribbon Lies Inside One Shielding Length',
          summary:
            'Gyrification keeps cortex (1.8 mm sulcal fundi to 3.0 mm gyral crowns) thinner than Δ_GM (2.80–3.30 mm). Convective subarachnoid CSF (T_CSF − T_a = −0.20 °C) keeps the folded ribbon at +0.172 to +0.301 °C (0.046–0.175 °C cooler than WM) and cools sulci 0.049–0.058 °C below gyral crowns.',
          metric: 'Δ_GM = 2.80–3.30 mm · Ribbon +0.172 to +0.301 °C',
          sourcePaperId: 'zahoor2026_pediatric_thermo',
        });
      }

      modeledTempNote =
        age >= 6 && age <= 15
          ? 'Own Research Modeled Prediction (Zahoor, Nov 2026): ~+0.17 to +0.30 °C above 37.0 °C arterial inflow in 2.7 mm folded cortex, with late-maturing association hubs +0.060 °C warmer than sensorimotor cortex; requires accelerated 3D ¹H-MRSI (n = 20–73) to measure.'
          : 'Own Research Modeled Prediction (Zahoor, Nov 2026): Global childhood hyperemia (71–106.4 mL/100g/min) + 30% AG enthalpy buffer clamp parenchyma within +0.263 to +0.395 °C above arterial blood.';
    } else if (regionId === 'occipital-lobe') {
      highlights.push({
        id: 'occipital_sensorimotor_anchor',
        category: 'Quantitative Bioheat Model',
        title: 'Early Unimodal V1/S1/M1 Anchor Along the S-A Cooling Axis',
        summary:
          'Primary visual cortex (V1) consolidates intracortical myelin (T1w/T2w) and superficial white-matter U-fibers early (1–1.5%/yr). Under matched IT’IS v5.0 Picard bioheat coupling at ages 7–12, matured sensorimotor/visual cortex settles near +0.166 °C GM (+0.210 °C SWM) above arterial inflow, running 0.04–0.06 °C cooler than lagged transmodal hubs.',
        metric: 'Sensorimotor GM +0.166 °C · ΔAssoc−SM = +0.060 °C',
        sourcePaperId: 'zahoor2026_pediatric_thermo',
      });
      modeledTempNote =
        'Own Research Modeled Prediction (Zahoor, Nov 2026): Matured unimodal V1/sensorimotor cortex runs ~+0.166 °C above 37.0 °C arterial inflow (+0.04 to +0.06 °C cooler than association cortex at ages 7–12); empirically unmeasured in healthy youth.';
    } else if (regionId === 'corpus-callosum') {
      highlights.push({
        id: 'wm_remodeled_heat_budget',
        category: 'Quantitative Bioheat Model',
        title: 'White-Matter Myelin Maintenance Heat & Perfusion Sensitivity',
        summary:
          'Although callosal oligodendrocytes mostly form before age 5, ongoing myelin turnover and internodal Na⁺/K⁺-ATPase sustain 6.95 → 4.53 W/kg (rising from 13.3% to 17.9% of brain heat across ages 5–20) on 3–4× lower perfusion (24–32 mL/100g/min). A +40% glial surge or ATT-corrected 18 mL/100g/min CBFWM drives deep WM to +0.486–0.607 °C.',
        metric: 'WM 6.95→4.53 W/kg · Core ΔT = +0.343–0.357 °C (surge +0.607 °C)',
        sourcePaperId: 'zahoor2026_pediatric_thermo',
      });
      modeledTempNote =
        'Own Research Modeled Prediction (Zahoor, Nov 2026): Deep white matter equilibrates at +0.334 to +0.357 °C above arterial inflow under pediatric CBF (26–32 mL/100g/min), rising to +0.577 °C if ATT-corrected CBFWM drops near 18 mL/100g/min.';
    } else if (regionId === 'thalamus' || regionId === 'hypothalamus' || regionId === 'hippocampus') {
      highlights.push({
        id: 'subcortical_thermal_hierarchy',
        category: 'Quantitative Bioheat Model',
        title: 'Deep Subcortical Nuclei Sit at the Thermal Core Hierarchy',
        summary:
          'Reconciling concentric bioheat shells with a 20 mL ventricular core (+0.392 °C) and 60 mL deep subcortical GM ring (+0.386 °C at CBF 90 mL/100g/min) places thalamus/deep sGM warmer than WM (+0.356 °C) and folded cortex (+0.172–0.301 °C)—matching the adult HEATWAVE thalamic peak (+1.64 °C above cortex).',
        metric: 'Deep sGM +0.386 °C > WM +0.356 °C > Cortex +0.17–0.30 °C',
        sourcePaperId: 'zahoor2026_pediatric_thermo',
      });
      modeledTempNote =
        'Own Research Modeled Prediction (Zahoor, Nov 2026): 60 mL deep subcortical gray matter sits at +0.386 to +0.391 °C above arterial inflow (~+0.04 to +0.20 °C warmer than folded cortex), locked by arterial inflow T_a against scalp cooling.';
    } else if (regionId === 'ventricles') {
      highlights.push({
        id: 'ventricular_thermal_core',
        category: 'Quantitative Bioheat Model',
        title: 'Adiabatic Ventricular Cavity & Subarachnoid CSF Cooling Contrast',
        summary:
          'Separating 1,300 mL ICV into 1,120 mL parenchyma + 160 mL subarachnoid CSF + 20 mL ventricular CSF reveals opposite thermal roles: central 20 mL ventricles equilibrate adiabatically near +0.392–0.397 °C, whereas pulsatile subarachnoid CSF (k_eff = 6.2 W/m·K, h_pial = 200–500 W/m²·K) cools sulcal fundi.',
        metric: 'Ventricular CSF +0.392 °C vs. Sulcal CSF −0.20 °C',
        sourcePaperId: 'zahoor2026_pediatric_thermo',
      });
      modeledTempNote =
        'Own Research Modeled Prediction (Zahoor, Nov 2026): Deep lateral/third ventricles equilibrate adiabatically at +0.392 to +0.397 °C above arterial blood, while pulsatile subarachnoid CSF extracts cortical sulcal heat.';
    } else if (regionId === 'vasculature') {
      highlights.push({
        id: 'vascular_clearance_88_91',
        category: 'Quantitative Bioheat Model',
        title: 'Cerebral Vasculature Clears 88.3%–91.2% of Developmental Brain Heat',
        summary:
          'Under IT’IS v5.0 perfused scalp/skull and hair insulation (h = 3.5 W/m²·K), transcranial skull conduction drops to 1.60–1.81 W, leaving cerebral blood vessels to export 88.3%–91.2% of brain heat (20.34 W peak at ages 5–8) via venous sinuses into internal jugular veins.',
        metric: '88.3%–91.2% vascular clearance · Δ_GM = 2.80–3.30 mm',
        sourcePaperId: 'zahoor2026_pediatric_thermo',
      });
      modeledTempNote =
        'Own Research Modeled Prediction (Zahoor, Nov 2026): Pediatric hyperperfusion (71–106.4 mL/100g/min) clamps Δ_GM to 2.71–3.31 mm and exports ~18.5 W convectively to keep brain excess ΔT below +0.40 °C.';
    } else {
      // cerebellum, brainstem
      highlights.push({
        id: 'systemic_arterial_ta_anchor',
        category: 'Quantitative Bioheat Model',
        title: 'Arterial Inflow T_a Locking & Q10 = 2.3 Thermal Sensitivity',
        summary:
          'Because parenchymal depths exceed 3Δ, brainstem/deep-core tissues stay decoupled from cranial surface cooling (invariant to <0.0002 °C across 10–30 °C ambient air) and track systemic arterial blood temperature T_a under Van’t Hoff Q10 = 2.3 amplification (+23.1% heat at 39.5 °C fever).',
        metric: 'G_Q10 = 1.02–1.04 resting · +23.1% metabolic surge at 39.5 °C',
        sourcePaperId: 'zahoor2026_pediatric_thermo',
      });
    }

    if (age < 20) {
      extraGaps.push(
        'Own Research Validation Protocol (Zahoor 2026): No healthy normative pediatric brain temperature atlas (ages 2–18) exists; resolving sub-0.15 °C S-A and gyral–sulcal gradients requires accelerated 3D ¹H-MRSI (n = 20–73 youths at σ_diff ≤ 0.15 °C) with QSM/R2* masking for the 55 ± 11 µg/g (+21 ± 3 ppb) SWM iron band and simultaneous acquisition to eliminate sex-specific intra-session cooling drift.',
      );
    }
  }

  // 3. Adulthood & Aging (18–122 yr): The Leak-Packing Limit & Comparative Amniote Scaling
  if (age >= 18) {
    paperIds.add('zahoor2026_leak_packing');
    paperIds.add('zahoor2026_amniote_scaling');

    if (isCorticalRegion(regionId)) {
      highlights.push({
        id: 'leak_packing_v1_invariance',
        category: 'Bioenergetic & Thermal Limit',
        title: 'Cortical Leak-Packing Ceiling & Mammalian Energy Budget',
        summary:
          'Across 18 mammalian species in V1, mitochondrial density (1.31 × 10⁶ mm⁻²) and synaptic density (7.07 × 10⁵ mm⁻²) remain invariant (1.91 ± 0.47 mito/synapse; Human V1: 7,258 neurons/mm², 92.66 synapses/neuron, 1.96 mito/synapse), locking whole-brain demand at 5.79 × 10⁻⁹ µmol glucose/neuron/min (1.50 × 10⁻⁸ in cortical neurons) under fixed capillaries (f_c = 0.74–2.0%). Human L5 dendrites and PVFS interneurons spare ATP via trimmed Kir/Kv1 leak, myelinated axons (60–80%, g-ratio ~ 0.6–0.7), and dense PNNs.',
        metric: '7,258 neurons/mm² · 1.96 mito/synapse · 5.79×10⁻⁹ µmol/min',
        sourcePaperId: 'zahoor2026_leak_packing',
      });

      if (age >= 45) {
        highlights.push({
          id: 'aging_imm_proton_leak',
          category: 'Bioenergetic & Thermal Limit',
          title: 'Age-Related IMM Proton Leak Doubling & Dual-Seal Rescue Model',
          summary:
            'Adult basal IMM proton leak (L₀ = 0.25) dumps 60.06 kJ/mol ATP as primary waste heat (114.06 kJ/mol total). Aging doubles ANT1-cardiolipin proton leak (L: 0.25 → 0.50), cutting ATP synthesis per O₂ by 33.3% (3.88 → 2.58 ATP/O₂) and raising waste heat +76.7% (106.13 kJ/mol ATP), forcing synapse pruning (S/N) under fixed capillary O₂ delivery. Dual-sealing via Bcl-xL + elamipretide (SS-31; L = 0.06) cuts IMM waste heat 38.4% and raises permissible density +25.3% (9,097 mm⁻²) inside K⁺ (8.5 mM) & ephaptic (5.0 mV/mm) limits.',
          metric: 'Aged L=0.50: −33.3% ATP/O₂, +76.7% heat · Dual-Seal −38.4% heat',
          sourcePaperId: 'zahoor2026_leak_packing',
        });
      }

      extraGaps.push(
        'Own Research Empirical Gaps (Zahoor 2026): Direct single-cell mitochondrial biometrics (number, size, cristae density, oligomycin-insensitive proton leak) remain unmeasured side-by-side between cell-type-matched human vs. rodent PVFS interneurons, and 2D EM stereology requires 3D volumetric reconciliation.',
      );
    } else if (regionId === 'vasculature') {
      highlights.push({
        id: 'invariant_capillary_bed',
        category: 'Bioenergetic & Thermal Limit',
        title: 'Supply-Limited Microvascular Volume & Convective Heat Offset',
        summary:
          'Cortical capillary volume fraction scales invariantly as f_c ~ V⁰ ≈ 0.74%–2.0% (~10 µm capillary/neuron; CBF/ρ_n ≈ 1.45 × 10⁻⁸ mL/min/neuron). At steady PET resting OEF₀ ≈ 0.40 and arterial enthalpy balance ΔH_net = 442 kJ/mol O₂, cerebral perfusion clamps deep brain tissue +0.36 to +0.39 °C warmer than arterial blood (cooling ~0.2 °C during sensory hyperemia).',
        metric: 'f_c = 0.74–2.0% · OEF₀ = 0.40 · ΔT₀ = +0.36–0.39 °C',
        sourcePaperId: 'zahoor2026_leak_packing',
      });
    } else if (regionId === 'corpus-callosum') {
      highlights.push({
        id: 'white_matter_scaling_ratio',
        category: 'Comparative Neuroenergetics',
        title: 'White-to-Gray Volume Expansion Driven by Cortical Packing Ceiling',
        summary:
          'Because microvascular and thermal limits lock cortical synapse density while human per-neuron synaptic integration (S/N = S̄/N) climbs, mammalian brains must expand cortical volume and long-range myelinated tracts—raising white-to-gray ratio from 0.06 in small insectivores to 0.40 in humans (with human axon g-ratios ~0.6–0.7 vs. ~0.75–0.8 in rodents).',
        metric: 'WM:GM = 0.40 in H. sapiens · Myelin g-ratio ~ 0.6–0.7',
        sourcePaperId: 'zahoor2026_leak_packing',
      });
    } else if (regionId === 'cerebellum' || regionId === 'brainstem') {
      highlights.push({
        id: 'cerebellar_whole_brain_budget',
        category: 'Comparative Neuroenergetics',
        title: 'Cerebellar Granule Packing & Resting Ion-Leak Dominance',
        summary:
          'Tightly packed cerebellar granule neurons consume far less glucose per cell than cortical pyramidal neurons (averaging 1.50 × 10⁻⁸ cortical vs. 5.79 × 10⁻⁹ µmol glucose/neuron/min across all 86.1B human neurons). In cerebellar cortex, holding resting potential against passive ion leak takes 54% of signaling ATP (vs. 22% postsynaptic receptors).',
        metric: 'Whole-brain 5.79×10⁻⁹ µmol/min · 54% cerebellar resting leak ATP',
        sourcePaperId: 'zahoor2026_amniote_scaling',
      });
    } else if (regionId === 'hippocampus') {
      highlights.push({
        id: 'hippocampal_bclxl_leak',
        category: 'Bioenergetic & Thermal Limit',
        title: 'Bcl-xL F1F0 c-Ring Closure & Stoichiometric Coupling in Hippocampal Neurons',
        summary:
          'Patch-clamp and ATP/O₂ microelectrode studies in hippocampal neurons (Alavian et al. 2011) parameterize the Leak-Packing Limit’s Bcl-xL regime (L = 0.25 → 0.10): sealing the F1F0 ATP synthase c-subunit leak cuts primary IMM waste heat 31.7% (41.05 vs. 60.06 kJ/mol ATP) without elevating oxygen uptake.',
        metric: 'L = 0.10 Bcl-xL regime · −31.7% IMM waste heat',
        sourcePaperId: 'zahoor2026_leak_packing',
      });
    } else {
      // thalamus, hypothalamus, ventricles at adult/aged
      paperIds.add('zahoor2026_pediatric_thermo');
      highlights.push({
        id: 'adult_core_mrs_concordance',
        category: 'Bioenergetic & Thermal Limit',
        title: 'Deep Subcortical Core & Vascular-Thermal Equilibrium Boundary',
        summary:
          'Consistent with adult HEATWAVE ¹H-MRS (thalamus up to 40.9 °C, +1.64 °C warmer than cortex) and Pennes-Yablonskiy vascular shielding (Δ_GM = 3.30–3.58 mm), deep core nuclei and ventricular CSF equilibrate adiabatically (+0.386–0.397 °C above arterial blood under IT’IS v5.0 constants).',
        metric: 'Deep sGM +0.386 °C · Ventricles +0.392 °C > Cortex',
        sourcePaperId: 'zahoor2026_pediatric_thermo',
      });
    }

    if (age > 40) {
      modeledTempNote =
        'Own Research Bioenergetic & Thermal Prediction (Zahoor, Nov 2026): In supply-limited capillaries (f_c = 0.74–2.0%), age-related IMM proton leak doubling (L: 0.25 → 0.50) increases primary waste heat +76.7% per ATP (60.06 → 106.13 kJ/mol) unless offset by SS-31 / Bcl-xL leak sealing or synaptic pruning; healthy circadian 4D ¹H-MRSI remains empirically unmapped >40 yr.';
    }
  }

  return {
    highlights,
    paperIds: Array.from(paperIds),
    modeledTempNote,
    extraGaps,
  };
}

export function getRegionEpistemicState(
  regionId: RegionId,
  ageYears: number,
): RegionEpistemicState {
  const age = clamp(ageYears, 0, 122);
  const isUnchartedOver100 = age > 100;
  const inMrsTempWindow = age >= 20 && age <= 40;
  const inDtiLifespanWindow = age >= 5 && age <= 83;
  const inInfantMriWindow = age <= 2;

  // Empirical knowledge percentage [0..100] combining strictly measured empirical benchmarks
  let structuralScore = 0;
  let myelinScore = 0;
  let tempScore = 0;

  if (isUnchartedOver100) {
    structuralScore = 4;
    myelinScore = 2;
    tempScore = 0;
  } else {
    if (age <= 2) {
      structuralScore = regionId === 'hypothalamus' || regionId === 'brainstem' ? 32 : 44;
    } else if (age <= 18) {
      structuralScore = regionId === 'hypothalamus' || regionId === 'brainstem' ? 34 : 46;
    } else if (age <= 80) {
      structuralScore = regionId === 'hypothalamus' ? 34 : regionId === 'brainstem' ? 40 : 48;
    } else {
      structuralScore = lerp(42, 22, smoothstep(80, 100, age));
    }

    if (age >= 0.25 && age <= 1.0) {
      myelinScore =
        regionId === 'cerebellum' ||
        regionId === 'brainstem' ||
        regionId === 'corpus-callosum' ||
        regionId === 'occipital-lobe' ||
        regionId === 'parietal-lobe'
          ? 24
          : 20;
    } else if (age < 0.25) {
      myelinScore = 12;
    } else if (age > 1.0 && age < 5.0) {
      myelinScore = 14;
    } else if (inDtiLifespanWindow) {
      myelinScore =
        regionId === 'corpus-callosum' ||
        regionId === 'frontal-lobe' ||
        regionId === 'temporal-lobe' ||
        regionId === 'hippocampus'
          ? 26
          : 20;
    } else {
      myelinScore = 8;
    }

    if (inMrsTempWindow) {
      tempScore =
        regionId === 'thalamus' ||
        regionId === 'frontal-lobe' ||
        regionId === 'parietal-lobe' ||
        regionId === 'temporal-lobe' ||
        regionId === 'occipital-lobe' ||
        regionId === 'cerebral-cortex'
          ? 24
          : regionId === 'hypothalamus' || regionId === 'brainstem' || regionId === 'cerebellum'
            ? 16
            : 20;
    } else {
      tempScore = 0;
    }
  }

  const knownPct = clamp(Math.round(structuralScore + myelinScore + tempScore), 4, 98);
  const gapPct = 100 - knownPct;

  // 1. Size / Structure status at age
  let sizeStatus: string;
  if (isUnchartedOver100) {
    sizeStatus =
      'Uncharted (>100 yr): No normative MRI samples exist beyond age 100 in the 123,984-scan Bethlehem et al. dataset; geometry is held at the 100-year baseline (~86% of young-adult volume).';
  } else if (age < 0.3) {
    sizeStatus =
      'Neonatal explosive expansion (~35% adult volume at birth, growing ~1%/day and +64% over the first 90 days; cerebellum doubles in 90 days).';
  } else if (age <= 2) {
    sizeStatus =
      regionId === 'cerebellum'
        ? 'Rapid postnatal cerebellar expansion (+240% volume in Year 1 per Knickmeyer et al. 2008).'
        : regionId === 'hippocampus'
          ? 'Early medial temporal growth (~13% hippocampal volume expansion from Year 1 to Year 2; dentate gyrus proliferation declines sharply after 1–2 yr).'
          : 'Total brain volume doubles in Year 1 (+101%) and rises +15% in Year 2, led by cortical gray matter (+149%).';
  } else if (age < 6) {
    sizeStatus =
      isCorticalRegion(regionId)
        ? 'Approaching cortical gray matter peak (5.9 yr, Bethlehem et al. 2022) while reaching ~80–94% of adult brain volume; daily glucose uptake peaks at 5.2 yr.'
        : 'Steady early-childhood structural consolidation toward adolescent volume plateau; total parenchymal volume nears ~1,100 mL by 5–7 yr.';
  } else if (age < 15) {
    sizeStatus =
      regionId === 'thalamus' || regionId === 'hippocampus' || regionId === 'hypothalamus'
        ? 'Near subcortical gray matter volume peak (~14.4 yr in Bethlehem et al. 2022) alongside total cerebrum peak (~12.5 yr) and the age-9 connectome turning point.'
        : 'Near total cerebrum volume peak (~12.5 yr) across the age-9 connectome turning point (Mousley et al. 2025); cortical thickness thins (~3.2 → 2.8 mm) while white matter expands.';
  } else if (age <= 40) {
    sizeStatus =
      regionId === 'corpus-callosum'
        ? 'Peak callosal white-matter plateau (global white matter volume peaks at ~28.7 yr, Bethlehem et al. 2022).'
        : 'Mature adult structural baseline (1,120 mL parenchyma + 180 mL CSF = 1,300 mL ICV); global white matter volume peaks at 28.7 yr before slow mid-life decline.';
  } else if (age <= 80) {
    sizeStatus =
      'Gradual healthy aging volume decline tracked by normative MRI charts (more pronounced in cortex, hippocampus, and white matter).';
  } else {
    sizeStatus =
      'Late-senescence window (80–100 yr): represented in normative charts, but healthy sample density is substantially thinner than ages 18–75.';
  }

  // 2. Myelination status at age
  let myelinationStatus: string;
  if (isUnchartedOver100) {
    myelinationStatus =
      'Unmeasured (>100 yr): In vivo DTI tractography and myelin-water imaging lack normative healthy supercentenarian cohorts.';
  } else if (age < 0.25) {
    myelinationStatus =
      'Early neonatal caudocranial myelination concentrated in brainstem, cerebellar peduncles, and posterior internal capsule.';
  } else if (age <= 1.0) {
    if (regionId === 'cerebellum' || regionId === 'brainstem') {
      myelinationStatus =
        'Earliest rapid myelination phase (active from birth–3 mo in cerebellum and pons; Deoni et al. 2011).';
    } else if (regionId === 'occipital-lobe' || regionId === 'parietal-lobe') {
      myelinationStatus =
        'Active infant myelination wave sweeping across optic radiations (3–4 mo) into occipital and parietal lobes (4–6 mo).';
    } else {
      myelinationStatus =
        'Caudocranial progression reaching corpus callosum splenium (3–4 mo) and genu, frontal & temporal lobes (6–8 mo).';
    }
  } else if (age < 5) {
    myelinationStatus =
      'Continued rapid toddler myelination; corpus callosum oligodendrocyte populations front-load prior to age 5 (¹⁴C dating) before lifespan DTI charts begin at age 5.';
  } else if (age <= 42) {
    myelinationStatus =
      regionId === 'corpus-callosum' || regionId === 'hippocampus'
        ? 'Fractional anisotropy (FA) rises through childhood/adolescence, peaking earlier in corpus callosum & fornix (~20–30 yr; Lebel et al. 2012) while existing oligodendrocytes remodel myelin sheaths.'
        : 'Microstructural maturation: DTI FA increases through adolescence and peaks between 20 and 42 yr, with superficial white-matter (SWM) U-fibers thickening 1–1.5%/yr from primary toward association gyri.';
  } else if (age <= 83) {
    myelinationStatus =
      'Gradual age-related decline in DTI fractional anisotropy and rise in radial diffusivity tracked through age 83 (Lebel et al. 2012).';
  } else {
    myelinationStatus =
      'Sparse empirical DTI data beyond age 83; normative microstructural trajectories are extrapolated from 65–83 yr cohorts.';
  }

  // 3. Temperature status at age (empirical values ONLY for 20–40 yr per Rzechorzek 2022)
  let tempCelsius: number | null = null;
  let temperatureStatus: string;
  if (inMrsTempWindow) {
    const base = getAdultBaselineTempCelsius(regionId);
    if (base !== null) {
      const ageShift =
        regionId === 'thalamus' || regionId === 'hypothalamus' || regionId === 'hippocampus'
          ? ((age - 20) / 20) * 0.6 - 0.3
          : ((age - 20) / 20) * 0.2 - 0.1;
      tempCelsius = Number((base + ageShift).toFixed(1));
      temperatureStatus = `Measured (~${tempCelsius.toFixed(1)} °C regional baseline): Within the 20–40 yr 4D MRS healthy cohort (overall mean 38.5 °C, range 36.1–40.9 °C, warmest in deep structures such as thalamus; Rzechorzek et al. 2022).`;
    } else {
      temperatureStatus = 'Aggregate cerebral thermometry measured (mean 38.5 °C, range 36.1–40.9 °C).';
    }
  } else if (isUnchartedOver100) {
    temperatureStatus =
      'Unmeasured (>100 yr): Zero non-invasive 4D MRS brain thermometry studies exist in healthy supercentenarians.';
  } else if (age < 20) {
    temperatureStatus =
      'Unmeasured Gap (0–19 yr): No healthy normative pediatric brain temperature atlas currently exists; HEATWAVE 4D ¹H-MRS (Rzechorzek et al. 2022) only sampled adults aged 20–40 yr.';
  } else {
    temperatureStatus =
      'Unmeasured Gap (>40 yr): Healthy non-invasive circadian 4D MRS brain thermometry has not yet been normatively mapped above age 40.';
  }

  const ownResearch = buildOwnResearchForRegion(regionId, age);

  // Build citations relevant to this region & age (Own Research papers included first when active)
  const citations: ResearchPaperCitation[] = [];
  for (const paperId of ownResearch.paperIds) {
    const paper = RESEARCH_PAPERS[paperId];
    if (paper) citations.push(paper);
  }
  citations.push(RESEARCH_PAPERS.bethlehem2022);
  if (inInfantMriWindow) {
    citations.push(RESEARCH_PAPERS.knickmeyer2008, RESEARCH_PAPERS.holland2014, RESEARCH_PAPERS.deoni2011);
  }
  if (regionId === 'corpus-callosum') {
    citations.push(RESEARCH_PAPERS.tanaka2015, RESEARCH_PAPERS.lebel2012);
  } else if (!inInfantMriWindow) {
    citations.push(RESEARCH_PAPERS.lebel2012);
  }
  citations.push(RESEARCH_PAPERS.rzechorzek2022);

  const uniqueCitations = Array.from(new Map(citations.map((c) => [c.id, c])).values());
  const ownResearchCount = uniqueCitations.filter((c) => c.isOwnResearch).length;

  // Build explicit "What We Don't Know (Gaps)"
  const gaps: string[] = [];
  if (isUnchartedOver100) {
    gaps.push(
      'No normative structural MRI growth charts exist beyond age 100 (101–122 yr); the 123,984-scan Bethlehem et al. (2022) dataset terminates at 100 years.',
    );
    gaps.push(
      'Zero empirical healthy myelination (DTI/myelin-water) or non-invasive 4D MRS thermometry benchmarks exist for supercentenarians.',
    );
  } else {
    if (!inMrsTempWindow) {
      gaps.push(
        age < 20
          ? 'Healthy regional brain temperature and diurnal thermal rhythms are unmeasured for ages 0–19 yr (Rzechorzek et al. 2022 HEATWAVE baseline covers ages 20–40 yr).'
          : 'Healthy regional 4D MRS brain temperature and circadian thermal shifts are not yet normatively chartered above age 40.',
      );
    }
    if (age > 83) {
      gaps.push(
        'In vivo white-matter DTI tractography (Lebel et al. 2012 spans 5–83 yr) lacks dense normative benchmarks past age 83.',
      );
    } else if (age > 1 && age < 5) {
      gaps.push(
        'Limited continuous quantitative myelin-water and DTI tractography sampling between ages 1 and 5 across healthy cohorts.',
      );
    }
    if (regionId === 'hypothalamus') {
      gaps.push(
        'Sub-millimeter hypothalamic nuclei remain challenging to parcellate reliably in large-scale multi-site 1.5T/3T MRI atlases.',
      );
    } else if (regionId === 'brainstem') {
      gaps.push(
        'Fine cranial-nerve nuclei and pontine/medullary sub-tracts lack high-resolution normative lifespan MRI trajectories across 0–100 yr.',
      );
    } else {
      gaps.push(
        'Normative MRI datasets exhibit geographic and demographic sampling bias and rely largely on cross-sectional rather than decades-long within-person scans.',
      );
    }
  }

  for (const g of ownResearch.extraGaps) {
    gaps.push(g);
  }

  return {
    regionId,
    ageYears: age,
    knownPct,
    gapPct,
    isUnchartedOver100,
    hasOwnResearch: ownResearchCount > 0,
    ownResearchCount,
    sizeStatus,
    myelinationStatus,
    temperatureStatus,
    modeledTempNote: ownResearch.modeledTempNote,
    tempCelsius,
    ownResearchHighlights: ownResearch.highlights,
    citations: uniqueCitations,
    gaps,
  };
}

export function getOverallKnowledgeCoverage(ageYears: number): {
  knownPct: number;
  gapPct: number;
  isUnchartedOver100: boolean;
} {
  let sum = 0;
  for (const id of MAJOR_EPISTEMIC_REGIONS) {
    sum += getRegionEpistemicState(id, ageYears).knownPct;
  }
  const knownPct = Math.round(sum / MAJOR_EPISTEMIC_REGIONS.length);
  return {
    knownPct,
    gapPct: 100 - knownPct,
    isUnchartedOver100: ageYears > 100,
  };
}

export function getKnowledgeColorRGB(knownPct: number): [number, number, number] {
  if (knownPct >= 75) {
    return [0.22, 0.72, 0.54];
  }
  if (knownPct >= 35) {
    return [0.85, 0.60, 0.24];
  }
  return [0.70, 0.27, 0.34];
}

export function getNormalizedTempForShader(regionId: RegionId, ageYears: number): number {
  const state = getRegionEpistemicState(regionId, ageYears);
  if (state.tempCelsius === null) return -1;
  return clamp((state.tempCelsius - 37.6) / (39.5 - 37.6), 0, 1);
}
