import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { useHaptics } from '../context/HapticContext';
import { INITIAL_PRODUCTS, GALLERY_ITEMS } from '../data/products';
import { Product } from '../types';
import { OptimizedImage } from '../components/OptimizedImage';

export const PromotionsScreen: React.FC = () => {
  const { addItem } = useCart();
  const { openGalleryModal } = useNavigation();
  const { trigger } = useHaptics();

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(2 * 86400 + 14 * 3600 + 35 * 60 + 18);
  const [showConsultModal, setShowConsultModal] = useState<boolean>(false);

  // Live countdown clock
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = () => {
    const d = Math.floor(secondsRemaining / 86400);
    const h = Math.floor((secondsRemaining % 86400) / 3600);
    const m = Math.floor((secondsRemaining % 3600) / 60);
    const s = secondsRemaining % 60;
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    return `${pad(d)}D : ${pad(h)}H : ${pad(m)}M : ${pad(s)}S`;
  };

  // Promotion discount products (6 items from Screenshot 7)
  const promoProducts = INITIAL_PRODUCTS.slice(3, 9);

  const filteredProducts = promoProducts.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === '20plus') return (item.discountPercent || 0) >= 20;
    if (activeFilter === 'keyboards') return item.category === 'keyboards';
    if (activeFilter === 'mice') return item.category === 'mice';
    if (activeFilter === 'audio') return item.category === 'audio';
    if (activeFilter === 'monitors') return item.category === 'monitors';
    return true;
  });

  const bundleProduct: Product = {
    id: 'bundle-serie-01',
    sku: 'PAQUETE MAESTRO // SERIE 01',
    name: 'Paquete Estación Competitiva Serie 01',
    category: 'accessories',
    categoryLabel: 'CAT-01 // BUNDLE',
    description: 'Integración completa para jugadores profesionales de deportes electrónicos. Combina MK-80, ratón 8000 Hz y base Cordura.',
    priceClp: 217490,
    originalPriceClp: 289990,
    discountPercent: 25,
    stockStatus: 'limited',
    stockRemaining: 18,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGEBNl75_2E9pg1MPngCYyNaUf3jC_vrreQY6UXI91zXPe36ZRRTgySgqt_oNVfbsi16eTZ5J_NgnaKg7O9dURARg4R3JQu1Eon3JytIGpaeU6EeECtn0zLSApPZhh9CUl-GoRZccglSZ-iWVoB2ova0XvdxbSwbk5QHv09yIPcVKDrRBRVc8vG-g2r-dqeDSWZDqaoWSbFLII24LBlq3a9dIxnk8svP1jpvzPvd98bTejQ9egwU4A',
    specs: [
      { label: 'LATENCIA', value: '0.125 MS' },
      { label: 'PESO RATÓN', value: '49G' },
      { label: 'BASE', value: '900X400 MM' },
    ],
  };

  const handleAddBundle = () => {
    trigger('success');
    addItem(bundleProduct);
  };

  return (
    <div className="flex flex-col w-full text-[#0b1c30] dark:text-[#f8f9ff] transition-colors duration-200">
      {/* 1. ENCABEZADO Y TELEMETRÍA DE OFERTAS TEMPORALES */}
      <section className="w-full bg-white dark:bg-[#0b1424] px-4 sm:px-8 py-8 lg:py-12 border-b border-[#e5eeff] dark:border-[#1e2a3f]">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          {/* LÍNEA SUPERIOR DE ESTADO TÉCNICO */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#eff4ff] dark:bg-[#111927] p-3 border border-[#d3e4fe] dark:border-[#1e2a3f]">
            <div className="flex items-center gap-2.5 font-space text-[11px] text-[#00677f] dark:text-[#00d2ff] font-bold">
              <span className="w-2.5 h-2.5 bg-[#00d2ff] inline-block shadow-[0_0_8px_#00d2ff]" />
              <span className="uppercase">
                PROTOCOLO PROMOCIONAL // LIQUIDACIÓN DE LABORATORIO // LOTES DE TEMPORADA
              </span>
            </div>
            <div className="flex items-center gap-3 font-space text-[11px] text-[#565e74] dark:text-[#94a3b8]">
              <span className="hidden sm:inline">ALMACÉN: VALPARAÍSO - BAHÍA D</span>
              <span className="text-[#bec6e0] dark:text-[#334155]">|</span>
              <span className="text-[#0b1c30] dark:text-white font-semibold">
                TARIFA CON IVA DESGLOSADO
              </span>
            </div>
          </div>

          {/* TÍTULO PRINCIPAL Y CUENTA REGRESIVA ASIMÉTRICA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 flex flex-col">
              <span className="font-space text-xs font-bold text-[#00677f] dark:text-[#00d2ff] tracking-widest uppercase mb-1">
                CICLO DE RENOVACIÓN DE HARDWARE 2025.Q2
              </span>
              <h1 className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0b1c30] dark:text-white leading-tight">
                Promociones y Descuentos en Hardware de Rendimiento
              </h1>
              <p className="font-hanken text-sm sm:text-base text-[#565e74] dark:text-[#cbd5e1] max-w-3xl mt-3 leading-relaxed">
                Aprovecha precios especiales en periféricos de alta gama, paquetes para estaciones completas y unidades de exhibición certificadas con calibración técnica y garantía de laboratorio íntegra.
              </p>
            </div>

            {/* RELOJ TÉCNICO DE CADUCIDAD */}
            <div className="lg:col-span-4 bg-[#0b1c30] dark:bg-[#162235] text-white p-5 shadow-lg border border-[#1b2d46] dark:border-[#2a3b53] flex flex-col gap-2">
              <div className="flex items-center justify-between font-space text-[11px] text-[#00d2ff]">
                <span className="flex items-center gap-1.5 font-bold uppercase">
                  <span className="material-symbols-outlined text-[16px]">timer</span>
                  CRONÓMETRO DE VIGENCIA
                </span>
                <span className="text-[#94a3b8]">LOTE #L-894</span>
              </div>
              <div className="font-space text-lg sm:text-xl text-white tracking-widest py-1 font-bold">
                OFERTAS VIGENTES: {formatCountdown()}
              </div>
              <div className="w-full bg-[#1b2d46] h-1 relative overflow-hidden">
                <div className="h-full bg-[#00d2ff] w-3/4 animate-pulse" />
              </div>
              <span className="font-hanken text-[10px] text-[#94a3b8]">
                Precios bloqueados automáticamente hasta agotamiento de serie.
              </span>
            </div>
          </div>

          {/* BARRA DE FILTROS TÉCNICOS */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            {[
              { id: 'all', label: 'Todos los descuentos' },
              { id: '20plus', label: 'Descuento 20% o más' },
              { id: 'keyboards', label: 'Teclados' },
              { id: 'mice', label: 'Ratones' },
              { id: 'audio', label: 'Audio' },
              { id: 'monitors', label: 'Monitores' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  trigger('selection');
                  setActiveFilter(f.id);
                }}
                className={`px-4 py-2 font-space text-xs font-bold uppercase transition-all ${
                  activeFilter === f.id
                    ? 'bg-[#0b1c30] text-white dark:bg-[#00d2ff] dark:text-[#0b1c30] shadow-sm'
                    : 'bg-[#eff4ff] dark:bg-[#162235] text-[#3c494e] dark:text-[#cbd5e1] hover:bg-[#d3e4fe] dark:hover:bg-[#1f3350]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. OFERTA PRINCIPAL / PAQUETE DESTACADO DEL MES */}
      <section className="w-full px-4 sm:px-8 py-10 bg-[#f8f9ff] dark:bg-[#0b111c] border-b border-[#e5eeff] dark:border-[#1e2a3f]">
        <div className="max-w-7xl mx-auto bg-white dark:bg-[#0b1424] p-6 sm:p-10 shadow-xl relative overflow-hidden border border-[#d3e4fe] dark:border-[#1e2a3f]">
          {/* DETALLE DECORATIVO DE BORDE CIAN ACTIVO */}
          <div className="absolute top-0 left-0 w-2 h-full bg-[#00d2ff]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* COLUMNA IMAGEN / RENDER COMPLETO */}
            <div className="lg:col-span-6 relative">
              <div className="absolute -top-3 -left-3 bg-[#0b1c30] text-[#00d2ff] font-space text-xs px-3 py-1 z-10 font-bold shadow-md">
                PAQUETE MAESTRO // SERIE 01
              </div>
              <div
                onClick={() => {
                  const bundleGallery = GALLERY_ITEMS.find((g) => g.id === 'gallery-bundle01');
                  if (bundleGallery) openGalleryModal(bundleGallery);
                }}
                className="relative bg-[#eff4ff] dark:bg-[#162235] p-3 overflow-hidden aspect-[16/10] flex items-center justify-center cursor-pointer group"
                title="Inspeccionar en galería técnica"
              >
                <OptimizedImage
                  src={bundleProduct.imageUrl}
                  alt="Paquete Maestro Serie 01"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-[#0b1c30]/80 text-[#00d2ff] px-2 py-0.5 font-space text-[10px] font-bold">
                  <span className="material-symbols-outlined text-[14px]">zoom_in</span>
                  <span>ZOOM</span>
                </div>
              </div>

              <div className="mt-2 grid grid-cols-3 gap-2 font-space text-[10px] text-[#565e74] dark:text-[#94a3b8] text-center">
                <div className="bg-[#eff4ff] dark:bg-[#162235] p-1.5 font-bold">LATENCIA 0.125 MS</div>
                <div className="bg-[#eff4ff] dark:bg-[#162235] p-1.5 font-bold">PESO RATÓN: 49G</div>
                <div className="bg-[#eff4ff] dark:bg-[#162235] p-1.5 font-bold">BASE 900x400 MM</div>
              </div>
            </div>

            {/* COLUMNA DESCRIPCIÓN TÉCNICA Y COMPRA */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 bg-[#00d2ff] text-[#0b1c30] font-space text-xs font-bold">
                    AHORRO DEL 25%
                  </span>
                  <span className="font-space text-xs text-[#565e74] dark:text-[#94a3b8]">
                    LOTE DE EDICIÓN LIMITADA: 18 UNIDADES RESTANTES
                  </span>
                </div>

                <h2 className="font-space text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#0b1c30] dark:text-white mt-1">
                  PAQUETE ESTACIÓN COMPETITIVA SERIE 01
                </h2>

                <p className="font-hanken text-sm text-[#3c494e] dark:text-[#cbd5e1] leading-relaxed">
                  Integración completa para jugadores profesionales de deportes electrónicos. Combina el rendimiento de microcódigo con latencias nulas y máxima consistencia cinemática.
                </p>

                {/* COMPONENTES DEL PAQUETE */}
                <div className="mt-2 flex flex-col gap-1.5 bg-[#eff4ff] dark:bg-[#162235] p-4 border border-[#d3e4fe] dark:border-[#2a3b53]">
                  <span className="font-space text-xs font-bold text-[#0b1c30] dark:text-white uppercase mb-1">
                    COMPONENTES INTEGRADOS:
                  </span>
                  <ul className="flex flex-col gap-2 font-hanken text-xs text-[#565e74] dark:text-[#cbd5e1]">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[#00d2ff] mt-1.5 flex-shrink-0" />
                      <div>
                        <strong className="text-[#0b1c30] dark:text-white font-space">
                          Teclado Chasis MK-80:
                        </strong>{' '}
                        Mecánico, conmutadores ópticos lineales prelubricados de fábrica.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[#00d2ff] mt-1.5 flex-shrink-0" />
                      <div>
                        <strong className="text-[#0b1c30] dark:text-white font-space">
                          Ratón Ultraligero 8000 Hz:
                        </strong>{' '}
                        Sensor de 26,000 DPI con tasa de sondeo ultra-alta sin retraso.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[#00d2ff] mt-1.5 flex-shrink-0" />
                      <div>
                        <strong className="text-[#0b1c30] dark:text-white font-space">
                          Alfombrilla de Tela Cordura de Precisión:
                        </strong>{' '}
                        Microtejido hidrofóbico con bordes cosidos al ras.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* BLOQUE DE PRECIO Y CTA */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#eff4ff] dark:border-[#1e2a3f]">
                <div className="flex flex-col">
                  <span className="font-space text-xs text-[#565e74] dark:text-[#94a3b8] line-through">
                    PRECIO REGULAR: $289.990 CLP
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-space text-3xl sm:text-4xl font-bold text-[#00677f] dark:text-[#00d2ff] tracking-tight">
                      $217.490
                    </span>
                    <span className="font-space text-xs text-[#565e74] dark:text-[#94a3b8]">
                      CLP
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleAddBundle}
                  className="px-6 sm:px-8 py-3.5 bg-[#0b1c30] dark:bg-[#00d2ff] text-white dark:text-[#0b1c30] font-space text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-2 shadow-lg active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                  <span>OBTENER PAQUETE PROMOCIONAL</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GRILLA DE 6 TARJETAS EN DESCUENTO (BENTO) */}
      <section className="w-full px-4 sm:px-8 py-12 bg-[#eff4ff] dark:bg-[#0e1726] border-b border-[#d3e4fe] dark:border-[#1e2a3f]">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="font-space text-xs font-bold text-[#00677f] dark:text-[#00d2ff] tracking-widest uppercase">
                CATÁLOGO EN LIQUIDACIÓN
              </span>
              <h3 className="font-space text-2xl sm:text-3xl font-bold uppercase text-[#0b1c30] dark:text-white mt-0.5">
                Periféricos Individuales en Descuento
              </h3>
            </div>
            <div className="font-space text-xs text-[#565e74] dark:text-[#94a3b8] flex items-center gap-1.5 bg-white dark:bg-[#162235] px-3 py-1.5 border border-[#d3e4fe] dark:border-[#2a3b53]">
              <span className="material-symbols-outlined text-[16px] text-[#00677f] dark:text-[#00d2ff]">
                filter_alt
              </span>
              <span>MOSTRANDO {filteredProducts.length} UNIDADES CON DISPONIBILIDAD INMEDIATA</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-[#0b1424] p-5 border border-[#e2e8f0] dark:border-[#1e2a3f] shadow-sm flex flex-col justify-between hover:border-[#00d2ff] transition-all relative group"
              >
                {/* Badge Rebaja */}
                {product.discountPercent && (
                  <div className="absolute top-4 left-4 z-10 bg-[#0b1c30] dark:bg-[#00d2ff] text-[#00d2ff] dark:text-[#0b1c30] px-2.5 py-0.5 font-space text-[10px] font-bold uppercase shadow-sm">
                    -{product.discountPercent}% REBAJA
                  </div>
                )}

                <div>
                  {/* Image container */}
                  <div
                    onClick={() => {
                      const found = GALLERY_ITEMS.find((g) => g.title.toLowerCase().includes(product.name.toLowerCase().split(' ')[1]?.toLowerCase() || ''));
                      openGalleryModal(found || GALLERY_ITEMS[0]);
                    }}
                    className="relative bg-[#f8f9ff] dark:bg-[#162235] aspect-[4/3] flex items-center justify-center overflow-hidden mb-4 cursor-pointer"
                    title="Inspeccionar en galería técnica"
                  >
                    <OptimizedImage
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-[#0b1c30]/80 text-[#00d2ff] px-2 py-0.5 font-space text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-[12px]">zoom_in</span>
                      <span>AMPLIAR</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center font-space text-[10px] text-[#565e74] dark:text-[#94a3b8]">
                      <span>{product.sku}</span>
                      <span className="text-rose-500 font-bold">
                        Solo {product.stockRemaining || 3} unidades restantes
                      </span>
                    </div>
                    <h4 className="font-space text-base font-bold text-[#0b1c30] dark:text-white leading-snug">
                      {product.name}
                    </h4>
                    <p className="font-hanken text-xs text-[#565e74] dark:text-[#94a3b8] line-clamp-2">
                      {product.description}
                    </p>

                    {/* Especificación técnica corta */}
                    <div className="my-2 bg-[#eff4ff] dark:bg-[#162235] p-2 font-space text-[10px] text-[#0b1c30] dark:text-white border border-[#d3e4fe] dark:border-[#2a3b53]">
                      ESPECIFICACIÓN: {product.specs.map((s) => `${s.value}`).join(' // ')}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 flex items-center justify-between border-t border-[#eff4ff] dark:border-[#1e2a3f]">
                  <div className="flex flex-col">
                    {product.originalPriceClp && (
                      <span className="font-space text-[10px] text-[#565e74] dark:text-[#94a3b8] line-through">
                        ${product.originalPriceClp.toLocaleString('es-CL')} CLP
                      </span>
                    )}
                    <span className="font-space text-base sm:text-lg font-bold text-[#00677f] dark:text-[#00d2ff]">
                      ${product.priceClp.toLocaleString('es-CL')} CLP
                    </span>
                  </div>

                  <button
                    onClick={() => addItem(product)}
                    className="px-4 py-2 bg-[#0b1c30] dark:bg-[#00d2ff] text-white dark:text-[#0b1c30] font-space text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-1.5 shadow-xs active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                    <span>AGREGAR</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN DE BENEFICIOS Y GARANTÍAS DIRECTAS */}
      <section className="w-full px-4 sm:px-8 py-14 bg-white dark:bg-[#0b1424] border-b border-[#e5eeff] dark:border-[#1e2a3f]">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-1 text-center items-center">
            <span className="font-space text-xs font-bold text-[#00677f] dark:text-[#00d2ff] tracking-widest uppercase">
              ESTÁNDAR BYTELEMENT
            </span>
            <h3 className="font-space text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#0b1c30] dark:text-white">
              Garantías Directas de Laboratorio
            </h3>
            <p className="font-hanken text-xs sm:text-sm text-[#565e74] dark:text-[#94a3b8] max-w-2xl">
              Nuestras ofertas de liquidación no sacrifican soporte ni fiabilidad operativa. Todas las unidades son verificadas antes de su despacho.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Beneficio 1 */}
            <div className="bg-[#eff4ff] dark:bg-[#0e1726] p-6 border border-[#d3e4fe] dark:border-[#1e2a3f] flex flex-col gap-3">
              <div className="w-12 h-12 bg-[#0b1c30] dark:bg-[#00d2ff] text-[#00d2ff] dark:text-[#0b1c30] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-space text-base font-bold text-[#0b1c30] dark:text-white uppercase">
                  2 AÑOS DE GARANTÍA COMPLETA
                </h4>
                <p className="font-hanken text-xs text-[#565e74] dark:text-[#94a3b8] leading-relaxed">
                  Misma cobertura técnica de laboratorio en todos los productos rebajados. Reemplazo inmediato en caso de desviación en tolerancia de microcódigo.
                </p>
              </div>
              <div className="mt-auto pt-2 font-space text-[10px] text-[#00677f] dark:text-[#00d2ff] font-bold uppercase">
                PROTOCOLO ISO-9001 CERTIFICADO
              </div>
            </div>

            {/* Beneficio 2 */}
            <div className="bg-[#eff4ff] dark:bg-[#0e1726] p-6 border border-[#d3e4fe] dark:border-[#1e2a3f] flex flex-col gap-3">
              <div className="w-12 h-12 bg-[#0b1c30] dark:bg-[#00d2ff] text-[#00d2ff] dark:text-[#0b1c30] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">local_shipping</span>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-space text-base font-bold text-[#0b1c30] dark:text-white uppercase">
                  ENVÍO GRATUITO PRIORITARIO
                </h4>
                <p className="font-hanken text-xs text-[#565e74] dark:text-[#94a3b8] leading-relaxed">
                  Despacho sin costo a todo el territorio nacional en pedidos superiores a $50.000 CLP. Empaque térmico antiestático reforzado.
                </p>
              </div>
              <div className="mt-auto pt-2 font-space text-[10px] text-[#00677f] dark:text-[#00d2ff] font-bold uppercase">
                SEGUIMIENTO VÍA GPS EN VIVO
              </div>
            </div>

            {/* Beneficio 3 */}
            <div className="bg-[#eff4ff] dark:bg-[#0e1726] p-6 border border-[#d3e4fe] dark:border-[#1e2a3f] flex flex-col gap-3">
              <div className="w-12 h-12 bg-[#0b1c30] dark:bg-[#00d2ff] text-[#00d2ff] dark:text-[#0b1c30] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">assignment_return</span>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-space text-base font-bold text-[#0b1c30] dark:text-white uppercase">
                  DEVOLUCIÓN DE 30 DÍAS
                </h4>
                <p className="font-hanken text-xs text-[#565e74] dark:text-[#94a3b8] leading-relaxed">
                  Prueba tu equipo en tu propia estación de juego. Si la ergonomía o la tasa de sondeo no cumplen tus exigencias, te devolvemos el total de tu compra.
                </p>
              </div>
              <div className="mt-auto pt-2 font-space text-[10px] text-[#00677f] dark:text-[#00d2ff] font-bold uppercase">
                SIN COBRO POR RETIRO TÉCNICO
              </div>
            </div>
          </div>

          {/* BANNER DE CONTACTO TÉCNICO */}
          <div className="p-5 bg-[#0b1c30] text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#1b2d46]">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-[#00d2ff] text-[32px]">
                contact_support
              </span>
              <div className="flex flex-col">
                <span className="font-space text-base font-bold">
                  ¿Dudas con la compatibilidad de switches o firmware?
                </span>
                <span className="font-hanken text-xs text-[#94a3b8]">
                  Nuestros ingenieros de hardware están disponibles en canal directo para asesoría técnica.
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                trigger('selection');
                setShowConsultModal(true);
              }}
              className="px-6 py-2.5 bg-[#00d2ff] text-[#0b1c30] font-space text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors whitespace-nowrap"
            >
              CONSULTAR A UN ESPECIALISTA
            </button>
          </div>
        </div>
      </section>

      {/* Specialist Consultation Modal */}
      {showConsultModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0b1424] max-w-md w-full p-6 border border-[#0b1c30] dark:border-[#1e2a3f] shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#e2e8f0] dark:border-[#1e2a3f]">
              <span className="font-space text-sm font-bold uppercase text-[#0b1c30] dark:text-white">
                CANAL DIRECTO CON INGENIERO
              </span>
              <button onClick={() => setShowConsultModal(false)} className="text-[#64748b]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="font-hanken text-xs text-[#565e74] dark:text-[#cbd5e1]">
              Un especialista en micro-mecánica y telemetría de conmutadores responderá tus consultas técnicas vía chat cifrado o correo prioritario.
            </p>
            <div className="p-3 bg-[#eff4ff] dark:bg-[#162235] font-space text-xs space-y-1">
              <div><strong>HORARIO DE LABORATORIO:</strong> Lun - Vie 08:30 a 19:00 CLT</div>
              <div><strong>TIEMPO ESTIMADO DE RESPUESTA:</strong> &lt; 15 minutos</div>
            </div>
            <button
              onClick={() => {
                trigger('success');
                setShowConsultModal(false);
              }}
              className="w-full py-2.5 bg-[#0b1c30] dark:bg-[#00d2ff] text-white dark:text-[#0b1c30] font-space text-xs font-bold uppercase tracking-wider"
            >
              INICIAR CONSULTA TÉCNICA
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
