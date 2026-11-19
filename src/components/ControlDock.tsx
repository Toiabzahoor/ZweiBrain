import { useEffect, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Eye,
  Image as ImageIcon,
  Layers,
  Pause,
  Play,
  RotateCw,
} from 'lucide-react';
import {
  ageYearsToGestationalWeek,
  formatAgeLabel,
  gestationalWeekToAgeYears,
  isPrenatalAge,
  PRENATAL_QUICK_JUMP_WEEKS,
  QUICK_JUMP_AGES,
} from '../data/lifespan';
import {
  CAMERA_PRESETS,
  type CameraPresetId,
  type TissueFinish,
  type ViewMode,
} from '../data/neuroanatomy';

export type PlaySpeed = 1 | 5 | 15;

interface ControlDockProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  ageYears: number;
  onChangeAge: (age: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  playSpeed: PlaySpeed;
  onChangePlaySpeed: (speed: PlaySpeed) => void;
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  tissueFinish: TissueFinish;
  onChangeTissueFinish: (finish: TissueFinish) => void;
  activeCameraPreset: CameraPresetId | null;
  onSelectCameraPreset: (preset: CameraPresetId) => void;
  showVessels: boolean;
  onToggleVessels: () => void;
  showNerves: boolean;
  onToggleNerves: () => void;
  showWholeBody: boolean;
  onToggleWholeBody: () => void;
  showVentricles: boolean;
  onToggleVentricles: () => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  structuresOpen: boolean;
  onToggleStructures: () => void;
  onOpenReferences: () => void;
}

const VIEW_MODES: { id: ViewMode; label: string }[] = [
  { id: 'intact', label: 'Intact' },
  { id: 'glass', label: 'Glass Cortex' },
  { id: 'split', label: 'Sagittal Split' },
  { id: 'exploded', label: 'Exploded' },
];

const FINISH_MODES: { id: TissueFinish; label: string }[] = [
  { id: 'fresh', label: 'Fresh Specimen' },
  { id: 'fixed', label: 'Fixed Atlas' },
  { id: 'lobes', label: 'Lobe Map' },
  { id: 'knowledge', label: 'Knowledge %' },
  { id: 'temperature', label: 'Temperature' },
];

const PLAY_SPEEDS: PlaySpeed[] = [1, 5, 15];

function formatQuickAgeLabel(age: number): string {
  if (age === 0) return '0';
  if (age === 0.5) return '0.5';
  return String(age);
}

