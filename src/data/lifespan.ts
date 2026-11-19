import {
  BRAIN_REGIONS,
  isCranialNerveRegion,
  isNerveRegion,
  isVesselRegion,
  type RegionId,
} from './neuroanatomy';

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

export interface CorticalMorphologyState {
  ageYears: number;
  gestationalWeek: number;
  isPrenatal: boolean;
  primaryFold: number; // 0..1 (Sylvian, Central, Calcarine, PO, Cingulate)
  secondaryFold: number; // 0..1 (Serpentine secondary gyri)
  tertiaryFold: number; // 0..1 (Fine tertiary sulcal branching)
  sulcalWidening: number; // 0..1 (Aging atrophy widening sulcal clefts & thinning crowns)
  cerebellumRelScale: number; // Relative scale multiplier for Yr-1 +240% catch-up
  ventricleRelScale: number; // Relative fetal prominence -> adult -> mild aging enlargement
  morphStageLabel: string;
  nerveStageLabel: string;
}

export interface RegionEpistemicState {
  regionId: RegionId;
  ageYears: number;
  gestationalWeek: number;
  isPrenatal: boolean;
  knownPct: number;
  gapPct: number;
  isUnchartedOver100: boolean;
  hasOwnResearch: boolean;
  ownResearchCount: number;
  morphogenesisStatus: string;
  sizeStatus: string;
  myelinationStatus: string;
  temperatureStatus: string;
  modeledTempNote?: string;
  tempCelsius: number | null;
  ownResearchHighlights: OwnResearchHighlight[];
  citations: ResearchPaperCitation[];
  gaps: string[];
}

/**
 * Regions explicitly covered across Toiab Zahoor's 4 manuscripts.
 * All other regions (cranial/spinal/autonomic/meningeal nerves, brainstem, hypothalamus,
 * and major basal/cortical arterial branches) strictly remain peer-reviewed literature only.
 */
