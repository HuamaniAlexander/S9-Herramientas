import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useHaptics } from '../context/HapticContext';
import { useCart } from '../context/CartContext';

export const RegisterScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const { trigger } = useHaptics();
  const { applyCoupon } = useCart();

  const [fullName, setFullName] = useState('');
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [interests, setInterests] = useState<string[]>(['TECLADOS MECÁNICOS']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Password evaluation logic (same as HTML specification)
  const getPasswordStrength = () => {
    if (!password) return { score: 0, label: 'NIVEL: VACÍO', color: 'text-[#565e74]' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score === 1) return { score: 1, label: 'NIVEL: DÉBIL', color: 'text-rose-500' };
    if (score === 2) return { score: 2, label: 'NIVEL: MEDIO', color: 'text-amber-500' };
    if (score === 3) return { score: 3, label: 'NIVEL: ROBUSTO', color: 'text-[#00677f] dark:text-[#00d2ff]' };
    return { score: 4, label: 'NIVEL: MIL-SPEC ÓPTIMO', color: 'text-emerald-500 font-bold' };
  };

  const strength = getPasswordStrength();

  const toggleInterest = (tag: string) => {
    trigger('selection');
    if (interests.includes(tag)) {
      setInterests(interests.filter((i) => i !== tag));
    } else {
      setInterests([...interests, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;
    if (password !== confirmPassword) {
      trigger('error');
      alert('Las contraseñas no coinciden');
      return;
    }

    trigger('medium');
    setIsSubmitting(true);

    setTimeout(() => {
      trigger('success');
      applyCoupon('BIENVENIDA10'); // Automatically award the 10% welcome coupon!
      setIsSubmitting(false);
      setRegistrationSuccess(true);

      setTimeout(() => {
        navigate('home');
      }, 3000);
    }, 1200);
  };

  const allTags = [
    'TECLADOS MECÁNICOS',
    'RATONES ULTRALIGEROS',
    'MONITORES DE ALTA FRECUENCIA',
    'AUDIO DE ESTUDIO',
  ];

  return (
    <div className="w-full bg-[#f8f9ff] dark:bg-[#070d18] min-h-[calc(100vh-140px)] flex flex-col justify-center items-center py-6 sm:py-10 px-4 sm:px-8 text-[#0b1c30] dark:text-[#f8f9ff] transition-colors duration-200">
      <div className="w-full max-w-7xl mx-auto py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Community Perks & Telemetry */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="bg-white dark:bg-[#0b1424] p-6 shadow-md border border-[#d3e4fe] dark:border-[#1e2a3f] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#00d2ff]" />

              <div className="flex items-center justify-between pb-4 border-b border-[#eff4ff] dark:border-[#1e2a3f]">
                <span className="font-space text-xs text-[#565e74] dark:text-[#94a3b8] tracking-widest font-bold uppercase">
                  SERIE 01 // COMUNIDAD DE INGENIERÍA
                </span>
                <span className="font-space text-xs text-[#00677f] dark:text-[#00d2ff] bg-[#eff4ff] dark:bg-[#162235] px-2 py-0.5 font-bold uppercase">
                  REV_SISTEMA: V4.2.0
                </span>
              </div>

              <div className="space-y-2 pt-3">
                <h1 className="font-space text-2xl font-bold text-[#0b1c30] dark:text-white uppercase tracking-tight">
                  Únete al Ecosistema ByteElement
                </h1>
                <p className="font-hanken text-xs sm:text-sm text-[#565e74] dark:text-[#cbd5e1] leading-relaxed">
                  Crea tu perfil de laboratorio para sincronizar configuraciones de hardware, perfiles de macros y seguimiento prioritario de periféricos.
                </p>
              </div>

              {/* 4 Beneficios en tarjetas limpias */}
              <div className="mt-6 space-y-3">
                {/* Beneficio 1 */}
                <div className="bg-[#eff4ff] dark:bg-[#162235] p-3.5 border border-[#d3e4fe] dark:border-[#2a3b53] hover:border-[#00d2ff] transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#00677f] dark:text-[#00d2ff] text-xl mt-0.5">
                      percent
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="font-space text-xs sm:text-sm font-bold text-[#0b1c30] dark:text-white uppercase">
                          10% de Descuento de Bienvenida
                        </h2>
                        <span className="font-space text-[9px] bg-[#00677f] dark:bg-[#00d2ff] text-white dark:text-[#0b1c30] px-1.5 py-0.2 font-bold uppercase">
                          CUPÓN
                        </span>
                      </div>
                      <p className="font-hanken text-[11px] text-[#565e74] dark:text-[#94a3b8] mt-0.5">
                        Cupón instantáneo para tu primer teclado o ratón personalizado de grado competitivo.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Beneficio 2 */}
                <div className="bg-[#eff4ff] dark:bg-[#162235] p-3.5 border border-[#d3e4fe] dark:border-[#2a3b53] hover:border-[#00d2ff] transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#00677f] dark:text-[#00d2ff] text-xl mt-0.5">
                      verified_user
                    </span>
                    <div className="min-w-0">
                      <h2 className="font-space text-xs sm:text-sm font-bold text-[#0b1c30] dark:text-white uppercase">
                        Garantía Oficial de Laboratorio por 2 Años
                      </h2>
                      <p className="font-hanken text-[11px] text-[#565e74] dark:text-[#94a3b8] mt-0.5">
                        Tramitación directa en banco de pruebas y sustitución sin intermediarios ni demoras.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Beneficio 3 */}
                <div className="bg-[#eff4ff] dark:bg-[#162235] p-3.5 border border-[#d3e4fe] dark:border-[#2a3b53] hover:border-[#00d2ff] transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#00677f] dark:text-[#00d2ff] text-xl mt-0.5">
                      cloud_sync
                    </span>
                    <div className="min-w-0">
                      <h2 className="font-space text-xs sm:text-sm font-bold text-[#0b1c30] dark:text-white uppercase">
                        Sincronización de Perfiles en la Nube
                      </h2>
                      <p className="font-hanken text-[11px] text-[#565e74] dark:text-[#94a3b8] mt-0.5">
                        Guarda tus capas de teclas, frecuencias de sondeo y mapas RGB en cualquier estación de trabajo.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Beneficio 4 */}
                <div className="bg-[#eff4ff] dark:bg-[#162235] p-3.5 border border-[#d3e4fe] dark:border-[#2a3b53] hover:border-[#00d2ff] transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#00677f] dark:text-[#00d2ff] text-xl mt-0.5">
                      notification_important
                    </span>
                    <div className="min-w-0">
                      <h2 className="font-space text-xs sm:text-sm font-bold text-[#0b1c30] dark:text-white uppercase">
                        Alertas de Lotes Limitados
                      </h2>
                      <p className="font-hanken text-[11px] text-[#565e74] dark:text-[#94a3b8] mt-0.5">
                        Acceso anticipado a interruptores mecánicos artesanales y chasis de aluminio fresado CNC.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Telemetría en Vivo */}
              <div className="mt-6 bg-[#eff4ff] dark:bg-[#111927] p-4 border border-[#d3e4fe] dark:border-[#1e2a3f]">
                <div className="flex items-center justify-between font-space text-xs">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full bg-[#00d2ff] opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 bg-[#00677f] dark:bg-[#00d2ff]" />
                    </span>
                    <span className="text-[#0b1c30] dark:text-white font-bold uppercase">
                      TELEMETRÍA EN VIVO
                    </span>
                  </div>
                  <span className="text-[#565e74] dark:text-[#94a3b8]">SERVIDOR: LATAM-01</span>
                </div>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-space text-2xl font-bold text-[#00677f] dark:text-[#00d2ff]">
                    +45,000
                  </span>
                  <span className="font-hanken text-xs text-[#565e74] dark:text-[#cbd5e1]">
                    estaciones de juego y trabajo sincronizadas
                  </span>
                </div>

                <div className="mt-3 w-full bg-[#d3e4fe] dark:bg-[#1e2a3f] h-1.5 overflow-hidden">
                  <div className="bg-[#00d2ff] h-full w-4/5 shadow-[0_0_8px_#00d2ff]" />
                </div>
              </div>
            </div>

            {/* Modular Engineering Card */}
            <div className="bg-white dark:bg-[#0b1424] p-5 shadow-sm border border-[#d3e4fe] dark:border-[#1e2a3f] flex items-center gap-4">
              <div className="w-14 h-14 bg-[#eff4ff] dark:bg-[#162235] flex-shrink-0 flex items-center justify-center border border-[#d3e4fe] dark:border-[#2a3b53]">
                <span className="material-symbols-outlined text-[#00677f] dark:text-[#00d2ff] text-2xl">
                  precision_manufacturing
                </span>
              </div>
              <div>
                <span className="font-space text-[10px] text-[#565e74] dark:text-[#94a3b8] uppercase font-bold tracking-widest">
                  INGENIERÍA MODULAR
                </span>
                <p className="font-hanken text-xs text-[#0b1c30] dark:text-white mt-1 font-medium">
                  Cada cuenta de usuario se vincula a nuestra base de telemetría de tolerancias micro-mecánicas.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Register Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#0b1424] p-6 sm:p-8 shadow-xl border border-[#d3e4fe] dark:border-[#1e2a3f] relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00677f] via-[#00d2ff] to-[#0054d6]" />

              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between pb-6 border-b border-[#eff4ff] dark:border-[#1e2a3f]">
                <div>
                  <h2 className="font-space text-2xl font-bold text-[#0b1c30] dark:text-white uppercase tracking-tight">
                    Crear Cuenta
                  </h2>
                  <p className="font-hanken text-xs text-[#565e74] dark:text-[#94a3b8] mt-1">
                    Ingresa tus datos para registrar tu estación de hardware
                  </p>
                </div>
                <span className="font-space text-[11px] text-[#565e74] dark:text-[#94a3b8] mt-2 sm:mt-0 font-bold">
                  [ FORM_ID: BE-REG-2025 ]
                </span>
              </div>

              {/* Quick Auth Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-6">
                <button
                  type="button"
                  onClick={() => trigger('selection')}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#eff4ff] dark:bg-[#162235] hover:bg-[#d3e4fe] dark:hover:bg-[#1f3350] border border-[#d3e4fe] dark:border-[#2a3b53] font-space text-[11px] font-bold uppercase transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">sports_esports</span>
                  <span>STEAM</span>
                </button>
                <button
                  type="button"
                  onClick={() => trigger('selection')}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#eff4ff] dark:bg-[#162235] hover:bg-[#d3e4fe] dark:hover:bg-[#1f3350] border border-[#d3e4fe] dark:border-[#2a3b53] font-space text-[11px] font-bold uppercase transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">forum</span>
                  <span>DISCORD</span>
                </button>
                <button
                  type="button"
                  onClick={() => trigger('selection')}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#eff4ff] dark:bg-[#162235] hover:bg-[#d3e4fe] dark:hover:bg-[#1f3350] border border-[#d3e4fe] dark:border-[#2a3b53] font-space text-[11px] font-bold uppercase transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">public</span>
                  <span>GOOGLE</span>
                </button>
              </div>

              <div className="relative flex py-2 items-center mb-6">
                <div className="flex-grow bg-[#e2e8f0] dark:bg-[#1e2a3f] h-px" />
                <span className="flex-shrink mx-4 font-space text-[10px] text-[#565e74] dark:text-[#94a3b8] uppercase tracking-widest font-bold px-2">
                  O REGÍSTRATE CON TU CORREO
                </span>
                <div className="flex-grow bg-[#e2e8f0] dark:bg-[#1e2a3f] h-px" />
              </div>

              {registrationSuccess ? (
                <div className="p-8 text-center bg-[#eff4ff] dark:bg-[#16253b] border border-[#00d2ff] space-y-4">
                  <div className="w-14 h-14 bg-[#00d2ff] text-[#0b1c30] flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-3xl">verified</span>
                  </div>
                  <h3 className="font-space text-lg font-bold uppercase text-[#0b1c30] dark:text-white">
                    CUENTA CREADA EXITOSAMENTE
                  </h3>
                  <p className="font-hanken text-xs text-[#565e74] dark:text-[#cbd5e1] max-w-sm mx-auto">
                    Tu cupón del <strong>10% (BIENVENIDA10)</strong> ha sido acreditado en tu canasta y tu perfil de telemetría está activo.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-space text-[11px] font-bold uppercase mb-1">
                        NOMBRE COMPLETO <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ej. Carlos Vega"
                        className="w-full h-11 px-3 bg-[#eff4ff] dark:bg-[#162235] text-[#0b1c30] dark:text-white font-hanken text-sm border border-[#d3e4fe] dark:border-[#2a3b53] focus:border-[#00d2ff] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-space text-[11px] font-bold uppercase mb-1">
                        IDENTIFICADOR / ALIAS <span className="text-[#565e74] font-normal">(OPCIONAL)</span>
                      </label>
                      <input
                        type="text"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        placeholder="Ej. CyberKnight"
                        className="w-full h-11 px-3 bg-[#eff4ff] dark:bg-[#162235] text-[#0b1c30] dark:text-white font-hanken text-sm border border-[#d3e4fe] dark:border-[#2a3b53] focus:border-[#00d2ff] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-space text-[11px] font-bold uppercase mb-1">
                        CORREO ELECTRÓNICO <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="usuario@dominio.com"
                        className="w-full h-11 px-3 bg-[#eff4ff] dark:bg-[#162235] text-[#0b1c30] dark:text-white font-hanken text-sm border border-[#d3e4fe] dark:border-[#2a3b53] focus:border-[#00d2ff] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-space text-[11px] font-bold uppercase mb-1">
                        TELÉFONO MÓVIL <span className="text-[#565e74] font-normal">(ALERTAS DE DESPACHO)</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+56 9 1234 5678"
                        className="w-full h-11 px-3 bg-[#eff4ff] dark:bg-[#162235] text-[#0b1c30] dark:text-white font-hanken text-sm border border-[#d3e4fe] dark:border-[#2a3b53] focus:border-[#00d2ff] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="font-space text-[11px] font-bold uppercase">
                          CONTRASEÑA <span className="text-rose-500">*</span>
                        </label>
                        <span className={`font-space text-[11px] uppercase ${strength.color}`}>
                          {strength.label}
                        </span>
                      </div>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full h-11 px-3 bg-[#eff4ff] dark:bg-[#162235] text-[#0b1c30] dark:text-white font-hanken text-sm border border-[#d3e4fe] dark:border-[#2a3b53] focus:border-[#00d2ff] focus:outline-none"
                      />
                      {/* 4-segment security bar */}
                      <div className="grid grid-cols-4 gap-1 mt-2">
                        <div
                          className={`h-1 transition-all duration-300 ${
                            strength.score >= 1
                              ? strength.score === 1
                                ? 'bg-rose-500'
                                : 'bg-[#00d2ff]'
                              : 'bg-[#d3e4fe] dark:bg-[#1e2a3f]'
                          }`}
                        />
                        <div
                          className={`h-1 transition-all duration-300 ${
                            strength.score >= 2 ? 'bg-[#00d2ff]' : 'bg-[#d3e4fe] dark:bg-[#1e2a3f]'
                          }`}
                        />
                        <div
                          className={`h-1 transition-all duration-300 ${
                            strength.score >= 3 ? 'bg-[#00d2ff]' : 'bg-[#d3e4fe] dark:bg-[#1e2a3f]'
                          }`}
                        />
                        <div
                          className={`h-1 transition-all duration-300 ${
                            strength.score >= 4 ? 'bg-[#00d2ff]' : 'bg-[#d3e4fe] dark:bg-[#1e2a3f]'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-space text-[11px] font-bold uppercase mb-1">
                        CONFIRMAR CONTRASEÑA <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full h-11 px-3 bg-[#eff4ff] dark:bg-[#162235] text-[#0b1c30] dark:text-white font-hanken text-sm border border-[#d3e4fe] dark:border-[#2a3b53] focus:border-[#00d2ff] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Telemetry Hardware Interests */}
                  <div className="pt-2">
                    <label className="block font-space text-[11px] font-bold uppercase mb-2">
                      INTERESES DE HARDWARE // PERFIL DE TELEMETRÍA:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => {
                        const isSelected = interests.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleInterest(tag)}
                            className={`px-3 py-1.5 font-space text-xs transition-colors border ${
                              isSelected
                                ? 'bg-[#0b1c30] dark:bg-[#00d2ff] text-[#00d2ff] dark:text-[#0b1c30] border-[#00d2ff] font-bold'
                                : 'bg-[#eff4ff] dark:bg-[#162235] text-[#565e74] dark:text-[#cbd5e1] border-[#d3e4fe] dark:border-[#2a3b53]'
                            }`}
                          >
                            {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Terms checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        required
                        checked={agreeTerms}
                        onChange={(e) => {
                          trigger('light');
                          setAgreeTerms(e.target.checked);
                        }}
                        className="mt-0.5 w-4 h-4 rounded-none accent-[#0b1c30] dark:accent-[#00d2ff] cursor-pointer"
                      />
                      <span className="font-hanken text-xs text-[#565e74] dark:text-[#94a3b8]">
                        Acepto los <a href="#" className="underline font-medium text-[#0b1c30] dark:text-white">Términos del Servicio de Laboratorio</a> y reconozco haber leído la <a href="#" className="underline font-medium text-[#0b1c30] dark:text-white">Política de Privacidad de Datos de Hardware</a>.
                      </span>
                    </label>
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 bg-[#0b1c30] dark:bg-[#00d2ff] text-white dark:text-[#0b1c30] font-space text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-lg active:scale-98"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-current border-t-transparent animate-spin inline-block" />
                          <span>REGISTRANDO ESTACIÓN...</span>
                        </>
                      ) : (
                        <>
                          <span>CREAR CUENTA Y OBTENER 10% DE DESCUENTO</span>
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-center pt-2">
                    <p className="font-hanken text-xs text-[#565e74] dark:text-[#94a3b8]">
                      ¿Ya tienes una cuenta registrada?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          trigger('selection');
                          navigate('login');
                        }}
                        className="text-[#00677f] dark:text-[#00d2ff] font-bold hover:underline"
                      >
                        Iniciar sesión aquí
                      </button>
                    </p>
                  </div>
                </form>
              )}

              {/* Bottom SSL verification line */}
              <div className="mt-8 pt-4 bg-[#eff4ff] dark:bg-[#111927] p-3 border border-[#d3e4fe] dark:border-[#1e2a3f] flex flex-col sm:flex-row items-center justify-between gap-3 font-space text-[10px]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00677f] dark:text-[#00d2ff] text-[18px]">
                    lock
                  </span>
                  <span className="font-bold text-[#0b1c30] dark:text-white uppercase tracking-wider">
                    CIFRADO SSL DE 256 BITS
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00677f] dark:text-[#00d2ff] text-[18px]">
                    shield_with_heart
                  </span>
                  <span className="font-bold text-[#0b1c30] dark:text-white uppercase tracking-wider">
                    PROTOCOLO DE PROTECCIÓN DE HARDWARE
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-500 shadow-[0_0_6px_#10b981]" />
                  <span className="text-[#565e74] dark:text-[#94a3b8] font-bold">
                    ESTADO: SEGURO
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
