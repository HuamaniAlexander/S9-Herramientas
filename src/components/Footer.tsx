import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useHaptics } from '../context/HapticContext';

export const Footer: React.FC = () => {
  const { navigate } = useNavigation();
  const { trigger } = useHaptics();

  return (
    <footer className="w-full bg-[#eff4ff] dark:bg-[#070d18] text-[#565e74] dark:text-[#94a3b8] pt-12 pb-24 md:pb-12 border-t border-[#d3e4fe] dark:border-[#1e2a3f] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-[#0b1c30] dark:bg-[#00d2ff] flex items-center justify-center">
                <div className="w-2 h-2 bg-[#00d2ff] dark:bg-[#0b1c30]" />
              </div>
              <span className="font-space text-base font-bold uppercase tracking-wider text-[#0b1c30] dark:text-white">
                BYTE<span className="text-[#00677f] dark:text-[#00d2ff]">ELEMENT</span>
              </span>
            </div>
            <p className="font-hanken text-xs text-[#565e74] dark:text-[#94a3b8] leading-relaxed">
              Arquitectura de hardware de competición, componentes calibrados en laboratorio y periféricos para máxima tasa de sondeo.
            </p>
            <div className="flex items-center gap-2 font-space text-xs text-[#00677f] dark:text-[#00d2ff] font-bold">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span>GARANTÍA DE LABORATORIO: 2 AÑOS</span>
            </div>
          </div>

          {/* Navegación Técnica */}
          <div className="flex flex-col gap-2">
            <span className="font-space text-xs font-bold uppercase text-[#0b1c30] dark:text-white tracking-wider mb-1">
              NAVEGACIÓN TÉCNICA
            </span>
            <button
              onClick={() => {
                trigger('light');
                navigate('home');
              }}
              className="text-left font-hanken text-xs hover:text-[#00d2ff] transition-colors"
            >
              Periféricos de Alto Desempeño
            </button>
            <button
              onClick={() => {
                trigger('light');
                navigate('promotions');
              }}
              className="text-left font-hanken text-xs hover:text-[#00d2ff] transition-colors"
            >
              Lotes en Promoción
            </button>
            <button
              onClick={() => {
                trigger('light');
                navigate('gallery');
              }}
              className="text-left font-hanken text-xs hover:text-[#00d2ff] transition-colors"
            >
              Archivo Fotométrico de Laboratorio
            </button>
            <button
              onClick={() => {
                trigger('light');
                navigate('diagnostics');
              }}
              className="text-left font-hanken text-xs hover:text-[#00d2ff] transition-colors"
            >
              Telemetría y Tester en Vivo
            </button>
          </div>

          {/* Protocolo y Estado */}
          <div className="flex flex-col gap-2">
            <span className="font-space text-xs font-bold uppercase text-[#0b1c30] dark:text-white tracking-wider mb-1">
              PROTOCOLO Y ESTADO
            </span>
            <button
              onClick={() => trigger('light')}
              className="text-left font-hanken text-xs hover:text-[#00d2ff] transition-colors"
            >
              Estado de Servidores y API
            </button>
            <button
              onClick={() => trigger('light')}
              className="text-left font-hanken text-xs hover:text-[#00d2ff] transition-colors"
            >
              Términos del Servicio
            </button>
            <button
              onClick={() => trigger('light')}
              className="text-left font-hanken text-xs hover:text-[#00d2ff] transition-colors"
            >
              Política de Privacidad
            </button>
            <button
              onClick={() => trigger('light')}
              className="text-left font-hanken text-xs hover:text-[#00d2ff] transition-colors"
            >
              Protocolo de Garantía Estándar
            </button>
          </div>

          {/* Cifrado y Conexión Segura */}
          <div className="flex flex-col gap-3">
            <span className="font-space text-xs font-bold uppercase text-[#0b1c30] dark:text-white tracking-wider">
              CIFRADO Y CONEXIÓN SEGURA
            </span>
            <div className="p-3 bg-white dark:bg-[#111927] border border-[#d3e4fe] dark:border-[#1e2a3f] flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#00677f] dark:text-[#00d2ff] text-[20px] flex-shrink-0">
                lock
              </span>
              <div className="flex flex-col">
                <span className="font-space text-[10px] font-bold text-[#0b1c30] dark:text-white uppercase">
                  CANAL CIFRADO SSL 256-BIT
                </span>
                <span className="font-hanken text-[11px] text-[#565e74] dark:text-[#94a3b8] leading-tight mt-0.5">
                  Transacciones protegidas por tokenización criptográfica bancaria directa.
                </span>
              </div>
            </div>
            <div className="font-space text-[11px] text-[#565e74] dark:text-[#94a3b8]">
              TIEMPO DE ACTIVIDAD GLOBAL: 99.98%
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="pt-6 border-t border-[#d3e4fe] dark:border-[#1e2a3f] flex flex-col md:flex-row items-center justify-between gap-4 font-space text-[11px] text-[#565e74] dark:text-[#94a3b8]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#00d2ff] inline-block shadow-[0_0_6px_#00d2ff]" />
            <span>
              © 2025 BYTEELEMENT COMPUTACIÓN INDUSTRIAL S.A. TODOS LOS DERECHOS RESERVADOS.
            </span>
          </div>
          <div className="flex items-center gap-4 text-[10px]">
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
    </footer>
  );
};
