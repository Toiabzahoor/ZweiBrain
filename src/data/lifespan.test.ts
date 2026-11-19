import assert from 'node:assert/strict';
import test from 'node:test';
import {
  ALL_NERVE_REGION_IDS,
  BODY_NERVE_REGION_IDS,
  CRANIAL_NERVE_REGION_IDS,
  MAX_AGE_YEARS,
  MIN_AGE_YEARS,
  OWN_RESEARCH_REGIONS,
  PERIPHERAL_NERVE_REGION_IDS,
  RESEARCH_PAPERS,
  VESSEL_REGION_IDS,
  ageYearsToGestationalWeek,
  computeCorticalDevelopment,
  computeScaledDimensionsMm,
  computeViewportSpecimenScale,
  formatAgeLabel,
  gestationalWeekToAgeYears,
  getOverallKnowledgeCoverage,
  getRegionEpistemicState,
  isPrenatalAge,
} from './lifespan';
import { BRAIN_REGIONS, isBodyNerveRegion, isNerveRegion, type RegionId } from './neuroanatomy';

test('lifespan volume trajectory covers prenatal GW4 to 122 yr smoothly', () => {
  const gw4 = computeScaledDimensionsMm(MIN_AGE_YEARS).volumePct;
  const gw20 = computeScaledDimensionsMm(gestationalWeekToAgeYears(20)).volumePct;
  const birth = computeScaledDimensionsMm(0).volumePct;
  const peak = computeScaledDimensionsMm(12).volumePct;
  const adult = computeScaledDimensionsMm(28).volumePct;
  const old = computeScaledDimensionsMm(85).volumePct;
  const extreme = computeScaledDimensionsMm(MAX_AGE_YEARS).volumePct;

  assert.ok(gw4 > 0 && gw4 <= 2.0, `GW4 volumePct should be embryonic (${gw4})`);
  assert.ok(gw20 > gw4 && gw20 < birth, `GW20 (${gw20}) should lie between GW4 (${gw4}) and birth (${birth})`);
  assert.ok(birth >= 25 && birth <= 35, `Birth volumePct should be ~29% (${birth})`);
  assert.ok(peak >= adult, `Adolescent peak (${peak}) should be >= young adult (${adult})`);
  assert.ok(Math.abs(adult - 100) <= 3, `Age 28 adult reference should be ~100% (${adult})`);
  assert.ok(old < adult && extreme <= old, `Aging should reduce parenchymal volume (${adult} -> ${old} -> ${extreme})`);
});

test('gestational week conversion round-trips accurately and formats prenatal labels', () => {
  for (const gw of [4, 8, 14, 24, 32, 38]) {
    const age = gestationalWeekToAgeYears(gw);
    assert.ok(isPrenatalAge(age), `GW${gw} should be prenatal`);
    assert.ok(Math.abs(ageYearsToGestationalWeek(age) - gw) < 0.05);
    assert.ok(formatAgeLabel(age).includes(`GW${gw}`), `Label should contain GW${gw}: ${formatAgeLabel(age)}`);
  }
  assert.equal(isPrenatalAge(0), false);
  assert.equal(formatAgeLabel(0), 'Birth (0.0 yr)');
  assert.equal(formatAgeLabel(28), '28 yr');
});

test('cortical morphogenesis models lissencephalic GW4, primary sulci GW14-24, full folding, and aged sulcal widening', () => {
  const gw4 = computeCorticalDevelopment(gestationalWeekToAgeYears(4));
  const gw14 = computeCorticalDevelopment(gestationalWeekToAgeYears(14));
  const gw24 = computeCorticalDevelopment(gestationalWeekToAgeYears(24));
  const gw28 = computeCorticalDevelopment(gestationalWeekToAgeYears(28));
  const gw36 = computeCorticalDevelopment(gestationalWeekToAgeYears(36));
  const adult28 = computeCorticalDevelopment(28);
  const elder90 = computeCorticalDevelopment(90);

  assert.equal(gw4.primaryFold, 0);
  assert.equal(gw4.secondaryFold, 0);
  assert.equal(gw4.tertiaryFold, 0);
  assert.ok(gw14.primaryFold > 0.05 && gw14.secondaryFold === 0, 'GW14 begins primary sulci before secondary folds');
  assert.ok(gw24.primaryFold > 0.65 && gw28.secondaryFold > 0.15, 'GW24-28 establishes primary sulci and emerging secondary folds');
  assert.ok(gw36.secondaryFold > 0.8 && gw36.tertiaryFold > 0.4, 'GW36 has rich secondary & tertiary gyrification');
  assert.equal(adult28.primaryFold, 1);
  assert.equal(adult28.secondaryFold, 1);
  assert.equal(adult28.tertiaryFold, 1);
  assert.equal(adult28.sulcalWidening, 0);
  assert.ok(elder90.sulcalWidening > 0.55, 'Age 90 should show clear senescent sulcal widening');
  assert.ok(elder90.ventricleRelScale > adult28.ventricleRelScale, 'Ventricles should expand in late aging');
});

