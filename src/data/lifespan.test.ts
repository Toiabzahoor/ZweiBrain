import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeBrainLinearScale,
  computeBrainVolumeRatio,
  computeScaledDimensionsMm,
  getOverallKnowledgeCoverage,
  getRegionEpistemicState,
  MAJOR_EPISTEMIC_REGIONS,
  RESEARCH_PAPERS,
} from './lifespan';

test('lifespan volume trajectory matches published milestones (0–122 yr)', () => {
  const birth = computeBrainVolumeRatio(0);
  const age3 = computeBrainVolumeRatio(3);
  const peak = computeBrainVolumeRatio(12.5);
  const adult = computeBrainVolumeRatio(28);
  const aged75 = computeBrainVolumeRatio(75);
  const aged100 = computeBrainVolumeRatio(100);
  const aged122 = computeBrainVolumeRatio(122);

  assert.ok(Math.abs(birth - 0.35) < 0.01, `Birth volume should be ~0.35, got ${birth}`);
  assert.ok(Math.abs(age3 - 0.80) < 0.02, `Age 3 volume should be ~0.80, got ${age3}`);
  assert.ok(peak > adult, `Peak at 12.5 yr (${peak}) should exceed adult (${adult})`);
  assert.ok(Math.abs(adult - 1.0) < 0.01, `Adult volume at 28 should be 1.0, got ${adult}`);
  assert.ok(aged75 < adult && aged75 > aged100, 'Gradual decline from 50 to 100');
  assert.equal(aged122, aged100, '101–122 holds flat at 100-yr baseline');

  const scaleBirth = computeBrainLinearScale(0);
  assert.ok(scaleBirth > 0.68 && scaleBirth < 0.72);

  const dims122 = computeScaledDimensionsMm(122);
  assert.equal(dims122.isUnchartedOver100, true);
  assert.equal(computeScaledDimensionsMm(28).ap, 167);
});

test('epistemic coverage sums to 100% and accurately models temperature & >100 yr gaps', () => {
  const sampleAges = [0, 0.5, 6, 12.5, 28, 75, 100, 122];

  for (const age of sampleAges) {
    const overall = getOverallKnowledgeCoverage(age);
    assert.equal(overall.knownPct + overall.gapPct, 100);
    assert.equal(overall.isUnchartedOver100, age > 100);

    for (const regionId of MAJOR_EPISTEMIC_REGIONS) {
      const state = getRegionEpistemicState(regionId, age);
      assert.equal(state.knownPct + state.gapPct, 100);
      assert.ok(state.citations.length >= 1);
      assert.ok(state.gaps.length >= 1);

      if (age >= 20 && age <= 40) {
        assert.notEqual(state.tempCelsius, null, `${regionId} should have MRS temperature at ${age}`);
      } else {
        assert.equal(state.tempCelsius, null, `${regionId} should have unmeasured temp gap at ${age}`);
      }

      if (age > 100) {
        assert.equal(state.isUnchartedOver100, true);
        assert.ok(state.knownPct < 20, `Over 100 yr should reflect uncharted low coverage, got ${state.knownPct}`);
      }
    }
  }
});

test('every citation has valid DOI or Own Research local manuscript URL plus verbatim quote', () => {
  const ownPapers = Object.values(RESEARCH_PAPERS).filter((p) => p.isOwnResearch);
  assert.equal(ownPapers.length, 4, 'All 4 attached own-research manuscripts should be registered');

  for (const paper of Object.values(RESEARCH_PAPERS)) {
    if (paper.isOwnResearch) {
      assert.ok(
        paper.sourceUrl && paper.sourceUrl.startsWith('/assets/aistudio/'),
        `Own research paper ${paper.id} must link to local /assets/aistudio/ file`,
      );
      assert.ok(paper.ownResearchBadge?.includes('Own Research'));
    } else {
      assert.ok(paper.doi && paper.doi.startsWith('10.'), `Invalid DOI: ${paper.doi}`);
    }
    assert.ok(paper.verbatimQuote.length > 30, `Missing quote on ${paper.id}`);
  }
});

test('own research flags modeled pediatric & aging findings while preserving empirical atlas gaps', () => {
  const infantFrontal = getRegionEpistemicState('frontal-lobe', 0.5);
  assert.equal(infantFrontal.hasOwnResearch, true);
  assert.ok(infantFrontal.citations.some((c) => c.id === 'zahoor2026_neocortical'));

  const childFrontal = getRegionEpistemicState('frontal-lobe', 8);
  assert.equal(childFrontal.hasOwnResearch, true);
  assert.equal(childFrontal.tempCelsius, null, 'Empirical pediatric temperature gap must remain unmeasured');
  assert.ok(childFrontal.modeledTempNote?.includes('Own Research'));
  assert.ok(childFrontal.citations.some((c) => c.id === 'zahoor2026_pediatric_thermo'));
  assert.ok(childFrontal.ownResearchHighlights.length >= 2);

  const agedOccipital = getRegionEpistemicState('occipital-lobe', 75);
  assert.equal(agedOccipital.hasOwnResearch, true);
  assert.equal(agedOccipital.tempCelsius, null);
  assert.ok(agedOccipital.citations.some((c) => c.id === 'zahoor2026_leak_packing'));
  assert.ok(agedOccipital.ownResearchHighlights.some((h) => h.id === 'aging_imm_proton_leak'));
});
