import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useHaptics } from '../context/HapticContext';
import { OptimizedImage } from './OptimizedImage';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    subtotal,
    discount,
    total,
    couponCode,
    isCouponApplied,
    applyCoupon,
    removeCoupon,
  } = useCart();
  const { trigger } = useHaptics();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const ok = applyCoupon(inputCoupon);
    if (!ok) {
      setCouponError(true);
      setTimeout(() => setCouponError(false), 2500);
    } else {
      setInputCoupon('');
    }
  };

  const handleCheckout = () => {
    trigger('medium');
    setIsCheckingOut(true);

    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      trigger('success');

      setTimeout(() => {
        setCheckoutSuccess(false);
        setIsOpen(false);
      }, 3000);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-white dark:bg-[#0b1424] h-full shadow-2xl flex flex-col justify-between border-l border-[#0b1c30] dark:border-[#1e2a3f] text-[#0b1c30] dark:text-white relative">
        {/* Header */}
        <div className="h-18 px-6 bg-[#0b1c30] text-white flex items-center justify-between border-b border-[#1b2d46]">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#00d2ff] text-[22px]">
              shopping_bag
            </span>
            <div>
              <span className="font-space text-sm font-bold uppercase tracking-wider block">
                CANASTA DE HARDWARE
              </span>
              <span className="font-space text-[10px] text-[#94a3b8] uppercase">
                {items.length} LÍNEAS SELECCIONADAS
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              trigger('selection');
              setIsOpen(false);
            }}
            className="p-1 text-[#94a3b8] hover:text-white"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Success Overlay after checkout */}
        {checkoutSuccess ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#eff4ff] dark:bg-[#0e1726]">
            <div className="w-16 h-16 bg-[#00d2ff] text-[#0b1c30] flex items-center justify-center mb-4 shadow-lg">
              <span className="material-symbols-outlined text-4xl">verified</span>
            </div>
            <h3 className="font-space text-xl font-bold uppercase tracking-tight text-[#0b1c30] dark:text-white">
              PEDIDO TRANSMITIDO A LABORATORIO
            </h3>
            <p className="font-hanken text-sm text-[#565e74] dark:text-[#94a3b8] mt-2 max-w-xs">
              Tu estación de hardware ha sido ingresada al banco de calibración unitaria con despacho prioritario desde Santiago.
            </p>
            <div className="mt-6 p-3 bg-white dark:bg-[#162235] border border-[#d3e4fe] dark:border-[#2a3b53] font-space text-xs">
              <span className="text-[#64748b] block">ID DE SEGUIMIENTO SSL:</span>
              <span className="text-[#00677f] dark:text-[#00d2ff] font-bold">
                BE-LAB-ORD-99824-CL
              </span>
            </div>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center text-[#565e74] dark:text-[#94a3b8]">
                  <span className="material-symbols-outlined text-4xl mb-2 text-[#bec6e0] dark:text-[#334155]">
                    remove_shopping_cart
                  </span>
                  <span className="font-space text-sm uppercase">Tu canasta está vacía</span>
                  <span className="font-hanken text-xs mt-1">
                    Explora los periféricos de alta tasa en el catálogo
                  </span>
                </div>
              ) : (
                items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="p-3 bg-[#eff4ff] dark:bg-[#162235] border border-[#d3e4fe] dark:border-[#23354e] flex gap-3 relative group"
                  >
                    <div className="w-20 h-20 bg-white dark:bg-[#0b1424] flex-shrink-0 p-1 flex items-center justify-center">
                      <OptimizedImage
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="font-space text-[9px] text-[#565e74] dark:text-[#94a3b8] uppercase">
                            {product.sku}
                          </span>
                          <button
                            onClick={() => removeItem(product.id)}
                            className="text-[#565e74] hover:text-rose-500 p-0.5"
                            title="Eliminar ítem"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        </div>
                        <h4 className="font-space text-xs font-bold text-[#0b1c30] dark:text-white uppercase leading-snug">
                          {product.name}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-[#bec6e0] dark:border-[#2a3b53] bg-white dark:bg-[#0b1424]">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs hover:bg-[#eff4ff] dark:hover:bg-[#1f3350]"
                          >
                            -
                          </button>
                          <span className="w-7 text-center font-space text-xs font-bold">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs hover:bg-[#eff4ff] dark:hover:bg-[#1f3350]"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="font-space text-xs font-bold text-[#00677f] dark:text-[#00d2ff]">
                            ${(product.priceClp * quantity).toLocaleString('es-CL')} CLP
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Coupon Section */}
              {items.length > 0 && (
                <div className="pt-2">
                  <div className="p-3 bg-[#f8f9ff] dark:bg-[#0e1726] border border-[#d3e4fe] dark:border-[#23354e]">
                    <span className="font-space text-[10px] uppercase text-[#565e74] dark:text-[#94a3b8] font-bold block mb-1.5">
                      Cupón de Laboratorio (Ej. BIENVENIDA10)
                    </span>
                    {isCouponApplied ? (
                      <div className="flex items-center justify-between p-2 bg-[#d3e4fe] dark:bg-[#16253b] text-[#00677f] dark:text-[#00d2ff]">
                        <div className="flex items-center gap-1.5 font-space text-xs font-bold uppercase">
                          <span className="material-symbols-outlined text-[16px]">check_circle</span>
                          <span>{couponCode} (-10%)</span>
                        </div>
                        <button
                          onClick={removeCoupon}
                          className="text-xs uppercase text-rose-500 hover:underline font-space"
                        >
                          Quitar
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <input
                          type="text"
                          value={inputCoupon}
                          onChange={(e) => setInputCoupon(e.target.value)}
                          placeholder="Código de descuento"
                          className="flex-1 h-9 px-2.5 bg-white dark:bg-[#162235] text-xs font-space border border-[#bec6e0] dark:border-[#2a3b53] focus:outline-none focus:border-[#00d2ff]"
                        />
                        <button
                          type="submit"
                          className="h-9 px-3 bg-[#0b1c30] dark:bg-[#00d2ff] text-white dark:text-[#0b1c30] font-space text-[11px] font-bold uppercase tracking-wider"
                        >
                          APLICAR
                        </button>
                      </form>
                    )}
                    {couponError && (
                      <span className="font-space text-[10px] text-rose-500 mt-1 block">
                        Cupón no válido. Usa BIENVENIDA10 o BYTE10.
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Subtotal, Taxes & Checkout Footer */}
            {items.length > 0 && (
              <div className="p-4 sm:p-6 bg-[#eff4ff] dark:bg-[#0e1726] border-t border-[#d3e4fe] dark:border-[#1e2a3f] space-y-3">
                <div className="space-y-1.5 font-space text-xs">
                  <div className="flex justify-between text-[#565e74] dark:text-[#94a3b8]">
                    <span>SUBTOTAL:</span>
                    <span>${subtotal.toLocaleString('es-CL')} CLP</span>
                  </div>
                  {isCouponApplied && (
                    <div className="flex justify-between text-[#00677f] dark:text-[#00d2ff] font-bold">
                      <span>DESCUENTO BIENVENIDA (10%):</span>
                      <span>-${discount.toLocaleString('es-CL')} CLP</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#565e74] dark:text-[#94a3b8]">
                    <span>DESPACHO SEGURO SANTIAGO / LATAM:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                      GRATIS (PROMO)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base font-bold text-[#0b1c30] dark:text-white pt-2 border-t border-[#bec6e0] dark:border-[#23354e]">
                    <span>TOTAL A PAGAR:</span>
                    <span className="text-[#00677f] dark:text-[#00d2ff]">
                      ${total.toLocaleString('es-CL')} CLP
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full h-12 bg-[#0b1c30] dark:bg-[#00d2ff] text-white dark:text-[#0b1c30] font-space text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  {isCheckingOut ? (
                    <>
                      <span className="w-4 h-4 border-2 border-current border-t-transparent animate-spin inline-block" />
                      <span>PROCESANDO TOKEN SSL...</span>
                    </>
                  ) : (
                    <>
                      <span>CONTINUAR A PAGO SEGURO</span>
                      <span className="material-symbols-outlined text-[18px]">lock</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] font-space text-[#565e74] dark:text-[#94a3b8]">
                  <span className="material-symbols-outlined text-[14px] text-[#00677f] dark:text-[#00d2ff]">
                    verified_user
                  </span>
                  <span>CIFRADO TLS 1.3 // GARANTÍA DE LABORATORIO 2 AÑOS</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
