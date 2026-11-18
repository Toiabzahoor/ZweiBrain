import { useState } from 'react';
import { ExternalLink, FileText, X } from 'lucide-react';
import { formatAgeLabel, getRegionEpistemicState, RESEARCH_PAPERS } from '../data/lifespan';
import { BRAIN_REGIONS, type RegionId } from '../data/neuroanatomy';

interface InspectorPanelProps {
  selectedRegion: RegionId | null;
  structuresOpen: boolean;
  ageYears: number;
  onSelectRegion: (regionId: RegionId | null) => void;
  onClosePanel: () => void;
}

const REGION_ORDER: RegionId[] = [
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
  'cerebral-cortex',
  'ventricles',
  'vasculature',
];

export function InspectorPanel({
  selectedRegion,
  structuresOpen,
  ageYears,
  onSelectRegion,
  onClosePanel,
}: InspectorPanelProps) {
  const [quotesFilter, setQuotesFilter] = useState<'all' | 'own'>('all');

  if (!selectedRegion && !structuresOpen) {
    return null;
  }

  const info = selectedRegion ? BRAIN_REGIONS[selectedRegion] : null;
  const epistemic = selectedRegion ? getRegionEpistemicState(selectedRegion, ageYears) : null;

  const displayedCitations =
    epistemic && quotesFilter === 'own' && epistemic.ownResearchCount > 0
      ? epistemic.citations.filter((c) => c.isOwnResearch)
      : epistemic?.citations ?? [];

  return (
    <aside
      aria-label="Research dossier and anatomical inspector"
      className="fixed top-4 right-4 z-20 w-[392px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-15.5rem)] flex flex-col bg-[#0c1018]/95 border border-white/12 rounded-xl shadow-2xl overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 shrink-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-white truncate">
              {info ? info.name : 'Anatomical Structures'}
            </h2>
            {epistemic?.hasOwnResearch && (
              <span
                data-testid="dossier-own-research-badge"
                className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded border border-sky-400/35 bg-sky-500/12 text-sky-200 whitespace-nowrap shrink-0"
              >
                Own Research
              </span>
            )}
          </div>
          <p className="text-xs text-[#8b95a7] truncate">
            {info
              ? `${info.latinName} · ${formatAgeLabel(ageYears)}`
              : `Epistemic atlas at ${formatAgeLabel(ageYears)}`}
          </p>
        </div>
        <button
          type="button"
          onClick={onClosePanel}
          aria-label="Close anatomical inspector"
          className="p-1.5 text-[#9aa4b4] hover:text-white rounded-md hover:bg-white/8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      <div className="p-4 overflow-y-auto atlas-scroll space-y-4">
        {info && epistemic ? (
          <>
            {/* Known % / Unknown % Coverage Meter */}
            <section aria-label="Empirical knowledge coverage">
              <div className="flex items-center justify-between text-xs font-mono-tabular mb-1.5">
                <span className="font-semibold text-emerald-300">
                  {epistemic.knownPct}% Empirical Known
                </span>
                <span className="font-semibold text-amber-300">
                  {epistemic.gapPct}% Unknown Gap
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden flex">
                <div
                  className="h-full bg-emerald-400 transition-all duration-200"
                  style={{ width: `${epistemic.knownPct}%` }}
                />
                <div
                  className="h-full bg-amber-400/75 transition-all duration-200"
                  style={{ width: `${epistemic.gapPct}%` }}
                />
              </div>
              {epistemic.isUnchartedOver100 && (
                <p className="mt-1.5 text-[11px] font-medium text-amber-300">
                  Uncharted &gt;100 yr: Supercentenarian trajectories lie outside current normative MRI &amp; MRS cohorts.
                </p>
              )}
            </section>

            {/* 3 Status Cards at Selected Age */}
            <section aria-label="Status at selected age" className="space-y-2">
              <div className="rounded-lg bg-white/[0.03] border border-white/8 p-3">
                <div className="text-[11px] font-semibold text-[#9aa4b4]">
                  Size / Structure
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[#e2e8f0]">
                  {epistemic.sizeStatus}
                </p>
              </div>

              <div className="rounded-lg bg-white/[0.03] border border-white/8 p-3">
                <div className="text-[11px] font-semibold text-[#9aa4b4]">
                  Myelination
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[#e2e8f0]">
                  {epistemic.myelinationStatus}
                </p>
              </div>

              <div className="rounded-lg bg-white/[0.03] border border-white/8 p-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-[#9aa4b4]">
                    Temperature
                  </span>
                  {epistemic.tempCelsius !== null && (
                    <span className="text-[11px] font-mono-tabular font-semibold text-orange-300">
                      {epistemic.tempCelsius.toFixed(1)} °C
                    </span>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-[#e2e8f0]">
                  {epistemic.temperatureStatus}
                </p>
                {epistemic.modeledTempNote && (
                  <div className="rounded-md bg-sky-500/[0.08] border border-sky-400/25 px-2.5 py-2 text-[11px] leading-relaxed text-sky-100">
                    <span className="font-semibold text-sky-300">Own Research · Modeled: </span>
                    {epistemic.modeledTempNote.replace(/^Own Research [^:]+:\s*/, '')}
                  </div>
                )}
              </div>
            </section>

            {/* Own Research Synthesis Section */}
            {epistemic.ownResearchHighlights.length > 0 && (
              <section
                aria-label="Own research synthesis"
                data-testid="own-research-section"
                className="space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[11px] font-semibold uppercase tracking-wider text-sky-300">
                    Own Research · Toiab Zahoor (2026)
                  </h3>
                  <span className="text-[10px] font-mono-tabular text-sky-200/80">
                    {epistemic.ownResearchHighlights.length}{' '}
                    {epistemic.ownResearchHighlights.length === 1 ? 'finding' : 'findings'}
                  </span>
                </div>

                {epistemic.ownResearchHighlights.map((item) => {
                  const srcPaper = RESEARCH_PAPERS[item.sourcePaperId];
                  return (
                    <article
                      key={item.id}
                      className="rounded-lg bg-sky-500/[0.06] border border-sky-400/25 p-3 space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-sky-300">
                          Own Research · {item.category}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-white leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs leading-relaxed text-[#dbeafe]">
                        {item.summary}
                      </p>
                      <div className="pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-sky-400/15">
                        <span className="text-[11px] font-mono-tabular text-sky-200">
                          {item.metric}
                        </span>
                        {srcPaper?.sourceUrl && (
                          <a
                            href={srcPaper.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-sky-300 hover:text-sky-200 underline underline-offset-2 shrink-0"
                          >
                            <FileText className="w-3 h-3" aria-hidden="true" />
                            <span>{srcPaper.sourceLabel ?? 'Manuscript'}</span>
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </section>
            )}

            {/* Exact Research Quotes */}
            <section aria-label="Exact research quotes" className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#8b95a7]">
                  Exact Research Quotes
                </h3>
                {epistemic.ownResearchCount > 0 && (
                  <div
                    role="group"
                    aria-label="Filter research quotes"
                    className="inline-flex items-center gap-0.5 p-0.5 bg-[#07090e] border border-white/10 rounded-md"
                  >
                    <button
                      type="button"
                      onClick={() => setQuotesFilter('all')}
                      aria-pressed={quotesFilter === 'all'}
                      className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors ${
                        quotesFilter === 'all'
                          ? 'bg-[#1e293b] text-white'
                          : 'text-[#8b95a7] hover:text-white'
                      }`}
                    >
                      All ({epistemic.citations.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuotesFilter('own')}
                      aria-pressed={quotesFilter === 'own'}
                      className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors ${
                        quotesFilter === 'own'
                          ? 'bg-sky-500/20 text-sky-200'
                          : 'text-sky-300/80 hover:text-sky-200'
                      }`}
                    >
                      Own ({epistemic.ownResearchCount})
                    </button>
                  </div>
                )}
              </div>

              {displayedCitations.map((cite) => (
                <article
                  key={cite.id}
                  data-own-research={cite.isOwnResearch ? 'true' : 'false'}
                  className={`rounded-lg p-3 space-y-2 border ${
                    cite.isOwnResearch
                      ? 'bg-[#08101c] border-sky-400/30'
                      : 'bg-[#07090e] border-white/8'
                  }`}
                >
                  {cite.isOwnResearch && (
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded border border-sky-400/35 bg-sky-500/12 text-sky-200">
                        {cite.ownResearchBadge ?? 'Own Research'}
                      </span>
                    </div>
                  )}
                  <blockquote className="text-xs leading-relaxed text-[#eef1f6] italic">
                    &ldquo;{cite.verbatimQuote}&rdquo;
                  </blockquote>
                  <div className="text-[11px] text-[#9aa4b4] leading-snug">
                    <div className="font-medium text-[#cbd5e1]">
                      {cite.authors} ({cite.year})
                    </div>
                    <div>
                      {cite.title} · {cite.journal}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-0.5 text-[11px] font-mono-tabular">
                    {cite.doi && (
                      <a
                        href={`https://doi.org/${cite.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sky-300 hover:text-sky-200 underline underline-offset-2"
                      >
                        <span>DOI: {cite.doi}</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    )}
                    {cite.pmcId && (
                      <a
                        href={`https://pmc.ncbi.nlm.nih.gov/articles/${cite.pmcId}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sky-300 hover:text-sky-200 underline underline-offset-2"
                      >
                        <span>{cite.pmcId}</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    )}
                    {cite.sourceUrl && (
                      <a
                        href={cite.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sky-300 hover:text-sky-200 underline underline-offset-2"
                      >
                        <FileText className="w-3 h-3" aria-hidden="true" />
                        <span>{cite.sourceLabel ?? 'Open Manuscript'}</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </section>

            {/* What We Don't Know (Gaps) */}
            <section aria-label="Empirical knowledge gaps" className="space-y-1.5">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-amber-300/90">
                What We Don&apos;t Know (Gaps)
              </h3>
              <ul className="space-y-1.5">
                {epistemic.gaps.map((gap) => (
                  <li
                    key={gap}
                    className="text-xs leading-relaxed text-[#cbd5e1] rounded-md bg-amber-500/[0.06] border border-amber-400/20 px-2.5 py-2"
                  >
                    {gap}
                  </li>
                ))}
              </ul>
            </section>

            {/* Reference Anatomy Metadata */}
            <div className="pt-2 border-t border-white/8 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[11px] text-[#8b95a7]">Adult Atlas Span</div>
                  <div className="text-xs font-medium text-[#eef1f6] font-mono-tabular mt-0.5">
                    {info.dimensionsMm}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-[#8b95a7]">Adult Volume</div>
                  <div className="text-xs font-medium text-[#eef1f6] font-mono-tabular mt-0.5">
                    {info.volumeCm3}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[11px] font-semibold text-[#8b95a7] mb-1">
                  Key Landmarks
                </h3>
                <ul className="space-y-0.5">
                  {info.landmarks.map((lm) => (
                    <li key={lm} className="text-xs text-[#cbd5e1] leading-snug">
                      {lm}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2 border-t border-white/8 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onSelectRegion(null)}
                className="text-xs font-medium text-[#9aa4b4] hover:text-white transition-colors"
              >
                All Structures
              </button>
              <button
                type="button"
                onClick={onClosePanel}
                className="px-3 py-1.5 text-xs font-medium text-white bg-[#1e293b] hover:bg-[#273549] rounded-md transition-colors"
              >
                Clear Focus
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-1">
            {REGION_ORDER.map((id) => {
              const region = BRAIN_REGIONS[id];
              const rowEpistemic = getRegionEpistemicState(id, ageYears);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onSelectRegion(id)}
                  className="w-full flex items-center justify-between px-2.5 py-2 text-left rounded-lg hover:bg-white/6 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-sm shrink-0"
                      style={{ backgroundColor: region.swatchColor }}
                      aria-hidden="true"
                    />
                    <span className="text-xs font-medium text-[#e2e8f0] group-hover:text-white truncate">
                      {region.name}
                    </span>
                  </div>
                  <span className="flex items-center gap-2 text-[11px] font-mono-tabular shrink-0 ml-2">
                    {rowEpistemic.hasOwnResearch && (
                      <span className="text-[10px] font-sans font-semibold text-sky-300">
                        Own Research
                      </span>
                    )}
                    <span className="text-[#8b95a7]">{rowEpistemic.knownPct}% known</span>
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
