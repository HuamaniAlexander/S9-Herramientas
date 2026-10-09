import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useCart } from '../context/CartContext';
import { useHaptics } from '../context/HapticContext';
import { INITIAL_PRODUCTS, GALLERY_ITEMS } from '../data/products';
import { Product } from '../types';
import { OptimizedImage } from '../components/OptimizedImage';

export const HomeScreen: React.FC = () => {
  const { navigate, openGalleryModal } = useNavigation();
  const { addItem } = useCart();
  const { trigger } = useHaptics();

  const [activeFilter, setActiveFilter] = useState<'all' | 'keyboards' | 'mice' | 'monitors'>('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const filteredProducts = INITIAL_PRODUCTS.slice(0, 3).filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    trigger('success');
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterSubscribed(false);
      setNewsletterEmail('');
    }, 3500);
  };

  const alphaGalleryItem = GALLERY_ITEMS.find((g) => g.id === 'gallery-alpha01') || GALLERY_ITEMS[1];

  return (
    <div className="flex flex-col w-full text-[#0b1c30] dark:text-[#f8f9ff] transition-colors duration-200">
      {/* 1. Franja Superior de Telemetría Dinámica */}
      <section className="w-full bg-[#eff4ff] dark:bg-[#0e1726] py-2 px-4 sm:px-8 border-b border-[#d3e4fe] dark:border-[#1e2a3f]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 font-space text-[11px] text-[#3c494e] dark:text-[#94a3b8]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#00677f] dark:text-[#00d2ff] font-bold">
              <span className="w-2 h-2 bg-[#00d2ff] inline-block animate-pulse shadow-[0_0_6px_#00d2ff]" />
              PROTOCOLO DE DESPACHO INMEDIATO ACTIVO
            </span>
            <span className="hidden md:inline text-[#bbc9cf] dark:text-[#334155]">/</span>
            <span className="hidden md:inline">
              CALIBRACIÓN UNITARIA DE SENSORES EN SANTIAGO
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-[#0b1c30] dark:text-white">
              ÍNDICE DE CONFORMIDAD: 99.84%
            </span>
            <span className="hidden sm:inline text-[#00d2ff] bg-[#0b1c30] dark:bg-[#16253b] px-2 py-0.5 font-bold">
              LOTE LAB-2025-Q1
            </span>
          </div>
        </div>
      </section>

      {/* 2. SECCIÓN HERO PRINCIPAL */}
      <section className="relative w-full bg-white dark:bg-[#0b1424] overflow-hidden py-10 lg:py-16 px-4 sm:px-8 border-b border-[#e5eeff] dark:border-[#1e2a3f]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Columna Texto y Acciones */}
          <div className="lg:col-span-7 flex flex-col z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#eff4ff] dark:bg-[#162235] w-fit mb-4 border border-[#d3e4fe] dark:border-[#2a3b53] shadow-xs">
              <span className="material-symbols-outlined text-[#00677f] dark:text-[#00d2ff] text-[16px]">
                precision_manufacturing
              </span>
              <span className="font-space text-[10px] sm:text-xs text-[#0b1c30] dark:text-white font-bold tracking-wider uppercase">
                HARDWARE DE ALTA FRECUENCIA // SERIE 2025
              </span>
            </div>

            <h1 className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0b1c30] dark:text-white tracking-tight mb-4 leading-tight">
              Periféricos de Precisión Extrema para tu Estación de Trabajo y Juego.
            </h1>

            <p className="font-hanken text-base sm:text-lg text-[#3c494e] dark:text-[#cbd5e1] mb-6 max-w-2xl leading-relaxed">
              Chasis de aluminio mecanizado CNC, interruptores mecánicos intercambiables en caliente y latencia menor a 0.5 ms certificada en laboratorio mediante instrumentación osciloscópica.
            </p>

            {/* Botones de Acción */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <button
                onClick={() => {
                  trigger('medium');
                  navigate('promotions');
                }}
                className="px-6 py-3 bg-[#0b1c30] dark:bg-[#00d2ff] text-white dark:text-[#0b1c30] font-space text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#00677f] transition-all shadow-md group"
              >
                <span>EXPLORAR CATÁLOGO & OFERTAS</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>

              <button
                onClick={() => {
                  trigger('selection');
                  navigate('diagnostics');
                }}
                className="px-6 py-3 bg-[#eff4ff] dark:bg-[#162235] text-[#0b1c30] dark:text-white border border-[#d3e4fe] dark:border-[#2a3b53] font-space text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:border-[#00d2ff] transition-all shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px] text-[#00677f] dark:text-[#00d2ff]">
                  tune
                </span>
                <span>CALIBRAR ESTACIÓN</span>
              </button>
            </div>

            {/* Métricas Rápidas Destacadas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#eff4ff] dark:bg-[#111927] p-4 border border-[#d3e4fe] dark:border-[#1e2a3f]">
              <div className="flex flex-col">
                <span className="font-space text-xl sm:text-2xl font-bold tracking-tight text-[#0b1c30] dark:text-white">
                  &lt; 0.5 ms
                </span>
                <span className="font-space text-[10px] text-[#565e74] dark:text-[#94a3b8] uppercase font-bold">
                  LATENCIA BASE
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-space text-xl sm:text-2xl font-bold tracking-tight text-[#00677f] dark:text-[#00d2ff]">
                  8,000 Hz
                </span>
                <span className="font-space text-[10px] text-[#565e74] dark:text-[#94a3b8] uppercase font-bold">
                  TASA DE SONDEO
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-space text-xl sm:text-2xl font-bold tracking-tight text-[#0b1c30] dark:text-white">
                  100%
                </span>
                <span className="font-space text-[10px] text-[#565e74] dark:text-[#94a3b8] uppercase font-bold">
                  MONTAJE EN JUNTA
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-space text-xl sm:text-2xl font-bold tracking-tight text-[#0054d6] dark:text-[#60a5fa]">
                  2 AÑOS
                </span>
                <span className="font-space text-[10px] text-[#565e74] dark:text-[#94a3b8] uppercase font-bold">
                  GARANTÍA TÉCNICA
                </span>
              </div>
            </div>
          </div>

          {/* Columna Visual Hero */}
          <div className="lg:col-span-5 relative">
            <div
              onClick={() => openGalleryModal(alphaGalleryItem)}
              className="relative bg-[#eff4ff] dark:bg-[#162235] p-3 border border-[#d3e4fe] dark:border-[#2a3b53] shadow-xl overflow-hidden group cursor-pointer"
              title="Haz clic para inspeccionar en galería técnica de alta resolución"
            >
              <OptimizedImage
                src={alphaGalleryItem.imageUrl}
                alt="Periféricos de alta precisión ByteElement"
                className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Inserto de Inspección Flotante */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-[#0b1424]/95 backdrop-blur-md p-3.5 border border-[#d3e4fe] dark:border-[#2a3b53] shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 bg-[#00d2ff] shadow-[0_0_6px_#00d2ff]" />
                  <div className="flex flex-col">
                    <span className="font-space text-[11px] text-[#0b1c30] dark:text-white uppercase font-bold">
                      ESTACIÓN PROTOTIPO ALPHA-01
                    </span>
                    <span className="font-hanken text-[10px] text-[#565e74] dark:text-[#94a3b8]">
                      TELEMETRÍA ÓPTICA VERIFICADA EN BANCO
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[#00677f] dark:text-[#00d2ff] font-space text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                  <span>CALIBRADO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECCIÓN DE CATEGORÍAS PRINCIPALES */}
      <section className="w-full py-12 px-4 sm:px-8 bg-[#f8f9ff] dark:bg-[#0b111c] border-b border-[#e5eeff] dark:border-[#1e2a3f]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-[#00677f] dark:text-[#00d2ff] font-space text-xs font-bold mb-1">
                <span className="material-symbols-outlined text-[16px]">grid_view</span>
                <span>MÓDULOS DEL ECOSISTEMA</span>
              </div>
              <h2 className="font-space text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#0b1c30] dark:text-white">
                Categorías de Ingeniería Principal
              </h2>
            </div>
            <p className="font-hanken text-xs sm:text-sm text-[#565e74] dark:text-[#94a3b8] max-w-md">
              Cada dispositivo responde a especificaciones industriales exactas, ensamblados con tolerancias micrométricas y materiales no degradables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Card 1: Keyboards */}
            <div
              onClick={() => {
                trigger('selection');
                setActiveFilter('keyboards');
              }}
              className="bg-white dark:bg-[#0e1726] p-5 border border-[#e2e8f0] dark:border-[#1e2a3f] shadow-sm flex flex-col justify-between group hover:border-[#00d2ff] transition-all cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="font-space text-[10px] text-[#565e74] dark:text-[#94a3b8] uppercase font-bold">
                    CAT-01 // INTERFAZ
                  </span>
                  <span className="material-symbols-outlined text-[#00677f] dark:text-[#00d2ff] text-[26px]">
                    keyboard
                  </span>
                </div>
                <h3 className="font-space text-base font-bold text-[#0b1c30] dark:text-white mb-2">
                  Teclados Mecánicos Personalizados
                </h3>
                <p className="font-hanken text-xs text-[#565e74] dark:text-[#94a3b8] leading-relaxed mb-4">
                  Chasis monolítico en aluminio 6063, placa de montaje con amortiguación por junta elástica y teclas PBT de doble inyección térmica.
                </p>
              </div>
              <div className="pt-3 border-t border-[#eff4ff] dark:border-[#1e2a3f] flex items-center justify-between text-xs font-space font-bold text-[#00677f] dark:text-[#00d2ff]">
                <span>VER MODELOS</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* Card 2: Mice */}
            <div
              onClick={() => {
                trigger('selection');
                setActiveFilter('mice');
              }}
              className="bg-white dark:bg-[#0e1726] p-5 border border-[#e2e8f0] dark:border-[#1e2a3f] shadow-sm flex flex-col justify-between group hover:border-[#00d2ff] transition-all cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="font-space text-[10px] text-[#565e74] dark:text-[#94a3b8] uppercase font-bold">
                    CAT-02 // SENSORES
                  </span>
                  <span className="material-symbols-outlined text-[#00677f] dark:text-[#00d2ff] text-[26px]">
                    mouse
                  </span>
                </div>
                <h3 className="font-space text-base font-bold text-[#0b1c30] dark:text-white mb-2">
                  Ratones Ópticos Ultraligeros
                </h3>
                <p className="font-hanken text-xs text-[#565e74] dark:text-[#94a3b8] leading-relaxed mb-4">
                  Masa reducida desde 39 gramos, sensor óptico de 32,000 DPI con seguimiento 1:1 y microinterruptores fotoeléctricos sin rebote físico.
                </p>
              </div>
              <div className="pt-3 border-t border-[#eff4ff] dark:border-[#1e2a3f] flex items-center justify-between text-xs font-space font-bold text-[#00677f] dark:text-[#00d2ff]">
                <span>VER MODELOS ÓPTICOS</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* Card 3: Monitors */}
            <div
              onClick={() => {
                trigger('selection');
                setActiveFilter('monitors');
              }}
              className="bg-white dark:bg-[#0e1726] p-5 border border-[#e2e8f0] dark:border-[#1e2a3f] shadow-sm flex flex-col justify-between group hover:border-[#00d2ff] transition-all cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="font-space text-[10px] text-[#565e74] dark:text-[#94a3b8] uppercase font-bold">
                    CAT-03 // PANELES
                  </span>
                  <span className="material-symbols-outlined text-[#00677f] dark:text-[#00d2ff] text-[26px]">
                    monitor
                  </span>
                </div>
                <h3 className="font-space text-base font-bold text-[#0b1c30] dark:text-white mb-2">
                  Monitores de Frecuencia Rápida
                </h3>
                <p className="font-hanken text-xs text-[#565e74] dark:text-[#94a3b8] leading-relaxed mb-4">
                  Paneles OLED de 240 Hz a 540 Hz nativos, tiempo de respuesta de 0.03 ms gris a gris y cobertura calibrada del 99% DCI-P3.
                </p>
              </div>
              <div className="pt-3 border-t border-[#eff4ff] dark:border-[#1e2a3f] flex items-center justify-between text-xs font-space font-bold text-[#00677f] dark:text-[#00d2ff]">
                <span>EXPLORAR PANELES</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* Card 4: Audio */}
            <div
              onClick={() => {
                trigger('selection');
                navigate('promotions');
              }}
              className="bg-white dark:bg-[#0e1726] p-5 border border-[#e2e8f0] dark:border-[#1e2a3f] shadow-sm flex flex-col justify-between group hover:border-[#00d2ff] transition-all cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="font-space text-[10px] text-[#565e74] dark:text-[#94a3b8] uppercase font-bold">
                    CAT-04 // ACÚSTICA
                  </span>
                  <span className="material-symbols-outlined text-[#00677f] dark:text-[#00d2ff] text-[26px]">
                    headphones
                  </span>
                </div>
                <h3 className="font-space text-base font-bold text-[#0b1c30] dark:text-white mb-2">
                  Audio y Acústica de Estudio
                </h3>
                <p className="font-hanken text-xs text-[#565e74] dark:text-[#94a3b8] leading-relaxed mb-4">
                  Transductores magnéticos planares abiertos, respuesta plana certificada en cámara anecoica y micrófonos de condensador balanceados.
                </p>
              </div>
              <div className="pt-3 border-t border-[#eff4ff] dark:border-[#1e2a3f] flex items-center justify-between text-xs font-space font-bold text-[#00677f] dark:text-[#00d2ff]">
                <span>AUDITORÍA SONORA</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NOVEDADES CALIBRADAS EN LABORATORIO (PRODUCTOS DESTACADOS) */}
      <section className="w-full py-12 px-4 sm:px-8 bg-[#eff4ff] dark:bg-[#0e1726] border-b border-[#d3e4fe] dark:border-[#1e2a3f]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-[#00677f] dark:text-[#00d2ff] font-space text-xs font-bold">
                <span className="w-2 h-2 bg-[#00d2ff]" />
                <span>INSPECCIÓN DE DISPOSITIVOS DESTACADOS</span>
              </div>
              <h2 className="font-space text-2xl sm:text-3xl font-bold uppercase text-[#0b1c30] dark:text-white">
                Novedades Calibradas en Laboratorio
              </h2>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-1 bg-white dark:bg-[#162235] p-1 border border-[#d3e4fe] dark:border-[#2a3b53]">
              <button
                onClick={() => {
                  trigger('selection');
                  setActiveFilter('all');
                }}
                className={`px-3 py-1.5 font-space text-xs font-bold uppercase transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-[#0b1c30] text-white dark:bg-[#00d2ff] dark:text-[#0b1c30]'
                    : 'text-[#565e74] hover:text-[#0b1c30] dark:text-[#94a3b8]'
                }`}
              >
                TODOS LOS EQUIPOS
              </button>
              <button
                onClick={() => {
                  trigger('selection');
                  setActiveFilter('keyboards');
                }}
                className={`px-3 py-1.5 font-space text-xs font-bold uppercase transition-colors ${
                  activeFilter === 'keyboards'
                    ? 'bg-[#0b1c30] text-white dark:bg-[#00d2ff] dark:text-[#0b1c30]'
                    : 'text-[#565e74] hover:text-[#0b1c30] dark:text-[#94a3b8]'
                }`}
              >
                TECLADOS MECÁNICOS
              </button>
              <button
                onClick={() => {
                  trigger('selection');
                  setActiveFilter('mice');
                }}
                className={`px-3 py-1.5 font-space text-xs font-bold uppercase transition-colors ${
                  activeFilter === 'mice'
                    ? 'bg-[#0b1c30] text-white dark:bg-[#00d2ff] dark:text-[#0b1c30]'
                    : 'text-[#565e74] hover:text-[#0b1c30] dark:text-[#94a3b8]'
                }`}
              >
                RATONES DE PRECISIÓN
              </button>
              <button
                onClick={() => {
                  trigger('selection');
                  setActiveFilter('monitors');
                }}
                className={`px-3 py-1.5 font-space text-xs font-bold uppercase transition-colors ${
                  activeFilter === 'monitors'
                    ? 'bg-[#0b1c30] text-white dark:bg-[#00d2ff] dark:text-[#0b1c30]'
                    : 'text-[#565e74] hover:text-[#0b1c30] dark:text-[#94a3b8]'
                }`}
              >
                MONITORES
              </button>
            </div>
          </div>

          {/* Grid de 3 productos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-[#0b1424] p-5 border border-[#e2e8f0] dark:border-[#1e2a3f] shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#f1f5f9] dark:border-[#1e2a3f]">
                    <span className="font-space text-[10px] text-[#565e74] dark:text-[#94a3b8] uppercase font-bold">
                      {product.sku}
                    </span>
                    <span className="bg-[#00d2ff] text-[#0b1c30] font-space text-[10px] px-2 py-0.5 font-bold uppercase">
                      EN INVENTARIO
                    </span>
                  </div>

                  {/* Imagen del producto con inspección de galería al click */}
                  <div
                    onClick={() => {
                      const galleryMatch = GALLERY_ITEMS.find((g) => g.title.toLowerCase().includes(product.name.toLowerCase().split(' ')[1]?.toLowerCase() || ''));
                      openGalleryModal(galleryMatch || GALLERY_ITEMS[0]);
                    }}
                    className="relative bg-[#f8f9ff] dark:bg-[#162235] mb-4 overflow-hidden p-4 flex items-center justify-center cursor-pointer group"
                    title="Inspeccionar en galería técnica"
                  >
                    <OptimizedImage
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-52 object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.highlightTag && (
                      <span className="absolute top-2 left-2 font-space text-[10px] bg-white dark:bg-[#0b1424] px-1.5 py-0.5 border border-[#e2e8f0] dark:border-[#2a3b53] font-bold text-[#565e74] dark:text-[#cbd5e1]">
                        {product.highlightTag}
                      </span>
                    )}
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-[#0b1c30]/80 text-[#00d2ff] px-2 py-0.5 font-space text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-[12px]">zoom_in</span>
                      <span>INSPECCIONAR</span>
                    </div>
                  </div>

                  <h3 className="font-space text-base font-bold text-[#0b1c30] dark:text-white mb-1.5 leading-snug">
                    {product.name}
                  </h3>
                  <p className="font-hanken text-xs text-[#565e74] dark:text-[#94a3b8] mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Matriz de Especificaciones Técnicas */}
                  <div className="grid grid-cols-3 gap-1 bg-[#eff4ff] dark:bg-[#162235] p-1 font-space text-[10px] text-[#0b1c30] dark:text-white mb-4">
                    {product.specs.map((spec, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center text-center p-1.5 bg-white dark:bg-[#0b1424]"
                      >
                        <span className="text-[#565e74] dark:text-[#94a3b8] font-bold text-[9px]">
                          {spec.label}
                        </span>
                        <span className="font-bold text-[10px] mt-0.5">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Precio y Añadir a Canasta */}
                <div className="pt-2 flex items-center justify-between border-t border-[#eff4ff] dark:border-[#1e2a3f]">
                  <div className="flex flex-col">
                    <span className="font-space text-[10px] text-[#565e74] dark:text-[#94a3b8] uppercase font-bold">
                      PRECIO FINAL
                    </span>
                    <span className="font-space text-lg font-bold text-[#0b1c30] dark:text-white">
                      ${product.priceClp.toLocaleString('es-CL')} CLP
                    </span>
                  </div>
                  <button
                    onClick={() => addItem(product)}
                    className="px-4 py-2.5 bg-[#0b1c30] dark:bg-[#00d2ff] text-white dark:text-[#0b1c30] font-space text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                    <span>AÑADIR</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SECCIÓN ¿POR QUÉ ELEGIR BYTEELEMENT? */}
      <section className="w-full py-14 px-4 sm:px-8 bg-white dark:bg-[#0b1424] border-b border-[#e5eeff] dark:border-[#1e2a3f]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-1.5 text-[#00677f] dark:text-[#00d2ff] font-space text-xs font-bold mb-1">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>ESTÁNDARES DE FABRICACIÓN Y RIGOR INDUSTRIAL</span>
            </div>
            <h2 className="font-space text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#0b1c30] dark:text-white">
              ¿Por qué Elegir la Ingeniería de ByteElement?
            </h2>
            <p className="font-hanken text-sm text-[#565e74] dark:text-[#cbd5e1] mt-2">
              Eliminamos los adornos plásticos y el software inflado. Cada componente se evalúa de manera individual en bancos de prueba de precisión milimétrica antes de empaquetarse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pilar 1 */}
            <div className="bg-[#eff4ff] dark:bg-[#0e1726] p-6 border border-[#d3e4fe] dark:border-[#1e2a3f] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-[#0b1c30] dark:bg-[#00d2ff] text-[#00d2ff] dark:text-[#0b1c30] flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[24px]">biotech</span>
                </div>
                <h3 className="font-space text-base font-bold text-[#0b1c30] dark:text-white mb-2">
                  Calibración Individual en Laboratorio
                </h3>
                <p className="font-hanken text-xs text-[#565e74] dark:text-[#94a3b8] leading-relaxed">
                  Cada ratón y teclado pasa por pruebas de osciloscopio para garantizar que la fluctuación de transmisión no exceda los 0.1 ms en ningún ciclo operativo.
                </p>
              </div>
              <span className="font-space text-[10px] text-[#00677f] dark:text-[#00d2ff] font-bold mt-4 block">
                PROTOCOLO ISO-9001 COMPATIBLE
              </span>
            </div>

            {/* Pilar 2 */}
            <div className="bg-[#eff4ff] dark:bg-[#0e1726] p-6 border border-[#d3e4fe] dark:border-[#1e2a3f] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-[#0b1c30] dark:bg-[#00d2ff] text-[#00d2ff] dark:text-[#0b1c30] flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[24px]">inventory_2</span>
                </div>
                <h3 className="font-space text-base font-bold text-[#0b1c30] dark:text-white mb-2">
                  Envíos Protegidos Anti-Impacto
                </h3>
                <p className="font-hanken text-xs text-[#565e74] dark:text-[#94a3b8] leading-relaxed">
                  Embalaje técnico con espumas densas termomoldeadas a medida y bolsas antiestáticas blindadas para preservar los componentes electrónicos.
                </p>
              </div>
              <span className="font-space text-[10px] text-[#00677f] dark:text-[#00d2ff] font-bold mt-4 block">
                PROTECCIÓN ESD COMPLETA
              </span>
            </div>

            {/* Pilar 3 */}
            <div className="bg-[#eff4ff] dark:bg-[#0e1726] p-6 border border-[#d3e4fe] dark:border-[#1e2a3f] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-[#0b1c30] dark:bg-[#00d2ff] text-[#00d2ff] dark:text-[#0b1c30] flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[24px]">terminal</span>
                </div>
                <h3 className="font-space text-base font-bold text-[#0b1c30] dark:text-white mb-2">
                  Sin Telemetría Invasiva
                </h3>
                <p className="font-hanken text-xs text-[#565e74] dark:text-[#94a3b8] leading-relaxed">
                  Microcódigo de código abierto y controlador local ligero. Sin cuentas forzadas en la nube, sin consumo de procesador en segundo plano.
                </p>
              </div>
              <span className="font-space text-[10px] text-[#00677f] dark:text-[#00d2ff] font-bold mt-4 block">
                MEMORIA INTEGRADA DE 32 KB
              </span>
            </div>

            {/* Pilar 4 */}
            <div className="bg-[#eff4ff] dark:bg-[#0e1726] p-6 border border-[#d3e4fe] dark:border-[#1e2a3f] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-[#0b1c30] dark:bg-[#00d2ff] text-[#00d2ff] dark:text-[#0b1c30] flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[24px]">engineering</span>
                </div>
                <h3 className="font-space text-base font-bold text-[#0b1c30] dark:text-white mb-2">
                  Soporte Técnico Directo por Ingenieros
                </h3>
                <p className="font-hanken text-xs text-[#565e74] dark:text-[#94a3b8] leading-relaxed">
                  Respuestas reales de los mismos especialistas que ensamblan y afinan los equipos. Asesoría para selección de lubricación y desensamblaje.
                </p>
              </div>
              <span className="font-space text-[10px] text-[#00677f] dark:text-[#00d2ff] font-bold mt-4 block">
                CANAL DE ATENCIÓN DIRECTA
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BANNER TÉCNICO DE TELEMETRÍA EN VIVO */}
      <section className="w-full bg-[#eff4ff] dark:bg-[#162235] py-8 px-4 sm:px-8 border-b border-[#d3e4fe] dark:border-[#1e2a3f]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0b1c30] dark:bg-[#00d2ff] flex items-center justify-center text-[#00d2ff] dark:text-[#0b1c30] flex-shrink-0">
              <span className="material-symbols-outlined text-[28px]">speed</span>
            </div>
            <div>
              <h4 className="font-space text-base sm:text-lg font-bold text-[#0b1c30] dark:text-white uppercase">
                Centro de Diagnóstico y Telemetría en Vivo
              </h4>
              <p className="font-hanken text-xs sm:text-sm text-[#565e74] dark:text-[#94a3b8]">
                Prueba la tasa de sondeo y latencia de tu teclado o ratón actual directamente desde el navegador.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              trigger('medium');
              navigate('diagnostics');
            }}
            className="px-6 py-3 bg-[#0b1c30] dark:bg-[#00d2ff] text-white dark:text-[#0b1c30] font-space text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap"
          >
            <span>EJECUTAR PRUEBA DE TASA</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </section>

      {/* 7. BOLETÍN DE INGENIERÍA */}
      <section className="w-full py-12 px-4 sm:px-8 bg-white dark:bg-[#0b1424]">
        <div className="max-w-7xl mx-auto bg-[#0b1c30] text-white p-6 sm:p-10 shadow-xl relative overflow-hidden border border-[#1b2d46]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex items-center gap-2 text-[#00d2ff] font-space text-xs font-bold mb-2">
                <span className="w-2 h-2 bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]" />
                <span>BOLETÍN DE INGENIERÍA // SIN CORREO BASURA</span>
              </div>
              <h2 className="font-space text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-2">
                Recibe Acceso Prioritario a Nuevos Lotes de Fabricación.
              </h2>
              <p className="font-hanken text-xs sm:text-sm text-[#cbd5e1] max-w-xl">
                Inscríbete para ser notificado de lotes limitados de aluminio anodizado, interruptores experimentales y guías técnicas de optimización de latencia en estaciones de trabajo.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-2">
              {newsletterSubscribed ? (
                <div className="p-3 bg-[#00d2ff] text-[#0b1c30] font-space text-xs font-bold uppercase flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>SUSCRIPCIÓN DE LABORATORIO CONFIRMADA</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="tu.correo@ingenieria.cl"
                    required
                    className="flex-1 h-11 px-3 bg-white text-[#0b1c30] font-hanken text-sm focus:outline-none focus:ring-2 focus:ring-[#00d2ff]"
                  />
                  <button
                    type="submit"
                    className="h-11 px-6 bg-[#00d2ff] text-[#0b1c30] font-space text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors whitespace-nowrap"
                  >
                    REGISTRAR
                  </button>
                </form>
              )}
              <div className="flex items-center gap-1.5 text-[10px] font-space text-[#94a3b8]">
                <span className="material-symbols-outlined text-[14px] text-[#00d2ff]">lock</span>
                <span>DATOS ENCRIPTADOS Y PROTEGIDOS. NUNCA COMPARTIMOS TU INFORMACIÓN CON TERCEROS.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