export function ControlDock({
  collapsed,
  onToggleCollapsed,
  ageYears,
  onChangeAge,
  isPlaying,
  onTogglePlay,
  playSpeed,
  onChangePlaySpeed,
  viewMode,
  onChangeViewMode,
  tissueFinish,
  onChangeTissueFinish,
  activeCameraPreset,
  onSelectCameraPreset,
  showVessels,
  onToggleVessels,
  showNerves,
  onToggleNerves,
  showWholeBody,
  onToggleWholeBody,
  showVentricles,
  onToggleVentricles,
  autoRotate,
  onToggleAutoRotate,
  structuresOpen,
  onToggleStructures,
  onOpenReferences,
}: ControlDockProps) {
  const [timelineEra, setTimelineEra] = useState<'prenatal' | 'lifespan'>(() =>
    isPrenatalAge(ageYears) ? 'prenatal' : 'lifespan',
  );

  useEffect(() => {
    if (isPrenatalAge(ageYears)) {
      setTimelineEra('prenatal');
    } else if (ageYears > 0.01) {
      setTimelineEra('lifespan');
    }
  }, [ageYears]);

  const currentGw = ageYearsToGestationalWeek(ageYears);

  const handleSelectEra = (era: 'prenatal' | 'lifespan') => {
    setTimelineEra(era);
    if (era === 'prenatal' && ageYears >= 0) {
      onChangeAge(gestationalWeekToAgeYears(14));
    } else if (era === 'lifespan' && ageYears < 0) {
      onChangeAge(0);
    }
  };

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none"
      style={{ width: 'min(1260px, 96vw)' }}
    >
      {/* Collapse / Expand tab attached to top edge of dock */}
      <button
        type="button"
        onClick={onToggleCollapsed}
        aria-expanded={!collapsed}
        aria-label={collapsed ? 'Show controls' : 'Hide controls'}
        className="pointer-events-auto mb-1.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-[#cbd5e1] hover:text-white bg-[#0c1018]/95 border border-white/12 rounded-t-lg rounded-b-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      >
        {collapsed ? (
          <>
            <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Show Controls</span>
          </>
        ) : (
          <>
            <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Hide Controls</span>
          </>
        )}
      </button>

      {/* Main Dock Container */}
      <div
        className={`pointer-events-auto w-full bg-[#0c1018]/95 border border-white/12 rounded-xl px-3.5 py-3 shadow-2xl transition-all duration-200 ${
          collapsed
            ? 'opacity-0 translate-y-6 pointer-events-none h-0 py-0 overflow-hidden border-0'
            : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="flex flex-col gap-2.5">
          {/* Row 0: Prenatal (GW4-40) / Lifespan (0-122 yr) Play/Pause, Speed, Slider & Quick-Jumps */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 flex-1 min-w-[300px]">
              <div
                role="group"
                aria-label="Developmental timeline era"
                className="inline-flex items-center gap-0.5 p-0.5 bg-[#07090e] border border-white/8 rounded-md shrink-0"
              >
                <button
                  type="button"
                  data-testid="era-prenatal"
                  onClick={() => handleSelectEra('prenatal')}
                  aria-pressed={timelineEra === 'prenatal'}
                  className={`px-2 py-1 text-[11px] font-medium rounded transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                    timelineEra === 'prenatal'
                      ? 'bg-sky-500/20 text-sky-200 border border-sky-400/40'
                      : 'text-[#8b95a7] hover:text-white border border-transparent'
                  }`}
                >
                  Prenatal
                </button>
                <button
                  type="button"
                  data-testid="era-lifespan"
                  onClick={() => handleSelectEra('lifespan')}
                  aria-pressed={timelineEra === 'lifespan'}
                  className={`px-2 py-1 text-[11px] font-medium rounded transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                    timelineEra === 'lifespan'
                      ? 'bg-[#1e293b] text-white border border-white/14'
                      : 'text-[#8b95a7] hover:text-white border border-transparent'
                  }`}
                >
                  0–122 yr
                </button>
              </div>

              <button
                type="button"
                onClick={onTogglePlay}
                aria-label={isPlaying ? 'Pause lifespan' : 'Play lifespan'}
                aria-pressed={isPlaying}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  isPlaying
                    ? 'bg-sky-500/20 text-sky-200 border-sky-400/50'
                    : 'bg-[#1b2434] text-white border-white/14 hover:border-white/25'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Play</span>
                  </>
                )}
              </button>

              <div
                role="group"
                aria-label="Lifespan playback speed"
                className="inline-flex items-center gap-0.5 p-0.5 bg-[#07090e] border border-white/8 rounded-md shrink-0"
              >
                {PLAY_SPEEDS.map((spd) => {
                  const active = playSpeed === spd;
                  return (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => onChangePlaySpeed(spd)}
                      aria-pressed={active}
                      className={`px-2 py-1 text-[11px] font-medium font-mono-tabular rounded transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                        active
                          ? 'bg-[#1e293b] text-white'
                          : 'text-[#8b95a7] hover:text-white'
                      }`}
                    >
                      {spd}x
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 flex-1 min-w-[150px]">
                <label
                  htmlFor="lifespan-age-slider"
                  className="text-[11px] font-medium text-[#8b95a7] whitespace-nowrap shrink-0"
                >
                  {timelineEra === 'prenatal' ? 'Gestation' : 'Age'}
                </label>
                {timelineEra === 'prenatal' ? (
                  <input
                    id="lifespan-age-slider"
                    type="range"
                    min={4}
                    max={40}
                    step={0.5}
                    value={currentGw}
                    onChange={(e) => onChangeAge(gestationalWeekToAgeYears(Number(e.target.value)))}
                    aria-label="Gestational week from GW4 to GW40"
                    className="w-full h-1.5 accent-sky-400 cursor-pointer"
                  />
                ) : (
                  <input
                    id="lifespan-age-slider"
                    type="range"
                    min={0}
                    max={122}
                    step={0.25}
                    value={Math.max(0, ageYears)}
                    onChange={(e) => onChangeAge(Number(e.target.value))}
                    aria-label="Brain age in years"
                    className="w-full h-1.5 accent-sky-400 cursor-pointer"
                  />
                )}
                <span className="text-xs font-medium text-[#eef1f6] font-mono-tabular whitespace-nowrap shrink-0 min-w-[104px] text-right">
                  {formatAgeLabel(ageYears)}
                </span>
              </div>
            </div>

            {timelineEra === 'prenatal' ? (
              <div
                role="group"
                aria-label="Quick-jump prenatal gestational weeks"
                className="flex items-center gap-1 flex-wrap"
              >
                <span className="text-[11px] font-medium text-[#8b95a7] mr-0.5 whitespace-nowrap">
                  Weeks
                </span>
                {PRENATAL_QUICK_JUMP_WEEKS.map((gw) => {
                  const active = Math.abs(currentGw - gw) < 0.3;
                  return (
                    <button
                      key={gw}
                      type="button"
                      onClick={() => onChangeAge(gestationalWeekToAgeYears(gw))}
                      aria-pressed={active}
                      className={`px-2 py-1 text-[11px] font-medium font-mono-tabular rounded-md border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                        active
                          ? 'bg-[#1b2434] text-sky-200 border-sky-400/50'
                          : 'bg-transparent text-[#9aa4b4] hover:text-white border-white/8 hover:border-white/20'
                      }`}
                    >
                      GW{gw}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div
                role="group"
                aria-label="Quick-jump lifespan ages"
                className="flex items-center gap-1 flex-wrap"
              >
                <span className="text-[11px] font-medium text-[#8b95a7] mr-0.5 whitespace-nowrap">
                  Years
                </span>
                {QUICK_JUMP_AGES.map((q) => {
                  const active = !isPrenatalAge(ageYears) && Math.abs(ageYears - q) < 0.13;
                  return (
                    <button
                      key={q}
                      type="button"
                      onClick={() => onChangeAge(q)}
                      aria-pressed={active}
                      className={`px-2 py-1 text-[11px] font-medium font-mono-tabular rounded-md border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                        active
                          ? 'bg-[#1b2434] text-white border-sky-400/50'
                          : 'bg-transparent text-[#9aa4b4] hover:text-white border-white/8 hover:border-white/20'
                      }`}
                    >
                      {formatQuickAgeLabel(q)}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="h-px bg-white/8" />

          {/* Row 1: Dissection Mode + Tissue Finish (incl. Knowledge % & Temperature) */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-medium text-[#8b95a7] mr-1 whitespace-nowrap">
                Dissection
              </span>
              <div
                role="group"
                aria-label="Dissection view mode"
                className="inline-flex items-center gap-1 p-0.5 bg-[#07090e] border border-white/8 rounded-lg"
              >
                {VIEW_MODES.map((m) => {
                  const active = viewMode === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => onChangeViewMode(m.id)}
                      aria-pressed={active}
                      className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                        active
                          ? 'bg-[#1e293b] text-white border border-white/14'
                          : 'text-[#9aa4b4] hover:text-white border border-transparent'
                      }`}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-medium text-[#8b95a7] mr-1 whitespace-nowrap">
                Tissue
              </span>
              <div
                role="group"
                aria-label="Tissue finish"
                className="inline-flex items-center gap-1 p-0.5 bg-[#07090e] border border-white/8 rounded-lg flex-wrap"
              >
                {FINISH_MODES.map((f) => {
                  const active = tissueFinish === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => onChangeTissueFinish(f.id)}
                      aria-pressed={active}
                      className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                        active
                          ? 'bg-[#1e293b] text-white border border-white/14'
                          : 'text-[#9aa4b4] hover:text-white border border-transparent'
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="h-px bg-white/8" />

          {/* Row 2: Camera Angles + Anatomical Layers & Reference Plates */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-[11px] font-medium text-[#8b95a7] mr-1 whitespace-nowrap">
                Angle
              </span>
              {CAMERA_PRESETS.map((preset) => {
                const active = activeCameraPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => onSelectCameraPreset(preset.id)}
                    aria-pressed={active}
                    className={`px-2 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                      active
                        ? 'bg-[#1b2434] text-white border-sky-400/50'
                        : 'bg-transparent text-[#9aa4b4] hover:text-white border-white/8 hover:border-white/20'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1 flex-wrap">
              <button
                type="button"
                onClick={onToggleVessels}
                aria-pressed={showVessels}
                className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  showVessels
                    ? 'bg-[#2a171b] text-rose-200 border-rose-400/40'
                    : 'bg-transparent text-[#9aa4b4] hover:text-white border-white/8'
                }`}
              >
                <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Vessels</span>
              </button>

              <button
                type="button"
                onClick={onToggleNerves}
                aria-pressed={showNerves}
                className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  showNerves
                    ? 'bg-[#241f14] text-amber-200 border-amber-400/40'
                    : 'bg-transparent text-[#9aa4b4] hover:text-white border-white/8'
                }`}
              >
                <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Nerves</span>
              </button>

              <button
                type="button"
                data-testid="toggle-whole-body"
                onClick={onToggleWholeBody}
                aria-pressed={showWholeBody}
                className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  showWholeBody
                    ? 'bg-[#2b2314] text-amber-100 border-amber-300/60'
                    : 'bg-transparent text-[#9aa4b4] hover:text-white border-white/8'
                }`}
              >
                <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Whole Body</span>
              </button>

              <button
                type="button"
                onClick={onToggleVentricles}
                aria-pressed={showVentricles}
                className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  showVentricles
                    ? 'bg-[#132635] text-sky-200 border-sky-400/40'
                    : 'bg-transparent text-[#9aa4b4] hover:text-white border-white/8'
                }`}
              >
                <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Ventricles</span>
              </button>

              <button
                type="button"
                onClick={onToggleAutoRotate}
                aria-pressed={autoRotate}
                className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  autoRotate
                    ? 'bg-[#1b2434] text-white border-sky-400/50'
                    : 'bg-transparent text-[#9aa4b4] hover:text-white border-white/8'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Auto-Orbit</span>
              </button>

              <button
                type="button"
                onClick={onToggleStructures}
                aria-pressed={structuresOpen}
                className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  structuresOpen
                    ? 'bg-[#1b2434] text-white border-sky-400/50'
                    : 'bg-transparent text-[#cbd5e1] hover:text-white border-white/12'
                }`}
              >
                <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Structures</span>
              </button>

              <button
                type="button"
                onClick={onOpenReferences}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md bg-[#eef1f6] text-[#07090e] hover:bg-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <ImageIcon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reference Plates</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
