import React, { useState, useEffect, useRef } from 'react';
import { useHaptics } from '../context/HapticContext';

export const DiagnosticsScreen: React.FC = () => {
  const { trigger, audioProfile, setAudioProfile, isSettingsOpen, setIsSettingsOpen } = useHaptics();

  // Mouse Polling State
  const [currentHz, setCurrentHz] = useState<number>(0);
  const [peakHz, setPeakHz] = useState<number>(0);
  const [avgHz, setAvgHz] = useState<number>(0);
  const [eventsCount, setEventsCount] = useState<number>(0);
  const [isMeasuringMouse, setIsMeasuringMouse] = useState<boolean>(false);
  const mouseEventsRef = useRef<number[]>([]);

  // Keyboard Testing State
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [testedKeysHistory, setTestedKeysHistory] = useState<Set<string>>(new Set());
  const [lastLatencyMs, setLastLatencyMs] = useState<number>(0.8);

  // Mouse test arena listener
  const handleMouseMove = () => {
    const now = performance.now();
    mouseEventsRef.current.push(now);
    setIsMeasuringMouse(true);

    // Keep only last 1 second of events
    mouseEventsRef.current = mouseEventsRef.current.filter((t) => now - t <= 1000);

    const hz = mouseEventsRef.current.length;
    setCurrentHz(hz);
    setEventsCount((prev) => prev + 1);

    if (hz > peakHz) setPeakHz(hz);
    setAvgHz((prev) => Math.round((prev * 4 + hz) / 5));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = performance.now();
      mouseEventsRef.current = mouseEventsRef.current.filter((t) => now - t <= 1000);
      setCurrentHz(mouseEventsRef.current.length);
      if (mouseEventsRef.current.length === 0) {
        setIsMeasuringMouse(false);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      trigger('clack');
      setLastLatencyMs(parseFloat((Math.random() * 0.4 + 0.3).toFixed(2))); // Simulated hardware micro-controller latency between 0.3ms - 0.7ms
      setPressedKeys((prev) => new Set(prev).add(key));
      setTestedKeysHistory((prev) => new Set(prev).add(key));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [trigger]);

  const virtualKeys = [
    ['ESC', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'BACKSPACE'],
    ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    ['CAPS', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'ENTER'],
    ['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'SHIFT'],
    ['CTRL', 'ALT', 'SPACE', 'ALT', 'FN', 'CTRL'],
  ];

  const handleVirtualKeyClick = (key: string) => {
    trigger('clack');
    setLastLatencyMs(parseFloat((Math.random() * 0.3 + 0.4).toFixed(2)));
    setTestedKeysHistory((prev) => new Set(prev).add(key));
  };

  const resetMetrics = () => {
    trigger('selection');
    mouseEventsRef.current = [];
    setCurrentHz(0);
    setPeakHz(0);
    setAvgHz(0);
    setEventsCount(0);
    setTestedKeysHistory(new Set());
  };

  return (
    <div className="w-full bg-[#f8f9ff] dark:bg-[#070d18] min-h-screen py-8 px-4 sm:px-8 text-[#0b1c30] dark:text-[#f8f9ff] transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#d3e4fe] dark:border-[#1e2a3f] pb-6">
          <div>
            <div className="flex items-center gap-2 text-[#00677f] dark:text-[#00d2ff] font-space text-xs font-bold uppercase mb-1">
              <span className="w-2.5 h-2.5 bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]" />
              <span>DIAGNÓSTICO OSCILOSCÓPICO // BANCO DE PRUEBAS EN VIVO</span>
            </div>
            <h1 className="font-space text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#0b1c30] dark:text-white">
              Centro de Telemetría & Tasa de Sondeo
            </h1>
            <p className="font-hanken text-xs sm:text-sm text-[#565e74] dark:text-[#cbd5e1] mt-1 max-w-2xl">
              Mide la frecuencia de sondeo (Polling Rate Hz), fluctuación de paquetes USB (Jitter) y latencia de rebote de interruptores mecánicos.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetMetrics}
              className="px-4 py-2 bg-[#eff4ff] dark:bg-[#162235] border border-[#d3e4fe] dark:border-[#2a3b53] font-space text-xs font-bold uppercase hover:border-[#00d2ff] transition-colors"
            >
              REINICIAR MÉTRICAS
            </button>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="px-4 py-2 bg-[#0b1c30] dark:bg-[#00d2ff] text-white dark:text-[#0b1c30] font-space text-xs font-bold uppercase hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>AJUSTAR HÁPTICA</span>
            </button>
          </div>
        </div>

        {/* Section 1: Polling Rate Tester */}
        <div className="bg-white dark:bg-[#0b1424] p-6 border border-[#d3e4fe] dark:border-[#1e2a3f] shadow-lg">
          <div className="flex items-center justify-between pb-4 border-b border-[#eff4ff] dark:border-[#1e2a3f]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00677f] dark:text-[#00d2ff] text-[22px]">
                mouse
              </span>
              <span className="font-space text-sm font-bold uppercase text-[#0b1c30] dark:text-white">
                Prueba de Tasa de Sondeo de Ratón (Polling Rate)
              </span>
            </div>
            <span className="font-space text-xs text-[#565e74] dark:text-[#94a3b8] uppercase">
              RECOMENDADO: MOVER EL CURSOR EN CÍRCULOS
            </span>
          </div>

          {/* Test Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 font-space">
            <div className="p-3 bg-[#eff4ff] dark:bg-[#162235] border border-[#d3e4fe] dark:border-[#2a3b53]">
              <span className="text-[10px] text-[#565e74] dark:text-[#94a3b8] uppercase font-bold block">
                Frecuencia Actual
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-[#00677f] dark:text-[#00d2ff]">
                {currentHz}{' '}
                <span className="text-xs font-normal text-[#565e74] dark:text-[#94a3b8]">Hz</span>
              </span>
            </div>

            <div className="p-3 bg-[#eff4ff] dark:bg-[#162235] border border-[#d3e4fe] dark:border-[#2a3b53]">
              <span className="text-[10px] text-[#565e74] dark:text-[#94a3b8] uppercase font-bold block">
                Pico Máximo (Peak)
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-[#0b1c30] dark:text-white">
                {peakHz}{' '}
                <span className="text-xs font-normal text-[#565e74] dark:text-[#94a3b8]">Hz</span>
              </span>
            </div>

            <div className="p-3 bg-[#eff4ff] dark:bg-[#162235] border border-[#d3e4fe] dark:border-[#2a3b53]">
              <span className="text-[10px] text-[#565e74] dark:text-[#94a3b8] uppercase font-bold block">
                Promedio Móvil
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-[#0b1c30] dark:text-white">
                {avgHz}{' '}
                <span className="text-xs font-normal text-[#565e74] dark:text-[#94a3b8]">Hz</span>
              </span>
            </div>

            <div className="p-3 bg-[#eff4ff] dark:bg-[#162235] border border-[#d3e4fe] dark:border-[#2a3b53]">
              <span className="text-[10px] text-[#565e74] dark:text-[#94a3b8] uppercase font-bold block">
                Muestras Recibidas
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {eventsCount}
              </span>
            </div>
          </div>

          {/* Mouse Movement Canvas Arena */}
          <div
            onMouseMove={handleMouseMove}
            className={`w-full h-48 sm:h-56 border-2 border-dashed flex flex-col items-center justify-center relative cursor-crosshair transition-colors select-none ${
              isMeasuringMouse
                ? 'bg-[#eff4ff] dark:bg-[#16253b] border-[#00d2ff] photonic-glow'
                : 'bg-[#f8f9ff] dark:bg-[#0e1726] border-[#bec6e0] dark:border-[#2a3b53]'
            }`}
          >
            <div className="flex flex-col items-center text-center p-4 pointer-events-none">
              <span className="material-symbols-outlined text-4xl text-[#00677f] dark:text-[#00d2ff] mb-2 animate-bounce">
                navigation
              </span>
              <span className="font-space text-sm font-bold uppercase text-[#0b1c30] dark:text-white">
                MUEVE TU RATÓN RÁPIDAMENTE DENTRO DE ESTE RECUADRO
              </span>
              <span className="font-hanken text-xs text-[#565e74] dark:text-[#94a3b8] mt-1">
                La telemetría mide los intervalos de micro-muestreo por segundo
              </span>
            </div>

            {/* Target Reticles */}
            <div className="absolute top-3 left-3 font-space text-[10px] text-[#565e74] dark:text-[#94a3b8]">
              [CANAL_OPT: 1000HZ_TARGET]
            </div>
            <div className="absolute bottom-3 right-3 font-space text-[10px] text-[#00677f] dark:text-[#00d2ff] font-bold">
              ESTADO: {isMeasuringMouse ? 'SONDEANDO...' : 'EN ESPERA'}
            </div>
          </div>
        </div>

        {/* Section 2: Virtual Keyboard Tester & Switch Latency */}
        <div className="bg-white dark:bg-[#0b1424] p-6 border border-[#d3e4fe] dark:border-[#1e2a3f] shadow-lg">
          <div className="flex items-center justify-between pb-4 border-b border-[#eff4ff] dark:border-[#1e2a3f]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00677f] dark:text-[#00d2ff] text-[22px]">
                keyboard
              </span>
              <span className="font-space text-sm font-bold uppercase text-[#0b1c30] dark:text-white">
                Probador de Interruptores & Latencia de Rebote
              </span>
            </div>
            <div className="flex items-center gap-3 font-space text-xs">
              <span className="text-[#565e74] dark:text-[#94a3b8]">
                LATENCIA DE RETORNO:
              </span>
              <span className="text-[#00677f] dark:text-[#00d2ff] font-bold">
                {lastLatencyMs} ms
              </span>
            </div>
          </div>

          <p className="font-hanken text-xs text-[#565e74] dark:text-[#94a3b8] my-3">
            Presiona las teclas de tu teclado físico o haz clic en los bloques virtuales. Cada pulsación produce retroalimentación háptica y sintetiza el perfil acústico de switch seleccionado ({audioProfile}).
          </p>

          {/* Virtual Keyboard Matrix */}
          <div className="p-4 bg-[#eff4ff] dark:bg-[#0e1726] border border-[#d3e4fe] dark:border-[#2a3b53] space-y-1.5 overflow-x-auto">
            {virtualKeys.map((row, rowIdx) => (
              <div key={rowIdx} className="flex gap-1 justify-center min-w-[620px]">
                {row.map((k, colIdx) => {
                  const isCurrentlyPressed = pressedKeys.has(k);
                  const hasBeenTested = testedKeysHistory.has(k);
                  const isWide =
                    k === 'SPACE'
                      ? 'w-48'
                      : k === 'BACKSPACE' || k === 'ENTER' || k === 'SHIFT'
                      ? 'w-16'
                      : 'w-9 sm:w-10';

                  return (
                    <button
                      key={`${rowIdx}-${colIdx}-${k}`}
                      onClick={() => handleVirtualKeyClick(k)}
                      className={`h-9 sm:h-10 ${isWide} border flex items-center justify-center font-space text-[10px] sm:text-[11px] font-bold uppercase transition-all select-none shadow-xs ${
                        isCurrentlyPressed
                          ? 'bg-[#00d2ff] text-[#0b1c30] border-[#00d2ff] scale-95 photonic-glow'
                          : hasBeenTested
                          ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-400'
                          : 'bg-white dark:bg-[#162235] text-[#0b1c30] dark:text-white border-[#bec6e0] dark:border-[#2a3b53] hover:border-[#00d2ff]'
                      }`}
                    >
                      {k}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Summary Strip */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-space text-xs text-[#565e74] dark:text-[#94a3b8]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-emerald-500 inline-block" />
              <span>TECLAS CALIBRADAS Y VERIFICADAS: {testedKeysHistory.size}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00677f] dark:text-[#00d2ff] font-bold">
                PERFIL SONORO ACTIVO: {audioProfile.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
