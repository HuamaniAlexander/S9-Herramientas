import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useHaptics } from '../context/HapticContext';
import { GALLERY_ITEMS } from '../data/products';
import { OptimizedImage } from '../components/OptimizedImage';

export const LoginScreen: React.FC = () => {
  const { navigate, openGalleryModal } = useNavigation();
  const { trigger } = useHaptics();

  const [identifier, setIdentifier] = useState('demo@byteelement.cl');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [authState, setAuthState] = useState<'idle' | 'verifying' | 'authenticated'>('idle');

  const mk80Item = GALLERY_ITEMS.find((g) => g.id === 'gallery-mk80') || GALLERY_ITEMS[0];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trigger('medium');
    setAuthState('verifying');

    setTimeout(() => {
      trigger('success');
      setAuthState('authenticated');

      setTimeout(() => {
        setAuthState('idle');
        navigate('home');
      }, 2000);
    }, 1200);
  };

  const handleQuickLogin = (provider: string) => {
    trigger('selection');
    setAuthState('verifying');
    setTimeout(() => {
      trigger('success');
      setAuthState('authenticated');
      setTimeout(() => {
        setAuthState('idle');
        navigate('home');
      }, 1500);
    }, 900);
  };

  return (
    <div className="w-full bg-[#f8f9ff] dark:bg-[#070d18] min-h-[calc(100vh-140px)] flex flex-col justify-center items-center py-6 sm:py-10 px-4 sm:px-8 text-[#0b1c30] dark:text-[#f8f9ff] transition-colors duration-200">
      <div className="max-w-[1440px] w-full mx-auto flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-[#0b1424] shadow-2xl border border-[#d3e4fe] dark:border-[#1e2a3f] relative overflow-hidden">
          {/* Left Column: Serie 01 MK-80 Hardware Showcase */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-between p-8 xl:p-10 bg-[#eff4ff] dark:bg-[#0e1726] border-r border-[#d3e4fe] dark:border-[#1e2a3f] relative overflow-hidden">
            {/* Photonic Background Bloom */}
            <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#00d2ff]/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#00677f]/10 dark:bg-[#00d2ff]/5 blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-[#162235] border border-[#d3e4fe] dark:border-[#2a3b53] shadow-xs">
                  <span className="w-2 h-2 bg-[#00d2ff] animate-ping" />
                  <span className="w-1.5 h-1.5 bg-[#00d2ff]" />
                  <span className="font-space text-xs uppercase tracking-wider font-bold text-[#0b1c30] dark:text-white">
                    SERIE 01 // CHASIS MK-80
                  </span>
                </div>
                <div className="font-space text-xs text-[#565e74] dark:text-[#94a3b8] uppercase tracking-widest font-semibold">
                  REV_SISTEMA: V4.2.0
                </div>
              </div>

              <div className="flex flex-col gap-1.5 mt-2">
                <h2 className="font-space text-2xl xl:text-3xl font-bold text-[#0b1c30] dark:text-white tracking-tight">
                  Ingeniería Táctil de Alta Frecuencia.
                </h2>
                <p className="font-hanken text-sm text-[#3c494e] dark:text-[#cbd5e1] max-w-md leading-relaxed">
                  Precisión artesanal y respuesta instantánea. Conecta tu ecosistema de hardware ByteElement para sincronización de macros y telemetría de rendimiento térmico.
                </p>
              </div>
            </div>

            {/* Hardware Media Well with Interactive Lightbox Zoom */}
            <div className="relative z-10 my-6 group">
              <div
                onClick={() => openGalleryModal(mk80Item)}
                className="relative bg-white dark:bg-[#162235] p-2 border border-[#d3e4fe] dark:border-[#2a3b53] shadow-sm transition-transform duration-300 group-hover:scale-[1.01] cursor-pointer"
                title="Haz clic para inspeccionar detalles del teclado en alta resolución"
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-[#e5eeff] dark:bg-[#111927] flex items-center justify-center">
                  <OptimizedImage
                    src={mk80Item.imageUrl}
                    alt="Teclado Custom MK-80"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/50 via-transparent to-transparent opacity-60" />

                  {/* Calibration Top Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#0b1c30]/85 backdrop-blur-md px-2.5 py-1 text-white border border-white/10">
                    <span className="material-symbols-outlined text-[#00d2ff] text-[14px]">tune</span>
                    <span className="font-space text-[10px] uppercase tracking-wider font-bold">
                      CALIBRACIÓN 1000 HZ
                    </span>
                  </div>

                  {/* Telemetry Bottom Strip */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white font-space text-[11px]">
                    <div className="tracking-wider">NÚCLEO: ALUMINIO CNC 6063</div>
                    <div className="flex items-center gap-1 text-[#00d2ff] font-bold">
                      <span className="material-symbols-outlined text-[14px]">bolt</span>
                      <span>LATENCIA: 0.8 ms</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Micro-spec grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 font-space">
                <div className="p-2.5 bg-white dark:bg-[#162235] border border-[#d3e4fe] dark:border-[#2a3b53] flex flex-col gap-0.5">
                  <span className="text-[10px] text-[#565e74] dark:text-[#94a3b8] uppercase font-bold">
                    Estructura
                  </span>
                  <span className="text-xs font-bold uppercase text-[#0b1c30] dark:text-white">
                    Montaje con Junta
                  </span>
                </div>
                <div className="p-2.5 bg-white dark:bg-[#162235] border border-[#d3e4fe] dark:border-[#2a3b53] flex flex-col gap-0.5">
                  <span className="text-[10px] text-[#565e74] dark:text-[#94a3b8] uppercase font-bold">
                    Interruptores
                  </span>
                  <span className="text-xs font-bold uppercase text-[#0b1c30] dark:text-white">
                    5 Pines Hotswap
                  </span>
                </div>
                <div className="p-2.5 bg-white dark:bg-[#162235] border border-[#d3e4fe] dark:border-[#2a3b53] flex flex-col gap-0.5">
                  <span className="text-[10px] text-[#565e74] dark:text-[#94a3b8] uppercase font-bold">
                    Respuesta
                  </span>
                  <span className="text-xs font-bold uppercase text-[#0b1c30] dark:text-white">
                    &lt; 1 ms Latencia
                  </span>
                </div>
                <div className="p-2.5 bg-white dark:bg-[#162235] border border-[#d3e4fe] dark:border-[#2a3b53] flex flex-col gap-0.5">
                  <span className="text-[10px] text-[#565e74] dark:text-[#94a3b8] uppercase font-bold">
                    Microprograma
                  </span>
                  <span className="text-xs font-bold uppercase text-[#0b1c30] dark:text-white">
                    Sync en Nube
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Footer Quote */}
            <div className="relative z-10 pt-4 border-t border-[#d3e4fe] dark:border-[#1e2a3f] flex items-center justify-between text-[#565e74] dark:text-[#94a3b8]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00677f] dark:text-[#00d2ff] text-[20px]">
                  verified
                </span>
                <span className="font-hanken text-xs">
                  Hardware probado y calibrado por analistas y creadores de deportes electrónicos.
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#0b1c30] dark:bg-[#00d2ff]" />
                <span className="w-1.5 h-1.5 bg-[#bbc9cf] dark:bg-[#334155]" />
                <span className="w-1.5 h-1.5 bg-[#bbc9cf] dark:bg-[#334155]" />
              </div>
            </div>
          </div>

          {/* Right Column: Authentication Form */}
          <div className="col-span-1 lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white dark:bg-[#0b1424]">
            <div className="w-full max-w-md mx-auto flex flex-col gap-6">
              {/* Header */}
              <div className="flex flex-col gap-1">
                <div className="inline-flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 bg-[#0b1c30] dark:bg-[#00d2ff]" />
                  <span className="font-space text-xs uppercase text-[#00677f] dark:text-[#00d2ff] tracking-widest font-bold">
                    PASARELA AUTENTICADA
                  </span>
                </div>
                <h1 className="font-space text-2xl sm:text-3xl font-bold text-[#0b1c30] dark:text-white tracking-tight">
                  Iniciar Sesión
                </h1>
                <p className="font-hanken text-xs sm:text-sm text-[#565e74] dark:text-[#94a3b8]">
                  Ingresa tus credenciales para sincronizar tus dispositivos, perfiles térmicos y gestionar tus pedidos de laboratorio.
                </p>
              </div>

              {/* Acceso Rápido Integrado (Steam, Discord, Google) */}
              <div className="flex flex-col gap-2">
                <span className="font-space text-[10px] text-[#565e74] dark:text-[#94a3b8] uppercase tracking-wider font-bold">
                  Acceso Rápido Integrado
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('Steam')}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#eff4ff] dark:bg-[#162235] hover:bg-[#d3e4fe] dark:hover:bg-[#1f3350] border border-[#d3e4fe] dark:border-[#2a3b53] transition-all group font-space text-[11px] font-bold text-[#0b1c30] dark:text-white"
                  >
                    <svg className="w-4 h-4 fill-current group-hover:text-[#00677f] dark:group-hover:text-[#00d2ff]" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.54 3.03 8.38 7.19 9.58l3.18-4.55a3.99 3.99 0 0 1-1.37-3.03c0-.3.04-.59.1-.88L7.69 11.2a4.996 4.996 0 0 1-3.69-4.8c0-2.76 2.24-5 5-5s5 2.24 5 5c0 .32-.04.64-.1.95l3.41 1.91c.9-.55 1.97-.86 3.1-.86 3.31 0 6 2.69 6 6s-2.69 6-6 6c-1.88 0-3.56-.87-4.66-2.23l-3.37 4.82C10.74 21.92 11.36 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                    </svg>
                    <span>STEAM</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('Discord')}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#eff4ff] dark:bg-[#162235] hover:bg-[#d3e4fe] dark:hover:bg-[#1f3350] border border-[#d3e4fe] dark:border-[#2a3b53] transition-all group font-space text-[11px] font-bold text-[#0b1c30] dark:text-white"
                  >
                    <svg className="w-4 h-4 fill-current group-hover:text-[#00677f] dark:group-hover:text-[#00d2ff]" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z" />
                    </svg>
                    <span>DISCORD</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('Google')}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#eff4ff] dark:bg-[#162235] hover:bg-[#d3e4fe] dark:hover:bg-[#1f3350] border border-[#d3e4fe] dark:border-[#2a3b53] transition-all group font-space text-[11px] font-bold text-[#0b1c30] dark:text-white"
                  >
                    <svg className="w-4 h-4 fill-current group-hover:text-[#00677f] dark:group-hover:text-[#00d2ff]" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>GOOGLE</span>
                  </button>
                </div>
              </div>

              {/* Separator */}
              <div className="relative flex items-center justify-center my-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-px bg-[#e2e8f0] dark:bg-[#1e2a3f]" />
                </div>
                <div className="relative bg-white dark:bg-[#0b1424] px-3 font-space text-[10px] text-[#565e74] dark:text-[#94a3b8] uppercase tracking-wider font-bold">
                  O CON TU CORREO O IDENTIFICADOR ELEMENT
                </div>
              </div>

              {/* Formulario de Login */}
              <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between font-space text-[11px] uppercase font-bold">
                    <span>CORREO ELECTRÓNICO O IDENTIFICADOR ELEMENT</span>
                    <span className="text-[#565e74] dark:text-[#94a3b8] text-[9px]">
                      IDENTIFICADOR_AUT
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-[#565e74] dark:text-[#94a3b8] text-[18px] pointer-events-none">
                      alternate_email
                    </span>
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="nombre@ejemplo.com o BE-1042"
                      className="w-full h-11 pl-10 pr-4 bg-[#eff4ff] dark:bg-[#162235] text-[#0b1c30] dark:text-white font-hanken text-sm border border-[#d3e4fe] dark:border-[#2a3b53] focus:border-[#00d2ff] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between font-space text-[11px] uppercase font-bold">
                    <span>CONTRASEÑA</span>
                    <button
                      type="button"
                      onClick={() => trigger('selection')}
                      className="text-[#00677f] dark:text-[#00d2ff] hover:underline normal-case text-xs"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-[#565e74] dark:text-[#94a3b8] text-[18px] pointer-events-none">
                      lock
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full h-11 pl-10 pr-12 bg-[#eff4ff] dark:bg-[#162235] text-[#0b1c30] dark:text-white font-hanken text-sm border border-[#d3e4fe] dark:border-[#2a3b53] focus:border-[#00d2ff] focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        trigger('light');
                        setShowPassword(!showPassword);
                      }}
                      className="absolute right-3.5 text-[#565e74] dark:text-[#94a3b8] hover:text-[#0b1c30] dark:hover:text-white"
                      title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Checkbox Remember Me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => {
                        trigger('light');
                        setRememberMe(e.target.checked);
                      }}
                      className="w-4 h-4 rounded-none accent-[#0b1c30] dark:accent-[#00d2ff] cursor-pointer"
                    />
                    <span className="font-hanken text-xs text-[#0b1c30] dark:text-[#cbd5e1]">
                      Mantener sesión iniciada en este dispositivo
                    </span>
                  </label>
                </div>

                {/* Submit Button with dynamic states */}
                <button
                  type="submit"
                  disabled={authState !== 'idle'}
                  className={`w-full h-12 mt-2 font-space text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                    authState === 'authenticated'
                      ? 'bg-[#00d2ff] text-[#0b1c30] photonic-glow'
                      : 'bg-[#0b1c30] dark:bg-[#00d2ff] text-white dark:text-[#0b1c30] hover:opacity-90'
                  }`}
                >
                  {authState === 'verifying' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-current border-t-transparent animate-spin inline-block" />
                      <span>VERIFICANDO NODO...</span>
                    </>
                  ) : authState === 'authenticated' ? (
                    <>
                      <span className="material-symbols-outlined text-[18px]">verified_user</span>
                      <span>AUTENTICADO CORRECTAMENTE</span>
                    </>
                  ) : (
                    <>
                      <span>ENTRAR A BYTEELEMENT</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>

              {/* Bottom Switch Link to Register */}
              <div className="flex flex-col gap-2 text-center pt-2">
                <p className="font-hanken text-xs sm:text-sm text-[#565e74] dark:text-[#94a3b8]">
                  ¿No tienes una cuenta aún?{' '}
                  <button
                    onClick={() => {
                      trigger('selection');
                      navigate('register');
                    }}
                    className="font-space text-xs font-bold uppercase text-[#00677f] dark:text-[#00d2ff] hover:underline ml-1"
                  >
                    Crear cuenta nueva
                  </button>
                </p>

                <div className="flex items-center justify-center gap-2 pt-2 text-[#565e74] dark:text-[#94a3b8]">
                  <span className="material-symbols-outlined text-[16px] text-[#00677f] dark:text-[#00d2ff]">
                    gpp_maybe
                  </span>
                  <span className="font-space text-[10px] uppercase tracking-wider">
                    CIFRADO SSL DE 256 BITS • PROTOCOLO DE PROTECCIÓN DE HARDWARE
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom System Latency Indicators */}
            <div className="mt-8 pt-4 border-t border-[#e2e8f0] dark:border-[#1e2a3f] flex flex-wrap items-center justify-between font-space text-[10px] text-[#565e74] dark:text-[#94a3b8] gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#00d2ff]" />
                <span className="uppercase">NODO: SCL-01 // LATENCIA 12 MS</span>
              </div>
              <div className="flex items-center gap-2 uppercase">
                <button onClick={() => trigger('light')} className="hover:text-[#00d2ff]">
                  TÉRMINOS
                </button>
                <span>/</span>
                <button onClick={() => trigger('light')} className="hover:text-[#00d2ff]">
                  PRIVACIDAD
                </button>
                <span>/</span>
                <button onClick={() => trigger('light')} className="hover:text-[#00d2ff]">
                  ESTADO DE API
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
