import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useHaptics } from '../context/HapticContext';

export const Header: React.FC = () => {
  const { currentScreen, navigate, deviceFrameMode, setDeviceFrameMode } = useNavigation();
  const { totalItems, setIsOpen } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { isSettingsOpen, setIsSettingsOpen, audioProfile, trigger } = useHaptics();

  const handleNavClick = (screen: 'home' | 'promotions' | 'gallery' | 'diagnostics' | 'login' | 'register') => {
    navigate(screen);
  };

  return (
    <header className="sticky top-0 left-0 w-full z-40 bg-[#ffffff]/95 dark:bg-[#0b1424]/95 backdrop-blur-md border-b border-[#e5eeff] dark:border-[#1e2a3f] transition-colors duration-200">
      {/* Micro-bar Superior de Telemetría */}
      <div className="w-full bg-[#0b1c30] text-[#f8f9ff] py-1.5 px-4 sm:px-8 border-b border-[#1b2d46]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between font-space text-[11px] tracking-wider">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#00d2ff] inline-block animate-pulse shadow-[0_0_8px_#00d2ff]" />
              <span className="text-[#b6ebff] font-semibold uppercase">
                SISTEMA EN LÍNEA // LATENCIA 12 MS
              </span>
            </div>
            <span className="text-[#565e74] hidden md:inline">|</span>
            <span className="text-[#bec6e0] hidden md:inline">
              NODO PRINCIPAL: SANTIAGO DE CHILE
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1 text-[#b6ebff]">
              <span className="material-symbols-outlined text-[14px]">public</span>
              <span>REGIÓN: CL / LATAM (CLP $)</span>
            </div>

            {/* Quick Auth Links */}
            <div className="flex items-center gap-1.5 text-white">
              <button
                onClick={() => handleNavClick('login')}
                className={`hover:text-[#00d2ff] transition-colors uppercase ${
                  currentScreen === 'login' ? 'text-[#00d2ff] font-bold underline' : ''
                }`}
              >
                INICIAR SESIÓN
              </button>
              <span className="text-[#565e74]">/</span>
              <button
                onClick={() => handleNavClick('register')}
                className={`hover:text-[#00d2ff] transition-colors uppercase ${
                  currentScreen === 'register' ? 'text-[#00d2ff] font-bold underline' : ''
                }`}
              >
                CREAR CUENTA
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Barra Principal de Navegación */}
      <div className="h-18 w-full px-4 sm:px-8 flex items-center justify-between max-w-7xl mx-auto">
        {/* Brand Logo & Wordmark */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 bg-[#0b1c30] dark:bg-[#00d2ff] flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
              <div className="w-3.5 h-3.5 bg-[#00d2ff] dark:bg-[#0b1c30]" />
            </div>
            <div className="flex flex-col">
              <span className="font-space text-lg font-bold uppercase tracking-wider text-[#0b1c30] dark:text-white leading-none">
                BYTE<span className="text-[#00677f] dark:text-[#00d2ff]">ELEMENT</span>
              </span>
              <span className="font-space text-[9px] uppercase tracking-widest text-[#565e74] dark:text-[#94a3b8] mt-0.5">
                INGENIERÍA // ULTRA-PRECISIÓN
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 font-space text-[12px] uppercase tracking-wider font-semibold">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 transition-colors ${
                currentScreen === 'home'
                  ? 'text-[#00677f] dark:text-[#00d2ff] font-bold bg-[#eff4ff] dark:bg-[#162235] border-b-2 border-[#00d2ff]'
                  : 'text-[#3c494e] dark:text-[#cbd5e1] hover:text-[#0b1c30] dark:hover:text-white hover:bg-[#f8f9ff] dark:hover:bg-[#162235]'
              }`}
            >
              INICIO
            </button>
            <button
              onClick={() => handleNavClick('promotions')}
              className={`px-3 py-2 transition-colors ${
                currentScreen === 'promotions'
                  ? 'text-[#00677f] dark:text-[#00d2ff] font-bold bg-[#eff4ff] dark:bg-[#162235] border-b-2 border-[#00d2ff]'
                  : 'text-[#3c494e] dark:text-[#cbd5e1] hover:text-[#0b1c30] dark:hover:text-white hover:bg-[#f8f9ff] dark:hover:bg-[#162235]'
              }`}
            >
              PROMOCIONES
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className={`px-3 py-2 transition-colors ${
                currentScreen === 'gallery'
                  ? 'text-[#00677f] dark:text-[#00d2ff] font-bold bg-[#eff4ff] dark:bg-[#162235] border-b-2 border-[#00d2ff]'
                  : 'text-[#3c494e] dark:text-[#cbd5e1] hover:text-[#0b1c30] dark:hover:text-white hover:bg-[#f8f9ff] dark:hover:bg-[#162235]'
              }`}
            >
              GALERÍA TÉCNICA
            </button>
            <button
              onClick={() => handleNavClick('diagnostics')}
              className={`px-3 py-2 transition-colors ${
                currentScreen === 'diagnostics'
                  ? 'text-[#00677f] dark:text-[#00d2ff] font-bold bg-[#eff4ff] dark:bg-[#162235] border-b-2 border-[#00d2ff]'
                  : 'text-[#3c494e] dark:text-[#cbd5e1] hover:text-[#0b1c30] dark:hover:text-white hover:bg-[#f8f9ff] dark:hover:bg-[#162235]'
              }`}
            >
              TELEMETRÍA & TESTER
            </button>
          </nav>
        </div>

        {/* Action Controls & Utilities */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Haptic & Mechanical Switch Sound Modal Trigger */}
          <button
            onClick={() => {
              trigger('clack');
              setIsSettingsOpen(!isSettingsOpen);
            }}
            title="Ajustar respuesta háptica y acústica de switches"
            className="flex items-center gap-1 px-2.5 py-1.5 bg-[#eff4ff] dark:bg-[#162235] text-[#0b1c30] dark:text-[#e2e8f0] border border-[#d3e4fe] dark:border-[#2a3b53] hover:border-[#00d2ff] transition-all text-xs font-space font-medium"
          >
            <span className="material-symbols-outlined text-[18px] text-[#00677f] dark:text-[#00d2ff]">
              vibration
            </span>
            <span className="hidden xl:inline uppercase text-[10px] tracking-wider">
              HÁPTICA: {audioProfile === 'mute' ? 'MUDO' : 'ACTIVA'}
            </span>
          </button>

          {/* Device Simulator Mode Toggle (Mobile / Desktop) */}
          <div className="hidden md:flex items-center bg-[#eff4ff] dark:bg-[#162235] p-0.5 border border-[#d3e4fe] dark:border-[#2a3b53]">
            <button
              onClick={() => setDeviceFrameMode('responsive')}
              title="Modo pantalla completa escritorio"
              className={`p-1.5 transition-colors ${
                deviceFrameMode === 'responsive'
                  ? 'bg-[#0b1c30] text-white dark:bg-[#00d2ff] dark:text-[#0b1c30]'
                  : 'text-[#565e74] hover:text-[#0b1c30] dark:text-[#94a3b8]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">desktop_windows</span>
            </button>
            <button
              onClick={() => setDeviceFrameMode('iphone')}
              title="Simulador móvil iOS (iPhone)"
              className={`p-1.5 transition-colors ${
                deviceFrameMode === 'iphone'
                  ? 'bg-[#0b1c30] text-white dark:bg-[#00d2ff] dark:text-[#0b1c30]'
                  : 'text-[#565e74] hover:text-[#0b1c30] dark:text-[#94a3b8]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">phone_iphone</span>
            </button>
            <button
              onClick={() => setDeviceFrameMode('android')}
              title="Simulador móvil Android (Pixel)"
              className={`p-1.5 transition-colors ${
                deviceFrameMode === 'android'
                  ? 'bg-[#0b1c30] text-white dark:bg-[#00d2ff] dark:text-[#0b1c30]'
                  : 'text-[#565e74] hover:text-[#0b1c30] dark:text-[#94a3b8]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">phone_android</span>
            </button>
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={() => {
              trigger('light');
              toggleTheme();
            }}
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label="Cambiar tema de color"
            className="w-8 h-8 flex items-center justify-center bg-[#eff4ff] dark:bg-[#162235] text-[#0b1c30] dark:text-[#00d2ff] border border-[#d3e4fe] dark:border-[#2a3b53] hover:border-[#00d2ff] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Canasta de Compras Button with Live Counter Badge */}
          <button
            onClick={() => {
              trigger('medium');
              setIsOpen(true);
            }}
            aria-label="Ver canasta de compras"
            className="flex items-center gap-2 px-3 py-2 bg-[#eff4ff] dark:bg-[#162235] text-[#0b1c30] dark:text-white border border-[#d3e4fe] dark:border-[#2a3b53] hover:border-[#00d2ff] transition-all group shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px] text-[#00677f] dark:text-[#00d2ff] group-hover:scale-110 transition-transform">
              shopping_bag
            </span>
            <span className="font-space text-[11px] font-bold uppercase tracking-wider hidden sm:inline">
              CANASTA
            </span>
            <span className="px-1.5 py-0.5 bg-[#00d2ff] text-[#0b1c30] font-space text-[11px] font-bold">
              {totalItems < 10 ? `0${totalItems}` : totalItems}
            </span>
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={() => handleNavClick('login')}
            aria-label="Mi Perfil"
            className="w-8 h-8 bg-[#00677f] dark:bg-[#00d2ff] text-white dark:text-[#0b1c30] flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
