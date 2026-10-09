import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { GALLERY_ITEMS } from '../data/products';
import { useHaptics } from '../context/HapticContext';
import { OptimizedImage } from './OptimizedImage';

export const NativeImageGallery: React.FC = () => {
  const { activeGalleryItem, closeGalleryModal } = useNavigation();
  const { trigger } = useHaptics();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState<1 | 1.5 | 2>(1);
  const [showTelemetryHud, setShowTelemetryHud] = useState(true);

  useEffect(() => {
    if (activeGalleryItem) {
      const idx = GALLERY_ITEMS.findIndex((item) => item.id === activeGalleryItem.id);
      if (idx !== -1) setCurrentIndex(idx);
      setZoomLevel(1);
    }
  }, [activeGalleryItem]);

  const currentItem = GALLERY_ITEMS[currentIndex] || activeGalleryItem;

  const handleNext = () => {
    trigger('selection');
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  };

  const handlePrev = () => {
    trigger('selection');
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  const handleToggleZoom = () => {
    trigger('medium');
    setZoomLevel((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1));
  };

  // Keyboard navigation
  useEffect(() => {
    if (!activeGalleryItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'z' || e.key === 'Z') handleToggleZoom();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGalleryItem, currentIndex]);

  if (!activeGalleryItem || !currentItem) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#070d18]/95 backdrop-blur-xl flex flex-col justify-between text-white animate-fadeIn select-none">
      {/* Top Technical Bar */}
      <div className="h-14 px-4 sm:px-6 bg-[#0b1424] border-b border-[#1f2e46] flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]" />
          <span className="font-space text-xs uppercase tracking-widest text-[#b6ebff] font-semibold">
            INSPECCIÓN ÓPTICA // {currentItem.code}
          </span>
          <span className="text-[#565e74] hidden sm:inline">|</span>
          <span className="font-space text-xs text-[#94a3b8] hidden sm:inline">
            FOTOGRAMA {currentIndex + 1} DE {GALLERY_ITEMS.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Level Button */}
          <button
            onClick={handleToggleZoom}
            className="flex items-center gap-1 px-2.5 py-1 bg-[#162438] hover:bg-[#1f3350] border border-[#2a4062] text-xs font-space text-[#00d2ff] transition-colors"
            title="Alternar nivel de zoom (100% / 150% / 200%)"
          >
            <span className="material-symbols-outlined text-[16px]">zoom_in</span>
            <span>{zoomLevel * 100}%</span>
          </button>

          {/* HUD Toggle */}
          <button
            onClick={() => {
              trigger('light');
              setShowTelemetryHud(!showTelemetryHud);
            }}
            className={`px-2.5 py-1 border text-xs font-space transition-colors ${
              showTelemetryHud
                ? 'bg-[#00d2ff] text-[#0b1c30] border-[#00d2ff] font-bold'
                : 'bg-[#162438] text-[#94a3b8] border-[#2a4062]'
            }`}
          >
            HUD
          </button>

          {/* Close Lightbox */}
          <button
            onClick={closeGalleryModal}
            className="p-1.5 bg-[#162438] hover:bg-rose-950/50 hover:text-rose-400 border border-[#2a4062] transition-colors"
            title="Cerrar galería (Esc)"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center p-4 overflow-hidden">
        {/* Prev Arrow */}
        <button
          onClick={handlePrev}
          aria-label="Imagen anterior"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-[#0b1424]/80 hover:bg-[#00d2ff] hover:text-[#0b1c30] border border-[#2a4062] flex items-center justify-center transition-all duration-150 backdrop-blur-sm"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>

        {/* High Resolution Image with Zoom Pan */}
        <div
          className={`relative max-w-5xl max-h-[75vh] w-full flex items-center justify-center overflow-hidden transition-transform duration-300 ${
            zoomLevel > 1 ? 'cursor-grab' : ''
          }`}
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <OptimizedImage
            src={currentItem.imageUrl}
            alt={currentItem.title}
            className="w-full h-auto max-h-[70vh] object-contain shadow-2xl border border-[#1f2e46]"
          />

          {/* Overlay Reticle Corner Markers */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#00d2ff] pointer-events-none" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#00d2ff] pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#00d2ff] pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#00d2ff] pointer-events-none" />
        </div>

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          aria-label="Siguiente imagen"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-[#0b1424]/80 hover:bg-[#00d2ff] hover:text-[#0b1c30] border border-[#2a4062] flex items-center justify-center transition-all duration-150 backdrop-blur-sm"
        >
          <span className="material-symbols-outlined text-2xl">arrow_forward</span>
        </button>

        {/* Floating Telemetry HUD Card */}
        {showTelemetryHud && (
          <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-md bg-[#0b1424]/90 backdrop-blur-md p-4 border border-[#23354e] shadow-2xl z-20">
            <div className="flex items-center justify-between pb-2 border-b border-[#1f2e46]">
              <span className="font-space text-xs text-[#00d2ff] uppercase tracking-wider font-semibold">
                {currentItem.category}
              </span>
              <span className="font-space text-[10px] text-[#94a3b8] uppercase">
                LATENCIA: {currentItem.telemetry.latency}
              </span>
            </div>

            <h3 className="font-space text-lg font-bold text-white mt-1.5 uppercase">
              {currentItem.title}
            </h3>
            <p className="font-hanken text-xs text-[#cbd5e1] mt-1 leading-relaxed">
              {currentItem.description}
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-[#1f2e46]/60 font-space text-[10px]">
              <div>
                <span className="text-[#64748b] block uppercase">Chasis:</span>
                <span className="text-white font-medium">{currentItem.telemetry.chassis}</span>
              </div>
              <div>
                <span className="text-[#64748b] block uppercase">Tasa de Sondeo:</span>
                <span className="text-[#00d2ff] font-medium">{currentItem.telemetry.sampling}</span>
              </div>
              <div>
                <span className="text-[#64748b] block uppercase">Tolerancia:</span>
                <span className="text-white font-medium">{currentItem.telemetry.tolerance}</span>
              </div>
              <div>
                <span className="text-[#64748b] block uppercase">Masa en Banco:</span>
                <span className="text-white font-medium">{currentItem.telemetry.weight}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="h-20 bg-[#0b1424] border-t border-[#1f2e46] px-4 flex items-center justify-center gap-2 overflow-x-auto z-20 py-2">
        {GALLERY_ITEMS.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => {
              trigger('selection');
              setZoomLevel(1);
              setCurrentIndex(idx);
            }}
            className={`relative h-14 w-20 flex-shrink-0 border-2 overflow-hidden transition-all ${
              idx === currentIndex
                ? 'border-[#00d2ff] scale-105 shadow-[0_0_10px_#00d2ff]'
                : 'border-[#1f2e46] opacity-60 hover:opacity-100'
            }`}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {idx === currentIndex && (
              <div className="absolute inset-0 bg-[#00d2ff]/10" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
