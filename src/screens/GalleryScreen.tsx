import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/products';
import { useNavigation } from '../context/NavigationContext';
import { useHaptics } from '../context/HapticContext';
import { OptimizedImage } from '../components/OptimizedImage';

export const GalleryScreen: React.FC = () => {
  const { openGalleryModal } = useNavigation();
  const { trigger } = useHaptics();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todos los Dispositivos' },
    { id: 'Teclado', label: 'Teclados Mecánicos' },
    { id: 'Ratón', label: 'Ratones de Precisión' },
    { id: 'Monitor', label: 'Paneles y Monitores' },
    { id: 'Auriculares', label: 'Audio de Estudio' },
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="w-full bg-[#f8f9ff] dark:bg-[#070d18] min-h-screen py-8 px-4 sm:px-8 text-[#0b1c30] dark:text-[#f8f9ff] transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#d3e4fe] dark:border-[#1e2a3f] pb-6">
          <div>
            <div className="flex items-center gap-2 text-[#00677f] dark:text-[#00d2ff] font-space text-xs font-bold uppercase mb-1">
              <span className="w-2.5 h-2.5 bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]" />
              <span>GALERÍA TÉCNICA // ARCHIVO FOTOMÉTRICO DE ALTA RESOLUCIÓN</span>
            </div>
            <h1 className="font-space text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#0b1c30] dark:text-white">
              Inspección Óptica de Periféricos
            </h1>
            <p className="font-hanken text-xs sm:text-sm text-[#565e74] dark:text-[#cbd5e1] mt-1 max-w-2xl">
              Explora detalles de maquinado CNC, tolerancias de montaje, interruptores fotoeléctricos y materiales aeroespaciales en nuestro banco de pruebas.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-1.5 bg-white dark:bg-[#162235] p-1 border border-[#d3e4fe] dark:border-[#2a3b53]">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  trigger('selection');
                  setSelectedCategory(c.id);
                }}
                className={`px-3 py-1.5 font-space text-xs font-bold uppercase transition-colors ${
                  selectedCategory === c.id
                    ? 'bg-[#0b1c30] dark:bg-[#00d2ff] text-white dark:text-[#0b1c30]'
                    : 'text-[#565e74] dark:text-[#94a3b8] hover:text-[#0b1c30] dark:hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                trigger('medium');
                openGalleryModal(item);
              }}
              className="bg-white dark:bg-[#0b1424] border border-[#d3e4fe] dark:border-[#1e2a3f] shadow-md hover:border-[#00d2ff] transition-all duration-200 cursor-pointer group flex flex-col justify-between overflow-hidden"
            >
              <div className="relative aspect-[4/3] bg-[#eff4ff] dark:bg-[#162235] overflow-hidden">
                <OptimizedImage
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Corner reticle markers */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#00d2ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00d2ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#00d2ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00d2ff] opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Inspect Overlay Badge */}
                <div className="absolute bottom-3 right-3 bg-[#0b1c30]/90 backdrop-blur-md px-2.5 py-1 text-white font-space text-[10px] font-bold flex items-center gap-1 border border-[#00d2ff]">
                  <span className="material-symbols-outlined text-[14px] text-[#00d2ff]">zoom_in</span>
                  <span>INSPECCIONAR</span>
                </div>

                <div className="absolute top-3 left-3 bg-[#0b1c30]/80 backdrop-blur-sm px-2 py-0.5 text-white font-space text-[10px] font-bold">
                  {item.code}
                </div>
              </div>

              {/* Card Meta & Telemetry */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-space text-[10px] text-[#00677f] dark:text-[#00d2ff] uppercase font-bold tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="font-space text-base font-bold text-[#0b1c30] dark:text-white uppercase mt-0.5">
                    {item.title}
                  </h3>
                  <p className="font-hanken text-xs text-[#565e74] dark:text-[#94a3b8] mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Mini Telemetry row */}
                <div className="mt-4 pt-3 border-t border-[#eff4ff] dark:border-[#1e2a3f] grid grid-cols-2 gap-2 font-space text-[10px]">
                  <div>
                    <span className="text-[#64748b] uppercase block">Latencia:</span>
                    <span className="text-[#00677f] dark:text-[#00d2ff] font-bold">
                      {item.telemetry.latency}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#64748b] uppercase block">Frecuencia:</span>
                    <span className="text-[#0b1c30] dark:text-white font-bold">
                      {item.telemetry.sampling}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