export const OWN_RESEARCH_REGIONS: ReadonlySet<RegionId> = new Set<RegionId>([
  'cerebral-cortex',
  'frontal-lobe',
  'parietal-lobe',
  'temporal-lobe',
  'occipital-lobe',
  'corpus-callosum',
  'hippocampus',
  'thalamus',
  'cerebellum',
  'ventricles',
  'vasculature',
  'vessel-venous-sinuses',
]);

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
  white2010: {
    id: 'white2010',
    authors: 'White T, Su S, Schmidt M, Kao CY, Sapiro G.',
    year: 2010,
    title: 'The development of gyrification in childhood and adolescence',
    journal: 'Brain and Cognition 72(1), 36–45',
    doi: '10.1016/j.bandc.2009.10.009',
    pmcId: 'PMC2815169',
    verbatimQuote:
      'Gyrification is the process by which the brain undergoes changes in surface morphology to create sulcal and gyral regions. The period of greatest development of brain gyrification is during the third trimester of pregnancy, a period of time in which the brain undergoes considerable growth.',
  },
  smit2022: {
    id: 'smit2022',
    authors: 'Smit JA, Jacobs K, Bais B, et al.',
    year: 2022,
    title: 'A three-dimensional analysis of the development of cranial nerves in human embryos',
    journal: 'Clinical Anatomy 35(5), 666–676',
    doi: '10.1002/ca.23889',
    pmcId: 'PMC9320974',
    verbatimQuote:
      'A total of 28 sectioned and histologically stained human embryos (Carnegie stage [CS] 10 to 23 [21–60 days of development]) were completely digitalized by manual annotation using Amira software. Most cranial nerves start developing at CS 12 to 13 (26–32 days of development) and will reach their target organ in stage 17 to 18 (41–46 days).',
  },
  yamada2010: {
    id: 'yamada2010',
    authors: 'Yamada S, Samtani RR, Lee ES, et al.',
    year: 2010,
    title: 'Developmental Atlas of the Early First Trimester Human Embryo',
    journal: 'Developmental Dynamics 239(6), 1585–1595',
    doi: '10.1002/dvdy.22316',
    pmcId: 'PMC2886105',
    verbatimQuote:
      'To obtain data on early human development, we used magnetic resonance (MR) imaging and episcopic fluorescence capture (EFIC) to acquire digital images of human embryos spanning the time of dynamic tissue remodeling and organogenesis (Carnegie stages 13 to 23).',
  },
  willie2014: {
    id: 'willie2014',
    authors: 'Willie CK, Tzeng YC, Fisher JA, Ainslie PN.',
    year: 2014,
    title: 'Integrative regulation of human brain blood flow',
    journal: 'The Journal of Physiology 592(5), 841–859',
    doi: '10.1113/jphysiol.2013.268953',
    pmcId: 'PMC3948549',
    verbatimQuote:
      'neurogenic control of the cerebral vasculature is an important player in autoregulatory function and, crucially, acts to buffer surges in perfusion pressure.',
  },
  lee2017: {
    id: 'lee2017',
    authors: 'Lee SH, Shin KS, Koh KC, Song WC.',
    year: 2017,
    title: 'Visualization of the tentorial innervation of human dura mater',
    journal: 'Journal of Anatomy 231(5), 683–689',
    doi: '10.1111/joa.12659',
    pmcId: 'PMC5643920',
    verbatimQuote:
      'Posterior projections of the ophthalmic division of the trigeminal nerve (the ophthalmic nerve) are distributed in the tentorium cerebelli as recurrent meningeal branches.',
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
  iqbal2013: {
    id: 'iqbal2013',
    authors: 'Iqbal S.',
    year: 2013,
    title: 'A Comprehensive Study of the Anatomical Variations of the Circle of Willis in Adult Human Brains',
    journal: 'Journal of Clinical and Diagnostic Research 7(11), 2423–2427',
    doi: '10.7860/JCDR/2013/6580.3563',
    pmcId: 'PMC3879841',
    verbatimQuote:
      'Majority of the circles (52%) showed anomalies. Hypoplasia was the most frequent anomaly and was found in 24% of the brains. Accessory vessels in the form of duplications/triplications of anterior communicating artery were seen in 12% of the circles. The embryonic origin of the posterior cerebral artery from the internal carotid persisted in 10% of the circles.',
  },
  satterthwaite2014: {
    id: 'satterthwaite2014',
    authors: 'Satterthwaite TD, Shinohara RT, Wolf DH, et al.',
    year: 2014,
    title: 'Impact of puberty on the evolution of cerebral perfusion during adolescence',
    journal: 'Proceedings of the National Academy of Sciences (PNAS) 111(23), 8643–8648',
    doi: '10.1073/pnas.1400178111',
    pmcId: 'PMC4060683',
    verbatimQuote:
      'Capitalizing on a sample of 922 youths ages 8–22 y imaged using arterial spin labeled MRI as part of the Philadelphia Neurodevelopmental Cohort',
  },
  louveau2015: {
    id: 'louveau2015',
    authors: 'Louveau A, Smirnov I, Keyes TJ, et al.',
    year: 2015,
    title: 'Structural and functional features of central nervous system lymphatic vessels',
    journal: 'Nature 523, 337–341',
    doi: '10.1038/nature14432',
    verbatimQuote:
      'In searching for T-cell gateways into and out of the meninges, we discovered functional lymphatic vessels lining the dural sinuses.',
  },
  liang2002: {
    id: 'liang2002',
    authors: 'Liang L, Korogi Y, Sugahara T, et al.',
    year: 2002,
    title: 'Normal structures in the intracranial dural sinuses: delineation with 3D contrast-enhanced magnetization prepared rapid acquisition gradient-echo imaging sequence',
    journal: 'AJNR American Journal of Neuroradiology 23(10), 1739–1746',
    pmcId: 'PMC8185820',
    verbatimQuote:
      'Of 431 arachnoid granulations, 233 (53.8%) were located in the superior sagittal sinus, 122 (28.1%) in the transverse sinus, and 76 (17.6%) in the straight sinus.',
  },
  yousry2000: {
    id: 'yousry2000',
    authors: 'Yousry I, Camelio S, Schmid UD, et al.',
    year: 2000,
    title: 'Visualization of cranial nerves I–XII: value of 3D CISS and T2-weighted FSE sequences',
    journal: 'European Radiology 10(7), 1061–1067',
    doi: '10.1007/s003300000378',
    verbatimQuote:
      'Visualization of cranial nerves I–XII along their cisternal courses using 0.7 mm 3D CISS MRI reached 100% for NI, NII, NIII, NV, NVII, NVIII, and NIX–NXII, 97.5% for NVI, and 47.5% for the slender trochlear nerve (NIV).',
  },
  tai2016: {
    id: 'tai2016',
    authors: 'Tai AX, Nayar VV.',
    year: 2016,
    title: 'Neurovascular Compression at the Root Entry Zone Correlates with Trigeminal Neuralgia and Early Microvascular Decompression Outcome',
    journal: 'World Neurosurgery 96, 297–302',
    doi: '10.1016/j.wneu.2016.08.040',
    pmcId: 'PMC5143191',
    verbatimQuote:
      'We conclude that in TGN patients treated with MVD, magnetic resonance imaging identified neurovascular compression at the root entry zone correlates with the affected side and early postoperative pain relief.',
  },
  buschhuter2008: {
    id: 'buschhuter2008',
    authors: 'Buschhüter D, Smitka M, Puschmann S, et al.',
    year: 2008,
    title: 'Correlation between olfactory bulb volume and olfactory function',
    journal: 'NeuroImage 42(2), 498–502',
    doi: '10.1016/j.neuroimage.2008.05.004',
    verbatimQuote:
      'Significant correlations between OB volumes in relation to olfactory function were observed, independent of the subjects’ age. Additionally, OB volumes decreased with age.',
  },
  bedewi2023: {
    id: 'bedewi2023',
    authors: 'Bedewi MA, Kotb MA, Almalki DM, et al.',
    year: 2023,
    title: 'Ultrasound of the normal vagus nerve cross-sectional area in the carotid sheath',
    journal: 'Medicine 102(23), e33996',
    doi: '10.1097/MD.0000000000033996',
    pmcId: 'PMC10256391',
    verbatimQuote:
      'The mean CSA of the right VN in the carotid sheath was 2.1 and 1.9 mm2 for the left VN. The right VN CSA was significantly larger than the left VN (P < .012).',
  },
  // --- Dedicated & Multi-Nerve Verified Literature for the Whole Nervous System ---
  zheng2021_optic: {
    id: 'zheng2021_optic',
    authors: 'Zheng YM, Hao DP, Tang GZ, Zhou RZ, et al.',
    year: 2021,
    title: 'High-resolution MRI assessment of optic nerve sheath diameter in adults: optic nerve sheath variation and a new diagnostic tool for intracranial hypertension',
    journal: 'Acta Radiol 62(10), 1397–1403',
    doi: '10.1177/0284185120966715',
    verbatimQuote:
      'A total of 145 relatively healthy adults and 40 patients with acute IH who underwent high-resolution magnetic resonance imaging (MRI) were enrolled in this study.',
  },
  sananmuang2021_oculomotor: {
    id: 'sananmuang2021_oculomotor',
    authors: 'Sananmuang T, Boonsiriwattanakul C, Panyaping T.',
    year: 2021,
    title: 'Signal intensity pattern of the normal oculomotor nerve on contrast-enhanced 3D FLAIR at 3.0 T MRI',
    journal: 'Neuroradiol J 34(2), 99–104',
    doi: '10.1177/1971400920970918',
    pmcId: 'PMC8041401',
    verbatimQuote:
      'The aim of this study was to depict the signal intensity pattern of the normal oculomotor nerve demonstrated on contrast-enhanced three-dimensional fluid-attenuated inversion recovery images. Eighty-one patients were included in the study.',
  },
  lemmerling1999_abducens: {
    id: 'lemmerling1999_abducens',
    authors: 'Lemmerling M, De Praeter G, Mortelé K, Vyt S, et al.',
    year: 1999,
    title: 'Imaging of the normal pontine cisternal segment of the abducens nerve, using three-dimensional constructive interference in the steady state MRI',
    journal: 'Neuroradiology 41(5), 384–386',
    doi: '10.1007/s002340050770',
    verbatimQuote:
      'The cisternal segment was seen in 79% of cases, bilaterally in 73% and unilaterally in 11% of cases; neither cisternal segment was seen in 16% of cases. Identification of Dorello’s canal was often of help in detecting the nerve.',
  },
  nishihara2017_cn9: {
    id: 'nishihara2017_cn9',
    authors: 'Nishihara M, Noguchi T, Kawashima M, Azama S, et al.',
    year: 2017,
    title: 'Magnetic Resonance (MR) Imaging Assessment for Glossopharyngeal Neuralgia: Value of Three-Dimensional T2-Reversed MR Imaging (3D-T2R) in Conjunction with Other Modes of 3D MR Imaging',
    journal: 'Pol J Radiol 82, 638–644',
    doi: '10.12659/PJR.902896',
    pmcId: 'PMC5894067',
    verbatimQuote:
      'Imaging findings on 3D-T2R, constructive interference in steady state (CISS), and MRA were analyzed with reference to operative charts in 10 patients with GPN. Offending vessels were associated with the posterior inferior cerebellar artery (PICA) in 9 of 10 patients (90%).',
  },
  tai2025_accessory: {
    id: 'tai2025_accessory',
    authors: 'Tai Z, Liu L, Wang T, Wang Y, et al.',
    year: 2025,
    title: 'High-resolution ultrasound imaging of the spinal accessory nerve and associated injuries based on a prospective normative study and retrospective analysis',
    journal: 'Sci Rep 15(1), 40062',
    doi: '10.1038/s41598-025-26644-3',
    pmcId: 'PMC12623902',
    verbatimQuote:
      'A prospective study was conducted in 60 healthy volunteers, in whom the SAN was categorized into three segments: between the trapezius and levator scapulae (S1), from the surface of the levator scapulae to the posterior border of the sternocleidomastoid muscle (SCM) (S2), and from the posterior border of the SCM to the upper cervical region (S3).',
  },
  geng2021_hypoglossal: {
    id: 'geng2021_hypoglossal',
    authors: 'Geng C, Lu Z, Xuan L, Yin H, et al.',
    year: 2021,
    title: 'Hypoglossal Nerve Lesions: The Role of a 3D IR-Prepped Fast SPGR High-Resolution 3T MRI Sequence',
    journal: 'J Neuroimaging 31(1), 180–185',
    doi: '10.1111/jon.12762',
    verbatimQuote:
      'Conventional enhanced scanning could not clearly display the hypoglossal nerve and canal, while the enhanced 3D high-resolution sequence could.',
  },
  cartwright2008: {
    id: 'cartwright2008',
    authors: 'Cartwright MS, Passmore LV, Yoon JS, Brown ME, et al.',
    year: 2008,
    title: 'Cross-sectional area reference values for nerve ultrasonography',
    journal: 'Muscle Nerve 37(5), 566–571',
    doi: '10.1002/mus.21009',
    verbatimQuote:
      'our goal was to obtain reference values for the nerve cross-sectional area at the following sites: radial at antecubital fossa; radial at distal spiral groove; musculocutaneous in upper arm; trunks of the brachial plexus; vagus at carotid bifurcation; sciatic in distal thigh; tibial in popliteal fossa; tibial in proximal calf; tibial at ankle; peroneal in popliteal fossa; peroneal at fibular head; and sural in distal calf.',
  },
  qrimli2016: {
    id: 'qrimli2016',
    authors: 'Qrimli M, Ebadi H, Breiner A, Siddiqui H, et al.',
    year: 2016,
    title: 'Reference values for ultrasonograpy of peripheral nerves',
    journal: 'Muscle Nerve 53(4), 538–544',
    doi: '10.1002/mus.24888',
    verbatimQuote:
      'One hundred healthy volunteers had HRU of median, radial, ulnar, fibular, tibial, sural, and superficial fibular nerves at defined sites. CSA is larger in lower limb motor nerves than in sensory nerves at similar sites, and the CSA tends to be symmetrical. The strongest effect on CSA was for age, although gender and BMI had some effects.',
  },
  frostell2018_cord: {
    id: 'frostell2018_cord',
    authors: 'Frostell A, Mattsson P, Svensson M.',
    year: 2018,
    title: 'Guiding Device for Precision Grafting of Peripheral Nerves in Complete Thoracic Spinal Cord Injury: Design and Sizing for Clinical Trial',
    journal: 'Front Neurol 9, 356',
    doi: '10.3389/fneur.2018.00356',
    pmcId: 'PMC5972322',
    verbatimQuote:
      'Spinal cord segmental sizes were generated by computer simulation based on data from a meta-analysis recently published by our group. Thoracic segments T2-T12 were plotted, and seven elliptical shapes were positioned across the variability of human thoracic spinal cord segments.',
  },
  saifuddin1998_conus: {
    id: 'saifuddin1998_conus',
    authors: 'Saifuddin A, Burnett SJ, White J.',
    year: 1998,
    title: 'The variation of position of the conus medullaris in an adult population. A magnetic resonance imaging study',
    journal: 'Spine 23(13), 1452–1456',
    doi: '10.1097/00007632-199807010-00005',
    verbatimQuote:
      'Cadaveric studies have shown that the position of the conus medullaris in the adult most commonly is located at L1-L2. The T1-weighted, midline, sagittal, spin-echo magnetic resonance imaging studies of 504 patients were assessed.',
  },
  sun2022_conus: {
    id: 'sun2022_conus',
    authors: 'Sun M, Tao B, Gao G, Wang H, et al.',
    year: 2022,
    title: 'Determination of the normal conus medullaris level in term infants: the role of MRI in early infancy',
    journal: 'J Neurosurg Pediatr 29(1), 100–105',
    doi: '10.3171/2021.7.PEDS21284',
    verbatimQuote:
      'This study aimed to explore the migration process of the conus medullaris (CM) in early infancy using infant MRI and to evaluate the application of MRI for locating the infant CM level.',
  },
  bedewi2023_phrenic: {
    id: 'bedewi2023_phrenic',
    authors: 'Bedewi MA, Habib YS, Sifey AA, Kotb MA, et al.',
    year: 2023,
    title: 'Ultrasound imaging of the phrenic nerve at the scalene muscle level',
    journal: 'Medicine 102(30), e34181',
    doi: '10.1097/MD.0000000000034181',
    pmcId: 'PMC10378953',
    verbatimQuote:
      'The study included 62 PNs in 31 healthy subjects (13 men, 18 women); mean age, 36.6 years. The mean CSA of the right PN was 0.54 mm2 ± 0.16. The mean CSA of the left PN was 0.53 mm2 ± 0.18.',
  },
  bedewi2021_bp: {
    id: 'bedewi2021_bp',
    authors: 'Bedewi MA, Kotb MA.',
    year: 2021,
    title: 'Ultrasound reference values of C5, C6, and C7 brachial plexus roots at the interscalene groove',
    journal: 'Neurol Sci 42(6), 2425–2429',
    doi: '10.1007/s10072-020-04836-1',
    verbatimQuote:
      'Fifty nine (27 males, 32 females) subjects were enrolled in the study. The mean CSA of the brachial plexus roots was as follows: C5 nerve root was 5.1 mm2 (range 1.7-11.1 ± 1.9 SD), C6 nerve root CSA 5.8 mm2 (range 1.7-12 ± 2.4 SD), and C7 nerve root 6.3 mm2.',
  },
  yoon2019_axillary: {
    id: 'yoon2019_axillary',
    authors: 'Yoon JS, Park JH, Levin J, Roh EY, et al.',
    year: 2019,
    title: 'Ultrasonographic measurement of the cross-sectional area of the axillary nerve',
    journal: 'Muscle Nerve 60(1), 95–99',
    doi: '10.1002/mus.26480',
    verbatimQuote:
      'Sixty healthy volunteers were evaluated. The normal CSA of the right axillary nerve was 2.9 ± 1.1 mm2. The side-to-side discrepancy was 22.8% ± 17.8%.',
  },
  matsumoto2018_musculocut: {
    id: 'matsumoto2018_musculocut',
    authors: 'Matsumoto ME, Berry J, Yung H, Matsumoto M, et al.',
    year: 2018,
    title: 'Comparing Electrical Stimulation With and Without Ultrasound Guidance for Phenol Neurolysis to the Musculocutaneous Nerve',
    journal: 'PM R 10(4), 357–364',
    doi: '10.1016/j.pmrj.2017.09.006',
    pmcId: 'PMC5854520',
    verbatimQuote:
      'Ultrasound visualization with e-stim-guided neurolysis can potentially allow adjustments in injection protocols that will reduce the volume of neurolytic agent needed to achieve clinical improvement in the musculocutaneous nerve.',
  },
  singh2021_radial: {
    id: 'singh2021_radial',
    authors: 'Singh KP, Goindi AS, Gupta K.',
    year: 2021,
    title: 'Reference values for the cross-sectional area of normal radial nerve at two levels using high-resolution ultrasonography',
    journal: 'J Ultrason 21(85), e112–e126',
    doi: '10.15557/JoU.2021.0020',
    pmcId: 'PMC8264814',
    verbatimQuote:
      'The aim of the study is to establish the reference values for the cross-sectional area of the normal radial nerve on high-resolution ultrasonography. The study was conducted on 200 subjects of both sexes, between 18 and 75 years of age.',
  },
  huttin2026_intercostal: {
    id: 'huttin2026_intercostal',
    authors: 'Huttin G, Mari R, Challita R, Rieussec C, et al.',
    year: 2026,
    title: 'Anatomical Study of the Lateral Cutaneous Branch of the Intercostal Nerves in the Intramuscular Portion',
    journal: 'Cureus 18(4), e107665',
    doi: '10.7759/cureus.107665',
    pmcId: 'PMC13198931',
    verbatimQuote:
      'The lateral cutaneous branch (LCB) of the intercostal nerves (ICNs) is classically described as a sensory nerve supplying the lateral thoracic wall. However, it may also contribute to the innervation of the intercostal muscles and the digitations of the serratus anterior.',
  },
  gruber2003_femoral: {
    id: 'gruber2003_femoral',
    authors: 'Gruber H, Peer S, Kovacs P, Marth R, et al.',
    year: 2003,
    title: 'The ultrasonographic appearance of the femoral nerve and cases of iatrogenic impairment',
    journal: 'J Ultrasound Med 22(2), 163–172',
    doi: '10.7863/jum.2003.22.2.163',
    verbatimQuote:
      'In 1 unembalmed cadaveric specimen and 20 healthy volunteers (9 male and 11 female, 18-50 years; n = 40 scans), the topographic features, cross-sectional shapes (oval or triangular), and cross-sectional areas of the femoral nerves were evaluated by ultrasonography.',
  },
  yoshimura2018_femoral: {
    id: 'yoshimura2018_femoral',
    authors: 'Yoshimura M, Nakanishi T, Sakamoto S, Toriumi T.',
    year: 2018,
    title: 'Age is a predictive factor in the femoral nerve positioning: an anatomical ultrasound study',
    journal: 'J Anesth 32(5), 777–780',
    doi: '10.1007/s00540-018-2544-2',
    verbatimQuote:
      'In this prospective observational study, we evaluated the FN-FA distance [0.42 ± 0.42 cm] in 102 patients using ultrasound. Multiple regression analyses revealed that age was significantly and positively correlated with the FN-FA distance (R2 = 0.72).',
  },
  uchino2026_obturator: {
    id: 'uchino2026_obturator',
    authors: 'Uchino T, Miura M, Shingu C, Abe N, et al.',
    year: 2026,
    title: 'Anatomical variations of the external obturator muscle and their impact on injectate spread to the obturator canal: a cadaveric study related to ultrasound-guided proximal obturator nerve block',
    journal: 'J Anesth',
    doi: '10.1007/s00540-026-03835-4',
    verbatimQuote:
      'We anatomically investigated whether the superior fasciculus (SF) of the external obturator muscle (EOM) influences the spread of dye into the obturator canal, in a cadaveric model simulating a proximal ultrasound-guided obturator nerve block.',
  },
  suganya2025_pudendal: {
    id: 'suganya2025_pudendal',
    authors: 'Suganya G, Ray B, Bharadwaj Y.',
    year: 2025,
    title: 'Morphology and morphometry of pudendal nerve in East Indian population with surgical implications: a cadaveric study',
    journal: 'Anat Cell Biol 58(3), 388–394',
    doi: '10.5115/acb.25.012',
    pmcId: 'PMC12519013',
    verbatimQuote:
      'Pudendal nerve entrapment clinically has a wide spectrum of presentation ranging from urinary to anorectal and sexual dysfunction. A detailed dissection of pudendal nerve was done and the morphology and morphometry of the pudendal nerve were studied in 10 cadavers with equal sex distribution.',
  },
  franco2024_sympathetic: {
    id: 'franco2024_sympathetic',
    authors: 'Franco-Riveros VB, Pividori SM, Martin TI, Nicora FE, et al.',
    year: 2024,
    title: 'Anatomical study with clinical significance of communicating and visceral branching of the cervical and upper thoracic sympathetic trunk',
    journal: 'Clin Anat 37(8), 886–899',
    doi: '10.1002/ca.24149',
    verbatimQuote:
      'Our objective was to enhance our understanding of the origin and distribution of communicating branches and visceral cervicothoracic sympathetic nerves in human fetuses through a comprehensive topographic systematization of the branching patterns observed in the cervical and upper thoracic ganglia.',
  },
  forrester2026_splanchnic: {
    id: 'forrester2026_splanchnic',
    authors: 'Forrester D, Davis N, Richards D, Mitchell T, et al.',
    year: 2026,
    title: 'Relationship Between the Azygos Vein and the Greater Splanchnic Nerve: Application to Nerve Ablation Procedures for Improving Cardiac Function',
    journal: 'Clin Anat',
    doi: '10.1002/ca.70161',
    verbatimQuote:
      'The anatomy and relationships of the right greater splanchnic nerve (GSN) and the azygos vein were investigated in 50 adult anatomical donors.',
  },
  yamashita2017_pelvic: {
    id: 'yamashita2017_pelvic',
    authors: 'Yamashita R, Isoda H, Arizono S, Furuta A, et al.',
    year: 2017,
    title: 'Selective visualization of pelvic splanchnic nerve and pelvic plexus using readout-segmented echo-planar diffusion-weighted magnetic resonance neurography: A preliminary study in healthy male volunteers',
    journal: 'Eur J Radiol 86, 52–57',
    doi: '10.1016/j.ejrad.2016.10.034',
    verbatimQuote:
      'To evaluate the potential of readout-segmented echo-planar diffusion-weighted magnetic resonance neurography (RS-EPI DW-MRN) for the selective visualization of pelvic splanchnic nerve and pelvic plexus in healthy male volunteers.',
  },
  furness2012_ens: {
    id: 'furness2012_ens',
    authors: 'Furness JB.',
    year: 2012,
    title: 'The enteric nervous system and neurogastroenterology',
    journal: 'Nat Rev Gastroenterol Hepatol 9(5), 286–294',
    doi: '10.1038/nrgastro.2012.32',
    verbatimQuote:
      'Neurogastroenterology is defined as neurology of the gastrointestinal tract, liver, gallbladder and pancreas and encompasses control of digestion through the enteric nervous system (ENS), the central nervous system (CNS) and integrative centers in sympathetic ganglia.',
  },
};

