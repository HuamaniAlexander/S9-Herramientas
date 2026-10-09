import React from 'react';
import { useNavigation } from '../context/NavigationContext';

export const DeviceFrameSimulator: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { deviceFrameMode, setDeviceFrameMode } = useNavigation();

  if (deviceFrameMode === 'responsive') {
    return <>{children}</>;
  }

  const isIphone = deviceFrameMode === 'iphone';

  return (
    <div className="min-h-screen bg-[#070b12] py-6 sm:py-10 px-2 sm:px-4 flex flex-col items-center justify-center transition-colors">
      {/* Device Mode Switcher Floating Pill */}
      <div className="mb-4 bg-[#111927] border border-[#1f2e46] p-1 flex items-center gap-1 shadow-xl z-50">
        <button
          onClick={() => setDeviceFrameMode('responsive')}
          className="px-3 py-1 font-space text-[10px] font-bold uppercase text-[#94a3b8] hover:text-white"
        >
          Pantalla Completa
        </button>
        <span className="text-[#334155]">|</span>
        <button
          onClick={() => setDeviceFrameMode('iphone')}
          className={`px-3 py-1 font-space text-[10px] font-bold uppercase transition-colors ${
            isIphone ? 'bg-[#00d2ff] text-[#0b1c30]' : 'text-[#94a3b8] hover:text-white'
          }`}
        >
          Apple iOS (iPhone)
        </button>
        <span className="text-[#334155]">|</span>
        <button
          onClick={() => setDeviceFrameMode('android')}
          className={`px-3 py-1 font-space text-[10px] font-bold uppercase transition-colors ${
            !isIphone ? 'bg-[#00d2ff] text-[#0b1c30]' : 'text-[#94a3b8] hover:text-white'
          }`}
        >
          Google Android (Pixel)
        </button>
      </div>

      {/* Realistic Mobile Chassis Container */}
      <div
        className={`relative w-full max-w-[420px] h-[860px] bg-black shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-[10px] ${
          isIphone
            ? 'rounded-[50px] border-[#2d3748]'
            : 'rounded-[38px] border-[#1a202c]'
        } overflow-hidden flex flex-col`}
      >
        {/* Status Bar */}
        <div className="h-10 bg-[#0b1c30] text-white flex items-center justify-between px-6 pt-1 select-none z-50 border-b border-[#1b2d46]">
          <span className="font-space text-xs font-bold">09:41</span>
          {isIphone ? (
            <div className="w-24 h-4 bg-black rounded-full" />
          ) : (
            <div className="w-3.5 h-3.5 bg-black rounded-full" />
          )}
          <div className="flex items-center gap-1.5 text-xs text-[#00d2ff]">
            <span className="font-space text-[9px] font-bold">5G</span>
            <span className="material-symbols-outlined text-[14px]">wifi</span>
            <span className="material-symbols-outlined text-[14px]">battery_full</span>
          </div>
        </div>

        {/* Scrollable Screen Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col bg-white dark:bg-[#0b1424]">
          {children}
        </div>

        {/* Home Indicator Bar */}
        <div className="h-4 bg-white dark:bg-[#0b1424] flex items-center justify-center select-none z-50 pb-1">
          <div className="w-32 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full" />
        </div>
      </div>
    </div>
  );
};
