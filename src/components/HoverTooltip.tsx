import { getRegionEpistemicState } from '../data/lifespan';
import { BRAIN_REGIONS, type RegionId, type TissueFinish } from '../data/neuroanatomy';

interface HoverTooltipProps {
  regionId: RegionId | null;
  position: { x: number; y: number } | null;
  ageYears: number;
  tissueFinish: TissueFinish;
}

export function HoverTooltip({
  regionId,
  position,
  ageYears,
  tissueFinish,
}: HoverTooltipProps) {
  if (!regionId || !position) return null;

  const region = BRAIN_REGIONS[regionId];
  const state = getRegionEpistemicState(regionId, ageYears);

  // Clamp tooltip inside viewport bounds safely
  const maxX = typeof window !== 'undefined' ? window.innerWidth - 276 : position.x;
  const maxY = typeof window !== 'undefined' ? window.innerHeight - 150 : position.y;
  const left = Math.max(12, Math.min(position.x + 16, maxX));
  const top = Math.max(12, Math.min(position.y + 16, maxY));

  return (
    <div
      role="status"
      aria-live="polite"
      style={{ left: `${left}px`, top: `${top}px` }}
      className="fixed z-30 pointer-events-none w-[260px] bg-[#0c1018]/95 border border-white/15 rounded-lg px-3 py-2.5 shadow-2xl"
    >
      <div className="flex items-center gap-2">
        <span
          className="w-2.5 h-2.5 rounded-sm shrink-0"
          style={{ backgroundColor: region.swatchColor }}
          aria-hidden="true"
        />
        <span className="text-xs font-semibold text-white truncate">
          {region.name}
        </span>
      </div>

      <div className="mt-0.5 text-[10px] text-[#9aa4b4] truncate">
        {region.latinName} · {region.dimensionsMm}
      </div>

      <div className="mt-1.5 flex items-center justify-between text-[11px] font-mono-tabular">
        <span className="text-emerald-300">{state.knownPct}% Known</span>
        <span className="text-[#8b95a7]" aria-hidden="true">·</span>
        <span className="text-amber-300">{state.gapPct}% Gap</span>
      </div>

      <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/10 overflow-hidden flex">
        <div
          className="h-full bg-emerald-400"
          style={{ width: `${state.knownPct}%` }}
        />
        <div
          className="h-full bg-amber-400/75"
          style={{ width: `${state.gapPct}%` }}
        />
      </div>

      {tissueFinish === 'temperature' && (
        <div className="mt-1.5 text-[11px] font-mono-tabular text-[#cbd5e1]">
          {state.tempCelsius !== null
            ? `MRS Baseline ~${state.tempCelsius.toFixed(1)} °C`
            : 'Temperature: Unmeasured gap'}
        </div>
      )}

      {state.isUnchartedOver100 && (
        <div className="mt-1 text-[11px] font-medium text-amber-300">
          Uncharted &gt;100 yr
        </div>
      )}

      {state.isPrenatal && (
        <div className="mt-1 text-[10px] font-medium text-sky-200">
          {region.embryology
            ? `Emerges ~GW${region.embryology.emergenceGw.toFixed(1)} · ${region.embryology.carnegieStage}`
            : `Fetal GW${state.gestationalWeek.toFixed(1)} morphogenesis`}
        </div>
      )}

      {!state.isPrenatal && region.embryology && (
        <div className="mt-1 text-[10px] text-[#9aa4b4]">
          {region.embryology.carnegieStage} · Origin GW{region.embryology.emergenceGw.toFixed(1)}
        </div>
      )}

      {state.hasOwnResearch && (
        <div className="mt-1 text-[10px] font-medium text-sky-300">
          Includes Own Research · Zahoor (2026)
        </div>
      )}

      <div className="mt-1 text-[10px] text-[#8b95a7]">
        Click to open research dossier
      </div>
    </div>
  );
}