export const VESSEL_REGION_IDS: RegionId[] = [
  'vessel-circle-of-willis',
  'vessel-aca',
  'vessel-mca',
  'vessel-pca',
  'vessel-vertebrobasilar',
  'vessel-venous-sinuses',
  'vessel-cortical-veins',
];

export const CRANIAL_NERVE_REGION_IDS: RegionId[] = [
  'cn-i-olfactory',
  'cn-ii-optic',
  'cn-iii-oculomotor',
  'cn-iv-trochlear',
  'cn-v-trigeminal',
  'cn-vi-abducens',
  'cn-vii-facial',
  'cn-viii-vestibulocochlear',
  'cn-ix-glossopharyngeal',
  'cn-x-vagus',
  'cn-xi-accessory',
  'cn-xii-hypoglossal',
];

export const PERIPHERAL_NERVE_REGION_IDS: RegionId[] = [
  'nerve-cervical-spinal',
  'nerve-sympathetic-carotid',
  'nerve-parasympathetic-ganglia',
  'nerve-meningeal-dural',
];

export const BODY_NERVE_REGION_IDS: RegionId[] = [
  'spinal-cord-thoracic',
  'spinal-cord-lumbosacral',
  'nerve-cauda-equina',
  'nerve-phrenic',
  'nerve-brachial-plexus',
  'nerve-axillary',
  'nerve-musculocutaneous',
  'nerve-radial',
  'nerve-median',
  'nerve-ulnar',
  'nerve-intercostal',
  'nerve-lumbar-plexus',
  'nerve-femoral',
  'nerve-obturator',
  'nerve-sciatic',
  'nerve-tibial',
  'nerve-fibular-sural',
  'nerve-pudendal',
  'nerve-sympathetic-chain',
  'nerve-pelvic-splanchnic',
  'nerve-enteric-plexus',
];

export const ALL_NERVE_REGION_IDS: RegionId[] = [
  ...CRANIAL_NERVE_REGION_IDS,
  ...PERIPHERAL_NERVE_REGION_IDS,
  ...BODY_NERVE_REGION_IDS,
];

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

export const MIN_AGE_YEARS = -36 / 52; // GW 4.0 (Carnegie Stage 11–12 embryonic nerve & vesicle emergence)
export const MAX_AGE_YEARS = 122;
export const QUICK_JUMP_AGES = [0, 0.5, 6, 28, 75, 100, 122] as const;
export const PRENATAL_QUICK_JUMP_WEEKS = [4, 6, 14, 22, 30, 38, 40] as const;

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

export function gestationalWeekToAgeYears(gw: number): number {
  const clampedGw = clamp(gw, 4, 40);
  return (clampedGw - 40) / 52;
}

export function ageYearsToGestationalWeek(ageYears: number): number {
  if (ageYears >= 0) return 40;
  return clamp(40 + ageYears * 52, 4, 40);
}