test('viewport specimen scale and dimensions stay strictly bounded across GW4 to 122 yr', () => {
  const minScale = computeViewportSpecimenScale(MIN_AGE_YEARS);
  const maxScale = computeViewportSpecimenScale(28);
  assert.ok(minScale >= 0.4 && minScale < maxScale);
  const dims28 = computeScaledDimensionsMm(28);
  assert.equal(dims28.isUnchartedOver100, false);
  const dims110 = computeScaledDimensionsMm(110);
  assert.equal(dims110.isUnchartedOver100, true);
  assert.ok(getOverallKnowledgeCoverage(110).knownPct < getOverallKnowledgeCoverage(28).knownPct);
});

test('all 37 nervous system structures (12 cranial + 4 cranial/cervical + 21 whole-body) have embryology and verified citations', () => {
  assert.equal(CRANIAL_NERVE_REGION_IDS.length, 12);
  assert.equal(PERIPHERAL_NERVE_REGION_IDS.length, 4);
  assert.equal(BODY_NERVE_REGION_IDS.length, 21);
  assert.equal(ALL_NERVE_REGION_IDS.length, 37);

  for (const nerveId of ALL_NERVE_REGION_IDS) {
    const info = BRAIN_REGIONS[nerveId];
    assert.ok(info, `Missing BRAIN_REGIONS metadata for ${nerveId}`);
    assert.ok(isNerveRegion(nerveId), `${nerveId} must satisfy isNerveRegion`);
    assert.ok(info.embryology, `Missing embryology metadata for ${nerveId}`);
    assert.ok(
      info.embryology.emergenceGw >= 4 && info.embryology.emergenceGw <= 10,
      `${nerveId} emergenceGw out of embryonic range: ${info.embryology.emergenceGw}`,
    );
    assert.ok(
      info.embryology.matureGw > info.embryology.emergenceGw,
      `${nerveId} matureGw must exceed emergenceGw`,
    );

    const state = getRegionEpistemicState(nerveId, 28);
    assert.ok(state.citations.length >= 1, `${nerveId} must have at least 1 verified citation`);
    for (const c of state.citations) {
      assert.ok(
        Boolean(c.doi || c.pmcId || c.sourceUrl),
        `${nerveId} citation ${c.id} must have a DOI, PMCID, or source URL`,
      );
      assert.ok(c.verbatimQuote.length > 20, `${nerveId} citation ${c.id} missing verbatim quote`);
    }
  }

  for (const bodyId of BODY_NERVE_REGION_IDS) {
    assert.equal(isBodyNerveRegion(bodyId), true, `${bodyId} must satisfy isBodyNerveRegion`);
  }
  assert.equal(isBodyNerveRegion('cn-v-trigeminal'), false);
  assert.equal(isBodyNerveRegion('frontal-lobe'), false);
});

