import React from 'react';
import { useHaptics } from '../context/HapticContext';
import { SwitchAudioProfile } from '../types';

export const HapticSettingsModal: React.FC = () => {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    vibrationEnabled,
    setVibrationEnabled,
    soundEnabled,
    setSoundEnabled,
    audioProfile,
    setAudioProfile,
    volume,
    setVolume,
    trigger,
  } = useHaptics();

  if (!isSettingsOpen) return null;

  const profiles: { id: SwitchAudioProfile; name: string; desc: string; stroke: string }[] = [
    {
      id: 'linear-creamy',
      name: 'Lineal Lubricado (Creamy Thock)',
      desc: 'Interruptor suave 45g con lubricación Krytox 205g0 y amortiguación por junta.',
      stroke: '4.0 mm',
    },
    {
      id: 'magnetic-hall',
      name: 'Efecto Hall Magnético (Deep Bump)',
      desc: 'Punto analógico ultrarrápido 0.1 mm con respuesta magnética sin rebote mecánico.',
      stroke: '0.1 - 4.0 mm',
    },
    {
      id: 'blue-clicky',
      name: 'Táctil Sonoro (Acoustic Click)',
      desc: 'Respuesta acústica cristalina con retroalimentación milimétrica táctil de alta definición.',
      stroke: '2.0 mm',
    },
    {
      id: 'mute',
      name: 'Modo Silencioso / Solo Vibración',
      desc: 'Desactiva los transitorios de audio manteniendo la vibración táctil física del dispositivo.',
      stroke: 'N/A',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-lg bg-white dark:bg-[#0b1424] border border-[#0b1c30] dark:border-[#1e2a3f] shadow-2xl relative">
        {/* Top Header */}
        <div className="h-14 px-6 bg-[#0b1c30] text-white flex items-center justify-between border-b border-[#1b2d46]">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#00d2ff] text-[20px]">
              tune
            </span>
            <span className="font-space text-sm font-bold uppercase tracking-wider">
              CALIBRACIÓN HÁPTICA & ACÚSTICA
            </span>
          </div>
          <button
            onClick={() => {
              trigger('selection');
              setIsSettingsOpen(false);
            }}
            className="text-[#94a3b8] hover:text-white p-1"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Hardware Vibration Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-[#eff4ff] dark:bg-[#162235] border border-[#d3e4fe] dark:border-[#2a3b53]">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#00677f] dark:text-[#00d2ff] text-[22px]">
                vibration
              </span>
              <div>
                <span className="font-space text-xs font-bold uppercase block text-[#0b1c30] dark:text-white">
                  Vibración Táctil Háptica
                </span>
                <span className="font-hanken text-[11px] text-[#565e74] dark:text-[#94a3b8]">
                  Motor de vibración Web Vibration API para dispositivos táctiles
                </span>
              </div>
            </div>
            <button
              onClick={() => setVibrationEnabled(!vibrationEnabled)}
              className={`w-12 h-6 flex items-center p-0.5 transition-colors ${
                vibrationEnabled ? 'bg-[#00677f] dark:bg-[#00d2ff]' : 'bg-[#bec6e0] dark:bg-[#334155]'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white dark:bg-[#0b1c30] shadow-sm transition-transform ${
                  vibrationEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Switch Sound Profiles */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-space text-xs font-bold uppercase text-[#0b1c30] dark:text-white">
                Perfil Acústico de Microinterruptor
              </span>
              <span className="font-space text-[10px] text-[#00677f] dark:text-[#00d2ff] uppercase">
                Síntesis Web Audio 48kHz
              </span>
            </div>

            <div className="space-y-2">
              {profiles.map((p) => {
                const isSelected = audioProfile === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setAudioProfile(p.id)}
                    className={`w-full text-left p-3 border transition-all ${
                      isSelected
                        ? 'bg-[#eff4ff] dark:bg-[#16253b] border-[#00d2ff] photonic-glow'
                        : 'bg-white dark:bg-[#0e1726] border-[#e2e8f0] dark:border-[#1e2a3f] hover:border-[#00d2ff]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-space text-xs font-bold text-[#0b1c30] dark:text-white uppercase">
                        {p.name}
                      </span>
                      <span className="font-space text-[10px] text-[#565e74] dark:text-[#94a3b8]">
                        Recorrido: {p.stroke}
                      </span>
                    </div>
                    <p className="font-hanken text-[11px] text-[#565e74] dark:text-[#94a3b8] mt-1">
                      {p.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Volume Slider */}
          <div>
            <div className="flex justify-between items-center mb-1 font-space text-xs">
              <span className="text-[#0b1c30] dark:text-white uppercase font-bold">
                Volumen de Respuesta
              </span>
              <span className="text-[#00677f] dark:text-[#00d2ff]">
                {Math.round(volume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                trigger('light');
              }}
              className="w-full accent-[#00677f] dark:accent-[#00d2ff] cursor-pointer"
            />
          </div>

          {/* Test Buttons Row */}
          <div className="pt-2">
            <span className="font-space text-[10px] uppercase text-[#565e74] dark:text-[#94a3b8] block mb-2">
              Banco de Prueba Inmediata:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => trigger('light')}
                className="py-2.5 px-3 bg-[#eff4ff] dark:bg-[#162235] hover:bg-[#d3e4fe] dark:hover:bg-[#1f3350] border border-[#d3e4fe] dark:border-[#2a3b53] font-space text-[11px] uppercase font-bold text-[#0b1c30] dark:text-white transition-colors"
              >
                Toque Leve
              </button>
              <button
                onClick={() => trigger('medium')}
                className="py-2.5 px-3 bg-[#eff4ff] dark:bg-[#162235] hover:bg-[#d3e4fe] dark:hover:bg-[#1f3350] border border-[#d3e4fe] dark:border-[#2a3b53] font-space text-[11px] uppercase font-bold text-[#0b1c30] dark:text-white transition-colors"
              >
                Pulsación 45g
              </button>
              <button
                onClick={() => trigger('success')}
                className="py-2.5 px-3 bg-[#0b1c30] hover:bg-[#00d2ff] hover:text-[#0b1c30] text-white font-space text-[11px] uppercase font-bold transition-colors"
              >
                Triple Clack
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#eff4ff] dark:bg-[#0e1726] border-t border-[#d3e4fe] dark:border-[#1e2a3f] flex justify-end">
          <button
            onClick={() => {
              trigger('medium');
              setIsSettingsOpen(false);
            }}
            className="px-6 py-2.5 bg-[#0b1c30] dark:bg-[#00d2ff] text-white dark:text-[#0b1c30] font-space text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            GUARDAR CALIBRACIÓN
          </button>
        </div>
      </div>
    </div>
  );
};