export function isPrenatalAge(ageYears: number): boolean {
  return ageYears < -0.005;
}

/**
 * Published human whole-brain volume trajectory normalized to adult baseline (age 28 = 1.00),
 * extending seamlessly down to GW4 prenatal neurogenesis and up to 122 yr.
 */
const VOLUME_ANCHORS: readonly [number, number][] = [
  [MIN_AGE_YEARS, 0.003], // GW4 neural tube vesicles (~4 mL)
  [-32 / 52, 0.009], // GW8 (~10 mL)
  [-26 / 52, 0.032], // GW14 (~36 mL)
  [-18 / 52, 0.095], // GW22 (~106 mL; Bethlehem fetal charts start ~16.5 GW / 115 dpc)
  [-10 / 52, 0.21], // GW30 (~235 mL)
  [-4 / 52, 0.295], // GW36 (~330 mL)
  [0, 0.35], // Term Birth (~390 mL; Holland 2014 / Knickmeyer 2008)
  [0.25, 0.57], // 3 mo (+64% in first 90 days)
  [1.0, 0.70], // 1 yr (+101% in year 1)
  [2.0, 0.77], // 2 yr (+15% in year 2)
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
  const age = clamp(ageYears, MIN_AGE_YEARS, MAX_AGE_YEARS);
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

export function computeViewportSpecimenScale(ageYears: number): number {
  // Keep very small early embryonic stages magnified to at least 0.42× adult diameter in viewport
  // so budding cranial/spinal nerves and lissencephalic vesicle shape remain clearly inspectable.
  return Math.max(0.42, computeBrainLinearScale(ageYears));
}

export function computeScaledDimensionsMm(ageYears: number): {
  ap: number;
  ml: number;
  si: number;
  volumePct: number;
  isUnchartedOver100: boolean;
  isPrenatal: boolean;
  gestationalWeek: number;
} {
  const volumeRatio = computeBrainVolumeRatio(ageYears);
  const s = Math.cbrt(volumeRatio);
  const prenatal = isPrenatalAge(ageYears);
  return {
    ap: Math.max(8, Math.round(167 * s)),
    ml: Math.max(7, Math.round(140 * s)),
    si: Math.max(5, Math.round(93 * s)),
    volumePct: volumeRatio < 0.01 ? Number((volumeRatio * 100).toFixed(1)) : Math.round(volumeRatio * 100),
    isUnchartedOver100: ageYears > 100,
    isPrenatal: prenatal,
    gestationalWeek: ageYearsToGestationalWeek(ageYears),
  };
}

/**
 * Computes continuous 3D morphogenesis weights driving cortical gyri/sulci folding,
 * cerebellar postnatal +240% catch-up, ventricular enlargement, and aging sulcal widening.
 */
export function computeCorticalDevelopment(ageYears: number): CorticalMorphologyState {
  const age = clamp(ageYears, MIN_AGE_YEARS, MAX_AGE_YEARS);
  const prenatal = isPrenatalAge(age);
  const gw = ageYearsToGestationalWeek(age);

  // Cortical folding cascades (Chi et al. 1977; White et al. 2010; Bethlehem et al. 2022)
  const primaryFold = prenatal
    ? smoothstep(11.5, 24.5, gw) // Sylvian GW14 -> PO/Calcarine GW16 -> Central GW20-24
    : 1.0;
  const secondaryFold = prenatal
    ? 0.90 * smoothstep(21.0, 35.5, gw) // Pre/postcentral & secondary convolutions GW22-35
    : lerp(0.90, 1.0, smoothstep(0.0, 1.0, age));
  const tertiaryFold = prenatal
    ? 0.72 * smoothstep(28.0, 40.0, gw) // Third trimester rapid gyrification burst (White 2010)
    : age <= 3
      ? lerp(0.72, 1.0, smoothstep(0.0, 3.0, age))
      : 1.0;

  // Senescent gyral thinning & sulcal widening (>45 yr)
  const sulcalWidening = age > 42 ? 0.65 * smoothstep(42, 100, age) : 0;

  // Cerebellum scales slower at birth (~0.66 linear scale vs cerebrum), catching up +240% in Yr 1 (Knickmeyer 2008)
  const cerebellumRelScale = prenatal
    ? lerp(0.48, 0.66, smoothstep(8, 40, gw))
    : age < 2.0
      ? lerp(0.66, 1.0, smoothstep(0, 2.0, age))
      : 1.0;

  // Ventricular cavity is relatively enlarged mid-gestation (~1.3x), compacts at birth, and mildly dilates in senescence
  const ventricleRelScale = prenatal
    ? lerp(1.34, 1.04, smoothstep(10, 40, gw))
    : age > 50
      ? lerp(1.0, 1.18, smoothstep(50, 100, age))
      : lerp(1.04, 1.0, smoothstep(0, 3, age));

  let morphStageLabel: string;
  let nerveStageLabel: string;

  if (prenatal) {
    if (gw < 10) {
      morphStageLabel = 'Lissencephalic Neural Vesicles (Smooth Unfolded Cortex)';
      nerveStageLabel = 'Carnegie Stages 11–22: Cranial & Cervical Nerve Outgrowth';
    } else if (gw < 21) {
      morphStageLabel = 'Primary Sulcation Onset (Sylvian, PO & Calcarine Indent)';
      nerveStageLabel = 'Target Organ Contact Complete · Root Myelination Begins ~GW16';
    } else if (gw < 29) {
      morphStageLabel = 'Central Sulcus Lock & Secondary Convolution Wave';
      nerveStageLabel = 'Fetal Acoustic & Oral Reflex Tracts Myelinating (CN V, VII, VIII)';
    } else {
      morphStageLabel = '3rd-Trimester Tertiary Gyrification Burst (White et al. 2010)';
      nerveStageLabel = 'Oligodendrocyte Sweep Reaching Optic Nerve (~GW30–40)';
    }
  } else if (age < 2) {
    morphStageLabel = 'Postnatal Gyral Crown Thickening (+149% GM, +240% Cerebellum Yr 1)';
    nerveStageLabel = 'Caudocranial & Optic Nerve Myelination Completing (0–8 mo)';
  } else if (age < 18) {
    morphStageLabel = 'Mature Folding Topology · Peak GM (5.9 yr) -> Adolescent Thinning';
    nerveStageLabel = 'Mature Cranial & Autonomic Myelination · DTI FA Ascending';
  } else if (age <= 45) {
    morphStageLabel = 'Adult Peak Architecture & Cortical Gyrification Plateau';
    nerveStageLabel = 'Peak Myelinated Tract Integrity (DTI FA Plateau 20–42 yr)';
  } else if (age <= 100) {
    morphStageLabel = 'Senescent Cortical Thinning & Progressive Sulcal Widening';
    nerveStageLabel = 'Age-Related Axonal Attrition & Increasing Vascular Tortuosity';
  } else {
    morphStageLabel = 'Uncharted Supercentenarian Envelope (>100 yr held at 100-yr floor)';
    nerveStageLabel = 'No normative >100 yr 3D CISS cranial/peripheral nerve atlas';
  }

  return {
    ageYears: age,
    gestationalWeek: gw,
    isPrenatal: prenatal,
    primaryFold,
    secondaryFold,
    tertiaryFold,
    sulcalWidening,
    cerebellumRelScale,
    ventricleRelScale,
    morphStageLabel,
    nerveStageLabel,
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
  if (isPrenatalAge(ageYears)) {
    const gw = ageYearsToGestationalWeek(ageYears);
    const gwStr = Math.abs(gw - Math.round(gw)) < 0.1 ? gw.toFixed(0) : gw.toFixed(1);
    return `GW${gwStr} (Prenatal)`;
  }
  if (Math.abs(ageYears) < 0.01) return 'Birth (0.0 yr)';
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

/**
 * Strictly attaches Toiab Zahoor's (2026) research ONLY to regions empirically or mathematically
 * analyzed across his 4 attached papers (`OWN_RESEARCH_REGIONS`).
 */
function buildOwnResearchForRegion(
  regionId: RegionId,
  age: number,
): {
  highlights: OwnResearchHighlight[];
  paperIds: string[];
  modeledTempNote?: string;
  extraGaps: string[];
} {
  if (!OWN_RESEARCH_REGIONS.has(regionId)) {
    return { highlights: [], paperIds: [], extraGaps: [] };
  }

  const highlights: OwnResearchHighlight[] = [];
  const paperIds = new Set<string>();
  const extraGaps: string[] = [];
  let modeledTempNote: string | undefined;

  // 1. Prenatal & Early Infancy (< 3 yr): Neocortical Expansion, Early Oligo Birth, Neurogenesis Cessation, Preterm/Term Shielding
  if (age < 3) {
    if (isCorticalRegion(regionId)) {
      paperIds.add('zahoor2026_neocortical');
      highlights.push({
        id: 'neocortical_org_origin',
        category: 'Multi-Omic & Dynamical Systems',
        title: 'Mechano-Sterol oRG Amplification & Cortical Expansion / Folding (GW10–GW26)',
        summary:
          'Cortical surface expansion and folding originate in prenatal outer radial glia (oRGs) via PIEZO1–KLF6/pancMEIS1–SCAP sterol amplification and nuclear YAP retention (86% human bRGs vs. 4% mouse). Early IGF2BP1 shutoff (58.8-fold drop GW16–GW24) clears subplate trapping (1.011 cells/hr) before a GW22.1 saddle-node bifurcation births CRYAB+ tRGs and gliogenic Tri-IPCs prior to third-trimester gyrification.',
        metric: 'PIEZO1 ρ=0.4935 · YAP1 r=0.5029 · GW22.1 CRYAB+ bifurcation',
        sourcePaperId: 'zahoor2026_neocortical',
      });
      extraGaps.push(
        'Own Research Boundary (Zahoor 2026): Human germinal niche stiffening (E = 180→880 Pa) is calibrated from mouse/ferret slice AFM pending direct unfixed primary human fetal AFM micro-indentation across GW14–GW24.',
      );
    }

    if (
      age >= 0 &&
      (regionId === 'cerebral-cortex' ||
        regionId === 'frontal-lobe' ||
        regionId === 'ventricles' ||
        regionId === 'vasculature' ||
        regionId === 'vessel-venous-sinuses')
    ) {
      paperIds.add('zahoor2026_pediatric_thermo');
      highlights.push({
        id: 'infant_thermodynamics_boundary',
        category: 'Quantitative Bioheat Model',
        title: 'Preterm-to-Term Vascular Shielding Consolidation',
        summary:
          'Term newborn CBF (~50 mL/100g/min) and smaller radius stretch vascular shielding length Δ to ~6 mm (vs. ~12 mm in 27-week preterms), permitting partial transcranial cooling before rapid postnatal hyperperfusion clamps Δ toward childhood vascular shielding.',
        metric: 'Preterm 12 mm -> Term Δ ≈ 6 mm -> Adult 3.3 mm',
        sourcePaperId: 'zahoor2026_pediatric_thermo',
      });
    }

    if (age >= 0 && regionId === 'corpus-callosum') {
      paperIds.add('zahoor2026_pediatric_thermo');
      highlights.push({
        id: 'callosal_early_oligo_birth',
        category: 'Quantitative Bioheat Model',
        title: 'Front-Loaded White-Matter Oligodendrogenesis (<5 yr)',
        summary:
          'Human CNS white-matter oligodendrocyte populations (dated via ¹⁴C bomb-pulse) are predominantly generated prior to age 5 with ~0.3%/yr adult turnover thereafter, transitioning white matter toward long-term myelin-turnover bioenergetics.',
        metric: 'Born <5 yr (14C) -> 0.3%/yr adult turnover',
        sourcePaperId: 'zahoor2026_pediatric_thermo',
      });
    }

    if (age >= 0 && regionId === 'hippocampus') {
      paperIds.add('zahoor2026_pediatric_thermo');
      highlights.push({
        id: 'hippocampal_dg_cessation',
        category: 'Quantitative Bioheat Model',
        title: 'Early Dentate Gyrus Neurogenesis Cessation (<1 yr)',
        summary:
          'Quantitative pediatric neurodevelopmental synthesis notes human hippocampal dentate gyrus neurogenesis declines sharply within the first postnatal year, shifting postnatal plasticity toward synaptic remodeling and circuit thermoregulation.',
        metric: 'DG neurogenesis declines sharply <1 yr',
        sourcePaperId: 'zahoor2026_pediatric_thermo',
      });
    }
  }

  // 2. Childhood to Adolescent Transition (2.5–21.5 yr): Pediatric Neurothermodynamics
  if (age >= 2.5 && age <= 21.5) {
    if (isAssociationCorticalRegion(regionId)) {
      paperIds.add('zahoor2026_pediatric_thermo');
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
      paperIds.add('zahoor2026_pediatric_thermo');
      highlights.push({
        id: 'occipital_sensorimotor_anchor',
        category: 'Quantitative Bioheat Model',
        title: 'Early Unimodal V1 Anchor Along the S-A Axis',
        summary:
          'Primary visual cortex (V1) consolidates early (1–1.5%/yr SWM maturation). Under matched IT’IS v5.0 Picard bioheat coupling at ages 7–12, matured visual/sensorimotor cortex settles near +0.166 °C GM (+0.210 °C SWM) above arterial inflow, running 0.04–0.06 °C cooler than lagged transmodal association hubs.',
        metric: 'Visual/SM GM +0.166 °C · ΔAssoc−SM = +0.060 °C',
        sourcePaperId: 'zahoor2026_pediatric_thermo',
      });
      modeledTempNote =
        'Own Research Modeled Prediction (Zahoor, Nov 2026): Matured unimodal V1 runs ~+0.166 °C above 37.0 °C arterial inflow (+0.04 to +0.06 °C cooler than association cortex at ages 7–12); empirically unmeasured in healthy youth.';
    } else if (regionId === 'corpus-callosum') {
      paperIds.add('zahoor2026_pediatric_thermo');
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
    } else if (regionId === 'thalamus' || regionId === 'hippocampus') {
      paperIds.add('zahoor2026_pediatric_thermo');
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
      paperIds.add('zahoor2026_pediatric_thermo');
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
    } else if (regionId === 'vasculature' || regionId === 'vessel-venous-sinuses') {
      paperIds.add('zahoor2026_pediatric_thermo');
      highlights.push({
        id: 'vascular_clearance_88_91',
        category: 'Quantitative Bioheat Model',
        title: 'Vascular & Dural Sinus Outflow Clears 88.3%–91.2% of Brain Heat',
        summary:
          'Under IT’IS v5.0 perfused scalp/skull and hair insulation (h = 3.5 W/m²·K), transcranial conduction drops to 1.60–1.81 W, leaving parenchymal perfusion and dural venous sinuses (SSS / internal jugular outflow; model sensor Sup1) to export 88.3%–91.2% of 20.34 W peak developmental heat.',
        metric: '88.3%–91.2% vascular clearance · Sup1 SSS outflow',
        sourcePaperId: 'zahoor2026_pediatric_thermo',
      });
      modeledTempNote =
        'Own Research Modeled Prediction (Zahoor, Nov 2026): Pediatric hyperperfusion (71–106.4 mL/100g/min) clamps Δ_GM to 2.71–3.31 mm and exports ~18.5 W convectively into dural venous sinuses.';
    }

    if (age < 20 && regionId !== 'cerebellum') {
      extraGaps.push(
        'Own Research Validation Protocol (Zahoor 2026): No healthy normative pediatric brain temperature atlas (ages 2–18) exists; resolving sub-0.15 °C S-A and gyral–sulcal gradients requires accelerated 3D ¹H-MRSI (n = 20–73 youths at σ_diff ≤ 0.15 °C) with QSM/R2* masking for the 55 ± 11 µg/g (+21 ± 3 ppb) SWM iron band and simultaneous acquisition.',
      );
    }
  }

  // 3. Adulthood & Aging (18–122 yr): The Leak-Packing Limit & Comparative Amniote Scaling
  if (age >= 18) {
    if (isCorticalRegion(regionId)) {
      paperIds.add('zahoor2026_leak_packing');
      paperIds.add('zahoor2026_amniote_scaling');
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
    } else if (regionId === 'vasculature' || regionId === 'vessel-venous-sinuses') {
      paperIds.add('zahoor2026_leak_packing');
      highlights.push({
        id: 'invariant_capillary_bed',
        category: 'Bioenergetic & Thermal Limit',
        title: 'Supply-Limited Microvascular Volume & Convective Heat Offset',
        summary:
          'Cortical capillary volume fraction scales invariantly as f_c ~ V⁰ ≈ 0.74%–2.0% (~10 µm capillary/neuron; CBF/ρ_n ≈ 1.45 × 10⁻⁸ mL/min/neuron). At steady PET resting OEF₀ ≈ 0.40 and arterial enthalpy balance ΔH_net = 442 kJ/mol O₂, cerebral perfusion clamps deep brain tissue +0.36 to +0.39 °C warmer than arterial blood while dural sinuses export warmed venous blood.',
        metric: 'f_c = 0.74–2.0% · OEF₀ = 0.40 · ΔT₀ = +0.36–0.39 °C',
        sourcePaperId: 'zahoor2026_leak_packing',
      });
    } else if (regionId === 'corpus-callosum') {
      paperIds.add('zahoor2026_leak_packing');
      highlights.push({
        id: 'white_matter_scaling_ratio',
        category: 'Comparative Neuroenergetics',
        title: 'Myelin g-Ratio Optimization & Nodal Ion-Leak ATP Economy',
        summary:
          'Under the Leak-Packing Limit, wrapping long callosal axons with myelin (optimal g-ratio ~0.6–0.7 in humans vs. ~0.75–0.8 in rodents) slashes axonal membrane capacitance and passive Na⁺/K⁺ ion-leak overhead under WM:GM = 0.40 volume partitioning.',
        metric: 'WM:GM = 0.40 in H. sapiens · Myelin g-ratio ~ 0.6–0.7',
        sourcePaperId: 'zahoor2026_leak_packing',
      });
    } else if (regionId === 'cerebellum') {
      paperIds.add('zahoor2026_leak_packing');
      paperIds.add('zahoor2026_amniote_scaling');
      highlights.push({
        id: 'cerebellar_whole_brain_budget',
        category: 'Comparative Neuroenergetics',
        title: 'Cerebellar Granule Packing & Resting Ion-Leak Dominance',
        summary:
          'Tightly packed cerebellar granule neurons consume far less glucose per cell than cortical pyramidal neurons (averaging 1.50 × 10⁻⁸ cortical vs. 5.79 × 10⁻⁹ µmol glucose/neuron/min across all 86.1B human neurons). In cerebellar cortex, holding resting potential against passive ion leak takes 54% of signaling ATP (vs. 22% postsynaptic receptors), while telencephalic evolutionary rate exceeds cerebellar scaling (σ²_tel / σ²_cb).',
        metric: 'Whole-brain 5.79×10⁻⁹ µmol/min · 54% cerebellar resting leak ATP',
        sourcePaperId: 'zahoor2026_amniote_scaling',
      });
    } else if (regionId === 'hippocampus') {
      paperIds.add('zahoor2026_leak_packing');
      highlights.push({
        id: 'hippocampal_bclxl_leak',
        category: 'Bioenergetic & Thermal Limit',
        title: 'Bcl-xL F1F0 c-Ring Closure & Stoichiometric Coupling in Hippocampal Neurons',
        summary:
          'Patch-clamp and ATP/O₂ microelectrode studies in hippocampal neurons (Alavian et al. 2011) parameterize the Leak-Packing Limit’s Bcl-xL regime (L = 0.25 → 0.10): sealing the F1F0 ATP synthase c-subunit leak cuts primary IMM waste heat 31.7% (41.05 vs. 60.06 kJ/mol ATP) without elevating oxygen uptake.',
        metric: 'L = 0.10 Bcl-xL regime · −31.7% IMM waste heat',
        sourcePaperId: 'zahoor2026_leak_packing',
      });
    } else if (regionId === 'thalamus' || regionId === 'ventricles') {
      paperIds.add('zahoor2026_pediatric_thermo');
      highlights.push({
        id: 'adult_core_mrs_concordance',
        category: 'Bioenergetic & Thermal Limit',
        title: 'Deep Subcortical Core & Vascular-Thermal Equilibrium Boundary',
        summary:
          'Consistent with adult HEATWAVE ¹H-MRS (thalamus up to 40.9 °C, +1.64 °C warmer than cortex) and Pennes-Yablonskiy vascular shielding (Δ_GM = 3.30–3.58 mm), deep thalamic nuclei and the 20 mL ventricular cavity equilibrate adiabatically (+0.386–0.397 °C above arterial blood under IT’IS v5.0 constants).',
        metric: 'Deep sGM +0.386 °C · Ventricles +0.392 °C > Cortex',
        sourcePaperId: 'zahoor2026_pediatric_thermo',
      });
    }

    if (age > 40 && regionId !== 'cerebellum') {
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
  const age = clamp(ageYears, MIN_AGE_YEARS, MAX_AGE_YEARS);
  const prenatal = isPrenatalAge(age);
  const gw = ageYearsToGestationalWeek(age);
  const morph = computeCorticalDevelopment(age);
  const regionInfo = BRAIN_REGIONS[regionId];

  const isUnchartedOver100 = age > 100;
  const inMrsTempWindow = age >= 20 && age <= 40;
  const inDtiLifespanWindow = age >= 5 && age <= 83;
  const inInfantMriWindow = age >= 0 && age <= 2;

  // Empirical knowledge percentage [0..100] combining strictly measured empirical benchmarks
  let structuralScore = 0;
  let myelinScore = 0;
  let tempScore = 0;

  if (isUnchartedOver100) {
    structuralScore = 4;
    myelinScore = 2;
    tempScore = 0;
  } else if (prenatal) {
    if (gw < 16) {
      // Early embryonic Carnegie stages (Smit 2022 / Yamada 2010 histology/EFIC)
      structuralScore = isNerveRegion(regionId) ? 34 : 26;
      myelinScore = 6;
      tempScore = 0;
    } else {
      // Fetal MRI window (~16.5 GW / 115 dpc onward in Bethlehem 2022 + White 2010 gyrification)
      structuralScore = isCorticalRegion(regionId) ? 40 : isNerveRegion(regionId) ? 28 : 34;
      myelinScore = gw >= 24 ? 14 : 8;
      tempScore = 0;
    }
  } else if (isVesselRegion(regionId)) {
    structuralScore = age <= 2 ? 34 : age <= 75 ? 46 : lerp(42, 24, smoothstep(75, 100, age));
    myelinScore = age >= 8 && age <= 65 ? 24 : 16;
    tempScore = inMrsTempWindow ? 12 : 0;
  } else if (isNerveRegion(regionId)) {
    const isSlenderOrLower =
      regionId === 'cn-iv-trochlear' ||
      regionId === 'cn-vi-abducens' ||
      regionId === 'cn-ix-glossopharyngeal' ||
      regionId === 'cn-xi-accessory' ||
      regionId === 'nerve-parasympathetic-ganglia' ||
      regionId === 'nerve-meningeal-dural';
    structuralScore = isSlenderOrLower ? 30 : 42;
    myelinScore = age <= 1 ? 22 : age <= 75 ? 20 : 12;
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

  // 0. Embryonic Nerve Generation OR Cortical Gyrification Morphogenesis Status
  let morphogenesisStatus: string;
  if (isNerveRegion(regionId) && regionInfo.embryology) {
    const { emergenceGw, matureGw, carnegieStage, embryonicOrigin, myelinationOnset } =
      regionInfo.embryology;
    if (prenatal) {
      if (gw < emergenceGw) {
        morphogenesisStatus = `Pre-emergence at GW${gw.toFixed(1)}: Neural crest/placode progenitors not yet condensed. Emerges at ~GW${emergenceGw.toFixed(1)} (${carnegieStage}) from ${embryonicOrigin}.`;
      } else if (gw < matureGw) {
        const pct = Math.round(((gw - emergenceGw) / Math.max(0.5, matureGw - emergenceGw)) * 100);
        morphogenesisStatus = `Active embryonic axonal outgrowth (~${pct}% toward target organ). Origin: ${embryonicOrigin} (${carnegieStage}).`;
      } else {
        morphogenesisStatus = `Target contact & embryonic fasciculation established (GW${emergenceGw.toFixed(1)}–${matureGw.toFixed(1)}, ${carnegieStage}). ${myelinationOnset}.`;
      }
    } else {
      morphogenesisStatus = `Embryonic origin (${carnegieStage}): ${embryonicOrigin}. ${myelinationOnset}.`;
    }
  } else if (isCorticalRegion(regionId)) {
    if (prenatal) {
      if (gw < 12) {
        morphogenesisStatus = `Lissencephalic smooth vesicle (GW${gw.toFixed(1)}): Primary sulci have not yet indented; vRG progenitors are amplifying the pre-plate.`;
      } else if (gw < 22) {
        morphogenesisStatus = `Primary sulcation wave (GW${gw.toFixed(1)}): Sylvian fissure indents (~GW14–16), followed by parieto-occipital, calcarine, and cingulate sulci; central sulcus begins ~GW20.`;
      } else if (gw < 29) {
        morphogenesisStatus = `Central sulcus lock & secondary folding (GW${gw.toFixed(1)}): Pre/postcentral and superior temporal sulci carve lobe gyral boundaries.`;
      } else {
        morphogenesisStatus = `Third-trimester tertiary gyrification burst (GW${gw.toFixed(1)}): Rapid secondary and tertiary sulcal branching folds cortical surface area (White et al. 2010).`;
      }
    } else if (age < 3) {
      morphogenesisStatus =
        'Postnatal gyral deepening & cortical surface expansion: Tertiary sulcal complexity completes ~75% -> 100% of adult gyrification by age 2–3 yr while GM grows +149% in Year 1.';
    } else if (age <= 42) {
      morphogenesisStatus =
        'Stable adult gyral–sulcal topology: Cortical ribbon thickness peaks ~5–6 yr, prunes linearly across adolescence, and stabilizes through age 42 (White et al. 2010).';
    } else {
      morphogenesisStatus =
        'Senescent sulcal widening: Age-related cortical gray-matter thinning slims gyral crowns and progressively widens sulcal crevices across 45–100 yr.';
    }
  } else if (regionId === 'cerebellum') {
    morphogenesisStatus = prenatal
      ? `Rhombic lip & transverse folia folding (GW${gw.toFixed(1)}): Cerebellar hemisphere & vermis expansion lags cerebrum prenatally (~0.48–0.66 relative scale).`
      : age < 2
        ? 'Postnatal cerebellar growth surge (+240% volume in Year 1 per Knickmeyer et al. 2008), rapidly catching up to adult proportion.'
        : morph.morphStageLabel;
  } else {
    morphogenesisStatus = morph.morphStageLabel;
  }

  // 1. Size / Structure status at age
  let sizeStatus: string;
  if (isUnchartedOver100) {
    sizeStatus =
      'Uncharted (>100 yr): No normative MRI, MRA, or high-resolution 3D CISS cohorts exist beyond age 100; geometry is held at the 100-year baseline (~86% of young-adult volume).';
  } else if (prenatal) {
    sizeStatus =
      gw < 16.5
        ? `Early embryonic/first-trimester morphogenesis (GW${gw.toFixed(1)}, Carnegie–fetal atlas window; Yamada et al. 2010, Smit et al. 2022). Precedes Bethlehem et al. 2022 MRI brain charts (115 dpc / ~16.5 GW).`
        : `Mid-to-late fetal expansion (GW${gw.toFixed(1)}, ~${Math.round(computeBrainVolumeRatio(age) * 100)}% of adult brain volume), captured in longitudinal fetal MRI growth charts (Bethlehem et al. 2022).`;
  } else if (isVesselRegion(regionId)) {
    if (age < 1) {
      sizeStatus =
        'Rapid postnatal vascular remodeling: arterial lumen calibers expand alongside +101% first-year brain growth while embryonic venous channels consolidate into adult dural sinuses.';
    } else if (age < 8) {
      sizeStatus =
        'Pediatric hyperperfusion phase: gray-matter cerebral blood flow climbs sharply to ~71–106 mL/100g/min to support peak synaptogenesis and glucose uptake.';
    } else if (age <= 22) {
      sizeStatus =
        'Adolescent pubertal perfusion transition (Satterthwaite et al. 2014): CBF declines markedly across puberty while Circle of Willis & pial trunk calibers stabilize.';
    } else if (age <= 65) {
      sizeStatus =
        regionId === 'vessel-circle-of-willis'
          ? 'Mature adult basal polygon: only ~21–48% of adults exhibit a textbook complete Circle of Willis; PCom hypoplasia/aplasia and fetal PCA variants are common (Iqbal 2013).'
          : regionId === 'vessel-venous-sinuses'
            ? 'Mature dural venous sinuses (SSS Ø ~6 mm): arachnoid granulations line the SSS (53.8%) and transverse sinuses (28.1%; Liang et al. 2002) alongside meningeal lymphatics (Louveau et al. 2015).'
            : 'Mature adult cerebral vascular caliber and autoregulated perfusion (~750 mL/min total brain blood flow across ~150 mL intracranial vascular volume).';
    } else {
      sizeStatus =
        'Senescent vascular remodeling: progressive arterial tortuosity, reduced resting cortical CBF, and increased pulse-wave stiffness across pial and penetrating arterioles.';
    }
  } else if (isNerveRegion(regionId)) {
    if (age < 1) {
      sizeStatus =
        'Neonatal cisternal & skull-base nerve trajectories are established, though slender roots (CN IV Ø <1 mm, CN VI, petrosal rami) require sub-millimeter 3D CISS MRI to resolve cleanly.';
    } else if (age <= 40) {
      sizeStatus =
        regionId === 'cn-i-olfactory'
          ? 'Peak adult olfactory bulb volume and odor sensitivity prior to mid-life age-related volumetric decline (Buschhüter et al. 2008).'
          : regionId === 'cn-x-vagus'
            ? 'Mature vagal trunk caliber (~2.1 mm² right vs. 1.9 mm² left CSA in the carotid sheath, p < 0.012; Bedewi et al. 2023).'
            : regionId === 'nerve-meningeal-dural'
              ? 'Dense trigeminovascular tentorial and dural sinus innervation (71.2% Type 1 projecting to both straight and transverse sinuses; Lee et al. 2017).'
              : regionId === 'nerve-sympathetic-carotid'
                ? 'Mature superior cervical ganglion perivascular plexus buffering acute cerebral perfusion pressure surges along ICA & basal arteries (Willie et al. 2014).'
                : regionId === 'cn-v-trigeminal'
                  ? 'Full adult trigeminal root and Gasserian ganglion architecture; prepontine cisternal root entry zone clearly delineated on 0.7 mm 3D CISS MRI (Yousry et al. 2000).'
                  : 'Mature adult nerve root caliber and cisternal/foraminal course well resolved anatomically and on high-resolution 3D CISS MRI.';
    } else {
      sizeStatus =
        regionId === 'cn-i-olfactory'
          ? 'Progressive age-related olfactory bulb volume shrinkage correlating with declining odor threshold and discrimination (Buschhüter et al. 2008).'
          : 'Gradual axonal attrition and increasing cisternal arterial tortuosity raising risk of neurovascular contact near brainstem & cervical root zones.';
    }
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
        ? 'Near subcortical gray matter volume peak (~14.4 yr in Bethlehem et al. 2022) alongside total cerebrum peak (~12.5 yr).'
        : 'Near total cerebrum volume peak (~12.5 yr, Bethlehem et al. 2022); cortical thickness thins (~3.2 → 2.8 mm) while white matter expands.';
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

  // 2. Myelination / Wall Biology status at age
  let myelinationStatus: string;
  if (isUnchartedOver100) {
    myelinationStatus =
      'Unmeasured (>100 yr): In vivo DTI tractography, vascular wall compliance, and myelin-water imaging lack normative healthy supercentenarian cohorts.';
  } else if (prenatal) {
    myelinationStatus = isNerveRegion(regionId)
      ? regionInfo.embryology?.myelinationOnset ??
        'Peripheral Schwann-cell / central glial ensheathment begins sequentially across fetal trimesters.'
      : gw < 20
        ? `Pre-myelination neural scaffolding (GW${gw.toFixed(1)}): Proliferating progenitors & axonal pathfinding precede fetal myelin sheath formation (~GW20–24 brainstem/spinal onset).`
        : `Fetal caudocranial myelination onset (GW${gw.toFixed(1)}): Myelin begins in spinal/brainstem roots and internal capsule prior to third-trimester optic radiation progression.`;
  } else if (isVesselRegion(regionId)) {
    myelinationStatus =
      regionId === 'vessel-venous-sinuses' || regionId === 'vessel-cortical-veins'
        ? 'Unmyelinated endothelial/dural channels lacking valves and smooth-muscle tunica media; dural sinuses host arachnoid granulations and meningeal lymphatic vessels (Louveau et al. 2015).'
        : 'Unmyelinated elastic-muscular arterial wall (lacking external elastic lamina in pial arteries) with tight endothelial blood–brain barrier junctions and myogenic autoregulation.';
  } else if (isNerveRegion(regionId)) {
    if (regionId === 'cn-ii-optic') {
      myelinationStatus =
        age <= 1
          ? 'Central CNS myelination by oligodendrocytes sweeping rapidly along optic nerves and tracts from birth through 4–6 months (Deoni et al. 2011).'
          : 'Pure CNS diencephalic tract: 100% myelinated by oligodendrocytes (not Schwann cells) up to the optic disc lamina cribrosa, tracking lifespan DTI FA trajectories.';
    } else if (regionId === 'cn-i-olfactory') {
      myelinationStatus =
        'Olfactory nerve fila are unmyelinated and ensheathed by specialized olfactory ensheathing glia, while the olfactory bulb & tract form central paleocortical projections.';
    } else if (regionId === 'nerve-sympathetic-carotid' || regionId === 'nerve-sympathetic-chain') {
      myelinationStatus =
        'Preganglionic thoracolumbar white rami communicantes are thinly myelinated B-fibers, whereas postganglionic sympathetic gray rami and perivascular plexus axons are unmyelinated C-fibers (Remak Schwann bundles).';
    } else if (regionId === 'nerve-parasympathetic-ganglia' || regionId === 'nerve-pelvic-splanchnic') {
      myelinationStatus =
        'Thinly myelinated preganglionic B-fibers (CN III/VII/IX or S2–S4 pelvic splanchnics) synapse in peripheral/intramural parasympathetic ganglia onto unmyelinated postganglionic secretomotor and smooth-muscle fibers.';
    } else if (regionId === 'nerve-enteric-plexus') {
      myelinationStatus =
        'Entirely unmyelinated intrinsic gut neural lattice ensheathed by specialized enteric glial cells within the myenteric (Auerbach) and submucosal (Meissner) layers (Furness 2012).';
    } else if (regionId === 'spinal-cord-thoracic' || regionId === 'spinal-cord-lumbosacral') {
      myelinationStatus =
        'Central oligodendrocyte-myelinated ascending dorsal/spinothalamic columns and descending corticospinal tracts surrounding central H-shaped gray-matter horns; corticospinal myelination continues postnatally through age 2.';
    } else if (regionId === 'nerve-meningeal-dural') {
      myelinationStatus =
        'Mixed unmyelinated peptidergic CGRP/Substance-P C-fibers (~75%) and thinly myelinated Aδ mechanonociceptors innervating dural vessels and venous sinuses.';
    } else {
      const rezNote =
        regionId === 'cn-v-trigeminal' ||
        regionId === 'cn-vii-facial' ||
        regionId === 'cn-viii-vestibulocochlear'
          ? 'Proximal cisternal segment carries central oligodendrocyte myelin up to the vulnerable Obersteiner–Redlich zone (~2–10 mm from brainstem) before transitioning to peripheral Schwann-cell myelin.'
          : 'Heavily myelinated peripheral Schwann-cell motor/proprioceptive Aα/Aβ fibers paired with thinly myelinated Aδ and unmyelinated C-fiber nociceptive/autonomic axons inside fascicular perineurium and epineurium.';
      myelinationStatus =
        age < 1
          ? `Rapid early root and peripheral trunk myelination during the first postnatal year as conduction velocity doubles toward adult values. ${rezNote}`
          : rezNote;
    }
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
  if (prenatal) {
    temperatureStatus =
      'Unmeasured Prenatal Gap: Fetal intrauterine neural temperature tracks maternal core perfusion (~37.2–37.6 °C) but has never been mapped per-nerve with non-invasive 4D MRS in healthy human gestation.';
  } else if (isNerveRegion(regionId)) {
    temperatureStatus =
      'Direct Per-Nerve Gap: Non-invasive 4D ¹H-MRS voxel resolution (Rzechorzek et al. 2022) cannot isolate individual cranial, spinal, or peripheral nerve trunks; central/visceral trunks sit near core ~37.0 °C while distal limb nerves track extremity temperature (~32–36 °C, slowing conduction ~2 m/s per °C cooled).';
  } else if (isVesselRegion(regionId)) {
    if (inMrsTempWindow) {
      temperatureStatus =
        regionId === 'vessel-venous-sinuses' || regionId === 'vessel-cortical-veins'
          ? 'Convective Heat Outflow: Venous sinuses carry warmed blood exiting parenchyma (~+0.3 to +0.5 °C above arterial inflow) relative to the 38.5 °C parenchymal 4D MRS baseline (Rzechorzek et al. 2022).'
          : 'Arterial Thermal Clamp (~37.0 °C core arterial inflow): Perfusing arterial trunks clear parenchymal heat and clamp healthy brain tissue near 38.5 °C mean (36.1–40.9 °C range; Rzechorzek et al. 2022).';
    } else {
      temperatureStatus =
        age < 20
          ? 'Unmeasured Pediatric Gap (0–19 yr): No healthy pediatric vascular-parenchymal 4D ¹H-MRS thermometry atlas exists yet.'
          : 'Unmeasured Aging Gap (>40 yr): Healthy arterial/venous-to-parenchymal thermal gradients are unmapped by 4D ¹H-MRS beyond age 40.';
    }
  } else if (inMrsTempWindow) {
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

  // Build peer-reviewed citations relevant to this region & age (dedicated per-nerve + multi-nerve normative papers)
  const citations: ResearchPaperCitation[] = [];
  for (const paperId of ownResearch.paperIds) {
    const paper = RESEARCH_PAPERS[paperId];
    if (paper) citations.push(paper);
  }

  if (isVesselRegion(regionId)) {
    if (regionId === 'vessel-venous-sinuses' || regionId === 'vessel-cortical-veins') {
      citations.push(RESEARCH_PAPERS.liang2002, RESEARCH_PAPERS.louveau2015);
    } else {
      citations.push(RESEARCH_PAPERS.iqbal2013);
    }
    citations.push(RESEARCH_PAPERS.satterthwaite2014, RESEARCH_PAPERS.rzechorzek2022);
  } else if (isNerveRegion(regionId)) {
    if (prenatal) {
      citations.push(RESEARCH_PAPERS.smit2022, RESEARCH_PAPERS.yamada2010);
    }

    switch (regionId) {
      // Cranial Nerves I–XII (each paired with dedicated study + Yousry 2000 / Smit 2022)
      case 'cn-i-olfactory':
        citations.push(RESEARCH_PAPERS.buschhuter2008, RESEARCH_PAPERS.yousry2000, RESEARCH_PAPERS.smit2022);
        break;
      case 'cn-ii-optic':
        citations.push(RESEARCH_PAPERS.zheng2021_optic, RESEARCH_PAPERS.yousry2000, RESEARCH_PAPERS.smit2022);
        break;
      case 'cn-iii-oculomotor':
        citations.push(RESEARCH_PAPERS.sananmuang2021_oculomotor, RESEARCH_PAPERS.yousry2000, RESEARCH_PAPERS.smit2022);
        break;
      case 'cn-iv-trochlear':
        citations.push(RESEARCH_PAPERS.yousry2000, RESEARCH_PAPERS.smit2022);
        break;
      case 'cn-v-trigeminal':
        citations.push(RESEARCH_PAPERS.tai2016, RESEARCH_PAPERS.yousry2000, RESEARCH_PAPERS.smit2022);
        break;
      case 'cn-vi-abducens':
        citations.push(RESEARCH_PAPERS.lemmerling1999_abducens, RESEARCH_PAPERS.yousry2000, RESEARCH_PAPERS.smit2022);
        break;
      case 'cn-vii-facial':
      case 'cn-viii-vestibulocochlear':
        citations.push(RESEARCH_PAPERS.tai2016, RESEARCH_PAPERS.yousry2000, RESEARCH_PAPERS.smit2022);
        break;
      case 'cn-ix-glossopharyngeal':
        citations.push(RESEARCH_PAPERS.nishihara2017_cn9, RESEARCH_PAPERS.yousry2000, RESEARCH_PAPERS.smit2022);
        break;
      case 'cn-x-vagus':
        citations.push(RESEARCH_PAPERS.bedewi2023, RESEARCH_PAPERS.cartwright2008, RESEARCH_PAPERS.yousry2000);
        break;
      case 'cn-xi-accessory':
        citations.push(RESEARCH_PAPERS.tai2025_accessory, RESEARCH_PAPERS.yousry2000, RESEARCH_PAPERS.smit2022);
        break;
      case 'cn-xii-hypoglossal':
        citations.push(RESEARCH_PAPERS.geng2021_hypoglossal, RESEARCH_PAPERS.yousry2000, RESEARCH_PAPERS.smit2022);
        break;
      // Cranial/Cervical Autonomic & Meningeal
      case 'nerve-cervical-spinal':
        citations.push(RESEARCH_PAPERS.bedewi2023_phrenic, RESEARCH_PAPERS.frostell2018_cord, RESEARCH_PAPERS.yamada2010);
        break;
      case 'nerve-sympathetic-carotid':
        citations.push(RESEARCH_PAPERS.willie2014, RESEARCH_PAPERS.franco2024_sympathetic);
        break;
      case 'nerve-parasympathetic-ganglia':
        citations.push(RESEARCH_PAPERS.smit2022, RESEARCH_PAPERS.yousry2000);
        break;
      case 'nerve-meningeal-dural':
        citations.push(RESEARCH_PAPERS.lee2017, RESEARCH_PAPERS.louveau2015);
        break;
      // Whole-Body Spinal Cord, Plexuses, Limbs, Autonomic & Enteric
      case 'spinal-cord-thoracic':
        citations.push(RESEARCH_PAPERS.frostell2018_cord, RESEARCH_PAPERS.yamada2010);
        break;
      case 'spinal-cord-lumbosacral':
      case 'nerve-cauda-equina':
        citations.push(RESEARCH_PAPERS.saifuddin1998_conus, RESEARCH_PAPERS.sun2022_conus, RESEARCH_PAPERS.frostell2018_cord);
        break;
      case 'nerve-phrenic':
        citations.push(RESEARCH_PAPERS.bedewi2023_phrenic, RESEARCH_PAPERS.yamada2010);
        break;
      case 'nerve-brachial-plexus':
        citations.push(RESEARCH_PAPERS.bedewi2021_bp, RESEARCH_PAPERS.cartwright2008);
        break;
      case 'nerve-axillary':
        citations.push(RESEARCH_PAPERS.yoon2019_axillary, RESEARCH_PAPERS.bedewi2021_bp);
        break;
      case 'nerve-musculocutaneous':
        citations.push(RESEARCH_PAPERS.cartwright2008, RESEARCH_PAPERS.matsumoto2018_musculocut);
        break;
      case 'nerve-radial':
        citations.push(RESEARCH_PAPERS.singh2021_radial, RESEARCH_PAPERS.cartwright2008, RESEARCH_PAPERS.qrimli2016);
        break;
      case 'nerve-median':
      case 'nerve-ulnar':
        citations.push(RESEARCH_PAPERS.qrimli2016, RESEARCH_PAPERS.cartwright2008);
        break;
      case 'nerve-intercostal':
        citations.push(RESEARCH_PAPERS.huttin2026_intercostal, RESEARCH_PAPERS.frostell2018_cord);
        break;
      case 'nerve-lumbar-plexus':
        citations.push(RESEARCH_PAPERS.gruber2003_femoral, RESEARCH_PAPERS.yoshimura2018_femoral);
        break;
      case 'nerve-femoral':
        citations.push(RESEARCH_PAPERS.gruber2003_femoral, RESEARCH_PAPERS.yoshimura2018_femoral);
        break;
      case 'nerve-obturator':
        citations.push(RESEARCH_PAPERS.uchino2026_obturator, RESEARCH_PAPERS.gruber2003_femoral);
        break;
      case 'nerve-sciatic':
      case 'nerve-tibial':
      case 'nerve-fibular-sural':
        citations.push(RESEARCH_PAPERS.cartwright2008, RESEARCH_PAPERS.qrimli2016);
        break;
      case 'nerve-pudendal':
        citations.push(RESEARCH_PAPERS.suganya2025_pudendal, RESEARCH_PAPERS.yamashita2017_pelvic);
        break;
      case 'nerve-sympathetic-chain':
        citations.push(RESEARCH_PAPERS.franco2024_sympathetic, RESEARCH_PAPERS.forrester2026_splanchnic, RESEARCH_PAPERS.willie2014);
        break;
      case 'nerve-pelvic-splanchnic':
        citations.push(RESEARCH_PAPERS.yamashita2017_pelvic, RESEARCH_PAPERS.suganya2025_pudendal);
        break;
      case 'nerve-enteric-plexus':
        citations.push(RESEARCH_PAPERS.furness2012_ens, RESEARCH_PAPERS.bedewi2023);
        break;
      default:
        citations.push(RESEARCH_PAPERS.cartwright2008, RESEARCH_PAPERS.qrimli2016);
        break;
    }

    if (inInfantMriWindow) {
      citations.push(RESEARCH_PAPERS.deoni2011);
    } else if (!prenatal) {
      citations.push(RESEARCH_PAPERS.lebel2012);
    }
  } else {
    citations.push(RESEARCH_PAPERS.bethlehem2022);
    if (isCorticalRegion(regionId)) {
      citations.push(RESEARCH_PAPERS.white2010);
    }
    if (prenatal && gw < 18) {
      citations.push(RESEARCH_PAPERS.yamada2010);
    }
    if (inInfantMriWindow) {
      citations.push(RESEARCH_PAPERS.knickmeyer2008, RESEARCH_PAPERS.holland2014, RESEARCH_PAPERS.deoni2011);
    }
    if (regionId === 'corpus-callosum') {
      citations.push(RESEARCH_PAPERS.tanaka2015, RESEARCH_PAPERS.lebel2012);
    } else if (!inInfantMriWindow && !prenatal) {
      citations.push(RESEARCH_PAPERS.lebel2012);
    }
    citations.push(RESEARCH_PAPERS.rzechorzek2022);
  }

  const uniqueCitations = Array.from(new Map(citations.map((c) => [c.id, c])).values());
  const ownResearchCount = uniqueCitations.filter((c) => c.isOwnResearch).length;

  // Build explicit "What We Don't Know (Gaps)"
  const gaps: string[] = [];
  if (isUnchartedOver100) {
    gaps.push(
      'No normative structural MRI, MRA, or cranial-nerve 3D CISS datasets exist beyond age 100 (101–122 yr).',
    );
    gaps.push(
      'Zero empirical healthy myelination (DTI/myelin-water) or non-invasive 4D MRS thermometry benchmarks exist for supercentenarians.',
    );
  } else if (prenatal) {
    gaps.push(
      gw < 16.5
        ? 'Healthy human MRI brain growth charts (Bethlehem et al. 2022) begin at 115 days post-conception (~16.5 GW); earlier embryonic brain morphometry relies primarily on ex vivo histology/EFIC atlases (Yamada et al. 2010; Smit et al. 2022).'
        : 'In vivo quantitative fetal regional myelin-water MRI and per-structure 4D MRS thermometry remain unmapped in healthy human gestation.',
    );
    if (isNerveRegion(regionId)) {
      gaps.push(
        'Fine embryonic cranial/autonomic branch connectivity beyond CS 23 (GW8.5) through birth relies mostly on sparse post-mortem histology rather than longitudinal in utero tractography.',
      );
    }
  } else if (isVesselRegion(regionId)) {
    if (!inMrsTempWindow) {
      gaps.push(
        age < 20
          ? 'Pediatric arterial-to-parenchymal heat clearance gradients remain modeled rather than directly mapped via normative 4D ¹H-MRS (0–19 yr).'
          : 'Healthy regional ASL perfusion-thermal coupling and venous sinus outflow temperatures lack normative 4D ¹H-MRS benchmarks above age 40.',
      );
    }
    gaps.push(
      'Routine 1.5T/3T time-of-flight MRA misses sub-millimeter cortical arterioles, lenticulostriate perforators, and slow-flowing hypoplastic segments (<0.5 mm).',
    );
    gaps.push(
      'Longitudinal within-person microvascular remodeling across the 0–100 yr lifespan remains far sparser than cross-sectional perfusion snapshots.',
    );
  } else if (isNerveRegion(regionId)) {
    gaps.push(
      'Non-invasive in vivo temperature and metabolic rates of individual cisternal, spinal, or dural nerves have never been measured directly in healthy humans.',
    );
    gaps.push(
      regionId === 'cn-iv-trochlear'
        ? 'Because CN IV is <1 mm thick, even 0.7 mm 3D CISS MRI resolves it in only ~47.5% of healthy nerves (Yousry et al. 2000), leaving normative lifespan morphometry unmapped.'
        : 'Lifespan DTI fractional anisotropy and quantitative myelin-water charts across ages 0–100 yr do not yet exist per individual cranial, spinal, or autonomic nerve.',
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
    gestationalWeek: gw,
    isPrenatal: prenatal,
    knownPct,
    gapPct,
    isUnchartedOver100,
    hasOwnResearch: ownResearchCount > 0,
    ownResearchCount,
    morphogenesisStatus,
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