test('multi-nerve and dedicated whole-body papers are accurately wired to their target nerves', () => {
  const hasCitation = (region: RegionId, citationId: string) =>
    getRegionEpistemicState(region, 28).citations.some((c) => c.id === citationId);

  // Dedicated cranial nerve papers
  assert.ok(hasCitation('cn-ii-optic', 'zheng2021_optic'));
  assert.ok(hasCitation('cn-iii-oculomotor', 'sananmuang2021_oculomotor'));
  assert.ok(hasCitation('cn-vi-abducens', 'lemmerling1999_abducens'));
  assert.ok(hasCitation('cn-ix-glossopharyngeal', 'nishihara2017_cn9'));
  assert.ok(hasCitation('cn-xi-accessory', 'tai2025_accessory'));
  assert.ok(hasCitation('cn-xii-hypoglossal', 'geng2021_hypoglossal'));

  // Multi-nerve upper/lower limb normative papers (Cartwright 2008 & Qrimli 2016)
  for (const limbNerve of [
    'nerve-median',
    'nerve-ulnar',
    'nerve-radial',
    'nerve-sciatic',
    'nerve-tibial',
    'nerve-fibular-sural',
    'nerve-brachial-plexus',
  ] as RegionId[]) {
    const cids = getRegionEpistemicState(limbNerve, 28).citations.map((c) => c.id);
    assert.ok(
      cids.includes('cartwright2008') || cids.includes('qrimli2016'),
      `${limbNerve} should include multi-nerve normative study (got: ${cids.join(', ')})`,
    );
  }

  // Dedicated spinal cord, plexus, autonomic, and enteric papers
  assert.ok(hasCitation('spinal-cord-thoracic', 'frostell2018_cord'));
  assert.ok(hasCitation('spinal-cord-lumbosacral', 'saifuddin1998_conus'));
  assert.ok(hasCitation('nerve-cauda-equina', 'sun2022_conus'));
  assert.ok(hasCitation('nerve-phrenic', 'bedewi2023_phrenic'));
  assert.ok(hasCitation('nerve-brachial-plexus', 'bedewi2021_bp'));
  assert.ok(hasCitation('nerve-axillary', 'yoon2019_axillary'));
  assert.ok(hasCitation('nerve-musculocutaneous', 'matsumoto2018_musculocut'));
  assert.ok(hasCitation('nerve-radial', 'singh2021_radial'));
  assert.ok(hasCitation('nerve-intercostal', 'huttin2026_intercostal'));
  assert.ok(hasCitation('nerve-femoral', 'gruber2003_femoral'));
  assert.ok(hasCitation('nerve-lumbar-plexus', 'yoshimura2018_femoral'));
  assert.ok(hasCitation('nerve-obturator', 'uchino2026_obturator'));
  assert.ok(hasCitation('nerve-pudendal', 'suganya2025_pudendal'));
  assert.ok(hasCitation('nerve-sympathetic-chain', 'franco2024_sympathetic'));
  assert.ok(hasCitation('nerve-sympathetic-chain', 'forrester2026_splanchnic'));
  assert.ok(hasCitation('nerve-pelvic-splanchnic', 'yamashita2017_pelvic'));
  assert.ok(hasCitation('nerve-enteric-plexus', 'furness2012_ens'));
  assert.ok(Object.keys(RESEARCH_PAPERS).length >= 45);
});

test('Own Research is strictly exclusive to researched structures and never leaks onto nerves, brainstem, hypothalamus, or arteries', () => {
  const expectedResearched: RegionId[] = [
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
  ];

  for (const reg of expectedResearched) {
    assert.ok(OWN_RESEARCH_REGIONS.has(reg), `${reg} should be in OWN_RESEARCH_REGIONS`);
    const st = getRegionEpistemicState(reg, 28);
    assert.equal(st.hasOwnResearch, true, `${reg} must have hasOwnResearch === true`);
    assert.ok(st.ownResearchCount > 0, `${reg} must have ownResearchCount > 0`);
  }

  const strictlyNonOwnResearch: RegionId[] = [
    'brainstem',
    'hypothalamus',
    ...ALL_NERVE_REGION_IDS,
    ...VESSEL_REGION_IDS.filter((v) => v !== 'vessel-venous-sinuses'),
  ];

  for (const reg of strictlyNonOwnResearch) {
    assert.equal(OWN_RESEARCH_REGIONS.has(reg), false, `${reg} must NOT be in OWN_RESEARCH_REGIONS`);
    const st = getRegionEpistemicState(reg, 28);
    assert.equal(st.hasOwnResearch, false, `${reg} must have hasOwnResearch === false`);
    assert.equal(st.ownResearchCount, 0, `${reg} must have 0 own research citations`);
    assert.equal(
      st.citations.some((c) => c.isOwnResearch),
      false,
      `${reg} must not contain any own-research citation`,
    );
  }
});
