import { useCallback, useEffect, useState } from 'react';
import { BrainViewport } from './components/BrainViewport';
import { ControlDock, type PlaySpeed } from './components/ControlDock';
import { HoverTooltip } from './components/HoverTooltip';
import { InspectorPanel } from './components/InspectorPanel';
import { ReferenceModal } from './components/ReferenceModal';
import {
  computeScaledDimensionsMm,
  formatAgeLabel,
  getOverallKnowledgeCoverage,
} from './data/lifespan';
import {
  BRAIN_REGIONS,
  type CameraPresetId,
  type RegionId,
  type TissueFinish,
  type ViewMode,
} from './data/neuroanatomy';

export default function App() {
  const [ageYears, setAgeYears] = useState<number>(28);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState<PlaySpeed>(5);
  const [viewMode, setViewMode] = useState<ViewMode>('intact');
  const [tissueFinish, setTissueFinish] = useState<TissueFinish>('fresh');
  const [selectedRegion, setSelectedRegion] = useState<RegionId | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<RegionId | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);
  const [cameraPreset, setCameraPreset] = useState<CameraPresetId | null>('lateral');
  const [cameraRequestNonce, setCameraRequestNonce] = useState(0);
  const [showVessels, setShowVessels] = useState(true);
  const [showVentricles, setShowVentricles] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const [structuresOpen, setStructuresOpen] = useState(false);
  const [referencesOpen, setReferencesOpen] = useState(false);

  const dims = computeScaledDimensionsMm(ageYears);
  const overall = getOverallKnowledgeCoverage(ageYears);

  const handleSelectCameraPreset = useCallback((preset: CameraPresetId) => {
    setCameraPreset(preset);
    setCameraRequestNonce((n) => n + 1);
  }, []);

  const handleChangeViewMode = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    if (mode === 'split' || mode === 'exploded') {
      setCameraPreset('anterior');
      setCameraRequestNonce((n) => n + 1);
    } else if (mode === 'intact') {
      setCameraPreset('lateral');
      setCameraRequestNonce((n) => n + 1);
    }
  }, []);

  const handleSelectRegion = useCallback((regionId: RegionId | null) => {
    setSelectedRegion(regionId);
    if (!regionId) return;

    const info = BRAIN_REGIONS[regionId];
    if (info?.recommendedViewMode) {
      setViewMode((prev) => (prev === 'intact' ? info.recommendedViewMode! : prev));
    }
    if (regionId === 'ventricles') {
      setShowVentricles(true);
    }
    if (regionId === 'vasculature') {
      setShowVessels(true);
    }
    setCameraPreset(null);
  }, []);

  const handleHoverRegion = useCallback(
    (regionId: RegionId | null, screenPos?: { x: number; y: number }) => {
      setHoveredRegion(regionId);
      setHoverPos(regionId && screenPos ? screenPos : null);
    },
    [],
  );

  const handleChangeAge = useCallback((nextAge: number) => {
    const clamped = Math.max(0, Math.min(122, nextAge));
    setAgeYears(clamped);
  }, []);

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      if (!prev && ageYears >= 122) {
        setAgeYears(0);
      }
      return !prev;
    });
  }, [ageYears]);

  const handleUserOrbit = useCallback(() => {
    setCameraPreset(null);
  }, []);

  // Smooth lifespan playback across 0–122 years without saturating React / software WebGL
  useEffect(() => {
    if (!isPlaying) return;
    let lastTime = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      const dtSec = Math.min(0.25, (now - lastTime) / 1000);
      lastTime = now;

      setAgeYears((prev) => {
        const next = prev + dtSec * playSpeed;
        if (next >= 122) {
          setIsPlaying(false);
          return 122;
        }
        return Number(next.toFixed(2));
      });
    }, 60);
    return () => window.clearInterval(timer);
  }, [isPlaying, playSpeed]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'h' || e.key === 'H') {
        setDockCollapsed((prev) => !prev);
      } else if (e.key === 'Escape') {
        if (referencesOpen) {
          setReferencesOpen(false);
        } else {
          setSelectedRegion(null);
          setStructuresOpen(false);
          setHoveredRegion(null);
        }
      } else if (e.key === '1') {
        handleSelectCameraPreset('lateral');
      } else if (e.key === '2') {
        handleSelectCameraPreset('superior');
      } else if (e.key === '3') {
        handleSelectCameraPreset('anterior');
      } else if (e.key === '4') {
        handleSelectCameraPreset('inferior');
      } else if (e.key === '5') {
        handleSelectCameraPreset('midsagittal');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleSelectCameraPreset, referencesOpen]);

  return (
    <main
      data-view-mode={viewMode}
      data-finish={tissueFinish}
      data-selected-region={selectedRegion ?? 'none'}
      data-age={ageYears.toFixed(2)}
      data-playing={isPlaying ? 'true' : 'false'}
      className="relative w-screen h-screen overflow-hidden bg-[#07090e]"
    >
      {/* Top-Left Brand, Dynamic Lifespan Dimensions & Overall Epistemic Coverage */}
      <header className="fixed top-4 left-4 z-20 pointer-events-none select-none bg-[#07090e]/85 border border-white/8 rounded-lg px-3 py-2">
        <h1 className="text-base font-semibold tracking-tight text-white">
          zweibrain
        </h1>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#9aa4b4] mt-0.5 font-mono-tabular">
          <span>MNI152 Atlas</span>
          <span aria-hidden="true">·</span>
          <span data-testid="brain-dimensions">
            {dims.ap} × {dims.ml} × {dims.si} mm
          </span>
          <span aria-hidden="true">·</span>
          <span>{dims.volumePct}% vol</span>
          <span aria-hidden="true">·</span>
          <span className="text-sky-300">Peer-Reviewed + Own Research</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs mt-0.5 font-mono-tabular">
          <span className="text-[#e2e8f0]" data-testid="brain-age-readout">
            Age {formatAgeLabel(ageYears)}
          </span>
          <span className="text-[#8b95a7]" aria-hidden="true">·</span>
          <span className="text-emerald-300" data-testid="overall-known-readout">
            {overall.knownPct}% Known
          </span>
          <span className="text-[#8b95a7]" aria-hidden="true">·</span>
          <span className="text-amber-300" data-testid="overall-gap-readout">
            {overall.gapPct}% Gap
          </span>
          {dims.isUnchartedOver100 && (
            <>
              <span className="text-[#8b95a7]" aria-hidden="true">·</span>
              <span className="text-amber-300 font-medium" data-testid="uncharted-flag">
                Uncharted &gt;100 yr
              </span>
            </>
          )}
        </div>
      </header>

      {/* Unobstructed Central 3D Viewport */}
      <BrainViewport
        ageYears={ageYears}
        viewMode={viewMode}
        tissueFinish={tissueFinish}
        selectedRegion={selectedRegion}
        hoveredRegion={hoveredRegion}
        cameraPreset={cameraPreset}
        cameraRequestNonce={cameraRequestNonce}
        showVessels={showVessels}
        showVentricles={showVentricles}
        autoRotate={autoRotate}
        onSelectRegion={handleSelectRegion}
        onHoverRegion={handleHoverRegion}
        onUserOrbit={handleUserOrbit}
      />

      {/* Interactive Raycast Hover Tooltip */}
      <HoverTooltip
        regionId={hoveredRegion}
        position={hoverPos}
        ageYears={ageYears}
        tissueFinish={tissueFinish}
      />

      {/* Right-Side Research Paper Dossier / Structure Directory */}
      <InspectorPanel
        selectedRegion={selectedRegion}
        structuresOpen={structuresOpen}
        ageYears={ageYears}
        onSelectRegion={handleSelectRegion}
        onClosePanel={() => {
          setSelectedRegion(null);
          setStructuresOpen(false);
        }}
      />

      {/* Collapsible Bottom Control Dock (Includes Lifespan Playback & Slider) */}
      <ControlDock
        collapsed={dockCollapsed}
        onToggleCollapsed={() => setDockCollapsed((c) => !c)}
        ageYears={ageYears}
        onChangeAge={handleChangeAge}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        playSpeed={playSpeed}
        onChangePlaySpeed={setPlaySpeed}
        viewMode={viewMode}
        onChangeViewMode={handleChangeViewMode}
        tissueFinish={tissueFinish}
        onChangeTissueFinish={setTissueFinish}
        activeCameraPreset={cameraPreset}
        onSelectCameraPreset={handleSelectCameraPreset}
        showVessels={showVessels}
        onToggleVessels={() => setShowVessels((v) => !v)}
        showVentricles={showVentricles}
        onToggleVentricles={() => setShowVentricles((v) => !v)}
        autoRotate={autoRotate}
        onToggleAutoRotate={() => setAutoRotate((r) => !r)}
        structuresOpen={structuresOpen}
        onToggleStructures={() => setStructuresOpen((s) => !s)}
        onOpenReferences={() => setReferencesOpen(true)}
      />

      {/* Reference Specimen Plates Modal */}
      <ReferenceModal open={referencesOpen} onClose={() => setReferencesOpen(false)} />
    </main>
  );
}
